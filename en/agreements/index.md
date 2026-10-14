# Funding Agreements

A funding agreement is the main file for administering funding to one or more proponents. It belongs to a transfer-payment stream, which supplies the available settings and choices. Use the agreement to record who receives the funding, what work is planned, the assistance period, and the financial and approval records that support delivery.

For example, an officer administering a community training contribution can create the agreement, link the recipient, describe the workshops in **Activities**, and record its budget. Payments, claims, and monitoring records are then managed from the agreement’s tabs. Some tabs open separate records with their own assigned users; see [Agreement Child Workflows](./child-workflows.md).

## Access model

The Agreements list shows active agreements you are allowed to read. Viewer or higher access for `agreement` may apply globally, to an agency, or to a program. You do not need to be assigned to an agreement to read it. To change it, you need both the appropriate role and an assignment to that particular agreement.

Search by agreement number, English or French title, agency, program, stream, or agreement-type name. Choose **My Agreements** to show agreements assigned directly to you, or use an Agency view or agency filter to narrow the list. These filters do not grant access to additional agreements. Edit and delete controls are checked separately, so one can be available while the other is disabled.

| Required combination | Agreement actions |
| --- | --- |
| Viewer access | Read the Agreement and ordinary children. |
| Contributor access + assignment to this agreement | Update the Agreement and create/update ordinary children. |
| Manager access + assignment to this agreement | Contributor actions plus soft deletion. |

You need Contributor or higher access for `agreement` in the selected stream’s agency/program scope to use **New agreement**. You do not need an assignment to a file that has not yet been created: saving creates the agreement and makes you its primary assigned user. Later changes to assigned users require the separate `manage_assignments` permission.

## Configuration prerequisites

Check that the following choices are available before creating an agreement. If anything is missing, ask the program or agency administrator to configure it:

- an active agency, transfer-payment program, and stream;
- at least one agreement subtype mapped to that stream;
- at least one active stream holdback basis;
- an optional risk rating if a risk score will be selected; and
- at least one active proponent that the creator can read.

Later tabs require their corresponding stream fiscal years, cost categories, outcomes, monitor types, commitments, templates, review/workflow setups, and other reference data. A configured value may disappear from a lookup when it is deleted, belongs to another stream, or falls outside the requested create/update scope.

## Create an agreement

1. Select **New agreement** from the Agreements list.
2. Choose the program, then its stream. Check these choices carefully: the stream and currency cannot be changed after creation.
3. Complete the required fields below, including both language versions of the title and description.
4. Select at least one active proponent you can read, with its eligible recipient subtype and Agency Financial ID.
5. Complete any required custom fields, then save. Review any number-similarity warning before confirming.

The form starts **Further distribution** as false and **Holdback** at 10%; check that these values fit the agreement. It has three main sections plus configured custom-field sections and enabled extension fields. Changing the program clears dependent stream choices. Proponents are chosen separately from the active profiles you can read.

| Field | Rule |
| --- | --- |
| Program and stream | Choose the program first, then an available stream within create scope. The stream is immutable after creation. |
| Agreement subtype | Required active subtype belonging to that exact stream. Agreement type is derived from the subtype and is not independently editable. |
| Agreement number | Manual mode requires a trimmed number of at most 15 characters. When a numbering provider is enabled, creation generates the number and rejects a manually supplied one. |
| Currency | Required denomination selected at creation; immutable thereafter. Financial children and eligible budget/chart references must match it. |
| Financial system number | Required financial-system identifier representing a whole number of zero or more. Large IDs are handled as text to preserve all digits. |
| Assistance dates | Both required; end cannot precede start. |
| Further distribution | Required yes/no value. |
| English and French title | Both required, each at most 255 characters. |
| English and French description | Both required. |
| Holdback | Required percentage from 0 through 100, stored to two decimal places. |
| Holdback basis | Required active basis configured for the stream. Choose from the available values; the administrator can configure different labels. |
| Risk score | Optional manual selection when no Risk Rating workflow is published; otherwise workflow-managed and not writable through the profile. |
| Proponents | At least one unique active readable profile. Choose an eligible recipient subtype and an active Agency Financial ID owned by that Proponent and the Agreement Agency for each link; the type belongs to this relationship. See [Agreement Proponents](./applicant-recipients.md). |

Changing the stream clears subtype, holdback basis, and risk score because those choices belong to the stream. Select them again for the new stream. The application rechecks your access and all selected records when you save. It creates the agreement, its recipient links, and your primary assignment together; a failed creation does not leave a partly created file.

Currency is also fixed after creation (`AGREEMENT_CURRENCY_IMMUTABLE`). A financial child using another currency fails with `AGREEMENT_CURRENCY_MISMATCH`; correct the child’s currency choice. If a recipient’s financial ID is rejected, ask for an active ID belonging to that proponent and the agreement’s Agency, then reload the form. An ID with no agency does not qualify.

## Agreement-number matching

Two active agreements in the same stream cannot share an agreement number. When you create an agreement or change its identifying number, the application also checks for similar numbers in accessible external Funding History records under the same agency and program names. A close match opens a confirmation dialog before the save can proceed.

The create and edit forms now present a similarity-confirmation dialog. Review the possible match before proceeding: cancel to correct the draft or confirm the displayed warnings and resubmit. Restricted matches do not reveal their protected labels. Confirmations apply to the proposed stream/number identity; changing it invalidates the previous confirmation. If another match appears before the transaction completes, the dialog opens again with the current warnings. Confirmation does not bypass an exact uniqueness conflict.

For example, a proposed number resembling an external Funding History entry may represent either a duplicate or a genuinely different Agreement. Check the accessible business context, then explicitly confirm only when the new record is intended. Cancel leaves the Agreement unsaved.

When numbering is provider-managed, the host resolves exactly one enabled provider for the owning Agency and stream and generates the number within the creation transaction. Conflicting providers or an invalid result stop creation. Do not invent a placeholder number or retry with a manually supplied value; ask the Agency administrator to correct the provider configuration. Provider-specific formatting and counter configuration belong to that extension’s documentation.

## Detail workspace

Open an agreement to see its tabs. **General** displays the profile for readers and provides an inline form when you can edit. The other tabs have their own create, edit, and delete checks. The workspace contains:

| Tab | Purpose |
| --- | --- |
| General | Classification, identifiers, bilingual profile, assistance dates, holdback, risk, and extension profile slots. |
| Addresses | [Agreement addresses](./addresses.md) |
| Proponents | [Agreement Proponents](./applicant-recipients.md) |
| Budget | [Agreement budget](./budget.md) |
| Commitments | [Commitments](./commitments.md) |
| Payments | [Payments](./payments.md) |
| Forecasts | [Forecasts](./forecasts.md) |
| Claims | [Claims and Reconciliation](./claims.md) |
| Monitors | [Monitoring](./monitors.md) |
| Closeouts | [Agreement Closeout](./closeouts.md): readiness, financial reconciliation, workflow evidence, documents, and closure. |
| Documents | [Documents](./documents.md) |
| Activities | [Activities](./activities.md) |
| Notes | Bilingual working notes for this Agreement. |
| Recommendation | Published approval-submission workflow, immutable packet, recommendations, and approvals. |
| Amendments | Amendment creation, snapshots, approval submission, cancellation, and promotion. |
| Assigned users | Exact Agreement roster; roster mutations require `manage_assignments`. |

Enabled extensions may add tabs and profile fields. Opening a payment, claim, or another child detail record replaces the agreement tab area with that record’s workspace while keeping the agreement context. Check which record you have open before adding attachments or changing assigned users.

## Agreement notes

Open **Notes** on the Agreement to search, read, add, edit, or remove working notes. Each note needs a subject in at least one language and a body in at least one language; a subject is limited to 255 Unicode characters. Supply both languages when both audiences need the text.

The list shows author and last editor, newest first. Readers with Agreement read access can see the notes. Creating and editing require the corresponding Agreement action permission and exact assignment; deletion requires the applicable Manager ceiling and assignment. The server rechecks the Agreement scope and status during writes. A deleted note disappears from the active list but retains its historical record.

For example, use a note to record that you asked the recipient to clarify workshop dates, with the date of your request and the follow-up needed. Attach a signed letter or approval evidence in the appropriate document or attachment area instead.

If a note save fails, keep the draft text, reload the Agreement to check its current status and your assignment, then retry. A partial update keeps omitted language fields; clearing the last subject or last body is rejected. Notes do not replace documents or approval evidence.

## Update safeguards

When you save changes in **General**, the application checks the fields you changed and verifies your access again against the current agreement and extension settings. If ownership changes while the save is being processed, it retries up to three times before reporting a scope conflict. Keep your draft, reload the agreement, and check your access before retrying.

The stream cannot be changed after creation, including through the API. An unchanged echoed stream identifier is accepted; a replacement returns `AGREEMENT_STREAM_IMMUTABLE`. Choose the correct program and stream before saving a new Agreement. Historical subtype, holdback, and risk references may be retained during unrelated edits; a replacement must satisfy current ownership and eligibility rules.

You cannot shorten or move the assistance period if an active budget fiscal year would no longer overlap it. For example, before moving an end date earlier, check whether the agreement still has a budget for a later fiscal year. Changing the Agreement number repeats the Funding History similarity check. A successful save also runs any configured extension update handling as part of the same save.

## Custom fields and risk rating

The General tab appends the sections configured by the stream. Complete active required fields, preserve or explicitly clear retained inactive values, and save through the ordinary Agreement form. See [Agreement custom fields](../programs/custom-fields.md) for field types, a worked configuration, partial-update examples, and conditional routing.

When the stream selects a published **Risk Rating** workflow, the risk selector becomes workflow-managed. Use the Agreement’s Risk Rating workflow controls to start the assessment and follow its review/approval steps.

The latest successful assessment is mapped through the publication’s score bands to a stream risk rating. A pending, failed, denied, or cancelled attempt does not itself replace the stored rating. A completed result retains its workflow, assessment score, mapped rating, and completion evidence. If the management mode cannot be loaded, retry before attempting a risk edit.

Without a published Risk Rating workflow, manual selection remains available subject to normal profile permissions. Retained scores continue to display in the current language. Rating scores and identities referenced by current publications or active attempts cannot be changed or deleted until those dependencies are resolved.

## Delete and recovery

To delete an agreement, you need Manager access and assignment to that agreement. Use the delete action on the list and review the confirmation. The application rechecks access before deleting. An active approval-submission workflow or a protection from an enabled extension or related record can block deletion. If a check fails, no partial deletion is saved.

Soft-deleted agreements disappear from active lists and relationship projections. The application has no agreement restore control. Correct dependent state or extension configuration before retrying a refused delete; after an accidental successful deletion, recovery requires database-level operational intervention rather than recreating child history manually.

![Agreement detail and child workflow](/screenshots/en/agreement-child-workflow.png)

_Example from the seeded development environment; a fresh installation does not contain these records._
