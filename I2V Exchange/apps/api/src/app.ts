import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { randomUUID } from 'node:crypto';
import type { SQLInputValue } from 'node:sqlite';
import { ZodError } from 'zod';
import * as schema from '@i2v/schemas';
import { canAccess, compareProgress, publicProjection, selfAssignableRoles, type AccessRequest, type Actor, type AuditEvent, type Operation, type Organization, type PrivateProject, type Profile, type PublicProject, type ResourceGrant, type Role, type RoleGrant } from '@i2v/domain';
import { hashPassword, verifyPassword, newToken, tokenHash, sessionLifetimeMs } from '@i2v/auth';
import { openDatabase, transaction } from '@i2v/persistence';
import { requireLocalMode, type IdentityProvider } from '@i2v/adapters';
import { seedFictionalDiscovery } from './seed.js';

type Row = Record<string, string | number | null>;
class HttpError extends Error { constructor(public status: number, message: string) { super(message); } }
export interface AppOptions { mode: string; database?: string; seed?: boolean; origins?: string[]; now?: () => number; sessionMs?: number; }
export function createApplication(options: AppOptions) {
  requireLocalMode(options.mode);
  const db = openDatabase(options.database ?? ':memory:');
  const now = options.now ?? Date.now;
  const origins = new Set(options.origins ?? ['http://localhost:5173', 'http://127.0.0.1:5173']);
  const one = (sql: string, ...args: SQLInputValue[]) => db.prepare(sql).get(...args) as Row | undefined;
  const all = (sql: string, ...args: SQLInputValue[]) => db.prepare(sql).all(...args) as Row[];
  const run = (sql: string, ...args: SQLInputValue[]) => db.prepare(sql).run(...args);
  const iso = () => new Date(now()).toISOString();
  function audit(actorId: string, action: string, resourceId: string) { run('INSERT INTO audit_events VALUES(?,?,?,?,?)', randomUUID(), actorId, action, resourceId, iso()); }
  function profile(id: string): Profile {
    const row = one('SELECT id,email,name,bio FROM users WHERE id=?', id);
    if (!row) throw new HttpError(401, 'Please sign in again.');
    const roles = all('SELECT role,state,verification FROM roles WHERE user_id=?', id) as unknown as RoleGrant[];
    return { id: String(row.id), email: String(row.email), name: String(row.name), bio: String(row.bio), roles };
  }
  const identity: IdentityProvider = {
    mode: 'local',
    async authenticate(email, password) {
      const row = one('SELECT id,password_hash FROM users WHERE email=?', email);
      // A valid dummy hash keeps unknown-account work comparable to a bad password.
      const dummy = `scrypt$00000000000000000000000000000000$${'0'.repeat(128)}`;
      const valid = await verifyPassword(password, row ? String(row.password_hash) : dummy);
      return valid && row ? profile(String(row.id)) : null;
    },
  };
  if (options.seed !== false) seedFictionalDiscovery(db);
  function sessionToken(req: IncomingMessage): string | null {
    if (req.headers.authorization?.startsWith('Bearer ')) return req.headers.authorization.slice(7);
    return req.headers.cookie?.split(';').map(x => x.trim()).find(x => x.startsWith('i2v_session='))?.slice(12) ?? null;
  }
  function actorFor(req: IncomingMessage): Actor | null {
    const token = sessionToken(req);
    if (!token) return null;
    const row = one('SELECT user_id FROM sessions WHERE token_hash=? AND expires_at>?', tokenHash(token), now());
    return row ? profile(String(row.user_id)) : null;
  }
  function requireActor(actor: Actor | null): Actor { if (!actor) throw new HttpError(401, 'Sign in to continue.'); return actor; }
  function project(id: string): PrivateProject {
    const row = one('SELECT data FROM projects WHERE id=?', id);
    if (!row) throw new HttpError(404, 'Project not available.');
    return JSON.parse(String(row.data)) as PrivateProject;
  }
  function grantsFor(actor: Actor | null, resourceId: string): ResourceGrant[] {
    if (!actor) return [];
    return all('SELECT * FROM grants WHERE actor_id=? AND resource_id=?', actor.id, resourceId).map(r => ({ actorId: String(r.actor_id), resourceId: String(r.resource_id), operation: r.operation as Operation, expiresAt: Number(r.expires_at), revoked: Boolean(r.revoked) }));
  }
  function authorize(actor: Actor | null, resource: { id: string; ownerId: string }, operation: Operation) {
    const signed = requireActor(actor);
    if (!canAccess(signed, resource, operation, grantsFor(signed, resource.id), now())) {
      audit(signed.id, 'access.denied', resource.id);
      throw new HttpError(404, 'Resource not available.');
    }
  }
  function saveProject(p: PrivateProject) { run('UPDATE projects SET data=?,published=? WHERE id=?', JSON.stringify(p), p.published ? 1 : 0, p.id); }
  async function body(req: IncomingMessage): Promise<unknown> {
    const chunks: Buffer[] = []; let size = 0;
    for await (const chunk of req) { const buffer = Buffer.from(chunk); size += buffer.length; if (size <= 16_384) chunks.push(buffer); }
    if (size > 16_384) throw new HttpError(413, 'Request is too large.');
    if (!req.headers['content-type']?.startsWith('application/json')) throw new HttpError(415, 'Use application/json.');
    try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { throw new HttpError(400, 'Invalid JSON.'); }
  }
  function send(res: ServerResponse, status: number, data: unknown) { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'X-Frame-Options': 'DENY' }); res.end(JSON.stringify(data)); }
  function startSession(req: IncomingMessage, res: ServerResponse, user: Profile) {
    const token = newToken(); const expiresAt = now() + (options.sessionMs ?? sessionLifetimeMs);
    run('DELETE FROM sessions WHERE expires_at<=?', now());
    run('INSERT INTO sessions VALUES(?,?,?)', tokenHash(token), user.id, expiresAt);
    audit(user.id, 'session.created', user.id);
    if (req.headers['x-i2v-client'] === 'mobile') return { user, token, expiresAt };
    res.setHeader('Set-Cookie', `i2v_session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${Math.floor((expiresAt - now()) / 1000)}`);
    return { user, expiresAt };
  }
  const rates = new Map<string, { count: number; resetAt: number }>();
  function rateLimit(req: IncomingMessage, path: string) {
    if (rates.size > 5000) for (const [key, value] of rates) if (value.resetAt <= now()) rates.delete(key);
    const key = `${req.socket.remoteAddress}:${path.startsWith('/auth/') ? 'auth' : 'write'}`;
    const limit = path.startsWith('/auth/') ? 30 : 120;
    let state = rates.get(key);
    if (!state || state.resetAt <= now()) { state = { count: 0, resetAt: now() + 60_000 }; rates.set(key, state); }
    if (++state.count > limit) throw new HttpError(429, 'Too many requests. Please wait a minute.');
  }
  function requestsFor(actor: Actor): AccessRequest[] {
    return all(`SELECT a.*,u.name FROM access_requests a JOIN users u ON u.id=a.requester_id JOIN projects p ON p.id=a.project_id WHERE a.requester_id=? OR p.owner_id=? ORDER BY a.created_at DESC`, actor.id, actor.id).map(r => ({ id: String(r.id), projectId: String(r.project_id), resourceId: String(r.resource_id), requesterId: String(r.requester_id), requesterName: String(r.name), purpose: String(r.purpose), kind: r.kind as AccessRequest['kind'], status: r.status === 'approved' && r.expires_at !== null && Number(r.expires_at) <= now() ? 'expired' : r.status as AccessRequest['status'], expiresAt: r.expires_at === null ? null : Number(r.expires_at), createdAt: String(r.created_at), response: String(r.response) }));
  }
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url ?? '/', 'http://localhost');
      const path = url.pathname.replace(/\/$/, '') || '/'; const method = req.method ?? 'GET';
      const origin = req.headers.origin;
      if (origin && !origins.has(origin)) throw new HttpError(403, 'Origin is not allowed.');
      if (origin) { res.setHeader('Access-Control-Allow-Origin', origin); res.setHeader('Access-Control-Allow-Credentials', 'true'); res.setHeader('Vary', 'Origin'); }
      if (method === 'OPTIONS') { res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS'); res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-I2V-Client'); return send(res, 204, null); }
      if (!['GET', 'HEAD'].includes(method)) {
        // Cookie mutations require an explicit trusted Origin. Native Bearer clients do not use cookies.
        if (req.headers.cookie && !req.headers.authorization && !origin) throw new HttpError(403, 'A trusted origin is required.');
        if (req.headers['sec-fetch-site'] === 'cross-site') throw new HttpError(403, 'Cross-site request rejected.');
        rateLimit(req, path);
      }
      const actor = actorFor(req);
      if (path === '/health' && method === 'GET') return send(res, 200, { status: 'ok', mode: 'local', capitalEnabled: false });
      if (path === '/auth/register' && method === 'POST') {
        const input = schema.registration.parse(await body(req));
        if (one('SELECT id FROM users WHERE email=?', input.email)) throw new HttpError(409, 'This account cannot be created. Try signing in.');
        const password = await hashPassword(input.password); const id = randomUUID();
        transaction(db, () => {
          run('INSERT INTO users(id,email,name,password_hash) VALUES(?,?,?,?)', id, input.email, input.name, password);
          run('INSERT INTO roles VALUES(?,?,?,?)', id, input.role, selfAssignableRoles.includes(input.role) ? 'approved' : 'requested', 'self_declared');
          audit(id, 'account.registered', id);
        });
        return send(res, 201, startSession(req, res, profile(id)));
      }
      if (path === '/auth/login' && method === 'POST') {
        const input = schema.login.parse(await body(req)); const user = await identity.authenticate(input.email, input.password);
        if (!user) throw new HttpError(401, 'Email or password is incorrect.');
        return send(res, 200, startSession(req, res, user));
      }
      if (path === '/auth/logout' && method === 'POST') {
        const token = sessionToken(req); if (token) run('DELETE FROM sessions WHERE token_hash=?', tokenHash(token));
        if (actor) audit(actor.id, 'session.revoked', actor.id);
        res.setHeader('Set-Cookie', 'i2v_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0');
        return send(res, 200, { ok: true });
      }
      if (path === '/me' && method === 'GET') return send(res, 200, profile(requireActor(actor).id));
      if (path === '/me' && method === 'PATCH') {
        const user = requireActor(actor); const input = schema.profileUpdate.parse(await body(req));
        transaction(db, () => { run('UPDATE users SET name=?,bio=? WHERE id=?', input.name, input.bio, user.id); audit(user.id, 'profile.updated', user.id); });
        return send(res, 200, profile(user.id));
      }
      if (path === '/me/roles' && method === 'POST') {
        const user = requireActor(actor); const { role } = schema.roleRequest.parse(await body(req));
        if (one('SELECT role FROM roles WHERE user_id=? AND role=?', user.id, role)) throw new HttpError(409, 'This role already has a recorded decision.');
        transaction(db, () => { run('INSERT INTO roles VALUES(?,?,?,?)', user.id, role, selfAssignableRoles.includes(role) ? 'approved' : 'requested', 'self_declared'); audit(user.id, 'role.requested', user.id); });
        return send(res, 201, profile(user.id));
      }
      if (path === '/admin/roles' && method === 'POST') {
        const user = requireActor(actor);
        if (!user.roles.some(r => r.role === 'administrator' && r.state === 'approved')) throw new HttpError(403, 'Administrator approval required.');
        const input = schema.roleDecision.parse(await body(req));
        if (input.userId === user.id || input.role === 'administrator') throw new HttpError(403, 'Self-approval and administrator delegation are not permitted here.');
        if (!one('SELECT role FROM roles WHERE user_id=? AND role=?', input.userId, input.role)) throw new HttpError(404, 'Role request not available.');
        transaction(db, () => { run('UPDATE roles SET state=?,verification=? WHERE user_id=? AND role=?', input.decision, input.decision === 'approved' ? 'reviewed' : 'self_declared', input.userId, input.role); audit(user.id, `role.${input.decision}`, input.userId); });
        return send(res, 200, profile(input.userId));
      }
      if (path === '/me/projects' && method === 'GET') return send(res, 200, all('SELECT data FROM projects WHERE owner_id=?', requireActor(actor).id).map(r => JSON.parse(String(r.data))));
      if (path === '/me/requests' && method === 'GET') return send(res, 200, requestsFor(requireActor(actor)));
      if (path === '/me/audit' && method === 'GET') {
        const rows = all('SELECT * FROM audit_events WHERE actor_id=? ORDER BY created_at DESC LIMIT 100', requireActor(actor).id);
        return send(res, 200, rows.map(r => ({ id: r.id, actorId: r.actor_id, action: r.action, resourceId: r.resource_id, createdAt: r.created_at })) as unknown as AuditEvent[]);
      }
      if (path === '/me/watchlist' && method === 'GET') return send(res, 200, all('SELECT p.public_data FROM watchlist w JOIN projects p ON p.id=w.project_id WHERE w.user_id=? AND p.published=1', requireActor(actor).id).map(r => JSON.parse(String(r.public_data))));
      if (path === '/projects' && method === 'GET') {
        const q = (url.searchParams.get('q') ?? '').trim().toLowerCase().slice(0, 200);
        const sector = url.searchParams.get('sector'); const stage = url.searchParams.get('stage');
        const projects = all('SELECT public_data FROM projects WHERE published=1').map(r => JSON.parse(String(r.public_data)) as PublicProject).filter(p => (!q || `${p.title} ${p.summary} ${p.institution}`.toLowerCase().includes(q)) && (!sector || p.sector === sector) && (!stage || p.stage === stage));
        projects.sort(url.searchParams.get('sort') === 'progress' ? compareProgress : (a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.title.localeCompare(b.title));
        return send(res, 200, projects);
      }
      if (path === '/projects' && method === 'POST') {
        const user = requireActor(actor);
        if (!user.roles.some(r => r.state === 'approved' && selfAssignableRoles.includes(r.role))) throw new HttpError(403, 'Add a creator, student or researcher role first.');
        const input = schema.projectInput.parse(await body(req)); const id = randomUUID();
        const p: PrivateProject = { ...input, id, ownerId: user.id, published: false, publishedAt: '', fictional: false, milestones: [] };
        transaction(db, () => { run('INSERT INTO projects(id,owner_id,data) VALUES(?,?,?)', id, user.id, JSON.stringify(p)); audit(user.id, 'project.created', id); });
        return send(res, 201, p);
      }
      const match = path.match(/^\/projects\/([^/]+)(?:\/([^/]+))?$/);
      if (match) {
        const [, id, action] = match as [string, string, string | undefined];
        if (!action && method === 'GET') {
          const row = one('SELECT public_data FROM projects WHERE id=? AND published=1', id);
          if (!row) throw new HttpError(404, 'Project not available.');
          return send(res, 200, JSON.parse(String(row.public_data)));
        }
        if (action === 'watchlist' && (method === 'POST' || method === 'DELETE')) {
          const user = requireActor(actor);
          if (!one('SELECT id FROM projects WHERE id=? AND published=1', id)) throw new HttpError(404, 'Project not available.');
          if (method === 'POST') run('INSERT OR IGNORE INTO watchlist VALUES(?,?)', user.id, id);
          else run('DELETE FROM watchlist WHERE user_id=? AND project_id=?', user.id, id);
          return send(res, 200, { saved: method === 'POST' });
        }
        const p = project(id);
        if (action === 'private' && method === 'GET') { authorize(actor, p, 'read_private'); return send(res, 200, p); }
        if (action === 'preview' && method === 'GET') { authorize(actor, p, 'publish'); return send(res, 200, publicProjection(p)); }
        if (action === 'edit' && method === 'PATCH') {
          authorize(actor, p, 'edit'); const input = schema.projectInput.parse(await body(req));
          const edited = { ...p, ...input };
          transaction(db, () => { saveProject(edited); audit(actor!.id, 'project.updated', id); });
          return send(res, 200, edited);
        }
        if (action === 'publish' && method === 'POST') {
          authorize(actor, p, 'publish'); schema.publication.parse(await body(req));
          p.published = true; p.publishedAt = iso();
          transaction(db, () => { saveProject(p); run('UPDATE projects SET public_data=? WHERE id=?', JSON.stringify(publicProjection(p)), id); audit(actor!.id, 'project.published', id); });
          return send(res, 200, publicProjection(p));
        }
        if (action === 'unpublish' && method === 'POST') {
          authorize(actor, p, 'publish'); p.published = false;
          transaction(db, () => { saveProject(p); run('UPDATE projects SET public_data=NULL WHERE id=?', id); run('UPDATE grants SET revoked=1 WHERE resource_id IN (SELECT id FROM evidence WHERE project_id=?)', id); run("UPDATE access_requests SET status='revoked' WHERE project_id=? AND status='approved'", id); audit(actor!.id, 'project.unpublished', id); });
          return send(res, 200, { ok: true });
        }
        if (action === 'milestones' && method === 'POST') {
          authorize(actor, p, 'edit'); const input = schema.milestoneInput.parse(await body(req));
          if (input.date > iso().slice(0, 10)) throw new HttpError(400, 'Record completed milestones; future plans are not achievements.');
          const milestone = { ...input, id: randomUUID(), evidence: 'self_reported' as const };
          p.milestones.push(milestone);
          transaction(db, () => { saveProject(p); audit(actor!.id, 'milestone.created', id); });
          return send(res, 201, p);
        }
        if (action === 'evidence' && method === 'POST') {
          authorize(actor, p, 'edit'); const input = schema.evidenceInput.parse(await body(req)); const evidenceId = randomUUID();
          transaction(db, () => { run('INSERT INTO evidence VALUES(?,?,?,?)', evidenceId, id, input.title, input.content); audit(actor!.id, 'evidence.created', evidenceId); });
          return send(res, 201, { id: evidenceId, title: input.title });
        }
        if (action === 'evidence' && method === 'GET') { authorize(actor, p, 'read_private'); return send(res, 200, all('SELECT id,title FROM evidence WHERE project_id=?', id)); }
        if (action === 'access-requests' && method === 'POST') {
          const user = requireActor(actor);
          if (!p.published || p.ownerId === user.id || p.fictional) throw new HttpError(400, 'Requests require another member’s published project. Fictional examples cannot receive requests.');
          const input = schema.accessInput.parse(await body(req));
          if (input.kind === 'evidence' && !one('SELECT id FROM evidence WHERE id=? AND project_id=?', input.resourceId!, id)) throw new HttpError(404, 'Evidence reference not available.');
          const resourceId = input.kind === 'evidence' ? input.resourceId! : id;
          if (one("SELECT id FROM access_requests WHERE project_id=? AND resource_id=? AND requester_id=? AND kind=? AND status='pending'", id, resourceId, user.id, input.kind)) throw new HttpError(409, 'A request is already pending.');
          const requestId = randomUUID();
          transaction(db, () => { run('INSERT INTO access_requests(id,project_id,resource_id,requester_id,purpose,kind,status,created_at) VALUES(?,?,?,?,?,?,?,?)', requestId, id, resourceId, user.id, input.purpose, input.kind, 'pending', iso()); audit(user.id, 'access.requested', requestId); });
          return send(res, 201, requestsFor(user).find(r => r.id === requestId));
        }
      }
      const requestMatch = path.match(/^\/access-requests\/([^/]+)$/);
      if (requestMatch && method === 'PATCH') {
        const user = requireActor(actor); const row = one('SELECT * FROM access_requests WHERE id=?', requestMatch[1]!);
        if (!row || project(String(row.project_id)).ownerId !== user.id) throw new HttpError(404, 'Request not available.');
        const input = schema.accessDecision.parse(await body(req));
        if ((input.decision === 'revoked' && row.status !== 'approved') || (input.decision !== 'revoked' && row.status !== 'pending')) throw new HttpError(409, 'This request has already been decided.');
        const expiresAt = input.decision === 'approved' && row.kind === 'evidence' ? now() + input.expiresInHours * 3_600_000 : null;
        transaction(db, () => {
          run('UPDATE access_requests SET status=?,expires_at=?,response=? WHERE id=?', input.decision, expiresAt, input.response, String(row.id));
          if (row.kind === 'evidence') {
            if (input.decision === 'approved') run('INSERT INTO grants VALUES(?,?,?,?,0) ON CONFLICT(actor_id,resource_id,operation) DO UPDATE SET expires_at=excluded.expires_at,revoked=0', String(row.requester_id), String(row.resource_id), 'read_evidence', expiresAt!);
            if (input.decision === 'revoked') run('UPDATE grants SET revoked=1 WHERE actor_id=? AND resource_id=? AND operation=?', String(row.requester_id), String(row.resource_id), 'read_evidence');
          }
          audit(user.id, `access.${input.decision}`, String(row.id));
        });
        return send(res, 200, requestsFor(user).find(r => r.id === row.id));
      }
      const evidenceMatch = path.match(/^\/evidence\/([^/]+)$/);
      if (evidenceMatch && method === 'GET') {
        const row = one('SELECT * FROM evidence WHERE id=?', evidenceMatch[1]!);
        if (!row) throw new HttpError(404, 'Resource not available.');
        const p = project(String(row.project_id));
        authorize(actor, { id: String(row.id), ownerId: p.ownerId }, 'read_evidence');
        audit(actor!.id, 'evidence.read', String(row.id));
        return send(res, 200, { id: row.id, title: row.title, content: row.content });
      }
      if (path === '/me/organizations' && method === 'GET') {
        const rows = all('SELECT o.*,m.state FROM organizations o JOIN memberships m ON m.organization_id=o.id WHERE m.user_id=?', requireActor(actor).id);
        return send(res, 200, rows.map(r => ({ id: r.id, name: r.name, kind: r.kind, membership: r.state, verification: r.verification })) as unknown as Organization[]);
      }
      if (path === '/organizations' && method === 'POST') {
        const user = requireActor(actor); const input = schema.organizationInput.parse(await body(req)); const id = randomUUID();
        transaction(db, () => { run('INSERT INTO organizations(id,name,kind) VALUES(?,?,?)', id, input.name, input.kind); run('INSERT INTO memberships VALUES(?,?,?)', id, user.id, 'owner'); audit(user.id, 'organization.claimed', id); });
        return send(res, 201, { id, ...input, membership: 'owner', verification: 'unverified' });
      }
      const orgMatch = path.match(/^\/organizations\/([^/]+)\/memberships$/);
      if (orgMatch && method === 'POST') {
        const user = requireActor(actor); const id = orgMatch[1]!;
        if (!one('SELECT id FROM organizations WHERE id=?', id)) throw new HttpError(404, 'Organization not available.');
        if (one('SELECT state FROM memberships WHERE organization_id=? AND user_id=?', id, user.id)) throw new HttpError(409, 'A membership is already recorded.');
        transaction(db, () => { run('INSERT INTO memberships VALUES(?,?,?)', id, user.id, 'requested'); audit(user.id, 'membership.requested', id); });
        return send(res, 201, { state: 'requested' });
      }
      if (orgMatch && method === 'PATCH') {
        const user = requireActor(actor); const id = orgMatch[1]!;
        if (one('SELECT state FROM memberships WHERE organization_id=? AND user_id=?', id, user.id)?.state !== 'owner') throw new HttpError(403, 'Organization owner approval required.');
        const input = schema.memberInput.parse(await body(req));
        if (input.userId === user.id) throw new HttpError(403, 'Owner membership cannot be changed here.');
        const membership = one('SELECT state FROM memberships WHERE organization_id=? AND user_id=?', id, input.userId);
        if (!membership || (input.decision === 'approve' && membership.state !== 'requested')) throw new HttpError(409, 'No matching pending membership.');
        transaction(db, () => { run('UPDATE memberships SET state=? WHERE organization_id=? AND user_id=?', input.decision === 'approve' ? 'member' : 'revoked', id, input.userId); audit(user.id, `membership.${input.decision}`, id); });
        return send(res, 200, { ok: true });
      }
      throw new HttpError(404, 'Route not available.');
    } catch (error) {
      if (error instanceof ZodError) return send(res, 400, { error: 'Please check the form.', fields: error.issues.map(i => ({ field: i.path.join('.'), message: i.message })) });
      if (error instanceof HttpError) return send(res, error.status, { error: error.message });
      // No request body, password, session token, SQL value or private material is logged/returned.
      return send(res, 500, { error: 'The request could not be completed. Please retry.' });
    }
  });
  server.requestTimeout = 15_000; server.headersTimeout = 10_000;
  return { server, db, identity, profile, close: () => { server.closeAllConnections(); server.close(); db.close(); } };
}
