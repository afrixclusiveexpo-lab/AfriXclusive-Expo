---
name: innovation-quality-gates
description: Use for independent code and design review, full-product QA, Expo device testing, feature completeness audits, red-team testing, readiness assessments and release certification preparation.
---

# Full-Product Quality and Evidence Workflow

1. Read `CODEX_MASTER_DIRECTIVE.md`, `PROJECT_STATE.md`, relevant PRDs and recent commits; establish scope and expected behavior before auditing.
2. Evaluate a *vertical slice*, not screenshot count: frontend → domain → persistence contract → auth decisions → notifications/analytics → recovery paths → tests.
3. Run available format, lint, TypeScript, unit, integration, contract and E2E tests; include permission-denial, concurrency, idempotency, accessibility and offline states where relevant.
4. Compare iPhone Expo Go preview and responsive web; when native SDKs are required, test via development build and mark Expo Go demos as mock.
5. Inspect visual quality: identity, typography, color/contrast, originality, consistent spacing, tap zones, empty states, realistic media, animations and navigation clarity. Fix obvious generic AI-looking patterns.
6. Independently test cross-tenant confidential access, unsafe search snippets, private media leaks, prompt injection, fraud/impersonation, missing evidence and fake financial figures.
7. Classify status precisely: specified, UI-coded, domain-coded, mock-tested, provider-connected, E2E-tested, security-reviewed, operationally approved.
8. Deliver an **evidence table** of tests and findings, exact commands and limitations. Never claim pen-tested, certified, fully complete or deployable without evidence.

Definition of done: verified improvements, unresolved blocker list and truthfully updated registries. Build complete long-term scope incrementally without MVP-only shortcuts.


## New cross-cutting reference (2026-10-29)
For exchange market-style browse/watchlist/rank/compare tasks, use `docs/product/EXCHANGE-EXPERIENCE-AND-RANKINGS-PRD.md`. For sign-up, organizations, multiple roles, labs, resource providers, equipment/material suppliers, manufacturing, quote/booking journeys, use `docs/product/MULTI-ROLE-ONBOARDING-AND-LAB-EXCHANGE-PRD.md`. For complete mobile/web navigation and UX states, consult `docs/design/NAVIGATION-AND-INTERACTION-ACCEPTANCE.md`. Verify relevant negative and positive scenarios from `docs/quality/END-TO-END-RELEASE-MATRIX.md`. Do not let visual completeness substitute for functional completeness. Respect financial authorization boundaries.
