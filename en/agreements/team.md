# Agreement assigned users

The **Assigned users** tab shows the exact work roster for one saved Agreement. It allocates that Agreement to users who already have a sufficient Agreement role ceiling at its agency/program scope; it does not create permission by itself.

## Required access

Reading the roster requires either:

- Viewer or higher for `agreement` at the Agreement's current scope; or
- `agreement` `manage_assignments` at that scope.

Adding, promoting, or removing users requires `manage_assignments`. Contributor or Manager business access does not imply roster management, and `manage_assignments` alone exposes no Agreement, financial, document, or workflow content.

## Roster rules

Every active Agreement must have at least one active assignment and exactly one primary. The primary user is the work lead, not a more privileged member. An assigned user still needs the Viewer role ceiling to read and the two-key rule to change the Agreement.

The roster remains readable when an existing user becomes inactive or loses Contributor eligibility. This makes an ineligible primary visible for correction; role changes do not silently rewrite assignment history.

## Add an assigned user

Select **Add user** and search the eligible users. A candidate must be active and have Contributor or Manager for `agreement` globally or at this Agreement's current agency/program scope. The server rejects inactive users, Viewer-only users, out-of-scope users, active duplicates, unknown fields, and malformed identifiers.

The new user is non-primary. An assignment to one Agreement does not affect another Agreement in the same program.

## Change the primary user

Choose **Make primary** on an active eligible assignment. The operation promotes that user and demotes the previous primary atomically. It cannot promote an inactive, ineligible, missing, or removed assignment.

If the current primary is ineligible, first add or identify an eligible replacement, promote the replacement, and then remove the old assignment if appropriate.

## Remove an assigned user

A non-primary user can be removed while at least one active assignment remains. The server refuses removal of the primary and of the last assigned user. Removal is a soft delete and preserves historical references.

## Status and scope changes

The roster can change while the Agreement is `draft`, `pendingapproval`, or `active`. A terminal or deleted Agreement is locked. Every write reloads the stream, program, agency, role graph, user eligibility, status, and current roster inside one transaction.

Moving ownership or program scope changes later authorization and eligibility checks. Review the roster when the scope changes; an existing assignment remains visible even if the user no longer qualifies at the new scope.

## Independently assigned child work

The Agreement roster is not inherited by claims, claim reconciliations, payments, forecasts, monitors, amendments, commitments, reviews, or recommendations that have their own exact roster. Creating one of these children requires Contributor plus the required parent assignment and assigns its creator as that child's primary user. Later child actions require the child's exact assignment.

Ordinary child data, such as addresses, proponents, activities, budget lines, and documents, continues to use the Agreement itself as the assignment root.

For cross-entity coordination, use [Assignment Management](../admin/assignments.md). For the authorization model, see [Role permissions and exact assignments](../concepts/rbac.md).
