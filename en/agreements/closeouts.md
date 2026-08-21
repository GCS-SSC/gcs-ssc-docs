# Agreement Closeout

Closeout records the evidence that an Agreement is administratively and financially complete before the Agreement becomes read-only. Open an Agreement and select **Closeouts**. A Closeout can be prepared while blockers remain; readiness becomes an enforced gate when its `close_out` workflow starts.

## Access and prerequisites

Only an `active` or `expired` Agreement can have a Closeout. The application does not automatically change an Agreement to `expired` when its end date arrives. Before a run can start, the stream needs an active published workflow setup for entity `fundingcaseagreementcloseout`, purpose `close_out`, and the Agreement must pass the readiness report.

| Operation | Effective access |
| --- | --- |
| Read Closeouts, readiness, snapshots, templates, previews, and downloads | Viewer at the Agreement owner scope; no Closeout assignment is required. |
| Create | Contributor at that scope plus exact Agreement assignment. Creation atomically assigns the creator as the Closeout primary. |
| Start, retry, cancel, perform Closeout work, or save a generated document | Contributor plus exact Closeout assignment, except for separately assigned review, recommendation, or approval work. |
| Delete a draft | Manager plus exact Closeout assignment. |
| Manage the Closeout roster | `agreement:manage_assignments`, active Closeout assignment, effective Contributor access, and a roster-mutable status. |

Closeout assignment is independent: it grants no access to the parent Agreement, another Closeout, or sibling records. Approval assignment grants approval authority only. The roster retains at least one active user and exactly one primary; primary is informational, and all active assignees have equal working rights.

## Create and prepare

The list retains numbered completed and cancelled history and permits only one open, non-deleted Closeout per Agreement. Creation chooses the next positive number. A new Closeout starts as `draft`, even when readiness has blockers.

Use the pre-action report to inspect the financial rows, outstanding Monitor follow-ups, and exact blocking records. Each blocker supplies a route where the source work can be corrected. Generate or preview Closeout-specific documents as needed, and configure or complete program-specific checklist, assessment, recommendation, and approval evidence through the workflow rather than treating it as a universal readiness rule.

## Readiness rules

The server recomputes readiness inside the protected start transaction; the displayed report is not trusted as authorization or proof. Start returns `AGREEMENT_CLOSEOUT_NOT_READY` when any condition fails.

Readiness requires all of the following:

1. Agreement status is `active` or `expired`.
2. Paid Payments and approved final Claim Reconciliations balance to zero for every currency at the Agreement-total level.
3. No Monitor follow-up is `open` or `onhold`, regardless of responsible party.
4. Every direct child is operationally terminal.
5. Neither the Agreement nor its children has an active workflow, review set, recommendation set, or routing slip.

Only `paid` Payments count. Only reconciled lines from a final, `approved` Claim Reconciliation count. Values are rounded to two decimal places, grouped by fiscal year and currency, then totalled separately by currency. A negative variance (`paid - approved claims`) means an outstanding payment; a positive variance means an outstanding advance. Fiscal-year differences may offset within the same currency, but currencies never offset one another. An Agreement with no counted rows is financially ready.

For child records, terminal means the exact operational contract, not a label that sounds final. For example, a Claim normally needs `reviewed` plus an approved final reconciliation; Amendments must be closed as well as approved, denied, or cancelled; and any active runtime work still blocks. Follow the blocker link, finish or cancel the owning work through its supported page, refresh, and run the report again.

## Lifecycle and aggregate lock

| Status | Meaning and supported action |
| --- | --- |
| `draft` | Prepare evidence, manage the roster, generate documents, delete, cancel, or start when ready. |
| `inreview` | The workflow is active and locks the Agreement aggregate; only Closeout workflow work and allowed document operations remain writable. |
| `denied` | Open and retryable. Resolve blockers, prepare documents, retry when allowed, or cancel. |
| `complete` | Workflow success closed the Agreement. History, snapshots, previews, and downloads remain readable; persisted mutations do not. |
| `cancelled` | Terminal without closing the Agreement. A new numbered Closeout can be created if the Agreement remains eligible. |

Delete is a soft delete available only in `draft`. Cancel is available only in `draft` or `denied` and never during an active run. Starting captures an immutable readiness snapshot and changes the Closeout to `inreview`. During the run, ordinary Agreement and child mutations are blocked. Final success locks the Agreement, recomputes readiness, and requires the current canonical packet hash to match the start snapshot. It then atomically marks the Closeout `complete` and Agreement `closed`. A mismatch or newly introduced blocker prevents closure.

::: warning Expiry and complete terminal enforcement
Closeout does not schedule the `expired` transition. Also, complete cross-aggregate prevention of every child retry/execute path remains tracked in application issue #77. Treat a `closed` Agreement as read-only and do not attempt child runtime actions through direct API paths.
:::

## Documents and recovery

The Documents section lists active Closeout templates for the Agreement stream, previews without persistence, saves generated output against both the Agreement and typed Closeout, lists generated history, and authorizes downloads as Agreement reads. DOCX/PDF generation has the same converter, private-storage, cleanup, and backup boundaries described in [Documents](./documents.md) and [Document generation](../developer/document-generation.md).

If start fails, use its structured blockers rather than recreating the Closeout. If a run pauses because a configured nested owner is no longer eligible, the initiator or permitted assignment manager can select an eligible replacement and resume; see [Workflows](../concepts/workflows.md). A denied run can be retried only when its pinned setup permits it and remains valid. Historical snapshots and completed/cancelled records are immutable; there is no user restore operation for deleted Closeouts.
