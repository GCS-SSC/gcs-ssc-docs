# Connexion

La page localisee de connexion est `/fr/login`. Les utilisateurs anonymes sont rediriges vers la page de connexion localisee lorsqu ils demandent une page authentifiee. Si un utilisateur authentifie ouvre `/fr/login`, il est redirige vers Accueil.

## Connexion par identifiants

L application prend en charge la connexion par courriel et mot de passe avec Better Auth. Dans les donnees de developpement et de test, `root@example.com` avec `password123` peut exister, mais un deploiement de production doit traiter cela uniquement comme une information de donnees semees. Une installation de production propre a besoin d un compte racine provisionne par le deploiement ou l amorcage.

Le formulaire collecte le courriel et le mot de passe, puis soumet l action Connexion. Des identifiants invalides gardent l utilisateur sur la page et affichent une erreur localisee. Apres la connexion, l application actualise la session et route l utilisateur vers Accueil.

## Comportement de session

L application utilise la session de l utilisateur connecte et ses attributions de roles pour determiner les pages et actions visibles. Une session absente ou expiree redirige les pages authentifiees vers la connexion.

## Entree GitHub

Le code source contient encore une entree de connexion GitHub/sociale dans l experience de connexion, mais les tests la traitent comme indisponible sauf si la configuration de deploiement l active. Ne la decrivez pas comme un chemin de connexion operationnel dans une installation par defaut.

## Apres connexion

La barre laterale depend des permissions :

- Accueil, Agences, Programmes, Roles et Utilisateurs font partie de la navigation principale.
- Ententes apparait seulement lorsque l utilisateur a une capacite de lecture sur les ententes.
- Promoteurs apparait seulement lorsque l utilisateur a une lecture globale demandeur/beneficiaire.
- Commun apparait seulement lorsque l utilisateur a une lecture globale `all`.
- Le menu utilisateur contient toujours Deconnexion et contient le telechargement SQL seulement pour les utilisateurs racine avec lecture globale `all`.

Si un utilisateur se connecte mais voit moins de pages que prevu, verifiez d abord l attribution de role, les capacites du role et sa portee.
