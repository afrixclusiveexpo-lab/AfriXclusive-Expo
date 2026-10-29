# I2V visual system — first implementation

Semantic tokens live in `packages/design`. Current working product label is replaceable through `brand`; it does not constitute a finalized logo, domain or trademark decision. The original illustrative token JSON is preserved as historical input.

Two directions were evaluated: older forest/cream/lime and current graphite/paper/cobalt/sage. The second was selected to align the current founder direction with clear task hierarchy. Web uses a restrained editorial serif headline with system sans-serif UI; no external fonts, trackers or stock images are fetched. Mobile uses native/system typography and an editorial serif where available.

The shared palette covers background, surface, muted surface, primary text, secondary text, borders, primary action, primary-action text, accent, and error. Contrast tests check core text/button/error pairs in both themes. Native follows system appearance and supports an explicit toggle; web remembers only theme preference in localStorage, never session credentials.

Project illustrations are authored SVG concept diagrams. They are labeled fictional and are not evidence of real prototypes, university endorsements, investment returns or actual facilities. Progress sparklines derive from published milestone records and show a documented count; project timelines carry dates and evidence labels. Versioned policy text distinguishes these counts from performance or valuation.

Core navigation is Discover / Arena / Network / Workspace / Exchange. Project detail and profile are contextual routes. Public discovery has no registration wall. Private form fields, public preview and permission requests use plain disclosure language. Forms preserve typed fields after validation/network failures and show retry/errors; successful server persistence is required before closing drafts.

Web includes focus-visible controls, labels, a skip link, dialogs with browser focus trapping, reduced-motion support and 360px layouts. Mobile uses labeled native controls, dynamic text and minimum 44px actions. These implementation choices still require device, screen-reader, keyboard, zoom and human-usability verification; token tests alone are not an accessibility certification.
