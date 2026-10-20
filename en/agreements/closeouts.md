# Agreement closeout

Use **Closeouts** to check that an Agreement's financial work, monitoring follow-ups and approvals are finished, then submit the closure for approval. Successful Closeout makes the Agreement read-only and keeps the supporting history. You can prepare a draft while work remains, but you must clear the readiness report's blockers before completing it.

## Access and prerequisites

The agreement must allow changes and must not have a terminal business status. A terminal status marks the agreement as finished. Its end date alone does not change its business status. The stream must provide an active, published `approval_submission` workflow for `fundingcaseagreementcloseout`. Completing the Closeout starts that workflow; a standard workflow cannot substitute for it. The configured successful outcome must use a terminal Agency status.

| Operation | Effective access |
| --- | --- |
| Read Closeouts, readiness, snapshots, templates, previews, and downloads | Viewer access for the agency or program that owns the agreement. You do not need assignment to the closeout. |
| Create | Contributor access for that agency or program, plus assignment to the agreement. The creator becomes the primary assigned user when the Closeout is saved. |
| Start, retry, cancel, perform Closeout work, or save a generated document | Contributor access and assignment to the closeout, except for separately assigned review, recommendation, or approval work. |
| Delete a draft | Manager access and assignment to the closeout. |
| Manage the Closeout roster | `agreement:manage_assignments`, active Closeout assignment, Contributor access, and a status that allows assignment changes. |

Assignment to a Closeout does not grant access to its Agreement, another Closeout, or other related records. Approval assignment grants approval authority only. Keep at least one active assigned user and exactly one primary. All active assigned users have equal working rights. Being primary does not grant extra rights.

## Create and prepare

Open an Agreement and select **Closeouts**. The list keeps numbered completed and cancelled Closeouts. You can have only one open Closeout at a time. Each new Closeout receives the next number. A new Closeout starts in the Agency's Draft status, even when readiness has blockers.

Use the readiness report to check financial amounts, outstanding monitoring follow-ups, and each blocking record. Follow the supplied links to correct those records. Generate or preview Closeout documents as needed. Your program may also require a checklist, assessment, recommendation or approval through its configured workflow; these requirements are additional to the readiness checks below.

For example, the report identifies an open recipient follow-up about a final report. Open the linked follow-up, verify the report was received and record the appropriate update. Refresh readiness to see whether any other work remains.

## Readiness rules

Read the readiness report, follow each blocker's link and finish the outstanding work. The system checks readiness again when you start, so a previously clear report may no longer be current. If any condition fails, `AGREEMENT_CLOSEOUT_NOT_READY` prevents the start.

Readiness requires all of the following:

1. The Agreement's Agency business status is not terminal.
2. Payments with terminal business statuses and approved final Claim Reconciliations balance to zero for every currency at the Agreement-total level.
3. No Monitor follow-up is `open` or `onhold`, regardless of responsible party.
4. Every directly related Agreement record has finished its required work and is in a configured terminal status.
5. Neither the Agreement nor its related records has an active workflow, review set, recommendation set or routing slip.

The report counts finalized Payments only when their current Agency status is configured as **terminal** and their payment evidence is resolved and successful. It counts final Claim Reconciliation lines only when the reconciliation has the required approval evidence. Completing a reconciliation without an approval workflow can finish that work, but does **not** provide the approval evidence needed for Closeout.

The system uses exact decimal amounts for the calculation. It groups them by fiscal year and currency, then totals each currency separately. A negative variance (`payments − approved claims`) means an outstanding payment; a positive variance means an outstanding advance. Fiscal-year differences can offset within one currency; different currencies never offset each other. An Agreement with no counted rows is financially ready, but still has to pass all nonfinancial checks.

For example, CAD 12,000.00 of counted Payments against CAD 11,500.00 of approved final reconciliations produces a CAD 500.00 outstanding advance. A USD 500.00 shortfall does not cancel that advance. Follow the report's source links to resolve the underlying records and refresh the report.

Claims, reconciliations, Payments, Forecasts, Monitors, and Commitments must each have a terminal Agency status. Amendments must also be closed. Every final reconciliation must have approved evidence. These are configuration flags and evidence checks, not comparisons with labels such as "Reviewed" or "Paid." Active workflow, review, recommendation or routing work and open/on-hold Monitor follow-ups remain blockers even if a record's label appears final.

## Completion, cancellation, and agreement lock

| Situation | Supported behavior |
| --- | --- |
| Draft Closeout | Prepare evidence, manage the roster, generate documents, or delete while Draft protection permits it. Readiness may still contain blockers. |
| Ready to complete | Complete once. The system checks readiness, records completion, starts the required approval workflow, and saves a fixed copy of the readiness evidence. These actions succeed or fail together. Missing configuration or blockers prevent completion. |
| Active approval workflow | Ordinary edits to the Agreement and its related records are blocked. Perform the assigned Closeout workflow work and permitted document operations. |
| Unsuccessful run | Inspect the outcome and configured status. Retry only if the saved workflow setup and your current access permit it; do not complete a second time. |
| Successful terminal outcome | The system rechecks readiness and the integrity of the saved evidence, closes the Closeout and gives the Agreement the same configured terminal status. History remains readable. |
| Cancel an active run | Cancellation requires an active Closeout workflow. It cancels that run and closes the Closeout without applying the successful Agreement-closing transition. |

Deletion hides the Closeout and is limited to the Agency's Draft status. Cancellation is a workflow action; you cannot cancel a draft without an active run. After cancellation, another numbered Closeout can be created only if the Agreement remains writable and no open Closeout remains.

Before final closure, the system checks that the saved readiness evidence has not changed and that no new blocker exists. Otherwise closure fails with `closeout_packet_changed`. Refresh the report and check the changed source records before using the permitted retry action. Once the Agreement has a terminal status, its related records and workflow actions are protected from changes; renaming that status does not reopen it.

## Documents and recovery

Open **Documents**, choose an active Closeout template for the Agreement's stream, then select the language and an available output format. Preview the document to download a copy without saving it in the system. Generate and save it to keep the file in the Closeout and Agreement document history. Anyone with Agreement read access can preview documents and download saved files.

Saving requires Contributor access and assignment to this exact Closeout. The system checks these requirements again when you select the action. The Closeout must be open, and neither it nor the Agreement can have a terminal status. You can save documents during this Closeout's active approval workflow. Outside that workflow, completed or read-only statuses prevent saving. Another active Closeout workflow also prevents saving.

If the system reports `DOCUMENT_RENDER_BUSY`, wait for the current document request to finish and retry. If it reports `DOCUMENT_RENDER_INPUT_CHANGED`, refresh the Closeout, check the source records and selected template, then generate again. This error means the source content or template changed before the file could be saved. See [Documents](./documents.md) for formats and downloads, and [Document generation](../developer/document-generation.md) for conversion and storage requirements.

If start fails, use the listed blockers to finish the missing work. If a workflow pauses because an assigned owner is no longer eligible, the initiator or authorized assignment manager can select an eligible replacement and resume; see [Workflows](../concepts/workflows.md). A denied workflow can be retried only if its saved setup allows it and remains valid. You cannot change historical snapshots or completed or cancelled records; there is no user restore operation for deleted Closeouts.

## Accounting effects and unresolved recovery

When corrections or receivable recoveries exist, review the report's original approved claims, adjusted approved claims, cash paid, posted corrections and effective recovery separately. Posted corrections and recoveries adjust the paid balance in the **source Agency fiscal year**. Applied claim reductions adjust the approved-claim balance. The original payment and claim evidence stay unchanged, so you can trace each adjustment.

For example, cash paid of 12,000 and an approved claim of 11,500 leave a 500 advance. A posted 500 cash recovery produces an effective paid balance of 11,500 and zero variance. If that debt also carries a 500 applied claim reduction, effective approved claims become 11,000 and the variance must be resolved again. Review each effect instead of assuming that every posted receipt makes an agreement ready.

Journal vouchers must have terminal Agency statuses. Corrections must have terminal statuses and a resolved outcome. Original receivables, linked adjustments and included credit memos cannot have an open outcome; a pending recovery applied through an offset memo also blocks readiness. Their active workflow, review, recommendation or routing work remains a blocker. Use the report's linked record to resolve the issue and refresh. An open correction also prevents starting a closeout. See [Corrections](./corrections.md), [Journal vouchers](./journal-vouchers.md) and [Receivables](./receivables.md).
