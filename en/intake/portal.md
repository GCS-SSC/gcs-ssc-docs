# Portal host boundary

The Portal connector is an installed extension. The Portal owns applicant-facing calls, designed forms and submissions; GCS-SSC owns the Funding Opportunity, staff Intake, assignments and assessment. This guide covers host preparation and retained evidence. Connector configuration, form-design rules and its external delivery interface belong to the connector's own documentation.

## Prepare the host

These are setup tasks for the Agency administrator and connector operator. An officer’s usual work begins after import: find the application in the Home group queue, claim its Intake, read the submitted answers and start the selected assessment. Applicants complete their forms in the Portal.

1. Create the Agency, Program, active Streams and [Funding Opportunity](./opportunities.md). Prepare a writable non-Draft Opportunity status and a current opening window before accepting new imports.
2. Enable and configure the connector for the owning Agency. Prepare storage and Opportunity Attachment Types if files are used.
3. Create an assignable administrative group in that Agency and add qualified staff. Grant scoped Funding Case Viewer for queue visibility, Contributor for claiming/work, and independent `manage_assignments` to coordinators.
4. Establish the mapping from the verified Portal organization to the host Proponent. Interactive import requires that the actor can read the Proponent. Scheduled import requires an active Proponent connected to the configured Agency by its lead Agency or a live Agreement through that Agency's Program/Stream chain.
5. Publish and select applicable Intake Review Sets and Workflows through the Streams and Opportunity. Confirm that a qualified group member can claim the resulting record.

An Opportunity extension tab can expose the connector's form and publication workspace. The optional host application-schema JSON is not a Portal survey. The connector owns its survey revisions and ordered forms; the host projection does not include their definitions. An Agency-level extension permission alone does not grant Opportunity publication or Intake creation.

## Publication and import authorization

When a user sends publication information to the Portal, GCS-SSC checks their current permission to update the Opportunity (`transfer_payment:update`) in its Program and checks that its status permits publication. When a user imports a submitted application, a separate check requires permission to create an Intake (`funding_case:create`) in that Program. The Opportunity must allow imports and be within its opening dates, including both boundary dates. The user must be able to read the Proponent, and the selected Agency group must be eligible for assignment. GCS-SSC rechecks these rules while saving the import.

For connector developers: automatic queue processing requires the extension to declare `scheduled-intake-import`, independently of any Agreement-import capability. The host rechecks registered extension and Agency enablement and restricts service authority to that configured Agency. This does not invent a staff user, global role or worker assignment.

The host sends the connector a publication summary, called a projection. This summary tells the connector which Opportunity it is publishing and whether publication is allowed. Its date window uses inclusive all-day UTC values. Projection includes bilingual Opportunity names/objectives, ownership context and stable host identity. Portal publication must use the projection's active/editable state; a draft may receive designed forms but is not an active publication target.

## Saved versus submitted evidence

Saving a draft in the Portal does not create a staff Intake; the applicant still needs to submit and the connector must import that submission. A submitted import carries the Opportunity, Proponent, group, original source system/submission identity and immutable source export. The host creates a Draft Intake with an unclaimed group slot and returns its host Intake ID. The source submission reference is separate from that ID; the connector retains the host reference in its import receipt.

Staff read the retained export—the saved copy of the submitted forms and answers—on the Intake's **Application** section. Host working application evidence may change through authorized API operations, but the original export and source identity stay immutable. Later form edits do not replace this submitted evidence. Intake review, workflow and approval are staff processes distinct from the applicant's submission. No automatic Assessment Decision creation is supplied by host approval completion.

## Retry and conflict recovery

Retrying an import with the same original source system and submission ID returns the same Intake, even after the Opportunity closes. A retry with a known host Intake ID must match that exact record and its original evidence. A missing or mismatched supplied ID never creates a replacement record. Changed submitted evidence or a different Opportunity/Proponent mapping produces a conflict rather than replacing an Intake. For integrations using a numeric compatibility reference, a reference already associated with another record also produces a conflict. The original source identity remains reserved even if the Intake is marked deleted.

GCS-SSC saves the import receipt and Intake together: either both are saved or neither is saved. If Portal acknowledgement fails, retry the original submission with the same identity, evidence and known host reference. Inspect the connector receipt and host Intake before deciding a record is missing. Do not choose a new submission identity merely to bypass a conflict.

For a new submission rejected as closed, confirm Opportunity status and dates. For a group failure, confirm the active same-Agency group and staff eligibility. For a Proponent failure, repair the authorized mapping or Agency relationship. For a missing Draft status, restore the owning Agency's required status configuration. Retry only after correcting the cause; unavailable inputs do not create a partial host Intake. Connector-side form-save, publication and external delivery recovery remain extension-owned.

For example, Riverside Community Association submits its facilities application. The connector imports it as host Intake 412, and the Intake enters the configured staff group’s queue. The officer claims 412 and reads the submitted forms. If the connector’s acknowledgement times out, the imported application retains that host reference. Retrying the unchanged submission returns Intake 412, even after October 31. Sending altered answers under the same source identity produces a conflict; it does not silently replace the original application.

See [Funding Case Intakes](./funding-case-intakes.md) for queue claiming and reading evidence, and [Extensions](../concepts/extensions.md) for Agency enablement.
