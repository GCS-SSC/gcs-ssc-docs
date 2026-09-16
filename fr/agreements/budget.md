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

Changer le groupe d’exercice répète côté serveur la vérification du chevauchement avec l’aide autorisée. Un groupe contenant des lignes budgétaires actives ne peut pas être réaffecté. Un exercice enregistré inchangé peut être conservé après le retrait de sa référence; cela ne le rend pas disponible pour de nouvelles allocations. Examinez les réclamations et paiements avant toute réaffectation : la protection actuelle vérifie les lignes budgétaires actives, tandis que la suppression possède ses propres contrôles d’utilisation en aval.

## Lignes budgétaires

Le formulaire plein écran d'une ligne contient :

| Champ | Règle |
| --- | --- |
| Exercice budgétaire | Groupe d'exercice obligatoire de la version courante de cette entente. |
| Ligne de coûts | Ligne active obligatoire d'une catégorie de coûts du volet. Son nom anglais ou français configuré est affiché. |
| Sous-section de coûts | Texte non vide obligatoire d'au plus 255 caractères. |
| Description | Texte non vide obligatoire; cette description propre à l'entente n'est pas bilingue. |
| Montant total | Montant fini obligatoire comportant au plus deux décimales. |
| Financement du programme | Saisissez un montant exact pour une ligne manuelle. Le serveur calcule celui des lignes en pourcentage; ne transmettez pas de montant de remplacement. |
| Autre financement fédéral, autre financement gouvernemental, autre financement | Montants finis facultatifs comportant au plus deux décimales; une valeur vide devient une valeur absente. |
| Devise | Valeur configurée obligatoire de `currency_codes`; un nouveau formulaire utilise `cad` par défaut. |

Les montants d’entente sont transportés en texte décimal exact, par exemple `"1250.00"`, et stockés en `numeric(19,2)`. Le maximum absolu par ligne est `99999999999999999.99`. Les chaînes décimales font autorité; la compatibilité accepte les nombres JSON uniquement si leurs cents sérialisés sont des entiers sûrs. La notation exponentielle, les espaces autour du montant, les zéros initiaux, les décimales excédentaires et les dépassements sont refusés. Les montants signés restent permis lorsque le schéma du domaine l’autorise; un contrôle affiché ne prouve pas une règle de positivité.

Le total doit couvrir le financement du programme et les trois autres financements. Le recalcul des pourcentages vérifie les lignes touchées complètes et annule le changement initial si une ligne devient insuffisante. Le montant total et les autres financements restent saisis manuellement, même pour une ligne calculée.

## Lignes calculées en pourcentage

Les définitions de coûts de l’organisme choisissent l’un des trois modes. Le volet présente les définitions admissibles aux ententes. Une nouvelle ligne capture le mode, la catégorie source, le pourcentage initial et la permission de le remplacer. Modifier ensuite les valeurs par défaut de l’organisme ne réécrit pas les lignes enregistrées; les copies de modification conservent leurs paramètres de calcul.

| Mode | Base du financement du programme | Valeurs modifiables |
| --- | --- | --- |
| Manuel | Aucun calcul; saisie directe du financement. | Financement du programme, total et autres financements. |
| Pourcentage d’une catégorie (`category`) | Financement du programme des lignes manuelles de la catégorie source. | Total et autres financements; pourcentage seulement si le remplacement était permis à la création de cette ligne. |
| Pourcentage de tous les autres éléments (`all_other`) | Financement du programme de toutes les autres lignes du groupe, y compris les charges de catégorie calculées. | Total et autres financements; pourcentage seulement si la définition enregistrée le permet. |

Le calcul regroupe les lignes par version budgétaire, exercice de l’organisme et devise, toutes sous-sections confondues. Les autres financements fédéraux, gouvernementaux et autres n’entrent jamais dans la base. Les charges de catégorie précèdent celles de tous les autres éléments. Une seule charge active de tous les autres éléments est permise par version/exercice/devise. Les pourcentages vont de 0 à 100 avec au plus deux décimales.

Le résultat est arrondi une seule fois au **dollar entier** le plus proche; une moitié exacte est arrondie en s’éloignant de zéro. Il est ensuite stocké avec deux décimales. Ainsi, 10 % de `"1005.00"` donne `"101.00"`, non `"100.50"`. L’aperçu utilise la même arithmétique exacte, mais le serveur recharge les paramètres et valide la transaction finale.

### Exemple budgétaire chiffré

Supposons que toutes ces lignes soient en CAD pour le même exercice et la même version :

| Ligne | Configuration | Financement du programme |
| --- | --- | ---: |
| Salaires | Manuel, catégorie source Personnel | 10 000,00 |
| Avantages sociaux | 10 % du Personnel | 1 000,00 |
| Administration | 5 % de tous les autres éléments | 550,00 |
| Total | 10 000 + 1 000 + 550 | 11 550,00 |

La base d’Administration est 11 000. Ajouter 2 000 d’autre financement aux Salaires ne modifie aucune charge. Porter les salaires à 12 000 fait passer les Avantages sociaux à 1 200 et l’Administration à 660. Avant d’enregistrer, assurez-vous que les totaux saisis manuellement des deux charges couvrent leur nouveau financement et leurs propres autres financements. Sinon, tout l’enregistrement échoue, y compris le changement des salaires.

### Créer et modifier une ligne calculée

1. Sélectionnez l’exercice budgétaire et la ligne de coûts configurée.
2. Consultez le mode et la catégorie source capturés. Pour une charge de catégorie, vérifiez les lignes sources manuelles de cet exercice et de cette devise.
3. Acceptez le pourcentage initial ou modifiez-le si le formulaire l’autorise.
4. Saisissez le total, la description, la sous-section, la devise et les autres financements. Laissez l’aperçu et le serveur calculer le financement du programme.
5. Enregistrez et examinez les totaux de l’ensemble du budget actualisé; une source peut modifier d’autres lignes.

La création, modification, réaffectation ou suppression d’une ligne recalcule la version touchée dans la même transaction autorisée. Une dépendance invalide, une charge de tous les autres éléments en double, un total insuffisant, un dépassement numérique ou une capacité de volet insuffisante pour la version courante annule le changement initial et les changements dérivés. Changer de devise ou d’exercice change aussi le groupe de calcul. Les versions de modification restent isolées de la version courante jusqu’à leur processus d’application.

## Définitions de coûts retirées

Les catégories de l’organisme, leurs lignes et les associations de volet possèdent chacune un indicateur de disponibilité distinct de la suppression. Désactiver un maillon empêche une nouvelle sélection par cette chaîne. Les références et paramètres enregistrés restent lisibles; la modification d’une ligne peut conserver sa sélection inactive initiale. Un remplacement doit être actuellement admissible. La configuration du volet affiche séparément la disponibilité de l’association, de la catégorie et de la ligne de l’organisme : une association active ne prouve pas à elle seule la disponibilité de la source.

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
