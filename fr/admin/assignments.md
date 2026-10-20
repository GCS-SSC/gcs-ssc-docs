# Gestion des affectations

Utilisez **Gestion des affectations** pour ajouter des agents aux dossiers, choisir une personne affectée principale ou remplacer une personne qui ne peut plus traiter le travail. Un registre est la liste des utilisateurs affectés au dossier. Les coordonnateurs autorisés peuvent modifier cette liste sans accéder au contenu du dossier.

Pour ouvrir la page depuis la barre latérale, vous devez avoir une permission `manage_assignments` active pour les ententes, promoteurs, réceptions, pièces de journal ou corrections. Si vous avez seulement la permission de gérer les affectations des comptes débiteurs, ouvrez directement `/assignment-management`. Cette permission est acceptée, mais elle n'affiche pas l'entrée latérale.

## Ce que la page révèle

La liste affiche seulement les renseignements nécessaires pour trouver un dossier et vérifier ses affectations :

- le type d'entité, l'état, la référence stable et le libellé bilingue;
- l'agence propriétaire et, s'il y a lieu, le programme;
- le nom de l'utilisateur principal affecté;
- le nombre de personnes affectées actives et l'admissibilité actuelle du principal.

Elle ne retourne ni champs de profil, ni renseignements personnels, ni détails financiers, ni documents, ni dossiers de flux, ni données enfants. `manage_assignments` n'affecte pas non plus le coordonnateur comme utilisateur.

## Portée et types d'entités

La page combine toutes les permissions de gestion actives et retourne seulement les entités correspondantes :

| Sujet géré | Types d'entités |
| --- | --- |
| Promoteur | Promoteurs |
| Entente | Ententes, clôtures, réclamations, rapprochements de réclamation, paiements, prévisions, surveillances, modifications et engagements |

Les autres dossiers exigent des permissions de gestion des affectations distinctes :

- Les réceptions exigent la permission Dossier de financement, `funding_case`.
- Les pièces de journal exigent la permission Pièce de journal, `journal_voucher`.
- Les corrections exigent la permission Correction, `correction`.
- Les comptes débiteurs, ajustements et notes de crédit exigent la permission Compte débiteur, `account_receivable`.

Les examens, recommandations et collectes de données utilisent la permission du dossier propriétaire de la tâche. La permission de gérer les affectations Entente ne couvre pas ces sujets financiers distincts.

Par exemple, un coordonnateur ayant la permission de gérer les affectations Entente pour le programme A peut tenir à jour les listes couvertes par cette permission dans ce programme. Cela ne lui permet pas de lire le budget ou les documents d'une entente et ne couvre pas le programme B.

Une permission globale couvre ce type de travail partout. Une permission d'agence couvre les dossiers appartenant à cette agence. Une permission Entente limitée à un programme couvre les dossiers de ce programme. Pour les examens et recommandations, vérifiez le propriétaire du dossier source. L'accès à un examen ou à une recommandation connexe ne donne pas accès à la tâche.

## Trouver un registre

Recherchez la référence du dossier, son libellé français ou anglais, ou sa valeur d'état. Utilisez le filtre de type d'entité pour réduire la liste. Les résultats affichent 20 lignes par page par défaut.

Les dossiers dans un état final peuvent apparaître pour permettre de repérer les problèmes historiques d'affectation, mais leur registre ne peut pas être modifié. Vérifiez l'état de chaque ligne avant de modifier les affectations. Le sommaire compte tous les dossiers que vous êtes autorisé à trouver, y compris ceux que vous ne pouvez pas modifier.

## Ouvrir et évaluer le registre

Sélectionnez une ligne pour ouvrir Utilisateurs affectés. La liste conserve les affectations actives même si la personne est maintenant inactive ou a perdu la permission Contributeur nécessaire au travail. L'historique est ainsi préservé et un principal inadmissible demeure visible au lieu d'être remplacé silencieusement.

Une personne admissible doit :

1. Être un utilisateur actif de l'application.
2. Posséder la permission Contributeur ou Gestionnaire pour ce type de travail à la portée actuelle du dossier, globale, d'agence ou de programme.

Lecteur ne suffit pas pour être ajouté à cette liste. Être affecté à un autre dossier ne rend pas une personne admissible ici.

Un profil de promoteur est partagé entre les agences. Une personne ayant la permission Contributeur Promoteur globale ou dans toute agence active peut être affectée à ce profil. Un examen ou une recommandation lié au promoteur peut avoir sa propre agence propriétaire. Pour cette tâche, la permission de la personne doit couvrir cette agence. Changer l'agence principale du promoteur ne change pas le propriétaire de la tâche.

Le sélecteur d'utilisateurs et l'enregistrement appliquent les mêmes règles d'admissibilité. Si une personne proposée est refusée à l'enregistrement, rechargez le registre et vérifiez si son compte ou ses permissions ont changé.

## Modifier le registre

| Action | Condition requise |
| --- | --- |
| Ajouter un utilisateur | La personne est active, admissible et n'est pas déjà affectée activement. |
| Rendre principal | La personne est déjà affectée activement et admissible. L'ancien principal reste affecté, mais n'est plus principal. |
| Retirer un utilisateur | La personne n'est pas principale et au moins une affectation active demeure. |

Pour modifier la liste, vous devez avoir la permission courante de gestion des affectations et le dossier doit être dans un état qui permet ces changements. L'application revérifie les permissions à l'enregistrement et empêche les changements simultanés de contourner les règles. Le registre enregistré doit contenir au moins une personne affectée active et exactement un principal.

Par exemple, si l'agent principal quitte l'équipe, ajoutez une personne admissible, rendez-la principale, puis retirez l'ancien agent. Vous ne pouvez pas retirer le principal courant en premier. Si le principal devient inadmissible, suivez la même séquence avec une autre personne admissible. Vous ne pouvez pas contourner un état final dans la page ou l'API. Conservez le registre historique de ce dossier.

## Quand modifier les affectations

| Entité | Conditions de modification du registre |
| --- | --- |
| Promoteur | Profil actif non supprimé. |
| Entente et dossiers connexes, y compris modification et clôture | Le dossier utilise un état actif de l'agence, ni en lecture seule ni final. Le dossier n'a aucune preuve d'achèvement. |
| Examen, recommandation ou collecte de données | La tâche est `active` ou `paused`, sans preuve d'achèvement. |

Le dossier et son parent doivent aussi permettre le changement. Vous devez avoir la permission de gestion des affectations, même si l'état permet de modifier le registre. Un état personnalisé « En examen » peut permettre les changements ou être en lecture seule selon sa configuration.

## Accès au niveau de l'entité

Vous pouvez aussi ouvrir le même registre dans l'onglet **Utilisateurs affectés** des pages de promoteur et d'entente auxquelles vous avez accès. Les personnes pouvant accéder au dossier avec la permission Lecteur peuvent lire cet onglet, mais les actions exigent toujours `manage_assignments`. L'accès métier Contributeur ou Gestionnaire seul ne permet pas d'administrer les affectations.

Pour le modèle complet d'autorisation à deux clés, consultez [Permissions de rôle et affectations exactes](../concepts/rbac.md).

Les collectes de données ont leur propre registre et utilisent les permissions du dossier propriétaire. Les examens, recommandations et collectes actifs d'un groupe peuvent n'avoir aucune personne affectée avant qu'un membre réclame la tâche. Une réclamation conserve les affectations et le principal existants. Elle ne donne pas la permission de gérer les affectations. Pendant l'approbation ou dans un état final, vous ne pouvez modifier ni les réponses ni les affectations.
