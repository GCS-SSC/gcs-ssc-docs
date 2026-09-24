# Catalogues d’agence et sélections des volets

Une agence possède maintenant les définitions réutilisables des champs personnalisés, modèles d’approbation, ensembles d’examens et de recommandations, flux de travail, modèles de documents, plans comptables, types d’engagement et types de surveillance. Un volet sélectionne ou affecte les entrées d’agence qu’il utilise. Créez les définitions partagées dans le catalogue d’agence, puis rendez-les disponibles dans le volet.

## Permissions et ordre de configuration

Ouvrez une agence depuis **Agences**. Le niveau Lecteur de l’agence peut consulter son catalogue; Contributeur peut créer, modifier et publier; Gestionnaire peut effectuer les suppressions permises. Dans le volet d’un programme, le niveau Contributeur de `transfer_payment` affecte les entrées d’agence disponibles et Gestionnaire retire les liens admissibles. Une affectation exacte à une entente ou à un examen ne donne pas accès à la configuration. Le serveur revérifie la chaîne active de l’agence et du programme à chaque opération.

1. Créez les valeurs de référence de l’agence nécessaires aux configurations : états opérationnels, sous-types d’entente et de bénéficiaire, exercices et catégories financières.
2. Créez les champs, modèles d’approbation, schémas et ensembles d’examens, schémas et ensembles de recommandations et flux sur la page Agence. Publiez chaque configuration dans l’ordre de ses dépendances. Une ébauche reste visible pour la création, mais ne peut servir de plan d’exécution publié.
3. Ouvrez le volet du programme. Ajoutez les champs et les autres entrées d’agence dans leurs onglets. Définissez les sections, l’ordre, le caractère obligatoire et l’état actif propres au volet; ajoutez les ensembles d’examens et flux publiés nécessaires.
4. Vérifiez les cotes de risque, budgets, états et autres références propres au volet avant de commencer le travail. Une configuration liée doit aussi convenir au volet et au type d’entité choisis.

Par exemple, l’agence A peut publier un ensemble d’examens « Évaluation standard » et le lier à deux volets de A. Ils utilisent la même définition d’agence, mais leurs ententes et tentatives d’exécution restent distinctes. Une modification de l’ébauche de travail ne réécrit pas une tentative existante; publiez une nouvelle version pour le travail futur. Un volet d’une autre agence ne peut pas lier cette définition.

## Ce que contrôle le volet

| Définition ou valeur d’agence | Sélection du volet |
| --- | --- |
| Définition de champ personnalisé et identifiants d’option | Section, ordre, caractère obligatoire et état actif de chaque affectation. Les valeurs d’entente enregistrées gardent leurs identifiants de champ. |
| Ensembles d’examens et flux de travail | Lier une définition d’agence publiée admissible; retirer le lien empêche une nouvelle sélection sur ce volet, mais préserve les preuves historiques. |
| Modèles d’approbation et ensembles de recommandations | Créer et publier à la portée de l’agence, puis les référencer depuis un ensemble d’examens ou un flux d’agence. Ils n’ont plus d’onglet distinct de création dans le volet. |
| Modèles de documents | Lier un modèle d’agence dans l’onglet Modèles de documents; retirer le lien sans supprimer le fichier source de l’agence. |
| Plan comptable, types d’engagement et types de surveillance | Sélectionner les définitions d’agence admissibles pour le volet; les références historiques peuvent rester visibles après retrait. |

Les listes **Configurations d’examen** et **Configurations de flux de travail** du volet mènent à l’éditeur détaillé de l’agence. Retirer un lien ne supprime pas la définition d’agence partagée. L’onglet **Champs personnalisés** du volet gère les sections et les affectations; modifiez les libellés, le type et les options dans le catalogue d’agence. Un champ partagé conserve une seule identité, mais chaque volet peut le placer et l’exiger différemment.

## Publier, retirer et rétablir

La publication vérifie les définitions référencées et la propriété d’agence. Un flux utilisé par un volet doit y retrouver les champs et valeurs locales nécessaires; une configuration incompatible est refusée au lieu d’ignorer une étape. Les instantanés publiés et les exécutions existantes restent liés à leurs versions lorsque l’administrateur modifie ou retire une définition. Le retrait empêche un nouvel usage, mais les dossiers historiques conservent leurs libellés et preuves.

Si Ajouter, Publier ou Démarrer échoue, rechargez la définition d’agence et les liens du volet. Vérifiez sa publication, sa propriété dans la même agence, son type d’entité et l’admissibilité de chaque champ, modèle d’approbation, état, cote de risque et responsable référencé dans le volet. Corrigez la dépendance, republiez au besoin, puis réessayez. Ne supprimez pas un champ pour recréer son libellé : son identifiant fait partie des valeurs d’entente et des conditions historiques.

Consultez [Volets](../programs/streams.md), [Champs personnalisés](../programs/custom-fields.md), [Modèles d’approbation](../programs/approval-templates.md), [Ensembles de recommandations](../programs/recommendations.md) et [Flux de travail](../concepts/workflows.md).
