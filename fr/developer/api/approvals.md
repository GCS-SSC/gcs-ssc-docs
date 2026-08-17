# API des approbations

Conception/versionnage des modèles d’approbation et actions génériques sur les bordereaux.

Cet index généré constitue une table de navigation exhaustive, non une preuve indépendante du contrat. Pour chaque gestionnaire, le registre de couverture consigne les preuves directes requises sur l’autorisation, la validation, les aides, la base, la réponse, l’interface et les tests avant la vérification terminale. Les permissions clientes ne remplacent jamais l’autorisation serveur.

## Gestionnaires (15)

| Méthode | Route | Repères d’autorisation | Repères de validation | Source |
| --- | --- | --- | --- | --- |
| POST | `/api/approval-templates/[templateId]/activate` | resolveApprovalTemplateScopeContextFromTemplateId | — | `server/api/approval-templates/[templateId]/activate.post.ts` |
| DELETE | `/api/approval-templates/[templateId]` | currentScopeContext, resolveApprovalTemplateScopeContextFromTemplateId | — | `server/api/approval-templates/[templateId]/index.delete.ts` |
| GET | `/api/approval-templates/[templateId]` | resolveApprovalTemplateScopeContextFromTemplateId | — | `server/api/approval-templates/[templateId]/index.get.ts` |
| PATCH | `/api/approval-templates/[templateId]` | currentScopeContext, resolveApprovalTemplateScopeContextFromTemplateId | ApprovalTemplatePatchSchema, ApprovalTemplatePersistenceSchema, parseI18n, readValidatedBodyI18n | `server/api/approval-templates/[templateId]/index.patch.ts` |
| POST | `/api/approval-templates/[templateId]/publish` | resolveApprovalTemplateScopeContextFromTemplateId | — | `server/api/approval-templates/[templateId]/publish.post.ts` |
| GET | `/api/approval-templates` | resolveApprovalTemplateScopeContext | ApprovalTemplateListQuerySchema, getValidatedQueryI18n | `server/api/approval-templates/index.get.ts` |
| POST | `/api/approval-templates` | resolveApprovalTemplateScopeContext | ApprovalTemplateCreateSchema, readValidatedBodyI18n | `server/api/approval-templates/index.post.ts` |
| POST | `/api/approvals/add-step` | canAuthorizeReviewRuntimeAction, executeFreshAuthorizedApprovalActorWrite, executeFreshAuthorizedReviewRuntimeWrite | AddApprovalStepSchema, readValidatedBodyI18n | `server/api/approvals/add-step.post.ts` |
| POST | `/api/approvals/approve` | — | ReviewApprovalApproveSchema, readValidatedBodyI18n | `server/api/approvals/approve.post.ts` |
| POST | `/api/approvals/create-routing-slip` | canAuthorizeReviewRuntimeAction | ApprovalRuntimeEntitySchema, readValidatedBodyI18n | `server/api/approvals/create-routing-slip.post.ts` |
| POST | `/api/approvals/deny` | — | ReviewApprovalDenySchema, readValidatedBodyI18n | `server/api/approvals/deny.post.ts` |
| GET | `/api/approvals/lookups/behalf-types` | — | ApprovalRuntimeQuerySchema, getValidatedQueryI18n | `server/api/approvals/lookups/behalf-types.get.ts` |
| GET | `/api/approvals/lookups/users` | canAuthorizeReviewRuntimeAction | ApprovalRuntimeQuerySchema, getValidatedQueryI18n | `server/api/approvals/lookups/users.get.ts` |
| POST | `/api/approvals/reassign` | — | ReviewApprovalReassignSchema, readValidatedBodyI18n | `server/api/approvals/reassign.post.ts` |
| GET | `/api/approvals/runtime` | canAuthorizeReviewRuntimeAction | ApprovalRuntimeQuerySchema, getValidatedQueryI18n | `server/api/approvals/runtime.get.ts` |
