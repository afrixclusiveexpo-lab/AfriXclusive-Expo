import { z } from 'zod';
import { roles, sectors, stages } from '@i2v/domain';
export const email = z.email().max(254).transform(v => v.trim().toLowerCase());
export const registration = z.object({ email, password: z.string().min(12).max(128), name: z.string().trim().min(2).max(80), role: z.enum(roles) }).strict();
export const login = z.object({ email, password: z.string().min(1).max(128) }).strict();
export const profileUpdate = z.object({ name: z.string().trim().min(2).max(80), bio: z.string().trim().max(500) }).strict();
export const roleRequest = z.object({ role: z.enum(roles) }).strict();
export const projectInput = z.object({
  title: z.string().trim().min(3).max(100), summary: z.string().trim().min(30).max(1200),
  sector: z.enum(sectors), stage: z.enum(stages), location: z.string().trim().min(2).max(100),
  institution: z.string().trim().max(120).default(''), needs: z.array(z.string().trim().min(2).max(80)).max(6).default([]),
  privateNotes: z.string().max(5000).default(''),
}).strict();
export const publication = z.object({ confirm: z.literal(true), rightsDeclaration: z.enum(['personal', 'team', 'institution', 'joint', 'uncertain']) }).strict().refine(v => v.rightsDeclaration !== 'uncertain', { message: 'Resolve ownership uncertainty before publishing.' });
export const milestoneInput = z.object({ title: z.string().trim().min(4).max(160), date: z.iso.date() }).strict();
export const accessInput = z.object({ purpose: z.string().trim().min(10).max(1000), kind: z.enum(['collaboration', 'evidence']), resourceId: z.uuid().optional() }).strict().refine(v => v.kind !== 'evidence' || Boolean(v.resourceId), { message: 'Name the specific evidence resource requested.' });
export const accessDecision = z.object({ decision: z.enum(['approved', 'declined', 'revoked']), response: z.string().trim().max(1000).default(''), expiresInHours: z.number().int().min(1).max(168).default(24) }).strict();
export const organizationInput = z.object({ name: z.string().trim().min(3).max(120), kind: z.enum(['university', 'lab', 'supplier', 'manufacturer', 'corporation', 'accelerator', 'other']) }).strict();
export const memberInput = z.object({ userId: z.uuid(), decision: z.enum(['approve', 'revoke']) }).strict();
export const roleDecision = z.object({ userId: z.uuid(), role: z.enum(roles), decision: z.enum(['approved', 'rejected', 'revoked']) }).strict();
export const evidenceInput = z.object({ title: z.string().trim().min(3).max(100), content: z.string().trim().min(10).max(5000) }).strict();
