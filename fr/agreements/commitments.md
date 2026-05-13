# Engagements d entente

Les engagements regroupent des lignes d engagement et etablissent les soldes approuves consommes par les paiements. Ils ont un resume dans l onglet et une page de detail.

## Configuration d une installation vide

| Configuration | Utilite |
| --- | --- |
| Budget d entente | Les totaux de lignes d engagement ne peuvent pas depasser le financement de programme de l entente. |
| Engagements du volet | Chaque ligne reference un engagement du volet et son codage financier. |
| Modele d approbation `fundingcaseagreementcommitment` | Requis si la completion doit aller en approbation. Le modele doit etre porte par le volet. |
| Permission de mise a jour | Requise pour creer/modifier engagements, lignes, completion et gestion d approbation. |

## Flux d onglet

L onglet Engagements resume chaque engagement, son nombre de lignes et son montant total.

La creation commence par le type d engagement. Les nouveaux engagements sont crees au statut brouillon, sans numero de systeme financier et sans montant parent. Les actions d extension peuvent ajouter des choix propres a l agence lorsqu elles sont configurees.

Les types sont `commitment`, `paye`, `paye2` et `pyp`.

## Page de detail

La page de detail combine le contexte de l entente, le profil de l engagement, les demandeurs/beneficiaires lies, les lignes d engagement, la section de completion et la section d approbation. Les utilisateurs gerent le codage financier par les lignes, puis completent le dossier lorsqu il est pret pour examen.

## Lignes d engagement

| Champ | Regle |
| --- | --- |
| Engagement | Fixe par la page de detail courante. |
| Numero de ligne | Entier requis de 1 a 32767. |
| Engagement du volet | Requis et doit appartenir au volet de l entente. |
| Montant | Valeur monetaire requise. |

La table affiche l exercice, le codage financier et le montant. Le codage vient de l engagement du volet : fonds, GL, description GL, centre de fonds, ordre interne, domaine fonctionnel et centre de cout.

## Regles d affaires

| Regle | Comportement |
| --- | --- |
| Les etats verrouilles bloquent les modifications | `complete`, `pendingapproval`, `approved` et `denied` sont en lecture seule. |
| La modification fait progresser le statut | Les modifications synchronisent les engagements editables a `inprogress` sauf s ils sont deja en approbation. |
| L engagement du volet doit correspondre au volet de l entente | Les utilisateurs peuvent seulement enregistrer les engagements de volet qui appartiennent au volet de l entente. |
| Une ligne ne peut pas descendre sous le montant deja paye | Lorsque des paiements ont consomme une ligne, la ligne ne peut pas etre reduite sous le montant deja paye ou engage dans les workflows de paiement. |
| Le total de l engagement ne peut pas depasser le financement de programme | Le total des lignes d engagement ne peut pas depasser le financement de programme disponible sur l entente. |
| La completion exige au moins une ligne | Un engagement vide ne peut pas etre complete. |
| L approbation active un engagement de chaque type | A l approbation, l engagement approuve devient actif et les precedents du meme type sont desactives. |

## Completion et approbation

Type d entite : `fundingcaseagreementcommitment`.

La completion cree un enregistrement commun. Avec un modele valide, l engagement passe a `pendingapproval`; sans modele, il passe a `complete`. La section d approbation apparait pour `pendingapproval`, `approved` ou `denied`.

## Dependances en aval

Les paiements peuvent etre crees seulement contre un engagement actif et approuve du type choisi. Les lignes de paiement choisissent ensuite les lignes d engagement de cet engagement et de l exercice correspondant.
