# Assignment Management

Use Assignment Management to add officers to specific records, choose a primary assigned user, or replace someone who can no longer handle the work. A **roster** is the record’s list of assigned users. Authorized coordinators can maintain this list without receiving access to the business record’s contents. The sidebar entry appears when the signed-in user has an active `manage_assignments` grant for Agreement, Proponent, Intake, Journal Voucher or Correction work. The API additionally accepts Accounts Receivable management grants; an account-receivable-only manager can use `/assignment-management` directly because that subject alone does not currently expose the sidebar entry.

## What the page reveals

The list shows only the information needed to find a record and check its assignments:

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
| Agreement | Agreements, Closeouts, claims, claim reconciliations, payments, forecasts, monitors, amendments and commitments |

Intakes use `funding_case`; Journal Vouchers use `journal_voucher`; Corrections use `correction`; Accounts Receivable, adjustments and Credit Memos use `account_receivable`. Runtime reviews, recommendations and Data Collections resolve their subject through their exact source owner. A broad Agreement management grant does not replace these separate financial subjects.

For example, a coordinator with Agreement assignment-management permission for Program A can maintain the assigned-user lists covered by that permission in Program A. This does not let the coordinator read an Agreement’s budget or documents, and does not cover Program B.

A global grant covers that subject globally. An agency grant covers records owned by that agency. A program-scoped Agreement grant covers records in the selected program. Runtime reviews and recommendations resolve their owner from the source entity rather than inheriting access from a neighbouring runtime item.

## Find a roster

Search matches the stable reference, either localized label, or raw status. The entity-type filter accepts a supported assignable type. Results are paginated at 20 rows by default.

Terminal records can appear so coordinators can identify historical roster problems, but their roster cannot be changed. Use the displayed row status to decide whether a roster is workable; the hero reports the total authorized records only.

## Open and assess the roster

Select a row to open Assigned users. The list retains active assignments even when the person is now inactive or has lost the Contributor permission needed for the work. This preserves history and makes an ineligible primary visible instead of silently replacing it.

An eligible assignee must:

1. be an active application user; and
2. have Contributor or Manager permission for the owning subject at the entity's current global, agency, or program scope.

Viewer is not enough to be added to this list. Being assigned to another record does not make a person eligible here.

## Change the roster

| Action | Server rule |
| --- | --- |
| Add user | Target is active and eligible, and no active duplicate exists. |
| Make primary | Target is already actively assigned and eligible; the current primary is demoted in the same transaction. |
| Remove user | Target is not primary and removal leaves at least one active assignment. |

To change the list, you need a current assignment-management permission and the record must be in a status that allows assignment changes. The application locks the record and its assignments and rechecks permissions before saving, so competing changes cannot bypass these rules. Database checks require at least one active assigned user and exactly one primary when the change is saved.

For example, if the primary officer leaves the team, add an eligible replacement, make the replacement primary, then remove the former officer. You cannot remove the current primary first. If the primary becomes ineligible, follow the same sequence with another eligible user. A locked terminal record has no UI or API override; preserve its historical roster.

## Workable roster policy

| Entity | Conditions for roster changes |
| --- | --- |
| Proponent | Active, non-deleted profile. |
| Agreement and business children, including amendment and Closeout | An active Agency status definition that is neither read-only nor terminal, and no completion evidence on the exact target. |
| Review, recommendation or Data Collection | Runtime item is `active` or `paused`, with no completion evidence. |

These conditions supplement current permissions, ownership, exact assignment, and parent lifecycle guards. They do not grant editing rights by themselves. The display label is not the rule: a custom “In review” business status can be normal or read-only depending on its configuration.

## Entity-level access

Accessible Proponent and Agreement pages expose the same roster as an **Assigned users** tab. Users who can access the record with Viewer permission can read that tab, but roster actions still require `manage_assignments`. Business Contributor or Manager access alone cannot administer assignments.

For the full two-key authorization model, see [Role permissions and exact assignments](../concepts/rbac.md).

Data Collections have their own exact roster and resolve authority through their source owner. Active group-owned review, recommendation and collection work may start with an empty personal roster until claim. Claim preserves an existing roster and primary; it does not grant roster-management authority. During approval or terminal states, response and roster edits are frozen.
