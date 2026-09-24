# Audit and access logs

Use **Administration → Audit** to investigate saved changes, security events, and application database queries. The workspace is read-only. It helps answer who changed a record and which application request was involved; it is not a complete record of everything a person saw or did outside the application.

## Access

A role must explicitly grant `audit:read` at global or Agency scope. A global grant can read evidence across Agencies; an Agency grant returns only events attributed to that Agency. The visibility rule is applied before search, counts, pagination, and detail reads. A System grant, business-record permission, or exact assignment does not grant Audit access. Audit is read-only; it has no create, edit, or delete actions.

Captured request and query inputs have a separate `audit:view_audit_inputs` capability. An Audit reader without it sees the event and an input-visibility status, but not the captured values. A suitable Agency input grant reveals only evidence attributed to that Agency; globally attributed inputs require a global grant. Captured values are sanitized and may be unavailable for a given event. Give these permissions only to staff whose duties require that evidence.

## Find an event

1. Open Audit and choose the Audit events or Access view in the vertical navigation.
2. Narrow the date/time interval, then add a table, actor, operation, record ID, or request ID if known.
3. Use search for text within table names, request IDs, operations, and actor identifiers. Search is literal; `%` and `_` do not act as wildcards.
4. Open the row's details action to inspect the captured evidence.
5. Copy its request ID into the request filter to correlate changes and queries from the same request.

Results are server-paginated, newest first. The default page contains 20 rows; API limits range from 1 to 100. Exact filters match exact identifiers or values; the time bounds are inclusive. API timestamps use ISO datetimes, and the start must not follow the end. The browser converts its local date/time inputs to ISO values. Switching views or filters clears the selected detail and returns to the first page.

The actor is the authenticated account's `user.id`, not the separate Common User identifier used for assignments. Authentication queries can be anonymous; background work can have system attribution; direct database mutations can have database attribution. An absent user ID therefore does not by itself indicate missing authorization.

## Understand the evidence

| Evidence | What it contains | Important boundary |
| --- | --- | --- |
| Change event | Initial values for inserts; old/new changed-column pairs for updates; retained values for deletion and restoration events. | Captured in the business transaction. An unchanged update produces no change event; failed capture rolls back the mutation. |
| Security event | Recorded identity/role security action, target, and associated metadata. | This is a dedicated producer, not a replacement for every row-change event. |
| Access event | Redacted SQL, elapsed time, query and transaction outcome, row count, correlation, and supported returned identities. | Query evidence, not complete returned data or proof that a user read every result. |

Numeric values in change evidence retain decimal text so large identifiers and exact money are not rounded through JavaScript numbers. JSON columns are compared as whole values. Credential/secret exclusions and restricted capture policies intentionally omit sensitive values.

SQL literals/comments are redacted. Sanitized request or query inputs appear only with the separate input-view grant; they are not a copy of the complete request body. A straightforward structured single-table query may identify returned primary keys, including aliases and composite keys. Joined, aggregate, raw, or identifier-free projections may report unavailable identities. Read the limitations shown in the details; do not interpret an unavailable projection as an empty result. A record-ID filter in Access matches captured primary-key values and cannot recover identities that were not captured.

## Worked investigation

Suppose support needs to understand a budget-line change reported at 14:10.

1. In Audit events, choose a narrow interval around that time and enter the relevant table or record identifier.
2. Open the matching change and compare the stored old/new values, actor, and operation.
3. Filter by its request ID to find other changes from the same save. A percentage-budget save can update dependent lines in the same transaction.
4. Open Access with that request ID to inspect durable query evidence and its transaction outcome.
5. If Access is initially empty, allow time for the buffer to flush, then reload. Check retention and capture settings before concluding that evidence should exist.

This procedure does not reconstruct a full request body or unavailable query results. Use the retained evidence and the business record together, within your authorized duties.

## Retention and delayed access records

The page displays configured retention periods; it does not edit them. Defaults are **365 days** for audit/security evidence and **30 days** for access evidence. Operators configure them at deployment and restart the application. Expiry runs at startup and hourly, removing at most 1,000 expired rows per evidence table each pass; a large backlog can take several passes.

Access evidence uses a bounded in-memory queue per process. A record becomes eligible only after its transaction/connection is released and its HTTP response finishes or disconnects. A ten-second timer writes eligible batches of at most 100. The browser shows persisted rows only, so immediate read-after-request visibility is not guaranteed.

The queue is limited to 2,000 events and 32 MiB of estimated serialized payload. Outages retry with backoff, but a full queue drops new records with structured reporting. A crash or deployment can lose pending records; shutdown attempts a bounded drain. Access capture can be disabled through `GCS_ACCESS_LOG_ENABLED=false` while row-change and security capture continue. Existing access rows remain readable until retention removes them.

## Failure and recovery

| Symptom | Action |
| --- | --- |
| Audit navigation is absent or access is denied | Verify an explicit global or matching Agency `audit:read` grant; System access is insufficient. |
| An event or captured input is missing | Check whether the event belongs to another Agency and whether `audit:view_audit_inputs` applies; a restricted or unavailable input is not proof that no query ran. |
| List, detail, or retention settings fail to load | Use the visible retry action. A failed fetch is not an empty evidence set. |
| A successful recent request has no access rows yet | Wait for batching, reload, and ask an operator to check capture enablement, queue backlog, and loss/failure events. |
| Old evidence is absent | Compare its age with the configured retention. Expired or uncaptured evidence cannot be recreated by changing the filter. |
| APIs return service unavailable during startup | Audit readiness is part of startup. Operators must restore startup health rather than continue business operations without initialized capture. |

Audit evidence rejects ordinary update, delete, and truncate operations. Retention uses a restricted expiry path. A database owner can still change database policy or triggers; this is not protection against that owner. Direct database reads and object-storage contents are outside application access capture. See [operator configuration](../operator/configuration.md) for deployment settings and [data model](../developer/data-model.md) for the persistence boundary.
