# Documentation GCS-SSC

GCS-SSC est un systeme bilingue de subventions et contributions pour configurer les agences, les programmes, les volets, les promoteurs, les ententes, les examens, les approbations, les paiements, les previsions, les reclamations, la surveillance, la generation de documents, les roles et les utilisateurs.

Cette documentation suit la hierarchie de l application de production : menu principal, page, onglets, sous-onglets, puis modales ou assistants. Elle suppose qu une nouvelle installation commence sans donnees metier ou de configuration et avec seulement un utilisateur racine. Les donnees semees utilisees en developpement ou dans les captures sont seulement des exemples; elles ne sont pas presentes dans une installation de production propre.

## Ordre de configuration initiale

1. Connectez-vous avec l utilisateur racine.
2. Creez au moins une agence.
3. Ajoutez les donnees de reference de l agence, comme les exercices, les types d adresse, les categories de couts, les types d entente et les sous-types de promoteur.
4. Creez les roles et attribuez les capacites.
5. Creez ou invitez les utilisateurs, puis attribuez les roles.
6. Creez les programmes sous les agences.
7. Creez les volets sous les programmes et configurez les listes, les examens, les modeles d approbation et les extensions.
8. Creez les promoteurs.
9. Creez les ententes, puis leurs enregistrements de flux enfants.

## Menu principal

La barre laterale contient Accueil, Agences, Programmes, Ententes, Promoteurs, Roles, Utilisateurs et Commun. Commentaires et Aide sont presents dans l interface, mais dans le code actuel ils pointent encore vers des URL de modele et doivent etre traites comme des surfaces non terminees.

## Carte de documentation

Utilisez Demarrage pour l integration initiale, Administration pour la configuration des agences et des acces, Programmes et Ententes pour les flux de livraison, Concepts pour les comportements transversaux, et Reference developpeur pour les routes et les tests.
