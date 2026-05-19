# Reclamations d entente

Les reclamations capturent les montants soumis contre les lignes budgetaires d entente et prennent en charge un ou plusieurs rapprochements. Le flux a deux surfaces principales : soumission et rapprochement.

## Configuration d une installation vide

| Configuration | Utilite |
| --- | --- |
| Exercices et lignes budgetaires | Les reclamations sont creees pour les exercices budgetaires et les lignes de soumission viennent du budget. |
| Utilisateurs communs | Les rapprochements stockent l utilisateur courant comme examinateur. |
| Modele d approbation `fundingclaimreconcile` | Requis si les rapprochements doivent etre approuves. |
| Permission de mise a jour | Requise pour modifier les brouillons, allouer les lignes importees, demarrer des rapprochements, sauvegarder les lignes, completer et gerer les approbations. |

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

La page de detail de reclamation utilise le sommaire de detail commun. Le titre est l identifiant de reclamation et les metadonnees incluent le numero d entente, le titre d entente, l exercice, la periode de reclamation et le statut.

La page contient :

| Onglet | Utilite |
| --- | --- |
| Soumission | Saisir les montants par ligne budgetaire, consulter les lignes soumises importees ou non allouees, allouer ces lignes aux lignes budgetaires d entente et marquer pret pour examen. |
| Rapprochement | Demarrer ou choisir des rapprochements, saisir les montants rapproches et echantillonnes, marquer un rapprochement final, completer et voir les approbations. |
| Extensions | Onglets facultatifs fournis par extensions. |

## Lignes de soumission

L onglet Soumission construit les lignes de brouillon editables a partir du budget du meme exercice. La sauvegarde cree ou modifie des lignes de reclamation :

| Champ | Regle |
| --- | --- |
| Reclamation | Fixee par la page de detail courante. |
| Ligne budgetaire | Generalement une ligne budgetaire de l entente dans l exercice de la reclamation; peut etre temporairement null pour des lignes importees ou externes. |
| Categorie, sous-section, ligne soumise | Libelles externes facultatifs utilises pendant qu une ligne n est pas allouee. |
| Description | Heritee de la ligne budgetaire pour les lignes saisies dans l UI, ou fournie par l import/source pour les lignes non allouees. |
| Montant | Montant requis. |
| Devise | Requise; l editeur ecrit CAD. |

Les lignes non allouees apparaissent dans la table de soumission avec un indicateur Non alloue et leurs libelles soumis. Les utilisateurs avec mise a jour de l entente peuvent allouer une ligne non allouee a une ligne budgetaire lorsque la reclamation est `draft` ou `submitted`.

La reclamation peut etre marquee prete pour examen seulement si elle est `draft`, contient au moins une ligne et ne contient aucune ligne non allouee. Elle passe alors a `submitted`.

## Plusieurs lignes par ligne budgetaire

Des sources externes peuvent creer plus d une ligne de reclamation pour la meme ligne budgetaire d entente. En lecture seule et dans les contextes soumis, l onglet Soumission affiche chaque ligne soumise separement afin que le detail importe ne soit pas regroupe. En brouillon editable, l editeur normal affiche une entree de montant par ligne budgetaire.

## Actions de reclamation

| Action | Permise lorsque | Resultat |
| --- | --- | --- |
| Sauvegarder la soumission | Statut `draft` et permission de mise a jour | Cree ou modifie les lignes saisies par l UI pour les lignes budgetaires. |
| Allouer une ligne non allouee | Statut `draft` ou `submitted`, ligne non allouee et permission de mise a jour | Definit la ligne budgetaire apres validation qu elle appartient a l entente et a l exercice. |
| Pret pour examen | Brouillon avec au moins une ligne et aucune ligne non allouee | Passe a `submitted`. |
| Retirer | Statut `submitted` et aucun rapprochement | Passe a `withdrawn`. |
| Annuler | Non `draft`, `withdrawn` ou `cancelled` | Passe a `cancelled`. |

## Rapprochements

Le rapprochement est visible lorsque la reclamation est admissible au rapprochement ou lorsqu il existe deja des rapprochements. Les reclamations aux statuts `submitted`, `inreview`, `reviewed` ou `complete` peuvent afficher et demarrer le travail de rapprochement lorsqu elles n ont aucune ligne non allouee et aucun rapprochement final approuve.

Demarrer un rapprochement cree un brouillon pour l utilisateur courant et deplace la reclamation a `inreview`. Demarrer ou modifier depuis une reclamation soumise, examinee ou completee peut la ramener a `inreview`.

Lignes de rapprochement :

| Champ | Regle |
| --- | --- |
| Rapprochement | Fixe par le rapprochement selectionne. |
| Ligne de reclamation | Requise et doit appartenir a la reclamation. |
| Montant rapproche | Montant requis. |
| Montant echantillonne | Montant facultatif. |
| Justification | Texte facultatif; blanc devient null. |

La liste affiche les rapprochements du plus recent au plus ancien avec examinateur, statut, indicateur final, total rapproche, total echantillonne et solde. Choisir un rapprochement change le panneau de detail editable ou en lecture seule sous la liste.

## Rapprochement final

Chaque reclamation peut avoir seulement un rapprochement final. Le panneau du rapprochement selectionne inclut une case finale lorsque le rapprochement est editable. Les utilisateurs peuvent marquer le rapprochement actif final seulement si aucun autre rapprochement de la reclamation n est deja final.

Completer un rapprochement final affiche un avertissement et une confirmation supplementaires. Apres l existence d un rapprochement final approuve, la reclamation est verrouillee contre les nouveaux rapprochements, les modifications de rapprochement et la completion de rapprochement. Cela empeche des rapprochements ulterieurs de modifier une reclamation finalisee.

Si l approbation d un rapprochement final est refusee, le rapprochement passe a `denied`, son indicateur final est retire et la reclamation retourne a `inreview`.

## Regles d affaires

| Regle | Comportement |
| --- | --- |
| Les reclamations brouillon sont les seules editables | `submitted`, `inreview`, `reviewed`, `withdrawn` et `cancelled` verrouillent les modifications normales de soumission. |
| Les lignes non allouees doivent etre allouees avant l avancee du flux | Pret pour examen et nouveau rapprochement sont bloques tant qu une ligne de reclamation n a pas de ligne budgetaire. |
| L allocation a une fenetre plus large que l edition de soumission | Les lignes non allouees peuvent etre allouees en `draft` ou `submitted`; les autres modifications exigent toujours `draft`. |
| Le demarrage du rapprochement exige une reclamation admissible | Un nouveau rapprochement exige `submitted`, `inreview`, `reviewed` ou `complete`, aucune ligne non allouee et aucun rapprochement final approuve. |
| Les rapprochements exigent une reclamation prete | L edition des lignes exige une reclamation admissible au rapprochement et aucun rapprochement final approuve. |
| Les etats verrouilles bloquent le rapprochement | `pendingapproval`, `approved` et `denied` sont verrouilles. |
| La completion exige des lignes | Un rapprochement vide ne peut pas etre complete. |
| Un seul rapprochement final est permis | Creer ou marquer un deuxieme rapprochement final est rejete. |
| Un rapprochement final approuve verrouille la reclamation | Les nouveaux rapprochements et la completion sont rejetes apres approbation d un rapprochement final. |
| L approbation met a jour la reclamation | Un rapprochement final approuve passe la reclamation a `reviewed`; un rapprochement non final approuve garde la reclamation a `inreview`; un refus retire l indicateur final et laisse la reclamation a `inreview`. |

## Completion et approbation

Type d entite : `fundingclaimreconcile`.

La completion est attachee au rapprochement selectionne, pas a l en-tete de reclamation. La section de completion apparait lorsqu un rapprochement existe. Completer un rapprochement final affiche une confirmation supplementaire, car cela peut fermer le parcours d examen de la reclamation. Avec un modele valide, la completion cree ou materialise la feuille de route et passe le rapprochement a `pendingapproval`; sans modele, elle le passe a `complete`.

Sans modele d approbation, completer un rapprochement final passe la reclamation a `reviewed`; completer un rapprochement non final laisse la reclamation a `inreview`. La section d approbation apparait pour les rapprochements `pendingapproval`, `approved` et `denied`.
