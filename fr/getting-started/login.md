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
- L’entrée Ententes apparaît lorsque l’utilisateur possède une permission de rôle `agreement:read` de portée appropriée ou un accès en lecture accordé par au moins une équipe exacte d’entente.
- L’entrée Promoteurs apparaît lorsque l’utilisateur possède l’indicateur global direct Promoteur `read` ou un accès en lecture accordé par au moins une équipe exacte de promoteur.
- L’entrée Commun apparaît seulement lorsque l’utilisateur possède l’accès global explicite `system:read`.
- Le menu utilisateur contient toujours Déconnexion et offre le téléchargement SQL seulement avec l’accès global explicite `system:read`.

Si un utilisateur se connecte mais voit moins de pages que prévu, vérifiez les attributions structurelles de rôle, les indicateurs directs de promoteur et l’appartenance aux équipes exactes avant de vérifier l’interface utilisateur.
