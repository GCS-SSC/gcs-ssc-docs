# Agreement corrections

Use **Corrections** on an agreement to change recorded paid amounts while retaining the original payments. A correction does not send money to the recipient or record a repayment; those tasks use payments and receivables.

A correction has a permanent reference such as `AGR-2026-001-COR-1`, a requested date, English and French explanations, selected finalized payments and adjustments against the selected active commitment's lines. A positive adjustment increases the recorded paid amount; a negative adjustment decreases it.

## Prepare a correction

To create a correction, you need permission to create corrections and an assignment to that agreement. The creator becomes the correction's primary assignee. To continue work, you need permission for the correction and an assignment to that specific correction. Approvers need their separate approval assignment. Being assigned to a correction does not give you permission to open the payments it uses.

Before creation, resolve unfinished payments, commitment work, journal vouchers and active financial workflows. Only one open correction is allowed per agreement.

1. Choose an active commitment.
2. Select one or more eligible finalized payments, up to 500 distinct payments.
3. Enter the requested date and explanations, each limited to 10,000 characters.

You cannot change the selected sources after creation. For a later correction, link it to a correction on the same agreement whose workflow has ended. This creates a new record and keeps the earlier one closed.

## Review and save adjustments

Review the original payments in the workspace and the effects of successful journal vouchers, earlier posted corrections and receivable recoveries. It also retains the fiscal year and accounting codes used to calculate those amounts. Enter a positive or negative adjustment for each commitment line. The corrected paid amount is the existing total of these components plus your proposed adjustment. It must stay between zero and that line's commitment amount. The complete set must also fit the amount available under the Agency's shared accounting codes. Other records can use that same balance, so a line can pass its own limit and still fail this shared check.

For example, a line committed at 10,000 has 7,000 original paid and a prior posted correction of −500. An adjustment of −1,000 gives corrected paid of 5,500 and remaining capacity of 4,500. The original payment stays 7,000. An adjustment of −7,000 would make corrected paid negative and is refused. Include any displayed journal-voucher and recovery effects when checking your real record.

Save all the lines together and review the refreshed correction details. Drafts may contain zero adjustments; Completion requires at least one nonzero adjustment and an explanation in English or French. Enter money to two decimal places. When you submit and when the correction posts, the application recalculates the totals from the retained sources and checks both the line limits and the shared balances again.

## Submit, cancel and recover

Completion sends the correction through the required published approval workflow for corrections. An administrator must configure its review and approval steps and final outcomes before you submit. While a correction is open, the application blocks ordinary changes to the agreement's budget, payments, commitments, journal vouchers and closeout. This keeps the amounts being reviewed stable. Continue in the correction workspace and the approval steps assigned to you.

Successful posting records separate adjustments that cannot be changed afterward. Denied, failed and cancelled corrections keep their history but do not post adjustments. Completion cannot be repeated on the same correction. To cancel an open correction, enter a reason of up to 10,000 characters. The application cancels the active approval workflow, or gives an unsubmitted draft the configured final cancellation status. Cancellation without the required configuration is refused.

You can delete only an open Agency Draft that has no recorded Completion or decision. Once the workflow has ended, its history remains available to read; you cannot restore or edit the correction. Use a new linked correction for subsequent work.

If creation is blocked, finish the unresolved record shown by the server instead of opening another correction. If a balance or source check fails, refresh and compare the original payments, earlier adjustments, recoveries and available balances for the shared accounting codes. If a write has an uncertain network outcome, reload before resubmitting. Exports preserve the correction's reference, sources and positive or negative accounting adjustments; exporting does not post it.

See [Payments](./payments.md), [Journal vouchers](./journal-vouchers.md), [Receivables](./receivables.md) and [Closeouts](./closeouts.md).
