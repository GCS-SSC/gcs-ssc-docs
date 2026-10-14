# Empty System Setup

Use this page when preparing a new installation, rather than an individual funding file. An administrator must first create the Agency, Programs, Streams and reference choices that officers will use. They must also set up roles (permissions) and assign staff to records. Officers can then begin their work without missing choices or access.

The initial administrator is called the **root user**. This account still needs the same explicit permissions as other accounts; it has no automatic access bypass. In particular, GWCOA requires global `system:read`. Ask the person responsible for deployment to provide this account before starting.

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

In the Agency catalog, build and publish the review schemas and sets, recommendation schemas and sets, approval templates with steps and certifications, and workflows the process needs. Link eligible published designs to each Stream before starting the reviews and other work that use them. Amendment and Closeout completion require a published `approval_submission` workflow configured for `on_completion`; other supported related records can complete without one. Configure document templates and custom fields where needed. See [Streams](../programs/streams.md) and [Approvals and Completions](../concepts/approvals-completions.md).

For example, prepare an Agency fiscal year and cost items, create a program with both terms-and-conditions URLs, create its stream, make the stream cost items available, then create the Agreement and its first budget. Publishing an approval template alone does not make an Amendment completable: the published completion workflow must actually reference the approval design.

## Minimum RBAC setup

RBAC means **role-based access control**: roles define the actions a person may perform, while the role’s scope defines where those actions are allowed. Create roles before asking officers to begin operational work. Viewer allows reading, Contributor adds permitted changes, and Manager adds higher-level management actions; the levels are cumulative. Assignment management is a separate permission. See [Permissions](../concepts/rbac.md) for the rules for each action.

- Keep one root administrator role global and narrow its assignment to trusted administrators.
- Create agency administrator roles scoped to one agency when users should manage agency records, agency programs, users in that agency, or agency-scoped roles.
- Create program roles by selecting an agency and one or more transfer payment programs.
- Use only subjects valid for the role's derived scope. Program roles support `transfer_payment`, `agreement`, `funding_case`, `account_receivable`, `correction`, and `journal_voucher`. Agency roles support `agency`, `transfer_payment`, `role`, `user`, `agreement`, `funding_case`, `applicant_recipient`, `account_receivable`, `correction`, and `journal_voucher`. `system` is global only; `audit` and `group` may be Agency-scoped where applicable.
- Assign roles from the user detail page. Duplicate user-role assignments return the existing assignment rather than creating a second active row.
- Grant Viewer, Contributor, or Manager per role subject. Grant `manage_assignments` independently on the six supported assignment-management subjects to assignment coordinators.

## Minimum proponent setup

A **Proponent** is the applicant or recipient whose profile you will link to an Agreement. To create one:

1. Prepare an active lead Agency. The profile itself does not require a subtype.
2. Give the creator Contributor access for `applicant_recipient`, globally or in any active Agency. This permission is independent of the Agency selected for tracking.
3. Create the profile. It starts inactive, and the creator becomes its primary assigned user.
4. Before linking it to an Agreement, configure the Agency’s recipient subtypes and make the required subtypes eligible for the Stream.

Global or active-Agency Proponent Viewer access allows reading the shared profile catalogue. To change a profile or its related records later, the person needs the required cumulative access level and an assignment to that particular Proponent. To change who is assigned, they also need the separate `manage_assignments` permission.

## Minimum agreement readiness

Agreement creation is outside this section, but empty-system setup should still prepare for it:

- Agency exists and is active enough for use.
- Program exists for that agency.
- Stream exists under the program.
- Stream fiscal year budgets and cost line items exist where financial workflows need them.
- Eligible recipients, risk ratings, review setups, approval templates, recommendation setups, agreement subtypes, amendment types, and monitor types are configured as applicable.
- At least one proponent exists if the agreement will reference applicant/recipient records.

## Minimum Opportunity and Intake readiness

Before accepting applications, create active Streams in one Program and prepare the owning Agency's Draft status and writable non-Draft statuses. Create an [Opportunity](../intake/opportunities.md) with required bilingual names/objectives and an inclusive opening window. Creation starts Draft; the ordinary editor does not change status. An authorized host API integration must select the eligible Agency status before intake opens.

For assessment, publish Review Sets and Workflows targeting `fundingcaseintake`, link them through the selected Streams and explicitly select them on the Opportunity. Data Collection definitions are Agency-owned and are selected inside published Workflow members. Configure Attachment Types and an available Agency storage provider for Intake uploads.

Grant Program-scoped Funding Case roles independently of Agreement roles. Manual Intake creation makes the creator primary and requires readable Proponent access. For [Portal imports](../intake/portal.md), enable the connector and configure an assignable Agency group with eligible members; imports have no user assignment until claimed or directly assigned. Verify the real group queue, claim, saved Application view and assessment start as a delegated user before opening production intake.

Prepare financial features in dependency order: Agency Funding Types/Subtypes before Stream funding-source selections; currency-specific Agency charts and matching Program/Stream budgets before financial work; Account Receivable Types and eligible Monitor Types before receivable workflows. Journal Voucher fiscal-year eligibility defaults to off and requires Agency Manager to enable. These selections do not replace business roles or exact record assignments.

For example, prepare a Community Facilities Program and its Small Projects Stream before asking an officer to enter a community centre’s Agreement:

1. Create the Agency fiscal year for 2026–2027 and the cost category and line item for equipment.
2. Create the Program with English and French terms-and-conditions URLs, then its Stream. Make the equipment cost item available to that Stream and prepare its fiscal-year budget.
3. Create the community centre’s Proponent profile and complete the activation needed before using it in an Agreement. Configure an eligible recipient subtype.
4. Give the officer the relevant Program-scoped Agreement role and assign them to the Agreement they will work on. Assign them to the Proponent too if their tasks require changes to that profile.
5. Test access as that officer before entering live financial work. Role permission and assignment to a specific record are separate checks.

The names in this example are illustrative; use your approved Agency, Program, Stream and financial classifications.

## Verification pass

Test with an ordinary user account that has the roles you prepared, rather than the root administrator account. A role’s **access level** (sometimes called its ceiling) sets the highest actions the user may perform. Its **scope** limits where those permissions apply: globally, in one Agency or in selected Programs. Higher cumulative levels include the lower ones.

1. Sign in as the test user and check the sidebar against the intended role.
2. Check **Agreements** and **Proponents**. Each requires the corresponding Viewer access or higher within an allowed scope; assigning a record alone does not make the destination appear.
3. Check **Assignment Management**. Its sidebar entry requires the separate `manage_assignments` permission for Agreement, Proponent, Funding Case, Journal Voucher or Correction. If the user manages assignments only for Account Receivables, open `/assignment-management` directly; that permission alone does not show the sidebar entry.
4. Check the administration destinations the user needs. **GWCOA** requires global System Viewer or higher. **Audit** requires its own Audit Viewer permission or higher, globally or for an Agency. **Groups** requires permission to read Group records.
5. Open an Agency, Program, Stream, Proponent, Agreement and user record that the test role is meant to access. Check that the intended tabs and actions are available within that role’s scope and access level.
6. Check assignments to individual records separately. For example, confirm that the officer can work on their assigned Agreement, with the relevant role permissions, before asking them to enter live data. A visible menu or tab does not replace a required record or workflow assignment.
