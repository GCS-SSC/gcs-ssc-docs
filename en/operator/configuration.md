# Runtime configuration

This page is for the technical staff who run GCS-SSC. These settings control sign-in, data storage, document generation, and startup. Officers do not enter these values in their casework screens.

For example, if you can open the application but cannot generate a PDF, report the document task and the error to your support team. The health check below does not test the PDF tools.

GCS-SSC uses Nuxt for the browser application and Nitro for its server API. Set secrets and values specific to your installation at runtime, when the server starts. Keep them out of browser files and do not commit `.env` files to Git.

## Required choices

Choose where the application stores its database: PostgreSQL through `DATABASE_URL`, or PGlite through `PGLITE_DATA_DIR`. PGlite runs PostgreSQL locally within the application’s environment.

| Variable | Purpose | Behaviour |
| --- | --- | --- |
| `DATABASE_URL` | PostgreSQL connection string | Takes precedence over PGlite. The server pool uses at most 20 connections. |
| `PGLITE_DATA_DIR` | PGlite directory or URI | Used only when `DATABASE_URL` is absent. The container default is `/app/.data/pglite`. |

The application refuses to initialize if neither value resolves. Nuxt runtime fallbacks (`NUXT_DATABASE_URL` and `NUXT_PGLITE_DATA_DIR`) remain supported, but the plain variables take precedence.

Authentication needs a strong, deployment-specific `BETTER_AUTH_SECRET`. Set `BETTER_AUTH_URL` to the public application origin (protocol, host, and port, without a page path) and set `BETTER_AUTH_TRUSTED_ORIGINS` to a comma-separated allow-list when more origins are required. `RAILWAY_PUBLIC_DOMAIN` can supply the Railway URL when an explicit auth URL is absent. Increment `BETTER_AUTH_COOKIE_VERSION` when a deployment must invalidate cached session cookies. GitHub sign-in appears only when both Nuxt GitHub client ID and client secret values are present; email/password remains enabled.

GitHub credentials use `NUXT_GITHUB_CLIENT_ID` and `NUXT_GITHUB_CLIENT_SECRET`. Both remain server-only runtime configuration despite the `NUXT_` names. An incomplete pair does not partially enable the provider. `BETTER_AUTH_BASE_URL` is set by the development launcher for library compatibility, but application runtime resolution uses `BETTER_AUTH_URL`. For example, `https://grants.example.ca` is an origin; `https://grants.example.ca/en/agreements` includes a path and is not. Trusted origins must be origins, not paths; local private/loopback hosts are accepted when protocol and port match the configured auth origin. Development also accepts an HTTP/HTTPS browser Origin exactly equal to the request URL’s origin, supporting same-origin HTTPS previews; production retains the configured allow-list.

## Storage and document tools

| Variable | Purpose |
| --- | --- |
| `GCS_EXTENSION_SECRETS_KEY` | Root key required when an enabled extension stores encrypted credentials. |
| `LIBREOFFICE_SOFFICE_PATH` | Explicit LibreOffice executable for DOCX conversion. |
| `PUPPETEER_EXECUTABLE_PATH` | Chromium executable for HTML-to-PDF rendering. |
| `PUPPETEER_CACHE_DIR` | Puppeteer browser cache used by local tooling. |

Registered storage extensions handle file uploads and downloads through the application’s file-storage interface. There is no automatic local-filesystem fallback. Enable and configure a storage provider for each Agency, then select it for new writes. Existing files keep the recorded provider and location where they were saved. Selecting a different provider does not move those files. For example, after switching providers, older Agreement attachments still need their original provider to remain available. A selected or referenced provider cannot simply be disabled or removed.

Back up the database, stored files, provider settings, and required secrets together so you can restore a working system. Preserve every referenced provider implementation during restore. Follow that provider’s documentation for storage paths, credentials, permissions, and service-specific recovery. See [Background work](background-work.md) for the durable cleanup worker.

## Audit and extension-operation controls

| Variable | Default and rule |
| --- | --- |
| `GCS_ACCESS_LOG_ENABLED` | `true`; only literal `true` or `false` is accepted. Controls access events, not change/security evidence. |
| `GCS_AUDIT_RETENTION_DAYS` | 365; positive integer within PostgreSQL integer range. |
| `GCS_ACCESS_RETENTION_DAYS` | 30; positive integer within PostgreSQL integer range. |
| `GCS_EXTENSION_OPERATION_TIMEOUT_MS` | 10000; minimum 100 milliseconds for bounded extension operations. |

Invalid audit settings prevent the application from becoming ready to serve requests. Access events wait in memory before being written. Some can be lost if the buffer fills or the process stops; they are not a guaranteed record of every request. See [Audit](../admin/audit.md) for permissions, evidence, and investigative limits.

## Process and build settings

`HOST`/`PORT` (or Nitro equivalents) set the address and port where the server accepts connections. `NODE_ENV=production` disables development behaviour. The Docker build requires `ENVIRONMENT_TYPE=demo` or `production`; this is a build-time choice. Demo images include the demo migration and seed asset, while production images do not. Rebuild to change modes.

`NUXT_DISABLE_SOURCEMAPS=true` disables source maps outside the normal production default. `GCS_RUNTIME_MIGRATION_MODE` and `GCS_DEMO_MIGRATION_SUFFIX` are internal demo/WebContainer controls and must not be used to seed production.

## Local setup and commands

`bun run setup` initializes the extension and SDK submodules recorded in `.gitmodules`, installs the workspace, and builds the public extension SDK. The SDK is the development toolkit extensions use to work with the application. `bun run dev` bundles the administrative dump worker, derives Better Auth origins from the selected host/port, and starts Nuxt; `--host` and `--port` are forwarded. `bun run dev:clean` first removes the default local `.data/pglite` database and cached `.nuxt/dev` Nitro output, preventing an old worker from reseeding the new database. It is destructive to that local database and does not remove stored files.

| Command | Verified purpose |
| --- | --- |
| `bun run build` | Build the extension SDK, Nuxt node-server application, and administrative SQL-dump and storage-cleanup workers. |
| `bun run lint` / `bun run typecheck` | Check production source style/contracts and Nuxt/Vue types. |
| `bun run test:unit` / `bun run test:coverage` | Run root-owned Vitest tests; coverage enforces the configured thresholds. |
| `bun run test:integration:postgres` | Run the managed PostgreSQL integration harness with its external prerequisites. |
| `bun run test:e2e:fast` | Run the managed Playwright flow with one worker. |
| `bun run quality:artifact` / `bun run quality:webcontainer` | Build and verify production or browser-demo artifacts. |
| `bun run quality:pr` / `bun run quality:whole` | Run the pull-request or whole-repository quality orchestration; `quality:pr` includes the host suites, extension type checks, and local/S3 storage-provider tests. |

Run an extension’s implementation tests in that extension’s workspace; the root test suites do not find them. If a check needs PostgreSQL, a browser, a document converter, or other infrastructure that is missing, record the check as unavailable rather than passed.

## Packaging, CI, and demo boundary

Packaging prepares the files the running server needs. Docker is the container format; CI means the automated build and check workflows. The Docker build validates `ENVIRONMENT_TYPE`, copies the repository-owned authorization and diagram workspaces before the frozen install, builds the application, and copies `.output`, the verified build dependencies and the vendored survey package into Node 24. Remote contexts that omit submodules fetch the SDK and registered extension workspaces at Dockerfile-pinned gitlink commits; local contents overlay them. Keep these pinned commits aligned with the repository’s gitlinks, which record the required submodule commits. The authorization and `@gcs-ssc/diagrams` packages are repository-owned workspaces and must remain in the build context. The Portal connector’s vendored survey workspace must also be included. Runtime installation excludes incompatible musl binaries and empty Nitro stubs; the final image resolves Bun-store packages and includes Puppeteer’s WebSocket dependency.

The manually dispatched GitHub Pages workflow publishes a WebContainer demo; a separate manual `publish-demo-image.yml` workflow builds and smoke-checks the shared container image. It checks out recursive submodules, pins Bun 1.3.13, performs a frozen install and node-server build, stages the output plus demo migration/assets into a WebContainer preview, verifies that artifact, and uploads it. Docker and WebContainer both call `scripts/build-demo-migration.ts`; its Bun plugin resolves Nuxt `~~/` imports, the generated extension registry, and the real `kysely-pglite` package path before emitting `demo.mjs`.

The WebContainer artifact is a packaged demo that runs inside the browser. Its tooling rejects escaping links, cycles, non-regular or multiply linked files, host-path leakage, and stale/unverified staging. Demo controls, seed data, in-browser credentials, and PGlite persistence are never a production security or recovery model.

## Startup order

On startup, Nitro initializes the database, applies ordered core and enabled-extension migrations, verifies that referenced storage providers are registered, and initializes audit capture and retention. Scheduled extension plugins activate only after their enabled Agency migrations; the L1 loop then offers their registered work. The application is ready only after this whole sequence succeeds. Ordinary API requests, including sign-in and metadata, receive HTTP 503 (service unavailable) until then. Browser files can still load, so seeing the page does not prove the server is ready.

Transient connection failures retry serially after 1, 2, 4, then at most 5 seconds within a two-minute startup deadline. Schema and credential errors do not receive the transient retry treatment. In production, failed or expired initialization marks the database generation unavailable and exits the process so the deployment supervisor can restart it. Inspect `startup.retry`, `startup.failed`, and `startup.ready` events. An open network port alone does not mean startup succeeded.

The deliberately public `GET /api/health` checks readiness and executes `SELECT 1`. It returns `200 {"status":"ok"}` only when ready, or 503 without environment diagnostics. Allow the documented startup window in the process supervisor’s health policy.

For example, `200 {"status":"ok"}` confirms that the server and database are ready, but PDF generation can still fail if Chromium is unavailable. The probe checks only the process, API, and database. It does not verify storage writability, Chromium, LibreOffice, remote extension services, browser-worker assets, backups, or business-data health. Monitor those dependencies separately. A compacted local migration-history error may be resolved with the explicitly destructive `bun run dev:clean`; production data requires an approved migration or recovery procedure.

See [Deployment](deployment.md) and [Background work](background-work.md).
