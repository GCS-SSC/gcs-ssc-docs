# Assignment Management

Assignment Management lets authorized coordinators maintain exact work rosters without receiving access to the underlying business records. The sidebar entry appears when the signed-in user has at least one active `manage_assignments` grant for Agreements or Proponents.

## What the page reveals

The list is a deliberately minimized projection. It contains:

- entity type, status, stable reference, and bilingual display label;
- owning agency and, where applicable, program;
- the primary assigned user's name;
- active-assignee count and whether the current primary is still eligible.

It does not return profile fields, personal information, financial details, documents, workflow packets, or child data. `manage_assignments` also does not make the coordinator an assigned user.

## Scope and entity types

The page combines every active management grant and returns only matching entities:

| Managed subject | Entity types |
| --- | --- |
| Proponent | Proponents |
| Agreement | Agreements, reviews and recommendations owned through an Agreement, claims, claim reconciliations, payments, forecasts, monitors, amendments, and commitments |

A global grant covers that subject globally. An agency grant covers records owned by that agency. A program-scoped Agreement grant covers records in the selected program. Runtime reviews and recommendations resolve their owner from the source entity rather than inheriting access from a neighbouring runtime item.

## Find a roster

Search matches the stable reference, either localized label, or raw status. The entity-type filter accepts one of the eleven assignable types. Results are paginated at 20 rows by default.

Terminal records can appear so coordinators can identify historical roster problems, but their roster cannot be changed. Use the displayed row status to decide whether a roster is workable; the hero reports the total authorized records only.

## Open and assess the roster

Select a row to open Assigned users. The roster includes active assignment rows even when an assigned user is now inactive or no longer has a Contributor ceiling. This preserves history and makes an ineligible primary visible instead of silently replacing it.

An eligible assignee must:

1. be an active application user; and
2. have Contributor or Manager permission for the owning Agreement or Proponent subject at the entity's current global, agency, or program scope.

Viewer is insufficient. An exact assignment elsewhere is irrelevant to eligibility for this roster.

## Change the roster

| Action | Server rule |
| --- | --- |
| Add user | Target is active and eligible, and no active duplicate exists. |
| Make primary | Target is already actively assigned and eligible; the current primary is demoted in the same transaction. |
| Remove user | Target is not primary and removal leaves at least one active assignment. |

All mutations require a current management grant and a roster-mutable status. The server locks the target and current assignments, rebuilds authorization, and then applies the change. Database triggers require at least one active assignee and exactly one primary when the transaction commits.

If the primary becomes ineligible, add or choose another eligible user and make that user primary before removing the old assignment. A locked terminal record has no UI or API override; preserve its historical roster.

## Workable status policy

| Entity | Roster can change while status is |
| --- | --- |
| Proponent | `draft`, `active` |
| Agreement | `draft`, `pendingapproval`, `active` |
| Recommendation or amendment | `draft` |
| Claim | `draft`, `inprogress`, `inreview`, `submitted`, `reviewed`, `active`, `complete` |
| Review, claim reconciliation, payment, forecast, monitor, commitment | `draft`, `inprogress`, `inreview`, `submitted`, `reviewed`, `active` |

## Entity-level access

Accessible Proponent and Agreement pages expose the same roster as an **Assigned users** tab. Users with the Viewer ceiling can read that tab, but roster actions still require `manage_assignments`. Business Contributor or Manager access alone cannot administer assignments.

For the full two-key authorization model, see [Role permissions and exact assignments](../concepts/rbac.md).
