# Automated Payments

The Automated Payments extension adds a calculator to agreement payment creation. It suggests a Canadian-dollar payment amount and enforces the same calculated ceiling when the payment is saved.

## Configure the stream

Enable the extension for the agency and stream, then choose whether the calculator applies to `reimbursement`, `advance`, or both payment types. The agreement must still have an active approved commitment of the selected type and a valid budget fiscal year.

## Calculation inputs

The calculation uses the selected commitment type, fiscal year, payment type, and fiscal period together with:

- reconciled claim amounts through the last eligible claim month;
- active forecasts through that claim month and through the selected period end;
- previous eligible payments;
- the remaining balance of approved commitment lines for the fiscal year and type;
- agreement program funding and the available disbursement balance; and
- the agreement holdback percentage and basis (`agreement-total` or `final-fiscal-year`).

For reimbursements, the base is eligible claims less payments to date. For advances, the base also replaces forecasts through the last claim month with actual claims and includes forecasts through the selected period. The ceiling is the lowest non-negative value among the base, remaining commitment, and amount available after holdback.

## Holdback release

The calculator shows the holdback and lets an authorized user request a release. A release is capped at the unreleased holdback and is recorded in extension metadata on the payment. Previous releases are included in later calculations.

## Recalculation and save protection

Changing a calculation input clears the previous result. Recalculate before saving. The server recalculates inside the create transaction and rejects a submitted amount above the current ceiling, so a stale browser result cannot bypass the rule.

See [Agreement Payments](../agreements/payments.md) for the core payment lifecycle.
