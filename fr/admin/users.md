# Utilisateurs

Utilisez Utilisateurs pour créer et tenir à jour les profils de l’application et attribuer les rôles liés aux fonctions. Les affectations exactes de travail sont gérées sur l’entité ou dans [Gestion des affectations](./assignments.md); il n’existe aucun indicateur d’accès direct aux promoteurs sur l’utilisateur.

## Liste des utilisateurs

La page Utilisateurs prend en charge la recherche, la pagination et les statistiques. Un Lecteur global de `user` voit tous les utilisateurs actifs. Un lecteur limité à une agence voit son propre compte et les utilisateurs dont les attributions de rôles actives sont entièrement couvertes par ses agences autorisées. Les utilisateurs supprimés sont exclus des listes ordinaires.

La table affiche l’avatar, le nom, le courriel et les actions disponibles. La création exige Contributeur pour `user`. La modification ou la suppression exige aussi que la portée de l’appelant couvre chaque attribution de rôle active de la cible; un utilisateur possédant un rôle global exige un accès global. Gestionnaire est requis pour supprimer. Une ligne peut donc être lisible sans être modifiable.

La suppression d’un utilisateur est logique. Elle retire les attributions utilisateur-rôle actives sans effacer les références historiques d’audit ou métier. Les affectations exactes demeurent visibles comme historique inactif ou inadmissible afin qu’un coordonnateur puisse repérer et remplacer un principal touché lorsque le registre est encore modifiable.

## Détail d’un utilisateur

La page de détail contient :

- Général, avec le nom, le courriel, l’état de vérification du courriel, l’image et les horodatages.
- Attributions, avec les attributions structurelles de rôles actives de l’utilisateur.

L’en-tête présente le nom, le courriel, l’avatar et l’état vérifié ou non vérifié. Modifier un nom ou un courriel ne change pas les rôles attribués. L’accès aux promoteurs n’est pas un réglage du profil utilisateur.

Les adresses courriel sont validées et converties en minuscules à la création et à la modification. Par exemple, `Analyst@Example.org` est conservée sous `analyst@example.org`; changer la casse ne crée pas une seconde identité. Une adresse active en double est refusée.

## Attribuer des rôles

Ouvrez Attributions et sélectionnez **Attribuer un rôle**. Le sélecteur charge les rôles actifs que l’administrateur peut attribuer à cette cible. Les libellés indiquent le contexte global, d’agence ou de programme afin de distinguer les rôles qui portent le même nom.

| Règle | Comportement |
| --- | --- |
| La cible doit être active | Un utilisateur supprimé ne peut recevoir un rôle. |
| Le rôle doit être actif | Un rôle supprimé ne peut être attribué. |
| Rôle global | Exige un accès Contributeur global pour `user`. |
| Rôle d’agence ou de programme | Exige un accès Contributeur couvrant l’agence du rôle. |
| Paire active existante | Retourne l’attribution existante; aucune ligne active en double n’est créée. |

Le retrait d’un rôle supprime logiquement l’attribution. Les rôles mis à jour s’appliquent à la prochaine requête. Rechargez la page ou reconnectez-vous si les boutons et menus affichés reflètent encore les anciennes permissions.

## Affectations exactes de travail

Un utilisateur peut être affecté à des promoteurs, ententes, examens, recommandations, réclamations, rapprochements, paiements, prévisions, surveillances, modifications ou engagements précis. Ces affectations directes aux dossiers sont distinctes des rôles liés aux fonctions et n’apparaissent pas sur la page de détail de l’utilisateur.

Une affectation directe désigne le dossier précis que l’utilisateur peut traiter. Elle doit être accompagnée d’une permission de rôle : au moins Lecteur pour ce type de travail à la portée actuelle globale, d’agence ou de programme du dossier, et Contributeur ou Gestionnaire pour apporter des changements. Les gestionnaires d’affectations ajoutent ou retirent les utilisateurs dans l’onglet Utilisateurs affectés de l’entité ou dans la page de gestion dédiée.

Par exemple, attribuer à un agent un rôle Contributeur pour le programme A définit ce qu’il peut faire dans ce programme. L’ajouter à la liste **Utilisateurs affectés** d’une entente désigne l’entente enregistrée qu’il doit traiter. Si une réclamation a sa propre liste d’affectation, l’affectation à l’entente ne l’affecte pas à cette réclamation. Vérifiez l’affectation exigée par le dossier concerné.

## Activer un utilisateur avec identifiant

La création d’un profil utilisateur ne crée pas de compte avec mot de passe. Un administrateur d’utilisateurs autorisé globalement peut activer un profil actif, non vérifié et sans compte en définissant son mot de passe initial. Un profil vérifié ou un compte géré par un autre fournisseur est rejeté plutôt qu’écrasé.

Le mot de passe est haché avant l’écriture atomique du compte avec identifiant et de l’état vérifié. Le mot de passe brut n’est ni retourné ni inclus dans les métadonnées d’audit. Communiquez-le par un canal approuvé et respectez la politique de l’organisation sur les identifiants.

## Piste d’audit de sécurité

Chaque changement de sécurité enregistré sur un rôle ou un utilisateur crée aussi un `audit.security_audit_event` dans le même enregistrement. Les événements actuels couvrent la création, la modification du profil, la suppression et le remplacement des permissions d’un rôle; la création, la modification du profil, la suppression et l’activation d’un utilisateur; ainsi que la création ou le retrait d’une attribution utilisateur-rôle.

Les enregistrements indiquent l’acteur authentifié, une catégorie d’événement contrainte, le type et l’identifiant de la cible, l’horodatage et des métadonnées structurelles non sensibles. Ils excluent les noms, courriels, images, identifiants de connexion, jetons et hachages de mot de passe. Des déclencheurs refusent les modifications et suppressions d’événements d’audit. Les changements du registre d’une entité exacte sont régis par leur propre transaction d’affectation et leurs preuves de cycle de vie.

## Traitement de l’utilisateur racine

Racine est un utilisateur ordinaire possédant une attribution explicite à un rôle global. Il ne bénéficie d’aucun contournement d’autorisation. Gardez ses permissions et ses capacités de gestion des affectations limitées et auditables; utilisez des rôles à portée définie pour l’administration courante et des affectations exactes pour les dossiers enregistrés.

## Dépannage de l’accès

Si un utilisateur ne peut voir ou modifier une ressource :

1. Confirmez que l’utilisateur, l’attribution de rôle, le rôle, l’agence parente et les programmes liés sont actifs.
2. Confirmez que la structure du rôle correspond à une portée globale, d’agence ou de programme.
3. Vérifiez le niveau de permission pour le type de travail et l’agence ou le programme qui possède actuellement le dossier.
4. Pour un travail enregistré exigeant une affectation, vérifiez quelle liste de personnes affectées contrôle l’accès, confirmez que l’utilisateur y figure et vérifiez que l’état du dossier permet l’action souhaitée.
5. Pour administrer un registre, vérifiez la capacité `manage_assignments` distincte.
6. Pour une action d’approbation ou d’examen, vérifiez l’affectation de flux distincte.
7. Rechargez la page ou reconnectez-vous si les commandes clientes sont périmées; les écritures serveur emploient toujours l’état courant de la base de données.

![Onglet Attributions utilisateur](/screenshots/fr/user-assignments.png)

_Exemple réel de l’environnement initial. L’onglet Attributions présente seulement les rôles structurels; les affectations aux entités exactes sont gérées ailleurs._
