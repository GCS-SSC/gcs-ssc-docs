# Inspect background queues

Use **Background queues** to investigate scheduled host and extension work. Open `/admin/queues` with global `system:read` permission. An Agency-scoped grant or a business assignment does not grant access.

The page is read-only. It does not run a handler, change its schedule, clear a lease, or retry a business operation.

## Find a handler

1. Search by handler ID or extension name.
2. Filter by **Owner**, **State**, or **Queue level**. Use **Clear filters** to restore the full list.
3. Open **Schedule details** for the handler.
4. Select **Refresh** to fetch a new snapshot. Check its time under **About background scheduling** before comparing results.

The list shows the handler and owner, current registration, execution eligibility, level, and next scheduled run. The summary counts registered, enabled, and retained handlers. These counts describe the loaded snapshot; filters narrow the list.

| State | Meaning |
| --- | --- |
| Registered | This server process has registered the handler. |
| Enabled | The host can offer work to the handler. For extensions, at least one active Agency has enabled the extension. This does not authorize every Agency import. |
| Disabled | The extension has no current eligible Agency enablement. |
| Retained schedule | The database retains scheduling evidence, but this process has no current registration. The row does not prove that a handler can run. |

An extension may appear only after its first activation. A registered handler can have no scheduling evidence until the runner prepares it. An empty list describes the responding process, not every server in the deployment.

## Read execution details

**About background scheduling** lists each level's cadence, retry policy, current cycle, and next scheduled run. Handler details show the last completed or skipped cycle, claimed cycle, consecutive failures, retry deadline, last error, and last update.

For work **Shared across servers**, details also show the lease owner, expiry, and lease state at snapshot time. An active lease records a claim; it does not prove that the worker is healthy. An expired lease permits recovery by another server. Do not clear it merely because a run is slow.

For work in **This server process**, details show whether the handler is running or waiting in the responding process. This state stays in memory and resets at restart. These handlers have no shared lease. Requests served by different replicas can therefore show different local evidence.

For example, if a connector shows **Last run failed** and **Retry scheduled**, open its details and read **Last error** and **Retry not before**. Restore the failed dependency, then wait for the next eligible cycle and select **Refresh**. Check the connector's own operation records too. A successful scheduled handler does not prove that every imported record succeeded.

## Recover from a failed load

If a refresh fails, the page can keep the previous snapshot and identify it as stale. Select **Try again** after restoring connectivity. A failed collection does not return a partial new snapshot. If no earlier snapshot exists, the page shows a load error without handler data.

If access becomes unavailable, the page clears privileged results and filters. Check global system read permission before trying again. Permission changes also clear the old snapshot before the page fetches evidence for the new permission state.

Use application logs and the domain queue to investigate repeated handler errors. This page has no controls to repair business data or requeue work. See [Background work and failure handling](../operator/background-work.md) for retry timing, storage cleanup, and recovery rules.
