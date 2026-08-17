# API hôte des extensions

Métadonnées de découverte, activation/configuration, répartition dynamique, contributions d’exécution et stockage d’extension.

Cet index généré constitue une table de navigation exhaustive, non une preuve indépendante du contrat. Pour chaque gestionnaire, le registre de couverture consigne les preuves directes requises sur l’autorisation, la validation, les aides, la base, la réponse, l’interface et les tests avant la vérification terminale. Les permissions clientes ne remplacent jamais l’autorisation serveur.

## Gestionnaires (10)

| Méthode | Route | Repères d’autorisation | Repères de validation | Source |
| --- | --- | --- | --- | --- |
| ANY | `/api/extensions/[extensionKey]/[...route]` | — | — | `server/api/extensions/[extensionKey]/[...route].ts` |
| GET | `/api/extensions/agency/[agencyId]` | — | — | `server/api/extensions/agency/[agencyId]/index.get.ts` |
| PATCH | `/api/extensions/agency/[agencyId]` | authorizeWithFreshAuthContext, requireFreshAuthContext | ExtensionToggleSchema, readValidatedBodyI18n | `server/api/extensions/agency/[agencyId]/index.patch.ts` |
| POST | `/api/extensions/agency/[agencyId]/migrations` | authorizeWithFreshAuthContext, requireFreshAuthContext | ExtensionMigrationRunSchema, readValidatedBodyI18n | `server/api/extensions/agency/[agencyId]/migrations.post.ts` |
| GET | `/api/extensions/create-actions` | — | CreateActionsQuerySchema, parseI18n | `server/api/extensions/create-actions/index.get.ts` |
| GET | `/api/extensions/entity-tabs` | getExtensionEntityAuthorizationSubject | EntityTabQuerySchema, parseI18n | `server/api/extensions/entity-tabs/index.get.ts` |
| GET | `/api/extensions/payment-amount-calculators` | — | PaymentAmountCalculatorsQuerySchema, parseI18n | `server/api/extensions/payment-amount-calculators/index.get.ts` |
| GET | `/api/extensions/runtime` | — | RuntimeSlotQuerySchema, parseI18n | `server/api/extensions/runtime/index.get.ts` |
| GET | `/api/extensions/streams/[streamId]` | — | — | `server/api/extensions/streams/[streamId]/index.get.ts` |
| PATCH | `/api/extensions/streams/[streamId]` | authorizeWithFreshAuthContext, requireFreshAuthContext | ExtensionStreamConfigurationSchema, readValidatedBodyI18n | `server/api/extensions/streams/[streamId]/index.patch.ts` |

## Contrats du registre et de configuration

`GET /api/extensions/agency/{agencyId}` exige la lecture de l'organisme et un organisme actif. Il rapproche les lignes d'activation actives avec tous les manifestes sûrs pour le client enregistrés à la compilation; les progiciels désactivés ou jamais configurés paraissent donc avec `enabled: false` et `{}`. L'enveloppe est `{ items, total, stats: { total, active }, page: 1, limit }`; le registre n'est pas réellement paginé malgré ces métadonnées.

`PATCH /api/extensions/agency/{agencyId}` exige la modification de l'organisme et `{ extensionKey, enabled, config? }`. La clé doit exister dans le registre de compilation. Dans une transaction, la route verrouille l'état d'autorisation et la portée de cycle de vie extension-organisme, verrouille et revérifie l'organisme actif, répète l'autorisation, exécute les migrations en attente avant une activation ou les gardes avant une désactivation, puis insère ou met à jour la ligne active. L'omission de `config` conserve la configuration existante. Une désactivation change aussi à `enabled: false` chaque configuration active d'un volet appartenant à l'organisme; elle ne supprime pas la configuration.

`POST /api/extensions/agency/{agencyId}/migrations` accepte `{ extensionKey }`, exige la modification de l'organisme et n'exécute l'extension que si elle demeure activée après le verrouillage du cycle de vie. La réponse est `{ extensionKey, results: [{ migrationName, direction, status }] }`. Une extension inconnue produit 404; une extension désactivée ou un échec de migration emploie un code stable et localisé de requête incorrecte. L'exception de migration sort de la transaction afin d'annuler une exécution partielle avant de retourner l'erreur stable.

`GET /api/extensions/streams/{streamId}` ne résout qu'un volet, un profil et un organisme propriétaire tous actifs, puis exige la lecture du programme de paiements de transfert à cette portée exacte. Il retourne seulement les extensions enregistrées à la compilation dont la ligne d'organisme est active et activée. Chaque élément contient le manifeste sûr pour le client, `agencyEnabled: true`, le commutateur de volet et sa configuration; une ligne de volet absente devient désactivée avec `{}`. Ces métadonnées de liste ne représentent pas non plus une pagination réelle.

`PATCH /api/extensions/streams/{streamId}` accepte `{ extensionKey, enabled, config }`; la configuration vaut `{}` par défaut et doit être compatible JSON. La route exige la modification du programme de paiements de transfert à la portée exacte, verrouille l'état d'autorisation et la portée extension-organisme-volet, résout de nouveau la propriété, répète l'autorisation, revérifie l'activation de l'organisme, exécute la garde d'activation ou de désactivation, puis insère ou met à jour. L'activation de Narrative Quality normalise une configuration sans cible en activant `agreementTopLevel`; les autres validations propres à une extension appartiennent au composant ou à la garde.

## Contrats de découverte des contributions

Toutes les requêtes de découverte utilisent l'analyse Zod tenant compte de la langue. Elles retournent volontairement une liste vide, et non 404, lorsqu'un identifiant facultatif est absent ou ne peut être résolu; une entité résolue mais inaccessible demeure soumise à l'autorisation de l'hôte.

| Point d'accès | Contrat exact |
| --- | --- |
| `GET /api/extensions/runtime` | Accepte l'une des sept valeurs d'emplacement, les valeurs facultatives `streamId`, `agencyId`, `applicantRecipientId`, `agreementId`, et `permissionAction` (`read` par défaut). La création d'une entente sans identifiant exige `agreement:create` sur le volet; une entente existante exige l'accès exact demandé et un volet correspondant. La création d'un demandeur-bénéficiaire exige un organisme et la création globale; un profil existant emploie son accès exact ou d'équipe et doit correspondre à l'organisme responsable fourni. Les éléments de volet exigent les deux commutateurs actifs; ceux d'organisme ou de demandeur-bénéficiaire exigent celui de l'organisme. Consultez la limite du résolveur `DOC-030`. |
| `GET /api/extensions/entity-tabs` | Accepte la cible `agreement`, `proponent`, `claim` ou `monitor` avec son identifiant propre. La route résout la chaîne de propriété active, autorise la lecture de l'entité (`applicant_recipient` pour un demandeur-bénéficiaire, `agreement` autrement), puis filtre chaque onglet selon l'activation, la cible et le contrôle d'accès déclarés et la présence d'un nom de composant produit. Réponse : `{ target, items }`. |
| `GET /api/extensions/create-actions` | Accepte l'opération `agreement.commitments.create` ou `agreement.payments.create` et `agreementId` facultatif. Elle exige la lecture visible de l'entente, les deux commutateurs, le contrôle d'accès de l'action et un composant enregistré. La réponse contient `conflict: true` et `EXTENSION_CREATE_OPERATION_CONFLICT` si plusieurs actions retournées ont le mode `replace`. |
| `GET /api/extensions/payment-amount-calculators` | Accepte seulement l'opération `agreement.payments.create` et `agreementId` facultatif; l'autorisation et l'activation suivent les actions de création. Plusieurs éléments produisent `conflict: true` et `EXTENSION_PAYMENT_AMOUNT_CALCULATOR_CONFLICT`. |

Les descripteurs retournés contiennent des métadonnées et un contexte sûrs pour le navigateur, jamais les chemins serveur ou de migration, racines de progiciel, capacités, secrets ou valeurs déchiffrées. Les noms de composants sont des clés stables du registre produit; l'interface les ignore si elle ne peut les résoudre.

## Répartiteur dynamique

La route générique appelle d'abord `authorize(event, 'system', 'read', { bypass: true })` : la dérogation évite d'exiger un rôle système, mais établit quand même un contexte hôte authentifié. Elle fait ensuite correspondre l'extension enregistrée, la méthode HTTP exacte et un motif de segments littéraux ou dynamiques de même longueur. Des identifiants absents produisent `MISSING_IDS`; aucune correspondance produit `EXTENSION_ROUTE_NOT_FOUND`.

Pour une route déclarant un contrôle d'accès hôte, le répartiteur exige exactement une cible d'organisme, de volet ou d'entité. Il résout la propriété active, vérifie l'activation et la paire sujet-action déclarée, puis injecte seulement la configuration et le contexte applicables. Une incohérence de sujet d'entité échoue de façon fermée. Les routes d'organisme reçoivent `{}`; celles de volet et d'entité autre qu'un demandeur-bénéficiaire reçoivent la configuration persistée du volet; un demandeur-bénéficiaire reçoit `{}` après l'activation de l'organisme.

Le contexte reçoit aussi la visibilité des ententes de l'hôte et, pour les routes avec contrôle d'accès, un protocole d'autorisation d'écriture. L'ordre transactionnel obligatoire est :

1. `lockAuthState(trx)` dans la même transaction;
2. les verrous de cycle de vie extension-organisme-volet, puis les verrous d'extension ou d'entité requis;
3. `authorizeCurrentScope(trx)` (ou l'alias de compatibilité `authorizeCurrentEntity`);
4. les lectures et écritures protégées;
5. pour une entente sélectionnée, `lockAndAuthorizeAgreement(trx, ...)` avant sa modification.

Le rappel d'entente retourne `false` si l'entente est absente ou inactive ou si son volet diffère, et lève une erreur en cas de refus d'autorisation. Une route utilisant `auth: "manual"` ne reçoit ni contrôle d'accès injecté ni protocole d'écriture : seule l'authentification est automatique, et l'extension assume toutes les vérifications d'autorisation, de propriété active, d'activation, de verrouillage et de validation.

Avant l'appel, le répartiteur superpose les paramètres résolus et le contexte authentifié; un bloc `finally` restaure les deux. `GcsExtensionUserError` est traduit dans la langue de la requête avec son code stable et ses détails localisés. Les autres exceptions ne sont pas présentées comme des erreurs utilisateur.

## Frontière de compilation et de migration

L'analyseur de compilation parcourt les répertoires d'extension en ordre lexical et valide l'identité privée du progiciel, l'unicité des clés et noms, la compatibilité du SDK, les capacités déclarées ou déduites, les chemins réels confinés, les paramètres des routes de contrôle d'accès, les libellés bilingues, identifiants, opérations, ressources et identités de migration. Il produit séparément les métadonnées client sûres, le registre de composants et le registre serveur avec des métadonnées épurées et des imports différés analysables statiquement. Les chemins et capacités réservés au serveur ne passent jamais dans le manifeste client.

L'historique de migration est isolé par extension au moyen d'une clé épurée et hachée. `runExtensionMigrations` ne charge que les modules de migration enregistrés ayant des exports `up` et `down` valides et exécute les travaux en attente. Au démarrage, le module de migration appelle `runEnabledExtensionMigrations`, qui sélectionne les clés activées pour au moins un organisme actif; une extension installée mais désactivée n'est pas migrée automatiquement.
