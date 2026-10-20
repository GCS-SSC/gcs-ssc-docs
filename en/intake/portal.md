# Receive Portal applications

Applicants use the Portal to find calls, complete forms and submit applications. The Portal connector imports submitted applications into GCS-SSC, where staff claim and assess them.

This guide explains how to prepare GCS-SSC and recover an import. For connector configuration, form design and external delivery, use the connector's documentation.

## Prepare GCS-SSC

The Agency administrator and connector operator complete this setup. After import, officers find the application in the Home group queue, claim its Intake, read the submitted answers and start the selected assessment.

1. Create the Agency, Program, active Streams and [Funding Opportunity](./opportunities.md). Prepare a writable non-Draft Opportunity status and a current opening window before accepting new imports.
2. Enable and configure the connector for the owning Agency. Prepare storage and Opportunity Attachment Types if files are used.
3. Create an assignable administrative group in that Agency and add qualified staff. Grant Funding Case Viewer access in the Program to see the queue and Contributor access to claim and work on an Intake. Grant coordinators the separate assignment-management permission.
4. Establish the mapping from the verified Portal organization to the host Proponent. To import manually, you must be able to read the Proponent. Scheduled imports require an active Proponent linked to the configured Agency, either as its lead Agency or through a non-deleted Agreement in that Agency's Programs and Streams.
5. Publish and select applicable Intake Review Sets and Workflows through the Streams and Opportunity. Confirm that a qualified group member can claim the resulting record.

An Opportunity extension tab can expose the connector's form and publication workspace. The optional host application-schema JSON is not a Portal survey. The connector owns its survey revisions and ordered forms; the information GCS-SSC supplies to the connector does not include those form definitions. Access to the Agency's extension settings does not by itself let you publish an Opportunity or create an Intake.

## Publication and import authorization

When a user sends publication information to the Portal, GCS-SSC checks their current permission to update the Opportunity (`transfer_payment:update`) in its Program and checks that its status permits publication. When a user imports a submitted application, a separate check requires permission to create an Intake (`funding_case:create`) in that Program. The Opportunity must allow imports and be within its opening dates, including both boundary dates. The user must be able to read the Proponent, and the selected Agency group must be eligible for assignment. GCS-SSC rechecks these rules while saving the import.

Automatic queue processing requires a connector that supports scheduled Intake imports. GCS-SSC checks that the connector is registered and enabled for the configured Agency. These imports do not assign a staff user to the Intake.

GCS-SSC sends the connector a publication summary with the Opportunity's bilingual names and objectives, owning Agency and Program, host ID and publication eligibility. The opening and closing dates include the full boundary days in UTC. You can prepare forms for a Draft Opportunity, but it cannot be published as an active call.

## Saved versus submitted evidence

Saving a draft in the Portal does not create a staff Intake. The applicant must submit the application, then the connector must import it. Each import includes the Opportunity, Proponent, staff group, original source system and submission ID, and a copy of the submitted data that cannot be changed. GCS-SSC creates a Draft Intake assigned to the group, with no staff user assigned, and returns its Intake ID. The source submission reference is separate from that ID; the connector retains the host reference in its import receipt.

Staff read the saved copy of the submitted forms and answers in the Intake's **Application** section. Authorized integrations can update the working application information in GCS-SSC. The original submitted copy and source identity cannot change. Later form edits do not replace this submitted evidence. Intake review, workflow and approval are staff processes distinct from the applicant's submission. Completing approval does not automatically create an Assessment Decision.

## Retry and conflict recovery

Retrying an import with the same original source system and submission ID returns the same Intake, even after the Opportunity closes. A retry with a known host Intake ID must match that exact record and its original evidence. A missing or mismatched supplied ID never creates a replacement record. Changed submitted evidence or a change to the linked Opportunity or Proponent produces a conflict rather than replacing an Intake. For integrations using a numeric compatibility reference, a reference already associated with another record also produces a conflict. The original source identity remains reserved even if the Intake is marked deleted.

GCS-SSC saves the import receipt and Intake together. Either both are saved or neither is saved. If Portal acknowledgement fails, retry the original submission with the same identity, evidence and known host reference. Inspect the connector receipt and host Intake before deciding a record is missing. Do not choose a new submission identity merely to bypass a conflict.

For a new submission rejected as closed, confirm Opportunity status and dates. For a group failure, confirm the active same-Agency group and staff eligibility. For a Proponent failure, repair the authorized mapping or Agency relationship. For a missing Draft status, restore the owning Agency's required status configuration. Retry only after correcting the cause; unavailable inputs do not create a partial host Intake. Use the connector's documentation to resolve form-save, publication or external delivery failures.

For example, Riverside Community Association submits its facilities application. The connector imports it as host Intake 412, and the Intake enters the configured staff group's queue. The officer claims 412 and reads the submitted forms. If the connector's acknowledgement times out, the imported application retains that host reference. Retrying the unchanged submission returns Intake 412, even after October 31. Sending altered answers under the same source identity produces a conflict; it does not silently replace the original application.

See [Funding Case Intakes](./funding-case-intakes.md) for queue claiming and reading evidence, and [Extensions](../concepts/extensions.md) for Agency enablement.
