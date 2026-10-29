---
name: innovation-ux
description: Use for UI/UX design, screen specs, frontend components, responsive layouts, design system, interaction copy, competition screens, pitch-room UI and accessibility work in the innovation platform.
---


# High-Craft Experience Workflow

The true hero is a student's actual invention, not generic gradients, fabricated success claims or financial tickers.

1. Read `docs/design/EXPERIENCE-SYSTEM.md`; read `docs/design/tokens.json` if implementing styling. Identify specific screens in scope.
2. Inspect existing front-end components and token conventions before changing anything. Preserve accessible established patterns.
3. Sketch the critical journey with interaction states, role distinctions and the actual one clear primary CTA. Show project stage, proof status, help wanted and real media prominently.
4. Build or specify **mobile-first 360px** to desktop behavior, keyboard interaction, focus, reduced motion, readable contrast, loading/empty/error/permission-denied and reconnection paths. Use low-data behavior where media appears.
5. Make confidentiality visible: unpublished project drafts, competition submissions, judge rubrics and pitch recordings cannot accidentally become discoverable through UI previews.
6. Use 3+ varied **clearly fictional** sample projects if no real permitted content exists. Avoid fake university endorsements/claims, fabricated investor amounts and invented awards.
7. Deliver UI/screens/components, test/preview evidence and an audit of actual usability. For code tasks, run available checks; disclose any gaps.

Prefer restrained but memorable art direction, legible typography, editorial project media and useful product details. Do not design a logo or finalize brand naming unless explicitly requested.

## I2V design signature and craft gates (2026-10-29)
- Build a **human-crafted editorial technology experience**: actual inventions as heroes, varied purposeful compositions, considered typographic hierarchy, tightly controlled components, restrained interactions, no default gradient-glassmorphism-AI aesthetic.
- Explore a coherent token-driven palette (near-black graphite, warm paper, confident cobalt, one energetic event accent) and refine for legibility; support dark and light mode. Tokens must carry semantic roles rather than hard-coded per-screen colors.
- Navigation must be easy enough for first-year students and robust enough for institutional staff: Discover, Arena, Network, Workspace, Exchange; AI Next Move belongs in the personalized home/workspace. Adapt navigation by role, never by arbitrary screen duplication.
- For every major journey, evaluate 360px mobile, typical iPhone viewport, tablet, desktop web, screen reader, keyboard, 200% text scaling, reduced motion, loading, empty, offline, error, denied, and long localized labels.
- Include **realistic fictional testing assets** explicitly labeled demo. Don't fabricate brand marks, university partnerships, judge credentials, investment returns, or real research citations.
- Expo Go is a review surface, not a product architecture limit: use a dev build for native video/conferencing modules. Inspect actual device screenshots or automated visual snapshots before declaring a screen polished.
- Require design critique: contrast/focus, tap target, scroll ergonomics, user confidence, status clarity, safe publishing, and visual consistency. Correct detected defects before 'done'.


## New cross-cutting reference (2026-10-29)
For exchange market-style browse/watchlist/rank/compare tasks, use `docs/product/EXCHANGE-EXPERIENCE-AND-RANKINGS-PRD.md`. For sign-up, organizations, multiple roles, labs, resource providers, equipment/material suppliers, manufacturing, quote/booking journeys, use `docs/product/MULTI-ROLE-ONBOARDING-AND-LAB-EXCHANGE-PRD.md`. For complete mobile/web navigation and UX states, consult `docs/design/NAVIGATION-AND-INTERACTION-ACCEPTANCE.md`. Verify relevant negative and positive scenarios from `docs/quality/END-TO-END-RELEASE-MATRIX.md`. Do not let visual completeness substitute for functional completeness. Respect financial authorization boundaries.
