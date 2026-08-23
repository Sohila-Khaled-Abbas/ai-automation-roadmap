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

## Direct YouTube Recovery from the Shared Notebook — August 2026

The shared Gemini Notebook was accessible in the connected account and exposes its grouped sources and downloadable catalogue files. It does not present a static item-level URL export in its initial source-panel view. Targeted public YouTube research then identified two official `Kariim Nabiil - كريم نبيل` playlists, and their extracted public item lists provided creator- and title-matched direct pages. Exact title matches, together with a browser check of individual video-page titles, were required before any existing link was changed.

| Recovery source | Verified direct-video replacements | Evidence retained |
|---|---:|---|
| Exact-title public search plus video-page verification | 5 | `docs/direct-youtube-candidates.json` |
| Official `n8n with Karim` playlist | 6 additional non-duplicate records | `docs/verified-youtube-playlist-matches.json` |
| Official `Advanced n8n with Karim` playlist | 6 additional records | `docs/verified-advanced-youtube-playlist-matches.json` |
| Official `n8n with Karim` playlist — second guarded batch | 10 additional records | `docs/verified-youtube-playlist-batch-2.json` |
| Public direct-page title-variant verification | 1 additional record | `docs/verified-youtube-title-variant-match.json` |
| Public direct-page exact-title verification | 1 additional record | `docs/verified-youtube-ai-agents-introduction-match.json` |
| Public direct-page Ryan & Matt title-and-provider verification | 1 additional record | `docs/verified-youtube-n8n-features-match.json` |
| Public direct-page Ryan & Matt image-workflow verification | 1 additional record | `docs/verified-youtube-ai-image-editing-match.json` |
| Public direct-page Ryan & Matt real-estate-workflow verification | 1 additional record | `docs/verified-youtube-real-estate-outreach-match.json` |
| Public direct-page Ryan & Matt LinkedIn lead-generation verification | 1 additional record | `docs/verified-youtube-linkedin-lead-generation-match.json` |
| Public direct-page Ryan & Matt webhooks verification | 1 additional record | `docs/verified-youtube-webhooks-match.json` |
| Public direct-page Ryan & Matt LinkedIn job-scraper verification | 1 additional record | `docs/verified-youtube-linkedin-job-scraper-match.json` |
| Public direct-page Ryan & Matt Notion-connection verification | 1 additional record | `docs/verified-youtube-notion-connection-match.json` |
| Public direct-page Ryan & Matt Telegram-connection verification | 1 additional record | `docs/verified-youtube-telegram-connection-match.json` |
| Public direct-page Ryan & Matt native-data-tables verification | 1 additional record | `docs/verified-youtube-native-data-tables-match.json` |
| Public direct-page Ryan & Matt Google Sheets verification | 1 additional record | `docs/verified-youtube-google-sheets-match.json` |
| Public direct-page Ryan & Matt bulk-PDF-generator verification | 1 additional record | `docs/verified-youtube-bulk-pdf-generator-match.json` |
| Public direct-page Ryan & Matt Apify-node verification | 1 additional record | `docs/verified-youtube-apify-node-match.json` |
| Public direct-page Ryan & Matt binary-data verification | 1 additional record | `docs/verified-youtube-binary-data-match.json` |
| Public direct-page Ryan & Matt AI Information Extractor verification | 1 additional record | `docs/verified-youtube-ai-information-extractor-match.json` |
| Public direct-page Ryan & Matt first-AI-agent verification | 1 additional record | `docs/verified-youtube-first-ai-agent-match.json` |
| Public direct-page Ryan & Matt GPT-5 connection verification | 1 additional record | `docs/verified-youtube-gpt-5-connection-match.json` |
| Public direct-page Ryan & Matt Google Drive verification | 1 additional record | `docs/verified-youtube-google-drive-match.json` |
| Public direct-page Ryan & Matt AI-agent prompts verification | 1 additional record | `docs/verified-youtube-ai-agent-prompts-match.json` |
| Public direct-page Ryan & Matt sentiment-analysis verification | 1 additional record | `docs/verified-youtube-sentiment-analysis-match.json` |
| Public direct-page Ryan & Matt Apollo-and-Apify-leads verification | 1 additional record | `docs/verified-youtube-apollo-apify-leads-match.json` |
| Public direct-page Ryan & Matt n8n-getting-started verification | 1 additional record | `docs/verified-youtube-get-started-match.json` |
| Public direct-page Ryan & Matt n8n-learning-path verification | 1 additional record | `docs/verified-youtube-learn-n8n-fast-match.json` |
| Public direct-page Ryan & Matt Gmail workflow verification | 1 additional record | `docs/verified-youtube-gmail-freelance-match.json` |
| Public direct-page Ryan & Matt Instagram-and-Apify verification | 1 additional record | `docs/verified-youtube-instagram-apify-match.json` |
| Public direct-page Ryan & Matt TikTok-and-Apify verification | 1 additional record | `docs/verified-youtube-tiktok-apify-match.json` |
| Public direct-page Ryan & Matt Google-Maps-and-Apify verification | 1 additional record | `docs/verified-youtube-google-maps-apify-match.json` |
| Public direct-page Ryan & Matt Hostinger self-hosting verification | 1 additional record | `docs/verified-youtube-hostinger-self-host-match.json` |
| Public direct-page Ryan & Matt free self-hosting verification | 1 additional record | `docs/verified-youtube-free-self-host-match.json` |
| Public direct-page Ryan & Matt Perplexity setup verification | 1 additional record | `docs/verified-youtube-perplexity-setup-match.json` |
| Public direct-page Ryan & Matt OpenRouter model-selector verification | 1 additional record | `docs/verified-youtube-openrouter-model-selector-match.json` |
| Public direct-page Ryan & Matt HubSpot workflows verification | 1 additional record | `docs/verified-youtube-hubspot-workflows-match.json` |
| Public direct-page Ryan & Matt Call n8n Workflow Tool verification | 1 additional record | `docs/verified-youtube-call-workflow-tool-match.json` |
| Public direct-page Ryan & Matt Limit Node verification | 1 additional record | `docs/verified-youtube-limit-node-match.json` |
| Public direct-page Ryan & Matt Sort Node verification | 1 additional record | `docs/verified-youtube-sort-node-match.json` |
| Public direct-page Ryan & Matt Summarize Node verification | 1 additional record | `docs/verified-youtube-summarize-node-match.json` |
| Public direct-page Ryan & Matt human-in-the-loop verification | 1 additional record | `docs/verified-youtube-human-in-loop-match.json` |
| Public direct-page Ryan & Matt GoHighLevel Slack workflow verification | 1 additional record | `docs/verified-youtube-gohighlevel-slack-match.json` |
| Public direct-page Ryan & Matt AI email assistant verification | 1 additional record | `docs/verified-youtube-ai-email-assistant-match.json` |
| Public direct-page Ryan & Matt n8n V2 sub-workflow verification | 1 additional record | `docs/verified-youtube-n8n-v2-subworkflows-match.json` |
| Public direct-page Ryan & Matt RAG metadata verification | 1 additional record | `docs/verified-youtube-rag-metadata-match.json` |
| Public direct-page Ryan & Matt foundational AI-nodes verification | 1 additional record | `docs/verified-youtube-ai-nodes-match.json` |
| Public direct-page Ryan & Matt n8n triggers verification | 1 additional record | `docs/verified-youtube-triggers-match.json` |
| Public direct-page Ryan & Matt n8n Merge Node verification | 1 additional record | `docs/verified-youtube-merge-node-match.json` |
| Public direct-page Ryan & Matt n8n Aggregate Node verification | 1 additional record | `docs/verified-youtube-aggregate-node-match.json` |
| Public direct-page Ryan & Matt n8n Summarization Chain verification | 1 additional record | `docs/verified-youtube-summarization-chain-match.json` |
| Public direct-page Ryan & Matt n8n MCP Cloud/Self Host verification | 1 additional record | `docs/verified-youtube-mcp-cloud-self-host-match.json` |
| Public direct-page Ryan & Matt Nano Banana n8n verification | 1 additional record | `docs/verified-youtube-nano-banana-pro-match.json` |
| Public direct-page Ryan & Matt OpenAI search-feature verification | 1 additional record | `docs/verified-youtube-openai-search-match.json` |
| Public direct-page Ryan & Matt REST APIs n8n verification | 1 additional record | `docs/verified-youtube-rest-apis-match.json` |
| Public direct-page Ryan & Matt n8n duplicate-removal verification | 1 additional record | `docs/verified-youtube-remove-duplicates-match.json` |
| Public direct-page Ryan & Matt LLM Chains verification | 1 additional record | `docs/verified-youtube-llm-chains-match.json` |
| Public direct-page Ryan & Matt n8n RSS monitoring verification | 1 additional record | `docs/verified-youtube-rss-monitoring-match.json` |
| Public direct-page Ryan & Matt n8n pagination verification | 1 additional record | `docs/verified-youtube-pagination-match.json` |
| Public direct-page Ryan & Matt Streamlit-and-n8n verification | 1 additional record | `docs/verified-youtube-streamlit-n8n-match.json` |
| Public direct-page Ryan & Matt Gemini 3 Pro n8n verification | 1 additional record | `docs/verified-youtube-gemini-3-pro-match.json` |
| Public direct-page Ryan & Matt n8n evaluations verification | 1 additional record | `docs/verified-youtube-n8n-evaluations-match.json` |
| Public direct-page Ryan & Matt n8n learning-reality verification | 1 additional record | `docs/verified-youtube-n8n-learning-reality-match.json` |
| Public direct-page Ryan & Matt n8n error-handling verification | 1 additional record | `docs/verified-youtube-error-handling-match.json` |
| Public direct-page Ryan & Matt n8n credential-setup verification | 1 additional record | `docs/verified-youtube-credential-setup-match.json` |
| Public direct-page Ryan & Matt 17-hour n8n course verification | 1 additional record | `docs/verified-youtube-ultimate-course-match.json` |
| Public direct-page Ryan & Matt n8n client-acquisition verification | 1 additional record | `docs/verified-youtube-high-paying-customer-match.json` |
| Public direct-page Ryan & Matt n8n client-discovery verification | 1 additional record | `docs/verified-youtube-client-discovery-match.json` |
| Public direct-page Ryan & Matt n8n Chat Hub verification | 1 additional record | `docs/verified-youtube-chat-hub-match.json` |
| Public direct-page Ryan & Matt n8n Airtable integration verification | 1 additional record | `docs/verified-youtube-airtable-integration-match.json` |
| Public direct-page Ryan & Matt n8n Compare Datasets verification | 1 additional record | `docs/verified-youtube-compare-datasets-match.json` |
| Public direct-page Ryan & Matt n8n Date & Time node verification | 1 additional record | `docs/verified-youtube-date-time-node-match.json` |
| Public direct-page Ryan & Matt n8n Edit Fields node verification | 1 additional record | `docs/verified-youtube-edit-fields-match.json` |
| Public direct-page Ryan & Matt n8n Convert to File verification | 1 additional record | `docs/verified-youtube-convert-to-file-match.json` |
| Public direct-page Ryan & Matt n8n If node verification | 1 additional record | `docs/verified-youtube-if-node-match.json` |
| Public direct-page Ryan & Matt n8n AI Guardrails verification | 1 additional record | `docs/verified-youtube-ai-guardrails-match.json` |
| Public direct-page Ryan & Matt n8n Python Code node verification | 1 additional record | `docs/verified-youtube-python-code-node-match.json` |
| Public direct-page Ryan & Matt n8n OpenAI RAG embeddings verification | 1 additional record | `docs/verified-youtube-rag-embeddings-match.json` |
| Public direct-page Ryan & Matt n8n Cohere RAG reranker verification | 1 additional record | `docs/verified-youtube-rag-reranker-match.json` |
| Public direct-page Ryan & Matt n8n RAG text-splitter verification | 1 additional record | `docs/verified-youtube-rag-text-splitters-match.json` |
| Public YouTube oEmbed fallback verification during connected-browser outage | 3 additional records | `docs/verified-youtube-oembed-fallback-2026-08-23.json` |
| Public YouTube oEmbed workflow-pattern verification during connected-browser outage | 3 additional records | `docs/verified-youtube-oembed-workflow-patterns-2026-08-23.json` |
| Public YouTube oEmbed Arabic AI Plus verification during connected-browser outage | 3 additional records | `docs/verified-youtube-oembed-arabic-ai-plus-2026-08-23.json` |
| Public YouTube oEmbed AI Agents-versus-Workflows verification during connected-browser outage | 1 additional record; three nearby variants retained | `docs/verified-youtube-oembed-ai-agent-workflow-2026-08-23.json` |
| Public YouTube oEmbed remaining Ryan & Matt workflow verification during connected-browser outage | 3 additional records | `docs/verified-youtube-oembed-remaining-ryan-matt-2026-08-23.json` |
| Public YouTube oEmbed workflow-concepts and AI Plus LLM-chain verification during connected-browser outage | 3 additional records; one conflicting provider corrected | `docs/verified-youtube-oembed-ai-plus-llm-chains-2026-08-23.json` |
| Public YouTube oEmbed AI Plus Ollama, Gemini-pricing, and Grok4 verification during connected-browser outage | 3 additional records | `docs/verified-youtube-oembed-ai-plus-gemini-grok-2026-08-23.json` |
| Public YouTube oEmbed AI Plus Grok4-chatbot and RAG vector-database verification during connected-browser outage | 3 additional records | `docs/verified-youtube-oembed-ai-plus-rag-branches-2026-08-23.json` |
| Public YouTube oEmbed AI Plus GPT-Oss and GPT-5 verification during connected-browser outage | 3 additional records | `docs/verified-youtube-oembed-ai-plus-gpt5-2026-08-23.json` |
| Public YouTube oEmbed AI Plus WhatsApp API verification during connected-browser outage | 3 additional records | `docs/verified-youtube-oembed-ai-plus-whatsapp-2026-08-23.json` |
| Public YouTube oEmbed AI Plus Docker, Meta Business Account, and Community Nodes verification during connected-browser outage | 3 additional records | `docs/verified-youtube-oembed-ai-plus-docker-community-2026-08-23.json` |
| Public YouTube oEmbed AI Plus Evolution API and Hostinger VPS verification during connected-browser outage | 3 additional records | `docs/verified-youtube-oembed-ai-plus-evolution-hostinger-2026-08-23.json` |
| Public YouTube oEmbed AI Plus MCP verification during connected-browser outage | 3 additional records | `docs/verified-youtube-oembed-ai-plus-mcp-2026-08-23.json` |
| Total collection status | 140 direct YouTube pages; 66 search fallbacks remain | Persistent-library verification query |

The recovered entry **`016 | AI Agents Introduction | مقدمة عن وكلاء الذكاء الاصطناعي`** was checked against its public video page before replacement. Its title matched exactly and its creator metadata identified Karim Nabil; the persistent provider and description were corrected to match that evidence. The remaining 66 catalogue search links have not been guessed or bulk-replaced; each still requires an exact item-level title-and-provider match from a public playlist, direct page, or Notebook export.

### Public-only recovery constraint

The user requested that no Google or Notebook sign-in be required for continued recovery. The shared Notebook is therefore treated as a non-blocking reference unless a public export or copied item-level source list is supplied. Further replacements use only publicly accessible playlist and direct-video evidence with exact title-and-provider checks; ambiguous candidates remain labelled YouTube-search fallbacks.

On 23 August, a public AI Automation playlist surfaced by targeted search did not expose item-level content before the connected browser timed out. It therefore supplied no replacement evidence, and the remaining candidate link was left unchanged.
