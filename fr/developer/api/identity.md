# API d’identité et de contrôle d’accès

Ces requêtes servent à la connexion, aux utilisateurs, aux rôles et aux affectations à des dossiers précis. Ensemble, ces éléments déterminent qui peut consulter ou modifier un dossier et le travail qui lui est affecté. Consultez les [rôles](../../admin/roles.md), les [affectations](../../admin/assignments.md) et le [contrôle d’accès](../../concepts/rbac.md).

Cet index associe les requêtes serveur aux fichiers qui les traitent. Les guides liés expliquent les étapes à l'écran. Le serveur vérifie l'accès aux dossiers protégés même si un écran propose une action.

- La méthode indique le type de requête. `GET` lit des renseignements. `POST` crée généralement un dossier ou exécute une action. `PATCH` et `PUT` enregistrent des modifications. `DELETE` retire un dossier. `ANY` signifie que le nom du fichier ne déclare aucune méthode unique.
- La route est l'adresse de la requête. Remplacez les noms entre crochets, comme `[id]`, par l'identifiant réel du dossier.
- Les noms d'autorisation et de validation sont des correspondances trouvées dans le code du gestionnaire. Ils aident à repérer les vérifications d'accès et celles des champs soumis ou des options de requête.
- La source est le fichier de l'application qui traite la requête.

Un tiret dans les colonnes de noms signifie que le générateur ne trouve aucun nom correspondant. Il ne prouve pas l'absence de vérification. Un nom indiqué peut provenir d'un champ ou d'un commentaire. Suivez le gestionnaire et ses fonctions partagées pour confirmer les règles d'accès, la validation et les réponses. Le registre de couverture consigne les preuves correspondantes.

## Exemple de lecture seule

Pour un utilisateur connecté, `GET /api/auth/permissions` lit les permissions statiques qui lui sont accordées. Cette requête ne lui donne aucun nouveau droit. L’autorisation d’agir sur un dossier précis est toujours vérifiée par la requête serveur de ce dossier.

## Gestionnaires (29)

| Méthode | Route | Noms d'autorisation | Noms de validation | Source |
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
