# Assessment Schemas

An assessment schema is a reusable review form and its scoring rules. It tells officers which questions to answer, how answers contribute to scores, and how those scores lead to outcomes. Administrators open it from an Agency Review Set member in the transfer payment area.

For example, a program can use an assessment to review an applicant’s delivery capacity: officers answer questions about staffing and previous projects, then use the configured score and outcome to support their review. The questions and rules must be configured; this example is not a built-in assessment.

The Agency owns the schema. A Stream can use it only if it belongs to the same Agency and is configured for the kind of record being reviewed, called the entity type.

## Empty-System Prerequisites

Before a stream can use assessment schemas operationally, configure:

- Agency and transfer payment program.
- Stream.
- Common review schemas for the agency and entity type, with review type set to assessment.
- An Agency Review Set that references those schemas; link its published set to the Stream.
- Approval templates if assessment completion or review steps require approval routing.
- Users with the required scoped roles and exact runtime-entity or workflow assignments for reading, saving, completing, and approving the generated work.

## Where Schemas Are Opened

Open a schema from an Agency Review Set. The breadcrumb returns to the Agency catalog. The editor loads:

- Owning Agency and Review Set.
- Assessment review schema.
- Effective schema content and scoring matrix.
- Helper fields available for the schema entity type.

The summary at the top can be collapsed. The left sidebar contains save controls and links to the editor sections.

## Import a JSON definition

In the schema editor, **Import** accepts a pasted JSON assessment definition. The client parses it and validates it against the assessment definition contract before replacing the local editor draft. Review the imported sections, scoring, and bilingual text, then use **Save** and **Publish** as separate actions. Invalid JSON or invalid fields stay in the import dialog for correction; an import alone does not change the server or any pinned runtime review.

## Publication states

Assessment schemas use the shared publication lifecycle:

- **Draft** (`draft`): editable authoring content with no published version yet.
- **Published** (`published`): an immutable published snapshot is available; further saves change authoring content for a later publication.
- **Retired** (`retired`): retained historical configuration, unavailable for new selection and no longer editable or publishable.

The detail hero shows publication state, version and whether unpublished changes exist. These are not Agency business statuses.

## First publication

Save a valid schema, then choose **Publish**. The first publication creates immutable version `1`, with a content fingerprint (canonical hash) and the publishing user recorded. It includes the bilingual metadata, scoring matrix, assessment definition and flags. A separate Activate API is not part of the current contract.

Publish the Review Setup with that schema version before it can create reviews that retain that version. Publishing a schema alone does not start an assessment.

## Publishing changes and retirement

Save edits to the authoring schema, inspect the pending-change indicator, then publish when the new definition is ready. Each changed publication increments the integer version by one: a label correction and a structural change both move version `1` to `2`. An identical canonical definition keeps the current version. There is no major/minor decimal version calculation.

For example, changing a question’s wording and publishing version `2` leaves an existing version-`1` review with its original wording. Update and publish the Review Setup that uses it when future work should use the new schema. Renaming a question key also requires repairing every dependency that names it.

Retire a published schema when it must not be selected for new configuration. Retirement is permanent; historical versions remain available to the review attempts that already use those versions. Do not edit historical responses by changing the current schema.

## Save Behavior

The schema editor has one save action that validates and saves both general metadata and definition content:

| Area | Saved content |
| --- | --- |
| General | Schema names, outcome names, and disable flags. |
| Definition | Overall scoring matrix and assessment definition. |

If either area fails validation, the save is stopped and the first validation error is shown. If both are valid, the editor saves the schema and refreshes the page.

## General Section

The General section captures:

- English and French schema name.
- English and French outcome name.
- Disable custom outcomes.
- Disable alignment.
- Disable reviewers.

The disable flags affect runtime assessment behavior:

- Disable custom outcomes limits reviewer ability to create outcomes outside configured schema outcomes.
- Disable alignment removes reviewer alignment behavior where supported.
- Disable reviewers removes additional reviewer behavior where supported.

## Scoring Matrices

The Matrices section contains:

- Overall scoring matrix.
- Section scoring matrix.

Each matrix row has:

- Maximum score threshold.
- English and French label.
- Indicator color, validated as a hex color.

A scoring matrix turns a numeric assessment or section score into a label and color, such as a risk rating. Keep thresholds ordered and non-overlapping in practice, even though the data model stores max thresholds rather than a rendered range.

## Sections

Sections are top-level groups in the assessment. Each section has:

- Order/number.
- Language-independent code.
- English and French label.
- Icon.
- Weight.
- One or more subsections.

A language-independent code is an internal identifier that stays the same in English and French. Conditions and calculations use section, subsection, and question codes to find the right answer. Renaming codes on a published schema is a structural change and can break references if dependent items are not updated.

## Subsections

Subsections group questions within a section. Each subsection has:

- Order/number.
- Language-independent code.
- English and French label.
- Weight.
- Optional dependencies.
- Assessment questions and calculated items.

Subsection dependencies are conditions that determine whether a subsection appears or contributes to the assessment. They use previous answers or helper values: information already available from the record being reviewed. Subsection weights can be fixed, adjustable, or an adjustable scenario array.

## Assessment Items

Assessment items can be direct questions or calculated items.

A question contains:

- Language-independent code.
- English and French question text.
- Weight.
- Optional dependencies.
- Comment threshold with min and max.
- Optional assistance type. The current supported assistance value is funding history.
- Answer options.
- Help text.

Each answer option has:

- Numeric value.
- English and French label.
- English and French description.

Help rows have:

- English and French title.
- English and French description.

## Calculated Items

A calculated item stores:

- Language-independent code.
- English and French label.
- Weight.
- Optional dependencies.
- Help text.
- Formula.

Formula roots must be operations. Supported calculation operators include add, subtract, multiply, divide, sum, average, min, max, round, clamp, coalesce, if, eq, ne, gt, gte, lt, lte, and, or, and not.

Formula operands can be:

- Number literal.
- Boolean literal.
- Answer reference, using section code, subsection code, and question code.
- Helper reference.
- Nested operation.

Validation rejects formulas that reference missing assessment items, formulas that reference invalid helper fields, and calculation cycles between calculated items.

## Weights

Weights determine how much an answer or group of answers contributes to the score. They can be:

- Fixed: one numeric weight.
- Adjustable: a dependency target plus score-key-to-weight mappings.
- Adjustable scenario array: base weight plus multiple dependency scenarios, each with score-key-to-weight mappings.

Dependency targets can be helper fields or answer paths. Helper targets are validated against the helper registry for the schema entity type. Answer targets use section, subsection, and question codes.

For adjustable weights, if no mapping matches at runtime, the calculation logic falls back to the first available item, which can effectively produce a zero contribution depending on the configured values. Administrators should define explicit mappings for every expected answer or helper value.

## Dependencies

Dependencies are rules that show or apply part of the assessment only when a condition is met. For example, a question about managing delivery partners can depend on an earlier answer indicating that partners will deliver the project. A dependency rule can be a single condition or a grouped set of conditions. Each condition has:

- Dependency type: helper or answer.
- Target helper field or answer path.
- Value type: boolean, number, or text.
- Expected value.

Helper dependency values are type-checked against the helper definition. For applicant recipient assessments, available helper fields include identifiers, business numbers, subtype, lead agency, lead officer, legal names, research organization names, NAICS, and status.

Dependencies on answers use the language-independent section, subsection, and question codes. Rename these codes carefully.

## Outcomes And Strategies

Assessment outcomes are configured in the Outcomes section. Each outcome contains:

- Language-independent code.
- English and French label.
- One or more strategies.

Each strategy contains:

- Language-independent code.
- English and French label.
- Options.

Each strategy option contains:

- Maximum score threshold.
- Stored value.
- English and French label.

Outcomes and strategies connect assessment scores to the program’s configured decisions or follow-up choices. For example, administrators can configure labels for levels of monitoring needed after a capacity review. Custom runtime outcomes may be disabled by the general setting.

## Impactors

Impactors adjust or classify assessment results based on helper or answer values. Each impactor has:

- Weight.
- Optional English and French label.
- Dependency target.
- Scoring matrix rows.

Each impactor scoring row has a max threshold and numeric value. Changing a target changes the published definition and requires a new integer publication version.

## Runtime Assessment Flow

When runtime review work is generated from stream setup, the assessment runtime page presents the published schema content. Reviewers answer questions, calculated items derive values from answers or helpers, dependencies determine which portions apply, and matrices/outcomes summarize the results.

Runtime assessment pages can include:

- Schema questions and answer options.
- Scoring summaries.
- Outcome selection or calculated outcome display.
- Reviewer comments.
- Additional reviewer handling unless disabled by the schema.
- Alignment handling unless disabled by the schema.
- Approval routing when the generated review references an approval template.
- Completion action.

![Assessment schema editor](/screenshots/en/assessment-schema-editor.png)

_Actual screenshot from the seeded development environment. The records shown are examples only and are not created in a fresh installation._

![Runtime assessment workflow](/screenshots/en/runtime-assessment.png)

_Actual screenshot from the seeded development environment. The records shown are examples only and are not created in a fresh installation._

## Completion Behavior

Runtime completion is handled by the common completion section. It loads completion state for an entity type and entity ID, then shows either:

- Completed metadata: completed by, completed at, and comment.
- A comment box and completion action when the user can complete and the entity is not locked.
- A locked message when completion is blocked by page state.

Submitting completion saves comments and, for common review completion, can include the assessment response. The user must have permission to save the assessment before completion is recorded.

## Approval Behavior

When an assessment or review has an approval template, completing the review or reaching the relevant workflow step creates the routing slip using the versions already selected for that review. The routing slip lists the approval steps; the approvals section records decisions by slip and step.

Approvers can:

- View current and previous routing slips.
- Reassign a current step when they have manage approval permission.
- Approve or deny a current actionable step.
- Complete required certifications during approval.
- Provide a required comment when denying.
- Act on behalf of another user when the assigned approver differs from the default or when an on-behalf type is selected.

If an on-behalf type requires actual approval details, the approver must enter an actual position title and decision date.

## Operational Guidance

Each save, publication, and retirement checks that the Stream, Program, and Agency are still active and that you still have the exact `transfer_payment:update` access. These checks occur together in a fresh database transaction. If you cannot access a schema, the application responds as though it does not exist. Publication requires valid authoring content; retirement prevents further edits and publications. When validation identifies a broken dependency, unknown helper field, duplicate code, calculation cycle, or invalid publication state, keep the editor open, correct the referenced section/item, save again, and only then publish.

Use these practices for stable schemas:

- Treat language-independent codes as durable identifiers.
- Publish schema changes before expecting new runtime work to use them.
- Avoid deleting or renaming codes that existing runtime responses may reference.
- Keep option values, matrix thresholds, risk ratings, and outcome thresholds aligned.
- Configure helper dependencies only for helper fields available to the schema entity type.
- Test calculated items after adding dependencies, because missing references and cycles are validation errors.
- Configure approval templates and default users before attaching templates to review setup members.
