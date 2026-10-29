# PRD — Live Pitch Arena, Panels and Virtual Conferences

**State:** Flagship P1. Do not assume custom video infrastructure is necessary. Build a tightly integrated *product experience* over an approved conferencing vendor after evaluating low bandwidth, pricing, moderation, privacy and data residency.

## Signature promise
A student pitches a real project from their own profile to a selected panel, receives actionable evaluation, and carries the outcome back into their persistent startup history. A pitch is **not** a public disclosure of all project data.

## Three modes (must remain distinct)
| Mode | Audience | Purpose | Recording default |
|---|---|---|---|
| Practice | Founder / explicitly invited mentors / optional AI coach | Rehearse | Off |
| Private panel | Approved reviewers and invited observers | Expert feedback or due diligence | Off |
| Public competition | Published event audience + panel, subject to organizer/participant approval | Live competition | Off unless separately opted in |

## Actors
- **Host/organizer:** schedules event, manages speaker order and session access, appoints moderator.
- **Moderator:** admits participants, switches presenters, timeboxes, manages Q&A, escalates abuse.
- **Presenter/team:** controls authorized slides/demo and responds to questions; can preview what is shared.
- **Judge:** views permitted briefs and submits private criterion-level scores; can declare conflicts.
- **Audience:** watches approved presentation, asks moderated questions, follows public project and requests controlled introductions.
- **Technical support:** may troubleshoot connectivity but must not implicitly access confidential judging notes or private files.

## State machine
Draft -> Scheduled -> Preflight -> Lobby -> Live -> QAndA -> Evaluation -> Completed -> PublishedSummary -> Archived. Add Cancelled, Interrupted, ReconnectWaiting and Aborted with reason. `session_id` is separate from `project_id`.

## Data contracts
`pitch_event`, `session`, `panel_membership`, `presentation_slot`, `slide_asset`, `visibility_policy`, `attendance`, `qa_submission`, `moderation_action`, `judge_score`, `replay_consent`, `recording_asset`, `followup_request`, `session_event`.

## Required UX / meeting room
- Desktop: presentation stage primary; panel portraits small; moderator queue/timer; tabbed Q&A, project details, schedule; clear **private vs public** indicator.
- Mobile: stage first, collapsible information, audio-only setting, low-bandwidth slides, accessible Q&A and obvious exit.
- Founder preflight: microphone/camera permissions, test slides, bandwidth estimate, rehearsed file fallback, check audience/recording permissions, consent reminders.
- Host: invite and assign verified judges, arrange slots, specify pitch/Q&A durations, mute/kick/ban/report, stage failover.
- Judges: score sheet accessible only to authorized judges; save local draft/retry, prevent score leakage before publishing, conflict recusal.
- Audience: submit questions to moderator queue, follow project, request meeting—no backdoor to restricted data.
- After session: feedback summary, consented replay, documented interest requests, next actions and project milestone link.

## Network and reliability
- Presenter fallback: audio + uploaded slide deck; host can advance slides on their behalf.
- Degraded network: adaptive bitrate, reconnection indication, grace period, moderator hand-off.
- Viewers: no required camera/mic, captions/transcripts where appropriate, data-saving mode, never force autoplay on mobile.
- Failure handling: if disconnected during pitch, timer policy should pause or continue per **published event rules**; record incident, make outcome contestable.
- Test on simulated 3G/poor Wi-Fi and low-end devices; measure join success, time-to-first-media, reconnect success and abandonment.

## Recording / IP policy
- Recording **off by default**. Organizer desire to record does not bypass presenter/institution rights.
- Separate consent for recording, replay distribution and AI transcription/analysis; visible live recording indication; defined retention and revocation rules.
- Signed replay links and access policies; no indexed private replays, no transcription in third-party AI without authorized processing agreements.
- Watermarking may deter sharing but does not stop screenshots/capture; do not claim otherwise.
- Scope any NDA to allowed participants; a public audience cannot be assumed to have signed a confidentiality agreement.

## Fair judging + commercial follow-up
- Preserve rubric version and score events; audience popularity and jury scores are distinct channels.
- Judges cannot solicit IP disclosure outside authorized permissions.
- Investor 'interest' means follow-up request, **not** a funding commitment or investment transaction.
- After event, show CTA for practical next step: book meeting, join pilot, refer mentor, share approved demo.

## Core acceptance
1. Approved presenter can enter and show authorized deck, panel can judge, audience sees only approved stage and project summary.
2. Unauthorized viewer cannot open private link; replays and cached slides obey separate policies.
3. Recording cannot start without configured, auditable consent and visible notice.
4. Network loss triggers documented fallback; duplicate score submission remains idempotent.
5. A pitch result appears on project history only under appropriate publication policy.
6. Accessible controls, keyboard focus order, captions option, readable mobile layout.

## Validation gates before vendor selection
Live provider SLA, participant caps, price per attendee-minute, recording residency, encryption, server-side token capabilities, audit/consent support, mobile bandwidth behavior and exit/migration plan.
