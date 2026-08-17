# Proponent Team

The **Team** tab grants an application user access to one exact saved proponent. Use it for staff who need this profile without giving them global cross-proponent privileges.

Team access is an independent exact-entity grant. It does not inherit from the proponent’s lead agency and does not extend to another proponent, a program, a linked agreement, or any sibling record. It also does not grant top-level Proponent creation; creating a new profile still requires the direct global `applicant_recipient:create` ability.

## Access levels

| Level | Actions on this exact proponent |
| --- | --- |
| `read_only` | Read the profile, its supported child records, and its Team roster. |
| `contributor` | Read and update the profile; read, create, and update supported child records. |
| `full_access` | Contributor actions plus soft deletion of the profile and supported child records. |

Other domains still enforce their own authorization. For example, a Proponent Team membership does not make a linked agreement readable or assign the member to a review approval step.

## View and search the roster

Any effective reader of the proponent can open the Team roster. It lists active assignments whose user account is also active, ordered by user name. Search matches name or email and supports pagination.

The row actions depend on your management ceiling, not merely on whether the roster is readable:

- effective proponent update access can manage `read_only` and `contributor` assignments;
- effective update plus delete access can also manage `full_access` assignments;
- you cannot modify or remove an existing assignment above your ceiling or grant a level above it.

These effective permissions may come from a global ability or from your own exact Team assignment.

## Add a member

Select **Add team member**, choose an access level within your ceiling, and search for a user. The lookup contains active application users who do not already have an active assignment on this exact proponent; it is not restricted by the proponent’s agency.

The user and access level are required. The server rejects an inactive user, duplicate active assignment, unknown level, or payload with extra fields. A user may belong to the Teams of several different proponents.

## Change or remove a member

Editing changes only the assignment’s access level; it does not change the user. Removing a member asks for confirmation and soft-deletes the assignment. A deleted user account also disappears from the active roster. A previously removed user can be added again because duplicate prevention applies to active assignments.

Membership writes run in a transaction. The server locks the affected user, locks and re-resolves the active proponent and assignment, rebuilds authorization, and reapplies both the existing-level and requested-level ceiling checks before writing. A membership ID from a different entity or entity type is treated as not found.

::: warning Access-loss safeguard
There is no special “last manager” or self-removal guard. Downgrading or removing the only grant that gives you update access can immediately prevent you from managing the Team again. Before changing your own assignment or the last `full_access` assignment, confirm that another user or a global administrator retains sufficient access. Recovery requires another authorized manager; there is no Team self-restore control.
:::

## Related guides

- [Proponent profiles](./index.md)
- [Roles and permissions](../admin/roles.md)
- [Proponent agreements](./agreements.md)
