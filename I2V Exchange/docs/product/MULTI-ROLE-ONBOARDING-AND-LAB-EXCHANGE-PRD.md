# I2V Exchange — Universal Account Creation, Multi-Role Journeys and Resource Exchange
**Status:** Approved product design requirement. Pilot workflows and demo-data adapters first; real identity, payments and facility integrations subject to providers and approvals.

## Core experience
I2V is one interoperable network for creators, supporters, organizations and professional partners. **A person should register once and gain or request role-specific capabilities without making multiple unrelated accounts.** Individuals can be founders and mentors; a university representative can be a judge; a company can sponsor a challenge and offer lab resources. Sensitive capabilities require explicit scoped grants, separate organization membership and conflict-of-interest checks.

### Visitor vs member vs verified participant
- **Guest:** search and explore intentionally public projects, innovation boards, competition schedules and institutional showcases; no mandatory KYC just to look.
- **Member:** email/passkey/social provider auth where supported; profile, privacy preferences, saved projects, follow, reasonable contact requests.
- **Creator/student/researcher:** onboarding for project creation, institution claim, team invitations, consented media publication, Innovation Passport; optional verified affiliation workflow.
- **Professional contributor:** mentor, judge, evaluator, inventor, cofounder, collaborator; profile, credentials with proper verification labels, expertise, availability, conflicts and permissions.
- **Organization user:** register/claim an organization; invite team members; select operating capabilities via role-specific onboarding: university, lab/facility, equipment supplier, materials supplier, manufacturer/fabricator, startup accelerator, corporate sponsor, pilot host, investor or institutional partner.
- **Financial participant:** legitimate investor discovery, secured documentation and introductions, with deeper regulated eligibility only for approved downstream services; not a prerequisite to browse.

### Account creation and profile flow
`Welcome → Explore or Join → Choose primary intention (Build / Discover / Mentor / Supply resources / Host opportunities / Invest professionally / Represent institution) → Create account → Verify basic email/passkey → Minimal profile → Relevant role onboarding → Permissions request (as needed) → Role-specific dashboard → First meaningful action.`

**Never force an irreversible single role.** Allow a member to add another purpose later through `Profile → My roles & organizations → Apply or create`. Default to one consistent global inbox, notifications and project watchlists, with activity origin labels and per-role settings. A university affiliation claim is not proof of official appointment. Company, facility or financial roles may require manual verification before publishing regulated or trust-sensitive claims.

## Role-specific first-time actions (each requires a tested happy/empty/error path)
| Role | First meaningful action | Essential onboarding data | Guardrails |
|---|---|---|---|
| Student/inventor | Create first private project | Project type, objective, optional university, privacy | Safe disclosure review, underage considerations |
| Independent startup | Publish public profile | Verified or declared team, project stage, contact channel | Legal company status must be honest |
| Mentor/expert | Offer office hours | Skills, experience, availability, languages | Credential verification, harassment reporting |
| Judge | Accept event invitation | Scope, expertise, COI declaration | Cannot assess own/related entries |
| University admin | Request official page stewardship | Institution claim, authority evidence | No automatic private student project access |
| Lab operator | Offer a verified facility | Equipment, location (coarse public), hours, safety, capacity | Safety, privacy, qualified operators, access policy |
| Equipment supplier | List donation/rental/loan/sale/service | Specifications, condition, quantity, price or terms, service area, shipping | Authentic listings, no false stock or certifications |
| Materials supplier | List relevant consumables | Grades/specs, quantities, availability, hazardous status | Legal supply constraints, technical compatibility |
| Manufacturer | Offer pilot/fabrication capability | Process, capacity, MOQ, certifications, lead times | IP protection and accurate quotes |
| Sponsor/corporate | Publish a verified challenge | Brief, criteria, award and IP terms | Anti-harvesting clauses and fair terms |
| Pilot host | List pilot opportunities | Test site suitability, consent, availability | Agreements, liability, privacy |
| Investor | Create discovery interests | Sectors, stage, location, professional capacity | No implicit license or public share sales |
| Accelerator | Create programme | Eligibility, schedule, review rules | No invented partnership claims |

## I2V Labs and Resource Exchange — standout capability
Not a generic e-commerce shop. It must connect founders to **physical resources needed to test, build and scale**. A registered provider may create one or several resource listings:
- Lab / testing facility: equipment capabilities; instrument model and specs; specialist operator availability; required safety training; booking windows; university/public access eligibility; costs/waiver; accessibility; turnaround; samples/files accepted; insurance/liability terms.
- Equipment: sell, rent, lend, donate or provide supervised access, each a separate legal/operational transaction type; condition, serial/model where safe, location, shipping, deposit, maintenance, certification status, return conditions.
- Materials & consumables: grades, hazard/safety documents where applicable, quantity/MOQ, substitutes, procurement lead times, approved use; flag restricted items for manual review.
- Technical service: engineering consultation, prototyping, CAD review, testing, calibration, PCB assembly, machining, fabrication; verified expertise, quote scope and expected deliverables.

### Founder request workflow
`Project → Resources needed → Request resource / publish sourcing brief → Suggest matching eligible providers → Compare verified listings → Ask question / request quote / book inquiry → Provider reviews → Agreement/booking instructions → Delivery or test appointment → Both parties confirm outcome → Relevant public project milestone (opt-in).`

### Provider workflow
`Join as supplier/lab → Verify individual and organization as required → Create location and organization profile → Add services/resources and terms → Moderation/review → Publish searchable listings → Receive inquiries → Accept/decline / provide quote → Track bookings, commitments, dispatch or site access → Resolve dispute → Optional reputation feedback.`

### Resource request types
`cash purchase`, `free equipment donation`, `temporary loan`, `equipment rental`, `paid testing service`, `grant/sponsorship in-kind`, `lab access`, `prototype fabrication`, `technical expertise`. Never silently treat one as another. Build quotation and booking logic behind adapters; real payments, escrow, shipping, insurance and hazardous-goods dispatch are explicit conditional integrations and need legal/provider review.

### Search and matching
Filter by category, capability, price/terms, institution, geographic area, remote/on-site, equipment type, safety requirements, provider verification, delivery region, availability and project stage. Match explanations must reveal no protected invention information. Founders should be able to save searches, compare 2–3 vendors, request alternatives and add approved quotes to project expense assumptions.

### Verification and trust
- Distinguish `unverified listing`, `verified business identity`, `verified facility existence`, `independently tested technical capability`, `historical completed engagement`—do not combine them into a misleading single badge.
- No default public exact personal home address. Show coarse service area and reveal facility access details only where authorized.
- Review certifications, safety constraints, restricted material rules, access policies, claimed affiliations, public reviews and disputes; include fraud reporting and suspension.
- Provider verification **does not** grant access to founders' private research documents. A quote request shares only approved project requirements.

## Visual UX priorities
Create role-specific welcome pages that are equally premium. Avoid turning `Join as a supplier` into a buried settings item. On first launch show a small **"What brings you here?"** choice; after account creation bring the user to an appropriate tailored dashboard. Easy role switcher, clear task-based CTAs and breadcrumbs. All forms: save/resume, inline validation, progress state, searchable options, currency and unit support, draft/published previews, translation-ready labels, responsive desktop, readable mobile, offline recovery where possible.

## Acceptance checks
- Student→creator→mentor within *one* user identity, with no accidental sharing of privileged roles.
- Supplier can submit equipment with draft, verify, published and temporarily unavailable states; cannot publish fictional claimed certifications.
- Lab provider can receive and respond to a test request; owner can withdraw inquiry; audit trail and notification are coherent.
- Resource listings do not expose confidential data via search, logs, email previews, AI recommendations or quote attachments.
- A project can request a donated sensor or paid lab test without the system pretending a cash payment occurred.
- Unverified supplier cannot claim that the university officially endorsed them.
- User with university role cannot see private projects simply by viewing institution analytics.
- Full mobile flow works at 360px and with poor connectivity; account creation does not block public exploration.
