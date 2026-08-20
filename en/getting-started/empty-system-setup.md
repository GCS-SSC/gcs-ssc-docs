# Empty System Setup

A clean GCS-SSC installation is not usable by ordinary operators until a bootstrap administrator creates a small chain of business configuration. The app is intentionally administrator-first: Common Admin requires explicit global `system:read`, RBAC must exist before delegated users can do useful work, and many workflow pages only become meaningful after agency, program, stream, review, approval, and proponent reference data exists.

## Starting assumptions

- A deployer has provisioned at least one authenticated root user.
- The root user has an ordinary global role with the required explicit action/subject pairs and no special authorization bypass.
- The root role explicitly includes only the required cumulative access levels and any needed Agreement/Proponent assignment-management capabilities; root has no bypass.
- The system may contain installation defaults, but do not assume seeded demo records exist in production.
- All operational records should be entered in English and French where paired fields exist.

## Root-first order

1. Sign in as the root user.
2. Create at least one agency from Agencies.
3. Open the agency detail page and complete the agency-owned reference tabs.
4. Create root and delegated roles from Roles.
5. Create or verify users from Users.
6. Assign roles to users.
7. Create programs for the agency.
8. Create streams under each program.
9. Configure stream-level setup records used by agreements and reviews.
10. Configure Common Admin records that are global or runtime-driven.
11. Create proponent profiles.
12. Create agreements and begin operational workflows.

This order avoids the most common empty-system failure: trying to create an agreement or review before its agency, program, stream, fiscal year, subtype, review setup, approval template, or proponent references exist.

## Minimum agency setup

Create the agency profile first. The profile stores bilingual names and abbreviations, status, GWCOA linkage, and an optional external financial system id. Then configure the agency tabs in this dependency order:

1. Fiscal Years, because budgets, commitments, payments, claims, forecasts, and monitors depend on fiscal periods.
2. Cost Categories, then line items under each category, because financial child workflows need cost classification.
3. Address Types, because proponent and agreement addresses need stable classifications.
4. Applicant/Recipient Subtypes, because proponent profiles require a subtype that belongs to the selected lead agency.
5. Agreement Types, because agreements classify their legal or operational type.
6. Approval Behalf Types, because approval actions can require an on-behalf-of explanation.
7. Extensions, only after you understand which installed extensions are approved for that agency.
8. Programs, after the agency reference data is ready.

## Minimum Common Admin setup

Common Admin is global and requires explicit global `system:read` access. Use it for records that are not owned by one agency tab, especially runtime review, approval, completion, and recommendation resources.

Create reusable contacts and addresses first if approval or review setup will reference people or locations. Then create form schemas, attachment types, review schemas, review set setups, review setups, approval templates, approval steps, certifications, routing slips, recommendation schemas, and recommendation setups as needed by the workflows you plan to run.

The read-only Entities resource is a catalogue of runtime entity identifiers. It is used by lookup fields but is not created through the Common Admin UI.

## Minimum RBAC setup

Create roles before inviting ordinary users into operational work.

- Keep one root administrator role global and narrow its assignment to trusted administrators.
- Create agency administrator roles scoped to one agency when users should manage agency records, agency programs, users in that agency, or agency-scoped roles.
- Create program roles by selecting an agency and one or more transfer payment programs.
- Use only subjects valid for the role's derived scope. Program roles support only `transfer_payment` and `agreement`. Agency roles support `agency`, `transfer_payment`, `role`, `user`, `agreement`, and `applicant_recipient`. `system` is global only.
- Assign roles from the user detail page. Duplicate user-role assignments return the existing assignment rather than creating a second active row.
- Grant Viewer, Contributor, or Manager per role subject. Grant `manage_assignments` independently on Agreement/Proponent permission rows only to assignment coordinators.

## Minimum proponent setup

Before creating Proponents, make sure the lead agency has applicant/recipient subtypes. The form validates the selected agency/subtype relationship. Top-level creation requires a Contributor `applicant_recipient` ceiling at that lead agency, creates a draft, and makes the creator primary. Scoped Viewer handles reads; later profile/child mutations require the cumulative ceiling and exact Proponent assignment. Roster changes require separate `manage_assignments`.

## Minimum agreement readiness

Agreement creation is outside this section, but empty-system setup should still prepare for it:

- Agency exists and is active enough for use.
- Program exists for that agency.
- Stream exists under the program.
- Stream fiscal year budgets and cost line items exist where financial workflows need them.
- Eligible recipients, risk ratings, review setups, approval templates, recommendation setups, agreement subtypes, amendment types, and monitor types are configured as applicable.
- At least one proponent exists if the agreement will reference applicant/recipient records.

## Verification pass

After setup, sign in as a delegated test user and verify the real sidebar. Agreements and Proponents are hidden without the corresponding scoped Viewer ceiling; Assignment Management is hidden without `manage_assignments`; Common Admin is hidden without global System Viewer. Open an agency, program, stream, Proponent, Agreement, and user to confirm role scope, cumulative levels, exact assignments, tabs, and actions.
