# Runtime configuration

GCS-SSC is a client-rendered Nuxt application with a Nitro API. Configure secrets and deployment-specific values at runtime; do not bake them into browser assets or commit `.env` files.

## Required choices

Choose one database mode:

| Variable | Purpose | Behaviour |
| --- | --- | --- |
| `DATABASE_URL` | PostgreSQL connection string | Takes precedence over PGlite. The server pool uses at most 20 connections. |
| `PGLITE_DATA_DIR` | PGlite directory or URI | Used only when `DATABASE_URL` is absent. The container default is `/app/.data/pglite`. |

The application refuses to initialize if neither value resolves. Nuxt runtime fallbacks (`NUXT_DATABASE_URL` and `NUXT_PGLITE_DATA_DIR`) remain supported, but the plain variables take precedence.

Authentication needs a strong, deployment-specific `BETTER_AUTH_SECRET`. Set `BETTER_AUTH_URL` to the public application origin and set `BETTER_AUTH_TRUSTED_ORIGINS` to a comma-separated allow-list when more origins are required. `RAILWAY_PUBLIC_DOMAIN` can supply the Railway URL when an explicit auth URL is absent. Increment `BETTER_AUTH_COOKIE_VERSION` when a deployment must invalidate cached session cookies. GitHub sign-in appears only when both Nuxt GitHub client ID and client secret values are present; email/password remains enabled.

GitHub credentials use `NUXT_GITHUB_CLIENT_ID` and `NUXT_GITHUB_CLIENT_SECRET`. Both remain server-only runtime configuration despite the `NUXT_` names. An incomplete pair does not partially enable the provider. `BETTER_AUTH_BASE_URL` is set by the development launcher for library compatibility, but application runtime resolution uses `BETTER_AUTH_URL`. Trusted origins must be origins, not paths; local private/loopback hosts are accepted only when protocol and port match the configured auth origin.

## Storage and document tools

| Variable | Purpose |
| --- | --- |
| `GCS_LOCAL_FILE_STORAGE_DIR` | Private local attachment root; defaults to `.data/files`. |
| `GCS_EXTENSION_SECRETS_KEY` | Root key required when an enabled extension stores encrypted credentials. |
| `LIBREOFFICE_SOFFICE_PATH` | Explicit LibreOffice executable for DOCX conversion. |
| `PUPPETEER_EXECUTABLE_PATH` | Chromium executable for HTML-to-PDF rendering. |
| `PUPPETEER_CACHE_DIR` | Puppeteer browser cache used by local tooling. |

The implemented storage provider is local filesystem storage. Keep the database and file tree together in backup and restore procedures. The service account must exclusively control the storage root; POSIX deployments enforce private `0700` directories and `0600` files. Do not expose the root through a static web server.

## Process and build settings

`HOST`/`PORT` (or Nitro equivalents) select the listener. `NODE_ENV=production` disables development behaviour. The Docker build requires `ENVIRONMENT_TYPE=development` or `production`; this is a build-time choice. Development images include the demo migration and seed asset, while production images do not. Rebuild to change modes.

`NUXT_DISABLE_SOURCEMAPS=true` disables source maps outside the normal production default. `GCS_RUNTIME_MIGRATION_MODE` and `GCS_DEMO_MIGRATION_SUFFIX` are internal demo/WebContainer controls and must not be used to seed production.

## Local setup and commands

`bun run setup` initializes the extension and SDK submodules recorded in `.gitmodules`, installs the workspace, and builds the public extension SDK. `bun run dev` bundles the administrative dump worker, derives Better Auth origins from the selected host/port, and starts Nuxt; `--host` and `--port` are forwarded. `bun run dev:clean` first removes only the default local `.data/pglite` database. It is destructive to that local database and does not remove stored files.

| Command | Verified purpose |
| --- | --- |
| `bun run build` | Build the extension SDK, Nuxt node-server application, and administrative SQL-dump worker. |
| `bun run lint` / `bun run typecheck` | Check production source style/contracts and Nuxt/Vue types. |
| `bun run test:unit` / `bun run test:coverage` | Run root-owned Vitest tests; coverage enforces the configured thresholds. |
| `bun run test:integration:postgres` | Run the managed PostgreSQL integration harness with its external prerequisites. |
| `bun run test:e2e:fast` | Run the managed Playwright flow with two workers. |
| `bun run quality:artifact` / `bun run quality:webcontainer` | Build and verify production or browser-demo artifacts. |
| `bun run quality:pr` / `bun run quality:whole` | Run the supported changed-scope or whole-repository quality orchestration. |

Extension implementation tests belong to each extension workspace and are not discovered by root suites. Missing PostgreSQL, browser, converter, or platform infrastructure makes a gate unavailable; it is not a passing result.

## Packaging, CI, and demo boundary

The Docker build validates `ENVIRONMENT_TYPE`, performs a frozen workspace install, builds the complete application, and copies only `.output` into the Node 24 runtime image. For remote contexts that omit submodules, it fetches the SDK and five installed extensions at the exact commits recorded in the Dockerfile; local checkout contents overlay them before build. Keep these pins aligned with repository gitlinks.

The sole active deployment workflow is manually dispatched GitHub Pages demo publication. It checks out recursive submodules, pins Bun 1.3.13, performs a frozen install and node-server build, stages the output plus demo migration/assets into a WebContainer preview, verifies that staged artifact, and uploads the verified directory. The Codex PR-review workflow is an inactive manual example, not a required CI gate.

The WebContainer artifact is a self-contained browser demo. Its tooling rejects escaping links, cycles, non-regular or multiply linked files, host-path leakage, and stale/unverified staging. Demo controls, seed data, in-browser credentials, and PGlite persistence are never a production security or recovery model.

## Startup order

On startup, Nitro initializes Kysely, applies the ten ordered core migrations, then applies registered enabled-extension migrations. A migration failure stops startup. The deliberately public `GET /api/health` probe executes `SELECT 1`; it returns `200 {"status":"ok"}` only when the request/database path is ready and returns 503 without environment diagnostics otherwise.

The probe establishes process/API/database readiness only. It does not verify storage writability, Chromium, LibreOffice, remote extension services, browser-worker assets, backups, or business-data health. Monitor those dependencies separately. A compacted local migration-history error may be resolved with the explicitly destructive `bun run dev:clean`; production data requires an approved migration or recovery procedure.

See [Deployment](deployment.md) and [Background work](background-work.md).
