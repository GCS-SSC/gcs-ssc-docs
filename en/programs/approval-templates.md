# Approval templates

An approval template is a reusable list of who must approve a file, in what order, and what each person must confirm. An Agency administrator sets up the bilingual names, approvers, titles, and rules for adding extra approvals. The administrator also writes certifications, the checklist statements approvers must acknowledge. When the process starts on a file, the system copies the template into a routing slip. This is the approval record for that file. Officers and approvers work on that copy.

For example, a contribution claim might need a program manager's approval followed by a finance officer's approval. A required certification could say "I have checked the claim against the eligible expenses in the agreement." Use statements that reflect your actual process; this example does not establish a required approval route.

Create templates in the Agency catalog, then select them in review setups, recommendation setups, assessment members, or workflows. These processes use templates to approve agreements, claims, forecasts, payments, monitoring, applicant recipients, and related work.

## Empty-system prerequisites

Before creating operational approval templates, configure:

- Common users who can be selected as default approvers.
- Agency approval behalf types if users can approve on behalf of others.
- Agency Review Set, Recommendation Set, Workflow, or other runtime design that will reference the template.
- Permissions for users who will manage templates and users who will act on runtime approvals.

Templates can be saved without steps, but a template with no steps produces an empty routing slip and cannot collect meaningful approvals.

## Where templates live

Manage templates on the Agency's **Approval Templates** tab. Each template belongs to that Agency and can be used by its eligible designs linked to Streams. Each row shows the bilingual name, step count, and certification count.

The Agency Viewer role lets you read templates. Contributor lets you create, edit, and publish them. Manager lets you delete templates that are eligible for deletion. Stream configuration access alone does not let you edit an Agency template.

## Runtime targets

The template belongs to an Agency. Its header does not choose whether it will approve a claim, recommendation, or another kind of record. The published workflow, review, or recommendation setup that uses it makes that choice. The system checks that the template belongs to the correct Agency. Adding a template does not give a record actions that its process does not support.

For example, an Agency can reuse its "Manager sign-off" template in a Claim approval workflow and a recommendation member's approval. Each routing slip keeps its own steps, evidence, and status. Editing the template does not change either slip.

## Template list

The template list supports:

- Search and pagination.
- Add, edit, open, and delete actions according to your permissions.
- Step and certification count badges.

The add/edit modal captures the template header fields only:

- English and French name.
- English and French description.

Steps and certifications are managed from the template detail page.

## Template detail page

Opening a template displays a detail workspace with:

- Breadcrumb back to the Agency catalog.
- Collapsible summary with the template name, description, publication state and version, step count, and certification count.
- Sidebar with General and Approval Steps sections.
- Save action for the full template.

The General section contains:

- English and French name.
- English and French description.

The Additional Approvals section controls whether users can add steps to a routing slip after it has been created. Its configuration includes:

- An **Allow additional approvals** switch. It is off by default.
- The default English and French name for every added step.
- Whether the user adding a step may change those bilingual names.
- An ordered list of default bilingual certification statements, each marked required or optional.
- Whether the user adding a step may add, edit, remove, or reorder those certifications, or make them required or optional.

When additional approvals are enabled, the bilingual default step names are required. Default certifications may be empty. The system copies the policy and its defaults to each routing slip when it is created. Later template changes therefore apply only to future routing slips; they do not silently change a route that is already in progress.

## Template lifecycle and publication

A new template is a draft. **Save** stores your edits; **Publish** makes a fixed copy available for use, starting at version `1`. A changed publication increases the version number. Saving edits to a published template prepares a future version and leaves its published copy intact. Publishing the same definition again keeps its version. **Retire** permanently prevents new selection and further editing while keeping the history.

For example, adding a director's approval and publishing version `2` changes future routing slips. A claim already using version `1` keeps its original route.

Each published copy includes the template, rules and default certifications for additional approvals, ordered steps and their default approvers, and certification rules for each step. Routing slips use this copy and keep their original route after a later publication.

## Approval steps

Approval steps are the ordered actions in a routing slip. Each step contains:

- Order in the sequence.
- Approver title.
- English and French name.
- English and French description.
- Default user or group.
- Zero or more certifications.

Step order must be unique within the template. The template detail page saves steps in sequence order.

Choose either a default Common user or an active same-Agency administrative group for each step. A group step can require group details. Members claim pending group steps from Home. They must still be eligible when they claim or act on the step. See [Groups](../admin/groups.md). Runtime routing slips retain the published assignee choice unless an authorized action reassigns the step.

## Step editor

Add or edit a step in the fullscreen editor. Enter its details and expand the certifications section to edit its checklist. Saving here puts the changes into the template on screen. You must also save the main template page to store them.

Closing the step editor without saving discards its changes.

## Certifications

Certifications are checklist statements that an approver must handle when approving or denying a step. Each certification contains:

- Order.
- Optional flag.
- English and French name.
- English and French description.
- English and French certification text.

Certification order must be unique within a step. Certification bilingual names must also be unique within a step.

To swap two certifications, change their order in the step editor, save the step, then save the full template. Reordering keeps each saved certification's identity. If you remove the first certification and move the second to order 1, the second remains the same certification. The removed certification stays in the history. A failed full-template save leaves the previously saved template, steps and certifications unchanged; correct the error and save again. Publish the changed template when it is ready for future work.

Runtime behavior:

| Rule | Behaviour |
| --- | --- |
| Required certifications must be checked | Approval is disabled until they are checked. |
| Optional certifications can remain unchecked | They do not block approval. |
| Certification text follows user language | Text is shown in the approver's language when possible. |

## Validation rules

Template validation enforces:

| Rule | Behaviour |
| --- | --- |
| Template text is bilingual | English and French template name and description are required. |
| Step fields are complete | Each step requires sequence, bilingual name, bilingual description, exactly one default user or group, and approver title. |
| Step sequence is unique | Non-deleted steps cannot share the same sequence. |
| Certification fields are complete | Each certification requires order, bilingual name, bilingual description, optional flag if used, and bilingual certification text. |
| Certification order is unique | Non-deleted certifications in the same step cannot share order. |
| Certification names are unique | Non-deleted certifications in the same step cannot share the same bilingual name. |

Removed steps or certifications are applied when the full template is saved. Until then, those changes are only in the editor.

## Referencing templates from stream setup

Templates become operational only when referenced by another setup record or runtime process. Common stream references include:

- Review setup: an optional approval template can be attached to the whole review set.
- Review setup member: an optional approval template can be attached to a specific assessment/review schema member.
- Recommendation setup: an optional approval template can be attached to generated recommendations.
- Published workflow members and review/recommendation configurations that reference a template from their stream.

A published template change affects future routing slips. Slips already created keep their own steps and decisions, so changing the template does not rewrite an approval history.

## Runtime routing slips

Open the record's approvals section to see its routing slips and steps. If the process has not yet created a routing slip, the section shows the pending state. Some records do not require approval.

Routing slips are grouped in the approval table. Each routing slip has:

- Bilingual name.
- Status.
- Current flag.
- Preview flag.
- Steps.

Each step shows:

- Bilingual step name.
- Default approver.
- Assigned approver.
- Approval status.
- Decision date and decision actor when completed.
- Comment.
- Certifications.
- Whether the step is current.
- Whether the current user can action or reassign it.
- Whether the current user can add a step immediately before or after it.

## Adding approval steps

When the rules copied into the routing slip allow additional approvals, the action column offers **Add before** and **Add after** on eligible steps. Select the step before or after which you want to insert the new approval. The other steps keep their order and decision history.

The add modal requires an agency-scoped approver. That user becomes both the default and assigned approver for the new step. The modal prefills the bilingual step names and certifications copied from the template. The names are read-only unless the template permits name changes. When certification changes are permitted, the user may add, edit, remove, reorder, or change the required/optional setting; an empty certification list is valid.

A user can add a step when either:

- They have permission to manage the owning approval workflow; or
- They have ordinary read access to the owning record and are assigned to any unresolved step on the current routing slip.

Assignment alone never grants access to the owning record. When you save, the server checks your permission and assignment, the current routing slip, the insertion point, the selected approver's Agency, and the rules copied into the slip.

An approval may be added before an unresolved step, but never before a step that has already been actioned. While the routing slip is active, you can add a step after the completed steps. No step can be added to an approved or denied routing slip. User-added steps cannot be edited or removed after creation; a manager can still reassign one through the normal reassignment action.

## Recover after denial

A denied routing slip remains in the history and cannot be changed. You cannot use the approval section to reopen a finished review set or replace a denied slip.

To try again, use the retry action supported by the workflow. For a standalone review set, use its next-attempt action. Your access and the process status must allow that action. The new attempt keeps the original published definitions. Editing the template does not change the denied slip.

Adding a step to an unfinished slip changes only that active route, within its copied rules. It cannot reverse a denial. See [Runtime Reviews](../concepts/runtime-reviews.md) and [Workflows](../concepts/workflows.md) for the applicable recovery path.

## Approve and deny actions

The approval action modal is opened from the current actionable step. It shows:

- Required and optional certifications.
- Default approver.
- Assigned approver.
- Optional on-behalf toggle when assigned approver differs from default.
- On-behalf type selector when acting on behalf.
- Position title.
- Decision date when the selected on-behalf type requires actual approval details.
- Comment.

Approval is disabled when:

- A required certification is unchecked.
- Acting on behalf without selecting an on-behalf type.
- Actual approval details are required but title or decision date is missing.

Denial is disabled when:

- Comment is blank.
- Acting on behalf without selecting an on-behalf type.
- Actual approval details are required but title or decision date is missing.

Required certifications do not need to be checked to deny a step. A denial immediately marks the whole routing slip denied, prevents later steps on that slip from being actioned or added, and preserves the slip as immutable history. A new routing slip requires the recovery action supported by the owning process; see **Recover after denial** above.

The approval action records the decision, certifications, on-behalf data, actual decision details when supplied, and comment. Approve and deny both require action-review-approval permission.

## Reassignment

The reassignment modal allows a manager to change the assigned user for a step. It contains:

- Assigned approver lookup.
- On-behalf type when the assigned user differs from the default user.

If the assigned user is set back to the default user, the on-behalf value is cleared. Reassignment requires manage-review-approval permission.

## Completion and approval relationship

Approval templates and completions are separate but often appear together in runtime review pages:

- Approval records capture ordered decisions and certifications.
- Completion records capture final completion value, user, timestamp, and comments.
- A page can lock completion until required assessment or approval conditions are met.

Administrators should configure both the template route and the runtime setup that decides when the route is required.

## Operational guidance

You need permission to update the active Agency to save its templates. If a template is missing or you cannot access it, the system reports it as not found. Invalid steps, certification policy, default users or publication state can prevent saving or publication. A retired template cannot be republished. Keep a copy of your intended changes before reloading after a concurrent change. Correct the indicated dependency, save the full template, and retry. If a message says the save succeeded but the page could not refresh, reload to check the saved template before making further changes.

Use these practices:

- Create separate Agency templates when the actual approval steps or certification policies differ.
- Keep step sequence numbers simple and unique.
- Enable additional approvals only where the business process needs users to extend a live route, and provide clear bilingual defaults.
- Follow the rules copied into the routing slip for work in progress. Edit the template to change future routes.
- Use default users who are active common users and have appropriate operational responsibility.
- Write certification text as the exact statement the approver must acknowledge.
- Mark a certification optional only when it is informational or conditional.
- Attach templates to review/recommendation setup only after steps and certifications are complete.
- Test one runtime routing slip before production use, especially when on-behalf approval is expected.

![Approval template detail](/screenshots/en/approval-template-detail.png)

_Actual screenshot from the seeded development environment. The records shown are examples only and are not created in a fresh installation._
