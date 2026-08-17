# Background work and failure handling

GCS-SSC has no general server queue, scheduler, notification service, or email-delivery subsystem. Approval, review, completion, recommendation, and workflow engines advance through persisted request-driven operations. Operators must not assume a separate worker will repair an abandoned business action unless the documented request is retried.

The administrative SQL dump is the one separately bundled server worker. Requests share one in-flight generation, have a timeout, support caller aborts, and terminate the worker during cleanup. A failed or timed-out export produces no successful download; retry after checking server capacity and logs.

Narrative Quality and Narrative Tags use browser Web Workers and packaged model assets. They run optional local inference, not privileged server jobs. Initialization failures reset the shared worker and produce a localized unavailable or fallback state; they must not block the host form. Verify that `/extensions/<extension-key>/...` assets are present in the production artifact when these features fail consistently.

GC Forms synchronization is invoked through extension API requests. It is not a cron service. Its persisted materialization failures are administrative workflow records; retry through the extension’s authorized recovery action after correcting configuration or source data. Never expose decrypted payloads or raw diagnostic exceptions in user guidance or logs.

Use application logs for startup, migrations, dispatch, and unexpected failures, but note that the repository does not wire a universal structured-log or metrics backend. Platform health monitoring should poll `/api/health`, watch process restarts and resource limits, and add infrastructure-level database, disk, and backup monitoring.
