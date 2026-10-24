# Background work and failure handling

Approval, review, and Completion actions advance through application requests and are recorded in the database. A notification or email does not finish abandoned work. If an officer is waiting for approval, inspect the recorded workflow and its available actions. Storage cleanup and audit maintenance run separately, with the recovery rules below.

## Durable storage cleanup

When an officer deletes an attachment, the application records a cleanup job in `storage_cleanup_outbox` in the same transaction that retires the attachment metadata. The request tries one cleanup batch, but success of the user’s deletion does not require immediate external-object deletion. Failed upload finalization and provider-metadata compensation can also create cleanup work.

The running application processes up to 60 due storage-cleanup operations every five minutes on Level 1 and prunes completed jobs every 30 minutes on Level 2. The one-shot drain remains available for catch-up or a separately operated worker with the same database access, provider code, Agency configuration and extension secret key.

From a prepared source checkout:

```sh
bun run storage:cleanup:drain
```

From a complete production build, using its packaged dependencies and provider registry:

```sh
node .output/server/storage-cleanup-drain.mjs
```

Both commands are one-shot drains. They process currently eligible work and exit; they do not wait for future retry times. Deploy the worker from the same application build as the web process. Do not copy the standalone file without its runtime dependencies.

| Variable | Default and meaning |
| --- | --- |
| `GCS_STORAGE_CLEANUP_WORKER_ID` | Generated process identifier; set a distinct identifier when operational tracing requires it. |
| `GCS_STORAGE_CLEANUP_BATCH_SIZE` | 20; clamped to 1–100. |
| `GCS_STORAGE_CLEANUP_RETENTION_DAYS` | 30; minimum 1. Applies only to completed cleanup jobs. |

Workers claim pending jobs whose retry time has arrived and reclaim processing jobs with expired leases. Row locking with `SKIP LOCKED` coordinates concurrent workers. The batch processor claims one operation at a time with a 610-second lease, so waiting operations do not lose their leases during slow provider calls. Provider deletion must be safe to repeat because a worker can stop after external deletion but before recording success.

Failures remain pending and retry without an attempt limit. Delays start at 30 seconds and double to a 30-minute cap. The scheduled processor attempts them on the next eligible five-minute cycle; the one-shot command can process them as soon as their retry time arrives. Its output reports `claimed`, `completed`, `retried`, `deadLettered`, and `pruned`; the current processor always reports `deadLettered: 0`. Monitor repeated failures and queue age as well as process exit status.

For example, if a storage service is unavailable during deletion, the attachment remains deleted for the user and the cleanup job waits. Restore provider access, then allow the next eligible cycle or run the one-shot drain after the retry time. Inspect the recorded provider, Agency, operation, attempt count, and `last_error` if failures continue. Historical `dead_letter` jobs are retained but are not claimed automatically. Investigate them before controlled repair. Do not delete unresolved jobs to clear an alert.

A provider-owned metadata update reserves a restoration job before changing the external metadata. Its request lease is five minutes. A successful database transaction completes the reservation; a failure releases it for restoration of the previous metadata. Treat `restore_metadata` jobs as compensation work, not as object deletions.

Each drain prunes at most 500 completed jobs older than its retention threshold. Pending, processing, and dead-letter jobs are retained. Back up the outbox with the database. If logs report that orphan-cleanup persistence itself failed, there may be no durable job: reconcile the logged object identity against provider storage and application metadata.

## Shared background scheduling

The host checks for due work every five seconds. Handlers select a host-defined level rather than their own interval. Cycles align to UTC time boundaries.

| Level | Cadence | Failure delay after completion |
| --- | --- | --- |
| 0 | 10 seconds | Starts at 10 seconds, doubles to a 5-minute cap. |
| 1 | 5 minutes | Starts at 5 minutes, doubles to a 1-hour cap. |
| 2 | 30 minutes | Next scheduled cycle. |
| 3 | 1 hour | Next scheduled cycle. |

A new handler joins the next future cycle. After a slow run or downtime, missed cycles do not accumulate. Levels 0 and 1 retry on the first cycle at or after their retry deadline. All levels keep retrying without an attempt limit. A success clears consecutive failures, the last error, and the retry deadline.

For example, a Level 1 run that fails at `12:00:01 UTC` has its first retry deadline at `12:05:01 UTC`. The next aligned five-minute cycle is `12:10:00 UTC`. The five-second poll can dispatch it after that boundary; it does not promise execution at the exact deadline.

Shared handlers use database schedules and independent two-minute leases, renewed every 30 seconds. An expired lease allows another server to reclaim unfinished work. A slow handler does not block unrelated handlers. The schedule contains handler IDs and execution evidence, without credentials or business payloads. Domain queues retain their own requests and delivery evidence.

A handler may run more than once, such as after a crash between external delivery and recording success. Extensions must retain requests and keys that prevent duplicate business effects. Scheduled imports still require the declared capability, current Agency enablement, and transaction-bound host authorization. Agreement imports also recheck the exact Stream, recipient link where required, business status, Closeout boundary, and active primary assignee. Imports create drafts that still require officer review, Completion, and approval.

Access-log flush and retention handlers run separately in each server process. Their scheduling state stays in memory and resets on restart. They do not take a shared database lease or wait for business-database readiness. Access events remain subject to the loss limits below.

Use [Background queues](../admin/queues.md) to inspect registrations, eligibility, retries, and leases. After a connector outage, restore its credentials and network access, then check both its handler error and its domain queue's conflict state. A successful handler run does not resolve invalid business data. Keep leases and delivery evidence intact while investigating. See the [Portal host boundary](../intake/portal.md).

## Audit maintenance

For officers, audit evidence helps explain who changed a record and when. Operators must distinguish saved change/security evidence from access events that may still be waiting to be written. For example, immediately after an officer opens an Agreement, its access event may not yet appear in a search; a delay alone does not prove that no access occurred.

Change and security evidence stays in the business database. Access history uses a separate store and a bounded, in-memory buffer before persistence. The buffer holds at most 2,000 events or 32 MiB. Process loss or saturation can lose events. These events are not recoverable storage-outbox jobs. See [Audit](../admin/audit.md).

The access store uses a separate PostgreSQL instance or a separate PGlite `-access` directory. It initializes when needed. An access-store outage does not block business-database readiness. Access-history reads return `503 ACCESS_HISTORY_UNAVAILABLE` when the store is unavailable; they do not fall back to the business database.

Each process flushes its access buffer on Level 0. By default, a flush permits ten persistence attempts of up to 100 rows each. `GCS_ACCESS_LOG_MAX_BATCHES_PER_FLUSH` accepts 1–100 attempts. Splitting or dropping a malformed batch also consumes this budget. Transient failures retain buffered work for a later attempt, subject to buffer limits and process survival.

Retention runs hourly on Level 3, without a startup retention pass. Each run deletes at most ten batches of 1,000 records. Access retention runs in each process against the separate store; change and security retention uses a shared handler against the business database. Configure `GCS_AUDIT_RETENTION_DAYS` and `GCS_ACCESS_RETENTION_DAYS` for the required retention periods. `GCS_ACCESS_LOG_ENABLED=false` disables access capture, not change or security capture. Watch dropped events, flush failures, store outages, and retention failures when investigating recent activity.

## Administrative export and monitoring

For example, restoring an Agreement’s database records without restoring its externally stored claim documents leaves an incomplete case file. Plan and verify recovery of both the database and attachment storage.

The administrative SQL dump uses a separately bundled worker. Concurrent requests share one generation with a timeout. Callers can stop waiting, and cleanup terminates the worker. If the export fails, check capacity and logs before retrying. This export contains schema and migration SQL, not live business records or external attachments. See [Backup and restore](deployment.md#backup-and-restore) for its limits and the required backups.

Poll `/api/health`, monitor startup failures, process restarts, resource limits, database health, provider availability, cleanup backlog, and backup restoration. Concrete extensions may add their own workers; their documentation defines those additional monitoring and recovery requirements.

The `audit.access_queue` report includes `sent`, the number of events successfully persisted during that drain, alongside pending queue statistics. A successful send count does not prove the queue is empty; inspect the remaining count and failures.
