# Contributing

## Working agreement

Make one coherent change at a time. Before implementation, identify the user outcome, data ownership, authorization boundary, and testable acceptance criteria. Avoid drive-by refactors and do not modify framework files under `server/_core` unless infrastructure behavior genuinely needs to change.

## Quality gate

Every pull request must pass:

```bash
pnpm run quality
```

Add or update Vitest coverage when modifying deterministic business logic, data validation, permission checks, or storage behavior. Manual browser verification should cover the happy path and meaningful loading, error, and empty states for affected UI.

## Data and security

Use protected procedures for learner-owned data. Preserve user ownership on queries and mutations. Store file bytes in object storage and only metadata, object keys, and URLs in the database. Never commit credentials, copied session tokens, or `.env` files.

## Database changes

Update the schema, generate a migration, review its SQL, and apply it using the managed migration process. Do not edit a deployed database directly as a substitute for a migration.

## Code style

Use TypeScript, typed input validation, and small focused functions. Favor a clear data flow over clever abstractions. Format with Prettier and use accessibility-first HTML semantics. Keep documentation accurate whenever an architectural decision, command, environment variable, or deployment behavior changes.
