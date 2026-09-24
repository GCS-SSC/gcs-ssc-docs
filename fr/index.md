# Documentation GCS-SSC

GCS-SSC est un système bilingue de subventions et de contributions pour configurer les agences, programmes, volets, promoteurs, ententes, examens, approbations, paiements, prévisions, réclamations, surveillances, documents, rôles et utilisateurs.

Cette documentation suit la hiérarchie de l’application : menu principal, page, onglets, sous-onglets, puis formulaires et assistants. Une nouvelle installation de production commence sans configuration métier; les données de développement et les captures sont des exemples. Commencez par la [Configuration d’un système vide](./getting-started/empty-system-setup.md) pour les prérequis complets et un exemple de configuration.

## Ordre de configuration initiale

1. Connectez-vous avec l’administrateur initial et confirmez ses permissions et portées.
2. Créez l’[organisation GWCOA](./admin/common-admin.md) requise, puis une [agence](./admin/agencies.md).
3. Configurez les références d’agence : statuts métier, exercices, catégories de coûts, types de pièces jointes, types d’entente et sous-types de promoteur.
4. Créez les [rôles](./admin/roles.md), les [utilisateurs](./admin/users.md) et les attributions de rôles. Configurez un fournisseur de stockage si des fichiers sont nécessaires.
5. Créez les [programmes](./programs/index.md) avec les deux URL de modalités, puis les [volets](./programs/streams.md) avec leurs budgets et leur configuration de prestation.
6. Rédigez et publiez les configurations d’examen, de recommandation, d’approbation et de flux nécessaires. Ajoutez les [champs personnalisés](./programs/custom-fields.md) avant de dépendre de leur routage conditionnel.
7. Créez et activez les [promoteurs](./proponents/index.md), puis créez les [ententes](./agreements/index.md) et leurs affectations exactes.
8. Remplissez l’entente et utilisez ses espaces enfants. Configurez les flux d’approbation obligatoires avant d’achever une modification ou une clôture.

## Menu principal

La barre latérale comprend Accueil, Agences, Programmes, Ententes, Promoteurs, Gestion des affectations, Groupes, Rôles, Utilisateurs, GWCOA et Audit selon les permissions de l’utilisateur. Une destination visible ne donne pas accès à tous les dossiers. Le guide de [Navigation](./getting-started/navigation.md) explique la visibilité, le travail affecté, les états de chargement et de rétablissement, ainsi que le tableau de bord de travail et la file des groupes.

## Carte de documentation

Utilisez Démarrage pour la configuration initiale, Administration pour les agences et les accès, Programmes et Ententes pour les opérations, et Concepts pour les comportements communs comme les [pièces jointes](./concepts/attachments.md), les [flux](./concepts/workflows.md) et les [permissions](./concepts/rbac.md). Les exploitants peuvent commencer par la [configuration d’exécution](./operator/configuration.md), le [déploiement](./operator/deployment.md) et les [tâches d’arrière-plan](./operator/background-work.md). Les développeurs peuvent commencer par l’[architecture](./developer/architecture.md), les [routes](./developer/routes.md) et la [création d’extensions](./developer/extensions-authoring.md).
