# Agreement Closeout

Closeout records the evidence that an Agreement is administratively and financially complete before the Agreement becomes read-only. Open an Agreement and select **Closeouts**. A Closeout can be prepared while blockers remain; readiness becomes an enforced gate when completion starts its required `approval_submission` workflow.

## Access and prerequisites

The Agreement must remain writable and nonterminal. Its end date alone does not change its business status. The stream must provide an active, published `approval_submission` workflow for `fundingcaseagreementcloseout`. Completing the Closeout starts that workflow; a standard workflow cannot substitute for it. The configured successful outcome must use a terminal Agency status.

| Operation | Effective access |
| --- | --- |
| Read Closeouts, readiness, snapshots, templates, previews, and downloads | Viewer at the Agreement owner scope; no Closeout assignment is required. |
| Create | Contributor at that scope plus exact Agreement assignment. Creation atomically assigns the creator as the Closeout primary. |
| Start, retry, cancel, perform Closeout work, or save a generated document | Contributor plus exact Closeout assignment, except for separately assigned review, recommendation, or approval work. |
| Delete a draft | Manager plus exact Closeout assignment. |
| Manage the Closeout roster | `agreement:manage_assignments`, active Closeout assignment, effective Contributor access, and a roster-mutable status. |

Closeout assignment is independent: it grants no access to the parent Agreement, another Closeout, or sibling records. Approval assignment grants approval authority only. The roster retains at least one active user and exactly one primary; primary is informational, and all active assignees have equal working rights.

## Create and prepare

The list retains numbered completed and cancelled history and permits only one open, non-deleted Closeout per Agreement. Creation chooses the next positive number. A new Closeout starts in the Agency’s Draft status, even when readiness has blockers.

Use the pre-action report to inspect the financial rows, outstanding Monitor follow-ups, and exact blocking records. Each blocker supplies a route where the source work can be corrected. Generate or preview Closeout-specific documents as needed, and configure or complete program-specific checklist, assessment, recommendation, and approval evidence through the workflow rather than treating it as a universal readiness rule.

## Readiness rules

The server recomputes readiness inside the protected start transaction; the displayed report is not trusted as authorization or proof. Start returns `AGREEMENT_CLOSEOUT_NOT_READY` when any condition fails.

Readiness requires all of the following:

1. The Agreement’s Agency business status is not terminal.
2. Payments with terminal business statuses and approved final Claim Reconciliations balance to zero for every currency at the Agreement-total level.
3. No Monitor follow-up is `open` or `onhold`, regardless of responsible party.
4. Every direct child is operationally terminal.
5. Neither the Agreement nor its children has an active workflow, review set, recommendation set, or routing slip.

The financial report counts Payments whose current Agency status has its **terminal** flag set. It counts final Claim Reconciliation lines only when their reconciliation has approved target evidence. A completion without an approval workflow can successfully finish reconciliation work but does **not**, by itself, provide that approved evidence for Closeout.

Amounts use exact decimal arithmetic, grouped by fiscal year and currency and then totalled separately for each currency. A negative variance (`payments − approved claims`) means an outstanding payment; a positive variance means an outstanding advance. Fiscal-year differences can offset within one currency; different currencies never offset each other. An Agreement with no counted rows is financially ready, but still has to pass all nonfinancial checks.

For example, CAD 12,000.00 of counted Payments against CAD 11,500.00 of approved final reconciliations produces a CAD 500.00 outstanding advance. A USD 500.00 shortfall does not cancel that advance. Follow the report’s source links to resolve the underlying records and refresh the report.

Claims, reconciliations, Payments, Forecasts, Monitors, and Commitments must each have a terminal Agency status. Amendments must also be closed (`isopen = false`). Every final reconciliation must have approved evidence. These are configuration flags and evidence checks, not comparisons with labels such as “Reviewed” or “Paid.” Active runtime work and open/on-hold Monitor follow-ups remain blockers even if a record’s label appears final.

## Completion, cancellation, and aggregate lock

| Situation | Supported behavior |
| --- | --- |
| Draft Closeout | Prepare evidence, manage the roster, generate documents, or delete while Draft protection permits it. Readiness may still contain blockers. |
| Ready to complete | Complete once. The server checks readiness, records completion, starts the required approval workflow, and captures an immutable readiness snapshot in the protected transaction. Missing configuration or blockers reject the operation. |
| Active approval workflow | The Agreement aggregate is locked against ordinary Agreement and child mutations. Perform the assigned Closeout workflow work and permitted document operations. |
| Unsuccessful run | Inspect its outcome and configured status. Retry only when the pinned workflow and current authorization allow it; do not create another completion. |
| Successful terminal outcome | The server rechecks readiness and the canonical snapshot hash, closes the Closeout, and applies the same configured terminal status to the Agreement. History remains readable. |
| Cancel an active run | Cancellation requires an active Closeout workflow. It cancels that run and closes the Closeout without applying the successful Agreement-closing transition. |

Delete is a soft delete limited to the Agency’s Draft status. Cancellation is a workflow action; there is no generic “cancel draft” operation when no active run exists. After cancellation, another numbered Closeout can be created only if the Agreement remains writable and no open Closeout remains.

At successful termination, a changed readiness packet or a new blocker prevents closure and records a failed workflow with reason `closeout_packet_changed`. Refresh the report and investigate the changed source records before recovery. A terminal Agreement protects child writes and runtime actions through the aggregate’s status guards; changing a display label does not unlock it.

## Documents and recovery

The Documents section lists active Closeout templates for the Agreement stream, previews without persistence, saves generated output against both the Agreement and typed Closeout, lists generated history, and authorizes downloads as Agreement reads. DOCX/PDF generation has the same converter, private-storage, cleanup, and backup boundaries described in [Documents](./documents.md) and [Document generation](../developer/document-generation.md).

If start fails, use its structured blockers rather than recreating the Closeout. If a run pauses because a configured nested owner is no longer eligible, the initiator or permitted assignment manager can select an eligible replacement and resume; see [Workflows](../concepts/workflows.md). A denied run can be retried only when its pinned setup permits it and remains valid. Historical snapshots and completed/cancelled records are immutable; there is no user restore operation for deleted Closeouts.
