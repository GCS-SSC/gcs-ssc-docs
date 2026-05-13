# GCS-SSC Documentation

GCS-SSC is a bilingual Grants and Contributions System for configuring agencies, programs, streams, proponents, agreements, reviews, approvals, payments, forecasts, claims, monitoring, roles, and users.

This documentation follows the production application hierarchy: main menu, page, tabs, subtabs, then modals or wizards. It assumes a new installation begins with no business or configuration records and only a root user. Seeded records used in development or screenshots are examples only; they are not present in a clean production installation.

## First setup order

1. Sign in as the root user.
2. Create at least one agency.
3. Add agency reference data such as fiscal years, address types, cost categories, agreement types, and proponent subtypes.
4. Create roles and assign abilities.
5. Create or invite users, then assign roles.
6. Create programs under agencies.
7. Create streams under programs and configure stream-level lists, review setups, approval templates, and extensions.
8. Create proponents.
9. Create agreements and then their child workflow records.

## Main menu

The application sidebar contains Home, Agencies, Programs, Agreements, Proponents, Roles, Users, and Common. Feedback and Help are present as links in the shell, but in the current source they still point to template URLs and should be treated as unfinished surfaces.

## Documentation map

Use Getting Started for root-first onboarding, Administration for agency and access configuration, Programs and Agreements for delivery workflows, Concepts for cross-cutting behavior, and Developer Reference for route and test orientation.
