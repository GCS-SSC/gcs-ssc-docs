# Assignment management

Use **Assignment Management** to add officers to records, choose a primary assigned user, or replace someone who can no longer handle the work. A roster is a record's list of assigned users. Authorized coordinators can update this list without access to the record's contents.

To open the page from the sidebar, you need an active `manage_assignments` permission for Agreement, Proponent, Intake, Journal Voucher, or Correction work. If you have only Accounts Receivable assignment-management permission, open `/assignment-management` directly. That permission is accepted, but does not display the sidebar entry.

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

Other records need separate assignment-management permissions:

- Intakes need Funding Case permission, `funding_case`.
- Journal Vouchers need Journal Voucher permission, `journal_voucher`.
- Corrections need Correction permission, `correction`.
- Accounts Receivable, adjustments, and Credit Memos need Account Receivable permission, `account_receivable`.

Reviews, recommendations, and Data Collections use the permission for the record that owns the task. Agreement assignment-management permission does not cover these separate financial subjects.

For example, a coordinator with Agreement assignment-management permission for Program A can maintain the assigned-user lists covered by that permission in Program A. This does not let the coordinator read an Agreement's budget or documents, and does not cover Program B.

A global permission covers that type of work everywhere. An agency permission covers records owned by that agency. A program-scoped Agreement permission covers records in the selected program. For reviews and recommendations, check the source record's owner. Access to a related review or recommendation does not grant access to the task.

## Find a roster

Search by the record's reference, English or French label, or status value. Use the entity-type filter to narrow the list. Results show 20 rows per page by default.

Records in a final status can appear so coordinators can identify historical assignment problems, but their roster cannot be changed. Check each row's status before changing assignments. The page summary counts all records you are authorized to find, including those you cannot change.

## Open and assess the roster

Select a row to open Assigned users. The list retains active assignments even when the person is now inactive or has lost the Contributor permission needed for the work. This preserves history and makes an ineligible primary visible instead of silently replacing it.

An eligible assignee must:

1. Be an active application user.
2. Have Contributor or Manager permission for that type of work at the record's current global, agency, or program scope.

Viewer is not enough to be added to this list. Being assigned to another record does not make a person eligible here.

A Proponent profile is shared across Agencies. A person with global Proponent Contributor access or Proponent Contributor access in any active Agency can be assigned to that profile. A review or recommendation linked to the Proponent can have its own owning Agency. For that task, the person's permission must cover the task's Agency. Changing the Proponent's lead Agency does not move the task's ownership.

The user picker and the save use the same eligibility rules. If an offered user is rejected when you save, reload the roster and check whether their account or role permissions changed.

## Change the roster

| Action | Required condition |
| --- | --- |
| Add user | The person is active, eligible, and not already actively assigned. |
| Make primary | The person is already actively assigned and eligible. The previous primary remains assigned but is no longer primary. |
| Remove user | The person is not primary, and at least one active assignment remains. |

To change the list, you need current assignment-management permission and a record status that allows assignment changes. The application rechecks permissions when you save and prevents simultaneous changes from bypassing the rules. A saved roster must have at least one active assigned user and exactly one primary.

For example, if the primary officer leaves the team, add an eligible replacement, make the replacement primary, then remove the former officer. You cannot remove the current primary first. If the primary becomes ineligible, follow the same sequence with another eligible user. You cannot override a final status through the page or API. Keep that record's historical roster.

## When you can change assignments

| Entity | Conditions for roster changes |
| --- | --- |
| Proponent | Active, non-deleted profile. |
| Agreement and related records, including amendment and Closeout | The record uses an active Agency status that is neither read-only nor final. The record has no completion evidence. |
| Review, recommendation, or Data Collection | The task is `active` or `paused`, with no completion evidence. |

The record and its parent must also allow the change. You still need assignment-management permission, even when the status allows roster changes. A custom "In review" status can allow changes or be read-only, depending on its configuration.

## Entity-level access

You can also open the same roster in the **Assigned users** tab on Proponent and Agreement pages you can access. Users who can access the record with Viewer permission can read that tab, but roster actions still require `manage_assignments`. Business Contributor or Manager access alone cannot administer assignments.

For the full two-key authorization model, see [Role permissions and exact assignments](../concepts/rbac.md).

Data Collections have their own roster and use the permissions for the record that owns them. Active group-owned reviews, recommendations, and collections may have no assigned person until a member claims the task. A claim preserves existing assignments and the primary user. It does not give permission to manage assignments. During approval or in a final status, you cannot edit responses or assignments.
