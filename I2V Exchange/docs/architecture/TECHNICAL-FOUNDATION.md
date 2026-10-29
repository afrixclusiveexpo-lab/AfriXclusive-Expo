# Technical Foundation — Decision-Ready, Not Vendor-Locked

## Status
**Candidate architecture, not adopted stack.** Codex should inspect the actual repository and evaluate alternatives before adding dependencies. Preserve migration options and avoid premature microservices.

## First release architecture shape
Responsive web app -> authenticated API/application layer -> relational database for identities/projects/roles/events -> private/public object storage with explicit authorization -> search index of **published** representations -> background jobs -> observability.

Candidate implementation: TypeScript for shared contracts; React/Next.js or comparable SSR-friendly frontend; Postgres as transactional relational source; object storage with short-lived signed URL after server authorization; queue/outbox for searchable projection and notifications; optionally managed video later. Supabase/Firebase/GCP/Cloudflare/etc. are options, **not committed accounts or vendors**.

### Modular domains (within a modular monolith at first)
- Identity, organization affiliations and role grants.
- Creators, teams, projects and project publication.
- Media/document/evidence store with independently controlled visibility.
- Milestones, project history and trust/credential claims.
- Discovery search/read models and follow feed.
- Requests/messaging, blocking/moderation.
- Competition applications/rubrics/scores/results.
- Challenges/sponsors/terms/submissions.
- Event/pitch sessions, invited panel, media vendor adapters and consent.
- AI orchestration behind authorization + provenance layers.
- Reporting, audit events and institution administration.

## Invariants
- `project_id` stable and opaque; `slug` mutable; any public projection contains *only* approved fields.
- `organization_affiliation.claimed` is not `organization_affiliation.verified`.
- `milestone.author_reported` is not `milestone.independently_verified`.
- Team membership != company equity, and university affiliation != rights ownership.
- No project-specific confidential object can be inferred from image preview, search index, logs, analytics, webhook or AI prompt.
- Authorization is checked on resource (not only route/menu) for reads and writes; role-specific scopes are explicit.
- Append audit records for security-sensitive actions, preserve corrections; audit logs themselves restricted.
- Competition rubric and submission terms are versioned; result replay is deterministic.
- Strong uniqueness/idempotency of event deliveries/score submissions/introduction requests where applicable.
- User-visible server times use timezone-aware storage and event-local rendering.

## Suggested normalized data entities
`users`, `profiles`, `organizations`, `organization_claims`, `team_memberships`, `projects`, `project_revisions`, `publication_snapshots`, `media_assets`, `media_permissions`, `evidence_items`, `provenance_events`, `milestones`, `milestone_evidence`, `claims`, `verification_events`, `contact_requests`, `follows`, `moderation_cases`, `competitions`, `rules_versions`, `applications`, `rubrics`, `judge_assignments`, `score_events`, `awards`, `challenges`, `challenge_submissions`, `pitch_events`, `panel_memberships`, `recording_consents`, `notifications`, `audit_events`.

See JSON examples in `schemas/` and `fixtures/`. They are **illustrative API contracts**, not a comprehensive database design or claims of legally compliant implementation.

## Authorization sketch (do not use as production code)
1. Resolve actor and authenticated session or anonymous public context.
2. Resolve resource and its current visibility policy.
3. Evaluate actor's explicit role/grants, relationship, expiry and purpose for this resource and operation.
4. Deny by default, including derivatives/previews, caching, exports, search, LLM retrieval.
5. On an authorized file request, issue a short-lived scoped access URL and audit when justified.
6. Do not allow a broad 'verified user' status to bypass owner-controlled private access.

## Publication pipeline
Private draft -> check required fields/ownership disclosure -> author previews **exact public serialization** -> explicit publish transaction -> outbox event -> public read model / search projection -> CDN invalidation for changes -> audit. Delete/revoke triggers retraction workflow and propagation checks; accept that downstream third-party caches cannot be completely controlled.

## AI architecture
Request -> authentication/consent -> per-user/per-project retrieval policy -> sanitization and untrusted-source boundaries -> chosen model provider -> claim-linked output (if analytical) -> validation/human review for publication -> audit and cost/latency monitoring. Do not treat model output as project facts without origin and verification.

## Observability
Track errors, P95 latency, upload success, time-to-publication, moderation turnaround, search freshness, signed-file access rejects, critical workflow steps, event join/reconnect, and AI costs. Minimize personally identifying or sensitive content in logs; use request IDs for traceability.

## Engineering workflow
- Choose stack via `templates/ADR.md` with tradeoffs, cost tiers, maintenance, security, portability and developer feasibility.
- Use CI for typecheck/lint/unit/integration/e2e tests once runtime exists; keep coverage targeted to risks.
- Local/staging/prod separated; migrations reviewed for access effects; test backups and restoration before critical launches.
- Avoid unmanaged parallel feature branches causing conflicting migrations; manage feature flags for partially integrated modules.

## Not to implement prematurely
Blockchain for ordinary provenance; homegrown KYC identity verification; own video call stack; complex microservices; complex ML rankers with no training data; securities trading rails; 'proof of ownership' badges; tokenized startup shares.
