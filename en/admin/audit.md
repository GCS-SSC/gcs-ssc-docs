# Audit and access logs

Use **Administration → Audit** to investigate saved changes, security events, and application database queries. Audit is read-only. Use it to find who changed a record and which request made the change. It does not record everything a person saw or did.

## Access

You need a role that grants `audit:read` globally or for an Agency. A global grant can read evidence across Agencies; an Agency grant returns only events attributed to that Agency. Search results, counts, and details include only events you can read. The application checks your current Audit permissions each time it loads a list. A System grant, business-record permission, or exact assignment does not grant Audit access. You cannot create, edit, or delete Audit events.

To see captured values sent with a request or database query, you also need `audit:view_audit_inputs`. An Audit reader without it sees the event and an input-visibility status, but not the captured values. Agency input-view permission reveals only evidence attributed to that Agency. To see globally attributed inputs, you need global permission. The application removes sensitive values before capture. Some events have no available inputs. Give these permissions only to staff whose duties require that evidence.

An event's Agency determines who can read it. A linked Agency or the tracking Agency displayed on a record may differ from the event's Agency. The main rules are:

- Shared Proponent profiles and Funding History use the Agencies covered by the actor's active Agency roles. Their child records follow the same rule unless they have an explicit Agency owner. Proponent notes and Agency Financial IDs use their explicit Agency. The lead Agency alone does not determine who can read these events.
- Opportunities and Intakes use the Agency of the Opportunity's anchor Stream and Program. Selecting another Stream does not add an Audit owner.
- Approvals, Data Collections, and other records used in several workspaces follow the owner of the actual source record.
- System-owned Guided Help events are attributed globally. Agency-owned Guided Help and Agency catalogue entries belong to their Agency, including their publication records.

For shared records, events are attributed globally if the person making the change has no active Agency roles. Changes made without a person must specify their attribution. The application does not choose an Agency from a displayed label.

For example, assignment to an Agreement may let an officer work on that Agreement, but it does not let them investigate its Audit events. If you need to explain a budget change and Audit is unavailable, ask an authorized Audit reader to investigate with the record reference and approximate save time.

## Find an event

1. Open Audit and choose the Audit events or Access view in the vertical navigation.
2. Narrow the date and time interval. Add a table, actor, operation, record ID, or request ID if you know it.
3. Use search for text within table names, request IDs, operations, and actor identifiers. Search is literal; `%` and `_` do not act as wildcards.
4. Open the row's details action to inspect the captured evidence.
5. Copy its request ID into the request filter to find changes and queries from the same request.

Results appear newest first, with 20 rows per page by default. Exact filters match the value you enter. The date interval includes both endpoints. Enter dates in your local time, with the start before or equal to the end. Text filters accept at most 200 characters and reject null characters. If a pasted filter fails, clear it and type the identifier again. Switching views or filters clears the selected detail and returns to the first page.

The actor identifies the sign-in account, not the Common User ID used for assignments. Sign-in queries can be anonymous. Background work can be attributed to the system, and direct database changes can be attributed to the database. A missing user ID therefore does not by itself mean that an action was unauthorized.

## Understand the evidence

| Evidence | What it contains | Important boundary |
| --- | --- | --- |
| Change event | Initial values for new records, old and new values for changed columns, and retained values for deletions and restorations. | Saved together with the record change. Saving unchanged values produces no change event. If capture fails, the record change is undone. |
| Security event | A security action on a user or role, the affected record, and related details. | Recorded separately from change events. It does not replace them. |
| Access event | SQL with sensitive details removed, duration, query and transaction outcome, row count, request links, and captured IDs of returned records. | Evidence of a query, rather than a complete copy of its results. It does not prove that a user read every result. |

Change evidence preserves exact amounts and large identifiers. Changes to a JSON field show the whole value. Capture rules exclude credentials, secrets, and other restricted values.

SQL values and comments are removed. Captured request or query inputs appear only with separate input-view permission, after sensitive values are removed. They are not a copy of the complete request body. A simple query on one table may record the IDs of returned records. These IDs come from database primary keys, including keys returned under another name or made of several values. More complex queries that combine tables, summarize results, use raw SQL or omit identifiers may not record those identities. Read the limitations shown in the details. Missing record identifiers do not mean that the query returned no results. A record-ID filter in Access matches captured primary-key values and cannot recover identities that were not captured.

## Worked investigation

Suppose support needs to understand a budget-line change reported at 14:10.

1. In Audit events, choose a narrow interval around that time and enter the relevant table or record identifier.
2. Open the matching change and compare the stored old and new values, actor, and operation.
3. Filter by its request ID to find other changes from the same save. A percentage-budget save can update dependent lines in the same transaction.
4. Open Access with that request ID to inspect saved query evidence. Check whether the transaction completed or its changes were undone.
5. If Access is initially empty, wait for queued events to be saved, then reload. Check retention and capture settings before concluding that evidence should exist.

This procedure does not reconstruct a full request body or unavailable query results. Use the retained evidence and the business record together, within your authorized duties.

## Retention and delayed access records

The page displays configured retention periods; it does not edit them. Defaults are 365 days for audit and security evidence and 30 days for access evidence. Operators change these settings at deployment and restart the application. Expiry runs at startup and every hour. Each pass removes at most 1,000 expired rows from each evidence table, so a large backlog can take several passes.

Access events wait in a queue in each application process. They become ready to save after the database transaction or connection is released and the HTTP response finishes or disconnects. Every ten seconds, the application saves up to 100 ready events. The browser shows only saved events, so a recent request may not appear immediately.

The queue holds at most 2,000 events and an estimated 32 MiB of event data. After a failure, the application waits before retrying. When the queue is full, the application discards new events and reports the loss to operators. A crash or deployment can lose pending events. During shutdown, the application tries to save them within a time limit. Operators can disable access capture with `GCS_ACCESS_LOG_ENABLED=false`. Change and security capture continue. Existing access rows remain readable until retention removes them.

## Failure and recovery

| Symptom | Action |
| --- | --- |
| Audit navigation is absent or access is denied | Verify an explicit global or matching Agency `audit:read` grant; System access is insufficient. |
| An event or captured input is missing | Check whether the event belongs to another Agency and whether `audit:view_audit_inputs` applies; a restricted or unavailable input is not proof that no query ran. |
| List, detail, or retention settings fail to load | Use the visible retry action. A failed fetch is not an empty evidence set. |
| A successful recent request has no access rows yet | Wait for queued events to save, then reload. Ask an operator to check whether capture is enabled, events are waiting, or failures or losses were reported. |
| Old evidence is absent | Compare its age with the configured retention. Expired or uncaptured evidence cannot be recreated by changing the filter. |
| APIs return service unavailable during startup | Audit readiness is part of startup. Operators must restore startup health rather than continue business operations without initialized capture. |

Ordinary database operations cannot update, delete, or clear Audit evidence. Only the restricted expiry process removes expired evidence. A database owner can still change the rules that protect it. Application access capture does not include direct database reads or file contents in object storage. See [operator configuration](../operator/configuration.md) for deployment settings and the [data model](../developer/data-model.md) for storage details.
