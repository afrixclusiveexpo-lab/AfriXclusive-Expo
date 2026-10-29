---
name: innovation-showcase
description: Use when implementing or reviewing founder profiles, public project pages, media, search, publication, milestones, project identity, creator onboarding and introduction requests in the university innovation platform.
---


# Showcase / Living Project Workflow

1. Read `docs/product/SHOWCASE-PRD.md`, `docs/product/P0-ACCEPTANCE.md`; for data/auth read `docs/security/TRUST-MODEL.md` and `docs/architecture/TECHNICAL-FOUNDATION.md`.
2. Identify the full flow: student starts **private** -> documents project -> previews exact public representation -> deliberately publishes -> visitor discovers -> requests introduction -> student decides -> progress continues.
3. Preserve immutable opaque `project_id` distinct from public slug; project should remain linked through milestones, events and changed names.
4. Implement explicit server-controlled publication per field/media/document; anonymous and signed-in unauthorized actors must see only approved public projection. No direct object storage leaks.
5. Represent status carefully: project stage may be self-declared; independent achievements need explicit trusted issuers. University affiliation claims are not official affiliation verification.
6. Implement user-relevant pending/error/empty states and data-saving media. Verify search, social previews, cached thumbnails and feed agree with current publication state.
7. Write negative authorization tests and exercise `schemas/project.schema.json` and `schemas/milestone.schema.json` example shapes where relevant; adapt contracts to established repository conventions and record any change.
8. Report which real workflows were verified, including privacy failures tested.

Do not replace this flow with a social feed, investor ticker or AI-generated valuation dashboard.

## Full-lifecycle showcase invariants (2026-10-29)
- One canonical `project_id` persists across creator profiles, university exhibitions, competitions, pitch events, research missions, pilots, commercialization, graduation, and alumni outcomes.
- Project creation must support idea-stage creators and advanced teams. Do not require incorporation, investment, or monetary valuation to publish an approved safe summary.
- Use permission tiers: public teaser, registered interaction, explicit controlled access, confidential review; never unlock confidential data simply because a visitor registered or verified identity.
- Include real project media, honest maturity indicators, needs/asks, actionable CTAs, progress timeline, evidence origin, attribution, team ownership declarations, and differentiation between founder-claimed and verified milestones.
- Support graceful outcomes: paused, pivoted, archived, graduated, commercialized/licensed, no longer operating. Preserve permitted history, avoid implying closed companies remain active.
- Ship meaningful search/filter/sort, shareable URLs, accessible layouts and mobile low-bandwidth behavior; test permission bypass via thumbnails, indexes, CDN, preview URLs and APIs.


## New cross-cutting reference (2026-10-29)
For exchange market-style browse/watchlist/rank/compare tasks, use `docs/product/EXCHANGE-EXPERIENCE-AND-RANKINGS-PRD.md`. For sign-up, organizations, multiple roles, labs, resource providers, equipment/material suppliers, manufacturing, quote/booking journeys, use `docs/product/MULTI-ROLE-ONBOARDING-AND-LAB-EXCHANGE-PRD.md`. For complete mobile/web navigation and UX states, consult `docs/design/NAVIGATION-AND-INTERACTION-ACCEPTANCE.md`. Verify relevant negative and positive scenarios from `docs/quality/END-TO-END-RELEASE-MATRIX.md`. Do not let visual completeness substitute for functional completeness. Respect financial authorization boundaries.
