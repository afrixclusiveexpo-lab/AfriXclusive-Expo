---
name: innovation-research-radar
description: Use when implementing global technology horizon scanning, research ingestion, source-grounded recommendations, patents, competitor monitoring, cross-industry research, or research missions.
---

# Global Research Radar Workflow

1. Read `CURRENT_FOUNDER_DECISIONS.md`, `docs/ai/AI-POLICY.md`, `docs/security/TRUST-MODEL.md`, and relevant architecture before choosing sources.
2. Define licensed/authorized data sources and terms, refresh cadence, record fields, copyright limits, jurisdiction and document-level visibility; use a source registry with provenance and ingestion timestamps.
3. Model research entities (publication, patent, laboratory, technology, organization, challenge, sector) and relationships to a startup's explicitly permitted research profile.
4. Implement ingest → normalize → deduplicate → extract → relevance rank → verify original sources → draft hypothesis → QA → notify, using queues/backoff, idempotency and rate controls.
5. A research card must show **what changed, why this matters, evidence and publication date, uncertainty, technical maturity, IP caveats, practical next validation, and suggested owner action**.
6. Suppress noisy recommendations: novelty alone does not imply usefulness; test against unavailable sources, irrelevant sectors, retracted findings, outdated grants, patent traps and repeated suggestions.
7. Convert recommendations into proposed research missions **only with founder approval**; capture outcomes and correction signals without leaking private project data.
8. Test source freshness, citations, rights-to-use, hallucination, project isolation, prompt injection, multilingual retrieval and low-cost operation with provider-neutral mocks.

Definition of done: a citation-grounded end-to-end demo with verifiable mock source records, explainable relevance, dismissed/rejected states, clean error paths and an integration gap report.
