# Agreement forecasts

Use forecasts to show when you expect Agreement spending to occur. Open an agreement and select **Forecasts**. Each numbered version is a separate forecast with its own monthly amounts, assigned users, Completion and approval history.

## Before you begin

| Requirement | What to check |
| --- | --- |
| Current agreement budget | The year must belong to the current budget. The year picker uses years with current budget lines. |
| Access | Viewer access lets you read forecasts. Creating requires Contributor access and assignment to the Agreement. The creator becomes the forecast's primary user. Editing and Completion require Contributor access and assignment to that forecast. Deletion requires Manager access and that assignment. |
| User record | Completion requires an active user record for the signed-in account. |
| Optional approval workflow | A published approval-submission workflow for forecasts starts at Completion when configured. The replacement becomes active only after success. |

The server checks your current access and the Agreement's locks again when you save. Budget lines must belong to this Agreement, the selected year and the current budget.

## Create and browse forecasts

Choose **Add forecast**, select the fiscal year and save. The new forecast is an inactive draft. The system assigns the next version number for that Agreement and year, starting at 0. Deleted versions still reserve their numbers.

Expand a fiscal-year group to see each version, its status, active badge, line count and total in the Agreement currency. The group's total and status come from the active version, or the latest version when none is active. The group total represents one version, so it does not add together alternative estimates. Search matches the year, version, status, line count or total. Filtering and pagination happen after the overview loads.

Select **Add version** on a year group to create and open a separate draft. Normally it copies the active forecast's monthly amounts, total costs and other-funding allocations. If no active forecast exists, it starts empty. If the active forecast exceeds the current annual program budget, it also starts empty so you can enter an affordable replacement. Earlier versions keep their own history and assignments.

For example, active version 0 has 2,000 in April and 3,000 in May. Add version 1, then change those copied amounts to 1,000 and 4,000. Both total 5,000. Version 0 remains active while version 1 is a draft or awaiting approval.

## Edit the monthly breakdown

Open the version you intend to change. Its fiscal year and version number cannot be edited. The grid groups current budget lines by cost category and subsection, with quarterly totals from April through March. Select a quarter heading to show its monthly inputs. Search matches the category, subsection, bilingual line name or description.

1. Enter expected program amounts of zero or more in the Agreement currency, with at most two decimal places.
2. Select **Save breakdown**. A new zero cell creates no line. Setting an existing cell to zero keeps the line with a zero amount.
3. Check the saved amounts after the page refreshes. All changed cells save together. If validation fails, none of those changes are saved.

You can move an amount between months in one save. For example, with an annual budget of 5,000, change April from 5,000 to zero and May from zero to 5,000, then save once. The system checks the final annual total.

If another user changes a cell you are saving, the save is rejected to protect their work. The page reloads the saved amounts and keeps your unsaved differences. Compare those differences before saving again. After a lost response or failed refresh, reload and check what was saved before retrying.

Each budget line can have only one saved amount per month in a forecast version. Changing a monthly program amount preserves its other-source allocations and recalculates total cost as program funding plus those allocations.

Ordinary line changes preserve the Agency's business status. Deleting an editable forecast removes it and its active lines from normal lists while retaining history. There is no restore control.

## Lifecycle and completion

Save the breakdown and any required funding details before selecting Complete. You need assignment to this version, Contributor access, at least one active line, no prior Completion and an editable record. A read-only or terminal Agency status, an active workflow or a protected Agreement can block changes.

Completion records the user and optional comment. It starts the configured approval-submission workflow, or records completion without a workflow. Success makes this version active and replaces the active forecast for the same Agreement and year. Without an approval workflow this happens immediately; otherwise it waits for success. Failure or cancellation leaves the earlier active forecast in place. A draft with a higher version number does not replace it.

You cannot repeat or undo completion here. Use a new version when a completed forecast needs replacement. Standard workflows are selected separately and do not replace Completion. See [Approvals and completions](../concepts/approvals-completions.md) and [Workflows](../concepts/workflows.md).

## Funding breakdown and annual budget checks

Save a monthly line before opening its funding editor. Enter total cost and any other sources using the Stream's configured funding subtypes. Select each subtype once; an existing allocation may retain its retired subtype. Total cost cannot be below program funding. When other sources are entered, program funding plus those sources must equal total cost exactly.

If the Stream requires forecast funding details, each active line in this version needs at least one saved other-source allocation and a balanced breakdown before Completion. For equipment costing 1,000, enter 700 from the program and 300 from another source. An allocation of only 250 leaves a 50 difference to correct.

When you save or complete a forecast, the application checks its annual program amount against current program funding for the same year and currency. Versions are checked separately. Total cost and other sources must obey their line rules, but do not have separate annual budget ceilings.

## Replace a forecast after a funding reduction

A budget reduction can be saved even when an active forecast is too high. The Forecasts tab warns you about the affected year and version. Payments for that year are held until the active forecast fits the new program budget.

For example, reducing annual program funding from 12,000 to 10,000 leaves an active 12,000 forecast above budget. Choose **Add version** for that year, enter a replacement of 10,000 or less, save it and complete its approval. This draft starts empty rather than copying the over-budget amounts. Payments remain held until the replacement becomes active. Restoring sufficient authorized budget funding also resolves the mismatch.

You cannot clear this hold by deleting the over-budget active forecast. Finish the replacement, then retry the payment action. A year without an active forecast has no forecast-mismatch hold; the other payment checks still apply.

## Recovery

- If no year is offered, add current lines to the Agreement [Budget](budget.md).
- If a save fails after a budget change, refresh the budget and check the annual program amount before retrying.
- After a budget amendment, saved amounts remain linked to the matching budget lines. Lines absent from the current budget remain visible as read-only history, including in totals. You cannot edit their monthly amounts or funding details. Ask the agreement manager to review the budget before preparing a replacement.
- A fiscal year with forecast history cannot be reassigned or removed, even after the forecast is deleted. Keep that year in an amendment's proposed budget.
- If the page cannot load, use Retry before entering the same work again. Check the saved version and workflow history after an uncertain response.

## Developer contract

For API identifiers, exact-money formats, and extension imports, see [Extension authoring](../developer/extensions-authoring.md) and the [API reference](../developer/api/agreements.md).
