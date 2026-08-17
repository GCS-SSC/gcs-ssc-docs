# API d’identité et de contrôle d’accès

Délégation Better Auth, permissions, utilisateurs, rôles, affectations et indices de navigation des équipes.

Cet index généré constitue une table de navigation exhaustive, non une preuve indépendante du contrat. Pour chaque gestionnaire, le registre de couverture consigne les preuves directes requises sur l’autorisation, la validation, les aides, la base, la réponse, l’interface et les tests avant la vérification terminale. Les permissions clientes ne remplacent jamais l’autorisation serveur.

## Gestionnaires (24)

| Méthode | Route | Repères d’autorisation | Repères de validation | Source |
| --- | --- | --- | --- | --- |
| GET | `/api/admin/common/users` | — | AdminCommonListQuerySchema, getValidatedQueryI18n | `server/api/admin/common/users/index.get.ts` |
| ANY | `/api/auth/[...auth]` | — | — | `server/api/auth/[...auth].ts` |
| GET | `/api/auth/permissions` | — | — | `server/api/auth/permissions.get.ts` |
| GET | `/api/auth/roles` | — | — | `server/api/auth/roles.get.ts` |
| GET | `/api/auth/team-access` | — | TeamNavigationAccessSchema | `server/api/auth/team-access.get.ts` |
| DELETE | `/api/roles/[id]` | — | — | `server/api/roles/[id].delete.ts` |
| GET | `/api/roles/[id]` | — | — | `server/api/roles/[id].get.ts` |
| PATCH | `/api/roles/[id]` | — | RoleProfilePatchSchema, readValidatedBodyI18n | `server/api/roles/[id].patch.ts` |
| PATCH | `/api/roles/[id]/abilities` | authorizeWithFreshAuthContext, requireFreshAuthContext | RoleAbilityMutationSchema, readValidatedBodyI18n | `server/api/roles/[id]/abilities.patch.ts` |
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
| PATCH | `/api/users/[id]/proponent-access` | — | UserProponentAccessSchema, readValidatedBodyI18n | `server/api/users/[id]/proponent-access.patch.ts` |
| GET | `/api/users` | resolveAuthorizedAgencyAccess | PaginationSchema, getValidatedQueryI18n | `server/api/users/index.get.ts` |
| POST | `/api/users` | authorizeWithFreshAuthContext, requireFreshAuthContext | UserProfileSchema, readValidatedBodyI18n | `server/api/users/index.post.ts` |
