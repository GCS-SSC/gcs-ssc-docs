# Tests

L application source utilise Vitest pour les tests unitaires et Playwright pour les tests de bout en bout. Le site de documentation devrait quand meme etre construit apres les modifications pour detecter les erreurs de markdown, liens ou structure.

## Commandes de l application

Depuis `../gcs-ssc` :

```bash
bun run lint
bun run typecheck
bun run test:unit
bun run test:e2e
bun run test:e2e:light
bun run test:e2e:light:spec --spec tests/e2e/auth.spec.ts
```

`bun run test` execute les suites unitaires et e2e. `test:all:manual` execute aussi lint, typecheck, couverture et e2e.

## Zones couvertes par les tests

La couverture pertinente inclut :

- Middleware auth et gardes de route.
- Composables client d autorisation.
- Utilitaires serveur d autorisation.
- Cas limites RBAC et validation de portee de role.
- Cycle de vie des capacites de role.
- RBAC des attributions utilisateur.
- Gestion d agence et RBAC par portee d agence.
- Configuration, schemas, routes, recherches et i18n de Commun.
- Routes demandeur/beneficiaire, onglets enfants, routes d equipe, execution d examens et RBAC.
- Activation d extension par agence, configuration de volet, emplacements d execution, onglets d entite, repartition serveur, migrations et SDK.
- Execution bilingue et erreurs/validations localisees.

## Choisir les tests pour admin/RBAC

Pour les roles ou utilisateurs, executez les tests autour de `rbac`, `role-scope`, `roles-routes`, `users-routes`, `use-auth`, `use-can`, `use-role-modal-state`, ainsi que les e2e d attributions de role et de refus porte.

Pour les changements d agence, executez les tests de route d agence, schema d agence, recherche d agence, gestion d agence et RBAC par portee d agence.

Pour les promoteurs, executez les tests d auth demandeur/beneficiaire, routes, routes d equipe, routes enfants, routes d examen et e2e demandeur/beneficiaire.

Pour Commun, executez les tests de schema, route, recherche, colonnes, app-config, validation de modale et page.

## Commandes docs

Depuis ce depot de documentation :

```bash
bun run docs:build
bun run docs:dev
```

Apres une construction, verifiez quelques pages anglaises et francaises pour la parite des titres et l absence de references de capture obsoletes.
