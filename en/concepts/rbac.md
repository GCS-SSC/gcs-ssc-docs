# Role permissions and exact assignments

If you can view a record but cannot change it, check your role and your assignment. Your role sets your permissions. Your assignment identifies the particular record you work on. This is role-based access control, or RBAC.

1. A role permission sets the most you can do for a category of records, called the subject. It applies across the application or within an Agency or Program, called the scope. This maximum is called the role ceiling below.
2. An **exact entity assignment** identifies the saved Proponent, Agreement, review, recommendation, claim, reconciliation, payment, forecast, monitor, amendment, or commitment on which the user may work.

Viewer lets you read records within your role’s scope without being assigned to each one. To change or delete an existing record that has its own assignment list, you normally need both the appropriate role permission and an assignment to that record. Being assigned never increases your role permission. Having a role for an entire Program does not put every Program record in your work queue.

Approval and reviewer assignments are separate workflow responsibilities. They can authorize the assigned approval or review action without granting general access to the owning record. An exact approval assignment can also let you read the specific evidence needed for that approval. Ordinary work assignments still require the owner’s read permission. Funding Case Intake reviews also retain this requirement. See [Approvals and completions](approvals-completions.md).

## Access levels

Each role permission has one cumulative access level:

| Level | Allowed actions |
| --- | --- |
| Viewer | Read. |
| Contributor | Read, create, and update. |
| Manager | Read, create, update, and delete. |

`None` means the role gives no access for that category. Create, read, update, and delete permissions are grouped into the levels above; they cannot be switched on separately. Manager does not automatically include separate capabilities such as managing assignments.

## Subjects and scopes

The supported subjects are `system`, `audit`, `guided_help`, `group`, `agency`, `transfer_payment`, `role`, `user`, `agreement`, `funding_case`, `applicant_recipient`, `account_receivable`, `correction`, and `journal_voucher`.

| Subject | Global role | Agency role | Program role |
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

A global role has no agency. An agency role is tied to one agency and has no program links. A program role is tied to one agency and one or more active programs in that agency. Database constraints reject incompatible role-permission and scope combinations.

The record determines which scope applies. An Agreement uses its Stream and Program. An Intake uses its Opportunity and Program. Proponents form a shared catalog. A global Proponent permission, or a permission for the action in any active Agency, applies across Proponent profiles. The lead Agency tracks responsibility but does not limit access to the profile. Agency-owned notes keep their separate Agency visibility rules.

Guided Help administration uses `guided_help` at global or Agency scope. A Program role cannot grant it, and it requires no exact work assignment.

Audit reads and administrative group management use their own subjects, rather than exact Agreement assignments. Audit input values additionally require `audit:view_audit_inputs`; group membership alone does not grant business-record access. See [Audit](../admin/audit.md) and [Groups](../admin/groups.md).

## The two-key rule

For example, a grants officer with Agreement Contributor access for a Program can read its Agreements. To edit Agreement A’s budget lines, the officer also needs an assignment to Agreement A. An assignment to Agreement A does not allow the officer to edit Claim B under it: Claim B needs its own assignment. Its parent Agreement still determines the applicable role scope.

An **assignment root** is the record whose assignment list is checked. An address uses its Proponent’s list; a Claim uses its own list. The rules below refer to this record.

For an existing assignment-root entity:

| Operation | Role ceiling | Exact assignment |
| --- | --- | --- |
| Read | Viewer or higher | Not required |
| Create an ordinary child row | Contributor or higher on the parent subject | Required on the parent assignment root |
| Update | Contributor or higher | Required |
| Delete | Manager | Required |

Top-level creation is the main exception because the new record does not yet have an assignment. Creating an Agreement requires Contributor at its selected owner scope; creating a Proponent requires global or any active Agency Proponent Contributor access. The transaction creates the entity and assigns the creator as its primary user. Creating an independently assigned casework item follows the same pattern for that child.

An ordinary child row, such as an address or budget line, uses its owning Proponent or Agreement as the assignment root. Independently assigned casework uses itself as the root. A parent assignment does not grant access to an independently assigned child; a child assignment does not grant the parent or any sibling.

## Assignable entities

The exact assignment roster applies to:

- Proponents and Agreements;
- common reviews and recommendations;
- claims and claim reconciliations;
- payments, forecasts, and monitors;
- amendments and commitments;
- Funding Case Intakes and workflow Data Collections;
- Account Receivables, Corrections and Journal Vouchers under their independent financial subjects.

An ordinary active assignable record needs at least one active assigned user, with exactly one marked as primary. An unclaimed Review, Recommendation, Data Collection or Intake assigned to a group may have no users. Once users are assigned, exactly one must be primary. The primary user leads the work but has no extra permissions. Each assigned user remains limited by their own role permissions.

You can change assignments only while the record allows work. A Proponent must be active. Agreement work requires normal Agency business status and no completion. A review or recommendation must be active or paused and not completed. Read-only, terminal, completed, and deleted records are protected. See [Assignment Management](../admin/assignments.md) for the full policy.

Deleting a record with assignments also marks its active assignments as deleted while retaining their history. Assignment-list changes are processed one at a time. Database checks enforce a nonempty list with exactly one primary when the transaction finishes, subject to the unclaimed-group exception above.

## Managing assignments

`manage_assignments` is an independent role capability available for exactly six subjects: `agreement`, `applicant_recipient`, `funding_case`, `account_receivable`, `correction` and `journal_voucher`. It can be granted without Viewer and is not implied by Manager. It lets the assignment manager see the limited information needed to identify records and change their assigned-user lists, for that category within the role’s scope.

It does **not** grant access to business, personal, financial, document, or workflow content. It also does not assign the administrator to the entity. See [Assignment Management](../admin/assignments.md) for the task workflow.

An eligible assignee must be an active user with Contributor or Manager permission for the owning subject at the entity's current scope. For a shared Proponent profile, a global grant or a grant in any active Agency is enough. For a Proponent review or recommendation pinned to an Agency, the grant must cover that Agency. A user who later becomes inactive or ineligible remains visible on the historical roster, but cannot be added, promoted, or used to satisfy a new write. Existing assignment history is not silently rewritten when roles change.

## Roster visibility and mutations

To read the **Assigned users** tab on a Proponent or Agreement, you need Viewer access to that owner. Assignment managers can also read a limited roster through their separate management permission. An assignment alone does not grant Viewer access.

Roster actions require current `manage_assignments` permission; ordinary Contributor or Manager access to the business entity is not a substitute. The server re-resolves the role graph and entity scope inside the write transaction.

| Action | Rule |
| --- | --- |
| Add | User is active, eligible, and not already actively assigned. |
| Make primary | User is already actively assigned and eligible; the previous primary loses that marker in the same transaction. |
| Remove | The primary and the last active assignment cannot be removed. |

## Assigned work

Home shows your exact assignments that are still open under each record’s status rules and for which you retain at least Viewer permission. **Assigned work** lists casework where you are the primary assignee. **Shared assignments** lists casework where you are an additional assignee. Assigned Proponents and Agreements appear in separate lists. Each list shows five records per page, has its own paging controls and links to the corresponding record.

If you belong to an administrative group, **Available group work** shows work you can claim, with ten items per page. Group membership does not replace the permissions needed to claim a task. See [Navigation](../getting-started/navigation.md) for the Home dashboard and [Groups](../admin/groups.md) for claiming work.

## Access checks before saving

For example, if your assignment is removed while you are editing a Claim, leaving the page open does not preserve permission to save it. Reload the page and ask the assignment manager to check your current access.

Before saving a protected change, the application checks your current roles, scope, assignment, record status, and owner again. It locks the relevant information and checks which record’s assignment list applies within the same transaction. A page opened before an access change cannot keep permission that has since been removed.

## What appears in navigation

- Agreements and Proponents appear when the user has a role permission that can read that subject; assignment membership is not a navigation grant by itself.
- The Assignment Management navigation entry checks `manage_assignments` on Agreement, Proponent, Funding Case, Journal Voucher or Correction. An Account-Receivable-only management grant is supported by the API but does not expose that sidebar entry; open `/assignment-management` directly when that is your only grant.
- Programs, roles, users, agencies, and Common administration use their own role subjects and scopes; exact entity assignments do not extend to them.
- Workflow approval and review tasks remain separately assigned and do not expand the sidebar.

## Access options the application does not provide

The application does not provide:

- independent create/read/update/delete role switches;
- direct Proponent access flags stored on a user;
- Team access levels such as `read_only`, `contributor`, or `full_access`;
- assignments on agencies or programs;
- inheritance from a parent to independently assigned children or siblings; or
- an authorization bypass for a seeded or root user.

The older Team routes and tabs have been removed. If access fails, check the role permission, the record's scope and status, the required assignment, and any separate workflow assignment.
