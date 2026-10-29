# Copy into Codex — Build P0 Showcase End to End

Use `$innovation-showcase`, `$innovation-ux`, and `$innovation-delivery` as applicable. Read the matching PRDs and inspect existing source, dependencies and tests.

Implement the **smallest complete creator-to-discovery vertical slice** in the established stack, without broad architecture rewrites:
- Private project draft with safe public-field preview and deliberate publish action.
- Mobile-first discovery page + search/filter + high-quality project cards.
- Beautiful, information-rich public project page with authentic demo-media slots, stage, claimed/verified distinctions and specific needs.
- Milestone update and public timeline, with independent attachment visibility.
- Authenticated consented introduction request and creator approval/decline (no unnecessary personal contact exposure).
- Server-side authorization on drafts, files, thumbnails, search projection and user requests; deny unauthorized access.
- Clear loading, empty, interrupted upload, publish-error, permission-denied and small-screen states.

Use `fixtures/demo-projects.json` explicitly labeled fictional until real consented projects are provided. Do not show fabricated partner endorsements.

Before coding, give a concise implementation plan, affected files, specific tests and risks. Then implement approved/ordinary within-scope changes and run tests. Stop before production deployment, paid provider provisioning or destructive schema changes unless separately approved.

Done means the full flow operates, not that the screens merely render. Show evidence of tests, responsive views and denied-access cases.
