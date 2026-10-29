# Trust, Provenance, Identity and Intellectual-Property Boundary

## Claim the right thing
**Promise:** controlled disclosure, reliable internal records, explicit attribution status, accountable access and avenues for dispute. **Never promise:** no idea theft, automatic legal ownership, unbreakable secrecy or automatic proof of infringement.

## Separate trust dimensions
1. Account authentication: who signed in.
2. Identity assurance: what checks have actually established about a person/company.
3. Institutional affiliation: who confirmed university/organization link, when and how.
4. Authorship/contribution claim: who declares producing a document or idea.
5. Legal IP ownership: may depend on contracts, funding, supervisors and local law; platform does not determine it.
6. Evidence verification: whether an independent authorized reviewer examined a specific claim.
7. Permission to access: who is authorized for this resource and purpose, independent of identity level.

## Disclosure levels
- **Private**: visible only to approved project team/authorized administrators where narrowly needed.
- **Public summary**: approved synopsis/media; can be indexed and shared; do not include confidential inputs or source documents.
- **Approved access**: individually granted project resource(s) with purpose and expiry.
- **NDA-restricted / diligence**: only separately consented participants under appropriate terms; an NDA alone is not an access-control system.
- **Public full artifact**: deliberately released files with unambiguous notice of irreversible public disclosure risk.

## Evidence Locker
- Append-only logical history for new artifacts/versions and correction events; retain according to law and user rights.
- On upload record content SHA-256, upload time, version, actor ID, size/type, custody context and server-generated event identifier.
- A self-managed timestamp/hash shows how **the platform** recorded a file, not independent existence before upload and not legal rights; discuss independent trusted timestamp providers for future evidentiary requirements.
- Use encryption in transit and at rest; malware scanning, controlled MIME, size limits, storage isolation and safe preview generation.
- Public thumbnails must be generated only from public/approved assets; derived files inherit security classification, not a default public state.

## Project ownership and team collaboration
Before sensitive publication, ask project creator for relevant declarations: creator personally, team, university, employer, sponsored research, joint, uncertain; flag patents/disclosure. Team role changes require auditable approvals. Contributions and author credit can be disputed and corrected without rewriting history.

## Required threat scenarios
- Guessing a draft ID, asset URL, QR code or search suggestion.
- Misconfigured storage bucket / CDN cache / image resizing endpoint.
- Former collaborator retains data room access or event recording.
- University account tries to access student-owned private material.
- Competition judge accesses entries outside assignment or contacts teams inappropriately.
- Sponsor uses false credentials or changes IP terms after submissions.
- AI prompt injection in uploaded files seeking other projects' secrets.
- Account takeover, SIM swap, phishing, credential stuffing, session theft and abusive scraping.
- Privileged admin misuse, fake achievements, sybil votes, manipulated score sheets.
- Personal information included accidentally in analytics, prompts or exports.

## Dispute handling
Accept report -> triage and protect evidence -> temporarily restrict access only as proportionate -> notify relevant participants under policy -> preserve audited versions and response records -> provide contest/appeal channel -> refer legal title/infringement determinations to appropriate professionals/courts. Not every similar implementation indicates misappropriation.

## Controls and review
Object-level authorization, role scopes, MFA for high-privilege accounts, secure sessions, signed URLs, idempotent mutations, immutable-ish tamper-evident audit design, secrets management, differential rate limiting, abuse reporting, backups, recovery drills, vulnerability testing and documented retention/deletion rules. Mapping to OWASP ASVS and privacy law should be reviewed when an actual stack/jurisdiction is chosen.

## Child/minor users
If under-18 users will be permitted, specific age-appropriate privacy/consent flows and legal review are required before launch. Do not implicitly assume all university/community participants are adults.

## Investment and payments
Do not mix discovery request with securities solicitation. Licensed specialists must review any equity, fractional ownership, investment advice, money custody, crowdfunding portal, broker role or securities exchange function. Payouts/prize fulfillment may have separate contractual and regulatory implications.

## Acceptance / abuse tests
- Every role denial produces the correct response and no sensitive body (including errors).
- Revoking collaborator/investor permissions removes access to stored files, previews and replays according to documented limits.
- A malicious uploaded document cannot cause an AI worker to retrieve unrelated private content.
- Publish preview and actual public read model match exactly for privacy-bearing fields.
- Conflict/appeal logs are append-only under limited access; data subject correction/deletion rights addressed in lawful policy.
