# Architecture

Cette page s’adresse aux développeurs qui maintiennent l’application ou créent des extensions. Les agents n’ont pas besoin de ces détails techniques pour gérer un dossier de financement. Elle explique où effectuer une modification et comment l’application protège les dossiers enregistrés.

L’application source est une application Nuxt 4 monopage avec des routes API serveur, des schémas TypeScript partagés, un accès à la base de données par Kysely, Better Auth, Nuxt UI, Nuxt i18n et un module local d’extensions.

Le navigateur affiche les formulaires et les listes; les routes serveur valident les demandes et appliquent les permissions; la base de données conserve les dossiers. Les schémas partagés donnent au navigateur et au serveur les mêmes règles pour les champs.

Par exemple, lorsqu’un agent enregistre un contact de promoteur, la page transmet les coordonnées saisies à une route serveur. Le serveur valide les champs, vérifie le rôle de l’agent et son affectation à ce promoteur, puis enregistre ensemble le contact et son association. Un bouton de modification visible est donc une aide; le serveur décide toujours si le changement est permis.

## Structure de l espace de travail

- `app/pages` contient les pages de route.
- `app/components` contient les composants d’interface partagés et métier.
- `app/composables` contient l’état client et les outils d’autorisation, de tableaux, de formulaires et de flux.
- `app/utils` contient les outils de routes, de statuts, de client d’authentification et de recherche.
- `server/api` contient les points de terminaison H3.
- `server/utils` contient les outils d’autorisation, de flux, de base de données et d’extensions.
- `server/database/migrations` contient les migrations de schéma et les données initiales.
- `shared/types` et `shared/utils` contiennent les schémas, contrats partagés, règles RBAC, portées et outils communs au client et au serveur.
- `modules/gcs-extensions.ts` construit l’environnement d’exécution des extensions.
- `packages/gcs-ssc-extensions` publie les points d’entrée publics du SDK `@gcs-ssc/extensions` utilisés par les paquets d’extension.

## Modeles frontend

Les listes utilisent tableaux partagés, recherche et filtres de statut adjacents. Les détails composent `CommonDetailPage`, `CommonDetailWorkspace` et `CommonDetailSection` avec propriété explicite de disposition, section dans l’URL et focus mobile; `CommonEntityHero` fournit le contexte parent. Les détails d’extension d’entente utilisent le même cadre. Les formulaires conservent la validation Zod partagée par `useZodI18n`. `@gcs-ssc/diagrams` fournit les modèles de flux et le rendu Vue partagés des diagrammes de flux et de formulaires Portail.

L’interface utilisateur sensible aux permissions utilise `useAuth` et `useCan`. `useAuth` charge la réponse canonique `{ grants }` depuis `/api/auth/permissions`, valide chaque permission statique et expose `authorize`, `authorizeGrant` et `hasAbility`. Les permissions statiques constituent le plafond cumulatif du rôle. La modification d’une entité affectable existante exige séparément une ligne exacte dans `Common_Entity_Assignment`; ce registre est renvoyé par les API d’entité plutôt que d’être ajouté à la liste des permissions statiques.

## Modeles serveur

Les routes serveur valident les corps et paramètres des demandes avec des outils adaptés à la langue, vérifient les permissions avec `authorize` et accèdent à la base par `event.context.$db`. Les outils de route déterminent la portée à partir des dossiers visés avant de vérifier l’autorisation. La suppression logique marque `_deleted` pour retirer un dossier des listes actives sans effacer son historique.

## Écritures protégées et concurrence

Certaines écritures à forte concurrence visant les engagements, prévisions, réclamations, rapprochements et surveillances renouvellent l’autorisation dans la transaction de base de données avant toute écriture. Ces transactions verrouillent, dans un ordre déterministe, le graphe d’autorisations de l’utilisateur, les portées du cycle de vie des extensions, les parents actifs et les lignes de l’agrégat. Après toute attente de verrou, l’écriture relit le propriétaire, l’état actif, le statut du flux et la portée avant d’appliquer les changements.

Les chemins renforcés de mutation des parents et de leurs enregistrements enfants utilisent des verrous d’agrégat afin qu’une suppression du parent, une mutation d’un enfant, un achèvement et une transition d’approbation ne puissent pas s’entrecroiser et laisser un état partiel. Les suppressions demeurent logiques et mettent à jour l’agrégat et ses dépendances dans une seule transaction. Les tests d’intégration PostgreSQL couvrent l’ordre des écritures protégées et des chemins représentatifs de nouvelle validation; consultez [Tests](./testing.md#agrégat-postgresql-manuel).

## Architecture RBAC

La logique RBAC partagée se trouve dans `shared/utils/abilities.ts`, `shared/utils/scopes.ts` et `shared/utils/role-scope.ts`. La résolution serveur se trouve dans `server/utils/rbac.ts` et `server/utils/authorize.ts`. Les mêmes concepts sont appliqués côté client par `useAuth` et `useCan`.

## Architecture admin

GWCOA possède une interface globale dédiée et les routes `/api/admin/gwcoa`. La lecture exige `system:read` global; le navigateur d’audit exige séparément `audit:read` global ou d’agence. Les routes du catalogue d’agence possèdent les définitions réutilisables de flux et d’examens; les routes du volet gèrent leurs liens et affectations locales. Les actions métier créent les enregistrements d’exécution, sans CRUD administratif générique.

## Architecture extensions

Le module d’extensions découvre les définitions et génère les métadonnées. Les utilitaires serveur chargent les gestionnaires et résolveurs par le registre généré de modules serveur. L’application hôte encadre l’activation par agence, la configuration de volet, les pages complètes de configuration de volet, les onglets d’entité, les emplacements d’exécution, les gestionnaires serveur, les actions de création, les calculateurs, les migrations, le stockage clé-valeur et les secrets chiffrés.

Les paquets d’extension devraient utiliser le paquet public `@gcs-ssc/extensions` au lieu des chemins internes de l’hôte. Ses points d’entrée sont :

| Point d’entrée | Utilité |
| --- | --- |
| `@gcs-ssc/extensions` | Types de manifeste, types JSON, emplacements, métadonnées résolues et `defineGcsExtension`. |
| `@gcs-ssc/extensions/server` | Outils de routes serveur, migrations, hooks de création, KV, erreurs et secrets chiffrés. |
| `@gcs-ssc/extensions/ui` | Composants d’interface hôte, client API d’extension, client API hôte et composables d’interface. |
| `@gcs-ssc/extensions/testing` | Simulations d’exécution et outils pour les tests autonomes d’extension. |
| `@gcs-ssc/extensions/nuxt` | Déclarations Nuxt ambiantes facultatives pour les paquets d’extension. |

## Architecture bilingue

Nuxt i18n utilise des routes préfixées par la langue et des fichiers JSON de traduction. Les modèles stockent souvent des colonnes anglaises et françaises distinctes. Les validations et erreurs API utilisent des clés traduites au moment de leur affichage à l’utilisateur.

## Frontières du stockage et des preuves

La base conserve les métadonnées métier, identités de fournisseur et localisateurs; les extensions de stockage enregistrées possèdent les octets. Les mutations de pièces jointes revérifient l’autorisation exacte et le cycle de vie; des tâches durables compensent les opérations externes qui ne peuvent participer à la transaction. Les documents générés utilisent aussi la façade de fournisseurs. Consultez [Pièces jointes](../concepts/attachments.md) et [Travaux en arrière-plan](../operator/background-work.md).

Les déclencheurs d’audit transactionnels capturent les modifications validées. Les accès HTTP utilisent une file distincte en mémoire et bornée, avec des garanties de durabilité différentes. Le démarrage termine les migrations centrales et des extensions activées, les contrôles de fournisseurs et la préparation d’Audit avant le trafic API ordinaire. Les modules différés s’activent ensuite et L1 propose le travail récurrent borné. Les services de lecture financière et d’imputation restent liés aux portées autorisées par l’hôte. Voir [Modèle de données](./data-model.md) et [Création d’extensions](./extensions-authoring.md).
