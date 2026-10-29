# Repository guidance — University Innovation Network

## Purpose
Build a Zimbabwe-first, university-centered **innovation discovery and development platform** where students, researchers and early-stage founders showcase real work, maintain a persistent project profile, compete, pitch, complete challenges and connect with opportunities. The name is deliberately TBD. See `docs/product/PRODUCT-NORTH-STAR.md` for positioning and `PROJECT_STATE.md` for decision status.

## Operating rules
1. **Build end-to-end value, not feature theater.** Favor a complete creator-to-discovery journey over dozens of disconnected screens. Prefer real content workflows to decorative charts.
2. **Do not infer approval.** Proposed features, architecture choices, names, brand identity, partner relationships, legal classifications, prizes and budgets are not approved by being in documentation.
3. **Keep the creator in control.** Public summaries must be explicitly published; private source files, lab results, unpublished research, pitch decks and data rooms are deny-by-default. Verify permissions server-side on every access, including previews, search indices, thumbnails and AI retrieval.
4. **Keep claims grounded.** Separate founder-asserted information, reviewer-confirmed achievements, verified credentials and estimated AI insights. Never display unsupported money valuations or imitate a live security price.
5. **Respect real people and institutions.** Fictional seed/demo content must be labeled fictional. Do not use university logos, names as partners, personal details, or judge credentials as if partnerships exist.
6. **Prioritize mobile and limited connectivity.** Fast mobile pages, progressive image loading, no auto-play video by default, resilient upload drafts, accessible interactions, and readable empty/error states.
7. **Security and privacy are product capabilities.** Audit relevant permission changes, practice least privilege, use safe defaults and never place credentials in Git or prompts. Do not treat a SHA-256 hash as proof of legal ownership.
8. **Keep regulated finance separate.** Discovery, introductions, grants, competitions and commercial contracts are distinct from equity transactions. Do not implement live investment execution, custody, tradable units or regulated advisory flows without explicit approval and specialist legal review.
9. **Code to the existing repo.** Inspect relevant code, tests and documents before changes; do not assume a stack from a draft architecture. Maintain modular boundaries. Avoid unrequested dependencies and needless rewrites.
10. **Test the behavior that matters.** For changed flows, test successful journeys, denied access, invalid states, idempotency and error handling; report what was *actually* run. Do not claim security certification or production readiness from unit tests.
11. **Human gates.** Ask for explicit approval before destructive migrations, deleting data, external messages, spending money, production changes, identity-provider setup, publishing projects, activating live recording, sharing secrets or performing regulated transactions.
12. **Close each task with evidence.** State what changed, paths, commands/tests and results, tradeoffs, unresolved risks and the next useful step. No speculative claims of completion.

## Context routing — read only what the task needs
- Product questions: `docs/product/PRODUCT-NORTH-STAR.md`, `FEATURE-UNIVERSE.md`, relevant PRD.
- UX/screens: `docs/design/EXPERIENCE-SYSTEM.md`, `tokens.json`.
- Access/identity/documents: `docs/security/TRUST-MODEL.md`.
- Domain/data: `docs/architecture/TECHNICAL-FOUNDATION.md`, `schemas/`.
- AI: `docs/ai/AI-POLICY.md`.
- Planning: `docs/delivery/PHASES-AND-METRICS.md` and `PROJECT_STATE.md`.
- Competitor or regulatory facts: `docs/research/RESEARCH-PROTOCOL.md`; verify current primary sources.
- Background only: `knowledge/prior-blueprints/`.

## Change discipline
- For a small scoped edit, implement it and verify proportionately.
- For a new feature or security-impacting change, identify the users, invariants, data exposure, acceptance scenarios and test plan before implementation.
- Preserve stable interfaces or document migrations; do not silently rewrite authorized roles, scoring methods, competition criteria or IP terms.
- Treat user-visible copy as part of the product. Make it intelligible to a first-year student as well as a university partner.
- An explicit current user instruction overrides a *proposal* in these docs, but cannot imply permission for unrelated risky operations.


## I2V updated skills and founder mandate (2026-10-29)
Read `CODEX_MASTER_DIRECTIVE.md` and `CURRENT_FOUNDER_DECISIONS.md` first. Nine original skills were materially enhanced and six new domain skills were added. The full international product is the target; deliver verified slices, not an MVP-limited destination. Do not claim independent continuous background operation.

**Skill routing:** `$innovation-research-radar` for proactive technical horizon scanning; `$innovation-graduation` for venture/research/technology graduation and alumni; `$innovation-integrations` for deferred provider connections; `$innovation-global-experience` for original visual identity and international UX; `$innovation-opportunity-exchange` for reverse matching, pilots and labs; `$innovation-quality-gates` for verification and red-team review. Continue using the original nine skills for their relevant domains.

For every significant feature, update `FEATURE_REGISTRY.md`, `INTEGRATION_REGISTRY.md`, `TESTING_STATUS.md`, and `PROJECT_STATE.md` truthfully. Start with a working Expo Go-compatible discovery journey; preserve the planned Expo development-build, web and secure-backend architecture. Distinguish mock functionality from real integrations and real testing.


## Mandatory 2026-10-29 founder cross-check addendum
Before implementing any discovery, account, resource-provider, chart or exchange module, inspect:
`docs/product/EXCHANGE-EXPERIENCE-AND-RANKINGS-PRD.md`, `docs/product/MULTI-ROLE-ONBOARDING-AND-LAB-EXCHANGE-PRD.md`, `docs/design/NAVIGATION-AND-INTERACTION-ACCEPTANCE.md`, and `docs/quality/END-TO-END-RELEASE-MATRIX.md`.
Do not assume creators are the only account type; role-specific provider, lab, supplier, institutional and professional journeys are fundamental. UI needs credible progress-oriented exchange-style dashboards, transparent startup ranking, watchlists and informed comparison. Any future investment dealing requires a separate authorized capability, not a disguised present feature.
