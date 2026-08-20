# Roles

Roles define a reusable subject permission at global, agency, or program scope. A permission records one cumulative access level—Viewer, Contributor, or Manager—and, for Agreement or Proponent work, may independently allow assignment management.

## Role list

The Roles page supports search and pagination. A global role reader sees all active roles; an agency-scoped reader sees global roles and roles in an allowed agency. Each row shows the bilingual role name, agency context, scope, and up to three permission badges followed by `+N` when more exist.

Create and edit controls require Contributor `role` access at the target scope; soft deletion requires Manager. Deleted roles no longer contribute permissions or appear in ordinary selectors.

## Scope selection

A role can be:

- Global: no agency selected.
- Agency-scoped: one agency selected and no program selected.
- Program-scoped: one agency selected and one or more transfer payment programs in that agency selected.

Only an administrator able to create global roles can choose Global. Program selection appears after an agency is selected. Searchable selectors load all records available to the administrator and hydrate saved values that are outside the current result page.

The role's parent scope cannot move between global and agency after creation. An agency role can move between agency-wide and program-specific coverage when the resulting permissions remain compatible. Missing or unavailable saved programs are labelled rather than silently removed.

## Scope rules

| Role structure | Effective scope |
| --- | --- |
| No agency | Global |
| Agency and no programs | Agency |
| Agency and one or more programs | Program |

Program links must belong to the role's agency. Database constraints recheck the full role-permission graph at transaction commit, so a profile or permission update cannot leave an incompatible combination.

## Permission levels

The Permissions tab shows one row per supported subject. Select `None`, `Viewer`, `Contributor`, or `Manager`:

| Level | Cumulative actions |
| --- | --- |
| Viewer | Read |
| Contributor | Read, create, update |
| Manager | Read, create, update, delete |

The subjects are `system`, `agency`, `transfer_payment`, `role`, `user`, `agreement`, and `applicant_recipient`.

| Role subject | Global role | Agency role | Program role |
| --- | :---: | :---: | :---: |
| `system` | Yes | No | No |
| `agency` | Yes | Yes | No |
| `transfer_payment` | Yes | Yes | Yes |
| `role` | Yes | Yes | No |
| `user` | Yes | Yes | No |
| `agreement` | Yes | Yes | Yes |
| `applicant_recipient` | Yes | Yes | No |

There is no wildcard subject and no set of independent CRUD toggles. The server rejects a duplicate subject row or a subject that is incompatible with the role's effective scope.

## Assignment-management capability

Agreement and Proponent permission rows also offer **Manage assignments**. This capability is independent:

- it can be enabled while the subject's access level is `None`;
- Manager does not enable it automatically;
- it exposes only the minimized Assignment Management and roster surfaces; and
- it does not reveal entity content or make the administrator an assigned user.

Setting the access level to `None` and turning Manage assignments off removes the permission row. See [Assignment Management](./assignments.md) and [role permissions and exact assignments](../concepts/rbac.md).

## Detail tabs and saving

The detail page contains:

- General, with bilingual names, descriptions, agency, and program scope.
- Permissions, with the access-level selector and eligible assignment-management switches.

General and Permissions save independently. A per-subject permission update atomically replaces that row and takes effect on subsequent server authorization. Profile edits cannot overwrite permission changes, and a permission change cannot save an invalid role scope.

Role creation, profile updates, deletion, and permission replacements append non-sensitive `security_audit_event` records in the same transaction. A failed change produces no audit row.

## Recommended role design

- Root Administrator: a global role with the required Manager levels and explicit assignment-management capabilities. It remains an ordinary role and has no bypass.
- Agency Administrator: agency, user, role, transfer-payment, Agreement, and Proponent levels at one agency as needed.
- Program Manager: transfer-payment and Agreement levels for selected programs.
- Assignment Coordinator: only the required Agreement and/or Proponent `manage_assignments` capability at a narrow scope.
- Caseworker: Contributor ceilings for the owning subjects; exact entity assignments determine the actual work queue.
- Reviewer or Approver: the ordinary entity ceiling required by the process plus the separately assigned workflow responsibility.
- Read-only Analyst: Viewer levels without assignment-management capability.

Prefer a small set of durable job-function roles. Use scope and user-role assignments to vary coverage, then exact entity assignments to allocate saved work.
