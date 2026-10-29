# Engineering acceptance gates

This increment must pass shared/server/web/mobile TypeScript checks, ESLint, live local HTTP authorization tests, transaction/persistence tests, semantic token contrast checks, a web production build and connected browser journeys. Native bundle export checks Metro compatibility; it does not establish physical iPhone behavior.

The confidentiality gates are: drafts excluded from discovery; private notes excluded from preview/public reads; edits do not change public snapshots without publication; no role/verification/organization privacy bypass; only owner-decided, specific, unexpired evidence grants permit reading; logout/expiry revoke session access; no production fallback; cookie mutations require trusted origin; audit contains no secrets.

Browser checks cover public discovery, search, sector filters, comparison, theme switching, navigation, private draft creation, explicit publication, watchlist persistence, separate-user collaboration and founder response, denied direct API access, API failure/retry, and responsive overflow. Screenshots must be inspected before visual completion claims. Keyboard/screen-reader, actual iPhone, poor-network draft recovery, production security and independent review need additional evidence before release.

The original Python starter-pack validator remains useful for documents/skills but cannot certify the running application. `TESTING_STATUS.md` records real execution results and limitations. Every future feature must add relevant positive/negative tests rather than reuse passing foundation tests as evidence for unfinished modules.
