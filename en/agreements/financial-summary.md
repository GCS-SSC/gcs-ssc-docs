# Agreement financial summary

Open an agreement's **Financial summary** tab to compare its annual budget, active forecast, claimed and successfully reconciled amounts, and recorded payments across April through March. You need permission to read the agreement. You do not need a separate financial-record assignment. This tab is read-only.

## Choose the view

Use this tab when you need to answer questions such as "How much was claimed this year?", "How much has been successfully reconciled?" or "Are costs following the forecast?" Choose the fiscal year, then compare the relevant measures in the currency grid. Open the source record when you need to explain an amount or take action.

Select a fiscal year from the current agreement budget; the first available year is selected initially. Effective accounting entries can also retain a historical year no longer in the current budget. Each currency has its own grid and progress panel. An empty year uses the agreement's currency. The summary does not convert currencies or combine their totals.

**All** is selected initially and shows Budget, Forecast, Claimed, Reconciled and Payments. Selecting one measure isolates it; further choices add or remove measures while keeping at least one selected. Filters change only the grid, not the underlying amounts or pacing panel.

The grid initially shows quarterly totals. Select a quarter heading to show its three months. Select a month heading to return that quarter to its total. Other quarters keep their state. Quarter columns sum the corresponding three months exactly. Scroll horizontally on a narrow screen.

## Understand the measures

| Measure | Amount and timing |
| --- | --- |
| Budget | Total cost of current annual budget lines, shown in Year total. There is no monthly budget allocation; the monthly cells are dashes. This is not the program-funding-only ceiling. |
| Forecast | Monthly amounts from the active forecast version for this year. Missing months on that active forecast are zero; without an active forecast the source is unavailable, not a zero forecast. Draft or inactive replacements do not supply the grid. |
| Claimed | Program funding on claim lines that have not been deleted, shown in the claim's period-end month. Applied claim reductions reduce this amount. A displayed claim may still await approval. |
| Reconciled | Amounts from successfully completed reconciliations, shown in the source claim's period-end month, with any applied claim reductions. Pending or unsuccessful reconciliations are excluded. |
| Payments | Finalized payments shown in their own period-end month, adjusted by effective journal vouchers, corrections and linked recoveries. These adjustments can increase or decrease the amount and use their recorded fiscal year and month. The adjusted total can differ from the original cash amounts shown in the payment details. |

Amounts appear in the period-end month, rather than being spread across the period. For example, a claim of 400 covering April through July appears in July. A separate claim of 200 covering May through June appears in June. Several payments ending in June add in June; expand the payment details to inspect each original amount and period. A zero monthly amount is shown as a dash, but Year total remains explicit.

An amendment can copy budget lines into a new version without losing their links to older financial records. If a claim or active forecast still refers to a line removed from the current budget, the grid keeps that line's description and shows zero current budget. A claim not allocated to a budget line appears separately. Do not delete these records to make the grid match the current budget.

## Read pacing and distribution

For each currency, the panel compares the annual budget, adjusted reconciled total and active forecast. The comparison ends at the latest claim end month with a positive original reconciled amount. A later unreviewed claim does not extend it. The forecast for this comparison adds all months from April through that month.

Compare reconciled total with the forecast through that cutoff to see the exact amount above, below or equal to plan. Compare annual forecast with annual budget to see unforecast budget or forecast above budget. The progress fill uses reconciled total divided by annual budget, while its forecast marker uses forecast through the cutoff divided by annual budget. The bar stops at its limit, but the displayed amounts still show any excess. The panel cannot show progress against a zero budget. It also shows when no active forecast or reconciliation cutoff is available.

The monthly distribution bars scale against the largest positive forecast month. The even-month reference is annual forecast divided by twelve, not a required spending target. The peak-month label shows that month's share of a positive annual forecast. These displays help you compare spending with the forecast. They do not authorize a payment.

### Worked example

Suppose the annual total-cost budget is 12,000 CAD, the active annual forecast is 10,800, and April through June forecast is 900 each month. A claim ending in June has 2,400 successfully reconciled and no later positive reconciliation exists. The cutoff forecast is 2,700; reconciled spending is 300 below forecast. The reconciled progress fill is 20% of budget and the forecast marker is 22.5%. Annual unforecast budget is 1,200. The even-month reference is 900.

A finalized payment ending in June of 3,000 appears in June. A linked, effective posted credit of 500 received in October appears as −500 in October, giving adjusted annual Payments of 2,500, while the June disclosure still shows original cash of 3,000. Keep the October receipt in October even though it recovers a June advance.

## Accounting effects and recovery

Corrections adjust recorded amounts without changing the original payment details. Balanced journal vouchers move amounts between financial codes without changing total cash. A credit memo reduces recorded paid amounts and restores commitment capacity only when its coding links to a commitment chart. Creating a receivable alone does not reduce paid amounts. The credit uses the receipt month, or the creation month for an automatic offset, and the recorded source fiscal year.

Claim reductions become effective only when the owning posted receivable is fully cleared. Partial receipts leave claimed and reconciled amounts unchanged.

For example, if a posted receivable requires a claim reduction of 600 CAD, receiving only 200 CAD does not yet reduce Claimed or Reconciled. Once the receivable is fully cleared and the reduction applies, those measures include the 600 CAD reduction. The summary includes adjustments once they take effect. The grid has no separate rows for original claims, corrections or recoveries. Use [Receivables](./receivables.md), [Payments](./payments.md), [Corrections](./corrections.md) and [Journal vouchers](./journal-vouchers.md) for the original records and history.

If loading fails, select **Retry**. A failed load does not mean there is no financial activity.

- If a forecast is unavailable, open **Forecasts** and check that the version with the expected amounts is active.
- If an amount appears in an unexpected month, inspect the record's period end, receipt date and source fiscal year.
- If amounts differ after an amendment, check whether the relevant cost line remains in the current budget. Review any separately displayed claim lines.

Refresh this read-only view after changing a source record. Before closing an agreement, complete the approvals and outstanding work described in [Closeout](./closeouts.md). Zero totals in this tab do not prove that the agreement is ready to close.
