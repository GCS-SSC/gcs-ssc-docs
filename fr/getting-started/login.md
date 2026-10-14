# Connexion

La page de connexion est `/fr/connexion`. Les utilisateurs anonymes y sont redirigés lorsqu’ils demandent une page authentifiée. Un utilisateur déjà connecté qui ouvre cette page est redirigé vers Accueil.

## Connexion par identifiants

L’application prend en charge la connexion par courriel et mot de passe avec Better Auth. Dans les données de développement et de test, `root@example.com` avec `password123` peut exister. Ces identifiants servent seulement aux exemples de données initiales; une installation de production propre exige un compte administrateur provisionné par le déploiement ou l’amorçage.

1. Ouvrez la page de connexion fournie par votre administrateur.
2. Saisissez votre courriel professionnel et votre mot de passe.
3. Choisissez **Connexion**. Une connexion réussie ouvre Accueil. Si les identifiants sont invalides, la page affiche une erreur dans la langue choisie; vérifiez le courriel et le mot de passe, puis réessayez.

Utilisez le compte fourni pour votre installation. Les identifiants de développement ci-dessus ne constituent pas un compte de production.

## Comportement de session

L’application utilise votre session et vos attributions de rôles pour déterminer les pages et actions visibles. Une session absente ou expirée entraîne une redirection vers la connexion.

## Entrée GitHub

La connexion GitHub est disponible seulement si le déploiement configure à la fois son identifiant client et son secret. Si cette option n’apparaît pas, utilisez les identifiants fournis par votre administrateur; elle n’est pas activée par défaut.

## Après connexion

Accueil s’ouvre après la connexion. Les autres destinations dépendent de vos rôles actifs : un **rôle** détermine ce que vous pouvez faire, et sa **portée** limite où vous pouvez le faire (par exemple, dans une agence ou un programme). Consultez la [Navigation](./navigation.md) pour les règles complètes des destinations.

- Ententes exige un rôle Lecteur Entente actif dans une portée autorisée; Promoteurs exige un accès Lecteur Promoteur global ou d’agence.
- Gestion des affectations exige une permission active `manage_assignments` pour Entente, Promoteur, Dossier de financement, Pièce de journal ou Correction.
- GWCOA et le téléchargement SQL exigent l’accès Lecteur Système global. Audit exige sa propre permission globale ou d’agence. Déconnexion reste disponible.

Être affecté à un dossier signifie que votre nom figure parmi les personnes responsables du travail sur ce dossier précis. Cette affectation ne remplace pas les permissions de votre rôle. Par exemple, si vous êtes affecté à l’entente AG-2026-014 mais ne voyez pas Ententes, demandez à votre administrateur de vérifier votre rôle Entente actif et sa portée. Si Ententes est visible mais que vous ne pouvez pas modifier ce dossier, demandez-lui de vérifier votre niveau d’accès et votre affectation.
