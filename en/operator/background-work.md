# Background work and failure handling

Business workflows advance through persisted request-driven operations. There is no general notification or email-delivery service that repairs abandoned approvals, reviews, or completion actions. Storage cleanup and audit maintenance have separate execution and recovery contracts.

## Durable storage cleanup

Attachment deletion records a cleanup job in `storage_cleanup_outbox` in the same transaction that retires the attachment metadata. The request tries one cleanup batch, but success of the user’s deletion does not require immediate external-object deletion. Failed upload finalization and provider-metadata compensation can also create cleanup work.

Run the drain regularly from an external scheduler with the application’s database access, registered provider code, Agency configuration, and extension secret key. The host does not start a periodic storage-cleanup loop inside Nitro.

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

Workers claim pending jobs whose retry time has arrived and reclaim processing jobs with expired leases. Row locking with `SKIP LOCKED` coordinates concurrent workers. A normal processing lease is 60 seconds. Provider deletion must be safe to repeat because a worker can stop after external deletion but before recording success.

Failures retry after 30 seconds, then exponentially longer delays. The eighth failed attempt places the job in `dead_letter`; ordinary drains no longer claim it. The output reports `claimed`, `completed`, `retried`, `deadLettered`, and `pruned`. A drain can exit successfully while reporting retried or dead-lettered jobs: monitor those counts and queue age, not just process exit status.

For example, if a storage service is unavailable during deletion, the user-visible attachment remains deleted and the pending job waits for its next attempt. Restore service access, then run the drain after that time. If it has already reached `dead_letter`, investigate the recorded provider, Agency, operation, attempt count, and `last_error` before controlled repair; the application supplies no general user requeue screen. Do not delete the job merely to clear an alert while the object or compensation remains unresolved.

A provider-owned metadata update reserves a restoration job before changing the external metadata. Its request lease is five minutes. A successful database transaction completes the reservation; a failure releases it for restoration of the previous metadata. Treat `restore_metadata` jobs as compensation work, not as object deletions.

Each drain prunes at most 500 completed jobs older than its retention threshold. Pending, processing, and dead-letter jobs are retained. Back up the outbox with the database. If logs report that orphan-cleanup persistence itself failed, there may be no durable job: reconcile the logged object identity against provider storage and application metadata.

## Audit maintenance

Database change and security evidence and queued access events have different failure guarantees; see [Audit](../admin/audit.md). Access events use a bounded, in-memory queue, flushed in batches. Process loss or saturation can lose queued access events. They are not recoverable jobs in the storage outbox.

Audit initialization is part of startup readiness. Retention runs at startup and periodically, deleting expired records in bounded batches. Configure `GCS_AUDIT_RETENTION_DAYS` and `GCS_ACCESS_RETENTION_DAYS` to match the deployment’s retention requirements. `GCS_ACCESS_LOG_ENABLED=false` disables access capture, not change/security capture. Watch queue-drop, flush-failure, and retention-failure logs and account for persistence delay when investigating recent activity.

## Administrative export and monitoring

The administrative SQL dump uses a separately bundled worker. Requests share one in-flight generation, have a timeout, support caller aborts, and terminate the worker during cleanup. An unsuccessful export produces no successful download; check capacity and logs before retrying. A SQL dump does not contain external attachment objects or replace coordinated storage backups.

Poll `/api/health`, monitor startup failures, process restarts, resource limits, database health, provider availability, cleanup backlog, and backup restoration. Concrete extensions may add their own workers; their documentation defines those additional monitoring and recovery requirements.
