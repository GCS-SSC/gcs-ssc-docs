# API des bénéficiaires demandeurs

Ces requêtes servent aux profils des promoteurs : les organisations ou personnes qui demandent ou reçoivent un financement. Elles servent aussi aux contacts, adresses, historiques de financement, examens et liens vers les ententes. Consultez les [promoteurs](../../proponents/index.md).

Cet index associe les requêtes serveur aux fichiers qui les traitent. Les guides liés expliquent les étapes à l'écran. Le serveur vérifie l'accès aux dossiers protégés même si un écran propose une action.

- La méthode indique le type de requête. `GET` lit des renseignements. `POST` crée généralement un dossier ou exécute une action. `PATCH` et `PUT` enregistrent des modifications. `DELETE` retire un dossier. `ANY` signifie que le nom du fichier ne déclare aucune méthode unique.
- La route est l'adresse de la requête. Remplacez les noms entre crochets, comme `[id]`, par l'identifiant réel du dossier.
- Les noms d'autorisation et de validation sont des correspondances trouvées dans le code du gestionnaire. Ils aident à repérer les vérifications d'accès et celles des champs soumis ou des options de requête.
- La source est le fichier de l'application qui traite la requête.

Un tiret dans les colonnes de noms signifie que le générateur ne trouve aucun nom correspondant. Il ne prouve pas l'absence de vérification. Un nom indiqué peut provenir d'un champ ou d'un commentaire. Suivez le gestionnaire et ses fonctions partagées pour confirmer les règles d'accès, la validation et les réponses. Le registre de couverture consigne les preuves correspondantes.

## Exemple de lecture seule

Une requête autorisée `GET /api/applicant-recipients/27` lit le profil du promoteur 27, y compris ses noms légaux et usuels. Elle ne crée pas d’entente pour ce promoteur. Les identifiants sont des exemples. Utilisez des dossiers existants que vous avez le droit de consulter.

## Gestionnaires (44)

| Méthode | Route | Noms d'autorisation | Noms de validation | Source |
| --- | --- | --- | --- | --- |
| DELETE | `/api/applicant-recipients/[id]` | executeFreshAuthorizedApplicantRecipientWrite, resolveApplicantRecipientAuthorization | — | `server/api/applicant-recipients/[id].delete.ts` |
| GET | `/api/applicant-recipients/[id]` | authorizeWithFreshAuthContext, requireFreshAuthContext | — | `server/api/applicant-recipients/[id].get.ts` |
| PATCH | `/api/applicant-recipients/[id]` | resolveApplicantRecipientAuthorization | — | `server/api/applicant-recipients/[id].patch.ts` |
| GET | `/api/applicant-recipients/[id]/account-receivables` | — | — | `server/api/applicant-recipients/[id]/account-receivables/index.get.ts` |
| DELETE | `/api/applicant-recipients/[id]/addresses/[childId]` | executeFreshAuthorizedApplicantRecipientWrite, requireAuthContext, resolveApplicantRecipientAuthorization | — | `server/api/applicant-recipients/[id]/addresses/[childId].delete.ts` |
| PATCH | `/api/applicant-recipients/[id]/addresses/[childId]` | executeFreshAuthorizedApplicantRecipientWrite, resolveApplicantRecipientAuthorization | ApplicantRecipientAddressPatchSchema, CommonAddressSubdivisionSchema, parseI18n, readValidatedBodyI18n | `server/api/applicant-recipients/[id]/addresses/[childId].patch.ts` |
| GET | `/api/applicant-recipients/[id]/addresses` | requireAuthContext, resolveApplicantRecipientAuthorization | PaginationSchema, getValidatedQueryI18n | `server/api/applicant-recipients/[id]/addresses/index.get.ts` |
| POST | `/api/applicant-recipients/[id]/addresses` | executeFreshAuthorizedApplicantRecipientWrite, resolveApplicantRecipientAuthorization | ApplicantRecipientAddressCreateSchema, readValidatedBodyI18n | `server/api/applicant-recipients/[id]/addresses/index.post.ts` |
| DELETE | `/api/applicant-recipients/[id]/agency-financial-ids/[childId]` | executeFreshAuthorizedApplicantRecipientWrite, requireAuthContext, resolveApplicantRecipientAuthorization | — | `server/api/applicant-recipients/[id]/agency-financial-ids/[childId].delete.ts` |
| PATCH | `/api/applicant-recipients/[id]/agency-financial-ids/[childId]` | requireAuthContext, resolveApplicantRecipientAuthorization | — | `server/api/applicant-recipients/[id]/agency-financial-ids/[childId].patch.ts` |
| GET | `/api/applicant-recipients/[id]/agency-financial-ids/[childId]/uses` | requireAuthContext, resolveApplicantRecipientAuthorization | QuerySchema, getValidatedQueryI18n | `server/api/applicant-recipients/[id]/agency-financial-ids/[childId]/uses.get.ts` |
| GET | `/api/applicant-recipients/[id]/agency-financial-ids` | requireAuthContext, resolveApplicantRecipientAuthorization | PaginationSchema, getValidatedQueryI18n | `server/api/applicant-recipients/[id]/agency-financial-ids/index.get.ts` |
| POST | `/api/applicant-recipients/[id]/agency-financial-ids` | executeFreshAuthorizedApplicantRecipientWrite, resolveApplicantRecipientAuthorization | ApplicantRecipientAgencyFinancialIdCreateSchema, readValidatedBodyI18n | `server/api/applicant-recipients/[id]/agency-financial-ids/index.post.ts` |
| GET | `/api/applicant-recipients/[id]/agency-financial-ids/lookups/agencies` | requireAuthContext, resolveApplicantRecipientAuthorization | AuthorizationQuerySchema, PaginationSchema, PositivePostgresBigintIdSchema, QuerySchema, SelectedAgencyQuerySchema, getValidatedQueryI18n | `server/api/applicant-recipients/[id]/agency-financial-ids/lookups/agencies.get.ts` |
| DELETE | `/api/applicant-recipients/[id]/contacts/[childId]` | executeFreshAuthorizedApplicantRecipientWrite, requireAuthContext, resolveApplicantRecipientAuthorization | — | `server/api/applicant-recipients/[id]/contacts/[childId].delete.ts` |
| PATCH | `/api/applicant-recipients/[id]/contacts/[childId]` | executeFreshAuthorizedApplicantRecipientWrite, requireAuthContext, resolveApplicantRecipientAuthorization | ApplicantRecipientContactPatchSchema, readValidatedBodyI18n | `server/api/applicant-recipients/[id]/contacts/[childId].patch.ts` |
| GET | `/api/applicant-recipients/[id]/contacts` | requireAuthContext, resolveApplicantRecipientAuthorization | PaginationSchema, getValidatedQueryI18n | `server/api/applicant-recipients/[id]/contacts/index.get.ts` |
| POST | `/api/applicant-recipients/[id]/contacts` | executeFreshAuthorizedApplicantRecipientWrite, requireAuthContext, resolveApplicantRecipientAuthorization | ApplicantRecipientContactCreateSchema, readValidatedBodyI18n | `server/api/applicant-recipients/[id]/contacts/index.post.ts` |
| GET | `/api/applicant-recipients/[id]/credit-memos` | — | — | `server/api/applicant-recipients/[id]/credit-memos/index.get.ts` |
| GET | `/api/applicant-recipients/[id]/financial-summary` | — | — | `server/api/applicant-recipients/[id]/financial-summary/index.get.ts` |
| DELETE | `/api/applicant-recipients/[id]/funding-history/[historyId]` | authorizeWithFreshAuthContext, requireFreshAuthContext, resolveApplicantRecipientAuthorization | — | `server/api/applicant-recipients/[id]/funding-history/[historyId].delete.ts` |
| PATCH | `/api/applicant-recipients/[id]/funding-history/[historyId]` | authorizeWithFreshAuthContext, requireAuthContext, requireFreshAuthContext, resolveApplicantRecipientAuthorization | FundingHistoryExternalCreateSchema, FundingHistoryExternalPatchSchema, parseI18n, readValidatedBodyI18n | `server/api/applicant-recipients/[id]/funding-history/[historyId].patch.ts` |
| POST | `/api/applicant-recipients/[id]/funding-history/[historyId]/recipients` | authorizeWithFreshAuthContext, requireAuthContext, requireFreshAuthContext, resolveApplicantRecipientAuthorization | BodySchema, readValidatedBodyI18n | `server/api/applicant-recipients/[id]/funding-history/[historyId]/recipients.post.ts` |
| DELETE | `/api/applicant-recipients/[id]/funding-history/[historyId]/recipients/[recipientId]` | authorizeWithFreshAuthContext, requireFreshAuthContext, resolveApplicantRecipientAuthorization | — | `server/api/applicant-recipients/[id]/funding-history/[historyId]/recipients/[recipientId].delete.ts` |
| GET | `/api/applicant-recipients/[id]/funding-history` | authorizeWithFreshAuthContext, egcs_fc_authorizedassistanceenddate, egcs_fc_authorizedassistancestartdate, requireFreshAuthContext, resolveApplicantRecipientAuthorization | AssignedListViewSchema, PaginationSchema, getValidatedQueryI18n | `server/api/applicant-recipients/[id]/funding-history/index.get.ts` |
| POST | `/api/applicant-recipients/[id]/funding-history` | authorizeWithFreshAuthContext, requireAuthContext, requireFreshAuthContext, resolveApplicantRecipientAuthorization | FundingHistoryExternalCreateSchema, readValidatedBodyI18n | `server/api/applicant-recipients/[id]/funding-history/index.post.ts` |
| GET | `/api/applicant-recipients/[id]/funding-history/lookups/recipients` | requireAuthContext, resolveApplicantRecipientAuthorization | PaginationSchema, QuerySchema, getValidatedQueryI18n | `server/api/applicant-recipients/[id]/funding-history/lookups/recipients.get.ts` |
| POST | `/api/applicant-recipients/[id]/funding-history/similarity` | requireAuthContext, resolveApplicantRecipientAuthorization | FundingHistoryIdentityBaseSchema, SimilaritySchema, readValidatedBodyI18n | `server/api/applicant-recipients/[id]/funding-history/similarity.post.ts` |
| DELETE | `/api/applicant-recipients/[id]/notes/[noteId]` | — | — | `server/api/applicant-recipients/[id]/notes/[noteId].delete.ts` |
| PATCH | `/api/applicant-recipients/[id]/notes/[noteId]` | — | — | `server/api/applicant-recipients/[id]/notes/[noteId].patch.ts` |
| GET | `/api/applicant-recipients/[id]/notes` | — | — | `server/api/applicant-recipients/[id]/notes/index.get.ts` |
| POST | `/api/applicant-recipients/[id]/notes` | — | — | `server/api/applicant-recipients/[id]/notes/index.post.ts` |
| GET | `/api/applicant-recipients/[id]/notes/lookups/agencies` | requireAuthContext | PaginationSchema, QuerySchema, getValidatedQueryI18n | `server/api/applicant-recipients/[id]/notes/lookups/agencies.get.ts` |
| DELETE | `/api/applicant-recipients/[id]/other-names/[childId]` | executeFreshAuthorizedApplicantRecipientWrite, requireAuthContext, resolveApplicantRecipientAuthorization | — | `server/api/applicant-recipients/[id]/other-names/[childId].delete.ts` |
| PATCH | `/api/applicant-recipients/[id]/other-names/[childId]` | executeFreshAuthorizedApplicantRecipientWrite, requireAuthContext, resolveApplicantRecipientAuthorization | ApplicantRecipientOtherNamePatchSchema, readValidatedBodyI18n | `server/api/applicant-recipients/[id]/other-names/[childId].patch.ts` |
| GET | `/api/applicant-recipients/[id]/other-names` | requireAuthContext, resolveApplicantRecipientAuthorization | PaginationSchema, getValidatedQueryI18n | `server/api/applicant-recipients/[id]/other-names/index.get.ts` |
| POST | `/api/applicant-recipients/[id]/other-names` | executeFreshAuthorizedApplicantRecipientWrite, resolveApplicantRecipientAuthorization | ApplicantRecipientOtherNameCreateSchema, readValidatedBodyI18n | `server/api/applicant-recipients/[id]/other-names/index.post.ts` |
| DELETE | `/api/applicant-recipients/[id]/registries/[childId]` | executeFreshAuthorizedApplicantRecipientWrite, requireAuthContext, resolveApplicantRecipientAuthorization | — | `server/api/applicant-recipients/[id]/registries/[childId].delete.ts` |
| PATCH | `/api/applicant-recipients/[id]/registries/[childId]` | executeFreshAuthorizedApplicantRecipientWrite, requireAuthContext, resolveApplicantRecipientAuthorization | ApplicantRecipientRegistryCreateSchema, ApplicantRecipientRegistryPatchSchema, parseI18n, readValidatedBodyI18n | `server/api/applicant-recipients/[id]/registries/[childId].patch.ts` |
| GET | `/api/applicant-recipients/[id]/registries` | requireAuthContext, resolveApplicantRecipientAuthorization | PaginationSchema, getValidatedQueryI18n | `server/api/applicant-recipients/[id]/registries/index.get.ts` |
| POST | `/api/applicant-recipients/[id]/registries` | executeFreshAuthorizedApplicantRecipientWrite, requireAuthContext, resolveApplicantRecipientAuthorization | ApplicantRecipientRegistryCreateSchema, readValidatedBodyI18n | `server/api/applicant-recipients/[id]/registries/index.post.ts` |
| GET | `/api/applicant-recipients` | — | ApplicantRecipientPaginationSchema, AssignedListViewSchema, PaginationSchema, PositivePostgresBigintIdSchema, getValidatedQueryI18n | `server/api/applicant-recipients/index.get.ts` |
| POST | `/api/applicant-recipients` | requireAuthContext | ApplicantRecipientProfileSchema, readValidatedBodyI18n | `server/api/applicant-recipients/index.post.ts` |
| GET | `/api/applicant-recipients/lookups/agencies` | requireAuthContext | PaginationSchema, PositivePostgresBigintIdSchema, QuerySchema, getValidatedQueryI18n | `server/api/applicant-recipients/lookups/agencies.get.ts` |
