# Documentation GCS-SSC

Utilisez GCS-SSC pour gérer les subventions et contributions : trouver un demandeur ou bénéficiaire (un **Promoteur**), travailler sur une **Entente**, examiner les demandes et suivre les budgets, réclamations et paiements. Un **Programme** regroupe les activités de financement; un **Volet** définit une voie de financement dans ce programme. Les administrateurs configurent ces dossiers et déterminent qui peut les utiliser.

Pour le travail quotidien, commencez par la [Connexion](./getting-started/login.md), puis la [Navigation](./getting-started/navigation.md) pour trouver vos dossiers affectés. Par exemple, un agent qui vérifie la réclamation d’un centre communautaire peut trouver l’entente, ouvrir son espace Réclamations et consulter le [sommaire financier](./agreements/financial-summary.md) pour une vue d’ensemble. Les actions disponibles dépendent de ses permissions et de son affectation au dossier.

Si vous êtes administrateur et préparez une nouvelle installation, commencez par la [Configuration d’un système vide](./getting-started/empty-system-setup.md) et l’ordre ci-dessous. Une nouvelle installation de production commence sans configuration métier. Les dossiers de développement et les captures sont des exemples. Les guides suivent le menu, les pages, les onglets, les sous-onglets et les formulaires de l’application pour vous permettre de suivre à l’écran.

## Ordre de configuration initiale

Les administrateurs suivent cet ordre pour préparer le système au travail des agents.

1. Connectez-vous avec l’administrateur initial et confirmez ses permissions et portées.
2. Créez l’[organisation GWCOA](./admin/common-admin.md) requise, puis une [agence](./admin/agencies.md).
3. Configurez les références d’agence : statuts métier, exercices, catégories de coûts, types de pièces jointes, types d’entente et sous-types de promoteur.
4. Créez les [rôles](./admin/roles.md), les [utilisateurs](./admin/users.md) et les attributions de rôles. Configurez un fournisseur de stockage si des fichiers sont nécessaires.
5. Créez les [programmes](./programs/index.md) avec les deux URL de modalités, puis les [volets](./programs/streams.md) avec leurs budgets et leur configuration de prestation.
6. Rédigez et publiez les configurations d’examen, de recommandation, d’approbation et de flux nécessaires. Ajoutez les [champs personnalisés](./programs/custom-fields.md) avant de dépendre de leur routage conditionnel.
7. Créez et activez les [promoteurs](./proponents/index.md), puis créez les [ententes](./agreements/index.md) et les affectations du personnel à chaque dossier.
8. Remplissez l’entente et utilisez ses espaces enfants. Configurez les flux d’approbation obligatoires avant d’achever une modification ou une clôture.

## Menu principal

La barre latérale comprend Accueil, Agences, Programmes, Possibilités de financement, Réceptions, Ententes, Promoteurs, Pièces de journal, Gestion des affectations, Groupes, Rôles, Utilisateurs, GWCOA et Audit selon les permissions de l’utilisateur. Une destination visible ne donne pas accès à tous les dossiers. Le guide de [Navigation](./getting-started/navigation.md) explique la visibilité, le travail affecté, les états de chargement et de rétablissement, ainsi que le tableau de bord de travail et la file des groupes.

## Carte de documentation

Utilisez Démarrage pour la configuration initiale, Administration pour les agences et les accès, Programmes et Ententes pour les opérations, et Concepts pour les comportements communs comme les [pièces jointes](./concepts/attachments.md), les [flux](./concepts/workflows.md) et les [permissions](./concepts/rbac.md). Les exploitants peuvent commencer par la [configuration d’exécution](./operator/configuration.md), le [déploiement](./operator/deployment.md) et les [tâches d’arrière-plan](./operator/background-work.md). Les développeurs peuvent commencer par l’[architecture](./developer/architecture.md), les [routes](./developer/routes.md) et la [création d’extensions](./developer/extensions-authoring.md).

Configurez les [possibilités et réceptions](./intake/opportunities.md) avant les demandes externes; le [guide hôte du Portail](./intake/portal.md) décrit les preuves importées. Les [collectes de données](./concepts/data-collections.md) recueillent des réponses structurées dans les flux. Le personnel financier peut consulter [Sommaire mensuel](./agreements/financial-summary.md), [Corrections](./agreements/corrections.md), [Pièces de journal](./agreements/journal-vouchers.md), [Créances](./agreements/receivables.md) et [Notes de crédit](./proponents/credit-memos.md).
