# Soft deletion

When you delete most records in GCS-SSC, the application marks them as deleted and removes them from normal use. It usually keeps the stored record to preserve its history. This is called soft deletion. In the database, the usual marker is `_deleted = true`.

## Why soft deletion exists

Operational records often become references in agreements, reviews, approvals, payments, claims, forecasts, and audit trails. Physical deletion would break those references. Soft deletion keeps historical context while removing records from normal active workflows.

## User experience

Most lists hide deleted rows. The dedicated GWCOA catalogue offers all, active and deleted filters and a deletion flag when editing. This is not a general restore interface for operational records. Some references use a separate availability flag; retiring a reference prevents new selections while preserving historical links. Follow the owning page’s rules before deleting or replacing a reference.

## Data behaviour

A deleted record usually disappears from both lists and detail pages because they hide records marked `_deleted = true`. Its disappearance does not prove that all stored information has been erased. Deleting assignments, users, roles, Agencies, extension key-value settings and many related records follows this pattern.

## Uniqueness and recreation

Uniqueness checks generally apply to non-deleted records. If GCS-SSC refuses to create a replacement because a value already exists, search for an active record with that value. For example, check whether an active Proponent already has the business number before creating another profile. Recreating a record does not restore the old record or automatically reconnect its historical references.

## Operational caution

Soft-deleting configuration can still disrupt workflows. A deleted role stops contributing permissions. A deleted review setup will not be available for new runtime creation. A deleted user cannot normally be selected. Confirm that the configuration is no longer needed before deleting it.

For example, deleting an unused review setup prevents officers from choosing it for new reviews. Before deleting it, confirm that no upcoming work still needs it and follow your organization’s approval process. Do not assume you can undo the deletion: the GWCOA editing control described above is not a general restore feature.
