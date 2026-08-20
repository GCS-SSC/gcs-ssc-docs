# API d’identité et de contrôle d’accès

Délégation Better Auth, permissions de rôle, affectations exactes, travail affecté et gestion des affectations.

Cet index généré constitue une table de navigation exhaustive, non une preuve indépendante du contrat. Pour chaque gestionnaire, le registre de couverture consigne les preuves directes requises sur l’autorisation, la validation, les aides, la base, la réponse, l’interface et les tests avant la vérification terminale. Les permissions clientes ne remplacent jamais l’autorisation serveur.

## Gestionnaires (30)

| Méthode | Route | Repères d’autorisation | Repères de validation | Source |
| --- | --- | --- | --- | --- |
| GET | `/api/admin/common/users` | — | AdminCommonListQuerySchema, getValidatedQueryI18n | `server/api/admin/common/users/index.get.ts` |
| GET | `/api/assigned-work` | — | AssignedWorkQuerySchema, Common_Recommendation_Schema, Common_Review_Schema, getValidatedQueryI18n | `server/api/assigned-work/index.get.ts` |
| GET | `/api/assignment-management` | requireAuthContext | AssignedWorkQuerySchema, getValidatedQueryI18n | `server/api/assignment-management/index.get.ts` |
| ANY | `/api/auth/[...auth]` | — | — | `server/api/auth/[...auth].ts` |
| GET | `/api/auth/permissions` | — | — | `server/api/auth/permissions.get.ts` |
| GET | `/api/auth/roles` | — | — | `server/api/auth/roles.get.ts` |
| DELETE | `/api/entity-assignments/[entityType]/[entityId]/[userId]` | — | EntityAssignmentRemoveSchema, EntityAssignmentTargetSchema, parseI18n | `server/api/entity-assignments/[entityType]/[entityId]/[userId].delete.ts` |
| GET | `/api/entity-assignments/[entityType]/[entityId]/context` | requireAuthContext, resolveAgreementScopeContext | EntityAssignmentTargetSchema, parseI18n | `server/api/entity-assignments/[entityType]/[entityId]/context.get.ts` |
| GET | `/api/entity-assignments/[entityType]/[entityId]` | — | EntityAssignmentTargetSchema, parseI18n | `server/api/entity-assignments/[entityType]/[entityId]/index.get.ts` |
| POST | `/api/entity-assignments/[entityType]/[entityId]` | — | EntityAssignmentCreateSchema, EntityAssignmentTargetSchema, parseI18n, readValidatedBodyI18n | `server/api/entity-assignments/[entityType]/[entityId]/index.post.ts` |
| PATCH | `/api/entity-assignments/[entityType]/[entityId]/primary` | — | EntityAssignmentPromoteSchema, EntityAssignmentTargetSchema, parseI18n, readValidatedBodyI18n | `server/api/entity-assignments/[entityType]/[entityId]/primary.patch.ts` |
| GET | `/api/entity-assignments/[entityType]/[entityId]/users` | — | EntityAssignmentTargetSchema, parseI18n | `server/api/entity-assignments/[entityType]/[entityId]/users.get.ts` |
| DELETE | `/api/roles/[id]` | — | — | `server/api/roles/[id].delete.ts` |
| GET | `/api/roles/[id]` | — | — | `server/api/roles/[id].get.ts` |
| PATCH | `/api/roles/[id]` | — | RoleProfilePatchSchema, readValidatedBodyI18n | `server/api/roles/[id].patch.ts` |
| PATCH | `/api/roles/[id]/permissions` | authorizeWithFreshAuthContext, requireFreshAuthContext | RolePermissionMutationSchema, readValidatedBodyI18n | `server/api/roles/[id]/permissions.patch.ts` |
| GET | `/api/roles` | — | PaginationSchema, getValidatedQueryI18n | `server/api/roles/index.get.ts` |
| POST | `/api/roles` | — | RoleSchema, readValidatedBodyI18n | `server/api/roles/index.post.ts` |
| GET | `/api/roles/lookups/agencies` | — | PaginationSchema, RoleAgencyLookupQuerySchema, getValidatedQueryI18n | `server/api/roles/lookups/agencies.get.ts` |
| GET | `/api/roles/lookups/agencies/[id]` | — | RoleAgencyDetailLookupQuerySchema, getValidatedQueryI18n | `server/api/roles/lookups/agencies/[id].get.ts` |
| GET | `/api/roles/lookups/transfer-payments` | — | RoleTransferPaymentLookupQuerySchema, TransferPaymentListQuerySchema, getValidatedQueryI18n | `server/api/roles/lookups/transfer-payments.get.ts` |
| DELETE | `/api/users/[id]` | — | — | `server/api/users/[id].delete.ts` |
| GET | `/api/users/[id]` | canAuthorizeUserScopes, resolveAuthorizedAgencyAccess | — | `server/api/users/[id].get.ts` |
| PATCH | `/api/users/[id]` | — | UserProfilePatchSchema, readValidatedBodyI18n | `server/api/users/[id].patch.ts` |
| POST | `/api/users/[id]/activate` | — | UserActivationSchema, readValidatedBodyI18n | `server/api/users/[id]/activate.post.ts` |
| GET | `/api/users/[id]/assignable-roles` | resolveAuthorizedAgencyAccess | PaginationSchema, getValidatedQueryI18n | `server/api/users/[id]/assignable-roles.get.ts` |
| POST | `/api/users/[id]/assignments` | — | UserRoleAssignmentSchema, readValidatedBodyI18n | `server/api/users/[id]/assignments.post.ts` |
| DELETE | `/api/users/[id]/assignments/[assignmentId]` | — | — | `server/api/users/[id]/assignments/[assignmentId].delete.ts` |
| GET | `/api/users` | resolveAuthorizedAgencyAccess | PaginationSchema, getValidatedQueryI18n | `server/api/users/index.get.ts` |
| POST | `/api/users` | authorizeWithFreshAuthContext, requireFreshAuthContext | UserProfileSchema, readValidatedBodyI18n | `server/api/users/index.post.ts` |
