# Agreement budget

The **Budget** tab records the agreement's fiscal years and detailed cost lines. Set it up before entering forecasts, claims, commitments or payments. Forecasts and claims refer to the budget's saved years and cost lines. Commitments cannot exceed the permitted current program funding, and payments use the Agreement's fiscal years.

## Prerequisites and access

Before entering an Agreement budget, confirm that your agency or program administrator has configured the first four items below. Then check the saved Agreement and its dates. Complete these prerequisites in order:

1. agency fiscal years;
2. program fiscal-year budgets;
3. stream budgets, including total budget and overcommit threshold;
4. active stream cost-category line items; and
5. the saved agreement and its authorized-assistance dates.

You need Agreement Viewer access to view the budget. To add or edit fiscal years or lines, you need Contributor access and an assignment to this exact agreement. To delete them, you need Manager access and the same assignment. The choices offered in an add or edit form follow the same access requirements as that form.

When you save, the system rechecks your current permissions and stream and changes only the current working budget. A failed save leaves the budget unchanged.

## Fiscal years

Select a fiscal year backed by an active budget on the agreement's current stream. The list offers only years that overlap the agreement's authorized-assistance period. An active fiscal year may appear only once in the current budget version.

The table shows a fiscal-year group even when it has no lines. If you have permission, use the group's actions to add a line, change the fiscal year, or delete an empty group. Saving or deleting still checks the restrictions below.

Deleting removes the year from the current list while keeping its history. It is refused when the fiscal year has active budget lines, claims, payments, claim-line use or any forecast history, including deleted forecasts. The main tab therefore shows its fiscal-year delete action only for an empty group. There is no restore control.

A replacement fiscal year must also overlap the authorized-assistance period. A group with active budget lines or any forecast history cannot be reassigned. Deleted forecasts still protect their year. An unchanged saved year can still be retained when its reference is retired; that does not make the retired year available for new allocations. Review claims and payments before any reassignment: the current reassignment guard checks active budget lines and forecast history, while deletion has its own downstream-use checks.

## Budget lines

For a manual line, choose the year and cost line, identify the cost in the subsection and description, enter the total and funding amounts, then save. For example, a CAD 1,500 travel cost with CAD 1,000 from the program and CAD 500 from a configured municipal source uses a total of 1,500, not 1,000. The full-screen line form contains:

| Field | Rule |
| --- | --- |
| Budget fiscal year | Required current-version fiscal-year group on this agreement. |
| Cost line | Required active stream cost-category line item. Its English/French configured name is displayed. |
| Cost subsection | Required non-empty text, maximum 255 characters. |
| Description | Required non-empty text; this agreement-specific description is not bilingual. |
| Proponent | Required linked proponent. The sole linked proponent is selected automatically; choose one when several are linked. |
| Total amount | Required nonnegative amount with at most two decimals. |
| Program funding | Enter an exact nonnegative amount for manual lines. The form calculates it for percentage lines. |
| Other funding sources | Select configured funding subtypes and exact amounts, with optional English/French descriptions. Each subtype appears once per line. |
| Currency | The agreement's currency. You cannot change it here. |

The total must be at least the program funding plus all configured other-funding amounts. For example, 1,000 from the program plus 500 from another source requires a total of at least 1,500. A total of 1,400 is rejected. If recalculating a percentage leaves any affected line's total below its combined funding, the system cancels the entire change. Total amount and other funding remain manually entered even on calculated lines.

Every line assigns its full program funding to one linked proponent, including calculated lines. Changing that selection rechecks the proponent's limit across all years of this budget version. The proponent does not divide the percentage-calculation group. Amendment copies keep the selection.

Expand a saved cost line to see program funding and each other source separately. Use the line's add action to add a source, or a source row's edit or delete action to change it. These actions save immediately. Editing the main line preserves its saved other sources. Source removal requires the delete permission described above and must still satisfy the budget limits.

## Percentage-based lines

Your agency sets up cost lines as manual or percentage-based, and your stream determines which ones you can choose. When you create a line, it keeps that definition's calculation mode, source category, default percentage, and permission to change the percentage. Later changes to agency defaults do not change saved lines. Copies made for an Amendment keep those saved settings.

| Mode | Program-funding base | Editable values |
| --- | --- | --- |
| Manual | No calculation; enter program funding directly. | Program funding, total, and other funding. |
| Percentage of a category | Program funding of manual lines in the configured source category. | Total and other funding; percentage only if overrides were allowed when this line was created. |
| Percentage of all other items | Program funding of every other line in the same calculation group, including calculated category charges. | Total and other funding; percentage only if the saved definition allows it. |

The system calculates lines together when they share a budget version, agency fiscal year, and currency, even across different subsections. Other funding sources never enter the percentage base. Category charges are calculated before all-other charges. Each group can have only one active charge based on all other items. Percentage values range from 0 through 100 with at most two decimal places.

The result is rounded to the nearest whole dollar, with an exact half rounded away from zero. For example, 10% of 1,005.00 is 101.00. The form previews the result and the system checks it again when you save.

### Worked budget example

Suppose all these lines use CAD and the same fiscal year and budget version:

| Line | Configuration | Program funding |
| --- | --- | ---: |
| Salaries | Manual, source category Personnel | 10,000.00 |
| Benefits | 10% of Personnel | 1,000.00 |
| Administration | 5% of all other items | 550.00 |
| Total | 10,000 + 1,000 + 550 | 11,550.00 |

The Administration base is 11,000. Adding 2,000 of other funding to Salaries does not change either percentage charge. A salary increase to 12,000 changes Benefits to 1,200 and Administration to 660. Before saving that increase, check that the manually entered totals of Benefits and Administration cover their new program funding plus their own other funding. Otherwise the entire save fails, including the salary change.

### Create and edit a calculated line

1. Select the budget fiscal year and configured cost line.
2. Check the calculation mode and source category. For a category charge, check that the manual lines it uses exist in this year and currency.
3. Accept the default percentage or change it if the form permits an override.
4. Enter total amount, description, subsection and any other funding; confirm the displayed agreement currency. The form calculates program funding.
5. Save, then review the refreshed totals for the whole budget. Changing a source line can affect other lines.

Adding, editing, moving or deleting a line recalculates the affected budget version as part of the same save. The system cancels both your change and the recalculations if a required calculation source is invalid, a second all-other charge is created, a line's total is too low, a calculated amount is too large, or the current budget exceeds the stream's available capacity. Moving a line to another fiscal year changes the calculation group. All lines use the agreement's currency. Changes prepared in an amendment do not affect the current budget until the amendment is applied.

## Retired cost definitions

A cost line is available for new selections only when the agency category, agency line item and stream mapping are all available. You can still read existing lines and keep a retired selection when editing one. If you replace it, choose a currently available cost line. Ask your administrator to check all three settings when an expected option is missing.

## Stream financial limits

An active financial-limit record on the stream adds three checks. They use all active lines and years in one budget version. Current and amendment budgets are checked separately.

| Limit | What must fit |
| --- | --- |
| Maximum allowable per recipient | Each proponent's combined program funding across all years of this version must fit the amount. This is not a shared allowance across agreements. |
| Maximum support percentage | On each line, program funding must fit the percentage of program funding plus other sources marked for cost sharing. Unallocated total cost does not count as cost sharing. |
| Stacking limit | Program funding plus other sources marked for stacking, across the whole version, must fit the percentage of total costs. |

The funding type's current cost-sharing and stacking settings determine which sources count, including retained retired sources. The two settings are independent. Comparisons use exact amounts without rounding the permitted ceiling upward. An active zero is a real zero limit. Without an active record, these three checks do not apply. Stream capacity and annual usage checks still apply separately.

For example, the stream allows 50,000 per proponent, 50% support, and 75% stacking. A line with 10,000 total cost, 4,000 program funding, 4,000 qualifying cost sharing, and 2,000 unallocated cost meets the support rule: 4,000 ÷ 8,000 = 50%. If that other source also counts for stacking, the line alone fails stacking: 8,000 ÷ 10,000 = 80%. A total cost of 11,000 reduces stacking to about 72.73%, provided that total reflects the actual project cost. A second year with 47,000 of program funding for the same proponent would exceed the 50,000 cap because 4,000 + 47,000 = 51,000.

The maximum amount uses each agreement's own currency. A configured 50,000 means CAD 50,000 for a CAD agreement and USD 50,000 for a USD agreement. The system does not convert currencies.

Saving a line, changing a source, recalculating percentages, or deleting budget data rechecks the complete proposed version. Approval submission and amendment application check the current limits again. A failed check leaves the change and its recalculations unsaved. Review the affected proponent, qualifying sources, and totals before retrying. Deleting a line can also fail if it removes costs needed to satisfy stacking.

## Program-funding capacity

For the chosen fiscal year, maximum program funding is:

`stream budget total × (1 + overcommit threshold)`

For example, a CAD 100,000 stream budget with a configured overcommit ratio of `0.10` (10%) allows CAD 110,000 of program funding across its active Agreements for that year: 100,000 × 1.10 = 110,000. If other Agreements already use 90,000, only 20,000 remains for this Agreement. Other funding sources do not increase that program-funding capacity.

Available capacity includes program funding on active lines in the current budgets of **all active agreements in the same stream and fiscal year**. When editing a line, its proposed amount replaces its old amount in this check; the old and new amounts are not counted together. You cannot save without an existing, non-deleted current fiscal year and stream budget.

You cannot move a cost line to another fiscal year while an active claim line refers to it. Deleting a line is also refused while an active claim line references it. Deleted lines remain in the history. This tab has no restore action.

## Grouped table and search

Rows are grouped by fiscal year, organization cost category, and free-text subsection. Add actions on category/subsection groups prefill and lock those grouping values for the new form. Individual cost rows show the bilingual configured cost-line name, agreement description, total, program funding, and combined other funding.

Search looks through the complete overview already loaded in your browser and matches fiscal-year display, English/French category and line names, subsection, and description. The table starts with 50 rows per page; searching covers the loaded overview, not just the visible page.

Group totals and totals at the bottom of the table add the displayed amounts in the agreement currency. The table does not convert currencies.

## Budget versions and linked records

Agreement creation automatically creates one current working budget version. The **Budget** tab shows and changes only that version. Preparing an Amendment copies the years and lines into a separate version. Existing financial records remain linked to the corresponding year or cost after a copy. Approved revisions record which budget version they used. Historical copies do not count toward current stream-capacity calculations.

Claims linked to a year or line in an earlier budget version still prevent you from deleting its current counterpart. They also prevent you from moving the corresponding cost line to another fiscal year.

Before reducing or deleting budget data, review [Commitments](./commitments.md), [Forecasts](./forecasts.md), [Claims](./claims.md), and [Payments](./payments.md). These linked records can prevent a change even when its button is available.

## Recovery

If save fails, reload the agreement and verify your permission, the current stream configuration, the agreement dates, the selected fiscal year, the cost line, and remaining capacity. Do not create replacement rows to bypass an in-use error. Ask an authorized administrator for recovery help if data was deleted or a line was moved to the wrong fiscal year.

## Configured funding sources and annual controls

Other funding is recorded by the Agency's funding types and subtypes linked to this stream. Select each subtype once, enter its amount, and optionally describe it in both languages. A new selection must be active and available to the stream; an existing saved allocation may retain a retired subtype. Saved allocations make up the other-funding total. Each allocation's funding type determines whether it counts toward stacking and cost-sharing calculations. The agreement currency applies to budget and downstream financial lines.

Before reducing current program funding, check counted claims and successful reconciliations for that year and currency. The budget cannot fall below their effective usage after eligible claim-recovery credits. See [Amendments](./amendments.md) for the collection-credit rules and an example. If the change fails, the budget and its calculated amounts remain unchanged.

An active forecast or commitment can remain above a reduced budget. That creates a payment hold until a valid replacement is active or sufficient authorized funding is restored. Forecast checks use the payment's fiscal year. Commitment checks add all active commitment types across the agreement's years. Total cost and other-funding types retain their line rules but have no separate annual ceilings. The Stream-wide program-funding capacity check remains separate.

See [Financial summary](./financial-summary.md) for the annual and monthly read-only comparison.
