# Delivery Map — Vertical Slices, Proof and Decision Gates

**Horizon:** a multi-year platform vision is acceptable; **every stage should deliver demonstrable user value and validation evidence**, not only architecture diagrams. Numbers here are measurement suggestions, not forecasts.

## Phase 0 — Validate the first experience (discovery/market)
- Interview/observe students across project types, 2–3 universities as *prospects*, event organizers and industry discoverers.
- Prototype low/data and rich-media project pages with permissions. Test whether students want to publish and others want to interact.
- Decide minimum stack and privacy posture with ADRs; pick small real team constraints.
- Gate: evidence creators will submit authorized projects AND at least some outside participants want relevant follow-ups.

## Phase 1 — Launchable student showcase slice (P0)
- Public discovery + student profile + private create/publish + milestones + controlled intro.
- Base security, organization claims, moderation, observability, consent, mobile performance.
- Gate: end-to-end acceptance in `P0-ACCEPTANCE.md`, pilot creator completion and intro events.

## Phase 2 — Event engine, first real competition
- Event listing, eligibility, project snapshot submission, basic judge rubric, results/appeal, persistent achievement.
- Pilot with one **confirmed** organizer; never claim official partnership prematurely.
- Gate: organizers complete an event with clear scoring audit and student feedback.

## Phase 3 — Live pitch, sponsored challenge and mentorship
- Preflight/live panel/moderation with conferencing vendor; low-bandwidth fallback; scoring/feedback; recording consent.
- Verified sponsor challenge rules/IP and submission workflows; mentor scheduling.
- Gate: real authorized live sessions operate without rights leaks or major access failures; commercial interest evidenced by repeat sponsor participation.

## Phase 4 — Institutional workspace + intelligence
- University portfolio views and technology-transfer pathways; advanced search; evidence-based AI coach and matching.
- Scale moderation, audit, multi-country privacy and stronger analytics.
- Gate: institutions actively manage approved projects and choose to renew/collaborate.

## Phase 5 — Multi-market and specialized commercial services
- Hybrids/expos/league seasons, research technology licensing pathways, specialist data rooms and sponsor programmes.
- No regulated investments without separate explicit legal, product and operating approval.

## Outcome metrics to instrument early
1. Creator activation: % of onboarded creators with useful, knowingly public, non-placeholder project.
2. Project comprehension: can a new viewer correctly explain prototype/stage/needs after reading page?
3. Qualified introductions: consented requests accepted and acted on; no emphasis on vanity impressions.
4. Competition participation: started vs completed valid entries; judge response time; appeal rate/outcomes.
5. Challenge conversion: technical shortlists -> testing/pilot/contract discussions (only confirmed status).
6. Retention with meaning: active projects progressing, new milestones and returning institutional partners.
7. Trust: accidental publish reversals, unauthorized-access incidents, moderation turnaround, security tests.
8. Technical: public P75 mobile Core Web Vitals where relevant, upload completion, search freshness, video join/reconnect.

## Risk and readiness matrix
| Risk | Early mitigation | Gate |
|---|---|---|
| Empty marketplace | Curated pilot projects with creator consent | Enough real high-quality project content |
| Vanity metrics replace opportunities | Optimize request/outcome steps | Qualified follow-up evidence |
| Fake affiliations | Claims vs verified badges | Verified workflows and dispute path |
| IP exposure | Explicit disclosure review and private by default | Negative privacy tests |
| Prize/competition disputes | Locked terms/rubrics, COI recusal, appeals | Judge audit replay |
| Video too expensive/unreliable | Integrate vendor, fallback, pilot event | Real network test |
| Costly AI hallucination | Evidence-based outputs and staged rollout | Eval suite |
| Unlicensed finance | Separate regulated scope | Legal authorization + specialist partners |

## Delivery cadence
Prefer one meaningful vertical slice per approved work item. Each slice has: goal, permission model, screens/states, data contract, unit/integration/e2e tests, feature flag (where useful), staging demo and operational notes. For serious risk surfaces, require targeted independent review rather than generic 'enterprise-grade' adjectives.
