<div align="center">

# The Data Tea · AI Automation Roadmap

### A full-stack n8n learning product for building useful, reliable AI workflows

[![Production](https://img.shields.io/badge/Production-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://ai-automation-roadmap-git-main-sohila-khaled-abbas-projects.vercel.app)
[![Main CI](https://github.com/Sohila-Khaled-Abbas/ai-automation-roadmap/actions/workflows/ci.yml/badge.svg?branch=main&style=for-the-badge)](https://github.com/Sohila-Khaled-Abbas/ai-automation-roadmap/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![n8n](https://img.shields.io/badge/n8n-Automation-EA4B71?style=for-the-badge&logo=n8n&logoColor=white)](https://n8n.io/)

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=111827)](https://react.dev/)
[![tRPC](https://img.shields.io/badge/tRPC-End--to--end%20types-398CCB?style=flat-square&logo=trpc&logoColor=white)](https://trpc.io/)
[![Drizzle](https://img.shields.io/badge/Drizzle-ORM-C5F74F?style=flat-square&logo=drizzle&logoColor=111827)](https://orm.drizzle.team/)
[![MySQL](https://img.shields.io/badge/MySQL-Persistence-4479A1?style=flat-square&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![License](https://img.shields.io/badge/License-MIT-7C3AED?style=flat-square)](./LICENSE)

<p>
  <a href="#learning-experience">Learning experience</a> ·
  <a href="#architecture">Architecture</a> ·
  <a href="#local-development">Local development</a> ·
  <a href="#quality-and-delivery">Quality & delivery</a> ·
  <a href="#github-maintenance">GitHub maintenance</a> ·
  <a href="#contributing">Contributing</a>
</p>

</div>

> **Make AI automation useful.** The Data Tea turns n8n learning into a practical, end-to-end process: learners prepare a workspace, understand automation opportunities, connect data, build reliable systems, add bounded AI, design agents, and ship a portfolio-ready capstone.

## Project status

| Signal | Current state | What it means |
| --- | --- | --- |
| **Production** | [Vercel deployment](https://ai-automation-roadmap-git-main-sohila-khaled-abbas-projects.vercel.app) | Pushes to `main` are deployed automatically. |
| **Quality gate** | Type check · Vitest · production build | Every release runs the same verification workflow before deployment. |
| **Curriculum** | 10-week process · 9 checkpoints | The visual route spans preparation through capstone delivery. |
| **Learning library** | 264 source-labeled references | Public n8n, MDN, OpenAI, YouTube, and Gemini Notebook references, including verified direct video upgrades. |
| **Build studio** | 7 persisted project challenges | Stage-mapped projects with proof criteria and direct official n8n template or guide references. |
| **Public field kit** | No sign-in required | Route completion is stored in the current browser and can be downloaded or printed as a portable field note. |

## Learning experience

The roadmap is deliberately project-led. Each stage pairs a measurable deliverable with source-labeled learning resources, so learners can move from understanding a process to showing a credible automation outcome.

| Stage | Focus | Learner artifact |
| --- | --- | --- |
| `00 / Prepare` | Practice system, safe workspace, problem selection | Learning brief and build rhythm |
| `01 / Orient` | Automation opportunities and process maps | Automation opportunity map |
| `02 / Connect` | APIs, webhooks, credentials, structured data | Webhook-to-sheet intake |
| `03 / Build` | Nodes, branches, error paths, reuse | Multi-step n8n workflow |
| `04 / Shape` | Data mapping, expressions, transformations | Data contract and validation rules |
| `05 / Augment` | Bounded AI and human review | AI-assisted workflow with review gate |
| `06 / Operate` | Logging, retries, handover, observability | Production-ready workflow handover |
| `07 / Agent` | Memory, tools, evaluation, escalation | Context-aware agent design |
| `08 / Capstone` | Deployment, debugging, evidence, portfolio | Demo-ready workflow and case study |

<details open>
<summary><strong>What learners can do</strong></summary>

Learners can filter the public library by type, including videos, guides, Notebook selections, courses, templates, and references. Route-stop completion remains on the current device, and the field kit can export or print a portable route note. Source-backed project or resource suggestions use the repository’s public GitHub content-proposal template rather than an in-app account form.

</details>

## Architecture

```mermaid
flowchart LR
  L["Learner"] --> UI["React 19 · Tailwind UI"]
  UI --> RPC["tRPC API boundary"]
  RPC --> DB["Drizzle · MySQL / TiDB"]
  DB --> PROGRESS["Public curriculum data"]
  DB --> RESOURCES["Curated resource metadata"]
  DB --> PROJECTS["Persisted build challenges"]
```

| Layer | Responsibility | Key locations |
| --- | --- | --- |
| **Client** | Learning route, library filters, learner workspace, accessible interactions | `client/src/` |
| **API** | Typed public curriculum, resource, and project procedures | `server/routers.ts` |
| **Domain logic** | Isolated validation and learning-route helpers | `server/*.ts` |
| **Persistence** | Schema, migrations, learner data, resource records, build challenges | `drizzle/`, `server/db.ts` |
| **Public progress** | Browser-local completion markers and portable route-note export | `client/src/lib/localRoadmapProgress.ts` |
| **Documentation** | Resource provenance, validation notes, contribution standards | `docs/`, `CONTRIBUTING.md` |

## Technology toolkit

<p align="center">
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=111827" alt="React 19" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" /></a>
  <a href="https://trpc.io/"><img src="https://img.shields.io/badge/tRPC-Typed_API-398CCB?style=for-the-badge&logo=trpc&logoColor=white" alt="tRPC" /></a>
  <a href="https://orm.drizzle.team/"><img src="https://img.shields.io/badge/Drizzle-ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=111827" alt="Drizzle ORM" /></a>
  <a href="https://vitest.dev/"><img src="https://img.shields.io/badge/Vitest-Tested-6E9F18?style=for-the-badge&logo=vitest&logoColor=white" alt="Vitest" /></a>
</p>

## Local development

Use **Node.js 22+** and **pnpm 10+**. Managed runtime variables provide the database configuration used by the content catalogue. Do not commit `.env` files, credentials, or learner data.

```bash
pnpm install
pnpm dev
```

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the full-stack development server with watch mode. |
| `pnpm check` | Run the TypeScript compiler without emitting files. |
| `pnpm test` | Run the Vitest suite. |
| `pnpm build` | Create the production client and server bundles. |
| `pnpm run quality` | Run type checks, tests, and the production build together. |
| `pnpm format` | Apply Prettier formatting. |
| `pnpm format:check` | Verify formatting without modifying files. |

## Database and storage discipline

> **Schema-first principle:** update `drizzle/schema.ts`, generate and review migration SQL, apply it through the managed migration workflow, and keep the schema, migration history, and deployed database aligned.

The database stores curated resource metadata and stage-mapped build challenges. Public route completion is deliberately stored only in the learner’s browser and can be downloaded as a field note. Never store file bytes in database columns, collect unneeded personal data, or present browser-local completion as account-synced progress.

## Quality and delivery

The repository uses GitHub Actions as its quality baseline. The continuous-delivery path is intentionally simple and auditable:

```mermaid
sequenceDiagram
  participant Dev as Contributor
  participant GH as GitHub main
  participant CI as Actions quality gate
  participant V as Vercel production
  Dev->>GH: Push a focused, tested change
  GH->>CI: Type check + tests + build
  CI-->>GH: Required checks pass
  GH->>V: Automatic production deployment
  V-->>Dev: Ready deployment and inspection record
```

The project is connected to Vercel with `main` as the production branch. Each synchronized main-branch checkpoint becomes a GitHub commit and triggers an automatic Vercel production build.

> **Production data check:** an externally hosted Vercel function must have the same protected database, OAuth, and storage environment configuration as the runtime used to seed the learner data. A successful homepage is not sufficient; verify the public resource and build-project endpoints contain expected records. See the [release runbook](./docs/release-runbook.md).

## GitHub maintenance

The repository includes issue templates, a pull-request checklist, a security-reporting policy, and a release runbook. These artifacts keep design changes, content additions, migrations, and production verification reviewable and reproducible.

| Document | Use it when |
| --- | --- |
| [GitHub maintenance guide](./docs/github-maintenance.md) | Reviewing repository areas, triaging issues, or maintaining source-backed learning content. |
| [Release runbook](./docs/release-runbook.md) | Verifying a GitHub commit, Vercel deployment, public API routes, or protected environment boundary. |
| [Contributing guide](./CONTRIBUTING.md) | Opening a focused implementation pull request. |
| [Security policy](./SECURITY.md) | Reporting a potential auth, storage, database, or secret issue privately. |

## Contribution contract

Read [CONTRIBUTING.md](./CONTRIBUTING.md) before changing the application. Keep changes small and reviewable, write tests for isolated server behavior, preserve responsive and keyboard-friendly UI patterns, and run `pnpm run quality` before opening a pull request.

Curated resources must retain a clear provider and source label. Never add fabricated reviews, ratings, testimonials, learner activity, or unverified outcome claims.

## Resource provenance

The public library combines official n8n documentation, MDN and OpenAI references, curated YouTube lessons, and selected Gemini Notebook sources. The research trail is available in [resource research notes](./docs/resource-research.md) and [learning-process research](./docs/learning-process-research.md).

---

<div align="center">

**Built as a project-led learning experience for practical automation builders.**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Sohila%20Khaled-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/sohilakabbas)
[![Portfolio](https://img.shields.io/badge/Portfolio-Case%20Studies-2563EB?style=for-the-badge&logo=googlechrome&logoColor=white)](https://sohilakhaled-portfolio.lovable.app)
[![Email](https://img.shields.io/badge/Email-Contact-7C3AED?style=for-the-badge&logo=gmail&logoColor=white)](mailto:sohila.k.data@gmail.com)

</div>
