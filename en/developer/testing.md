# Testing

The source app uses Vitest for unit tests and Playwright for end-to-end tests. The docs site should still be built after documentation edits to catch broken frontmatter, links, or markdown.

## App commands

From `../gcs-ssc`:

```bash
bun run lint
bun run typecheck
bun run test:unit
bun run test:integration:postgres
bun run test:e2e
bun run test:e2e:light
bun run test:e2e:light:spec --spec tests/e2e/auth.spec.ts
```

`bun run test` runs unit and e2e suites. `test:all:manual` also runs lint, typecheck, coverage, the opt-in PostgreSQL aggregate, and e2e.

### Manual PostgreSQL aggregate

The concurrency suites require real PostgreSQL semantics and are intentionally excluded from automatic pull-request CI. Configure three explicit URLs whose database names end in `_test`, then run the aggregate:

```bash
AGREEMENT_CONCURRENCY_POSTGRES_TEST_URL=postgresql://localhost/gcs_ssc_test \
GCFORMS_POSTGRES_TEST_URL=postgresql://localhost/gcs_ssc_test \
OUTCOME_ALLOCATION_POSTGRES_TEST_URL=postgresql://localhost/gcs_ssc_test \
bun run test:integration:postgres
```

The root agreement, GC Forms lifecycle, and outcome allocation suites run sequentially and may share one dedicated disposable `*_test` database. `test:all:manual` invokes this aggregate, so the same three variables must be set before running the full manual gate.

## Areas covered by tests

Relevant coverage includes:

- Auth middleware and route guards.
- Client authorization composables.
- Server authorization utilities.
- RBAC scope edges and role scope validation.
- Role ability lifecycle.
- User assignment RBAC.
- Agency management and agency scope RBAC.
- Admin Common app config, schemas, routes, lookups, and i18n.
- Applicant/recipient routes, child tabs, team routes, review runtime, and RBAC.
- Extension agency enablement, stream configuration, runtime slots, entity tabs, server dispatch, migrations, and SDK behavior.
- Protected-write authorization and lifecycle lock ordering under PostgreSQL concurrency.
- Bilingual runtime and localized validation/API errors.

## Choosing tests for admin/RBAC work

For role or user changes, run unit tests around `rbac`, `role-scope`, `roles-routes`, `users-routes`, `use-auth`, `use-can`, `use-role-modal-state`, and e2e tests for role assignments and scoped denial.

For agency setup changes, run agency route, agency schema, agency lookup, agency management, and agency-scope RBAC tests.

For proponents, run applicant-recipient auth, routes, team routes, child routes, review routes, and applicant-recipient e2e tests.

For Common Admin, run admin-common schema, route, lookup, column, app-config, modal validation, and page tests.

## Docs commands

From this docs repository:

```bash
bun run docs:build
bun run docs:dev
```

After a docs build, spot-check matching English and French pages for heading parity and stale screenshot references.
