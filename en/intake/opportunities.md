# Funding Opportunities

A Funding Opportunity is the call for applications: it records what funding is available, which Streams take part, and when applications can be received. It defines an application window for one or more Streams in a single Program. Open **Funding Opportunities** to search the list, create an Opportunity, or open its detail workspace. Its **Applications** section lists its Funding Case Intakes; an Opportunity is configuration, while each Intake is a separate staff work record.

## Access and prerequisites

Set up the call before staff begin receiving applications. If you process applications rather than configure calls, use the Opportunity to check dates and available assessment tools, then do your casework in each Intake. Ask the Program administrator to resolve missing Streams, assessment designs or status configuration.

Opportunity access uses the Program's `transfer_payment` permission: Viewer reads, Contributor creates and edits, and Manager deletes. Opportunities have no assignment roster. Reading an Opportunity does not grant access to its Intakes or Proponents.

Prepare an active Agency, Program and Streams, and the Agency's protected Draft status. For assessment, publish Agency Review Sets and Workflows targeting **Funding Case Intake** (`fundingcaseintake`), then link them to the relevant Streams. Configure Agency Attachment Types and storage before collecting files. See [Agency catalogs](../admin/agency-catalogs.md) and [Streams](../programs/streams.md).

## Create and edit

1. Choose **Create Funding Opportunity** and select the Program first. Changing it clears the selected Streams.
2. Select 1–100 distinct active Streams from that Program. The Program cannot change after creation; edited Stream selections must remain in the same Program.
3. Enter English and French names and objectives. Both names are required, trimmed and limited to 255 characters; both objectives are required.
4. Enter the opening and closing dates. Both are required and the closing date cannot precede the opening date.
5. Save. The Agency Draft status is selected automatically. Cancelling the dialog discards unsaved edits.

Within a selected Stream, either an English or French name matching an existing live Opportunity is rejected, ignoring surrounding spaces and case. The same names may be used if the Opportunities share no Streams. Changing Stream selections also revalidates this rule.

Saving an Opportunity as Draft does not open it for applications. The ordinary editor has no control for changing its business status. Follow your Agency’s configured process: an authorized integration using the host API can select an active status belonging to that Agency. Reaching the opening or closing date does not automatically change the status.

For integrations, the API also accepts an optional application schema as an object or `null`. The ordinary editor has no schema editor, and this schema is not a Portal form.

## Select assessment and attachment configuration

On **Reviews** and **Workflows**, link published Agency designs for Funding Case Intake available through at least one selected Stream. These sections choose which assessment tools officers can start on individual Intakes; selecting a tool here does not start assessment work. New links require publication. An existing link can remain after its design is unpublished, but that does not make it eligible for a new start. Removing a link keeps the saved versions and evidence of assessment work already created.

When changing Streams, retained designs must still be linked to at least one selected Stream. If the change fails, remove the incompatible Opportunity links first or keep a Stream that supplies them, then retry. For example, if the Capital Stream supplies the selected review, removing Capital also requires removing that review link unless another selected Stream supplies it.

On **Attachments**, associate active Attachment Types from the owning Agency and set each association's **Internal** flag (off by default). Up to 100 distinct types may be selected. This sets the file categories and visibility rules associated with the call; an association is not an attachment upload or an Intake work permission. Deleting an association preserves its history.

## Opening, closing and retirement

New manual Intakes and new Portal imports require an Opportunity whose current Agency status is active, outside Draft, open to changes and outside a final status, and whose date window includes the current database date. Both boundary dates are inclusive. The publication information sent to the Portal also requires a status that allows publication. A visible choice is rechecked when the server saves.

A current status that is read-only or final blocks ordinary Opportunity edits and deletion. A deleted or missing status also blocks changes. Do not assume extending the closing date can unlock an Opportunity in a final status. Status management must follow the Agency's configured process. Deletion also rejects an Opportunity with any non-deleted Intake (`FUNDING_OPPORTUNITY_HAS_CASES`). Keep a used Opportunity and follow its closing/status process instead of deleting its application history. When deletion is allowed, the record is marked deleted; application and assessment evidence is retained.

## Worked example and recovery

For a “Community facilities 2026” call, select the Capital and Accessibility Streams of the same Program, enter both language versions, and use October 1–31, 2026. Publish an Intake Review Set and link it to Capital, then select it on the Opportunity. On October 14, an authorized staff member can create an Intake only after the Opportunity has a writable non-Draft Agency status. On November 1, new Intake creation fails even if the Opportunity still has that status.

If saving fails, copy any unsaved text you need to keep, reload the Opportunity and its Stream/catalog selections, and check dates, same-Program ownership, duplicate names, publication and status. For an Intake creation failure, check the current opening window and status rather than repeatedly creating Opportunities. If the save fails, the previously saved links remain; the selected links are not partly replaced.

Continue with [Funding Case Intakes](./funding-case-intakes.md) and the [Portal host boundary](./portal.md).
