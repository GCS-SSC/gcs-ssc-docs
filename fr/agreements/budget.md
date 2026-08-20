# Budget de l'entente

L'onglet **Budget** enregistre les exercices de l'entente et ses lignes de coûts détaillées. Les prévisions et les réclamations choisissent ces coordonnées budgétaires stables; les engagements sont limités par le financement de programme courant; et les paiements utilisent les exercices de l'entente. Configurez le budget avant les opérations financières en aval.

## Préalables et accès

Configurez les éléments suivants dans cet ordre :

1. les exercices de l'agence;
2. les budgets de programme par exercice;
3. les budgets de volet, y compris le budget total et le seuil de surengagement;
4. les lignes actives des catégories de coûts du volet;
5. l'entente enregistrée et ses dates d'aide autorisée.

Le plafond Lecteur de l’entente affiche le budget. L’ajout ou la modification d’exercices et de lignes exige Contributeur et l’affectation exacte à l’entente; la suppression exige Gestionnaire et cette affectation. Les lignes budgétaires emploient l’entente comme racine. Les recherches exigent le même plafond que le formulaire qui les a ouvertes.

Les écritures emploient la transaction établie pour l'entente : le serveur verrouille l'entente et la chaîne de portée, reconstruit l'autorisation, résout le volet courant, puis modifie uniquement la version de travail courante du budget.

## Exercices

Choisissez un exercice soutenu par un budget actif du volet courant de l'entente. Le sélecteur de création renvoie uniquement les exercices dont la période chevauche la période d'aide autorisée de l'entente. Un exercice actif ne peut apparaître qu'une fois dans la version budgétaire courante.

Le tableau conserve un groupe d'exercice même lorsqu'il ne contient aucune ligne. Dans ce groupe, une personne autorisée peut ajouter une ligne, changer l'exercice ou supprimer le groupe lorsque l'interface juge la suppression sûre.

La suppression est logique et est refusée si l'exercice est utilisé par des lignes budgétaires, des réclamations, des paiements ou des lignes de réclamation actifs. L'onglet principal n'affiche donc l'action de suppression que pour un groupe vide. Il n'offre aucun rétablissement.

::: warning Limitation actuelle de la modification d'un exercice
Le sélecteur de modification ordinaire offre uniquement des exercices budgétaires du volet qui chevauchent la période de l'entente, mais l'API PATCH vérifie elle-même l'appartenance au volet sans répéter la vérification du chevauchement. Elle n'empêche pas non plus de changer un exercice rempli et ne recalcule pas ses lignes existantes selon la capacité de l'exercice de destination. Utilisez uniquement le sélecteur fourni et ne changez pas un groupe d'exercice après la création de réclamations ou de paiements. Après un changement erroné, interrompez les opérations en aval et demandez à une personne autorisée de rapprocher le budget et les fiches financières touchées.
:::

## Lignes budgétaires

Le formulaire plein écran d'une ligne contient :

| Champ | Règle |
| --- | --- |
| Exercice budgétaire | Groupe d'exercice obligatoire de la version courante de cette entente. |
| Ligne de coûts | Ligne active obligatoire d'une catégorie de coûts du volet. Son nom anglais ou français configuré est affiché. |
| Sous-section de coûts | Texte non vide obligatoire d'au plus 255 caractères. |
| Description | Texte non vide obligatoire; cette description propre à l'entente n'est pas bilingue. |
| Montant total | Montant fini obligatoire comportant au plus deux décimales. |
| Financement du programme | Montant fini obligatoire comportant au plus deux décimales. |
| Autre financement fédéral, autre financement gouvernemental, autre financement | Montants finis facultatifs comportant au plus deux décimales; une valeur vide devient une valeur absente. |
| Devise | Valeur configurée obligatoire de `currency_codes`; un nouveau formulaire utilise `cad` par défaut. |

La valeur absolue maximale prise en charge dans une requête est de 90 billions. Les montants sont enregistrés sous forme `numeric(19,2)`. Le schéma courant n'exige pas que les montants budgétaires soient positifs ou nuls; un budget opérationnel devrait néanmoins utiliser des valeurs financières valides et non négatives.

Le montant total doit être au moins égal au financement du programme plus les trois montants de financement facultatifs. Lors d'une mise à jour partielle, cette règle entre champs s'exécute seulement si la requête contient à la fois le montant total et le financement du programme; la contrainte de la base de données évalue tout de même la ligne enregistrée complète.

## Capacité du financement de programme

Pour l'exercice choisi, le financement de programme maximal est :

`budget total du volet × (1 + seuil de surengagement)`

Le contrôle de capacité additionne le financement de programme des lignes actives des versions budgétaires courantes de **toutes les ententes actives du même volet et du même exercice**. La création verrouille la ligne de budget du volet avant le contrôle et l'insertion. Une modification exclut la ligne en cours, verrouille le budget du volet cible, puis contrôle le financement de programme proposé. Un exercice courant ou un budget du volet absent ou supprimé est rejeté.

Le déplacement d'une ligne vers un autre exercice est refusé lorsqu'une ligne de réclamation active fait référence à son identité budgétaire stable. La suppression de la ligne est également refusée dans ce cas. Les autres suppressions réussies sont logiques et l'onglet n'offre aucun rétablissement.

## Tableau groupé et recherche

Les lignes sont regroupées par exercice, catégorie de coûts de l'organisation et sous-section en texte libre. Les actions d'ajout dans un groupe de catégorie ou de sous-section préremplissent et verrouillent ces valeurs dans le nouveau formulaire. Une ligne terminale présente le nom bilingue configuré de la ligne de coûts, la description propre à l'entente, le total, le financement du programme et la somme des autres financements.

La recherche est effectuée côté client dans l'aperçu chargé. Elle porte sur l'affichage de l'exercice, les noms anglais et français de la catégorie et de la ligne, la sous-section et la description. La vue charge l'aperçu complet plutôt qu'une recherche paginée côté serveur; la taille de page locale initiale est de 50.

Les totaux des groupes et du pied additionnent les valeurs numériques affichées. Une devise unique est mise en forme selon cette devise (`cad` reçoit une mise en forme monétaire); un mélange de devises est volontairement présenté comme une somme décimale simple et n'est **pas** converti. N'interprétez pas un total multidevise comme un total financier converti.

## Versions et fiches en aval

La création d'une entente crée automatiquement une version de travail courante du budget. L'onglet Budget ordinaire lit et modifie uniquement cette version. La préparation d'une modification copie les exercices et les lignes dans une version distincte propre à la modification tout en conservant des identités publiques stables; les révisions approuvées conservent la version choisie comme provenance. Les copies historiques ne comptent pas dans les calculs courants de capacité du volet.

Les identités stables permettent aux prévisions, aux réclamations, aux extensions et aux instantanés de révision de suivre un exercice ou une ligne logique dans les copies de versions. Les contraintes de la base de données lient les lignes physiques à un exercice, une version budgétaire et une entente, et empêchent les identités stables actives en double dans une même version.

Avant de réduire ou de supprimer des données budgétaires, consultez [Engagements](./commitments.md), [Prévisions](./forecasts.md), [Réclamations](./claims.md) et [Paiements](./payments.md). Les contraintes en aval peuvent refuser un changement même lorsque son bouton est disponible.

## Reprise

Si l'enregistrement échoue, rechargez l'entente et vérifiez votre permission, la configuration courante du volet, les dates de l'entente, l'exercice stable choisi, la ligne de coûts et la capacité restante. Ne créez pas de lignes de remplacement pour contourner une erreur d'utilisation. Des données supprimées logiquement ou un déplacement erroné d'exercice exigent une opération administrative ou sur les données autorisée.
