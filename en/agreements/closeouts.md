# Agreement Closeout

Use **Closeouts** to check that an Agreement’s financial work, monitoring follow-ups and approvals are finished, then submit the closure for approval. Successful Closeout makes the Agreement read-only and keeps the supporting history. You can prepare a draft while work remains, but you must clear the readiness report’s blockers before completing it.

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

Use the pre-action report to inspect the financial amounts, outstanding Monitor follow-ups and each blocking record. Follow the supplied links to correct those records. Generate or preview Closeout documents as needed. Your program may also require a checklist, assessment, recommendation or approval through its configured workflow; these requirements are additional to the readiness checks below.

For example, the report identifies an open recipient follow-up about a final report. Open the linked follow-up, verify the report was received and record the appropriate update. Refresh readiness to see whether any other work remains.

## Readiness rules

Read the readiness report, follow each blocker’s link and finish the outstanding work. The system checks readiness again when you start, so a previously clear report may no longer be current. If any condition fails, `AGREEMENT_CLOSEOUT_NOT_READY` prevents the start.

Readiness requires all of the following:

1. The Agreement’s Agency business status is not terminal.
2. Payments with terminal business statuses and approved final Claim Reconciliations balance to zero for every currency at the Agreement-total level.
3. No Monitor follow-up is `open` or `onhold`, regardless of responsible party.
4. Every directly related Agreement record has finished its required work and is in a configured terminal status.
5. Neither the Agreement nor its related records has an active workflow, review set, recommendation set or routing slip.

The report counts finalized Payments only when their current Agency status is configured as **terminal** and their payment evidence is resolved and successful. It counts final Claim Reconciliation lines only when the reconciliation has the required approval evidence. Completing a reconciliation without an approval workflow can finish that work, but does **not** provide the approval evidence needed for Closeout.

Amounts use exact decimal arithmetic, grouped by fiscal year and currency and then totalled separately for each currency. A negative variance (`payments − approved claims`) means an outstanding payment; a positive variance means an outstanding advance. Fiscal-year differences can offset within one currency; different currencies never offset each other. An Agreement with no counted rows is financially ready, but still has to pass all nonfinancial checks.

For example, CAD 12,000.00 of counted Payments against CAD 11,500.00 of approved final reconciliations produces a CAD 500.00 outstanding advance. A USD 500.00 shortfall does not cancel that advance. Follow the report’s source links to resolve the underlying records and refresh the report.

Claims, reconciliations, Payments, Forecasts, Monitors, and Commitments must each have a terminal Agency status. Amendments must also be closed (`isopen = false`). Every final reconciliation must have approved evidence. These are configuration flags and evidence checks, not comparisons with labels such as “Reviewed” or “Paid.” Active workflow, review, recommendation or routing work and open/on-hold Monitor follow-ups remain blockers even if a record’s label appears final.

## Completion, cancellation, and aggregate lock

| Situation | Supported behavior |
| --- | --- |
| Draft Closeout | Prepare evidence, manage the roster, generate documents, or delete while Draft protection permits it. Readiness may still contain blockers. |
| Ready to complete | Complete once. The system checks readiness, saves completion, starts the required approval workflow and keeps a fixed copy of the readiness evidence together. Missing configuration or blockers prevent completion. |
| Active approval workflow | Ordinary edits to the Agreement and its related records are blocked. Perform the assigned Closeout workflow work and permitted document operations. |
| Unsuccessful run | Inspect the outcome and configured status. Retry only if the saved workflow setup and your current access permit it; do not complete a second time. |
| Successful terminal outcome | The system rechecks readiness and the integrity of the saved evidence, closes the Closeout and gives the Agreement the same configured terminal status. History remains readable. |
| Cancel an active run | Cancellation requires an active Closeout workflow. It cancels that run and closes the Closeout without applying the successful Agreement-closing transition. |

Delete is a soft delete limited to the Agency’s Draft status. Cancellation is a workflow action; there is no generic “cancel draft” operation when no active run exists. After cancellation, another numbered Closeout can be created only if the Agreement remains writable and no open Closeout remains.

Before final closure, the system checks that the saved readiness evidence has not changed and that no new blocker exists. Otherwise closure fails with `closeout_packet_changed`. Refresh the report and investigate the changed source records before recovery. Once the Agreement has a terminal status, its related records and workflow actions are protected from changes; renaming that status does not reopen it.

## Documents and recovery

Use the Documents section to preview a Closeout document before saving it. It shows active Closeout templates for the Agreement’s stream, saves generated files to this Closeout and Agreement, and keeps generated history available for download with Agreement read access. A preview does not save a file. DOCX/PDF conversion and storage requirements are described in [Documents](./documents.md) and [Document generation](../developer/document-generation.md).

If start fails, use the listed blockers to finish the missing work. If a workflow pauses because an assigned owner is no longer eligible, the initiator or authorized assignment manager can select an eligible replacement and resume; see [Workflows](../concepts/workflows.md). A denied workflow can be retried only if its saved setup allows it and remains valid. Historical snapshots and completed/cancelled records are immutable; there is no user restore operation for deleted Closeouts.

## Accounting effects and unresolved recovery

When corrections or receivable recoveries exist, review the report’s original approved claims, adjusted approved claims, cash paid, posted corrections and effective recovery separately. Posted corrections and recoveries adjust the paid balance in the **source Agency fiscal year**. Applied claim reductions adjust the approved-claim balance. The original payment and claim evidence stay unchanged, so you can trace each adjustment.

For example, cash paid of 12,000 and an approved claim of 11,500 leave a 500 advance. A posted 500 cash recovery produces an effective paid balance of 11,500 and zero variance. If that debt also carries a 500 applied claim reduction, effective approved claims become 11,000 and the variance must be resolved again. Review each effect instead of assuming that every posted receipt makes an agreement ready.

Journal vouchers must have terminal Agency statuses. Corrections must have terminal statuses and a resolved outcome. Original receivables, linked adjustments and included credit memos cannot have an open outcome; pending recovery allocations also block readiness. Their active workflow, review, recommendation or routing work remains a blocker. Use the report’s linked record to resolve the issue and refresh. An open correction also prevents starting ordinary closeout work. See [Corrections](./corrections.md), [Journal vouchers](./journal-vouchers.md) and [Receivables](./receivables.md).
