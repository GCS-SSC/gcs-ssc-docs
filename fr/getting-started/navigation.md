# Navigation

GCS-SSC utilise une interface tableau de bord avec barre laterale gauche, barre superieure sur chaque page, fils d Ariane sur les pages detail et onglets dans les dossiers complexes. Le menu n est pas statique : il reflete les capacites de l utilisateur connecte.

## Visibilite de la barre laterale

- Accueil ouvre le tableau de bord.
- Agences ouvre les profils d agence et les references propres aux agences.
- Programmes ouvre les profils de paiements de transfert et la configuration de volet.
- Ententes apparait seulement lorsque `agreement:read` existe dans une portee autorisee.
- Promoteurs apparait seulement lorsque `applicant_recipient:read` est accorde.
- Roles ouvre la gestion des roles RBAC.
- Utilisateurs ouvre la gestion des utilisateurs et attributions.
- Commun apparait seulement lorsque l utilisateur a `all:read` a portee globale/racine.
- Commentaires et Aide sont visibles comme liens secondaires, mais pointent vers des liens de gabarit et ne sont pas des flux d aide implementes.

L autorisation est quand meme appliquee lorsqu un bouton ou un lien est cache. Les controles masques aident les utilisateurs a eviter les actions indisponibles, mais les roles restent la source de verite.

## Modeles de page

Les pages de liste fournissent recherche, pagination, filtres de statut optionnels, controles de colonnes et actions de ligne. Les boutons de creation apparaissent seulement lorsque l utilisateur a l acces de creation pour le sujet et la portee.

Les pages detail contiennent generalement :

- Un sommaire repliable.
- Un fil d Ariane vers la liste parente.
- Des onglets verticaux pour les sections.
- Une zone de contenu avec formulaires, tables ou composants d execution.
- Des actions modifier, ajouter, supprimer, enregistrer et annuler seulement lorsque permises.

## URL d onglets

Plusieurs pages detail stockent l onglet selectionne dans l URL. Cela permet des liens directs vers des sections comme les exercices d une agence, les capacites d un role ou l equipe d un promoteur. Lors du changement de langue, l etat d onglet se remet de facon sure si la page localisee ne peut pas porter la meme section.

## Routes de langue

L application utilise des URL prefixees avec Nuxt i18n :

- Les pages anglaises sont sous `/en/...`.
- Les pages francaises sont sous `/fr/...`.
- Certaines pages francaises ont des segments traduits, comme `/fr/agences`, `/fr/utilisateurs`, `/fr/promoteurs` et `/fr/admin/commun`.

En exploitation, partagez des URL localisees pour que les utilisateurs reviennent dans la langue attendue.

## Depannage de navigation

Si une page manque dans la barre laterale, verifiez les attributions actives depuis le detail de l utilisateur et confirmez que le role attribue possede la bonne action, le bon sujet et la bonne portee. Si le lien apparait mais qu une action est refusee, le role peut permettre la visibilite de liste sans permettre creer, mettre a jour ou supprimer dans l agence ou le programme vise.

![Navigation et changement de langue](/screenshots/fr/navigation.png)

_Capture reelle de l environnement de developpement avec donnees semees. Les enregistrements montres sont seulement des exemples et ne sont pas crees dans une installation fraiche._
