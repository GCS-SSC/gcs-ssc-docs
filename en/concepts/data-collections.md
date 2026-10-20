# Data collections

A Data Collection is a bilingual questionnaire added directly to a [workflow](workflows.md). It gathers information about the application or other record being processed; it does not decide whether to recommend that record. For example, a workflow can ask an officer to record which invoices have been received before the assessment continues. Each occurrence in a workflow has its own answers, saved-answer version or revision, assigned users and optional approval. It cannot be started or completed as a standalone business record.

## Configure and publish

This section is for staff who configure Agency questionnaires and workflows. Officers completing a collection can go directly to **Find and answer your collection**. Publishing makes a reviewed version available for future workflows; it does not send a questionnaire to an applicant or start work on a case.

Open **Agencies**, then **Data Collections**. Agency Viewer access lets you read the catalog. Contributor access lets you create, edit, publish and retire questionnaires, and delete eligible drafts. Being assigned to answer a collection does not give you permission to change the Agency questionnaire. Create a definition with required English and French names and descriptions, then author bilingual sections and questions in its questionnaire editor.

Questions can accept text or a single choice. They can include help, require an answer and set rules for comments. Give each choice its bilingual label. Data Collections have no deciding question or recommendation outcome. Select an optional published Approval Template belonging to the same Agency when submitted answers need approval.

Before publishing, review both languages and the rules for required answers and comments. Publishing saves the form and optional approval template as fixed versions. Publish again after changes to make those changes available for future work. Publishing unchanged content creates no new version. Retiring a questionnaire prevents it from being selected for new work and keeps existing answers; you cannot edit a retired questionnaire. A draft can be deleted only if it meets the deletion rules and no other configuration or work refers to it.

Add the published collection to an Agency Workflow Setup, choose its sequence and optional user or group default, publish that workflow, and link it to the relevant Stream. If no default responsible user or group is selected, the person who starts the workflow remains assigned. If a group is selected, a qualified member must claim the work. If the configured user or group is unavailable, the workflow pauses until the responsible user or group is corrected. Two selections of the same definition create two independent questionnaires. A collection approval counts toward the workflow’s approval requirement; a risk workflow still needs its designated assessment scoring source.

## Find and answer your collection

Open the application or other record being processed and select the collection row in its **Workflow** section to answer there. You can also open the questionnaire from Home work, a group queue or global search. These links open the selected questionnaire at Home with `?dataCollectionId={id}` in the address. There is no separate page for collection work. Assignment to this collection does not automatically let you read the record it belongs to or other tasks in its workflow.

To read the questionnaire, you need Viewer access in the scope of the record it belongs to, or permission to read this specific collection for an approval. To save or submit answers, you need Contributor access in that scope and an assignment to this collection. To claim group work, you must also meet the current assignment rules for that scope; joining the group alone is insufficient. Claiming adds you if needed and keeps the existing assigned users and primary user. An assignment coordinator needs the separate `manage_assignments` permission in that same scope to change assigned users.

Work through the form version saved when this workflow work was created. Later changes to the Agency questionnaire do not replace the questions in your current task. **Save** checks the values you supplied and keeps an editable draft. You can save before filling in every required answer. **Submit** checks all required answers, comments and selected options. Unsaved changes typed while a save is pending remain in the draft; submission disables the controls until the server’s saved result is loaded. Even if a button is visible, the action can be refused if your assignment changed, the task is no longer editable or someone saved a newer version of the answers. The server checks these rules each time you save or submit.

## Example and approval

Suppose the facilities team needs to record whether Riverside Community Association has supplied the invoices needed for its assessment. The setup author prepares the questionnaire and its approval step; the assigned officer then records the evidence on the application’s workflow.

Create “Quarterly evidence / Preuves trimestrielles” with a required text question for the reporting period and a required radio question for evidence availability; require a comment when evidence is missing. Add it before a recommendation stage and choose a published approval template.

An assigned user saves “2026 Q3” before completing the availability answer. The draft remains editable. Selecting "Missing" without the required explanation blocks Submit. Entering "Invoice requested; expected 20 October" permits submission. Answers become read-only while approval is pending. Approval marks the collection as successfully completed and advances to the next workflow stage; denial follows the workflow’s failure/status policy. Without an approval template, valid submission succeeds and advances immediately.

Repeating this definition later in the same workflow creates a fresh questionnaire: the earlier reporting-period answer and approval are not reused. Cancelling the workflow also cancels its collections that have not already finished. When a workflow retry is allowed, it creates new questionnaires using the previously saved questionnaire versions, responsible-user/group settings and approval versions. Earlier answers remain in the history.

## Recover safely

If someone has saved a newer version of the answers, saving your older version returns `DATA_COLLECTION_REVISION_CONFLICT` (409), preserves your local draft and requires an explicit reload before saving again. Copy any unsaved text you need to keep, reload, compare the answers saved on the server, and reapply the intended changes. Do not assume a failed save was submitted.

If the questionnaire fails to load inside the workflow, use the retry action shown there. `DATA_COLLECTION_RESPONSE_INVALID` (400) means supplied answers do not match the questionnaire version used by this task. Correct the highlighted values and comments. `DATA_COLLECTION_DEFINITION_INVALID` (409) means the saved questionnaire definition is corrupt. Record the exact collection ID and report it to a maintainer. Changing the current Agency questionnaire will not repair the saved version used by this task.

Once answers are submitted, awaiting approval or in a finished task, you cannot edit them or change their assigned users. Complete the approval process or use the workflow’s supported cancellation and retry steps. Collection tasks are created and completed through their workflow; there is no separate action to create, delete or complete one.

## Developer boundaries

These contracts matter when building an integration or investigating a failed save. Officers use the questionnaire controls above; developers must send the current revision so another person’s saved answers are not accidentally overwritten.

Agency authoring uses `/api/agency/{agencyId}/data-collections` and detail publish/retire routes. Runtime `GET /api/data-collections/{id}` returns the pinned form, responses, revision and permitted actions; `PUT` accepts strictly `{ revision, responses }`, with `?submit=true` for submission. `/claim` accepts an empty-body POST. The execution entity identifier is `commondatacollection`.

`Common_Data_Collection_Setup` is the Agency-owned publication; `Common_Data_Collection` holds the exact typed source, runtime-item link, response revision and group provenance. Publication/runtime ownership and audit audiences follow the source owner. Lifecycle states and immutable pins live in the canonical runtime item. Approval-only reads expose the exact collection and its approval without the parent workflow packet or assignment roster. Save/Submit visibility distinguishes update-role permission (`can_update_role`) from current executability (`can_update`).
