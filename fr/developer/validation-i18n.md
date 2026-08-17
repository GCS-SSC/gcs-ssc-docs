# Validation, localisation et erreurs d’API

La localisation de l’interface, les données métier bilingues et la validation des requêtes constituent des contrats distincts.

Nuxt emploie des routes préfixées en anglais et en français. Le détecteur choisit d’abord le témoin de langue, ensuite l’entrée prise en charge ayant la meilleure qualité dans `Accept-Language` (l’ordre de l’en-tête tranche les égalités), puis l’anglais. Les clés d’interface résident dans `i18n/locales/en.json` et `fr.json` avec les mêmes paramètres. Les valeurs persistantes comme `name_en` et `name_fr` sont des données gérées par les utilisateurs; les aides bilingues les affichent au lieu de les copier dans les fichiers de langue.

Les schémas Zod partagés émettent des clés stables `validation.*`. Utilisez `{ error: 'validation.key' }` de Zod 4 pour les règles et `message: 'validation.key'` pour `ctx.addIssue`. Un schéma raffiné conserve une base non raffinée avant de dériver les contrats de création et de modification partielle.

Les formulaires clients lient `useZodI18n().createValidator(schema)` à `UForm`. Le validateur asynchrone traduit les problèmes et renvoie `{ name, message }`, où `name` est le chemin de champ joint par des points. Les paramètres bilingues tels que `question_en` et `question_fr` sont choisis selon la langue active.

Les gestionnaires serveur valident les données non fiables avec `readValidatedBodyI18n`, `getValidatedQueryI18n` ou `parseI18n`. Un échec Zod renvoie le code HTTP 400, le code machine `VALIDATION_FAILED` et des entrées `data.details` localisées contenant le chemin, le message et le code du problème. Les autres échecs attendus passent par les aides localisées et des codes machine stables. `useApiErrorToast` affiche le message déjà localisé par le serveur; le client ne doit pas le traduire de nouveau.

Toute nouvelle clé doit exister dans les deux langues avec les mêmes paramètres d’interpolation. Les tests doivent couvrir le code machine, l’état HTTP, le chemin de champ, les paramètres et les deux résultats linguistiques lorsque la langue influence le comportement.
