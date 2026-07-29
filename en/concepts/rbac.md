# Role-based access control (RBAC)

GCS-SSC combines three explicit access mechanisms:

1. **Roles** provide scoped permissions for system administration, agencies, programs, and agreements.
2. **Proponent access** stores four global, per-user permissions for the cross-agency Proponent exception.
3. **Teams** give selected users access to one exact Proponent or Agreement.

Access is the union of the mechanisms that apply to the requested action and resource. A Team assignment can therefore grant access to its exact entity even when the user's roles do not. Workflow assignments, such as an assigned reviewer or approver, remain separate business-process responsibilities and are not RBAC roles or Team membership.

## Actions

Every permission uses one of four actions:

| Action | Meaning |
| --- | --- |
| `create` | Create the subject, or create a child record when granted by an entity Team. |
| `read` | View or list records covered by the access mechanism. |
| `update` | Change an existing record covered by the access mechanism. |
| `delete` | Soft-delete a record covered by the access mechanism. |

The server authorizes every operation. Links, tabs, and buttons reflect the server-provided capabilities, but hiding a control is only a usability feature and is not the security boundary.

## Roles

A role is a bilingual, named collection of action/subject pairs. Its scope is derived from its structure instead of being stored as an independently editable value.

| Role structure | Effective scope |
| --- | --- |
| No agency | Global |
| One agency and no program links | Agency |
| One agency and one or more program links | Program |

A program-scoped role can link to more than one program, but every linked program must belong to the role's agency. Deleted roles, assignments, agencies, programs, or cross-agency program links do not grant access. A structurally invalid role does not grant access either.

### Exact role subject matrix

Roles contain only the following six subjects. Each available subject/scope combination supports `create`, `read`, `update`, and `delete`.

| Role subject | Global role | Agency role | Program role |
| --- | :---: | :---: | :---: |
| `system` | Yes | No | No |
| `agency` | Yes | Yes | No |
| `transfer_payment` | Yes | Yes | Yes |
| `role` | Yes | Yes | No |
| `user` | Yes | Yes | No |
| `agreement` | Yes | Yes | Yes |

Scope matching is exact to the structure:

- A global permission covers all agencies and programs for that subject.
- An agency permission covers its agency and the subject records beneath that agency.
- A program permission covers only its linked programs and the agreement records beneath those programs.

There is no wildcard subject. In particular, `all` is not a role subject and no root-user code path bypasses normal authorization. The seeded root role receives all 24 explicit action/subject pairs in the global column of the matrix.

## Direct Proponent access on a user

Proponents are deliberately not a role subject. The internal `applicant_recipient` authorization target is used for direct-user and Team checks, but it cannot be selected as a role ability. Cross-agency Proponent work does not fit an agency- or program-scoped job role, so it is represented by four independent flags stored directly on the user:

| User assignment | Effect |
| --- | --- |
| Proponent `create` | Create Proponents in any agency. |
| Proponent `read` | View and list Proponents across all agencies. |
| Proponent `update` | Update any Proponent and its supported child records. |
| Proponent `delete` | Soft-delete any Proponent and its supported child records. |

Administrators edit these flags in the user's **Assignments** tab. Only callers with global `user:update` permission can change them; agency- or program-scoped user management cannot delegate this global cross-agency exception. Because each flag grants cross-agency access, the interface presents a clear warning and confirmation before saving.

These flags are not a role, a scoped grant, or a separate assignment record. They are included with role permissions when the client loads the user's static permissions. The seeded root user has all four flags explicitly enabled.

## Exact-entity Teams

A Team is available only on a saved **Proponent** or **Agreement**. It adds a user to that one exact entity with one access level:

| Team access level | Exact entity | Children of that entity |
| --- | --- | --- |
| `read_only` | Read | Read |
| `contributor` | Read and update | Read, create, and update |
| `full_access` | Read, update, and delete | Read, create, update, and delete |

Team access has intentionally narrow boundaries:

- It applies to the selected Proponent or Agreement and supported children in that same domain.
- It does not apply to another Proponent or Agreement, sibling records, an agency, a program, or the other entity domain.
- It is not inherited through agency or program hierarchy.
- It does not grant top-level creation. Creating a new Proponent requires the user's direct Proponent `create` flag. Creating a new Agreement requires a scoped role with `agreement:create`.
- It does not require a matching role permission. Team membership is itself the exact-entity exception.
- It is evaluated on demand for the requested entity rather than being expanded into the user's static role-permission list.

Users with read access to the entity can see its Team roster, including readers whose access comes from `read_only` membership. Team changes require effective update access to the entity and are limited by the manager's own access:

| Manager's effective entity access | Highest Team level they can manage |
| --- | --- |
| Update without delete | `contributor` |
| Update and delete | `full_access` |

Both the member's current level and requested level must be within the manager's ceiling. This prevents a contributor from changing or removing a full-access member, including by editing their own membership. Duplicate active membership is rejected, and removal is a soft delete.

## How effective access is resolved

For each server request, GCS-SSC evaluates only the mechanisms relevant to the target:

- Role abilities are checked against the role's derived global, agency, or program scope.
- Proponent actions check the user's matching global Proponent flag or an exact Proponent Team assignment.
- Agreement actions check scoped role abilities or an exact Agreement Team assignment.
- Team-enabled child routes use the parent entity's exact Team level and the child action being performed.

The server returns entity-specific capabilities for screens that need Team-aware controls. Permission-changing writes are checked against current database state so stale client state or a stale session cannot preserve removed access.

## What is intentionally not part of the model

The authorization model does not use:

- a wildcard or `all` subject;
- a special root-user authorization bypass;
- a persisted role-scope field independent of the role's agency and program links;
- role abilities for Proponents;
- a general-purpose entity-assignment grant table;
- Teams on agencies or transfer payment programs;
- Team inheritance across entities, siblings, agencies, programs, or domains; or
- reviewer and approver workflow assignments as access grants.

This separation keeps routine access role-based, makes the one cross-agency exception visible on the user, and keeps collaborative entity access exact and auditable.
