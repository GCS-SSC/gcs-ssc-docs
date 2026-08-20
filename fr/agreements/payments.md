# Paiements d’entente

Les paiements consignent les demandes de remboursement ou d’avance associées à un engagement admissible de l’entente. L’en-tête définit la période et le montant demandé; ses lignes répartissent ce montant selon le codage financier de l’engagement.

## Avant de commencer

Ouvrez une entente, puis sélectionnez **Paiements**. La configuration suivante doit déjà exister :

| Dépendance | Exigence vérifiée |
| --- | --- |
| Budget de l’entente | Le paiement utilise l’identité stable d’un exercice de la version courante du budget de l’entente. |
| Engagement | La création exige finalement un engagement actif et non supprimé du type sélectionné, à l’état `complete` ou `approved`. |
| Lignes d’engagement | Les lignes de codage doivent appartenir à cet engagement précis et correspondre à l’exercice courant du paiement dans l’entente. |
| Configuration de flux de travail facultative | L’achèvement peut démarrer un flux applicable à `fundingcasepayment`. |
| Modèle d’approbation facultatif | Le serveur possède un moteur d’approbation distinct pour les paiements, mais l’achèvement principal et la page de détails actuelle ne l’appellent pas. Consultez [Achèvement, approbation et flux de travail](#achèvement-approbation-et-flux-de-travail). |

Lecteur Entente consulte l’onglet et le détail. La création d’un paiement exige Contributeur et l’affectation exacte à l’entente, puis rend le créateur principal. Les modifications et l’achèvement suivants exigent Contributeur et l’affectation exacte au paiement; la suppression exige Gestionnaire et cette affectation. Un volet, engagement ou une autre entente n’élargit pas la frontière. Les dossiers absents ou inaccessibles ne divulguent aucune donnée hors portée.

## Parcourir les paiements

L’onglet présente le type de paiement, l’état, le libellé de l’exercice courant, la période d’avril à mars, le commentaire, le montant et le nombre de lignes. La recherche s’effectue côté client dans toutes les lignes chargées et porte sur le type et l’état localisés, l’exercice, le commentaire, le montant ou le nombre de lignes. Le tableau pagine 25 résultats filtrés à la fois.

Sélectionnez le type du paiement pour ouvrir sa page de détails. L’en-tête de cette page affiche le montant, l’état et les indices numériques bruts de la période; servez-vous de la période localisée d’avril à mars dans l’onglet Paiements pour confirmer les dates.

## Créer ou modifier un paiement

| Champ | Règle |
| --- | --- |
| Type d’engagement | Requis. Le formulaire conserve un type, puis le serveur résout un engagement actif admissible de ce type. |
| Exercice | Requis. Il s’agit de l’identité stable d’une ligne active de la version courante du budget de l’entente, et non de l’identifiant propre à la version. |
| Type de paiement | Requis : `reimbursement` ou `advance`. |
| Début et fin de la période | Indices entiers requis de `0` (avril) à `11` (mars); la fin doit être égale ou postérieure au début. |
| Montant du paiement | Valeur monétaire finie, positive et obligatoire, dans la limite commune des requêtes; conservée comme `numeric(19,2)`. |
| Commentaire | Facultatif; une saisie vide est conservée comme `null`. |

Un paiement créé par le noyau commence à l’état `draft`. La modification de son en-tête ou de ses lignes fait passer un brouillon à `inprogress`. Après une modification, la réponse de l’API présente aussi un en-tête encore en brouillon comme `inprogress`.

Le sélecteur d’engagement affiche actuellement tous les engagements `complete`, même inactifs, ainsi que les engagements `approved` actifs. L’enregistrement est plus strict : le serveur résout seulement un engagement actif `complete` ou `approved` selon son type. Une option achevée mais inactive peut donc échouer à l’enregistrement ou résoudre un autre engagement actif du même type. La présence dans le sélecteur ne prouve pas l’admissibilité; vérifiez l’engagement actif dans l’onglet Engagements.

Il est interdit de changer l’engagement ou l’exercice dès que le paiement possède une ligne active. Supprimez ou rapprochez d’abord les lignes. Les autres modifications de l’en-tête demeurent assujetties au verrou d’état ci-dessous. Le serveur revérifie l’autorisation et la portée de l’entente dans la transaction d’écriture avant toute mutation.

L’onglet affiche les commandes de modification et de suppression selon les permissions générales de l’utilisateur, même si la ligne est verrouillée. Si le serveur refuse une action, actualisez la page et fiez-vous à l’état retourné plutôt que de réessayer depuis une fenêtre périmée.

## Répartir les lignes de paiement

La page de détails présente le numéro de ligne d’engagement, l’exercice, le fonds, le grand livre et sa description facultatifs, le centre financier, l’ordre interne, le domaine fonctionnel, le centre de coûts et le montant réparti. La recherche porte sur ces valeurs de codage affichées. Le total sous le tableau compare toutes les lignes actives au montant de l’en-tête.

| Règle | Comportement |
| --- | --- |
| Montant positif | Chaque ligne doit être supérieure à zéro et est conservée avec deux décimales. La validation de la requête et la base de données imposent toutes deux cette positivité. |
| Parent exact | Le paiement doit appartenir à cette entente et la ligne doit appartenir à l’engagement sélectionné par le paiement. Des clés étrangères composites préservent cette relation. |
| Concordance de l’exercice | Le budget du volet de la ligne d’engagement doit correspondre à l’exercice stable courant du paiement dans l’entente. |
| Une ligne de codage par paiement | Une seule ligne active peut viser une ligne d’engagement donnée dans le même paiement. |
| Solde restant | Pour tous les paiements actifs qui ne sont pas refusés, la somme affectée à une ligne d’engagement, plus le montant proposé, ne peut dépasser le montant de cette ligne. Une modification exclut la ligne en cours. |

La vérification du solde verrouille la ligne d’engagement et sérialise ainsi les écritures concurrentes du noyau sur le même solde. Les paiements parents sont verrouillés selon l’ordre déterministe de leurs identifiants avant la ligne enfant déplacée; un changement de portée détecté est réessayé jusqu’à trois fois. L’API PATCH d’une ligne peut la déplacer vers un autre paiement modifiable de la même entente, même si la fenêtre de détails montée conserve le paiement courant. L’engagement de destination, l’exercice, l’unicité et le solde sont tous revérifiés.

La suppression d’une ligne est logique. La suppression d’un paiement verrouille ses lignes actives, puis supprime logiquement les lignes et l’en-tête dans la même transaction. Les enregistrements supprimés ne sont plus affichés et ne comptent plus dans les soldes; l’historique demeure dans la base. Les modifications et suppressions sont refusées dès que le paiement est verrouillé.

## Achèvement, approbation et flux de travail

La page de détails principale contient les sections **Achèvement** et **Flux de travail**; elle ne contient aucune section d’approbation du paiement.

L’achèvement est transactionnel. Il verrouille le paiement et ses lignes actives, revérifie le plafond de rôle Entente Contributeur et l’affectation exacte au paiement, refuse un second achèvement et exige :

- au moins une ligne active et un total de lignes positif;
- une somme numérique PostgreSQL exactement égale au montant de l’en-tête.

En cas de réussite, il consigne le commentaire et l’utilisateur communs d’achèvement, fait passer directement le paiement à `complete`, démarre tout flux `fundingcasepayment` applicable, valide la transaction, puis émet le hook d’achèvement. Il ne consulte aucun modèle d’approbation des paiements et ne crée aucune feuille d’acheminement.

Une API générique d’approbation des paiements existe pour les intégrations autorisées. Un appelant explicite peut matérialiser le modèle `fundingcasepayment` du volet, faire passer le paiement à `pendingapproval`, puis traiter les approbations affectées jusqu’à `approved` ou `denied`. Les approbateurs affectés doivent quand même avoir l’accès ordinaire à l’entente exacte. Cette API n’est pas appelée par le bouton d’achèvement principal et ses commandes ne sont pas montées dans la page du paiement. La simple configuration d’un modèle d’approbation ne place donc pas un paiement de l’interface principale en approbation.

Le schéma définit aussi `pay`, `wait`, `processed` et `paid`. Ces états sont verrouillés lorsqu’ils sont rencontrés, mais aucune route principale ni extension installée ne fait actuellement progresser un paiement vers ces quatre états opérationnels. Ne les présentez pas comme une chaîne de traitement automatisée.

## Cycle de vie et reprise

Les états `draft` et `inprogress` sont modifiables. Les états `complete`, `pendingapproval`, `approved`, `denied`, `pay`, `wait`, `processed` et `paid` verrouillent l’en-tête et les lignes.

Si l’achèvement signale un écart de total, comparez le montant de l’en-tête au total complet et non filtré des lignes, puis corrigez l’en-tête ou les lignes encore modifiables. En cas d’erreur de solde, vérifiez les autres paiements non refusés associés à la même ligne d’engagement. Un paiement refusé ne consomme plus ce solde. Si une extension refuse une mutation, préservez sa provenance générée et suivez sa procédure de reprise au lieu de contourner la route hôte.

## Effets des extensions

La surface de création accepte des actions ajoutées ou de remplacement et un seul calculateur de montant. Des actions de remplacement concurrentes ou plusieurs calculateurs désactivent la création principale et affichent un avertissement de conflit.

### Paiements automatisés

Lorsqu’elle est activée pour le volet, l’extension [Paiements automatisés](../extensions/automated-payments.md) calcule un montant suggéré et un plafond en dollars canadiens à partir des réclamations, des prévisions, des paiements antérieurs non refusés, des lignes d’engagement approuvées restantes et des règles de retenue configurées. Le calculateur apparaît seulement à la création, se recalcule lorsque les champs changent et peut recueillir une libération de retenue. L’interface copie la suggestion dans le montant et bloque les valeurs supérieures au plafond; le serveur recalcule et impose ce plafond dans la transaction de création, puis conserve les métadonnées normalisées de retenue. L’extension ne crée pas de lignes et ne fait pas progresser les états du paiement.

### Répartition des coûts par résultat

Lorsque [Répartition des coûts par résultat](../extensions/outcome-cost-allocation.md) gère l’engagement sélectionné, son hook postérieur à la création calcule des lignes de paiement dérivées de la répartition dans la même transaction et fait passer le nouveau paiement de `draft` à `inprogress`. Les lignes générées doivent correspondre exactement aux coordonnées de l’engagement géré et à la couverture restante. L’extension interdit ensuite la modification ou la suppression de ces lignes et protège les champs sensibles de l’en-tête, tout en permettant les modifications ordinaires non sensibles et les changements d’état valides. Elle peut aussi empêcher la réactivation d’un paiement généré refusé lorsque la couverture courante est insuffisante. Gardez l’extension activée tant qu’une provenance générée existe.

## Contrat de développement

La famille Paiements comporte 11 gestionnaires limités à l’entente : aperçu; création, détails, modification et suppression de l’en-tête; création, modification et suppression des lignes; recherches d’engagements, d’exercices et de lignes d’engagement. Les corps utilisent les schémas Zod localisés partagés et la réponse normalisée d’échec de validation. Les identifiants `bigint` acceptent les formes externes partagées et sont retournés comme chaînes selon le contrat PostgreSQL/Kysely.

L’appartenance de l’en-tête est dérivée de son engagement par un déclencheur de base de données. L’engagement d’une ligne est dérivé de son paiement; des clés étrangères composites prouvent l’appartenance du paiement à l’engagement et de la ligne à cet engagement. La base principale impose les montants positifs `numeric(19,2)` et l’unicité active du codage dans un paiement; le solde restant entre paiements et l’égalité du total à l’achèvement sont des règles transactionnelles de l’application, et non des contraintes agrégées de la base.

Consultez [Engagements](./commitments.md), [Budget de l’entente](./budget.md), [Approbations et achèvements](../concepts/approvals-completions.md) et [Flux de travail](../concepts/workflows.md).
