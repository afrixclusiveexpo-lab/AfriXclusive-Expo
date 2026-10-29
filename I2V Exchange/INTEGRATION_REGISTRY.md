# I2V Integration Registry — maintained by Codex

## 2026-10-30 implementation status

| Capability | Adapter / configuration | Local state | External / production state |
|---|---|---|---|
| Identity | `IdentityProvider`, local scrypt + hashed opaque sessions; `I2V_MODE=local` | Domain/server implementation; tests recorded in TESTING_STATUS | Provider unselected, no account connected; email/passkey/MFA/recovery pending |
| Persistence | `packages/persistence`, Node SQLite; `I2V_DATABASE` | Durable local file, transactions, foreign keys, additive schema v1 | Managed relational provider/encryption/backups/migrations pending |
| Session transport | Web HttpOnly SameSite cookie / native Expo SecureStore | Local HTTP only; trusted Origin guards; LAN explicit opt-in | HTTPS, secure-cookie production policy and reviewed identity integration pending |
| Evidence | Local text-note records with resource grants | Purpose/expiry/revocation and audit implemented | Files, malware scanning, object storage, signed URLs pending |
| Discovery | Published snapshots in SQLite | No search provider needed for the local increment | Search indexing, SSR/SEO and scale verification pending |
| Notifications | Request inbox from persisted records; typed future port | No external delivery | Email/push provider, consent, outbox and delivery tests pending |
| AI/research | Typed future port; deterministic Next Move guidance | No real model calls or invented citations | Provider/data sources, scopes, cost caps and retrieval safety pending |
| Video, payments, capital | No active adapters | Explicitly disconnected; no executable financial endpoints | Approval/provider/legal gates unchanged |

No secret values are stored here. The API base URL in mobile public configuration is not a credential. Local mode fails closed if production is requested. The older table below remains the provider-connection backlog, not a statement that no local implementation exists.

**Status key:** Not needed / Scoped / Interface defined / Demo adapter / Local-tested / Live adapter / Provider-connected / E2E-verified / Release-approved.

| Capability | Provider choice | Required account | Permission/scopes | Credential ENV names (never values) | Demo status | Live status | Contract tests | Launch blocker / cost |
|---|---|---|---|---|---|---|---|---|
| Authentication | Pending | Pending | Least privilege | Pending | Pending | Pending | Pending | Real user testing |
| Database | Pending | Pending | Project-scoped | Pending | Pending | Pending | Pending | Persistent authorization |
| Secure storage | Pending | Pending | Signed uploads and reads | Pending | Pending | Pending | Pending | Private document testing |
| AI/research | Pending | Pending | Project consent | Pending | Pending | Pending | Pending | Grounded answers |
| Video conferencing | Pending | Pending | Event role scoped | Pending | Pending | Pending | Pending | Development build / recording consent |
| Email/push | Pending | Pending | Minimal | Pending | Pending | Pending | Pending | Deliverability |

**Rule:** no production fallback to mock data. No actual credentials or tokens in this file.


## Missing provider categories to plan before connection
- Facility verification / organization identity, geocoding or service regions, availability/booking/calendar, insurance/safety attestations where needed.
- Equipment/material supplier onboarding and availability management, technical document storage, inquiry/quote workflows, notifications, shipping/fulfillment and potential merchant/payment integrations (not active before provider approval).
- Public-project and project-metric search index, source-verified ranking snapshots, market-style charts (chart rendering is not evidence of real prices), user watchlist notifications.
- Future authorized fundraising/secondary market providers; capability remains disabled, gated by separate legal clearance and founder approval.
