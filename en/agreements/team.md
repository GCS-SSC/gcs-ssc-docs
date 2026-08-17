# Agreement Team

The **Team** tab grants application users access to one exact saved agreement. Use it when someone needs to work on this agreement without receiving broader agency, program, stream, or agreement privileges.

An Agreement Team grant does not extend to another agreement or to a linked proponent. It does not permit creation of a new agreement, and an approval or review assignment does not replace ordinary Agreement read access.

## Access levels

| Level | Actions on this exact agreement |
| --- | --- |
| `read_only` | Read the agreement, supported child records, and Team roster. |
| `contributor` | Read and update the agreement; read, create, and update supported child records. |
| `full_access` | Contributor actions plus soft deletion of the agreement and supported child records. |

Any effective reader can view the active roster. Search matches active users by name or email, with pagination and name ordering. Deleted assignments and deleted user accounts are omitted.

## Management ceiling

Row actions and assignable levels are limited by your effective Agreement permissions:

- update access can manage `read_only` and `contributor` assignments;
- update plus delete access can also manage `full_access` assignments;
- an existing or requested level above your ceiling cannot be changed or removed.

These permissions may come from a scoped role or your own exact Agreement Team membership.

## Add, change, or remove a member

Select **Add team member**, choose an access level within your ceiling, and search for a user. The lookup contains active application users who do not already have an active assignment on this exact agreement. It is not limited to the agreement's agency.

The user and access level are required. The server rejects inactive users, duplicate active assignments, unknown levels, and extra fields. Editing changes only the access level. Removing asks for confirmation and soft-deletes the assignment; a removed user may be added again.

Writes lock the target user, agreement, and existing assignment as applicable, rebuild authorization inside the transaction, and reapply the existing/requested-level ceiling before changing data. A Team ID belonging to another agreement or entity type is treated as not found. Missing and inaccessible agreements are not distinguished to the caller.

::: warning Access-loss safeguard
There is no last-manager or self-removal guard. Downgrading or removing the only assignment that provides update access can immediately prevent further Team management. Confirm that another authorized manager remains. Recovery requires another sufficiently authorized user; the Team tab has no self-restore control.
:::

## Related guides

- [Funding agreements](./index.md)
- [Agreement proponents](./applicant-recipients.md)
- [Roles and permissions](../admin/roles.md)
- [Proponent Team](../proponents/team.md)
