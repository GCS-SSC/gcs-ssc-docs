# API des approbations

Ces requêtes servent aux modèles d’approbation et aux étapes d’approbation d’un dossier. Un modèle définit l’organisation de l’approbation; une approbation en cours consigne la décision sur un élément précis. Consultez les [modèles d’approbation](../../programs/approval-templates.md) et les [approbations et achèvements](../../concepts/approvals-completions.md).

Cet index associe les requêtes serveur aux fichiers qui les traitent. Les guides liés expliquent les étapes à l'écran. Le serveur vérifie l'accès aux dossiers protégés même si un écran propose une action.

- La méthode indique le type de requête. `GET` lit des renseignements. `POST` crée généralement un dossier ou exécute une action. `PATCH` et `PUT` enregistrent des modifications. `DELETE` retire un dossier. `ANY` signifie que le nom du fichier ne déclare aucune méthode unique.
- La route est l'adresse de la requête. Remplacez les noms entre crochets, comme `[id]`, par l'identifiant réel du dossier.
- Les noms d'autorisation et de validation sont des correspondances trouvées dans le code du gestionnaire. Ils aident à repérer les vérifications d'accès et celles des champs soumis ou des options de requête.
- La source est le fichier de l'application qui traite la requête.

Un tiret dans les colonnes de noms signifie que le générateur ne trouve aucun nom correspondant. Il ne prouve pas l'absence de vérification. Un nom indiqué peut provenir d'un champ ou d'un commentaire. Suivez le gestionnaire et ses fonctions partagées pour confirmer les règles d'accès, la validation et les réponses. Le registre de couverture consigne les preuves correspondantes.

## Exemple de lecture seule

Une requête autorisée `GET /api/agency/12/approval-templates/8` lit le modèle 8 de l’agence 12. Elle ne publie pas le modèle et n’approuve aucun dossier. Les identifiants sont des exemples. Utilisez des dossiers existants que vous avez le droit de consulter.

## Gestionnaires (16)

| Méthode | Route | Noms d'autorisation | Noms de validation | Source |
| --- | --- | --- | --- | --- |
| DELETE | `/api/agency/[agencyId]/approval-templates/[templateId]` | currentScopeContext, requireAuthContext, resolveApprovalTemplateScopeContextFromTemplateId | — | `server/api/agency/[agencyId]/approval-templates/[templateId]/index.delete.ts` |
| GET | `/api/agency/[agencyId]/approval-templates/[templateId]` | requireAuthContext, resolveApprovalTemplateScopeContextFromTemplateId | — | `server/api/agency/[agencyId]/approval-templates/[templateId]/index.get.ts` |
| PATCH | `/api/agency/[agencyId]/approval-templates/[templateId]` | currentScopeContext, requireAuthContext, resolveApprovalTemplateScopeContextFromTemplateId | ApprovalTemplatePatchSchema, ApprovalTemplatePersistenceSchema, parseI18n, readValidatedBodyI18n | `server/api/agency/[agencyId]/approval-templates/[templateId]/index.patch.ts` |
| POST | `/api/agency/[agencyId]/approval-templates/[templateId]/publish` | requireAuthContext | — | `server/api/agency/[agencyId]/approval-templates/[templateId]/publish.post.ts` |
| POST | `/api/agency/[agencyId]/approval-templates/[templateId]/retire` | requireAuthContext | — | `server/api/agency/[agencyId]/approval-templates/[templateId]/retire.post.ts` |
| GET | `/api/agency/[agencyId]/approval-templates` | requireAuthContext | ApprovalTemplateListQuerySchema, getValidatedQueryI18n | `server/api/agency/[agencyId]/approval-templates/index.get.ts` |
| POST | `/api/agency/[agencyId]/approval-templates` | requireAuthContext | ApprovalTemplateCreateSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/approval-templates/index.post.ts` |
| POST | `/api/approvals/[approvalId]/claim` | requireAuthContext, requireFreshAuthContext | — | `server/api/approvals/[approvalId]/claim.post.ts` |
| POST | `/api/approvals/add-step` | executeFreshAuthorizedApprovalAddStepWrite, requireAuthContext | AddApprovalStepSchema, readValidatedBodyI18n | `server/api/approvals/add-step.post.ts` |
| POST | `/api/approvals/approve` | executeFreshAuthorizedApprovalActorWrite, requireAuthContext | PositivePostgresBigintIdSchema, ReviewApprovalApproveSchema, readValidatedBodyI18n | `server/api/approvals/approve.post.ts` |
| POST | `/api/approvals/deny` | executeFreshAuthorizedApprovalActorWrite, requireAuthContext | PositivePostgresBigintIdSchema, ReviewApprovalDenySchema, readValidatedBodyI18n | `server/api/approvals/deny.post.ts` |
| GET | `/api/approvals/lookups/behalf-types` | requireAuthContext | ApprovalRuntimeQuerySchema, getValidatedQueryI18n | `server/api/approvals/lookups/behalf-types.get.ts` |
| GET | `/api/approvals/lookups/groups` | canAuthorizeReviewRuntimeAction, requireAuthContext | ApprovalRuntimeQuerySchema, getValidatedQueryI18n | `server/api/approvals/lookups/groups.get.ts` |
| GET | `/api/approvals/lookups/users` | canAuthorizeReviewRuntimeAction, requireAuthContext | ApprovalRuntimeQuerySchema, getValidatedQueryI18n | `server/api/approvals/lookups/users.get.ts` |
| POST | `/api/approvals/reassign` | requireAuthContext | PositivePostgresBigintIdSchema, ReviewApprovalReassignSchema, readValidatedBodyI18n | `server/api/approvals/reassign.post.ts` |
| GET | `/api/approvals/runtime` | canAuthorizeReviewRuntimeAction, requireAuthContext | ApprovalRuntimeQuerySchema, getValidatedQueryI18n | `server/api/approvals/runtime.get.ts` |
