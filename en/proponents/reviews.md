# Proponent Reviews

The **Reviews** tab groups runtime assessments and checklists created for a proponent. It is the launch point for review sets; answers, scoring, completion, approvals, and retry behaviour use the shared runtime-review flow.

## Access and page behaviour

Proponent Viewer access lists its active review sets and children. Creating a set requires a Contributor ceiling and the exact Proponent assignment; the creator becomes primary on independently assigned runtime reviews. Cancelling or cloning later work requires the relevant exact assignment and Contributor ceiling. Approval assignment is an additional decision requirement and never grants Proponent access by itself.

The table groups reviews by set and initially expands each group. A group displays the pinned setup name, agency, review count, set status, success result when known, and the **On completion** or **Sequential** flags captured at creation. Each child displays its pinned bilingual review name, type, and status. Search on this endpoint covers the review-set ID and pinned English/French set name.

Open an assessment or checklist from its name or arrow. The destination enforces owning-proponent access again.

## Eligible setup lookup

Select **Add** to search eligible active, published review-set setups—not every configured setup. A setup is eligible only when:

- its target entity type is `applicantrecipient`;
- its scope is this exact proponent, or it is a transfer-payment-stream scope reached through one of this proponent’s active agreement links;
- the linked program’s agency matches the proponent’s lead agency for a stream-scoped setup; and
- every active member schema is active and belongs to the proponent’s lead agency.

The lookup description shows the owning agency and, for a stream-scoped setup, the stream. If the list is empty, verify publication/activation, entity type, exact scope, active agreement link, lead agency, and every member schema. There is no implemented intake-based eligibility path.

## Create and run a set

Selecting a setup creates the set and its assessment/checklist children transactionally from the published configuration. The server locks the proponent and applicable ownership graph, rebuilds authorization, and revalidates scope and agency ownership before materialization. A second set from the same setup is refused while an earlier one remains in a blocking in-progress state.

Sequential sets advance in configured member order. On-completion sets interact with the owning workflow/completion path defined by their setup. Runtime rows retain pinned schema versions and configuration, so later administrator edits affect future sets rather than rewriting existing work.

For answering, result calculation, additional reviewers, strict completion, approval handoff, and locked states, see [Runtime Reviews](../concepts/runtime-reviews.md). For approval decisions, see [Approvals and Completions](../concepts/approvals-completions.md).

## Cancel and retry

An authorized updater can cancel a set unless its status is `complete`, `approved`, `denied`, `withdrawn`, or `cancelled`. Cancellation is a terminal historical outcome, not deletion.

Within a non-terminal set, a denied or cancelled child review can be cloned for rework. The clone starts as a new draft in the same set and retains the source review’s pinned schema version, approval configuration, checklist/assessment mode, and behavioural flags. The original remains in history. The retry control is hidden once the set itself is terminal.

If an action fails because the target or permission changed concurrently, refresh the tab and reassess the current state. Do not create a separate set merely to bypass a blocked or terminal transition.

## Related guides

- [Runtime Reviews](../concepts/runtime-reviews.md)
- [Assessment Schemas and Review Setup](../programs/assessment-schemas.md)
- [Proponent profiles](./index.md)
