# Hugging Face Feature Assessment

## Decision

The current Hugging Face connection is usable for **agent-side research and model discovery**, but it is not itself a website runtime integration. The active roadmap work already provides deterministic stage selection, curated resources, persisted progress, and a structured submission route. Adding a general-purpose chat agent without a defined learner task would duplicate that guidance, obscure resource provenance, and introduce avoidable operational and safety complexity.

The recommended decision is therefore to **defer a Hugging Face-powered learner agent** until the product has a clearly specified job and a deployable, server-side credential arrangement. No user API key or runtime service credential is present in the web project, and the task-scoped connection must not be embedded in browser code or treated as a production secret.

## Verified Capability Boundary

| Area | Current status | Implication |
|---|---|---|
| Task-side Hugging Face connection | Authenticated for account-level Hub discovery and inference-capable tooling | Suitable for research and model evaluation during maintenance. |
| Website runtime credential | Not configured | The deployed app cannot safely call an account-bound agent connector. |
| Current learner experience | Stage map, curated resources, persisted progress, private vault, and submissions are already available | No agent is required to complete the requested infographic feature. |
| Recommended next feature | Narrow “workflow brief reviewer” or “next-stage planner” with bounded structured output | Requires the user to choose a specific job, model/provider, retention policy, and server-side credential method. |

## Guardrails for a Future AI Feature

A future implementation should be authenticated, server-mediated, rate-limited, and limited to a small structured input such as a learner’s stage, workflow objective, tools, and constraints. It should return clearly labelled suggestions rather than authoritative answers, avoid sending private vault files by default, and state whether text is retained by the selected provider. The existing resource library must remain the canonical source of learning links.
