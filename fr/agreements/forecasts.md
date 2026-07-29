# Previsions d entente

Les previsions suivent les depenses attendues par ligne budgetaire, mois, exercice et version. L onglet resume les versions par exercice; la page de detail modifie la ventilation mensuelle.

## Configuration d une installation vide

| Configuration | Utilite |
| --- | --- |
| Exercices budgetaires de l entente | Les previsions sont creees pour les exercices budgetaires de l entente. |
| Lignes budgetaires | La page de detail construit ses lignes editables a partir des lignes du meme exercice. |
| Modele d approbation `fundingcaseforecast` | Requis si les previsions completees doivent etre approuvees. |
| Permissions CRUD d entente | `create` cree les en-tetes, versions et nouvelles lignes mensuelles; `update` modifie les lignes existantes et acheve les previsions encore modifiables; `delete` supprime logiquement les dossiers de prevision. Les actions d approbation exigent aussi l acces ordinaire en lecture et une attribution. |

## Flux d onglet

L onglet resume les en-tetes de prevision, les lignes budgetaires et les lignes de prevision.

L onglet regroupe par exercice. Chaque ligne represente une version :

| Colonne | Signification |
| --- | --- |
| Version | Numero de version des lignes. Une prevision sans ligne affiche `0`. |
| Statut | Premier statut de ligne de la version, ou `draft` si aucune ligne. |
| Lignes | Nombre de lignes dans la version. |
| Total prevu | Somme des montants de la version. |

Ajouter une prevision cree un en-tete pour un exercice budgetaire. Ajouter une version ouvre la page de detail avec la prochaine version selectionnee.

## Page de detail

La page affiche un exercice et une version a la fois. Elle construit une grille avec toutes les lignes budgetaires de l exercice et les douze mois fiscaux d avril a mars. Un trimestre peut etre developpe en trois mois.

## Lignes de prevision

| Champ | Regle |
| --- | --- |
| Prevision | Identifiant requis. |
| Ligne budgetaire | Requise. Doit appartenir a l exercice et a l entente de la prevision. |
| Mois | Entier requis de 0 a 11, 0 etant avril. |
| Montant | Montant requis. |
| Devise | Enum requis; l editeur ecrit CAD. |
| Version | Entier non negatif normalise en chaine. |
| Statut | Enum requis. Les nouvelles lignes de detail sont `inprogress`. |

Sauvegarder la ventilation modifie les lignes mensuelles existantes seulement avec `agreement:update` et cree les lignes manquantes non nulles seulement avec `agreement:create`. L editeur expose chaque ligne selon l action requise pour cette ligne.

## Regles d affaires

| Regle | Comportement |
| --- | --- |
| L exercice doit appartenir au budget d entente | Les exercices invalides sont rejetes. |
| La ligne budgetaire doit appartenir a l exercice de la prevision | Les lignes d une autre entente ou d un autre exercice sont rejetees. |
| Le verrouillage est base sur les lignes | Si une ligne est `complete`, `pendingapproval`, `approved` ou `denied`, la page est verrouillee. |
| La completion exige des lignes | Une prevision sans lignes ne peut pas etre completee. |
| La completion verrouille toutes les lignes | Les lignes passent a `complete` ou `pendingapproval` selon la configuration d approbation. |
| L approbation active la prevision approuvee | A l approbation, la prevision devient active et les autres previsions du meme exercice sont desactivees. |

## Completion et approbation

Type d entite : `fundingcaseforecast`.

La completion est permise seulement si la prevision a des lignes et aucune ligne verrouillee. Avec un modele valide, les lignes passent a `pendingapproval`; sans modele, elles passent a `complete`.

Le statut est agrege a partir des lignes : une ligne refusee donne `denied`; toutes approuvees donnent `approved`; une ligne en attente donne `pendingapproval`; toutes completees donnent `complete`.
