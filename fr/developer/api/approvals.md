# API des approbations

Ces requêtes servent aux modèles d’approbation et aux étapes d’approbation d’un dossier. Un modèle définit l’organisation de l’approbation; une approbation en cours consigne la décision sur un élément précis. Consultez les [modèles d’approbation](../../programs/approval-templates.md) et les [approbations et achèvements](../../concepts/approvals-completions.md).

Une API est l’ensemble des requêtes que l’application envoie à son serveur lorsque vous ouvrez ou enregistrez un dossier. Les agents utilisent normalement les écrans; les développeurs utilisent cet index pour trouver le code correspondant. Le serveur vérifie l’accès aux dossiers protégés même si un écran affiche une action comme disponible.

- **Méthode** : `GET` lit des renseignements; `POST` crée généralement un dossier ou réalise une action; `PATCH` et `PUT` enregistrent des modifications; `DELETE` retire un dossier. `ANY` délègue les requêtes sans méthode unique indiquée ici.
- **Route** : l’adresse de la requête. Remplacez les noms entre crochets, comme `[id]`, par l’identifiant réel du dossier.
- **Repères d’autorisation** : des noms trouvés dans les sources qui aident le développeur à repérer les vérifications d’accès.
- **Repères de validation** : des noms qui aident à repérer les vérifications des champs soumis ou des options de requête.
- **Source** : le fichier de l’application qui traite la requête. Un gestionnaire est le code qui la reçoit et y répond.

Ce tableau est généré à partir des noms dans les sources. Un tiret (`—`) signifie qu’aucun nom correspondant n’a été trouvé; il ne prouve pas l’absence de vérification d’accès ou de données. Un nom indiqué peut aussi être un champ ou un commentaire plutôt qu’une vérification. Les développeurs doivent suivre le gestionnaire et ses fonctions partagées pour confirmer les règles, la réponse et les tests; le registre de couverture suit ces preuves.

## Exemple de lecture seule

Une requête autorisée `GET /api/agency/12/approval-templates/8` lit le modèle 8 de l’agence 12. Elle ne publie pas le modèle et n’approuve aucun dossier. Les numéros indiqués sont des exemples : utilisez les identifiants de dossiers existants que vous avez le droit de consulter.

## Gestionnaires (16)

| Méthode | Route | Repères d’autorisation | Repères de validation | Source |
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
