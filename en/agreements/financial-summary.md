# Agreement financial summary

Open an agreement’s **Financial summary** tab to compare its annual budget, active forecast, claimed and successfully reconciled amounts, and recorded payments across April through March. Agreement read access is sufficient; the view does not require an independent financial-record assignment and does not save or approve work.

## Choose the view

Use this tab when you need to answer questions such as “How much was claimed this year?”, “How much has been successfully reconciled?” or “Are costs following the forecast?” Choose the year and currency first, then compare the relevant measures. Open the source record when you need to explain an amount or take action.

Select a fiscal year from the current agreement budget; the first available year is selected initially. Effective accounting entries can also retain a historical year no longer in the current budget. Each currency has its own grid and pacing panel. No exchange conversion or cross-currency total is applied.

**Forecast** is selected initially. Choose **All** to show Budget, Forecast, Claimed, Reconciled and Payments. Selecting one measure isolates it; further choices add or remove measures while keeping at least one selected. Filters change only the grid, not the underlying amounts or pacing panel. All four quarters initially show their months. Select a month heading to collapse its quarter, or the quarter heading to expand it; other quarters keep their state. Quarter columns sum the corresponding three months exactly. Scroll horizontally on a narrow screen.

## Understand the measures

| Measure | Amount and timing |
| --- | --- |
| Budget | Total cost of current annual budget lines, shown in Year total. There is no monthly budget allocation; the monthly cells are dashes. This is not the program-funding-only ceiling. |
| Forecast | Monthly amounts from the active forecast version for this year. Missing months on that active forecast are zero; without an active forecast the source is unavailable, not a zero forecast. Draft/inactive replacements do not supply the grid. |
| Claimed | Non-deleted claim-line program amounts recognized in the claim’s period-end month, including separately applied claim-reduction effects. A displayed claim is not proof of successful approval. |
| Reconciled | Amounts from successfully completed reconciliations, shown in the source claim’s period-end month, with any applied claim reductions. Pending or unsuccessful reconciliations are excluded. |
| Payments | Finalized payments shown in their own period-end month, adjusted by effective journal vouchers, corrections and linked recoveries. These adjustments can increase or decrease the amount and use their recorded fiscal year/month. The adjusted total can differ from the original cash amounts shown in the payment details. |

Amounts are not spread evenly across a claim or payment’s inclusive period. Overlapping claims remain separate: April–July 400 appears in July and May–June 200 appears in June. Several payments ending in June add in June; expand the disclosure to inspect each original amount and period. A zero monthly amount is shown as a dash, but Year total remains explicit.

An amendment can copy budget lines into a new version without losing their links to older financial records. If a claim or active forecast still refers to a line removed from the current budget, the grid keeps that line’s description and shows zero current budget. A claim not allocated to a budget line appears separately. Do not delete these records to make the grid match the current budget.

## Read pacing and distribution

For each currency, the panel shows annual budget, effective reconciled total, active forecast through the latest positively reconciled claim end month, and annual active forecast. The cutoff is the latest month with a positive original reconciled amount: it is the last month used for the comparison with the forecast. A later unreviewed claim does not extend it. The through-cutoff forecast is cumulative from April, not just that month’s forecast.

Compare reconciled total with the forecast through that cutoff to see the exact amount above, below or equal to plan. Compare annual forecast with annual budget to see unforecast budget or forecast above budget. The progress fill uses reconciled total divided by annual budget, while its forecast marker uses forecast through the cutoff divided by annual budget. Visual positions are limited to the track; actual displayed amounts and over-budget text retain excess amounts. A zero budget has no valid progress scale, and absent forecast or reconciliation cutoff is explicitly unavailable.

The monthly distribution bars scale against the largest positive forecast month. The even-month reference is annual forecast divided by twelve, not a required spending target. The peak-month label shows that month’s share of a positive annual forecast. These displays describe timing; they do not approve spending, assign a risk rating or establish a payable amount.

### Worked example

Suppose the annual total-cost budget is 12,000 CAD, the active annual forecast is 10,800, and April–June forecast is 900 each month. A claim ending in June has 2,400 successfully reconciled and no later positive reconciliation exists. The cutoff forecast is 2,700; reconciled spending is 300 below forecast. The reconciled progress fill is 20% of budget and the forecast marker is 22.5%. Annual unforecast budget is 1,200. The even-month reference is 900.

A finalized payment ending in June of 3,000 appears in June. A linked, effective posted credit of 500 received in October appears as −500 in October, giving adjusted annual Payments of 2,500, while the June disclosure still shows original cash of 3,000. Do not move that receipt into June merely because it recovers the June advance; payment-calculator inputs have their own source-year and cutoff policies.

## Accounting effects and recovery

Posted corrections are distinct from original cash. Balanced journal vouchers reallocate coding without changing total cash. A credit memo affects recorded paid/commitment capacity only where its retained coding links to a commitment chart; a receivable header or unlinked receipt coding alone is not a paid reduction. Received date supplies a credit’s month; automatic offsets use their creation date. Original/source fiscal-year evidence supplies its year.

Claim reductions become effective only when the owning posted receivable is fully cleared. Partial receipts leave claimed/reconciled amounts unchanged.

For example, if a posted receivable requires a claim reduction of 600 CAD, receiving only 200 CAD does not yet reduce Claimed or Reconciled. Once the receivable is fully cleared and the reduction applies, those measures include the 600 CAD reduction. The summary’s adjusted measures include applied effects; the ordinary grid does not add separate original-claim, correction or recovery breakdown rows. Use [Receivables](./receivables.md), [Payments](./payments.md), [Corrections](./corrections.md) and [Journal vouchers](./journal-vouchers.md) for the source packet and history.

If loading fails, use **Retry**; do not interpret a failed read as no financial activity. If a forecast is unavailable, confirm that the intended header reached successful activation and is the intended version with the expected amounts. For unexpected timing, inspect each record’s period end, receipt date and source fiscal year. For a discrepancy after an amendment, compare stable lineage and unmatched rows. The view is a read-only snapshot; refresh after source changes. [Closeout](./closeouts.md) has additional approval and terminal-work requirements and is not certified by a zero-looking summary.
