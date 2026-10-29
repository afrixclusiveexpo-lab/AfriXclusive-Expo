---
name: innovation-integrations
description: Use for delayed external API connection, Expo mock-to-live adapters, service accounts, GitHub workflows, provider selection, environment setup, release readiness and secrets management.
---

# Integration-Ready Architecture Workflow

1. Before adding a vendor, define a typed service port: inputs, outputs, error taxonomy, authorization, idempotency and observability; avoid leaking provider SDKs into domain code.
2. Build **demo adapter**, **local integration test adapter** where feasible and **real adapter scaffold**; annotate provider readiness separately from UI readiness.
3. Maintain `INTEGRATION_REGISTRY.md`: service capability, selected/alternative provider, account owner, docs, permissions, credentials required (names only), mock status, live status, contract tests, cost/rate limits and launch blocker.
4. Centralize server-side keys and secrets; only public non-secret app config may reach Expo. Add `.env.example`, never `.env` secrets. Prevent mock data fallback in production.
5. Include auth, database, storage, signed media, video, research, AI, email/push, analytics, search and moderation interfaces where required. Avoid unused paid dependencies.
6. Implement contract tests now; reserve end-to-end connected tests, billing and provider-specific security review for the integration phase.
7. Provide exact human setup steps, account role and least-privilege credential permissions. Never create accounts, purchase plans or deploy production without explicit authorization.
8. Surface Expo Go versus development-build differences and keep web/mobile shared contracts in sync.

Definition of done: running demo flows, passing contracts, clear missing-credentials failures, no secret leakage and a usable connection checklist.


## New cross-cutting reference (2026-10-29)
For exchange market-style browse/watchlist/rank/compare tasks, use `docs/product/EXCHANGE-EXPERIENCE-AND-RANKINGS-PRD.md`. For sign-up, organizations, multiple roles, labs, resource providers, equipment/material suppliers, manufacturing, quote/booking journeys, use `docs/product/MULTI-ROLE-ONBOARDING-AND-LAB-EXCHANGE-PRD.md`. For complete mobile/web navigation and UX states, consult `docs/design/NAVIGATION-AND-INTERACTION-ACCEPTANCE.md`. Verify relevant negative and positive scenarios from `docs/quality/END-TO-END-RELEASE-MATRIX.md`. Do not let visual completeness substitute for functional completeness. Respect financial authorization boundaries.
