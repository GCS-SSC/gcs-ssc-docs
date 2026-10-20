# Streams

A stream is the funding route officers choose when working on an agreement. For example, the "Community Facilities Improvement" program might have a "Small Community Projects" stream with its own yearly allocation, eligible recipient types, and allowable costs.

The stream brings together the agreement types, funding budgets, cost lines, commitments, reviews, approvals, recommendations, risk ratings, monitoring types, document templates, expertise areas, financial limits, and extensions needed for that route. A program can be saved without a stream, but a production agreement workflow normally needs one.

Start with the stream's identity, budget, recipients, and agreement types. Then configure the parts your officers will use, such as claims, reviews, and documents. Saving the stream does not mean all of these parts are ready.

## Stream list and navigation

Open the program, then select **Streams**. The table shows streams for that program. If you can update the program's setup, you can create, edit, or delete streams, or use the stream wizard.

Open a stream to see its collapsible summary, navigation trail, and setup tabs. Your access to the stream comes from its parent program and agency.

## Quick stream modal

The standard stream modal creates or edits the stream record only. It captures:

- English and French name.
- English and French abbreviation.
- Optional parent stream from the same program.
- English and French objective.
- Allows further distribution flag.
- English and French description.
- Active, off by default.

The parent stream must belong to the same program. Use parent streams to show program structure. Configure agreements and reviews on the stream where officers will create them.

## Stream wizard

Use the stream wizard to save the stream and its core settings together. It checks that the settings work together before saving, so a failed submission does not leave partial setup.

The wizard steps are:

- General: stream identity, parent stream, descriptions, objectives, further-distribution flag, and active flag.
- Holdback bases: agency holdback basis plus a bilingual stream label.
- Budgets: stream budget rows linked to program fiscal-year budget rows.
- Recipients: eligible applicant recipient subtypes.
- Cost lines: agency cost category line items and stream cost-sharing ratios.
- Amendment types: amended entity category plus bilingual type name.
- Amendment subtypes: subtype name and description linked to one wizard amendment type.
- Agreement subtypes: agency agreement types allowed for the stream.
- Chart of Accounts: eligible agency financial coding entries. Add stream budgets before selecting these entries.
- Commitment Types: available commitment classifications already created at the agency.
- Monitor types: eligible monitoring types already created at the agency.
- Areas: bilingual areas of expertise for review/assessment assignment.
- Financial limits: optional max-per-recipient, support percentage, retroactive-cost percentage, stacking limit, and status.
- Review: summary of the configured stream setup.

The wizard covers the stream's core setup. After saving it, link Review Sets and Workflows and configure extensions from its detail tabs. Create and publish recommendation definitions, approval templates, and assessment schemas at the agency before using them in those shared designs.

## Stream wizard validation

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

## Stream detail tabs

The stream detail page has these tabs:

- General.
- Holdback Bases.
- Budgets.
- Eligible Recipients.
- Cost Category Line Items.
- Funding Subtypes.
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

Use each setup tab to add, edit, or remove the records you have permission to manage.

## General tab

The General tab shows the stream identity and descriptive fields:

- Parent stream.
- English and French name.
- English and French abbreviation.
- English and French objective.
- Allows further distribution.
- English and French description.
- Active flag.

Edit these fields from the stream page action or from the parent program's Streams tab.

## Holdback bases tab

Use this tab to make an active agency holdback basis available in the stream and give it English and French labels. The basis must belong to the program's agency. You can link it only once in the stream's active mappings. Set this up before an agreement needs a holdback rule.

For example, choose the agency basis appropriate to your program's holdback policy and give it a label officers will recognize. The label describes the choice; it does not create the agreement's holdback rule.

You can correct a mapping's bilingual label. You cannot change its underlying agency basis while a non-deleted agreement uses it. The agency basis code is also protected while referenced. Resolve the dependency before changing the basis; new selections must belong to the current agency.

## Budgets tab

A stream budget assigns part of a program's yearly funding pool to this stream. Create the program budget first, then add a stream budget row with:

- Program budget: the program budget for the relevant fiscal year.
- Total budget: the amount allocated to this stream.
- Overcommit threshold: the configured allowance above the stream budget, shown as a percentage. The stored value is a ratio: `0.10` means 10%, and `0` means no overcommit allowance. Use the percentage shown in the form.

Agreement funding and commitment setup need this fiscal-year structure. The selector searches only the current program's budgets and shows their fiscal-year labels. An existing row keeps its saved budget label visible even outside the current results page.

All stream allocations for the target year together must fit within the selected program budget. For example, a $100,000 program budget with $70,000 already allocated to other streams leaves $30,000 for this stream. Saving $35,000 is refused. Enter the amount in the form's currency field.

For example, a $100,000 stream budget with a 10% threshold permits up to $110,000 of Agreement program funding. This does not increase the program funding pool available for stream allocations or the actual commitment payment capacity.

A new allocation needs an eligible program budget with a fiscal year that has not been retired. An existing row can keep its original retired-year reference while other values are corrected. Changing the reference requires a currently eligible budget.

If saving succeeds but refreshing the table fails, reload the table before submitting another allocation. A failed refresh does not mean the save failed.

## Funding subtypes and required funding breakdowns

Use **Funding Subtypes** to choose which sources of other funding officers can select for this stream. First create Funding Types and their subtypes on the Agency page. Then link an active subtype from the same agency whose parent type is also active.

For example, create "Other public funding" with stacking enabled and the subtype "Municipal contribution." Link that subtype to the stream so officers can choose it when recording a municipal funding source. This link makes the source available; it does not enter an agreement funding amount. The table shows the parent type's stacking and cost-sharing classifications. A saved funding source keeps its captured classification if the catalog later changes.

A Program-scoped `transfer_payment` Contributor can add a link; removal requires Manager. Duplicate active links are refused. Adding a previously removed subtype restores its association. Removing a link stops new selection and preserves saved funding evidence. You cannot delete the agency type or subtype while an active stream link remains.

The stream also has **Require forecast funding breakdown** and **Require claim funding breakdown**, both off by default. General displays the saved settings; users with permission to edit the stream can change them. They require a breakdown at final submission, while officers can still save unfinished work. Make the eligible subtypes available before enabling these settings, and check forecast and claim validation before production use.

If a subtype is missing, reload the agency and stream catalogs. Check its agency, its own and its parent's availability, and whether it is already linked before trying to add it again.

## Opportunity and intake assessment eligibility

An [Opportunity](../intake/opportunities.md) can use this stream and other active streams from the same program. To offer an Intake Review Set or Workflow, first link a published agency definition targeting `fundingcaseintake` through at least one selected stream. Then select that definition on the Opportunity itself.

For example, linking an intake review set to "Small Community Projects" makes it eligible for an Opportunity using that stream. The Opportunity still needs its own selection before the set is used. Removing these links does not change assessment evidence already created.

## Eligible recipients tab

Choose the agency applicant recipient subtypes that officers may use for this stream. Each row makes one subtype available on the link between an Agreement and a Proponent. The Proponent profile itself does not store a subtype.

For example, if the stream supports municipalities and nonprofit organizations, link the corresponding agency subtypes. Officers then select the appropriate subtype when linking a Proponent to an Agreement. That selection alone does not confirm all program eligibility criteria.

With **Require consistent Proponent type** enabled, a returning Proponent must keep the eligible subtype previously used in this stream. Otherwise officers can choose the type separately for each Agreement. They still need current permission to read the Proponent profile; its lead agency may differ from the Agreement's agency.

Historical mappings keep the subtype label after the agency retires it. You can retain the same reference, but a replacement must be currently eligible and belong to the agency. Retained Agreement relationship or eligibility references can block removal or retirement of an agency subtype.

## Cost category line items tab

Use this tab to make agency cost line items available to the stream. Each row contains:

- Agency cost category line item.
- Cost-sharing ratio.

The selected line item must belong to a cost category for the program's agency. Search the picker by its English or French name if it is absent from the first page. These rows control which cost items can be used by stream-specific agreement budgets and claims. The mapping, source line item, and source category have separate Active flags. The table exposes inactive sources so administrators can diagnose availability; an existing mapping does not override a disabled source. Saved Agreement lines retain their references and calculation settings. Activate the necessary source levels before adding new budget lines.

For example, link the agency's "Construction materials" line so officers can select it for this stream's costs. If it does not appear for a new agreement budget line, check all three Active settings: the stream mapping, the agency line item, and its cost category.

## Amendment types and subtypes

An amendment type identifies the category of record being changed and gives that kind of change a bilingual name. Choose an available record category; a subtype describes a more specific change within that category.

Amendment subtypes are linked to an amendment type and add:

- English and French name.
- English and French description.

Create the amendment type before adding its subtypes. In the wizard, deleting an amendment type also removes its temporary subtypes.

## Agreement subtypes tab

Agreement subtypes map agency agreement types to the stream. Each row selects one agency agreement type.

These links determine which agency agreement types officers can choose when creating agreements in the stream. Create the agency agreement types before adding links here.

Changing a subtype's underlying Agency agreement type must preserve the classification of existing Agreements. The server rejects a replacement that would conflict with an Agreement's stored agreement type. Correct labels or create a separate configuration rather than silently reclassifying saved Agreements.

## Chart of accounts and commitment types

Set up financial coding on the Agency page before linking it to the stream. An agency Chart of Accounts entry has bilingual text, a fiscal year, currency, kind, and accounting dimensions in a defined order. For example, your finance team might supply the fund, responsibility centre, and account dimensions officers need when recording an agreement commitment.

Use the stream's **Chart of Accounts** tab to link an eligible agency entry. Its currency must match the program budget supporting the stream. Search by fiscal-year label or dimension text. The entry's fiscal year, currency, and kind cannot change at agency level. Commitment, Account Receivable, and Credit Memo charts have different uses; select the kind for the work being configured.

Removing a stream link is a logical deletion and is refused while an active Agreement commitment line references it. Retiring the agency definition may leave historical stream links visible. Correct the agency entry rather than reuse a referenced ID for a different classification.

Create bilingual Commitment Types on the Agency page, then choose an available type in the stream's **Commitment Types** tab. This makes it available for new Agreement commitments. A Stream Contributor can add a link; eligible removal requires Manager. You cannot remove a used stream link or delete a referenced agency type. The server locks and rechecks the current agency, program, stream, and references before saving.

## Monitor types tab

Create bilingual Monitor Types on the Agency page, then associate eligible types here. The Stream selection determines which types new monitors may use. Existing monitor references retain their identity when an Agency type or Stream link is retired. Reload both catalogs if a type is absent from the picker; confirm Agency ownership and active state before retrying.

## Risk ratings tab

Risk ratings define the available risk labels and scores for the stream. Each row contains:

- Numeric risk score. The score must be finite and non-negative.
- English and French name.

These ratings are used by an Agreement risk-rating workflow. When the workflow is published, the maximum values for its assessment outcomes are matched to active stream ratings. Completing that workflow successfully applies the resulting score to the Agreement. Officers do not set that score through ordinary Agreement profile editing. See [Workflows](../concepts/workflows.md) for how to order the bands and recover when the configuration changes.

## Areas of expertise tab

Areas of expertise help assign and classify review work. Each row contains:

- English and French name.
- English and French description.

Add areas when officers need to assign reviews by specialty or label the expertise required for an assessment.

## Financial limits tab

Financial limits define stream-level thresholds:

- Maximum allowable per recipient.
- Maximum percent of support available per recipient.
- Maximum percent of retroactive costs allowable.
- Stacking limit.
- Active flag.

The list total includes active and inactive limit rows; the active count is separate. Changing a limit amount keeps its saved Active setting unless you change that setting too.

Financial limits are optional in the wizard. Without a financial limit row, processes that check limits have no stream-specific values to use.

For example, a maximum allowable amount of $50,000 per recipient describes the stream's recipient ceiling. It is separate from the stream's total yearly allocation: configuring one does not create the other. Enter the limits approved for the program, then verify the agreement process that uses them.

## Review setups tab

Use **Add** to link an eligible published Review Set from the same agency. Search by its published English or French name. You need permission to update the program to load these choices; reading the stream alone is not enough. A Review Set groups the review definitions officers will use. For example, the agency could publish an agreement-assessment set and make it available to several streams that use the same assessment process.

Open a row to edit the agency definition, its schema members, publication, and direct-review or on-completion behavior. You are editing the shared agency definition, so it can also be linked to other streams in that agency.

Removing the stream link preserves the agency set and historical reviews. Each review already created keeps the publication it started with. See [Runtime Reviews](../concepts/runtime-reviews.md).

## Recommendation setups tab

Recommendation schemas and sets are authored on the **Agency** page. Agency Workflows and their published members reference them. There is no Recommendation Setups tab on the stream. The design records bilingual questions, a deciding result question, ordered members, optional approval stages, and failure policy. See [Recommendation schemas and sets](./recommendations.md).

## Approval templates tab

Approval templates are authored and published on the **Agency** page. There is no Approval Templates tab on the stream. Review Sets, Recommendation Sets, and Workflows reference an eligible Agency template; each approval record keeps the steps and certifications copied when it was created. See [Approval Templates](./approval-templates.md).

## Workflow setups tab

Use this tab to make a published Agency Workflow available to the stream. Search by its published English or French name. The picker requires permission to update the program. Add a Workflow from the same agency; open its row to edit the shared definition on the Agency page.

For example, a workflow for an Agreement can specify a review followed by a recommendation and approval. The agency definition states which entity it applies to, its purpose, allowed starting statuses, the order of its members, conditions, and retry policy. Linking it to a stream supplies stream-specific values, such as risk ratings. Required fields or local references that are missing or incompatible block its use; the system does not skip the affected step.

Removing the link stops new use in this stream and preserves the shared definition and historical attempts. See [Workflows](../concepts/workflows.md) and [Agency catalogs](../admin/agency-catalogs.md).

## Document templates tab

Create a template on the Agency's **Document Templates** tab, then link an eligible template to this stream. For example, prepare English and French agreement-letter source files at the agency, then link the template to each stream that uses that letter.

The template records its target entity, bilingual name and description, output formats, Active setting, and source files. Both language files are required at creation. Each file may be at most 10 MiB; the whole request may be at most 21 MiB. A DOCX source permits DOCX/PDF output, and HTML permits HTML/PDF. The template kind cannot change after creation.

Validation uses the uploaded filename extension to determine the file kind. Template creation therefore requires trusted access. Removing the stream link preserves the agency source and documents already generated. See [Documents](../agreements/documents.md) and [Document generation](../developer/document-generation.md).

## Assessment schemas

Assessment and checklist schemas are created from the Agency Review Set editor and published there. They define the published questions, scoring, dependencies, outcomes, and result rules copied into each review. See [Assessment Schemas](./assessment-schemas.md) and [Checklist Schemas](./checklist-schemas.md).

## Extensions tab

Use this tab to configure extensions for the stream. Extension settings are separate from the core program settings and apply within the same stream, program, and agency.

![Stream extensions configuration](/screenshots/en/stream-extensions.png)

_This screenshot shows development sample data. A new installation does not contain these records._

## Lifecycle, failure, and recovery

Deleting a stream or setup row normally hides it from current use without physically erasing it. A specialized section may describe an exception. Historical child setup remains stored, but pages requiring a non-deleted stream no longer expose it.

Deletion requires current permission to delete the stream. An installed extension can block deletion to protect related Agreement work. If another administrator changes ownership during the checks, reload the stream before trying again.

Every save checks your current permissions and the stream's owning program and agency. A parent stream must be an active sibling in the same program; a stream cannot be its own parent. Agency choices must belong to the owning agency, program budgets to the owning program, and stream settings to the current stream.

If a record appears missing, check both its identifier and your access: the system deliberately gives similar errors for missing and inaccessible records. After a conflict, invalid choice, allocation over capacity, or concurrent scope change, reload the tab, correct the referenced record, and retry.

## Runtime dependencies

Check these settings before officers start each kind of work:

- Agreement creation depends on agreement subtypes, eligible recipients, budgets, financial limits, and stream identity.
- Claim and cost workflows depend on cost category line items and cost-sharing ratios.
- Commitment and payment workflows depend on budget and financial coding rows.
- Review workflows depend on active review setups and active/published assessment schemas.
- Approval workflows depend on referenced approval templates and their default users.
- Agreement document generation depends on active stream document templates and configured document generation tools for PDF output.
- Recommendation workflows depend on the published recommendation schemas and sets they reference.
- Monitoring workflows depend on monitor types and, where configured, review or approval setup.

You can save a stream before all its settings are ready. Verify the complete process officers will use before creating production agreements.

## Minimum useful stream

For a fresh installation, a minimum practical stream usually has:

- General stream profile with status set appropriately.
- At least one program budget and one stream budget.
- Eligible recipient subtype rows.
- Agreement subtype rows.
- Cost category line item rows if costs or claims will be used.
- Chart of Accounts links and commitment types if commitments or payments will be used.
- Risk ratings if agreement workflows calculate risk from assessments.
- Review setups and assessment schemas if reviews are generated.
- Approval templates if approvals are required.
- Document templates if users will generate agreement documents.
- Published recommendation schemas and sets linked through workflows if recommendations are generated.
- Extension settings required by the deployment.
