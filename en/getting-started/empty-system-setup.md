# Empty system setup

Use this guide to prepare a new installation for officers. Create the Agency, Programs, Streams and reference choices they need, then set up roles and assign staff to records.

The initial administrator is called the **root user**. This account needs explicit permissions, just like any other account. In particular, GWCOA requires global System Viewer access, `system:read`. Ask the person responsible for deployment to provide this account before starting.

## Starting assumptions

- A deployer has provisioned at least one authenticated root user.
- The root user has a global role with the required access levels and separate permissions to manage Agreement and Proponent assignments where needed.
- The system may contain installation defaults, but do not assume seeded demo records exist in production.
- Enter operational records in English and French wherever paired fields exist.

## Setup order {#root-first-order}

1. Sign in as the root user.
2. Create the required organization in [GWCOA](../admin/common-admin.md), then create an Agency from **Agencies**.
3. Open the agency detail page and complete the agency-owned reference tabs.
4. Create root and delegated roles from Roles.
5. Create or verify users from Users.
6. Assign roles to users.
7. Create programs for the agency.
8. Create streams under each program.
9. Create reusable Review Sets, Recommendation Sets, Approval Templates, Workflows, fields and document templates in the Agency catalogue. Publish the definitions that require publication.
10. Link the required Agency definitions and reference values to each Stream, then select the Agency storage provider.
11. Create proponent profiles.
12. Create agreements and begin operational workflows.

This order avoids the most common empty-system failure: trying to create an agreement or review before its agency, program, stream, fiscal year, subtype, review setup, approval template, or proponent references exist.

## Minimum agency setup

Create the agency profile first. The profile stores bilingual names and abbreviations, an active flag, GWCOA linkage, and an optional external financial system id. Configure the Agency tabs in this order:

1. Fiscal Years, because budgets, commitments, payments, claims, forecasts, and monitors depend on fiscal periods.
2. Cost Categories, then line items under each category, because related financial work needs cost classifications.
3. Address Types, because proponent and agreement addresses need stable classifications.
4. Applicant/Recipient Subtypes, because linking a Proponent to an Agreement requires a subtype eligible for its Stream.
5. Agreement Types, because agreements classify their legal or operational type.
6. Approval Behalf Types, because approval actions can require an on-behalf-of explanation.
7. Extensions, only after you understand which installed extensions are approved for that agency.
8. Programs, after the agency reference data is ready.

## Reference and workflow preparation

Create the required organization in [GWCOA](../admin/common-admin.md) before linking it to an Agency. GWCOA is the global organization catalogue. Configure approvals and reviews separately in the Agency.

In the Agency, configure **Statuses** for normal, read-only and terminal business states; **Attachment Types** for file classification; and **Commitment Types** for financial work. Optional claim reconciliation settings choose the Claim status when reconciliation starts and when an approved final reconciliation finishes. Select and configure a registered file-storage provider before uploading files or generating stored documents.

In the Agency catalogue, create and publish the review schemas and sets, recommendation schemas and sets, approval templates with steps and certifications, and workflows the process needs. Link eligible published definitions to each Stream before starting the work that uses them. Before completing Amendments or Closeouts, publish an approval-submission workflow, `approval_submission`, that runs on completion, `on_completion`. Other supported related records can complete without this workflow. Configure document templates and custom fields where needed. See [Streams](../programs/streams.md) and [Approvals and Completions](../concepts/approvals-completions.md).

For example, prepare an Agency fiscal year and cost items, create a program with both terms-and-conditions URLs, create its stream, make the stream cost items available, then create the Agreement and its first budget. Publishing an approval template alone is not enough to complete an Amendment. The published completion workflow must reference that approval template.

## Minimum RBAC setup

RBAC means **role-based access control**. Roles define what a person may do, and their scope defines where those actions are allowed. Create roles before asking officers to begin operational work. Viewer allows reading, Contributor adds permitted changes, and Manager adds higher-level management actions; each level includes the permissions of the lower levels. Assignment management is a separate permission. See [Permissions](../concepts/rbac.md) for the rules for each action.

- Keep one root administrator role global and narrow its assignment to trusted administrators.
- Create agency administrator roles scoped to one agency when users should manage agency records, agency programs, users in that agency, or agency-scoped roles.
- Create program roles by selecting an agency and one or more transfer payment programs.
- Choose permissions supported by the role's scope. Program roles support `transfer_payment`, `agreement`, `funding_case`, `account_receivable`, `correction`, and `journal_voucher`. Agency roles support `agency`, `transfer_payment`, `role`, `user`, `agreement`, `funding_case`, `applicant_recipient`, `account_receivable`, `correction`, and `journal_voucher`. `system` is global only. `audit`, `group` and `guided_help` support global and Agency scopes.
- Assign roles from the user detail page. Assigning the same role twice keeps the existing assignment.
- Choose Viewer, Contributor or Manager for each type of record. Give assignment coordinators the separate `manage_assignments` permission for Agreements, Proponents, Funding Cases, Journal Vouchers, Corrections or Account Receivables as needed.

## Minimum proponent setup

A **Proponent** is the applicant or recipient whose profile you will link to an Agreement. To create one:

1. Prepare an active lead Agency. The profile itself does not require a subtype.
2. Give the creator Contributor access for `applicant_recipient`, globally or in any active Agency. This permission is independent of the Agency selected for tracking.
3. Create the profile. It starts inactive, and the creator becomes its primary assigned user.
4. Before linking it to an Agreement, configure the Agency's recipient subtypes and make the required subtypes eligible for the Stream.

Global or active-Agency Proponent Viewer access allows reading the shared profile catalogue. To change a profile or its related records later, the person needs the required cumulative access level and an assignment to that particular Proponent. To change who is assigned, they also need the separate `manage_assignments` permission.

## Minimum agreement readiness

Before creating Agreements, prepare these records and settings:

- An active Agency.
- A Program for that Agency.
- A Stream under that Program.
- Stream fiscal-year budgets and cost line items for financial work.
- Eligible recipients, risk ratings, review setups, approval templates, recommendation setups, Agreement subtypes, Amendment types and Monitor types as needed.
- At least one Proponent if the Agreement will link to an applicant or recipient.

## Minimum Opportunity and Intake readiness

Before accepting applications, create active Streams in one Program and prepare the owning Agency's Draft status and writable non-Draft statuses. Create an [Opportunity](../intake/opportunities.md) with required bilingual names and objectives, and opening and closing dates that include both end dates. New Opportunities start in Draft. The ordinary editor cannot change the status. Ask the person responsible for the authorized host API integration to select an eligible Agency status before intake opens.

For assessment, publish Review Sets and Workflows for Funding Case Intake, `fundingcaseintake`. Link them through the selected Streams, then select them on the Opportunity. Create Data Collection definitions in the Agency and select them in the ordered members of published Workflows. Configure Attachment Types and an available Agency storage provider for Intake uploads.

Grant Program-scoped Funding Case roles independently of Agreement roles. To create an Intake manually, you must be able to read its Proponent. You become the primary assigned user. For [Portal imports](../intake/portal.md), enable the connector and configure an assignable Agency group with eligible members; imports have no user assignment until claimed or directly assigned. Before opening production intake, test with a delegated user account. Find an import in the group queue, claim it, open the saved Application view and start its assessment.

Prepare Agency Funding Types and Subtypes before selecting Stream funding sources. Before financial work, prepare Agency charts for each currency and matching Program and Stream budgets. Configure Account Receivable Types and eligible Monitor Types before starting receivable workflows. Journal Voucher fiscal-year eligibility defaults to off and requires Agency Manager to enable. These selections do not replace business roles or exact record assignments.

For example, prepare a Community Facilities Program and its Small Projects Stream before asking an officer to enter a community centre's Agreement:

1. Create the Agency fiscal year for 2026–2027 and the cost category and line item for equipment.
2. Create the Program with English and French terms-and-conditions URLs, then its Stream. Make the equipment cost item available to that Stream and prepare its fiscal-year budget.
3. Create the community centre's Proponent profile and complete the activation needed before using it in an Agreement. Configure an eligible recipient subtype.
4. Give the officer the relevant Program-scoped Agreement role and assign them to the Agreement they will work on. Assign them to the Proponent too if their tasks require changes to that profile.
5. Test access as that officer before entering live financial work. Role permission and assignment to a specific record are separate checks.

The names in this example are illustrative; use your approved Agency, Program, Stream and financial classifications.

## Verification pass

Test with an ordinary user account that has the roles you prepared, rather than the root administrator account. A role's **access level** sets the highest actions the user may perform. Its **scope** limits where those permissions apply: globally, in one Agency or in selected Programs. Higher cumulative levels include the lower ones.

1. Sign in as the test user and check the sidebar against the intended role.
2. Check **Agreements** and **Proponents**. Each requires the corresponding Viewer access or higher within an allowed scope; assigning a record alone does not make the destination appear.
3. Check **Assignment Management**. Its sidebar entry requires the separate `manage_assignments` permission for Agreement, Proponent, Funding Case, Journal Voucher or Correction. If the user manages assignments only for Account Receivables, open `/assignment-management` directly; that permission alone does not show the sidebar entry.
4. Check the administration destinations the user needs. **GWCOA** requires global System Viewer or higher. **Audit** requires its own Audit Viewer permission or higher, globally or for an Agency. **Groups** requires permission to read Group records.
5. Open an Agency, Program, Stream, Proponent, Agreement and user record that the test role is meant to access. Check that the intended tabs and actions are available within that role's scope and access level.
6. Check assignments to individual records separately. For example, confirm that the officer can work on their assigned Agreement, with the relevant role permissions, before asking them to enter live data. A visible menu or tab does not replace a required record or workflow assignment.
