# Gestion des affectations

Utilisez Gestion des affectations pour ajouter des agents à des dossiers précis, choisir une personne affectée principale ou remplacer une personne qui ne peut plus traiter le travail. Un **registre** est la liste des utilisateurs affectés au dossier. Les coordonnateurs autorisés peuvent tenir cette liste à jour sans recevoir l’accès au contenu du dossier. L’entrée de la barre latérale apparaît lorsque l’utilisateur connecté possède une permission `manage_assignments` active pour les ententes, promoteurs, réceptions, pièces de journal ou corrections. L’API accepte aussi les permissions de gestion des comptes débiteurs; un gestionnaire de ce seul sujet peut ouvrir directement `/assignment-management`, car ce sujet seul n’affiche pas encore l’entrée latérale.

## Ce que la page révèle

La liste affiche seulement les renseignements nécessaires pour trouver un dossier et vérifier ses affectations :

- le type d’entité, l’état, la référence stable et le libellé bilingue;
- l’agence propriétaire et, s’il y a lieu, le programme;
- le nom de l’utilisateur principal affecté;
- le nombre de personnes affectées actives et l’admissibilité actuelle du principal.

Elle ne retourne ni champs de profil, ni renseignements personnels, ni détails financiers, ni documents, ni dossiers de flux, ni données enfants. `manage_assignments` n’affecte pas non plus le coordonnateur comme utilisateur.

## Portée et types d’entités

La page combine toutes les permissions de gestion actives et retourne seulement les entités correspondantes :

| Sujet géré | Types d’entités |
| --- | --- |
| Promoteur | Promoteurs |
| Entente | Ententes, clôtures, réclamations, rapprochements de réclamation, paiements, prévisions, surveillances, modifications et engagements |

Les réceptions utilisent `funding_case`; les pièces de journal, `journal_voucher`; les corrections, `correction`; les comptes débiteurs, ajustements et notes de crédit, `account_receivable`. Les examens, recommandations et collectes résolvent leur sujet depuis leur propriétaire source exact. Une permission de gestion Entente générale ne remplace pas ces sujets financiers distincts.

Par exemple, un coordonnateur ayant la permission de gérer les affectations Entente pour le programme A peut tenir à jour les listes couvertes par cette permission dans ce programme. Cela ne lui permet pas de lire le budget ou les documents d’une entente et ne couvre pas le programme B.

Une permission globale couvre ce sujet partout. Une permission d’agence couvre les dossiers appartenant à cette agence. Une permission Entente limitée à un programme couvre les dossiers de ce programme. Les examens et recommandations d’exécution résolvent leur propriétaire depuis l’entité source au lieu d’hériter l’accès d’un élément d’exécution voisin.

## Trouver un registre

La recherche correspond à la référence stable, à l’un ou l’autre libellé localisé ou à l’état brut. Le filtre de type accepte un type pris en charge pouvant être affecté. Les résultats sont paginés à 20 lignes par défaut.

Les dossiers terminaux peuvent apparaître afin que les coordonnateurs repèrent les problèmes historiques de registre, mais leur registre ne peut être modifié. Utilisez l’état affiché sur la ligne pour décider si un registre est modifiable; le sommaire indique seulement le nombre total de dossiers autorisés.

## Ouvrir et évaluer le registre

Sélectionnez une ligne pour ouvrir Utilisateurs affectés. La liste conserve les affectations actives même si la personne est maintenant inactive ou a perdu la permission Contributeur nécessaire au travail. L’historique est ainsi préservé et un principal inadmissible demeure visible au lieu d’être remplacé silencieusement.

Une personne admissible doit :

1. être un utilisateur actif de l’application;
2. posséder la permission Contributeur ou Gestionnaire pour le sujet propriétaire à la portée globale, d’agence ou de programme actuelle.

Lecteur ne suffit pas pour être ajouté à cette liste. Être affecté à un autre dossier ne rend pas une personne admissible ici.

## Modifier le registre

| Action | Règle du serveur |
| --- | --- |
| Ajouter un utilisateur | La cible est active et admissible, et aucune affectation active en double n’existe. |
| Rendre principal | La cible est déjà affectée activement et admissible; le principal courant est rétrogradé dans la même transaction. |
| Retirer un utilisateur | La cible n’est pas principale et le retrait laisse au moins une affectation active. |

Pour modifier la liste, vous devez avoir une permission courante de gestion des affectations et le dossier doit être dans un état permettant ces changements. L’application verrouille le dossier et ses affectations et revérifie les permissions avant l’enregistrement : des changements simultanés ne peuvent donc pas contourner ces règles. Les vérifications de la base de données exigent au moins une personne affectée active et exactement un principal lors de l’enregistrement.

Par exemple, si l’agent principal quitte l’équipe, ajoutez une personne admissible, rendez-la principale, puis retirez l’ancien agent. Vous ne pouvez pas retirer le principal courant en premier. Si le principal devient inadmissible, suivez la même séquence avec une autre personne admissible. Un dossier terminal verrouillé ne comporte aucun contournement dans l’interface ou l’API; conservez son registre historique.

## Politique des registres modifiables

| Entité | Conditions de modification du registre |
| --- | --- |
| Promoteur | Profil actif non supprimé. |
| Entente et enfants métier, y compris modification et clôture | Définition d’état active de l’organisme, ni en lecture seule ni terminale, et aucune preuve d’achèvement sur la cible exacte. |
| Examen, recommandation ou collecte de données | Élément d’exécution `active` ou `paused`, sans preuve d’achèvement. |

Ces conditions s’ajoutent aux permissions, à la propriété, à l’affectation exacte et aux protections du parent. Elles n’accordent pas à elles seules le droit de modifier. Le libellé n’est pas la règle : un état métier personnalisé « En examen » peut être normal ou en lecture seule selon sa configuration.

## Accès au niveau de l’entité

Les pages accessibles de promoteur et d’entente exposent le même registre dans un onglet **Utilisateurs affectés**. Les personnes pouvant accéder au dossier avec la permission Lecteur peuvent lire cet onglet, mais les actions exigent toujours `manage_assignments`. L’accès métier Contributeur ou Gestionnaire seul ne permet pas d’administrer les affectations.

Pour le modèle complet d’autorisation à deux clés, consultez [Permissions de rôle et affectations exactes](../concepts/rbac.md).

Les collectes de données possèdent leur registre exact et résolvent l’autorité par leur propriétaire source. Le travail actif d’examen, de recommandation ou de collecte appartenant à un groupe peut avoir un registre personnel vide jusqu’à la réclamation. Celle-ci conserve le registre et le principal existants; elle ne donne aucune autorité de gestion du registre. Pendant l’approbation ou à un état terminal, les réponses et le registre sont figés.
