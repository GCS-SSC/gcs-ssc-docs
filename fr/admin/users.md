# Utilisateurs

Ouvrez **Utilisateurs** pour créer ou modifier les profils de l'application et attribuer les rôles liés aux fonctions. Affectez les personnes à des dossiers précis dans l'onglet Utilisateurs affectés du dossier ou dans [Gestion des affectations](./assignments.md).

## Liste des utilisateurs

Utilisez la recherche et la pagination pour trouver un utilisateur. La page affiche aussi des statistiques. La permission Lecteur globale pour `user` permet de voir tous les utilisateurs actifs. Une permission d'agence permet de voir votre propre compte et les utilisateurs dont tous les rôles actifs appartiennent à des agences que vous pouvez consulter. Les utilisateurs supprimés sont exclus des listes ordinaires.

La table affiche l'avatar, le nom, le courriel et les actions disponibles. Pour créer un utilisateur, vous devez avoir la permission Contributeur pour `user`. Pour le modifier, vous devez avoir la permission Contributeur couvrant chaque rôle actif qui lui est attribué. Pour le supprimer, vous devez avoir Gestionnaire couvrant tous ces rôles. Si la personne a un rôle global, vous devez avoir un accès global. Vous pouvez parfois consulter un utilisateur sans pouvoir le modifier.

La suppression d'un utilisateur retire ses attributions de rôle actives, mais conserve l'historique d'audit et les références des dossiers. Ses affectations aux dossiers restent visibles comme inactives ou inadmissibles. Demandez à un coordonnateur de remplacer l'utilisateur dans les dossiers qui permettent encore de modifier les affectations.

## Détail d'un utilisateur

La page de détail contient :

- Général, avec le nom, le courriel, l'état de vérification du courriel, l'image et les horodatages.
- Attributions, avec les rôles actifs liés aux fonctions de l'utilisateur.

L'en-tête présente le nom, le courriel, l'avatar et l'état vérifié ou non vérifié. Modifier un nom ou un courriel ne change pas les rôles attribués. L'accès aux promoteurs n'est pas un réglage du profil utilisateur.

Les adresses courriel sont validées et converties en minuscules à la création et à la modification. Par exemple, `Analyst@Example.org` est conservée sous `analyst@example.org`; changer la casse ne crée pas une seconde identité. Une adresse active en double est refusée.

## Attribuer des rôles

Ouvrez **Attributions** et sélectionnez **Attribuer un rôle**. Le sélecteur affiche les rôles actifs que vous pouvez attribuer à cet utilisateur. Les libellés indiquent le contexte global, d'agence ou de programme afin de distinguer les rôles qui portent le même nom.

| Règle | Comportement |
| --- | --- |
| L'utilisateur doit être actif | Un utilisateur supprimé ne peut recevoir un rôle. |
| Le rôle doit être actif | Un rôle supprimé ne peut être attribué. |
| Rôle global | Exige un accès Contributeur global pour `user`. |
| Rôle d'agence ou de programme | Exige un accès Contributeur couvrant l'agence du rôle. |
| L'utilisateur a déjà le rôle | Conserve l'attribution existante sans créer de doublon. |

Le retrait d'un rôle met fin à l'attribution active, mais conserve son historique. Les rôles mis à jour s'appliquent à la prochaine requête. Rechargez la page ou reconnectez-vous si les boutons et menus affichés reflètent encore les anciennes permissions.

## Affectations exactes de travail

Un utilisateur peut être affecté à des promoteurs, ententes, examens, recommandations, réclamations, rapprochements, paiements, prévisions, surveillances, modifications ou engagements précis. Ces affectations directes aux dossiers sont distinctes des rôles liés aux fonctions et n'apparaissent pas sur la page de détail de l'utilisateur.

Une affectation directe désigne le dossier précis que l'utilisateur peut traiter. L'utilisateur doit aussi avoir une permission de rôle pour ce type de travail à la portée actuelle du dossier, globale, d'agence ou de programme. Lecteur permet de consulter le dossier. Contributeur ou Gestionnaire est nécessaire pour le modifier. Les gestionnaires d'affectations ajoutent ou retirent les utilisateurs dans l'onglet Utilisateurs affectés de l'entité ou dans la page de gestion dédiée.

Par exemple, attribuer à un agent un rôle Contributeur pour le programme A définit ce qu'il peut faire dans ce programme. L'ajouter à la liste **Utilisateurs affectés** d'une entente désigne l'entente enregistrée qu'il doit traiter. Si une réclamation a sa propre liste d'affectation, l'affectation à l'entente ne l'affecte pas à cette réclamation. Vérifiez l'affectation exigée par le dossier concerné.

## Activer un utilisateur avec identifiant

La création d'un profil utilisateur ne crée pas de compte avec mot de passe. Un administrateur d'utilisateurs autorisé globalement peut activer un profil actif, non vérifié et sans compte en définissant son mot de passe initial. Un profil vérifié ou un compte géré par un autre fournisseur est rejeté plutôt qu'écrasé.

L'activation enregistre le compte avec mot de passe et marque le courriel comme vérifié en une seule opération. L'application conserve un hachage du mot de passe. Elle ne retourne pas le mot de passe en clair et ne l'inscrit pas dans la piste d'audit. Communiquez-le par un canal approuvé et respectez la politique de l'organisation sur les identifiants.

## Piste d'audit de sécurité

La [page Audit](./audit.md) consigne les changements de sécurité réussis des rôles et utilisateurs dans le même enregistrement. Ces événements couvrent :

- La création, la modification du profil, la suppression et les changements de permission d'un rôle.
- La création, la modification du profil, la suppression et l'activation d'un utilisateur.
- L'attribution d'un rôle à un utilisateur et le retrait de cette attribution.

Chaque événement indique qui a effectué le changement, le type d'action, l'identifiant du rôle ou de l'utilisateur concerné, l'heure et des détails non sensibles. Il exclut les noms, courriels, images, identifiants de connexion, jetons et hachages de mot de passe. Les opérations ordinaires de base de données ne peuvent ni modifier ni supprimer ces événements. Les changements de la liste des utilisateurs affectés à un dossier sont enregistrés et suivis séparément.

## Traitement de l'utilisateur racine

Racine est un utilisateur ordinaire possédant une attribution explicite à un rôle global. Il ne bénéficie d'aucun contournement d'autorisation. Limitez ses permissions et ses capacités de gestion des affectations aux besoins. Utilisez des rôles à portée définie pour l'administration courante et des affectations directes pour les dossiers enregistrés.

## Dépannage de l'accès

Si un utilisateur ne peut voir ou modifier une ressource :

1. Confirmez que l'utilisateur, l'attribution de rôle, le rôle, l'agence parente et les programmes liés sont actifs.
2. Confirmez que le rôle couvre la portée globale, d'agence ou de programme requise.
3. Vérifiez le niveau de permission pour le type de travail et l'agence ou le programme qui possède actuellement le dossier.
4. Pour un travail enregistré exigeant une affectation, trouvez le dossier dont la liste des personnes affectées contrôle l'accès. Confirmez que l'utilisateur y figure et que l'état du dossier permet l'action souhaitée.
5. Pour administrer un registre, vérifiez la capacité `manage_assignments` distincte.
6. Pour une action d'approbation ou d'examen, vérifiez l'affectation de flux distincte.
7. Rechargez la page ou reconnectez-vous si les boutons et menus affichent d'anciennes permissions. L'application revérifie toujours les permissions actuelles à l'enregistrement.

![Onglet Attributions utilisateur](/screenshots/fr/user-assignments.png)

_L'onglet Attributions présente les rôles liés aux fonctions. Utilisez l'onglet Utilisateurs affectés d'un dossier pour y affecter une personne._
