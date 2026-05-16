# Paiements d entente

Les paiements enregistrent des demandes de paiement prevues ou reelles contre des engagements actifs et approuves. Les lignes de paiement ventilent le montant du paiement vers des lignes d engagement approuvees.

## Configuration d une installation vide

| Configuration | Utilite |
| --- | --- |
| Exercices budgetaires de l entente | Les exercices de paiement viennent du budget d entente. |
| Engagement actif et approuve | La creation exige un engagement actif et approuve du type choisi. |
| Lignes d engagement | Les lignes de paiement choisissent les lignes admissibles de l engagement et de l exercice. |
| Modele d approbation `fundingcasepayment` | Requis si les paiements completes doivent etre approuves. |
| Extension facultative de calcul de montant | Peut suggerer un montant, appliquer un plafond ou remplacer la creation. |

## Flux d onglet

L onglet affiche le type, le statut, l exercice, la periode, le commentaire, le montant et le nombre de lignes. La recherche inclut le texte de commentaire visible.

La creation saisit :

| Champ | Regle |
| --- | --- |
| Type d engagement | Requis. L entente doit avoir un engagement actif et approuve de ce type. |
| Exercice | Requis. Doit etre un exercice budgetaire de l entente. |
| Type de paiement | `reimbursement` ou `advance`. |
| Debut/fin de periode | Mois fiscaux avril a mars, codes 0 a 11. La fin ne peut pas preceder le debut. |
| Montant | Montant positif requis. |
| Commentaire | Facultatif. Les blancs deviennent null. |

Les nouveaux paiements de base sont `draft`. Les extensions peuvent remplacer l insertion apres validation.

## Page de detail

La page de detail montre le contexte du paiement, les lignes, la completion et l approbation. Utilisez-la pour repartir le montant du paiement sur les lignes d engagement admissibles avant de completer le paiement.

## Lignes de paiement

| Champ | Regle |
| --- | --- |
| Paiement | Identifiant du paiement courant. |
| Ligne d engagement | Requise. Le selecteur offre seulement les lignes qui correspondent a l engagement approuve et a l exercice du paiement. |
| Montant | Montant positif requis. |

Le tableau de detail affiche le numero de ligne d engagement, l exercice, le codage financier et le montant de ligne de paiement. Le codage financier inclut le fonds comme valeur principale ainsi que GL, centre financier, ordre interne, domaine fonctionnel et centre de couts lorsqu ils existent. Le total de detail compare le total des lignes au montant du paiement.

## Regles d affaires

| Regle | Comportement |
| --- | --- |
| Creation avec engagement actif approuve seulement | Sans engagement approuve actif du type choisi, la creation est rejetee. |
| L exercice doit appartenir au budget d entente | Les exercices invalides sont rejetes. |
| La ligne doit correspondre au contexte du paiement | Les lignes hors engagement ou hors exercice sont rejetees. |
| Le montant ne peut pas depasser le solde d engagement | Le total des lignes de paiement pour une ligne d engagement ne peut pas depasser le solde restant de cette ligne. |
| Etats verrouilles | `complete`, `pendingapproval`, `approved`, `denied`, `pay`, `wait`, `processed` et `paid` sont en lecture seule. |
| La modification d un brouillon passe a en cours | Les changements de lignes synchronisent `draft` a `inprogress`. |
| La completion exige un total exact | Le total des lignes doit etre positif et egal au montant du paiement. |

## Completion et approbation

Type d entite : `fundingcasepayment`.

La completion stocke le commentaire commun. Avec un modele valide, le paiement passe a `pendingapproval`; sans modele, il passe a `complete`. La section d approbation apparait pour `pendingapproval`, `approved` et `denied`.

## Extensions

La creation de paiement peut etre remplacee ou completee par des actions d extension. Un calculateur de montant peut retourner un montant suggere, un plafond, une devise, des details de calcul, des erreurs, un etat de chargement et des donnees propres a l extension. Le formulaire bloque l enregistrement si le montant depasse le plafond.
