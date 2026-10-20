# Proponent credit memos

Open a proponent's **Credit memos** tab to record received cash against posted [Agreement receivables](../agreements/receivables.md). The **Accounts receivable** tab provides the related debt and balance view. A cash receipt records money received. An offset credit memo records a recovery through a payment instead. Each keeps its own origin and history, so do not record an offset reference as new cash received.

## Create a received credit memo

The Proponent must be active. To create the memo:

1. Select an active Agency and this Proponent.
2. Choose the currency and one or more posted original receivables.
3. Enter the received date and a positive total amount.
4. Add a reason if needed, up to 10,000 characters.

You can select, or tag, up to 100 distinct receivables. A tag identifies a debt to which this receipt may be applied. All must belong to the same Agency, proponent and currency; select the original debt records, not their linked adjustments. The server checks ownership independently of the selected agreement pages. Agency-wide credit-memo numbers remain stable.

Creation requires `account_receivable` create permission at the selected Agency scope. The creator becomes primary on the memo. Permissions and assignments for the memo itself control editing, coding, Completion and assignment management. An Agency-scoped memo can collect debts from several Agreements without giving you access to their source payments. Links to agreements or payments are available only with the corresponding read permission; retained references can remain text when a source cannot be opened.

Create and delete actions can appear when your role permits them. Before opening the creation form or confirming deletion, the application checks the current requirements again. If an action is unavailable, check the proponent's active status and the memo's permissions, assignment, and lifecycle before retrying.

## Review coding and balances

Coding lines show how the receipt is assigned to debts and accounting entries. Automatic allocation uses the application or extension's configured policy and the eligible credit-memo accounts for the selected debts. The memo keeps that policy and its account lists when you later change an editable amount. When no automatic allocation applies, add manual lines. Each line needs a tagged receivable, a line number from 1 through 32,767, an eligible credit-memo chart entry and a positive exact amount. The full coded total must equal the received total before Completion. Automatic retained allocations are protected against manual changes.

Review the receipt total and the coding lines, then check the balances. Recovered amounts have already been applied; reserved amounts are held for pending applications; available amounts are what remains for another recovery. Amounts cannot consume more available recovery than the selected debt and Agency/proponent/currency pool allow. For example, a 500 receipt tagged to debts with 300 and 400 available can allocate 300 to the first and 200 to the second. A 750 receipt cannot be fully applied to that 700 capacity. Check the generated lines and their Agreement and financial-system references. Selecting a debt does not by itself allocate money to it.

For example, when a recipient repays CAD 500 by bank transfer, record the received date and CAD 500 total against the eligible posted debts. Check that the coding lines also total CAD 500. After Completion, follow the approval status and confirm posting before treating the debt as reduced.

## Complete and recover

Save the memo, then complete it. You need the permissions and assignment for this memo, separately from its Proponent or Agreements. A published `fundingcaseaccountreceivablecreditmemo` approval-submission workflow is required; it validates the full coding and recovery basis again. Posting applies the credit to the accounting pool. Completing a memo with approval still pending does not post the receipt. Pending applications reserve recovery capacity. A final unsuccessful outcome releases that reservation without applying a receipt.

Editable memos and manual lines can be changed or logically deleted only when their lifecycle and retained-allocation controls allow it. Posted or other terminal evidence is immutable. Use authorized accounting recovery instead of duplicating a receipt to fix a posted mistake. For an amount or coding failure, inspect tagged debts, all lines, reservations, account availability and the saved total. For a missing approval route, ask an administrator to publish the correct workflow. Reload after an uncertain save before creating another memo.

Payment-generated memos show the originating payment and reference when your permissions allow, their effective date, coding and application history. Follow the payment's workflow for an offset that has not posted; do not recreate it here. See [Payments](../agreements/payments.md) and [Receivables](../agreements/receivables.md).
