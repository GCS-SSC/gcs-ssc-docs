# Administrative groups and claimable work

Groups let an Agency offer an approval step, review, or additional-reviewer request to a pool of people. A member claims an item before acting. A group is an assignment choice, not a business-data permission or a substitute for an exact work assignment.

## Set up a group

Open **Groups** in the sidebar. The page is visible with a `group:read` role grant. Creating a group needs `group:create` for its Agency; editing its name, email, or members needs `group:update`; deleting it needs `group:delete`. The server checks the exact Agency on each request. A group has required English and French names and a valid email address. Its members must be active Common users who hold an active role owned by that Agency. Add members through the group's member picker; removing a member does not remove a previously completed approval or review.

Configure the group before selecting it as a default assignee in an approval step or eligible review setup. A group with no active eligible member cannot be used as an assignable group. The authoring form offers either a user or a group for an approval step. For a group step, **Require group details** can require additional evidence at claim or decision time. Publish the changed template or review setup for future work; existing runtime items keep their pinned configuration.

For example, create “Regional reviewers / Réviseurs régionaux” in Agency A, add two Agency A users, and choose that group for a review. Both members can see the unclaimed item on Home. The first eligible member to claim it becomes its actor; the other member can no longer claim that same item. An Agency B user cannot join merely by knowing the group ID.

## Claim and act

Home shows **Available to Claim** for users with an active group membership. It lists unclaimed group reviews, additional-reviewer requests, and pending approval steps. Select **Claim** on the item; a successful claim refreshes the group queue and **My Open Work**. The server rechecks membership, source-record assignment eligibility, and runtime state under the transaction lock. A claimed item is then handled in its review or approval page under the usual action rules.

If a claim fails, reload the queue. Check that the group and membership are still active, the item is still pending, and the user retains the required Contributor or approval eligibility at the exact owner. Ask a group administrator to correct membership or the configuration if necessary. Do not treat the visible button as permission to read unrelated source records. See [Approvals and completions](../concepts/approvals-completions.md), [Runtime reviews](../concepts/runtime-reviews.md), and [Role permissions](../concepts/rbac.md).
