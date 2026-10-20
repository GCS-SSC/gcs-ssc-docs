# Configuration d’exécution

Ces réglages du serveur contrôlent la connexion, le stockage des données, la génération de documents et le démarrage. Définissez-les dans l’environnement de déploiement, et non dans les écrans de traitement des dossiers.

GCS-SSC utilise Nuxt pour l’application du navigateur et Nitro pour son API serveur. Définissez les secrets et les valeurs propres à votre installation à l’exécution, au démarrage du serveur. Gardez-les hors des fichiers du navigateur et ne validez pas de fichier `.env` dans Git.

## Choix obligatoires

Choisissez où l’application conserve sa base de données : PostgreSQL avec `DATABASE_URL`, ou PGlite avec `PGLITE_DATA_DIR`. PGlite exécute PostgreSQL localement dans l’environnement de l’application.

| Variable | Rôle | Comportement |
| --- | --- | --- |
| `DATABASE_URL` | Chaîne de connexion PostgreSQL | A priorité sur PGlite. Le bassin du serveur utilise au plus 20 connexions. |
| `PGLITE_DATA_DIR` | Répertoire ou URI PGlite | Utilisé seulement en l’absence de `DATABASE_URL`. La valeur par défaut du conteneur est `/app/.data/pglite`. |

L’application refuse de s’initialiser si aucune valeur n’est résolue. Les valeurs de repli de Nuxt (`NUXT_DATABASE_URL` et `NUXT_PGLITE_DATA_DIR`) demeurent prises en charge, mais les variables sans préfixe ont priorité.

L’authentification exige un `BETTER_AUTH_SECRET` robuste et propre au déploiement. Définissez `BETTER_AUTH_URL` à l’origine publique de l’application, avec le protocole, l’hôte et le port, sans chemin de page. Définissez `BETTER_AUTH_TRUSTED_ORIGINS` à une liste d’origines permises séparées par des virgules si d’autres origines sont requises. `RAILWAY_PUBLIC_DOMAIN` peut fournir l’URL Railway en l’absence d’une URL d’authentification explicite. Incrémentez `BETTER_AUTH_COOKIE_VERSION` pour invalider les témoins de session mis en cache.

La connexion GitHub exige `NUXT_GITHUB_CLIENT_ID` et `NUXT_GITHUB_CLIENT_SECRET`. Malgré le préfixe `NUXT_`, ces deux valeurs restent côté serveur. Une paire incomplète laisse la connexion GitHub désactivée. La connexion par courriel et mot de passe demeure active.

Le lanceur de développement définit `BETTER_AUTH_BASE_URL` pour la compatibilité de la bibliothèque. L’application résout `BETTER_AUTH_URL` à l’exécution. Par exemple, `https://grants.example.ca` est une origine. `https://grants.example.ca/en/agreements` contient un chemin de page et ne peut pas être une origine approuvée. Les hôtes locaux privés ou de bouclage sont acceptés si leur protocole et leur port correspondent à l’origine configurée. Le développement accepte aussi une origine HTTP ou HTTPS du navigateur exactement égale à celle de l’URL de requête, ce qui permet les aperçus HTTPS de même origine. La production conserve la liste configurée.

## Stockage et outils documentaires

| Variable | Rôle |
| --- | --- |
| `GCS_EXTENSION_SECRETS_KEY` | Clé racine requise lorsqu’une extension activée conserve des identifiants chiffrés. |
| `LIBREOFFICE_SOFFICE_PATH` | Exécutable LibreOffice explicite pour la conversion DOCX. |
| `PUPPETEER_EXECUTABLE_PATH` | Exécutable Chromium pour la conversion HTML vers PDF. |
| `PUPPETEER_CACHE_DIR` | Cache du navigateur Puppeteer utilisé par l’outillage local. |

Les extensions de stockage enregistrées gèrent les téléversements et téléchargements au moyen de l’interface de stockage de l’application. Aucun repli automatique sur le système de fichiers local n’existe. Activez et configurez un fournisseur par organisme, puis sélectionnez-le pour les nouvelles écritures. Les fichiers existants gardent le fournisseur et l’emplacement enregistrés au départ. Choisir un autre fournisseur ne déplace pas ces fichiers. Par exemple, après ce changement, les anciennes pièces jointes d’entente ont encore besoin de leur fournisseur d’origine. Un fournisseur sélectionné ou référencé ne peut pas simplement être désactivé ou retiré.

Sauvegardez ensemble la base, les fichiers stockés, les réglages des fournisseurs et les secrets nécessaires pour pouvoir restaurer un système fonctionnel. Conservez chaque implémentation référencée lors de la restauration. Consultez la documentation du fournisseur pour les chemins, identifiants, permissions et procédures propres au service. Voir [Travail en arrière-plan](background-work.md) pour le nettoyage durable.

## Contrôles d’audit et d’opérations d’extension

| Variable | Valeur par défaut et règle |
| --- | --- |
| `GCS_ACCESS_LOG_ENABLED` | `true`; seules les valeurs littérales `true` et `false` sont acceptées. Concerne les accès, pas les changements ni la sécurité. |
| `GCS_AUDIT_RETENTION_DAYS` | 365; entier positif dans la plage des entiers PostgreSQL. |
| `GCS_ACCESS_RETENTION_DAYS` | 30; entier positif dans la plage des entiers PostgreSQL. |
| `GCS_EXTENSION_OPERATION_TIMEOUT_MS` | 10000; minimum de 100 millisecondes pour les opérations d’extension bornées. |

Des réglages d’audit invalides empêchent l’application d’être prête à traiter les requêtes. Les événements d’accès attendent en mémoire avant leur enregistrement. Certains peuvent être perdus si cette mémoire se remplit ou si le processus s’arrête; ils ne garantissent pas la trace de chaque requête. Voir [Audit](../admin/audit.md) pour les permissions, les preuves et les limites d’enquête.

## Paramètres de processus et de construction

`HOST` et `PORT` (ou leurs équivalents Nitro) définissent l’adresse et le port où le serveur accepte les connexions. `NODE_ENV=production` désactive le comportement de développement. La construction Docker exige `ENVIRONMENT_TYPE=demo` ou `production`; ce choix est fait à la construction. Les images de démonstration comprennent la migration et la ressource de démonstration, contrairement aux images de production. Il faut reconstruire l’image pour changer de mode.

`NUXT_DISABLE_SOURCEMAPS=true` désactive les cartes de sources hors de la valeur de production habituelle. `GCS_RUNTIME_MIGRATION_MODE` et `GCS_DEMO_MIGRATION_SUFFIX` sont des contrôles internes de démonstration/WebContainer et ne doivent jamais servir à initialiser la production.

## Configuration locale et commandes

`bun run setup` prépare d’abord les outils privés, puis initialise les sous-modules d’extension et du SDK consignés dans `.gitmodules`, installe l’espace de travail et construit le SDK public des extensions. Votre compte GitHub doit avoir accès en lecture à `GCS-SSC/gcs-ssc-tooling`. `bun run tooling:setup` rétablit les outils à leur commit fixé et les liens attendus pour les tests, les documents d’architecture et les scripts hôtes. La commande refuse de remplacer des fichiers sans lien symbolique ou de modifier la cible de liens existants. Si un chemin bloque la préparation, examinez et préservez son contenu avant de rétablir le lien attendu.

Le SDK est la trousse de développement utilisée par les extensions pour fonctionner avec l’application. `bun run dev` regroupe le processus de vidage administratif, dérive les origines Better Auth de l’hôte et du port choisis, puis démarre Nuxt; `--host` et `--port` sont transmis.

`bun run dev:clean` supprime d’abord la base locale `.data/pglite` par défaut et le cache Nitro `.nuxt/dev`, afin qu’un ancien processus ne réinitialise pas la nouvelle base. Cette commande détruit cette base locale, mais ne supprime pas les fichiers stockés.

| Commande | Fonction vérifiée |
| --- | --- |
| `bun run build` | Construit le SDK des extensions, l’application Nuxt `node-server` et les processus de vidage SQL administratif et de nettoyage du stockage. |
| `bun run lint` / `bun run typecheck` | Vérifie les règles bilingues de l’interface, les noms en base, le style des sources et les types Nuxt/Vue. |
| `bun run test:unit` / `bun run test:coverage` | Vérifie les formulaires et l’aide guidée, puis exécute les tests Vitest du paquet d’aide guidée et de l’hôte; la couverture applique les seuils configurés. |
| `bun run test:integration:postgres` | Exécute le banc géré d’intégration PostgreSQL avec ses préalables externes. |
| `bun run test:e2e:fast` | Exécute le parcours Playwright géré avec un processus. |
| `bun run quality:artifact` / `bun run quality:webcontainer` | Construit et vérifie l’artéfact de production ou de démonstration dans le navigateur. |
| `bun run quality:pr` / `bun run quality:whole` | Exécute l’orchestration qualité de demande de tirage ou de dépôt entier; `quality:pr` comprend les suites de l’hôte, les vérifications de types des extensions et les tests des fournisseurs de stockage local/S3. |

Exécutez les tests d’implémentation dans l’espace de travail de chaque extension; les suites racines ne les trouvent pas. Si une vérification nécessite PostgreSQL, un navigateur, un convertisseur documentaire ou une autre infrastructure absente, consignez-la comme indisponible, et non réussie.

## Empaquetage, intégration continue et démonstration

La construction Docker valide `ENVIRONMENT_TYPE`, copie les espaces de travail centraux d’autorisation, de diagrammes et d’aide guidée avec les autres manifestes avant l’installation figée, construit l’application complète, puis copie `.output`, les dépendances de construction vérifiées et le paquet de sondage intégré dans l’image d’exécution Node 24. Pour les contextes distants qui omettent les sous-modules, elle récupère le SDK et les espaces de travail des extensions enregistrées aux commits exacts consignés dans le `Dockerfile`; le contenu de l’extraction locale les superpose avant la construction. Gardez ces commits fixes alignés sur les gitlinks du dépôt, qui consignent les commits requis des sous-modules.

Les paquets d’autorisation, `@gcs-ssc/diagrams` et `@gcs-ssc/guided-help` appartiennent au dépôt et doivent rester dans le contexte de construction. Les espaces de travail d’organisme des extensions doivent déclarer une catégorie de navigation `management` ou `administration` et un ordre sous forme d’entier sûr. Une déclaration invalide bloque la validation des extensions pendant la construction. Mettez à jour l’extension et le SDK ensemble plutôt que de retirer la validation. Le paquet de sondage intégré au connecteur du Portail doit aussi être inclus.

L’installation d’exécution exclut les binaires musl incompatibles et les modules Nitro vides; l’image résout les paquets du magasin Bun et inclut la dépendance WebSocket de Puppeteer.

Le flux manuel GitHub Pages extrait les sous-modules récursifs, fixe Bun 1.3.13 et effectue une installation figée et une construction `node-server`. Il prépare la sortie avec les migrations et ressources de démonstration dans un aperçu WebContainer, puis vérifie et publie cet artéfact. Un flux manuel distinct `publish-demo-image.yml` construit et vérifie l’image commune. Docker et WebContainer appellent tous deux `scripts/build-demo-migration.ts`. Son module Bun résout les alias `~~/` du dépôt, le registre des extensions et la copie réelle de `kysely-pglite` avant de produire `demo.mjs`.

L’artéfact WebContainer est une démonstration empaquetée qui fonctionne dans le navigateur. Son outillage rejette les liens qui s’échappent, les cycles, les fichiers irréguliers ou à liens multiples, les fuites de chemins hôtes ainsi que les préparations périmées ou non vérifiées. Les contrôles de démonstration, les données initiales, les identifiants dans le navigateur et la persistance PGlite ne constituent jamais un modèle de sécurité ou de reprise en production.

## Ordre de démarrage

Au démarrage, Nitro initialise la base, applique les migrations ordonnées du noyau et des extensions activées, vérifie les fournisseurs de stockage référencés et initialise la capture et la rétention d’audit. Les modules planifiés des extensions s’activent seulement après les migrations de leurs organismes activés; la boucle L1 propose ensuite leur travail enregistré. L’application est prête seulement après la réussite de toute cette séquence. Les API ordinaires, y compris la connexion et les métadonnées, renvoient HTTP 503 (service indisponible) jusque-là. Les fichiers du navigateur peuvent quand même se charger : voir la page ne prouve pas que le serveur est prêt.

Les erreurs de connexion transitoires sont reprises en série après 1, 2, 4, puis au plus 5 secondes, dans un délai maximal de démarrage de deux minutes. Les erreurs de schéma ou d’identifiants ne bénéficient pas de ces reprises. En production, une initialisation échouée ou expirée rend la génération de base indisponible et termine le processus pour permettre son redémarrage par le superviseur. Examinez les événements `startup.retry`, `startup.failed` et `startup.ready`. Un port réseau ouvert ne signifie pas à lui seul que le démarrage a réussi.

La sonde publique intentionnelle `GET /api/health` vérifie la préparation et exécute `SELECT 1`. Elle renvoie `200 {"status":"ok"}` seulement lorsque prête, sinon 503 sans diagnostic d’environnement. Prévoyez cette fenêtre de démarrage dans la politique de santé du superviseur.

Par exemple, `200 {"status":"ok"}` confirme que le serveur et la base sont prêts, mais la génération PDF peut échouer si Chromium est absent. La sonde vérifie seulement le processus, l’API et la base. Elle ne vérifie pas les droits d’écriture du stockage, Chromium, LibreOffice, les services distants d’extension, les ressources des processus navigateur, les sauvegardes ni la santé des données métier. Surveillez ces dépendances séparément. Une erreur d’historique compacté de migrations locales peut être résolue avec la commande explicitement destructive `bun run dev:clean`; les données de production exigent une procédure approuvée de migration ou de reprise.

Consultez [Déploiement](deployment.md) et [Travail en arrière-plan](background-work.md).
