# Login

Open the login page supplied by your administrator. The English page is `/en/login`. If you open a page that requires sign-in, the application sends you to Login. If you are already signed in, Login sends you to Home.

## Credential sign-in

Use the email and password supplied for your installation. Ask your administrator for an account if you do not have one.

1. Open the login page supplied by your administrator.
2. Enter your work email and password.
3. Select **Login**. Successful sign-in opens Home. If the credentials are invalid, the page shows an error in your chosen language; check the email and password and try again.

Development and test installations may include `root@example.com` with `password123`. These example credentials are not a production account. The person setting up a new production installation must create its initial administrator account.

## Session behavior

The app uses the signed-in user's session and role assignments to decide which pages and actions are visible. If your session expires or is missing, the application asks you to sign in again.

## GitHub entry

GitHub sign-in appears only when the person managing your installation has configured it with both a client ID and secret. If the option does not appear, use the email and password supplied by your administrator.

## After login

Home opens after sign-in. The other destinations depend on your active roles: a **role** sets what you may do, and its **scope** limits where you may do it, such as within one Agency or Program. See [Navigation](./navigation.md) for the complete destination rules.

- Agreements requires an active Agreement Viewer role at an allowed scope; Proponents requires global or Agency Proponent Viewer access.
- Assignment Management requires an active `manage_assignments` permission for Agreement, Proponent, Funding Case, Journal Voucher or Correction.
- GWCOA and SQL dump download require global System Viewer access. Audit requires its own global or Agency permission. Logout remains available.

Being assigned to a record means that your name is listed as someone responsible for work on that particular record. This assignment does not replace your role permissions. For example, if you are assigned to Agreement AG-2026-014 but cannot see Agreements, ask your administrator to check your active Agreement role and its scope. If Agreements is visible but you cannot edit that record, ask them to check both your access level and your assignment.
