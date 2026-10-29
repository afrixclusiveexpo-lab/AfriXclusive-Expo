# 04 — Full Feature Catalogue, Product Priorities and Acceptance Criteria

## Priority scale
**P0 pilot:** necessary to prove users want discovery and make useful connections. **P1 expansion:** necessary for professional/institutional retention. **P2 advanced:** add after evidence of demand. **Conditional regulated:** require licensing or authorized partner model; do not silently enable.

## A. Visibility, creator identity and shareable portfolios
| Feature | Priority | Required behavior | Quality gate |
|---|---|---|---|
| Public project cards | P0 | Title, one-line benefit, real image, sector, maturity, support sought, link | Non-confidential and indexable |
| Student/founder profiles | P0 | Bio, verified association separate from self-claims, project collection | Privacy and account recovery |
| Project workspace | P0 | Create, update, archive, publish teaser/full safe profile | Role permissions, version safety |
| Media demo gallery | P0 | Photos, short video, live demo link, captions | Compression, safety, copyright |
| Share-to-social/QR | P0 | Copy link and well-formatted preview | No confidential fields in OG metadata |
| Project progress updates | P0 | Dated milestones and activity posts | Distinguish fact claims vs verification |
| Search and category filters | P0 | Relevant sector, university, region, stage and needs | No non-public indexing |
| Follow/save projects | P0 | Opt-in notifications of progress | Unsubscribe and anti-spam |
| University catalog | P1 | Department and showcase directories with verified associations | No implicit endorsement |
| Public launches | P1 | Launch-day stories, demos, thematic collections | Real work beats popularity |
| Maker portfolios | P1 | Career/project graph, team contributions | Editable claims and consent |
| Research citations/DOI link | P1 | Associate published works to projects | Cite source, no automatic ownership |

## B. Matchmaking, collaboration and growth
| Feature | Priority | Required behavior | Quality gate |
|---|---|---|---|
| Structured contact requests | P0 | Demo, feedback, pilot, mentor, partner, collaboration | Spam controls, safe identity access |
| Support-needed tags | P0 | Funding / collaborator / customer / hardware / mentorship / manufacturer | Founder-controlled |
| Requests inbox and status | P0 | Accept, decline, respond, archive, report | No public personal contact exposure |
| Opportunity board | P1 | Grants/accelerators/programmes with verified URLs, dates and requirements | Expired/source label |
| Cofounder/skill matching | P1 | Skills, commitment, project stage, terms not assumed | Consent, abuse reporting |
| Industry challenges | P1 | Verified corporation/university publishes problem and selection criteria | Governance + terms |
| Mentor matching | P1 | Topic-specific short requests and availability | Mentor credential transparency |
| Introduction pipeline | P1 | Discovery→request→response→meeting→outcome | Permission and aggregation |
| Smart search and alerts | P1 | Opportunity matching by stage/location/sector | Transparent filtering |
| In-platform meetings/calendar | P2 | Scheduling and virtual meeting links | Avoid unnecessary data copies |
| Collaborative workroom | P2 | Tasks, files, decisions, membership | Contribution agreement |
| Alumni/diaspora network | P2 | Skill and market access with verified associations | No assumptions about willingness |

## C. Evidence, trust and IP
| Feature | Priority | Required behavior | Quality gate |
|---|---|---|---|
| Visibility levels | P0 | Private, teaser, public-safe, permissioned documents | Server-level enforcement |
| Publish safety checkpoint | P0 | Preview + warning before publication | Explicit human approval |
| Claims/verification display | P0 | Self-reported, source attached, independently reviewed | Independent of account verification |
| University association verification | P1 | School email or institutional attestation | Revocable status + timestamp |
| Innovation Passport | P1 | Stable ID, versions, submission events, hashes | Hash ≠ legal IP title |
| Confidential vault | P1 | Private object storage, access request, signed URL, expiry | Anti-IDOR audits and event logs |
| Ownership and team declarations | P1 | Creator/team/university/unknown, contributors and rights documentation | No automatic legal determination |
| Verified evidence review | P1 | Named reviewer, scope, methodology, expiration | Conflicts-of-interest controls |
| NDA/e-sign integration | P2 | Versioned agreement execution where valid | Counsel and reliable signature provider |
| Investigation evidence export | P2 | Record access/time/files with integrity checks | Restricted legal process |
| Copyright/takedown/dispute | P0 | Report, counterclaim, triage and appeals | Balanced procedural fairness |
| Duplicate/plagiarism signals | P2 | Flag possible duplicates, human moderation | No automated verdict of theft |

## D. Innovation intelligence and analytics
| Feature | Priority | Required behavior | Quality gate |
|---|---|---|---|
| Stage classification | P0 | Idea, research, prototype, tested, live, revenue etc. | Evidence status shown |
| Real progress charts | P1 | Milestones, tests, pilots, user/revenue when documented | No fabricated values |
| Project DNA/radar | P2 | Multi-axis technology/commercial maturity | Sector-specific rubric, confidence |
| AI doc-to-profile | P1 | Extract report to editable teaser and supporting details | No silent publishing, source links |
| Pitch deck assistant | P2 | Slides from user-approved claims/docs | Citations, no fake traction |
| AI startup analyst | P2 | Gaps, risks, questions and opportunity fit | Label suggestions, guardrails |
| Investor research workspace | P2 | Comparison, red flags, follow, permissioned files | Human diligence remains necessary |
| Recommendations | P1 | Human-readable 'why shown' and feedback | Avoid discriminatory proxies |
| Ecosystem map | P2 | Geography and campus distributions | Coarse locations, minimum count |
| Institution insights | P1 | Opt-in outputs, programmes and useful outcomes | Privacy aggregation |
| Annual innovation report | P2 | Methodology, source attribution and uncertainty | No unsupported national ranking claims |
| Public API/partner feeds | P2 | Permissioned export with scopes and contracts | Privacy and source licensing |
| Indicative value estimate | P2 conditional | Evidence-based ranges when supportable | Never market/share price |
| Investment-eligibility screening | Conditional regulated | Route qualified companies to authorized operator | Counsel-approved service boundaries |
| Buying, custody, securities trading | Conditional regulated | Separate licensed partner/exchange stack | Do not implement as ordinary payment feature |

## E. Content, events and marketplace
| Feature | Priority | Required behavior | Quality gate |
|---|---|---|---|
| Campus landing pages | P0/P1 | Opt-in school and departmental project collections | Authorization for university branding |
| Demo-day galleries | P1 | Exhibitor booths, agenda, project QR, attendee requests | Media consent |
| Startup story feed | P1 | Product progress stories, not meme posts | Moderation and real milestones |
| Press/media kit | P1 | Download approved public facts, demo images, contact | Founder-controlled license |
| Sector showcases | P1 | Agritech/energy/health/engineering etc. | Curator accountability |
| Research/asset licensing discovery | P2 | Public-safe asset listings and intro requests | No automatic transfer of rights |
| Competition challenge admin | P1 | Entries, judges, rubrics, eligibility and transparency | Conflict of interest policy |
| Virtual booths/livestreams | P2 | Demo videos, event streams and Q&A | Data costs and event moderation |
| Founder archive | P2 | Pivot, completed, paused or failed history by consent | Retention/erasure rights |

## P0 pilot: exact minimum build
- Public homepage, featured collections, discovery/search, well-designed project cards, project detail pages, creator accounts, draft/publish flow, safe public/private document segregation, uploads with optimized images, support-needed categories, structured intro requests, moderation/reporting, follow/save, admin publishing/verification queue, event demo showcase with links/QR, analytics and reliable backups.
- Project provenance should still capture creation/update timestamps and file hashes internally from day one even if the elaborate Passport UI is P1.
- Identity verification should be proportionate: do not force all casual public visitors to upload IDs.

## P0 functional acceptance examples
**F-001: visitor explores.** Given a project published as public teaser, an anonymous visitor can find it via search, open its page, view safe media and share it; the visitor cannot retrieve private records via direct URL or API.

**F-002: founder publishes.** Given private source files, the founder may publish a teaser only after approving the public preview, without altering privacy of original files; invalidation works on cached/search surfaces.

**F-003: professional makes request.** A signed-in professional submits purpose and requested action; founder can accept/decline and report abuse; confidential files remain inaccessible until explicit authorization.

**F-004: evidence labels.** A stage or test claim appears as `founder-reported` until valid reviewed evidence changes the status; a verified institution account does not automatically verify every connected project claim.

**F-005: institution showcase.** An authorized campus manager can curate only opted-in/public projects or permissioned records; cannot view private student drafts by association alone.

**F-006: ranking.** Search ranking never uses a purported share price or ungrounded AI valuation; new projects have a fair path to discovery.

## Product invariants
- Nobody becomes the legal IP owner by pressing `Create project`.
- Timestamps prove platform events, not novelty, ownership or originality.
- Approved public information may already have been copied; privacy revocation limits future platform access only.
- University affiliation, investor identity, evidence verification and IP rights are distinct attributes.
- Market interest (views/follows) is not valuation.
- User data cannot be used for third-party model training without an explicit and appropriate legal/contractual basis.
- Account suspension, content disputes and false claims require documented appeal routes.
