# 05 — Durable Knowledge Base, Evidence Graph and Engineering Data Model

## Why a knowledge base matters
The product's power must not come from an LLM pretending to know every startup. It should come from a **reliable, permissioned dataset** that stores the project's self-reported facts, evidence, reviewer assessments, public history and institutional affiliations with provenance. AI helps structure/search/summarize that underlying data, never quietly fabricates it.

## Source taxonomy
- **First party — user provided:** project description, team list, upload, self-reported metrics, signed declarations.
- **Institution attestation:** university staff directly confirms affiliation or a specific fact, with status expiry.
- **Third party public:** patents, publications, websites, validated accelerator results, press and official registers.
- **Independent review:** specific claims assessed by qualified authorized reviewers; methodology and review scope visible.
- **Model-generated:** translations, summaries, relevance estimates, recommendations; never use as original evidence without a source.
- **Unknown/unverified:** fields may exist as hypotheses but cannot be presented as established facts.

## Main graph entities (proposed relational core)
**Person:** immutable ID, contact channels, display profile, identity assurance level, privacy choices.  
**Organization:** university, lab, company, fund, accelerator, sponsor, ministry, partner; type, roles and verification.  
**Affiliation:** person↔organization, self-claim or attested, start/end, verifier, permissions.  
**Project:** immutable ID, title, public summary, private description, sector, stage, status, tags, visibility.  
**ProjectMember:** person↔project, roles, membership start/end, invite acceptance, rights declaration reference.  
**ProjectOrganization:** project↔university/funder/company with relationship type and evidence.  
**ProjectVersion:** version ID, author, event time, content hash, diff/snapshot, release visibility.  
**Asset:** document/media/code reference, object storage key, content hash, media type, rights/access scope.  
**EvidenceItem:** claim supported, evidence type, uploaded_by, source reference, authenticity status, safe disclosure.  
**Claim:** statement, target project, source status, context/time, issuer, review status and citations.  
**Review:** reviewer credentials, scope, rubric, timestamp, conflicts of interest, findings.  
**Milestone:** event type, date, description, evidence references, current status.  
**Opportunity:** sponsor, eligibility, geography, dates, prize/offer terms, authoritative URL and last verified time.  
**Application:** project↔opportunity, status, submitted fields, consent, timestamps.  
**AccessGrant:** approved viewer, asset or data-room scope, purpose, authorizer, expiry and revocation.  
**AccessEvent:** view/download/attempt with version, actor, time, IP/device metadata retained proportionately.  
**Introduction:** initiator, recipient, project, request type, text, workflow status and outcome.  
**Event/Showcase:** organizer, cohort, project memberships, public schedule, QR identifiers.  
**ModerationCase:** allegations, affected material, actions, appeals, independent review history.  
**AuditEvent:** privileged changes, actor, reason, timestamp and previous state evidence.

## Separate identity, project facts and IP rights
A person may be identity-verified but lie about traction. A legitimate graduate can submit work the university owns. A file hash may establish what bytes were present but does not prove authorship. A validated company registration does not validate a research conclusion. Model these as distinct facets; never one magical `verified=true` boolean.

## Suggested claim record
```json
{
  "id": "claim_001",
  "project_id": "proj_ABC",
  "field": "prototype_field_tested",
  "value": "Test completed at two locations",
  "asserted_by": "user_123",
  "asserted_at": "2026-10-01T11:20:00Z",
  "status": "founder_reported",
  "evidence_refs": ["asset_test_summary_45"],
  "reviewed_by": null,
  "visibility": "public_safe",
  "source_note": "Uploaded by founder, not independently validated",
  "valid_until": null
}
```
This is illustrative, not an external claim or final schema.

## Knowledge-base organization
**Public discovery index:** only public-safe project profiles, approved thumbnails, searchable tags, public organization pages and non-confidential milestone summaries.  
**Member-private relational store:** founders, saved projects, invitations, internal notes, intro messages, private drafts.  
**Restricted evidence vault:** confidential documents, legal records, private financial data, owner declarations, approved access grants.  
**Derived AI index:** embeddings ONLY for documents specifically permitted for semantic indexing, with tenant/asset ACL enforced at query AND retrieval time. Public and restricted indexes should not be blended.  
**Research reference registry:** external sources, fetched time, license/usage restrictions, URL, excerpt, update date, confidence/reliability.  
**Event/audit log:** security-relevant immutable or tamper-evident trail with independent retention controls.

## Publishing pipeline
`Private draft → safety screening → founder controls → human preview → publish event → search index update → CDN/share metadata generation → optional institution collection`.
Public teaser content must be separately materialized/sanitized from private full text; never just 'hide sections in browser CSS'. Revoke/delete propagation is required for search, CDN, media links and downstream replicas as legally and technically feasible.

## Evidence quality and uncertainty
- Every claim needs a provenance status and timestamp.
- Financial/traction figures should include period, metric definition, source and verification state.
- External source changes should trigger `needs_refresh`, not silent retention of outdated facts.
- University authorization should state exact scope (enrollment, employment, programme acceptance, prototype test) and review date.
- Strong claims about invention novelty, patents or legal ownership require external documentation and professional review; never auto-certify.

## Discovery/search ranking
**Search score** should balance relevance to query, actual project content, recency of evidence, freshness of updates, completeness, engagement quality and diversity. Do not automatically treat popular projects as superior inventions. Provide 'show newest', 'show most relevant to my industry', 'show prototypes requiring pilots' and 'show projects from my university'. Include explainable reasons such as `matches your interest in solar refrigeration and field-tested hardware`.

## AI agent architecture
- **Extraction agent:** converts authorized reports into structured fields + exact evidence locators; approval required.
- **Profile writing assistant:** produces readable public-safe copy, with confidentiality checker and founder sign-off.
- **Opportunity matcher:** eligibility and program-fit retrieval with hard rules plus interpretable scoring.
- **Search assistant:** query expansion/semantic retrieval on authorized fields, no private index leakage.
- **Pitch coach:** critiques clarity and missing evidence, does not fabricate traction.
- **Institutional analyst:** reports aggregated consented outcomes; no student-level leakage.
- **Scoring engine:** deterministic/evidence-weighted dimensions by sector, model explains suggestions.
- **Due diligence assistant (later):** permissioned summaries, document references, uncertainties, human decision support.

## Suggested scoring without fake 'market price'
Avoid one universal `Innovation = 87, therefore worth $450,000` formula. Suggested displayed dimensions: `Build progress`, `Evidence strength`, `Product readiness`, `Problem validation`, `Team completeness`, `Collaboration readiness`. Each dimension offers descriptive bands (`early / progressing / supported`) with provenance and confidence. If investors request valuation, that is a **separate professional estimate**, with methodology and legal perimeter.

## Technical architecture (working proposal)
- Responsive Next.js/React web + PWA as the first-class student experience; native apps later if usage justifies.
- PostgreSQL with strict row-level and application authorization, object storage for files, managed auth, queue/workers for media/AI, event/log pipeline, indexed full-text search; vector search only when necessary.
- Distinct `dev`, `staging`, `production` environments and separate service identities, secure secrets and tenant boundaries.
- Model gateway abstracts AI vendors with task-based routing, cost limits, auditability and strict document permissions.
- Idempotent publishing and version APIs, rate limiting, attachment malware checks and signed restricted downloads.
- Metrics: qualified intro conversion, time-to-first-useful-interest, verified evidence freshness, institution renewal, not only page views.

## Security baseline and privacy
Target OWASP ASVS requirements for authorization, file upload, cryptography, APIs and logging; risk review before confidential data rooms. Zimbabwe's Cyber and Data Protection Act applies, and the 2024 controller licensing regulations may create obligations depending on processing scale and exemptions. Obtain local legal guidance on data-controller licensing, DPO, cross-border transfers, retention and minors. Seek relevant investor-market counsel before referral/solicitation/regulated products. WIPO warns that public pre-filing disclosure can destroy patent novelty in many jurisdictions.

## Quality tests
1. ACL matrix covers anonymous, author, team, university verifier, investor, moderator and admin for every asset.
2. Media URLs remain inaccessible after access expiry and on direct ID guessing.
3. Search embeddings never surface confidential text outside the viewer's authorized scope.
4. Changing a project page does not overwrite timestamped prior evidence events.
5. AI outputs show source attribution or an explicit `suggested/unverified` marker.
6. Search results respect consent and delete/visibility changes.
7. Every critical trust/admin action logs a minimal, reviewable audit event.

## Reference standards
- OWASP Application Security Verification Standard 5.0: https://asvs.owasp.org/
- NIST Generative AI Risk Management Profile: https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence
- Zimbabwe Cyber and Data Protection Act: https://zimlii.org/akn/zw/act/2021/5
- Zimbabwe 2024 Data Controller Licensing Regulations: https://www.potraz.gov.zw/wp-content/uploads/2025/02/sI-155-of-2024-Cyber-and-Data-Protection-Normal_240913_1250178.pdf
- WIPO patent/confidentiality FAQ: https://www.wipo.int/en/web/patents/faq_patents
- SECZim sandbox guidelines: https://seczim.co.zw/wp-content/uploads/Notices/Regulatory-Sandbox-Guidelines.pdf
