# Workflows

A **workflow** takes one record through an ordered process, such as an eligibility review, a recommendation, then approval. It uses the reviews, recommendations, Data Collections, and approvals published by the Agency. A **setup** is the process design. A **run** or **attempt** is that process started for a particular record. Each run keeps the published versions it started with, called its **pinned configuration**.

Choose a `standard` workflow explicitly for optional process work. Use `approval_submission` for the record’s approval process or `risk_rating` to calculate an Agreement risk rating. Closeout uses approval submission; it has no separate `close_out` purpose. Keep these separate: the record’s Agency business status, whether the setup is draft or published, and the run’s progress.

## Configure a workflow setup

This section is for administrators who design the process. Officers using an existing process can go to [Work with a run](#work-with-a-run). A **member** is one stage in the process; a **transition** is a configured change to the record’s business status when that stage starts, succeeds, or fails.

Open an Agency and choose **Workflow Setups** to author and publish the design. Then open the Program Stream and add the published Agency Workflow on its **Workflow Setups** tab. The detail editor groups identity, routing, transitions, and behaviour. The Stream link resolves local values such as risk ratings and field availability. See [Agency catalogs](../admin/agency-catalogs.md).

| Field | Meaning |
| --- | --- |
| English/French identity | Required names (up to 255 Unicode characters each) and descriptions. |
| Entity type | Kind of record the workflow handles, such as an Agreement or Claim. |
| Start behavior | Determined by the target’s declared capabilities: standard workflows are explicitly selected; Agreement approval is explicit; child approval submission starts with Completion. |
| Purpose | `standard`, `approval_submission`, or Agreement/amendment `risk_rating`. |
| Allowed start statuses | Source statuses from which the workflow may start. |
| Cancellation/execution-failure status | Status change applied when the run is cancelled or the workflow engine detects a failure. |
| Ordered members | Any linear sequence of published review sets, recommendation sets, Data Collections, and root approval templates. Each can change the record’s status when it starts, succeeds, or fails. |
| Default owners | A mapping per nested review/recommendation member and at most one per Data Collection; eligible user or group defaults, with optional owner redirection. |
| Allow retry | Allows the latest failed attempt to retry its pinned setup. |

A design belongs to the Agency shown in its URL. To create or publish it, you need the required role permission for that Agency. To add or remove a Stream link, you need the required `transfer_payment` role permission for that scope. An assignment to a business record does not grant configuration access.

Start an Agreement’s approval submission explicitly. For an amendment or Closeout, Complete requires a published approval-submission workflow with a successful route that ends in a terminal Agency business status. Claims, reconciliations, commitments, forecasts, payments, and monitors can complete with an optional approval-submission workflow. Administrators must provide complete, unique sequence numbers and default-owner mappings for the reviews and recommendations within sets. Status changes use the Agency’s configured status IDs; they do not assume status names such as `inreview` or `complete`.

## Publish and retire

New setups are drafts. Publishing checks the linked configurations and saves version 1, which cannot be changed. Saving edits to a published setup changes only the working copy. Publishing those changes saves the next fixed version; publishing without any changes creates no new version.

Publication fails when a linked review setup, recommendation setup, Data Collection or approval template is not published or has been retired. A published configuration pins the exact review plan, recommendation plan, member approvals, and final approval used by future attempts. Existing attempts remain pinned when administrators edit or republish the setup.

Retiring a published setup is permanent and prevents new selection. Historical attempts keep their configuration and links to earlier versions and attempts. Only an unreferenced draft can be marked deleted while retaining history.

## Composable runtime sequence

Several published standard workflows may coexist for the same Stream and entity type. The user explicitly selects an eligible setup; the API requires `workflowSetupId` for `purpose: "standard"`. Approval submission and Risk Rating each use their selected published configuration. At most one workflow can be active for an exact target across all purposes. A terminal attempt releases that constraint; another eligible standard run may then start, including after Completion when the business status is not terminal. Completion never selects or starts a standard workflow.

Stages run in their configured order. Each has a unique sequence number greater than zero:

1. The application creates the next review set, recommendation set, Data Collection, or approval route from a root approval template. If configured, it changes the record’s business status when creating this work.
2. Within a review or recommendation set, reviews or recommendations still follow their own sequential or parallel rules and approvals. A default user receives the work only if that user still has Contributor eligibility for the owning record.
3. When the whole stage succeeds, the application applies its configured success status change and creates the next stage in one transaction. If the stage fails, it applies the configured failure status change and fails the run.
4. After the last stage, the run finishes. Cancellation and a failure detected by the workflow engine use the workflow’s configured fallback status changes.

A Not Recommended result fails the recommendation set only when that member's **Fail set on Not Recommended** option was published as true. Otherwise the runtime advances to the next member or final stage. This policy is snapshotted with the plan.

Runtime states are `pending`, `active`, `awaiting_action`, `paused`, `succeeded`, `approved`, `unsuccessful`, `denied`, `cancelled`, and `failed`. These system states are not configurable Agency business statuses. Items and unchangeable transition history identify the pinned current member and every applied target-status change.

## Completion and a worked sequence

Completion records that ordinary editing is finished; it is not an editable business status. An active workflow blocks Completion. For a supported child record, Completion either starts the selected approval-submission workflow or records `no_workflow`, as one transaction. Amendments and Closeouts refuse Completion when their required approval workflow is missing. If workflow creation fails, Completion rolls back too.

When no workflow applies, the changes triggered by successful completion happen immediately. With a workflow, they wait until the run succeeds. A successful commitment replaces the active commitment of the same type for that Agreement. A successful forecast replaces the active forecast for that Agreement and fiscal year. A successful reconciliation closes its open work; a final one prevents additional reconciliation and can apply the Agency's configured final claim status. A failed or cancelled approval attempt does not make those changes. Adding configuration later does not retroactively change an already recorded `no_workflow` completion.

For example, configure a commitment approval-submission workflow with a review set followed by a root approval template. The caseworker saves the lines and completes the commitment. Completion locks ordinary edits and starts the published review. Completing the review progresses to the assigned approver. Approval of the final step makes the new commitment active and retires the previous active commitment of the same type. If the reviewer or approver rejects the work, inspect the failed attempt and use its permitted recovery or retry action. Do not try to complete the same record again.

## Conditions and Risk Rating

Workflow member conditions can use Agency custom-field options and Agreement profile values: Agreement subtype, Further distribution (yes/no), and recipient subtype. Choose **Any** or **All** when matching the Agreement's selected recipient subtypes. Conditions for different fields are combined with AND; alternatives selected for one field are combined with OR. The editor displays each condition in a dedicated modal and preserves its selected labels. Starting the run saves the Agreement values and determines which stages apply. Skipped stages keep their published positions but create no tasks. A retry keeps the original published versions but captures current Agreement values for its new attempt; it does not rewrite the prior attempt's evidence. A missing required field or unavailable Stream value blocks deployment of a new configuration. See [custom fields](../programs/custom-fields.md) for examples and definition-retirement constraints.

An Agreement Risk Rating workflow is selected independently from approval submission. Its published configuration identifies one assessment as the source and maps each ordered maximum score to one active Stream risk rating. A successful run maps the assessment score to the first applicable maximum and applies the captured risk score. Invalid or stale evidence follows the execution-failure path without overwriting the prior Agreement score. The chosen conditional route must still contain that risk assessment.

Amendment workflows can also condition a stage on selected amendment subtypes, with Any/All matching. For example, send only amendments with the Emergency subtype to an additional approval stage. The lookup groups choices by Program/Stream within the Agency; a choice from another Stream does not make that route applicable to the target. Published conditions and captured subtype IDs/labels remain evidence for that attempt.

## Designate risk evidence and owners

A risk workflow supports Agreements and amendments. In its review-set member, enable **Sets risk rating** and explicitly choose the assessment from that review set’s published plan. Exactly one workflow member and one nested assessment supply the risk score; this need not be the first assessment. A Data Collection, checklist or another occurrence using the same assessment schema cannot substitute. Publish the design with valid ordered scoring bands, then link it to the exact Stream/entity type. Enable the risk-required option only when a successful exact-target risk run must precede approval submission; the default is optional.

For example, a review set contains Eligibility first and Financial risk second. Select Financial risk as the source and map its score maxima to Stream ratings. Finishing Eligibility produces no risk result. Even finishing Financial risk does not apply its score until the entire workflow succeeds. A missing designated assessment or skipped conditional route blocks scoring rather than silently using Eligibility. On an amendment, the result updates only its proposal; approval later applies the captured proposal to the Agreement. See [Amendment risk](../agreements/amendments.md).

Review, recommendation and Data Collection owner mappings can choose an eligible user or an Agency group. A group-owned task starts unclaimed. The person who started the workflow is not assigned automatically. An eligible group member must claim the task before editing and still needs the required role permission for its owning record. An unavailable default owner pauses the workflow. When choosing a replacement, identify the exact task within its set. Repeated uses of the same definition remain separate tasks.

## Data Collection members

Add a published Agency Data Collection directly as an ordered workflow member in any purpose. Its questionnaire collects information without deriving a recommendation. It may include its own pinned approval template; that approval counts toward the route’s required approval stages. Selecting the same definition twice creates independent responses, revisions and rosters. Choose its row to answer inline in the Workflow section. See [Data Collections](data-collections.md) for setup, saving, submitting and recovery.

## Agreement approval submission

For an Agreement, start approval submission explicitly; for an amendment, completing the amendment starts its required approval submission in the same transaction. The Workflow section shows the resulting attempt. The application saves an approval packet: a fixed copy of the information being submitted, so approvers can see exactly what they are deciding on.

Starting submission locks the source record, creates the run, and saves the fixed packet together. If any part fails, none of these changes is saved. The stored record, `Funding_Case_Agreement_Approval_Submission`, includes schema version 3, the submission time, and a lowercase canonical SHA-256 hash. This fingerprint lets the application check that the packet has not changed.

An Agreement packet includes its profile with resolved bilingual reference labels, linked Proponents and registry values, current budget, and current activities. Its version-3 risk section records whether risk is enabled and will be applied, the score, bilingual rating labels, the calculation source, and whether the risk requirements were met. An amendment packet also includes its selected amendment types and subtypes and only the domains being changed: budget for a budget amendment, activities for an activity amendment, and proposed dates for a duration amendment. Unchanged Agreement profile and Proponent data are omitted from an amendment packet.

The packet keeps the IDs of the budget and activity versions used. It also saves the bilingual names of referenced values so later renaming does not change what approvers saw. The UI presents the saved packet in grouped, collapsible sections and does not rebuild it from live values.

While approval submission is active, you cannot make conflicting changes to the Agreement or amendment’s profile, budget, activities, deletion, or lifecycle. A cancelled or failed run applies the configured failure status and does not apply the submitted changes to the Agreement.

## Approval completion and revisions

Before the approval process finishes successfully, the application locks the Agreement and checks the saved packet’s fingerprint again. If it no longer matches, the submitted information cannot be applied. Otherwise the application:

1. applies only the amendment changes approved in the packet when the target is an amendment;
2. closes the amendment and assigns its revision number when applicable;
3. saves exactly one Agreement revision, `Funding_Case_Agreement_Revision`, linked to the approval submission; and
4. applies the configured success status and completes the run.

The initial Agreement approval writes revision 0. Approved amendments increment from the latest revision. The unique link to the approval submission prevents a repeated advancement attempt from creating another revision.

Before applying the approved budget, the application checks this Agreement’s annual forecast, Claim, and successful reconciliation usage against the proposed budget again. It does not check the separate Program Stream funding ceiling across all Agreements or whether that ceiling would be exceeded. Before final amendment approval, manually reconcile proposed program funding against that Stream capacity, including other Agreements. Passing the annual usage check or the packet fingerprint check does not prove that the proposal fits within the Stream’s funding ceiling. See [Amendment budget safeguards](../agreements/amendments.md).

## Work with a run

For day-to-day work, open the source record’s Workflow section and check the current stage. Open the assigned review, recommendation, or Data Collection and finish its required work. If the stage is an approval, the assigned approver decides it. Return to the Workflow section to see whether the process has moved to the next stage, is waiting for someone, or needs recovery.

For example, if a Claim is waiting for a financial review assigned to a colleague, being assigned to the Claim does not let you complete that colleague’s review. Check the separate review assignment. If the configured reviewer is unavailable and the run is paused, use the permitted owner-recovery action described below.

The source Workflow section shows start, retry, and cancel actions, the pinned sequence, statuses, recommendation questions, approval steps, previous unsuccessful attempts, and any unchangeable approval packet. Saving a recommendation keeps it in progress. Submitting checks required answers and calculates the outcome from its published deciding question. When a setup appears more than once, each occurrence has its own answers and status. Select the occurrence at the intended stage before answering.

You can open a recommendation directly from Assigned Work. Reading still requires Viewer access in its owning scope, unless you have an approval assignment for that exact recommendation. A work assignment alone does not grant read access. To change it, you must be actively assigned to that specific recommendation, have current Contributor permission for its owning record, and the recommendation’s workflow item must be active and editable. An assigned approver can read the approval-submission packet needed for the decision, even without ordinary read access to the Agreement.

Start, retry, cancel, and completion actions can remain visible when your role permits them but the record is not ready. Selecting one shows the missing prerequisite, such as an assignment, required information, or an eligible status. A visible action does not mean the work can proceed.

Exact recommendation, review, and approval assignments are separate. They do not grant access to the parent record or other related records. See [Role permissions and exact assignments](./rbac.md).

## Cancel, retry, and recover

Cancel to end an active run. Retry to create a new attempt after an unsuccessful run. Recover to resume paused work after resolving its assignment problem. These actions depend on your current access and the rules below. A **terminal** state means the attempt has ended, whether successfully, unsuccessfully, or by cancellation. It is separate from the record’s Agency business status and from Completion.

Cancellation is available only for an active run. It cancels active runtime children and workflow items, marks the run cancelled, and applies the configured failure status in one transaction.

Retry creates a new attempt and keeps the original attempt’s evidence. It is available only when all of these conditions are met:

- You are retrying the latest `unsuccessful`, `denied`, `cancelled`, or `failed` attempt.
- The configuration saved for that attempt permits retry, and no next attempt has already been created.
- Your permissions apply to the record’s current owner. The setup’s applicability is still checked using the original configuration.
- The record has a nonterminal business status (one that permits further work), is in a start status allowed by the saved configuration, and has no conflicting active run.

Retry uses the same published versions as the original attempt, even if an administrator has since changed or retired the setup. The current rules for selecting a setup apply to a new run, rather than replacing the saved versions used by a retry.

If the setup names no default user or group, the person who started the workflow remains assigned to the work. If it names a default user who has been deleted, is inactive, or no longer has Contributor permission for the owning record when a review or other task is created, the workflow pauses (`paused`). It records the assignment problem without creating partly assigned work.

To recover paused work:

1. You need current Contributor permission and an assignment to the exact record whose workflow is paused. With that access, the person who started the workflow or triggered task creation can choose replacements if the setup permits it. An assignment manager also needs that work access; the assignment-management permission alone cannot resume the workflow.
2. Choose an active user who currently has Contributor permission for the particular record that owns the task. Supply a replacement for each unresolved assignment problem, exactly once.
3. Resume the workflow. The application checks your current access, locks the record, checks every problem and replacement, saves the choices, and continues. It does not recreate a review or recommendation set that was already created.

Users without the required connection to this work cannot view replacement candidates or resume it. If no one is eligible, ask the administrator to correct the role or scope permissions, or change default ownership for future setups. Cancel the active run when recovery is inappropriate.

If you cannot start a workflow, check:

- Does the record’s current business status allow this workflow to start?
- Does the workflow’s purpose and Program Stream match the record? Are all its linked configurations published?
- Are you assigned to the required record and do you have Contributor permission at its current scope?
- Is another active workflow or a blocking review set already present?

Historical packets and attempts cannot be changed. Correct the record or configuration for a future run, or use the supported retry action.

See [Recommendation schemas and setups](../programs/recommendations.md), [Approval templates](../programs/approval-templates.md), [Agreement amendments](../agreements/amendments.md), and [Approvals and completions](approvals-completions.md).
