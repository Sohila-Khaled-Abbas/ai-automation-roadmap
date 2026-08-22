# Projects and Templates Research

## Public reference basis

The redesign will treat the roadmap as a **build path**, not a resource catalogue. The official n8n workflow library organizes reusable workflows across AI, sales, IT operations, marketing, document operations, support, and other categories. Its public examples demonstrate the value of showing both the intended outcome and the workflow components a learner will assemble.[1]

The official AI-agent guidance emphasizes a progressive production mindset: deterministic logic before model calls, human approval where decisions matter, explicit error handling, careful control of input/cost, and observation after release.[2] These principles inform the project-card acceptance criteria; they are not copied product content or visual assets.

The same guidance presents a practical build sequence—create an agent, add a model and memory, attach tools, then iterate and test—and identifies reusable workflow JSON alongside cost and evaluation controls. These are incorporated as stage-card proof signals rather than reproduced as an external product interface.[2]

| Stage emphasis | Original roadmap project card | Official public template reference | Build signal shown in the site |
|---|---|---|---|
| Connect | Inbox-to-sheet triage | [Workflow library](https://n8n.io/workflows/) | Trigger, mapping, credential test |
| Build | Support handoff router | [Workflow library](https://n8n.io/workflows/) | Branching, retry route, operator handoff |
| Shape | Document-to-brief pipeline | [Document Ops templates](https://n8n.io/workflows/) | Data cleaning, schema, auditable output |
| Augment | Approval-first reply assistant | [AI Agent chat](https://n8n.io/workflows/1954-ai-agent-chat/) | Prompt, context, explicit approval gate |
| Operate | Workflow health monitor | [IT Ops templates](https://n8n.io/workflows/) | Error trigger, alert, recovery evidence |
| Agents | Knowledge-grounded agent | [AI agent templates](https://n8n.io/ai-agents/) | Retrieval source, tool boundary, evaluation |
| Capstone | Automation operating system | [AI agent guidance](https://n8n.io/ai-agents/) | Handoff, logs, evaluation, reusable JSON |

## Original interface specification

The redesign uses an original **route-map canvas**: nine checkpoint nodes connected by a deliberately irregular, high-contrast path. Each route node exposes a compact “build proof” rather than duplicating the general resource cards. A side rail will summarize the learner’s current route, next unlock, and selected project challenge. The projects/templates section will use horizontal build cards, each with an outcome, component recipe, verification cue, and a direct public reference.

## Persistence and UI Validation

The seven curated challenges now reside in the `roadmapProjects` database table and are served through the public `projects.list` tRPC procedure. The frontend transforms the stored JSON recipe, provider, and source fields into the build-studio card contract; malformed recipes degrade to an empty component list rather than breaking the public page. Local quality validation passed with **11 test files and 22 tests**, including the persisted-project view mapping. The public payload was verified to contain both the `Signal inbox` and `Automation operating system` challenges as well as official n8n source labels.

The established The Data Tea palette remains the visual anchor: dark ink for the canvas, n8n pink for progress and primary actions, pale pink for active detail, and warm neutral paper for secondary evidence. The UI will preserve keyboard-visible focus states, reduced-motion support, and mobile conversion of the diagram into a connected vertical route.

## References

[1]: https://n8n.io/workflows/ "n8n Workflow Automation Templates"
[2]: https://n8n.io/ai-agents/ "n8n AI Agent Builder"
