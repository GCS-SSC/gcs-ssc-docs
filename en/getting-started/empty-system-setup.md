# Empty System Setup

A clean GCS-SSC installation is not usable by ordinary operators until the root administrator creates a small chain of business configuration. The app is intentionally root-first: Common Admin is protected by a root-read check, RBAC must exist before non-root users can do useful work, and many workflow pages only become meaningful after agency, program, stream, review, approval, and proponent reference data exists.

## Starting assumptions

- A deployer has provisioned at least one authenticated root user.
- The root user has a global role with `all` create, read, update, and delete abilities.
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

Common Admin is global and root-only. Use it for records that are not owned by one agency tab, especially runtime review, approval, completion, and recommendation resources.

Create reusable contacts and addresses first if approval or review setup will reference people or locations. Then create form schemas, attachment types, review schemas, review set setups, review setups, approval templates, approval steps, certifications, routing slips, recommendation schemas, and recommendation setups as needed by the workflows you plan to run.

The read-only Entities resource is a catalogue of runtime entity identifiers. It is used by lookup fields but is not created through the Common Admin UI.

## Minimum RBAC setup

Create roles before inviting ordinary users into operational work.

- Keep one root administrator role global and narrow its assignment to trusted administrators.
- Create agency administrator roles scoped to one agency when users should manage agency records, agency programs, users in that agency, or agency-scoped roles.
- Create program roles by selecting an agency and one or more transfer payment programs.
- Do not put `all` abilities on agency or program roles. The app rejects scope and ability combinations that are invalid.
- Assign roles from the user detail page. Duplicate user-role assignments return the existing assignment rather than creating a second active row.

## Minimum proponent setup

Before creating proponents, make sure the lead agency has applicant/recipient subtypes. The create form validates that the selected subtype exists, the lead agency exists, and the subtype belongs to the selected lead agency. New proponents are created as draft records. Updates, deletes, child-record management, and team management are then controlled by RBAC and proponent team membership.

## Minimum agreement readiness

Agreement creation is outside this section, but empty-system setup should still prepare for it:

- Agency exists and is active enough for use.
- Program exists for that agency.
- Stream exists under the program.
- Stream fiscal year budgets and cost line items exist where financial workflows need them.
- Eligible recipients, risk ratings, review setups, approval templates, recommendation setups, agreement subtypes, amendment types, and monitor types are configured as applicable.
- At least one proponent exists if the agreement will reference applicant/recipient records.

## Verification pass

After setup, sign in as a non-root test user and verify the real sidebar. A user only sees pages for which they have the required abilities. Agreements and Proponents are hidden without read access; Admin Common is hidden unless the user has root/global read-all access. Then open one agency, one program, one stream, one proponent, and one user detail page to confirm the tabs and actions match the intended role design.
