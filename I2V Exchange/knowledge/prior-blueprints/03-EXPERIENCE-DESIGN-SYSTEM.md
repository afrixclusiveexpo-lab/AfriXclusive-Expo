# 03 — UX, Information Architecture and Design Environment
**This is a build-ready design specification, not a finished Figma design or image.** Brand and final aesthetics deliberately unselected.

## Experience goal
A first-time visitor must understand the product in five seconds: **these are real projects built by people; I can explore, follow, share or help them**. A student should be able to publish a safe, attractive profile without knowing venture finance. An investor or industry scout should trust clear claim sources, not visual spectacle.

## Design principles
1. **Show actual work.** Hero image/demo and specific problem/solution beat stock photos, corporate slogans and abstract 3D illustrations.
2. **Zero friction for browsing.** Allow public non-confidential details and web indexing. Prompt account for saves, contact and privileged actions; identity verification for higher-risk access only.
3. **Creator-first language.** “Show what you built” beats “register your investable asset.”
4. **A useful outcome on every page.** Each page has a next action: watch demo, follow, request a pilot, join, submit, update, compare.
5. **Evidence with context.** Label `Founder-reported`, `Verified university affiliation`, `Prototype tested`, `External reference` accurately.
6. **Safe by default.** Explicit consent to publish; never expose confidential files in previews, search indexes, social share cards, AI or analytics.
7. **Low-data mobile-first.** Make rich visuals optional, choose lazy loading and compressed thumbnails, offer text alternatives.
8. **No AI theatre.** AI only appears when it saves meaningful work: upload summarization, discovery filtering, pitch feedback, opportunity matching.
9. **Accessible.** Contrast, keyboard navigation, focus states, captions, screen-reader names, 44px targets and reduced motion support.

## Primary navigation
**Public/mobile:** Discover | Universities | Launches | Opportunities | Events | About. Primary CTA: `Show Your Project`. Secondary CTA: `Join`.
**Signed-in founder:** Home | My Projects | Inbox | Opportunities | Network | Profile.
**Investor/scout:** Discover | Saved | Compare | Requests | Research workspace.
**University admin:** Institution | Projects | Verify | Programmes | Showcase | Insights | Team settings.
**Platform operations:** Trust queue | Claims | Access events | Appeals | Organizations | Metrics | Moderation.

## Screen architecture and requirements

### S01 — Discovery Home (all visitors)
Top: concise statement + one search input; featured verified projects and live project-launch cards. Sections: `New from universities`, `Engineering & Hardware`, `Apps & AI`, `Agritech`, `Research to watch`, `Looking for collaborators`, `Upcoming demo days`. Card fields: thumbnail, project name, single-sentence benefit, stage, institution affiliation indicator, founder/team, tags and one actionable `Explore` button. Explicit paid/sponsored label if sponsorship ever exists.
**Avoid:** fake ticker prices or endlessly scrolling founders with no real work.

### S02 — Explore/Search
Keyword + semantic search, filter by sector, place, university, problem, stage, evidence, support sought, accessibility to demo and last update. Save search; suggest corrected searches; show empty-state opportunity to browse adjacent tags. Public listings include only allowed fields.

### S03 — Project Detail (the flagship)
A shareable, search-visible page with three tiers:
- Top: hero, 15-second value statement, institution status, stage, maker portraits (opt-in), concise CTA bar.
- Middle: demo, problem/solution, evidence-based milestones, team, who can help, latest update, impact/test references.
- Lower: permitted documents, related projects, comments/questions (moderated), project history, contact request.
**No “$2M AI valuation” banner.** Detailed financing data belongs behind professional gated interfaces if appropriately sourced.

### S04 — Founder Project Creation
Progressive wizard with autosave and import options. File uploads private by default. Warnings before any public details. Before launch show a split preview `What visitors see` versus `Private materials`. Accessibility hints and minimum required fields. Enable `publish teaser only` if sensitive.

### S05 — Personal Creator Dashboard
My projects, profile completeness, pending introductions, progress updates, relevant opportunities, profile reach segmented by *meaningful categories* and reminders. No emphasis on raw likes as proxy for financial value.

### S06 — Activity/Launch Feed
Only substantive updates: prototype completed, demo, test results, partner seeking, milestone, accelerator selection, launch, collaboration. Allow topical following and institutional streams. Evidence tags, responsible posting and anti-spam checks.

### S07 — University Profile
Verified university identity and public-safe landing. Hero + programs + opt-in projects by faculty/lab + current challenges + innovation staff contacts + events + successful outcomes (only verified and consented). Department pages as nested views. Offer editable presentation for institutional brand.

### S08 — University Innovation Console
Cohort intake, affiliation attestations, publication approvals where institution has a lawful role, teams, demo-day and programme tools, contact requests, consent-based reports and role permissions. Campus cannot automatically read private student work.

### S09 — Investor/Industry Explorer
Power filters, watchlists, comparisons on *like-for-like evidence*, stage-specific documents, relevance explanation, founder intro workflow, deal notes visible only to investor team. No regulated investment placement by default.

### S10 — Opportunity Finder
Cards for grants, pitch competitions, mentors, manufacturers, corporate challenges, accelerator programmes and pilot contracts. Fields: organizer, verified source, deadline/timezone, geography, eligibility, required materials, application destination. Label `externally hosted` versus `apply here` distinctly; confirm fresh deadlines.

### S11 — Request and Collaboration Inbox
Structured request types, user verification indicators, plain-English purpose, availability slots, acceptance/decline, conversation history, report/block, data-room access requests and secure expiration settings. Expose identities at appropriate consent points.

### S12 — Project Passport/History
Persistent record ID, allowed milestone history, version time, proof-of-submission metadata, evidence sources and disclosure history. Show 'This record documents platform submissions; it does not establish IP ownership.' Admin audit view is separate from public view.

### S13 — Demo Day / Exposition
Event landing, institution, date, tracks, exhibitors, searchable booths, live/demo schedules, judge/mentor areas, QR project linking, sponsor labelling and safe visitor counts.

### S14 — Project Compare & Progress
Three-way comparisons for same sector/stage, evidence freshness and actual milestones. Radar/DNA graphic optional and clearly explained, not universal 'best startup' scoreboard. Progress line charts should measure *real events or structured scores*, never invented share prices.

### S15 — AI Project Studio (later)
Doc/report → extracted claims → editable project profile + investor-style pitch + suggested gaps. Source references alongside every material claim. Founders approve before publishing; default documents are private and external-model transmission is disclosed and governed.

### S16 — Innovation Map (later)
Explore country, city and verified participating institutions. Small-cell suppression / optional coarse location for individuals; do not map precise student homes. Provide accessible list view equivalent.

## Low-fidelity layout A — Home
```text
┌───────────────────────────────────────────────────────────────────────┐
│ LOGO            Discover  Universities  Opportunities  Events    JOIN │
├───────────────────────────────────────────────────────────────────────┤
│ REAL IDEAS. REAL BUILDERS. REAL OPPORTUNITIES.                       │
│ Discover startups and inventions emerging from our universities.    │
│ [ Search projects, problems, technology or university... ] [Search]  │
│ [ Explore innovations ]                         [ Show your project ]│
├───────────────────────────────────────────────────────────────────────┤
│ New from university builders                          View all →      │
│ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐        │
│ │ [ REAL PHOTO ]   │ │ [ DEVICE DEMO ]  │ │ [ PRODUCT UI ]   │        │
│ │ Solar ColdChain  │ │ Mobility Sensor  │ │ FarmLink         │        │
│ │ Prototype • UZ   │ │ Tested • NUST    │ │ MVP • HIT        │        │
│ │ Pilot partners → │ │ Engineering help→│ │ Early adopters→ │        │
│ └──────────────────┘ └──────────────────┘ └──────────────────┘        │
├───────────────────────────────────────────────────────────────────────┤
│ Browse by problem: Agriculture • Energy • Health • Transport • AI    │
│ University demo days   |   Featured maker story  |   Active challenges│
└───────────────────────────────────────────────────────────────────────┘
```
*Projects are invented examples used to illustrate layout, not claims about actual organizations.*

## Low-fidelity layout B — Project details
```text
┌───────────────────────────────────────────────────────────────────────┐
│ Home / Energy / Solar ColdChain                                      │
│ [Image/video of working prototype]   Solar ColdChain                 │
│                                      Affordable solar cold storage    │
│                                      for produce cooperatives        │
│                                      Prototype • Campus association  │
│                                      Seeking: pilot farm + engineer  │
│                                      [Request a demo] [Follow] [Share]│
├───────────────────────────────────────────────────────────────────────┤
│ What problem? | How it works (public-safe) | Why it matters          │
│ Build log: 2026 demo → 2027 test → pilot planned                     │
│ Evidence: founder reported | tested at partner facility (if verified)│
│ Team • Needs • News • Related projects                               │
│ Restricted documentation: [Request permission]                      │
└───────────────────────────────────────────────────────────────────────┘
```

## Low-fidelity layout C — Creator workspace
```text
MY PROJECTS                                      [+ Show what you built]
Your published project: Solar ColdChain          Visibility: teaser
Project strength: 6/8 essentials complete        [Improve profile]
Relevant interest: 3 qualified demo requests     [Respond]
Progress: 2 updates this month                   [Add milestone]
New opportunities: 2 agriculture challenges      [Check eligibility]
Safety: 1 file unpublished pending IP decision   [Review privacy]
```

## Style system — suggested, not a finished brand identity
- **Composition:** editorial minimalism + professional research portal, avoiding crypto-terminal visual language.
- **Color roles:** neutral ink/white surfaces, one accessible energetic primary, restrained success/warning/status colors; no color-only distinctions. Choose actual palette in visual accessibility testing, not before branding.
- **Type:** readable contemporary sans-serif, clearly differentiated editorial headlines, numerical labels in tabular figures.
- **Spacing:** 4/8px rhythm; major cards with consistent baseline; generous whitespace on desktop, tighter mobile with no density loss in critical info.
- **Media:** founder-supplied genuine demos prioritized; image optimization, posters, captions and opt-in video load.
- **Grid:** 12 columns desktop, 8 tablet, 4 mobile; max ~1200px content width with comfortable line length.
- **Microinteractions:** autosave indicator, permission notices, request status, verified-with-date tooltip, reduced-motion alternative.
- **Empty state:** teach with actual safe examples and 'start with your report/photo' paths.
- **Trust signals:** provenance and affiliation separate; never blend into a 'verified invention' badge.

## Search and ranking UX
Sort options: relevance (default), recently launched, recently updated, evidence-supported, most saved, looking for collaborators. Do not algorithmically bury novel early-stage projects merely because they have no followers or funding. Add diverse exploration and 'new innovators' rotation. Sponsored placements must be labeled, not mixed secretly into objective rankings.

## Design acceptance tests
- Can a visitor find 3 relevant projects in under a minute from mobile data?
- Can a student publish a safe teaser without granting AI access to private source code?
- Can an investor tell self-reported from independently attested evidence at a glance?
- Can an institution restrict its staff to approved projects and consented data?
- Is every project card legible with image disabled and on 320px devices?
- Does permission revocation stop future file access at server level, not just hide a button?
