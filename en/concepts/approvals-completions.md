# Approvals and completions

Use **Complete** when you have finished entering and checking a record’s information. Completion saves evidence of who finished the work and freezes ordinary editing. **Approval** is a separate decision. Assigned approvers review the record in order and confirm any required certifications. Both can advance a [workflow](workflows.md). Access is checked against the particular record being handled; an assignment or a visible button alone does not give you access to that record.

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

The Completion section shows the saved completion or the current requirements:

- The user, date, and comments recorded for completed work.
- A comment field and **Complete** action when your role permits completion. The action can remain visible while another prerequisite is missing.
- A locked or unavailable explanation when status, permission, or another business rule prevents completion. Choosing a visible action with an unmet prerequisite shows a warning and does not complete the record.

Submitting saves a fixed completion record for this record and your Common user account. The application checks the required business information again before saving. For a review, it checks all required assessment or checklist answers and comments. Additional reviewers must have finished their work or been removed. Their history remains available.

For records under an Agreement, completion and approval success are different events. With no applicable optional workflow, the changes triggered by successful completion happen immediately. When an approval workflow starts, recorded as `workflow_started`, those changes wait until the run succeeds. For example, a completed replacement Commitment remains inactive while approval is pending; successful approval activates it and deactivates the previous active Commitment of the same type. A denied run does not activate it.

Ordinary data edits preserve the selected Agency business status. Workflow transitions apply configured status IDs; there is no universal rule that completion writes a business status named `complete` or that an approval writes one named `approved`. Completion evidence, runtime state, business status, and active-version selection are separate facts.

An existing active workflow on the target blocks another workflow and completion. Standard workflows are explicitly selected in **Workflows** and are not started by Complete. After completion, data is frozen and a repeat completion is rejected. If approval fails, use the supported workflow recovery path; do not submit a second completion. See [Workflows](workflows.md) and the target’s guide for retry and cancellation limits.

Accounts Receivable, adjustments, Credit Memos and Corrections require approval before their accounting changes take effect. Journal Vouchers follow their optional configured approval process. Read the financial record’s guide for packet validation, source/accounting prerequisites and cancellation rules: [Receivables](../agreements/receivables.md), [Credit Memos](../proponents/credit-memos.md), [Corrections](../agreements/corrections.md) and [Journal Vouchers](../agreements/journal-vouchers.md). Credit Memo authority follows its Agency/account owner rather than inheriting the parent Agreement assignment.

## Materialize an approval route

An Approval Template defines the approval process. The application creates a Routing Slip for your record, a saved list of approval steps and decisions. Creating that route from the template is called **materialization**. It copies the published template’s ordered steps, certifications, rules for additional steps, bilingual names, and defaults. The route then progresses through states such as awaiting action, approved, or denied. Later template edits do not change this Routing Slip.

Workflows and supported review-completion processes create the approval route using their saved configuration. Use the approval section to record decisions and add steps when permitted. It does not provide a general action to manually create a replacement root route.

For a new configuration, administrators must choose eligible published templates from the same Stream. An existing route keeps the template version saved when it was created, even if that template is later changed or retired. The table groups steps by Routing Slip, shows the current route, and retains earlier slips as history where supported.

An Agreement or amendment approval-submission workflow also creates an unchangeable approval packet. An original Agreement packet snapshots the full profile, proponents, current budget, and current activities. An amendment packet records its selected amendment types and subtypes and includes only the information being changed, such as the budget, activities, or proposed duration dates. The workflow stores the packet's SHA-256 hash, and the approval view verifies it before showing the bilingual packet. Successful approval promotes the packet to an unchangeable Agreement revision: revision `0` for the original Agreement submission and the next positive revision number for an amendment. Starting another submission while one is active, changing covered data during that run, or rewriting/deleting a stored packet is blocked.

## Risk and Data Collection approvals

Agreement and amendment approval packets use schema version 3. They save the risk choice, rating labels, the successful calculation used, and evidence that the risk requirements were met. If risk is required, the selected published risk workflow must succeed for this exact record before the first packet can be saved. If saving the packet fails, the amendment is not completed and its approval workflow is not created. Skipping optional risk work does not apply a copied amendment risk proposal to the Agreement. An approval retry keeps the original risk section, even if the requirements have since changed. See [Amendments](../agreements/amendments.md).

A [Data Collection](data-collections.md) submits its answers directly to its pinned optional approval template. It uses no independent Complete action. Its answers and assignments are frozen during approval. Approval completes the collection successfully and advances the workflow. Denial follows the configured failure policy. An assigned collection approver can read the exact collection evidence without receiving parent workflow packets or unrelated casework access.

For a group-owned approval step, claim the current unresolved step before deciding. The application checks your current group membership and Agency enrollment. Claiming creates your personal approval assignment. For a Data Collection, this lets you read and approve that collection even without an assignment to the parent record. It does not let you edit answers or manage assignments. Group membership alone does not grant read access before you claim the step.

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

A manager can reassign an unresolved step to an eligible active Common user in the owning agency. Choosing someone other than the default approver requires an on-behalf type. Reassignment clears any previous decision metadata. You cannot change a decided step. Reassignment of an unresolved historical step in a finished route is available only for record types that explicitly support it.

If the template version saved for this route permits additional approvals, a manager or a user assigned to an unresolved step can insert a step before or after an eligible step. Completed work keeps its order. You cannot insert a step before resolved work or at a position earlier than the last step already acted on.

The new step requires an eligible assignee and bilingual name. Its default bilingual name and certifications come from the routing slip. Names or certifications are editable only when the snapshotted policy permits it; every added certification requires bilingual name, description, and certification text. The interface cannot override these saved rules.

## View and recover

The view action shows bilingual step names, default and assigned approvers, status, decision date, position title, on-behalf type, comment, and certification decisions. Empty, preview, current, and historical route states are intentionally distinct.

If an action is unavailable, verify ordinary owner access, the required approval permission, current-step assignment, route/entity status, and the user's Common record. For an on-behalf decision, choose a valid agency behalf type and supply actual title/date when required. If no route exists, verify that the correct published template is configured for that scope and entity. Reload after another actor decides or reassigns a step. Do not edit templates to repair an existing route; resolve the runtime state through its supported actions or create a future route from corrected published configuration.

See [Approval Templates](../programs/approval-templates.md), [Runtime Reviews](runtime-reviews.md), and [RBAC](rbac.md).
