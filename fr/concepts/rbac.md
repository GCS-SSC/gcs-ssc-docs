# RBAC

GCS-SSC utilise un controle d acces base sur les roles avec portee. Une permission n est pas seulement une action et un sujet; elle a aussi une portee derivee du role attribue.

## Pieces centrales

- Capacite : paire action/sujet, par exemple `read` sur `agreement`.
- Role : collection bilingue de capacites.
- Portee du role : globale, agence ou programme.
- Attribution utilisateur : lien entre un utilisateur et un role.
- Portee accordee : portee effective construite depuis le role, l id d agence et l id optionnel de programme.

L application calcule les permissions effectives a partir des attributions actives et structurellement valides apres la connexion. Les roles supprimes logiquement, les agences parentes supprimees, les liens de programme supprimes ou appartenant a une autre agence, ainsi que les roles de programme sans lien de programme actif n accordent aucune permission.

## Actions et sujets

Les actions sont creer, lire, mettre a jour et supprimer. Les sujets comprennent all, agency, transfer payment, role, user, applicant/recipient et agreement.

Le sujet `all` est special. Il peut satisfaire toute verification de sujet lorsque l action correspond, mais il est valide seulement pour les roles globaux/racine.

## Hierarchie de portee

Les portees sont hierarchiques :

- Global couvre toutes les portees.
- Agence couvre cette agence et ses enfants.
- Programme couvre le programme de paiements de transfert choisi.
- Entite couvre un chemin sous un programme, comme un dossier enfant d entente.

Les controles de couverture verifient la hierarchie et les ids. Une permission pour une agence ne couvre pas une autre agence. Une permission pour un programme ne couvre pas un autre programme de la meme agence.

## Regles de portee des roles

La portee de role est derivee de la structure :

| Structure du role | Portee effective |
| --- | --- |
| Aucune agence selectionnee | Globale |
| Agence selectionnee et aucun programme selectionne | Agence |
| Agence selectionnee et un ou plusieurs programmes selectionnes | Programme |

L attribution de capacites est restreinte :

- Les capacites `all` sont seulement globales.
- Les capacites `agency` sont permises a portee globale ou agence.
- Les autres capacites peuvent etre portees selon la conception du role.

L application rejette les donnees de portee incoherentes, les roles de programme sans agence et les ids de programme hors de l agence choisie.

## Visibilite demandeur/beneficiaire non portee

Le sujet demandeur/beneficiaire est traite comme non porte pour les controles de visibilite large. Cela permet a l element Promoteurs et a la liste de fonctionner avec une lecture globale demandeur/beneficiaire. Toutefois, creer, mettre a jour et supprimer appliquent encore les regles d agence principale et d equipe.

## Acces par equipe

Certains flux d entite permettent un repli par equipe. Pour les portees d entite sous programme, l application verifie la portee du role puis toute attribution d equipe sur l entite. Les promoteurs ont aussi une table d equipe specifique. Un membre d equipe de promoteur peut aider a satisfaire une mise a jour ou suppression lorsque l utilisateur a deja la capacite demandeur/beneficiaire mais pas de permission directe sur l agence principale.

## Application dans l interface et a l enregistrement

L interface cache les liens, boutons et onglets que l utilisateur ne peut pas utiliser. Les actions d enregistrement sont aussi verifiees; un controle masque est donc un indice d utilisabilite, pas la source de permission.

## Exemples pratiques

- Administrateur racine : role global avec toutes les actions `all` sur `all`.
- Administrateur d agence : role d agence avec capacites agence, utilisateur, role, promoteur, programme et entente pour une agence.
- Gestionnaire de programme : role de programme avec capacites paiement de transfert et entente pour les programmes selectionnes.
- Membre d equipe promoteur : capacite demandeur/beneficiaire plus appartenance a l equipe d un promoteur precis peut permettre la gestion du profil meme sans permission directe d agence principale.
