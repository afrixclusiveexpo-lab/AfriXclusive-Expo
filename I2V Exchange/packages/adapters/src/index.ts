import type { Profile } from '@i2v/domain';
export interface IdentityProvider { readonly mode: 'local' | 'production'; authenticate(email: string, password: string): Promise<Profile | null>; }
export interface NotificationProvider { readonly mode: 'local' | 'production'; send(recipientId: string, message: string): Promise<void>; }
export interface ResearchProvider { readonly mode: 'demo' | 'production'; research(projectId: string, query: string): Promise<{ text: string; sources: string[]; fictional: boolean }>; }
export function requireLocalMode(mode: string | undefined): void {
  if (mode !== 'local') throw new Error('Only explicitly configured I2V_MODE=local is supported. Production requires reviewed provider adapters; no fallback is permitted.');
}
