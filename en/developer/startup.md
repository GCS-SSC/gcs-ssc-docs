# Startup

The documentation repository and the source app repository are separate workspaces. The docs live in `gcs-ssc-docs`; the app source is `../gcs-ssc`.

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

## App setup

From `../gcs-ssc`:

```bash
bun install
bun run setup
bun run dev
```

Use `bun run repos:update` when you need to update the app repository and all registered submodules in one step. It pulls the main repository, syncs submodule URLs, and updates submodules recursively from their configured remotes.

`bun run dev:clean` starts from a clean local data state. The app script is `scripts/dev.ts`, not a plain `nuxt dev` wrapper, so use the package scripts unless you intentionally need lower-level Nuxt behavior.

If agreement document generation needs PDF output locally, run `bun run bun:docgen:install` before starting the app. See [Document Generation](./document-generation.md) for the toolchain details.

## Extension metadata

The extension system generates metadata under `.nuxt/gcs-extensions`. Server utilities require that metadata for extension registry calls. If extension APIs fail with missing metadata, run the Nuxt app so the module can regenerate it.

## Document generation tools

Agreement document generation can run locally on Linux or WSL without global LibreOffice or Chrome installs. From `../gcs-ssc`, run:

```bash
bun run bun:docgen:install
```

The installer downloads LibreOffice into `.tools/docgen/libreoffice`, downloads Puppeteer's browser into `.tools/docgen/puppeteer`, and upserts `LIBREOFFICE_SOFFICE_PATH` and `PUPPETEER_CACHE_DIR` into the regular Nuxt `.env` file. Nuxt loads `.env` during `dev`, `build`, and `preview`, so start normally with `bun run dev` after installation.

Use `DOCGEN_ENV_FILE` to target a different env file. Advanced overrides include `LIBREOFFICE_VERSION`, `LIBREOFFICE_DOWNLOAD_URL`, and `PUPPETEER_BROWSER`.

## Authentication bootstrap

Development seed data may create `root@example.com` with `password123`. Production should use deployment-specific bootstrap. After the root user exists, create roles and assignments through the UI so `/api/auth/roles` returns the expected permissions.

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

For the app, sign in, check `/en/` and `/fr/`, open Agencies, Roles, Users, Common Admin as root, and verify a scoped user sees a reduced sidebar. For docs, open `/en/` and `/fr/` and confirm the English and French sidebars expose the same owned sections.
