# Agreement Forecasts

Forecasts distribute expected agreement spending across current budget lines, fiscal months, and user-selected version numbers. Open an agreement and select **Forecasts**; the tab groups displayed versions by agreement budget fiscal year.

## Before you begin

| Requirement | Verified behaviour |
| --- | --- |
| Current agreement budget | A forecast header must reference a stable fiscal-year identity present in the current budget version. Its editable grid uses current-version budget lines with that same stable fiscal-year identity. |
| Authorization | Agreement Viewer reads. Creating a forecast requires Contributor plus the exact Agreement assignment and makes the creator primary. Later header/line updates or completion require Contributor plus the exact forecast assignment; deletion requires Manager plus that assignment. |
| Common user record | Completion requires the signed-in account to resolve to an active `Common_User`. |
| Optional completion workflow | Completion starts the selected published `approval_submission` workflow for `fundingcaseforecast` when configured; positive effects wait for its success. |

Writes repeat Agreement authorization inside a transaction after locking the agreement and every affected forecast aggregate. Cross-agreement, deleted, and non-current budget identities are rejected.

## Create and browse forecasts

Choose **Add forecast** and select one of the fiscal years derived from current budget lines. The server creates an inactive header with the Agency Draft business status. The database does not require a forecast to contain lines and does not enforce one inactive header per agreement/fiscal year.

The tab derives its rows rather than storing separate version records:

| Display | Source |
| --- | --- |
| Fiscal-year group | The forecast header's stable budget fiscal-year identity and current fiscal-year label. |
| Version | Each distinct `egcs_fc_version` found on that header's active monthly lines. A header with no lines is represented as version `0`. |
| Status | The single status on the forecast header; all displayed versions therefore have the same lifecycle status. |
| Lines and total | Count and sum of active lines for that header and version. Totals are formatted as CAD without converting stored currencies. |

Search matches fiscal year, version, localized status, line count, or total. Filtering, grouping, sorting, and pagination occur in the browser after the full overview loads.

**Add version** does not copy data or create a version entity. It opens the same forecast header with the next numeric version in the URL. Saving non-zero cells creates lines tagged with that number.

::: warning Header and version uniqueness
The API permits multiple inactive forecast headers for the same agreement/fiscal year. It also permits duplicate active lines with the same forecast, budget line, month, and version. The grouped UI assumes a single header per fiscal-year group for group edit/delete/add-version actions, and the detail grid keeps only one duplicate in its in-memory cell map. Create one header per fiscal year and one line per budget-line/month/version coordinate.
:::

## Edit the monthly breakdown

The detail route accepts a `version` query value; an absent value defaults to `0`. The grid groups current budget lines by bilingual cost category and cost subsection. It initially shows quarterly totals from April through March; select a quarter heading to expose its three monthly inputs. Search matches category, subsection, both language line-item names, or description.

| Line field | Rule |
| --- | --- |
| Forecast | Required editable header in this agreement. A direct PATCH can move a line to another editable forecast in the same agreement. |
| Budget line | Required stable line identity from the current budget version, the same agreement, and the target forecast's fiscal year. |
| Month | Integer `0` through `11`: April through March. |
| Amount | Required `numeric(19,2)` value, at most two decimals and at most `99999999999999999.99` in absolute value, transmitted as exact decimal text. The UI sets a minimum of zero, but server validation and the database do not enforce non-negative values. |
| Currency | Required currency enum. The current grid always creates `cad`; it does not expose currency selection or conversion. |
| Version | Required non-negative integer, normalized to decimal text for the API and stored as bigint. |

**Save breakdown** processes cells sequentially. It PATCHes a changed existing line when the user has `update`, and POSTs a missing non-zero line when the user has `create`. A zero in a missing cell creates nothing; changing an existing cell to zero preserves a zero-valued line. No bulk transaction spans the whole grid, so an error after earlier requests can leave those earlier cells saved. Refresh, correct the reported cell, and save again.

Ordinary line writes preserve the Agency business status. The API can soft-delete individual lines, but the current grid offers no line-delete action. Deleting an editable header soft-deletes that header and all its active lines atomically.

A header's fiscal year cannot change while any active forecast line exists. The server validates the destination current fiscal year and refuses the move; it does not silently hide old-year lines. Choose the correct year before entering the breakdown.

## Lifecycle and completion

Agency read-only/terminal status, completion evidence, and protected runtime work determine whether a forecast can be edited. Business status is not inferred from fixed names such as `inprogress` or `approved`.

Completion requires Contributor access and the exact forecast assignment, a writable header, no prior completion, and at least one active line across any version. An active workflow blocks it. Completion records the user and optional comment and atomically starts the configured approval-submission workflow, or records `no_workflow`. The hook runs after commit.

The action covers the entire forecast header, not just the version in the URL. It does not clone a version or require every visible monthly coordinate to have a line. At its positive terminus, this forecast becomes active and other active forecasts for the same Agreement and fiscal-year identity become inactive. Without an approval workflow that happens immediately; with one it waits for success.

## Approval and replacement example

Publish an approval-submission workflow for `fundingcaseforecast` to require review or approval at Completion. Include its published template or plan; a template alone does not wire the route. Follow the materialized steps in the shared Workflow section. Standard workflows are explicitly selected and do not replace Completion.

For example, retain the active forecast while a replacement header is prepared. Enter and save the replacement's monthly lines, complete it, then finish its approval workflow. Success switches the active header for that Agreement/year; failed or cancelled work does not activate the replacement. Because the application permits multiple inactive headers, identify the intended header carefully rather than treating every displayed version as an independent approved forecast.

See [Approvals and completions](../concepts/approvals-completions.md) and [Workflows](../concepts/workflows.md).

## Recovery

- Completion cannot be repeated or undone from this page. Create a replacement forecast only after checking for an existing header for that fiscal year.
- Locked forecasts cannot be edited or deleted through these routes. Editable deletion is logical rather than physical.
- If the fiscal-year picker is empty, add active lines to the agreement's current [Budget](budget.md); a year with no current budget lines is not offered by the UI even though the server validates the fiscal-year row itself.
- If a budget amendment replaces current rows while preserving stable lineage, the forecast follows matching stable fiscal-year and line identities. A deleted or unmatched current line disappears from the editable grid.
