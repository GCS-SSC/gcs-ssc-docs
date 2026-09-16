# Connexion

La page de connexion est `/fr/connexion`. Les utilisateurs anonymes y sont redirigés lorsqu’ils demandent une page authentifiée. Un utilisateur déjà connecté qui ouvre cette page est redirigé vers Accueil.

## Connexion par identifiants

L’application prend en charge la connexion par courriel et mot de passe avec Better Auth. Dans les données de développement et de test, `root@example.com` avec `password123` peut exister. Ces identifiants servent seulement aux exemples de données initiales; une installation de production propre exige un compte administrateur provisionné par le déploiement ou l’amorçage.

Saisissez votre courriel et votre mot de passe, puis choisissez Connexion. Des identifiants invalides vous laissent sur la page avec une erreur localisée. Après la connexion, l’application actualise votre session et ouvre Accueil.

## Comportement de session

L’application utilise votre session et vos attributions de rôles pour déterminer les pages et actions visibles. Une session absente ou expirée entraîne une redirection vers la connexion.

## Entrée GitHub

La connexion GitHub est disponible seulement si le déploiement configure à la fois son identifiant client et son secret. Si cette option n’apparaît pas, utilisez les identifiants fournis par votre administrateur; elle n’est pas activée par défaut.

## Après connexion

La barre latérale dépend des permissions :

- Accueil, Programmes et Rôles sont affichés; leurs données restent soumises aux permissions. Agences et Utilisateurs exigent le plafond Lecteur correspondant.
- Ententes apparaît avec un plafond Lecteur Entente actif dans une portée autorisée.
- Promoteurs apparaît avec un plafond Lecteur Promoteur global ou d’agence actif.
- Gestion des affectations apparaît avec une capacité `manage_assignments` Entente ou Promoteur active.
- GWCOA et le téléchargement SQL exigent Lecteur Système global; Audit exige sa permission globale explicite. Déconnexion reste disponible.

Si vous voyez moins de pages que prévu, vérifiez avec votre administrateur vos attributions de rôles actives, leurs niveaux d’accès et leurs portées. Les affectations exactes déterminent les modifications permises et le Travail affecté; elles ne remplacent pas les permissions qui rendent une destination accessible.
