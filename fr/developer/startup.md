# Demarrage

Préparez une copie locale de GCS-SSC ou de sa documentation pour le développement, le soutien ou les démonstrations. Une démonstration locale permet de reproduire un problème sans modifier les dossiers d’entente en production.

La documentation se trouve dans `gcs-ssc-docs`. La source de l’application se trouve dans le dépôt distinct `gcs-ssc`.

## Prerequis de l application

L’application utilise des scripts Bun, Nuxt 4, Better Auth, Kysely et PGlite ou Postgres. Les variables d’environnement fournissent la connexion à la base de données, les paramètres d’authentification et la clé de chiffrement des extensions au démarrage :

- `DATABASE_URL`
- `PGLITE_DATA_DIR`
- `NUXT_GITHUB_CLIENT_ID`
- `NUXT_GITHUB_CLIENT_SECRET`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `BETTER_AUTH_TRUSTED_ORIGINS`
- `BETTER_AUTH_COOKIE_VERSION`
- `GCS_EXTENSION_SECRETS_KEY`

Si `DATABASE_URL` est absent, le développement local peut utiliser le répertoire PGlite configuré.

`GCS_EXTENSION_SECRETS_KEY` est requis en production lorsque les extensions stockent des identifiants chiffrés. La valeur doit être une clé de 32 octets encodée en base64. Les données d’amorçage du développement peuvent fournir une clé fixe de démonstration pour des identifiants locaux non réels uniquement.

Les fichiers exigent un fournisseur enregistré et sélectionné pour l’organisme. L’hôte ne possède aucun repli automatique vers un répertoire local. Configurez le fournisseur choisi et son stockage durable selon sa documentation; consultez [Configuration](../operator/configuration.md).

Utilisez Bun **1.3.13** et initialisez les sous-modules figés du SDK, des extensions et de l’outillage privé. `bun run setup` initialise les espaces, prépare les liens d’outillage, installe les dépendances et construit le SDK. L’accès à `GCS-SSC/gcs-ssc-tooling` est nécessaire pour les ressources privées de tests et d’architecture.

## Configuration de l application

Depuis `gcs-ssc` :

```bash
bun run setup
bun run dev
```

Utilisez `bun run repos:update` pour mettre à jour le dépôt de l’application et tous les sous-modules enregistrés en une seule étape. Le script récupère les changements du dépôt principal, synchronise les URL des sous-modules et met à jour récursivement les sous-modules depuis leurs dépôts distants configurés.

Utilisez les scripts du paquet pour démarrer l’application. Ils exécutent `scripts/dev.ts`, qui prépare l’environnement avant de démarrer Nuxt.

Si la génération de documents d’entente doit produire des PDF localement, exécutez `bun run bun:docgen:install` avant de démarrer l’application. Consultez [Génération de documents](./document-generation.md) pour les détails des outils nécessaires.

`bun run dev:clean` supprime la base `.data/pglite` par défaut et le cache `.nuxt/dev` avant reconstruction. Les fichiers restent conservés et aucune base PostgreSQL externe n’est réinitialisée; choisissez explicitement le mode de base. La démonstration neuve utilise `9999_seed`, le cycle NCIA et la configuration de test Portail de développement.

`bun run tooling:setup` répare les liens manquants sans copier les fichiers privés dans l’hôte. Il relie `tests`, `architecture` et `.agents/skills/gcs-ssc` à la copie privée figée. Il relie aussi les sources hôtes et la configuration des tests à cette copie. Ne commettez pas ces liens générés. Si le sous-module privé est inaccessible, vérifiez que votre compte GitHub peut lire `GCS-SSC/gcs-ssc-tooling`, puis réessayez.

Le SDK exporte les fichiers compilés sous `dist`. Si un point d’entrée manque après une récupération manuelle ou une modification du SDK, exécutez `bun run --cwd packages/gcs-ssc-extensions build`. Démarrer Nuxt régénère les métadonnées des extensions, mais ne remplace pas cette compilation du SDK.

## Metadonnees d extension

Le système d’extension génère des métadonnées sous `.nuxt/gcs-extensions` pour que l’application puisse trouver les fonctions d’extension enregistrées. Les utilitaires serveur exigent ces métadonnées pour les appels au registre. Si les API d’extension échouent parce que des métadonnées manquent, exécutez l’application Nuxt pour que le module les régénère.

## Outils de generation de documents

La génération de documents d’entente peut fonctionner localement sous Linux ou WSL sans installations globales de LibreOffice ou Chrome. Depuis `gcs-ssc`, exécutez :

```bash
bun run bun:docgen:install
```

L’installateur télécharge LibreOffice dans `.tools/docgen/libreoffice`, télécharge le navigateur de Puppeteer dans `.tools/docgen/puppeteer` et ajoute ou met à jour `LIBREOFFICE_SOFFICE_PATH` et `PUPPETEER_CACHE_DIR` dans le fichier Nuxt `.env` habituel. Nuxt charge `.env` pendant `dev`, `build` et `preview`; démarrez donc normalement avec `bun run dev` après l’installation.

Utilisez `DOCGEN_ENV_FILE` pour cibler un autre fichier d’environnement. Les options avancées incluent `LIBREOFFICE_VERSION`, `LIBREOFFICE_DOWNLOAD_URL` et `PUPPETEER_BROWSER`.

## Amorcage de l authentification

Les données de développement et de test peuvent créer `root@example.com` avec `password123`. Ce compte et ce mot de passe ne doivent jamais être déployés en production; supprimez-les ou renouvelez les identifiants lors du provisionnement de la production. Une fois que l’utilisateur racine existe, créez les rôles et les attributions dans l’interface, puis vérifiez que la réponse des permissions a la structure attendue `{ grants }` de `/api/auth/permissions`.

## Demarrage de la documentation

Depuis ce dépôt de documentation :

```bash
bun install
bun run docs:dev
```

Construisez la documentation statique avec :

```bash
bun run docs:build
```

## Verification rapide

Pour l’application, connectez-vous et vérifiez `/en/` et `/fr/`. Avec les permissions globales appropriées, ouvrez Agences, Roles, Utilisateurs et GWCOA. Ouvrez Audit avec une permission explicite Lecteur Audit. Connectez-vous ensuite comme utilisateur dont l’accès est limité à certains dossiers et vérifiez que la barre latérale propose moins d’options. Ces contrôles confirment la disponibilité des deux langues et des principaux contrôles d’accès.

Pour la documentation, ouvrez `/en/` et `/fr/` et confirmez que les barres latérales anglaise et française proposent les mêmes sections de documentation.
