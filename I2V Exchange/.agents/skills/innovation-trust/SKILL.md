---
name: innovation-trust
description: Use for authorization design or security review, idea/IP protection, identity verification, confidential data rooms, project version hashes, auditing, dispute resolution, privacy, moderation and safe publication.
---


# Trust and Access Review Workflow

1. Read `docs/security/TRUST-MODEL.md` and affected domain PRD. Inspect data flows, objects, logs, caches, search and AI retrieval—not merely UI.
2. State assets, authorized users/actions, public/limited/private/secret classification, and exactly what protection is promised. **Hash != ownership**; membership date != access proof.
3. Draw the authorization matrix and enumerate misuse cases (IDOR, cross-project leakage, old collaborator, fake judge/university, social preview, private replay, sponsor harvesting proposal IP).
4. Review server checks, storage policy, derivatives, signed URLs, audit events, revocation, retention and incident processes; separate identity verification from access grants.
5. For project contributions, note university/employer/team claims and third-party rights; do not adjudicate ownership or write definitive legal advice.
6. Create negative tests exercising anonymous, legitimate creator, collaborator, judge, sponsor, institution and privileged admin pathways.
7. Produce findings by severity, impact, reproduction/evidence, remediation and residual risk. Implement changes only within approved task scope; seek review for material legal/security decisions.
8. Do not declare compliance, certification or legal clearance without independent evidence.

For regulated investment or cross-border legal questions, seek current official materials and qualified professional review rather than treating old docs as settled law.

## Trust and legal-control invariants (2026-10-29)
- Treat founders' project materials as valuable: deny-by-default private assets, RBAC/ABAC server-side enforcement, signed URL expiry, tenant isolation, versioned evidence and auditable access decisions.
- SHA-256 and timestamps provide integrity/provenance signals but do **not** establish legal ownership, patent priority, confidentiality or infringement.
- Public preview never leaks unreleased research, patents, code, CAD, attachments, face/ID documents, investor-only materials or private pitch recordings, including through search embeddings or AI retrieval.
- Require ownership and contributor declarations, consent, data-retention policies, access revocation, dispute reporting, suspension/appeals, secure incident handling and jurisdictional review.
- Separate UI demos from real security: tests must attempt unauthorized access by role, project, organization, malformed link and direct API call. Never mark mock auth as production auth.
- Keep any investment listing/custody/settlement inactive until authorized structures, partners and specialist review exist.
