import type { AccessRequest, AuditEvent, Organization, PrivateProject, Profile, PublicProject, Role } from '@i2v/domain';
export class ApiError extends Error { constructor(public status: number, message: string, public fields: { field: string; message: string }[] = []) { super(message); } }
export function createClient(baseUrl: string, getToken: () => string | null = () => null, transport: 'web' | 'mobile' = 'web') {
  async function request<T>(path: string, method = 'GET', body?: unknown): Promise<T> {
    const token = getToken();
    let response: Response;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      response = await fetch(`${baseUrl.replace(/\/$/, '')}${path}`, { method, credentials: transport === 'web' ? 'include' : 'omit', headers: { ...(transport === 'mobile' ? { 'X-I2V-Client': 'mobile' } : {}), ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}), ...(token ? { Authorization: `Bearer ${token}` } : {}) }, ...(body !== undefined ? { body: JSON.stringify(body) } : {}), signal: controller.signal });
    } catch { throw new ApiError(0, 'Connection unavailable. The result could not be confirmed. Check your connection and retry.'); }
    finally { clearTimeout(timer); }
    const data = await response.json();
    if (!response.ok) throw new ApiError(response.status, data.error ?? 'Request failed.', data.fields ?? []);
    return data as T;
  }
  return {
    request,
    projects: (query = '') => request<PublicProject[]>(`/projects${query ? `?${query}` : ''}`),
    project: (id: string) => request<PublicProject>(`/projects/${encodeURIComponent(id)}`),
    me: () => request<Profile>('/me'),
    profile: (name: string, bio: string) => request<Profile>('/me', 'PATCH', { name, bio }),
    register: (data: { name: string; email: string; password: string; role: Role }) => request<{ user: Profile }>('/auth/register', 'POST', data),
    login: (email: string, password: string) => request<{ user: Profile }>('/auth/login', 'POST', { email, password }),
    logout: () => request<{ ok: true }>('/auth/logout', 'POST', {}),
    roles: (role: Role) => request<Profile>('/me/roles', 'POST', { role }),
    myProjects: () => request<PrivateProject[]>('/me/projects'),
    createProject: (data: unknown) => request<PrivateProject>('/projects', 'POST', data),
    editProject: (id: string, data: unknown) => request<PrivateProject>(`/projects/${id}/edit`, 'PATCH', data),
    preview: (id: string) => request<PublicProject>(`/projects/${id}/preview`),
    publish: (id: string, rightsDeclaration: string) => request<PublicProject>(`/projects/${id}/publish`, 'POST', { confirm: true, rightsDeclaration }),
    unpublish: (id: string) => request(`/projects/${id}/unpublish`, 'POST', {}),
    milestone: (id: string, title: string, date: string) => request<PrivateProject>(`/projects/${id}/milestones`, 'POST', { title, date }),
    watchlist: () => request<PublicProject[]>('/me/watchlist'),
    watch: (id: string, save: boolean) => request(`/projects/${id}/watchlist`, save ? 'POST' : 'DELETE', {}),
    requests: () => request<AccessRequest[]>('/me/requests'),
    requestAccess: (id: string, data: { purpose: string; kind: 'collaboration' | 'evidence'; resourceId?: string }) => request<AccessRequest>(`/projects/${id}/access-requests`, 'POST', data),
    decide: (id: string, decision: 'approved' | 'declined' | 'revoked', response = '', expiresInHours = 24) => request<AccessRequest>(`/access-requests/${id}`, 'PATCH', { decision, response, expiresInHours }),
    audit: () => request<AuditEvent[]>('/me/audit'),
    organizations: () => request<Organization[]>('/me/organizations'),
    createOrganization: (name: string, kind: string) => request<Organization>('/organizations', 'POST', { name, kind }),
    evidenceList: (id: string) => request<{ id: string; title: string }[]>(`/projects/${id}/evidence`),
    addEvidence: (id: string, title: string, content: string) => request<{ id: string; title: string }>(`/projects/${id}/evidence`, 'POST', { title, content }),
    evidence: (id: string) => request<{ id: string; title: string; content: string }>(`/evidence/${id}`),
  };
}
