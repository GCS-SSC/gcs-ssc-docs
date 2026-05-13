# Testing

The source app uses Vitest for unit tests and Playwright for end-to-end tests. The docs site should still be built after documentation edits to catch broken frontmatter, links, or markdown.

## App commands

From `../gcs-ssc`:

```bash
bun run lint
bun run typecheck
bun run test:unit
bun run test:e2e
bun run test:e2e:light
bun run test:e2e:light:spec --spec tests/e2e/auth.spec.ts
```

`bun run test` runs unit and e2e suites. `test:all:manual` also runs lint, typecheck, coverage, and e2e.

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
