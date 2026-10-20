# Agreement assigned users

The **Assigned users** tab lists the people responsible for this agreement. An assignment applies to this agreement only. Each person also needs the appropriate role for the agreement's agency or program. Adding a person does not grant that role.

## Required access

Reading the roster requires either:

- Viewer or higher access to agreements in the agreement's current agency or program; or
- the `manage_assignments` permission for agreements at that scope.

Adding users, changing the primary user, and removing users require `manage_assignments`. A Contributor or Manager role does not grant this permission. This permission alone lets you manage assignments but does not let you read the agreement or its related records.

## Roster rules

Every active agreement must have at least one assigned user and exactly one primary user. The primary user leads the work and has the same access rules as other assigned users. Reading requires Viewer or higher access. Editing requires Contributor or higher access **and** assignment to this agreement; deletion requires Manager access and assignment.

For example, an officer with Contributor access to the program can read an agreement but cannot edit it until assigned to that agreement. Making the officer primary changes who leads the work, rather than granting extra permissions.

The roster remains readable when an existing user becomes inactive or loses Contributor eligibility. You can identify and replace an ineligible primary user. Role changes do not change assignment history.

## Add an assigned user

1. Open **Assigned users** on the agreement.
2. Select **Add user** and search for the colleague who will work on it.
3. Choose an eligible user and save the assignment.

The colleague must be active and have Contributor or Manager access for `agreement`, either globally or for the agreement's current agency or program. If a name is unavailable, ask the access administrator to check the user's status and role. The application rejects inactive users, Viewer-only users, users outside that scope, and duplicate active assignments.

The new user is non-primary. An assignment to one agreement does not affect another agreement in the same program.

## Change the primary user

Choose **Make primary** on an active eligible assignment. Saving makes that user primary and removes the primary designation from the previous user in the same operation. The new primary must have an active, eligible assignment.

If the current primary is ineligible, first add or identify an eligible replacement, promote the replacement, and then remove the old assignment if appropriate.

## Remove an assigned user

A non-primary user can be removed while at least one active assignment remains. The server refuses removal of the primary and of the last assigned user. Removing an assignment preserves its history.

## Status and scope changes

You can change assigned users only when the agreement's Agency status allows editing and other protections on the agreement and its related records permit the change. Read-only or terminal statuses block roster changes. The application rechecks the agreement's owner, permissions, user eligibility, and existing assignments when you save.

If a reassignment is refused, reload the agreement and check its status before retrying. A colleague's role or account status may also have changed since you opened the list.

Moving ownership or program scope changes later authorization and eligibility checks. Review the roster when the scope changes; an existing assignment remains visible even if the user no longer qualifies at the new scope.

## Independently assigned child work

An agreement assignment does not automatically assign you to its claims, claim reconciliations, payments, forecasts, monitors, amendments, commitments, reviews, or recommendations. These records have their own assigned users. To create one of these records, you need the applicable Contributor role and the required assignment to its parent record. You become the new record's primary user. To edit it later, you need assignment to that record.

For example, when a colleague creates a payment, that colleague becomes its primary user. To take over the payment, arrange an assignment on the payment itself. Adding yourself only to the agreement's roster does not provide that payment assignment.

Reviews, recommendations, and Data Collections created during workflow execution follow the responsible person or group recorded for that work. Group work can be waiting to be claimed without any individual assigned yet.

Addresses, proponents, activities, budget lines, and agreement documents use the agreement's assigned users.

To manage assignments across records, use [Assignment Management](../admin/assignments.md). For the authorization model, see [Role permissions and exact assignments](../concepts/rbac.md).

Data Collections have their own assigned users, and access is checked through the file they come from. Claiming group-owned review, recommendation, or collection work preserves any existing assigned users and primary user. Claiming work does not give permission to manage its roster. During approval or a terminal state, you cannot change responses or assigned users.
