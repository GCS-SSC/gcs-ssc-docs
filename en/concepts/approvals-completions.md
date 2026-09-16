# Approvals and Completions

Completions record that work on an entity is finished. Approvals route a materialized record through an ordered set of assigned approvers and certifications. Both resolve access from the exact owning record and can advance a [workflow](workflows.md); neither an assignment nor a visible action grants access to that owner.

## Supported runtime records

Completion supports runtime reviews and the following Agreement children: Claims, reconciliations, Commitments, Forecasts, Payments, Monitors, amendments, and Closeouts. Agreement approval submission is started explicitly; the Agreement itself has no Complete action. Proponents support direct reviews but have no root completion or standard workflow.

| Target | What completion does |
| --- | --- |
| Claim, reconciliation, Commitment, Forecast, Payment, Monitor | Validates the target and records completion. Starts the configured published `approval_submission` workflow if one applies; otherwise records `no_workflow`. |
| Amendment, Closeout | Requires a published approval-submission workflow. Missing configuration rejects completion; successful approval must end in a configured terminal Agency status. |
| Runtime review | Validates required responses and additional reviewers, records review completion, and advances its own review/approval runtime. |

Reading completion or approval state requires the corresponding read permission on the owner. Completing a runtime review requires assessment-save access. Completing an Agreement child requires its Contributor permission and exact assignment, together with its business prerequisites. Approval decisions require approval-action access; creating a route, reassigning, and other administrative actions require approval-management access. Every sensitive write re-resolves the owner and permission and locks the relevant records inside the transaction.

## Complete work

The Completion section displays one of three states:

- Existing completion metadata: completing user, completion date, and comments.
- A comment field and **Complete** action when the entity is eligible and the user can act.
- A locked or unavailable explanation when status, permission, or another business rule prevents completion.

Submitting creates one immutable completion record tied to the exact entity and Common user. Required business data is validated again inside the transaction. A runtime review is checked in strict mode, including required assessment/checklist answers and comments; additional reviewers must be complete or soft-deleted.

For Agreement children, completion and approval success are different events. With no applicable optional workflow, positive completion effects happen immediately. With `workflow_started`, they wait for a positive terminal outcome of that run. For example, a completed replacement Commitment remains inactive while approval is pending; successful termination activates it and deactivates the previous active Commitment of the same type. A denied run does not activate it.

Ordinary data edits preserve the selected Agency business status. Workflow transitions apply configured status IDs; there is no universal rule that completion writes a business status named `complete` or that an approval writes one named `approved`. Completion evidence, runtime state, business status, and active-version selection are separate facts.

An existing active workflow on the target blocks another workflow and completion. Standard workflows are explicitly selected in **Workflows** and are not started by Complete. After completion, data is frozen and a repeat completion is rejected. If approval fails, use the supported workflow recovery path; do not submit a second completion. See [Workflows](workflows.md) and the target’s guide for retry and cancellation limits.

## Materialize an approval route

An Approval Template is only configuration. Runtime materialization creates a Routing Slip, copies the published template's ordered steps, certifications, additional-step policy, bilingual names, and defaults, and then advances the route through its shared runtime states, including awaiting action and approved/denied outcomes. Later template edits do not rewrite that slip.

Workflows and supported review-completion paths materialize the route from their pinned configuration. The approval section manages decisions and permitted additional steps; it does not offer general manual creation of a replacement root route. New configuration must reference eligible published templates in the same stream. An existing runtime uses its pinned template definition; later edits or retirement do not replace that historical definition. The table groups steps by routing slip, preserves prior slips as history where supported, and identifies the current route.

An Agreement or amendment approval-submission workflow also creates an immutable approval packet. An original Agreement packet snapshots the full profile, proponents, current budget, and current activities. An amendment packet records its selected amendment types and subtypes and includes only the selected snapshot domains—budget, activities, or proposed duration dates. The workflow stores the packet's SHA-256 hash, and the approval view verifies it before showing the bilingual packet. Successful approval promotes the packet to an immutable Agreement revision: revision `0` for the original Agreement submission and the next positive revision number for an amendment. Starting another submission while one is active, changing covered data during that run, or rewriting/deleting a stored packet is blocked.

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
