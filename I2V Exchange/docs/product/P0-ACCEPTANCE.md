# P0 — Pilot Vertical Slice: Acceptance Contract

## Release hypothesis
If a student can publish a compelling, rights-conscious page in a few minutes, and a relevant external visitor can discover it and request a useful introduction, a university-first network has a reason to exist. A competition pilot should then reuse those same project identities.

## Required screens
1. Public home: authentic-feeling demo assets marked fictional; projects displayed with sector/stage/needs.
2. Explore/search: text + sector/university/stage filters; empty results, error/slow response and pagination.
3. Public project details: shareable URL, real-media slots, accessible captions/alt, founder/team, needs, timeline, controlled contact action.
4. Student onboarding: minimal account, optional university association claim clearly not verified.
5. Project create/edit: private draft, meaningful required fields, cover/demo, privacy review and deliberate publish.
6. Creator dashboard: draft/published projects, basic analytics, pending requests, milestone actions.
7. Introduction workflow: visitor sends constrained message/request; creator can approve, decline, report, block.
8. Admin moderation: report queue, reasoned actions, actor/time audit, appeal path.
9. Competition pilot extension: organizer event + rubric, register existing project, reviewer permissions, stable results and feedback.

## Core data capabilities
- Users and sessions; organization affiliations, teams and role invitations; projects, versions, selected public fields, evidence attachments, media; milestones and change events; contacts and moderation records.
- Server-side authorization for **every** resource; object storage inaccessible except via signed short-lived access on policy-approved requests.
- Mutating actions idempotent or guarded against duplicate delivery; public slugs unique; event times timezone-aware.
- Project ID stable across slug/name changes and across competitions; audit trails append rather than rewrite.

## Critical acceptance examples (Given / When / Then)

### A. Discovery and privacy
- **Given** an anonymous visitor, **when** they browse a published project, **then** they see only explicitly public fields and media.
- **Given** an unpublished project, **when** an anonymous user guesses its ID/slug, **then** response discloses neither content nor private assets; no search suggestion or thumbnail leaks.
- **Given** a draft document uploaded to a project, **when** a founder publishes the *summary*, **then** the document stays restricted unless separately authorized.
- **Given** an author editing a public project, **when** changes are saved as a draft, **then** readers continue seeing the last published version until publish is confirmed.
- **Given** a creator revokes publication, **when** public endpoints/search/cache are called, **then** access is denied or stale content invalidated within a documented target; cached copies cannot be guaranteed erased from third parties.

### B. Collaboration
- **Given** a logged-in visitor, **when** they request contact, **then** the creator receives a request without exposing either party's direct contact info until approved.
- **Given** a blocked user, **when** they try to send further requests, **then** policy denies it; rate-limits apply to all requesters.

### C. Milestones
- **Given** a creator drafts a milestone, **when** it is not published, **then** followers cannot see it.
- **Given** an uploaded milestone attachment, **when** milestone becomes public, **then** attachment visibility remains independently permissioned.
- **Given** founder claim 'prototype independently tested', **when** independent evidence is absent, **then** interface labels it as self-reported, never verified.

### D. Competition pilot
- **Given** submission before deadline, **when** project meets versioned eligibility conditions, **then** application is accepted with receipt and terms version.
- **Given** deadline passed, **when** a late project attempts to apply, **then** application is rejected unless a recorded organizer exception expressly permits it.
- **Given** a judge with declared conflict, **when** they open a conflicted application, **then** scoring is blocked or formally reassigned according to published rules.
- **Given** published rubric, **when** results are calculated, **then** deterministic replay from submissions, scoring events and rubric version produces the same results.
- **Given** project withdraws, **when** other projects remain, **then** historical audit/score events remain preserved with appropriate access controls.

### E. Resilience and experience
- Works at 360px layout, keyboard and mobile touch; users can complete core forms with assistive technology.
- No autoplay of heavy media over cellular by default; drafts preserved on retryable upload failure; upload limits clear in UI.
- Every transition has a loading/empty/error/confirmation state; meaningful analytics events are consent-aware.

## Evidence required for completion
- Screenshots or preview links for responsive views; unit/integration/e2e results and commands; explicit list of denied-access tests; accessibility findings; owner-approved architecture decisions; logs or trace example without secrets; known limitations.

## Exit criterion
One student can privately create -> preview -> publish -> share -> receive an approved introduction, and another can discover the project anonymously, **without any unauthorized leak** in tested paths. Complete workflow takes priority over breadth.
