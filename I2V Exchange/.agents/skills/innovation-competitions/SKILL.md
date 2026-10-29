---
name: innovation-competitions
description: Use when the task involves university competitions, innovation leagues, entry submission, eligibility, judges, scorecards, multi-round brackets, leaderboards, awards, results corrections or appeals.
---


# Competition Engine Workflow

1. Read `docs/product/COMPETITIONS-PRD.md`, `docs/product/PRODUCT-NORTH-STAR.md` and relevant legal/privacy constraints in `docs/security/TRUST-MODEL.md`.
2. Define organizer, student/team, judge, moderator, attendee roles; the actual entry is a versioned snapshot of an existing project.
3. Specify the state machine with allowed actions and events. Deadlines/timezones, eligibility, terms/IP, judging rubric and tie handling must be published before evaluation.
4. Determine confidential vs public parts of every submission. Assign judges individually; enforce conflict declarations and recusals before scoring.
5. Make scoring replayable from versioned rubric and append-only score events; separate community-choice popularity from technical/jury results.
6. Award badges only when an authorized event result supports them; correction/revocation leaves recorded explanation.
7. Include failure/abuse scenarios: late entry, duplicate, unassigned judge, sponsor/edit rule change, prize dispute, withdrawn entry, score ties, bot votes.
8. For implementation, add automated unit + permission/integration tests and verify deterministic results. Publish honest completion report; never fabricate university involvement or promised prizes.

Avoid building a full league administration system before a real single-contest flow is proven.

## International-grade competitive programming (2026-10-29)
- Support leagues, campus contests, build battles, demo days, seasonal championships and standalone submissions with reusable *canonical project* profiles.
- Model organizer roles, eligibility, application windows, time zones, team rosters, category rules, rubrics, conflict-of-interest declarations, appeals, prize terms, and consented publication.
- Separate merit judging from audience-choice voting. Scores must be attributable, immutable after finalization except versioned corrections, reviewable and not fabricated.
- Build organizer/judge/competitor interfaces for web and mobile; prioritize reliable queues, deadline timekeeping and recovery after disconnect.
- Demonstrate full end-to-end journey: discovery → apply → submit → validate → assign judge → score → review → announce → award → reflect on project Passport.
- Instrument fairness: disqualification procedure, judge recusal, ties, plagiarism claims, category-specific rubrics, accessibility accommodations, and translated/low-data submission paths.
