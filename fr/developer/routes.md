# Routes

Les routes sont generees par les pages Nuxt et localisees par Nuxt i18n. Utilisez les noms de route de `app/utils/route-locations.ts` avec `localePath` au lieu de coder les URL en dur.

## Pages localisees principales

- Accueil : `/en/`, `/fr/`
- Connexion : `/en/login`, `/fr/connexion`
- Agences : `/en/agencies`, `/fr/agences`
- Détail d’agence : `/en/agencies/[id]`, `/fr/agences/[id]`
- Programmes : `/en/transfer-payments`, `/fr/paiements-de-transfert`
- Détail de programme : `/en/transfer-payments/[id]`, `/fr/paiements-de-transfert/[id]`
- Détail de volet : `/en/transfer-payments/[id]/streams/[streamId]`, `/fr/paiements-de-transfert/[id]/volets/[streamId]`
- Promoteurs : `/en/proponents`, `/fr/promoteurs`
- Creation de promoteur : `/en/proponents/new`, `/fr/promoteurs/nouveau`
- Modification/detail de promoteur : `/en/proponents/edit/[id]`, `/fr/promoteurs/modifier/[id]`
- Roles : `/en/roles`, `/fr/roles`
- Detail de role : `/en/roles/[id]`, `/fr/roles/[id]`
- Utilisateurs : `/en/users`, `/fr/utilisateurs`
- Detail utilisateur : `/en/users/[id]`, `/fr/utilisateurs/[id]`
- Commun : `/en/admin/common`, `/fr/admin/commun`

Des routes d entente et d enfants de programme existent aussi pour engagements, paiements, previsions, reclamations, surveillances, documents generes, schemas d evaluation, modeles d approbation, modeles de documents et evaluations.

## Aide de route

`appRouteLocations` contient des aides nommees comme `home`, `login`, `agencies`, `agencyDetail`, `proponents`, `proponentCreate`, `proponentEdit`, `agreements`, `agreementDetail`, `roles`, `roleDetail`, `users` et `userDetail`.

Utilisez :

```ts
const localePath = useLocalePath()
await navigateTo(localePath(appRouteLocations.proponentEdit(id)))
```

## Middleware

`auth.global.ts` protege les routes authentifiees et redirige les utilisateurs connectes hors de la connexion. `admin-common.ts` protege Commun en exigeant une permission racine/globale de lecture `all`.

## Style des routes API

Les routes API sont sous `server/api`. Les fichiers dynamiques comme `[id].get.ts`, `[id].patch.ts` et `[id].delete.ts` correspondent aux methodes HTTP. L autorisation doit se faire avant mutation et devrait resoudre la portee depuis le dossier cible lorsque possible.

## Écritures serveur protégées

Les écritures protégées qui peuvent attendre des verrous du cycle de vie ou d’entité respectent un ordre global dans une seule transaction :

1. Verrouiller et reconstruire le graphe actuel des autorisations de l’appelant.
2. Acquérir les verrous enregistrés du cycle de vie des extensions dans un ordre déterministe selon l’extension, l’agence et le volet.
3. Verrouiller les lignes des volets actuels.
4. Acquérir les verrous d’entente enregistrés par les extensions.
5. Verrouiller la ligne de l’entente et résoudre de nouveau sa portée actuelle.
6. Autoriser l’entité actuelle au moyen du graphe d’autorisations verrouillé.
7. Relire l’état protégé et effectuer l’écriture.

Utilisez `requireFreshAuthContext` avant les verrous du domaine et `authorizeWithFreshAuthContext` après le verrouillage de la portée actuelle. L’appel d’une aide qui acquiert de nouveau les verrous des tables d’autorisation après les verrous du cycle de vie, du volet ou de l’entité inverse l’ordre des écritures protégées et peut créer un interblocage avec les modifications de rôles ou d’affectations. Un changement de portée doit être réessayé au moyen de l’aide partagée d’écriture d’entente ou échouer sans effectuer d’écriture.

## Onglets par route

Les pages detail complexes utilisent un etat d onglet soutenu par la requete avec les composables d onglets. Cela rend les liens vers des sections stables tout en gardant la route centree sur l id d entite. Lors de l ajout d onglets, fournissez des valeurs stables et des libelles localises.

## Routes d extension

Les gestionnaires serveur d extension sont servis sous `/api/extensions/{extensionKey}/...`. L hote resout les parametres de route puis repartit vers le gestionnaire d extension correspondant.

Pour les gestionnaires avec RBAC, l’hôte résout le paramètre d’entité, de volet ou d’agence déclaré avant d’exécuter le code de l’extension. Il vérifie l’authentification et le contrôle d’accès, l’activation pour l’agence et le volet ainsi que la configuration résolue de l’extension, puis joint le contexte stable pour `defineGcsExtensionRouteHandler` : paramètres, contexte d’authentification, configuration, contexte d’entité, de volet ou d’agence, portée autorisée, `writeAuthorization` et aides filtrées `agreementAccess`.

Les transactions d’écriture d’une extension appellent `writeAuthorization.lockAuthState(trx)` avant les verrous du cycle de vie, puis `authorizeCurrentScope(trx)` ou la solution de compatibilité `authorizeCurrentEntity(trx)` après ces verrous. Les routes qui présentent des choix d’entente utilisent `agreementAccess.listVisibleOptions(...)`; les écritures visant l’entente sélectionnée doivent aussi utiliser `lockAndAuthorizeAgreement(...)` dans la même transaction.

Les gestionnaires avec `auth: "manual"` sautent le contexte RBAC de l hote et doivent faire leur propre autorisation metier.

La configuration pleine page de volet d extension utilise `/en/extension/[id]/config` et `/fr/extension/[id]/configuration` avec les parametres de requete `streamId`, `transferPaymentId` et `agencyId`.
