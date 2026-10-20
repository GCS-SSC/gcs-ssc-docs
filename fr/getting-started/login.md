# Connexion

Ouvrez la page de connexion fournie par votre administrateur. La page française est `/fr/connexion`. Si vous ouvrez une page qui exige une connexion, l'application vous envoie vers Connexion. Si vous êtes déjà connecté, Connexion vous envoie vers Accueil.

## Connexion par identifiants

Utilisez le courriel et le mot de passe fournis pour votre installation. Si vous n'avez pas de compte, demandez-en un à votre administrateur.

1. Ouvrez la page de connexion fournie par votre administrateur.
2. Saisissez votre courriel professionnel et votre mot de passe.
3. Choisissez **Connexion**. Une connexion réussie ouvre Accueil. Si les identifiants sont invalides, la page affiche une erreur dans la langue choisie; vérifiez le courriel et le mot de passe, puis réessayez.

Les installations de développement et de test peuvent inclure `root@example.com` avec `password123`. Ces identifiants d'exemple ne constituent pas un compte de production. La personne qui prépare une nouvelle installation de production doit créer son compte administrateur initial.

## Comportement de session

L'application utilise votre session et vos attributions de rôles pour déterminer les pages et actions visibles. Si votre session expire ou est absente, l'application vous demande de vous reconnecter.

## Entrée GitHub

La connexion GitHub apparaît seulement si la personne qui gère votre installation a configuré un identifiant client et un secret. Si cette option n'apparaît pas, utilisez le courriel et le mot de passe fournis par votre administrateur.

## Après connexion

Accueil s'ouvre après la connexion. Les autres destinations dépendent de vos rôles actifs : un **rôle** détermine ce que vous pouvez faire, et sa **portée** limite où vous pouvez le faire, par exemple dans une agence ou un programme. Consultez la [Navigation](./navigation.md) pour les règles complètes des destinations.

- Ententes exige un rôle Lecteur Entente actif dans une portée autorisée; Promoteurs exige un accès Lecteur Promoteur global ou d'agence.
- Gestion des affectations exige une permission active `manage_assignments` pour Entente, Promoteur, Dossier de financement, Pièce de journal ou Correction.
- GWCOA et le téléchargement SQL exigent l'accès Lecteur Système global. Audit exige sa propre permission globale ou d'agence. Déconnexion reste disponible.

Être affecté à un dossier signifie que votre nom figure parmi les personnes responsables du travail sur ce dossier précis. Cette affectation ne remplace pas les permissions de votre rôle. Par exemple, si vous êtes affecté à l'entente AG-2026-014 mais ne voyez pas Ententes, demandez à votre administrateur de vérifier votre rôle Entente actif et sa portée. Si Ententes est visible mais que vous ne pouvez pas modifier ce dossier, demandez-lui de vérifier votre niveau d'accès et votre affectation.
