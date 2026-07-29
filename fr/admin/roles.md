# Roles

Les roles definissent les combinaisons action, sujet et portee qui deviennent les permissions des utilisateurs. L application applique les regles de role dans les controles visibles et lors de l enregistrement; un role doit donc rester coherent avant d etre utilise.

## Liste des roles

La page Roles prend en charge pagination et recherche. Les utilisateurs avec `role:read` global voient tous les roles. Les lecteurs limites a des agences voient les roles globaux et les roles de leurs agences autorisees. La table inclut les noms bilingues, descriptions, contexte d agence, capacites et ids de programmes selectionnes.

Les utilisateurs avec acces de creation peuvent ouvrir la modale de role. Les utilisateurs avec acces de mise a jour pour la portee du role peuvent le modifier. Les suppressions sont logiques.

## Selection de portee

Un role peut etre :

- Global : aucune agence selectionnee.
- Limite a une agence : une agence selectionnee et aucun programme.
- Limite a un programme : une agence selectionnee et un ou plusieurs programmes selectionnes.

Le formulaire offre l option globale seulement lorsque l utilisateur courant peut creer des roles a portee globale. La selection de programme apparait seulement apres le choix d une agence. Les options de programme sont chargees depuis les paiements de transfert filtres par agence.

Après la création, la portée parente du rôle est fixe : un rôle global demeure global et un rôle d’agence demeure lié à son agence d’origine. En mode modification, le sélecteur global/agence est désactivé. Un rôle d’agence peut tout de même passer d’une portée d’agence à une portée de programme, ou l’inverse, en ajoutant ou en retirant des programmes de cette agence, pourvu que ses capacités soient valides pour la portée obtenue. Les capacités `agency`, `role` et `user` doivent être retirées avant de faire passer le rôle à une portée de programme.

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

Les capacites sont des paires action-sujet explicites. Les actions sont `create`, `read`, `update` et `delete`. Les seuls sujets de role sont `system`, `agency`, `transfer_payment`, `role`, `user` et `agreement`. L acces aux promoteurs ne constitue volontairement pas une capacite de role; il est configure par des indicateurs directs sur l utilisateur et des equipes exactes de promoteur.

La portee limite les sujets attribuables :

| Sujet du role | Role global | Role d agence | Role de programme |
| --- | :---: | :---: | :---: |
| `system` | Oui | Non | Non |
| `agency` | Oui | Oui | Non |
| `transfer_payment` | Oui | Oui | Oui |
| `role` | Oui | Oui | Non |
| `user` | Oui | Oui | Non |
| `agreement` | Oui | Oui | Oui |

Il n existe aucun sujet generique ou `all`. La portee de programme est derivee des liens actifs du role vers les programmes, et non d un champ de portee independant.

L onglet Capacites du detail de role filtre les capacites permises pour la portee courante. Si un utilisateur tente un basculement invalide, l application affiche une erreur de portee et n enregistre pas la capacite invalide.

## Onglets detail

Le detail de role contient :

- General, avec noms bilingues, descriptions, agence et contexte de portee.
- Capacites, avec cartes d interrupteurs pour les capacites permises.

L’enregistrement de l’onglet Général modifie seulement le profil et la portée du rôle. Les interrupteurs de capacités utilisent une opération séparée et prennent effet immédiatement ; enregistrer le profil ne remplace donc pas les capacités, et basculer une capacité n’écrase pas les modifications de profil non enregistrées. Lorsqu’un rôle d’agence est modifié, la sélection complète de programmes peut faire passer la portée effective de l’agence au programme, ou l’inverse, sans changer l’agence du rôle. L’opération est rejetée si la portée obtenue est incompatible avec les capacités courantes.

## Conception recommandee

Utilisez peu de modeles de role durables :

- Administrateur racine : role global ordinaire contenant les paires action-sujet explicites requises pour les operateurs systeme de confiance. Le role initial contient les 24 paires valides et ne contourne pas l autorisation.
- Administrateur d agence : permissions d agence, d utilisateur, de role, de paiement de transfert et d entente limitees a une agence. L acces aux promoteurs est attribue separement sur les utilisateurs ou par des equipes exactes.
- Gestionnaire de programme : permissions paiement de transfert et entente pour des programmes selectionnes.
- Operateur d entente : creation/mise a jour des ententes et flux enfants dans une portee programme ou agence.
- Examinateur ou approbateur : seulement les permissions ordinaires de lecture/mise a jour d entite requises par le processus. L attribution de flux determine qui peut executer une etape assignee; elle ne donne aucun acces a l entite par elle-meme.
- Analyste lecture seule : lecture sans creation, mise a jour ou suppression.

Evitez de creer de nombreux roles presque identiques. Preferez un role par fonction et portee par attribution.

![Onglet Capacites d un role](/screenshots/fr/role-abilities.png)

_Capture reelle de l environnement de developpement avec donnees semees. Les enregistrements montres sont seulement des exemples et ne sont pas crees dans une installation fraiche._
