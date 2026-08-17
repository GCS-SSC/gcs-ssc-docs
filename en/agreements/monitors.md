# Agreement monitoring

Agreement monitors organize a monitoring exercise: its schedule, objectives, work items, findings, follow-ups, progress updates, promising practices, completion record, and any configured workflow. Open **Agreements**, select an agreement, and choose **Monitors**. Select the monitor type to open its workspace.

## Before creating a monitor

The agreement must already point to a transfer-payment stream and agency. Administrators must configure the following reference data:

| Dependency | Enforced scope |
| --- | --- |
| Monitor type | A non-deleted type belonging to the agreement's current stream. |
| Tentative fiscal year | A non-deleted fiscal year belonging to the agreement's agency. |
| Monitor approval template | Optional and separate from direct completion; it must be scoped to the stream and entity type `fundingcasemonitor`. |
| Workflow setup | Optional; completion starts the applicable completion workflow when one is configured. |

The Monitors tab requires agreement `read` access. The server checks the corresponding agreement `create`, `update`, or `delete` action for every write; Team and scoped access are enforced on the server. Lookup requests repeat the action required by the form (`create` or `update`).

## Create and manage the monitor header

The list shows type, fiscal year, tentative quarter, onsite indicator, status, and actions. Search matches either language of the monitor type, the fiscal-year label, quarter, and localized Yes/No value.

| Field | Rule |
| --- | --- |
| Type | Required. The server rejects a type outside the agreement stream even if a caller bypasses the picker. Names are stored bilingually on the stream reference record. |
| Tentative fiscal year | Required. The server rejects a fiscal year outside the agreement agency. Its display label is the same in both locale responses. |
| Tentative quarter | Required small integer from 1 through 4; both validation and PostgreSQL enforce the range. |
| Onsite | Required true/false value. |

A new monitor starts in `draft`. Opening it exposes Planning, Items, Findings, Follow-ups, Promising practices, and Workflow, followed by any enabled extension tabs targeting `monitor`. Header edits can change all four fields while the monitor is editable.

::: warning Status does not advance on edit
Although the source contains a `syncAgreementMonitorEditingStatus` helper, no current route calls it. Creating or editing child records therefore does **not** automatically change `draft` to `inprogress`. Treat the displayed status as the stored value, not as proof of how much monitoring work has been entered.
:::

## Record the monitoring work

All child creates, updates, and deletes use the permission matching the operation, refresh authorization inside a transaction, lock the monitor aggregate, and reject a monitor in `complete`, `pendingapproval`, `approved`, or `denied`. The parent/child relationship is rechecked before mutation.

| Workspace | Required content and behaviour |
| --- | --- |
| Planning | One or more free-text objectives. There is no uniqueness or minimum-count rule. |
| Items | Name (maximum 255 characters), detail, planned start/end, monitored flag, and optional actual start/end. Planned end cannot precede planned start. When **Monitored** is true, both actual dates are required; when both exist, actual end cannot precede actual start. |
| Findings | Name (maximum 255 characters), action type, responsible party, and detail. Action types are `amendment`, `mandatoryaction`, `suggestedaction`, and `none`. |
| Follow-ups | Name (maximum 255 characters), responsible party, and due date. Creation always stores status `open`; the status is not directly editable on the follow-up form. |
| Follow-up updates | Update text, status, and update date. Status is `open`, `onhold`, `completed`, `cancelled`, or `unabletocomplete`. The Updates viewer supports add, edit, and delete when authorized. |
| Promising practices | One or more free-text practice records. |

Responsible-party values used by findings and follow-ups are `applicantrecipient`, `organization`, and `joint`. The interface localizes enum labels; free-text monitor content is stored as entered rather than as paired English/French fields.

### Follow-up status and history

After an update is created, changed, or soft-deleted, the parent follow-up takes the status of the non-deleted update with the highest database ID. If none remains, it returns to `open`. This is insertion order, not the user-entered update date: backdating a newer record still makes its status authoritative. Editing a follow-up itself does not change that derived status.

## Complete a monitor

Use **Workflow > Complete** while the monitor is editable. Completion requires at least one non-deleted monitor item. It does **not** require planning objectives, all items to be marked monitored, actual dates on unmonitored items, findings, resolved follow-ups, promising practices, or a successful separate approval.

The completion request:

1. refreshes agreement update authorization and locks the monitor;
2. rechecks that no completion exists and at least one item remains;
3. sets the monitor to `complete`;
4. creates one common completion record with the current mapped Common User and optional comments;
5. starts the configured completion workflow, if applicable; and
6. emits the completion hook after the transaction commits.

Completion is one-way in the current core workspace. A completed monitor and all of its child records are read-only.

::: warning Completion does not start monitor approval
Direct completion always writes `complete`. It does not inspect a `fundingcasemonitor` approval template and does not create a routing slip. This remains true when a valid template exists.
:::

## Approval and workflow boundary

The generic approval runtime supports `fundingcasemonitor`: an authorized explicit API or workflow integration can create a routing slip from the current stream template, assign sequential steps, allow configured additional steps, reassign a pending step, and record approve/deny decisions. Creating that routing slip sets the monitor to `pendingapproval`; the final decision sets both routing slip and monitor to `approved` or `denied`. The assigned current approver actions the next pending step, while management operations require fresh agreement update authorization.

The core monitor page does not present a control to create the initial standalone routing slip. Its Workflow section displays approvals only after a routing slip has already been materialized or when a configured workflow reaches its source-approval stage. Do not tell users that selecting **Complete** conditionally enters approval.

Completion workflows are also distinct from standalone approval. A configured completion can launch a sequence of review, recommendation, and final-approval stages. The Workflow section shows the active and previous attempts, and authorized users can retry a failed eligible run. See [Workflows](../concepts/workflows.md) and [Approvals, completions, and workflow integration](../concepts/approvals-completions.md).

## Delete and recover safely

Deleting a child record sets its `_deleted` flag. Deleting a follow-up also soft-deletes its updates. Deleting an editable monitor atomically soft-deletes the monitor, planning objectives, items, findings, promising practices, follow-ups, and follow-up updates. Database foreign keys use restricted physical deletion; the supported routes use logical deletion instead.

Deletion is unavailable after `complete`, `pendingapproval`, `approved`, or `denied`. Confirm the exact monitor before deleting; there is no restore action in the core interface. If a request fails, no success toast is shown and the modal remains available for correction. Refresh after an uncertain network result before retrying, because the server may already have committed the write.

## API contract summary

| Route group | Contract |
| --- | --- |
| `GET /api/agreements/{id}/monitors-overview` | Authorized list with bilingual type names and fiscal-year display. |
| `POST /api/agreements/{id}/monitors` | Validated, freshly authorized `draft` creation. |
| `GET/PATCH/DELETE /api/agreements/{id}/monitors/{monitorId}` | Full aggregate read, editable header patch, or transactional soft-delete cascade. |
| `GET /api/agreements/{id}/monitors/lookups/*` | Paginated, searchable stream monitor types or agency fiscal years; authorization follows `permission_action`. |
| `/monitor-planning`, `/monitor-items`, `/monitor-findings`, `/monitor-followups`, `/monitor-followup-updates`, `/monitor-promising-practices` | Each exposes POST plus child-ID PATCH and DELETE; there are no separate child GET routes because the aggregate detail response supplies all rows. |

Validation errors use the request locale and the standard `VALIDATION_FAILED` response. A missing or cross-agreement monitor/child is rejected; authorization is not inferred from an identifier supplied in the request body.
