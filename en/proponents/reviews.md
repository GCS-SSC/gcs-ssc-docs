# Proponent reviews

Open **Proponents**, select a saved profile, and choose **Reviews** to start and follow assessments and checklists for that proponent. A review set is a group of reviews that must be handled together. For example, a set can contain an eligibility checklist followed by a risk assessment. Open each review to enter answers, check its result, and complete the required work.

## Access and page behaviour

With Proponent Viewer access, you can see the active review sets and the reviews within them. To create a set, you need a role that permits Contributor actions and an assignment to this particular proponent. You become the primary assigned user on the new reviews; those reviews have their own assignments. Cancelling or cloning work also requires Contributor authority and the assignment for the record being changed. Being assigned to an approval lets you make that decision only when you also have the required access to the proponent.

The table groups reviews by set and initially shows the reviews within every group. A pinned name or configuration is the copy saved when the set was created. A group displays the pinned setup name, agency, review count, set status, success result when known, and the **On completion** or **Sequential** flags captured at creation. Each review displays the bilingual name saved at creation, its type, and its status. Search matches the review-set ID and the saved English or French set name.

Open an assessment or checklist from its name or arrow. The application checks your access to the proponent again when you open the review.

## Eligible setup lookup

The **Add** action can appear when your role permits creating sets. If your assignment or another prerequisite is missing, selecting it shows a warning. Check your assignment before retrying. Select **Add** to search active, published setups that this proponent can use. A setup is eligible only when:

- it targets proponents, identified in configuration as `applicantrecipient`;
- its scope is this exact proponent, or it is a transfer-payment-stream scope reached through one of this proponent's active agreement links;
- the linked program's agency matches the proponent's lead agency for a stream-scoped setup; and
- every active setup member uses an active schema belonging to the proponent's lead agency.

The lookup description shows the owning agency and, for a stream-scoped setup, the stream. If the list is empty, check that the setup is active and published. Also check its target entity type, scope, active agreement link, lead agency, and member schemas. There is no implemented intake-based eligibility path.

## Create and run a set

Select the eligible setup to create the set and all its assessments or checklists. The application saves the whole set from the published configuration. If a required check fails, it creates none of the set. Before saving, it locks the related records and checks your current permissions, the setup's scope, and agency ownership again. You cannot create a second set from the same setup while an earlier set is still in a blocking in-progress state. Open the existing set to see what remains to be done.

Sequential sets advance in configured member order. Proponents have no general **Complete** action that creates reviews. Create their review sets from this tab. Runtime rows retain pinned schema versions and configuration, so later administrator edits affect future sets rather than rewriting existing work.

For answering, result calculation, additional reviewers, strict completion, approval handoff, and locked states, see [Runtime Reviews](../concepts/runtime-reviews.md). For approval decisions, see [Approvals and Completions](../concepts/approvals-completions.md).

## Cancel and retry

An authorized updater can cancel a nonterminal set. Terminal runtime states are `succeeded`, `approved`, `unsuccessful`, `denied`, `cancelled`, and `failed`. Cancellation preserves history.

For a terminal standalone set, retrying a denied, cancelled, failed, or unsuccessful review creates a successor runtime and new review set from the pinned plan. Enter new answers in the new reviews. The original set and decisions remain unchanged. Retrying does not add a draft to the old set or reopen its completed reviews. Current permissions, assignment, and the Proponent's active state still apply. See [Runtime Reviews](../concepts/runtime-reviews.md) for successor lineage and concurrent retry behavior.

If an action fails because the target or permission changed concurrently, refresh the tab and reassess the current state. Do not create a separate set merely to bypass a blocked or terminal transition.

For example, after a cancelled eligibility review, use the supported retry action when you have permission. Enter answers in the new review and keep the old one as the record of the cancelled attempt.

## Related guides

- [Runtime Reviews](../concepts/runtime-reviews.md)
- [Assessment Schemas and Review Setup](../programs/assessment-schemas.md)
- [Proponent profiles](./index.md)
