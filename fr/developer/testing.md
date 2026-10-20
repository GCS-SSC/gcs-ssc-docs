# Tests

Utilisez ces commandes pour vérifier les changements de GCS-SSC. Les tests couvrent notamment l’affectation d’un agent, les restrictions d’accès aux dossiers d’une autre agence et la soumission d’un examen.

Vitest exécute les tests unitaires de la logique applicative. Playwright exécute les tests de bout en bout de tâches complètes dans un navigateur. Construisez le site après les modifications documentaires pour détecter les problèmes de métadonnées de page, de liens ou de Markdown.

Les tests et ressources d’architecture proviennent du sous-module privé figé `tooling/gcs-ssc`. `bun run tooling:setup` l’initialise et crée les liens ignorés `tests`, `architecture` et de compétence; ne recopiez pas les suites privées dans le dépôt hôte.

## Commandes de l application

Depuis `gcs-ssc` :

```bash
bun run lint
bun run typecheck
bun run test:unit
bun run test:coverage
# Nécessite la variable AGREEMENT_CONCURRENCY_POSTGRES_TEST_URL décrite ci-dessous.
bun run test:integration:postgres
bun run test:e2e
bun run test:e2e:light
bun run test:e2e:light:spec tests/e2e/auth.spec.ts
bun run quality:pr
```

`bun run test` exécute les suites unitaires et de bout en bout. `test:all:manual` exécute aussi l’analyse statique, la vérification des types, la couverture, l’agrégat PostgreSQL facultatif et les tests de bout en bout.

L’intégration continue automatique des demandes de tirage n’est pas configurée. Exécutez `quality:pr` comme vérification locale obligatoire. Cette commande consigne le diff de la branche et effectue les vérifications suivantes :

- Analyse statique et vérification des types de l’hôte.
- Compilation du SDK et vérification des types de toutes les extensions.
- Vérification de l’artéfact de production sur les hôtes POSIX non racines pris en charge.
- Suites unitaires et de couverture de l’hôte.
- Suites unitaires et de couverture des fournisseurs de stockage local et S3.

Exécutez les suites PostgreSQL facultatives et les tests Playwright de bout en bout séparément lorsque le changement dépend du verrouillage réel de la base ou d’une interaction dans le navigateur. `quality:pr` ne les exécute pas.

`lint` exécute les contrôles de politique d’interface bilingue et de noms de base de données avant ESLint. `typecheck` utilise l’outil privé sous le verrou des artefacts Nuxt.

`test:unit` et `test:coverage` vérifient d’abord les champs requis avec `forms:check` et le contenu d’aide guidée avec `guided-help:check`. Ces commandes exécutent aussi la suite unitaire ou de couverture du paquet d’aide guidée avant la suite hôte.

`test:e2e`, `test:e2e:pglite` et `test:e2e:light` exécutent la suite PGlite ordinaire, puis chaque scénario du groupe de cycle de vie dans un processus neuf distinct. `test:e2e:fast` répartit la suite ordinaire en huit partitions exécutées en série avant le même groupe isolé. Un `--spec` exact ou `E2E_SPEC` choisit l’outil du fichier. Un `--shard` explicite choisit une partition ordinaire sans les scénarios de cycle de vie, donc une couverture partielle. Les filtres comme `--grep` exigent un fichier exact. Tout échec fait échouer l’agrégat.

Les suites ciblées couvrent les pièces jointes, statuts d’organisme, actualisations et modifications d’entente, clôtures, recommandations, configurations de flux retirées et réinitialisations. Utilisez le script `:spec` correspondant pour choisir un fichier. `test:all:manual` comprend la séquence configurée, le groupe autonome de réinitialisation, les tests PostgreSQL de navigateur par fichier et le scénario de profil d’extension.

### Vérification des artefacts de production

Sur un hôte POSIX non racine, utilisez les commandes ciblées suivantes lorsque vous modifiez la compilation, le stockage, le démarrage de la base de données, les migrations, les ressources d’extension ou l’empaquetage de déploiement :

```bash
bun run quality:artifact
bun run quality:webcontainer
```

`quality:artifact` produit une nouvelle compilation de production, migre une base de données vide sans données de démonstration, restaure l’exportation d’administration empaquetée, vérifie la priorité des URL de base de données et confirme que la sortie déployée fonctionne depuis une arborescence d’artefacts en lecture seule. Cette commande n’est pas prise en charge sous Windows ni avec l’UID 0, car ces environnements ne permettent pas de valider la limite d’autorisations POSIX requise.

`quality:webcontainer` installe le binaire Chromium correspondant à Playwright, compile le serveur autonome et prépare une charge utile WebContainer sans fichiers sources. Chromium vérifie le wrapper généré et le comportement de montage avec un environnement WebContainer simulé ; un test de fumée Node distinct démarre le serveur reconstruit sans fichiers sources. L’installation du navigateur télécharge Chromium lorsqu’il n’est pas déjà en cache.

### Agrégat PostgreSQL manuel

La suite de concurrence nécessite la sémantique réelle de PostgreSQL et est volontairement exclue de l’intégration continue automatique des demandes de tirage. Configurez une URL explicite dont le nom de base de données se termine par `_test`, puis exécutez l’agrégat :

```bash
AGREEMENT_CONCURRENCY_POSTGRES_TEST_URL=postgresql://localhost/gcs_ssc_test \
bun run test:integration:postgres
```

La suite principale de concurrence des ententes utilise la base de données jetable réservée `*_test`. Les dépôts d’extension possèdent leurs suites PostgreSQL et leurs préalables. Puisque `test:all:manual` appelle l’agrégat principal, la variable doit être définie avant l’exécution de la vérification manuelle complète.

## Zones couvertes par les tests

La couverture pertinente inclut :

- Vérification de connexion et protection des routes.
- Fonctions partagées d’autorisation côté client.
- Utilitaires d’autorisation côté serveur.
- Cas limites du contrôle d’accès et validation de la portée des rôles.
- Cycle de vie des permissions cumulatives de rôle.
- RBAC des rôles structurels et des affectations exactes d’entité.
- Gestion des agences et contrôle d’accès par agence.
- Catalogue GWCOA, accès Audit, références d’organisme, formulaires et validation localisée.
- Routes demandeur/bénéficiaire, onglets associés, affectations aux dossiers, examens en cours et contrôle d’accès.
- Activation des extensions par agence, configuration des volets, emplacements d’exécution, onglets d’entité, répartition serveur, migrations et SDK.
- Ordre de l’autorisation des écritures protégées et des verrous du cycle de vie sous concurrence PostgreSQL.
- Fonctionnement bilingue et messages d’erreur et de validation traduits.

## Choisir les tests pour admin/RBAC

Pour les rôles ou utilisateurs, exécutez les tests autour de `rbac`, `role-scope`, `roles-routes`, `users-routes`, `use-auth`, `use-can`, `use-role-modal-state`, ainsi que les tests de navigateur d’affectation de rôle et de refus selon la portée.

Pour les changements d’agence, exécutez les tests des routes, schémas, recherches, gestion et accès propres aux agences.

Pour les promoteurs, exécutez les tests d’autorisation demandeur/bénéficiaire, des routes, affectations, onglets associés et examens, ainsi que les tests de navigateur demandeur/bénéficiaire.

Pour GWCOA et Audit, choisissez les tests dédiés des routes, schémas, accès et pages touchés. Pour les pièces jointes partagées, incluez les compensations de fournisseur, le nettoyage et la récupération des métadonnées.

Par exemple, modifier les règles d’affectation des promoteurs peut changer le droit d’un agent à modifier un dossier. Vérifiez les tests unitaires d’affectation et d’autorisation, puis un test de navigateur qui confirme qu’un agent affecté peut agir et qu’un agent non affecté reçoit un refus. RBAC désigne le contrôle d’accès fondé sur les rôles : il combine les rôles, leur portée autorisée et les affectations requises aux dossiers.

## Commandes docs

Depuis ce dépôt de documentation :

```bash
bun run docs:build
bun run docs:dev
```

Après une construction, vérifiez quelques pages anglaises et françaises pour confirmer la correspondance des titres et l’absence de références à des captures devenues obsolètes.
