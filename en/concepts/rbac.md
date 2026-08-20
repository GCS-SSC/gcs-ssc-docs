# Role permissions and exact assignments

GCS-SSC authorization has two independent layers:

1. A **role permission** supplies the maximum access level for a subject at global, agency, or program scope.
2. An **exact entity assignment** identifies the saved Proponent, Agreement, review, recommendation, claim, reconciliation, payment, forecast, monitor, amendment, or commitment on which the user may work.

Viewer permits scoped reads without an assignment. For mutations on an existing assignable entity, both keys are normally required. An assignment never raises the role ceiling, and a broad role permission does not allocate every matching record to the user's work queue.

Approval and reviewer assignments are separate workflow responsibilities. They can authorize the assigned approval or review action, but they do not replace ordinary access to the owning business entity.

## Access levels

Each role permission has one cumulative access level:

| Level | Allowed actions |
| --- | --- |
| Viewer | Read. |
| Contributor | Read, create, and update. |
| Manager | Read, create, update, and delete. |

`None` means that the role supplies no access ceiling for that subject. There are no independent CRUD switches and Manager is not a wildcard for separate capabilities.

## Subjects and scopes

The supported subjects are `system`, `agency`, `transfer_payment`, `role`, `user`, `agreement`, and `applicant_recipient`.

| Subject | Global role | Agency role | Program role |
| --- | :---: | :---: | :---: |
| `system` | Yes | No | No |
| `agency` | Yes | Yes | No |
| `transfer_payment` | Yes | Yes | Yes |
| `role` | Yes | Yes | No |
| `user` | Yes | Yes | No |
| `agreement` | Yes | Yes | Yes |
| `applicant_recipient` | Yes | Yes | No |

A global role has no agency. An agency role is tied to one agency and has no program links. A program role is tied to one agency and one or more active programs in that agency. Database constraints reject incompatible role-permission and scope combinations.

The resource determines the scope used for the check. An Agreement resolves through its stream and program; a Proponent resolves through its lead agency. Agency-scoped Proponent permission is therefore supported without granting cross-agency access.

## The two-key rule

For an existing assignment-root entity:

| Operation | Role ceiling | Exact assignment |
| --- | --- | --- |
| Read | Viewer or higher | Not required |
| Create an ordinary child row | Contributor or higher on the parent subject | Required on the parent assignment root |
| Update | Contributor or higher | Required |
| Delete | Manager | Required |

Top-level creation is the main exception because the new record does not yet have an assignment. Creating a Proponent or Agreement requires Contributor at the selected owner scope. The transaction creates the entity and assigns the creator as its primary user. Creating an independently assigned casework item follows the same pattern for that child.

An ordinary child row, such as an address or budget line, uses its owning Proponent or Agreement as the assignment root. Independently assigned casework uses itself as the root. A parent assignment does not grant access to an independently assigned child; a child assignment does not grant the parent or any sibling.

## Assignable entities

The exact assignment roster applies to:

- Proponents and Agreements;
- common reviews and recommendations;
- claims and claim reconciliations;
- payments, forecasts, and monitors;
- amendments and commitments.

An active assignable entity must have at least one active assigned user and exactly one primary user. The primary marker identifies the lead; it does not give extra business permissions. All active assigned users have the same entity boundary and remain limited by their own role ceilings.

Only workable statuses accept roster changes. For example, Proponent assignments are editable in `draft` and `active`; Agreement assignments in `draft`, `pendingapproval`, and `active`; review and most financial casework use their own open-status policies; recommendations and amendments accept changes only in `draft`. Terminal records can remain visible in Assignment Management while their roster is locked.

Deleting an assignable entity soft-deletes its active assignments. Roster changes are serialized and database triggers enforce the non-empty, one-primary invariant at transaction commit.

## Managing assignments

`manage_assignments` is an independent role capability available only for `agreement` and `applicant_recipient`. It can be granted without Viewer and is not implied by Manager. It authorizes the minimized assignment-management projection and roster operations for assignable entities owned by that subject at the role's scope.

It does **not** grant access to business, personal, financial, document, or workflow content. It also does not assign the administrator to the entity. See [Assignment Management](../admin/assignments.md) for the task workflow.

An eligible assignee must be an active user with Contributor or Manager permission for the owning subject at the entity's current scope. A user who later becomes inactive or ineligible remains visible on the historical roster, but cannot be added, promoted, or used to satisfy a new write. Existing assignment history is not silently rewritten when roles change.

## Roster visibility and mutations

The Assigned users tab on an accessible Proponent or Agreement can be read by a user with the role Viewer ceiling for that owner. Assignment managers can also read the minimized roster through their independent management capability. An exact assignment by itself is insufficient because it never creates a role ceiling.

Roster actions require current `manage_assignments` permission; ordinary Contributor or Manager access to the business entity is not a substitute. The server re-resolves the role graph and entity scope inside the write transaction.

| Action | Invariant |
| --- | --- |
| Add | User is active, eligible, and not already actively assigned. |
| Make primary | User is already actively assigned and eligible; the previous primary is demoted atomically. |
| Remove | The primary and the last active assignment cannot be removed. |

## Assigned Work

The Home page's Assigned Work queue contains only the user's exact assignments that are still open under each entity's status policy and for which the user still has at least Viewer permission. It covers the eleven assignable entity types, sorts primary work first, and links directly to the appropriate detail page.

Search matches English/French identifiers, raw types and statuses, localized type/status labels, and record labels. The entity-type filter and pagination operate on the full eligible result set; the Home widget requests ten rows at a time.

## Fresh authorization

Protected writes do not trust a page that was opened before a role, scope, assignment, status, or ownership change. The server begins a transaction, locks and rebuilds the caller's current authorization graph, resolves the current entity owner and assignment root, and then authorizes the requested mutation. A stale client state therefore cannot preserve revoked access.

## Navigation implications

- Agreements and Proponents appear when the user has a role permission that can read that subject; assignment membership is not a navigation grant by itself.
- Assignment Management appears when the user has any active `manage_assignments` grant.
- Programs, roles, users, agencies, and Common administration use their own role subjects and scopes; exact entity assignments do not extend to them.
- Workflow approval and review tasks remain separately assigned and do not expand the sidebar.

## Deliberate non-features

The application does not provide:

- independent create/read/update/delete role switches;
- direct Proponent access flags stored on a user;
- Team access levels such as `read_only`, `contributor`, or `full_access`;
- assignments on agencies or programs;
- inheritance from a parent to independently assigned children or siblings; or
- an authorization bypass for a seeded or root user.

The older Team routes and tabs have been removed. Saved entity access should be diagnosed using the role ceiling, resource scope, exact assignment root, entity status, and any separate workflow assignment.
