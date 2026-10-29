import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { createApplication } from '../apps/api/src/app';
import { canAccess, type PrivateProject, type Profile, type PublicProject, type ResourceGrant } from '@i2v/domain';
import { tokenHash } from '@i2v/auth';
import { randomUUID } from 'node:crypto';

type App = ReturnType<typeof createApplication>;
let app: App; let base = ''; let clock = Date.parse('2026-10-30T12:00:00Z');
async function start() { app = createApplication({ mode: 'local', now: () => clock }); await new Promise<void>(resolve => app.server.listen(0, '127.0.0.1', resolve)); const address = app.server.address(); if (!address || typeof address === 'string') throw new Error('No server address'); base = `http://127.0.0.1:${address.port}`; }
async function call(path: string, method = 'GET', data?: unknown, token?: string, extra: Record<string, string> = {}) { const response = await fetch(`${base}${path}`, { method, headers: { 'X-I2V-Client': 'mobile', ...(data !== undefined ? { 'Content-Type': 'application/json' } : {}), ...(token ? { Authorization: `Bearer ${token}` } : {}), ...extra }, ...(data !== undefined ? { body: JSON.stringify(data) } : {}) }); return { status: response.status, data: await response.json(), headers: response.headers }; }
async function register(role = 'founder') { const result = await call('/auth/register', 'POST', { name: 'Local Test Builder', email: `${randomUUID()}@example.test`, password: 'Unique test password 2026!', role }); expect(result.status).toBe(201); return result.data as { user: Profile; token: string }; }
const projectData = { title: 'Permission Test Project', summary: 'A sufficiently detailed public summary for a local engineering test.', sector: 'Agriculture', stage: 'Prototype', location: 'Harare, Zimbabwe', institution: 'Self-declared test collective', needs: ['Field testing'], privateNotes: 'CONFIDENTIAL_UNPUBLISHED_METHOD' };
async function draft(token: string) { const result = await call('/projects', 'POST', projectData, token); expect(result.status).toBe(201); return result.data as PrivateProject; }
async function publish(id: string, token: string) { const result = await call(`/projects/${id}/publish`, 'POST', { confirm: true, rightsDeclaration: 'personal' }, token); expect(result.status).toBe(200); return result.data as PublicProject; }
beforeEach(async () => { clock = Date.parse('2026-10-30T12:00:00Z'); await start(); });
afterEach(() => app?.close());

describe('local identity and session boundary', () => {
  it('refuses production and unspecified modes instead of falling back', () => { expect(() => createApplication({ mode: 'production' })).toThrow(/no fallback/); expect(() => createApplication({ mode: '' })).toThrow(); });
  it('hashes passwords and stores only opaque token hashes', async () => {
    const result = await register(); const row = app.db.prepare('SELECT password_hash FROM users WHERE id=?').get(result.user.id)!;
    expect(row.password_hash).toMatch(/^scrypt\$/); expect(row.password_hash).not.toContain('Unique test');
    const session = app.db.prepare('SELECT token_hash FROM sessions WHERE user_id=?').get(result.user.id)!;
    expect(session.token_hash).toBe(tokenHash(result.token)); expect(session.token_hash).not.toBe(result.token);
    expect((await call('/me', 'GET', undefined, result.token)).status).toBe(200);
  });
  it('authenticates normalized email and rejects the wrong password with a generic error', async () => {
    const { user } = await register();
    expect((await call('/auth/login', 'POST', { email: user.email.toUpperCase(), password: 'Unique test password 2026!' })).status).toBe(200);
    const wrong = await call('/auth/login', 'POST', { email: user.email, password: 'incorrect password' });
    const absent = await call('/auth/login', 'POST', { email: 'absent@example.test', password: 'incorrect password' });
    expect(wrong.status).toBe(401); expect(absent.data).toEqual(wrong.data);
  });
  it('revokes logout sessions immediately', async () => { const { token } = await register(); expect((await call('/auth/logout', 'POST', {}, token)).status).toBe(200); expect((await call('/me', 'GET', undefined, token)).status).toBe(401); });
  it('expires sessions using server time', async () => { const { token } = await register(); clock += 8 * 3600_000 + 1; expect((await call('/me', 'GET', undefined, token)).status).toBe(401); });
  it('uses HttpOnly SameSite cookies for web and does not return a browser token', async () => {
    const response = await fetch(`${base}/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'http://localhost:5173' }, body: JSON.stringify({ name: 'Browser Builder', email: 'browser@example.test', password: 'Browser development pass!', role: 'founder' }) });
    expect(response.status).toBe(201); expect(await response.json()).not.toHaveProperty('token');
    const cookie = response.headers.get('set-cookie')!; expect(cookie).toContain('HttpOnly'); expect(cookie).toContain('SameSite=Strict');
    const cookiePair = cookie.split(';')[0]!;
    expect((await call('/me', 'GET', undefined, undefined, { Cookie: cookiePair })).status).toBe(200);
    expect((await call('/me', 'PATCH', { name: 'Unsafe', bio: '' }, undefined, { Cookie: cookiePair })).status).toBe(403);
    expect((await call('/me', 'PATCH', { name: 'Trusted', bio: '' }, undefined, { Cookie: cookiePair, Origin: 'http://localhost:5173' })).status).toBe(200);
    expect((await call('/me', 'PATCH', { name: 'Unsafe', bio: '' }, undefined, { Cookie: cookiePair, Origin: 'https://attacker.example' })).status).toBe(403);
  });
  it('rejects privilege fields supplied during registration or profile updates', async () => {
    expect((await call('/auth/register', 'POST', { name: 'Attacker', email: 'extra@example.test', password: 'Unique test password!', role: 'founder', verified: true })).status).toBe(400);
    const user = await register(); expect((await call('/me', 'PATCH', { name: 'Attacker', bio: '', roles: ['administrator'] }, user.token)).status).toBe(400);
  });
  it('rate-limits repeated authentication attempts', async () => { for (let i = 0; i < 30; i++) expect((await call('/auth/login', 'POST', {})).status).toBe(400); expect((await call('/auth/login', 'POST', {})).status).toBe(429); });
  it('rejects malformed JSON and oversized bodies without reflecting input', async () => {
    const malformed = await fetch(`${base}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{bad' }); expect(malformed.status).toBe(400);
    expect((await call('/auth/login', 'POST', { password: 'sensitive'.repeat(3000) })).status).toBe(413);
  });
});
describe('independently authorized roles and organization membership', () => {
  it('allows multiple roles but never self-approves privileged roles', async () => {
    const { user, token } = await register('administrator'); expect(user.roles[0]?.state).toBe('requested');
    expect((await call('/admin/roles', 'POST', { userId: user.id, role: 'administrator', decision: 'approved' }, token)).status).toBe(403);
    const added = await call('/me/roles', 'POST', { role: 'student' }, token); expect(added.data.roles).toHaveLength(2); expect(added.data.roles.find((r: { role: string }) => r.role === 'student').state).toBe('approved');
  });
  it('records reviewed role decisions, prevents self-approval, and supports revocation', async () => {
    const admin = await register(); const judge = await register('judge');
    app.db.prepare("INSERT INTO roles VALUES(?,'administrator','approved','reviewed')").run(admin.user.id);
    expect((await call('/admin/roles', 'POST', { userId: judge.user.id, role: 'judge', decision: 'approved' }, admin.token)).data.roles[0].state).toBe('approved');
    expect((await call('/admin/roles', 'POST', { userId: admin.user.id, role: 'founder', decision: 'approved' }, admin.token)).status).toBe(403);
    expect((await call('/admin/roles', 'POST', { userId: judge.user.id, role: 'judge', decision: 'revoked' }, admin.token)).data.roles[0].state).toBe('revoked');
  });
  it('requires a creator role to create a project', async () => { const { token } = await register('investor'); expect((await call('/projects', 'POST', projectData, token)).status).toBe(403); });
  it('organization membership stays separate from private project access', async () => {
    const owner = await register(); const visitor = await register('university_representative'); const p = await draft(owner.token);
    const org = await call('/organizations', 'POST', { name: 'Test University Claim', kind: 'university' }, owner.token); expect(org.data.verification).toBe('unverified');
    expect((await call(`/organizations/${org.data.id}/memberships`, 'POST', {}, visitor.token)).status).toBe(201);
    expect((await call(`/organizations/${org.data.id}/memberships`, 'PATCH', { userId: visitor.user.id, decision: 'approve' }, visitor.token)).status).toBe(403);
    expect((await call(`/organizations/${org.data.id}/memberships`, 'PATCH', { userId: visitor.user.id, decision: 'approve' }, owner.token)).status).toBe(200);
    expect((await call(`/projects/${p.id}/private`, 'GET', undefined, visitor.token)).status).toBe(404);
    expect((await call('/me/organizations', 'GET', undefined, visitor.token)).data[0].membership).toBe('member');
  });
});
describe('publication, discovery and confidentiality', () => {
  it('keeps drafts out of public reads, discovery and another user’s workspace', async () => {
    const owner = await register(); const other = await register(); const p = await draft(owner.token);
    expect((await call(`/projects/${p.id}`)).status).toBe(404);
    const discovery = await call('/projects?q=Permission'); expect(discovery.data).toEqual([]);
    expect((await call('/me/projects', 'GET', undefined, other.token)).data).toEqual([]);
    expect((await call(`/projects/${p.id}/edit`, 'PATCH', projectData, other.token)).status).toBe(404);
  });
  it('never lets admin, investor or verified affiliation bypass ownership', async () => {
    const owner = await register(); const admin = await register('administrator'); const p = await draft(owner.token);
    app.db.prepare("UPDATE roles SET state='approved',verification='reviewed' WHERE user_id=?").run(admin.user.id);
    const denied = await call(`/projects/${p.id}/private`, 'GET', undefined, admin.token); expect(denied.status).toBe(404); expect(JSON.stringify(denied.data)).not.toContain(projectData.privateNotes);
    expect((await call(`/projects/${p.id}/publish`, 'POST', { confirm: true, rightsDeclaration: 'personal' }, admin.token)).status).toBe(404);
  });
  it('publishes only the allowlisted preview and retains reviewed snapshots until republished', async () => {
    const owner = await register(); const p = await draft(owner.token);
    const preview = await call(`/projects/${p.id}/preview`, 'GET', undefined, owner.token);
    expect(preview.data).not.toHaveProperty('privateNotes'); expect(preview.data).not.toHaveProperty('ownerId');
    const published = await publish(p.id, owner.token); const { publishedAt: _previewTime, ...before } = preview.data; const { publishedAt: _actualTime, ...after } = published; expect(after).toEqual(before);
    await call(`/projects/${p.id}/edit`, 'PATCH', { ...projectData, summary: 'This draft revision is deliberately not reviewed or published yet.' }, owner.token);
    expect((await call(`/projects/${p.id}`)).data.summary).toBe(projectData.summary);
    const search = await call('/projects?q=unpublished'); expect(JSON.stringify(search.data)).not.toContain(projectData.privateNotes);
    expect((await call(`/projects/${p.id}/publish`, 'POST', { confirm: true, rightsDeclaration: 'uncertain' }, owner.token)).status).toBe(400);
  });
  it('records real milestone history as self-reported, rejects future achievements', async () => {
    const owner = await register(); const p = await draft(owner.token);
    expect((await call(`/projects/${p.id}/milestones`, 'POST', { title: 'Completed trial', date: '2027-01-01' }, owner.token)).status).toBe(400);
    const result = await call(`/projects/${p.id}/milestones`, 'POST', { title: 'Completed trial', date: '2026-10-29' }, owner.token); expect(result.data.milestones[0].evidence).toBe('self_reported');
  });
  it('persists idempotent watchlists and retracts unpublished projects', async () => {
    const owner = await register(); const follower = await register(); const p = await draft(owner.token); await publish(p.id, owner.token);
    for (let i = 0; i < 2; i++) expect((await call(`/projects/${p.id}/watchlist`, 'POST', {}, follower.token)).status).toBe(200);
    expect((await call('/me/watchlist', 'GET', undefined, follower.token)).data).toHaveLength(1);
    expect((await call('/me/watchlist', 'GET', undefined, owner.token)).data).toHaveLength(0);
    await call(`/projects/${p.id}/unpublish`, 'POST', {}, owner.token);
    expect((await call(`/projects/${p.id}`)).status).toBe(404); expect((await call('/me/watchlist', 'GET', undefined, follower.token)).data).toEqual([]);
  });
});
describe('purpose-bound evidence and collaboration requests', () => {
  async function setup() { const owner = await register(); const requester = await register('investor'); const outsider = await register('judge'); const p = await draft(owner.token); await publish(p.id, owner.token); const evidence = await call(`/projects/${p.id}/evidence`, 'POST', { title: 'Private trial method', content: 'PRIVATE_EVIDENCE_ALPHA must not be public.' }, owner.token); const second = await call(`/projects/${p.id}/evidence`, 'POST', { title: 'Separate prototype note', content: 'PRIVATE_EVIDENCE_BETA for the owner only.' }, owner.token); return { owner, requester, outsider, p, evidence: evidence.data as { id: string }, second: second.data as { id: string } }; }
  it('requires an owner decision and grants only the named evidence note', async () => {
    const { owner, requester, outsider, p, evidence, second } = await setup();
    const request = await call(`/projects/${p.id}/access-requests`, 'POST', { kind: 'evidence', resourceId: evidence.id, purpose: 'Review the supplied trial protocol.' }, requester.token);
    expect((await call(`/projects/${p.id}/access-requests`, 'POST', { kind: 'evidence', resourceId: evidence.id, purpose: 'Review the supplied trial protocol.' }, requester.token)).status).toBe(409);
    expect((await call(`/evidence/${evidence.id}`, 'GET', undefined, requester.token)).status).toBe(404);
    expect((await call(`/access-requests/${request.data.id}`, 'PATCH', { decision: 'approved' }, outsider.token)).status).toBe(404);
    expect((await call(`/access-requests/${request.data.id}`, 'PATCH', { decision: 'approved', expiresInHours: 1 }, owner.token)).status).toBe(200);
    expect((await call(`/evidence/${evidence.id}`, 'GET', undefined, requester.token)).data.content).toContain('PRIVATE_EVIDENCE_ALPHA');
    expect((await call(`/evidence/${second.id}`, 'GET', undefined, requester.token)).status).toBe(404);
    expect((await call(`/projects/${p.id}/private`, 'GET', undefined, requester.token)).status).toBe(404);
    expect((await call(`/evidence/${evidence.id}`, 'GET', undefined, outsider.token)).status).toBe(404);
    clock += 3600_001;
    expect((await call(`/evidence/${evidence.id}`, 'GET', undefined, requester.token)).status).toBe(404);
    expect((await call('/me/requests', 'GET', undefined, requester.token)).data[0].status).toBe('expired');
  });
  it('revokes previously approved evidence access', async () => {
    const { owner, requester, p, evidence } = await setup();
    const request = await call(`/projects/${p.id}/access-requests`, 'POST', { kind: 'evidence', resourceId: evidence.id, purpose: 'Evaluate this specific protocol.' }, requester.token);
    await call(`/access-requests/${request.data.id}`, 'PATCH', { decision: 'approved' }, owner.token);
    await call(`/access-requests/${request.data.id}`, 'PATCH', { decision: 'revoked' }, owner.token);
    expect((await call(`/evidence/${evidence.id}`, 'GET', undefined, requester.token)).status).toBe(404);
  });
  it('connects collaboration requests to founder responses without granting private access', async () => {
    const { owner, requester, outsider, p, evidence } = await setup();
    const request = await call(`/projects/${p.id}/access-requests`, 'POST', { kind: 'collaboration', purpose: 'I can help with field trial design.' }, requester.token);
    expect((await call('/me/requests', 'GET', undefined, outsider.token)).data).toEqual([]);
    await call(`/access-requests/${request.data.id}`, 'PATCH', { decision: 'approved', response: 'Let’s discuss the public trial goals.' }, owner.token);
    expect((await call('/me/requests', 'GET', undefined, requester.token)).data[0].response).toContain('public trial goals');
    expect((await call(`/evidence/${evidence.id}`, 'GET', undefined, requester.token)).status).toBe(404);
    expect((await call(`/access-requests/${request.data.id}`, 'PATCH', { decision: 'approved' }, owner.token)).status).toBe(409);
  });
  it('makes audit history append-only and excludes secrets', async () => {
    const { owner, requester, p, evidence } = await setup(); await call(`/evidence/${evidence.id}`, 'GET', undefined, requester.token);
    const events = await call('/me/audit', 'GET', undefined, owner.token); expect(events.data.some((event: { action: string }) => event.action === 'project.published')).toBe(true);
    expect(JSON.stringify(events.data)).not.toContain(projectData.privateNotes); expect(JSON.stringify(events.data)).not.toContain(owner.token);
    expect(() => app.db.exec("UPDATE audit_events SET action='fake'")).toThrow(/append-only/); expect(() => app.db.exec('DELETE FROM audit_events')).toThrow(/append-only/);
    expect((await call(`/projects/${p.id}/evidence`, 'GET', undefined, requester.token)).status).toBe(404);
  });
});
describe('operation-specific grants', () => {
  it('does not treat an expired, revoked or read-only grant as publish authority', () => {
    const actor = { id: 'collaborator', roles: [] }; const resource = { id: 'project', ownerId: 'owner' };
    const grant: ResourceGrant = { actorId: actor.id, resourceId: resource.id, operation: 'read_private', expiresAt: 100, revoked: false };
    expect(canAccess(actor, resource, 'read_private', [grant], 50)).toBe(true);
    expect(canAccess(actor, resource, 'publish', [grant], 50)).toBe(false);
    expect(canAccess(actor, resource, 'read_private', [grant], 100)).toBe(false);
    expect(canAccess(actor, resource, 'read_private', [{ ...grant, revoked: true }], 50)).toBe(false);
    expect(canAccess(null, resource, 'read_private', [grant], 50)).toBe(false);
  });
});
