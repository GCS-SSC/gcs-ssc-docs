# Architecture

L application source est une application Nuxt 4 monopage avec routes API serveur, schemas TypeScript partages, acces base de donnees Kysely, Better Auth, Nuxt UI, Nuxt i18n et un module local d extensions.

## Structure de l espace de travail

- `app/pages` contient les pages de route.
- `app/components` contient les composants UI partages et metier.
- `app/composables` contient l etat client, l autorisation, les tables, formulaires et aides de flux.
- `app/utils` contient les routes, statuts, client auth et aides de recherche.
- `server/api` contient les points de terminaison H3.
- `server/utils` contient autorisation, flux, base de donnees et extensions.
- `server/database/migrations` contient le schema et les donnees semees.
- `shared/types` et `shared/utils` contiennent schemas, contrats partages, regles RBAC, portees et aides cross-runtime.
- `modules/gcs-extensions.ts` construit le runtime d extension.
- `packages/gcs-ssc-extensions` publie les points d entree publics du SDK `@gcs-ssc/extensions` utilises par les paquets d extension.

## Modeles frontend

Les pages de liste utilisent souvent `useResourceTable` et les composants de disposition de ressource. Les pages detail utilisent souvent `CommonEntityHero` pour l en-tete repliable, les onglets de route avec `useRouteTabMap` et les aides de route de `app/utils/route-locations.ts`. Les formulaires de creation et mise a jour utilisent les schemas Zod partages avec `useZodI18n`.

L UI sensible aux permissions utilise `useAuth` et `useCan`. `useAuth` charge la reponse canonique `{ grants }` depuis `/api/auth/permissions`, valide chaque permission statique et expose `authorize`, `authorizeGrant` et `hasAbility`. L acces exact d une equipe a un promoteur ou a une entente est retourne par les API d entite plutot qu ajoute a cette liste de permissions statiques.

## Modeles serveur

Les routes serveur lisent les corps et requetes valides avec des aides i18n, autorisent avec `authorize` et accedent a la base via `event.context.$db`. Les aides de route resolvent la portee depuis les dossiers cibles avant l autorisation. La suppression logique est realisee en mettant `_deleted`.

## Écritures protégées et concurrence

Certaines écritures à forte concurrence visant les engagements, prévisions, réclamations, rapprochements et surveillances renouvellent l’autorisation dans la transaction de base de données avant toute écriture. Ces transactions verrouillent, dans un ordre déterministe, le graphe d’autorisations de l’utilisateur, les portées du cycle de vie des extensions, les parents actifs et les lignes de l’agrégat. Après toute attente de verrou, l’écriture relit le propriétaire, l’état actif, le statut du flux et la portée avant d’appliquer les changements.

Les chemins renforcés de mutation des parents et de leurs enregistrements enfants utilisent des verrous d’agrégat afin qu’une suppression du parent, une mutation d’un enfant, un achèvement et une transition d’approbation ne puissent pas s’entrecroiser et laisser un état partiel. Les suppressions demeurent logiques et mettent à jour l’agrégat et ses dépendances dans une seule transaction. Les tests d’intégration PostgreSQL couvrent l’ordre des écritures protégées et des chemins représentatifs de nouvelle validation; consultez [Tests](./testing.md#agregat-postgresql-manuel).

## Architecture RBAC

La logique RBAC partagee se trouve dans `shared/utils/abilities.ts`, `shared/utils/scopes.ts` et `shared/utils/role-scope.ts`. La resolution serveur est dans `server/utils/rbac.ts` et `server/utils/authorize.ts`. Les memes concepts sont refletes cote client par `useAuth` et `useCan`.

## Architecture admin

Commun est pilote par la configuration d app et la configuration serveur. La configuration d app definit champs et onglets UI. La configuration serveur mappe les ressources vers tables, schemas, transformations, colonnes de recherche et filtres. Les onglets d administration d agence sont des composants Vue normaux appuyes par des routes API portees par agence.

## Architecture extensions

Le module d extension decouvre les definitions et genere les metadonnees. Les utilitaires serveur chargent les gestionnaires et resolvers d execution par Jiti. Activation d agence, configuration de volet, configuration de volet pleine page, onglets d entite, emplacements d execution, gestionnaires serveur, actions de creation, calculateurs, migrations, stockage cle-valeur et secrets chiffres sont tous medies par l hote.

Les paquets d extension devraient utiliser le paquet public `@gcs-ssc/extensions` au lieu des chemins internes de l hote. Ses points d entree sont :

| Point d entree | Utilite |
| --- | --- |
| `@gcs-ssc/extensions` | Types de manifeste, types JSON, emplacements, metadonnees resolues et `defineGcsExtension`. |
| `@gcs-ssc/extensions/server` | Aides de routes serveur, migrations, hooks de creation, KV, erreurs et secrets chiffres. |
| `@gcs-ssc/extensions/ui` | Wrappers UI hote, client API d extension, client API hote et composables UI. |
| `@gcs-ssc/extensions/testing` | Stubs de runtime et aides pour tests autonomes d extension. |
| `@gcs-ssc/extensions/nuxt` | Declarations Nuxt ambiantes facultatives pour les paquets d extension. |

## Architecture bilingue

Nuxt i18n utilise des routes prefixees et des fichiers JSON de langue. Les modeles stockent souvent des colonnes anglaises et francaises explicites. Les validations et erreurs API utilisent des cles traduites la ou l utilisateur les voit.
