# Recommendation schemas and setups

A recommendation records whether an officer recommends proceeding with a file. An Agency administrator creates a **schema**, the bilingual form officers fill in. A **Recommendation Set** puts these forms in order and controls approvals and what happens after a Not Recommended result.

For example, a set could ask a program officer for a funding recommendation, then a finance officer for a financial recommendation. Each form has one question that decides whether its result is Recommended or Not Recommended. The administrator decides whether a Not Recommended result stops the set and whether approvals are needed. This is an example to adapt to your program's process.

## Navigation and access

Open **Agencies**, choose the Agency, then **Recommendation Sets**. The grouped list organizes sets by runtime entity type. Open a set to manage its name, final approval, and ordered members. Open a schema to edit its questions.

The Agency Viewer role lets you read these designs. Contributor lets you create, edit, and publish them. Manager lets you delete designs that are eligible for deletion. A Program Stream uses these Agency designs through a linked Agency Workflow. A work assignment alone does not grant catalog access.

## Recommendation schema

The schema is the form design, not an officer's completed recommendation. It stores the kind of record it applies to, bilingual name, Agency, status, version, questions, and result rules. A schema created from a set belongs to that set's Agency. Both names are required and limited to 255 Unicode characters. Each language name must be unique among non-deleted schemas in that Agency. If saving reports a duplicate English or French name, change that name or use the existing schema. A failed save leaves the saved form and publication unchanged.

The editor contains General and Form Sections. A valid definition needs at least one section, one subsection per section, and one question per subsection. Keys identify sections, subsections, questions, options, and help regardless of the displayed language. Keep them unique where required so the system can match answers to the correct question.

| Type | Fields and rules |
| --- | --- |
| `radio` | Bilingual question, at least two uniquely keyed bilingual options, optional descriptions, and optional outcome mappings. |
| `text` | Bilingual question, optional description, and maximum length from 1 through 10,000. |

Either type can be required and can provide bilingual help. Exactly one question is the deciding result question. It must be a required radio question and every option on it must map to `recommended` or `not_recommended`. Selecting a new deciding question clears result mappings from the former one.

Radio questions can also allow an optional or required comment, including for the deciding question. Set the comment rule in the Agency schema. When an officer submits a recommendation, its fixed schema version determines whether a comment is required. A comment does not change whether the selected option means Recommended or Not Recommended.

## Create a schema while configuring a setup

On an Agency set detail page, select **Create schema**. Enter the member order, select an optional recommendation approval template from the same Agency, and set **Fail set on Not Recommended**. Continue creates a draft schema with a temporary bilingual name and one deciding question, adds it to the set, and opens the schema editor. Give the form meaningful English and French names before publishing.

The order must be an integer from 1 through 32,767 unused by an active member. The approval template, when supplied, must be a valid template owned by that Agency. A failure creates neither a partial member nor an orphaned schema.

Use **Associate schema** instead when the agency schema already exists.

## Schema publication

**Save** checks and stores the form you are editing. **Publish** checks your Agency permissions again and makes a fixed, numbered copy available for use.

A recommendation already started keeps the exact published form version it was given. For example, adding a required rationale question and publishing a new version does not add that question to an officer's existing recommendation. The new form applies to future work.

## Recommendation setup

The setup defines the sequence of recommendations for a kind of record. It stores a bilingual name and description, an optional final approval, status and version, and ordered members. A **member** is one form in that sequence. Each member selects a schema from the same Agency, a unique integer order, an optional approval for that recommendation, and **Fail set on Not Recommended** (off by default).

Before publishing, include at least one member and number the members consecutively from 1 (for example, 1, 2, 3, with no gaps). Every schema and every selected approval template must already be published. The set and all dependencies must match the Agency and entity context.

**Publish** creates version 1 and makes the setup available for use. Edits to a published setup remain pending until you publish again. Publication checks the whole plan and saves a fixed copy of each member's schema version, failure rule, and approval configuration, along with the final approval.

While configuring the setup, you can edit or remove members. Removing a member takes it out of the active setup and renumbers the remaining members. It keeps the reusable schema and the history of recommendations already created. To reuse that form, choose **Associate schema**. **Create schema** creates a separate draft, even if you reuse the removed member's order.

## Runtime consequences

When a workflow starts, the system creates a recommendation set using the fixed published plan selected for that workflow. It starts the next recommendation and assigns its primary officer using the officer assignments saved in the workflow. Later recommendations become active one at a time as earlier ones finish.

The Recommendation page shows the fixed form version and saved answers for this recommendation. To save or submit, you must be assigned to that recommendation and have Contributor access to the record that owns it. The recommendation must also be active. Submission validates required responses, option keys, and text lengths, then derives the result from the deciding question.

If a recommendation has an approval route, that approval must finish successfully before the set can move on. If no approval is required, or after approval succeeds, Not Recommended stops the set only when **Fail set on Not Recommended** was enabled for that member in the published plan. Otherwise the next recommendation or optional final approval begins. Cancelling the set retires its pending recommendations and approvals without changing the published setup.

For example, if the program officer selects Not Recommended and that member has **Fail set on Not Recommended** enabled, the set stops after any required member approval succeeds. If the switch is off, the set can continue to the finance recommendation; the officer's answer is still recorded as Not Recommended.

An approval-submission workflow for an Agreement or amendment must reference a published recommendation plan and contain at least one approval stage. Its recommendation detail can also show the fixed collection of approval documents and evidence to an authorized Agreement reader or assigned approver. See [Workflows](../concepts/workflows.md).

## Concurrent edits

Each saved recommendation has a response revision. If another person saves after you open the form, your save or submission returns `409 RECOMMENDATION_REVISION_CONFLICT`. Your older copy does not overwrite their responses.

For example, two assignees open revision 3. One saves and creates revision 4. The second user's revision-3 submission is rejected. Keep a copy of the intended changes, reload revision 4, reconcile the responses, and submit again. The response revision tracks saved answers. It is separate from the fixed schema version that defines the form.

## Failure and recovery

- If publication fails, check that the set has members numbered from 1 with no gaps. Publish each schema and approval template first, and check that all references match the Agency and record type.
- If schema validation fails, check for duplicate keys, incomplete sections or questions, and exactly one valid deciding question.
- If a recommendation does not save, check that it is active, that you are assigned to it, and that your answers meet its fixed form rules.
- If the configuration changes while you are editing, keep a copy of your changes, reload, and review the latest configuration before saving again.
- To correct a setup, save and publish a future version. This does not change historical plans or existing recommendation responses.

See [Streams](./streams.md), [Approval templates](./approval-templates.md), [Workflows](../concepts/workflows.md), and [Role permissions and exact assignments](../concepts/rbac.md).
