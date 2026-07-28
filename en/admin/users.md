# Users

The Users area manages application identities and their role assignments. A user alone does not grant access; access comes from active role assignments and the abilities contained in those roles.

## User list

The Users page supports search, pagination, and summary counts. Root or global user readers see all active users. Agency-scoped user readers see themselves, users assigned to allowed agencies, and users with entity assignments in allowed agencies. Deleted users are excluded from normal lists.

The table shows avatar, name, email, and actions. Create is shown only with `user:create`. Update and delete actions also depend on the target user's active scopes: an agency-scoped administrator must cover every agency represented by the target's active role and entity assignments. A target with an active global role can be updated or deleted only with global access for that action. A row can therefore be visible without being editable or deletable. Deleting a user soft-deletes the user.

## User detail

The user detail page contains:

- General, showing identity fields such as name, email, email verification status, image, and timestamps.
- Assignments, showing active role assignments with localized role and agency labels.

The hero displays the user's name, email, avatar, and verified/unverified status. Editing identity fields is separate from role assignment.

## Assigning roles

Open the Assignments tab and use Add to assign a role. The role picker loads structurally valid roles within the administrator's assignable scope for the current user. This operation requires `user:update`; it does not require an unrelated `role:read` grant. Labels include role name plus scope context, such as global, agency, or program, to disambiguate duplicate role names.

When a role is assigned:

| Rule | Behaviour |
| --- | --- |
| Target user must be active | Deleted users cannot receive new active assignments. |
| Role must be active | Deleted roles cannot be assigned. |
| Global roles require global user update access | Administrators without global user update access cannot assign global roles. |
| Agency and program roles require access to the role's agency | Administrators must be allowed to update users in the target agency. |
| Duplicate active assignment is not created | Saving the same active user-role pairing reuses the existing assignment instead of creating another one. |

Deleting an assignment soft-deletes the assignment row. The user's permissions change after their session permissions refresh or they sign in again.

## Root user handling

Keep the root assignment narrow and auditable. Root should be used for system setup, Common Admin, extension enablement, and emergency repair. Routine program, agreement, and proponent work should be performed with scoped roles so the sidebar and available actions match operational responsibilities.

## Troubleshooting access

If a user cannot see a page:

1. Check that the user is not deleted.
2. Check that the assignment is active.
3. Check that the role, its parent agency, and any selected programs are active.
4. Check that the role structure is valid: global roles have no agency, agency roles have no program links, and program roles have at least one active program in their agency.
5. Check that the role has the correct action and subject.
6. Check that the role scope covers the agency, program, or entity being opened.
7. Have the user sign out and sign in if their visible permissions still look stale.

![User assignments tab](/screenshots/en/user-assignments.png)

_Actual screenshot from the seeded development environment. The records shown are examples only and are not created in a fresh installation._
