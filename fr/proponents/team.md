# Équipe du promoteur

L’onglet **Équipe** accorde à un utilisateur de l’application un accès à un seul promoteur enregistré précis. Utilisez-le pour le personnel qui doit travailler sur ce profil sans obtenir de privilèges globaux sur tous les promoteurs.

L’accès par équipe est une attribution indépendante et propre à l’entité exacte. Il n’est pas hérité de l’agence responsable du promoteur et ne s’étend ni à un autre promoteur, ni à un programme, ni à une entente liée, ni à un enregistrement frère. Il n’accorde pas non plus la création de promoteurs de premier niveau; la création d’un profil exige toujours la capacité globale directe `applicant_recipient:create`.

## Niveaux d’accès

| Niveau | Actions sur ce promoteur précis |
| --- | --- |
| `read_only` | Lire le profil, ses enregistrements enfants pris en charge et la liste de son équipe. |
| `contributor` | Lire et modifier le profil; lire, créer et modifier les enregistrements enfants pris en charge. |
| `full_access` | Actions du contributeur, plus suppression logique du profil et des enregistrements enfants pris en charge. |

Les autres domaines appliquent toujours leur propre autorisation. Par exemple, une appartenance à l’équipe du promoteur ne rend pas une entente liée lisible et n’affecte pas le membre à une étape d’approbation d’examen.

## Consulter et rechercher l’équipe

Toute personne ayant un accès effectif en lecture au promoteur peut ouvrir la liste de l’équipe. Elle présente les affectations actives dont le compte utilisateur est également actif, triées par nom d’utilisateur. La recherche porte sur le nom ou le courriel et prend en charge la pagination.

Les actions de chaque ligne dépendent de votre plafond de gestion, et non seulement de votre capacité à lire la liste :

- l’accès effectif de modification au promoteur permet de gérer les affectations `read_only` et `contributor`;
- l’accès effectif de modification et de suppression permet aussi de gérer les affectations `full_access`;
- vous ne pouvez ni modifier ni retirer une affectation supérieure à votre plafond, ni accorder un niveau supérieur à celui-ci.

Ces autorisations effectives peuvent provenir d’une capacité globale ou de votre propre affectation exacte à l’équipe.

## Ajouter un membre

Sélectionnez **Ajouter un membre de l’équipe**, choisissez un niveau compris dans votre plafond, puis recherchez un utilisateur. La recherche contient les utilisateurs actifs de l’application qui n’ont pas déjà une affectation active à ce promoteur précis; elle n’est pas limitée par l’agence du promoteur.

L’utilisateur et le niveau d’accès sont obligatoires. Le serveur refuse un utilisateur inactif, une affectation active en double, un niveau inconnu ou une charge utile comportant des champs supplémentaires. Un utilisateur peut appartenir aux équipes de plusieurs promoteurs différents.

## Modifier ou retirer un membre

La modification change seulement le niveau d’accès de l’affectation; elle ne change pas l’utilisateur. Le retrait demande une confirmation et supprime logiquement l’affectation. Un compte utilisateur supprimé disparaît aussi de la liste active. Un utilisateur retiré précédemment peut être ajouté de nouveau, car la prévention des doublons vise les affectations actives.

Les écritures d’appartenance s’exécutent dans une transaction. Le serveur verrouille l’utilisateur touché, verrouille et résout de nouveau le promoteur actif et l’affectation, reconstruit l’autorisation et réapplique les plafonds au niveau existant et au niveau demandé avant l’écriture. Un identifiant d’affectation provenant d’une autre entité ou d’un autre type d’entité est traité comme introuvable.

::: warning Protection contre la perte d’accès
Il n’existe aucune protection spéciale visant le « dernier gestionnaire » ou le retrait de sa propre affectation. La réduction ou le retrait de la seule attribution qui vous donne l’accès de modification peut vous empêcher immédiatement de gérer l’équipe. Avant de modifier votre propre affectation ou la dernière affectation `full_access`, confirmez qu’une autre personne ou un administrateur global conserve un accès suffisant. Le rétablissement exige un autre gestionnaire autorisé; l’équipe n’offre aucune commande d’autorétablissement.
:::

## Guides connexes

- [Profils des promoteurs](./index.md)
- [Rôles et autorisations](../admin/roles.md)
- [Ententes du promoteur](./agreements.md)
