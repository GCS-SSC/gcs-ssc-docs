# Startup

The documentation repository and the source app repository are separate workspaces. The docs live in `gcs-ssc-docs`; the app source is `gcs-ssc`.

## App prerequisites

The app uses Bun scripts, Nuxt 4, Better Auth, Kysely, and either PGlite or Postgres. Runtime config is read from environment variables:

- `DATABASE_URL`
- `PGLITE_DATA_DIR`
- `NUXT_GITHUB_CLIENT_ID`
- `NUXT_GITHUB_CLIENT_SECRET`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `BETTER_AUTH_TRUSTED_ORIGINS`
- `BETTER_AUTH_COOKIE_VERSION`
- `GCS_EXTENSION_SECRETS_KEY`

If `DATABASE_URL` is absent, local development can use the configured PGlite data directory.

`GCS_EXTENSION_SECRETS_KEY` is required in production when extensions store encrypted credentials. It must be a base64-encoded 32-byte key. Development seed data may provide a fixed demo key for non-real local credentials only.

Files require a registered storage provider selected for the Agency. The host has no automatic local-directory fallback. Configure the chosen provider and its durable storage according to its own documentation; see [Configuration](../operator/configuration.md).

Use Bun **1.3.13** and initialize the pinned SDK, extension and private tooling submodules. `bun run setup` initializes the workspaces, prepares tooling links, installs dependencies and builds the SDK. Access to `GCS-SSC/gcs-ssc-tooling` is required for the private test and architecture resources.

## App setup

From `gcs-ssc`:

```bash
bun run setup
bun run dev
```

Use `bun run repos:update` when you need to update the app repository and all registered submodules in one step. It pulls the main repository, syncs submodule URLs, and updates submodules recursively from their configured remotes.

`bun run dev:clean` starts from a clean local data state. The app script is `scripts/dev.ts`, not a plain `nuxt dev` wrapper, so use the package scripts unless you intentionally need lower-level Nuxt behavior.

If agreement document generation needs PDF output locally, run `bun run bun:docgen:install` before starting the app. See [Document Generation](./document-generation.md) for the toolchain details.

## Extension metadata

The extension system generates metadata under `.nuxt/gcs-extensions`. Server utilities require that metadata for extension registry calls. If extension APIs fail with missing metadata, run the Nuxt app so the module can regenerate it.

## Document generation tools

Agreement document generation can run locally on Linux or WSL without global LibreOffice or Chrome installs. From `gcs-ssc`, run:

```bash
bun run bun:docgen:install
```

The installer downloads LibreOffice into `.tools/docgen/libreoffice`, downloads Puppeteer's browser into `.tools/docgen/puppeteer`, and upserts `LIBREOFFICE_SOFFICE_PATH` and `PUPPETEER_CACHE_DIR` into the regular Nuxt `.env` file. Nuxt loads `.env` during `dev`, `build`, and `preview`, so start normally with `bun run dev` after installation.

Use `DOCGEN_ENV_FILE` to target a different env file. Advanced overrides include `LIBREOFFICE_VERSION`, `LIBREOFFICE_DOWNLOAD_URL`, and `PUPPETEER_BROWSER`.

## Authentication bootstrap

Development and test seed data may create `root@example.com` with `password123`. This account and password must never be deployed to production; remove them or rotate the credentials during production provisioning. After the root user exists, create roles and assignments through the UI and verify the canonical `{ grants }` response from `/api/auth/permissions`.

## Documentation startup

From this docs repository:

```bash
bun install
bun run docs:dev
```

Build static docs with:

```bash
bun run docs:build
```

## Smoke check

For the app, sign in, check `/en/` and `/fr/`, open Agencies, Roles, Users and GWCOA with the appropriate global permissions, and Audit with an explicit Audit Viewer grant, and verify a scoped user sees a reduced sidebar. For docs, open `/en/` and `/fr/` and confirm the English and French sidebars expose the same owned sections.
