# PRD — Challenge Exchange: Real Industry Problems, Student Solutions

## Outcome
Companies, NGOs, universities and approved institutions post **specific, legitimate problems**; students/researchers/startups find them, propose solutions, receive fair evaluation and potentially move into pilots, awards, procurement or licensing. This is not an automatic IP-transfer service or government procurement platform.

## Main workflow
Sponsor applies for verification -> organizer reviews organization and authority -> challenge drafted -> rules/IP/prize/review approved -> challenge published -> eligible teams register -> clarification questions -> submissions (private by default) -> independent evaluation -> finalists/pitches optional -> outcome recorded -> grant/pilot/contract process with appropriate agreements -> project portfolio updated.

## Challenge contract (published before accepting submissions)
- Sponsor identity and verification status.
- Problem, current environment, target outcomes, constraints and measurable evaluation criteria.
- Eligible entrants, countries/institutions, age requirements and conflict rules.
- Timeline, timezone, question period, submission format, judging process, appeals/withdrawal procedure.
- Reward type (prize / paid pilot / licensing discussion / non-cash support), currency and award/fulfillment conditions.
- **IP policy:** background IP stays with its rights holder unless a separate valid agreement says otherwise; clearly document permissions for evaluating a proposal; any broad IP license/transfer needs specific conspicuous consent and legal review.
- Confidentiality, data-processing terms and rules for sponsor-provided sensitive datasets.
- Use of entrant names/public demos; recording and publicity require separate authorizations.
- No payment or prize claim before sponsor funds/terms are appropriately checked.

## Required features
- Sponsor console: organization profile, challenge builder, drafts, rule version, team invitations, eligibility review, Q&A, submission review, feedback, award workflow.
- Innovator view: clear requirements, team roles, collaboration request, question-and-answer, submit draft, immutable receipt, version history within submission window, withdrawal.
- Evaluator: assignment, structured criteria, conflict flagging, limited disclosure of proposals, private scores, comment quality.
- Follow-through: pilot planning checklist, consented introduction, outcome status and evidence logging without exposing negotiation details.

## Critical abuse / integrity cases
- Fake sponsor collecting prototypes; require credible identity and clear warning before confidential submission.
- Retroactive change of prize and IP terms; terms version lock + applicant re-consent where material.
- Unauthorized corporate downloads/screenshots; rights controls and audit, with honest residual limits.
- Sponsor using confidential submissions to build competing product; legal terms + access evidence + dispute path, no guarantee of detection.
- Duplicate/fraudulent entries and bot votes; rate limiting, manual appeal.
- Winning project not paid; track fulfillment status and complaints, never claim prize delivered when only promised.

## First release shape
Sponsor listing + published terms + application and structured Q&A + reviewer rubric + outcomes. Leave procurement integrations, payment and contract execution to explicit subsequent stages.

## Tests
- Draft or withdrawn proposals never show on public pages.
- Sponsor evaluator can view only assigned data under published terms.
- Rules version recorded against submission, with no silent retroactive changes.
- Organizer can't set 'award paid' without appropriate evidence and authorization.
- Unverified sponsor has clearly distinct status or cannot publish restricted high-risk challenge.
