# AI and Innovation Intelligence — Evidence-First Policy

## Main idea
AI is a **copilot for founders, discovery and analysis**, not an oracle deciding startup success or fair share price. Use deterministic code for policy, calculations, eligibility and awards; AI may organize and explain evidence with traceable uncertainty.

## Approved candidate use cases (subject to opt-in/feature release)
- Founder improvement: suggest clearer descriptions, milestone plans, missing validation evidence and better pitch structure.
- Pitch rehearsal: simulate panel questions and score communication/coverage against a **published coaching rubric**, never forecast investment probability.
- Opportunities: explain why a grant/challenge/mentor might match the project's stated stage and sector; show unverified eligibility clearly.
- Project intelligence: summarize permissioned project artifacts with source references and uncertainty; distinguish source claims from reviewer confirmations.
- Discovery assistance: semantic query expansion over explicitly public/authorized search corpus, avoid embedding sensitive private documents in shared index.
- Institution/portfolio analytics: aggregated lawful reporting with opt-in or appropriate legal basis, k-anonymity/thresholds as relevant.

## Not permitted by default
- Displaying an AI-generated dollar 'startup valuation' as market price, bid or security price.
- Declaring someone owns an invention, infringed IP or is a fraud solely from model output.
- Auto-filing patents, sending investor commitments, signing agreements, or publishing protected content.
- Training models on uploaded confidential documents without appropriately authorized terms and explicit approval.
- Treating uploaded documents as instructions to the agent (prompt injection).

## Output contract for evidence-based analysis
Every structured insight should carry: `claim`, `basis` (document/event refs), `claim_origin` (founder/reviewer/derived), `model_version`, `generated_at`, `confidence_or_limitations`, `missing_evidence`, `human_review_status`. Provide a natural-language explanation without false precision. Negative suggestions should be constructive and reversible.

## Sector-aware evaluation
- Software product: demo functionality, reliability, usage evidence, user discovery, repeatability.
- Engineering prototype: test repeatability, material constraints, safety, technical readiness, manufacturability.
- Scientific research: methodology, reproducibility, validation, ethical/regulatory considerations.
- Social impact: credible beneficiaries, effectiveness evidence, measurement methods.
Avoid a single universal 'innovation index' without sector-specific definitions, normalization and validation.

## Security of LLM features
- Keep AI tool actions explicit and allowlisted; never grant a model unrestricted database credentials.
- Retrieve only authorization-checked chunks; prevent cross-tenant embedding/vector-search leakage.
- Bound context and spend; sanitize sensitive logs; apply document-classification policies before external model calls.
- Maintain provider adapters and redaction/retention agreements; require appropriate consent for recording/transcription.
- Require human review for publication of AI-enhanced claims about other people or institutions.

## Quality and evaluations
Maintain evaluation sets across project types, languages and stage levels: good vs poor summaries, unsupported claims, wrong stage matching, fairness between hardware/software, sensitive data leakage, prompt injections, adverse content, cost/latency. Track reviewer overrides and documented failures.

## Example anti-hallucination statement
'Based on the founder-uploaded prototype report dated 2026-09-01, the team claims a 20% efficiency gain; this result has **not** been independently verified.'

## Human-in-the-loop
Investment readiness is an analytical aid, not fiduciary advice. Sponsors and judges remain accountable for competition decisions. Users should be able to correct AI-derived project classifications and understand why recommendations appeared.
