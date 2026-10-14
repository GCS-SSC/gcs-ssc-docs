# Routes

Une route est l’adresse qui ouvre une page ou envoie une demande à l’application. Cette référence s’adresse surtout aux équipes de développement et de soutien. Les agents peuvent utiliser la liste pour reconnaître les adresses anglaises et françaises; naviguer dans l’application n’exige aucun changement de code. Ouvrir un lien n’accorde jamais l’accès à son dossier.

Les pages Nuxt définissent les routes et Nuxt i18n fournit leurs versions linguistiques. Utilisez les noms de route de `app/utils/route-locations.ts` avec `localePath` pour construire les liens.

## Pages localisees principales

- Accueil : `/en/`, `/fr/`
- Connexion : `/en/login`, `/fr/connexion`
- Agences : `/en/agencies`, `/fr/agences`
- Détail d’agence : `/en/agencies/[id]`, `/fr/agences/[id]`
- Possibilités : `/en/funding-opportunities`, `/fr/possibilites-de-financement`
- Réceptions : `/en/funding-case-intakes`, `/fr/dossiers-de-financement`
- Pièces de journal : `/en/journal-vouchers`, `/fr/pieces-de-journal`
- Programmes : `/en/transfer-payments`, `/fr/paiements-de-transfert`
- Détail de programme : `/en/transfer-payments/[id]`, `/fr/paiements-de-transfert/[id]`
- Détail de volet : `/en/transfer-payments/[id]/streams/[streamId]`, `/fr/paiements-de-transfert/[id]/volets/[streamId]`
- Promoteurs : `/en/proponents`, `/fr/promoteurs`
- Création de promoteur : `/en/proponents/new`, `/fr/promoteurs/nouveau`
- Modification/détail de promoteur : `/en/proponents/edit/[id]`, `/fr/promoteurs/modifier/[id]`
- Rôles : `/en/roles`, `/fr/roles`
- Détail de rôle : `/en/roles/[id]`, `/fr/roles/[id]`
- Utilisateurs : `/en/users`, `/fr/utilisateurs`
- Détail utilisateur : `/en/users/[id]`, `/fr/utilisateurs/[id]`
- GWCOA : `/en/admin/gwcoa`, `/fr/admin/gwcoa`
- Audit : `/en/admin/audit`, `/fr/admin/audit`

Des routes d’entente et de dossiers liés aux programmes existent aussi pour les engagements, paiements, prévisions, réclamations, surveillances, documents générés, schémas d’évaluation, modèles d’approbation, modèles de documents et évaluations.

## Aide de route

`appRouteLocations` contient des fonctions nommées comme `home`, `login`, `agencies`, `agencyDetail`, `proponents`, `proponentCreate`, `proponentEdit`, `agreements`, `agreementDetail`, `roles`, `roleDetail`, `users` et `userDetail`.

Utilisez :

```ts
const localePath = useLocalePath()
await navigateTo(localePath(appRouteLocations.proponentEdit(id)))
```

## Middleware

Le middleware vérifie l’accès avant l’ouverture d’une page. Par exemple, une personne déconnectée qui ouvre une page protégée doit se connecter; une personne connectée doit aussi avoir les permissions de la section demandée.

`auth.global.ts` protège les routes authentifiées et redirige les utilisateurs connectés hors de la page de connexion. `admin-gwcoa.ts` protège GWCOA en exigeant la permission globale explicite `system:read`. L’utilisateur racine initial respecte cette règle grâce à un rôle global ordinaire ; il n’existe aucun contournement réservé au compte racine.

`admin-audit.ts` exige séparément `audit:read` global ou d’agence; l’accès Système ne donne pas l’accès Audit.

## Style des routes API

Les routes API se trouvent sous `server/api`. Les fichiers dynamiques comme `[id].get.ts`, `[id].patch.ts` et `[id].delete.ts` correspondent aux méthodes HTTP. Vérifiez l’autorisation avant toute modification et déterminez, lorsque possible, la portée des permissions à partir du dossier cible.

## Écritures serveur protégées

Ces règles empêchent un enregistrement d’utiliser des permissions périmées ou de modifier un dossier pendant un changement de portée. Par exemple, si une entente est réaffectée pendant l’enregistrement d’une ligne budgétaire, le serveur doit vérifier sa portée actuelle avant d’écrire. L’ordre de verrouillage ci-dessous est une exigence de développement qui empêche aussi les enregistrements concurrents de se bloquer indéfiniment.

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

Un lien peut mémoriser l’onglet sélectionné et le dossier. Par exemple, partager le lien d’un onglet d’entente sélectionné aide un collègue à ouvrir la même section, s’il y a accès.

Les pages de détail complexes conservent l’onglet choisi dans les paramètres de l’adresse, à l’aide de fonctions partagées. Cela permet de partager un lien vers une section tout en gardant l’identifiant du dossier dans la route. Lors de l’ajout d’onglets, fournissez des valeurs stables et des libellés traduits.

## Routes d extension

Les gestionnaires serveur d’extension sont accessibles sous `/api/extensions/{extensionKey}/...`. L’hôte lit les paramètres de route et appelle le gestionnaire de l’extension correspondante.

Pour les gestionnaires avec RBAC, l’hôte résout le paramètre d’entité, de volet ou d’agence déclaré avant d’exécuter le code de l’extension. Il vérifie l’authentification et le contrôle d’accès, l’activation pour l’agence et le volet ainsi que la configuration résolue de l’extension, puis joint le contexte stable pour `defineGcsExtensionRouteHandler` : paramètres, contexte d’authentification, configuration, contexte d’entité, de volet ou d’agence, portée autorisée, `writeAuthorization` et aides filtrées `agreementAccess`.

Les transactions d’écriture d’une extension appellent `writeAuthorization.lockAuthState(trx)` avant les verrous du cycle de vie, puis `authorizeCurrentScope(trx)` ou la solution de compatibilité `authorizeCurrentEntity(trx)` après ces verrous. Les routes qui présentent des choix d’entente utilisent `agreementAccess.listVisibleOptions(...)`; les écritures visant l’entente sélectionnée doivent aussi utiliser `lockAndAuthorizeAgreement(...)` dans la même transaction.

Les gestionnaires avec `auth: "manual"` ne reçoivent pas le contexte de contrôle d’accès de l’hôte. Ils doivent vérifier eux-mêmes les permissions applicables au dossier.

La configuration d’extension d’un volet utilise une page complète : `/en/extension/[id]/config` ou `/fr/extension/[id]/configuration`, avec les paramètres de requête `streamId`, `transferPaymentId` et `agencyId`.

Possibilités et réceptions exigent des sujets distincts (`transfer_payment` et `funding_case`). Corrections/créances d’entente et notes de crédit de promoteur suivent leurs domaines financiers dédiés. Les sections conservent sélection d’URL et états de reprise. Espaces d’extension d’organisme et détails d’extension d’entente utilisent les composants enregistrés dans le cadre hôte; leur URL imbriquée ne donne aucune autorité. Voir [Contrats du SDK](./extensions-authoring.md).
