# Gestion des affectations

Gestion des affectations permet aux coordonnateurs autorisés de maintenir les registres de travail exacts sans recevoir l’accès aux dossiers métier sous-jacents. L’entrée de la barre latérale apparaît lorsque l’utilisateur connecté possède au moins une permission `manage_assignments` active pour les ententes ou les promoteurs.

## Ce que la page révèle

La liste est une projection délibérément minimale. Elle contient :

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
| Entente | Ententes, examens et recommandations appartenant à une entente, réclamations, rapprochements de réclamation, paiements, prévisions, surveillances, modifications et engagements |

Une permission globale couvre ce sujet partout. Une permission d’agence couvre les dossiers appartenant à cette agence. Une permission Entente limitée à un programme couvre les dossiers de ce programme. Les examens et recommandations d’exécution résolvent leur propriétaire depuis l’entité source au lieu d’hériter l’accès d’un élément d’exécution voisin.

## Trouver un registre

La recherche correspond à la référence stable, à l’un ou l’autre libellé localisé ou à l’état brut. Le filtre de type accepte l’un des onze types pouvant être affectés. Les résultats sont paginés à 20 lignes par défaut.

Les dossiers terminaux peuvent apparaître afin que les coordonnateurs repèrent les problèmes historiques de registre, mais leur registre ne peut être modifié. Utilisez l’état affiché sur la ligne pour décider si un registre est modifiable; le sommaire indique seulement le nombre total de dossiers autorisés.

## Ouvrir et évaluer le registre

Sélectionnez une ligne pour ouvrir Utilisateurs affectés. Le registre comprend les lignes d’affectation actives même si un utilisateur est maintenant inactif ou n’a plus de plafond Contributeur. L’historique est ainsi préservé et un principal inadmissible demeure visible au lieu d’être remplacé silencieusement.

Une personne admissible doit :

1. être un utilisateur actif de l’application;
2. posséder la permission Contributeur ou Gestionnaire pour le sujet Entente ou Promoteur propriétaire à la portée globale, d’agence ou de programme actuelle.

Lecteur ne suffit pas. Une affectation exacte ailleurs n’influe pas sur l’admissibilité à ce registre.

## Modifier le registre

| Action | Règle du serveur |
| --- | --- |
| Ajouter un utilisateur | La cible est active et admissible, et aucune affectation active en double n’existe. |
| Rendre principal | La cible est déjà affectée activement et admissible; le principal courant est rétrogradé dans la même transaction. |
| Retirer un utilisateur | La cible n’est pas principale et le retrait laisse au moins une affectation active. |

Toutes les mutations exigent une permission de gestion courante et un état permettant la modification du registre. Le serveur verrouille la cible et les affectations courantes, reconstruit l’autorisation, puis applique le changement. Des déclencheurs exigent au moins une personne affectée active et exactement un principal à la validation de la transaction.

Si le principal devient inadmissible, ajoutez ou choisissez une autre personne admissible et rendez-la principale avant de retirer l’ancienne affectation. Un dossier terminal verrouillé ne comporte aucun contournement dans l’interface ou l’API; conservez son registre historique.

## Politique des états modifiables

| Entité | Le registre peut changer lorsque l’état est |
| --- | --- |
| Promoteur | `draft`, `active` |
| Entente | `draft`, `pendingapproval`, `active` |
| Recommandation ou modification | `draft` |
| Réclamation | `draft`, `inprogress`, `inreview`, `submitted`, `reviewed`, `active`, `complete` |
| Examen, rapprochement, paiement, prévision, surveillance, engagement | `draft`, `inprogress`, `inreview`, `submitted`, `reviewed`, `active` |

## Accès au niveau de l’entité

Les pages accessibles de promoteur et d’entente exposent le même registre dans un onglet **Utilisateurs affectés**. Les personnes possédant le plafond Lecteur peuvent lire cet onglet, mais les actions exigent toujours `manage_assignments`. L’accès métier Contributeur ou Gestionnaire seul ne permet pas d’administrer les affectations.

Pour le modèle complet d’autorisation à deux clés, consultez [Permissions de rôle et affectations exactes](../concepts/rbac.md).
