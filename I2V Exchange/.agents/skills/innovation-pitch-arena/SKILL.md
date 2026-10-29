---
name: innovation-pitch-arena
description: Use for live startup pitching, investor or judge panels, online conference sessions, pitch timers, Q&A, video integration, recording consent, low-bandwidth presenter fallback and pitch feedback.
---


# Live Pitch Arena Workflow

1. Read `docs/product/PITCH-ARENA-PRD.md`, then competition rubric docs only if it is a judged event.
2. Clarify one of three modes: **practice**, **private panel**, **public competition**. Each has different access and recording expectations.
3. Build the workflow around event identity, speaker slots, invited panel, audience policy, moderator queue, slides, countdown, Q&A, score submission and after-event next action.
4. Treat media-provider details as an adapter behind authorization; evaluate pricing/bandwidth/security before making a vendor commitment. Prefer proven integrations to custom real-time transport.
5. Default recording/transcription OFF. Require clear participant authorization, active notice, retention rules and separate replay visibility. A public event cannot promise NDA-style confidentiality.
6. Design degraded paths: host-managed uploaded slides, audio-only, reconnect, timeout/incident policy and accessible captions options.
7. Make panel scores private until official release; sponsor and judges see only authorized project materials. Interested viewer's CTA is a **follow-up request**, not an investment commitment.
8. Test unauthorized join, replay URL leak, consent withdrawal policy, network failure, duplicate score and moderator absence; report integration limits.

If the task is only a mockup, implement realistic UI states without implying that the actual conference runs.

## Pitch Arena + conference-grade delivery (2026-10-29)
- Three operating modes: AI-assisted private practice, invitation-only panel, moderated public/restricted competition. Explicitly mark simulated rooms in Expo Go demos.
- Build state machines for event scheduling, presenter queue, backstage check, moderator permissions, participant roles, session timer, Q&A, judging, feedback and opt-in follow-up.
- Use provider-neutral conferencing abstractions; plan realistic native constraints, development builds, real-time state sync, reconnection, captions and recording consent. Expo Go mock UI is NOT a verified video conference.
- Restrict access to unpublished pitches, judge notes, private feeds and recordings with server-side authorization and expiry. Don't expose confidential decks to audience accounts.
- Test host disconnect, timer drift, late presenter, judge recusal, concurrent score submission, no-audio fallback, consent revocation and failed uploads.
- The project page is always one click away; approved competitions update the persistent Passport with proper verification status.
