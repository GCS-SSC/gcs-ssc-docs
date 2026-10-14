# Users

Use Users to create and maintain application profiles and assign job roles. Exact work assignments are managed on the entity or through [Assignment Management](./assignments.md); there are no direct Proponent access flags on a user.

## User list

The Users page supports search, pagination, and summary counts. A global `user` Viewer sees all active users. An agency-scoped reader sees their own account and users whose active role assignments are fully covered by the reader's allowed agencies. Deleted users are excluded from ordinary lists.

The table shows avatar, name, email, and available actions. Creating requires Contributor for `user`. Updating or deleting also requires the caller's scope to cover every active role assignment on the target; a user with a global role requires global access. Manager is required for deletion. A row can therefore be readable without being editable.

Deleting a user is a soft delete. It retires active user-role assignments without erasing historical audit or business references. Exact entity assignments remain visible as inactive or ineligible history so an assignment coordinator can identify and replace an affected primary where the roster is still workable.

## User detail

The detail page contains:

- General, with name, email, email-verification state, image, and timestamps.
- Assignments, with the user's active structural role assignments.

The page header shows the name, email, avatar, and verified/unverified state. Editing a name or email does not change role assignments. Proponent access is not a setting on the user profile.

Email addresses are validated and normalized to lowercase on create and update. For example, `Analyst@Example.org` is stored as `analyst@example.org`; changing letter case does not create a second identity. A duplicate active address is rejected.

## Assigning roles

Open Assignments and select **Assign role**. The picker loads active roles that the administrator may assign to this target. Labels include global, agency, or program context to distinguish duplicate role names.

| Rule | Behaviour |
| --- | --- |
| Target must be active | A deleted user cannot receive a role. |
| Role must be active | A deleted role cannot be assigned. |
| Global role | Requires global Contributor access for `user`. |
| Agency or program role | Requires Contributor access covering the role's agency. |
| Existing active pairing | Returns the existing assignment; no duplicate active row is created. |

Removing a role soft-deletes the assignment. The updated role assignments apply to the next request. Reload the page or sign in again if the visible buttons and menus still reflect the old permissions.

## Exact work assignments

A user may be assigned to individual Proponents, Agreements, reviews, recommendations, claims, reconciliations, payments, forecasts, monitors, amendments, or commitments. These direct record assignments are separate from job roles and do not appear on the user detail page.

A direct assignment identifies the specific record the user can work on. It must be paired with a role permission: at least Viewer for that type of work at the record’s current global, agency or program scope, and Contributor or Manager to make changes. Assignment managers add or remove users through the entity's Assigned users tab or the dedicated management page.

For example, assigning an officer a Program A Contributor role establishes what they may do in Program A. Adding the officer to an Agreement’s **Assigned users** list identifies which saved Agreement they will handle. If a claim has its own assignment list, assignment to the Agreement alone does not assign that claim. Check the assignment required by the particular record.

## Activating a credential user

Creating a user profile does not create a password account. A globally authorized user administrator can activate an active, unverified profile that has no account by setting its initial credential password. A verified profile or an account managed by another provider is rejected rather than overwritten.

The password is hashed before the credential account and verified state are written in one transaction. The raw password is not returned or included in audit metadata. Communicate it through an approved channel and follow the organization's credential policy.

## Security audit trail

Each saved role or user security change also creates an `audit.security_audit_event` as part of the same save. Current events cover role creation, profile changes, deletion and permission replacement; user creation, profile changes, deletion and activation; and user-role assignment creation or removal.

Records identify the authenticated actor, constrained event category, target type and identifier, timestamp, and non-sensitive structural metadata. They exclude names, email addresses, images, credentials, tokens, and password hashes. Database triggers reject audit-event updates and deletes. Exact entity roster changes are governed by their own assignment transaction and lifecycle evidence.

## Root user handling

Root is an ordinary user with an explicit global role assignment. It has no authorization bypass. Keep its role permissions and assignment-management capabilities narrow and auditable; use scoped roles for routine administration and exact assignments for saved casework.

## Troubleshooting access

If a user cannot see or change a resource:

1. Confirm that the user, role assignment, role, parent agency, and linked programs are active.
2. Confirm that the role structure matches global, agency, or program scope.
3. Check the permission level for the type of work and the agency or program that currently owns the record.
4. For saved work that requires assignment, check which record’s assignment list controls access, confirm the user is on that list, and check that the record’s status allows the intended action.
5. For roster administration, check the separate `manage_assignments` capability.
6. For an approval or review action, check the separate workflow assignment.
7. Reload or sign in again if permission-driven client controls are stale; server writes always use current database state.

![User assignments tab](/screenshots/en/user-assignments.png)

_Actual seeded-environment example. The Assignments tab lists structural roles only; exact entity work is managed elsewhere._
