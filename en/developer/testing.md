# Testing

Use these commands to check changes to GCS-SSC. Tests cover activities such as assigning an officer, restricting access to another agency’s records, and submitting a review.

Vitest runs unit tests of application logic. Playwright runs end-to-end tests of complete tasks in a browser. Build the documentation site after documentation edits to catch problems with page metadata, links, or Markdown.

Tests and architecture resources come from the pinned private `tooling/gcs-ssc` submodule. Run `bun run tooling:setup` to initialize it and create the ignored `tests`, `architecture` and skill links; do not copy private suites back into the host repository.

## App commands

From `gcs-ssc`:

```bash
bun run lint
bun run typecheck
bun run test:unit
bun run test:coverage
# Requires the AGREEMENT_CONCURRENCY_POSTGRES_TEST_URL variable documented below.
bun run test:integration:postgres
bun run test:e2e
bun run test:e2e:light
bun run test:e2e:light:spec tests/e2e/auth.spec.ts
bun run quality:pr
```

`bun run test` runs unit and e2e suites. `test:all:manual` also runs lint, typecheck, coverage, the opt-in PostgreSQL aggregate, and e2e.

Automatic pull-request CI is not configured. Run `quality:pr` as the required local check. It records the branch diff and runs these checks:

- Lint and host type checking.
- Extension SDK build and all extension type checks.
- Production artifact verification on supported POSIX non-root hosts.
- Host unit and coverage suites.
- Local and S3 storage-provider unit and coverage suites.

Run the opt-in PostgreSQL and Playwright e2e suites separately when the change depends on real database locking or browser interaction. `quality:pr` does not run them.

`lint` runs bilingual UI-policy and database-name checks before ESLint. `typecheck` uses the private tooling runner under the Nuxt artifact lock.

`test:unit` and `test:coverage` first check required-field contracts with `forms:check` and Guided Help content with `guided-help:check`. They also run the Guided Help package unit or coverage suite before the host suite.

`test:e2e`, `test:e2e:pglite` and `test:e2e:light` run the ordinary managed PGlite suite, then run each lifecycle fixture in its own fresh process. `test:e2e:fast` splits the ordinary suite into eight serial shards before the same isolated lifecycle group. An exact `--spec` or `E2E_SPEC` routes to the file’s owning runner. An explicit `--shard` selects an ordinary partition and omits lifecycle fixtures, so it is partial coverage. Filters such as `--grep` require one exact spec. Any failed invocation fails the aggregate.

Focused one-worker suites cover attachments, Agency statuses, Amendment refresh, Agreement amendments and Closeouts, workflow recommendations, retired workflow setups and fresh resets. Use the matching `:spec` script to select a file; `test:all:manual` includes the configured suite sequence, the standalone fresh-reset group, per-file PostgreSQL browser tests, and the extension-profile fixture.

### Production artifact checks

On a POSIX non-root host, use the focused artifact commands when changing build, storage, database startup, migrations, extension assets, or deployment packaging:

```bash
bun run quality:artifact
bun run quality:webcontainer
```

`quality:artifact` creates a fresh production build, migrates a blank database without demo seed data, restores the packaged admin dump, checks database URL precedence, and verifies that the deployed output runs from a read-only artifact tree. It is unsupported on Windows and when run as UID 0 because those environments cannot validate the required POSIX permission boundary.

`quality:webcontainer` installs the matching Playwright Chromium binary, builds the standalone server, and stages a source-free WebContainer payload. Chromium verifies the generated wrapper and mount behavior with a mocked WebContainer runtime; a separate Node smoke test boots the reconstructed source-free server. The browser install downloads Chromium when it is not already cached.

### Manual PostgreSQL aggregate

The concurrency suite requires real PostgreSQL semantics and is intentionally excluded from automatic pull-request CI. Configure an explicit URL whose database name ends in `_test`, then run the aggregate:

```bash
AGREEMENT_CONCURRENCY_POSTGRES_TEST_URL=postgresql://localhost/gcs_ssc_test \
bun run test:integration:postgres
```

The root Agreement concurrency suite uses the dedicated disposable `*_test` database. Extension repositories own their PostgreSQL suites and prerequisites. `test:all:manual` invokes the root aggregate, so the variable must be set before running the full manual gate.

## Areas covered by tests

Relevant coverage includes:

- Auth middleware and route guards.
- Client authorization composables.
- Server authorization utilities.
- RBAC scope edges and role scope validation.
- Cumulative role-permission lifecycle.
- Structural user roles and exact entity-assignment RBAC.
- Agency management and agency scope RBAC.
- GWCOA catalogue, audit access, Agency references, forms and localized validation.
- Applicant/recipient routes, child tabs, exact assignment routes, review runtime, and RBAC.
- Extension agency enablement, stream configuration, runtime slots, entity tabs, server dispatch, migrations, and SDK behavior.
- Protected-write authorization and lifecycle lock ordering under PostgreSQL concurrency.
- Bilingual runtime and localized validation/API errors.

## Choosing tests for admin/RBAC work

For role or user changes, run unit tests around `rbac`, `role-scope`, `roles-routes`, `users-routes`, `use-auth`, `use-can`, `use-role-modal-state`, and e2e tests for role assignments and scoped denial.

For agency setup changes, run agency route, agency schema, agency lookup, agency management, and agency-scope RBAC tests.

For proponents, run applicant-recipient auth, routes, assignment routes, child routes, review routes, and applicant-recipient e2e tests.

For GWCOA and audit changes, select the dedicated route, schema, access-control, and browser tests for the affected area. For shared attachments, include provider compensation, cleanup and metadata recovery cases.

For example, changing proponent assignment rules can affect whether an officer may edit a file. Check the assignment and authorization unit tests, then use a browser test to confirm that an assigned officer can perform the action and an unassigned officer is denied. RBAC means role-based access control: it combines roles, their permitted scope, and the required record assignments.

## Docs commands

From this docs repository:

```bash
bun run docs:build
bun run docs:dev
```

After a docs build, spot-check matching English and French pages for heading parity and stale screenshot references.
