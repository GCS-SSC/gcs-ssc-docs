# Demarrage

Le depot de documentation et le depot source de l application sont des espaces de travail separes. La documentation vit dans `gcs-ssc-docs`; la source de l application est `../gcs-ssc`.

## Prerequis de l application

L application utilise des scripts Bun, Nuxt 4, Better Auth, Kysely et PGlite ou Postgres. La configuration d execution vient des variables d environnement :

- `DATABASE_URL`
- `PGLITE_DATA_DIR`
- `NUXT_GITHUB_CLIENT_ID`
- `NUXT_GITHUB_CLIENT_SECRET`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `BETTER_AUTH_TRUSTED_ORIGINS`
- `BETTER_AUTH_COOKIE_VERSION`
- `GCS_EXTENSION_SECRETS_KEY`
- `GCS_LOCAL_FILE_STORAGE_DIR`

Si `DATABASE_URL` est absent, le developpement local peut utiliser le repertoire PGlite configure.

`GCS_EXTENSION_SECRETS_KEY` est requis en production lorsque les extensions stockent des identifiants chiffrés. La valeur doit être une clé de 32 octets encodée en base64. Les données d’amorçage du développement peuvent fournir une clé fixe de démonstration pour des identifiants locaux non réels uniquement.

Pour le stockage local de fichiers en production, définissez `GCS_LOCAL_FILE_STORAGE_DIR` sur un répertoire réservé appartenant à l’identité du service. Sous POSIX, utilisez un chemin canonique dont les ancêtres ne contiennent aucun lien symbolique; l’identité du service doit posséder toute l’arborescence de stockage et aucun accès ne doit être accordé au groupe ni aux autres utilisateurs. Sous Windows, appliquez des listes de contrôle d’accès équivalentes au répertoire et à ses ancêtres, y compris une protection contre le remplacement au moyen des droits de suppression d’un enfant ou de renommage.

## Configuration de l application

Depuis `../gcs-ssc` :

```bash
bun install
bun run setup
bun run dev
```

Utilisez `bun run repos:update` lorsque vous devez mettre a jour le depot de l application et tous les sous-modules en une seule etape. Le script tire le depot principal, synchronise les URL de sous-modules et met a jour les sous-modules recursivement depuis leurs remotes configures.

`bun run dev:clean` demarre avec un etat de donnees local propre. Le script d application est `scripts/dev.ts`, pas un simple wrapper `nuxt dev`; utilisez les scripts package sauf besoin Nuxt de bas niveau.

Si la generation de documents d entente doit produire des PDF localement, executez `bun run bun:docgen:install` avant de demarrer l application. Voir [Generation de documents](./document-generation.md) pour les details de la chaine d outils.

## Metadonnees d extension

Le systeme d extension genere des metadonnees sous `.nuxt/gcs-extensions`. Les utilitaires serveur exigent ces metadonnees pour les appels au registre. Si les API d extension echouent avec des metadonnees manquantes, executez l application Nuxt pour que le module les regenere.

## Outils de generation de documents

La generation de documents d entente peut fonctionner localement sous Linux ou WSL sans installations globales de LibreOffice ou Chrome. Depuis `../gcs-ssc`, executez :

```bash
bun run bun:docgen:install
```

L installateur telecharge LibreOffice dans `.tools/docgen/libreoffice`, telecharge le navigateur de Puppeteer dans `.tools/docgen/puppeteer`, et ajoute ou met a jour `LIBREOFFICE_SOFFICE_PATH` et `PUPPETEER_CACHE_DIR` dans le fichier Nuxt `.env` regulier. Nuxt charge `.env` pendant `dev`, `build` et `preview`; demarrez donc normalement avec `bun run dev` apres l installation.

Utilisez `DOCGEN_ENV_FILE` pour cibler un autre fichier d environnement. Les options avancees incluent `LIBREOFFICE_VERSION`, `LIBREOFFICE_DOWNLOAD_URL` et `PUPPETEER_BROWSER`.

## Amorcage de l authentification

Les donnees de developpement peuvent creer `root@example.com` avec `password123`. La production devrait utiliser un amorcage propre au deploiement. Apres l existence de l utilisateur racine, creez les roles et attributions par l UI, puis verifiez la reponse canonique `{ grants }` de `/api/auth/permissions`.

## Demarrage de la documentation

Depuis ce depot de documentation :

```bash
bun install
bun run docs:dev
```

Construisez les docs statiques avec :

```bash
bun run docs:build
```

## Verification rapide

Pour l application, connectez-vous, verifiez `/en/` et `/fr/`, ouvrez Agences, Roles, Utilisateurs et Commun comme racine, puis confirmez qu un utilisateur porte voit une barre laterale reduite. Pour les docs, ouvrez `/en/` et `/fr/` et confirmez que les barres laterales anglaise et francaise exposent les memes sections possedees.
