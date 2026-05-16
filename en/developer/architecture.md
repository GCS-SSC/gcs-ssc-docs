# Architecture

The source app is a Nuxt 4 single-page application with server API routes, shared TypeScript schemas, Kysely database access, Better Auth, Nuxt UI, Nuxt i18n, and a local extension module.

## Workspace shape

- `app/pages` contains route pages.
- `app/components` contains shared and domain UI.
- `app/composables` contains client state, authorization, table, form, and workflow helpers.
- `app/utils` contains route, status, auth client, and lookup utilities.
- `server/api` contains H3 API endpoints.
- `server/utils` contains authorization, workflow, database, and extension helpers.
- `server/database/migrations` contains schema and seed migrations.
- `shared/types` and `shared/utils` contain schemas, shared contracts, RBAC rules, scopes, and cross-runtime helpers.
- `modules/gcs-extensions.ts` builds the extension runtime.

## Frontend patterns

List pages commonly use `useResourceTable` and resource layout components. Detail pages commonly use `CommonEntityHero` for the collapsible header, route tabs through `useRouteTabMap`, and route location helpers from `app/utils/route-locations.ts`. Create and update forms use shared Zod schemas through `useZodI18n`.

Permission-aware UI uses `useAuth` and `useCan`. `useAuth` fetches `/api/auth/roles`, validates permission rows, and exposes `authorize`, `authorizeGrant`, and `hasAbility`.

## Server patterns

Server routes read validated bodies and queries through i18n-aware helpers, authorize using `authorize`, and access the database through `event.context.$db`. Route helpers resolve scopes from target records before authorization. Soft deletion is implemented by updating `_deleted`.

## RBAC architecture

Shared RBAC logic lives in `shared/utils/abilities.ts`, `shared/utils/scopes.ts`, and `shared/utils/role-scope.ts`. Server resolution lives in `server/utils/rbac.ts` and `server/utils/authorize.ts`. The same concepts are mirrored on the client by `useAuth` and `useCan`.

## Admin architecture

Common Admin is driven by app config plus server config. App config defines UI fields and tabs. Server config maps resource names to tables, schemas, transforms, search columns, and filters. Agency admin tabs are normal Vue components backed by agency-scoped API routes.

## Extension architecture

The extension module discovers extension definitions and generates metadata. Runtime server utilities load handlers and runtime resolvers through Jiti. Agency enablement, stream configuration, entity tabs, runtime slots, server handlers, create actions, calculators, migrations, and key-value storage are all host-mediated.

## Bilingual architecture

Nuxt i18n uses prefixed locale routes and locale JSON files. Data models often store explicit English and French columns. Validation and API errors use message keys that are translated at the edge where the user sees them.
