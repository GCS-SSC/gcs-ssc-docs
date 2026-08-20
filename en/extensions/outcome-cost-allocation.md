# Outcome Cost Allocation

Outcome Cost Allocation distributes an agreement's program funding across referenced outcomes and uses stream mappings to generate commitment and payment lines.

The extension must be installed, enabled for the agreement's agency, and enabled and configured on its stream. Its agreement tab and replacement **Add commitment** action require `agreement:update`; the allocation read endpoint requires the scoped `agreement:read` role ceiling, allocation and version writes require exact assignment plus `agreement:update`, and draft deletion requires exact assignment plus `agreement:delete`. The host resolves the exact agreement entity and applies those rules before dispatch. Write routes also require the host's fresh-authorization transaction callback.

## Stream mappings

Open the stream's extension configuration and add associations between a commitment type (`commitment`, `paye`, `paye2`, or `pyp`), a stream commitment line, and an outcome. The selected commitment supplies its stream-budget/fiscal-year coordinate. The editor obtains outcomes, budgets, and active commitments through the host API; without transfer-payment context it displays an error, and the add action is unavailable when there are no outcomes or commitments. Removing the last mapping for a type disables that type automatically.

Every positive allocation must have a valid mapping for its fiscal year. Mappings must refer to the current stream, a live outcome belonging to the transfer payment, an active stream budget and fiscal year, and an active stream commitment with the same budget. Duplicate coordinates are rejected. Review mappings before changing them on a stream with active agreements: current configuration is revalidated when an allocation is completed or a commitment is generated.

## Allocation versions

Open **Cost Allocation** on an agreement. Create a draft, generate rows for one enabled commitment type and one or more funded fiscal years, then allocate each configured outcome/fiscal-year coordinate by amount or percentage. Generating rows reconciles that selected type/year set with current mappings and asks before removing obsolete draft rows. Save persists the whole selected draft; active and inactive versions are read-only. Only one non-deleted draft and one active version may exist per agreement, and only a draft can be soft-deleted.

Values must be non-negative, have no more than four decimal places, and cannot exceed `900,719,925,474.0991`. Percentages are limited to 100 per row. Within a fiscal year and commitment type, do not mix amount and percentage methods: amount rows must total that year's program funding, while percentage rows must total 100. Percentage values resolve against that fiscal year's program funding and cent rounding is balanced deterministically by stable allocation coordinate. Across the version, resolved amounts must cover the full agreement program-funding basis exactly.

Completion requires the resolved allocations to cover the full agreement program-funding basis exactly and rejects stale outcomes, budget years, or mappings. Completing a draft makes it active and demotes the previous active version. It snapshots bilingual labels, each resolved amount and fiscal-year funding basis, the total funding basis, and the stream-commitment coordinates, preserving the historical version and the amount inputs used to complete it. Later commitment generation still reloads the current budgets, outcomes, mappings, and active commitments. Current validation issues in any of those records can therefore block generation or regeneration even though the completed allocation snapshot remains unchanged.

## Managed commitments and payments

For enabled types, the extension replaces the host commitment-create action. Choose a type in the extension modal. Generation requires an active allocation version and valid current mappings; it creates an in-progress commitment with one line per positive resolved allocation and stores the allocation version, outcome, fiscal year, stream commitment, and generated amount as immutable provenance. Unsupported or unconfigured types continue through the ordinary host creation path.

The extension's payment post-create hook applies only when a new host payment targets one of those generated commitments with a fiscal year and positive amount. It splits the requested amount proportionally across matching generated lines, balances cents deterministically, respects each line's remaining non-denied coverage, inserts the payment lines, and advances a matching draft payment to in progress. It uses the commitment's generating version even after a newer allocation version becomes active. Missing/unmanaged inputs continue through the ordinary host path; invalid precision, no matching capacity, or an amount above remaining coverage returns a localized extension error and rolls back the host transaction.

The extension protects managed records throughout their lifecycle. It blocks configuration disablement after generated commitment provenance exists, guards agreement stream changes, and vetoes payment or payment-line mutations that would break generated coverage. It also blocks deletion of an agreement when allocation history or generated commitment provenance exists. A denied payment is excluded from coverage, but reactivation is rejected when restoring it would exceed a commitment line. These checks also apply to host mutations outside the extension UI.

## Concurrency and history

Allocation completion, commitment regeneration, configuration changes, agreement moves, and payment mutations use one global transaction order: lock the caller’s authorization graph; acquire agency then stream lifecycle locks; lock the current stream row; take the extension agreement lock; lock and re-resolve the agreement row; freshly authorize the current entity; then lock dependent budget, outcome, allocation, commitment, and payment rows in stable id order. Scope changes fail before allocation data is written. Current configuration and authorization are re-read under these locks, preventing stale authorization, stream moves, or concurrent writes from bypassing rules. Draft changes are mutable; completed versions and generated provenance form the audit history.

## API, data, and operations

The host exposes these extension routes under its dynamic extension API prefix:

| Method and extension route | Contract |
| --- | --- |
| `GET /agreements/{agreementId}/allocations` | Returns current outcomes, current agreement budget years, all allocation versions and saved rows, and current stream commitments. |
| `PUT /agreements/{agreementId}/allocations` | Replaces the rows of one draft version after localized schema, scope, ownership, and draft-state validation. |
| `POST /agreements/{agreementId}/allocation-versions` | Creates the next numbered draft; fails when a live draft already exists. |
| `POST /agreements/{agreementId}/allocation-versions/{allocationVersionId}/complete` | Saves submitted rows and completes that draft atomically against current configuration. |
| `DELETE /agreements/{agreementId}/allocation-versions/{allocationVersionId}` | Soft-deletes a draft and its rows; completed history cannot be deleted. |

Three ordered migrations own version, allocation, and generated-commitment-provenance tables in the `extensions` schema. Foreign keys use restrictive deletion; partial unique indexes enforce version numbers, one active version, one draft, one coordinate per version, and one provenance row per commitment line. Numeric columns use `numeric(19,4)` for input values and `numeric(19,2)` for resolved/funding/generated amounts. PostgreSQL functions and triggers enforce draft-only creation/deletion, legal status transitions, immutable completed snapshots and provenance, exact payment coordinates/totals, and the extension lifecycle lock. PGlite has compatibility branches for lock detection; independent-session serialization is verified only by the opt-in PostgreSQL suite.

No extension KV data, encrypted secrets, worker assets, scheduler, queue, or external network service is used. Enabling the extension applies its migrations through the host. Disabling an agency or stream is refused once generated commitment provenance exists. Uninstall/down migration is also refused while generated provenance or completed allocation history remains. Operators should back up the core database together with the `extensions` schema and run the owning unit/typecheck suites; the PostgreSQL concurrency suite requires a disposable database whose name ends in `_test` and replaces its fixture schema and host tables.

See [Agreement Commitments](../agreements/commitments.md) and [Agreement Payments](../agreements/payments.md).
