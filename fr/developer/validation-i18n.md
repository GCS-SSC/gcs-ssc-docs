# Validation, localisation et erreurs d’API

La localisation de l’interface, les données métier bilingues et la validation des requêtes constituent des contrats distincts.

Nuxt emploie des routes préfixées en anglais et en français. Le détecteur choisit d’abord le témoin de langue, ensuite l’entrée prise en charge ayant la meilleure qualité dans `Accept-Language` (l’ordre de l’en-tête tranche les égalités), puis l’anglais. Les clés d’interface résident dans `i18n/locales/en.json` et `fr.json` avec les mêmes paramètres. Les valeurs persistantes comme `name_en` et `name_fr` sont des données gérées par les utilisateurs; les aides bilingues les affichent au lieu de les copier dans les fichiers de langue.

Les schémas Zod partagés émettent des clés stables `validation.*`. Utilisez `{ error: 'validation.key' }` de Zod 4 pour les règles et `message: 'validation.key'` pour `ctx.addIssue`. Un schéma raffiné conserve une base non raffinée avant de dériver les contrats de création et de modification partielle.

Les formulaires clients lient `useZodI18n().createValidator(schema)` à `UForm`. Le validateur asynchrone traduit les problèmes et renvoie `{ name, message }`, où `name` est le chemin de champ joint par des points. Les paramètres bilingues tels que `question_en` et `question_fr` sont choisis selon la langue active.

Les gestionnaires serveur valident les données non fiables avec `readValidatedBodyI18n`, `getValidatedQueryI18n` ou `parseI18n`. Un échec Zod renvoie le code HTTP 400, le code machine `VALIDATION_FAILED` et des entrées `data.details` localisées contenant le chemin, le message et le code du problème. Les autres échecs attendus passent par les aides localisées et des codes machine stables. `useApiErrorToast` affiche le message déjà localisé par le serveur; le client ne doit pas le traduire de nouveau.

Toute nouvelle clé doit exister dans les deux langues avec les mêmes paramètres d’interpolation. Les tests doivent couvrir le code machine, l’état HTTP, le chemin de champ, les paramètres et les deux résultats linguistiques lorsque la langue influence le comportement.

## Champs requis et contrôles accessibles

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
