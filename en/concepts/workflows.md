# Workflows

Workflows connect a stream's published review, recommendation, and approval configuration to a runtime record such as a payment, forecast, monitor, commitment, amendment, claim reconciliation, or review. They change the source record's status while work is underway and preserve the exact configuration used by each attempt.

## Configure a workflow setup

Open **Programs**, open a program and stream, and choose **Workflow Setups**. The list supports bilingual search, creation, opening a setup, and deletion when your transfer-payment permissions allow it. The detail page groups the fields into Identity, Routing, Transitions, and Behaviour.

| Field | Meaning |
| --- | --- |
| English/French name and description | Bilingual administrative identity shown in the current locale. |
| Entity type | The kind of runtime record to which the setup applies. |
| Entry point | `completion` starts as part of completing a source record; `recommendation` is started explicitly from the workflow section. |
| Allowed start statuses | At least one source status from which a run may start. |
| Start, success, and failure status | Status applied to the source at start, successful completion, or unsuccessful termination. |
| Review set | Optional published review plan that runs first. |
| Recommendation set | Optional ordered published recommendation plan. |
| Source approval template | Optional final approval after reviews and recommendations. |
| Active | Makes a published setup eligible for resolution. |
| Allow retry | Permits a failed attempt to be retried with that attempt's setup. |

A setup belongs to the exact stream in the URL and stored scope. Read, create, update, publish, and delete operations enforce the parent program/stream relationship and transfer-payment permission. Writes re-resolve authorization and lock the ownership path inside the transaction; a related identifier does not broaden access.

## Activate and publish

New setups are drafts. **Activate** is available only for a draft and creates version 1 of its published configuration. Saving an active setup changes the working copy and displays a pending-publication state; **Publish** is available only when those working values differ from the published configuration and increments the version.

Activation or publication fails if a linked review setup, recommendation setup, or approval template is inactive or lacks a published version. Publication stores a complete snapshot of the workflow and embeds the linked published review plan, recommendation plan, per-recommendation approvals, and final approval. Existing runs therefore do not change when an administrator edits or republishes setup records later.

Deleting a setup soft-deletes and deactivates it. It no longer resolves for new runs, while historical runs retain their pinned configuration and lineage.

## Runtime sequence

The runtime resolves an active, published setup for the source entity type, owning stream scope, entry point, and current source status. If several records match, current code selects the lowest setup id; administrators should avoid overlapping active setups because the UI does not provide a priority control.

The configured stages execute in this order:

1. The review set, when configured. A failed review set fails the workflow. A successful set advances it. A second blocking review set in draft, in-progress, or pending-approval state prevents a duplicate start.
2. Recommendation members, in their configured order. A draft response can be saved. Submission validates every required response and derives the result from the deciding question. A member's approval route must finish before the result advances. A final `not_recommended` result fails the run; a recommended result advances to the next member.
3. The source approval template, when configured, runs after the preceding stages. Approval completes the run; denial fails it.
4. With no remaining stage, the run completes immediately.

Starting changes the source to the configured start status. A completed run applies the configured success status. Failed and cancelled runs have `success = false` and apply the configured failure status. The run statuses exposed by the UI include processing, pending review, pending recommendation, pending recommendation approval, pending source approval, complete, failed, and cancelled.

## Work with a run

The source record's Workflow section shows the applicable start action, the snapshotted step sequence, current statuses, recommendation questions, approvals, and previous unsuccessful attempts. A completion-entry setup does not expose a manual start button: complete the source action that owns the entry point. A recommendation-entry setup exposes **Start recommendation** when editing is allowed. If an approval was already materialized outside an active workflow run, the approval section remains available.

Select a review to open its checklist or assessment and return to the source. Select a recommendation to edit its bilingual published questions. Saving keeps it in draft; submitting checks the published schema and then either opens its approval, advances to the next recommendation, or ends the run. Final and recommendation approvals use the ordinary routing-slip actions and assignment rules.

The runtime read requires ordinary assessment read access to the owning context. Starting, saving/submitting a recommendation, cancelling, and retrying require assessment-save access and a registered Common user. Assignment to a review or approval determines who may act; it is not an access grant to the owning record.

## Cancel, retry, and recover

Cancellation is allowed only while a run is active. In one fresh-authorized transaction it cancels active recommendations, reviews, review sets, routing slips, and workflow items, then marks the run cancelled and applies the configured failure status.

**Retry** appears only for an unsuccessful run whose pinned setup is still active, published, in the same valid scope, and has **Allow retry** enabled. Retry uses that failed run's setup and entry point; it does not silently switch to a newer active setup. Only the latest unsuccessful attempt can start a new retry, and an active run is returned instead of creating a duplicate.

If start is unavailable, confirm that the setup is active and published, the entity type and entry point match, the source has an allowed status, all linked plans are published, and no run or blocking review set is active. Correct the working setup and publish it for future runs. A historical attempt cannot be rewritten; use its Previous view for evidence and start or retry only through the supported action.

See [Recommendation Schemas and Setups](../programs/recommendations.md), [Approval Templates](../programs/approval-templates.md), and [Approvals and Completions](approvals-completions.md).
