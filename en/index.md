# GCS-SSC Documentation

Use GCS-SSC to manage grants and contributions: find an applicant or recipient (a **Proponent**), work on an **Agreement**, review requests, and track budgets, claims and payments. A **Program** groups funding activities; a **Stream** defines a particular funding route within that program. Administrators set up these records and control who can use them.

For daily work, start with [Login](./getting-started/login.md), then [Navigation](./getting-started/navigation.md) to find your assigned records. For example, an officer checking a community centre’s claim can find the Agreement, open its Claims workspace and consult the [financial summary](./agreements/financial-summary.md) for the wider financial picture. The available actions depend on the officer’s permissions and assignment to that record.

If you are an administrator preparing a new installation, start with [Empty-system setup](./getting-started/empty-system-setup.md) and the setup order below. A new production installation starts without business configuration. Development records and screenshots are examples. The guides follow the application’s menu, pages, tabs, subtabs and forms so you can follow along on screen.

## First setup order

Administrators use this order to prepare the system for officers.

1. Sign in with the initial administrator and confirm its scoped permissions.
2. Create the required [GWCOA organization](./admin/common-admin.md), then an [Agency](./admin/agencies.md).
3. Configure Agency references, including business statuses, fiscal years, cost categories, attachment types, agreement types, and Proponent subtypes.
4. Create [roles](./admin/roles.md), [users](./admin/users.md), and role assignments. Configure a storage provider when files will be used.
5. Create [programs](./programs/index.md) with both terms URLs, then [streams](./programs/streams.md) with budgets and delivery configuration.
6. Author and publish the review, recommendation, approval, and workflow configurations needed by the process. Add [custom fields](./programs/custom-fields.md) before relying on their conditional routing.
7. Create and activate [Proponents](./proponents/index.md), then create [Agreements](./agreements/index.md) and assign the staff who will work on each record.
8. Populate the Agreement and use its child workspaces. Configure required approval workflows before completing an Amendment or Closeout.

## Main menu

The sidebar includes Home, Agencies, Programs, Funding opportunities, Intakes, Agreements, Proponents, Journal vouchers, Assignment Management, Groups, Roles, Users, GWCOA, and Audit according to the signed-in user's permissions. A visible destination does not grant access to every record. [Navigation](./getting-started/navigation.md) explains visibility, Assigned Work, loading and recovery states, and the live work dashboard and group queue.

## Documentation map

Use Getting Started for initial setup, Administration for Agency and access configuration, Programs and Agreements for delivery work, and Concepts for shared behavior such as [attachments](./concepts/attachments.md), [workflows](./concepts/workflows.md), and [permissions](./concepts/rbac.md). Operators can start with [runtime configuration](./operator/configuration.md), [deployment](./operator/deployment.md), and [background work](./operator/background-work.md). Developers can start with [architecture](./developer/architecture.md), [routes](./developer/routes.md), and [extension authoring](./developer/extensions-authoring.md).

Start [Opportunity and Intake setup](./intake/opportunities.md) before receiving external applications; use the [Portal host guide](./intake/portal.md) for imported evidence. [Data Collections](./concepts/data-collections.md) gather structured workflow answers. Financial staff can follow the [monthly summary](./agreements/financial-summary.md), [Corrections](./agreements/corrections.md), [Journal vouchers](./agreements/journal-vouchers.md), [Receivables](./agreements/receivables.md) and [Credit memos](./proponents/credit-memos.md).
