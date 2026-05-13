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
- Agreements appears only when the user has any agreement read ability.
- Proponents appears only when the user has global applicant/recipient read ability.
- Common Admin appears only when the user has global read-all access.
- The user menu always includes Logout and includes SQL dump download only for root/global read-all users.

If a user signs in successfully but sees fewer pages than expected, check role assignment, role abilities, and role scope before checking the UI.
