export const roles = ['student', 'founder', 'researcher', 'mentor', 'investor', 'university_representative', 'judge', 'organizer', 'lab_operator', 'equipment_supplier', 'materials_supplier', 'manufacturer', 'corporation', 'accelerator', 'pilot_host', 'administrator'] as const;
export type Role = typeof roles[number];
export type GrantState = 'requested' | 'approved' | 'rejected' | 'revoked';
export interface RoleGrant { role: Role; state: GrantState; verification: 'self_declared' | 'reviewed'; }
export interface Profile { id: string; name: string; email: string; bio: string; roles: RoleGrant[]; }
export const selfAssignableRoles: readonly Role[] = ['student', 'founder', 'researcher'];
export const sectors = ['Agriculture', 'Climate & energy', 'Health', 'Education', 'Industry', 'Software'] as const;
export type Sector = typeof sectors[number];
export const stages = ['Idea', 'Research', 'Prototype', 'Pilot', 'Growing', 'Graduated'] as const;
export type Stage = typeof stages[number];
export interface Milestone { id: string; title: string; date: string; evidence: 'self_reported' | 'reviewed'; }
export interface PublicProject {
  id: string; title: string; summary: string; sector: Sector; stage: Stage; location: string;
  institution: string; needs: string[]; milestones: Milestone[]; publishedAt: string; fictional: boolean;
}
export interface PrivateProject extends PublicProject { ownerId: string; privateNotes: string; published: boolean; }
export interface Actor { id: string; roles: RoleGrant[]; }
export type Operation = 'read_private' | 'edit' | 'publish' | 'read_evidence';
export interface ResourceGrant { actorId: string; resourceId: string; operation: Operation; expiresAt: number; revoked: boolean; }
export function canAccess(actor: Actor | null, resource: { id: string; ownerId: string }, operation: Operation, grants: ResourceGrant[], now = Date.now()): boolean {
  if (!actor) return false;
  if (actor.id === resource.ownerId) return true;
  // Account verification, admin status and organization affiliation never bypass this boundary.
  return grants.some(g => g.actorId === actor.id && g.resourceId === resource.id && g.operation === operation && !g.revoked && g.expiresAt > now);
}
export function publicProjection(project: PrivateProject): PublicProject {
  return { id: project.id, title: project.title, summary: project.summary, sector: project.sector,
    stage: project.stage, location: project.location, institution: project.institution, needs: project.needs,
    milestones: project.milestones, publishedAt: project.publishedAt, fictional: project.fictional };
}
export interface AccessRequest { id: string; projectId: string; resourceId: string; requesterId: string; requesterName: string; purpose: string; kind: 'collaboration' | 'evidence'; status: 'pending' | 'approved' | 'declined' | 'revoked' | 'expired'; expiresAt: number | null; createdAt: string; response: string; }
export interface Organization { id: string; name: string; kind: string; membership: 'owner' | 'member' | 'requested'; verification: 'unverified' | 'reviewed'; }
export interface AuditEvent { id: string; actorId: string; action: string; resourceId: string; createdAt: string; }
export const progressPolicy = { version: 'documented-milestones-v1', label: 'Documented milestones', description: 'Count of published milestone records. Self-reported progress, not an independent assessment, financial price or investment ranking.' };
export function compareProgress(a: PublicProject, b: PublicProject): number { return b.milestones.length - a.milestones.length || a.title.localeCompare(b.title); }
