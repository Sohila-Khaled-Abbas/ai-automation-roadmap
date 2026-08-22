# Expanded Learning-Process Resource Research

## Data handling and workflow logic

The expanded process should add an explicit data-handling practice stage before complex orchestration. Official n8n material establishes that workflow data passes from node to node, can be inspected in node views and execution logs, and can be transformed with dedicated nodes, expressions, the Code node, or AI-assisted transformation tools.[1]

The learner path will include these validated references:

| Resource | Learning use | URL |
| --- | --- | --- |
| Working with data overview | Understand data items, inspection, transformation, and item linking. | https://docs.n8n.io/build/work-with-data/overview |
| Expressions for data transformation | Practice clear preparation steps with Edit Fields and expressions. | https://docs.n8n.io/build/work-with-data/transform-data/expressions-for-data-transformation |
| Code node | Add bounded JavaScript or Python logic when built-in nodes are not enough. | https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.code |
| Reference data | Reuse values from earlier workflow nodes without changing them. | https://docs.n8n.io/build/work-with-data/reference-data |

## References

[1]: https://docs.n8n.io/build/work-with-data/overview "n8n Docs: Working with data overview"

## AI agents, deployment, and operations

The advanced curriculum should move learners from a bounded AI step to durable agent behavior, then to operational ownership. n8n documents session memory options such as Simple Memory, Redis Chat Memory, and Postgres Chat Memory, plus the Chat Memory Manager for more involved use cases.[2] Its deploy documentation distinguishes managed Cloud use from self-hosting, which adds direct control over infrastructure, upgrades, configuration, and security.[3]

| Resource | Learning use | URL |
| --- | --- | --- |
| How memory works | Understand agent-context persistence and choose an appropriate memory approach. | https://docs.n8n.io/build/integrate-ai/understand-ai-components/how-memory-works |
| Deploy n8n | Make an intentional managed-versus-self-hosted decision for a capstone workflow. | https://docs.n8n.io/deploy |
| Debug executions | Reproduce a prior execution in the editor and debug from real data. | https://docs.n8n.io/build/understand-workflows/understand-executions/debug-executions |
| Set up logging | Configure useful log outputs and levels when operating self-hosted n8n. | https://docs.n8n.io/deploy/host-n8n/keep-n8n-running/set-up-logging |

[2]: https://docs.n8n.io/build/integrate-ai/understand-ai-components/how-memory-works "n8n Docs: How memory works"
[3]: https://docs.n8n.io/deploy "n8n Docs: Deploy"
