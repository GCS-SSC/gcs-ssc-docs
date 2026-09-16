# Soft Deletion

Most delete operations in GCS-SSC mark rows as deleted instead of physically removing them. The common marker is `_deleted = true`.

## Why soft deletion exists

Operational records often become references in agreements, reviews, approvals, payments, claims, forecasts, and audit trails. Physical deletion would break those references. Soft deletion keeps historical context while removing records from normal active workflows.

## User experience

Most lists hide deleted rows. The dedicated GWCOA catalogue offers all, active and deleted filters and a deletion flag when editing. This is not a general restore interface for operational records. Some references use a separate availability flag; retiring a reference prevents new selections while preserving historical links. Follow the owning page’s rules before deleting or replacing a reference.

## Data Behaviour

Most list and detail pages hide rows marked `_deleted = true`. Assignment deletes, user deletes, role deletes, agency deletes, extension key-value deletes, and many child resource deletes follow this pattern.

## Uniqueness and recreation

Uniqueness checks generally apply to non-deleted rows. For example, a proponent business number is checked against active profiles. If a replacement record is blocked, check whether a non-deleted record still owns that unique value.

## Operational caution

Soft-deleting configuration can still disrupt workflows. A deleted role stops contributing permissions. A deleted review setup will not be available for new runtime creation. A deleted user cannot normally be selected. Treat delete actions as business decisions, not just UI cleanup.
