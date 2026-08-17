# Approvals and Completions

Completions record that work on an entity is finished. Approvals route a materialized record through an ordered set of assigned approvers and certifications. Both resolve access from the exact owning record and can advance a [workflow](workflows.md); neither an assignment nor a visible action grants access to that owner.

## Supported runtime records

The common completion service supports reviews, agreement commitments, forecasts, monitors, payments, and claim reconciliations. The approval service supports those records plus recommendations and amendments. Each adapter applies its own status and business checks while sharing the same authorization, routing-slip, and UI contracts.

Reading completion or approval state requires the corresponding read permission on the owner. Completing requires assessment-save access. Approval decisions require approval-action access; creating a route, reassigning, and other administrative actions require approval-management access. Every sensitive write re-resolves the owner and permission and locks the relevant records inside the transaction.

## Complete work

The Completion section displays one of three states:

- Existing completion metadata: completing user, completion date, and comments.
- A comment field and **Complete** action when the entity is eligible and the user can act.
- A locked or unavailable explanation when status, permission, or another business rule prevents completion.

Submitting creates one completion record and applies the entity adapter's side effects. A runtime review is revalidated in strict mode, including required assessment/checklist responses and comments; all additional-reviewer rows must be completed or soft-deleted. The review becomes complete and its configured approval or review-set progression begins. Agreement-child adapters validate and transition their own lifecycle state and may start a completion-entry workflow.

Completion is not an editable note. A repeated completion is rejected and the resulting historical record remains tied to the exact entity and completing Common user.

## Materialize an approval route

An Approval Template is only configuration. Runtime materialization creates a Routing Slip, copies the published template's ordered steps, certifications, additional-step policy, bilingual names, and defaults, and then moves the route through `draft`, `pendingapproval`, `approved`, or `denied`. Later template edits do not rewrite that slip.

Some workflows materialize the route automatically. Where the UI displays **Add**, a user with approval-management access can create the applicable route manually. Missing, inactive, unpublished, wrong-scope, or wrong-entity templates prevent materialization. The table groups steps by routing slip, preserves prior slips as history where supported, and identifies the current route.

## Act on a step

Only the first unresolved step is current. **Approve** or **Deny** is available only to its assigned Common user, while the owner remains accessible and the route is not locked. In the action dialog:

- Every non-optional certification must be accepted before approval. Optional certifications may remain unset.
- A denial requires a comment.
- When the assigned approver differs from the default approver, an on-behalf type is required.
- An on-behalf type configured to require actual values also requires the acting position title and decision date; otherwise the user's stored position title and the current time are used.
- Comments and certification decisions are stored with the decision.

Approval advances to the next unresolved step; the last approval marks the slip approved. A denial marks it denied. The owning review, recommendation, agreement child, review set, and workflow are synchronized as applicable. Advancement is idempotent: the route attempts it even after a repeated-decision rejection so a decision committed before an earlier advancement failure can be repaired safely.

## Reassign and insert steps

A manager can reassign an unresolved step to an eligible active Common user in the owning agency. Choosing someone other than the default approver requires an on-behalf type. Reassignment clears any previous decision metadata. Terminal or already-decided steps cannot be altered except where an entity adapter explicitly supports terminal reassignment for unresolved historical steps.

If the materialized template permits additional approvals, a manager or a user assigned to an unresolved step can insert a step before or after an eligible anchor. Insertion uses a fractional sequence so completed order is preserved. A step cannot be inserted before resolved work, and an after-step cannot precede the greatest already-actioned sequence.

The new step requires an eligible assignee and bilingual name. Its default bilingual name and certifications come from the routing slip. Names or certifications are editable only when the snapshotted policy permits it; every added certification requires bilingual name, description, and certification text. The policy cannot be broadened by the client.

## View and recover

The view action shows bilingual step names, default and assigned approvers, status, decision date, position title, on-behalf type, comment, and certification decisions. Empty, preview, current, and historical route states are intentionally distinct.

If an action is unavailable, verify ordinary owner access, the required approval permission, current-step assignment, route/entity status, and the user's Common record. For an on-behalf decision, choose a valid agency behalf type and supply actual title/date when required. If no route exists, verify that the correct published template is configured for that scope and entity. Reload after another actor decides or reassigns a step. Do not edit templates to repair an existing route; resolve the runtime state through its supported actions or create a future route from corrected published configuration.

See [Approval Templates](../programs/approval-templates.md), [Runtime Reviews](runtime-reviews.md), and [RBAC](rbac.md).
