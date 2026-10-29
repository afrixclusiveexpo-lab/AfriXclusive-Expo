# Accounts and Permissions — Future Setup Worksheet

## Local engineering configuration — 2026-10-30

No third-party account or API key is required for this foundation. Copy the documented placeholders in `.env.example`; the API loads the root `.env`, and Expo reads `apps/mobile/.env`. Both real environment files, databases, caches and runtime artifacts are ignored by Git.

| Variable | Purpose | Sensitive? |
|---|---|---|
| `I2V_MODE` | Must be `local`; other modes fail closed | No |
| `I2V_DATABASE` | Local SQLite file path, relative to monorepo root | No secret value; database contents are sensitive |
| `I2V_HOST` / `I2V_PORT` | Development API binding | No |
| `I2V_ALLOW_LAN` | Explicit trusted-LAN bind opt-in | No |
| `I2V_WEB_ORIGINS` | Exact permitted browser origins | No |
| `EXPO_PUBLIC_API_URL` | Development PC API URL reachable from the phone | Public configuration, never a key |

Local account passwords are salted/hashed; sessions are opaque, hashed server-side, held in HttpOnly browser cookies or the device keychain. Never put passwords, real session tokens, provider secrets or signing keys in this document. No production key names have been invented before provider selection. See GETTING_STARTED for local administrator bootstrap and the later provider-activation workflow below.

Do not create real accounts automatically, purchase services, or place secrets here.

Record for each selected provider: exact official setup page, account type/ownership, initial free tier where applicable, business verification needs, permitted API scopes, required `ENV_VAR_NAME` (no values), staging/production boundaries, documented connection sequence, setup costs and required approval.

Possible categories: GitHub, Expo/EAS, domain/email, cloud/database, identity, secure storage, AI/research sources, video/live events, notifications, analytics, search, payments, security monitoring. Selection is pending architecture review.
