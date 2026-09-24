# API des examens

Ensembles d’examens exécutés, réponses d’évaluation et de liste de contrôle, examinateurs, annulation, achèvement et reprise.

Cet index généré constitue une table de navigation exhaustive, non une preuve indépendante du contrat. Pour chaque gestionnaire, le registre de couverture consigne les preuves directes requises sur l’autorisation, la validation, les aides, la base, la réponse, l’interface et les tests avant la vérification terminale. Les permissions clientes ne remplacent jamais l’autorisation serveur.

## Gestionnaires (29)

| Méthode | Route | Repères d’autorisation | Repères de validation | Source |
| --- | --- | --- | --- | --- |
| GET | `/api/agency/[agencyId]/review-sets/[reviewSetId]/groups` | — | — | `server/api/agency/[agencyId]/review-sets/[reviewSetId]/groups.get.ts` |
| DELETE | `/api/agency/[agencyId]/review-sets/[reviewSetId]` | — | — | `server/api/agency/[agencyId]/review-sets/[reviewSetId]/index.delete.ts` |
| GET | `/api/agency/[agencyId]/review-sets/[reviewSetId]` | — | Common_Review_Schema | `server/api/agency/[agencyId]/review-sets/[reviewSetId]/index.get.ts` |
| PATCH | `/api/agency/[agencyId]/review-sets/[reviewSetId]` | — | TransferPaymentStreamReviewSetupPatchSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/review-sets/[reviewSetId]/index.patch.ts` |
| DELETE | `/api/agency/[agencyId]/review-sets/[reviewSetId]/items/[itemId]` | — | — | `server/api/agency/[agencyId]/review-sets/[reviewSetId]/items/[itemId]/index.delete.ts` |
| PATCH | `/api/agency/[agencyId]/review-sets/[reviewSetId]/items/[itemId]` | — | TransferPaymentStreamReviewSetupMemberPatchSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/review-sets/[reviewSetId]/items/[itemId]/index.patch.ts` |
| POST | `/api/agency/[agencyId]/review-sets/[reviewSetId]/items/create-schema` | — | Common_Assessment_Schema, Common_Checklist_Schema, Common_Review_Schema, TransferPaymentStreamReviewSetupSchemaCreateSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/review-sets/[reviewSetId]/items/create-schema.post.ts` |
| POST | `/api/agency/[agencyId]/review-sets/[reviewSetId]/items` | — | Common_Review_Schema, TransferPaymentStreamReviewSetupMemberCreateSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/review-sets/[reviewSetId]/items/index.post.ts` |
| POST | `/api/agency/[agencyId]/review-sets/[reviewSetId]/publish` | — | — | `server/api/agency/[agencyId]/review-sets/[reviewSetId]/publish.post.ts` |
| POST | `/api/agency/[agencyId]/review-sets/[reviewSetId]/retire` | — | — | `server/api/agency/[agencyId]/review-sets/[reviewSetId]/retire.post.ts` |
| GET | `/api/agency/[agencyId]/review-sets` | — | Common_Review_Schema, EntityTypeIdentitySchema, PaginationSchema, ReviewSetupListQuerySchema, getValidatedQueryI18n | `server/api/agency/[agencyId]/review-sets/index.get.ts` |
| POST | `/api/agency/[agencyId]/review-sets` | — | TransferPaymentStreamReviewSetupCreateSchema, readValidatedBodyI18n | `server/api/agency/[agencyId]/review-sets/index.post.ts` |
| GET | `/api/agency/[agencyId]/review-sets/next-order` | — | — | `server/api/agency/[agencyId]/review-sets/next-order.get.ts` |
| POST | `/api/review-sets/[reviewSetId]/cancel` | executeFreshAuthorizedReviewRuntimeWrite, requireAuthContext | — | `server/api/review-sets/[reviewSetId]/cancel.post.ts` |
| GET | `/api/review-sets` | canAuthorizeReviewRuntimeWorkOwnerRole, requireAuthContext | Common_Review_Schema, CoreOrExtensionEntityTargetSchema, PaginationSchema, ReviewSetListQuerySchema, getValidatedQueryI18n | `server/api/review-sets/index.get.ts` |
| POST | `/api/review-sets` | executeFreshAuthorizedReviewRuntimeWrite, requireAuthContext, requireFreshAuthContext | CoreOrExtensionEntityTargetSchema, CreateReviewSetSchema, PositivePostgresBigintIdSchema, readValidatedBodyI18n | `server/api/review-sets/index.post.ts` |
| GET | `/api/review-sets/lookups/setups` | requireAuthContext | CoreOrExtensionEntityTargetSchema, PaginationSchema, ReviewSetupLookupQuerySchema, getValidatedQueryI18n | `server/api/review-sets/lookups/setups.get.ts` |
| GET | `/api/reviews/[reviewId]/additional-reviewers` | canAuthorizeReviewRuntimeAction, requireAuthContext | — | `server/api/reviews/[reviewId]/additional-reviewers/index.get.ts` |
| POST | `/api/reviews/[reviewId]/additional-reviewers` | executeFreshAuthorizedReviewRuntimeWrite, requireAuthContext | AdditionalReviewerInputSchema, readValidatedBodyI18n | `server/api/reviews/[reviewId]/additional-reviewers/index.post.ts` |
| GET | `/api/reviews/[reviewId]/additional-reviewers/lookups/groups` | requireAuthContext | — | `server/api/reviews/[reviewId]/additional-reviewers/lookups/groups.get.ts` |
| GET | `/api/reviews/[reviewId]/additional-reviewers/lookups/users` | requireAuthContext | PaginationSchema, UserLookupQuerySchema, getValidatedQueryI18n | `server/api/reviews/[reviewId]/additional-reviewers/lookups/users.get.ts` |
| GET | `/api/reviews/[reviewId]/assessment` | canAuthorizeReviewRuntimeAction, requireAuthContext | AssessmentRuntimeSchema, Common_Review_Schema | `server/api/reviews/[reviewId]/assessment.get.ts` |
| PATCH | `/api/reviews/[reviewId]/assessment` | executeFreshAuthorizedReviewRuntimeWrite, requireAuthContext | AssessmentResponseSchema, readValidatedBodyI18n | `server/api/reviews/[reviewId]/assessment.patch.ts` |
| GET | `/api/reviews/[reviewId]/checklist` | canAuthorizeReviewRuntimeAction, requireAuthContext | — | `server/api/reviews/[reviewId]/checklist.get.ts` |
| PATCH | `/api/reviews/[reviewId]/checklist` | executeFreshAuthorizedReviewRuntimeWrite, requireAuthContext | ChecklistResponseEnvelopeSchema, readValidatedBodyI18n | `server/api/reviews/[reviewId]/checklist.patch.ts` |
| POST | `/api/reviews/[reviewId]/claim` | requireAuthContext, requireFreshAuthContext | — | `server/api/reviews/[reviewId]/claim.post.ts` |
| POST | `/api/reviews/[reviewId]/clone` | executeFreshAuthorizedReviewRuntimeWrite, requireAuthContext | — | `server/api/reviews/[reviewId]/clone.post.ts` |
| PATCH | `/api/reviews/[reviewId]/group` | requireAuthContext | Common_Review_Schema, PositivePostgresBigintIdSchema, readValidatedBodyI18n | `server/api/reviews/[reviewId]/group.patch.ts` |
| GET | `/api/reviews/[reviewId]/groups` | requireAuthContext | Common_Review_Schema | `server/api/reviews/[reviewId]/groups.get.ts` |
