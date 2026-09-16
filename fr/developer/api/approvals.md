# API des approbations

Conception/versionnage des modèles d’approbation et actions génériques sur les bordereaux.

Cet index généré constitue une table de navigation exhaustive, non une preuve indépendante du contrat. Pour chaque gestionnaire, le registre de couverture consigne les preuves directes requises sur l’autorisation, la validation, les aides, la base, la réponse, l’interface et les tests avant la vérification terminale. Les permissions clientes ne remplacent jamais l’autorisation serveur.

## Gestionnaires (14)

| Méthode | Route | Repères d’autorisation | Repères de validation | Source |
| --- | --- | --- | --- | --- |
| DELETE | `/api/approval-templates/[templateId]` | currentScopeContext, requireAuthContext, resolveApprovalTemplateScopeContextFromTemplateId | — | `server/api/approval-templates/[templateId]/index.delete.ts` |
| GET | `/api/approval-templates/[templateId]` | requireAuthContext | — | `server/api/approval-templates/[templateId]/index.get.ts` |
| PATCH | `/api/approval-templates/[templateId]` | currentScopeContext, requireAuthContext, resolveApprovalTemplateScopeContextFromTemplateId | ApprovalTemplatePatchSchema, ApprovalTemplatePersistenceSchema, parseI18n, readValidatedBodyI18n | `server/api/approval-templates/[templateId]/index.patch.ts` |
| POST | `/api/approval-templates/[templateId]/publish` | requireAuthContext | — | `server/api/approval-templates/[templateId]/publish.post.ts` |
| POST | `/api/approval-templates/[templateId]/retire` | requireAuthContext | — | `server/api/approval-templates/[templateId]/retire.post.ts` |
| GET | `/api/approval-templates` | requireAuthContext | ApprovalTemplateListQuerySchema, getValidatedQueryI18n | `server/api/approval-templates/index.get.ts` |
| POST | `/api/approval-templates` | requireAuthContext | ApprovalTemplateCreateSchema, readValidatedBodyI18n | `server/api/approval-templates/index.post.ts` |
| POST | `/api/approvals/add-step` | executeFreshAuthorizedApprovalAddStepWrite, requireAuthContext | AddApprovalStepSchema, readValidatedBodyI18n | `server/api/approvals/add-step.post.ts` |
| POST | `/api/approvals/approve` | executeFreshAuthorizedApprovalActorWrite, requireAuthContext | ReviewApprovalApproveSchema, readValidatedBodyI18n | `server/api/approvals/approve.post.ts` |
| POST | `/api/approvals/deny` | executeFreshAuthorizedApprovalActorWrite, requireAuthContext | ReviewApprovalDenySchema, readValidatedBodyI18n | `server/api/approvals/deny.post.ts` |
| GET | `/api/approvals/lookups/behalf-types` | requireAuthContext | ApprovalRuntimeQuerySchema, getValidatedQueryI18n | `server/api/approvals/lookups/behalf-types.get.ts` |
| GET | `/api/approvals/lookups/users` | canAuthorizeReviewRuntimeAction, requireAuthContext | ApprovalRuntimeQuerySchema, getValidatedQueryI18n | `server/api/approvals/lookups/users.get.ts` |
| POST | `/api/approvals/reassign` | requireAuthContext | ReviewApprovalReassignSchema, readValidatedBodyI18n | `server/api/approvals/reassign.post.ts` |
| GET | `/api/approvals/runtime` | canAuthorizeReviewRuntimeAction, requireAuthContext | ApprovalRuntimeQuerySchema, getValidatedQueryI18n | `server/api/approvals/runtime.get.ts` |
