# GCS-SSC Documentation

GCS-SSC is a bilingual Grants and Contributions System for configuring agencies, programs, streams, proponents, agreements, reviews, approvals, payments, forecasts, claims, monitoring, documents, roles, and users.

This documentation follows the application hierarchy: main menu, page, tabs, subtabs, then forms and wizards. A new production installation starts without business configuration; development records and screenshots are examples. Begin with [Empty-system setup](./getting-started/empty-system-setup.md) for the complete prerequisites and a worked setup example.

## First setup order

1. Sign in with the initial administrator and confirm its scoped permissions.
2. Create the required [GWCOA organization](./admin/common-admin.md), then an [Agency](./admin/agencies.md).
3. Configure Agency references, including business statuses, fiscal years, cost categories, attachment types, agreement types, and Proponent subtypes.
4. Create [roles](./admin/roles.md), [users](./admin/users.md), and role assignments. Configure a storage provider when files will be used.
5. Create [programs](./programs/index.md) with both terms URLs, then [streams](./programs/streams.md) with budgets and delivery configuration.
6. Author and publish the review, recommendation, approval, and workflow configurations needed by the process. Add [custom fields](./programs/custom-fields.md) before relying on their conditional routing.
7. Create and activate [Proponents](./proponents/index.md), then create [Agreements](./agreements/index.md) and allocate exact work assignments.
8. Populate the Agreement and use its child workspaces. Configure required approval workflows before completing an Amendment or Closeout.

## Main menu

The sidebar includes Home, Agencies, Programs, Agreements, Proponents, Assignment Management, Roles, Users, GWCOA, and Audit according to the signed-in user's permissions. A visible destination does not grant access to every record. [Navigation](./getting-started/navigation.md) explains visibility, Assigned Work, loading and recovery states, and the dashboard's placeholder metrics.

## Documentation map

Use Getting Started for initial setup, Administration for Agency and access configuration, Programs and Agreements for delivery work, and Concepts for shared behavior such as [attachments](./concepts/attachments.md), [workflows](./concepts/workflows.md), and [permissions](./concepts/rbac.md). Operators can start with [runtime configuration](./operator/configuration.md), [deployment](./operator/deployment.md), and [background work](./operator/background-work.md). Developers can start with [architecture](./developer/architecture.md), [routes](./developer/routes.md), and [extension authoring](./developer/extensions-authoring.md).
