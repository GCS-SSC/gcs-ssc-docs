# Paiements d’entente

Les paiements consignent les demandes de remboursement ou d’avance associées à un engagement admissible de l’entente. L’en-tête définit la période et le montant demandé; ses lignes répartissent ce montant selon le codage financier de l’engagement.

## Avant de commencer

Ouvrez une entente, puis sélectionnez **Paiements**. La configuration suivante doit déjà exister :

| Dépendance | Exigence vérifiée |
| --- | --- |
| Budget de l’entente | Le paiement utilise l’identité stable d’un exercice de la version courante du budget de l’entente. |
| Engagement | Engagement actif non supprimé du type sélectionné, avec preuve d’achèvement ou exécution d’approbation approuvée. |
| Lignes d’engagement | Les lignes de codage doivent appartenir à cet engagement précis et correspondre à l’exercice courant du paiement dans l’entente. |
| Flux de travail facultatif | Achèvement démarre la soumission d’approbation sélectionnée pour `fundingcasepayment`, si configurée. |
| Modèle d’approbation facultatif | Incluez le modèle publié dans le flux de soumission; un modèle seul ne crée pas de parcours. |

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

Un nouveau paiement reçoit le statut Brouillon de l’organisme. Les modifications d’en-tête et de lignes conservent ce statut; seul le moteur configuré applique les transitions.

Le sélecteur peut inclure des engagements inactifs avec preuve d’achèvement. L’enregistrement exige un engagement actif admissible et le résout par type. Une option historique peut donc échouer ou résoudre l’engagement actif courant du même type. Vérifiez celui-ci dans son onglet avant de créer le paiement.

Il est interdit de changer l’engagement ou l’exercice dès que le paiement possède une ligne active. Supprimez ou rapprochez d’abord les lignes. Les autres modifications de l’en-tête demeurent assujetties au verrou d’état ci-dessous. Le serveur revérifie l’autorisation et la portée de l’entente dans la transaction d’écriture avant toute mutation.

L’onglet affiche les commandes de modification et de suppression selon les permissions générales de l’utilisateur, même si la ligne est verrouillée. Si le serveur refuse une action, actualisez la page et fiez-vous à l’état retourné plutôt que de réessayer depuis une fenêtre périmée.

## Répartir les lignes de paiement

La page de détail présente le numéro de ligne d’engagement, l’exercice, les dimensions comptables ordonnées et localisées et le montant réparti. La recherche porte sur les valeurs de codage affichées. Le total sous le tableau compare toutes les allocations actives au montant de l’en-tête.

| Règle | Comportement |
| --- | --- |
| Montant positif | Chaque ligne doit être supérieure à zéro et est conservée avec deux décimales. La validation de la requête et la base de données imposent toutes deux cette positivité. |
| Parent exact | Le paiement doit appartenir à cette entente et la ligne doit appartenir à l’engagement sélectionné par le paiement. Des clés étrangères composites préservent cette relation. |
| Concordance de l’exercice | Le budget du volet de la ligne d’engagement doit correspondre à l’exercice stable courant du paiement dans l’entente. |
| Une ligne de codage par paiement | Une seule ligne active peut viser une ligne d’engagement donnée dans le même paiement. |
| Solde restant | Pour tous les paiements actifs qui ne sont pas refusés, la somme affectée à une ligne d’engagement, plus le montant proposé, ne peut dépasser le montant de cette ligne. Une modification exclut la ligne en cours. |

Ici, « non refusé » signifie que la dernière exécution d’approbation de cette cible exacte n’est pas `denied`. Un brouillon ou un paiement sans preuve d’approbation consomme encore le solde. Un nom de statut métier configurable comme « Refusé » ne libère pas lui-même le montant.

La vérification du solde verrouille la ligne d’engagement et sérialise ainsi les écritures concurrentes du noyau sur le même solde. Les paiements parents sont verrouillés selon l’ordre déterministe de leurs identifiants avant la ligne enfant déplacée; un changement de portée détecté est réessayé jusqu’à trois fois. L’API PATCH d’une ligne peut la déplacer vers un autre paiement modifiable de la même entente, même si la fenêtre de détails montée conserve le paiement courant. L’engagement de destination, l’exercice, l’unicité et le solde sont tous revérifiés.

La suppression d’une ligne est logique. La suppression d’un paiement verrouille ses lignes actives, puis supprime logiquement les lignes et l’en-tête dans la même transaction. Les enregistrements supprimés ne sont plus affichés et ne comptent plus dans les soldes; l’historique demeure dans la base. Les modifications et suppressions sont refusées dès que le paiement est verrouillé.

## Achèvement, approbation et flux de travail

La page présente Achèvement et la section Flux partagée. Achevez seulement après avoir enregistré toutes les allocations. Le serveur verrouille le paiement et les lignes, actualise le niveau Contributeur et l’affectation exacte, et exige aucun achèvement antérieur, au moins une ligne active, un total positif et l’égalité exacte entre ce total et le montant de l’en-tête.

Achèvement consigne atomiquement commentaire/utilisateur et démarre la soumission `fundingcasepayment` sélectionnée, ou consigne `no_workflow`. Le crochet est émis après validation. Le flux peut contenir examens, recommandations et approbations publiés; ses commandes apparaissent dans la section partagée. Un modèle seul ne crée pas cette séquence. Un flux actif bloque Achèvement et sa preuve verrouille l’édition ordinaire.

Par exemple, un paiement de `"1250.00"` réparti en `"1000.00"` et `"250.00"` peut satisfaire l’égalité. Un total de `"1249.99"` ne le peut pas. Corrigez avant d’achever; une approbation ultérieure ne dispense pas du contrôle financier.

Achever ou approuver ne prouve pas qu’un système financier externe a versé les fonds. L’hôte ne met pas en œuvre de chaîne automatique de traitement bancaire. Les libellés métier sont configurés par l’organisme; interprétez-les avec le flux et les preuves de l’intégration propriétaire.

## Cycle de vie et reprise

Le statut en lecture seule ou terminal, la preuve d’achèvement et le travail protégé verrouillent l’en-tête et les lignes. Le serveur revérifie ces limites dans la transaction, même si un formulaire déjà ouvert propose encore Enregistrer.

En cas d’écart, comparez l’en-tête au total complet non filtré. En cas de solde insuffisant, examinez les autres paiements sur la même ligne d’engagement et leurs preuves d’exécution. Un libellé seul ne définit pas la politique de solde. Corrigez les allocations modifiables avant de réessayer. Après une écriture réussie suivie d’une lecture échouée, rechargez avant une nouvelle mutation. Utilisez la reprise du flux après un échec d’approbation; Achèvement ne se répète ni ne s’annule.

Si une extension refuse une mutation, conservez sa provenance et suivez sa procédure sans contourner les routes de l’hôte.

## Effets des extensions

La surface de création accepte des actions ajoutées ou de remplacement et un seul calculateur de montant. Des actions de remplacement concurrentes ou plusieurs calculateurs désactivent la création principale et affichent un avertissement de conflit.

## Contrat de développement

La famille Paiements comporte 11 gestionnaires limités à l’entente : aperçu; création, détails, modification et suppression de l’en-tête; création, modification et suppression des lignes; recherches d’engagements, d’exercices et de lignes d’engagement. Les corps utilisent les schémas Zod localisés partagés et la réponse normalisée d’échec de validation. Les identifiants `bigint` acceptent les formes externes partagées et sont retournés comme chaînes selon le contrat PostgreSQL/Kysely.

L’appartenance de l’en-tête est dérivée de son engagement par un déclencheur de base de données. L’engagement d’une ligne est dérivé de son paiement; des clés étrangères composites prouvent l’appartenance du paiement à l’engagement et de la ligne à cet engagement. La base principale impose les montants positifs `numeric(19,2)` et l’unicité active du codage dans un paiement; le solde restant entre paiements et l’égalité du total à l’achèvement sont des règles transactionnelles de l’application, et non des contraintes agrégées de la base.

Consultez [Engagements](./commitments.md), [Budget de l’entente](./budget.md), [Approbations et achèvements](../concepts/approvals-completions.md) et [Flux de travail](../concepts/workflows.md).
