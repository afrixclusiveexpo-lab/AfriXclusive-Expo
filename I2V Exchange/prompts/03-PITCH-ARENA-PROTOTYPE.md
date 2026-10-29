# Copy into Codex — Pitch Arena Stage 1 (UI and Workflow)

Use `$innovation-pitch-arena` and `$innovation-ux`. Build a **high-fidelity, interactive, responsive prototype** of a live pitching room, grounded in `docs/product/PITCH-ARENA-PRD.md`. This stage is UI/workflow and fake-event state simulation only; do not imply functioning real conferencing without an approved integration.

Create three modes: practice, private invited panel and public competition. Present a large pitch stage, project info, moderator speaking queue, synchronized countdown simulation, slide fallback, judge-only scoring, moderated questions, connection-status indicators and recording OFF by default. Include mobile 360px and poor-connectivity states, error/reconnect, keyboard controls and visible room confidentiality labels.

Role-scope the data and components; no judge scores in audience client bundles. Use clearly fictional presenters and events. Include visual comparisons of normal / audio+slides / reconnecting / recording-with-consent states.

Deliver code+tests and a separate integration requirements note comparing vendor adapter constraints, without provisioning a paid video service. Explain which behaviors are only simulated and where server enforcement will be required.
