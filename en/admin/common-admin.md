# Common Admin

Common Admin is the global administration page at `/en/admin/common`. It requires explicit global `system:read`; the seeded root role satisfies this through ordinary role abilities and has no special bypass.

## Purpose

Use Common Admin for reusable configuration and runtime records that are not owned by a single agency detail tab. The page is configuration-driven, so each tab has a consistent table, form, validation, and lookup experience.

## Resource order

The configured tab order is:

1. GWCOA
2. Entities
3. Contacts
4. Addresses
5. Form Schemas
6. Attachment Types
7. Review Schemas
8. Review Set Setups
9. Review Setups
10. Completions
11. Review Sets
12. Reviews
13. Approval Templates
14. Approval Steps
15. Certifications
16. Routing Slips
17. Recommendation Schemas
18. Recommendation Setups
19. Recommendations

The order intentionally moves from base reference data to runtime execution records.

## Common UI behavior

Each resource tab renders a table and generated form. Field types include text, number, date, textarea, JSON, boolean, enum, and lookup fields. Search includes configured columns and the id. The deleted filter supports all, active, and deleted records. For editable resources, an existing row exposes a deleted switch so authorized global administrators can soft-delete or restore records.

The Entities tab is read-only. It supplies runtime entity ids for lookup fields and should not be hand-created through the UI.

## Reference resources

GWCOA, Contacts, Addresses, Form Schemas, and Attachment Types are foundational. They supply chart-of-account references, reusable people, reusable addresses, dynamic form schema JSON, and agency-filtered attachment type labels. Form schemas and attachment types can be agency-linked.

## Review resources

Review Schemas define the actual review content and can be checklist or assessment style. Creating a Common Review Schema uses versioning helper logic to create a draft review schema value. Review Set Setups group reviews for an entity type and scope. Review Setups attach specific schemas to a setup and order them. Review Sets and Reviews are runtime records created from those setup definitions.

When a runtime Review is created or assigned to a different review schema, Common Admin copies the selected active schema's settings for custom outcomes, alignment, and reviewers onto the review. Restoring a deleted review requires its referenced schema to remain active. Restoring without changing that reference preserves the review's existing snapshot, while assigning a different active schema refreshes the snapshot from the new schema. This keeps historical review behavior stable while preventing restoration against retired configuration.

For proponent reviews, the runtime Reviews tab looks up review set setups for `applicantrecipient`, creates runtime review sets, groups review rows by review set, and opens assessment detail pages for individual reviews.

## Approval resources

Approval Templates describe an approval workflow for a scope and entity type. Approval Steps define step sequence, default user, and approver title. Certifications can attach to approval steps and specify optional or required certification text. Routing Slips are runtime approval records tied to an entity and approval template.

Approval and completion sections do not become useful until templates, steps, users, certifications, and entity mappings exist.

## Completion resources

Completions record whether a specific entity is complete, with comments, user, and completion date. Completion entity types include common review and recommendation records as well as funding case agreement child workflows such as intakes, amendments, monitors, claims, forecasts, payments, and recommendations.

## Recommendation resources

Recommendation Schemas define structured recommendation content and result JSON for supported entity types. Recommendation Setups attach recommendation schemas and optional approval templates to a scope/entity type. Recommendations are runtime rows containing recommendation values and response JSON.

## Operational guidance

Global system administrators should not use Common Admin as a casual data editor. Many resources drive runtime workflows. Changing active schemas, approval templates, or setup records after runtime records exist can affect new records differently from historical records. Prefer adding a new version or new setup when the business process changes materially.

![Common Admin resources](/screenshots/en/common-admin.png)

_Actual screenshot from the seeded development environment. The records shown are examples only and are not created in a fresh installation._
