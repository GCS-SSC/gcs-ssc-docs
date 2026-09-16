# Deployment and recovery

## Supported artifacts

`bun run build` builds the public extension SDK, the Nuxt/Nitro node-server artifact, and the administrative SQL-dump and storage-cleanup workers. The result is a browser application plus a Node API, not a static-only site.

The root `Dockerfile` pins Bun 1.3.13 for build, Node 24 Bookworm Slim for runtime, Chromium, and LibreOffice Writer. It copies the repository-owned core authorization workspace before the frozen install. Remote builds fetch each missing submodule at its pinned gitlink SHA before the source overlay. Demo builds use the shared exact demo-migration bundler. Runtime uses the non-root `node` user.

The repository’s `railway.json` selects this Dockerfile, probes `/api/health` with a 300-second health-check timeout, and uses an on-failure restart policy with at most ten retries. Docker Compose exposes host port 8995 by default. These are checked-in defaults; deployment-specific overrides must be recorded separately.

## Persistence topology

The container defaults to PGlite at `/app/.data/pglite` when no PostgreSQL URL is supplied. The checked-in Compose file mounts a named volume only at that database path; it does not provision attachment storage for every provider.

Choose database and object persistence deliberately. PGlite belongs to one application instance. PostgreSQL is required for independent application replicas. For files, select an enabled provider per Agency and provision its durable storage and credentials according to that provider’s instructions. A node-local provider needs the appropriate persistent mount; a shared remote provider needs access from every web and cleanup-worker instance. The host has no automatic local fallback.

Switching an Agency’s selection changes future writes, not existing objects. Old objects continue to require their saved provider, configuration, and object locator. Keep those provider implementations available throughout upgrades and restoration.

The runtime image uses the non-root `node` identity. Provision database and any provider-required volumes with appropriate ownership. Confirm that a restart preserves both a database record and a downloaded attachment; the health endpoint alone does not establish object durability.

## Backup and restore

Back up the database, provider objects, provider configuration, and required secret keys as one recovery set. Attachment metadata contains the saved provider ID, object identity, opaque locator, MIME type, size, and bilingual metadata; bytes remain external. Include the cleanup outbox and audit records under their retention policy. A database-only backup cannot restore documents.

`GET /api/admin/dump` requires global `system:read` and returns `application/sql` as `migrations-YYYY-MM-DD.sql`. It is a migration-derived bootstrap, **not a dump of the live application database**: an isolated worker creates scratch in-memory PGlite, applies the ordered non-seed core migrations, and emits schema/migration SQL with no owner or privilege statements. It contains no live users, agreements, extension-owned data, or other business records and does not include demo seed migration `9999_seed`.

The worker is bounded to 30 seconds, one generation is shared process-wide by concurrent callers, and each disconnected caller stops waiting without cancelling work still needed by another caller. Invalid worker responses, early exit, timeout, or generation failure return localized `ADMIN_DUMP_FAILED` with HTTP 500. This endpoint is not a platform-level PostgreSQL backup or a storage backup. Treat the artifact as controlled deployment material, restrict access and retention, and test it only in an isolated environment.

For PGlite, stop or quiesce writes before copying the persistent database and provider objects. For PostgreSQL, use the platform’s transactionally consistent backup tooling, then capture the corresponding provider objects. Restore into an isolated instance, verify migrations and ownership, exercise authenticated reads and document downloads, and only then switch traffic.

## Release procedure

1. Record the application and submodule SHAs.
2. Run the repository quality gate and relevant extension-owned checks.
3. Build with the intended `ENVIRONMENT_TYPE`; never deploy a development/demo image to production.
4. Provide runtime secrets and persistent storage without embedding them in the image.
5. Start one instance, allow core migrations, extension migrations, provider registration checks, and audit initialization to finish, then require `/api/health` to pass.
6. Verify login, a scoped read, and a private document operation appropriate to the release.
7. Monitor startup/migration errors and retain the previous image and verified backup for rollback.

The GitHub Pages/WebContainer workflow is a browser-hosted demo. Its in-browser PGlite database, demo migration, assets, and credentials are not a production deployment model.

## Dedicated Railway demo reset

The application provides `bun run railway:demo:reset` for its specifically pinned GCS Demo environment. The default (or `--preview`) prints the intended scope without resetting it. `--execute` is destructive and must be run by the operator in their actual interactive terminal, with no input/output redirection. The script refuses agent-driven file deletion and checks the fixed project, environment, service, volume, and demo mode; it is not a general production recovery command.

The reset uses the latest application `main` captured at the start, a maintenance deployment, the dedicated PostgreSQL database, and the demo volume’s `/files` directory. It restores twelve seeded templates and verifies the resulting deployment. External object storage and the old PGlite directory are outside its scope. Pause competing pushes and deployments during the operation; a superseding deployment stops the reset.

Sleeping database services are awakened and checked before destructive work. SSH failures report targeted diagnostics for keys, host verification, authentication, or unavailable targets. On a partial failure the script restores its local deployment source but does not automatically deploy over the incomplete reset. Inspect the reported phase and environment before recovery. Never use this demo reset in place of the production backup procedure above.
