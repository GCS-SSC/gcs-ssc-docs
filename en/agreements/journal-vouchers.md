# Journal vouchers

Open **Journal vouchers** from the main navigation to correct a finalized payment's accounting allocation. A voucher changes the accounts or other accounting codes used to classify the payment, while retaining the payment and its cash amount. Use an [Agreement correction](./corrections.md) when the recorded paid amount itself must change.

## Source and access

To create a voucher, you need permission to create journal vouchers for the owning agreement, the required assignment to that Agreement and permission to read the selected payment. The creator becomes the voucher's primary assignee. Editing, Completion and team work require the voucher's own assignment and permission. These do not give you permission to read the source payment. The source picker lists finalized eligible payments and enforces the agreement currency.

Choose a payment, requested date and optional English and French explanations, up to 10,000 characters each. Creation keeps a copy of the payment's original allocation amounts and accounting codes. The source payment cannot be changed later. The Agency fiscal year has a **JV open** setting that the approval workflow can check. Configured workflows can also check that the source is finalized and that a rationale is present. Seeing a payment in the picker does not guarantee that the approval workflow will accept it.

## Correct coding

Review the original allocations, then enter corrected allocations with a commitment line, eligible accounting code from the chart of accounts and an amount of zero or more, entered to two decimal places. Up to 500 corrected allocations can be submitted. The sum must match the original amount **for each commitment line**, not just for the whole voucher. You cannot introduce a commitment line absent from the original set. The application calculates the positive and negative adjustment lines from your allocations. You do not enter those adjustments manually.

For example, 1,000 on commitment line 1 originally coded entirely to account A can be corrected to 600 on A and 400 on B. Its derived adjustment is −400 on A and +400 on B, with no change to cash paid. Moving that 400 to commitment line 2 fails even if the voucher's overall total is unchanged.

Save the requested date, explanations and corrected allocations before Completion. Saving replaces all corrected allocations together while keeping the original payment details. Drafts may be unchanged, but Completion requires a real nonzero coding change and generated adjustments whose increases and decreases balance. Invalid totals, missing coding or out-of-range amounts leave the save unchanged.

## Complete, reverse and replace

Completion is unavailable while changes remain unsaved, a save is pending, or the detail page has not loaded successfully. If the page asks you to save first, return to the accounting entry and save it. Then use Completion in the voucher workspace to which you are assigned and follow its configured approval workflow. Ordinary editing is locked after Completion. The adjustments affect the application's accounting totals only when successful completion is recorded. A displayed status alone does not establish that the adjustments took effect.

A reversal is allowed only for the latest successfully completed ordinary voucher for that payment. It swaps the retained original and corrected allocations to undo the earlier coding changes exactly. The reversal is a new record with its own assignment and must itself complete successfully. A reversal uses the details saved with the voucher; it does not give wider access to the source payment. For the 400 transfer above, a successful reversal adds 400 back to account A and subtracts 400 from account B.

A replacement follows the latest successfully completed reversal, or the latest ordinary voucher with an unsuccessful completion outcome. Select the supported action on that latest record. Do not create overlapping ordinary vouchers to bypass sequence rules. Completed history cannot be changed. Deleting an editable draft removes it from active work while retaining its stored record; it does not reverse a successful voucher.

If completion fails, compare each commitment line's original and corrected totals. Check that at least one corrected allocation differs from the original. If a sequence action is unavailable, inspect the latest voucher and its current outcome.

If a save fails, the form keeps your changes so you can correct them and retry. A background refresh also keeps unsaved changes while the voucher remains editable. If access or status changes make it read-only, it shows the saved entry. After an uncertain save, reload the voucher and compare the saved amounts before trying again. See [Payments](./payments.md) and [Closeouts](./closeouts.md).
