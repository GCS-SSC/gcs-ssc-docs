# Budget de l'entente

L'onglet **Budget** enregistre les exercices de l'entente et ses lignes de coûts détaillées. Configurez-le avant de saisir des prévisions, réclamations, engagements ou paiements. Les prévisions et réclamations utilisent les exercices et lignes de coûts enregistrés du budget. Les engagements ne peuvent dépasser le financement de programme courant permis, et les paiements utilisent les exercices de l'entente.

## Préalables et accès

Avant de saisir le budget d'une entente, confirmez que votre administrateur d'agence ou de programme a configuré les quatre premiers éléments ci-dessous. Vérifiez ensuite l'entente enregistrée et ses dates. Complétez ces préalables dans cet ordre :

1. les exercices de l'agence;
2. les budgets de programme par exercice;
3. les budgets de volet, y compris le budget total et le seuil de surengagement;
4. les lignes actives des catégories de coûts du volet;
5. l'entente enregistrée et ses dates d'aide autorisée.

Vous devez disposer de l'accès Lecteur de l'entente pour consulter le budget. Pour ajouter ou modifier des exercices ou des lignes, vous devez avoir l'accès Contributeur et une affectation à cette entente précise. Pour les supprimer, vous devez avoir l'accès Gestionnaire et la même affectation. Les choix proposés dans un formulaire d'ajout ou de modification suivent les mêmes exigences d'accès que ce formulaire.

Lors de l'enregistrement, le système revérifie vos permissions et le volet actuels, puis modifie seulement le budget de travail courant. Un échec laisse le budget inchangé.

## Exercices

Choisissez un exercice soutenu par un budget actif du volet courant de l'entente. Le sélecteur de création renvoie uniquement les exercices dont la période chevauche la période d'aide autorisée de l'entente. Un exercice actif ne peut apparaître qu'une fois dans la version budgétaire courante.

Le tableau affiche un groupe d'exercice même lorsqu'il ne contient aucune ligne. Si vous avez la permission, utilisez les actions du groupe pour ajouter une ligne, changer l'exercice ou supprimer un groupe vide. L'enregistrement ou la suppression vérifie tout de même les restrictions ci-dessous.

La suppression retire l'exercice de la liste courante tout en conservant son historique. Elle est refusée si l'exercice est utilisé par des lignes budgétaires, des réclamations, des paiements ou des lignes de réclamation actifs, ou par un historique de prévision, même supprimée. L'onglet principal n'affiche donc l'action de suppression que pour un groupe vide. Il n'offre aucun rétablissement.

L'exercice de remplacement doit aussi chevaucher la période d'aide autorisée. Un groupe contenant des lignes budgétaires actives ou un historique de prévision ne peut pas être réaffecté. Les prévisions supprimées protègent encore leur exercice. Un exercice enregistré inchangé peut être conservé après le retrait de sa référence; cela ne le rend pas disponible pour de nouvelles allocations. Examinez les réclamations et paiements avant toute réaffectation : la protection actuelle vérifie les lignes budgétaires actives et l'historique de prévision, tandis que la suppression possède ses propres contrôles d'utilisation en aval.

## Lignes budgétaires

Pour une ligne manuelle, choisissez l'exercice et la ligne de coûts, précisez le coût dans la sous-section et la description, saisissez le total et les financements, puis enregistrez. Par exemple, des frais de déplacement de 1 500 CAD financés à hauteur de 1 000 CAD par le programme et de 500 CAD par une source municipale configurée ont un total de 1 500, et non de 1 000. Le formulaire plein écran d'une ligne contient :

| Champ | Règle |
| --- | --- |
| Exercice budgétaire | Groupe d'exercice obligatoire de la version courante de cette entente. |
| Ligne de coûts | Ligne active obligatoire d'une catégorie de coûts du volet. Son nom anglais ou français configuré est affiché. |
| Sous-section de coûts | Texte non vide obligatoire d'au plus 255 caractères. |
| Description | Texte non vide obligatoire; cette description propre à l'entente n'est pas bilingue. |
| Promoteur | Promoteur lié obligatoire. Le seul promoteur lié est choisi automatiquement; choisissez-en un si plusieurs sont liés. |
| Montant total | Montant obligatoire non négatif comportant au plus deux décimales. |
| Financement du programme | Saisissez un montant exact non négatif pour une ligne manuelle. Le formulaire calcule celui des lignes en pourcentage. |
| Autres sources de financement | Sous-types configurés et montants exacts, avec descriptions française/anglaise facultatives; chaque sous-type apparaît une seule fois par ligne. |
| Devise | Devise de l'entente. Vous ne pouvez pas la changer ici. |

Le total doit être au moins égal au financement du programme plus les montants des autres sources configurées. Par exemple, 1 000 du programme plus 500 d'une autre source exigent un total d'au moins 1 500. Un total de 1 400 est refusé. Si le recalcul d'un pourcentage laisse le total d'une ligne touchée inférieur à ses financements combinés, le système annule tout le changement. Le montant total et les autres financements restent saisis manuellement, même pour une ligne calculée.

Chaque ligne attribue tout son financement du programme à un seul promoteur lié, même si elle est calculée. Changer ce choix revérifie le plafond du promoteur sur tous les exercices de cette version. Le promoteur ne divise pas le groupe de calcul en pourcentage. Les copies de modification conservent ce choix.

Développez une ligne enregistrée pour voir le programme et chaque autre source séparément. Utilisez l'action d'ajout de la ligne pour ajouter une source, ou les actions de la source pour la modifier ou la supprimer. Ces actions enregistrent immédiatement le changement. Modifier la ligne principale conserve ses autres sources. Retirer une source exige la permission de suppression décrite plus haut et doit encore respecter les limites budgétaires.

## Lignes calculées en pourcentage

Votre organisme configure les lignes de coûts comme manuelles ou calculées en pourcentage, et votre volet détermine celles que vous pouvez choisir. À sa création, une ligne conserve le mode de calcul, la catégorie source, le pourcentage initial et la permission de changer ce pourcentage. Les changements ultérieurs aux valeurs par défaut ne modifient pas les lignes enregistrées. Les copies faites pour une modification conservent ces paramètres.

| Mode | Base du financement du programme | Valeurs modifiables |
| --- | --- | --- |
| Manuel | Aucun calcul; saisie directe du financement. | Financement du programme, total et autres financements. |
| Pourcentage d'une catégorie | Financement du programme des lignes manuelles de la catégorie source. | Total et autres financements; pourcentage seulement si le remplacement était permis à la création de cette ligne. |
| Pourcentage de tous les autres éléments | Financement du programme de toutes les autres lignes du groupe, y compris les charges de catégorie calculées. | Total et autres financements; pourcentage seulement si la définition enregistrée le permet. |

Le système calcule ensemble les lignes qui partagent la même version budgétaire, le même exercice de l'organisme et la même devise, même dans des sous-sections différentes. Les autres sources de financement n'entrent jamais dans la base. Les charges de catégorie précèdent celles de tous les autres éléments. Chaque groupe permet une seule charge active calculée sur tous les autres éléments. Les pourcentages vont de 0 à 100 avec au plus deux décimales.

Le résultat est arrondi au dollar entier le plus proche. Une moitié exacte est arrondie en s'éloignant de zéro. Ainsi, 10 % de 1 005,00 donne 101,00. Le formulaire présente un aperçu du résultat et le système le vérifie à nouveau à l'enregistrement.

### Exemple budgétaire chiffré

Supposons que toutes ces lignes soient en CAD pour le même exercice et la même version :

| Ligne | Configuration | Financement du programme |
| --- | --- | ---: |
| Salaires | Manuel, catégorie source Personnel | 10 000,00 |
| Avantages sociaux | 10 % du Personnel | 1 000,00 |
| Administration | 5 % de tous les autres éléments | 550,00 |
| Total | 10 000 + 1 000 + 550 | 11 550,00 |

La base d'Administration est 11 000. Ajouter 2 000 d'autre financement aux Salaires ne modifie aucune charge. Porter les salaires à 12 000 fait passer les Avantages sociaux à 1 200 et l'Administration à 660. Avant d'enregistrer, assurez-vous que les totaux saisis manuellement des deux charges couvrent leur nouveau financement et leurs propres autres financements. Sinon, tout l'enregistrement échoue, y compris le changement des salaires.

### Créer et modifier une ligne calculée

1. Sélectionnez l'exercice budgétaire et la ligne de coûts configurée.
2. Vérifiez le mode de calcul et la catégorie source. Pour une charge de catégorie, vérifiez que les lignes manuelles utilisées existent pour cet exercice et cette devise.
3. Acceptez le pourcentage initial ou modifiez-le si le formulaire l'autorise.
4. Saisissez le total, la description, la sous-section et les autres financements; confirmez la devise affichée de l'entente. Le formulaire calcule le financement du programme.
5. Enregistrez, puis examinez les totaux actualisés de l'ensemble du budget. Modifier une ligne source peut changer d'autres lignes.

L'ajout, la modification, le déplacement ou la suppression d'une ligne recalcule la version budgétaire touchée lors du même enregistrement. Le système annule votre changement et les recalculs si une source de calcul requise est invalide, une deuxième charge de tous les autres éléments est créée, le total d'une ligne est trop faible, un montant calculé est trop grand ou le budget courant dépasse la capacité disponible du volet. Déplacer une ligne vers un autre exercice change le groupe de calcul. Toutes les lignes utilisent la devise de l'entente. Les changements préparés dans une modification n'affectent pas le budget courant avant son application.

## Définitions de coûts retirées

Une ligne de coûts est offerte pour de nouvelles sélections seulement si la catégorie de l'organisme, la ligne de l'organisme et son association au volet sont toutes disponibles. Vous pouvez toujours consulter les lignes existantes et conserver une sélection retirée lors d'une modification. Pour la remplacer, choisissez une ligne de coûts actuellement disponible. Demandez à votre administrateur de vérifier les trois paramètres si une option attendue est absente.

## Limites financières du volet

Une configuration active de limites financières du volet ajoute trois contrôles. Ils portent sur toutes les lignes et tous les exercices actifs d'une version budgétaire. Les budgets courant et de modification sont vérifiés séparément.

| Limite | Valeur à respecter |
| --- | --- |
| Montant maximal admissible par destinataire | Le financement du programme de chaque promoteur, sur tous les exercices de cette version, doit respecter le montant. Ce plafond n'est pas partagé entre ententes. |
| Pourcentage maximal de soutien | Pour chaque ligne, le programme doit respecter le pourcentage de la somme du programme et des sources incluses dans le partage des coûts. Le coût total non financé ne compte pas comme partage. |
| Limite de cumul | Le programme et les sources incluses dans le cumul, sur toute la version, doivent respecter le pourcentage des coûts totaux. |

Les réglages courants de partage des coûts et de cumul du type de financement déterminent les sources comptées, même pour une source retirée conservée. Les deux réglages sont indépendants. Les comparaisons utilisent les montants exacts, sans arrondir le plafond vers le haut. Un zéro actif est une vraie limite de zéro. Sans configuration active, ces trois contrôles ne s'appliquent pas. Les contrôles de capacité du volet et d'utilisation annuelle restent distincts.

Par exemple, le volet permet 50 000 par promoteur, 50 % de soutien et 75 % de cumul. Une ligne comprend 10 000 de coût total, 4 000 du programme, 4 000 de partage admissible et 2 000 de coût non financé. Elle respecte le soutien : 4 000 ÷ 8 000 = 50 %. Si l'autre source compte aussi dans le cumul, cette ligne seule dépasse le cumul : 8 000 ÷ 10 000 = 80 %. Un coût total de 11 000 ramène le cumul à environ 72,73 %, si ce total représente le coût réel du projet. Un deuxième exercice de 47 000 du programme pour le même promoteur dépasserait le plafond de 50 000, car 4 000 + 47 000 = 51 000.

Le montant maximal utilise la devise de chaque entente. Un réglage de 50 000 signifie 50 000 CAD pour une entente en CAD et 50 000 USD pour une entente en USD. Le système ne convertit pas les devises.

Enregistrer une ligne, changer une source, recalculer les pourcentages ou supprimer des données revérifie toute la version proposée. La soumission d'approbation et l'application d'une modification revérifient les limites courantes. Un échec laisse le changement et ses recalculs non enregistrés. Vérifiez le promoteur, les sources admissibles et les totaux avant de réessayer. Supprimer une ligne peut aussi échouer si cela retire des coûts nécessaires au respect du cumul.

## Capacité du financement de programme

Pour l'exercice choisi, le financement de programme maximal est :

`budget total du volet × (1 + seuil de surengagement)`

Par exemple, un budget de volet de 100 000 CAD avec un ratio de surengagement configuré de `0.10` (10 %) permet 110 000 CAD de financement du programme pour ses ententes actives de cet exercice : 100 000 × 1,10 = 110 000. Si les autres ententes utilisent déjà 90 000, il reste seulement 20 000 pour cette entente. Les autres sources de financement n'augmentent pas cette capacité de financement du programme.

La capacité disponible tient compte du financement de programme des lignes actives des budgets courants de **toutes les ententes actives du même volet et du même exercice**. Lors d'une modification, le montant proposé remplace l'ancien dans ce contrôle; les deux montants ne sont pas comptés ensemble. L'enregistrement exige un exercice courant et un budget de volet existants et non supprimés.

Vous ne pouvez pas déplacer une ligne de coûts vers un autre exercice si une ligne de réclamation active y fait référence. La suppression de la ligne est également refusée dans ce cas. Les lignes supprimées restent dans l'historique. Cet onglet ne permet pas de les rétablir.

## Tableau groupé et recherche

Les lignes sont regroupées par exercice, catégorie de coûts de l'organisation et sous-section en texte libre. Les actions d'ajout dans un groupe de catégorie ou de sous-section préremplissent et verrouillent ces valeurs dans le nouveau formulaire. Chaque ligne de coûts présente le nom bilingue configuré de la ligne de coûts, la description propre à l'entente, le total, le financement du programme et la somme des autres financements.

La recherche porte sur l'aperçu complet déjà chargé dans votre navigateur. Elle porte sur l'affichage de l'exercice, les noms anglais et français de la catégorie et de la ligne, la sous-section et la description. Le tableau affiche initialement 50 lignes par page; la recherche couvre l'aperçu chargé, et pas seulement la page visible.

Les totaux des groupes et du bas du tableau additionnent les montants affichés dans la devise de l'entente. Le tableau ne convertit pas les devises.

## Versions budgétaires et dossiers liés

La création d'une entente crée automatiquement une version de travail courante du budget. L'onglet **Budget** affiche et modifie uniquement cette version. La préparation d'une modification copie les exercices et lignes dans une version distincte. Les dossiers financiers existants restent liés à l'exercice ou au coût correspondant après une copie. Les révisions approuvées consignent la version budgétaire utilisée. Les copies historiques ne comptent pas dans les calculs courants de capacité du volet.

Les réclamations liées à un exercice ou à une ligne d'une ancienne version budgétaire empêchent toujours la suppression de son équivalent courant. Elles empêchent aussi le déplacement de la ligne de coûts correspondante vers un autre exercice.

Avant de réduire ou de supprimer des données budgétaires, consultez [Engagements](./commitments.md), [Prévisions](./forecasts.md), [Réclamations](./claims.md) et [Paiements](./payments.md). Ces dossiers liés peuvent empêcher un changement même lorsque son bouton est disponible.

## Reprise

Si l'enregistrement échoue, rechargez l'entente et vérifiez votre permission, la configuration courante du volet, les dates de l'entente, l'exercice choisi, la ligne de coûts et la capacité restante. Ne créez pas de lignes de remplacement pour contourner une erreur d'utilisation. Demandez l'aide d'un administrateur autorisé pour récupérer des données supprimées ou une ligne déplacée vers le mauvais exercice.

## Sources de financement configurées et contrôles annuels

Les autres fonds sont consignés selon les types et sous-types de financement de l'organisme liés au volet. Choisissez chaque sous-type une seule fois, saisissez son montant et, au besoin, sa description dans les deux langues. Une nouvelle sélection doit être active et disponible au volet; une allocation déjà enregistrée peut conserver un sous-type retiré. Les allocations enregistrées constituent le total des autres fonds. Le type de chaque allocation détermine si elle compte dans les calculs de cumul et de partage des coûts. La devise de l'entente s'applique aux lignes budgétaires et financières en aval.

Avant de réduire le financement courant du programme, vérifiez les réclamations comptées et les rapprochements réussis de cet exercice et de cette devise. Le budget ne peut être inférieur à leur utilisation effective après les crédits de recouvrement de réclamation admissibles. Consultez [Modifications](./amendments.md) pour les règles de crédit d'encaissement et un exemple. Si le changement échoue, le budget et ses montants calculés restent inchangés.

Une prévision ou un engagement actif peut rester au-dessus d'un budget réduit. Les paiements sont alors suspendus jusqu'à l'activation d'un remplacement valide ou au rétablissement d'un financement autorisé suffisant. Le contrôle de prévision vise l'exercice du paiement. Le contrôle d'engagement additionne tous les types d'engagement actifs entre les exercices de l'entente. Le coût total et les autres types de financement gardent leurs règles par ligne, mais n'ont pas de plafonds annuels distincts. Le contrôle de capacité du programme à l'échelle du volet reste distinct.

Consultez le [Résumé financier](./financial-summary.md) pour la comparaison annuelle et mensuelle en lecture seule.
