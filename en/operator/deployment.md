# Deployment and recovery

## Supported artifacts

`bun run build` builds the public extension SDK, the Nuxt/Nitro node-server artifact, and the administrative SQL-dump worker. The result is a browser application plus a Node API, not a static-only site.

The root `Dockerfile` pins Bun 1.3.13 for build, Node 24 Bookworm Slim for runtime, Chromium, and LibreOffice Writer. It copies the repository-owned core authorization workspace before the frozen install. Remote builds fetch each missing submodule at its pinned gitlink SHA before the source overlay. Development builds use the shared exact demo-migration bundler. Runtime uses the non-root `node` user.

Railway uses this Dockerfile and probes `/api/health`. Docker Compose provides equivalent local wiring on host port 8995 by default.

## Persistence topology

The default container is a single-instance topology:

```text
/app/.data/pglite  database
/app/.data/files   private attachments and generated documents
```

Mount persistent storage for all of `/app/.data`. Do not run multiple replicas against one PGlite directory or node-local file tree. A multi-replica deployment requires PostgreSQL plus a shared storage provider; the current application implements only local file storage, so that topology requires application work rather than an environment-only change.

The runtime image executes as the non-root `node` identity. Provision mounted directories with ownership and permissions that let that identity create the private PGlite and attachment trees; do not weaken the service identity to compensate for an incorrectly provisioned volume.

## Backup and restore

Back up the database and `GCS_LOCAL_FILE_STORAGE_DIR` as one consistency set. Database attachment rows contain provider, bucket, object key, MIME, size, and bilingual metadata; the bytes are stored separately. A database-only backup cannot restore documents.

`GET /api/admin/dump` requires global `system:read` and returns `application/sql` as `migrations-YYYY-MM-DD.sql`. It is a migration-derived bootstrap, **not a dump of the live application database**: an isolated worker creates scratch in-memory PGlite, applies the ordered non-seed core migrations, and emits schema/migration SQL with no owner or privilege statements. It contains no live users, agreements, extension-owned data, or other business records and does not include demo seed migration `9999_seed`.

The worker is bounded to 30 seconds, one generation is shared process-wide by concurrent callers, and each disconnected caller stops waiting without cancelling work still needed by another caller. Invalid worker responses, early exit, timeout, or generation failure return localized `ADMIN_DUMP_FAILED` with HTTP 500. This endpoint is not a platform-level PostgreSQL backup or a storage backup. Treat the artifact as controlled deployment material, restrict access and retention, and test it only in an isolated environment.

For PGlite, stop or quiesce writes before copying the persistent database and file tree. For PostgreSQL, use the platform’s transactionally consistent backup tooling, then capture the corresponding file tree. Restore into an isolated instance, verify migrations and ownership, exercise authenticated reads and document downloads, and only then switch traffic.

## Release procedure

1. Record the application and submodule SHAs.
2. Run the repository quality gate and relevant extension-owned checks.
3. Build with the intended `ENVIRONMENT_TYPE`; never deploy a development/demo image to production.
4. Provide runtime secrets and persistent storage without embedding them in the image.
5. Start one instance, allow core and extension migrations to finish, then require `/api/health` to pass.
6. Verify login, a scoped read, and a private document operation appropriate to the release.
7. Monitor startup/migration errors and retain the previous image and verified backup for rollback.

The GitHub Pages/WebContainer workflow is a browser-hosted demo. Its in-browser PGlite database, demo migration, assets, and credentials are not a production deployment model.
