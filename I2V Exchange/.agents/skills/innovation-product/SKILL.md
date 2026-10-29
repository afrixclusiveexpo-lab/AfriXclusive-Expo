---
name: innovation-product
description: Use for feature strategy, prioritization, scope, creator journeys, feature audits, user stories, product requirements and acceptance tests for the university innovation platform. Not a general business naming skill.
---


# Product Strategy Workflow

Treat the creator-to-opportunity journey as the main product, with investors and institutions as important supporting participants.

1. Locate the relevant decision status in `../../../PROJECT_STATE.md` (resolve relative to repo root if your host uses a different working directory). Read `docs/product/PRODUCT-NORTH-STAR.md` and only the feature PRD involved.
2. Restate **who has a job**, their initial situation, the desired real-world outcome and the minimum usable workflow. Challenge feature requests that optimize empty engagement or duplicate work without improving outcomes.
3. Classify scope as confirmed, recommended or hypothesis. Do not imply prizes, partners or revenue are committed.
4. Write a PRD using `templates/PRD.md`: persona, jobs, flows, public/private information, states, anti-abuse, success metrics, dependencies, tradeoffs and explicit non-goals.
5. Slice into minimum valid experience, subsequent extensions and long-horizon ideas. Require reuse of `project_id` across events/competitions/challenges.
6. Include 5–10 observable scenarios, **at least two denial/failure cases**, responsive expectations and unresolved questions requiring real user research.
7. Give an implementation-ready handoff, not arbitrary high-level enthusiasm; do not modify source code unless requested.

For market or regulatory claims, follow `docs/research/RESEARCH-PROTOCOL.md` and confirm current authoritative sources before relying on them.

## Full-product mandate (2026-10-29)
- Treat **I2V Exchange** as a full destination product, not an MVP-limited startup listing app. Work in tested increments without removing the long-term modules from the roadmap.
- Center university students and emerging inventors; support researchers, independent builders, mentors, judges, corporate scouts, investors, and university administrators with role-specific journeys.
- Product loop: **Discover → Showcase → Connect → Compete/Pitch → Validate → Develop → Commercialize/Graduate → Give Back**. Every feature must strengthen a credible user outcome.
- When expanding a feature, specify its user job, core journey, authorization boundaries, non-happy paths, evidence requirements, instrumentation, acceptance tests, and dependency on a real provider versus demo adapter.
- Adopt improvements proactively when clearly justified; record alternatives and rationale. No arbitrary new social features, dubious valuation scores, or faux exchange market quotes.
- Distinguish investor introductions from equity transactions and licensed exchange operations. Reserve regulated mechanisms for approved future integrations.
- Update `FEATURE_REGISTRY.md` and `PROJECT_STATE.md` with *coded, mock-integrated, provider-integrated, tested* states rather than a single misleading percentage.


## New cross-cutting reference (2026-10-29)
For exchange market-style browse/watchlist/rank/compare tasks, use `docs/product/EXCHANGE-EXPERIENCE-AND-RANKINGS-PRD.md`. For sign-up, organizations, multiple roles, labs, resource providers, equipment/material suppliers, manufacturing, quote/booking journeys, use `docs/product/MULTI-ROLE-ONBOARDING-AND-LAB-EXCHANGE-PRD.md`. For complete mobile/web navigation and UX states, consult `docs/design/NAVIGATION-AND-INTERACTION-ACCEPTANCE.md`. Verify relevant negative and positive scenarios from `docs/quality/END-TO-END-RELEASE-MATRIX.md`. Do not let visual completeness substitute for functional completeness. Respect financial authorization boundaries.
