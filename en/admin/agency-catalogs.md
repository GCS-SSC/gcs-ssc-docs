# Agency catalogs and Stream selections

An Agency now owns reusable custom-field definitions, approval templates, review and recommendation sets, workflows, document templates, chart-of-account definitions, commitment types, and monitor types. A Stream selects or assigns the Agency entries it uses. The Agency catalog is the place to author shared definitions; the Stream page is the place to make them available for its work.

## Permissions and setup order

Open an Agency from **Agencies**. Agency Viewer can read its catalog; Agency Contributor can create, update, and publish designs; Agency Manager can perform eligible deletion. On the Program's Stream page, `transfer_payment` Contributor assigns available Agency entries and Manager removes eligible Stream links. Exact Agreement or review assignments do not grant setup access. The server rechecks the active Agency and Program chain for each operation.

1. Create the Agency reference values needed by the designs, including business statuses, agreement and recipient subtypes, fiscal years, and any financial classifications.
2. Author fields, approval templates, review schemas/sets, recommendation schemas/sets, and workflows on the Agency page. Publish each design in dependency order. A draft is visible for authoring but cannot be used as a published runtime plan.
3. Open the Program's Stream. Add the Agency fields and other catalog entries on its corresponding tabs. Supply Stream-specific field sections, order, required and active settings; add the published Review Sets and Workflows needed for that Stream.
4. Check the Stream's local risk ratings, budgets, statuses, and other references before starting work. A linked design still has to be applicable to the selected Stream and target entity.

For example, Agency A can publish one “Standard assessment” Review Set and link it to two Agency A Streams. Each Stream uses the same Agency definition while its own Agreement work and runtime attempts remain distinct. Changing the Agency working copy does not rewrite an existing attempt; publish a new version for future materialization. A Stream in another Agency cannot link the definition.

## What the Stream controls

| Agency design or value | Stream selection |
| --- | --- |
| Custom-field definition and option IDs | Section, display order, required and active settings on each field assignment. Saved Agreement values keep their field IDs. |
| Review Sets and Workflows | Link an eligible published Agency design; removing a link stops new selection on that Stream but preserves historical runtime evidence. |
| Approval Templates and Recommendation Sets | Author and publish at Agency scope, then reference them from the appropriate Agency Review Set or Workflow. They no longer have separate Stream authoring tabs. |
| Document Templates | Link an Agency template on the Stream's Document Templates tab; remove the link without deleting the Agency source file. |
| Chart of Accounts, Commitment Types, and Monitor Types | Select eligible Agency definitions for the Stream; historical references can remain visible after retirement. |

The Stream **Review Setups** and **Workflow Setups** lists link back to the Agency detail editor. Removing a Stream link does not delete the shared Agency design. The Stream **Custom Fields** tab maintains sections and field assignments; change field labels, type, and options in the Agency catalog. A field definition shared by two Streams keeps one identity, but each Stream can place and require it differently.

## Publish, retire, and recover

Publishing checks referenced designs and Agency ownership. A Workflow used by a Stream must have the required fields and local values available there; incompatible configuration is rejected rather than silently skipping a step. Published snapshots and existing runs remain pinned when an administrator edits or retires a design. Retiring blocks new use, while historical records continue to display saved labels and evidence.

If an Add, Publish, or start action fails, reload both the Agency definition and Stream links. Confirm the design is published, belongs to the same Agency, matches the entity type, and that every referenced field, approval template, status, risk rating, and owner is eligible for that Stream. Correct the dependency, republish if needed, then retry. Do not delete and recreate a field merely to repair a label: its ID is part of saved Agreement values and historical workflow conditions.

See [Streams](../programs/streams.md), [Agreement custom fields](../programs/custom-fields.md), [Approval templates](../programs/approval-templates.md), [Recommendation sets](../programs/recommendations.md), and [Workflows](../concepts/workflows.md).
