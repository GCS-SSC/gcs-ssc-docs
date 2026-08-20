# Proponent assigned users

The **Assigned users** tab shows the exact work roster for one saved Proponent. It allocates that profile to users who already have a sufficient Proponent role ceiling at the lead agency; it does not create permission by itself.

## Required access

Reading the roster requires either:

- Viewer or higher for `applicant_recipient` at the Proponent's current lead-agency scope; or
- `applicant_recipient` `manage_assignments` at that scope.

Adding, promoting, or removing users requires `manage_assignments`. Contributor or Manager business access does not imply roster management, and `manage_assignments` alone does not reveal the Proponent profile.

## Roster rules

Every active Proponent must have at least one active assignment and exactly one primary. The primary user is the work lead, not a more privileged member. An assigned user still needs the Viewer role ceiling to read and the two-key rule to change the profile.

The roster remains readable when an existing user becomes inactive or loses Contributor eligibility. This makes an ineligible primary visible for correction; role changes do not silently rewrite assignment history.

## Add an assigned user

Select **Add user** and search the eligible users. A candidate must be active and have Contributor or Manager for `applicant_recipient` globally or at this Proponent's lead agency. The server rejects inactive users, Viewer-only users, out-of-scope users, active duplicates, unknown fields, and malformed identifiers.

The new user is non-primary. Adding the same person to another Proponent creates a separate exact assignment and does not connect the records.

## Change the primary user

Choose **Make primary** on an active eligible assignment. The operation promotes that user and demotes the previous primary atomically. It cannot promote an inactive, ineligible, missing, or removed assignment.

If the current primary is ineligible, first add or identify an eligible replacement, promote the replacement, and then remove the old assignment if appropriate.

## Remove an assigned user

A non-primary user can be removed while at least one active assignment remains. The server refuses removal of the primary and of the last assigned user. Removal is a soft delete and does not erase historical references.

## Status and scope changes

The roster can change only while the Proponent is `draft` or `active`. A terminal or deleted profile is locked. Every write reloads the lead agency, role graph, user eligibility, status, and current roster inside one transaction, so a stale page cannot preserve access after a concurrent change.

Changing the Proponent's lead agency changes the scope used by later authorization and eligibility checks. Review the roster and permissions as part of that change; an existing assignment can remain visible even when its user no longer qualifies at the new agency.

## Boundaries

- A Proponent assignment does not grant access to another Proponent, a linked Agreement, an independently assigned review or recommendation, an agency, or a program.
- It does not create top-level Proponent permission. Creation requires a Contributor role ceiling at the selected lead agency and makes the creator primary in the creation transaction.
- Approval and reviewer assignments remain separate workflow responsibilities.

For cross-entity coordination, use [Assignment Management](../admin/assignments.md). For the authorization model, see [Role permissions and exact assignments](../concepts/rbac.md).
