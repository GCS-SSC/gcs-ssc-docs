# Runtime Reviews

Runtime reviews are the assessments and checklists created from a published Review Setup. They belong to a review set on a source record, use pinned schema and setup versions, and can participate in a larger [workflow](workflows.md). This guide covers doing the review; administrators configure its design in [Assessment Schemas](../programs/assessment-schemas.md) and [Checklist Schemas](../programs/checklist-schemas.md).

## Open and navigate a review

Open a review from the source record's Reviews or Workflow area. Assessments use `/assessments/{reviewId}` and checklists use `/checklists/{reviewId}`. The page shows the localized schema name, source-record name, review status, and pinned schema version. Its sidebar reports each section's progress and provides Review items for additional reviewers and completion.

Access is resolved from the review through its review set to the exact owning Applicant-Recipient, Agreement child, or other supported runtime entity. Reading requires the applicable assessment-read permission; saving requires assessment-save permission. A review or approval assignment controls action eligibility but does not grant access to its source record.

The server returns not found when the id is missing, deleted, of the wrong review type, or no longer resolves through a valid owner. It masks inaccessible resources through the established authorization rules.

## Create and manage review sets

The generic `/api/review-sets` collection currently accepts direct targets only for `applicantrecipient`, `fundingcaseamendment`, `fundingcaseagreementcommitment`, `fundingcaseforecast`, `fundingcasemonitor`, `fundingcasepayment`, and `fundingclaimreconcile`. Other values may exist in the shared enum but return `UNSUPPORTED_REVIEW_ENTITY_TYPE` on this route surface.

The source record's review-set table uses `GET /api/review-sets` with `entityType`, `entityId`, pagination, and optional literal-safe search across set ID and the pinned English/French setup name. Each row is reconstructed from the runtime snapshot and includes its non-deleted review children; the displayed agency comes from the first materialized review.

Before creation, `GET /api/review-sets/lookups/setups` returns only active, published setups that:

- target the requested entity type;
- match the exact applicable scope;
- contain active assessment/checklist schemas owned entirely by the target's owner agency; and
- remain accessible under the source entity's update permission.

For an Applicant-Recipient, applicable scopes are its exact profile plus streams reached through active agreements in its lead agency. For an Agreement-owned child, scopes are its exact parent agreement and that agreement's current active stream. The lookup is searchable by bilingual setup, agency, and stream names.

`POST /api/review-sets` requires source update access, then refreshes authorization and locks the current ownership/scope graph and setup snapshot. It rejects an ineligible or unpublished setup and permits only one non-deleted set for the same setup and target while a prior set is in a blocking non-terminal status. Creation atomically stores a `draft` set with its published configuration/version and pinned schema versions. A sequential setup materializes only its first member; a parallel setup materializes every member. Each member creates a draft assessment or checklist runtime row.

An authorized update user can cancel a non-terminal set through `POST /api/review-sets/{reviewSetId}/cancel`. The route resolves the target from the set, refreshes ownership authorization in the protected transaction, sets the set to `cancelled` with success `false`, and sets every active child review to `cancelled`. It does not delete the historical rows. Sets already `complete`, `approved`, `denied`, `withdrawn`, or `cancelled` reject cancellation as terminal.

## Complete an assessment

An assessment renders the published definition pinned when the review was materialized. Work through its sections and subsections:

- Answer applicable numeric questions and add comments when their configured policy requires them.
- Dependencies determine which questions and calculations apply. Calculated values are derived rather than accepted as authoritative user input.
- The runtime summary calculates section scores, weighted score, overall result, generated outcomes, and completion readiness from the pinned scoring matrix and helpers.
- For generated outcomes, accept the recommended strategy or select another configured strategy. A different strategy requires a justification; comments remain available.
- Add custom outcomes only when the setup permits them.
- Record review alignment, its numeric result, and narrative only when alignment is enabled.

**Save** validates the active section and persists the complete normalized response in a fresh-authorized transaction. Saving does not mean completing: incomplete required answers can remain in progress. Once a review or its review set is complete, denied, or cancelled, the page is locked and no further response mutation is accepted.

## Complete a checklist

A checklist presents the pinned bilingual questions grouped by section and subsection. Choose **Pass** or **Fail** and provide comments according to each question's policy: optional, required, or required on failure. The sidebar shows answered counts and the live result.

The result is always evaluated server-side from the pinned rule tree. It can be `pass`, `fail`, or `pass_with_considerations`. **Explain** displays the matched groups and triggering questions; it is an explanation of the deterministic calculation, not an editable result. A normal save validates known, unique question keys but permits incomplete required work. Completion applies the stricter required-answer and required-comment rules.

## Additional reviewers

When the schema has not disabled reviewers, the Review section can track additional reviewer follow-up:

1. A user with assessment-save access adds an assignee from the schema agency's active Common users. Creation always starts with a blank comment.
2. Only the assigned Common user can edit that row's comment, reassign it to another eligible agency user, or mark it complete. The row must still be incomplete and the parent review unlocked.
3. A user with the assessment-child delete permission can soft-delete a row while the review is unlocked.

The list shows total and active rows. Completing the main review is blocked until every non-deleted additional-reviewer row is completed or removed. Assignment remains an action rule, not a source-record access grant. All mutations re-resolve ownership, permission, row assignment, and lock state inside the transaction.

## Finish, approve, and advance

Use the Completion section only when responses are ready. Completion revalidates the entire pinned assessment or checklist with strict completion rules, rejects pending additional reviewers, records the completing Common user, time, and comments, and locks the review as complete in one transaction. If the review member has an approval template, its routing slip is then processed through the ordinary approval section.

The review set advances according to its published member order and policy. Successful review/approval work advances to the next member. A denied member can end or deny the set according to its runtime rules; when the set belongs to a workflow, a successful terminal set advances the workflow and an unsuccessful set fails it. Historical runtime records continue to use their pinned versions.

For an Applicant-Recipient review shown as denied, **Retry review** clones the denied review within the same non-terminal review set. The action requires clone-review permission and fresh ownership authorization. It does not clone a non-denied review and cannot reopen a terminal set.

## Recovery

If saving or completion is unavailable, check the page's permission and locked state, complete or remove outstanding additional-reviewer rows, and fill every required answer, comment, outcome justification, and alignment value. Reload after another reviewer or approver acts so counts and state are current. Do not try to repair a pinned historical response by editing its current schema; publish configuration changes for future reviews and use the supported retry action where available.

See [Approvals and Completions](approvals-completions.md), [Workflows](workflows.md), and [RBAC](rbac.md).
