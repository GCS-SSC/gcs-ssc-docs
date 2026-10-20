# Runtime reviews

A **runtime review** is the assessment or checklist you complete for a particular record, such as a Claim. An administrator publishes the Review Setup that defines this work. A **review set** groups the reviews required for that record. Each review keeps the published questionnaire, or schema, and setup versions used when it was created. These are its **pinned versions**. Reviews can also be part of a larger [workflow](workflows.md). This guide explains how to do the review; administrators design the questionnaires in [Assessment Schemas](../programs/assessment-schemas.md) and [Checklist Schemas](../programs/checklist-schemas.md).

## Open and navigate a review

Open a review from the source record's Reviews or Workflow area. Assessments use `/assessments/{reviewId}` and checklists use `/checklists/{reviewId}`. The page shows the localized schema name, source-record name, review status, and pinned schema version. Its sidebar reports each section's progress and provides Review items for additional reviewers and completion.

Review access depends on the record that owns its review set, such as an Applicant-Recipient or a record under an Agreement. To read a review, you need Viewer access in its owning scope. Being assigned to the review or its source record does not replace that access. An approval assignment can let you read the exact review needed for that decision, without granting access to its parent or other work. Intake reviews still require Funding Case read access. Saving requires the applicable Contributor permission and exact work assignment.

An Agreement review returns you to its owning Agreement. If its saved return link points elsewhere or is missing, the return action opens that Agreement's Risk Rating section. Changing the interface language keeps the return destination in that language.

The server returns not found when the id is missing, deleted, of the wrong review type, or no longer resolves through a valid owner. Authorization rules can also hide records you do not have permission to read.

## Create and manage review sets

To start a direct review, open the record’s Reviews area and choose an available published setup. For example, a Claim may need an eligibility checklist followed by a financial assessment. A sequential set makes the second review available after the first succeeds; a parallel set makes eligible reviews available together. You need permission to update the source record. The available choices depend on the record, its Agency, and your access.

Direct reviews are available on supported Proponents, Agreements, Agreement children such as Claims and Closeouts, and extension records that support them. The table shows each set and its reviews. Search by set ID or the saved English or French setup name.

Only active, published setups are offered. They must target this record type, apply to its current scope, and contain active questionnaires from the owning Agency. You also need permission to update the source record.

For a Proponent, applicable setups can be linked to its profile or to Streams reached through its active Agreements. For an Agreement child, they can be linked to the parent Agreement or its current active Stream. Proponent review access and setup selection use the relevant Agency context, so access in another Agency does not make every set available.

Starting a set saves its published setup and questionnaire versions together. You cannot start another set for the same setup and record while an earlier attempt still blocks new work. Sequential sets activate the next eligible review; parallel sets activate eligible reviews together.

Use **Cancel** to end an unfinished set. Cancellation ends its unfinished reviews and retains the history. A completed, unsuccessful, denied, cancelled, or failed set cannot be cancelled again.

**Add** and **Cancel** can remain visible when your role permits them but another prerequisite is missing. Choosing the action then explains what prevents it, such as a missing assignment or a locked record. Correct that condition and reload before retrying.

## Complete an assessment

An assessment shows the published questionnaire version saved when your review was created. Work through its sections and subsections:

- Answer applicable numeric questions and add comments when their configured policy requires them.
- Dependencies determine which questions and calculations apply. The application calculates derived values rather than using values entered by a user.
- The summary uses the saved scoring rules to show section scores, the weighted score, the overall result, generated outcomes, and whether the review is ready to complete.
- For generated outcomes, accept the recommended strategy or select another configured strategy. A different strategy requires a justification; comments remain available.
- Add custom outcomes only when the setup permits them.
- Record review alignment, its numeric result, and narrative only when alignment is enabled.

**Save** checks the active section and saves your full response after checking your current permission again. You can save work in progress with required answers still incomplete. Once the review or its review set is complete, denied, or cancelled, the page is locked and you cannot change the answers.

## Complete a checklist

For example, when checking whether a Claim includes the required supporting documents, choose **Pass** if the requirement is met or **Fail** if it is not. Add the explanation required by that question’s comment rule. Use **Save** to keep work in progress; use Completion only after all required questions, comments, and additional-reviewer requests are finished. Use **Explain** to understand how your answers produced the overall result.

A checklist presents pinned bilingual questions grouped by section and subsection. Choose **Pass** or **Fail**, or **Not applicable** when that question offers it. Comments may be optional, always required, required on failure, required on Not applicable, or required on either of those answers. The sidebar shows answered counts and the live result. A required question still needs one of its configured answers; Not applicable is an explicit answer, not an unanswered question.

The result is always evaluated server-side from the pinned rule tree. It can be `pass`, `fail`, or `pass_with_considerations`. **Explain** displays the matched groups and triggering questions; you can inspect the calculation but cannot edit the result. Saving checks that answers refer to known questions without duplicates, but permits incomplete required work. Completion applies the stricter required-answer and required-comment rules.

## Additional reviewers

When the schema has not disabled reviewers, the Review section can track additional reviewer follow-up:

1. A user with assessment-save access adds an assignee from the schema agency's active Common users. Creation always starts with a blank comment.
2. Only the assigned user can edit their request's comment, reassign it to another eligible Agency user, or mark it complete. They must still be able to read the review. The request must be incomplete and the review unlocked. Reassignment lists are available in that request's editing context; an assignment does not grant access to the general reviewer catalog.
3. A user with the required delete permission can remove a request while the review is unlocked. Its history remains.

The list shows total and active rows. Completing the main review is blocked until every non-deleted additional-reviewer row is completed or removed. An assignment lets the reviewer act only if they also have access to the source record. Before saving a change, the application checks the current owner, permissions, assignment, and lock state again.

## Group review ownership

When the published setup assigns a group, the review starts unclaimed. The person who started the workflow is not assigned automatically. Claim the review from Home or its claim action. You need current group membership and Contributor permission for the exact owning record. Claiming does not require prior personal assignment or `manage_assignments`; it creates the exact assignment if needed and preserves existing assigned users and the current primary. An empty roster makes the claimant primary. A second claim is rejected once another member succeeds.

Additional-reviewer requests can also be assigned to an eligible group. A member must claim the request before acting as its reviewer; the assigned reviewer’s comment/completion rules still apply. Group membership never grants access to unrelated source records. If claiming fails, reload and check membership, current owner role scope, and whether the item remains active.

## Finish, approve, and advance

Use the Completion section only when responses are ready. Completion revalidates the entire pinned assessment or checklist with strict completion rules, rejects pending additional reviewers, records the completing Common user, time, and comments, and locks the review as complete in one transaction. If the review member has an approval template, its routing slip is then processed through the ordinary approval section.

The review set advances according to its published member order and policy. Successful review/approval work advances to the next member. A denied member can end or deny the set according to its runtime rules; when the set belongs to a workflow, a successful terminal set advances the workflow and an unsuccessful set fails it. Historical runtime records continue to use their pinned versions.

Retry creates a successor attempt; it does not reopen historical runtime rows. For a direct review retry, its standalone `review_set` must have ended and the review must be `denied`, `cancelled`, `failed`, or `unsuccessful`. The retry copies the saved plan into a new set with fresh reviews and answers. It keeps links to the earlier versions and attempts. Repeated requests for the same retry return the same new attempt rather than creating duplicates. Reviews owned by a workflow use that workflow’s retry path instead.

For example, after a standalone checklist set fails, an authorized user can retry the unsuccessful review into a new attempt. The original answers and decisions remain historical; complete the fresh successor rather than attempting to edit the failed record. Current ownership, assignment, and parent business-status guards still apply.

## Invalid historical definitions

A runtime uses its pinned assessment definition. The server accepts a genuinely unauthored definition as empty and supplies empty optional section/outcome matrices for older compatible definitions. Malformed authored content is not silently replaced with an empty assessment: loading returns `ASSESSMENT_DEFINITION_INVALID` (500). Record the review ID and report the problem to the application maintainer. Do not complete an apparently empty replacement or change the current schema expecting it to repair the historical pin.

## Recovery

If saving or completion is unavailable, check the page's permission and locked state, complete or remove outstanding additional-reviewer rows, and fill every required answer, comment, outcome justification, and alignment value. Reload after another reviewer or approver acts so counts and state are current. Do not try to repair a pinned historical response by editing its current schema; publish configuration changes for future reviews and use the supported retry action where available.

See [Approvals and Completions](approvals-completions.md), [Workflows](workflows.md), and [RBAC](rbac.md).
