# Contrats API

## Champs personnalisés des activités

Les routes de volet sous `/api/transfer-payments/[id]/streams/[streamId]/activity-custom-fields` gèrent les affectations aux activités dans le programme propriétaire. GET renvoie `items` et un tableau `sections` vide. Les écritures exigent le droit de modifier le volet. Une affectation à une activité ne peut pas comporter de section. Obtenez les définitions de l’entente via `GET /api/agreements/[id]/activities/lookups/custom-fields` avec `permission_action` à `read`, `create` ou `update`. Fournissez `amendment_id` dans une modification.

La création et la modification d’une activité acceptent `egcs_fc_customfields`, indexé par identifiant de champ d’agence. PATCH fusionne les clés fournies avec l’objet enregistré. Les définitions numériques acceptent les champs nuls `egcs_ay_minimum`, `egcs_ay_maximum` et `egcs_ay_decimalplaces`.

## Texte bilingue des activités et des lignes budgétaires

Le nom, la description et les résultats attendus d’une activité exigent chacun du texte dans au moins une langue. La même règle s’applique à la sous-section et à la description d’une ligne budgétaire. Les champs anglais des lignes budgétaires restent `egcs_fc_costsubsection` et `egcs_fc_description`. Leurs équivalents français sont `egcs_fc_costsubsection_fr` et `egcs_fc_description_fr`. À la création, les traductions omises deviennent des chaînes vides. Pour effacer une traduction par PATCH sur une entente ou une modification, envoyez une chaîne vide et conservez une valeur non vide dans la paire après la fusion avec les champs enregistrés.

## Numéro du système financier de l’entente

`POST /api/agreements` et `PATCH /api/agreements/[id]` acceptent le champ facultatif `egcs_fc_financialsystemnumber`. Envoyez un entier bigint positif ou nul sous forme de texte décimal. Lors d’un PATCH, un champ omis conserve la valeur enregistrée sauf si un fournisseur en attribue une nouvelle, et `null` demande de l’effacer. `GET /api/agreements/number-mode?streamId=…` renvoie la règle de création dans `financialNumberPolicy`. Pour les utilisateurs autorisés à modifier le profil, le détail de l’entente renvoie la règle de modification ou `financialNumberPolicyUnavailable: true` si la règle ne peut être déterminée.

Les codes HTTP 409 sont `AGREEMENT_FINANCIAL_NUMBER_REQUIRED`, `AGREEMENT_FINANCIAL_NUMBER_READ_ONLY` et `AGREEMENT_FINANCIAL_NUMBER_PROVIDER_INVALID`. L’activation d’une extension pour l’agence renvoie `AGREEMENT_FINANCIAL_NUMBER_PROVIDER_CONFLICT` lorsqu’un autre fournisseur est déjà activé.

## Création de réclamations et de paiements

`POST /api/agreements/[id]/claims` et `POST /api/agreements/[id]/payments` vérifient l’approbation initiale de l’entente dans la transaction d’écriture autorisée. L’entente doit avoir une révision `0` conservée liée à sa soumission d’approbation initiale et à une exécution de flux pour cette entente dans l’état `succeeded` ou `approved`. En l’absence de cette preuve, le serveur renvoie HTTP 409 avec le code `AGREEMENT_INITIAL_APPROVAL_REQUIRED` avant de créer le dossier. Réessayez après la réussite du flux d’approbation initiale.

## Aide aux champs de l'agence

La liste des aides exige `help:read` pour l'agence demandée et renvoie `items`, les cibles disponibles dans `targets` et les capacités dans `capabilities`. POST, PATCH et DELETE exigent respectivement `help:create`, `help:update` et `help:delete`. POST et PATCH acceptent l'objet complet. Fournissez `egcs_ay_targetkey` (500 caractères maximum), les deux champs de texte (4 000 caractères maximum chacun) et le booléen `egcs_ay_enabled`. Une entrée activée exige un texte non vide dans les deux langues. Une nouvelle cible doit être enregistrée. Si elle appartient à une extension, celle-ci doit être activée pour l'agence. La liste indique les cibles indisponibles et les extensions désactivées. Une cible active en double dans l'agence entraîne une réponse 409. DELETE retire l'entrée et renvoie `{ success: true }`.

## Révisions de catalogue et aide aux champs à l'exécution

`GET /api/catalog-versions` exige une session active et renvoie `accountId`, `sessionId` et `agencies`, qui associe chaque identifiant d'agence aux révisions visibles de ses groupes de catalogue. La réponse utilise `Cache-Control: no-store`. Les droits de lecture existants et les affectations d'approbation précises déterminent les révisions visibles. Le point d'accès renvoie seulement les métadonnées de révision. L'identifiant de session désigne l'enregistrement de session en base.

`GET /api/field-tooltips/runtime` accepte `entityType` et `entityId`. Pour un formulaire de création, l'identifiant désigne le volet ou la possibilité choisie. Pour un dossier existant, il désigne le dossier demandé. Le serveur vérifie l'accès à ce contexte et détermine l'agence. Il renvoie `agencyId` et les entrées activées et disponibles sous la forme `{ targetKey, text: { en, fr } }`. Si un contexte pris en charge n'a pas d'agence propriétaire, il renvoie un identifiant d'agence nul et une liste vide.

## Configuration des courriels d'approbation

La route GET du fournisseur de notifications exige `agency:read` dans l'agence. Elle renvoie `selectedProvider` et les fournisseurs enregistrés avec leurs indicateurs d'activation et de sélection. PATCH exige `agency:delete` dans la même agence et accepte `{ providerKey }`. Le fournisseur doit être enregistré, activé pour l'agence et réussir la validation de sa configuration. Un fournisseur inconnu entraîne une réponse 404, un fournisseur désactivé ou une configuration invalide entraîne une réponse 409, et un fournisseur indisponible entraîne une réponse 503. La route GET des notifications du volet exige `transfer_payment:read` dans la portée du volet et renvoie les définitions prises en charge dans `notifiers`.

## Espace de travail de l'approbateur affecté

`GET /api/workflows/approval-runtime` exige `purpose=approval_submission` et un droit d'accès à l'élément d'approbation précis pour l'entité demandée. Si fourni, `runtimeId` doit correspondre à l'étape d'approbation autorisée. La réponse expose la soumission conservée et son étape d'approbation source. Les autres collections du flux sont vides et les capacités de changement d'état sont à false. Un objet de flux invalide, un droit absent ou un identifiant d'exécution non correspondant entraîne une réponse 403.

## Relations entre ententes

`GET /api/agreements/[id]/related-agreements` liste les liens dans les deux sens après avoir autorisé la lecture de l'entente du chemin. Le sommaire de l'entente liée comprend le numéro, le titre bilingue, le programme, le volet, le type de relation et la description. L'ouverture de l'entente liée exige sa propre autorisation de lecture.

POST exige `egcs_fc_relatedagreement` et `egcs_fc_relationshiptype`. PATCH exige le type et conserve les deux identifiants d'entente. Les deux acceptent `egcs_fc_description` jusqu'à 255 caractères. Omettez la description dans PATCH pour la conserver, ou envoyez une chaîne vide ou la valeur null pour l'effacer. La création vérifie de nouveau l'accès en lecture à la cible. Les permissions d'écriture et l'affectation concernent l'entente du chemin. Le type et les deux ententes doivent appartenir à la même agence.

`DUPLICATE_AGREEMENT_RELATIONSHIP` indique un lien actif pour la paire, quel que soit le sens. `INVALID_AGREEMENT_RELATIONSHIP` indique une cible ou un type inadmissible. DELETE marque la relation comme supprimée dans les deux listes et conserve les deux dossiers d'entente.
