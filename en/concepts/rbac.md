# RBAC

GCS-SSC uses scoped role-based access control. A permission is not only an action and subject; it also has a scope derived from the assigned role.

## Core pieces

- Ability: an action and subject pair, such as `read` on `agreement`.
- Role: a bilingual named collection of abilities.
- Role scope: global, agency, or program.
- User assignment: a link between a user and a role.
- Grant scope: the effective scope built from role scope, agency id, and optional program id.

The application calculates effective permissions from active, structurally valid assignments after sign-in. Soft-deleted roles, deleted parent agencies, deleted or cross-agency program links, and program roles without an active program link do not grant permissions.

## Actions and subjects

Actions are create, read, update, and delete. Subjects include all, agency, transfer payment, role, user, applicant/recipient, and agreement.

The `all` subject is special. It can satisfy any subject check when the action matches, but it is valid only for global/root roles.

## Scope hierarchy

Scopes are hierarchical:

- Global covers every scope.
- Agency covers that agency and children under it.
- Program covers the selected transfer payment program.
- Entity covers a path below a program, such as an agreement child record.

Scope coverage checks verify both hierarchy and ids. A grant for one agency does not cover another agency. A grant for one program does not cover a different program in the same agency.

## Role scope rules

Role scope is derived structurally:

| Role structure | Effective scope |
| --- | --- |
| No agency selected | Global |
| Agency selected and no program selected | Agency |
| Agency selected and one or more programs selected | Program |

Ability assignment is restricted:

- `all` abilities are global only.
- `agency` abilities are allowed at global or agency scope, not program scope.
- Other abilities can be scoped as the role design requires.

The app rejects inconsistent scope data, program roles without agencies, and program ids outside the selected agency.

## Unscoped applicant/recipient visibility

Applicant/recipient is treated as an unscoped subject for broad visibility checks. This lets the Proponents sidebar and list work from a global applicant/recipient read grant. However, create, update, and delete still apply lead-agency and team-membership business rules.

## Team-aware access

Some entity flows allow team fallback. For program child entity scopes, the app checks the user's role scope and then any entity team assignment. Applicant/recipient profiles also have a specific team table. A proponent team member can help satisfy update or delete checks when the user already has applicant/recipient ability but not a direct lead-agency grant.

## UI and Save Enforcement

The UI hides links, buttons, and tabs that the user cannot use. Save actions are also checked, so a hidden control is only a usability cue, not the permission source.

## Practical examples

- Root administrator: global role with `all` actions on `all`.
- Agency administrator: agency-scoped role with agency, user, role, proponent, program, and agreement abilities for one agency.
- Program manager: program-scoped role with transfer payment and agreement abilities for selected programs.
- Proponent team member: applicant/recipient ability plus team membership for a specific proponent can allow profile management even without direct lead-agency grant.
