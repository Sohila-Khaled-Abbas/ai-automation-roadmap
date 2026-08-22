# GitHub and Vercel Release Runbook

## Purpose

This runbook verifies that a GitHub `main` commit, GitHub Actions quality gate, Vercel deployment, and the database-backed learner experience describe the **same release**. A `200` homepage alone is not a complete release check: the learner library and build studio must also return their persistent data.

## Release sequence

| Step | Evidence | Expected result |
| --- | --- | --- |
| 1. Validate locally | `pnpm run quality` | Type check, Vitest, and production build pass. |
| 2. Inspect migration | Generated `drizzle/*.sql` and managed SQL application | Schema change is reviewed, non-destructive where intended, and applied before relying on new data. |
| 3. Check GitHub Actions | `Quality Gate / Type-check, test, and build` on the matching commit | Workflow conclusion is **success**. |
| 4. Check Vercel deployment | Deployment commit SHA and READY state | Vercel deployment references the same `main` commit. |
| 5. Fetch live endpoints | Homepage, current JS asset, `auth.me`, `resources.list`, and `projects.list` | HTML/asset/API return `200`; public resource and project lists contain expected records. |
| 6. Check stable alias | Git-main production alias | Alias serves the new build rather than an older deployment. |

## Production environment boundary

The deployed Vercel functions require their own configured environment. Local managed runtime variables are not automatically evidence that an independently hosted Vercel deployment has the same configuration. Configure the production and preview environments in **Vercel Project Settings → Environment Variables**, then redeploy after a change. Vercel documents environment-variable setup and redeployment behavior in its platform guidance. [1]

For the current **public no-sign-in release**, the Vercel static client routes its public resource and project reads to the managed public catalogue API. This avoids copying protected database, OAuth, or storage credentials into Vercel. The managed API permits only the known roadmap Vercel origins and omits browser credentials for those cross-origin public reads.

| Variable group | Needed by | Validation symptom if absent |
| --- | --- | --- |
| `DATABASE_URL` | Curated resources, roadmap projects, learner progress, vault metadata, submissions | Public collection endpoints may return empty arrays instead of the persisted catalogue. |
| `OAUTH_SERVER_URL`, `VITE_OAUTH_PORTAL_URL`, `VITE_APP_ID`, `JWT_SECRET` | Only required if a future account-bound feature is deliberately restored | Leave out of the current public no-sign-in release; no public UI must depend on them. |
| `BUILT_IN_FORGE_API_URL`, `BUILT_IN_FORGE_API_KEY` | Only required if secure file storage is deliberately restored | Leave out of the current public no-sign-in release; no public UI must depend on them. |

Never put real secret values in Git, issue threads, pull requests, static frontend code, or repository documentation. Configure them only in the host’s protected environment-variable interface.

## Vercel production check

After every significant release, compare the GitHub commit SHA against the Vercel deployment metadata, then verify the following paths using the exact production deployment URL before the stable alias:

```text
/
/assets/<current-index-bundle>.js
/api/trpc/auth.me
/api/trpc/resources.list?batch=1&input=...
/api/trpc/projects.list?batch=1&input=...
```

For the last two calls, an empty `json: []` response is a functional warning if the persistent library should contain records. Inspect Vercel function runtime logs and environment-variable configuration before treating that release as complete.

### Current verification note — August 2026

The redesigned production homepage and current JavaScript bundle returned `200`, while the deployed public `resources.list` and `projects.list` procedures returned empty collections. Local validation returns the persisted collections. Treat this as an external-host environment boundary to resolve in Vercel Project Settings, not as evidence that the local database seed or frontend mapping has failed. No secret values are recorded in this repository.

## Recovery rules

If GitHub Actions fails, fix the named quality step and rerun it; do not weaken the quality script merely to publish. If Vercel is not READY, inspect the deployment build logs and correct the smallest compatible configuration or code issue. If the static homepage succeeds but public data endpoints are empty, resolve the Vercel environment boundary first. If a deployment regression cannot be repaired safely, restore the last known healthy project checkpoint rather than using destructive Git commands.

## References

[1]: https://vercel.com/docs/projects/environment-variables "Vercel Docs — Environment variables"
