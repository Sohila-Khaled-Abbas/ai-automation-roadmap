# Learning Resource Research Notes

## Gemini Notebook

The shared public notebook, **“n8n Mastery: From Basic Automation to Advanced AI Agents,”** contains **217 sources** grouped into AI Agents, API and Integration, Business Automation Cases, Data Handling, Deployment and Hosting, Introduction and Tutorials, LLM Models, MCP and Multi-Agents, Miscellaneous, n8n Career and Business, n8n Core Nodes, and RAG and Vectors. The Notebook itself states that the source collection comes from a video tutorial series by Karim Nabil focused on business-driven n8n automation, triggers, nodes, actions, application connections, local Docker setup, JSON, and APIs.

The public library now contains one stage-mapped resource pack for each accessible Notebook category, in addition to the two previously verified direct YouTube lessons. Each pack links to the shared Notebook and retains the source label **Gemini Notebook · Source collection**, so learners can browse the complete category source set without misrepresenting an unavailable item-level URL export. The attached OpenAI Prompt Engineering and Structured Outputs documents were reviewed and matched existing direct resources, so they were not duplicated.

The Introduction and Tutorials group visibly includes these learner-facing sources:

- `001 | n8n with Karim | n8n from Business Perspective`
- `004 | n8n with Karim | Nodes, Triggers, Workflows`
- `13 n8n Workflow Concepts For Beginners (2026 Update)`
- `Essentials: Your First Workflows | n8n`
- `How to Get Started with n8n (without feeling overwhelmed)`

The Notebook’s direct **“004 | n8n with Karim | Nodes, Triggers, Workflows”** source resolves to [YouTube video `xv9gQkdPa5g`](https://www.youtube.com/watch?v=xv9gQkdPa5g). The Notebook source guide describes it as an introduction to n8n’s core architecture, including nodes, workflows, configuration, credentials, actions, and triggers. This belongs in the **Orient** stage of the public resource library and retains the source label **Gemini Notebook · YouTube**.

The Notebook’s API and Integration group also contains **“008 | API Explanation (For Beginners),”** which resolves to [YouTube video `ALMbLRbHMCE`](https://www.youtube.com/watch?v=ALMbLRbHMCE). Its source guide introduces APIs as a bridge between software applications and explains the request/response pattern. This belongs in the **Connect** stage and also uses the source label **Gemini Notebook · YouTube**.

## YouTube Candidates

The official n8n YouTube beginner series includes **“n8n Beginner Course (1/9) - Introduction to Automation”** and an Advanced Course lesson on error workflows. These are appropriate for early workflow fundamentals and production hardening, respectively. The library will label any source selected from the Notebook as **Gemini Notebook** and any externally validated video as **YouTube**.

## n8n Mastery Catalogue Import — August 2026

The supplied file `n8n-mastery-sources-catalogue.docx` was parsed from its embedded Word hyperlink relationships rather than from its visible **“Direct Link”** labels alone. It contains **218 catalogue rows**: 17 Arabic foundational lessons, 88 Arabic AI-agents and scaling lessons, 102 English tutorials and workflows, and 11 official technical references. This reconciles the document’s internally inconsistent summary: its prose mentions 217 sources, while its category totals correctly add to 218.

All 218 supplied destinations returned HTTP 200 during a bounded validation pass. The 207 video entries resolve to public YouTube **search-result URLs**, not immutable individual video URLs; they are therefore labelled **`n8n Mastery Catalogue · … · YouTube search`** and their card descriptions explicitly say that the link opens a YouTube search for the named lesson. This preserves the source’s usable discovery path without misrepresenting it as a direct video permalink.

| Validation outcome | Count | Handling |
|---|---:|---|
| Extracted catalogue rows | 218 | Accounted for in the reproducible catalogue inventory. |
| HTTP-validated rows | 218 | All destinations returned HTTP 200. |
| Repeated URL within the catalogue | 1 | Skipped to keep the imported collection URL-distinct. |
| Existing library duplicate | 1 | `Essentials: Your First Workflows` was already present and was preserved rather than copied. |
| Newly imported resources | 216 | Added to the persistent resource library. |

The import expanded the library from **40 to 256 resources**. It added 17 Arabic foundational videos, 87 Arabic advanced agent/scaling videos after the in-catalogue duplicate is removed, 102 English tutorial/workflow videos, eight technical guides, and two technical templates. The imported records are URL-distinct and are mapped across `orient`, `connect`, `shape`, `orchestrate`, `augment`, `agents`, `operate`, and `capstone`. Reproducible inventory, validation, mapping, and dry-run/apply tooling live in `docs/n8n-mastery-catalogue-*.json`, `server/catalogueImport.ts`, and `scripts/`.

## Direct Official Link Additions — August 2026

The public library now contains **261 resources** after five direct official n8n references were added to reinforce the visual roadmap’s stage outcomes. These additions intentionally favour current primary documentation over general search results or secondary articles.

| Stage | Resource | Learning purpose | Source |
|---|---|---|---|
| Prepare | [Start n8n locally with Docker](https://docs.n8n.io/deploy/host-n8n/install-options/install-with-docker/) | Local setup, persistence, time zones, and self-hosting precautions. The page now directs learners to Docker Compose as the recommended installation path. | Official n8n Docs |
| Shape | [Using the n8n Code node](https://docs.n8n.io/build/code-in-n8n/using-the-code-node/) | JavaScript/Python execution modes, safe data work, and Code-node constraints. | Official n8n Docs |
| Operate | [Set up external task runners](https://docs.n8n.io/deploy/host-n8n/configure-n8n/set-up-task-runners/) | Production-safe isolation for user-provided Code-node scripts. | Official n8n Docs |
| Operate | [Scale n8n with queue mode](https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode/) | Main process, Redis, workers, scaling, and operational guardrails. | Official n8n Docs |
| Agents | [Build with the n8n AI Agent node](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/) | Tool-connected agents, current Tools Agent behavior, and template discovery. | Official n8n Docs |

The source audit also retains a visible distinction between direct authoritative links and the 207 catalogue entries that lead to YouTube search results. Those search entries are working discovery links, but they are not represented as direct video permalinks; a verified item-level video export is still required before replacing them.

## Generic Academy Link Remediation — August 2026

Two early curriculum entries originally sent learners to the generic `learn.n8n.io/courses` landing page. They have been remapped to direct stage-appropriate sources: the **Orient** quickstart now uses [Build your first workflow](https://docs.n8n.io/build-your-first-workflow/), which covers triggers, credentials, data, logic, expressions, testing, and publishing; the **Connect** course now uses [N8N102 Integrations: APIs & Connected Workflows](https://learn.n8n.io/courses/course-v1:n8n+N8N102+2026H2/about/), which directly teaches API requests, webhooks, authentication, credentials, data handling, and flow control. These replacements make the route-specific cards more useful than a generic catalogue page while preserving official n8n provenance.

### Post-improvement validation

On the final validation pass, the direct n8n quickstart and Code-node pages returned HTTP 200. The N8N102 Academy entry initially returned 404 because the stored URL had a trailing slash; the canonical URL without that trailing slash returned HTTP 200 and replaced the persisted record. The direct Gemini Notebook YouTube video was rate-limited by YouTube during automated checking (HTTP 429), so it remains in the library as a verified direct source rather than being treated as broken.

## Spreadsheet Reconciliation — August 2026

The supplied `n8n-mastery-sources-catalogue.xlsx` was parsed from its embedded Excel hyperlinks, not the visible **“View Docs”** labels. Its **217 rows contain 217 unique URLs**: 206 YouTube search-result URLs and 11 external technical-reference URLs. It contains **no** `youtube.com/watch` or `youtu.be` item-level video permalinks.

| Reconciliation measure | Result | Import decision |
|---|---:|---|
| Spreadsheet rows | 217 | Fully extracted to `docs/n8n-mastery-xlsx-extracted.json`. |
| Unique spreadsheet URLs already in prior catalogue | 217 of 217 | No new source destination is available for insertion. |
| Direct video permalinks | 0 | No YouTube search-result card may be replaced from this file. |
| Current n8n Mastery collection | 216 records | Retained unchanged; one source was already represented elsewhere in the library during the original deduplicated import. |

The workbook therefore confirms and strengthens the existing provenance record, but it cannot complete the exact-video-link replacement. A copied list of specific video pages (`youtube.com/watch?v=…` or `youtu.be/…`) or a Notebook item-level export containing those pages is still required before the 206 search-result links can be upgraded.
