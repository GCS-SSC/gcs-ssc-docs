# Automated Payments

Automated Payments contributes one calculator to the core **Agreement > Payments > Add** modal. It suggests a Canadian-dollar amount, shows the calculation breakdown, and enforces the recalculated ceiling during creation. It does not create a separate agreement tab, replace the Add action, generate payment lines, update an existing payment, or advance payment status.

## Before enabling it

The package must be installed in the deployed build and enabled for the agency. Before enabling it for a stream, configure active stream holdback-basis rows whose agency language-independent codes are both:

- `agreement-total`;
- `final-fiscal-year`.

The stream activation guard refuses enablement when either code is absent, deleted, or not linked to the stream, and lists the missing codes in a bilingual error. Agency enablement alone does not run this stream guard.

In the stream **Extensions** tab, configure `enabledPaymentTypes` with `reimbursement`, `advance`, or both. A missing/malformed configuration defaults to both; an explicit empty array enables neither type. Saving an agency-level disable also turns the stream switch off, and later agency re-enablement does not restore it.

The calculator descriptor is returned only when the agency and stream switches are active and the caller has `agreement:update` for the exact agreement. If another enabled extension also contributes a payment calculator, the host reports a conflict and does not select either one.

## Use the calculator

Open **Agreement > Payments**, choose **Add**, and select a commitment type, current agreement budget fiscal year, payment type, and period start/end. The calculator appears only during creation and waits until all required fields are present. Every field or holdback-option change triggers another request; wait for the loading state to finish before saving.

The route accepts months `0` through `11`, requires period end to be at or after period start, and requires a finite amount when one is supplied. The selected fiscal-year identity must resolve through the agreement's current budget version. The exact agreement is authorized for update by the host before the extension handler runs.

The result shows the ceiling badge and an expandable breakdown. The host copies each finite `suggestedAmount` into the Amount field, sets the input maximum to the ceiling, displays an over-ceiling message, and disables Save while calculation is loading or the amount exceeds the current ceiling. A localized extension error is shown from the API details when available.

### Disabled payment-type edge case

The calculator contribution is discovered per stream, not per selected payment type. If you select a type excluded by `enabledPaymentTypes`, the current route returns an `enabled: false` result with a zero suggestion and ceiling; the component still publishes it and the host can replace Amount with `0`. The create hook does not enforce a ceiling for that disabled type. Re-select an enabled type, or restore the intended amount and use the core payment validation before saving. This current UI/route mismatch is tracked as `DOC-031`.

## What enters the calculation

All monetary outputs are rounded to two decimal places. Non-finite internal values normalize to zero. Period comparisons use fiscal-year order plus the April-to-March month index.

| Input | Included records |
| --- | --- |
| Claims | Reconciled line amounts only when the reconciliation header is `complete` or `approved`, through the latest claim period not after the selected end. |
| Forecasts | Lines from active forecast headers, through the latest claim period and through the selected end as required by the formula. |
| Previous payments | Payment amounts in every non-denied state (`draft` through `paid`) through the selected period. Denied, cancelled, and deleted payments are excluded. During after-create recalculation, the new payment is excluded. |
| Commitment remaining | Active, `approved` commitments of the selected type and fiscal year, using their lines less non-denied payment lines already charged to them. A merely `complete` commitment does not qualify. |
| Budget | Agreement program-funding lines, the final fiscal year's total, and future-fiscal-year funding. The budget-total query uses active rows but does not explicitly restrict the fiscal-year rows to the current budget version, unlike the period joins; operators should avoid ambiguous duplicate budget lineage. |
| Holdback | The agreement percentage and the semantic code reached through its active stream/agency holdback basis. Any code other than the two supported values fails closed. |
| Earlier releases | Extension KV metadata on earlier non-denied payments through the selected period. |

For a reimbursement:

`base = reconciled claims through last claim month - payments to date`

For an advance:

`base = claims through last claim month - forecasts through that month + forecasts through selected period end - payments to date`

With no eligible claim, the advance uses forecasts through the selected period and the reimbursement base is zero before payments. Negative bases are clamped to zero.

The available amount before holdback is claims plus unclaimed forecast in the selected fiscal year plus future-year budget, less payments and the configured holdback. The ceiling is the lowest non-negative value among:

- the positive base;
- remaining approved commitment;
- availability before holdback plus an allowed release.

This is a ceiling, not proof that the payment is otherwise eligible. Core payment schema, commitment resolution, budget, lifecycle, approval, and Team/RBAC rules still apply.

## Holdback release and provenance

Select **Release holdback** and enter a non-negative amount. The requested release is capped at the remaining holdback (`calculated holdback - releases already recorded`, never below zero). Turning the option off normalizes its amount to zero.

The before-create hook recalculates inside the core payment transaction and rejects a submitted amount above the current ceiling when the payment type is enabled. After the core record is created, the hook recalculates while excluding that new payment and stores `{ releaseHoldback, holdbackReleaseAmount }` as `payment-metadata` in `extensions.kv_entry`, owned by `fundingcasepayment`. The stored release amount is the capped calculated amount, not an unchecked browser value. A failure rolls back with the surrounding core transaction.

The extension does not define migrations or encrypted secrets. Its configuration and per-payment metadata are non-secret JSON. Core soft deletion of a payment does not make its metadata a public record; operators should preserve extension KV with the application database in backups.

## Errors and recovery

| Symptom | Action |
| --- | --- |
| Extension cannot be enabled | Add active stream mappings for both required semantic holdback-basis codes, then retry. |
| Calculator does not appear | Verify build installation, both enablement switches, exact agreement update access, and absence of a calculator conflict. |
| Fiscal year unavailable | Select a stable fiscal-year identity from the agreement's current budget. Do not send an agency fiscal-year id directly. |
| Unsupported holdback basis | Correct the agreement to an active stream holdback basis using one of the two supported agency codes. |
| Amount exceeds ceiling | Refresh/recalculate after resolving current claims, forecasts, payments, commitment balance, and holdback; reduce the payment rather than bypassing the extension route. |
| Calculation changes while editing | Treat the last successful server result as advisory until Save; the transactional hook recalculates against current data. |

See [Agreement Payments](../agreements/payments.md) for creation, lines, completion, locking, and approval boundaries.
