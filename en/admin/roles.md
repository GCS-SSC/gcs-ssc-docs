# Roles

Roles define the action, subject, and scope combinations that become user permissions. The app enforces role rules both in visible controls and when actions are saved, so a role must be internally consistent before it can be used.

## Role list

The Roles page supports pagination and search. Users with global `role:read` see all roles. Agency-scoped role readers see global roles and roles in their allowed agencies. The table includes bilingual role names, descriptions, agency context, abilities, and selected program ids where applicable.

Users with create access can open the role modal. Users with update access for a role's scope can edit it. Deletes are soft deletes.

## Scope selection

A role can be:

- Global: no agency selected.
- Agency-scoped: an agency selected and no program ids selected.
- Program-scoped: an agency selected and one or more transfer payment programs selected.

The form only offers the global option when the current user can create roles at global scope. Program selection appears only after an agency is selected. Program options are loaded from transfer payments filtered to the selected agency.

After creation, the role's parent scope is fixed: a global role remains global, and an agency role remains tied to its original agency. Edit mode disables the global/agency selector. An agency role can still move between agency-wide and program-specific effective scope by adding or removing programs within that agency, provided its abilities are valid for the resulting scope. `agency`, `role`, and `user` abilities must be removed before moving the role to program scope.

The agency and program selectors search the full set of records available to the current administrator rather than only the first page. When editing a role, saved selections are resolved to their display names even when they are outside the current search results. A program that no longer exists or is no longer available in the role's scope is labelled unavailable. A temporary loading failure shows a Retry action without removing the saved selection.

## Scope business rules

Effective scope is derived from role structure:

| Role structure | Effective scope |
| --- | --- |
| No agency selected | Global |
| Agency selected and no programs selected | Agency |
| Agency selected and one or more programs selected | Program |

The app rejects program-scoped roles without an agency. It also rejects selected programs that do not belong to the role's agency.

## Ability rules

Abilities are explicit action/subject pairs. Actions are `create`, `read`, `update`, and `delete`. The only role subjects are `system`, `agency`, `transfer_payment`, `role`, `user`, and `agreement`. Proponent access is deliberately not a role ability; it is configured through direct user flags and exact Proponent Teams.

Scope limits which subjects can be assigned:

| Role subject | Global role | Agency role | Program role |
| --- | :---: | :---: | :---: |
| `system` | Yes | No | No |
| `agency` | Yes | Yes | No |
| `transfer_payment` | Yes | Yes | Yes |
| `role` | Yes | Yes | No |
| `user` | Yes | Yes | No |
| `agreement` | Yes | Yes | Yes |

There is no wildcard or `all` subject. Program scope is derived from the role's active program links, not from an independently stored scope field.

The role detail Abilities tab filters to allowed abilities for the role's current scope. If a user attempts an invalid ability toggle, the app shows a scope mismatch error and does not save the invalid ability.

## Detail tabs

The role detail page contains:

- General, showing bilingual names, descriptions, agency, and scope context.
- Abilities, showing toggle cards for allowed abilities.

Saving General updates only the role profile and scope fields. Ability switches use a separate endpoint and take effect immediately, so saving a profile cannot accidentally replace abilities and toggling an ability cannot overwrite unsaved profile edits. Updating an agency role's program selection saves the complete selection and is rejected when the resulting scope would be inconsistent with its current abilities.

## Recommended role design

Use a small number of durable role patterns:

- Root Administrator: an ordinary global role containing the required explicit action/subject pairs for trusted system operators. The seeded role contains all 24 valid pairs and does not bypass authorization.
- Agency Administrator: agency, user, role, transfer payment, and agreement permissions scoped to one agency as needed. Proponent access is assigned separately on users or exact Teams.
- Program Manager: transfer payment and agreement permissions scoped to selected programs.
- Agreement Operator: create/update agreement and child workflow records in a program or agency scope.
- Reviewer or Approver: give only the ordinary entity read/update role permissions required by the process. Workflow assignment determines who may perform an assigned step; it does not grant entity access by itself.
- Read-only Analyst: read access with no create/update/delete abilities.

Avoid creating many near-duplicate roles. Prefer a role per job function and scope it through assignment.

![Role abilities tab](/screenshots/en/role-abilities.png)

_Actual screenshot from the seeded development environment. The records shown are examples only and are not created in a fresh installation._
