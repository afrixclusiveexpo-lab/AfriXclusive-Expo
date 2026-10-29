# Testing Status — Evidence-Based Only

## Application foundation verification — 2026-10-30

Environment: Windows, Node 24.16.0, npm 11.13.0, isolated `feat/application-foundation` checkout. PowerShell's script policy blocks `npm.ps1`; commands use `npm.cmd` without changing that policy.

| Check | Actual state |
|---|---|
| `python scripts/validate_pack.py` | PASS: all fifteen skills, required documents, JSON assets and policy-example invariants. Optional full `jsonschema` validation was not available. This is starter-pack validation only. |
| `node --experimental-transform-types --check apps/api/src/app.ts` | PASS: API TypeScript syntax parser check; does not resolve imports or replace type checking. |
| Dependency installation | In progress; registry responses are slow and intermittent. React DOM type range was pinned to the Expo-compatible React 19.1 line after an observed peer-resolution failure. |
| TypeScript / ESLint / Vitest / web build | Pending installed dependencies. Do not infer passing status from source presence. |
| Playwright desktop / mobile-web journeys | Authored; not executed yet. Browser installation and dependencies pending. |
| Expo native export / dependency compatibility | Pending dependencies. |
| Physical iPhone / human usability / screen reader / production integration | Not performed. |

Negative test source covers role self-approval, cross-user drafts, private-public projection, admin/organization privacy bypass, cookie Origin checks, session expiry/logout, malformed/oversized requests, exact evidence scope/expiry/revocation, founder-only decisions, audit restrictions and local-mode production refusal. Results must be updated after actual execution.

For each implemented component record: version/commit, tested behavior, command, result, device/browser, role and negative-test scenarios. Distinguish code review, automated tests, manual device testing, provider E2E tests and third-party security assessment.

Initial status: no application build verified by this starter kit. Codex must update this with evidence after actual execution.
