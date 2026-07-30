# Surveillances d entente

Les surveillances enregistrent le travail de surveillance prevu, les elements surveilles, les constatations, les suivis, les mises a jour, les pratiques prometteuses et la completion. Elles ont un resume dans l onglet et une page de detail.

## Configuration d une installation vide

| Configuration | Utilite |
| --- | --- |
| Types de surveillance du paiement de transfert | La recherche est portee par le volet de l entente. |
| Exercices de l agence | La recherche d exercice provisoire est portee par l agence de l entente. |
| Modele d approbation `fundingcasemonitor` | Requis si la completion doit aller en approbation. |
| Permissions CRUD d’entente | `create` crée les surveillances et sous-dossiers, `update` les modifie et achève les surveillances encore modifiables, et `delete` les supprime logiquement. Les actions d’approbation exigent aussi l’accès ordinaire en lecture et une attribution. |

## Flux d onglet

L onglet affiche le type, l exercice provisoire, le trimestre, l indicateur sur place, le statut et les actions.

La creation saisit :

| Champ | Regle |
| --- | --- |
| Type | Type de surveillance requis du volet. |
| Exercice provisoire | Exercice d agence requis. |
| Trimestre provisoire | Entier requis de 1 a 4. |
| Sur place | Booleen requis. |

Les nouvelles surveillances commencent a `draft`.

## Page de detail

L espace de detail contient :

| Onglet | Dossiers |
| --- | --- |
| Planification | Metadonnees et objectifs de surveillance. |
| Elements | Liste de controle ou elements de travail. |
| Constatations | Constatations avec type de recommandation/action et responsable. |
| Suivis | Actions de suivi et historique des mises a jour. |
| Pratiques prometteuses | Pratiques positives observees. |
| Flux | Completion et approbation. |
| Extensions | Onglets facultatifs d extension. |

## Sous-dossiers

| Dossier | Champs requis | Notes |
| --- | --- | --- |
| Objectif de planification | Surveillance, objectif | Capture ce que l activite de surveillance doit evaluer. |
| Element | Surveillance, nom, debut/fin prevus, detail, indicateur surveille | Si surveille est vrai, debut et fin reels sont requis. Les plages de dates doivent etre valides. |
| Constatation | Surveillance, nom, type de recommandation, responsable, detail | Type : `amendment`, `mandatoryaction`, `suggestedaction`, `none`. Responsable : demandeur/beneficiaire, organisation ou conjoint. |
| Suivi | Surveillance, nom du suivi, responsable, date d echeance | Le statut est gere par les mises a jour. |
| Mise a jour de suivi | Suivi, texte, statut, date | La creation, modification ou suppression synchronise le statut du suivi avec la derniere mise a jour, ou `open` s il n en reste aucune. |
| Pratique prometteuse | Surveillance, texte | Dossier texte libre. |

## Regles d affaires

| Regle | Comportement |
| --- | --- |
| Le type doit appartenir au volet | Les types invalides sont rejetes. |
| L exercice doit appartenir a l agence | Les exercices invalides sont rejetes. |
| Les etats verrouilles bloquent les modifications | `complete`, `pendingapproval`, `approved` et `denied` sont en lecture seule. |
| La modification fait progresser le statut | Les modifications synchronisent la surveillance a `inprogress` sauf si elle est deja en approbation. |
| La completion exige du contenu | Il faut au moins un element de surveillance. |
| Le statut de suivi vient des mises a jour | La derniere mise a jour non supprimee controle le statut du suivi. |

## Completion et approbation

Type d entite : `fundingcasemonitor`.

La completion cree un enregistrement commun. Avec un modele valide pour `fundingcasemonitor`, la surveillance passe a `pendingapproval`; sans modele, elle passe a `complete`. La section d approbation apparait dans l onglet Flux pour `pendingapproval`, `approved` ou `denied`.
