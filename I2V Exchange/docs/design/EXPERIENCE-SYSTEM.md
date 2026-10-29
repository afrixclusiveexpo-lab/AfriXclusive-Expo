# Experience System — A Distinctive University Innovation Product

## Art direction
**Real inventions are the visual heroes.** Think editorial product storytelling, not a copy of Bloomberg or generic startup landing-page gradients. The interaction quality should feel contemporary, but the evidence/trust cues should be understated and precise.

Brand is not approved. Use a **temporary design language**, interchangeable through tokens. Do not write invented brand backstories or copy university logos. Demo projects, institutions and founder images must be clearly identified as fictional placeholders.

## Design principles
1. **Show, don't just claim:** authentic media slot above abstract scores. Rich typography around problem, prototype, latest progress, who can help.
2. **Make action obvious:** relevant request demo, enter competition, apply to challenge, pitch, follow, connect; not dozens of competing CTAs.
3. **Make evidence legible:** small status chips with tooltip or detail explaining *who confirmed what*.
4. **Build for return visits:** useful personal feed shows updates, application status, challenge deadlines, pitch invitations and mentor replies.
5. **Respect context:** 360px width and intermittent connection are ordinary target conditions; no hover-only controls or forced video playback.
6. **Earn trust through the interface:** correct institution labels, clear challenge rights, disclosure preview, submitted timestamp, visible moderation.
7. **Motion supports understanding:** modest transition durations, skeletons and state changes; honor reduced-motion; never hide errors behind polish.

## Core information architecture
- **Discover**: Feed of projects, trending sectors (with transparent basis), search, university pages, event highlights.
- **Compete**: Competitions, categories, league seasons, my entries, judge workspace (role-gated).
- **Challenges**: Sponsor briefs, eligibility, submissions, saved challenges and application stages.
- **Events**: Pitch Arena, demo days, office hours, calendars and replay permissions.
- **Opportunities**: Grants/accelerators/mentors/partners, personalized but explainable matching.
- **Workspace**: My projects, milestones, media/evidence, inbox, roles and privacy.
- **Institution**: Organization pages and authorized administration, available by role.

Mobile navigation may condense to Discover / Compete / Challenges / Inbox / Profile, with other flows available through a clear menu.

## Screen contracts
| ID | Screen | Hero composition | Primary action | Distinct states |
|---|---|---|---|---|
| D01 | Discovery home | Featured prototype demo and editorial projects grid | Explore projects | guest, personalized, empty |
| D02 | Project card | genuine hero thumbnail + need + stage + milestone | View project | media missing, verified claim |
| D03 | Project detail | visual cover, demo, story, timeline, team, needs | Request introduction | public/private subsets |
| D04 | Creator workspace | project health, meaningful progress and pending asks | Add milestone | no projects, incomplete |
| D05 | Create/edit project | guided sections with disclosure preview | Publish safely | autosave, offline error |
| D06 | Competition arena | eligibility, rules, prize terms, stages, teams | Enter competition | open/closed/waitlist |
| D07 | Entry builder | reuse approved project + event-specific attachment | Submit entry | eligibility fail, late |
| D08 | Judge console | focused entry review + fixed rubric | Submit score | COI, scoring locked |
| D09 | Challenge brief | real sponsor, outcomes, rewards, IP terms | Apply / propose | sponsor unverified, closed |
| D10 | Pitch arena | stage and media dominant; panel and timing subordinate | Pitch/watch/score | low bandwidth, reconnect |
| D11 | University profile | real public demos + verified institutional content | Explore projects | official/unofficial |
| D12 | Opportunity finder | relevant programmes, match reasons | Save/apply | no eligibility evidence |
| D13 | Request inbox | decision, sender context, privacy cues | Approve/decline | reported, expired |
| D14 | Innovation passport | project identity & credible history | Inspect evidence | founder claimed/reviewed |
| D15 | Mentor office hours | real expert profile, clear terms, calendar | Request session | slots full, cancelled |
| D16 | Event replay | consented playback, project follow-on actions | Connect | revoked/restricted |

## Component inventory
`ProjectCard`, `ProjectStageBadge`, `ClaimStatusBadge`, `ProofDrawer`, `ProjectTimeline`, `NeedChip`, `DeadlineClock`, `EligibilityChecklist`, `RubricScoreInput`, `PitchStage`, `ModeratorQueue`, `DisclosurePreview`, `FileVisibilityRow`, `UniversityAffiliation`, `IntroRequestDialog`, `ChallengeIPTerms`, `AchievementCredential`, `ActivityEmptyState`, `DataSaverControl`.

### Component states are part of the design
For every interactive element design normal, hover (where present), focus-visible, disabled, loading, optimistic/reverting, error, success and permission denied. Design error recovery, not merely attractive screenshots.

## Key layout notes
### D01 Home
Warm editorial headline; featured build with authentic prototype image; rich mixed media project grid; discovery by university, sector and stage; 'upcoming live pitches' strip; low-data toggle; no fabricated monetary ticker.

### D03 Project
**Upper third:** strong media + 2-line mission and stage/verification label. **Middle:** demo, problem, build evidence, milestones. **Sidebar or mobile anchored CTA:** what's needed + safe contact. **Lower:** team, competitions, questions, approved documentation. Preview shows precisely what is public.

### D10 Pitch Arena
Large media stage; discreet timer; current project link; panel list, moderator Q&A and judge pane separated by auth; compact low-bandwidth alternative. Use color/motion for state but not as sole indicator. Record indicator always prominent when active.

## Design tokens
`docs/design/tokens.json` is an illustrative *implementation-ready* starting palette and spacing system, **not an approved logo/brand**. Before production: run contrast checks for actual component pairings, multiple vision modes and light/dark themes. High color contrast targets should satisfy WCAG 2.2 AA or relevant applicable requirements.

## Product writing tone
Simple, precise and human: "Show what you've built", "Who could help?", "Only invited judges can view this file", "University affiliation: self-declared", "This estimate is not a valuation". Avoid exaggerated claims about becoming a millionaire, raising funding or IP theft immunity.

## Fidelity definition
An experience is not considered polished because it has an attractive hero. Review *real* responsive states, text wrapping, project media ratios, latency, accessibility, input errors, permissions, form drafts and deep links. Demonstrate with 3 fictional projects of different types and maturity, not the same repeated gradient card.
