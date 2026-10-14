# Runtime Reviews

A **runtime review** is the assessment or checklist you complete for a particular record, such as a Claim. An administrator publishes the Review Setup that defines this work. A **review set** groups the reviews required for that record. Each review keeps the exact published questionnaire (schema) and setup versions used when it was created; these are called **pinned versions**. Reviews can also be part of a larger [workflow](workflows.md). This guide explains how to do the review; administrators design the questionnaires in [Assessment Schemas](../programs/assessment-schemas.md) and [Checklist Schemas](../programs/checklist-schemas.md).

## Open and navigate a review

Open a review from the source record's Reviews or Workflow area. Assessments use `/assessments/{reviewId}` and checklists use `/checklists/{reviewId}`. The page shows the localized schema name, source-record name, review status, and pinned schema version. Its sidebar reports each section's progress and provides Review items for additional reviewers and completion.

Access is resolved from the review through its review set to the exact owning Applicant-Recipient, Agreement child, or other supported runtime entity. Reading requires the applicable assessment-read permission; saving requires assessment-save permission. A review or approval assignment controls action eligibility but does not grant access to its source record.

The server returns not found when the id is missing, deleted, of the wrong review type, or no longer resolves through a valid owner. It masks inaccessible resources through the established authorization rules.

## Create and manage review sets

To start a direct review, open the record’s Reviews area and choose an available published setup. For example, a Claim may need an eligibility checklist followed by a financial assessment. A sequential set makes the second review available after the first succeeds; a parallel set makes eligible reviews available together. You need permission to update the source record. The technical details below explain which setups are offered and how duplicate active work is prevented.

Direct review support is declared by the entity registry and resolved through the exact owner. The generic `/api/review-sets` routes cover supported Proponents, Agreements, and Agreement children, including Claims and Closeouts. Registered qualified extension entities can participate when their host lifecycle capability declares direct reviews. A declared capability does not bypass the required owner resolver, permission, or lifecycle checks; unsupported targets return `UNSUPPORTED_REVIEW_ENTITY_TYPE`.

The source record's review-set table uses `GET /api/review-sets` with `entityType`, `entityId`, pagination, and optional literal-safe search across set ID and the pinned English/French setup name. Each row is reconstructed from the runtime snapshot and includes its non-deleted review children; the displayed agency comes from the first materialized review.

Before creation, `GET /api/review-sets/lookups/setups` returns only active, published setups that:

- target the requested entity type;
- match the exact applicable scope;
- contain active assessment/checklist schemas owned entirely by the target's owner agency; and
- remain accessible under the source entity's update permission.

For an Applicant-Recipient, applicable scopes are its exact profile plus streams reached through active agreements in its lead agency. For an Agreement-owned child, scopes are its exact parent agreement and that agreement's current active stream. The lookup is searchable by bilingual setup, agency, and stream names.

`POST /api/review-sets` requires source update access, then refreshes authorization and locks the current ownership/scope graph and setup snapshot. It rejects an ineligible or unpublished setup and permits only one non-deleted set for the same setup and target while a prior set is in a blocking nonterminal status. Creation records the published configuration and schema versions for the review set and its reviews in one transaction. Sequential plans activate the next eligible member; parallel plans activate their eligible members together. Waiting members and active work have distinct runtime states.

An authorized update user can cancel an unfinished set through `POST /api/review-sets/{reviewSetId}/cancel`. The route resolves the target from the set, refreshes ownership authorization in the protected transaction, cancels the runtime and its unfinished children. It does not delete the historical rows. Terminal runtime states (`succeeded`, `approved`, `unsuccessful`, `denied`, `cancelled`, `failed`) reject cancellation.

## Complete an assessment

An assessment shows the published questionnaire version saved when your review was created. Work through its sections and subsections:

- Answer applicable numeric questions and add comments when their configured policy requires them.
- Dependencies determine which questions and calculations apply. Calculated values are derived rather than accepted as authoritative user input.
- The runtime summary calculates section scores, weighted score, overall result, generated outcomes, and completion readiness from the pinned scoring matrix and helpers.
- For generated outcomes, accept the recommended strategy or select another configured strategy. A different strategy requires a justification; comments remain available.
- Add custom outcomes only when the setup permits them.
- Record review alignment, its numeric result, and narrative only when alignment is enabled.

**Save** checks the active section and saves the full response in the required format, after checking your current permission again within the transaction. Saving does not mean completing: incomplete required answers can remain in progress. Once a review or its review set is complete, denied, or cancelled, the page is locked and no further response mutation is accepted.

## Complete a checklist

For example, when checking whether a Claim includes the required supporting documents, choose **Pass** if the requirement is met or **Fail** if it is not. Add the explanation required by that question’s comment rule. Use **Save** to keep work in progress; use Completion only after all required questions, comments, and additional-reviewer requests are finished. Use **Explain** to understand how your answers produced the overall result.

A checklist presents pinned bilingual questions grouped by section and subsection. Choose **Pass** or **Fail**, or **Not applicable** when that question offers it. Comments may be optional, always required, required on failure, required on Not applicable, or required on either of those answers. The sidebar shows answered counts and the live result. A required question still needs one of its configured answers; Not applicable is an explicit answer, not an unanswered question.

The result is always evaluated server-side from the pinned rule tree. It can be `pass`, `fail`, or `pass_with_considerations`. **Explain** displays the matched groups and triggering questions; it is an explanation of the deterministic calculation, not an editable result. A normal save validates known, unique question keys but permits incomplete required work. Completion applies the stricter required-answer and required-comment rules.

## Additional reviewers

When the schema has not disabled reviewers, the Review section can track additional reviewer follow-up:

1. A user with assessment-save access adds an assignee from the schema agency's active Common users. Creation always starts with a blank comment.
2. Only the assigned Common user can edit that row's comment, reassign it to another eligible agency user, or mark it complete. The row must still be incomplete and the parent review unlocked.
3. A user with the assessment-child delete permission can mark as deleted while retaining history a row while the review is unlocked.

The list shows total and active rows. Completing the main review is blocked until every non-deleted additional-reviewer row is completed or removed. Assignment remains an action rule, not a source-record access grant. All mutations re-resolve ownership, permission, row assignment, and lock state inside the transaction.

## Group review ownership

A published group default creates unclaimed review work rather than assigning the workflow initiator. Claim it from Home or the review’s claim action with current group membership and Contributor eligibility for the exact source owner. Claiming does not require prior personal assignment or `manage_assignments`; it creates the exact assignment if needed and preserves existing assigned users and the current primary. An empty roster makes the claimant primary. A second claim is rejected once another member succeeds.

Additional-reviewer requests can also be assigned to an eligible group. A member must claim the request before acting as its reviewer; the assigned reviewer’s comment/completion rules still apply. Group membership never grants access to unrelated source records. If claiming fails, reload and check membership, current owner role scope, and whether the item remains active.

## Finish, approve, and advance

Use the Completion section only when responses are ready. Completion revalidates the entire pinned assessment or checklist with strict completion rules, rejects pending additional reviewers, records the completing Common user, time, and comments, and locks the review as complete in one transaction. If the review member has an approval template, its routing slip is then processed through the ordinary approval section.

The review set advances according to its published member order and policy. Successful review/approval work advances to the next member. A denied member can end or deny the set according to its runtime rules; when the set belongs to a workflow, a successful terminal set advances the workflow and an unsuccessful set fails it. Historical runtime records continue to use their pinned versions.

Retry creates a successor attempt; it does not reopen historical runtime rows. The direct review clone route requires a terminal standalone `review_set` runtime and a requested review whose outcome is `denied`, `cancelled`, `failed`, or `unsuccessful`. It copies the pinned runtime plan into a new set, creates fresh review records and response containers, and preserves predecessor links to earlier versions and attempts. A repeated concurrent request resolves to the same successor rather than creating duplicate attempts. Reviews owned by a workflow use that workflow’s retry path instead.

For example, after a standalone checklist set fails, an authorized user can retry the unsuccessful review into a new attempt. The original answers and decisions remain historical; complete the fresh successor rather than attempting to edit the failed record. Current ownership, assignment, and parent business-status guards still apply.

## Invalid historical definitions

A runtime uses its pinned assessment definition. The server accepts a genuinely unauthored definition as empty and supplies empty optional section/outcome matrices for older compatible definitions. Malformed authored content is not silently replaced with an empty assessment: loading returns `ASSESSMENT_DEFINITION_INVALID` (500). Record the review ID and report the problem to the application maintainer. Do not complete an apparently empty replacement or change the current schema expecting it to repair the historical pin.

## Recovery

If saving or completion is unavailable, check the page's permission and locked state, complete or remove outstanding additional-reviewer rows, and fill every required answer, comment, outcome justification, and alignment value. Reload after another reviewer or approver acts so counts and state are current. Do not try to repair a pinned historical response by editing its current schema; publish configuration changes for future reviews and use the supported retry action where available.

See [Approvals and Completions](approvals-completions.md), [Workflows](workflows.md), and [RBAC](rbac.md).
