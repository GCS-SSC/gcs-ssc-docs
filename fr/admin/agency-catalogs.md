# Catalogues d'agence et sélections des volets

Utilisez les catalogues d'agence pour préparer des réglages partagés par plusieurs volets. Un catalogue est une liste de définitions réutilisables : champs personnalisés, modèles d'approbation, ensembles d'examens et de recommandations, collectes de données, flux de travail, modèles de documents, plans comptables, types d'engagement et types de surveillance. Créez la définition dans l'agence, puis sélectionnez-la ou affectez-la au volet qui en a besoin.

Si un formulaire ou une évaluation manque dans votre volet, vérifiez que sa définition d'agence est publiée, lorsque requis, et disponible pour ce volet.

## Permissions et ordre de configuration

Ouvrez une agence depuis **Agences**. Votre niveau d'accès détermine les actions permises :

- Lecteur d'agence peut consulter le catalogue.
- Contributeur d'agence peut créer, modifier et publier les définitions. Ce niveau permet aussi de supprimer les brouillons admissibles des ensembles d'examens, des ensembles de recommandations, des flux et des collectes de données.
- Les autres suppressions du catalogue peuvent exiger le niveau Gestionnaire d'agence.
- Dans le volet d'un programme, le niveau Contributeur de `transfer_payment` permet d'affecter les entrées d'agence disponibles. Le niveau Gestionnaire permet de retirer les liens admissibles.

Une affectation à une entente ou à un examen ne donne pas accès à la configuration. Chaque opération exige aussi que l'agence et le programme restent actifs.

1. Créez les valeurs de référence de l'agence nécessaires aux configurations : états opérationnels, sous-types d'entente et de bénéficiaire, exercices et catégories financières.
2. Créez les champs, modèles d'approbation, schémas et ensembles d'examens, schémas et ensembles de recommandations et flux sur la page Agence. Publiez les définitions dont une configuration dépend avant de publier cette configuration. Une ébauche reste modifiable; la publication conserve une version vérifiée utilisable dans les dossiers.
3. Ouvrez le volet du programme. Ajoutez les champs et les autres entrées d'agence dans leurs onglets. Définissez les sections, l'ordre, le caractère obligatoire et l'état actif propres au volet; ajoutez les ensembles d'examens et flux publiés nécessaires.
4. Vérifiez les cotes de risque, budgets, états et autres références propres au volet avant de commencer le travail. Une configuration liée doit aussi convenir au volet et au genre de dossier visé, comme une entente ou un dossier de financement. Ce genre de dossier est le type d'entité.

Par exemple, l'agence A peut publier un ensemble d'examens « Évaluation standard » et le lier à deux volets de A. Ils utilisent la même définition d'agence, mais leurs ententes et évaluations commencées restent distinctes. Modifier l'ébauche d'agence ne change pas une évaluation déjà commencée. Publiez une nouvelle version pour le travail futur. Un volet d'une autre agence ne peut pas lier cette définition.

## Ce que contrôle le volet

| Définition ou valeur d'agence | Sélection du volet |
| --- | --- |
| Définition de champ personnalisé et identifiants d'option | Section, ordre, caractère obligatoire et état actif de chaque affectation. Les valeurs d'entente enregistrées gardent leurs identifiants de champ. |
| Ensembles d'examens et flux de travail | Lier une définition d'agence publiée admissible; retirer le lien empêche une nouvelle sélection sur ce volet, mais préserve les preuves historiques. |
| Modèles d'approbation et ensembles de recommandations | Créer et publier à la portée de l'agence, puis les référencer depuis un ensemble d'examens ou un flux d'agence. Ils n'ont plus d'onglet distinct de création dans le volet. |
| Modèles de documents | Lier un modèle d'agence dans l'onglet Modèles de documents; retirer le lien sans supprimer le fichier source de l'agence. |
| Plan comptable, types d'engagement et types de surveillance | Sélectionner les définitions d'agence admissibles pour le volet; les références historiques peuvent rester visibles après retrait. |

Les listes **Configurations d'examen** et **Configurations de flux de travail** du volet mènent à l'éditeur détaillé de l'agence. Retirer un lien ne supprime pas la définition d'agence partagée. L'onglet **Champs personnalisés** du volet gère les sections et les affectations; modifiez les libellés, le type et les options dans le catalogue d'agence. Un champ partagé conserve une seule identité, mais chaque volet peut le placer et l'exiger différemment.

## Modèles de documents

Ouvrez **Modèles de documents** de l'agence pour créer un modèle d'entente, de modification ou de clôture. Saisissez les noms et descriptions dans les deux langues, choisissez DOCX ou HTML, puis téléversez un fichier français et un fichier anglais de ce type. Chaque fichier doit faire au plus 10 Mio. Choisissez au moins un format de sortie. Les modèles DOCX permettent DOCX et PDF; les modèles HTML permettent HTML et PDF.

Les noms doivent être uniques dans chaque langue pour l'agence et le type de dossier. En cas de conflit, modifiez le modèle existant ou choisissez un autre nom. Vous pouvez corriger les renseignements et remplacer l'un des fichiers plus tard. Le type de fichier du modèle ne peut changer après sa création. Créez donc un autre modèle pour passer de DOCX à HTML.

Après l'enregistrement, liez le modèle actif dans l'onglet **Modèles de documents** du volet. Par exemple, créez un modèle d'entente nommé "Entente standard" avec les deux fichiers, puis liez-le à chaque volet qui utilise ce document. Les modèles de modification et de clôture doivent avoir leur propre type de dossier.

Un échec de téléversement ou d'enregistrement laisse l'éditeur ouvert pour correction. Vérifiez l'erreur, corrigez le fichier ou le nom en conflit, puis réessayez. Si l'enregistrement réussit mais que le tableau ne se recharge pas, rechargez la liste avant de créer un autre modèle. Les fichiers déjà enregistrés restent en usage si l'enregistrement de leur remplacement échoue.

## Éditeur et vue du flux

Ouvrez un flux dans l'onglet **Configurations de flux de travail** de l'agence. Utilisez son éditeur pour modifier les renseignements du flux, le routage, les transitions et le comportement. **Flux** ouvre une page distincte avec un diagramme de la configuration enregistrée. Le diagramme ne modifie pas les membres du flux. Revenez à l'éditeur pour les changer.

Enregistrez les changements avant de passer de l'éditeur au diagramme. L'application bloque le passage pendant un enregistrement ou tant que des changements restent non enregistrés. Enregistrer un brouillon ne le publie pas. Publiez la configuration vérifiée lorsqu'elle est prête pour les nouveaux dossiers.

## Réglages des membres d'examen

Ouvrez un ensemble d'examens et modifiez les réglages d'un des schémas d'examen inclus. Choisissez son ordre, son modèle d'approbation facultatif, son groupe par défaut, sa règle d'échec de liste de contrôle et son seuil d'échec. Rouvrir le membre conserve son groupe enregistré. Modifier seulement son ordre ou son groupe conserve son réglage d'échec de liste de contrôle. Enregistrez le membre, puis publiez l'ensemble modifié pour le travail futur. Les examens existants gardent leurs réglages publiés.

Activez la règle d'échec de liste de contrôle pour donner un résultat négatif à l'examen si sa liste de contrôle a le résultat Échec. Un résultat numérique inférieur au seuil d'échec donne aussi un résultat négatif. Par exemple, un seuil de 60 traite 59 comme négatif; 60 ne déclenche pas cet échec. Ces règles du membre sont distinctes des règles de calcul du résultat de la liste de contrôle.

Les ordres d'examen en brouillon doivent être des entiers de −32 768 à 32 767; un ordre vide est invalide. Utilisez des numéros consécutifs à partir de 1 avant de publier. Si l'éditeur refuse une modification, rechargez l'ensemble et corrigez le champ indiqué avant de réessayer.

## Catalogue de collectes de données

Ouvrez **Collectes de données** de l'agence, créez une définition, puis ouvrez son éditeur. Lecteur d'agence peut consulter la définition. Contributeur (`agency:update`) peut créer, modifier, publier et retirer les définitions. Il peut aussi supprimer un brouillon admissible si aucune étape de flux n'y fait référence. Le niveau Gestionnaire n'est pas requis pour supprimer ce brouillon.

Saisissez les noms français et anglais obligatoires, chacun de 255 caractères au maximum. Ajoutez les descriptions et définissez le questionnaire. La section Général conserve ces valeurs et un modèle d'approbation publié facultatif de la même agence. Utilisez la section de définition pour créer les sections et questions du questionnaire. Enregistrez avant de publier. La publication valide le formulaire et le plan d'approbation référencé, puis capture une version réutilisable. Un brouillon enregistré n'est pas disponible comme membre publié d'un flux.

Sélectionnez une collecte publiée dans un membre de flux d'agence. Aucun lien distinct de collecte n'est requis au volet : celui-ci sélectionne le flux qui la contient. Par exemple, publiez « Renseignements du site » avec questions bilingues d'adresse et de capacité, ajoutez-la avant un examen du flux de dossier, publiez ce flux, liez-le au volet et sélectionnez-le sur la possibilité. Une collecte déjà commencée garde les versions du questionnaire et de l'approbation utilisées au départ. Les modifications ultérieures du catalogue ne changent pas ses questions.

Le retrait empêche les nouveaux usages et les modifications, mais conserve les collectes existantes. Vous pouvez supprimer seulement un brouillon sans référence. Un membre de flux est une étape du flux, et même une référence de cette étape bloque la suppression.

Si la publication échoue, vérifiez le questionnaire et confirmez que tout modèle d'approbation sélectionné est publié dans la même agence. Corrigez et enregistrez le brouillon, puis réessayez. Pour réparer une collecte déjà en cours, utilisez ses commandes de reprise. Consultez [Flux](../concepts/workflows.md).

## Configuration de l'évaluation des dossiers

Créez des ensembles d'examens et flux visant **Dossier de financement** (`fundingcaseintake`), publiez-les et liez-les aux volets du programme sélectionnés. Choisissez-les ensuite explicitement sur la [Possibilité de financement](../intake/opportunities.md). Le lien de volet seul ne rend pas l'évaluation disponible sur toutes les possibilités. L'admissibilité et l'affectation exacte du dossier sont vérifiées au démarrage.


## Publier, retirer et rétablir

La publication vérifie les définitions référencées et la propriété d'agence. Un flux utilisé par un volet doit y retrouver les champs et valeurs locales nécessaires; une configuration incompatible est refusée au lieu d'ignorer une étape. Un instantané publié est une version enregistrée de la configuration. Le travail existant garde cette version lorsque l'administrateur modifie ou retire la configuration. Le retrait empêche un nouvel usage, mais les dossiers historiques conservent leurs libellés et preuves.

Si Ajouter, Publier ou Démarrer échoue, rechargez la définition d'agence et les liens du volet. Vérifiez sa publication, sa propriété dans la même agence, son type d'entité et l'admissibilité de chaque champ, modèle d'approbation, état, cote de risque et responsable référencé dans le volet. Corrigez la dépendance, republiez au besoin, puis réessayez. Pour corriger un libellé de champ, modifiez le champ existant. Son identifiant le relie aux valeurs d'entente et aux conditions historiques des flux.

Consultez [Volets](../programs/streams.md), [Champs personnalisés](../programs/custom-fields.md), [Modèles d'approbation](../programs/approval-templates.md), [Ensembles de recommandations](../programs/recommendations.md) et [Flux de travail](../concepts/workflows.md).
