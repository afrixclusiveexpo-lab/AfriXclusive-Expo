# ADR 0001 — Connected local application foundation

Date: 2026-10-30. Status: adopted for local engineering; production services remain unselected.

## Outcome and boundaries

Implement the first connected creator/discoverer workflow and a real local authentication/authorization boundary. This is an engineering increment toward the entire approved product; it does not remove competitions, supplier exchange, AI, graduation, institutional analytics, or the other destination requirements.

## Decisions

- npm workspaces and strict TypeScript, with `apps/mobile`, `apps/web`, `apps/api`, and shared `domain`, `schemas`, `design`, `client`, `auth`, `persistence`, and `adapters` packages. Avoid separate services per feature.
- Expo SDK 54, React Native 0.81 and React 19.1 for the requested physical-iPhone App Store Expo Go preview. The current official Expo compatibility page says the store build stops at SDK 54. A newer SDK/development build upgrade remains an explicit future migration. Metro uses Expo's supported automatic monorepo configuration, not custom watch-folder/resolver hacks.
- Separate Vite/React web UI with React Router. Compared Next.js SSR: Vite gives a small local client/API iteration loop and clear platform separation. Per-project SSR metadata, SEO and production routing remain a later web milestone; an SPA is not claimed to satisfy those requirements.
- Node 24 built-in HTTP and SQLite. Compared PostgreSQL and hosted auth: SQLite supplies real transactions, foreign keys, durable state and isolated test databases without external accounts. The persistence package is the migration boundary; PostgreSQL tenancy, operational backups, at-rest encryption, migrations and production concurrency need separate work.
- Shared Zod request schemas reject unknown fields. SQL statements bind all input values. Auth, privacy and grants are enforced at the API data boundary, not inferred from route visibility.
- Local password identity behind an `IdentityProvider` contract. Salted scrypt hashes; 256-bit opaque sessions; only token SHA-256 stored server-side; fixed eight-hour sessions; logout deletes the server session. Web uses an HttpOnly SameSite=Strict cookie, with trusted-Origin checks on cookie mutations. Native uses Bearer tokens stored in Expo SecureStore, not AsyncStorage. No refresh token or OAuth provider is simulated.
- Account roles and identity verification are independent from per-resource grants. Self-declared student/founder/researcher roles can create projects. Professional/institutional/admin roles start requested, with recorded decisions. There is no unrestricted admin override for confidential content.
- Private draft data and an explicit public snapshot are stored separately. Publishing requires a public preview, rights declaration and explicit confirmation. Subsequent edits do not silently update public content. Private evidence notes are separate resources with purpose-bound, expiring grants. Withdrawing publication retracts discovery and revokes evidence grants.
- Audit rows are append-only through SQLite triggers. They record actor/action/resource/time, never passwords, tokens, note bodies, or confidential summaries. This does not make the log tamper-proof against the database owner.
- Local mode must be explicit, and non-loopback binding requires `I2V_ALLOW_LAN=1`. No local/demo adapter may run as a production fallback. Payments and securities transactions have no executable endpoints.

## Acceptance and threat scenarios

Guest public discovery; cross-account draft denial; draft/public snapshot separation; public preview excludes notes; unknown request-field rejection; session logout/expiry; privilege self-approval denial; organization membership does not grant student-project access; grants target only one evidence resource; denied, revoked and expired grants; founder-only request decisions; repeated requests; idempotent watchlist; transaction rollback; restricted audit; full browser creator → publish → watch → request → response journey; responsive overflow and offline retry.

## Design choice

Evaluated forest/cream/lime (the older illustrative token file) and graphite/paper/cobalt with a quiet sage accent. Selected the second to align with the current founder direction and to distinguish core actions from progress indicators. Shared semantic tokens cover both themes; web has an editorial serif headline, compact navigation, author-created concept diagrams, transparent milestone charts, and contextual privacy labels. Concept diagrams are explicitly illustrations of fictional samples, never evidence of real prototypes.

## Known limitations and follow-on decisions

Local HTTP cookies deliberately omit Secure because localhost/LAN development is not HTTPS production. No email ownership verification, passkeys, MFA, recovery, session device list, or production identity service is supplied. SQLite content is not application-encrypted at rest. File uploads, malware scanning, object storage and signed URLs are not implemented by the text-evidence note workflow. Grant expiry does not erase copies already read. Rate limits are single-process local controls. Device screenshots, human usability, screen-reader assessment, production security and actual provider integration are required before a release claim.

References consulted: [Expo Go compatibility](https://docs.expo.dev/troubleshooting/expo-go-version-mismatch/), [Expo monorepos](https://docs.expo.dev/guides/monorepos/), [Node SQLite](https://nodejs.org/docs/latest-v24.x/api/sqlite.html), and the preserved project PRDs/access matrix. Dependency versions are resolved in `package-lock.json` for reproducibility.
