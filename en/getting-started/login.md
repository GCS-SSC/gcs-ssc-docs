# Login

The localized login page is `/en/login`. Anonymous users are redirected to the localized login page whenever they request an authenticated page. If an authenticated user opens `/en/login`, they are redirected back to Home.

## Credential sign-in

The app supports email and password sign-in through Better Auth. In development and test data, `root@example.com` with `password123` may exist, but production deployments should treat that only as seed-data documentation. A clean production installation needs a root account provisioned by deployment or bootstrap procedures.

1. Open the login page supplied by your administrator.
2. Enter your work email and password.
3. Select **Login**. Successful sign-in opens Home. If the credentials are invalid, the page shows an error in your chosen language; check the email and password and try again.

Use the account provided for your installation. The example development credentials above are not a production account.

## Session behavior

The app uses the signed-in user's session and role assignments to decide which pages and actions are visible. A stale or missing session causes authenticated pages to redirect back to login.

## GitHub entry

GitHub sign-in is available only when the deployment configures both its client ID and secret. If the option does not appear, use the credentials supplied by your administrator; it is not enabled by default.

## After login

Home opens after sign-in. The other destinations depend on your active roles: a **role** sets what you may do, and its **scope** limits where you may do it (for example, within one Agency or Program). See [Navigation](./navigation.md) for the complete destination rules.

- Agreements requires an active Agreement Viewer role at an allowed scope; Proponents requires global or Agency Proponent Viewer access.
- Assignment Management requires an active `manage_assignments` permission for Agreement, Proponent, Funding Case, Journal Voucher or Correction.
- GWCOA and SQL dump download require global System Viewer access. Audit requires its own global or Agency permission. Logout remains available.

Being assigned to a record means that your name is listed as someone responsible for work on that particular record. This assignment does not replace your role permissions. For example, if you are assigned to Agreement AG-2026-014 but cannot see Agreements, ask your administrator to check your active Agreement role and its scope. If Agreements is visible but you cannot edit that record, ask them to check both your access level and your assignment.
