# Testing

The source app uses Vitest for unit tests and Playwright for end-to-end tests. The docs site should still be built after documentation edits to catch broken frontmatter, links, or markdown.

## App commands

From `../gcs-ssc`:

```bash
bun run lint
bun run typecheck
bun run test:unit
bun run test:coverage
# Requires the three *_POSTGRES_TEST_URL variables documented below.
bun run test:integration:postgres
bun run test:e2e
bun run test:e2e:light
bun run test:e2e:light:spec tests/e2e/auth.spec.ts
bun run quality:pr
```

`bun run test` runs unit and e2e suites. `test:all:manual` also runs lint, typecheck, coverage, the opt-in PostgreSQL aggregate, and e2e.

Automatic pull-request CI is not configured. Contributors run `quality:pr` as the authoritative local gate: it records the branch diff, runs lint and type checking, builds the extension SDK, verifies the production artifact on supported POSIX non-root hosts, and runs the app and extension unit/coverage suites. It does not run the opt-in PostgreSQL or Playwright e2e suites, so run those separately when the changed behavior depends on real database locking or browser interaction.

### Production artifact checks

On a POSIX non-root host, use the focused artifact commands when changing build, storage, database startup, migrations, extension assets, or deployment packaging:

```bash
bun run quality:artifact
bun run quality:webcontainer
```

`quality:artifact` creates a fresh production build, migrates a blank database without demo seed data, restores the packaged admin dump, checks database URL precedence, and verifies that the deployed output runs from a read-only artifact tree. It is unsupported on Windows and when run as UID 0 because those environments cannot validate the required POSIX permission boundary.

`quality:webcontainer` installs the matching Playwright Chromium binary, builds the standalone server, and stages a source-free WebContainer payload. Chromium verifies the generated wrapper and mount behavior with a mocked WebContainer runtime; a separate Node smoke test boots the reconstructed source-free server. The browser install downloads Chromium when it is not already cached.

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
