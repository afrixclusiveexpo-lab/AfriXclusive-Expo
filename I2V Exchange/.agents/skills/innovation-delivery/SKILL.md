---
name: innovation-delivery
description: Use for repository setup, engineering plans, first MVP build, feature implementation, migrations, pull-request reviews, test strategy, security gating, performance and controlled releases.
---


# Engineering Delivery Workflow

1. Read `PROJECT_STATE.md` and only the relevant feature docs. Inspect existing repository and tests; don't impose a draft stack where working conventions exist.
2. Define user-facing outcome and smallest vertical slice, then list affected modules, permissions, data contract, fallback states, major risks, acceptance tests and any human approval gates.
3. If architecture choice is necessary, use `templates/ADR.md` to compare alternatives; favor a straightforward maintainable modular foundation over infrastructure theater.
4. Implement connected frontend/backend/data and integration tests, **including negative authorization checks** for confidential material and versioned contest terms when affected.
5. Run actual formatting/typecheck/unit/e2e checks that exist; report failures plainly. Mock or seed only explicitly fictional content.
6. Keep staging/prod separate; don't deploy, buy services, send messages, change external accounts or run destructive migrations without explicit authorization.
7. Record completed evidence: paths, tests and results, preview if available, decisions, open issues. Update project docs when product behavior changed.
8. For reviews, highlight concrete defects and file locations first, then suggested fix, distinguishing untested assumptions from observed behavior.

A usable creator -> publish -> discover -> request-introduction flow outranks an impressive but disconnected feature catalogue.

## Full-build engineering and integration-ready delivery (2026-10-29)
- Deliver full destination capabilities in bounded, independently verified vertical slices; **not MVP scope reduction**, and not giant untested bulk changes. Maintain the complete feature roadmap.
- Mobile: Expo/React Native/TypeScript with Expo Go-compatible preview routes and explicit handoff to custom dev builds for native dependencies. Web/admin experiences share a domain model and design language.
- Prefer maintainable modular architecture and provider-port abstractions for auth, storage, AI, research, video, search, payment and communications. Implement real domain rules, local service tests and mock adapters now; later live adapters require integration verification.
- Maintain `INTEGRATION_REGISTRY.md`, `.env.example`, `ACCOUNTS_AND_CREDENTIALS.md` (NO secrets), `FEATURE_REGISTRY.md`, `TESTING_STATUS.md`, `PROJECT_STATE.md`, `DECISION_LOG.md` and `DEPLOYMENT_READINESS.md`.
- Check install/build/typecheck/lint/tests/security invariants. Visual completion, mocked flow, real backend implementation, live connection and production verification are distinct status fields.
- Do not publish, spend, delete, change production permissions, perform regulated transactions, or pretend to run unattended forever. Commit traceable small changes and stop with an evidence-backed next step.
