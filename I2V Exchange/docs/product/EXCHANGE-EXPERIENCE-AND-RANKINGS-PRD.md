# I2V Exchange — Exchange-Grade Discovery, Watchlists, Rankings and Analytics
**Status:** Approved design requirement; UI/behavior to implement and test. No actual securities exchange is authorized by this specification.

## Intent
I2V Exchange should feel *as capable and navigable* as a sophisticated financial-market discovery app while representing **real emerging startups, university projects, research, inventions, and commercial opportunities**. Borrow useful interaction patterns: watchlists, sector browsing, clear time-series progress, side-by-side comparisons, alerts, transparent categories, detailed issuer/project profiles, and confident data presentation. Do not imitate another product's brand/trade dress or mislead visitors about live stock prices. The primary function is visibility, networking and development, **not trading**.

## Distinct destination surfaces
1. **Exchange Home:** purposeful editorial mix of featured innovations; rising projects (measured), recently validated milestones, public launches, live events, relevant projects from followed universities; personalized content when consented, meaningful content without login. Never default to a wall of identical cards.
2. **Explore Markets (innovation sectors):** browse sectors (software/AI, robotics, agriculture, health, energy, industrial/mining, creative, climate, education, etc.), country, university, maturity stage, active opportunities, project type and verified status; results have shareable URLs and true empty states.
3. **Startup/Project Detail:** visual story, actual demo media, visible stage and evidence level, public milestones with dates, team/affiliation status, upcoming opportunities, progress chart with metric definitions, published traction where authorized, collaboration and contact CTAs, supporting documents appropriate to audience.
4. **Startup Watchlists:** save/un-save, folders, updates on meaningful milestones, release notes, qualification status, event invitations, and opt-in email/push; export/share only authorized public lists.
5. **Leaderboards/Rankings:** top *documented progress*, fastest *verified milestone progression*, most-active *public pilots*, promising *newly launched projects*, contest results and curated editorial selections. Include sector- and stage-specific slices; compare like with like. Do not claim subjective 'best' without a precise scoring policy. No popularity-only investment rankings.
6. **Progress Analytics:** charts of observable time-series events (prototype revisions, active users if substantiated, pilot counts, disclosed revenue where permitted, released versions, verified achievements). Every chart must label its metric, unit, period, data source, update time, completeness and verification status. No fabricated price chart or 'market cap'.
7. **Compare:** 2–4 projects side-by-side on disclosed, directly comparable attributes; show missing data explicitly, not zero. Labels and tooltips explain the methodology. No cross-industry single-number 'winner'.
8. **Opportunity Board:** grants, challenges, competitions, collaboration needs, demo requests, pilot proposals and verified partners; filters + eligibility + time window + follow-through. Clear separation from investment offers.
9. **Graduates & Longitudinal:** startup histories, I2V graduation pathway and post-graduation progress; closed/merged/acquired statuses truthfully labeled, subject to publication permissions.
10. **Professional Discover:** permission-aware investor/corporate/accelerator search, saved cohorts, introduction requests and due-diligence rooms only where authorized. Respect founder-controlled visibility.

## Definitions: 'progressive', 'trending', 'best-performing'
- **Progressing:** milestone velocity and breadth of corroborated progress over a stated observation window. Normalize by stage, sector, creation date and evidence availability; preserve incomparable categories.
- **Trending:** public-interest movement over a fixed window with anti-bot, duplicate-event and creator-self-traffic controls. Label as *attention*, never financial quality.
- **Best-performing:** NEVER an unqualified universal label. Offer explicit tabs such as `Fastest verified prototype progress`, `Most pilot agreements confirmed`, `Most competition awards verified`, `Highest reported customer growth` (the last only when source/permission allow). Label self-reported vs independently verified indicators. Explain selection method and excluded projects.
- **Promising:** editorial/reviewer designation or transparent criteria, dated and reversible, never presented as guaranteed success.
- No invented probability-of-success, startup net worth, valuation or share price; any future valuation estimates must be explicitly method-dependent, confidence-labeled and independently distinguishable from an executable trade price.

## Rankings governance and analytics quality
A versioned `RankingPolicy` should store: category, eligibility, metrics, weights where justified, lookback period, data completeness threshold, cohort segmentation, normalization, anti-gaming exclusions, update cadence, public explanation, appeal and correction path. Prefer multiple **explainable metrics** over a universal mysterious algorithm. Prevent buying ranking placement. Sponsored promotion must be labeled and separated from organic performance.

Data model candidates: `project_metric_events`, `verification_events`, `public_metric_projections`, `watchlists`, `watchlist_items`, `ranking_policies`, `ranking_snapshots`, `ranking_explanations`, `ranking_appeals`, `editorial_collections`, `activity_signals`, `follow_preferences`. Do not expose underlying private evidence through a public metric or chart.

## Interaction and visual requirements
- Design visually rich exchange-style exploration, but warm, creator-centered, with honest photos/videos and accessible information density. Clean mobile and desktop variants; responsive charts and data tables, light/dark themes, motion that clarifies updates.
- Mobile Discover → sector filter → leaderboard → project detail → follow → request collaborator → founder approves → inbox confirmation should be a tested end-to-end flow.
- Accessible sorting, filters, tap targets, loading/empty/retry/permission states, skeletons, deep links, text alternatives for charts and low-data mode.
- Information architecture must keep a clear route to **Arena, Network, Workspace and Exchange** without requiring 10 top-level tabs.

## Future investment-capital path (design and domain contracts; not activated)
Model distinct states: `not_offered`, `investment_readiness_review`, `qualified_offer_preparation`, `authorized_partner_hosted`, `offer_closed`, `post-investment_reporting`, `secondary_trading_eligible_via_authorized_venue`. A future investor journey may preview a permissioned, clearly labeled sample offering, risk disclosures, eligibility screening, partner hand-off, order/confirmation status, legal documents and portfolio reporting **through authorized institutions only**. No simulated portfolio balance may be mistaken for owned shares. Do not open order-taking, custody, settlement, matching engine, price ticker or public securities marketing by default. Market readiness requires specific legal review and owner approval.

## Acceptance checks
- Every prominently displayed startup chart reveals provenance and update time and displays gaps rather than invented data.
- Ranked projects are reproducible from published and authorized events; an auditor can explain why a project is in a category.
- An ordinary student can find a university project in <=3 meaningful navigation steps from Discover.
- Users can reach any saved project with understandable back navigation on phone and desktop.
- A published project revocation removes it from public feed, search, watchlists' public metadata and cached previews as practicable; no private data leaks.
- False-profile, false-award, paid-promotion, vote manipulation and fake-traction tests are included.
- Future securities-looking UI has explicit non-live/demo markers and cannot execute transactions absent authorized provider approval and integrations.
