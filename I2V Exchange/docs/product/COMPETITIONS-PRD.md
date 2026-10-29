# PRD — Competition Arena + University Innovation League

**State:** Future-ready full specification; basic version follows core showcase. Every competition reuses existing `project_id` and preserves event history.

## User jobs
- Organizer: publish a fair contest with eligibility, rubric, schedule, judge roles, consent, awards and rules.
- Founder/team: know whether eligible, enter once with an approved project version, track outcome and receive feedback.
- Judge: review only assigned entries, assess against locked criteria, recuse for conflicts.
- Audience: follow public progress and attend approved showcases without obtaining sensitive submissions.
- University: run campus events or join inter-university programmes with measured, normalized outcomes.

## Competition domain
`competition`, `season`, `track`, `round`, `eligibility_rule`, `rules_version`, `prize_terms`, `application`, `application_snapshot`, `judge_assignment`, `conflict_declaration`, `rubric_version`, `criterion`, `score_event`, `result`, `appeal`, `achievement_credential`, `event_session`.

## Lifecycle / state transitions
- Draft -> Review -> Published -> ApplicationsOpen -> ApplicationsClosed -> EligibilityReview -> Judging -> ResultsPending -> ResultsPublished -> Archived.
- Optional rounds: Preliminary -> Semi-final -> Live Pitch -> Final. Advancement requires explicit versioned organizer criteria.
- Suspended/Cancelled paths require reason, notification and public correction statement when event was public.
- A published deadline cannot silently shift; record event history and notify impacted applicants.

## Submission rules
- Applicant selects project and a **snapshot of approved/public or restricted submission fields**; do not leak other project files.
- Consent is scoped to a specific event, rules version, judges' authorized access and retention duration.
- Accept attachments by purpose and classification. Hide unpublished business/technical data from audiences; public project data is a separate consent decision.
- Team ownership and university affiliation claims must not become automatically 'verified' due to entry.
- Support withdrawn applications, edit windows and evidence of submission time.
- Handle late/duplicate submissions with deterministic policy and a visible reason.

## Judging
- Rubric: criterion_id, title, anchored descriptions for minimum/maximum score, weight, scale, applicability and explanation requirements.
- A scoring formula is a versioned deterministic function; store raw scores and criterion-level notes, never only a final number.
- Lock scoring criteria once judging begins; any necessary change triggers logged rerun, communication and potential rejudging.
- Enforce judge assignments, recusal and conflict declarations; judges cannot view or grade unauthorized categories.
- Organizers see calibrated aggregates and outlier/conflict flags, not free reign to rewrite judge scores silently.
- Tie rule set before judging; distinguish judges' result from community-choice vote. Record vote integrity controls and source of eligibility.
- Result corrections via addendum with old/new trace, reason and author; no silent deletion.

## Experience specs
- Competition landing: hero video/image, category/host, deadlines in local timezone + timezone abbreviation, prizes and clear *terms*, eligibility, rubric, entry CTA, current stage, judges (verified status), FAQ and accessibility.
- Entry flow: select project -> verify eligibility -> show what judges will see -> accept rules/IP terms -> upload any extras -> receipt.
- Applicant dashboard: status, remaining tasks, organizer messages, expected decisions, feedback, disputes and event invitations.
- Judge console: assigned submissions, consistent context, private rubric sheet, recusal, save draft, submit immutable score event.
- Organizer console: tracks/stages/schedules, permissioned judge management, conflict review, anonymization where feasible, timeline, communications, export with privacy checks.
- Award profile: achievement references competition/round/track, published result and issuer; revoke/correct with reason.

## University league safeguards
- University participation is opt-in; never imply institutional endorsement without written confirmation.
- Distinguish project count from quality and outcomes; consider normalization by participating eligible cohort.
- Publish metric definitions. Don't compare research, software and industrial prototypes through a single ungrounded 'innovation value'.
- Anti-gaming: duplicate submissions, fake affiliations, purchased votes, bot activity, judge conflicts and prize fraud reporting.

## Monetization hypotheses
Institution event tooling, branded programmes, sponsor analytics, paid organizer support. Do not charge entry fees or promise prizes without approved terms, payment paths and relevant rules.

## Observable acceptance / test vectors
- Entry and attachments limited to configured visibility.
- Judge with conflict cannot score; judge cannot view unrelated track.
- Deadline checks use server time and competition timezone; replay yields same rank.
- Two projects tied trigger published tie-break policy.
- Withdrawal and appeal preserve audit trail, while public pages show current status.
- Recording of a live final is an **independent per-event, per-participant consent decision**.
