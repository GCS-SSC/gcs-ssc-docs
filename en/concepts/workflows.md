# Workflows

Workflows connect a stream's published review, recommendation, and approval configuration to runtime records. A `standard` workflow handles ordinary review/completion progression. An `approval_submission` workflow creates the immutable evidence packet used to approve an Agreement or amendment.

## Configure a workflow setup

Open a program and stream, then choose **Workflow Setups**. The detail editor groups identity, routing, transitions, and behaviour.

| Field | Meaning |
| --- | --- |
| English/French identity | Administrative name and description. |
| Entity type | Runtime target. |
| Entry point | `completion` starts through a completion action; `recommendation` starts explicitly. |
| Purpose | `standard` or `approval_submission`. |
| Allowed start statuses | Source statuses from which the workflow may start. |
| Start/success/failure status | Status applied to the target at each outcome. |
| Review set | Optional published review plan that runs first. |
| Recommendation set | Optional ordered recommendation plan; required for recommendation entry and approval submission. |
| Source approval | Optional final approval after other stages. |
| Allow retry | Allows the latest failed attempt to retry its pinned setup. |

A setup belongs to the exact stream in the URL. Read and mutation operations require the matching `transfer_payment` role ceiling and scope; exact business assignments do not grant configuration access.

Approval-submission purpose is allowed only at stream scope for `fundingcaseagreement` or `fundingcaseamendment`. Publication requires a published recommendation set and at least one approval stage: a member approval, recommendation-plan final approval, or source approval.

## Activate and publish

New setups are drafts. Activate creates published version 1. Saving an active setup changes its working copy; Publish validates dependencies, stores the next immutable configuration snapshot, and advances the version.

Publication fails when a linked review setup, recommendation setup, or approval template is inactive or unpublished. A published configuration embeds the exact review plan, recommendation plan, member approvals, and final approval used by future runs. Existing runs remain pinned when administrators edit or republish the setup.

Deleting a setup soft-deletes and deactivates it for new runs. Historical runs keep their configuration and lineage.

## Standard runtime sequence

The runtime resolves an active published setup by target type, stream, purpose, entry point, and current status. Exact-scope uniqueness prevents two active setups with the same scope, entity type, and purpose, but broader and narrower matching scopes can still overlap. If several match, current resolution selects the highest database setup ID; it does not prefer the most specific scope or fail on ambiguity. Avoid overlapping setups.

Stages execute in this order:

1. A configured review set runs. Failure fails the workflow; success advances it.
2. Recommendation members run one at a time in configured order. The run initiator becomes primary assignee of each newly materialized recommendation.
3. An optional member approval gates that member's result.
4. An optional final/source approval gates the completed plan.
5. With no remaining stage, the run completes.

A Not Recommended result fails the recommendation set only when that member's **Fail set on Not Recommended** option was published as true. Otherwise the runtime advances to the next member or final stage. This policy is snapshotted with the plan.

Start, success, failure, and cancellation apply the setup's configured target statuses. Runtime states include processing, pending review, pending recommendation, pending recommendation approval, pending source approval, complete, failed, and cancelled.

## Agreement approval submission

Agreement and amendment detail pages mount an approval-submission Workflow section under Recommendation. Starting it performs one transaction that locks the current source, creates the workflow run, and writes one immutable `Funding_Case_Agreement_Approval_Submission` packet with schema version 1, submission time, and lowercase SHA-256 canonical hash.

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

The source Workflow section shows start/retry/cancel actions, the pinned sequence, statuses, recommendation questions, approval steps, previous unsuccessful attempts, and any immutable approval packet. Saving a recommendation retains `draft`; submitting validates required responses and derives the outcome from its published deciding question.

The top-level recommendation page supports direct Assigned Work links. Updates require an active exact recommendation assignment, a current Contributor ceiling for its resolved owner, and `draft` status. An assigned approval user can read the approval-submission packet needed for that approval even when ordinary Agreement reading is unavailable.

Exact recommendation, review, and approval assignments are separate. They do not grant parent or sibling access. See [Role permissions and exact assignments](./rbac.md).

## Cancel, retry, and recover

Cancellation is available only for an active run. It cancels active runtime children and workflow items, marks the run cancelled, and applies the configured failure status in one transaction.

Retry is available only for the latest unsuccessful run when its pinned setup is still active, published, scope-valid, and permits retry. It reuses that attempt's setup and entry point; it does not silently select a newer setup. An active run is returned rather than duplicated.

If start is unavailable, verify target status, purpose, stream scope, published dependencies, assignment and Contributor ceiling, and the absence of an active run or blocking review set. Historical packets and attempts cannot be edited; correct source/configuration for a future run or use the supported retry path.

See [Recommendation schemas and setups](../programs/recommendations.md), [Approval templates](../programs/approval-templates.md), [Agreement amendments](../agreements/amendments.md), and [Approvals and completions](approvals-completions.md).
