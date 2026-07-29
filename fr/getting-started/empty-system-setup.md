# Systeme vide

Une installation GCS-SSC propre n est pas utilisable par les operateurs ordinaires tant qu un administrateur d amorcage n a pas cree une chaine minimale de configuration metier. L application est volontairement amorcee par un administrateur : Commun exige la permission globale explicite `system:read`, le RBAC doit exister avant que les utilisateurs delegues puissent travailler, et plusieurs pages de flux ne deviennent utiles qu apres la creation des references d agence, de programme, de volet, d examen, d approbation et de promoteur.

## Hypotheses de depart

- Un deploiement a provisionne au moins un utilisateur racine authentifie.
- L utilisateur racine possede un role global ordinaire avec les paires action-sujet explicites requises et aucun contournement special d autorisation.
- Si l utilisateur racine doit travailler avec des promoteurs, ses quatre indicateurs directs CRUD de promoteur sont actives separement du role.
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
10. Configurez les donnees Commun globales ou liees a l execution.
11. Creez les profils de promoteur.
12. Creez les ententes et commencez les flux operationnels.

Cet ordre evite l erreur la plus frequente dans un systeme vide : tenter de creer une entente ou un examen avant que les references d agence, programme, volet, exercice, sous-type, configuration d examen, modele d approbation ou promoteur existent.

## Configuration minimale d agence

Creez d abord le profil d agence. Il stocke les noms et abreviations bilingues, le statut, le lien GWCOA et l identifiant optionnel du systeme financier externe. Configurez ensuite les onglets dans cet ordre :

1. Exercices, car les budgets, engagements, paiements, reclamations, previsions et surveillances dependent des periodes.
2. Categories de couts, puis elements de ligne sous chaque categorie, car les flux financiers exigent une classification des couts.
3. Types d adresse, car les adresses de promoteur et d entente ont besoin de classifications stables.
4. Sous-types de demandeur/beneficiaire, car les profils de promoteur exigent un sous-type appartenant a l agence principale choisie.
5. Types d entente, car les ententes classent leur type juridique ou operationnel.
6. Types d approbation au nom d autrui, car les approbations peuvent exiger une explication de delegation.
7. Extensions, seulement apres avoir confirme quelles extensions installees sont approuvees pour l agence.
8. Programmes, apres que les references d agence sont pretes.

## Configuration minimale de Commun

Commun est global et exige la permission globale explicite `system:read`. Utilisez-le pour les enregistrements qui ne sont pas possedes par un onglet d agence, surtout les ressources d execution d examen, d approbation, de completion et de recommandation.

Creez d abord les contacts et adresses reutilisables si la configuration d approbation ou d examen reference des personnes ou lieux. Creez ensuite les schemas de formulaire, types de piece jointe, schemas d examen, configurations d ensembles d examen, configurations d examen, modeles d approbation, etapes d approbation, certifications, feuilles de route, schemas de recommandation et configurations de recommandation necessaires.

La ressource Entites est en lecture seule. Elle sert de catalogue des identifiants d entite d execution pour les champs de recherche et n est pas creee par l interface Commun.

## Configuration minimale RBAC

Creez les roles avant de donner du travail operationnel aux utilisateurs ordinaires.

- Gardez un role Administrateur racine global et limitez son attribution aux administrateurs de confiance.
- Creez des roles Administrateur d agence limites a une agence lorsque des utilisateurs doivent gerer les dossiers d agence, programmes, utilisateurs de cette agence ou roles propres a cette agence.
- Creez des roles de programme en choisissant une agence et un ou plusieurs programmes de paiements de transfert.
- Utilisez seulement les sujets valides pour la portee derivee du role. Les roles de programme acceptent `transfer_payment` et `agreement`; les roles d agence acceptent aussi `agency`, `role` et `user`. `system` est exclusivement global.
- Attribuez les roles depuis le detail de l utilisateur. Les attributions dupliquees retournent l attribution existante au lieu de creer une deuxieme ligne active.
- Dans le meme onglet Attributions, accordez les quatre indicateurs directs CRUD de promoteur seulement aux utilisateurs qui ont besoin de l exception interagences globale. Leur modification exige `user:update` global.

## Configuration minimale des promoteurs

Avant de creer des promoteurs, assurez-vous que l agence principale possede des sous-types de demandeur/beneficiaire. Le sous-type choisi doit exister, l agence principale doit exister et le sous-type doit appartenir a cette agence. Les nouveaux promoteurs sont crees a l etat brouillon. La creation de premier niveau utilise l indicateur direct Promoteur `create`. Les operations suivantes de lecture, mise a jour, suppression, gestion des enfants et gestion d equipe utilisent l indicateur direct correspondant ou le niveau d une equipe exacte lorsque cette action est prise en charge.

## Preparation minimale aux ententes

La creation d entente est couverte ailleurs, mais la preparation d un systeme vide doit fournir :

- Une agence existante et utilisable.
- Un programme pour cette agence.
- Un volet sous le programme.
- Budgets d exercices et elements de ligne de couts pour les flux financiers.
- Destinataires admissibles, cotes de risque, configurations d examen, modeles d approbation, configurations de recommandation, sous-types d entente, types de modification et types de surveillance au besoin.
- Au moins un promoteur si l entente reference des demandeurs/beneficiaires.

## Verification

Apres la configuration, connectez-vous comme utilisateur delegue de test et verifiez la vraie barre laterale. Ententes et Promoteurs sont caches sans acces en lecture provenant, selon le domaine, d un role porte, d un indicateur direct ou d une equipe exacte; Commun est cache sans `system:read` global explicite. Ouvrez ensuite une agence, un programme, un volet, un promoteur, une entente et un utilisateur pour confirmer que la portee des roles, les indicateurs directs de promoteur, les niveaux d equipe, les onglets et les actions correspondent au modele prevu.
