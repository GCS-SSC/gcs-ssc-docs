# Users

The Users area manages application identities, structural role assignments, and the four direct Proponent CRUD flags. Roles provide ordinary scoped access; the direct flags are the deliberate global cross-agency Proponent exception. Exact Proponent and Agreement Team membership is managed on the saved entity rather than on this page.

## User list

The Users page supports search, pagination, and summary counts. Users with global `user:read` see all active users. Agency-scoped user readers see themselves, users assigned to allowed agencies, and users with exact Team memberships in allowed agencies. Deleted users are excluded from normal lists.

The table shows avatar, name, email, and actions. Create is shown only with `user:create`. Update and delete actions also depend on the target user's active scopes: an agency-scoped administrator must cover every agency represented by the target's active role assignments and Team memberships. A target with an active global role can be updated or deleted only with global access for that action. A row can therefore be visible without being editable or deletable. Deleting a user soft-deletes the user and its active assignments.

## User detail

The user detail page contains:

- General, showing identity fields such as name, email, email verification status, image, and timestamps.
- Assignments, showing active structural role assignments and the direct Proponent Create, Read, Update, and Delete flags.

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

Deleting an assignment soft-deletes the assignment row. Server authorization reflects the change on subsequent requests. Client-side controls update after client permissions are fetched again, such as when the page is reloaded or the user signs in again.

## Direct Proponent access

The Assignments tab also exposes four independent Proponent flags:

| Flag | Effect |
| --- | --- |
| `create` | Create Proponents in any agency. |
| `read` | List and read Proponents across agencies. |
| `update` | Update any Proponent and supported child records. |
| `delete` | Soft-delete any Proponent and supported child records. |

These flags are stored directly on the user and are not role abilities or separate assignment rows. Only a caller with global `user:update` can change them. The interface warns that the access is cross-agency and requires confirmation before saving. Grant only the actions the user needs; exact access to one saved Proponent should use its Team instead.

## Activating a credential user

Creating a user profile does not create a password account. A globally authorized user administrator can activate an unverified profile by setting its initial credential password. Activation is available only while the user is active, unverified, and has no existing account. A verified profile or an account managed by another provider is rejected rather than overwritten.

The password is hashed before the credential account and verified status are written in one transaction. The raw password is not returned or added to audit metadata. Communicate the initial credential through an approved channel and require the recipient to follow the organization’s credential-handling policy.

## Security audit trail

Role and user security mutations append a `security_audit_event` in the same transaction as the change. Covered events include role creation, profile/deletion and ability changes; user creation, profile/deletion and activation; direct Proponent flag changes; and role-assignment creation/deletion. Records identify the authenticated actor, constrained event category, target type/identifier, timestamp, and non-sensitive structural metadata. They exclude names, email addresses, images, credentials, tokens, and password hashes.

The database rejects updates and deletes to these append-only events. A failed domain mutation therefore produces no audit event, and an audit insertion failure rolls back the mutation. Access to raw audit data is an operational/security responsibility; the user-management UI does not expose a general audit-log viewer.

## Root user handling

Keep the root assignment narrow and auditable. Root is an ordinary user with explicit global role abilities and, when needed, separately enabled Proponent flags; it has no authorization bypass. Use scoped roles for routine program and Agreement work, direct flags only for genuine cross-agency Proponent duties, and exact Teams for collaboration on one saved Proponent or Agreement.

## Troubleshooting access

If a user cannot see a page:

1. Check that the user is not deleted.
2. For ordinary scoped access, check that the role assignment, role, parent agency, and selected programs are active.
3. Check that the role structure is valid: global roles have no agency, agency roles have no program links, and program roles have at least one active program in their agency.
4. Check that the role has the correct action and subject and that its derived scope covers the requested resource.
5. For cross-agency Proponent access, check the matching direct CRUD flag in Assignments.
6. For one saved Proponent or Agreement, check the user's exact Team membership and access level on that entity.
7. Have the user sign out and sign in if static permissions still look stale. Entity Team access is resolved on demand by the server.

![User assignments tab](/screenshots/en/user-assignments.png)

_Actual screenshot from the seeded development environment. The records shown are examples only and are not created in a fresh installation._
