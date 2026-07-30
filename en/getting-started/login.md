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
- Agreements appears when the user has a scoped `agreement:read` role permission or read access through at least one exact Agreement Team.
- Proponents appears when the user has the direct global Proponent `read` flag or read access through at least one exact Proponent Team.
- Common Admin appears only when the user has explicit global `system:read` access.
- The user menu always includes Logout and includes SQL dump download only with explicit global `system:read` access.

If a user signs in successfully but sees fewer pages than expected, check structural role assignments, direct Proponent flags, and exact Team membership before checking the UI.
