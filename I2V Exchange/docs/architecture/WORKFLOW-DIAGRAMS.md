# Workflow Diagrams — First-Class Platform Journeys

These are **design sketches**; implementation requires approved data model and auth policy. Mermaid diagrams can be rendered by GitHub and some documentation tools.

## Publish a project — privacy-critical boundary

```mermaid
sequenceDiagram
    actor Creator
    participant App as Creator workspace
    participant API as Authenticated API
    participant DB as Project DB
    participant Store as Private object storage
    participant Search as Public search/read model
    Creator->>App: Create private project and add media
    App->>API: Save draft
    API->>DB: Save private version + owner/team roles
    App->>API: Upload confidential file
    API->>Store: Store private object + metadata
    Creator->>App: Request public preview
    App->>API: Preview explicitly selected fields
    API->>DB: Resolve draft + public serialization
    API-->>App: Exact preview with safety notice
    Creator->>App: Confirm publish
    App->>API: Publish version + consent
    API->>DB: Save public publication snapshot and audit
    API-->>Search: Send approved public projection only
    Search-->>Creator: Public URL indexed after processing
```

**Invariant:** uploading a technical document never publishes it merely because the synopsis becomes public. A derived thumbnail is classified independently according to source access rights.

## Competition — permanent project, fair results

```mermaid
stateDiagram-v2
    [*] --> Draft
    Draft --> Published: Rules+rubric approved
    Published --> ApplicationsOpen
    ApplicationsOpen --> ApplicationsClosed: Deadline / organizer close
    ApplicationsClosed --> EligibilityReview
    EligibilityReview --> Judging
    Judging --> ResultsPending: Assigned judges submit scores
    ResultsPending --> ResultsPublished: Authorized release
    ResultsPublished --> Archived
    Published --> Cancelled
    ApplicationsOpen --> Cancelled
    Judging --> Paused: Material incident / appeal
    Paused --> Judging: Recorded resolution
```

**Invariant:** `project_id` and historical entry snapshots remain stable. Rubric/terms and score events are versioned; COI recusal controls must be server-side. Archive and corrections preserve evidence without publicly exposing restricted scores.

## Live pitching — controlled experience

```mermaid
sequenceDiagram
    actor Founder
    participant Host as Host/moderator
    participant App as Pitch Arena app
    participant Media as Approved media provider
    participant Score as Private judge service
    actor Audience
    Founder->>App: Preflight camera, slides, permissions
    Host->>App: Admit authorized participants
    App->>Media: Issue scoped room token
    Founder->>Media: Present live / audio+slides
    Audience->>App: Submit question
    App->>Host: Queue for moderation
    Host-->>Founder: Ask approved question
    App->>Score: Assigned judges submit scoped scores
    Host->>App: End session and publish allowed summary
    App-->>Founder: Feedback + permitted follow-up requests
```

**Invariant:** live token does not authorize private project document or replay. Recording requires its own explicit consent and resource policy.

## Public profile follows creator development

```mermaid
flowchart LR
    A[Private research/project draft] --> B[Safe public showcase]
    B --> C[Discover and follow]
    C --> D[Milestone and evidence update]
    D --> E[Competition/challenge application]
    E --> F[Judge panel or industry review]
    F --> G[Credible outcome + useful intro]
    G --> H[Testing, pilot, partnership, startup formation]
    H --> D
```

**Metric:** optimize transitions toward validated development and authorized opportunities, not click-through alone.
