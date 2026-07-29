# Reclamations d entente

Les reclamations capturent les montants soumis contre les lignes budgetaires d entente et prennent en charge un ou plusieurs rapprochements. Le flux a deux surfaces principales : soumission et rapprochement.

## Configuration d une installation vide

| Configuration | Utilite |
| --- | --- |
| Exercices et lignes budgetaires | Les reclamations sont creees pour les exercices budgetaires et les lignes de soumission viennent du budget. |
| Utilisateurs communs | Les rapprochements stockent l utilisateur courant comme examinateur. |
| Modele d approbation `fundingclaimreconcile` | Requis si les rapprochements doivent etre approuves. |
| Permissions CRUD d’entente | `create` crée les réclamations, les lignes de soumission manquantes, les rapprochements et les lignes de rapprochement manquantes ; `update` modifie les dossiers existants et les états de flux modifiables ; `delete` supprime logiquement les réclamations et leurs enfants. Les actions d’approbation exigent aussi l’accès ordinaire en lecture et une attribution. |

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

La création d’une réclamation exige `agreement:create`, la modification de son en-tête existant exige `agreement:update` et sa suppression exige `agreement:delete`.

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

Les lignes non allouées apparaissent dans la table de soumission avec un indicateur Non alloué et leurs libellés soumis. Les utilisateurs avec `agreement:update` peuvent allouer une ligne non allouée à une ligne budgétaire lorsque la réclamation est `draft` ou `submitted`.

La reclamation peut etre marquee prete pour examen seulement si elle est `draft`, contient au moins une ligne et ne contient aucune ligne non allouee. Elle passe alors a `submitted`.

## Plusieurs lignes par ligne budgetaire

Des sources externes peuvent creer plus d une ligne de reclamation pour la meme ligne budgetaire d entente. En lecture seule et dans les contextes soumis, l onglet Soumission affiche chaque ligne soumise separement afin que le detail importe ne soit pas regroupe. En brouillon editable, l editeur normal affiche une entree de montant par ligne budgetaire.

## Actions de reclamation

| Action | Permise lorsque | Resultat |
| --- | --- | --- |
| Sauvegarder la soumission | Réclamation `draft` ; `agreement:create` pour les lignes manquantes et `agreement:update` pour les lignes existantes | Crée ou modifie uniquement les lignes saisies dans l’interface utilisateur que l’action correspondante autorise. |
| Allouer une ligne non allouée | Réclamation `draft` ou `submitted`, ligne non allouée et action `agreement:update` | Définit la ligne budgétaire après avoir validé qu’elle appartient à l’entente et à l’exercice. |
| Prêt pour examen | Brouillon avec au moins une ligne, aucune ligne non allouée et action `agreement:update` | Passe à `submitted`. |
| Retirer | Statut `submitted`, aucun rapprochement et action `agreement:update` | Passe à `withdrawn`. |
| Annuler | Non `draft`, `withdrawn` ou `cancelled`, avec action `agreement:update` | Passe à `cancelled`. |

## Rapprochements

Le rapprochement est visible lorsque la réclamation est admissible au rapprochement ou lorsqu’il existe déjà des rapprochements. Les réclamations aux statuts `submitted`, `inreview`, `reviewed` ou `complete` peuvent afficher et démarrer le travail de rapprochement lorsqu’elles n’ont aucune ligne non allouée et aucun rapprochement final approuvé.

Démarrer un rapprochement exige `agreement:create`, crée un brouillon pour l’utilisateur courant et déplace la réclamation à `inreview`. Modifier un rapprochement existant ou son indicateur final exige `agreement:update`. Démarrer ou modifier un rapprochement à partir d’une réclamation soumise, examinée ou complétée peut la ramener à `inreview`.

Lignes de rapprochement :

| Champ | Regle |
| --- | --- |
| Rapprochement | Fixe par le rapprochement selectionne. |
| Ligne de reclamation | Requise et doit appartenir a la reclamation. |
| Montant rapproche | Montant requis. |
| Montant echantillonne | Montant facultatif. |
| Justification | Texte facultatif; blanc devient null. |

La liste affiche les rapprochements du plus récent au plus ancien avec examinateur, statut, indicateur final, total rapproché, total échantillonné et solde. Choisir un rapprochement change le panneau de détail modifiable ou en lecture seule sous la liste. La sauvegarde utilise `agreement:update` pour les lignes de rapprochement existantes et `agreement:create` pour les lignes manquantes.

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

La complétion est attachée au rapprochement sélectionné, pas à l’en-tête de réclamation, et exige `agreement:update`. La section de complétion apparaît lorsqu’un rapprochement existe. Compléter un rapprochement final affiche une confirmation supplémentaire, car cela peut fermer le parcours d’examen de la réclamation. Avec un modèle valide, la complétion crée ou matérialise la feuille de route et passe le rapprochement à `pendingapproval` ; sans modèle, elle le passe à `complete`.

Sans modèle d’approbation, compléter un rapprochement final passe la réclamation à `reviewed` ; compléter un rapprochement non final laisse la réclamation à `inreview`. La section d’approbation apparaît pour les rapprochements `pendingapproval`, `approved` et `denied`. Agir sur une approbation exige l’accès ordinaire en lecture à l’entente, accordé par un rôle ou son équipe exacte, ainsi qu’une attribution à l’étape ; l’attribution seule ne donne aucun accès.
