# Implemented local data and privacy model

Version 1 is created in `packages/persistence/src/index.ts`. All API input values use bound SQL parameters. `users.email` is unique; client responses omit the password hash. Session tokens are hashed before persistence and never appear in audit records.

| Entity | Sensitive content and authority |
|---|---|
| users / roles | Local account details, scrypt hash; role decisions separate from identity assurance |
| sessions | Token hash, actor, absolute expiry; logout deletes the record |
| projects.data | Private draft including notes; owner or explicit operation grant required |
| projects.public_data | Allowlisted snapshot created only by publication; read by discovery |
| evidence | Individual private text note; publication never copies it into public data |
| access_requests | Requester, exact resource, purpose, decision, response and optional expiry |
| grants | Actor-resource-operation tuple, expiry and revocation; no global verified-user bypass |
| organizations / memberships | Unverified organization claim; owner-controlled membership decisions |
| watchlist | Private user/project pairs, unique for idempotency; excludes retracted projects on reads |
| audit_events | Actor/action/resource/time only; restricted API, no body content, no token values |

Project creation saves a draft. Preview serializes the exact allowlisted public fields. Publication adds a publication timestamp and writes the snapshot. Editing or recording a milestone changes the draft; republishing is required to change the snapshot. Withdrawal clears the snapshot, removes it from discovery/watchlist responses, and revokes approved evidence grants.

Evidence requests grant only `read_evidence` for the named evidence ID. Collaboration requests are introductions and never generate document grants. A fixed server clock is injectable for expiry tests; clients cannot supply approval state, owner identity, verification or grant expiry timestamps.

This local version does not provide a legal retention/deletion policy, secure object storage, database encryption, evidence version history, or regulated recordkeeping. These are tracked release dependencies. Logical audit immutability is not a claim of legal ownership or protection against database-operator tampering.
