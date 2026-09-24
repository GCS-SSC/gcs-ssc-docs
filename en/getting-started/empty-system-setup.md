# Empty System Setup

A clean GCS-SSC installation is not usable by ordinary operators until a bootstrap administrator creates a small chain of business configuration. The app is intentionally administrator-first: GWCOA requires explicit global `system:read`, RBAC must exist before delegated users can do useful work, and many workflow pages only become meaningful after agency, program, stream, review, approval, and proponent reference data exists.

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
9. Author and publish reusable Review Sets, Recommendation Sets, Approval Templates, Workflows, fields, and document templates in the Agency catalog.
10. Link the required Agency designs and reference values to each Stream, then select the Agency storage provider.
11. Create proponent profiles.
12. Create agreements and begin operational workflows.

This order avoids the most common empty-system failure: trying to create an agreement or review before its agency, program, stream, fiscal year, subtype, review setup, approval template, or proponent references exist.

## Minimum agency setup

Create the agency profile first. The profile stores bilingual names and abbreviations, an active flag, GWCOA linkage, and an optional external financial system id. Then configure the agency tabs in this dependency order:

1. Fiscal Years, because budgets, commitments, payments, claims, forecasts, and monitors depend on fiscal periods.
2. Cost Categories, then line items under each category, because financial child workflows need cost classification.
3. Address Types, because proponent and agreement addresses need stable classifications.
4. Applicant/Recipient Subtypes, because each Agreement–Proponent relationship needs a subtype eligible for its Stream.
5. Agreement Types, because agreements classify their legal or operational type.
6. Approval Behalf Types, because approval actions can require an on-behalf-of explanation.
7. Extensions, only after you understand which installed extensions are approved for that agency.
8. Programs, after the agency reference data is ready.

## Reference and workflow preparation

Create the required organization in [GWCOA](../admin/common-admin.md) before linking it to an Agency. GWCOA is the global organization catalogue; it does not create runtime approvals, reviews or completions.

In the Agency, configure **Statuses** for normal, read-only and terminal business states; **Attachment Types** for file classification; and **Commitment Types** for financial work. Optional claim reconciliation settings choose the Claim status when reconciliation starts and when an approved final reconciliation finishes. Select and configure a registered file-storage provider before uploading files or generating stored documents.

In the Agency catalog, build and publish the review schemas and sets, recommendation schemas and sets, approval templates with steps and certifications, and workflows the process needs. Link eligible published designs to each Stream before starting their runtime counterparts. Amendment and Closeout completion require a published `approval_submission` workflow configured for `on_completion`; other supported child records can complete without one. Configure document templates and custom fields where needed. See [Streams](../programs/streams.md) and [Approvals and Completions](../concepts/approvals-completions.md).

For example, prepare an Agency fiscal year and cost items, create a program with both terms-and-conditions URLs, create its stream, make the stream cost items available, then create the Agreement and its first budget. Publishing an approval template alone does not make an Amendment completable: the published completion workflow must actually reference the approval design.

## Minimum RBAC setup

Create roles before inviting ordinary users into operational work.

- Keep one root administrator role global and narrow its assignment to trusted administrators.
- Create agency administrator roles scoped to one agency when users should manage agency records, agency programs, users in that agency, or agency-scoped roles.
- Create program roles by selecting an agency and one or more transfer payment programs.
- Use only subjects valid for the role's derived scope. Program roles support only `transfer_payment` and `agreement`. Agency roles support `agency`, `transfer_payment`, `role`, `user`, `agreement`, and `applicant_recipient`. `system` is global only; `audit` and `group` may be Agency-scoped where applicable.
- Assign roles from the user detail page. Duplicate user-role assignments return the existing assignment rather than creating a second active row.
- Grant Viewer, Contributor, or Manager per role subject. Grant `manage_assignments` independently on Agreement/Proponent permission rows only to assignment coordinators.

## Minimum proponent setup

Proponent creation needs an active lead Agency, but no profile subtype. Configure Agency recipient subtypes and eligible Stream mappings before linking a Proponent to an Agreement. Top-level creation requires a Contributor `applicant_recipient` ceiling at that lead agency, creates an initially inactive profile, and makes the creator primary. Scoped Viewer handles reads; later profile/child mutations require the cumulative ceiling and exact Proponent assignment. Roster changes require separate `manage_assignments`.

## Minimum agreement readiness

Agreement creation is outside this section, but empty-system setup should still prepare for it:

- Agency exists and is active enough for use.
- Program exists for that agency.
- Stream exists under the program.
- Stream fiscal year budgets and cost line items exist where financial workflows need them.
- Eligible recipients, risk ratings, review setups, approval templates, recommendation setups, agreement subtypes, amendment types, and monitor types are configured as applicable.
- At least one proponent exists if the agreement will reference applicant/recipient records.

## Verification pass

After setup, sign in as a delegated test user and verify the real sidebar. Agreements and Proponents are hidden without the corresponding scoped Viewer ceiling; Assignment Management is hidden without `manage_assignments`; GWCOA is hidden without global System Viewer; Audit requires its own global or Agency Audit Viewer grant; Groups needs a Group read grant. Open an agency, program, stream, Proponent, Agreement, and user to confirm role scope, cumulative levels, exact assignments, tabs, and actions.
