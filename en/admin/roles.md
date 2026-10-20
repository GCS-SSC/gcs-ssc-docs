# Roles

Use roles to give people the permissions needed for their job. Each permission applies to a type of work, called the subject, and an area of responsibility, called the scope. For example, a permission can cover Agreements in one program. Choose Viewer, Contributor, or Manager to set the actions allowed. Agreement, Proponent, Funding Case, Account Receivable, Correction and Journal Voucher permissions can also separately allow assignment management.

For example, an officer with Agreement Contributor for Program A has permission to read, create and update Agreements within that program. To work on an existing assignable record, the officer also needs the direct assignment required for that record. The role does not give access to Program B or automatically assign every Program A Agreement.

## Role list

Open **Roles** to search or browse active roles. With global role-reading permission, you see all active roles. With agency-scoped permission, you see global roles and roles in an agency you are allowed to read. Each row shows the bilingual role name, agency context, scope, and up to three permission badges followed by `+N` when more exist.

To create or edit a role, you need Contributor permission for `role` at the target scope. To delete a role, you need Manager permission. Deletion keeps the role's history, but stops it from granting permissions and hides it from ordinary selectors.

## Scope selection

A role can be:

- Global: no agency selected.
- Agency-scoped: one agency selected and no program selected.
- Program-scoped: one agency selected and one or more transfer payment programs in that agency selected.

Only an administrator able to create global roles can choose Global. Program selection appears after an agency is selected. Use the searchable selectors to find records available to you. Previously saved selections remain visible even when they are not on the current results page.

After creating a role, you cannot change it from global to agency-scoped, or the reverse. You can change an agency role to cover the whole agency or selected programs if its permissions allow that scope. If a saved program becomes missing or unavailable, its selection stays visible with a label explaining the problem.

## Scope rules

| Role structure | Effective scope |
| --- | --- |
| No agency | Global |
| Agency and no programs | Agency |
| Agency and one or more programs | Program |

Select only programs that belong to the role's agency. When you save, the application checks that the role, programs, and permissions are compatible. It rejects incompatible combinations.

## Permission levels

The Permissions tab shows one row per supported subject. Select `None`, `Viewer`, `Contributor`, or `Manager`:

| Level | Cumulative actions |
| --- | --- |
| Viewer | Read |
| Contributor | Read, create, update |
| Manager | Read, create, update, delete |

The subjects are `system`, `audit`, `guided_help`, `group`, `agency`, `transfer_payment`, `role`, `user`, `agreement`, `funding_case`, `applicant_recipient`, `account_receivable`, `correction`, and `journal_voucher`.

| Role subject | Global role | Agency role | Program role |
| --- | :---: | :---: | :---: |
| `system` | Yes | No | No |
| `audit` | Yes | Yes | No |
| `guided_help` | Yes | Yes | No |
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

Choose a level for each subject separately. There is no permission for all subjects at once. Each level includes the actions of the levels below it, so you do not select read, create, update, and delete separately. The application rejects duplicate subjects and subjects that do not support the role's scope.

Account Receivable, Correction and Journal Voucher subjects are valid at global, Agency and Program scope. Grant them separately from Agreement access. Agreement Manager alone does not authorize these financial actions. The application checks which agency or program actually owns the financial record; a Program grant does not cover an Agency-owned credit pool.

## Guided Help permissions

Grant Guided Help separately from System or Agreement access. A global role can manage System guides and Agency guides. An Agency role covers only that Agency, and a Program role cannot include `guided_help`.

Viewer can inspect drafts and publications. Contributor can create, adopt, clone, edit, and publish guides, and update Agency catalog settings. Manager can also retire guides and delete eligible unpublished drafts. Guided Help does not use exact work assignments or a Manage assignments switch.

## Assignment-management capability

Agreement, Proponent, Funding Case, Account Receivable, Correction and Journal Voucher permission rows also offer **Manage assignments**. Select this capability separately from the access level:

- it can be enabled while the subject's access level is `None`;
- Manager does not enable it automatically;
- it shows only the limited information needed on Assignment Management and assigned-user lists; and
- it does not reveal entity content or make the administrator an assigned user.

Setting the access level to `None` and turning Manage assignments off removes the permission row. See [Assignment Management](./assignments.md) and [role permissions and exact assignments](../concepts/rbac.md).

## Detail tabs and saving

The detail page contains:

- General, with bilingual names, descriptions, agency, and program scope.
- Permissions, with the access-level selector and eligible assignment-management switches.

Save General and Permissions separately. Both English and French names are required. If pasted text produces an invalid-character error, remove the hidden character or retype the affected name or description, then save again. Permission changes take effect on the next request. Saving names or descriptions does not overwrite permission changes. The application rejects permissions that do not fit the role's scope.

Successful role creation, profile changes, deletion, and permission changes are recorded in the [security audit trail](./audit.md). These events exclude sensitive values. A failed change creates no security audit event.

## Recommended role design

- Root Administrator: a global role with the required Manager levels and explicit assignment-management capabilities. It remains an ordinary role and has no bypass.
- Agency Administrator: agency, user, role, transfer-payment, Agreement, Funding Case and Proponent levels at one agency as needed.
- Program Manager: transfer-payment, Agreement and Funding Case levels for selected programs.
- Assignment Coordinator: only the required subject-specific `manage_assignments` capability at a narrow scope.
- Caseworker: Contributor permissions for the relevant types of work, plus direct assignments to the saved records the officer will handle.
- Reviewer or Approver: the record permission required by the process, plus a separate assignment to the review or approval task.
- Read-only Analyst: Viewer levels without assignment-management capability.

Keep a small set of roles based on people's jobs. Set each role's scope and assign it to the appropriate users. Then assign individual records to the people who will handle them.

Audit access must be granted explicitly on a global or Agency role. `audit:view_audit_inputs` is a separate capability for sanitized captured inputs. A System Manager does not automatically gain access to the [audit browser](./audit.md). For an analyst who only needs evidence, grant Audit Viewer at the required scope without broader operational or assignment-management permissions.
