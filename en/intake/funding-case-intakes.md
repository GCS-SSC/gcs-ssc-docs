# Funding case intakes

An Intake is the staff file for one funding application. It links the Funding Opportunity to the Proponent, the organization applying. Use it to read the application, keep attachments, assign officers and assess the request.

Open **Funding Case Intakes**, or an Opportunity's **Applications** section. The Application ID is the Intake's internal GCS-SSC ID. Imported applications also have a separate external source reference.

## Access and ownership

Intakes under a deleted Agency are excluded from the list. A missing row is not a reason to create another Intake; check the owning Agency and your current access first.

You can read a file without being allowed to work on it. To assess an Intake, you need the appropriate Program role and your name on that Intake's assignment roster. If you cannot edit the application or start a Review, ask your assignment coordinator to check both. An action may remain visible because your role allows it. Selecting it can still show a warning if you are unassigned or the Intake is locked.

Your Funding Case role applies within the Opportunity's Program. Viewer can read and Contributor can create. To edit the Intake, manage its attachments, change its status or start Reviews or Workflows, you need Contributor access and assignment to this Intake. Deletion requires Manager access and the same assignment. An assignment to another record does not let you work on this Intake.

An assignment coordinator needs the separate Funding Case assignment-management permission to manage users and the responsible Agency group. This permission alone does not let the coordinator read or edit the application, and does not assign them to the Intake. A person assigned to approve can perform that approval without being assigned to ordinary Intake work. Once an Intake has a final status or is completed, its assigned users and ordinary casework can no longer be changed.

## Create a manual Intake

1. Choose **Add intake** in the list, or **Add application** in an Opportunity's **Applications** section.
2. Select an open Opportunity. Its Agency status must be open to changes, outside Draft and outside a final status, and today must fall within its opening and closing dates, including both boundary dates.
3. Select a Proponent you can read. The server checks this access independently of the Opportunity.
4. Optionally select attachment files before saving when the creation form supports uploads. Each selected file needs its type, names and descriptions in both English and French. Review these before saving.
5. Save. GCS-SSC creates the Intake in the owning Agency's Draft status, stores an empty application record, and makes you the primary assigned user for this Intake. GCS-SSC generates the Application ID. Manual creation does not let you enter an external application ID or submitted answers.

Cancelling before saving creates no Intake. While the save is in progress, you cannot change the form or close the dialog. Changing the selected Opportunity clears staged files and reloads attachment choices. Uploading in the creation form requires configured Agency storage that does not ask for additional file information; if it is unavailable, create the Intake first and upload from **Attachments** using the full storage form.

The Intake is saved before staged files upload. If a file fails, the saved Intake remains. Open its **Attachments** section, confirm which files succeeded, and upload only the missing files; creating another Intake is not a recovery step.

## Read the application and assess it

**Details** shows the Application ID, external reference when present, Opportunity link and Proponent. **Application** displays saved submission evidence in a read-only view. For an imported application, it shows the original submitted copy, which cannot be changed. If that copy is absent, it shows the application information stored in GCS-SSC. A manual Intake with no evidence shows a waiting state.

Saved forms appear in their saved order. Labels and options use the saved bilingual content; authored answers keep their original language. Skipped questions are omitted, unanswered optional forms remain identifiable, and nested repeats, choices, tables, budget amounts and activities remain readable. The viewer does not fetch the latest form, rerun conditions or recalculate totals. If the saved evidence is not a supported form format, the viewer lists its fields and values in a structured view. You cannot edit answers in this view.

Use these sections for assessment and follow-up:

- **Reviews** starts eligible Review Sets selected on the Opportunity.
- **Workflows** starts standard workflows.
- **Supplementary Information** shows additional information collected through workflows.
- **Approval Submission** runs the workflow for submitting the Intake for approval.

Starts recheck the current Opportunity selections and publication eligibility. Reviews and Workflows already started keep the versions selected at their start, even if an administrator later changes the setup links. Follow [Reviews](../concepts/runtime-reviews.md) and [Workflows](../concepts/workflows.md) for task execution, completion, cancellation and retries. Creating or approving an Intake does not automatically create an Assessment Decision or Agreement.

## Claim group work and manage assignments

Portal imports start with a pending group in the owning Agency and no user assignee. Members with Funding Case Viewer access in the Program see available work in the Home administrative group queue. To **Claim** an Intake, you must be an active group member, have Contributor access in the Program and be eligible for assignment. The Intake must be unlocked. Claim assigns you to this Intake and records you as the person who claimed the group's work. Group membership alone cannot edit the Intake.

An assignment coordinator can use **Assignments** to add eligible users, choose another eligible Agency group, or remove the group after at least one user is assigned. Changing or removing the group clears the record of who claimed its work, while keeping all existing user assignments. An Intake waiting for a group member to claim it may have no assigned users; whenever users are assigned, one active user must be the primary. Preserve a primary when removing users. A second claim after another user has claimed returns a conflict; refresh and ask the coordinator to assign you if joint work is needed. An Agency group referenced by a live Intake cannot be deleted.

Before showing the deletion confirmation, GCS-SSC reloads the Intake and your assignment. If you are no longer assigned or the Intake is locked, it shows a warning instead.

Deletion is also blocked once any Review or Workflow work has been recorded (`FUNDING_CASE_INTAKE_HAS_RUNTIME`), including retained completed work. Cancelling a Workflow is not a way to erase this history. Keep the Intake and use its configured lifecycle rather than recreating or deleting assessment evidence.

## Example and recovery

During the October facilities call, an officer creates a manual Intake for Riverside Community Association, a Proponent they can read. The generated Application ID identifies the staff file. Opening **Application** shows a waiting state because manual creation has not supplied submitted answers. Supporting files can still be added under **Attachments** with the appropriate access. For a Portal import, find the queued Intake, claim it, read its saved forms and start the Opportunity's assessment Review Set. Completing that Review is distinct from completing an approval-submission workflow.

For a missing action or a warning when you select it, check your Program role, assignment to this Intake and its current status. For a conflict, reload status and roster before retrying. If an assessment tool is unavailable, ask the administrator to publish an applicable design and link it to a selected Stream and the Opportunity. For import duplicates or missing source evidence, use the [Portal recovery guidance](./portal.md); retain the original source identity.
