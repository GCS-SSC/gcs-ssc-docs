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

Si `DATABASE_URL` est absent, le developpement local peut utiliser le repertoire PGlite configure.

## Configuration de l application

Depuis `../gcs-ssc` :

```bash
bun install
bun run setup
bun run dev
```

`bun run dev:clean` demarre avec un etat de donnees local propre. Le script d application est `scripts/dev.ts`, pas un simple wrapper `nuxt dev`; utilisez les scripts package sauf besoin Nuxt de bas niveau.

## Metadonnees d extension

Le systeme d extension genere des metadonnees sous `.nuxt/gcs-extensions`. Les utilitaires serveur exigent ces metadonnees pour les appels au registre. Si les API d extension echouent avec des metadonnees manquantes, executez l application Nuxt pour que le module les regenere.

## Amorcage de l authentification

Les donnees de developpement peuvent creer `root@example.com` avec `password123`. La production devrait utiliser un amorcage propre au deploiement. Apres l existence de l utilisateur racine, creez les roles et attributions par l UI afin que `/api/auth/roles` retourne les permissions attendues.

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
