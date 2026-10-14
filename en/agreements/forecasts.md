# Agreement Forecasts

Use forecasts to show when you expect Agreement spending to occur. Enter expected amounts by budget line and month, and use version numbers to keep different spending estimates within the same forecast. Open an agreement and select **Forecasts**; the tab groups displayed versions by agreement budget fiscal year.

## Before you begin

| Requirement | Verified behaviour |
| --- | --- |
| Current agreement budget | Choose a fiscal year in the current Agreement budget. The forecast keeps a stable reference to that year and shows its current budget lines, even when a budget amendment replaces the budget version. |
| Authorization | Agreement Viewer reads. Creating a forecast requires Contributor plus the assignment to that Agreement and makes the creator primary. Later header/line updates or completion require Contributor plus the assignment to that forecast; deletion requires Manager plus that assignment. |
| Common user record | Completion requires the signed-in account to resolve to an active `Common_User`. |
| Optional completion workflow | Completion starts the selected published `approval_submission` workflow for `fundingcaseforecast` when configured; positive effects wait for its success. |

The server rechecks your Agreement permissions when saving and locks the Agreement and affected forecasts to prevent conflicting changes. You cannot use a fiscal year or budget line from another Agreement, a deleted record, or an earlier budget version.

## Create and browse forecasts

Choose **Add forecast** and select one of the fiscal years derived from current budget lines. The new forecast record starts inactive, with the Agency Draft business status. “Inactive” means it has not replaced the active forecast for that year. The database does not require a forecast to contain lines and does not enforce one inactive header per agreement/fiscal year.

A forecast record can contain several numbered versions of its monthly amounts. The table displays those versions as separate rows, but they share one forecast record:

| Display | Source |
| --- | --- |
| Fiscal-year group | The forecast header's stable budget fiscal-year identity and current fiscal-year label. |
| Version | Each distinct `egcs_fc_version` found on that header's active monthly lines. A header with no lines is represented as version `0`. |
| Status | The single status on the forecast header; all displayed versions therefore have the same lifecycle status. |
| Lines and total | Count and sum of active lines for that header and version. Totals use the agreement currency without conversion. |

Search matches fiscal year, version, localized status, line count, or total. Filtering, grouping, sorting, and pagination occur in the browser after the full overview loads.

Select **Add version** to enter a new spending estimate within the same forecast record. It opens the next version number in the URL; it does not copy earlier amounts or create a separate forecast record. Saving non-zero cells records amounts under the new number. For example, version 0 might show 2,000.00 in April and 3,000.00 in May, for a total of 5,000.00. To show a delay in version 1, enter 1,000.00 in April and 4,000.00 in May. Its total remains 5,000.00; both versions share the forecast’s status.

::: warning Header and version uniqueness
For normal entry, keep one forecast record per fiscal year and one amount for each budget line, month and version. Confirm the intended record before editing, deleting or adding a version from a fiscal-year group.

**Technical detail for imports and integrations:** the API permits multiple inactive forecast records for the same Agreement/year and duplicate active lines for the same forecast, budget line, month and version. Group actions assume one forecast record per year; the detail grid’s in-memory cell map keeps only one duplicate. The displayed grid can therefore hide duplicate imported amounts.
:::

## Edit the monthly breakdown

The detail route accepts a `version` query value; an absent value defaults to `0`. The grid groups current budget lines by bilingual cost category and cost subsection. It initially shows quarterly totals from April through March; select a quarter heading to expose its three monthly inputs. Search matches category, subsection, both language line-item names, or description.

The following table includes the technical API formats used by imports and integrations.

| Line field | Rule |
| --- | --- |
| Forecast | Required editable header in this agreement. A direct PATCH can move a line to another editable forecast in the same agreement. |
| Budget line | Required stable line identity from the current budget version, the same agreement, and the target forecast's fiscal year. |
| Month | Integer `0` through `11`: April through March. |
| Amount | Required `numeric(19,2)` value, at most two decimals and at most `99999999999999999.99` in absolute value, transmitted as exact decimal text. The request schema requires nonnegative program and total-cost amounts. |
| Currency | Required currency enum. New grid rows inherit the selected budget line’s agreement currency; there is no currency conversion. |
| Version | Required non-negative integer, normalized to decimal text for the API and stored as bigint. |

1. Enter your expected program amounts by month, using amounts of zero or more. Select a quarter heading to open its monthly inputs.
2. Select **Save breakdown**. A new zero cell creates no line. Setting an existing cell to zero keeps that line with a zero amount.
3. If saving fails, refresh and compare the saved cells with your intended forecast. Earlier cells may already be saved. Correct the reported cell and any unsaved changes, then save again.

**Technical contract:** cells are saved in sequence, with no transaction covering the whole grid. A changed existing line uses PATCH and requires `update`; a missing non-zero line uses POST and requires `create`.

Ordinary line writes preserve the Agency business status. The API can mark individual lines as deleted, but the current grid offers no line-delete action. Deleting an editable forecast marks it and all its active lines as deleted together, while retaining the database history.

A header's fiscal year cannot change while any active forecast line exists. The server validates the destination current fiscal year and refuses the move; it does not silently hide old-year lines. Choose the correct year before entering the breakdown.

## Lifecycle and completion

You cannot edit a forecast when the Agency has made its status read-only or terminal, when Completion has been recorded, or when protected workflow work prevents changes. Business status is not inferred from fixed names such as `inprogress` or `approved`.

Completion requires Contributor access and the assignment to that forecast, a writable header, no prior completion, and at least one active line across any version. An active workflow blocks it. Completion records the user and optional comment and atomically starts the configured approval-submission workflow, or records `no_workflow`. The follow-up application hook runs after the database transaction has committed.

Completion covers the whole forecast record, including every version, rather than only the version you are viewing. It does not clone a version or require every visible monthly coordinate to have a line. At its successful completion outcome, this forecast becomes active and other active forecasts for the same Agreement and fiscal-year identity become inactive. Without an approval workflow that happens immediately; with one it waits for success.

## Approval and replacement example

Publish an approval-submission workflow for `fundingcaseforecast` to require review or approval at Completion. Include its published template or plan; a template alone does not connect approval to Completion. Follow the steps created in the shared Workflow section. Standard workflows are explicitly selected and do not replace Completion.

For example, keep an active 12,000.00 forecast in place while preparing a replacement of 10,000.00 after a project delay. Enter and save the replacement's monthly lines, complete it, then finish its approval workflow. Success switches the active header for that Agreement/year; failed or cancelled work does not activate the replacement. Because the application permits multiple inactive headers, identify the intended header carefully rather than treating every displayed version as an independent approved forecast.

See [Approvals and completions](../concepts/approvals-completions.md) and [Workflows](../concepts/workflows.md).

## Recovery

- Completion cannot be repeated or undone from this page. Create a replacement forecast only after checking for an existing header for that fiscal year.
- Locked forecasts cannot be edited or deleted through these routes. Editable deletion is logical rather than physical.
- If the fiscal-year picker is empty, add active lines to the agreement's current [Budget](budget.md); a year with no current budget lines is not offered by the UI even though the server validates the fiscal-year row itself.
- If a budget amendment replaces current rows while preserving stable lineage, the forecast follows matching stable fiscal-year and line identities. A deleted or unmatched current line disappears from the editable grid.

## Funding breakdown and annual budget checks

A financial line shows how a cost will be paid: the amount requested from the program, the total cost, and amounts from other sources. The other sources are classified using the stream’s configured funding subtypes.

Save the monthly/submitted line first, then use its funding editor to enter total cost and other sources. Select each subtype once. Available choices come from this stream; an existing allocation may retain its retired subtype.

Total cost cannot be below program funding. Once other-source allocations are entered, program funding plus those allocations must equal total cost exactly.

Your stream can require a funding breakdown for forecasts, claims, both, or neither. When required, every active line must have at least one saved other-source allocation and an exact balanced breakdown before Completion. This includes every authored forecast version, not just the version currently displayed.

For example, equipment costing 1,000.00 could be funded by 700.00 from the program and 300.00 from another source: 700.00 + 300.00 = 1,000.00. Entering only 250.00 from that source leaves a 50.00 difference, so the breakdown cannot be saved as balanced.

A draft import can leave work to finish; inspect the saved rows before completing.

Saving financial lines and completing records also checks the current annual budget in the agreement currency.

Each forecast version you have entered is checked separately against the annual limits; the versions are alternative estimates, not amounts added together.

Claims share the annual limit with other claims that currently count against it. A claim stops using that capacity when its current recorded outcome is unsuccessful, denied, cancelled or failed. Changing a displayed status label alone does not release the amount.

For reconciliations, the check includes your proposed amount and successful earlier reconciliations. Claims or records with a negative outcome are excluded.

The application checks separate annual limits for program funding, total cost and each other-funding type. Reconciled amounts count against the program-funding limit.

For example, annual program funding of 10,000 with an existing counted claim of 6,000 leaves 4,000 for another claim. A 4,500 proposal fails even if it has a different proponent or cost line.

Refresh the current budget and counted records, correct the amount/funding source, or apply an authorized amendment. A rejected line request rolls back that request; earlier grid requests may already be saved.
