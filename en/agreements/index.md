# Funding Agreements

Funding Agreements are execution records owned by a transfer-payment stream. An Agreement connects stream configuration to Proponents, addresses, budgets, activities, amendments, commitments, forecasts, payments, claims, monitoring, documents, reviews, approval submissions, workflows, and exact work assignments.

## Access model

The Agreements list returns active records covered by the user's Viewer-or-higher `agreement` permission at global, agency, or program scope. Reads do not require an exact assignment. Search matches agreement number; English/French title; agency, program, or stream name; and agreement-type name. The list selector offers all accessible Agreements, **My Agreements** (your exact assignments), and Agency views. These filters narrow your existing read scope; an assignment does not grant additional scope. An optional agency filter further narrows the list. Each row reports its own update/delete capabilities; controls are disabled independently.

| Required combination | Agreement actions |
| --- | --- |
| Viewer role ceiling | Read the Agreement and ordinary children. |
| Contributor role ceiling + exact assignment | Update the Agreement and create/update ordinary children. |
| Manager role ceiling + exact assignment | Contributor actions plus soft deletion. |

The **New agreement** action requires a Contributor ceiling for `agreement`; the server verifies the selected stream's exact agency/program scope. Because no assignment exists yet, creation atomically registers the Agreement and assigns the creator as primary. Assignment administration later requires the separate `manage_assignments` capability.

## Configuration prerequisites

Before creating an agreement, configure:

- an active agency, transfer-payment program, and stream;
- at least one agreement subtype mapped to that stream;
- at least one active stream holdback basis;
- an optional risk rating if a risk score will be selected; and
- at least one active proponent that the creator can read.

Later tabs require their corresponding stream fiscal years, cost categories, outcomes, monitor types, commitments, templates, review/workflow setups, and other reference data. A configured value may disappear from a lookup when it is deleted, belongs to another stream, or falls outside the requested create/update scope.

## Create an agreement

The create form starts **Further distribution** as false and **Holdback** at 10%. It contains three core sections, the stream’s configured custom-field sections, and any enabled extension slots. Choose the program before the stream; changing the program clears dependent stream selections. Proponents are selected independently from the readable active profiles.

| Field | Rule |
| --- | --- |
| Program and stream | Choose the program first, then an available stream within create scope. The stream is immutable after creation. |
| Agreement subtype | Required active subtype belonging to that exact stream. Agreement type is derived from the subtype and is not independently editable. |
| Agreement number | Manual mode requires a trimmed number of at most 15 characters. When a numbering provider is enabled, creation generates the number and rejects a manually supplied one. |
| Financial system number | Required non-negative integer-like identifier; large database IDs are sent as strings. |
| Assistance dates | Both required; end cannot precede start. |
| Further distribution | Required yes/no value. |
| English and French title | Both required, each at most 255 characters. |
| English and French description | Both required. |
| Holdback | Required percentage from 0 through 100, stored to two decimal places. |
| Holdback basis | Required active basis configured for the stream. It is not limited to two hard-coded labels. |
| Risk score | Optional manual selection when no Risk Rating workflow is published; otherwise workflow-managed and not writable through the profile. |
| Proponents | At least one unique active profile, and the creator must be able to read every selection. See [Agreement Proponents](./applicant-recipients.md). |

Changing the stream in the form clears subtype, holdback basis, and risk score because each is stream-owned. Creation locks extension scopes and the selected stream, rebuilds authorization, locks every selected Proponent, validates cross-stream references, inserts the Agreement and recipient links, registers the typed entity, and creates the creator-primary assignment atomically.

## Agreement-number matching

The active database uniqueness rule blocks the same agreement number in one stream. In addition, agreement create and identity-changing updates compare the proposed system number with accessible external Funding History records in the same agency/program name scope. Near matches require a server confirmation fingerprint.

The create and edit forms now present a similarity-confirmation dialog. Review the possible match before proceeding: cancel to correct the draft or confirm the displayed warnings and resubmit. Restricted matches do not reveal their protected labels. Confirmations apply to the proposed stream/number identity; changing it invalidates the previous confirmation. If another match appears before the transaction completes, the dialog opens again with the current warnings. Confirmation does not bypass an exact uniqueness conflict.

For example, a proposed number resembling an external Funding History entry may represent either a duplicate or a genuinely different Agreement. Check the accessible business context, then explicitly confirm only when the new record is intended. Cancel leaves the Agreement unsaved.

When numbering is provider-managed, the host resolves exactly one enabled provider for the owning Agency and stream and generates the number within the creation transaction. Conflicting providers or an invalid result stop creation. Do not invent a placeholder number or retry with a manually supplied value; ask the Agency administrator to correct the provider configuration. Provider-specific formatting and counter configuration belong to that extension’s documentation.

## Detail workspace

The detail route first resolves the agreement’s agency, program, and stream scope. Readers see General in display mode; updaters get the inline form. Child create, update, and delete controls are derived independently. The vertical workspace contains:

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
| Recommendation | Published approval-submission workflow, immutable packet, recommendations, and approvals. |
| Amendments | Amendment creation, snapshots, approval submission, cancellation, and promotion. |
| Assigned users | Exact Agreement roster; roster mutations require `manage_assignments`. |

Enabled extensions may append additional tabs and profile fields. Child detail routes replace the parent tab workspace while retaining agreement context.

## Update safeguards

Profile updates re-read and validate the localized partial payload, then lock extension scopes, involved streams, extension lifecycle state, and the agreement in a fixed transaction. Authorization and scope are rebuilt after locking. If ownership changes while locks are acquired, the server retries up to three times and then reports a scope conflict.

The stream cannot be changed after creation, including through the API. An unchanged echoed stream identifier is accepted; a replacement returns `AGREEMENT_STREAM_IMMUTABLE`. Choose the correct program and stream before saving a new Agreement. Historical subtype, holdback, and risk references may be retained during unrelated edits; a replacement must satisfy current ownership and eligibility rules.

Shortening or moving the assistance period is refused when an active agreement budget fiscal year would no longer overlap the proposed dates. Changing the Agreement number reruns Funding History similarity checks. A successful update invokes the host agreement-profile-updated hook inside the transaction.

## Custom fields and risk rating

The General tab appends the sections configured by the stream. Complete active required fields, preserve or explicitly clear retained inactive values, and save through the ordinary Agreement form. See [Agreement custom fields](../programs/custom-fields.md) for field types, a worked configuration, partial-update examples, and conditional routing.

When the stream selects a published **Risk Rating** workflow, the risk selector becomes workflow-managed. Use the Agreement’s Risk Rating workflow controls to start the assessment and follow its review/approval steps. The latest successful assessment is mapped through the publication’s score bands to a stream risk rating. A pending, failed, denied, or cancelled attempt does not itself replace the stored rating. A completed result retains its workflow, assessment score, mapped rating, and completion evidence. If the management mode cannot be loaded, retry before attempting a risk edit.

Without a published Risk Rating workflow, manual selection remains available subject to normal profile permissions. Retained scores continue to display in the current language. Rating scores and identities referenced by current publications or active attempts cannot be changed or deleted until those dependencies are resolved.

## Delete and recovery

Delete requires a Manager ceiling and the exact Agreement assignment, asks for confirmation on the list, then locks and reauthorizes the Agreement. An active approval-submission workflow blocks deletion. Every enabled extension delete guard runs before soft deletion; a guard or dependency can refuse the operation and no partial deletion commits.

Soft-deleted agreements disappear from active lists and relationship projections. The application has no agreement restore control. Correct dependent state or extension configuration before retrying a refused delete; after an accidental successful deletion, recovery requires database-level operational intervention rather than recreating child history manually.

![Agreement detail and child workflow](/screenshots/en/agreement-child-workflow.png)

_Example from the seeded development environment; a fresh installation does not contain these records._
