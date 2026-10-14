# Roles

Use roles to give people the permissions needed for their job. Each permission applies to a type of work (the **subject**, such as Agreements) and an area of responsibility (the **scope**, such as one agency or program). Choose Viewer, Contributor, or Manager to set the actions allowed. Agreement, Proponent, Funding Case, Account Receivable, Correction and Journal Voucher permissions can also separately allow assignment management.

For example, an officer with Agreement Contributor for Program A has permission to read, create and update Agreements within that program. To work on an existing assignable record, the officer also needs the direct assignment required for that record. The role does not give access to Program B or automatically assign every Program A Agreement.

## Role list

The Roles page supports search and pagination. A global role reader sees all active roles; an agency-scoped reader sees global roles and roles in an allowed agency. Each row shows the bilingual role name, agency context, scope, and up to three permission badges followed by `+N` when more exist.

Create and edit controls require Contributor `role` access at the target scope; soft deletion requires Manager. Deleted roles no longer contribute permissions or appear in ordinary selectors.

## Scope selection

A role can be:

- Global: no agency selected.
- Agency-scoped: one agency selected and no program selected.
- Program-scoped: one agency selected and one or more transfer payment programs in that agency selected.

Only an administrator able to create global roles can choose Global. Program selection appears after an agency is selected. Use the searchable selectors to find records available to you. Previously saved selections remain visible even when they are not on the current results page.

The role's parent scope cannot move between global and agency after creation. An agency role can move between agency-wide and program-specific coverage when the resulting permissions remain compatible. Missing or unavailable saved programs are labelled rather than silently removed.

## Scope rules

| Role structure | Effective scope |
| --- | --- |
| No agency | Global |
| Agency and no programs | Agency |
| Agency and one or more programs | Program |

Program links must belong to the role's agency. When a change is saved, the database checks the role, its programs and its permissions together. An incompatible combination is rejected.

## Permission levels

The Permissions tab shows one row per supported subject. Select `None`, `Viewer`, `Contributor`, or `Manager`:

| Level | Cumulative actions |
| --- | --- |
| Viewer | Read |
| Contributor | Read, create, update |
| Manager | Read, create, update, delete |

The subjects are `system`, `audit`, `group`, `agency`, `transfer_payment`, `role`, `user`, `agreement`, `funding_case`, `applicant_recipient`, `account_receivable`, `correction`, and `journal_voucher`.

| Role subject | Global role | Agency role | Program role |
| --- | :---: | :---: | :---: |
| `system` | Yes | No | No |
| `audit` | Yes | Yes | No |
| `group` | Yes | Yes | No |
| `agency` | Yes | Yes | No |
| `transfer_payment` | Yes | Yes | Yes |
| `role` | Yes | Yes | No |
| `user` | Yes | Yes | No |
| `agreement` | Yes | Yes | Yes |
| `funding_case` | Yes | Yes | Yes |
| `account_receivable` | Yes | Yes | Yes |
| `correction` | Yes | Yes | Yes |
| `journal_voucher` | Yes | Yes | Yes |
| `applicant_recipient` | Yes | Yes | No |

Choose a level for each subject separately; there is no permission for all subjects at once. Read, create, update and delete are included through these cumulative levels rather than separate switches. The server rejects a duplicate subject row or a subject that is incompatible with the role's effective scope.

Account Receivable, Correction and Journal Voucher subjects are valid at global, Agency and Program scope. Grant them independently of Agreement access: Agreement Manager alone does not authorize these financial actions. The application checks which agency or program actually owns the financial record; a Program grant does not cover an Agency-owned credit pool.

## Assignment-management capability

Agreement, Proponent, Funding Case, Account Receivable, Correction and Journal Voucher permission rows also offer **Manage assignments**. This capability is independent:

- it can be enabled while the subject's access level is `None`;
- Manager does not enable it automatically;
- it shows only the limited information needed on Assignment Management and assigned-user lists; and
- it does not reveal entity content or make the administrator an assigned user.

Setting the access level to `None` and turning Manage assignments off removes the permission row. See [Assignment Management](./assignments.md) and [role permissions and exact assignments](../concepts/rbac.md).

## Detail tabs and saving

The detail page contains:

- General, with bilingual names, descriptions, agency, and program scope.
- Permissions, with the access-level selector and eligible assignment-management switches.

Save General and Permissions separately. Changing a subject’s permission replaces that permission in one operation and applies to the next request. Saving names or descriptions cannot overwrite permission changes. The application rejects permissions that do not fit the role’s scope.

Role creation, profile updates, deletion, and permission replacements append non-sensitive `audit.security_audit_event` records in the same transaction. A failed change produces no audit row.

## Recommended role design

- Root Administrator: a global role with the required Manager levels and explicit assignment-management capabilities. It remains an ordinary role and has no bypass.
- Agency Administrator: agency, user, role, transfer-payment, Agreement, Funding Case and Proponent levels at one agency as needed.
- Program Manager: transfer-payment, Agreement and Funding Case levels for selected programs.
- Assignment Coordinator: only the required subject-specific `manage_assignments` capability at a narrow scope.
- Caseworker: Contributor permissions for the relevant types of work, plus direct assignments to the saved records the officer will handle.
- Reviewer or Approver: the record permission required by the process, plus a separate assignment to the review or approval task.
- Read-only Analyst: Viewer levels without assignment-management capability.

Prefer a small set of durable job-function roles. Use scope and user-role assignments to vary coverage, then exact entity assignments to allocate saved work.

Audit access must be granted explicitly on a global or Agency role. `audit:view_audit_inputs` is a separate capability for sanitized captured inputs. A System Manager does not automatically gain access to the [audit browser](./audit.md). For an analyst who only needs evidence, grant Audit Viewer at the required scope without broader operational or assignment-management permissions.
