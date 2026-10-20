# Génération de documents

La génération de documents remplit un modèle anglais ou français du volet avec les données de l'entente et conserve le fichier obtenu. Les agents choisissent le modèle, la langue et le format de sortie. Des administrateurs de confiance préparent les modèles. Les développeurs maintiennent les services de rendu et de stockage décrits ci-dessous. Les étapes pour les utilisateurs et les cinq contrats de route API sont décrits dans [Documents d'entente](../agreements/documents.md).

Par exemple, un agent peut générer une entente de contribution après avoir vérifié son bénéficiaire et son budget. Le fichier conservé reflète les données utilisées lors de sa génération. Les changements ultérieurs à l'entente ne le mettent pas à jour automatiquement. Si l'entente change, générez un nouveau document lorsque le processus le permet.

## Pipeline d'exécution

La route de génération vérifie d'abord l'accès et capture les données de l'entente. Elle trouve le modèle actif exact et le format demandé, puis charge le fichier du modèle dans la langue choisie depuis son fournisseur de stockage enregistré. Elle prépare les données dans cette langue et effectue le rendu du modèle. Le rendu se fait hors de la transaction d'écriture de l'entente pour éviter que la conversion du document garde cette transaction ouverte.

Une limite locale au processus autorise deux rendus concurrents par paire organisme/utilisateur; les requêtes supplémentaires reçoivent `429 DOCUMENT_RENDER_BUSY`. Après le rendu, une courte transaction d'écriture de l'entente vérifie de nouveau l'accès, y compris la portée, l'affectation et le cycle de vie. Elle verrouille le modèle sélectionné et ses pièces jointes linguistiques, puis compare les empreintes SHA-256 des données principales et des métadonnées du modèle avec celles du rendu. Si l'une des empreintes a changé, la requête renvoie `409 DOCUMENT_RENDER_INPUT_CHANGED` et ne conserve pas la sortie périmée. Actualisez et recommencez une fois les modifications terminées.

Par exemple, si quelqu'un change le budget pendant la génération d'un PDF, cette vérification empêche le système de conserver un document basé sur le budget précédent.

La persistance écrit un objet chez le fournisseur et insère la pièce commune et le document généré dans la transaction protégée. La fonction de suivi enregistre l'identité du fournisseur et le localisateur avant l'insertion des métadonnées. Si la transaction échoue, la route attend son annulation, puis tente de supprimer l'objet avec la connexion principale à la base. Un échec de suppression crée une tâche durable de nettoyage du stockage. Si cette récupération échoue aussi, l'hôte journalise l'échec. Le stockage externe et la validation de la base restent des opérations distinctes.

## Rendu et frontière de confiance

Le traitement DOCX normalise les balises à doubles accolades dans `word/*.xml`, puis utilise Docxtemplater avec boucles de paragraphes, sauts de ligne, recherche dans les portées parentes et valeur de remplacement localisée. Le traitement HTML accepte les substitutions pointées et une forme de boucle de collection, et échappe toute valeur substituée.

La conversion HTML vers PDF démarre un navigateur Puppeteer sans interface, désactive JavaScript dans la page et interrompt les requêtes sauf `data:` et `about:`. DOCX vers PDF utilise `libreoffice-convert`; `LIBREOFFICE_SOFFICE_PATH` remplace l'enveloppe `scripts/soffice-flatpak` du dépôt. Un échec de conversion devient l'erreur localisée `LIBREOFFICE_UNAVAILABLE`. LibreOffice dispose de 30 secondes. Chromium partage un budget de rendu de 30 secondes entre ses étapes, avec une limite distincte de deux secondes pour le nettoyage, plutôt qu'un délai complet renouvelé à chaque étape.

Le HTML natif conserve le balisage du modèle, et Puppeteer démarre avec `--no-sandbox`. Déployez le service dans l'environnement conteneurisé décrit dans la documentation, avec un utilisateur non privilégié. Réservez la gestion des modèles aux administrateurs de confiance.

## Contrat de contexte

Le **contexte** est l'ensemble des valeurs nommées qu'un modèle peut insérer. Un chemin à points identifie une valeur; par exemple, `budget.fiscalYearCount` est le nombre d'exercices financés du budget. Les clés de premier niveau stables comprennent actuellement `agreement`, `agency`, `program`, `stream`, `recipient`, `budget`, `activities`, `outcomes`, `expectedOutcomes`, `commitments`, `payments`, `claims` et `forecasts`. Les valeurs absentes deviennent `To be confirmed` ou `A confirmer`; les dates deviennent `YYYY-MM-DD` en format ISO et les montants utilisent le formatage CAD localisé.

Le contexte intégré ne fournit pas d'objet `department`; les chemins de ministère non résolus reçoivent la valeur de remplacement localisée. `recipient.primary` est le premier bénéficiaire lié selon son identifiant, avec la première adresse active trouvée pour lui. Les auteurs de modèles doivent tenir compte de ces deux limites.

L'utilitaire appelle dans l'ordre les fonctions présentes dans `event.context.documentGenerationContextProviders` et fusionne récursivement leurs résultats. Aucun module, plugiciel hôte ni extension installée actuelle n'enregistre cette propriété. Il s'agit d'un point d'intégration interne propre à l'événement. Ce n'est pas une capacité déclarée du SDK d'extension. Si une intégration hôte autorisée fournit des fonctions, les dernières remplacent les valeurs scalaires et les tableaux et fusionnent récursivement les objets. Elles remplissent les données de rendu hors de la transaction finale d'écriture et peuvent faire échouer la requête.

## Conditions Word et champs personnalisés

Une condition Word inclut un passage seulement si son test est vrai. Par exemple, le premier bloc ci-dessous ajoute une exigence de rapport annuel seulement lorsque le budget couvre plus d'un exercice; le deuxième liste les postes budgétaires proposés seulement si la modification possède un instantané de budget. DOCX accepte des sections conditionnelles à accolades simples ou doubles, y compris des balises réparties sur les segments de mise en forme Word. Utilisez `#if expression` et `/if`; les conditions fonctionnent dans le corps, les en-têtes et les boucles de tableaux existantes.

Les comparaisons numériques acceptent `=`, `!=`, `>`, `>=`, `<`, `<=`; l'égalité accepte aussi les chaînes ou booléens de même type. Combinez avec `and`, `or` et des parenthèses (`and` est prioritaire).

Les conditions exigent des chemins vers des valeurs scalaires et des valeurs littérales : aucun JavaScript, opérateur d'appartenance à un tableau, conversion implicite, `==`, condition imbriquée ou `else`. Un opérande absent ou null donne un résultat faux. Des types incompatibles produisent une erreur. Une expression ne peut s'étendre sur plusieurs lignes et se limite à 2 048 caractères.

```text
{#if budget.fiscalYearCount > 1}
Présentez un rapport annuel pour chaque exercice financé.
{/if}
{#if amendment.hasBudgetSnapshot = true}
{#amendment.budget.lineItems}{description}{/amendment.budget.lineItems}
{/if}
```

Comparez les valeurs numériques du contexte, pas des chaînes monétaires formatées. Les propriétés de mise en forme et de numérotation survivent au retrait du contenu conditionnel. HTML conserve son contrat de substitution et de boucles et n'évalue pas les blocs Word `#if`. Une syntaxe, un bloc ou un type invalide renvoie `DOCUMENT_CONDITION_INVALID` localisé avec l'expression. Corrigez et téléversez les deux langues du modèle, puis régénérez le document.

Les champs personnalisés enregistrés figurent dans `agreement.customFields.{fieldId}` comme texte de la langue du document et dans les entrées ordonnées `agreement.customFieldEntries` `{ id, name, value }`. `agreement.customFieldValues.{fieldId}` conserve les valeurs numériques et textuelles brutes et les identifiants d'options relationnelles (tableau pour sélection multiple), utilisables dans les conditions scalaires prises en charge. Les champs vides sont omis. Les options inactives conservées résolvent leurs libellés, et les libellés manquants utilisent le remplacement normal. Avant le rendu, l'hôte vérifie que les valeurs relationnelles enregistrées sont des tableaux. Une valeur scalaire renvoie `500 AGREEMENT_CUSTOM_FIELDS_INVALID` et exige une réparation par un administrateur. Utilisez les identifiants stables, pas les libellés traduits, comme clés.

```text
{#agreement.customFieldEntries}{name}: {value}
{/agreement.customFieldEntries}
{#if agreement.customFieldValues.42 >= 10}
Des rapports supplémentaires sont exigés.
{/if}
```

42 illustre l'identifiant d'un champ numérique d'agence; remplacez-le par celui réellement affecté. La condition ne fonctionne pas pour un champ texte ou à sélection multiple.

## Contexte et routes de modification

Les documents de modification utilisent `/api/agreements/{id}/amendments/{amendmentId}/document-templates`, `/documents`, `/documents/generate` et les routes de téléchargement/suppression `/documents/{documentId}`. Le corps reste `{ templateId, language, outputFormat }`. Le système vérifie l'autorisation de lire l'entente parente avant l'autorisation de modifier la modification exacte. La transaction finale protégée revérifie le cycle de vie et le hachage du contexte principal complet du parent et de la proposition. Un rendu périmé renvoie `DOCUMENT_RENDER_INPUT_CHANGED`.

Dans un document de modification, distinguez l'entente existante des changements proposés. Le contexte de premier niveau reste celui du parent courant. `amendment` ajoute `id`, `number`, `name`, `status`, `isOpen`, les `types`, `subtypes`, `typeIds`, `subtypeIds` sélectionnés, `proposedStartDate`/`proposedEndDate` nullables, `hasBudgetSnapshot`, `hasActivitySnapshot` et les propositions `budget`, `activities`, `outcomes`, `expectedOutcomes`. Les clés de risque sont `changeRisk`, `applyRisk`, `proposedRiskScore`, `proposedRiskRating` localisé et `risk` versionné. Après soumission, elles utilisent le risque capturé du dossier exact; les anciens dossiers conservent l'absence de section de risque.

Par exemple, utilisez `amendment.proposedEndDate` lorsque le modèle doit afficher la date de fin proposée; une valeur au niveau de l'entente décrit toujours l'entente parente actuelle.

La ligne générée porte `egcs_fc_amendment` nullable. Sa contrainte composite la lie à la même entente et interdit une portée Clôture simultanée. Listes et recherches de téléchargement/suppression imposent la portée exacte. Les suffixes de noms utilisent le numéro de modification ou son identifiant stable pour un brouillon non numéroté. Consultez [Documents d'entente](../agreements/documents.md) pour le parcours utilisateur.

## Stockage et dossiers

`writeStoredFile` assainit les segments du nom d'objet proposé, crée ou réutilise un type de pièce de l'organisme et délègue les octets au fournisseur sélectionné. La pièce conserve l'identifiant du fournisseur, l'identité opaque de l'objet, le localisateur JSON réservé au serveur, le type MIME, la taille, le nom original, les métadonnées bilingues et la date. `Funding_Case_Agreement_Generated_Document` lie l'entente, le modèle, la pièce produite, la langue et le format.

Chaque document conservé mémorise l'endroit où son fichier est stocké. La lecture et la suppression utilisent ce fournisseur enregistré, pas la sélection courante de l'agence pour les nouveaux fichiers. Aucun repli local n'existe. Les informations d'authentification, la durabilité des objets et l'infrastructure relèvent de la configuration du fournisseur. Conservez toutes les implémentations et tous les objets référencés avec la sauvegarde de base.

Par exemple, choisir un nouveau fournisseur de stockage pour l'agence ne déplace pas les anciens documents. L'ancien fournisseur doit rester disponible pour les télécharger.

La suppression retire le dossier généré et sa pièce, puis tente le nettoyage externe. Un échec est journalisé sans restaurer les métadonnées. Le téléchargement exige la relation active exacte accessible et renvoie les en-têtes de type MIME, nom et taille enregistrés. Ces documents sont distincts de la liste des [Pièces jointes](../concepts/attachments.md) téléversées manuellement.

## Outils locaux

Sous Linux ou WSL, installez les outils de conversion propres au dépôt depuis la racine de l'application :

```bash
bun run bun:docgen:install
bun run dev
```

L'installateur met à jour `LIBREOFFICE_SOFFICE_PATH` et `PUPPETEER_CACHE_DIR` dans le fichier Nuxt `.env` ordinaire. Définissez `DOCGEN_ENV_FILE=.env.production` seulement pour viser volontairement un autre fichier d'environnement. Consultez [Démarrage pour les développeurs](./startup.md) et [Déploiement pour l'exploitation](../operator/deployment.md).
