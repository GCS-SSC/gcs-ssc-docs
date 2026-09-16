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
- `packages/gcs-ssc-extensions` publishes the public `@gcs-ssc/extensions` SDK entry points used by extension packages.

## Frontend patterns

List pages commonly use `useResourceTable` and resource layout components. Detail pages commonly use `CommonEntityHero` for the collapsible header, route tabs through `useRouteTabMap`, and route location helpers from `app/utils/route-locations.ts`. Create and update forms use shared Zod schemas through `useZodI18n`.

Permission-aware UI uses `useAuth` and `useCan`. `useAuth` fetches the canonical `{ grants }` response from `/api/auth/permissions`, validates each static grant, and exposes `authorize`, `authorizeGrant`, and `hasAbility`. Static grants provide the cumulative role ceiling. Existing assignable-entity mutations separately require an exact `Common_Entity_Assignment`; this roster is returned by entity APIs rather than expanded into the static grant list.

## Server patterns

Server routes read validated bodies and queries through i18n-aware helpers, authorize using `authorize`, and access the database through `event.context.$db`. Route helpers resolve scopes from target records before authorization. Soft deletion is implemented by updating `_deleted`.

## Protected writes and concurrency

Selected high-contention commitment, forecast, claim, reconciliation, and monitor writes refresh authorization inside the database transaction before writing. These transactions acquire the actor’s grant graph, extension lifecycle scopes, active parent rows, and aggregate rows in a deterministic order. After waiting for locks, the write re-reads ownership, active state, workflow status, and scope before applying changes.

The hardened parent and child mutation paths use aggregate locks so a parent deletion, child mutation, completion, and approval transition cannot interleave into a partial state. Deletes remain soft deletes and update the aggregate and its dependent records in one transaction. PostgreSQL integration tests cover the protected-write lock order and representative revalidation paths; see [Testing](./testing.md#manual-postgresql-aggregate).

## RBAC architecture

Shared RBAC logic lives in `shared/utils/abilities.ts`, `shared/utils/scopes.ts`, and `shared/utils/role-scope.ts`. Server resolution lives in `server/utils/rbac.ts` and `server/utils/authorize.ts`. The same concepts are mirrored on the client by `useAuth` and `useCan`.

## Admin architecture

GWCOA has a dedicated global catalogue UI and `/api/admin/gwcoa` routes. Its read boundary is global `system:read`; the audit browser has a separate global `audit:read` boundary. Agency reference tabs use Agency-scoped routes, and stream configuration owns reusable workflow designs. Runtime records are created through their domain actions rather than generic administrative CRUD.

## Extension architecture

The extension module discovers extension definitions and generates metadata. Runtime server utilities load handlers and runtime resolvers through Jiti. Agency enablement, stream configuration, full-page stream configuration, entity tabs, runtime slots, server handlers, create actions, calculators, migrations, key-value storage, and encrypted secrets are all host-mediated.

Extension packages should use the public `@gcs-ssc/extensions` package instead of host internals. Its entry points are:

| Entry point | Purpose |
| --- | --- |
| `@gcs-ssc/extensions` | Manifest types, JSON types, slots, resolved metadata, and `defineGcsExtension`. |
| `@gcs-ssc/extensions/server` | Server route, migration, create-hook, KV, error, and encrypted secret helpers. |
| `@gcs-ssc/extensions/ui` | Host UI wrappers, extension API client, host API client, and UI composables. |
| `@gcs-ssc/extensions/testing` | Runtime stubs and helpers for standalone extension tests. |
| `@gcs-ssc/extensions/nuxt` | Optional ambient Nuxt declarations for extension packages. |

## Bilingual architecture

Nuxt i18n uses prefixed locale routes and locale JSON files. Data models often store explicit English and French columns. Validation and API errors use message keys that are translated at the edge where the user sees them.

## Storage and evidence boundaries

The database stores business metadata, provider identities and locators; registered file-storage extensions own bytes. Shared attachment mutations recheck exact target authorization and lifecycle state, while durable cleanup jobs compensate for external operations that cannot participate in the database transaction. Generated documents also use the provider facade. See [Attachments](../concepts/attachments.md) and [Background Work](../operator/background-work.md).

Transactional audit triggers capture committed data changes. HTTP access events use a separate bounded in-memory queue, so they have different durability guarantees. Startup completes core migrations, enabled extension migrations, provider checks and audit setup before ordinary API traffic is accepted.
