# API des examens

Ensembles d’examens exécutés, réponses d’évaluation et de liste de contrôle, examinateurs, annulation, achèvement et reprise.

Cet index généré constitue une table de navigation exhaustive, non une preuve indépendante du contrat. Pour chaque gestionnaire, le registre de couverture consigne les preuves directes requises sur l’autorisation, la validation, les aides, la base, la réponse, l’interface et les tests avant la vérification terminale. Les permissions clientes ne remplacent jamais l’autorisation serveur.

## Gestionnaires (13)

| Méthode | Route | Repères d’autorisation | Repères de validation | Source |
| --- | --- | --- | --- | --- |
| GET | `/api/admin/common/review-sets` | — | — | `server/api/admin/common/review-sets/index.get.ts` |
| POST | `/api/review-sets/[reviewSetId]/cancel` | executeFreshAuthorizedReviewRuntimeWrite | — | `server/api/review-sets/[reviewSetId]/cancel.post.ts` |
| GET | `/api/review-sets` | — | Common_Review_Schema, PaginationSchema, ReviewSetListQuerySchema, getValidatedQueryI18n | `server/api/review-sets/index.get.ts` |
| POST | `/api/review-sets` | executeFreshAuthorizedReviewRuntimeWrite | CreateReviewSetSchema, readValidatedBodyI18n | `server/api/review-sets/index.post.ts` |
| GET | `/api/review-sets/lookups/setups` | — | PaginationSchema, ReviewSetupLookupQuerySchema, getValidatedQueryI18n | `server/api/review-sets/lookups/setups.get.ts` |
| GET | `/api/reviews/[reviewId]/additional-reviewers` | — | — | `server/api/reviews/[reviewId]/additional-reviewers/index.get.ts` |
| POST | `/api/reviews/[reviewId]/additional-reviewers` | executeFreshAuthorizedReviewRuntimeWrite | AdditionalReviewerInputSchema, readValidatedBodyI18n | `server/api/reviews/[reviewId]/additional-reviewers/index.post.ts` |
| GET | `/api/reviews/[reviewId]/additional-reviewers/lookups/users` | — | PaginationSchema, UserLookupQuerySchema, getValidatedQueryI18n | `server/api/reviews/[reviewId]/additional-reviewers/lookups/users.get.ts` |
| GET | `/api/reviews/[reviewId]/assessment` | canAuthorizeReviewRuntimeAction | Common_Review_Schema | `server/api/reviews/[reviewId]/assessment.get.ts` |
| PATCH | `/api/reviews/[reviewId]/assessment` | executeFreshAuthorizedReviewRuntimeWrite | AssessmentResponseSchema, readValidatedBodyI18n | `server/api/reviews/[reviewId]/assessment.patch.ts` |
| GET | `/api/reviews/[reviewId]/checklist` | canAuthorizeReviewRuntimeAction | Common_Review_Schema | `server/api/reviews/[reviewId]/checklist.get.ts` |
| PATCH | `/api/reviews/[reviewId]/checklist` | executeFreshAuthorizedReviewRuntimeWrite | ChecklistResponseEnvelopeSchema, readValidatedBodyI18n | `server/api/reviews/[reviewId]/checklist.patch.ts` |
| POST | `/api/reviews/[reviewId]/clone` | executeFreshAuthorizedReviewRuntimeWrite | — | `server/api/reviews/[reviewId]/clone.post.ts` |
