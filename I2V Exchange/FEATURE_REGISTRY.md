# I2V Feature Implementation Registry

## 2026-10-30 engineering increment

The historical pending table below is preserved. This table supersedes it only for the explicitly implemented foundation; the entire destination scope remains approved.

| Feature | Current implementation | Evidence / limits |
|---|---|---|
| Application foundation | Expo mobile, responsive React web, local Node API, shared TypeScript workspaces | ADR 0001; verification results in TESTING_STATUS |
| Local accounts / sessions | Registration, sign-in, scrypt hashing, opaque revocable sessions; web HttpOnly cookie / native SecureStore | Local provider only; no verified email, passkeys, MFA or recovery |
| Multiple roles / organizations | Separate role decisions, organization claims and membership API | No automatic identity verification or private-project access; review UI incomplete |
| Discovery / project showcases | Public snapshot search/filter, project details, private creation/editing, explicit preview/publication/withdrawal | Fictional seeded projects labeled; production SEO/search/media pending |
| Project progress | Completed self-reported milestone records, timelines, count-based sorting and comparison | Not a verified ranking or financial metric; versioned full ranking system pending |
| Watchlists | User-scoped persistent save/remove; retracted projects excluded | Notifications/folders pending |
| Networking | Collaboration request, founder response/approval/decline/revoke and requester inbox | No external messages; blocking/reporting/professional profiles pending |
| Controlled disclosure | Private text evidence notes, exact-resource requests, purpose, expiry/revocation, audit | Web authoring; mobile reading/decisions; uploads/object storage/passport history pending |
| Initial design system | Shared light/dark tokens, five-destination navigation, responsive layouts, concept SVGs | Actual screenshot/device/accessibility evidence must be recorded; no certification |
| Next Move | Deterministic workspace-state suggestion | Clearly labeled rule-based; external research/AI pending |
| Arena / provider exchange | Navigation and role onboarding; explicit implementation-status views | Competition, scoring, conferencing, supplier listings, quotations and booking are not implemented |
| All other full-product families | Preserved specs and ordered NEXT_ACTIONS | Graduation, research intelligence, institutional systems and authorized capital remain pending |

Acceptance scenarios and tests: QUALITY_GATES; `tests/authorization.test.ts`, `tests/persistence.test.ts`, `tests/design.test.ts`, `tests/e2e/journeys.spec.ts`. Test source presence is not proof of execution; consult TESTING_STATUS.

The full destination scope is approved as a **target**, not claimed implemented.

| Feature family | Spec | UI | Domain | Mock integration | Real provider | Tests | Security review | Notes |
|---|---|---|---|---|---|---|---|---|
| Discover/project showcases | Historical specification | Pending | Pending | Pending | Pending | Pending | Pending | One persistent project ID |
| University hubs | Historical specification | Pending | Pending | Pending | Pending | Pending | Pending | No fake affiliation |
| Arena/competitions/challenges | Historical specification | Pending | Pending | Pending | Pending | Pending | Pending | Judge fairness |
| Networking/mentoring | Historical specification | Pending | Pending | Pending | Pending | Pending | Pending | Contact consent |
| I2V Intelligence/Next Move | Current direction | Pending | Pending | Pending | Pending | Pending | Pending | Cited research |
| Reverse exchange/pilot/lab | Current direction | Pending | Pending | Pending | Pending | Pending | Pending | Partner validation |
| Passport/graduation/alumni | Current direction | Pending | Pending | Pending | Pending | Pending | Pending | Longitudinal truthfulness |
| Capital readiness | Future conditional | Pending | Pending | Pending | Pending | Pending | Pending | Regulated functions gated |


| Exchange-grade discovery/rankings/watchlists | `docs/product/EXCHANGE-EXPERIENCE-AND-RANKINGS-PRD.md` | Pending | Pending | Pending | Pending | Pending | Pending | Performance measures must cite sources; no fake trading |
| One-account multi-role onboarding | `docs/product/MULTI-ROLE-ONBOARDING-AND-LAB-EXCHANGE-PRD.md` | Pending | Pending | Pending | Pending | Pending | Pending | Role-specific journeys, least privilege |
| Lab/equipment/materials providers | `docs/product/MULTI-ROLE-ONBOARDING-AND-LAB-EXCHANGE-PRD.md` | Pending | Pending | Pending | Pending | Pending | Pending | Listing/quotes/bookings, verification and safety |
| Future authorized share-investment journey | `docs/product/EXCHANGE-EXPERIENCE-AND-RANKINGS-PRD.md` | Pending | Pending | Pending | Pending | Pending | Pending | Completely disabled pending explicit authorization |
