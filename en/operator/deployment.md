# Deployment and recovery

This page is for the technical team that installs, updates and restores GCS-SSC. Grants and contributions officers can use it to understand service interruptions and what must be protected: agreement records, private attachments and access settings. Ask the operator to confirm that both records and attachments are recoverable before a release or restoration.

## Supported artifacts

`bun run build` builds the public extension SDK, the Nuxt/Nitro node-server artifact, and the administrative SQL-dump and storage-cleanup workers. The result is a browser application plus a Node API, not a static-only site.

The root `Dockerfile` packages the authorization, diagram and connector survey workspaces and pins Bun 1.3.13 for build, Node 24 Bookworm Slim for runtime, Chromium, and LibreOffice Writer. It copies the repository-owned core authorization workspace before the frozen install. Remote builds fetch each missing submodule at its pinned gitlink SHA before the source overlay. Demo builds use the shared exact demo-migration bundler. Runtime uses the non-root `node` user.

For legacy Dockerfile deployments, `railway.json` selects this Dockerfile, probes `/api/health` with a 300-second health-check timeout, and uses an on-failure restart policy with at most ten retries. Docker Compose exposes host port 8995 by default. These are checked-in defaults; deployment-specific overrides must be recorded separately.

## Persistence topology

Persistence means that saved information survives a restart or replacement of the application container. The database stores the records; the attachment provider stores the files. Both need durable storage.

The container defaults to PGlite at `/app/.data/pglite` when no PostgreSQL URL is supplied. The checked-in Compose file mounts a named volume only at that database path; it does not provision attachment storage for every provider.

Choose database and object persistence deliberately. PGlite belongs to one application instance. PostgreSQL is required for independent application replicas. For files, select an enabled provider per Agency and provision its durable storage and credentials according to that provider’s instructions. A node-local provider needs the appropriate persistent mount; a shared remote provider needs access from every web and cleanup-worker instance. The host has no automatic local fallback.

Switching an Agency’s selection changes future writes, not existing objects. Old objects continue to require their saved provider, configuration, and object locator. Keep those provider implementations available throughout upgrades and restoration.

The runtime image uses the non-root `node` identity. Provision database and any provider-required volumes with appropriate ownership. Confirm that a restart preserves both a database record and a downloaded attachment; the health endpoint alone does not establish object durability.

## Backup and restore

For example, restoring an agreement’s database record without its signed PDF restores the document’s listing, but not the file officers need to download. Test a private attachment download as well as a record read when verifying recovery.

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

## Shared demo image and deployments

Run **Run workflow** in `.github/workflows/publish-demo-image.yml` to build the shared public `linux/amd64` demo image. A push to `main` does not build an image. The workflow tests the image with disposable PostgreSQL, publishes a unique tag and digest, checks anonymous pulling, and uploads a `demo-image` artifact. Download that artifact to promote its immutable digest into `deployment/demo-image.json`; AWS CDK and Railway IaC can use the same pin.

Successful runs on `main` also publish `ghcr.io/gcs-ssc/gcs-ssc-demo:latest`. Branch runs leave `latest` unchanged. This moving tag means the last verified image published from `main`, not the newest source commit. Deployment manifests still require an immutable digest. Publishing an image or changing a manifest does not deploy either platform. Verify `/api/health`, localized login, and a seeded document download after each update. Retain the prior digest and a compatible database backup; rolling back an image does not undo migrations.

The AWS demo CDK app in `infra/aws` targets Canada Central (`ca-central-1`): CloudFront with a private load-balancer origin, one Fargate task, single-AZ PostgreSQL RDS, and encrypted EFS for the local attachment provider. A separate private S3 bucket is provisioned for future use, but is not selected as the attachment provider. The CDK budget is an alert, not a spending cap. The AWS runbook in the application source specifies bootstrap, credentials, deployment, and recovery; this is a demo architecture, not a production availability model.

The checked-in `.railway/railway.ts` manages the existing GCS Demo environment, preserves its secrets, domain, database, and volumes, and uses the pinned image when the manifest contains a digest. Operators review `railway config plan` before `railway config apply`; committing IaC alone does not apply it. The old `railway.json` remains a legacy Dockerfile default for other deployments.

## Refresh the AWS demo

Use the application checkout with Bun 1.3.13, AWS CLI v2, and an AWS profile allowed to operate the existing demo. Set `AWS_PROFILE` in the environment or the ignored `infra/aws/.env`. From the application root:

```sh
bun run aws:demo:refresh --preview
bun run aws:demo:refresh
# Explicitly wipe and reseed the GCS demo database:
bun run aws:demo:refresh --reset-db
```

Publish the intended image from `main` first. Preview reads the account, service and resolved `latest` digest without deployment changes. The ordinary command keeps the database. `--reset-db` permanently removes GCS records, users, audit history, extension configuration and migration journals by dropping the `public`, `extensions` and `audit` schemas. It preserves EFS attachment files, but removes their database references; the seed restores its standard templates. Portal and Metabase services and databases are untouched.

The helper is restricted to the existing `GcsSscDemo` stack in `ca-central-1`. It requires one stable completed GCS deployment with desired count 1. It checks the new image's RDS connection and TLS before deployment. For reset, it stops GCS and waits for all old tasks to stop before changing the database, causing downtime. It verifies deployment completion, the running digest and public readiness before saving the local `deployment/demo-image.json` pin. Promote that pin separately and keep it aligned before later CDK deployments: a direct ECS refresh does not update CloudFormation's stored template. Run only one deployment or refresh at a time.

If the identity check finds expired SSO credentials, the helper starts `aws sso login` for the configured profile and retries once. Complete the browser or device-code prompt. Other credential errors require fixing the profile or permissions. No deployment changes occur before identity verification succeeds.

If refresh fails, inspect the printed task ARN and GCS CloudWatch logs. After a reset, the helper does not automatically restart the old revision, and deployment rollback is disabled to keep an incompatible baseline from starting. Resolve the failure, deploy the printed new task definition with desired count 1, verify readiness, then restore the usual circuit breaker (`enable: true`, `rollback: true`). A second refresh requires a stable service with desired count 1.

## Companion services and clean cutovers

The AWS demo stack now provisions a persistent Portal service with its own RDS database and private S3 attachment bucket, plus Metabase with a separate application database. CloudFront fronts private load balancers. Metabase uses certificate-verified RDS TLS, secret-backed session/encryption keys and a private initialization sidecar; its administrator credentials remain in Secrets Manager. Reporting access to GCS does not grant GCS user permissions. Back up and monitor each service independently.

The Railway IaC preserves GCS, Portal and Metabase resources. Portal uses `deployment/portal-demo-image.json` and the sealed `PORTAL_AUTH_SECRET` secret. Its image manifest may also record an optional 40-character source `commit`; this records provenance while deployment still uses the immutable image digest. A GCS release plan must not change the other services. Inspect the plan and live service/volume attachments before applying: the source runbook records CLI database-attachment readback limitations, so an unchanged plan alone is insufficient evidence of storage state. Keep the application file volume and companion database volumes through an application database cutover.

The application normally changes its schema through fresh subject baselines. A release that changes those baselines needs an explicitly authorized clean database cutover: stop application writes, stop the database, detach and verify the old volume, attach a new uniquely named volume, verify database readiness, then deploy the exact verified image and check login, scoped records and document persistence. Record old-volume deletion or pending deletion separately. Ordinary redeploys reuse existing storage. Do not extrapolate this disposable-demo procedure into production data migration.

The Commitment budget hotfix is an explicit incremental exception: `9999_z_commitment_budget_payment_hold` runs after an existing `9999_seed` journal entry and removes the obsolete budget-side Commitment cap triggers and functions. It preserves business records and the seed journal. Deploy it without a reset or seed replay. The later Claim recovery hotfix changes code only and adds no migration. These releases do not authorize other baseline changes on an existing database.

The source runbooks record non-reset Railway and AWS deployments of the Claim recovery image built from `da9ec0568c178358a4852abbdf77d30407566198`, build `38772040704`, digest `sha256:2891db198dfafedbd0e2d284670d2ee605adf3d00e793079a86d4280a321201d`. Their before/after checks retained business records and storage. These are recorded deployment results; this documentation sync did not inspect live deployments. The pinned image manifest is build evidence. Follow the source’s current `.railway/README.md` and AWS runbook for deployment-specific resource identities and recovery.

## Dedicated Railway demo reset

`bun run railway:demo:reset` is restricted to the former source-mode demo layout with a service named `Postgres`. Its preview mode is read-only. The current pinned-image `GCS DB` demo layout is rejected before Railway calls; **do not use `--execute` against that layout**. The application source runbook describes the exact supported preconditions. For the current image deployment, plan recovery from the paired database and attachment-volume backups instead of treating this helper as an executable reset path.
