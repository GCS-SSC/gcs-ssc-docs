# Agreement assigned users

The **Assigned users** tab lists the people responsible for work on this particular agreement. This list is also called its roster. An assignment applies to this agreement only. Each person still needs the appropriate role for the agreement’s agency or program; adding a name to the list does not grant that role.

## Required access

Reading the roster requires either:

- Viewer or higher for `agreement` at the Agreement's current scope; or
- `agreement` `manage_assignments` at that scope.

Adding, promoting, or removing users requires `manage_assignments`. Contributor or Manager business access does not imply roster management, and `manage_assignments` alone exposes no Agreement, financial, document, or workflow content.

## Roster rules

Every active agreement must have at least one assigned user and exactly one primary user. The primary user leads the work and has the same access rules as other assigned users. Reading requires Viewer or higher access. Editing requires Contributor or higher access **and** assignment to this agreement; deletion requires Manager access and assignment.

For example, an officer with Contributor access to the program can read an agreement but cannot edit it until assigned to that agreement. Making the officer primary changes who leads the work, rather than granting extra permissions.

The roster remains readable when an existing user becomes inactive or loses Contributor eligibility. This makes an ineligible primary visible for correction; role changes do not silently rewrite assignment history.

## Add an assigned user

1. Open **Assigned users** on the agreement.
2. Select **Add user** and search for the colleague who will work on it.
3. Choose an eligible user and save the assignment.

The colleague must be active and have Contributor or Manager access for `agreement`, either globally or for the agreement’s current agency/program scope. If a name is unavailable, ask the access administrator to check the user’s status and role. The application rejects inactive users, Viewer-only users, users outside that scope, duplicate active assignments, unknown fields, and invalid identifiers.

The new user is non-primary. An assignment to one Agreement does not affect another Agreement in the same program.

## Change the primary user

Choose **Make primary** on an active eligible assignment. The operation promotes that user and demotes the previous primary atomically. It cannot promote an inactive, ineligible, missing, or removed assignment.

If the current primary is ineligible, first add or identify an eligible replacement, promote the replacement, and then remove the old assignment if appropriate.

## Remove an assigned user

A non-primary user can be removed while at least one active assignment remains. The server refuses removal of the primary and of the last assigned user. Removal is a soft delete and preserves historical references.

## Status and scope changes

You can change assigned users only when the agreement’s Agency status allows editing and other protections on the agreement and its related records permit the change. Read-only or terminal statuses block roster changes. The application rechecks the agreement’s owner, permissions, user eligibility, and existing assignments when you save.

If a reassignment is refused, reload the agreement and check its status before retrying. A colleague’s role or account status may also have changed since you opened the list.

Moving ownership or program scope changes later authorization and eligibility checks. Review the roster when the scope changes; an existing assignment remains visible even if the user no longer qualifies at the new scope.

## Independently assigned child work

An agreement assignment does not automatically assign you to its claims, claim reconciliations, payments, forecasts, monitors, amendments, commitments, reviews, or recommendations. These records have their own assigned users. Creating a business record with its own roster requires the applicable Contributor role and the required parent assignment; the creator becomes its primary user. Later changes require assignment to that record.

For example, when a colleague creates a payment, that colleague becomes its primary user. To take over the payment, arrange an assignment on the payment itself. Adding yourself only to the agreement’s roster does not provide that payment assignment.

Reviews, recommendations, and Data Collections created during workflow execution follow the responsible person or group recorded for that work. Group work can be waiting to be claimed without any individual assigned yet.

Ordinary child data, such as addresses, proponents, activities, budget lines, and documents, continues to use the Agreement itself as the assignment root.

For cross-entity coordination, use [Assignment Management](../admin/assignments.md). For the authorization model, see [Role permissions and exact assignments](../concepts/rbac.md).

Data Collections have their own assigned users, and access is checked through the file they come from. Claiming group-owned review, recommendation, or collection work preserves any existing assigned users and primary user. Claiming work does not give permission to manage its roster. During approval or a terminal state, you cannot change responses or assigned users.
