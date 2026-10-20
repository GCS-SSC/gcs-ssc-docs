# Funding opportunities

A Funding Opportunity is a call for applications. It sets the funding offered, the participating Streams and the application dates within one Program.

Open **Funding Opportunities** to search, create or view a call. Its **Applications** section lists the Funding Case Intakes. Each Intake holds the staff's work on one application.

## Access and prerequisites

Set up the call before staff begin receiving applications. If you process applications rather than configure calls, use the Opportunity to check dates and available assessment tools, then do your casework in each Intake. Ask the Program administrator to resolve missing Streams, assessment designs or status configuration.

Your Program role controls access to Opportunities. Viewer can read, Contributor can create and edit, and Manager can delete. Opportunities have no assignment roster. Reading an Opportunity does not grant access to its Intakes or Proponents.

Opportunities under a deleted Agency are excluded from the list. If a call disappears, reload and ask the administrator to check its Agency and Program before creating another.

Before creating a call, prepare an active Agency, Program and Streams. The Agency must also have its required protected Draft status. For assessment, publish Agency Review Sets and Workflows targeting **Funding Case Intake** (`fundingcaseintake`), then link them to the relevant Streams. Configure Agency Attachment Types and storage before collecting files. See [Agency catalogs](../admin/agency-catalogs.md) and [Streams](../programs/streams.md).

## Create and edit

1. Choose **Add opportunity** and select the Program first. Changing it clears the selected Streams.
2. Select 1–100 distinct active Streams from that Program. The Program cannot change after creation; edited Stream selections must remain in the same Program.
3. Enter English and French names and objectives. Both names are required, trimmed and limited to 255 characters; both objectives are required.
4. Enter the opening and closing dates. Both are required and the closing date cannot precede the opening date.
5. Save. The Agency Draft status is selected automatically. Cancelling the dialog discards unsaved edits. While saving, you cannot edit the fields or close the dialog.

Within a selected Stream, either an English or French name matching an existing live Opportunity is rejected, ignoring surrounding spaces and case. The same names may be used if the Opportunities share no Streams. Changing Stream selections also revalidates this rule.

Saving an Opportunity as Draft does not open it for applications. The ordinary editor has no control for changing its business status. Follow your Agency's configured process. An authorized integration can select an active status belonging to that Agency. Reaching the opening or closing date does not automatically change the status.

The ordinary editor does not let you design application forms. The optional application schema supplied by an integration is separate from the Portal forms.

## Select assessment and attachment configuration

On **Reviews** and **Workflows**, link published Agency designs for Funding Case Intake available through at least one selected Stream. Choose the assessment tools officers can start on individual Intakes. Selecting a tool here does not start an assessment. New links require publication. An existing link can remain after its design is unpublished, but that does not make it eligible for a new start. Removing a link keeps the saved versions and evidence of assessment work already created.

When changing Streams, retained designs must still be linked to at least one selected Stream. If the change fails, remove the incompatible Opportunity links first or keep a Stream that supplies them, then retry. For example, if the Capital Stream supplies the selected review, removing Capital also requires removing that review link unless another selected Stream supplies it.

On **Attachments**, associate active Attachment Types from the owning Agency and set each association's **Internal only** flag, off by default. Up to 100 distinct types may be selected. This sets the file categories and visibility rules associated with the call; an association is not an attachment upload or an Intake work permission. Deleting an association preserves its history.

## Opening, closing and retirement

To accept new manual Intakes or Portal imports, an Opportunity must meet all these conditions:

- Its current Agency status is active, is not Draft, allows changes and is not final.
- Today, according to the database, falls within its opening and closing dates. Both dates are included.

The publication information sent to the Portal also requires a status that allows publication. GCS-SSC checks eligibility again when saving. If your role allows **Add application**, the action can remain visible outside the opening window or while the status blocks new Intakes. Selecting it shows a warning instead of opening the creation form.

A current status that is read-only or final blocks ordinary Opportunity edits and deletion. These actions may remain visible for your role. Selecting them shows a warning when the status blocks the change. A deleted or missing status also blocks changes. Do not assume extending the closing date can unlock an Opportunity in a final status. Status management must follow the Agency's configured process. Deletion also rejects an Opportunity with any non-deleted Intake (`FUNDING_OPPORTUNITY_HAS_CASES`). Keep a used Opportunity and follow its closing and status process instead of deleting its application history. When deletion is allowed, the record is marked deleted; application and assessment evidence is retained.

## Worked example and recovery

For a "Community facilities 2026" call, select the Capital and Accessibility Streams of the same Program, enter both language versions, and use October 1 to 31, 2026. Publish an Intake Review Set and link it to Capital, then select it on the Opportunity. On October 14, an authorized staff member can create an Intake only after the Opportunity has a writable non-Draft Agency status. On November 1, new Intake creation fails even if the Opportunity still has that status.

Creating, editing and deleting an Opportunity rechecks its current Agency, Program and Streams before saving. If another administrator changes or retires one of them while the dialog is open, creation can fail without saving a partial Opportunity. Reload the available choices and select the current Streams before retrying.

If saving fails, copy any unsaved text you need to keep, reload the Opportunity and its Stream and catalog selections. Check the dates, whether all Streams belong to the same Program, duplicate names, publication and status. For an Intake creation failure, check the current opening window and status rather than repeatedly creating Opportunities. If the save fails, the previously saved links remain; the selected links are not partly replaced.

Continue with [Funding Case Intakes](./funding-case-intakes.md) and [Receive Portal applications](./portal.md).
