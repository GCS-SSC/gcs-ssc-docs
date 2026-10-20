# Agreement receivables

Open **Accounts receivable** on an agreement to record money owed by a linked proponent. Use this, for example, when part of an advance must be repaid or a reconciled claim identifies an amount to recover. The receivable keeps the source documents and accounting codes. Posting records the debt in the accounting balance without rewriting the payment or claim. Its numbered history separates the original debt, later linked adjustments, cash repayments recorded through credit memos, and offsets recovered from later payments.

## Before creation

Before officers can use receivables, administrators configure the Agency's receivable types, receivable accounts, credit-memo accounts and published approval workflows. A type is either claim-related or advance-payment-related and may require a monitor follow-up. The selected proponent must be eligible for the agreement; its Agency financial ID and fiscal year must fit the same Agency. Currency follows the agreement.

You need Accounts receivable permission for the agreement to read or create receivables. To create a receivable, you must also be assigned to that agreement. You become the new receivable's primary assignee. Later editing, Completion and team work require an assignment to the receivable itself and the relevant permission. To bring information in from a source, you must also have the usual permission to read that source. An approval assignment does not give you general editing rights or source access.

## Select and retain sources

Create from the agreement's Accounts receivable list, or use the receivable action on an eligible claim or advance payment. Select the proponent, Agency fiscal year, configured type, requested date and positive original amount. Enter optional English and French explanations, up to 10,000 characters each. A claim-related type requires its eligible source claim; advance-related work selects eligible advance sources. The application checks the source, proponent, fiscal year and available amount again when you create the record, even if you could select them in the picker.

When the type requires monitoring, select a follow-up belonging to a monitor type permitted for receivables. Other types do not accept that follow-up. Starting from a claim or advance pre-fills the source information and offers compatible types. The same checks still apply.

On the detail page, review the summary, source and coding lines, claim reductions, activity, Completion and approval workspace. Creation keeps the source period, amounts and accounting details for later review. In an editable draft, add or remove supported source lines and assign receivable coding. Each line with an amount other than zero needs an eligible receivable account. The codes and total amount must fit both the amount available from the sources and the paid balance shared with other records. Changing or removing coding keeps the original source details.

## Recovery method and claim reductions

Select **Direct repayment** when the recipient will return money, or **Offset** when the debt will be recovered from a later payment. You can leave the method unset while preparing the draft. Submission requires a valid recovery decision. Record the recipient's preference. If you choose a different recovery method, explain the reason in English or French. An unresolved method, pending recovery or pending adjustment can block later payments. An outstanding direct-repayment balance puts payments to that recipient on hold across agreements and currencies within the same Agency.

For an original receivable linked to a claim, use **Claim reductions** to record how much to deduct from each retained claim line. Before completion, save at least one positive reduction. The total must equal the full original debt amount. A draft can be incomplete, but an empty or partial plan blocks submission. Each reduction must also fit the reconciled claim amount retained as its source. Other open or posted plans may already use part of that amount.

When the final recovery posts and fully clears the debt, the application applies these planned reductions to the claim's accounting totals. Partial repayments do not reduce the claim totals. The submitted claim itself remains unchanged. A repayment of a debt and a reduction of eligible claim cost have different accounting effects. Review both before closeout.

For example, a 1,000 claim-related debt against a 10,000 claim whose final reconciliation is complete may carry a 1,000 claim-reduction plan. Posting the receivable alone leaves the eligible claim amount used in accounting unchanged. A 400 posted cash recovery leaves 600 outstanding and still does not apply the reduction. After the remaining 600 posts and fully clears the debt, the eligible claim amount used in accounting becomes 9,000. Do not enter the same reduction on another receivable or assume a cash receipt alone reduces the claim. The applied reduction also frees annual claim and reconciliation capacity. Posted collections have a separate effect on permitted budget reductions; see [Amendments](./amendments.md).

## Complete and adjust

Save all required source coding, recovery information and claim reductions before Completion. If the plan is missing or does not total the original claim-related debt, return to **Claim reductions**, add the missing amounts and save before trying again. Linked adjustments and advance-related receivables do not require this original-claim reduction plan. At least one English or French narrative must explain the debt; overriding a recorded recipient preference requires an explanation in at least one language. The application checks all source amounts and starts the published approval workflow for the original receivable or linked adjustment. The application can reject completion if a financial check fails, even when the Complete action is available.

Only successful posting changes the recoverable balance. Denied, failed and cancelled records keep their final history without posting. You cannot edit a receivable whose workflow has ended. Use the supported adjustment action to create a linked case against a posted original: its positive or negative changes stay linked to the original lines. The original debt amount, recovered amounts and amounts set aside for pending recoveries must remain within the permitted limits. Adjustments have their own assignments and approval route; they do not reopen the original.

Deleting an editable draft removes it from active work while retaining its stored record. Use the supported workflow controls to cancel unfinished work. To correct a posted debt, use an authorized linked adjustment rather than deleting the original.

## Collect and recover from errors

Record received money through [Proponent credit memos](../proponents/credit-memos.md). Offset recovery is prepared through the [Payment](./payments.md) preview and coding wizard. The detail shows the outstanding debt, amounts reserved for pending recoveries and the amount still available for another recovery. For example, if 600 remains outstanding and a pending credit memo reserves 200, only 400 is available for another recovery. The reserved 200 has not yet reduced the debt; that happens when it posts. Review the activity and original references before recording another receipt.

If a source or account is unavailable, check its current eligibility, retained source and Agency configuration. For a capacity failure, examine outstanding debt and reserved recovery amounts, other receivables and linked adjustments that draw on the same source amounts or accounting balances. Finish or cancel pending work before retrying a held payment. After an uncertain response, reload the existing case before retrying to avoid a duplicate debt or cash receipt. [Closeout](./closeouts.md) also checks accounting history and unresolved work.
