# AI Automation Roadmap: Completion, UX Redesign, and Publication Recovery Plan

## Objective

Complete The Data Tea’s AI Automation learning product as an original, **roadmap.sh-inspired** visual experience for n8n-centered automation. The work will resolve the reported GitHub Actions and Vercel publication problems, make the learning process more visual and navigable, improve performance and responsive usability, audit and repair resource links, benchmark comparable learning websites with SimilarWeb where data is available, and integrate the user’s materials once the failed uploads are available.

The product will borrow only general interaction patterns—connected stages, clear prerequisites, topic detail, practical project checkpoints, and progress visibility—from public learning-path platforms such as [roadmap.sh](https://roadmap.sh/). It will not copy their code, visual assets, content, or branding.

## Scope and Decisions

| Workstream | Decision |
|---|---|
| Visual learning path | Build an accessible, responsive interactive map in React/SVG/HTML for **Prepare → Orient → Connect → Orchestrate → Shape → Augment → Operate → Agents → Capstone**. The map will remain functional on mobile as a vertical path. |
| Diagram artifact | Store the canonical process as Mermaid source in documentation and render it only where a static artifact is useful. The user-facing visual path remains an interactive implementation, not an image-only diagram. |
| Existing learner features | Preserve current OAuth, progress persistence, private file vault, resource library, source/type filtering, and submission workflow. |
| Resource quality | Audit existing URLs, replace broken or weak links with authoritative direct alternatives, retain clear provenance, and distinguish verified direct links from catalogue search fallbacks. |
| Quality gate | Diagnose the exact GitHub Actions failure, fix its underlying CI order/configuration/dependency issue, and retain strict type-check, test, and build coverage. |
| Vercel | Verify `live`/paused state, deployment protection, current build, aliases, browser rendering, static asset delivery, and tRPC serving. Unpause or republish only when diagnosis warrants it. |
| Benchmarks | Use roadmap.sh plus a comparable public learning platform. Use SimilarWeb for high-level comparator metrics only; lack of data will be recorded rather than inferred. |
| “Computable” comparison | The reference URL is still not known. Include it as an additional benchmark once the user provides its exact URL; do not guess its identity. |

## User Materials Intake

The following attachments were reported but **failed to upload**, so they cannot be treated as verified source material yet:

| Intended material | Planned use after successful upload |
|---|---|
| `How_to_Host_n8n_Locally_Using_Docker.mp4` | Hosting/deployment lesson, including local Docker setup and deployment-stage resources. |
| `The_AI_Automation_Roadmap__From_Hype_to_Engineering.mp4` | Narrative framing and curriculum sequencing validation. |
| `The_n8n_AI_Agent_Blueprint.pdf` and `AI_Agent_Blueprint.pdf` | Agent design, tool use, memory, testing, and guardrail learning nodes. |
| `Automating_Google_Search_Lead_Generation_in_n8n.mp4` | Practical capstone/build example for web research and lead-routing automation. |
| `Blueprint_of_Autonomy.pdf` | Autonomy boundaries, human-in-the-loop, and operational safety content. |
| `NotebookLMMindMap.png`, `Mastering_Automation_and_AI_Agents.webp`, `Horizontal_Scaling_Queue_Architecture_Diagram.webp`, `Blueprint_for_Building_AI_Agents.webp`, `AI_Automation_Mastery_Roadmap.webp` | Visual reference for stage naming, prerequisite relationships, and deployment/agent diagrams. Dense or high-resolution visuals will be read at native scale before extracting details. |

When the files are re-uploaded, the execution will extract only verified content. Videos will be transcribed and summarized; PDFs will be read for structured claims and resources; diagrams will be inspected at readable scale. No statement, title, link, or diagram relationship will be invented from these filenames alone.

## Execution Phases

### Phase 1 — Diagnose Delivery and Quality Failures

1. Retrieve the latest failed GitHub Actions run and its job logs.
2. Reproduce the exact CI commands locally: `pnpm install --frozen-lockfile` and `pnpm run quality`.
3. Fix the root cause while preserving strict type checks, tests, and the production build. The initial diagnosis already indicates that `actions/setup-node` tries to cache pnpm before `pnpm/action-setup` installs it; the repair will validate the corrected ordering in an actual GitHub run.
4. Inspect the Vercel project’s live/paused state, current deployment status, build logs, aliases, runtime errors, and deployment protection. A fresh production deployment will only be triggered after the code/CI checkpoint.

### Phase 2 — Benchmark and Audit

1. Research roadmap.sh and one comparable public learning platform for reusable UX principles: connected nodes, prerequisites, progressive disclosure, practical project outcomes, and mobile adaptation.
2. Retrieve and save SimilarWeb traffic/engagement data for qualifying comparator domains using the latest available complete month. Treat the data as directional market research, not first-party analytics for The Data Tea.
3. Inspect the existing UI, tRPC resource query, database records, runtime logs, and bundle composition. Identify large initial rendering paths, broken empty/error states, and card-density bottlenecks.
4. Run a bounded URL audit against library sources, recording final status, redirects, duplicate URLs, stage, source, and quality category. Identify replacement candidates from official n8n, OpenAI, MDN, Google, Docker, and vendor documentation.

### Phase 3 — Implement the Visual AI Automation Experience

1. Build an original visual **AI Automation Path Map** with connected stages, prerequisite arrows, outcome labels, estimated time, progress state, and status legend.
2. Add a focused stage-detail view/drawer containing an outcome, core skills, prerequisite cues, practical deliverable, selected resources, and the next best action. Avoid mounting all library cards inside the route map.
3. Retain completion persistence through the existing authenticated roadmap procedures and offer signed-out learners a precise sign-in entry point.
4. Refine navigation into a route context that supports jump-to-stage, library discovery, projects, and learner tools. Ensure keyboard access, visible focus, sensible screen-reader labels, and deep-linkable stage state where appropriate.
5. On mobile, switch the map to a vertical ordered path with the same content hierarchy and tap targets; do not preserve an impractical wide desktop canvas.
6. Create a Mermaid learning-process diagram in `docs/` from the final stage structure and optionally render it for documentation.

### Phase 4 — Improve Resources and Performance

1. Update invalid or weak resource records with validated, authoritative direct links, while preserving source labels and module relevance.
2. Keep catalogue entries that only point to YouTube search results clearly labelled as search/discovery fallbacks. Replace them with exact video permalinks only when reliable IDs are provided or safely validated.
3. Add resource health/provenance visibility only where it improves learner decisions without overwhelming the interface.
4. Reduce initial render cost by progressively revealing resource cards, code-splitting noncritical sections where valuable, and retaining compact loading/empty/error states.
5. Respect `prefers-reduced-motion`; keep transitions short, transform/opacity-based, and secondary to navigation clarity.

### Phase 5 — Validate, Publish, and Document

1. Add or update unit tests for map selection, resource filtering/search, and any new data-helper logic.
2. Verify desktop and mobile visual behavior, map navigation, filters, library empty/error states, sign-in/learn-progress states, vault access, and submission form behavior in the browser.
3. Run the full local quality gate and confirm the GitHub Actions run is successful after the checkpoint is pushed.
4. Validate Vercel production by probing the stable alias and deployment-specific URL for `200` HTML, current hashed JavaScript assets, and JSON tRPC behavior. Inspect the rendered production page as a user would.
5. Update the README and research/validation notes with the visual architecture, link-audit outcome, GitHub Actions fix, SimilarWeb benchmark limitations, and any remaining direct-video-link dependency.

## Acceptance Criteria

| Requirement | Evidence of completion |
|---|---|
| Visual and specialized AI Automation roadmap | Interactive connected path map, focused stage details, project outcomes, progress states, and responsive vertical mobile mode. |
| Original roadmap.sh-inspired UX | Browser review shows learnable navigation and progressive disclosure without copied design assets or branded imitation. |
| GitHub quality gate | A new run of **Type-check, test, and build** succeeds after the exact failure is repaired. |
| Resource integrity | A reproducible URL audit documents status and replacements; visible fallback labels remain for unresolved YouTube search links. |
| Performance and usability | Current UI has bounded initial resource rendering, useful loading/empty/error states, keyboard access, mobile fit, and reduced-motion support. |
| Production availability | Latest Vercel deployment is live and serving HTML, static assets, and public tRPC correctly from the stable alias. |
| User-source integration | Re-uploaded files are processed into verified curriculum/resource content, with transparent provenance and no filename-based assumptions. |

## Risks and Required Follow-Up

The failed uploads are not readable in the current environment. Re-uploading the actual video, PDF, and image files is required before their contents can shape the curriculum. Likewise, an exact URL is required for the requested “Computable” comparison.

The imported master catalogue currently includes 207 YouTube search-result URLs rather than direct video permalinks. This is an openly documented limitation. The redesign can make those links useful and clearly labelled, but a direct-video replacement pass requires a verified source export or individual video URLs.

## Deliverables

The completed release will include the redesigned production website, source-controlled interactive map components, Mermaid learning-process source, cleaned resource records and audit output, tested GitHub Actions workflow, updated documentation, GitHub checkpoint, and a validated Vercel production deployment.
