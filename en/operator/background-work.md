# Background work and failure handling

GCS-SSC has no general server queue, scheduler, notification service, or email-delivery subsystem. Approval, review, completion, recommendation, and workflow engines advance through persisted request-driven operations. Operators must not assume a separate worker will repair an abandoned business action unless the documented request is retried.

The administrative SQL dump is the one separately bundled server worker. Requests share one in-flight generation, have a timeout, support caller aborts, and terminate the worker during cleanup. A failed or timed-out export produces no successful download; retry after checking server capacity and logs.

Concrete extensions may add browser workers or server-side work. Their owning documentation defines packaging, monitoring, retry, and recovery requirements; the host documentation does not treat those extension-specific processes as core background services.

Use application logs for startup, migrations, dispatch, and unexpected failures, but note that the repository does not wire a universal structured-log or metrics backend. Platform health monitoring should poll `/api/health`, watch process restarts and resource limits, and add infrastructure-level database, disk, and backup monitoring.
