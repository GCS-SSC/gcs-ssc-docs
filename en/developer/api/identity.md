# Identity and RBAC API

These requests support sign-in, users, roles and assignments to individual files. Together, these determine who can see or act on a record and which work is assigned to them. See [Roles](../../admin/roles.md), [Assignments](../../admin/assignments.md) and [Access control](../../concepts/rbac.md).

An API is the set of requests the application sends to its server when you open or save a record. Officers normally use the screens; developers use this index to find the code behind them. The server checks access to protected records even when a screen shows an action as available.

- **Method**: `GET` reads information; `POST` usually creates a record or performs an action; `PATCH` and `PUT` save changes; `DELETE` removes a record. `ANY` delegates requests without a single method listed here.
- **Route**: the request address. Replace names in brackets, such as `[id]`, with the actual record ID.
- **Authorization landmarks**: names found in the source that help a developer locate access checks.
- **Validation landmarks**: names that help locate checks on submitted fields or query options.
- **Source**: the application file that handles the request. A handler is the code that receives and answers it.

This table is generated from source names. A dash (`—`) means no matching name was found; it does not prove there is no access or data check. A listed name may also be a field or comment, rather than a check. Developers must follow the handler and its shared helpers to confirm the rules, response and tests; the coverage ledger tracks that evidence.

## Read-only example

For a signed-in user, `GET /api/auth/permissions` reads their static permission grants. It does not give them new rights. Permission to act on a particular file is still checked by that file’s server request. Any numbers shown are illustrative: use IDs for existing records you are allowed to read.

## Handlers (29)

| Method | Route | Authorization landmarks | Validation landmarks | Source |
| --- | --- | --- | --- | --- |
| GET | `/api/assigned-work` | requireAuthContext, requireFreshAuthContext | AssignedWorkQuerySchema, getValidatedQueryI18n | `server/api/assigned-work/index.get.ts` |
| GET | `/api/assignment-management` | requireAuthContext | AssignedWorkQuerySchema, Common_Recommendation_Schema, Common_Review_Schema, getValidatedQueryI18n | `server/api/assignment-management/index.get.ts` |
| ANY | `/api/auth/[...auth]` | — | — | `server/api/auth/[...auth].ts` |
| GET | `/api/auth/permissions` | — | — | `server/api/auth/permissions.get.ts` |
| DELETE | `/api/entity-assignments/[entityType]/[entityId]/[userId]` | requireAuthContext | EntityAssignmentRemoveSchema, EntityAssignmentTargetSchema, parseI18n | `server/api/entity-assignments/[entityType]/[entityId]/[userId].delete.ts` |
| GET | `/api/entity-assignments/[entityType]/[entityId]/context` | requireAuthContext, resolveAgreementScopeContext | EntityAssignmentTargetSchema, parseI18n | `server/api/entity-assignments/[entityType]/[entityId]/context.get.ts` |
| GET | `/api/entity-assignments/[entityType]/[entityId]` | requireAuthContext | EntityAssignmentTargetSchema, parseI18n | `server/api/entity-assignments/[entityType]/[entityId]/index.get.ts` |
| POST | `/api/entity-assignments/[entityType]/[entityId]` | requireAuthContext | EntityAssignmentCreateSchema, EntityAssignmentTargetSchema, parseI18n, readValidatedBodyI18n | `server/api/entity-assignments/[entityType]/[entityId]/index.post.ts` |
| PATCH | `/api/entity-assignments/[entityType]/[entityId]/primary` | requireAuthContext | EntityAssignmentPromoteSchema, EntityAssignmentTargetSchema, parseI18n, readValidatedBodyI18n | `server/api/entity-assignments/[entityType]/[entityId]/primary.patch.ts` |
| GET | `/api/entity-assignments/[entityType]/[entityId]/users` | requireAuthContext | EntityAssignmentTargetSchema, parseI18n | `server/api/entity-assignments/[entityType]/[entityId]/users.get.ts` |
| DELETE | `/api/roles/[id]` | requireAuthContext | RoleIdSchema, parseI18n | `server/api/roles/[id].delete.ts` |
| GET | `/api/roles/[id]` | authorizeWithFreshAuthContext, requireAuthContext, requireFreshAuthContext | RoleIdSchema, parseI18n | `server/api/roles/[id].get.ts` |
| PATCH | `/api/roles/[id]` | requireAuthContext | RoleIdSchema, RoleProfilePatchSchema, parseI18n, readValidatedBodyI18n | `server/api/roles/[id].patch.ts` |
| PATCH | `/api/roles/[id]/permissions` | authorizeWithFreshAuthContext, requireAuthContext, requireFreshAuthContext | RoleIdSchema, RolePermissionMutationSchema, parseI18n, readValidatedBodyI18n | `server/api/roles/[id]/permissions.patch.ts` |
| GET | `/api/roles` | — | PaginationSchema, getValidatedQueryI18n | `server/api/roles/index.get.ts` |
| POST | `/api/roles` | requireAuthContext | RoleSchema, readValidatedBodyI18n | `server/api/roles/index.post.ts` |
| GET | `/api/roles/lookups/agencies` | requireAuthContext | PaginationSchema, RoleAgencyLookupQuerySchema, RoleIdSchema, getValidatedQueryI18n | `server/api/roles/lookups/agencies.get.ts` |
| GET | `/api/roles/lookups/agencies/[id]` | authorizeWithFreshAuthContext, requireAuthContext, requireFreshAuthContext | PositivePostgresBigintIdSchema, RoleAgencyDetailLookupQuerySchema, RoleIdSchema, getValidatedQueryI18n, parseI18n | `server/api/roles/lookups/agencies/[id].get.ts` |
| GET | `/api/roles/lookups/transfer-payments` | requireAuthContext | PositivePostgresBigintIdSchema, RoleIdSchema, RoleTransferPaymentLookupQuerySchema, TransferPaymentListQuerySchema, getValidatedQueryI18n | `server/api/roles/lookups/transfer-payments.get.ts` |
| DELETE | `/api/users/[id]` | requireAuthContext | — | `server/api/users/[id].delete.ts` |
| GET | `/api/users/[id]` | canAuthorizeUserScopes, requireAuthContext, resolveAuthorizedAgencyAccess | — | `server/api/users/[id].get.ts` |
| PATCH | `/api/users/[id]` | requireAuthContext | UserProfilePatchSchema, readValidatedBodyI18n | `server/api/users/[id].patch.ts` |
| POST | `/api/users/[id]/activate` | requireAuthContext | UserActivationSchema, readValidatedBodyI18n | `server/api/users/[id]/activate.post.ts` |
| GET | `/api/users/[id]/assignable-roles` | requireAuthContext, resolveAuthorizedAgencyAccess | PaginationSchema, getValidatedQueryI18n | `server/api/users/[id]/assignable-roles.get.ts` |
| POST | `/api/users/[id]/assignments` | requireAuthContext | UserRoleAssignmentSchema, readValidatedBodyI18n | `server/api/users/[id]/assignments.post.ts` |
| DELETE | `/api/users/[id]/assignments/[assignmentId]` | requireAuthContext | — | `server/api/users/[id]/assignments/[assignmentId].delete.ts` |
| GET | `/api/users` | resolveAuthorizedAgencyAccess | PaginationSchema, getValidatedQueryI18n | `server/api/users/index.get.ts` |
| POST | `/api/users` | authorizeWithFreshAuthContext, requireFreshAuthContext | UserProfileSchema, readValidatedBodyI18n | `server/api/users/index.post.ts` |
| GET | `/api/users/lookups` | requireAuthContext | AdminCommonListQuerySchema, PositivePostgresBigintIdSchema, UserLookupQuerySchema, getValidatedQueryI18n | `server/api/users/lookups/index.get.ts` |
