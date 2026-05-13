# Agreement Commitments

Commitments group commitment lines and establish the approved commitment balances that payments consume. Commitment records have a tab summary and a detail page.

## Empty installation setup

| Configuration | Why it matters |
| --- | --- |
| Agreement budget | Commitment line totals cannot exceed the agreement's program funding total. |
| Stream commitments | Each commitment line references a transfer payment stream commitment and its financial coding. |
| Approval template for `fundingcaseagreementcommitment` | Required if commitment completion should route for approval. The template must be scoped to the transfer payment stream. |
| Agreement update permission | Required to create/edit commitments, lines, completion, and routing-slip management where applicable. |

## Tab flow

The Commitments tab summarizes each commitment, its line count, and its total line amount.

Creating a commitment starts with a commitment type. New commitments are created in draft status, without a financial system number, and without a parent amount. Extension actions may add agency-specific creation choices when configured.

Commitment types are `commitment`, `paye`, `paye2`, and `pyp`.

## Detail page

The commitment detail page combines the agreement context, commitment profile, recipient context, commitment lines, completion section, and approval section. Users manage the financial coding through commitment lines and then complete the record when it is ready for review.

## Commitment lines

| Field | Rule |
| --- | --- |
| Commitment | Set by the current commitment detail page. |
| Commitment line number | Required integer from 1 to 32767. |
| Stream commitment | Required and must belong to the agreement's stream. |
| Amount | Required money value. |

The detail table displays fiscal year, financial coding, and amount. Coding comes from the selected stream commitment: fund, GL, GL description, fund centre, internal order, functional area, and cost centre.

## Business rules

| Rule | Behaviour |
| --- | --- |
| Locked statuses block edits | `complete`, `pendingapproval`, `approved`, and `denied` commitments cannot be edited or have lines changed. |
| Editing moves status forward | Line and commitment edits sync editable commitments to `inprogress` unless already in approval statuses. |
| Stream commitment must match the agreement stream | Users can only save stream commitments that belong to the agreement's stream. |
| Commitment line cannot drop below already-paid amount | Once payments have consumed a commitment line, the line cannot be reduced below the amount already paid or in payment workflows. |
| Commitment total cannot exceed agreement program funding | The total of commitment lines cannot exceed the agreement's available program funding. |
| Completion requires at least one line | Completing an empty commitment returns an invalid status error. |
| Approval activates one commitment of each type | When approval succeeds, the approved commitment becomes active and previous active commitments for the same agreement/type are deactivated. |

## Completion and approval

Completion entity type: `fundingcaseagreementcommitment`.

Completing a commitment creates a common completion record. If a valid stream-scoped approval template exists, the commitment is set to `pendingapproval` and the approval chain is materialized. If no approval template is configured, completion sets the commitment to `complete`.

The approval section appears when status is `pendingapproval`, `approved`, or `denied`. Approval actions update the common routing slip and move the commitment to `approved`, `denied`, or keep it `pendingapproval`.

## Downstream dependencies

Payments can only be created against an active approved commitment of the selected commitment type. Payment lines then select commitment lines from the payment's approved commitment and matching fiscal year.
