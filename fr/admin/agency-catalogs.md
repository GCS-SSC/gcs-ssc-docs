# Catalogues d’agence et sélections des volets

Utilisez les catalogues d’agence pour préparer des réglages partagés par plusieurs volets. Un catalogue est une liste de définitions réutilisables : champs personnalisés, modèles d’approbation, ensembles d’examens et de recommandations, collectes de données, flux de travail, modèles de documents, plans comptables, types d’engagement et types de surveillance. Créez la définition dans l’agence, puis sélectionnez-la ou affectez-la au volet qui en a besoin.

Pour un agent, cela explique pourquoi un formulaire ou une évaluation peut exister sans être disponible dans son volet. Il faut publier la définition, lorsque requis, et la rendre disponible au volet avant de pouvoir l’utiliser.

## Permissions et ordre de configuration

Ouvrez une agence depuis **Agences**. Le niveau Lecteur de l’agence peut consulter son catalogue; Contributeur peut créer, modifier et publier; Gestionnaire peut effectuer les suppressions permises. Dans le volet d’un programme, le niveau Contributeur de `transfer_payment` affecte les entrées d’agence disponibles et Gestionnaire retire les liens admissibles. Une affectation exacte à une entente ou à un examen ne donne pas accès à la configuration. Le serveur revérifie la chaîne active de l’agence et du programme à chaque opération.

1. Créez les valeurs de référence de l’agence nécessaires aux configurations : états opérationnels, sous-types d’entente et de bénéficiaire, exercices et catégories financières.
2. Créez les champs, modèles d’approbation, schémas et ensembles d’examens, schémas et ensembles de recommandations et flux sur la page Agence. Publiez les définitions dont une configuration dépend avant de publier cette configuration. Une ébauche reste modifiable; la publication conserve une version vérifiée utilisable dans les dossiers.
3. Ouvrez le volet du programme. Ajoutez les champs et les autres entrées d’agence dans leurs onglets. Définissez les sections, l’ordre, le caractère obligatoire et l’état actif propres au volet; ajoutez les ensembles d’examens et flux publiés nécessaires.
4. Vérifiez les cotes de risque, budgets, états et autres références propres au volet avant de commencer le travail. Une configuration liée doit aussi convenir au volet et au genre de dossier visé, comme une entente ou un dossier de financement. Ce genre de dossier est le type d’entité.

Par exemple, l’agence A peut publier un ensemble d’examens « Évaluation standard » et le lier à deux volets de A. Ils utilisent la même définition d’agence, mais leurs ententes et évaluations commencées restent distinctes. Modifier l’ébauche d’agence ne change pas une évaluation déjà commencée. Publiez une nouvelle version pour le travail futur. Un volet d’une autre agence ne peut pas lier cette définition.

## Ce que contrôle le volet

| Définition ou valeur d’agence | Sélection du volet |
| --- | --- |
| Définition de champ personnalisé et identifiants d’option | Section, ordre, caractère obligatoire et état actif de chaque affectation. Les valeurs d’entente enregistrées gardent leurs identifiants de champ. |
| Ensembles d’examens et flux de travail | Lier une définition d’agence publiée admissible; retirer le lien empêche une nouvelle sélection sur ce volet, mais préserve les preuves historiques. |
| Modèles d’approbation et ensembles de recommandations | Créer et publier à la portée de l’agence, puis les référencer depuis un ensemble d’examens ou un flux d’agence. Ils n’ont plus d’onglet distinct de création dans le volet. |
| Modèles de documents | Lier un modèle d’agence dans l’onglet Modèles de documents; retirer le lien sans supprimer le fichier source de l’agence. |
| Plan comptable, types d’engagement et types de surveillance | Sélectionner les définitions d’agence admissibles pour le volet; les références historiques peuvent rester visibles après retrait. |

Les listes **Configurations d’examen** et **Configurations de flux de travail** du volet mènent à l’éditeur détaillé de l’agence. Retirer un lien ne supprime pas la définition d’agence partagée. L’onglet **Champs personnalisés** du volet gère les sections et les affectations; modifiez les libellés, le type et les options dans le catalogue d’agence. Un champ partagé conserve une seule identité, mais chaque volet peut le placer et l’exiger différemment.

## Réglages des membres d’examen

Ouvrez un ensemble d’examens et modifiez un schéma membre pour choisir son ordre, son modèle d’approbation facultatif, son groupe par défaut, sa règle d’échec de liste de contrôle et son seuil d’échec. Rouvrir le membre conserve son groupe enregistré. Modifier seulement son ordre ou son groupe conserve son réglage d’échec de liste de contrôle. Enregistrez le membre, puis publiez l’ensemble modifié pour le travail futur. Les examens existants gardent leurs réglages publiés.

Les ordres d’examen en brouillon doivent être des entiers de −32 768 à 32 767; un ordre vide est invalide. Utilisez des numéros consécutifs à partir de 1 avant de publier. Si l’éditeur refuse une modification, rechargez l’ensemble et corrigez le champ indiqué avant de réessayer.

## Catalogue de collectes de données

Ouvrez **Collectes de données** de l’agence, créez une définition, puis ouvrez son éditeur. Lecteur d’agence consulte. Contributeur (`agency:update`) peut créer, modifier, publier, retirer et supprimer un brouillon admissible sans référence. Cette suppression de brouillon n’exige pas le niveau Gestionnaire.

Saisissez noms français/anglais obligatoires (255 caractères au maximum), descriptions et définition de questionnaire. La section Général conserve ces valeurs et un modèle d’approbation publié facultatif de la même agence. Utilisez la section de définition pour créer les sections et questions du questionnaire. Enregistrez avant de publier. La publication valide le formulaire et le plan d’approbation référencé, puis capture une version réutilisable. Un brouillon enregistré n’est pas disponible comme membre publié d’un flux.

Sélectionnez une collecte publiée dans un membre de flux d’agence. Aucun lien distinct de collecte n’est requis au volet : celui-ci sélectionne le flux qui la contient. Par exemple, publiez « Renseignements du site » avec questions bilingues d’adresse et de capacité, ajoutez-la avant un examen du flux de dossier, publiez ce flux, liez-le au volet et sélectionnez-le sur la possibilité. Une collecte déjà commencée garde les versions du questionnaire et de l’approbation utilisées au départ. Les modifications ultérieures du catalogue ne changent pas ses questions.

Le retrait bloque les nouveaux usages et fige la définition tout en conservant les exécutions. Seul un brouillon qu’aucune étape de flux ne référence peut être retiré par suppression. Un membre de flux désigne une étape du flux; sa référence bloque la suppression. En cas d’erreur de publication, vérifiez le formulaire et l’approbation publiée de la même agence, corrigez et enregistrez, puis réessayez. Ne retirez pas une version pour réparer une collecte en cours; utilisez sa reprise d’exécution. Consultez [Flux](../concepts/workflows.md).

## Configuration de l’évaluation des dossiers

Créez des ensembles d’examens et flux visant **Dossier de financement** (`fundingcaseintake`), publiez-les et liez-les aux volets du programme sélectionnés. Choisissez-les ensuite explicitement sur la [Possibilité de financement](../intake/opportunities.md). Le lien de volet seul ne rend pas l’évaluation disponible sur toutes les possibilités. L’admissibilité et l’affectation exacte du dossier sont vérifiées au démarrage.


## Publier, retirer et rétablir

La publication vérifie les définitions référencées et la propriété d’agence. Un flux utilisé par un volet doit y retrouver les champs et valeurs locales nécessaires; une configuration incompatible est refusée au lieu d’ignorer une étape. Un instantané publié est une version enregistrée de la configuration. Le travail existant garde cette version lorsque l’administrateur modifie ou retire la configuration. Le retrait empêche un nouvel usage, mais les dossiers historiques conservent leurs libellés et preuves.

Si Ajouter, Publier ou Démarrer échoue, rechargez la définition d’agence et les liens du volet. Vérifiez sa publication, sa propriété dans la même agence, son type d’entité et l’admissibilité de chaque champ, modèle d’approbation, état, cote de risque et responsable référencé dans le volet. Corrigez la dépendance, republiez au besoin, puis réessayez. Ne supprimez pas un champ pour recréer son libellé : son identifiant fait partie des valeurs d’entente et des conditions historiques.

Consultez [Volets](../programs/streams.md), [Champs personnalisés](../programs/custom-fields.md), [Modèles d’approbation](../programs/approval-templates.md), [Ensembles de recommandations](../programs/recommendations.md) et [Flux de travail](../concepts/workflows.md).
