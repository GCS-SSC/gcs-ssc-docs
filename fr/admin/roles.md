# Roles

Les roles definissent les combinaisons action, sujet et portee qui deviennent les permissions des utilisateurs. L application applique les regles de role dans les controles visibles et lors de l enregistrement; un role doit donc rester coherent avant d etre utilise.

## Liste des roles

La page Roles prend en charge pagination et recherche. Les lecteurs racine ou globaux voient tous les roles. Les lecteurs limites a des agences voient les roles globaux et les roles de leurs agences autorisees. La table inclut les noms bilingues, descriptions, contexte d agence, capacites et ids de programmes selectionnes.

Les utilisateurs avec acces de creation peuvent ouvrir la modale de role. Les utilisateurs avec acces de mise a jour pour la portee du role peuvent le modifier. Les suppressions sont logiques.

## Selection de portee

Un role peut etre :

- Global : aucune agence selectionnee.
- Limite a une agence : une agence selectionnee et aucun programme.
- Limite a un programme : une agence selectionnee et un ou plusieurs programmes selectionnes.

Le formulaire offre l option globale seulement lorsque l utilisateur courant peut creer des roles a portee globale. La selection de programme apparait seulement apres le choix d une agence. Les options de programme sont chargees depuis les paiements de transfert filtres par agence.

Après la création, la portée parente du rôle est fixe : un rôle global demeure global et un rôle d’agence demeure lié à son agence d’origine. En mode modification, le sélecteur global/agence est désactivé. Un rôle d’agence peut tout de même passer d’une portée d’agence à une portée de programme, ou l’inverse, en ajoutant ou en retirant des programmes de cette agence, pourvu que ses capacités soient valides pour la portée obtenue. Les capacités `agency` doivent être retirées avant de faire passer le rôle à une portée de programme.

Les selecteurs d’agence et de programme recherchent tous les dossiers accessibles a l’administrateur courant, et non seulement la premiere page. Lors de la modification d’un role, les selections enregistrees sont resolues vers leur nom d’affichage meme si elles ne figurent pas dans les resultats courants. Un programme qui n’existe plus ou qui n’est plus disponible dans la portee du role est indique comme indisponible. Un echec de chargement temporaire affiche une action Reessayer sans retirer la selection enregistree.

## Regles de portee

La portee effective vient de la structure du role :

| Structure du role | Portee effective |
| --- | --- |
| Aucune agence selectionnee | Globale |
| Agence selectionnee et aucun programme selectionne | Agence |
| Agence selectionnee et un ou plusieurs programmes selectionnes | Programme |

L application rejette les roles de programme sans agence. Elle rejette aussi les programmes selectionnes qui n appartiennent pas a l agence du role.

## Regles de capacites

Les capacites sont des paires action/sujet. Les actions sont creer, lire, mettre a jour et supprimer. Les sujets comprennent all, agency, transfer payment, role, user, applicant/recipient et agreement.

La portee limite les sujets attribuables :

| Regle | Comportement |
| --- | --- |
| Les capacites `all` sont seulement globales | Elles ne peuvent pas etre attribuees aux roles d agence ou de programme. |
| Les capacites `agency` ne sont pas portees par programme | Elles sont permises sur les roles globaux ou d agence. |
| Les autres sujets suivent la portee du workflow | Ils peuvent etre utilises sur les roles globaux, d agence ou de programme lorsque le flux metier le permet. |

L onglet Capacites du detail de role filtre les capacites permises pour la portee courante. Si un utilisateur tente un basculement invalide, l application affiche une erreur de portee et n enregistre pas la capacite invalide.

## Onglets detail

Le detail de role contient :

- General, avec noms bilingues, descriptions, agence et contexte de portee.
- Capacites, avec cartes d interrupteurs pour les capacites permises.

L enregistrement de l onglet General modifie seulement le profil et la portee du role. Les interrupteurs de capacites utilisent une operation separee et prennent effet immediatement; enregistrer le profil ne remplace donc pas les capacites, et basculer une capacite n ecrase pas les modifications de profil non enregistrees. Lorsqu un role d agence est modifie, la selection complete de programmes peut faire passer la portee effective de l agence au programme, ou l inverse, sans changer l agence du role. L operation est rejetee si la portee obtenue est incompatible avec les capacites courantes.

## Conception recommandee

Utilisez peu de modeles de role durables :

- Administrateur racine : permissions globales `all` pour les operateurs systeme de confiance.
- Administrateur d agence : permissions agence, utilisateur, role, promoteur, programme et entente pour une agence.
- Gestionnaire de programme : permissions paiement de transfert et entente pour des programmes selectionnes.
- Operateur d entente : creation/mise a jour des ententes et flux enfants dans une portee programme ou agence.
- Examinateur ou approbateur : lecture/mise a jour limitee aux zones requises.
- Analyste lecture seule : lecture sans creation, mise a jour ou suppression.

Evitez de creer de nombreux roles presque identiques. Preferez un role par fonction et portee par attribution.

![Onglet Capacites d un role](/screenshots/fr/role-abilities.png)

_Capture reelle de l environnement de developpement avec donnees semees. Les enregistrements montres sont seulement des exemples et ne sont pas crees dans une installation fraiche._
