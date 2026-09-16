# Systeme vide

Une installation GCS-SSC propre n’est pas utilisable par les opérateurs ordinaires tant qu’un administrateur d’amorçage n’a pas créé une chaîne minimale de configuration métier. L’application est volontairement amorcée par un administrateur : GWCOA exige la permission globale explicite `system:read`, le RBAC doit exister avant que les utilisateurs délégués puissent travailler, et plusieurs pages de flux ne deviennent utiles qu’après la création des références d’agence, de programme, de volet, d’examen, d’approbation et de promoteur.

## Hypothèses de départ

- Un déploiement a provisionné au moins un utilisateur racine authentifié.
- L’utilisateur racine possède un rôle global ordinaire avec les paires action-sujet explicites requises et aucun contournement spécial d’autorisation.
- Le rôle racine comprend explicitement seulement les niveaux cumulatifs requis et les capacités nécessaires de gestion des affectations aux ententes ou promoteurs; racine n’a aucun contournement.
- La base de donnees peut contenir des valeurs de migration, mais il ne faut pas supposer que les donnees de demonstration existent en production.
- Les enregistrements operationnels doivent etre saisis en anglais et en francais lorsque des champs apparies existent.

## Ordre racine

1. Connectez-vous comme utilisateur racine.
2. Creez au moins une agence depuis Agences.
3. Ouvrez le detail de l agence et completez les onglets de reference propres a l agence.
4. Creez les roles racine et delegues depuis Roles.
5. Creez ou verifiez les utilisateurs depuis Utilisateurs.
6. Attribuez les roles aux utilisateurs.
7. Creez les programmes de l agence.
8. Creez les volets sous chaque programme.
9. Configurez les donnees de volet utilisees par les ententes et examens.
10. Publiez les modèles de volet nécessaires au flux prévu et sélectionnez le fournisseur de stockage de l’organisme.
11. Creez les profils de promoteur.
12. Creez les ententes et commencez les flux operationnels.

Cet ordre evite l erreur la plus frequente dans un systeme vide : tenter de creer une entente ou un examen avant que les references d agence, programme, volet, exercice, sous-type, configuration d examen, modele d approbation ou promoteur existent.

## Configuration minimale d agence

Creez d abord le profil d agence. Il stocke les noms et abréviations bilingues, un indicateur actif, le lien GWCOA et l identifiant optionnel du systeme financier externe. Configurez ensuite les onglets dans cet ordre :

1. Exercices, car les budgets, engagements, paiements, reclamations, previsions et surveillances dependent des periodes.
2. Categories de couts, puis elements de ligne sous chaque categorie, car les flux financiers exigent une classification des couts.
3. Types d adresse, car les adresses de promoteur et d entente ont besoin de classifications stables.
4. Sous-types de demandeur/beneficiaire, car les profils de promoteur exigent un sous-type appartenant a l agence principale choisie.
5. Types d entente, car les ententes classent leur type juridique ou operationnel.
6. Types d approbation au nom d autrui, car les approbations peuvent exiger une explication de delegation.
7. Extensions, seulement apres avoir confirme quelles extensions installees sont approuvees pour l agence.
8. Programmes, apres que les references d agence sont pretes.

## Préparation des références et des flux

Créez l’organisation requise dans [GWCOA](../admin/common-admin.md) avant de la lier à un organisme. GWCOA est le catalogue global des organisations; il ne crée pas les approbations, examens ou achèvements d’exécution.

Dans l’organisme, configurez les **Statuts** métier normaux, en lecture seule et terminaux; les **Types de pièces jointes** pour classer les fichiers; et les **Types d’engagement** pour le travail financier. Les paramètres facultatifs de rapprochement choisissent le statut de la réclamation au démarrage et à l’achèvement approuvé du rapprochement final. Sélectionnez et configurez un fournisseur de stockage enregistré avant de téléverser des fichiers ou de générer des documents conservés.

Dans chaque volet, créez les schémas et ensembles d’examen, schémas et configurations de recommandation, modèles d’approbation avec étapes et attestations, et configurations de flux nécessaires. Publiez les modèles réutilisables avant de démarrer leurs instances. L’achèvement d’une modification ou clôture exige un flux publié `approval_submission` configuré pour `on_completion`; les autres enfants pris en charge peuvent s’achever sans ce flux. Configurez aussi les modèles de document et champs personnalisés nécessaires. Consultez [Volets](../programs/streams.md) et [Approbations et achèvements](../concepts/approvals-completions.md).

Par exemple, préparez l’exercice et les éléments de coûts de l’organisme, créez un programme avec ses deux URL de modalités, créez son volet, rendez disponibles ses éléments de coûts, puis créez l’entente et son premier budget. Publier seulement un modèle d’approbation ne suffit pas à achever une modification : le flux d’achèvement publié doit réellement référencer le modèle d’approbation.

## Configuration minimale RBAC

Creez les roles avant de donner du travail operationnel aux utilisateurs ordinaires.

- Gardez un role Administrateur racine global et limitez son attribution aux administrateurs de confiance.
- Creez des roles Administrateur d agence limites a une agence lorsque des utilisateurs doivent gerer les dossiers d agence, programmes, utilisateurs de cette agence ou roles propres a cette agence.
- Creez des roles de programme en choisissant une agence et un ou plusieurs programmes de paiements de transfert.
- Utilisez seulement les sujets valides pour la portée dérivée. Les rôles de programme acceptent uniquement `transfer_payment` et `agreement`. Les rôles d’agence acceptent `agency`, `transfer_payment`, `role`, `user`, `agreement` et `applicant_recipient`. `system` et `audit` sont exclusivement globaux.
- Attribuez les roles depuis le detail de l utilisateur. Les attributions dupliquees retournent l attribution existante au lieu de creer une deuxieme ligne active.
- Accordez Lecteur, Contributeur ou Gestionnaire par sujet. Accordez `manage_assignments` indépendamment sur les permissions Entente ou Promoteur seulement aux coordonnateurs des affectations.

## Configuration minimale des promoteurs

Avant de créer des promoteurs, assurez-vous que l’agence principale possède des sous-types. Le formulaire valide la relation agence-sous-type. La création exige le plafond Contributeur `applicant_recipient` à cette agence, crée un profil initialement inactif et rend le créateur principal. Lecteur à portée définie gère la lecture; les mutations suivantes du profil ou de ses enfants exigent le niveau cumulatif et l’affectation exacte. Les changements du registre exigent `manage_assignments` séparément.

## Preparation minimale aux ententes

La creation d entente est couverte ailleurs, mais la preparation d un systeme vide doit fournir :

- Une agence existante et utilisable.
- Un programme pour cette agence.
- Un volet sous le programme.
- Budgets d exercices et elements de ligne de couts pour les flux financiers.
- Destinataires admissibles, cotes de risque, configurations d examen, modeles d approbation, configurations de recommandation, sous-types d entente, types de modification et types de surveillance au besoin.
- Au moins un promoteur si l entente reference des demandeurs/beneficiaires.

## Verification

Après la configuration, connectez-vous comme utilisateur délégué et vérifiez la barre latérale. Ententes et Promoteurs sont cachés sans le plafond Lecteur correspondant; Gestion des affectations sans `manage_assignments`; GWCOA sans Lecteur Système global; Audit exige son propre niveau Lecteur Audit global. Ouvrez ensuite une agence, un programme, un volet, un promoteur, une entente et un utilisateur pour confirmer la portée, les niveaux cumulatifs, les affectations exactes, les onglets et les actions.
