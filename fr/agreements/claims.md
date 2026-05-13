# Reclamations d entente

Les reclamations capturent les montants soumis contre les lignes budgetaires et prennent en charge un ou plusieurs rapprochements. Le flux a deux surfaces principales : soumission et rapprochement.

## Configuration d une installation vide

| Configuration | Utilite |
| --- | --- |
| Exercices et lignes budgetaires | Les reclamations sont creees pour les exercices budgetaires et les lignes de soumission viennent du budget. |
| Utilisateurs communs | Les rapprochements stockent l utilisateur courant comme examinateur. |
| Modele d approbation `fundingclaimreconcile` | Requis si les rapprochements doivent etre approuves. |
| Permission de mise a jour | Requise pour modifier les brouillons, demarrer des rapprochements, sauvegarder les lignes, completer et gerer les approbations. |

## Flux d onglet

L onglet regroupe les reclamations par exercice et affiche l identifiant, la periode, le statut, le montant soumis et le montant rapproche.

La creation saisit :

| Champ | Regle |
| --- | --- |
| Exercice | Exercice budgetaire d entente requis. |
| Date de reception | Date requise. |
| Debut/fin de periode | Mois fiscaux avril a mars, codes 0 a 11. La fin ne peut pas preceder le debut. |
| Final pour l exercice | Booleen requis. |

Les nouvelles reclamations commencent a `draft`.

## Page de detail

La page contient :

| Onglet | Utilite |
| --- | --- |
| Soumission | Saisir les montants par ligne budgetaire et marquer pret pour examen. |
| Rapprochement | Demarrer ou choisir des rapprochements, saisir les montants rapproches et echantillonnes, completer et voir les approbations. |
| Extensions | Onglets facultatifs fournis par extensions. |

## Lignes de soumission

L onglet Soumission construit ses lignes a partir du budget du meme exercice. La sauvegarde cree ou modifie des lignes de reclamation :

| Champ | Regle |
| --- | --- |
| Reclamation | Fixee par la page de detail courante. |
| Ligne budgetaire | Doit appartenir a l exercice et a l entente. |
| Description | Heritee de la ligne budgetaire selectionnee. |
| Montant | Montant requis. |
| Devise | Requise; l editeur ecrit CAD. |

La reclamation peut etre marquee prete pour examen seulement si elle est `draft` et contient au moins une ligne. Elle passe alors a `submitted`.

## Actions de reclamation

| Action | Permise lorsque | Resultat |
| --- | --- | --- |
| Sauvegarder la soumission | Statut `draft` et permission de mise a jour | Cree ou modifie les lignes. |
| Pret pour examen | Brouillon avec au moins une ligne | Passe a `submitted`. |
| Retirer | Statut `submitted` et aucun rapprochement | Passe a `withdrawn`. |
| Annuler | Non `draft`, `withdrawn` ou `cancelled` | Passe a `cancelled`. |

## Rapprochements

Le rapprochement est visible lorsque la reclamation est `submitted` ou `inreview`, ou lorsqu il existe deja des rapprochements. Demarrer un rapprochement cree un brouillon pour l utilisateur courant et deplace la reclamation a `inreview`.

Lignes de rapprochement :

| Champ | Regle |
| --- | --- |
| Rapprochement | Fixe par le rapprochement selectionne. |
| Ligne de reclamation | Requise et doit appartenir a la reclamation. |
| Montant rapproche | Montant requis. |
| Montant echantillonne | Montant facultatif. |
| Justification | Texte facultatif; blanc devient null. |

La liste affiche les rapprochements du plus recent au plus ancien avec examinateur, statut, indicateur final, total rapproche, total echantillonne et solde.

## Regles d affaires

| Regle | Comportement |
| --- | --- |
| Les reclamations brouillon sont les seules editables | `submitted`, `inreview`, `reviewed`, `withdrawn` et `cancelled` verrouillent la soumission. |
| Les rapprochements exigent une reclamation prete | L edition exige `submitted` ou `inreview`. |
| Les etats verrouilles bloquent le rapprochement | `complete`, `pendingapproval`, `approved` et `denied` sont verrouilles. |
| La completion exige des lignes | Un rapprochement vide ne peut pas etre complete. |
| Un rapprochement final peut completer la reclamation | La completion tient compte du drapeau final et peut passer la reclamation a `complete`. |
| L approbation met a jour la reclamation | Un rapprochement approuve peut passer la reclamation a `reviewed`; un refus garde ou ramene la reclamation en examen. |

## Completion et approbation

Type d entite : `fundingclaimreconcile`.

La completion est attachee au rapprochement selectionne, pas a l en-tete de reclamation. Avec un modele valide, le rapprochement passe a `pendingapproval`; sans modele, il passe a `complete`. La section d approbation apparait pour `pendingapproval`, `approved` et `denied`.
