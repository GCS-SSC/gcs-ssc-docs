# Background work and failure handling

This page is for operators supporting officers who use agreements, approvals and attachments. Approval, review and Completion actions are recorded in the database and advance through application requests. A general notification or email service does not automatically finish abandoned work. If an officer is waiting for approval, inspect the recorded workflow and its available actions. Storage cleanup and audit maintenance run separately, with the recovery rules below.

## Durable storage cleanup

When an officer deletes an attachment, the application records a cleanup job in `storage_cleanup_outbox` in the same transaction that retires the attachment metadata. The request tries one cleanup batch, but success of the user’s deletion does not require immediate external-object deletion. Failed upload finalization and provider-metadata compensation can also create cleanup work.

The running application now drains one due storage-cleanup operation every five seconds through its durable L1 scheduler and prunes completed jobs hourly. The one-shot drain remains available for catch-up or a separately operated worker with the same database access, provider code, Agency configuration and extension secret key.

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

Workers claim pending jobs whose retry time has arrived and reclaim processing jobs with expired leases. Row locking with `SKIP LOCKED` coordinates concurrent workers. A normal processing lease is 60 seconds: this is the period during which one worker reserves the job, so another worker does not normally take it. Provider deletion must be safe to repeat because a worker can stop after external deletion but before recording success.

Failures retry after 30 seconds, then exponentially longer delays. The eighth failed attempt places the job in `dead_letter`; ordinary drains no longer claim it. The output reports `claimed`, `completed`, `retried`, `deadLettered`, and `pruned`. A drain can exit successfully while reporting retried or dead-lettered jobs: monitor those counts and queue age, not just process exit status.

For example, if a storage service is unavailable during deletion, the user-visible attachment remains deleted and the pending job waits for its next attempt. Restore service access, then run the drain after that time. If it has already reached `dead_letter`, investigate the recorded provider, Agency, operation, attempt count, and `last_error` before controlled repair; the application supplies no general user requeue screen. Do not delete the job merely to clear an alert while the object or compensation remains unresolved.

A provider-owned metadata update reserves a restoration job before changing the external metadata. Its request lease is five minutes. A successful database transaction completes the reservation; a failure releases it for restoration of the previous metadata. Treat `restore_metadata` jobs as compensation work, not as object deletions.

Each drain prunes at most 500 completed jobs older than its retention threshold. Pending, processing, and dead-letter jobs are retained. Back up the outbox with the database. If logs report that orphan-cleanup persistence itself failed, there may be no durable job: reconcile the logged object identity against provider storage and application metadata.

## Durable L1 scheduling

Nitro offers registered host and extension handlers work every five seconds after migration and Audit readiness. `l1_queue` retains each handler’s next-run time, attempt count, last error and lease. Domain queues retain their own payloads and delivery evidence; L1 contains no credentials or business request payloads.

A database claim coordinates replicas. A lease lasts two minutes and renews every 30 seconds. Successful work schedules its next run from completion; missed intervals do not accumulate. Failed handlers retry indefinitely, using exponential delay capped at 30 minutes or their longer configured interval. A stopped or sleeping application resumes due work when it runs again. A slow handler does not block unrelated handlers.

A handler may run more than once. For example, a crash after an external service accepts a delivery, but before the application records success, can cause the same delivery to be attempted again. This is called at-least-once execution. Extension handlers must use their domain’s persisted idempotency and replay rules. Scheduled imports require the declared capability, current Agency enablement and transaction-bound host authorization. Agreement imports additionally recheck the exact Stream, any verified recipient link, business status, Closeout boundary and active primary assignee. Imports create drafts; officers must still check the imported information and follow the required completion and approval steps. Receiving external data does not approve it.

For example, after a connector outage, restore its credentials and network access, inspect the connector’s queued-operation screen, and allow its delivery/import schedule to resume. Check both `l1_queue.last_error` and the domain queue’s conflict/retry state. A successful L1 run may leave a domain operation in conflict; recurring scheduling does not repair invalid business data. Do not clear a lease or delete retained evidence just to hide an alert. See the [Portal host boundary](../intake/portal.md).

## Audit maintenance

For officers, audit evidence helps explain who changed a record and when. Operators must distinguish saved change/security evidence from access events that may still be waiting to be written. For example, immediately after an officer opens an Agreement, its access event may not yet appear in a search; a delay alone does not prove that no access occurred.

Database change and security evidence and queued access events have different failure guarantees; see [Audit](../admin/audit.md). Access events use a bounded, in-memory queue, flushed in batches. Process loss or saturation can lose queued access events. They are not recoverable jobs in the storage outbox.

Audit initialization is part of startup readiness. Retention runs at startup and periodically, deleting expired records in bounded batches. Configure `GCS_AUDIT_RETENTION_DAYS` and `GCS_ACCESS_RETENTION_DAYS` to match the deployment’s retention requirements. `GCS_ACCESS_LOG_ENABLED=false` disables access capture, not change/security capture. Watch queue-drop, flush-failure, and retention-failure logs and account for persistence delay when investigating recent activity.

## Administrative export and monitoring

For example, restoring an Agreement’s database records without restoring its externally stored claim documents leaves an incomplete case file. Plan and verify recovery of both the database and attachment storage.

The administrative SQL dump uses a separately bundled worker. Requests share one in-flight generation, have a timeout, support caller aborts, and terminate the worker during cleanup. An unsuccessful export produces no successful download; check capacity and logs before retrying. A SQL dump does not contain external attachment objects or replace coordinated storage backups.

Poll `/api/health`, monitor startup failures, process restarts, resource limits, database health, provider availability, cleanup backlog, and backup restoration. Concrete extensions may add their own workers; their documentation defines those additional monitoring and recovery requirements.

The `audit.access_queue` report includes `sent`, the number of events successfully persisted during that drain, alongside pending queue statistics. A successful send count does not prove the queue is empty; inspect the remaining count and failures.
