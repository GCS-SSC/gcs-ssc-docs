# Systeme vide

Utilisez cette page pour préparer une nouvelle installation, plutôt qu’un dossier de financement particulier. Un administrateur doit d’abord créer l’agence, les programmes, les volets et les choix de référence que les agents utiliseront. Il doit aussi configurer les rôles (permissions) et affecter le personnel aux dossiers. Les agents pourront ensuite travailler sans manquer de choix ou d’accès.

L’administrateur initial est appelé **utilisateur racine**. Ce compte a besoin des mêmes permissions explicites que les autres; il ne bénéficie d’aucun accès automatique. GWCOA exige notamment `system:read` global. Demandez ce compte à la personne responsable du déploiement avant de commencer.

## Hypothèses de départ

- La personne responsable du déploiement a créé au moins un utilisateur racine authentifié.
- L’utilisateur racine possède un rôle global ordinaire avec les paires action-sujet explicites requises et aucun contournement spécial d’autorisation.
- Le rôle racine comprend explicitement seulement les niveaux cumulatifs requis et les capacités nécessaires de gestion des affectations aux ententes ou promoteurs; racine n’a aucun contournement.
- Le système peut contenir des valeurs installées par défaut, mais ne supposez pas que les données de démonstration existent en production.
- Saisissez les dossiers opérationnels en anglais et en français lorsque des champs jumelés existent.

## Ordre racine

1. Connectez-vous comme utilisateur racine.
2. Créez au moins une agence depuis Agences.
3. Ouvrez le détail de l’agence et complétez les onglets de référence propres à l’agence.
4. Créez les rôles racine et délégués depuis Rôles.
5. Créez ou vérifiez les utilisateurs depuis Utilisateurs.
6. Attribuez les rôles aux utilisateurs.
7. Créez les programmes de l’agence.
8. Créez les volets sous chaque programme.
9. Créez et publiez les ensembles d’examens et de recommandations, modèles d’approbation, flux, champs et modèles de documents réutilisables dans le catalogue d’agence.
10. Liez les définitions d’agence et valeurs de référence requises à chaque volet, puis choisissez le fournisseur de stockage de l’agence.
11. Créez les profils de promoteur.
12. Créez les ententes et commencez les flux opérationnels.

Cet ordre évite l’erreur la plus fréquente dans un système vide : tenter de créer une entente ou un examen avant que les références d’agence, programme, volet, exercice, sous-type, configuration d’examen, modèle d’approbation ou promoteur existent.

## Configuration minimale d agence

Créez d’abord le profil d’agence. Il stocke les noms et abréviations bilingues, un indicateur actif, le lien GWCOA et l’identifiant facultatif du système financier externe. Configurez ensuite les onglets dans cet ordre :

1. Exercices, car les budgets, engagements, paiements, réclamations, prévisions et surveillances dépendent des périodes.
2. Catégories de coûts, puis éléments de ligne sous chaque catégorie, car les flux financiers exigent une classification des coûts.
3. Types d’adresse, car les adresses de promoteur et d’entente ont besoin de classifications stables.
4. Sous-types de demandeur/bénéficiaire, car chaque relation entente–promoteur exige un sous-type admissible pour son volet.
5. Types d’entente, car les ententes classent leur type juridique ou opérationnel.
6. Types d’approbation au nom d’autrui, car les approbations peuvent exiger une explication de délégation.
7. Extensions, seulement après avoir confirmé quelles extensions installées sont approuvées pour l’agence.
8. Programmes, après que les références d’agence sont prêtes.

## Préparation des références et des flux

Créez l’organisation requise dans [GWCOA](../admin/common-admin.md) avant de la lier à un organisme. GWCOA est le catalogue global des organisations; il ne crée pas les approbations, examens ou achèvements d’exécution.

Dans l’organisme, configurez les **Statuts** métier normaux, en lecture seule et terminaux; les **Types de pièces jointes** pour classer les fichiers; et les **Types d’engagement** pour le travail financier. Les paramètres facultatifs de rapprochement choisissent le statut de la réclamation au démarrage et à l’achèvement approuvé du rapprochement final. Sélectionnez et configurez un fournisseur de stockage enregistré avant de téléverser des fichiers ou de générer des documents conservés.

Dans le catalogue d’agence, créez et publiez les schémas et ensembles d’examens et de recommandations, les modèles d’approbation avec étapes et certifications, et les flux nécessaires. Liez les définitions publiées admissibles à chaque volet avant de démarrer les examens et autres travaux qui les utilisent. L’achèvement d’une modification ou clôture exige un flux publié `approval_submission` configuré pour `on_completion`; les autres dossiers connexes pris en charge peuvent s’achever sans ce flux. Configurez aussi les modèles de document et champs personnalisés nécessaires. Consultez [Volets](../programs/streams.md) et [Approbations et achèvements](../concepts/approvals-completions.md).

Par exemple, préparez l’exercice et les éléments de coûts de l’organisme, créez un programme avec ses deux URL de modalités, créez son volet, rendez disponibles ses éléments de coûts, puis créez l’entente et son premier budget. Publier seulement un modèle d’approbation ne suffit pas à achever une modification : le flux d’achèvement publié doit réellement référencer le modèle d’approbation.

## Configuration minimale RBAC

RBAC signifie **contrôle d’accès par rôles** : les rôles définissent les actions qu’une personne peut effectuer, et leur portée précise où ces actions sont autorisées. Créez les rôles avant de demander aux agents de travailler. Lecteur permet la consultation, Contributeur ajoute les modifications permises et Gestionnaire ajoute les actions de gestion supérieures; les niveaux sont cumulatifs. La gestion des affectations est une permission distincte. Consultez les [Permissions](../concepts/rbac.md) pour les règles de chaque action.

- Gardez un rôle Administrateur racine global et limitez son attribution aux administrateurs de confiance.
- Créez des rôles Administrateur d’agence limités à une agence lorsque des utilisateurs doivent gérer les dossiers d’agence, programmes, utilisateurs de cette agence ou rôles propres à cette agence.
- Créez des rôles de programme en choisissant une agence et un ou plusieurs programmes de paiements de transfert.
- Utilisez seulement les sujets valides pour la portée dérivée. Les rôles de programme acceptent `transfer_payment`, `agreement`, `funding_case`, `account_receivable`, `correction` et `journal_voucher`. Les rôles d’agence acceptent `agency`, `transfer_payment`, `role`, `user`, `agreement`, `funding_case`, `applicant_recipient`, `account_receivable`, `correction` et `journal_voucher`. `system` est exclusivement global; `audit` et `group` peuvent avoir une portée d’agence selon le cas.
- Attribuez les rôles depuis le détail de l’utilisateur. Les attributions dupliquées retournent l’attribution existante au lieu de créer une deuxième ligne active.
- Accordez Lecteur, Contributeur ou Gestionnaire par sujet. Accordez `manage_assignments` indépendamment sur les six sujets acceptant la gestion des affectations aux coordonnateurs des affectations.

## Configuration minimale des promoteurs

Un **Promoteur** est le demandeur ou bénéficiaire dont vous lierez le profil à une entente. Pour en créer un :

1. Préparez une agence principale active. Le profil lui-même n’exige pas de sous-type.
2. Accordez au créateur l’accès Contributeur pour `applicant_recipient`, globalement ou dans une agence active. Cette permission est indépendante de l’agence choisie pour le suivi.
3. Créez le profil. Il est initialement inactif et le créateur devient son utilisateur affecté principal.
4. Avant de le lier à une entente, configurez les sous-types de bénéficiaire de l’agence et rendez les sous-types requis admissibles pour le volet.

L’accès Lecteur Promoteur global ou d’agence active permet de consulter le catalogue partagé. Pour modifier ensuite un profil ou ses dossiers connexes, la personne doit avoir le niveau d’accès cumulatif requis et être affectée à ce promoteur précis. Pour changer les personnes affectées, elle doit aussi avoir la permission distincte `manage_assignments`.

## Preparation minimale aux ententes

La création d’entente est couverte ailleurs, mais la préparation d’un système vide doit fournir :

- Une agence existante et utilisable.
- Un programme pour cette agence.
- Un volet sous le programme.
- Budgets d’exercices et éléments de ligne de coûts pour les flux financiers.
- Destinataires admissibles, cotes de risque, configurations d’examen, modèles d’approbation, configurations de recommandation, sous-types d’entente, types de modification et types de surveillance au besoin.
- Au moins un promoteur si l’entente fait référence à des demandeurs/bénéficiaires.

## Préparation minimale des possibilités et dossiers

Avant de recevoir des demandes, créez des volets actifs d’un même programme, le statut Brouillon et des statuts modifiables non Brouillon de l’agence. Créez une [Possibilité](../intake/opportunities.md) avec noms/objectifs bilingues obligatoires et période inclusive. La création commence Brouillon; l’éditeur ordinaire ne change pas le statut. Une intégration API hôte autorisée doit choisir le statut admissible avant l’ouverture.

Pour l’évaluation, publiez les ensembles d’examens et flux visant `fundingcaseintake`, liez-les aux volets sélectionnés et choisissez-les explicitement sur la possibilité. Les collectes de données appartiennent à l’agence et sont choisies dans les membres des flux publiés. Configurez les types de pièces jointes et un fournisseur de stockage disponible pour les téléversements.

Accordez les rôles Dossier de financement à la portée du programme séparément des rôles Entente. La création manuelle affecte le créateur comme principal et exige un promoteur consultable. Pour les [Imports du Portail](../intake/portal.md), activez le connecteur et préparez un groupe admissible d’agence avec membres qualifiés; les imports n’ont aucun utilisateur affecté avant réclamation ou affectation directe. Vérifiez file, réclamation, vue Demande enregistrée et démarrage d’évaluation comme utilisateur délégué avant la production.

Préparez les finances selon leurs dépendances : types/sous-types de financement d’agence avant les sélections de volet; plans d’agence par devise et budgets correspondants avant le travail financier; types de comptes débiteurs et de surveillance admissibles avant les flux associés. L’admissibilité de l’exercice aux pièces de journal est désactivée par défaut et exige Gestionnaire d’agence pour l’activer. Ces choix ne remplacent ni rôles métier ni affectations à des dossiers précis.

Par exemple, préparez un programme d’installations communautaires et son volet de petits projets avant de demander à un agent de saisir l’entente d’un centre communautaire :

1. Créez l’exercice 2026–2027 de l’agence ainsi que la catégorie de coûts et l’élément de ligne pour l’équipement.
2. Créez le programme avec les URL anglaise et française des modalités, puis son volet. Rendez l’élément de coûts d’équipement disponible pour ce volet et préparez son budget d’exercice.
3. Créez le profil de promoteur du centre et effectuez l’activation requise avant son utilisation dans une entente. Configurez un sous-type de bénéficiaire admissible.
4. Accordez à l’agent le rôle Entente approprié à la portée du programme et affectez-le à l’entente sur laquelle il travaillera. Affectez-le aussi au promoteur si ses tâches exigent des modifications au profil.
5. Testez l’accès avec ce compte avant de saisir du travail financier réel. La permission du rôle et l’affectation à un dossier précis sont deux vérifications distinctes.

Les noms de cet exemple sont fictifs; utilisez vos agences, programmes, volets et classifications financières approuvés.

## Verification

Testez avec un compte utilisateur ordinaire ayant les rôles préparés, plutôt qu’avec le compte administrateur racine. Le **niveau d’accès** d’un rôle (parfois appelé plafond) détermine les actions maximales permises. Sa **portée** limite où ces permissions s’appliquent : globalement, dans une agence ou dans certains programmes. Les niveaux cumulatifs supérieurs comprennent les niveaux inférieurs.

1. Connectez-vous avec le compte de test et vérifiez la barre latérale selon le rôle prévu.
2. Vérifiez **Ententes** et **Promoteurs**. Chaque destination exige l’accès Lecteur correspondant ou un niveau supérieur dans une portée autorisée; une affectation au dossier ne suffit pas à faire apparaître la destination.
3. Vérifiez **Gestion des affectations**. Son entrée dans la barre latérale exige la permission distincte `manage_assignments` pour Entente, Promoteur, Dossier de financement, Pièce de journal ou Correction. Si l’utilisateur gère seulement les affectations des comptes débiteurs, ouvrez directement `/assignment-management`; cette permission seule ne fait pas apparaître l’entrée.
4. Vérifiez les destinations administratives nécessaires. **GWCOA** exige Lecteur Système global ou un niveau supérieur. **Audit** exige sa propre permission Lecteur Audit ou supérieure, globalement ou pour une agence. **Groupes** exige la permission de consulter les dossiers de groupe.
5. Ouvrez une agence, un programme, un volet, un promoteur, une entente et un dossier utilisateur auxquels le rôle de test devrait donner accès. Vérifiez que les onglets et actions prévus sont disponibles selon la portée et le niveau d’accès du rôle.
6. Vérifiez séparément les affectations à des dossiers précis. Par exemple, confirmez que l’agent peut travailler sur son entente affectée, avec les permissions de rôle appropriées, avant de lui demander de saisir des données réelles. Un menu ou un onglet visible ne remplace pas une affectation requise au dossier ou au flux.
