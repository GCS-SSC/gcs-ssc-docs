# Budget de l'entente

L'onglet **Budget** enregistre les exercices de l'entente et ses lignes de coûts détaillées. Configurez-le avant de saisir des prévisions, réclamations, engagements ou paiements. Les prévisions et réclamations utilisent les exercices et lignes de coûts enregistrés du budget. Les engagements ne peuvent dépasser le financement de programme courant permis, et les paiements utilisent les exercices de l’entente.

## Préalables et accès

Avant de saisir le budget d’une entente, confirmez que votre administrateur d’agence ou de programme a configuré les quatre premiers éléments ci-dessous. Vérifiez ensuite l’entente enregistrée et ses dates. Complétez ces préalables dans cet ordre :

1. les exercices de l'agence;
2. les budgets de programme par exercice;
3. les budgets de volet, y compris le budget total et le seuil de surengagement;
4. les lignes actives des catégories de coûts du volet;
5. l'entente enregistrée et ses dates d'aide autorisée.

Vous devez disposer de l’accès Lecteur de l’entente pour consulter le budget. L’ajout ou la modification d’exercices et de lignes exige Contributeur et l’affectation exacte à l’entente; la suppression exige Gestionnaire et cette affectation. Votre affectation doit viser cette entente précise. Les choix proposés dans un formulaire d’ajout ou de modification suivent les mêmes exigences d’accès que ce formulaire.

Lors de l’enregistrement, le système revérifie vos permissions et le volet actuels, puis modifie seulement le budget de travail courant. Il protège l’entente et ses liens d’agence, de programme et de volet contre les changements concurrents pendant l’enregistrement. Un échec laisse le budget inchangé.

## Exercices

Choisissez un exercice soutenu par un budget actif du volet courant de l'entente. Le sélecteur de création renvoie uniquement les exercices dont la période chevauche la période d'aide autorisée de l'entente. Un exercice actif ne peut apparaître qu'une fois dans la version budgétaire courante.

Le tableau conserve un groupe d'exercice même lorsqu'il ne contient aucune ligne. Dans ce groupe, une personne autorisée peut ajouter une ligne, changer l'exercice ou supprimer le groupe lorsque l'interface juge la suppression sûre.

La suppression retire l’exercice de la liste courante tout en conservant son historique enregistré (suppression logique). Elle est refusée si l'exercice est utilisé par des lignes budgétaires, des réclamations, des paiements ou des lignes de réclamation actifs. L'onglet principal n'affiche donc l'action de suppression que pour un groupe vide. Il n'offre aucun rétablissement.

Changer le groupe d’exercice répète côté serveur la vérification du chevauchement avec l’aide autorisée. Un groupe contenant des lignes budgétaires actives ne peut pas être réaffecté. Un exercice enregistré inchangé peut être conservé après le retrait de sa référence; cela ne le rend pas disponible pour de nouvelles allocations. Examinez les réclamations et paiements avant toute réaffectation : la protection actuelle vérifie les lignes budgétaires actives, tandis que la suppression possède ses propres contrôles d’utilisation en aval.

## Lignes budgétaires

Pour une ligne manuelle, choisissez l’exercice et la ligne de coûts, précisez le coût dans la sous-section et la description, saisissez le total et les financements, puis enregistrez. Par exemple, des frais de déplacement de 1 500 CAD financés à hauteur de 1 000 CAD par le programme et de 500 CAD par une source municipale configurée ont un total de 1 500, et non de 1 000. Le formulaire plein écran d’une ligne contient :

| Champ | Règle |
| --- | --- |
| Exercice budgétaire | Groupe d'exercice obligatoire de la version courante de cette entente. |
| Ligne de coûts | Ligne active obligatoire d'une catégorie de coûts du volet. Son nom anglais ou français configuré est affiché. |
| Sous-section de coûts | Texte non vide obligatoire d'au plus 255 caractères. |
| Description | Texte non vide obligatoire; cette description propre à l'entente n'est pas bilingue. |
| Montant total | Montant fini obligatoire comportant au plus deux décimales. |
| Financement du programme | Saisissez un montant exact pour une ligne manuelle. Le serveur calcule celui des lignes en pourcentage; ne transmettez pas de montant de remplacement. |
| Autres sources de financement | Sous-types configurés et montants exacts, avec descriptions française/anglaise facultatives; chaque sous-type apparaît une seule fois par ligne. |
| Devise | Valeur configurée obligatoire de `currency_codes`; le formulaire affiche la devise immuable de l’entente sans permettre son remplacement. |

Saisissez les montants avec au plus deux décimales, dans la devise de l’entente. Ce formulaire ne permet pas de changer la devise.

**Référence technique pour les intégrations :** Les montants d’entente sont transportés en texte décimal exact, par exemple `"1250.00"`, et stockés en `numeric(19,2)`. Le maximum absolu par ligne est `99999999999999999.99`. Les chaînes décimales font autorité; la compatibilité accepte les nombres JSON uniquement si leurs cents sérialisés sont des entiers sûrs. La notation exponentielle, les espaces autour du montant, les zéros initiaux, les décimales excédentaires et les dépassements sont refusés. Les montants signés restent permis lorsque le schéma du domaine l’autorise; un contrôle affiché ne prouve pas une règle de positivité.

Le total doit être au moins égal au financement du programme plus les montants des autres sources configurées. Par exemple, 1 000 du programme plus 500 d’une autre source exigent un total d’au moins 1 500. Un total de 1 400 est refusé. Si le recalcul d’un pourcentage laisse le total d’une ligne touchée inférieur à ses financements combinés, le système annule tout le changement. Le montant total et les autres financements restent saisis manuellement, même pour une ligne calculée.

## Lignes calculées en pourcentage

Votre organisme configure les lignes de coûts comme manuelles ou calculées en pourcentage, et votre volet détermine celles que vous pouvez choisir. À sa création, une ligne conserve le mode de calcul, la catégorie source, le pourcentage initial et la permission de changer ce pourcentage. Les changements ultérieurs aux valeurs par défaut ne modifient pas les lignes enregistrées. Les copies faites pour une modification conservent ces paramètres.

| Mode | Base du financement du programme | Valeurs modifiables |
| --- | --- | --- |
| Manuel | Aucun calcul; saisie directe du financement. | Financement du programme, total et autres financements. |
| Pourcentage d’une catégorie (`category`) | Financement du programme des lignes manuelles de la catégorie source. | Total et autres financements; pourcentage seulement si le remplacement était permis à la création de cette ligne. |
| Pourcentage de tous les autres éléments (`all_other`) | Financement du programme de toutes les autres lignes du groupe, y compris les charges de catégorie calculées. | Total et autres financements; pourcentage seulement si la définition enregistrée le permet. |

Le calcul regroupe les lignes par version budgétaire, exercice de l’organisme et devise, toutes sous-sections confondues. Les autres sources de financement n’entrent jamais dans la base. Les charges de catégorie précèdent celles de tous les autres éléments. Une seule charge active de tous les autres éléments est permise par version/exercice/devise. Les pourcentages vont de 0 à 100 avec au plus deux décimales.

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
4. Saisissez le total, la description, la sous-section et les autres financements; confirmez la devise affichée de l’entente. Laissez l’aperçu et le serveur calculer le financement du programme.
5. Enregistrez et examinez les totaux de l’ensemble du budget actualisé; une source peut modifier d’autres lignes.

L’ajout, la modification, le déplacement ou la suppression d’une ligne recalcule la version budgétaire touchée lors du même enregistrement. Le système annule votre changement et les recalculs si une source de calcul requise est invalide, une deuxième charge de tous les autres éléments est créée, le total d’une ligne est trop faible, un montant calculé est trop grand ou le budget courant dépasse la capacité disponible du volet. Déplacer une ligne vers un autre exercice change le groupe de calcul. La devise doit rester celle de l’entente; le serveur refuse toute différence. Les versions de modification restent isolées de la version courante jusqu’à leur processus d’application.

## Définitions de coûts retirées

Les catégories de l’organisme, leurs lignes et les associations de volet possèdent chacune un indicateur de disponibilité distinct de la suppression. Désactiver un maillon empêche une nouvelle sélection par cette chaîne. Les références et paramètres enregistrés restent lisibles; la modification d’une ligne peut conserver sa sélection inactive initiale. Un remplacement doit être actuellement admissible. La configuration du volet affiche séparément la disponibilité de l’association, de la catégorie et de la ligne de l’organisme : une association active ne prouve pas à elle seule la disponibilité de la source.

## Capacité du financement de programme

Pour l'exercice choisi, le financement de programme maximal est :

`budget total du volet × (1 + seuil de surengagement)`

Par exemple, un budget de volet de 100 000 CAD avec un ratio de surengagement configuré de `0.10` (10 %) permet 110 000 CAD de financement du programme pour ses ententes actives de cet exercice : 100 000 × 1,10 = 110 000. Si les autres ententes utilisent déjà 90 000, il reste seulement 20 000 pour cette entente. Les autres sources de financement n’augmentent pas cette capacité de financement du programme.

La capacité disponible tient compte du financement de programme des lignes actives des budgets courants de **toutes les ententes actives du même volet et du même exercice**. Lors d’une modification, le montant proposé remplace l’ancien dans ce contrôle; les deux montants ne sont pas comptés ensemble. L’enregistrement exige un exercice courant et un budget de volet existants et non supprimés.

**Référence technique pour les développeurs :** La création verrouille la ligne de budget du volet avant le contrôle de capacité et l’insertion. Une modification exclut la ligne modifiée, verrouille le budget du volet cible et vérifie le financement de programme proposé.

Vous ne pouvez pas déplacer une ligne de coûts vers un autre exercice si une ligne de réclamation active y fait référence. La suppression de la ligne est également refusée dans ce cas. Les autres suppressions réussies sont logiques et l'onglet n'offre aucun rétablissement.

## Tableau groupé et recherche

Les lignes sont regroupées par exercice, catégorie de coûts de l'organisation et sous-section en texte libre. Les actions d'ajout dans un groupe de catégorie ou de sous-section préremplissent et verrouillent ces valeurs dans le nouveau formulaire. Chaque ligne de coûts présente le nom bilingue configuré de la ligne de coûts, la description propre à l'entente, le total, le financement du programme et la somme des autres financements.

La recherche porte sur l’aperçu complet déjà chargé dans votre navigateur. Elle porte sur l'affichage de l'exercice, les noms anglais et français de la catégorie et de la ligne, la sous-section et la description. Le tableau affiche initialement 50 lignes par page; la recherche couvre l’aperçu chargé, et pas seulement la page visible.

Les totaux des groupes et du pied additionnent les valeurs affichées dans la devise de l’entente. Les écritures financières courantes ne peuvent introduire une autre devise et aucune conversion n’est effectuée.

## Versions et fiches en aval

La création d'une entente crée automatiquement une version de travail courante du budget. L'onglet Budget ordinaire lit et modifie uniquement cette version. La préparation d’une modification copie les exercices et lignes dans une version distincte. Les éléments copiés gardent leurs identifiants pour que les références existantes visent toujours le même exercice ou coût. Les révisions approuvées consignent la version budgétaire utilisée. Les copies historiques ne comptent pas dans les calculs courants de capacité du volet.

Chaque exercice et ligne de coûts conserve une identité stable lors de sa copie dans une autre version budgétaire. Les prévisions, réclamations, extensions et révisions enregistrées peuvent ainsi continuer à viser le même élément logique. **Référence technique pour les développeurs :** La base de données vérifie que chaque ligne enregistrée appartient à son entente, son exercice et sa version budgétaire, et empêche les identités stables actives en double dans une version.

Avant de réduire ou de supprimer des données budgétaires, consultez [Engagements](./commitments.md), [Prévisions](./forecasts.md), [Réclamations](./claims.md) et [Paiements](./payments.md). Les contraintes en aval peuvent refuser un changement même lorsque son bouton est disponible.

## Reprise

Si l'enregistrement échoue, rechargez l'entente et vérifiez votre permission, la configuration courante du volet, les dates de l'entente, l’exercice choisi, la ligne de coûts et la capacité restante. Ne créez pas de lignes de remplacement pour contourner une erreur d'utilisation. Demandez l’aide d’un administrateur autorisé pour récupérer des données supprimées ou une ligne déplacée vers le mauvais exercice.

## Sources de financement configurées et contrôles annuels

Les autres fonds sont consignés selon les types et sous-types de financement de l’organisme liés au volet, plutôt que trois colonnes fixes fédéral/gouvernement/autre. Choisissez chaque sous-type une seule fois, saisissez son montant et, au besoin, sa description dans les deux langues. Une nouvelle sélection doit être active et disponible au volet; une allocation déjà enregistrée peut conserver un sous-type retiré. Les allocations fournissent le total des autres fonds et la participation de leur type au cumul et au partage des coûts. La devise de l’entente s’applique aux lignes budgétaires et financières en aval.

Avant de réduire le budget courant, vérifiez les opérations financières déjà consignées pour cet exercice. Le système refuse une réduction qui placerait les prévisions, réclamations ou rapprochements réussis comptés au-dessus du budget annuel disponible. Il vérifie séparément les coûts totaux, le financement du programme et chaque type d’autres fonds. Les sous-types d’un même type partagent une limite : deux sous-types municipaux ne disposent pas chacun de tout le budget municipal. Ce contrôle annuel de l’entente est distinct de la capacité de financement du programme à l’échelle du volet et du plafond des engagements.

Par exemple, un budget annuel de 15 000 au total, 10 000 du programme et 5 000 de fonds municipaux ne peut soutenir une prévision contenant 6 000 de fonds municipaux, même si son total est seulement de 14 000. Corrigez la répartition ou obtenez et appliquez une modification budgétaire autorisée; augmenter un autre type n’augmente pas la capacité municipale. Une réduction refusée annule les changements budgétaires et les recalculs associés.

Consultez le [Résumé financier](./financial-summary.md) pour la comparaison annuelle et mensuelle en lecture seule.
