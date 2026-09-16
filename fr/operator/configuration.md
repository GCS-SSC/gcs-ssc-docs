# Configuration d’exécution

GCS-SSC est une application Nuxt rendue côté client avec une API Nitro. Configurez les secrets et les valeurs propres au déploiement à l’exécution; ne les intégrez pas aux fichiers du navigateur et ne validez pas de fichier `.env` dans Git.

## Choix obligatoires

Choisissez un mode de base de données :

| Variable | Rôle | Comportement |
| --- | --- | --- |
| `DATABASE_URL` | Chaîne de connexion PostgreSQL | A priorité sur PGlite. Le bassin du serveur utilise au plus 20 connexions. |
| `PGLITE_DATA_DIR` | Répertoire ou URI PGlite | Utilisé seulement en l’absence de `DATABASE_URL`. La valeur par défaut du conteneur est `/app/.data/pglite`. |

L’application refuse de s’initialiser si aucune valeur n’est résolue. Les valeurs de repli de Nuxt (`NUXT_DATABASE_URL` et `NUXT_PGLITE_DATA_DIR`) demeurent prises en charge, mais les variables sans préfixe ont priorité.

L’authentification exige un `BETTER_AUTH_SECRET` robuste et propre au déploiement. Définissez `BETTER_AUTH_URL` à l’origine publique de l’application et `BETTER_AUTH_TRUSTED_ORIGINS` à une liste d’origines permises séparées par des virgules, au besoin. `RAILWAY_PUBLIC_DOMAIN` peut fournir l’URL Railway en l’absence d’une URL d’authentification explicite. Incrémentez `BETTER_AUTH_COOKIE_VERSION` lorsqu’un déploiement doit invalider les témoins de session mis en cache. La connexion GitHub apparaît seulement si l’identifiant et le secret client GitHub de Nuxt sont tous deux présents; la connexion par courriel et mot de passe demeure active.

Les justificatifs GitHub emploient `NUXT_GITHUB_CLIENT_ID` et `NUXT_GITHUB_CLIENT_SECRET`. Malgré le préfixe `NUXT_`, ces deux valeurs demeurent une configuration d’exécution côté serveur. Une paire incomplète n’active pas partiellement le fournisseur. Le lanceur de développement définit `BETTER_AUTH_BASE_URL` pour la compatibilité de la bibliothèque, mais l’application résout `BETTER_AUTH_URL` à l’exécution. Les origines approuvées doivent être des origines, sans chemin; les hôtes locaux privés ou de bouclage sont acceptés seulement si leur protocole et leur port correspondent à l’origine d’authentification configurée.

## Stockage et outils documentaires

| Variable | Rôle |
| --- | --- |
| `GCS_EXTENSION_SECRETS_KEY` | Clé racine requise lorsqu’une extension activée conserve des identifiants chiffrés. |
| `LIBREOFFICE_SOFFICE_PATH` | Exécutable LibreOffice explicite pour la conversion DOCX. |
| `PUPPETEER_EXECUTABLE_PATH` | Exécutable Chromium pour la conversion HTML vers PDF. |
| `PUPPETEER_CACHE_DIR` | Cache du navigateur Puppeteer utilisé par l’outillage local. |

Le stockage est fourni par des extensions enregistrées au moyen du contrat de stockage de l’hôte. Aucun repli automatique sur le système de fichiers local n’existe. Activez et configurez un fournisseur par organisme, puis sélectionnez-le pour les nouvelles écritures. Les objets existants conservent leur fournisseur et leur localisateur; changer la sélection ne migre pas les fichiers. Un fournisseur sélectionné ou référencé ne peut pas simplement être désactivé ou retiré.

Sauvegardez la base, les objets, la configuration des fournisseurs et les secrets nécessaires comme un ensemble récupérable. Conservez chaque implémentation référencée lors de la restauration. Consultez la documentation du fournisseur pour les chemins, identifiants, permissions et procédures propres au service. Voir [Travail en arrière-plan](background-work.md) pour le nettoyage durable.

## Contrôles d’audit et d’opérations d’extension

| Variable | Valeur par défaut et règle |
| --- | --- |
| `GCS_ACCESS_LOG_ENABLED` | `true`; seules les valeurs littérales `true` et `false` sont acceptées. Concerne les accès, pas les changements ni la sécurité. |
| `GCS_AUDIT_RETENTION_DAYS` | 365; entier positif dans la plage des entiers PostgreSQL. |
| `GCS_ACCESS_RETENTION_DAYS` | 30; entier positif dans la plage des entiers PostgreSQL. |
| `GCS_EXTENSION_OPERATION_TIMEOUT_MS` | 10000; minimum de 100 millisecondes pour les opérations d’extension bornées. |

Une configuration d’audit invalide empêche la préparation. Les accès sont mis en mémoire et peuvent être perdus en cas de surcharge ou de perte du processus; ce n’est pas une file durable de requêtes. Voir [Audit](../admin/audit.md) pour les permissions, les preuves et les limites d’enquête.

## Paramètres de processus et de construction

`HOST` et `PORT` (ou leurs équivalents Nitro) choisissent l’adresse d’écoute. `NODE_ENV=production` désactive le comportement de développement. La construction Docker exige `ENVIRONMENT_TYPE=demo` ou `production`; ce choix est fait à la construction. Les images de démonstration comprennent la migration et la ressource de démonstration, contrairement aux images de production. Il faut reconstruire l’image pour changer de mode.

`NUXT_DISABLE_SOURCEMAPS=true` désactive les cartes de sources hors de la valeur de production habituelle. `GCS_RUNTIME_MIGRATION_MODE` et `GCS_DEMO_MIGRATION_SUFFIX` sont des contrôles internes de démonstration/WebContainer et ne doivent jamais servir à initialiser la production.

## Configuration locale et commandes

`bun run setup` initialise les sous-modules d’extension et du SDK consignés dans `.gitmodules`, installe l’espace de travail et construit le SDK public des extensions. `bun run dev` regroupe le processus de vidage administratif, dérive les origines Better Auth de l’hôte et du port choisis, puis démarre Nuxt; `--host` et `--port` sont transmis. `bun run dev:clean` supprime d’abord uniquement la base locale `.data/pglite` par défaut. Cette commande détruit cette base locale, mais ne supprime pas les fichiers stockés.

| Commande | Fonction vérifiée |
| --- | --- |
| `bun run build` | Construit le SDK des extensions, l’application Nuxt `node-server` et les processus de vidage SQL administratif et de nettoyage du stockage. |
| `bun run lint` / `bun run typecheck` | Vérifie le style et les contrats des sources de production ainsi que les types Nuxt/Vue. |
| `bun run test:unit` / `bun run test:coverage` | Exécute les tests Vitest appartenant à l’hôte; la couverture applique les seuils configurés. |
| `bun run test:integration:postgres` | Exécute le banc géré d’intégration PostgreSQL avec ses préalables externes. |
| `bun run test:e2e:fast` | Exécute le parcours Playwright géré avec un processus. |
| `bun run quality:artifact` / `bun run quality:webcontainer` | Construit et vérifie l’artéfact de production ou de démonstration dans le navigateur. |
| `bun run quality:pr` / `bun run quality:whole` | Exécute l’orchestration qualité de demande de tirage ou de dépôt entier; `quality:pr` comprend les suites de l’hôte, les vérifications de types des extensions et les tests des fournisseurs de stockage local/S3. |

Les tests d’implémentation d’une extension appartiennent à son propre espace de travail et ne sont pas découverts par les suites racines. Une infrastructure PostgreSQL, navigateur, convertisseur ou plateforme absente rend la barrière indisponible; elle ne constitue pas une réussite.

## Empaquetage, intégration continue et démonstration

La construction Docker valide `ENVIRONMENT_TYPE`, copie l’espace de travail d’autorisation central `packages/gcs-ssc-authorization` avec les autres manifestes avant l’installation figée, construit l’application complète, puis copie seulement `.output` dans l’image d’exécution Node 24. Pour les contextes distants qui omettent les sous-modules, elle récupère le SDK et les espaces de travail des extensions enregistrées aux commits exacts consignés dans le `Dockerfile`; le contenu de l’extraction locale les superpose avant la construction. Gardez ces références alignées sur les gitlinks du dépôt. Le paquet d’autorisation central appartient au dépôt, n’est pas un sous-module et doit rester dans le contexte de construction.

Le seul flux de déploiement actif publie manuellement la démonstration dans GitHub Pages. Il extrait les sous-modules récursifs, fixe Bun 1.3.13, effectue une installation figée et une construction `node-server`, puis utilise le même outil de regroupement de migration que Docker pour produire la migration de démonstration avant de préparer et vérifier l’aperçu WebContainer. `scripts/build-demo-migration.ts` résout explicitement les alias `~~/` du dépôt, le registre des extensions et la copie réelle de `kysely-pglite`.

L’artéfact WebContainer est une démonstration autonome dans le navigateur. Son outillage rejette les liens qui s’échappent, les cycles, les fichiers irréguliers ou à liens multiples, les fuites de chemins hôtes ainsi que les préparations périmées ou non vérifiées. Les contrôles de démonstration, les données initiales, les identifiants dans le navigateur et la persistance PGlite ne constituent jamais un modèle de sécurité ou de reprise en production.

## Ordre de démarrage

Au démarrage, Nitro initialise la base, applique les migrations ordonnées du noyau et des extensions activées, vérifie les fournisseurs de stockage référencés et initialise la capture et la rétention d’audit. La préparation couvre toute cette séquence. Les API ordinaires, y compris l’authentification et les métadonnées, renvoient 503 avant sa réussite. Les ressources statiques peuvent rester accessibles.

Les erreurs de connexion transitoires sont reprises en série après 1, 2, 4, puis au plus 5 secondes, dans un délai maximal de démarrage de deux minutes. Les erreurs de schéma ou d’identifiants ne bénéficient pas de ces reprises. En production, une initialisation échouée ou expirée rend la génération de base indisponible et termine le processus pour permettre son redémarrage par le superviseur. Examinez `startup.retry`, `startup.failed` et `startup.ready`; un port à l’écoute ne prouve pas la préparation.

La sonde publique intentionnelle `GET /api/health` vérifie la préparation et exécute `SELECT 1`. Elle renvoie `200 {"status":"ok"}` seulement lorsque prête, sinon 503 sans diagnostic d’environnement. Prévoyez cette fenêtre de démarrage dans la politique de santé du superviseur.

La sonde établit seulement l’état de préparation du processus, de l’API et de la base. Elle ne vérifie pas les droits d’écriture du stockage, Chromium, LibreOffice, les services distants d’extension, les ressources des processus navigateur, les sauvegardes ni la santé des données métier. Surveillez ces dépendances séparément. Une erreur d’historique compacté de migrations locales peut être résolue avec la commande explicitement destructive `bun run dev:clean`; les données de production exigent une procédure approuvée de migration ou de reprise.

Consultez [Déploiement](deployment.md) et [Travail en arrière-plan](background-work.md).
