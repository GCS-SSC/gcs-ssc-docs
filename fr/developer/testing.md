# Tests

Cette page s’adresse aux développeurs qui vérifient les changements de GCS-SSC. Les agents de subventions et de contributions n’ont pas à exécuter ces commandes dans leur travail quotidien. Les tests protègent notamment l’affectation d’un agent, les restrictions d’accès aux dossiers d’une autre agence et la soumission d’un examen.

Vitest vérifie des éléments individuels de logique applicative (tests unitaires). Playwright vérifie des tâches complètes dans un navigateur (tests de bout en bout). Construisez le site après les modifications documentaires pour détecter les problèmes de métadonnées de page, de liens ou de Markdown.

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

L’intégration continue automatique des demandes de tirage n’est pas configurée. Les contributeurs exécutent `quality:pr` comme vérification locale de référence : elle consigne le diff de la branche, exécute l’analyse statique et la vérification des types, compile le SDK d’extensions, vérifie l’artefact de production sur les hôtes POSIX non racines pris en charge et exécute les suites unitaires et de couverture de l’hôte, la vérification des types des extensions et les suites unitaires/couverture des fournisseurs de stockage local et S3. Elle n’exécute pas les suites PostgreSQL facultatives ni les tests Playwright de bout en bout ; exécutez-les séparément lorsque le changement dépend du verrouillage réel de la base de données ou d’une interaction dans le navigateur.

`test:unit` et `test:coverage` exécutent d’abord `forms:check`, qui vérifie les contrats des champs requis. `test:e2e:light` exécute une suite PGlite gérée. Une exécution complète de `test:e2e:fast` lance huit partitions PGlite gérées neuves en série; `--spec`, `--shard` ou `E2E_SPEC` choisit une seule invocation. Un échec de partition fait échouer l’agrégat. Les suites ciblées couvrent les pièces jointes, statuts d’organisme, actualisations et modifications d’entente, clôtures, recommandations, configurations de flux retirées et réinitialisations. Utilisez le script `:spec` correspondant pour choisir un fichier; `test:all:manual` comprend la séquence configurée.

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
