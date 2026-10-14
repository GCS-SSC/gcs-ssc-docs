# Proponent credit memos

Open a proponent’s **Credit memos** tab to record received cash against posted [Agreement receivables](../agreements/receivables.md). The **Accounts receivable** tab provides the related debt and balance view. A cash receipt records money received. An offset credit memo records a recovery through a payment instead. Each keeps its own origin and history, so do not record an offset reference as new cash received.

## Create a received credit memo

Select an active Agency, this active proponent, currency, one or more posted original receivables, received date, positive total amount and optional reason (maximum 10,000 characters). You can select, or tag, up to 100 distinct receivables. A tag identifies a debt to which this receipt may be applied. All must belong to the same Agency, proponent and currency; select the original debt records, not their linked adjustments. The server checks ownership independently of the selected agreement pages. Agency-wide credit-memo numbers remain stable.

Creation requires `account_receivable` create permission at the selected Agency scope. The creator becomes primary on the memo. Editing, coding, Completion and assignment management use the memo’s own authority and exact assignment. Its Agency scope permits multi-agreement collection without granting access to those agreements’ source payments. Links to agreements or payments are available only with the corresponding read permission; retained references can remain text when a source cannot be opened.

## Review coding and balances

Coding lines show how the receipt is assigned to debts and accounting entries. Automatic allocation uses the application or extension’s configured policy and the eligible credit-memo accounts for the selected debts. The memo keeps that policy and its account lists when you later change an editable amount. When no automatic allocation applies, add manual lines: tagged receivable, line number from 1 through 32,767, eligible credit-memo chart entry and positive exact amount. The full coded total must equal the received total before Completion. Automatic retained allocations are protected against manual changes.

Review the receipt total and the coding lines, then check the balances. Recovered amounts have already been applied; reserved amounts are held for pending applications; available amounts are what remains for another recovery. Amounts cannot consume more available recovery than the selected debt and Agency/proponent/currency pool allow. For example, a 500 receipt tagged to debts with 300 and 400 available can allocate 300 to the first and 200 to the second. A 750 receipt cannot be fully applied to that 700 capacity. Check the generated lines and their agreement/financial-system references rather than assuming the tag list is the allocation.

For example, when a recipient repays CAD 500 by bank transfer, record the received date and CAD 500 total against the eligible posted debts. Check that the coding lines also total CAD 500. After Completion, follow the approval status and confirm posting before treating the debt as reduced.

## Complete and recover

Save and complete the independently assigned memo. A published `fundingcaseaccountreceivablecreditmemo` approval-submission workflow is required; it validates the full coding and recovery basis again. Posting applies the credit to the accounting pool; Completion alone while approval is pending is not a posted receipt. Pending applications reserve capacity, and negative terminal outcomes release their reservations without applying a receipt.

Editable memos and manual lines can be changed or logically deleted only when their lifecycle and retained-allocation controls allow it. Posted or other terminal evidence is immutable. Use authorized accounting recovery instead of duplicating a receipt to fix a posted mistake. For an amount/coding failure, inspect tagged debts, all lines, reservations, account availability and the saved total. For a missing approval route, ask an administrator to publish the correct workflow. Reload after an uncertain save before creating another memo.

Payment-generated memos show the originating payment/reference when authority allows, their effective date, coding and application history. Follow the payment’s workflow for an offset that has not posted; do not recreate it here. See [Payments](../agreements/payments.md) and [Receivables](../agreements/receivables.md).
