# Validation, localisation et erreurs d’API

Cette page explique comment les développeurs rendent les formulaires et les erreurs utilisables en français et en anglais. Pour un agent, le résultat concret est un formulaire qui identifie les champs obligatoires, explique une valeur refusée dans la langue de l’interface choisie et conserve le sens des renseignements métier bilingues.

La localisation de l’interface traduit les boutons, libellés et messages. Les données métier bilingues sont des contenus saisis séparément, comme les noms français et anglais d’une possibilité. La validation des requêtes vérifie si une valeur soumise est permise. Il s’agit de contrats distincts.

Nuxt emploie des routes préfixées en anglais et en français. Le détecteur choisit d’abord le témoin de langue, ensuite l’entrée prise en charge ayant la meilleure qualité dans `Accept-Language` (l’ordre de l’en-tête tranche les égalités), puis l’anglais. Les clés d’interface résident dans `i18n/locales/en.json` et `fr.json` avec les mêmes paramètres. Les valeurs persistantes comme `name_en` et `name_fr` sont des données gérées par les utilisateurs; les aides bilingues les affichent au lieu de les copier dans les fichiers de langue.

Les schémas Zod partagés émettent des clés stables `validation.*`. Utilisez `{ error: 'validation.key' }` de Zod 4 pour les règles et `message: 'validation.key'` pour `ctx.addIssue`. Un schéma raffiné conserve une base non raffinée avant de dériver les contrats de création et de modification partielle.

Les formulaires clients lient `useZodI18n().createValidator(schema)` à `UForm`. Le validateur asynchrone traduit les problèmes et renvoie `{ name, message }`, où `name` est le chemin de champ joint par des points. Les paramètres bilingues tels que `question_en` et `question_fr` sont choisis selon la langue active.

Les gestionnaires serveur valident les données non fiables avec `readValidatedBodyI18n`, `getValidatedQueryI18n` ou `parseI18n`. Un échec Zod renvoie le code HTTP 400, le code machine `VALIDATION_FAILED` et des entrées `data.details` localisées contenant le chemin, le message et le code du problème. Les autres échecs attendus passent par les aides localisées et des codes machine stables. `useApiErrorToast` affiche le message déjà localisé par le serveur; le client ne doit pas le traduire de nouveau.

Toute nouvelle clé doit exister dans les deux langues avec les mêmes paramètres d’interpolation. Les tests doivent couvrir le code machine, l’état HTTP, le chemin de champ, les paramètres et les deux résultats linguistiques lorsque la langue influence le comportement.

## Texte, identifiants et modifications partielles

Validez les limites de stockage avant l’écriture. Les libellés d’agence, noms de flux, noms de types de pièces jointes, noms de schémas de recommandation et noms de résultats ou d’indicateurs de programme acceptent au plus 255 points de code Unicode là où leurs schémas appliquent cette limite. Comptez avec `Array.from(value).length`; la longueur d’une chaîne JavaScript compte les unités UTF-16. Les schémas de texte concernés et les recherches de pagination partagées refusent NUL (`\u0000`) avec `validation.invalid_text_character`. Ne retirez pas silencieusement les caractères invalides. Les noms de types de pièces jointes refusent une valeur uniquement composée d’espaces, mais conservent les espaces d’un texte non vide.

Utilisez les identifiants bigint PostgreSQL positifs canoniques pour les sélections comme les utilisateurs/groupes par défaut d’une étape d’approbation et l’agence facultative d’un identifiant financier de demandeur ou bénéficiaire. Gardez les identifiants comme texte décimal. Le sélecteur de configurations de possibilité valide chaque identifiant de `stream_ids`, séparés par des virgules; un libellé plausible ne valide pas la requête API.

L’ordre de création des examens et recommandations doit tenir dans un `smallint` signé (−32 768 à 32 767). Un ordre fourni vide, null ou fractionnaire est invalide. La création intégrée d’un schéma de recommandation garde sa plage plus étroite de 1 à 32 767. La publication exige toujours sa séquence consécutive à partir de 1; accepter un ordre en brouillon ne rend pas le plan publiable.

L’omission dans un PATCH doit conserver les valeurs enregistrées. Retirez les valeurs par défaut de création avant de rendre les booléens facultatifs : Actif du programme ou des limites financières du volet, exigence de sous-type de modification, politique d’échec d’un membre d’examen et indicateurs de cumul/partage des coûts d’un type de financement ne changent que s’ils sont fournis. Un `false` explicite reste une modification. Un PATCH de flux contenant seulement les états de départ permis modifie ces relations sans lancer une mise à jour vide de l’en-tête. Les clients transmettent seulement les champs modifiables d’un membre d’examen, en conservant son groupe par défaut et en excluant les métadonnées de réponse.

Les modifications de modèle d’approbation refusent les identifiants de ligne fournis en double dans les étapes, les certifications de chaque étape et les certifications d’approbation additionnelle, y compris les lignes marquées supprimées. Un identifiant de certification fourni doit appartenir à une ligne active de son étape parente. Réordonner ou échanger les noms conserve les identifiants des lignes gardées; les certifications omises deviennent un historique supprimé logiquement. La transaction du modèle complet annule toutes les modifications en cas d’échec.

Les modifications des catalogues d’agence traduisent `PublicationLifecycleConflictError` seulement après le rejet de la transaction, en renvoyant un HTTP 409 localisé avec le code de publication stable. Conservez les autres erreurs de base de données et d’autorisation. Les métadonnées d’un flux restent lisibles lorsque sa définition de travail contient une erreur reconnue de validation de publication, afin que l’administrateur puisse la corriger et la republier.

## Champs requis et contrôles accessibles

Par exemple, un agent qui saisit une possibilité doit savoir que les deux noms linguistiques sont obligatoires avant l’enregistrement. L’indication obligatoire doit décrire le vrai champ de nom; saisir du texte dans la recherche d’un sélecteur de volet ne rend pas ce texte de recherche obligatoire comme donnée métier. L’implémentation ci-dessous maintient la cohérence entre ces exigences et la validation.

Le module `form-requirements` enveloppe les formulaires et contrôles Nuxt UI de l’hôte et du SDK. `UForm` conserve le schéma Zod associé à `createValidator`; `UFormField` résout son chemin nommé et ajoute une indication localisée lorsque le schéma prouve que le champ est requis. Les formulaires imbriqués et tableaux doivent nommer le vrai chemin du schéma; utilisez `useFormFieldPath` pour composer un éditeur enfant.

Un `:required` explicite remplace l’inférence. Utilisez-le pour une exigence conditionnelle non déductible, avec exactement la condition de validation. Un champ facultatif ou doté d’une valeur par défaut n’est pas requis simplement parce que sa colonne interdit null. La recherche et les filtres d’un sélecteur ne doivent pas hériter de l’exigence du choix lui-même.

```vue
<UForm :state="state" :validate="createValidator(schema)">
  <UFormField name="email" :label="t('common.email')">
    <UInput v-model="state.email" type="email" />
  </UFormField>
</UForm>
```

Avec un schéma de courriel requis, cela fournit l’indication visible et la sémantique du contrôle interactif. Les sélecteurs composites, segments de date et groupes ont besoin du même libellé et de la même description accessibles. Conservez `aria-describedby` pour les instructions de groupe avec les erreurs; une couleur ou un astérisque seul ne suffit pas. Les contrôles désactivés ou en lecture seule n’annoncent pas d’exigence modifiable. Le formulaire utilise `novalidate` pour laisser la validation localisée de l’application faire autorité.

`forms:inventory` inventorie les déclarations; `forms:audit` décrit les contrats inférés et explicites, et `forms:check` refuse les décisions non résolues. Documentez les exceptions justifiées dans les dossiers privés `architecture/form-field-contracts`, avec motif et preuve source; ne supprimez pas le contrôle d’un composant entier pour un seul champ dynamique.

Les messages d’interface d’extension utilisent les catalogues propres au paquet `defineGcsExtensionMessages` et `useExtensionI18n(messages)`, avec clés bilingues et paramètres identiques. Ils n’accèdent pas librement aux clés de traduction de l’hôte. Consultez [Création d’extensions](./extensions-authoring.md).

## Contrôles monétaires exacts et traductions proposées

Par exemple, un agent qui saisit un montant de réclamation de 1 250,50 doit enregistrer exactement cette valeur monétaire, même lorsque l’interface anglaise affiche des séparateurs de milliers et de décimales différents. Lorsqu’une traduction est proposée pour une description bilingue, l’agent doit encore vérifier le brouillon et l’enregistrer; la proposition n’est pas une modification métier approuvée ou enregistrée.

Utilisez `CommonCurrencyInput` et `formatMoneyText` sans conversion numérique avec la devise propriétaire. Conservez brouillons vides/invalides, charges décimales exactes, groupement localisé et deux décimales. Ne convertissez pas les montants faisant autorité en `Number` ni en contrôle uniquement numérique. Les enfants financiers enregistrés doivent respecter la devise immuable de l’entente.

Les champs bilingues d’extension reçoivent sujet/action explicites et modèles de langue actifs. Une proposition modifie le brouillon sans contourner obligation, longueur maximale, accès ni enregistrement. Les questionnaires conservent zéro/faux et valident la définition figée à la soumission. Voir [Bilinguisme](../concepts/bilingualism.md) et [Collectes de données](../concepts/data-collections.md).
