# Role and Access Matrix — Reference for Server-Side Authorization

**Default:** deny unless an explicit actor-resource-operation grant or the object's deliberate public projection permits access. This is a **design reference**, not implementation code. 'Account verified' is not a document-access permission.

| Actor | Public project | Private project | Private evidence | Contest entry | Judge scores | Pitch/replay | Sponsor proposal |
|---|---|---|---|---|---|---|---|
| Anonymous | Read published | No | No | No | No | Public live only if opened | No |
| Registered non-member | Read published | No | No | Own applications only | No | Public live only if opened | Own submission only |
| Project owner | Read/write own publication | Read/write own | Read/manage own, subject to rights | Own snapshot/feedback | No judge-only data | Assigned speaker; replay per consent | Own submission |
| Team collaborator | Read published | Per project grant | Per asset grant | Per event role | No | Per event grant | Per submission/team role |
| Authorized university admin | Read published | No by affiliation alone | No by affiliation alone | Only hosted events and allowed materials | Aggregates/review role only | Organizer role if granted | No by affiliation alone |
| Assigned judge | Read published | No by judge role alone | Only explicit competition-brief grant | Assigned entry only | Own submitted scores; aggregate only if rules | Invited room; recording per consent | Assigned challenge entry only if dual grant |
| Conflicted judge | Read published | No | No | No entry for score | Cannot score conflicted entry | May be removed from private room | No conflicted entry |
| Verified sponsor | Read published | No by sponsor status | No | No by default | No | Invited room only | Assigned to own hosted challenge under entrant terms |
| Invited investor | Read published | No by investor status | Explicit resource grant | No by default | No | Only invited sessions/replays | No by default |
| Moderation responder | Public plus narrowly needed reports | Limited justified access, logged | Limited justified access, logged | Narrow incident scope | Not automatically | Role-based reports only | Narrow incident scope |

## Implementation rules
1. Compose permissions at **object and operation** granularity: project read != evidence download != share != publication != score.
2. Sensitive data is not embedded in client bundles, HTML source, search indexes, OpenGraph previews, notification bodies, error messages or telemetry.
3. Presigned URLs are granted only after server authorization, short lived and scoped; revocation has documented limitations for already downloaded copies.
4. Cross-organizational actors may hold multiple explicit roles, but conflict and segregation-of-duties checks can override them.
5. Every authorization decision relevant to confidential resources should be testable as an API/integration scenario.
6. Score publication, prize declaration, verified affiliation and review badge issuance are privileged operations with immutable audit events and correction methods.
7. A data-subject deletion/correction request may conflict with legal retention and legitimate competition audit; implement an explicit retention policy and jurisdictional review, not an absolute promise to erase all history.

## Essential negative tests
Anonymous project draft read; preview thumbnail bypass; malicious public image resize; stale signed URL; revoked teammate; judge outside assignment; judge conflict; sponsor cross-challenge access; external AI prompt injection; unauthorized pitch join/replay; invisible institution access; report-moderator privilege escalation.
