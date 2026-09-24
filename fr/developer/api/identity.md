# API d’identité et de contrôle d’accès

Délégation Better Auth, permissions de rôle, affectations exactes, travail affecté et gestion des affectations.

Cet index généré constitue une table de navigation exhaustive, non une preuve indépendante du contrat. Pour chaque gestionnaire, le registre de couverture consigne les preuves directes requises sur l’autorisation, la validation, les aides, la base, la réponse, l’interface et les tests avant la vérification terminale. Les permissions clientes ne remplacent jamais l’autorisation serveur.

## Gestionnaires (29)

| Méthode | Route | Repères d’autorisation | Repères de validation | Source |
| --- | --- | --- | --- | --- |
| GET | `/api/assigned-work` | requireAuthContext, requireFreshAuthContext | AssignedWorkQuerySchema, Common_Recommendation_Schema, Common_Review_Schema, getValidatedQueryI18n | `server/api/assigned-work/index.get.ts` |
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
