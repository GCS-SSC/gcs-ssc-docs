# Funding Case Intakes

An Intake is the staff file for one application. It connects the Funding Opportunity (the call) to the Proponent (the organization applying). Use it to read the application, keep attachments, assign officers and conduct assessment. Open **Funding Case Intakes**, or open an Opportunity's **Applications** section. The list and detail workspace use the host Application ID, which is the Intake's internal ID. Imported records also display a separate external source reference.

## Access and ownership

Being able to see a file and being allowed to work on it are separate checks. To assess an Intake, you need the appropriate Program role and your name on that Intake’s assignment roster. If you can read an application but cannot edit it or start a Review, check both with your assignment coordinator.

Funding Case permissions (`funding_case`) apply within the Opportunity's Program. Viewer reads; Contributor creates. Editing the Intake, adding or changing attachments, changing status and starting Reviews or Workflows require Contributor **and exact assignment to this Intake**. Deletion requires Manager and that assignment. Assignment to a Proponent, Agreement, Opportunity-related record or sibling Intake grants no work rights here.

An assignment coordinator uses the separate `funding_case:manage_assignments` permission to manage assigned users and the Agency group responsible for the Intake. This permission alone does not let the coordinator read or edit the application, and does not assign them to the Intake. A person assigned to approve can perform that approval without being assigned to ordinary Intake work. Once an Intake has a final status or is completed, its assigned users and ordinary casework can no longer be changed.

## Create a manual Intake

1. Choose **Create Intake** in the list or **Applications** section.
2. Select an open Opportunity. Its Agency status must be open to changes, outside Draft and outside a final status, and today must fall within its inclusive opening/closing dates.
3. Select a Proponent you can read. The server checks this access independently of the Opportunity.
4. Optionally select attachment files before saving when the creation form supports uploads. Each selected file needs its type, English/French names and English/French descriptions. Review these before saving.
5. Save. The host creates the Intake in the owning Agency's Draft status, stores an empty application record, and makes you the primary assigned user for this Intake. It generates the Application ID; you cannot provide your own external application ID or submitted answers through manual creation.

Cancelling before saving creates no Intake. Changing the selected Opportunity clears staged files and reloads attachment choices. Uploading in the creation form requires configured Agency storage that does not ask for additional file information; if it is unavailable, create the Intake first and upload from **Attachments** using the full storage form.

The Intake is saved before staged files upload. If a file fails, the saved Intake remains. Open its **Attachments** section, confirm which files succeeded, and upload only the missing files; creating another Intake is not a recovery step.

## Read the application and assess it

**Details** shows the Application ID, external reference when present, Opportunity link and Proponent. **Application** displays saved submission evidence in a read-only view. For an imported application, it shows the original submitted copy, which cannot be changed. If that copy is absent, it shows the application evidence held by the host. A manual Intake with no evidence shows a waiting state.

Saved forms appear in their saved order. Labels and options use the saved bilingual content; authored answers keep their original language. Skipped questions are omitted, unanswered optional forms remain identifiable, and nested repeats, choices, tables, budget amounts and activities remain readable. The viewer does not fetch the latest form, rerun conditions or recalculate totals. If the saved evidence is not a supported form format, the viewer lists its fields and values in a structured view. The reading view itself offers no answer editing controls.

Use **Reviews** for eligible Opportunity-selected Review Sets, **Workflows** for standard workflows, **Supplementary Information** for workflow-collected information, and **Approval Submission** for its dedicated workflow purpose. Starts recheck the current Opportunity selections and publication eligibility. Reviews and Workflows already started keep the versions selected at their start, even if an administrator later changes the setup links. Follow [Reviews](../concepts/runtime-reviews.md) and [Workflows](../concepts/workflows.md) for task execution, completion, cancellation and retries. Intake creation or approval does not automatically create an Assessment Decision or Agreement; that automatic decision mapping is not implemented.

## Claim group work and manage assignments

Portal imports start with a pending group in the owning Agency and no user assignee. Members with scoped Funding Case Viewer see available work in the Home administrative group queue. To **Claim**, you must be an active member, have scoped Contributor access, qualify as an Intake assignee and work on an unlocked Intake. Claim assigns you to this Intake and records you as the person who claimed the group’s work. Group membership alone cannot edit the Intake.

An assignment coordinator can use **Assignments** to add eligible users, choose another eligible Agency group, or remove the group after at least one user is assigned. Changing or removing the group clears the record of who claimed its work, while keeping all existing user assignments. An Intake waiting for a group member to claim it may have no assigned users; whenever users are assigned, one active user must be the primary. Preserve a primary when removing users. A second claim after another user has claimed returns a conflict; refresh and ask the coordinator to assign you if joint work is needed. An Agency group referenced by a live Intake cannot be deleted.

Deletion is additionally blocked once any execution work has been recorded (`FUNDING_CASE_INTAKE_HAS_RUNTIME`), including retained completed work. Cancelling a Workflow is not a way to erase this history. Keep the Intake and use its configured lifecycle rather than recreating or deleting assessment evidence.

## Example and recovery

During the October facilities call, an officer creates a manual Intake for Riverside Community Association, a Proponent they can read. The generated Application ID identifies the staff file. Opening **Application** shows a waiting state because manual creation has not supplied submitted answers. Supporting files can still be added under **Attachments** with the appropriate access. For a Portal import, find the queued Intake, claim it, read its saved forms and start the Opportunity's assessment Review Set. Completing that Review is distinct from completing an approval-submission workflow.

For a missing action, check both the Program role and exact Intake assignment. For a conflict, reload status and roster before retrying. For an unavailable setup, ask the administrator to publish an applicable design and link it through a selected Stream and the Opportunity. For import duplicates or missing source evidence, use the [Portal recovery guidance](./portal.md); retain the original source identity.
