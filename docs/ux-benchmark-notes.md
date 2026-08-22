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

## Accessibility and Performance Improvements — August 2026

The refinement pass adds a visible-on-focus skip link, a named main landmark, high-contrast global keyboard focus, map-control relationships to the stage-detail region, corrected sequential stage labels from `00` through `08`, and increased coarse-pointer control sizing. These decisions prioritize discoverability and reliable activation: W3C defines a 24 × 24 CSS-pixel minimum target size or equivalent spacing, while web.dev recommends approximately 48 device-independent pixels and spacing for touch users.[6] [7] The visual path’s stage cards already exceed these minima; the remaining navigation and form controls now receive a larger coarse-pointer hit area as well.

The resource library continues to limit initial rendering and reveals later results in batches. This follows MDN’s performance guidance to keep work outside the first-paint and interactive critical paths, and to avoid keeping non-visible long-list elements in the DOM.[8] The existing vendor split and progressive resource rendering therefore remain deliberate performance choices rather than cosmetic build changes. W3C’s keyboard-focus guidance also supports maintaining an obvious focus indicator for every interactive control.[9]

## References

1. [roadmap.sh — Developer Roadmaps](https://roadmap.sh/)
2. [roadmap.sh — Roadmap Directory](https://roadmap.sh/roadmaps)
3. [n8n — AI Agent documentation](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/)
4. [n8n — Queue mode deployment documentation](https://docs.n8n.io/deploy/host-n8n/configure-n8n/scaling/enable-queue-mode/)
5. [n8n — Workflow templates](https://n8n.io/workflows/)
6. [W3C WAI — Understanding Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
7. [web.dev — Accessible tap targets](https://web.dev/articles/accessible-tap-targets)
8. [MDN — Performance fundamentals](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Fundamentals)
9. [W3C WAI — Visible keyboard focus](https://www.w3.org/WAI/test-evaluate/easy-checks/keyboard-focus/)
