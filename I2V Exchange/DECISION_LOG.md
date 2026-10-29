# Engineering decisions

## 2026-10-30 — Application foundation

- Current founder decisions supersede historical undecided naming and web-first-only proposals: use I2V Exchange, Expo mobile and separate responsive web, with the full destination scope preserved.
- Preserve the existing kit in its repository directory; build the monorepo alongside the documents rather than moving/deleting source specifications.
- Restore the fifteen custom skills from the actual local `I2V Exchange/.agents/skills` folder into the checkout. Remote documentation referred to these skills but the uploaded GitHub tree omitted them.
- Adopt local engineering stack and security boundaries in ADR 0001. No paid service, external account setup, provider credential, production deployment, institutional endorsement or regulated feature is activated.
- Choose SDK 54 specifically for the requested App Store Expo Go iPhone preview based on current official compatibility guidance. This does not restrict future development-build/native upgrades.
- Preserve private draft/public snapshot separation; require an explicit publication review. Treat collaboration approval and document access as distinct operations.
- Keep all incomplete feature families in FEATURE_REGISTRY and NEXT_ACTIONS, with honest implementation/test/provider labels.
