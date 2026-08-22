# GitHub Maintenance Guide

The repository is the change-control record for **The Data Tea · AI Automation Roadmap**. Treat a pull request as a small, reviewable statement of learner value, data impact, test evidence, and release readiness—not merely a collection of edited files.

## Repository map

| Area | Responsibility | Review focus |
| --- | --- | --- |
| `client/src/pages/` and `client/src/components/` | Public learning route, visual roadmap, library, field kit, and contribution flows | Keyboard behavior, mobile layout, loading/error/empty states, and readable information hierarchy. |
| `client/src/lib/` | Pure view transforms and curriculum-derived data | Deterministic Vitest coverage and stable data mapping. |
| `server/` | tRPC procedures, validation, persistence helpers, and secure storage flow | Authorization boundary, input validation, and public-versus-private procedure choice. |
| `drizzle/` | Schema and reviewed migrations | Schema-first migration workflow; no direct production-schema edits. |
| `docs/` | Research provenance, content maintenance, design rationale, and release runbooks | Accurate references, transparent limitations, and current operational instructions. |
| `.github/` | Quality gate plus contributor-facing issue and pull-request templates | Commands stay reproducible and CI remains strict. |

## Branch and pull-request workflow

Create a focused branch from `main`, then keep the change small enough to explain through the pull-request template. Before requesting review, run `pnpm run quality`, examine changed user flows at desktop and mobile widths, and include migration SQL when a schema change is involved. GitHub Actions must finish successfully before the corresponding Vercel deployment is treated as verified. GitHub documents the pull-request workflow and required-check configuration in its repository guidance. [1]

> **Content rule:** never fabricate learner reviews, ratings, testimonials, completion activity, or outcome claims. Curated resources and project challenges require a direct URL, provider, source label, route stage, and an honest description of scope.

## Roadmap content maintenance

Curated resources are stored in `learningResources`; build challenges are stored in `roadmapProjects`. Both are public learning data, so each addition must be traceable and stage-mapped.

| Content type | Required fields | Verification before merge |
| --- | --- | --- |
| Learning resource | Stage, title, description, URL, provider, type, effort, source | Destination is public and relevant; type filter and stage filter still work. |
| Build challenge | Slug, stage, route label, proof statement, component recipe, official reference URL, provider, source, sort order | `recipeJson` parses safely; project endpoint returns it in order; card retains a readable proof and source label. |
| Direct video remediation | Exact original title, direct permalink, provider/source evidence | Browser or public-page title check; guarded update; provenance record; no title guesswork. |

After changing content, use the public tRPC collection endpoints locally and confirm that the UI renders loading, populated, and empty states. Update `docs/resource-research.md` or `docs/projects-templates-research.md` with the evidence that supports the change. Do not restore a sign-in-dependent public flow unless a separate privacy and authorization decision has been recorded.

## Issue triage

Use the included issue templates. A defect report should include the route, expected and observed result, reproduction steps, and browser/device context. A content proposal should identify the exact learning outcome, route stage, direct source URL, provider, and why it is trustworthy. Security-sensitive findings must not be filed as public issues; follow [`SECURITY.md`](../SECURITY.md).

## References

[1]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests "GitHub Docs — Collaborating with pull requests"
