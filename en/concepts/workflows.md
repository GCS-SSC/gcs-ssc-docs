# Workflows

Workflows connect a stream's published review, recommendation, and approval configuration to runtime records. A `standard` workflow handles ordinary review/completion progression. An `approval_submission` workflow creates the immutable evidence packet used to approve an Agreement or amendment. A `close_out` workflow controls [Agreement Closeout](../agreements/closeouts.md).

## Configure a workflow setup

Open a program and stream, then choose **Workflow Setups**. The detail editor groups identity, routing, transitions, and behaviour.

| Field | Meaning |
| --- | --- |
| English/French identity | Administrative name and description. |
| Entity type | Runtime target. |
| Entry point | `completion` starts through a completion action; `recommendation` starts explicitly. |
| Purpose | `standard`, `approval_submission`, or Closeout-specific `close_out`. |
| Allowed start statuses | Source statuses from which the workflow may start. |
| Cancellation/execution-failure status | Workflow-level fallback transition for cancellation or deterministic engine failure. |
| Ordered members | Any linear sequence of published review sets, recommendation sets, and root approval templates. Each has materialization, success, and failure target transitions. |
| Default owners | One mapping per nested review/recommendation member, with optional owner redirection. |
| Allow retry | Allows the latest failed attempt to retry its pinned setup. |

A setup belongs to the exact stream in the URL. Read and mutation operations require the matching `transfer_payment` role ceiling and scope; exact business assignments do not grant configuration access.

Approval submission is allowed only at stream scope for `fundingcaseagreement` or `fundingcaseamendment`. Closeout is allowed only for `fundingcaseagreementcloseout` and has stricter `draft`/`denied` start, `inreview` first-materialization, `complete` final-success, and `denied` failure/fallback rules. Sequences and nested owner mappings must be complete and unique.

## Activate and publish

New setups are drafts. Activate creates published version 1. Saving an active setup changes its working copy; Publish validates dependencies, stores the next immutable configuration snapshot, and advances the version.

Publication fails when a linked review setup, recommendation setup, or approval template is inactive or unpublished. A published configuration embeds the exact review plan, recommendation plan, member approvals, and final approval used by future runs. Existing runs remain pinned when administrators edit or republish the setup.

Deleting a setup soft-deletes and deactivates it for new runs. Historical runs keep their configuration and lineage.

## Composable runtime sequence

The runtime resolves an active published setup by target type, stream, purpose, entry point, and current status. Exact-scope uniqueness prevents two active setups with the same scope, entity type, and purpose, but broader and narrower matching scopes can still overlap. If several match, current resolution selects the highest database setup ID; it does not prefer the most specific scope or fail on ambiguity. Avoid overlapping setups.

Members execute strictly by their unique positive sequence:

1. The engine materializes the next root review set, recommendation set, or approval template and applies its optional materialization transition.
2. Review/recommendation sets retain their internal sequential or parallel rules and member approvals. Nested work uses its published default owner only when that user still has effective Contributor eligibility at the runtime owner.
3. Root success applies the member's optional success transition and materializes the next member atomically. Root failure applies its failure transition and fails the run.
4. With no remaining member, the run completes. Cancellation and deterministic engine failure use workflow-level fallback transitions.

A Not Recommended result fails the recommendation set only when that member's **Fail set on Not Recommended** option was published as true. Otherwise the runtime advances to the next member or final stage. This policy is snapshotted with the plan.

Runtime states are `running`, `paused`, `complete`, `failed`, and `cancelled`. Items and immutable transition history identify the pinned current member and every applied target-status change.

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

If a published default owner is absent, deleted, inactive, or lacks current Contributor eligibility when nested work materializes, the engine records an owner blocker and changes the run to `paused`; it does not create partially assigned work. When owner redirection is enabled, the initiator or actor who triggered materialization can select an eligible replacement. An independently authorized assignment manager can also recover it. Candidates are active users with effective Contributor access at the exact runtime owner. Resume reauthorizes and locks the casework, verifies every unresolved blocker and replacement, records the choices, and continues without recreating an already-materialized root set.

Every unresolved blocker must be supplied exactly once. Unrelated users cannot inspect candidates or resume. If no candidate is eligible, correct role/scope access or future setup ownership; cancellation remains the supported way to end an active run when recovery is inappropriate.

If start is unavailable, verify target status, purpose, stream scope, published dependencies, assignment and Contributor ceiling, and the absence of an active run or blocking review set. Historical packets and attempts cannot be edited; correct source/configuration for a future run or use the supported retry path.

See [Recommendation schemas and setups](../programs/recommendations.md), [Approval templates](../programs/approval-templates.md), [Agreement amendments](../agreements/amendments.md), and [Approvals and completions](approvals-completions.md).
