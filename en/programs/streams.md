# Streams

Streams are the operational configuration layer under a program. A stream connects a program to agreement types, eligible recipients, funding budgets, cost line items, commitments, review generation, approval routes, recommendation setup, risk ratings, monitor types, document templates, areas of expertise, financial limits, and stream-specific extensions.

Most agreement and runtime behavior is stream-driven. A program can exist without a stream, but a production agreement workflow normally cannot.

## Stream List And Navigation

Streams are managed from the program detail page on the Streams tab. The table is scoped to the current program and supports create, edit, delete, and wizard creation when the user can update the program's child setup.

Opening a stream navigates to a stream detail page with its own collapsible hero, breadcrumb trail, and vertical tabs. The stream page still inherits the parent program and agency scope for authorization.

## Quick Stream Modal

The standard stream modal creates or edits the stream record only. It captures:

- English and French name.
- English and French abbreviation.
- Optional parent stream from the same program.
- English and French objective.
- Allows further distribution flag.
- English and French description.
- Active flag, initially false.

The parent stream must belong to the same program. Use parent streams only to model program structure; runtime setup records are still configured on the stream where agreements and reviews will be created.

## Stream Wizard

The stream wizard creates the stream and several child setup collections together. It is useful for first-time stream setup because it enforces cross-record rules before any partial setup is saved.

The wizard steps are:

- General: stream identity, parent stream, descriptions, objectives, further-distribution flag, and active flag.
- Holdback bases: agency holdback basis plus a bilingual stream label.
- Budgets: stream budget rows linked to program fiscal-year budget rows.
- Recipients: eligible applicant recipient subtypes.
- Cost lines: agency cost category line items and stream cost-sharing ratios.
- Amendment types: amended entity category plus bilingual type name.
- Amendment subtypes: subtype name and description linked to one wizard amendment type.
- Agreement subtypes: agency agreement types allowed for the stream.
- Chart of Accounts: ordered bilingual financial dimensions tied to a temporary stream budget.
- Commitment Types: bilingual commitment classifications.
- Monitor types: bilingual monitoring record types.
- Areas: bilingual areas of expertise for review/assessment assignment.
- Financial limits: optional max-per-recipient, support percentage, retroactive-cost percentage, stacking limit, and status.
- Review: summary of the configured stream setup.

The visible wizard steps focus on the stream's core program setup data. Configure review setups, recommendation setups, approval templates, assessment schemas, and extensions from the stream detail tabs after the stream exists.

## Stream Wizard Validation

The wizard prevents common setup conflicts:

| Rule | Behaviour |
| --- | --- |
| Stream budgets are one row per program budget | A program budget can be selected only once. |
| Holdback bases must be unique and agency-owned | A selected agency holdback basis can appear only once and must belong to the program's agency. |
| Recipient subtype selections must be unique | Duplicate eligible recipient subtype rows are blocked. |
| Cost category line item selections must be unique | Duplicate stream cost line rows are blocked. |
| Amendment type uniqueness uses category and bilingual name | Two amendment types cannot share the same amended category and bilingual name combination. |
| Amendment subtypes must point to a current amendment type | Removing an amendment type invalidates subtypes attached to it. |
| Amendment subtype names must be unique within their type | Duplicate subtype names are blocked under the same amendment type. |
| Agreement subtype selections must be unique | Duplicate agreement subtype mappings are blocked. |
| Monitor type names must be unique | Duplicate bilingual monitor type names are blocked. |
| Areas of expertise must be unique | Duplicate bilingual area names are blocked. |
| Review and recommendation setups must not conflict | Active setups cannot duplicate order or bilingual names within the same entity type. |
| Selected records must belong to the correct parent | Parent streams and program budgets must belong to the program; agency-owned choices must belong to the program's agency. |

## Stream Detail Tabs

The stream detail page exposes these tabs:

- General.
- Holdback Bases.
- Budgets.
- Eligible Recipients.
- Cost Category Line Items.
- Amendment Types.
- Amendment Subtypes.
- Agreement Subtypes.
- Chart of Accounts.
- Commitment Types.
- Monitor Types.
- Risk Ratings.
- Custom Fields.
- Areas of Expertise.
- Financial Limits.
- Review Setups.
- Document Templates.
- Workflow Setups.
- Extensions.

Configure [Custom Fields](./custom-fields.md) for additional Agreement data and conditional workflow routing.

Each setup tab uses the same add/edit/delete pattern: a resource table, a modal or editor, validation, and soft-delete where delete is supported.

## General Tab

The General tab shows the stream identity and descriptive fields:

- Parent stream.
- English and French name.
- English and French abbreviation.
- English and French objective.
- Allows further distribution.
- English and French description.
- Active flag.

Edit these fields from the stream page action or from the parent program's Streams tab.

## Holdback Bases Tab

Holdback Bases maps the agency's active holdback bases into the stream and gives each mapping an English and French name. The selected agency basis must belong to the program's agency, and it can appear only once in an active stream mapping. Configure these mappings before agreement holdback rules need them.

A holdback mapping’s bilingual label can be corrected, but its underlying Agency basis cannot be changed while a non-deleted Agreement references it. Agency basis codes likewise cannot be changed while referenced. New selections must belong to the current Agency. Resolve the dependency instead of repurposing a used identifier.

## Budgets Tab

Stream budgets allocate part of a program fiscal-year budget to the stream. Each row contains:

- Program budget.
- Total budget.
- Overcommit threshold.

Configure program budgets before stream budgets. Agreement funding and commitment setup depend on the fiscal-year budget structure being present.

The program-budget selector searches budgets from the current program and displays their fiscal-year labels. When editing an existing stream budget, its saved program budget is resolved by id so the label remains visible even when it is outside the current results page.

New allocations require an eligible program budget with a non-retired fiscal year. An existing stream budget can retain its original retired-year reference while other values are corrected; changing the reference requires a currently eligible destination. Total allocations across the program’s streams for the target fiscal year cannot exceed the selected program budget. For example, with a program budget of `"100000.00"` and other stream allocations of `"70000.00"`, the remaining allocation is `"30000.00"`; a larger save is rejected. Money uses exact decimal strings. A failed refresh after a committed save is a read problem: retry loading before submitting another allocation.

## Eligible Recipients Tab

Eligible recipients define which agency applicant recipient subtypes can be used for the stream. Each row selects one agency applicant recipient subtype.

These mappings provide the recipient subtype required on each Agreement–Proponent link. The Proponent profile no longer stores a subtype. The Stream’s **Require consistent Proponent type** setting fixes a returning Proponent to its previous eligible subtype in that Stream; otherwise the type can be chosen per Agreement. The profile still needs current read access and can have a lead Agency different from the Agreement Agency. This mapping alone does not prove broader program eligibility.

Historical eligibility mappings retain the saved subtype label even after retirement. Keeping the same reference is permitted; a replacement must be a currently eligible subtype from the Agency. Removing or retiring an Agency subtype is blocked when retained Agreement relationship or eligibility references depend on it.

## Cost Category Line Items Tab

Cost category line items expose agency cost line items to the stream. Each row contains:

- Agency organization cost category line item.
- Cost-sharing ratio.

The selected line item must belong to a cost category for the program's agency. These rows control which cost items can be used by stream-specific agreement budgets and claims. The mapping, source line item, and source category have separate Active flags. The table exposes inactive sources so administrators can diagnose availability; an existing mapping does not override a disabled source. Saved Agreement lines retain their references and calculation settings. Activate the necessary source levels before adding new budget lines.

## Amendment Types And Subtypes

Amendment types define the high-level amended entity category and a bilingual display name. The amended category uses the transfer payment amended-type enum.

Amendment subtypes are linked to an amendment type and add:

- English and French name.
- English and French description.

Subtypes cannot be meaningfully configured before their parent amendment type exists. In the wizard, deleting an amendment type also removes its temporary subtypes.

## Agreement Subtypes Tab

Agreement subtypes map agency agreement types to the stream. Each row selects one agency agreement type.

This configuration classifies agreements for the stream and limits which agency agreement types are valid in downstream agreement creation. Agency agreement types must exist before this tab can be populated.

Changing a subtype’s underlying Agency agreement type must preserve the classification of existing Agreements. The server rejects a replacement that would conflict with an Agreement’s stored agreement type. Correct labels or create a separate configuration rather than silently reclassifying saved Agreements.

## Chart of Accounts and Commitment Types

Define bilingual Chart of Accounts entries on the Agency page, including fiscal year and ordered accounting dimensions. Then use this Stream's **Chart of Accounts** tab to link an eligible Agency entry. Search matches the fiscal-year display and dimension text. Removing a Stream link is a logical deletion and is blocked while an active Agreement commitment line references it. Retiring the Agency definition can leave historical Stream links visible; correct the Agency entry instead of reusing a referenced ID for a different classification.

Define bilingual Commitment Types on the Agency page. The Stream **Commitment Types** tab selects an available Agency type for new Agreement commitments. Removing a used Stream link or deleting a referenced Agency type is blocked. A Stream Contributor can add a link, while eligible removal requires Manager. The server rechecks the Agency, Program, Stream, and current references under lock.

## Monitor Types Tab

Create bilingual Monitor Types on the Agency page, then associate eligible types here. The Stream selection determines which types new monitors may use. Existing monitor references retain their identity when an Agency type or Stream link is retired. Reload both catalogs if a type is absent from the picker; confirm Agency ownership and active state before retrying.

## Risk Ratings Tab

Risk ratings define the available risk labels and scores for the stream. Each row contains:

- Numeric risk score. The score must be finite and non-negative.
- English and French name.

Risk ratings supply the bands for an explicit Agreement `risk_rating` workflow. Its publication maps the assessment outcome maxima to the active stream ratings; successful runtime completion applies the resulting score. Ordinary Agreement profile editing does not manually set the risk score. See [Workflows](../concepts/workflows.md) for ordered bands, stale configuration, and recovery.

## Areas Of Expertise Tab

Areas of expertise support assignment and classification of review work. Each row contains:

- English and French name.
- English and French description.

Use these rows when the stream requires subject-matter review routing or expertise labels in assessment processes.

## Financial Limits Tab

Financial limits define stream-level thresholds:

- Maximum allowable per recipient.
- Maximum percent of support available per recipient.
- Maximum percent of retroactive costs allowable.
- Stacking limit.
- Active flag.

The wizard treats financial limits as optional. If the stream has no financial limit row, downstream processes that rely on limit checks will not have stream-specific values to use.

## Review Setups Tab

This tab lists Agency-owned Review Sets linked to the Stream. Use **Add** to select an eligible published set from the same Agency. Open a row to edit its Agency definition, schema members, publication, and direct-review or on-completion behavior. Removing a Stream link does not delete the Agency set or its historical reviews. The definition can be linked to more than one Stream in that Agency; each runtime review remains pinned to the publication used when it was created. See [Runtime Reviews](../concepts/runtime-reviews.md).

## Recommendation Setups Tab

Recommendation schemas and sets are authored on the **Agency** page. They are referenced by Agency Workflows and their published members; the Stream has no separate Recommendation Setups tab. The design records bilingual questions, a deciding result question, ordered members, optional approval stages, and failure policy. See [Recommendation schemas and sets](./recommendations.md).

## Approval Templates Tab

Approval templates are authored and published on the **Agency** page. The Stream has no separate Approval Templates tab. Review Sets, Recommendation Sets, and Workflows reference an eligible Agency template; each runtime routing slip keeps its pinned step and certification evidence. See [Approval Templates](./approval-templates.md).

## Workflow Setups Tab

This tab lists published Agency Workflows linked to the Stream. The add control selects a same-Agency Workflow; the row opens its Agency detail editor. Removing a link stops new use on this Stream without deleting the shared definition or historical attempts. The Agency design declares entity type, purpose, starting statuses, ordered review/recommendation/approval members, conditions, and retry policy. Its Stream-specific deployment resolves local values such as risk ratings; missing required fields or incompatible local references block use rather than skipping a step. See [Workflows](../concepts/workflows.md) and [Agency catalogs](../admin/agency-catalogs.md).

## Document Templates Tab

Create bilingual DOCX or HTML source templates on the Agency's **Document Templates** tab, then link an eligible template here. Removing the Stream link leaves the Agency source and generated historical documents intact. A template records its target entity, bilingual name and description, output formats, active state, and source files. Both language files are required at creation; each is limited to 10 MiB and the request to 21 MiB. DOCX permits DOCX/PDF output and HTML permits HTML/PDF. A template's kind cannot change after creation. Uploaded filename extensions determine file-kind validation, so template authoring remains trusted access. See [Documents](../agreements/documents.md) and [Document generation](../developer/document-generation.md).

## Assessment Schemas

Assessment and checklist schemas are created from the Agency Review Set editor and published there. They define the pinned questions, scoring, dependencies, outcomes, and result rules used by runtime reviews. See [Assessment Schemas](./assessment-schemas.md) and [Checklist Schemas](./checklist-schemas.md).

## Extensions Tab

Extensions control stream-specific extension settings. Extension configuration is separate from the base transfer payment setup, but it inherits the same stream, program, and agency context.

![Stream extensions configuration](/screenshots/en/stream-extensions.png)

_Actual screenshot from the seeded development environment. The records shown are examples only and are not created in a fresh installation._

## Lifecycle, Failure, and Recovery

Stream and setup deletions are soft deletes unless a specialized section says otherwise. Stream deletion locks the current stream and extension-owned agreement scopes, rechecks exact delete access against the active program/agency chain, and lets registered extensions block deletion. A repeatedly changing ownership scope fails closed rather than using stale authorization. Historical child setup is not physically erased, but active-stream paths stop exposing it.

Stream and child writes use fresh-authorized transactions and re-resolve their canonical parent chain. Parent streams must be active siblings in the same program and a stream cannot parent itself. Agency-owned selections, program budgets, and nested setup resources must belong to the current chain. Missing and inaccessible resources are intentionally masked similarly. On a localized conflict, invalid selection, capacity failure, or concurrent scope error, reload the current tab, correct the referenced record, and retry.

## Runtime Dependencies

Downstream workflows read stream setup in different ways:

- Agreement creation depends on agreement subtypes, eligible recipients, budgets, financial limits, and stream identity.
- Claim and cost workflows depend on cost category line items and cost-sharing ratios.
- Commitment and payment workflows depend on budget and financial coding rows.
- Review workflows depend on active review setups and active/published assessment schemas.
- Approval workflows depend on referenced approval templates and their default users.
- Agreement document generation depends on active stream document templates and configured document generation tools for PDF output.
- Recommendation workflows depend on active recommendation setups and schemas.
- Monitoring workflows depend on monitor types and, where configured, review or approval setup.

Because setup is modular, a stream can be saved before it is operationally complete. Administrators should validate the whole runtime path that will be used before creating production agreements.

## Minimum Useful Stream

For a fresh installation, a minimum practical stream usually has:

- General stream profile with status set appropriately.
- At least one program budget and one stream budget.
- Eligible recipient subtype rows.
- Agreement subtype rows.
- Cost category line item rows if costs or claims will be used.
- Financial coding commitments if commitments or payments will be used.
- Risk ratings if risk selection or assessment scoring uses stream risk.
- Review setups and assessment schemas if reviews are generated.
- Approval templates if approvals are required.
- Document templates if users will generate agreement documents.
- Recommendation setups if recommendations are generated.
- Extension settings required by the deployment.
