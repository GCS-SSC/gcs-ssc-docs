# Routes

Les routes sont generees par les pages Nuxt et localisees par Nuxt i18n. Utilisez les noms de route de `app/utils/route-locations.ts` avec `localePath` au lieu de coder les URL en dur.

## Pages localisees principales

- Accueil : `/en/`, `/fr/`
- Connexion : `/en/login`, `/fr/login`
- Agences : `/en/agencies`, `/fr/agences`
- Detail d agence : `/en/agencies/[id]`, `/fr/agences/[id]`
- Programmes : `/en/transfer-payments`, `/fr/transfer-payments`
- Detail de programme : `/en/transfer-payments/[id]`
- Detail de volet : `/en/transfer-payments/[id]/streams/[streamId]`
- Promoteurs : `/en/proponents`, `/fr/promoteurs`
- Creation de promoteur : `/en/proponents/new`, `/fr/promoteurs/nouveau`
- Modification/detail de promoteur : `/en/proponents/edit/[id]`, `/fr/promoteurs/modifier/[id]`
- Roles : `/en/roles`, `/fr/roles`
- Detail de role : `/en/roles/[id]`, `/fr/roles/[id]`
- Utilisateurs : `/en/users`, `/fr/utilisateurs`
- Detail utilisateur : `/en/users/[id]`, `/fr/utilisateurs/[id]`
- Commun : `/en/admin/common`, `/fr/admin/commun`

Des routes d entente et d enfants de programme existent aussi pour engagements, paiements, previsions, reclamations, surveillances, schemas d evaluation, modeles d approbation et evaluations.

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

## Onglets par route

Les pages detail complexes utilisent un etat d onglet soutenu par la requete avec les composables d onglets. Cela rend les liens vers des sections stables tout en gardant la route centree sur l id d entite. Lors de l ajout d onglets, fournissez des valeurs stables et des libelles localises.

## Routes d extension

Les gestionnaires serveur d extension sont servis sous `/api/extensions/{extensionKey}/...`. L hote resout les parametres, le contexte d entite RBAC optionnel, l activation agence/volet et la configuration avant d executer le gestionnaire d extension.
