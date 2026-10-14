# Approvals and Completions

Use **Complete** when you have finished entering and checking a record’s information. Completion saves evidence of who finished the work and freezes ordinary editing. **Approval** is a separate decision: assigned approvers review the record in order and confirm any required certifications. Both can advance a [workflow](workflows.md). Access is checked against the particular record being handled; an assignment or a visible button alone does not give you access to that record.

## Supported runtime records

Here, **runtime** means the actual work created for a record, rather than the template an administrator designed. For example, a published checklist is a design; the checklist you fill in for a particular Claim is a runtime review.

Completion supports runtime reviews, Claims, reconciliations, Commitments, Forecasts, Payments, Monitors, amendments, Closeouts, Accounts Receivable and adjustments, Credit Memos, Corrections and Journal Vouchers. Agreement approval submission is started explicitly; the Agreement itself has no Complete action. Proponents support direct reviews but have no root completion or standard workflow.

| Target | What completion does |
| --- | --- |
| Claim, reconciliation, Commitment, Forecast, Payment, Monitor, Journal Voucher | Validates the target and records completion. Starts the configured published `approval_submission` workflow if one applies; otherwise records `no_workflow`. |
| Amendment, Closeout, Accounts Receivable/adjustment, Credit Memo, Correction | Requires a published approval-submission workflow. Missing configuration rejects completion; successful approval must end in a configured terminal Agency status. |
| Runtime review | Validates required responses and additional reviewers, records review completion, and advances its own review/approval runtime. |

To read completion or approval information, you need the relevant read permission for the owning record. To complete a review, you need permission to save its assessment. To complete a record under an Agreement, you need Contributor permission and an assignment to that particular record, and its required business information must be ready.

To approve or deny, you need permission to act on the approval. Creating a route, reassigning a step, or performing other administrative actions requires permission to manage approvals. Before saving any sensitive change, the application checks the current owner and your permissions again and locks the relevant records in the transaction.

## Complete work

The Completion section displays one of three states:

- Existing completion metadata: completing user, completion date, and comments.
- A comment field and **Complete** action when the entity is eligible and the user can act.
- A locked or unavailable explanation when status, permission, or another business rule prevents completion.

Submitting creates one unchangeable completion record tied to the exact entity and Common user. Required business data is validated again inside the transaction. A runtime review is checked in strict mode, including required assessment/checklist answers and comments; additional reviewers must be complete or marked deleted while retaining history.

For Agreement children, completion and approval success are different events. With no applicable optional workflow, positive completion effects happen immediately. With `workflow_started`, they wait for a positive terminal outcome of that run. For example, a completed replacement Commitment remains inactive while approval is pending; successful termination activates it and deactivates the previous active Commitment of the same type. A denied run does not activate it.

Ordinary data edits preserve the selected Agency business status. Workflow transitions apply configured status IDs; there is no universal rule that completion writes a business status named `complete` or that an approval writes one named `approved`. Completion evidence, runtime state, business status, and active-version selection are separate facts.

An existing active workflow on the target blocks another workflow and completion. Standard workflows are explicitly selected in **Workflows** and are not started by Complete. After completion, data is frozen and a repeat completion is rejected. If approval fails, use the supported workflow recovery path; do not submit a second completion. See [Workflows](workflows.md) and the target’s guide for retry and cancellation limits.

Accounts Receivable, adjustments, Credit Memos and Corrections require approval before their positive posting effects; Journal Vouchers use their optional configured path. Read the financial record’s guide for packet validation, source/accounting prerequisites and cancellation rules: [Receivables](../agreements/receivables.md), [Credit Memos](../proponents/credit-memos.md), [Corrections](../agreements/corrections.md) and [Journal Vouchers](../agreements/journal-vouchers.md). Credit Memo authority follows its Agency/account owner rather than inheriting the parent Agreement assignment.

## Materialize an approval route

An Approval Template defines the approval process. When the application creates that process for your record (called **materialization**), it creates a Routing Slip: the saved list of approval steps and decisions. It copies the published template’s ordered steps, certifications, rules for additional steps, bilingual names, and defaults. The route then progresses through states such as awaiting action, approved, or denied. Later template edits do not change this Routing Slip.

Workflows and supported review-completion processes create the approval route using their saved configuration. Use the approval section to record decisions and add steps when permitted. It does not provide a general action to manually create a replacement root route.

For a new configuration, administrators must choose eligible published templates from the same Stream. An existing route keeps the template version saved when it was created, even if that template is later changed or retired. The table groups steps by Routing Slip, shows the current route, and retains earlier slips as history where supported.

An Agreement or amendment approval-submission workflow also creates an unchangeable approval packet. An original Agreement packet snapshots the full profile, proponents, current budget, and current activities. An amendment packet records its selected amendment types and subtypes and includes only the selected snapshot domains—budget, activities, or proposed duration dates. The workflow stores the packet's SHA-256 hash, and the approval view verifies it before showing the bilingual packet. Successful approval promotes the packet to an unchangeable Agreement revision: revision `0` for the original Agreement submission and the next positive revision number for an amendment. Starting another submission while one is active, changing covered data during that run, or rewriting/deleting a stored packet is blocked.

## Risk and Data Collection approvals

New Agreement and amendment approval packets use schema version 3, including captured risk choice, rating labels, exact successful calculation and readiness evidence. A published required risk workflow must succeed for the exact target and selected setup before first packet capture. A rejected capture rolls back amendment completion and workflow creation together. Optional skipped risk work does not apply a copied amendment proposal. Approval retries preserve the original risk section; they do not recapture changed requirements. See [Amendments](../agreements/amendments.md).

A [Data Collection](data-collections.md) submits its answers directly to its pinned optional approval template. It uses no independent Complete action. Its answers and assignment roster freeze during approval; approval succeeds the collection and advances the workflow, while denial follows failure policy. An assigned collection approver can read the exact collection evidence without receiving parent workflow packets or unrelated casework access.

For a group-owned approval step, claim the current unresolved step before deciding. Active group membership and eligible Agency enrollment are checked afresh. Successful claim creates the personal approval assignment; for a collection, that assignment permits its exact approval/read context even without parent casework assignment, but does not permit editing answers or managing its roster. Pre-claim membership alone is not business read access.

## Act on a step

For example, a program manager followed by a financial approver must approve a Commitment. If you are the financial approver, you wait until the program manager’s step is approved. When your step becomes current, read the evidence, confirm the required certifications, and choose **Approve** or **Deny**. If you deny it, explain the reason in the required comment so the officer knows why the route stopped.

Only the first unresolved step is current. **Approve** or **Deny** is available only to its assigned Common user, while the owner remains accessible and the route is not locked. In the action dialog:

- Every non-optional certification must be accepted before approval. Optional certifications may remain unset.
- A denial requires a comment.
- When the assigned approver differs from the default approver, an on-behalf type is required.
- An on-behalf type configured to require actual values also requires the acting position title and decision date; otherwise the user's stored position title and the current time are used.
- Comments and certification decisions are stored with the decision.

Approval advances to the next unresolved step; the last approval marks the slip approved. A denial marks it denied. The owning review, recommendation, agreement child, review set, and workflow are synchronized as applicable. Repeating advancement does not duplicate its effects. Even when a repeated decision is rejected, the route tries to advance again. This safely recovers a decision that was saved before an earlier attempt to advance failed.

## Reassign and insert steps

A manager can reassign an unresolved step to an eligible active Common user in the owning agency. Choosing someone other than the default approver requires an on-behalf type. Reassignment clears any previous decision metadata. Terminal or already-decided steps cannot be altered except where an entity adapter explicitly supports terminal reassignment for unresolved historical steps.

If the materialized template permits additional approvals, a manager or a user assigned to an unresolved step can insert a step before or after an eligible anchor. Insertion uses a fractional sequence so completed order is preserved. A step cannot be inserted before resolved work, and an after-step cannot precede the greatest already-actioned sequence.

The new step requires an eligible assignee and bilingual name. Its default bilingual name and certifications come from the routing slip. Names or certifications are editable only when the snapshotted policy permits it; every added certification requires bilingual name, description, and certification text. The policy cannot be broadened by the client.

## View and recover

The view action shows bilingual step names, default and assigned approvers, status, decision date, position title, on-behalf type, comment, and certification decisions. Empty, preview, current, and historical route states are intentionally distinct.

If an action is unavailable, verify ordinary owner access, the required approval permission, current-step assignment, route/entity status, and the user's Common record. For an on-behalf decision, choose a valid agency behalf type and supply actual title/date when required. If no route exists, verify that the correct published template is configured for that scope and entity. Reload after another actor decides or reassigns a step. Do not edit templates to repair an existing route; resolve the runtime state through its supported actions or create a future route from corrected published configuration.

See [Approval Templates](../programs/approval-templates.md), [Runtime Reviews](runtime-reviews.md), and [RBAC](rbac.md).
