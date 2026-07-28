# Outcome Cost Allocation

Outcome Cost Allocation distributes an agreement's program funding across referenced outcomes and uses stream mappings to generate commitment and payment lines.

## Stream mappings

For each enabled commitment type, map an outcome and stream budget to an active stream commitment. Every positive allocation must have a valid mapping for its fiscal year. Review mappings before changing them on a stream with active agreements.

## Allocation versions

An agreement can have a draft, one active version, and inactive history. Allocate each outcome/fiscal-year coordinate by amount or percentage. Values must be non-negative, have no more than four decimal places, and cannot exceed `900,719,925,474.0991`. Percentage values resolve against that fiscal year's program funding and cent rounding is balanced deterministically.

Completion requires the resolved allocations to cover the full agreement program-funding basis exactly and rejects stale outcomes, budget years, or mappings. Completing a draft makes it active and demotes the previous active version. It snapshots bilingual labels, each resolved amount and fiscal-year funding basis, the total funding basis, and the stream-commitment coordinates, preserving the historical version and the amount inputs used to complete it. Later commitment generation still reloads the current budgets, outcomes, mappings, and active commitments. Current validation issues in any of those records can therefore block generation or regeneration even though the completed allocation snapshot remains unchanged.

## Managed commitments and payments

For enabled types, the extension replaces commitment creation. Generated commitment lines retain allocation-version and outcome provenance. Payment creation then splits the requested amount across matching generated lines, respects their remaining balances, and uses the generating version even after a newer allocation version becomes active.

The extension protects managed records throughout their lifecycle. It blocks configuration disablement after generated commitment provenance exists, guards agreement stream changes, and vetoes payment or payment-line mutations that would break generated coverage. It also blocks deletion of an agreement when allocation history or generated commitment provenance exists. A denied payment is excluded from coverage, but reactivation is rejected when restoring it would exceed a commitment line. These checks also apply to host mutations outside the extension UI.

## Concurrency and history

Allocation completion, commitment regeneration, configuration changes, agreement moves, and payment mutations use one global transaction order: lock the caller’s authorization graph; acquire agency then stream lifecycle locks; lock the current stream row; take the extension agreement lock; lock and re-resolve the agreement row; freshly authorize the current entity; then lock dependent budget, outcome, allocation, commitment, and payment rows in stable id order. Scope changes fail before allocation data is written. Current configuration and authorization are re-read under these locks, preventing stale authorization, stream moves, or concurrent writes from bypassing rules. Draft changes are mutable; completed versions and generated provenance form the audit history.

See [Agreement Commitments](../agreements/commitments.md) and [Agreement Payments](../agreements/payments.md).
