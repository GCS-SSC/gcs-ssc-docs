# Agreement custom fields

Custom fields collect Agreement information that the standard fields do not cover, such as a local project reference or delivery model. Create reusable field definitions and selection options on the Agency's **Custom Fields** tab. A Program Stream's **Custom Fields** tab assigns those Agency fields to Agreement sections and controls each assignment's order, required flag, and active flag. Caseworkers enter values on the Agreement's General tab. Selection fields can determine which published workflow steps apply.

## Access and setup order

You need Agency Viewer to read definitions, Agency Contributor to create or edit them, and Agency Manager to delete them when deletion is allowed. To add, edit, or remove Stream assignments or sections, you need `transfer_payment` Contributor for the Program. To edit Agreement values, you need Contributor and an assignment to that specific Agreement. Its current status must also allow editing.

1. Open **Agencies**, select the Agency, and create bilingual fields and options under **Custom Fields**. Choose text, number, or selection; selection options must exist before caseworkers use them.
2. Open a Program Stream's **Custom Fields** tab. Create bilingual Stream sections, then add Agency fields. Set section, display order, required, and active separately for this Stream.
3. Open an Agreement in the Stream and check labels, order, and required fields in both languages.
4. For routing fields, configure Agency Workflow conditions after creating options; link a published workflow to the Stream and verify each route.

Assigned Streams share the Agency's field and option identifiers. Each Stream has its own section and required settings. An Agency field can be placed differently in two Streams. Search covers bilingual labels and option categories. When assigning a field, search its English or French Agency name. Fields already assigned to this Stream are excluded from new choices. The edit form changes only the field's Stream settings. To replace the field itself, remove the assignment if allowed, then add the correct field. See [Agency catalogs](../admin/agency-catalogs.md).

## Field definitions

| Setting | Rule and consequence |
| --- | --- |
| Section | Stream-owned placement; moving an assigned Agency field to another section in the same Stream preserves its field ID and saved values. |
| English and French name | Both are required nonblank labels. Values entered by caseworkers are not automatically translated. |
| Type | Text, number, or selection. The type cannot be changed after creation. |
| Text presentation | Single line or multiline. Single-line values reject line breaks; multiline values preserve their formatting. |
| Multiple selections | Available only for selection fields. Single selection can become multiple; multiple cannot become single again. |
| Required | Set on the Stream assignment. Active required fields must be populated when creating an Agreement or saving custom-field changes. Numeric zero is a value. |
| Use in workflow conditions | Available only for selection fields; lets its selected options determine which workflow steps apply. |
| Active | Set on the Stream assignment. Active fields accept new values. A populated inactive field remains visible and can be retained or cleared, but cannot receive a replacement value. |
| Display order | Integer from 0 through 2,147,483,647; defaults to 0. Equal orders are resolved by identifier. |

Sections appear after the Agreement's built-in sections, numbered from 04. Their order changes only the configured sections, not the core profile layout. Section names and field names are bilingual, while a text answer is one shared string and a numeric answer is one finite number. Numeric fields are not exact-money fields: use the Agreement Budget for financial amounts.

## Selection options and categories

Every option needs an English and French label. Categories are optional, but supply both category labels or neither. They group options in the editor and picker; they are not separate Agreement values. Options have their own active flag and display order. Adding an option from a category row carries that category into the new option form.

An Agreement may keep an already selected inactive option. New selections must be active and belong to that field. A multiple-selection value cannot contain the same option twice. Reactivating an option makes it available for new selections again, subject to the field's own active state.

## Worked configuration example

Suppose a program needs delivery information and different review routes for direct delivery and partners. The following is an illustrative configuration, not an automatically created production default.

| Section | Field | Configuration | Example value |
| --- | --- | --- | --- |
| Project delivery / Réalisation du projet | Delivery model / Mode de réalisation | Required single selection; use in workflow conditions | Direct delivery / Réalisation directe |
| Project delivery / Réalisation du projet | Delivery notes / Notes sur la réalisation | Optional multiline text | A short explanation of responsibilities and planned milestones |
| Project references / Références du projet | Local reference / Référence locale | Optional single-line text | `PROJECT-2026-014` |
| Project references / Références du projet | Planned participants / Participants prévus | Optional number | `0`, when planning has not yet established participation |

Add **Direct delivery / Réalisation directe** and **Partner delivery / Réalisation par un partenaire** as options for Delivery model. Use the appropriate option in each workflow member condition. Keep any approval step that every Agreement needs unconditional; verify that each possible route remains valid before publishing.

## Entering and clearing Agreement values

On Agreement creation, fill every active required field. Existing Agreements are not automatically backfilled when a new required field is introduced. You can save unrelated profile changes without filling in custom fields. When you save custom-field changes, the application checks both existing and changed values. All active required fields must then have a value.

An available **Clear value** action changes the local draft only. Save the Agreement to persist it. Clearing an active required field is rejected. An inactive populated field may be cleared by an authorized updater, including when it was previously required. Read-only Agreements do not expose a writable clearing action.

Changing one custom field keeps the other saved values. Clear an optional value to remove it, then save the Agreement. Select options from the current Stream’s choices; typing an option label into a text field does not select that option.

## Conditional workflow routing

A member may have one condition per field and one or more permitted options per condition. Options within a field combine with **OR**; different fields combine with **AND**. A multiple-selection field matches if at least one of its selected options is permitted. No conditions means the step is unconditional.

For example, a member requiring Delivery model = Partner delivery **and** Region = North or East runs only when both field conditions match. Selecting North and South satisfies the Region condition because North matches; it does not bypass the Delivery model condition.

When the workflow starts, it records the Agreement’s answers used in workflow conditions, their bilingual labels, and which steps apply. The selected route must contain work and include the required approval and risk-assessment steps and a valid successful ending. Missing or invalid answers used in conditions can block start rather than silently skip essential work. Excluded steps display **Skipped—conditions not met** and do not create runtime tasks.

Changing the Agreement later does not reroute an existing attempt. A retry keeps the original publication versions but captures the current Agreement values again. Approval packets retain the captured field and section labels and values; historical packets do not look up today's labels to reconstruct the evidence.

## Changing or retiring definitions

Deleting a section requires first moving or deleting all its undeleted fields. Field and option deletion is refused when saved Agreement values or workflow references still use the definition; historical publication references also count, as do retained values on deleted Agreements. Deactivation and turning off use in workflow conditions are blocked by current working or published workflow references. Do not delete history or recreate identifiers to bypass these protections.

Before retiring a routing field, review current workflow definitions and publications. Use a new field when the data type must change. Deactivate obsolete choices when allowed so historical values remain understandable, and publish a deliberately reviewed replacement route before operational use.

## Failure and recovery

| Symptom | What to check |
| --- | --- |
| Required-field error on an old Agreement | A required definition may have been added after the Agreement was created. Complete the missing active fields before saving custom-field changes. |
| An inactive value cannot be replaced | Retain or clear it; use a currently active field or option for new information. |
| A section cannot be deleted | Move or delete its remaining fields first. |
| A field or option is in use | Inspect saved Agreement values and working, published, and historical workflow references. Deletion and deactivation have different reference rules. |
| Workflow start or retry is rejected | Check the answers used in conditions and that the selected steps include required approvals, risk assessment, and a valid ending. |
| A save fails after permissions or state change | Reload the Agreement or Stream and check your current permissions and the record's status. The application checks both again when saving. |
