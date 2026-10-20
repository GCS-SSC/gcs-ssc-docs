# Configuration d'un système vide {#systeme-vide}

Utilisez ce guide pour préparer une nouvelle installation au travail des agents. Créez l'agence, les programmes, les volets et les choix de référence nécessaires, puis configurez les rôles et affectez le personnel aux dossiers.

L'administrateur initial est appelé **utilisateur racine**. Ce compte a besoin de permissions explicites, comme tout autre compte. GWCOA exige notamment un accès Lecteur Système global, `system:read`. Demandez ce compte à la personne responsable du déploiement avant de commencer.

## Hypothèses de départ

- La personne responsable du déploiement a créé au moins un utilisateur racine authentifié.
- L'utilisateur racine possède un rôle global avec les niveaux d'accès requis et les permissions distinctes de gestion des affectations aux ententes et promoteurs, au besoin.
- Le système peut contenir des valeurs installées par défaut, mais ne supposez pas que les données de démonstration existent en production.
- Saisissez les dossiers opérationnels en anglais et en français lorsque des champs jumelés existent.

## Ordre de configuration {#ordre-racine}

1. Connectez-vous comme utilisateur racine.
2. Créez l'organisation requise dans [GWCOA](../admin/common-admin.md), puis une agence depuis **Agences**.
3. Ouvrez le détail de l'agence et complétez les onglets de référence propres à l'agence.
4. Créez les rôles racine et délégués depuis Rôles.
5. Créez ou vérifiez les utilisateurs depuis Utilisateurs.
6. Attribuez les rôles aux utilisateurs.
7. Créez les programmes de l'agence.
8. Créez les volets sous chaque programme.
9. Créez les ensembles d'examens et de recommandations, modèles d'approbation, flux, champs et modèles de documents réutilisables dans le catalogue d'agence. Publiez les définitions qui exigent une publication.
10. Liez les définitions d'agence et valeurs de référence requises à chaque volet, puis choisissez le fournisseur de stockage de l'agence.
11. Créez les profils de promoteur.
12. Créez les ententes et commencez les flux opérationnels.

Cet ordre évite l'erreur la plus fréquente dans un système vide : tenter de créer une entente ou un examen avant que les références d'agence, programme, volet, exercice, sous-type, configuration d'examen, modèle d'approbation ou promoteur existent.

## Configuration minimale d'agence {#configuration-minimale-d-agence}

Créez d'abord le profil d'agence. Il stocke les noms et abréviations bilingues, un indicateur actif, le lien GWCOA et l'identifiant facultatif du système financier externe. Configurez ensuite les onglets dans cet ordre :

1. Exercices, car les budgets, engagements, paiements, réclamations, prévisions et surveillances dépendent des périodes.
2. Catégories de coûts, puis éléments de ligne sous chaque catégorie, car les flux financiers exigent une classification des coûts.
3. Types d'adresse, car les adresses de promoteur et d'entente ont besoin de classifications stables.
4. Sous-types de demandeur/bénéficiaire, car lier un promoteur à une entente exige un sous-type admissible pour son volet.
5. Types d'entente, car les ententes classent leur type juridique ou opérationnel.
6. Types d'approbation au nom d'autrui, car les approbations peuvent exiger une explication de délégation.
7. Extensions, seulement après avoir confirmé quelles extensions installées sont approuvées pour l'agence.
8. Programmes, après que les références d'agence sont prêtes.

## Préparation des références et des flux

Créez l'organisation requise dans [GWCOA](../admin/common-admin.md) avant de la lier à un organisme. GWCOA est le catalogue global des organisations. Configurez les approbations et les examens séparément dans l'agence.

Dans l'organisme, configurez les **Statuts** métier normaux, en lecture seule et terminaux; les **Types de pièces jointes** pour classer les fichiers; et les **Types d'engagement** pour le travail financier. Les paramètres facultatifs de rapprochement choisissent le statut de la réclamation au démarrage et à l'achèvement approuvé du rapprochement final. Sélectionnez et configurez un fournisseur de stockage enregistré avant de téléverser des fichiers ou de générer des documents conservés.

Dans le catalogue d'agence, créez et publiez les schémas et ensembles d'examens et de recommandations, les modèles d'approbation avec étapes et certifications, et les flux nécessaires. Liez les définitions publiées admissibles à chaque volet avant de démarrer le travail qui les utilise. Avant d'achever les modifications ou clôtures, publiez un flux de soumission pour approbation, `approval_submission`, qui s'exécute à l'achèvement, `on_completion`. Les autres dossiers connexes pris en charge peuvent s'achever sans ce flux. Configurez aussi les modèles de document et champs personnalisés nécessaires. Consultez [Volets](../programs/streams.md) et [Approbations et achèvements](../concepts/approvals-completions.md).

Par exemple, préparez l'exercice et les éléments de coûts de l'organisme, créez un programme avec ses deux URL de modalités, créez son volet, rendez disponibles ses éléments de coûts, puis créez l'entente et son premier budget. Publier un modèle d'approbation ne suffit pas à achever une modification. Le flux d'achèvement publié doit faire référence à ce modèle d'approbation.

## Configuration minimale RBAC

RBAC signifie **contrôle d'accès par rôles**. Les rôles définissent ce qu'une personne peut faire, et leur portée précise où ces actions sont autorisées. Créez les rôles avant de demander aux agents de travailler. Lecteur permet la consultation, Contributeur ajoute les modifications permises et Gestionnaire ajoute les actions de gestion supérieures; chaque niveau comprend les permissions des niveaux inférieurs. La gestion des affectations est une permission distincte. Consultez les [Permissions](../concepts/rbac.md) pour les règles de chaque action.

- Gardez un rôle Administrateur racine global et limitez son attribution aux administrateurs de confiance.
- Créez des rôles Administrateur d'agence limités à une agence lorsque des utilisateurs doivent gérer les dossiers d'agence, programmes, utilisateurs de cette agence ou rôles propres à cette agence.
- Créez des rôles de programme en choisissant une agence et un ou plusieurs programmes de paiements de transfert.
- Choisissez les permissions prises en charge par la portée du rôle. Les rôles de programme acceptent `transfer_payment`, `agreement`, `funding_case`, `account_receivable`, `correction` et `journal_voucher`. Les rôles d'agence acceptent `agency`, `transfer_payment`, `role`, `user`, `agreement`, `funding_case`, `applicant_recipient`, `account_receivable`, `correction` et `journal_voucher`. `system` est exclusivement global. `audit`, `group` et `guided_help` acceptent les portées globale et d'agence.
- Attribuez les rôles depuis le détail de l'utilisateur. Attribuer le même rôle deux fois conserve l'attribution existante.
- Choisissez Lecteur, Contributeur ou Gestionnaire pour chaque type de dossier. Accordez aux coordonnateurs la permission distincte `manage_assignments` pour les ententes, promoteurs, dossiers de financement, pièces de journal, corrections ou comptes débiteurs, au besoin.

## Configuration minimale des promoteurs

Un **Promoteur** est le demandeur ou bénéficiaire dont vous lierez le profil à une entente. Pour en créer un :

1. Préparez une agence principale active. Le profil lui-même n'exige pas de sous-type.
2. Accordez au créateur l'accès Contributeur pour `applicant_recipient`, globalement ou dans une agence active. Cette permission est indépendante de l'agence choisie pour le suivi.
3. Créez le profil. Il est initialement inactif et le créateur devient son utilisateur affecté principal.
4. Avant de le lier à une entente, configurez les sous-types de bénéficiaire de l'agence et rendez les sous-types requis admissibles pour le volet.

L'accès Lecteur Promoteur global ou d'agence active permet de consulter le catalogue partagé. Pour modifier ensuite un profil ou ses dossiers connexes, la personne doit avoir le niveau d'accès cumulatif requis et être affectée à ce promoteur précis. Pour changer les personnes affectées, elle doit aussi avoir la permission distincte `manage_assignments`.

## Préparation minimale aux ententes {#preparation-minimale-aux-ententes}

Avant de créer des ententes, préparez les dossiers et paramètres suivants :

- Une agence active.
- Un programme pour cette agence.
- Un volet sous le programme.
- Les budgets des exercices et éléments de ligne de coûts du volet pour le travail financier.
- Les bénéficiaires admissibles, cotes de risque, configurations d'examen, modèles d'approbation, configurations de recommandation, sous-types d'entente, types de modification et types de surveillance, au besoin.
- Au moins un promoteur si l'entente sera liée à un demandeur ou bénéficiaire.

## Préparation minimale des possibilités et dossiers

Avant de recevoir des demandes, créez des volets actifs d'un même programme, le statut Brouillon et des statuts modifiables non Brouillon de l'agence. Créez une [Possibilité](../intake/opportunities.md) avec les noms et objectifs bilingues obligatoires et des dates d'ouverture et de fermeture inclusives. Les nouvelles possibilités commencent au statut Brouillon. L'éditeur ordinaire ne peut pas changer le statut. Demandez à la personne responsable de l'intégration API hôte autorisée de choisir un statut admissible de l'agence avant l'ouverture.

Pour l'évaluation, publiez les ensembles d'examens et flux destinés aux réceptions de dossiers de financement, `fundingcaseintake`. Liez-les aux volets sélectionnés, puis choisissez-les sur la possibilité. Créez les définitions de collecte de données dans l'agence et sélectionnez-les dans les membres ordonnés des flux publiés. Configurez les types de pièces jointes et un fournisseur de stockage disponible pour les téléversements.

Accordez les rôles Dossier de financement à la portée du programme séparément des rôles Entente. Pour créer une réception manuellement, vous devez pouvoir lire son promoteur. Vous devenez l'utilisateur affecté principal. Pour les [Imports du Portail](../intake/portal.md), activez le connecteur et préparez un groupe admissible d'agence avec membres qualifiés; les imports n'ont aucun utilisateur affecté avant réclamation ou affectation directe. Avant l'ouverture des réceptions en production, testez avec un compte utilisateur délégué. Trouvez un import dans la file du groupe, réclamez-le, ouvrez la vue Demande enregistrée et démarrez son évaluation.

Préparez les types et sous-types de financement de l'agence avant de choisir les sources de financement du volet. Avant le travail financier, préparez les plans d'agence pour chaque devise et les budgets correspondants du programme et du volet. Configurez les types de comptes débiteurs et les types de surveillance admissibles avant de démarrer les flux associés. L'admissibilité de l'exercice aux pièces de journal est désactivée par défaut et exige Gestionnaire d'agence pour l'activer. Ces choix ne remplacent ni rôles métier ni affectations à des dossiers précis.

Par exemple, préparez un programme d'installations communautaires et son volet de petits projets avant de demander à un agent de saisir l'entente d'un centre communautaire :

1. Créez l'exercice 2026–2027 de l'agence ainsi que la catégorie de coûts et l'élément de ligne pour l'équipement.
2. Créez le programme avec les URL anglaise et française des modalités, puis son volet. Rendez l'élément de coûts d'équipement disponible pour ce volet et préparez son budget d'exercice.
3. Créez le profil de promoteur du centre et effectuez l'activation requise avant son utilisation dans une entente. Configurez un sous-type de bénéficiaire admissible.
4. Accordez à l'agent le rôle Entente approprié à la portée du programme et affectez-le à l'entente sur laquelle il travaillera. Affectez-le aussi au promoteur si ses tâches exigent des modifications au profil.
5. Testez l'accès avec ce compte avant de saisir du travail financier réel. La permission du rôle et l'affectation à un dossier précis sont deux vérifications distinctes.

Les noms de cet exemple sont fictifs; utilisez vos agences, programmes, volets et classifications financières approuvés.

## Vérification {#verification}

Testez avec un compte utilisateur ordinaire ayant les rôles préparés, plutôt qu'avec le compte administrateur racine. Le **niveau d'accès** d'un rôle détermine les actions maximales permises. Sa **portée** limite où ces permissions s'appliquent : globalement, dans une agence ou dans certains programmes. Les niveaux cumulatifs supérieurs comprennent les niveaux inférieurs.

1. Connectez-vous avec le compte de test et vérifiez la barre latérale selon le rôle prévu.
2. Vérifiez **Ententes** et **Promoteurs**. Chaque destination exige l'accès Lecteur correspondant ou un niveau supérieur dans une portée autorisée; une affectation au dossier ne suffit pas à faire apparaître la destination.
3. Vérifiez **Gestion des affectations**. Son entrée dans la barre latérale exige la permission distincte `manage_assignments` pour Entente, Promoteur, Dossier de financement, Pièce de journal ou Correction. Si l'utilisateur gère seulement les affectations des comptes débiteurs, ouvrez directement `/assignment-management`; cette permission seule ne fait pas apparaître l'entrée.
4. Vérifiez les destinations administratives nécessaires. **GWCOA** exige Lecteur Système global ou un niveau supérieur. **Audit** exige sa propre permission Lecteur Audit ou supérieure, globalement ou pour une agence. **Groupes** exige la permission de consulter les dossiers de groupe.
5. Ouvrez une agence, un programme, un volet, un promoteur, une entente et un dossier utilisateur auxquels le rôle de test devrait donner accès. Vérifiez que les onglets et actions prévus sont disponibles selon la portée et le niveau d'accès du rôle.
6. Vérifiez séparément les affectations à des dossiers précis. Par exemple, confirmez que l'agent peut travailler sur son entente affectée, avec les permissions de rôle appropriées, avant de lui demander de saisir des données réelles. Un menu ou un onglet visible ne remplace pas une affectation requise au dossier ou au flux.
