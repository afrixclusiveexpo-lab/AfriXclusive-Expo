> **2026-10-30 application engineering:** Runnable source now lives in `apps/` and `packages/`. Start with [GETTING_STARTED.md](GETTING_STARTED.md), [ARCHITECTURE.md](ARCHITECTURE.md), [TESTING_STATUS.md](TESTING_STATUS.md), and [NEXT_ACTIONS.md](NEXT_ACTIONS.md). The starter-pack narrative below is preserved as historical context; its pre-development status and provisional naming are superseded by the dated engineering records and current founder decisions. The full product is still under development.

> **2026-10-29 skills upgrade:** This edition includes **15 revised/new Codex skills** (nine materially expanded, six new) plus integration/quality registries. Earlier ZIPs contained only the original nine; this one supersedes them.

> **2026-10-29 full-product update:** Start with `CODEX_MASTER_DIRECTIVE.md`, `CURRENT_FOUNDER_DECISIONS.md`, and `START_HERE_FULL_BUILD.txt`. They supersede conflicting provisional MVP/name assumptions in older specs.

# University Innovation Network — Codex Project Starter

**Status:** Pre-development specification and reusable agent skills. **Brand name:** undecided. **Pilot geography:** Zimbabwe (not a product restriction). **Audience:** university students and early-stage innovators first; universities, judges, mentors, companies, and investors as complementary participants.

> **One project, one continuing identity, many opportunities.** A student should be able to showcase an invention, update its milestones, compete, pitch before a verified panel, meet collaborators, and progress toward a real pilot or venture without recreating the project each time.

This pack gives Codex a **persistent engineering brief**, **nine task-scoped skills**, **feature PRDs**, **security/AI constraints**, **design guidance**, **schemas/fixtures**, **phase prompts**, and a **validation script**. It is *not* a finished application, a production architecture approval, legal advice, or permission to deploy or accept payments.

## Quick start: where the files go

1. Create a **new private Git repository** for the product. Keep the working name neutral; do not adopt any shortlisted brand by implication.
2. Extract **the contents of this ZIP into the repository root**, retaining the `.agents` directory (some archive tools hide folders beginning with a dot). If you already have files, merge carefully; do not overwrite existing project files automatically.
3. Open the repository folder in Codex (desktop, IDE or CLI). Codex reads root `AGENTS.md`; repository skills live under `.agents/skills/<skill-name>/SKILL.md`. Select a skill by typing `$skill-name` or discover skills using `/skills` in supporting clients. If newly installed skills do not appear, restart Codex.
4. Run `python scripts/validate_pack.py` (Windows: `py scripts/validate_pack.py`) to check included file structure and machine-readable fixtures.
5. Read `PROJECT_STATE.md` and `docs/product/PRODUCT-NORTH-STAR.md`. Then paste the prompt in `prompts/00-FIRST-CODEX-SESSION.md` into Codex.
6. **Do not ask Codex to build every feature in one pass.** Use `prompts/01-FIRST-VERTICAL-SLICE.md` to build the first working end-to-end project showcase once the architecture has been reviewed.

## Project navigation

| Looking for | Open |
|---|---|
| Non-negotiable project guidance | `AGENTS.md` |
| Confirmed vs proposed vs unverified | `PROJECT_STATE.md` |
| Mission, audiences and market differentiation | `docs/product/PRODUCT-NORTH-STAR.md` |
| Entire vision / priority ladder | `docs/product/FEATURE-UNIVERSE.md` |
| Real first release and acceptance tests | `docs/product/P0-ACCEPTANCE.md` |
| Competition / score / awards mechanics | `docs/product/COMPETITIONS-PRD.md` |
| Enterprise and sponsored challenges | `docs/product/CHALLENGES-PRD.md` |
| Live pitching and conferencing | `docs/product/PITCH-ARENA-PRD.md` |
| Product UI strategy and tokens | `docs/design/EXPERIENCE-SYSTEM.md`, `docs/design/tokens.json` |
| Domain, APIs and deployment boundaries | `docs/architecture/TECHNICAL-FOUNDATION.md` |
| Identity, provenance, privacy and IP | `docs/security/TRUST-MODEL.md` |
| AI-assisted analysis / no made-up valuations | `docs/ai/AI-POLICY.md` |
| Roadmap and success criteria | `docs/delivery/PHASES-AND-METRICS.md` |
| Research freshness / competitors | `docs/research/RESEARCH-PROTOCOL.md` |
| Original research / historical vision | `knowledge/prior-blueprints/` (background, not approved architecture) |
| Repeatable agent procedures | `.agents/skills/` |
| Ready-to-send Codex task prompts | `prompts/` |
| Reusable PRD/decision/review templates | `templates/` |
| Example JSON contracts | `schemas/` and `fixtures/` |

## Skill selection

| Skill invocation | Use it for |
|---|---|
| `$innovation-product` | Turn a product idea into validated scope, UX flows and acceptance tests |
| `$innovation-ux` | Create refined accessible interface implementations and interaction states |
| `$innovation-showcase` | Implement public discovery, creator profiles, project pages and progress |
| `$innovation-competitions` | Implement contests, rubrics, results, disputes and achievement records |
| `$innovation-pitch-arena` | Build live pitch workflows, panels, sessions, moderation and recording decisions |
| `$innovation-challenges` | Build sponsored real-world problems, submissions, terms and evaluation |
| `$innovation-trust` | Design/review evidence, controlled disclosure, access rights and abuse resilience |
| `$innovation-ai` | Build scoped AI assistance, evidence-based analysis and evaluations |
| `$innovation-delivery` | Plan/build tested vertical slices; review work and report evidence |

The repository has nine focused skills rather than an enormous all-purpose prompt. Skills load when relevant. Product facts live in project docs, not repeated in every skill.

## First build in one sentence

A student creates a project in private, reviews a safe-to-publish preview, publishes a compelling public project page, adds a milestone, and shares the page so another person can discover it and request a meaningful introduction.

## Explicitly not in the first release

No share trading or investment execution; no invented project price graph; no KYC for casual browsers; no unlicensed escrow; no unsolicited sharing of confidential technical files; no fabricated institutional endorsements; no fully custom streaming infrastructure before verifying event demand.

## Sources / design references

Existing research is preserved in `knowledge/prior-blueprints/`; some claims may become stale and need live re-checks. Codex skill organization and `AGENTS.md` usage follow current official guidance from OpenAI: https://learn.chatgpt.com/docs/build-skills and https://developers.openai.com/cookbook/examples/codex/iterating-development-workflows-with-codex .

**Owner approval gates:** live domains, production data, production deployments, schema destructive changes, payment systems, investment features, legal terms, institutional claims and third-party disclosure of confidential user assets.


## Before you begin: latest founder scope confirmation
This version explicitly strengthens **financial-exchange-inspired startup discovery**, progress rankings, watchlists, chart-based comparisons, **full multi-role onboarding** (including labs, equipment/material suppliers, manufacturers and corporate partners), and required UX/acceptance flows. Read the four newly added PRD/quality documents listed in `CODEX_MASTER_DIRECTIVE.md`. Do **not** confuse this kit with completed Expo application code. Place this kit at the root of a private GitHub repo, then run the start prompt in Codex; follow provider gating and truthfully report implementation status.
