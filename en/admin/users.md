# Users

Open **Users** to create or update application profiles and assign job roles. Assign people to specific records through the record's Assigned users tab or [Assignment management](./assignments.md).

## User list

Use search and pagination to find a user. The page also shows summary counts. With global `user` Viewer permission, you see all active users. With agency-scoped permission, you see your own account and users whose active roles are all in agencies you can read. Deleted users are excluded from ordinary lists.

The table shows the avatar, name, email, and available actions. To create a user, you need Contributor permission for `user`. To update a user, you need Contributor permission covering every active role assigned to that person. To delete a user, you need Manager permission covering all those roles. If the person has a global role, you need global access. You may be able to view a user without being able to edit them.

Deleting a user removes their active role assignments but keeps audit history and references from business records. Their record assignments remain visible as inactive or ineligible. Ask an assignment coordinator to replace the user on records that still allow assignment changes.

## User detail

The detail page contains:

- General, with name, email, email-verification state, image, and timestamps.
- Assignments, with the user's active job roles.

The page header shows the name, email, avatar, and verified/unverified state. Editing a name or email does not change role assignments. Proponent access is not a setting on the user profile.

Email addresses are validated and normalized to lowercase on create and update. For example, `Analyst@Example.org` is stored as `analyst@example.org`; changing letter case does not create a second identity. A duplicate active address is rejected.

## Assigning roles

Open **Assignments** and select **Assign role**. The picker shows active roles you are allowed to assign to this user. Labels include global, agency, or program context to distinguish duplicate role names.

| Rule | Behaviour |
| --- | --- |
| User must be active | A deleted user cannot receive a role. |
| Role must be active | A deleted role cannot be assigned. |
| Global role | Requires global Contributor access for `user`. |
| Agency or program role | Requires Contributor access covering the role's agency. |
| User already has the role | Keeps the existing assignment without creating a duplicate. |

Removing a role ends the active assignment but keeps its history. The updated role assignments apply to the next request. Reload the page or sign in again if the visible buttons and menus still reflect the old permissions.

## Exact work assignments

A user may be assigned to individual Proponents, Agreements, reviews, recommendations, claims, reconciliations, payments, forecasts, monitors, amendments, or commitments. These direct record assignments are separate from job roles and do not appear on the user detail page.

A direct assignment identifies the specific record the user can work on. The user also needs role permission for that type of work at the record's current global, agency, or program scope. Viewer allows reading. Contributor or Manager is needed to make changes. Assignment managers add or remove users through the entity's Assigned users tab or the dedicated management page.

For example, assigning an officer a Program A Contributor role establishes what they may do in Program A. Adding the officer to an Agreement's **Assigned users** list identifies which saved Agreement they will handle. If a claim has its own assignment list, assignment to the Agreement alone does not assign that claim. Check the assignment required by the particular record.

## Activating a credential user

Creating a user profile does not create a password account. A globally authorized user administrator can activate an active, unverified profile that has no account by setting its initial credential password. A verified profile or an account managed by another provider is rejected rather than overwritten.

Activation saves the password account and marks the email verified together. The application stores a password hash and does not return or record the plain password in the audit trail. Communicate it through an approved channel and follow the organization's credential policy.

## Security audit trail

The [Audit page](./audit.md) records successful security changes to roles and users as part of the same save. These events cover:

- Role creation, profile changes, deletion, and permission changes.
- User creation, profile changes, deletion, and activation.
- Role assignment to a user and removal of that assignment.

Each event identifies who made the change, the type of action, the affected role or user ID, the time, and non-sensitive details. It excludes names, email addresses, images, credentials, tokens, and password hashes. These events cannot be edited or deleted through ordinary database operations. Changes to a record's assigned-user list are saved and tracked separately.

## Root user handling

Root is an ordinary user with an explicit global role assignment. It has no authorization bypass. Limit its role permissions and assignment-management capabilities to what is needed. Use scoped roles for routine administration and direct assignments for saved casework.

## Troubleshooting access

If a user cannot see or change a record:

1. Confirm that the user, role assignment, role, parent agency, and linked programs are active.
2. Confirm that the role covers the required global, Agency, or Program scope.
3. Check the permission level for the type of work and the agency or program that currently owns the record.
4. For saved work that requires assignment, find the record whose assignment list controls access. Confirm that the user is on that list and that the record's status allows the action.
5. For roster administration, check the separate `manage_assignments` capability.
6. For an approval or review action, check the separate workflow assignment.
7. Reload or sign in again if the buttons and menus show old permissions. The application always rechecks current permissions when you save.

![User assignments tab](/screenshots/en/user-assignments.png)

_The Assignments tab lists job roles. Use a record's Assigned users tab to assign work on that record._
