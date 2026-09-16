# Workflows

Workflows connect a stream's published reviews, recommendations, and approvals to an exact business record. Choose an explicit `standard` workflow for optional process work, use `approval_submission` for the record's approval path, or use `risk_rating` to calculate an Agreement risk rating. Closeout uses approval submission; it does not have a separate `close_out` purpose. Business statuses, publication states, and runtime states are distinct.

## Configure a workflow setup

Open a program and stream, then choose **Workflow Setups**. The detail editor groups identity, routing, transitions, and behaviour.

| Field | Meaning |
| --- | --- |
| English/French identity | Administrative name and description. |
| Entity type | Runtime target. |
| Start behavior | Determined by the target’s declared capabilities: standard workflows are explicitly selected; Agreement approval is explicit; child approval submission starts with Completion. |
| Purpose | `standard`, `approval_submission`, or Agreement-only `risk_rating`. |
| Allowed start statuses | Source statuses from which the workflow may start. |
| Cancellation/execution-failure status | Workflow-level fallback transition for cancellation or deterministic engine failure. |
| Ordered members | Any linear sequence of published review sets, recommendation sets, and root approval templates. Each has materialization, success, and failure target transitions. |
| Default owners | One mapping per nested review/recommendation member, with optional owner redirection. |
| Allow retry | Allows the latest failed attempt to retry its pinned setup. |

A setup belongs to the exact stream in the URL. Read and mutation operations require the matching `transfer_payment` role ceiling and scope; exact business assignments do not grant configuration access.

Agreement approval submission starts explicitly. Amendments and Closeouts require a published approval-submission workflow at Completion, with a terminal-success path. Claims, reconciliations, commitments, forecasts, payments, and monitors can complete with an optional approval-submission workflow. Sequence numbers and nested owner mappings must be complete and unique. Target statuses are Agency-owned status IDs, not hard-coded words such as `inreview` or `complete`.

## Publish and retire

New setups are drafts. Publish validates dependencies and creates immutable version 1. Saving a published setup changes only its working copy; publishing a real change stores the next immutable snapshot, while publishing unchanged content is a no-op.

Publication fails when a linked review setup, recommendation setup, or approval template is not published or has been retired. A published configuration pins the exact review plan, recommendation plan, member approvals, and final approval used by future attempts. Existing attempts remain pinned when administrators edit or republish the setup.

Retiring a published setup is permanent and prevents new selection. Historical attempts keep their configuration and lineage. Only an unreferenced draft can be soft-deleted.

## Composable runtime sequence

Several published standard workflows may coexist for the same scope and entity type. The user explicitly selects an eligible setup; the API requires `workflowSetupId` for `purpose: "standard"`. Approval submission and Risk Rating each use their selected published configuration. At most one workflow can be active for an exact target across all purposes. A terminal attempt releases that constraint; another eligible standard run may then start, including after Completion when the business status is not terminal. Completion never selects or starts a standard workflow.

Members execute strictly by their unique positive sequence:

1. The engine materializes the next root review set, recommendation set, or approval template and applies its optional materialization transition.
2. Review/recommendation sets retain their internal sequential or parallel rules and member approvals. Nested work uses its published default owner only when that user still has effective Contributor eligibility at the runtime owner.
3. Root success applies the member's optional success transition and materializes the next member atomically. Root failure applies its failure transition and fails the run.
4. With no remaining member, the run completes. Cancellation and deterministic engine failure use workflow-level fallback transitions.

A Not Recommended result fails the recommendation set only when that member's **Fail set on Not Recommended** option was published as true. Otherwise the runtime advances to the next member or final stage. This policy is snapshotted with the plan.

Runtime states are `pending`, `active`, `awaiting_action`, `paused`, `succeeded`, `approved`, `unsuccessful`, `denied`, `cancelled`, and `failed`. These system states are not configurable Agency business statuses. Items and immutable transition history identify the pinned current member and every applied target-status change.

## Completion and a worked sequence

Completion records that ordinary editing is finished; it is not an editable business status. An active workflow blocks Completion. For a supported child record, Completion atomically either starts the selected approval-submission workflow or records `no_workflow`. Amendments and Closeouts refuse Completion when their required approval workflow is missing. If workflow creation fails, Completion rolls back too.

When no workflow applies, positive completion effects run immediately. With a workflow, they wait until its positive terminal outcome. A successful commitment becomes the active commitment for its Agreement/type, replacing the prior active one; a forecast similarly becomes active for its Agreement/year. A successful reconciliation closes its open work; a final one prevents additional reconciliation and can apply the Agency's configured final claim status. A failed or cancelled approval attempt does not produce those positive effects. Adding configuration later does not retroactively change an already recorded `no_workflow` completion.

For example, configure a commitment approval-submission workflow with a review set followed by a root approval template. The caseworker saves the lines and completes the commitment. Completion locks ordinary edits and starts the published review. Completing the review progresses to the assigned approver. Approval of the final step makes the new commitment active and retires the previous active commitment of the same type. If the reviewer or approver rejects the work, inspect the failed attempt and use its permitted recovery/retry path; do not try to complete the same record again.

## Conditions and Risk Rating

Members can be conditional on the owning Agreement's configured selection fields. Conditions across fields use AND; allowed options within one field use OR. Start captures values and eligibility, and skipped members retain their published positions in the display without creating tasks. A retry keeps its original publication pins and captures current values anew. See [custom fields](../programs/custom-fields.md) for examples, required-value failures, and definition-retirement constraints.

An Agreement Risk Rating workflow is selected independently from approval submission. Its publication pins one assessment source and a one-to-one mapping of ordered assessment score maxima to active stream ratings. A successful run maps the assessment score to the first applicable maximum and applies the captured risk score. Invalid or stale evidence follows the execution-failure path without overwriting the prior Agreement score. The chosen conditional route must still contain that risk assessment.

## Agreement approval submission

The Agreement starts approval submission explicitly. An amendment starts its required approval submission atomically with Completion. The shared Workflow section displays the resulting attempt. Starting it performs one transaction that locks the current source, creates the workflow run, and writes one immutable `Funding_Case_Agreement_Approval_Submission` packet with schema version 1, submission time, and lowercase SHA-256 canonical hash.

An Agreement packet includes its profile with resolved bilingual reference labels, linked Proponents and registry values, current budget, and current activities. An amendment packet includes its selected amendment types/subtypes and only the domains being changed: budget for a budget amendment, activities for an activity amendment, and proposed dates for a duration amendment. Unchanged Agreement profile and Proponent data are omitted from an amendment packet.

Source budget/activity version IDs are retained for lineage. Mutable foreign-key labels are resolved into the packet so later reference-data renames do not rewrite what approvers saw. The UI presents the saved packet in grouped, collapsible sections and does not rebuild it from live values.

While an approval-submission run is active, protected Agreement/amendment profile, budget, activity, deletion, and lifecycle operations reject conflicting writes. A cancelled or failed run applies the configured failure status and does not promote data.

## Approval completion and revisions

Before successful completion, the runtime locks the Agreement and recomputes the packet hash. A mismatch fails promotion. It then:

1. promotes only the packet-approved amendment domains when the target is an amendment;
2. closes the amendment and assigns its revision number when applicable;
3. writes exactly one `Funding_Case_Agreement_Revision` linked to the approval submission; and
4. applies the configured success status and completes the run.

The initial Agreement approval writes revision 0. Approved amendments increment from the latest revision. The unique approval-submission link makes completion idempotent if advancement is retried.

::: warning Capacity remains an operator check
Approval packets freeze the proposed amendment budget but the amendment promotion path still does not add the current-budget cross-Agreement stream-capacity check. Confirm capacity before final approval; packet integrity proves what was approved, not that the proposal fits the stream ceiling.
:::

## Work with a run

The source Workflow section shows start/retry/cancel actions, the pinned sequence, statuses, recommendation questions, approval steps, previous unsuccessful attempts, and any immutable approval packet. Saving a recommendation retains its editable runtime state; submitting validates required responses and derives the outcome from its published deciding question.

The top-level recommendation page supports direct Assigned Work links. Updates require an active exact recommendation assignment, a current Contributor ceiling for its resolved owner, and an editable active runtime item. An assigned approval user can read the approval-submission packet needed for that approval even when ordinary Agreement reading is unavailable.

Exact recommendation, review, and approval assignments are separate. They do not grant parent or sibling access. See [Role permissions and exact assignments](./rbac.md).

## Cancel, retry, and recover

Cancellation is available only for an active run. It cancels active runtime children and workflow items, marks the run cancelled, and applies the configured failure status in one transaction.

Retry is available for the latest `unsuccessful`, `denied`, `cancelled` or `failed` attempt when its pinned definition permits retry and no successor has already been created. It reuses the exact publication versions, even if the setup has since been retired or edited; current publication eligibility is a rule for new runs, not a reason to replace historical retry pins. Authorization is checked against the target’s current owner, while configuration applicability remains historical. The target must still be nonterminal and in a start status allowed by that pinned definition, with no conflicting active run. Retry creates a successor attempt and preserves the original evidence.

If a published default owner is absent, deleted, inactive, or lacks current Contributor eligibility when nested work materializes, the engine records an owner blocker and changes the run to `paused`; it does not create partially assigned work. When owner redirection is enabled, the initiator or actor who triggered materialization can select an eligible replacement. An independently authorized assignment manager can also recover it. Candidates are active users with effective Contributor access at the exact runtime owner. Resume reauthorizes and locks the casework, verifies every unresolved blocker and replacement, records the choices, and continues without recreating an already-materialized root set.

Every unresolved blocker must be supplied exactly once. Unrelated users cannot inspect candidates or resume. If no candidate is eligible, correct role/scope access or future setup ownership; cancellation remains the supported way to end an active run when recovery is inappropriate.

If start is unavailable, verify target status, purpose, stream scope, published dependencies, assignment and Contributor ceiling, and the absence of an active run or blocking review set. Historical packets and attempts cannot be edited; correct source/configuration for a future run or use the supported retry path.

See [Recommendation schemas and setups](../programs/recommendations.md), [Approval templates](../programs/approval-templates.md), [Agreement amendments](../agreements/amendments.md), and [Approvals and completions](approvals-completions.md).
