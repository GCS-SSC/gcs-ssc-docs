# Login

The localized login page is `/en/login`. Anonymous users are redirected to the localized login page whenever they request an authenticated page. If an authenticated user opens `/en/login`, they are redirected back to Home.

## Credential sign-in

The app supports email and password sign-in through Better Auth. In development and test data, `root@example.com` with `password123` may exist, but production deployments should treat that only as seed-data documentation. A clean production installation needs a root account provisioned by deployment or bootstrap procedures.

The form collects email and password and submits a Login action. Invalid credentials keep the user on the login page and surface a localized error. After sign-in, the app refreshes the session and routes the user to Home.

## Session behavior

The app uses the signed-in user's session and role assignments to decide which pages and actions are visible. A stale or missing session causes authenticated pages to redirect back to login.

## GitHub entry

The source app still contains a GitHub/social sign-in entry in the login experience, but tests treat it as unavailable unless deployment configuration enables it. Do not describe GitHub sign-in as an operational login path for a default installation.

## After login

The sidebar is permission-driven:

- Home, Agencies, Programs, Roles, and Users are part of the primary navigation shell.
- Agreements appears with an active scoped Agreement Viewer ceiling.
- Proponents appears with an active global or agency-scoped Proponent Viewer ceiling.
- Assignment Management appears with any active Agreement/Proponent `manage_assignments` capability.
- Common Admin and SQL dump download require global System Viewer; Logout is always present.

If a user signs in successfully but sees fewer pages than expected, check active user-role assignments, cumulative subject levels, scope, and the independent assignment-management capability. Exact work assignments affect record mutations and Assigned Work, not the role ceiling used to show these destinations.
