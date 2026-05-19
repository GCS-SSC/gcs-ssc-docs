# Ententes

Les ententes sont des profils de cas de financement sous un volet de paiement de transfert. Elles relient la configuration du programme, les donnees de reference de l agence, les dossiers de demandeur/beneficiaire, le budget, les dossiers d execution, la surveillance, les reclamations, les paiements, les completions et les feuilles d approbation.

## Prerequis de creation

Une installation vide doit etre configuree avant que la creation d entente puisse reussir :

| Domaine | Configuration requise |
| --- | --- |
| Agence | Agence proprietaire, exercices, types d adresse, types d entente, utilisateurs, roles et permissions d entente. |
| Programme de paiement de transfert | Profil de programme et au moins un volet. L acces aux ententes est porte par le chemin programme, volet et entente. |
| Configuration du volet | Budgets du volet par exercice d agence, associations de sous-types d entente, engagements du volet, cotes de risque si la cote est utilisee, resultats, types de surveillance, modeles de document facultatifs et modeles d approbation facultatifs. |
| Demandeur/beneficiaire | Au moins un profil actif de demandeur/beneficiaire. La creation exige un ou plusieurs identifiants. |
| Flux commun | La completion est disponible pour les types d entite d execution pris en charge. Les sections d approbation apparaissent seulement lorsque l etat du dossier et un modele valide du volet le permettent. |
| Modeles de documents | Requis seulement lorsque la generation de documents d entente sera utilisee depuis l onglet Documents. |

## Pages liste et creation

La liste des ententes affiche les dossiers que l utilisateur peut lire et ouvre la page de detail. La creation ouvre le formulaire de nouvelle entente.

Le formulaire de creation enregistre :

| Groupe de champs | Notes |
| --- | --- |
| Volet et sous-type | Le volet doit exister sous un profil actif de paiement de transfert. Le sous-type d entente choisi doit appartenir a ce volet. |
| Identifiants | Le numero d entente est requis et limite a 15 caracteres. Le numero du systeme financier est requis et numerique. |
| Contenu bilingue | Le titre et la description en anglais et en francais sont requis. |
| Periode d assistance | Les dates de debut et de fin sont requises. La date de fin ne peut pas preceder la date de debut. |
| Controles financiers | Indicateur de redistribution, pourcentage de retenue de 0 a 100 et base de retenue sur le total de l entente ou le dernier exercice. |
| Cote de risque | Facultative. Si elle est fournie, elle doit correspondre a une cote de risque configuree sur le volet. |
| Liens demandeur/beneficiaire | La creation exige au moins un demandeur/beneficiaire et rejette les doublons. |

## Espace de detail

L espace de detail s ouvre en mode editable lorsque l utilisateur peut mettre a jour l entente. Sinon, l onglet General et les onglets enfants affichent les details en lecture seule et masquent les actions de creation, modification et suppression.

| Onglet | Page |
| --- | --- |
| General | Profil de l entente, programme, volet, sous-type, risque, dates, retenue et contenu bilingue. |
| Adresses | [Adresses](./addresses.md) |
| Promoteurs | [Promoteurs et demandeurs-beneficiaires](./applicant-recipients.md) |
| Budget | [Budget](./budget.md) |
| Engagements | [Engagements](./commitments.md) |
| Paiements | [Paiements](./payments.md) |
| Previsions | [Previsions](./forecasts.md) |
| Reclamations | [Reclamations](./claims.md) |
| Surveillances | [Surveillances](./monitors.md) |
| Documents | [Documents](./documents.md) |
| Activites | [Activites](./activities.md) |

Des onglets d extension peuvent apparaitre sur les surfaces entente, reclamation, surveillance, engagement et paiement lorsqu une extension les enregistre.

![Detail d entente et flux enfant](/screenshots/fr/agreement-child-workflow.png)

_Capture reelle de l environnement de developpement avec donnees semees. Les enregistrements montres sont seulement des exemples et ne sont pas crees dans une installation fraiche._
