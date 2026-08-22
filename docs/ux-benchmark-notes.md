# Learning-Path UX Benchmark Notes

## Design References

The roadmap redesign uses general interaction patterns observed on [roadmap.sh](https://roadmap.sh/) and public learning-path products: a visible ordered path, focused stage detail, prerequisites, resource discovery, and project-oriented outcomes. The Data Tea implementation is original and specialized to AI automation, n8n workflow engineering, data handling, AI agents, and deployment rather than developer-role roadmaps.

| Pattern adopted | Data Tea implementation |
|---|---|
| Connected learning path | Interactive `Prepare → Orient → Connect → Orchestrate → Shape → Augment → Operate → Agents → Capstone` map. |
| Progressive disclosure | Clicking a stage reveals its outcome, core skills, deliverable, prompt, and at most six stage resources. |
| Practical navigation | Stage buttons jump to context; the full library supports stage, type, and search filtering. |
| Learner state | Signed-in learners retain completion state; signed-out learners are given a clear save-progress action. |
| Mobile adaptation | The grid wraps to an ordered vertical path instead of requiring a wide canvas. |

## SimilarWeb Limitation

The planned SimilarWeb comparison for `roadmap.sh` and `codecademy.com` could not be retrieved in this session because the external data call reached a credit-terminal state before responses could be saved. No traffic, engagement, or ranking claims are made from unavailable data. The implementation therefore uses publicly observable navigation patterns and the documented product requirements rather than unverified analytics.

## References

1. [roadmap.sh — Developer Roadmaps](https://roadmap.sh/)
2. [roadmap.sh — Roadmap Directory](https://roadmap.sh/roadmaps)
3. [n8n — AI Agent documentation](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/)
4. [n8n — Queue mode deployment documentation](https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode/)
5. [n8n — Workflow templates](https://n8n.io/workflows/)
