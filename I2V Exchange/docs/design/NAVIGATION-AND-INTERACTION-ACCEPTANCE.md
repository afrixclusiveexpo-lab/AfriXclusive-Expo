# Navigation, Interaction and International Product Design — Acceptance Contract

## Aim
Make every surface feel conceived by one elite product team, not stitched together from prompts or UI templates. Source of truth: task-focused navigation, consistent page behavior, premium typography and accessible controls. No fake innovation imagery represented as real. Maintain original brand exploration until approved.

## Global information architecture
**Mobile bottom bar** ideally no more than 5 primary destinations: `Discover` / `Arena` / `Network` / `Workspace` / `Exchange`. Global search accessible from key surfaces; universal Inbox/Notifications and profile in predictable locations. Deep features appear as contextual destinations, not top-level overload. **Exchange** holds sourcing/pilots/challenges/commercial opportunities, and potentially clearly marked future authorized capital functionality. Arena holds competitions, leagues, pitch panels, conferences. Workspace holds project management, next move, intelligence, passport, milestones. Network includes people, mentors, teams, university communities.

**Desktop/web:** comfortable large-screen layout with sticky but unobtrusive section navigation; variable-density tables/charts for market-like browsing, side-by-side compare, multi-pane panels for judging and live events. Mobile layouts prioritize single clear CTA, bottom sheets, accessible filter drawers and fast images. Persist intentional route state for back navigation and deep links.

## First-run usability scenarios
1. Guest discovers a project and browses a public founder profile with no registration wall.
2. Student signs up, chooses to build, creates a private project, previews public information, publishes, and shares link.
3. Engineer joins without a startup and finds an available team role, university competition and an innovation challenge.
4. Lab manager joins as provider, verifies affiliation, lists a testing facility, receives booking inquiry and replies.
5. Equipment/materials supplier joins, lists available products/services, updates stock/availability, gets request, sends quote; shows disabled checkout until real payments exist.
6. Manufacturer joins, posts a pilot capability and selects relevant public projects to invite.
7. Judge accepts invitation, declares conflicts, reviews assigned entry, submits locked scoring, sees event result when published.
8. Professional investor creates interest profile, saves project watchlist, requests authorized diligence; sees no live investment purchase CTA without an approved provider.
9. Founder sees leaderboard, opens detail chart and can tell *exactly what the metric means* and whether data is verified.
10. Founder graduates; history is preserved in public alumni page where authorized, with later follow-up updates.

## Human-crafted design system
- Create at least two internally evaluated directions before selecting semantic colors; default consideration ink/off-white/cobalt with one controlled warm energy accent. Contrast and color-blind modes checked; no purple gradient/AI aesthetic.
- Use authored visual hierarchy: genuine project hero imagery, editorial competition storytelling, stage labels, badges with precise meaning, crisp and adaptive charts, compact filters, small purposeful microinteractions.
- Component system includes: `MetricWithSource`, `StagePill`, `VerificationDisclosure`, `ProjectStoryCard`, `WatchlistAction`, `RankedListItem`, `RoleSwitcher`, `OrganizationClaim`, `ResourceListingCard`, `FacilityBookingSheet`, `SupplierQuoteComposer`, `CompetitionStageTracker`, `PitchCountdown`, `JudgeScoreForm`, `NextMoveCard`, `AccessRequestPanel`.
- WCAG 2.2 AA where applicable; screen reader accessible chart summaries, visible focus, support dynamic fonts, 44px mobile touch targets where appropriate, reduced-motion and translated text expansion.
- Always show navigation states: new/returning/guest, empty/error/loading/offline/retry, denied permissions, expired invite, verification pending, no search results, canceled booking, stale data.

## UX acceptance criteria
- No more than one unexpected redirect in a first meaningful action.
- Account creation has clear way to skip optional details, save progress and return later.
- Critical actions are explicit about what will become public, who can view private data and how to revoke future access.
- Rankings and charts load in low data mode with accessible text fallback; no missing axis labeling or mysterious badges.
- Under poor network, users have a path to retry, recover drafts or receive clear status rather than a dead screen.
- A visitor can understand difference between following a startup and investing in it; demo market interfaces do not pretend to transact.
- Full application has a consistent set of font, spacing, iconography, error states and interaction feedback on mobile/web.
- Run usability tests with students, researchers, lab providers and professional discoverers; log evidence and refine. This is not replaced by an agent asserting interface is 'intuitive'.
