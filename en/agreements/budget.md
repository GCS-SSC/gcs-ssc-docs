# Agreement budget

The **Budget** tab records the agreement's fiscal years and detailed cost lines. Set it up before entering forecasts, claims, commitments or payments. Forecasts and claims refer to the budget’s saved years and cost lines. Commitments cannot exceed the permitted current program funding, and payments use the Agreement’s fiscal years.

## Prerequisites and access

Before entering an Agreement budget, confirm that your agency or program administrator has configured the first four items below. Then check the saved Agreement and its dates. Complete these prerequisites in order:

1. agency fiscal years;
2. program fiscal-year budgets;
3. stream budgets, including total budget and overcommit threshold;
4. active stream cost-category line items; and
5. the saved agreement and its authorized-assistance dates.

You need Agreement Viewer access to view the budget. Adding or editing fiscal years/lines requires Contributor plus the exact Agreement assignment; deleting requires Manager plus that assignment. Your assignment must cover this exact Agreement. The choices offered in an add or edit form follow the same access requirements as that form.

When you save, the system rechecks your current permissions and stream and changes only the current working budget. It protects the Agreement and its agency/program/stream links from competing changes during the save. A failed save leaves the budget unchanged.

## Fiscal years

Select a fiscal year backed by an active budget on the agreement's current stream. The create picker returns only years whose date range overlaps the agreement's authorized-assistance period. An active fiscal year may appear only once in the current budget version.

The table preserves a fiscal-year group even when it has no lines. From that group, authorized users can add a line, change the fiscal year, or delete the group when the interface considers deletion safe.

Deleting removes the year from the current list while keeping stored history (soft deletion). It is refused when the fiscal year has active budget lines, claims, payments, or claim-line use. The main tab therefore shows its fiscal-year delete action only for an empty group. There is no restore control.

Changing a fiscal-year group repeats the authorized-assistance overlap check on the server. A group with active budget lines cannot be reassigned. An unchanged saved year can still be retained when its reference is retired; that does not make the retired year available for new allocations. Review claims and payments before any reassignment: the current reassignment guard checks active budget lines, while deletion has its own downstream-use checks.

## Budget lines

For a manual line, choose the year and cost line, identify the cost in the subsection and description, enter the total and funding amounts, then save. For example, a CAD 1,500 travel cost with CAD 1,000 from the program and CAD 500 from a configured municipal source uses a total of 1,500, not 1,000. The full-screen line form contains:

| Field | Rule |
| --- | --- |
| Budget fiscal year | Required current-version fiscal-year group on this agreement. |
| Cost line | Required active stream cost-category line item. Its English/French configured name is displayed. |
| Cost subsection | Required non-empty text, maximum 255 characters. |
| Description | Required non-empty text; this agreement-specific description is not bilingual. |
| Total amount | Required finite amount with at most two decimals. |
| Program funding | Enter an exact amount for manual lines. For percentage lines, the server calculates it; do not submit a replacement amount. |
| Other funding sources | Select configured funding subtypes and exact amounts, with optional English/French descriptions. Each subtype appears once per line. |
| Currency | Required configured `currency_codes` value; the form displays the agreement’s immutable currency and does not allow a replacement. |

Enter amounts with no more than two decimal places, using the Agreement’s currency. The currency cannot be changed in this form.

**Technical reference for integrations:** Agreement money is transported as exact decimal text, such as `"1250.00"`, and persisted as `numeric(19,2)`. The absolute per-row maximum is `99999999999999999.99`. Decimal strings are authoritative; the compatibility path accepts JSON numbers only when their serialized cents are safe integers. Exponent notation, surrounding whitespace, leading zeroes, excess decimal places, and out-of-range amounts are rejected. Signed amounts remain supported where the domain schema permits them; do not assume a positive-only business rule from the display control.

The total must be at least the program funding plus all configured other-funding amounts. For example, 1,000 from the program plus 500 from another source requires a total of at least 1,500. A total of 1,400 is rejected. If recalculating a percentage leaves any affected line’s total below its combined funding, the system cancels the entire change. Total amount and other funding remain manually entered even on calculated lines.

## Percentage-based lines

Your agency sets up cost lines as manual or percentage-based, and your stream determines which ones you can choose. When you create a line, it keeps that definition’s calculation mode, source category, default percentage, and permission to change the percentage. Later changes to agency defaults do not change saved lines. Copies made for an Amendment keep those saved settings.

| Mode | Program-funding base | Editable values |
| --- | --- | --- |
| Manual | No calculation; enter program funding directly. | Program funding, total, and other funding. |
| Percentage of a category (`category`) | Program funding of manual lines in the configured source category. | Total and other funding; percentage only if overrides were allowed when this line was created. |
| Percentage of all other items (`all_other`) | Program funding of every other line in the same calculation group, including calculated category charges. | Total and other funding; percentage only if the saved definition allows it. |

Calculations group by budget version, Agency fiscal year, and currency, across subsections. Other funding sources never enter the percentage base. Category charges are calculated before all-other charges. Only one active all-other charge is allowed per version/year/currency. Percentage values range from 0 through 100 with at most two decimal places.

The result is rounded once to the nearest **whole dollar**, with an exact half rounded away from zero, then stored as two-decimal money. For example, 10% of `"1005.00"` is `"101.00"`, not `"100.50"`. Browser previews use the same exact arithmetic, but the server reloads saved settings and validates the final transaction.

### Worked budget example

Suppose all these lines use CAD and the same fiscal year and budget version:

| Line | Configuration | Program funding |
| --- | --- | ---: |
| Salaries | Manual, source category Personnel | 10,000.00 |
| Benefits | 10% of Personnel | 1,000.00 |
| Administration | 5% of all other items | 550.00 |
| Total | 10,000 + 1,000 + 550 | 11,550.00 |

The Administration base is 11,000. Adding 2,000 of other funding to Salaries does not change either percentage charge. A salary increase to 12,000 changes Benefits to 1,200 and Administration to 660. Before saving that increase, ensure the manually entered totals of Benefits and Administration can cover their new program funding plus their own other funding. Otherwise the entire save fails, including the salary change.

### Create and edit a calculated line

1. Select the budget fiscal year and configured cost line.
2. Read the captured mode and source category. For a category charge, verify that the intended manual source rows exist in this year and currency.
3. Accept the default percentage or change it if the form permits an override.
4. Enter total amount, description, subsection and any other funding; confirm the displayed agreement currency. Leave calculated program funding to the preview and server.
5. Save, then review the refreshed whole-budget totals; changes to a source can affect other lines.

Adding, editing, moving or deleting a line recalculates the affected budget version as part of the same save. The system cancels both your change and the recalculations if a required calculation source is invalid, a second all-other charge is created, a line’s total is too low, a calculated amount is too large, or the current budget exceeds the stream’s available capacity. Moving a line to another fiscal year changes the calculation group. Currency must remain the agreement’s denomination; the server rejects a mismatch. Amendment versions remain isolated from the current version until their application workflow.

## Retired cost definitions

Agency categories, Agency line items, and stream mappings each have an availability flag separate from deletion. Disabling any part of that chain prevents a new selection through it. Existing budget references and their saved calculation settings remain readable; editing an existing line can retain its original inactive selection. A replacement must be currently eligible. Stream setup shows mapping, category, and Agency line-item availability separately, so an active mapping alone does not prove that its source is available.

## Program-funding capacity

For the chosen fiscal year, maximum program funding is:

`stream budget total × (1 + overcommit threshold)`

For example, a CAD 100,000 stream budget with a configured overcommit ratio of `0.10` (10%) allows CAD 110,000 of program funding across its active Agreements for that year: 100,000 × 1.10 = 110,000. If other Agreements already use 90,000, only 20,000 remains for this Agreement. Other funding sources do not increase that program-funding capacity.

Available capacity includes program funding on active lines in the current budgets of **all active agreements in the same stream and fiscal year**. When editing a line, its proposed amount replaces its old amount in this check; the old and new amounts are not counted together. You cannot save without an existing, non-deleted current fiscal year and stream budget.

**Technical reference for developers:** Creation locks the stream-budget row before checking capacity and inserting. An update excludes the edited line, locks the target stream budget and checks the proposed program-funding amount.

You cannot move a cost line to another fiscal year while an active claim line refers to it. Deleting a line is also refused while an active claim line references it. Other successful line deletions are soft deletions and have no tab-level restore action.

## Grouped table and search

Rows are grouped by fiscal year, organization cost category, and free-text subsection. Add actions on category/subsection groups prefill and lock those grouping values for the new form. Individual cost rows show the bilingual configured cost-line name, agreement description, total, program funding, and combined other funding.

Search looks through the complete overview already loaded in your browser and matches fiscal-year display, English/French category and line names, subsection, and description. The table starts with 50 rows per page; searching covers the loaded overview, not just the visible page.

Group and footer totals sum the displayed values in the agreement currency. Current financial writes cannot introduce another denomination, and no exchange conversion occurs.

## Versions and downstream records

Agreement creation automatically creates one current working budget version. The ordinary Budget tab reads and writes only that version. Preparing an Amendment copies the years and lines into a separate version. The copied items keep their identifiers so existing references still point to the same year or cost. Approved revisions record which budget version they used. Historical copies do not count toward current stream-capacity calculations.

Each year and cost line keeps a stable identity when copied into another budget version. This lets forecasts, claims, extensions and saved revisions continue to refer to the same logical item. **Technical reference for developers:** The database checks that each stored line belongs to its Agreement, year and budget version, and prevents duplicate active stable identities in one version.

Before reducing or deleting budget data, review [Commitments](./commitments.md), [Forecasts](./forecasts.md), [Claims](./claims.md), and [Payments](./payments.md). Downstream constraints can refuse a change even when its button is available.

## Recovery

If save fails, reload the agreement and verify your permission, the current stream configuration, the agreement dates, the selected fiscal year, the cost line, and remaining capacity. Do not create replacement rows to bypass an in-use error. Ask an authorized administrator for recovery help if data was deleted or a line was moved to the wrong fiscal year.

## Configured funding sources and annual controls

Other funding is recorded by the Agency’s funding types and subtypes linked to this stream, rather than three fixed federal/government/other columns. Select each subtype once, enter its amount, and optionally describe it in both languages. A new selection must be active and available to the stream; an existing saved allocation may retain a retired subtype. Saved allocations supply the other-funding total and their type’s stacking and cost-sharing participation. The agreement currency applies to budget and downstream financial lines.

Before reducing the current budget, check the financial work already recorded for that year. The system refuses a reduction that would put counted forecasts, claims or successful reconciliations above the available annual budget. It checks total costs, program funding and each other-funding type separately. Subtypes of the same funding type share one limit: two municipal subtypes do not each get the full municipal budget. This annual Agreement check is separate from the stream-wide program-funding capacity and the commitment ceiling.

For example, an annual budget of 15,000 total, 10,000 program and 5,000 municipal funding cannot support a forecast with 6,000 municipal funding, even if its total is only 14,000. Correct the funding mix or obtain and apply an authorized budget amendment; increasing another funding type does not increase municipal capacity. A failed reduction rolls back its budget changes and dependent recalculations.

See [Financial summary](./financial-summary.md) for the annual and monthly read-only comparison.
