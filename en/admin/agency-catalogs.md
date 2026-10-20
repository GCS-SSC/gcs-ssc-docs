# Agency catalogs and Stream selections

Use Agency catalogs to prepare settings that several Streams can share. A catalog is a list of reusable definitions: custom fields, approval templates, review and recommendation sets, Data Collections, workflows, document templates, charts of accounts, commitment types, and monitor types. Create the definition at the Agency, then select or assign it to the Stream that needs it.

If a form or assessment is missing from your Stream, check that its Agency definition is published where required and available to that Stream.

## Permissions and setup order

Open an Agency from **Agencies**. Your access level determines what you can do:

- Agency Viewer can read the catalog.
- Agency Contributor can create, update, and publish definitions. Contributor can also delete eligible draft Review Sets, Recommendation Sets, Workflows, and Data Collections.
- Other catalog deletions may require Agency Manager.
- On a Program's Stream page, Contributor access for `transfer_payment` lets you assign available Agency entries. Manager access lets you remove eligible Stream links.

An assignment to an Agreement or review does not give you setup access. Each operation also requires the Agency and Program to remain active.

1. Create the Agency reference values needed by the designs, including business statuses, agreement and recipient subtypes, fiscal years, and any financial classifications.
2. Create fields, approval templates, review schemas and sets, recommendation schemas and sets, and workflows on the Agency page. Publish the definitions a design depends on before publishing that design. A draft can still be edited; publishing captures a checked version that can be used for casework.
3. Open the Program's Stream. Add the Agency fields and other catalog entries on its corresponding tabs. Supply Stream-specific field sections, order, required and active settings; add the published Review Sets and Workflows needed for that Stream.
4. Check the Stream's local risk ratings, budgets, statuses, and other references before starting work. A linked design must also suit that Stream and the kind of record it is for, such as an Agreement or Funding Case Intake. This kind of record is called the entity type.

For example, Agency A can publish one "Standard assessment" Review Set and link it to two Agency A Streams. Each Stream uses the same Agency definition, but its Agreement work and started assessments remain separate. Editing the Agency draft does not change an assessment already started. Publish a new version for future work. A Stream in another Agency cannot link the definition.

## What the Stream controls

| Agency design or value | Stream selection |
| --- | --- |
| Custom-field definition and option IDs | Section, display order, required and active settings on each field assignment. Saved Agreement values keep their field IDs. |
| Review Sets and Workflows | Link an eligible published Agency design; removing a link stops new selection on that Stream but preserves historical records. |
| Approval Templates and Recommendation Sets | Author and publish at Agency scope, then reference them from the appropriate Agency Review Set or Workflow. They no longer have separate Stream authoring tabs. |
| Document Templates | Link an Agency template on the Stream's Document Templates tab; remove the link without deleting the Agency source file. |
| Chart of Accounts, Commitment Types, and Monitor Types | Select eligible Agency definitions for the Stream; historical references can remain visible after retirement. |

The Stream **Review Setups** and **Workflow Setups** lists link back to the Agency detail editor. Removing a Stream link does not delete the shared Agency design. The Stream **Custom Fields** tab maintains sections and field assignments; change field labels, type, and options in the Agency catalog. A field definition shared by two Streams keeps one identity, but each Stream can place and require it differently.

## Document templates

Open **Document Templates** on the Agency to create a template for Agreements, Amendments, or Closeouts. Enter both names and descriptions, choose DOCX or HTML, and upload an English and a French file of that kind. Each file must be at most 10 MiB. Choose at least one output format. DOCX templates support DOCX and PDF; HTML templates support HTML and PDF.

Names must be unique within the Agency and record type in each language. If a name conflicts, edit the existing template or choose a different name. You can correct the names and descriptions and replace either language file later. The template kind cannot change after creation, so create another template to move from DOCX to HTML.

After saving, link the active template on the Stream's **Document Templates** tab. For example, create an Agreement template named "Standard agreement" with both language files, then link it to each Stream that uses that document. Amendment and Closeout templates need their own record types.

A failed upload or save keeps the editor open for correction. Check the error, correct the file or conflicting name, and retry. If the save succeeded but the table failed to reload, reload the list before creating another template. Previously saved template files remain in use when a replacement save fails.

## Workflow editor and flow view

Open a Workflow from the Agency's **Workflow Setups** tab. Use its editor to change the Workflow details, routing, transitions, and behaviour. **Flow** opens a separate diagram page for viewing the saved setup. The diagram does not edit Workflow members. Return to the editor to change them.

Save pending changes before switching between the editor and Flow. The application blocks the switch while a save is pending or unsaved changes remain. Saving a draft does not publish it; publish when the checked design is ready for new work.

## Review member settings

Open a Review Set and edit the settings for one of its included review schemas. Choose its order, optional approval template, default group, checklist-failure rule, and failure threshold. Reopening the member keeps its saved default group. Changing only its order or group keeps the saved checklist-failure setting. Save the member, then publish the changed set for future work. Existing reviews keep their published settings.

Enable the checklist-failure rule to give a review a negative result when its checklist result is Fail. A numeric result below the failure threshold also gives a negative result. For example, a threshold of 60 treats 59 as negative; 60 does not fail this threshold. These member rules are separate from the rules that calculate the checklist result.

Draft Review orders must be whole numbers from −32,768 through 32,767; an empty order is invalid. Use consecutive member numbers from 1 before publishing. If the editor rejects an update, reload the set and correct the named field before retrying.

## Data Collection catalog

Open **Data Collections** on the Agency, create a definition, then open its detail editor. Agency Viewer can read the definition. Agency Contributor (`agency:update`) can create, edit, publish, and retire definitions. Contributor can also delete an eligible draft if no Workflow step references it. You do not need Manager access to delete that draft.

Enter the required English and French names, each up to 255 characters. Add descriptions and define the questionnaire. The General section stores these values and an optional same-Agency published Approval Template. Use the form-definition section to build the questionnaire's sections and questions. Save the working definition before publishing. Publication validates the form and referenced approval plan, then captures a reusable version. A saved draft is not available as a published Workflow member.

Select a published Data Collection in an Agency Workflow member. The Stream selects the Workflow that contains the Data Collection. No separate Data Collection link is needed. For example, publish "Site information" with bilingual address and capacity questions, add it before a Review in an Intake Workflow, publish that Workflow, link it through a Stream and select it on the Opportunity. A collection already started keeps the questionnaire and approval version it started with. Later catalog edits do not change its questions.

Retiring a definition stops new use and further edits, but keeps existing collections. You can delete only an unreferenced draft. A Workflow member is one step in a Workflow, and even a reference from that step blocks deletion.

If publication fails, check the questionnaire and confirm that any selected approval template is published in the same Agency. Correct and save the draft, then retry. To repair a collection already in progress, use its recovery controls. See [Workflows](../concepts/workflows.md).

## Intake assessment setup

For Opportunity Intake assessment, author Review Sets and Workflows with entity type **Funding Case Intake** (`fundingcaseintake`), publish them and link them to the selected Program Streams. Then explicitly select them on the [Funding Opportunity](../intake/opportunities.md). A Stream link alone does not make an assessment available on every Opportunity. Opportunity eligibility and the Intake's exact assignment are checked when staff start work.

## Publish, retire, and recover

Publishing checks referenced designs and Agency ownership. A Workflow used by a Stream must have the required fields and local values available there; incompatible configuration is rejected rather than silently skipping a step. A published snapshot is a saved version of a design. Existing work keeps that version when an administrator edits or retires the design. Retiring blocks new use, while historical records continue to display saved labels and evidence.

If an Add, Publish, or start action fails, reload both the Agency definition and Stream links. Confirm the design is published, belongs to the same Agency, matches the entity type, and that every referenced field, approval template, status, risk rating, and owner is eligible for that Stream. Correct the dependency, republish if needed, then retry. To correct a field label, edit the existing field. Its ID connects it to saved Agreement values and historical workflow conditions.

See [Streams](../programs/streams.md), [Agreement custom fields](../programs/custom-fields.md), [Approval templates](../programs/approval-templates.md), [Recommendation sets](../programs/recommendations.md), and [Workflows](../concepts/workflows.md).
