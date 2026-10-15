# Review API

These requests support the reviews carried out on a file, including assessment answers, checklist answers and additional reviewers. They also support the agency definitions used to create those reviews. See [Runtime reviews](../../concepts/runtime-reviews.md) and [Proponent reviews](../../proponents/reviews.md).

An API is the set of requests the application sends to its server when you open or save a record. Officers normally use the screens; developers use this index to find the code behind them. The server checks access to protected records even when a screen shows an action as available.

- **Method**: `GET` reads information; `POST` usually creates a record or performs an action; `PATCH` and `PUT` save changes; `DELETE` removes a record. `ANY` delegates requests without a single method listed here.
- **Route**: the request address. Replace names in brackets, such as `[id]`, with the actual record ID.
- **Authorization landmarks**: names found in the source that help a developer locate access checks.
- **Validation landmarks**: names that help locate checks on submitted fields or query options.
- **Source**: the application file that handles the request. A handler is the code that receives and answers it.

This table is generated from source names. A dash (`—`) means no matching name was found; it does not prove there is no access or data check. A listed name may also be a field or comment, rather than a check. Developers must follow the handler and its shared helpers to confirm the rules, response and tests; the coverage ledger tracks that evidence.

## Read-only example

An authorized request for `GET /api/reviews/35/checklist` reads review 35’s checklist definition, saved answers and current review state. It does not save answers or complete the review. Any numbers shown are illustrative: use IDs for existing records you are allowed to read.

## Handlers (29)

| Method | Route | Authorization landmarks | Validation landmarks | Source |
| --- | --- | --- | --- | --- |
| GET | `/api/agency/[agencyId]/review-sets/[reviewSetId]/groups` | — | — | `server/api/agency/[agencyId]/review-sets/[reviewSetId]/groups.get.ts` |
| DELETE | `/api/agency/[agencyId]/review-sets/[reviewSetId]` | — | — | `server/api/agency/[agencyId]/review-sets/[reviewSetId]/index.delete.ts` |
| GET | `/api/agency/[agencyId]/review-sets/[reviewSetId]` | authorizeWithFreshAuthContext, requireFreshReadAuthContext | Common_Review_Schema | `server/api/agency/[agencyId]/review-sets/[reviewSetId]/index.get.ts` |
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
| GET | `/api/reviews/[reviewId]/additional-reviewers/lookups/groups` | requireAuthContext | GroupLookupQuerySchema, PaginationSchema, getValidatedQueryI18n | `server/api/reviews/[reviewId]/additional-reviewers/lookups/groups.get.ts` |
| GET | `/api/reviews/[reviewId]/additional-reviewers/lookups/users` | requireAuthContext | PaginationSchema, UserLookupQuerySchema, getValidatedQueryI18n | `server/api/reviews/[reviewId]/additional-reviewers/lookups/users.get.ts` |
| GET | `/api/reviews/[reviewId]/assessment` | canAuthorizeReviewRuntimeAction, requireAuthContext | AssessmentRuntimeSchema, Common_Review_Schema | `server/api/reviews/[reviewId]/assessment.get.ts` |
| PATCH | `/api/reviews/[reviewId]/assessment` | executeFreshAuthorizedReviewRuntimeWrite, requireAuthContext | AssessmentResponseSchema, readValidatedBodyI18n | `server/api/reviews/[reviewId]/assessment.patch.ts` |
| GET | `/api/reviews/[reviewId]/checklist` | canAuthorizeReviewRuntimeAction, requireAuthContext | — | `server/api/reviews/[reviewId]/checklist.get.ts` |
| PATCH | `/api/reviews/[reviewId]/checklist` | executeFreshAuthorizedReviewRuntimeWrite, requireAuthContext | ChecklistResponseEnvelopeSchema, readValidatedBodyI18n | `server/api/reviews/[reviewId]/checklist.patch.ts` |
| POST | `/api/reviews/[reviewId]/claim` | requireAuthContext, requireFreshAuthContext | — | `server/api/reviews/[reviewId]/claim.post.ts` |
| POST | `/api/reviews/[reviewId]/clone` | executeFreshAuthorizedReviewRuntimeWrite, requireAuthContext | — | `server/api/reviews/[reviewId]/clone.post.ts` |
| PATCH | `/api/reviews/[reviewId]/group` | requireAuthContext | Common_Review_Schema, PositivePostgresBigintIdSchema, readValidatedBodyI18n | `server/api/reviews/[reviewId]/group.patch.ts` |
| GET | `/api/reviews/[reviewId]/groups` | requireAuthContext | Common_Review_Schema | `server/api/reviews/[reviewId]/groups.get.ts` |
