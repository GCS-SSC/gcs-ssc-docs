# Administrative groups and claimable work

Groups let an Agency offer an approval step, review, or additional-reviewer request to a pool of people. A member claims an item before acting. Group membership does not grant access to business data. You still need the permission and direct assignment required for the task.

## Set up a group

Open **Groups** in the sidebar. Your role needs the following Group permission at the group's Agency:

| Task | Minimum level |
| --- | --- |
| View groups | Viewer |
| Create or edit a group and its members | Contributor |
| Delete a group | Manager |

Enter the required English and French names and a valid email address. Add members through the member picker. Members must be active application users with an active role owned by that Agency. A global role alone does not qualify someone for Agency group membership. Removing a member does not erase their completed approvals or reviews.

Groups in a deleted Agency disappear from lists and pickers and cannot be opened or changed. If a group becomes unavailable, reload and ask an Agency administrator to check its status.

Set up the group before choosing it as the default assignee for an approval step or a review that supports group assignment. The group must have at least one active, eligible member. The authoring form offers either a user or a group for an approval step. For a group step, **Require group details** can require additional evidence at claim or decision time. Publish the changed template or review setup to apply it to future work. Existing tasks keep the configuration they started with.

For example, create "Regional reviewers / Réviseurs régionaux" in Agency A, add two Agency A users, and choose that group for a review. Both members can see the unclaimed item on Home. The first eligible member to claim it becomes responsible for the task. The other member can no longer claim that item. An Agency B user cannot join merely by knowing the group ID.

## Claim and act

Home shows **Available to Claim** for users with an active group membership. It lists unclaimed group reviews, additional-reviewer requests, and pending approval steps. Select **Claim** on the item. After a successful claim, the group queue and **My Open Work** refresh. The application rechecks your membership, your eligibility for assignment to the source record, and the task's status before saving. Two people cannot claim the same item. Open the claimed item's review or approval page to continue under the usual action rules.

If a claim fails, reload the queue. Check that the group and membership are still active, the item is still pending, and the user still has the required Contributor permission or approval eligibility for the agency or program that actually owns the work. Ask a group administrator to correct membership or the configuration if necessary. Do not treat the visible button as permission to read unrelated source records. See [Approvals and completions](../concepts/approvals-completions.md), [Runtime reviews](../concepts/runtime-reviews.md), and [Role permissions](../concepts/rbac.md).

## Recommendation and collection group work

Workflow recommendations and Data Collections can also use a published group default. Before someone claims one of these tasks, no person is automatically assigned. Claiming adds you to the assigned-user list if you are not already on it. Existing assignments and the primary user stay unchanged. If the list was empty, you become primary. A claim does not replace a list prepared by an assignment coordinator.

You cannot delete a group while tasks or saved configurations still refer to it. The application returns `GROUP_IN_USE`. Published workflow versions also count, so changing a working copy does not remove the published reference. Keep groups used by completed approvals. To stop offering new work, change the membership or future configuration.

For example, a coordinator adds a lead to a group-owned recommendation before it is claimed. Another eligible group member claims it. Both assignments remain and the lead stays primary. The claimant can act only while the direct record assignment, required role permission and task state still allow the work. See [Data Collections](../concepts/data-collections.md).
