# AI Automation Roadmap UX, Quality-Gate, and Publication Recovery Plan

## Goal

Transform **The Data Tea · AI Automation Roadmap** into a visual, roadmap.sh-inspired learning product that is specialized for n8n-centered AI automation. The implementation will make progress and prerequisites easier to understand, improve navigation and mobile usability, audit and improve learning-resource links, recover the failing GitHub Actions **Quality Gate**, and verify that the connected Vercel production deployment is truly public and functional.

The design will draw from the *interaction principles* of [roadmap.sh](https://roadmap.sh/)—clear staged paths, connected learning nodes, expandable detail, projects, and resources—without copying its code, visual assets, or branded layout. Because no specific URL for the requested “Computable” reference has been supplied, the comparison will use roadmap.sh plus one public modern learning-path comparator selected during research; the plan can be amended when the exact Computable URL is provided.

## Current Baseline and Assumptions

| Area | Current evidence | Planning implication |
|---|---|---|
| Production deployment | The latest Git-linked Vercel deployment is reported as `READY`, and a recent root, asset, and `/api/trpc/auth.me` probe returned `200`. | Re-check the project `live` state, alias routing, deployment protection, build logs, and browser rendering before making any deployment change. Do not assume `READY` alone means the user-facing alias is healthy. |
| GitHub quality gate | The workflow runs `pnpm install --frozen-lockfile` followed by `pnpm run quality` on Node 22 / pnpm 10. The user reports that this check is failing. | Retrieve the exact failed run and log lines first; fix the cause rather than weakening or bypassing CI. |
| Resource library | The persistent library has 256 resources after a validated 216-entry catalogue import. Most catalogue video links are YouTube search URLs, not immutable watch permalinks. | Preserve correct accessible resources, label search links honestly, replace broken or weak links with authoritative direct URLs where available, and keep unresolved individual-permalink work explicitly tracked. |
| Product architecture | React 19 + TypeScript + Tailwind 4 frontend; Express/tRPC; Manus OAuth; Drizzle/TiDB; learner progress, vault, and suggestions already persist. | Redesign must retain the existing public resource library and authenticated learner capabilities. It will use current tRPC data rather than creating a parallel API layer. |
| Analytics benchmark | SimilarWeb is useful for benchmarking large public comparators, but a new niche site may not have enough traffic to report. | Use SimilarWeb as directional competitive research, not as first-party product analytics. Save all retrieved responses before analysis. |

## Execution Plan

### 1. Diagnose GitHub and Vercel Before Altering Product Code

First, inspect the latest failing GitHub Actions **Type-check, test, and build** run and retain its failure log. Compare its Node version, pnpm version, lockfile integrity, generated build output, and commands against a clean local execution of `pnpm install --frozen-lockfile` and `pnpm run quality`. The repair will be limited to the actual root cause—such as a lockfile mismatch, CI configuration issue, untracked generated artifact, unsupported runtime, or failing test—and will preserve the strict type-check, test, and production-build gate.

Then inspect the Vercel project’s live/paused state, custom deployment protection, active aliases, build logs, and runtime-error clusters. The site will be probed through the stable production alias for HTML, the hashed JavaScript asset, and a public tRPC endpoint. If the project is paused or `live: false`, the plan calls for unpausing/re-enabling it. If aliases are stale or a build is not current, a validated Git checkpoint will trigger a clean production deployment.

### 2. Research Comparable Learning UX and Measure Benchmark Signals

Use [roadmap.sh](https://roadmap.sh/), its public roadmap directory, and one comparable public learning platform to document reusable design patterns: connected stage graph, scoped topic detail, prerequisite cues, a persistent completion state, practical project checkpoints, discovery filters, and small-screen linearization. The output will be a compact design brief rather than a visual copy.

Use SimilarWeb’s documented APIs to collect the most recent complete-month engagement signals for `roadmap.sh` and the selected comparator: visits, bounce rate, pages per visit, visit duration, traffic-source mix, and top countries when data is available. The collected raw data will be saved immediately, then used only to frame content-discovery and navigation priorities. It will not be presented as traffic data for The Data Tea.

### 3. Audit and Upgrade Learning Resources

Create a repeatable resource-health audit that checks the existing URLs with bounded concurrency, captures final HTTP status and redirects, detects exact duplicates, and records the current source label and module. Classify links as direct authoritative, working third-party, search/discovery fallback, broken, or unavailable.

For broken, obsolete, or low-quality links, replace them with credible direct alternatives from official n8n documentation and templates, MDN, OpenAI documentation, relevant vendor documentation, and established educational publishers. Each replacement will preserve the learning intent, type, effort estimate, provider, and roadmap-stage assignment. Existing direct Gemini Notebook items will remain clearly attributed. Catalogue rows that only have YouTube search URLs will remain transparent until exact video IDs can be provided or responsibly verified; they will not be falsely claimed as direct videos.

### 4. Build the Visual AI Automation Learning Experience

Implement a new public roadmap experience centred on an interactive **AI Automation Path Map**. It will use a deterministic SVG/HTML node diagram in the React interface rather than an image-only graphic, making the learning process readable, accessible, responsive, and connected to real resources.

| UX element | Planned behaviour |
|---|---|
| Visual path map | A connected sequence from **Prepare → Orient → Connect → Orchestrate → Shape → Augment → Operate → Agents → Capstone**, with directional links, short outcomes, time markers, and visible prerequisite relationships. |
| Focused learning detail | Selecting a node opens a contextual detail panel or drawer with the stage outcome, key skills, deliverable, prerequisite guidance, and a limited curated resource set. It avoids rendering every card at once. |
| Progress and status | Learners see not-started, active, and complete states. Signed-in completion remains persisted through the existing progress procedures; signed-out users see a clear sign-in affordance instead of a blocked route. |
| Discovery | Resource search, type/source filters, and stage links remain available, with count feedback, clear-reset controls, and empty/error/skeleton states. Direct/resource-quality labels will distinguish verified links from catalogue search fallbacks. |
| Mobile experience | The desktop map collapses to a keyboard-accessible, vertical staged path with the same order and selection state. Controls will have adequate tap targets and no horizontal overflow. |
| Performance | Code-split noncritical/secondary library content, defer heavy visual sections, limit initial resource-card rendering, respect reduced motion, and retain fast loading/error states. |
| Diagram documentation | Add a Mermaid source diagram to project documentation for the canonical learning-process structure, then render only if a documentation image is useful. The product itself uses the interactive implementation above. |

The existing n8n dark/pink palette will be refined into clearer status tokens and contrast-safe surface layers. The design will keep The Data Tea branding while using uncluttered canvas space, straightforward labels, and purposeful micro-interactions under 300 ms.

### 5. Validate, Publish, and Verify

The implementation will include unit tests for the roadmap filtering and selection helpers, integration coverage for any changed tRPC data contract, and browser validation for map navigation, filters, accessible keyboard use, sign-in/save-progress states, learner vault, submission feedback, desktop layout, and a narrow mobile viewport.

The full local quality gate will run with the exact CI commands. The repaired workflow must pass in GitHub after the checkpoint is pushed. Once Vercel deploys, verify the deployment-specific URL and stable alias for `200 text/html`, the current hashed JavaScript asset, and a valid JSON response at `/api/trpc/auth.me`. Capture the production version, GitHub Actions run status, and any remaining resource-link limitations in the release note.

## Key Files Expected to Change

| Area | Expected files |
|---|---|
| Visual roadmap | `client/src/pages/Home.tsx`, new focused map/detail components under `client/src/components/`, `client/src/index.css`, and shared roadmap helpers/tests. |
| Resource quality | `server/db.ts`, `server/routers.ts` only if resource health metadata or query support is needed; audited records in the database; reproducible scripts and research documentation under `scripts/` and `docs/`. |
| CI and build | `.github/workflows/ci.yml`, `package.json`, lockfile, or tests only as required by the exact failed GitHub Actions log. |
| Deployment | `vercel.json` or generated Vercel function entries only if the production diagnosis demonstrates a configuration problem. |
| Documentation | `README.md`, `docs/learning-process.mmd`, `docs/resource-research.md`, `docs/flow-validation.md`, and `todo.md`. |

## Acceptance Criteria

| Requirement | Verification |
|---|---|
| Roadmap.sh-inspired but original UI | Browser review confirms a clear connected AI Automation path map, focused details, and project/resource cues without copied branding or assets. |
| Visual learning process | A responsive interactive map exists in the site and a canonical Mermaid process diagram is stored in documentation. |
| Better UX and performance | Desktop and mobile browser tests show no horizontal overflow, visible focus states, responsive map-to-list adaptation, controlled card rendering, loading/empty/error states, and reduced-motion support. |
| Resource quality | Audit output records resource status/category; invalid links are repaired or removed; search fallback entries remain visibly labelled until direct URLs are available. |
| Quality gate recovery | `pnpm install --frozen-lockfile` and `pnpm run quality` pass locally and the resulting GitHub Actions run is successful. |
| Vercel publication | Latest deployment is ready and live; both production URL forms serve the page, static bundle, and tRPC endpoint without 404/503 errors. |

## Risks and Open Decisions

The precise “Computable” benchmark remains unidentified; execution will use roadmap.sh plus a comparable public learning platform unless an exact URL is supplied. SimilarWeb may not return robust data for every selected comparator, in which case the design research will rely on observable interaction patterns and this limitation will be recorded.

The project has a real outstanding limitation: the supplied catalogue contains 207 YouTube search-result links rather than exact source permalinks. The redesign can label and surface them well, but exact video destinations require a verified item-level export or direct video-ID list. CI and Vercel fixes will be driven by logs and probes, not assumed from previous states.

## Reference Sources

1. [roadmap.sh — Developer Roadmaps](https://roadmap.sh/)
2. [roadmap.sh — Roadmap Directory](https://roadmap.sh/roadmaps)
3. [SimilarWeb Analytics Skill API guidance](file:///home/ubuntu/skills/similarweb-analytics/SKILL.md)
4. [Vercel Documentation — Project Configuration](https://vercel.com/docs/project-configuration/vercel-json)
