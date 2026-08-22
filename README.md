# AI Automation Roadmap

AI Automation Roadmap is a full-stack learning product for building useful, reliable n8n automations. It combines a public, project-led curriculum with a signed-in learner workspace for persisted progress and private workflow resources.

## Product scope

The application organizes learning into practical route stops, with n8n as the core automation platform. Learners can browse curated documentation and videos, mark route stops as complete, and save their own workflow briefs, exports, and handover material to a private file vault.

| Capability | Implementation |
| --- | --- |
| Public learning path | React 19, TypeScript, Tailwind CSS, and Wouter |
| API boundary | Express and tRPC with end-to-end typed contracts |
| Authentication | Manus OAuth session flow |
| Persistence | Drizzle ORM with MySQL/TiDB-compatible schema |
| File storage | Secure object storage; database stores metadata and object keys only |
| Resource library | Curated n8n, MDN, OpenAI, YouTube, and Gemini Notebook references |

## Architecture

```text
client/                  React UI, pages, components, styles
server/                  tRPC procedures, database access, storage helpers
drizzle/                 Versioned database schema and migrations
shared/                  Cross-boundary constants and types
docs/                    Research and engineering notes
```

The frontend communicates only through typed tRPC procedures. Route progress and learner files are protected by authenticated procedures, while curated learning resources are intentionally public. The database retains resource metadata and learner records; binary file contents stay in object storage.

## Local development

### Prerequisites

Use Node.js 22+ and pnpm 10+. The managed deployment environment supplies the database, OAuth, and storage environment variables; do not commit `.env` files or production credentials.

```bash
pnpm install
pnpm dev
```

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the local development server with watch mode. |
| `pnpm check` | Run the TypeScript compiler without emitting files. |
| `pnpm test` | Run the Vitest suite. |
| `pnpm build` | Create the production client and server build. |
| `pnpm format` | Apply Prettier formatting. |
| `pnpm format:check` | Verify formatting in CI without modifying files. |
| `pnpm run quality` | Run type, test, and production-build quality gates. |

## Database workflow

Schema changes are deliberate and migration-first. Update `drizzle/schema.ts`, generate a migration, review the generated SQL, and apply it through the deployment environment’s migration workflow. Never manually change a production table without first keeping the Drizzle schema and migration history aligned.

```bash
pnpm drizzle-kit generate
```

The core data model contains `users`, `learnerProgress`, `learningResources`, and `learnerFiles`. Resource files are never stored as database blobs.

## Engineering standards

The repository treats `server/routers.ts` as a stable API contract and keeps database queries in `server/db.ts`. New backend behavior should use an explicit input schema, an appropriate public or protected access boundary, and an accompanying test when logic can be isolated. UI changes should preserve keyboard access, visible focus states, responsive behavior, clear loading and error messaging, and meaningful empty states.

Keep secrets in managed configuration, retain learner-file authorization boundaries, and prefer explicit source labels for curated learning links. Never add fabricated reviews, ratings, testimonials, or learner activity.

## Continuous delivery

The repository includes a GitHub Actions quality gate. Connect this repository to Vercel with `main` as the production branch: pushes to `main` deploy production automatically and pull requests receive preview deployments. The active application workflow uses project checkpoints to synchronize the GitHub `main` branch, so completed edits flow through the same checked, versioned path.

## Contributing

Read [CONTRIBUTING.md](./CONTRIBUTING.md) before changing the application. Keep pull requests focused, include tests for changed server behavior, use meaningful commit messages, and do not merge a branch that fails `pnpm run quality`.

## Learning-resource provenance

Resource records retain a provider and source label. The current library includes official n8n documentation and Academy material, MDN and OpenAI references, curated YouTube videos, and selected links from the shared Gemini Notebook. See [resource research notes](./docs/resource-research.md) for the discovery record.
