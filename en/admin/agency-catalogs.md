# Agency catalogs and Stream selections

Use Agency catalogs to prepare settings that several Streams can share. A catalog is a list of reusable definitions: custom fields, approval templates, review and recommendation sets, Data Collections, workflows, document templates, charts of accounts, commitment types, and monitor types. Create the definition at the Agency, then select or assign it to the Stream that needs it.

For an officer, this explains why a form or assessment can exist but still be missing from your Stream. It must be published where required and made available to that Stream before you can use it.

## Permissions and setup order

Open an Agency from **Agencies**. Agency Viewer can read its catalog; Agency Contributor can create, update, and publish designs; Agency Manager can perform eligible deletion. On the Program's Stream page, `transfer_payment` Contributor assigns available Agency entries and Manager removes eligible Stream links. Exact Agreement or review assignments do not grant setup access. The server rechecks the active Agency and Program chain for each operation.

1. Create the Agency reference values needed by the designs, including business statuses, agreement and recipient subtypes, fiscal years, and any financial classifications.
2. Author fields, approval templates, review schemas/sets, recommendation schemas/sets, and workflows on the Agency page. Publish the definitions a design depends on before publishing that design. A draft can still be edited; publishing captures a checked version that can be used for casework.
3. Open the Program's Stream. Add the Agency fields and other catalog entries on its corresponding tabs. Supply Stream-specific field sections, order, required and active settings; add the published Review Sets and Workflows needed for that Stream.
4. Check the Stream's local risk ratings, budgets, statuses, and other references before starting work. A linked design must also suit that Stream and the kind of record it is for, such as an Agreement or Funding Case Intake. This kind of record is called the entity type.

For example, Agency A can publish one “Standard assessment” Review Set and link it to two Agency A Streams. Each Stream uses the same Agency definition, but its Agreement work and started assessments remain separate. Editing the Agency draft does not change an assessment already started. Publish a new version for future work. A Stream in another Agency cannot link the definition.

## What the Stream controls

| Agency design or value | Stream selection |
| --- | --- |
| Custom-field definition and option IDs | Section, display order, required and active settings on each field assignment. Saved Agreement values keep their field IDs. |
| Review Sets and Workflows | Link an eligible published Agency design; removing a link stops new selection on that Stream but preserves historical runtime evidence. |
| Approval Templates and Recommendation Sets | Author and publish at Agency scope, then reference them from the appropriate Agency Review Set or Workflow. They no longer have separate Stream authoring tabs. |
| Document Templates | Link an Agency template on the Stream's Document Templates tab; remove the link without deleting the Agency source file. |
| Chart of Accounts, Commitment Types, and Monitor Types | Select eligible Agency definitions for the Stream; historical references can remain visible after retirement. |

The Stream **Review Setups** and **Workflow Setups** lists link back to the Agency detail editor. Removing a Stream link does not delete the shared Agency design. The Stream **Custom Fields** tab maintains sections and field assignments; change field labels, type, and options in the Agency catalog. A field definition shared by two Streams keeps one identity, but each Stream can place and require it differently.

## Review member settings

Open a Review Set and edit a schema member to choose its order, optional approval template, default group, checklist-failure rule and failure threshold. Reopening the member keeps its saved default group. Changing only its order or group keeps the saved checklist-failure setting. Save the member, then publish the changed set for future work. Existing reviews keep their published settings.

Draft Review orders must be whole numbers from −32,768 through 32,767; an empty order is invalid. Use consecutive member numbers from 1 before publishing. If the editor rejects an update, reload the set and correct the named field before retrying.

## Data Collection catalog

Open **Data Collections** on the Agency, create a definition, then open its detail editor. Agency Viewer reads. Agency Contributor (`agency:update`) can create, edit, publish, retire, and delete a draft that is eligible for deletion and has no references. This draft deletion does not require Manager access.

Enter required English/French names (up to 255 characters), descriptions and questionnaire definition. The General section stores these values and an optional same-Agency published Approval Template. Use the form-definition section to build the questionnaire’s sections and questions. Save the working definition before publishing. Publication validates the form and referenced approval plan, then captures a reusable version. A saved draft is not available as a published Workflow member.

Select a published Data Collection in an Agency Workflow member. It is not a separate Stream Data Collection link: the Stream selects the Workflow that contains it. For example, publish “Site information” with bilingual address and capacity questions, add it before a Review in an Intake Workflow, publish that Workflow, link it through a Stream and select it on the Opportunity. A collection already started keeps the questionnaire and approval version it started with. Later catalog edits do not change its questions.

Retiring blocks new use and freezes catalog edits while preserving existing runs. Only a Draft that no Workflow step references can be retired through deletion. A Workflow member means one step in the Workflow; its reference blocks deletion. For a publication error, inspect the form and same-Agency approval publication, correct and save the working copy, then retry. Never remove a version to repair an already running collection; use its runtime recovery controls. See [Workflows](../concepts/workflows.md).

## Intake assessment setup

For Opportunity Intake assessment, author Review Sets and Workflows with entity type **Funding Case Intake** (`fundingcaseintake`), publish them and link them to the selected Program Streams. Then explicitly select them on the [Funding Opportunity](../intake/opportunities.md). A Stream link alone does not make an assessment available on every Opportunity. Opportunity eligibility and the Intake's exact assignment are checked when staff start work.

## Publish, retire, and recover

Publishing checks referenced designs and Agency ownership. A Workflow used by a Stream must have the required fields and local values available there; incompatible configuration is rejected rather than silently skipping a step. A published snapshot is a saved version of a design. Existing work keeps that version when an administrator edits or retires the design. Retiring blocks new use, while historical records continue to display saved labels and evidence.

If an Add, Publish, or start action fails, reload both the Agency definition and Stream links. Confirm the design is published, belongs to the same Agency, matches the entity type, and that every referenced field, approval template, status, risk rating, and owner is eligible for that Stream. Correct the dependency, republish if needed, then retry. Do not delete and recreate a field merely to repair a label: its ID is part of saved Agreement values and historical workflow conditions.

See [Streams](../programs/streams.md), [Agreement custom fields](../programs/custom-fields.md), [Approval templates](../programs/approval-templates.md), [Recommendation sets](../programs/recommendations.md), and [Workflows](../concepts/workflows.md).
