# Paiements d’entente

Les paiements consignent les demandes de remboursement ou d’avance associées à un engagement admissible de l’entente. L’en-tête définit la période et le montant demandé; ses lignes répartissent ce montant selon le codage financier de l’engagement.

## Avant de commencer

Ouvrez une entente, puis sélectionnez **Paiements**. La configuration suivante doit déjà exister :

| Dépendance | Exigence vérifiée |
| --- | --- |
| Budget de l’entente | Le paiement utilise l’identité stable d’un exercice de la version courante du budget de l’entente. |
| Engagement | Un engagement actif du type choisi doit exister et ne pas être supprimé. Il doit avoir un achèvement enregistré ou une décision d’approbation réussie. |
| Lignes d’engagement | Les lignes de codage doivent appartenir à cet engagement précis et correspondre à l’exercice courant du paiement dans l’entente. |
| Flux de travail facultatif | Achèvement démarre la soumission d’approbation sélectionnée pour `fundingcasepayment`, si configurée. |
| Modèle d’approbation facultatif | Incluez le modèle publié dans le flux de soumission; un modèle seul ne crée pas de parcours. |

Lecteur Entente permet de consulter l’onglet et la page de détails. Pour créer un paiement, vous devez avoir le niveau Contributeur et être affecté à cette entente précise; vous devenez l’affectataire principal du paiement. Pour modifier son en-tête ou ses lignes, ou l’achever, vous devez avoir le niveau Contributeur et être affecté à ce paiement. Sa suppression exige Gestionnaire et cette même affectation. L’accès à un volet, à un engagement ou à une autre entente ne donne pas accès à ce paiement. Les dossiers absents ou inaccessibles ne révèlent aucune information d’une autre portée.

## Parcourir les paiements

L’onglet présente le type de paiement, l’état, le libellé de l’exercice courant, la période d’avril à mars, le commentaire, le montant et le nombre de lignes. La recherche s’effectue côté client dans toutes les lignes chargées et porte sur le type et l’état localisés, l’exercice, le commentaire, le montant ou le nombre de lignes. Le tableau pagine 25 résultats filtrés à la fois.

Sélectionnez le type du paiement pour ouvrir sa page de détails. Examinez son dossier, le résumé des recouvrements et les preuves de calcul conservées, y compris la période localisée d’avril à mars.

## Créer ou modifier un paiement

Préparez la demande dans cet ordre : confirmez l’engagement actif, choisissez le bénéficiaire et l’exercice, saisissez le type de paiement et la période d’avril à mars, puis le montant demandé. Enregistrez l’en-tête avant d’ajouter ses lignes de codage. Examinez tout aperçu du calculateur et les contrôles de recouvrement décrits ci-dessous avant d’achever le paiement.

| Champ | Règle |
| --- | --- |
| Type d’engagement | Requis. Le formulaire conserve un type, puis le serveur résout un engagement actif admissible de ce type. |
| Exercice | Requis. Il s’agit de l’identité stable d’une ligne active de la version courante du budget de l’entente, et non de l’identifiant propre à la version. |
| Type de paiement | Requis : `reimbursement` ou `advance`. |
| Début et fin de la période | Choisissez des mois d’avril à mars. La fin ne peut précéder le début. Les indices techniques sont des entiers de `0` (avril) à `11` (mars). |
| Montant du paiement | Valeur monétaire finie, positive et obligatoire, dans la limite commune des requêtes; conservée comme `numeric(19,2)`. |
| Bénéficiaire | Promoteur actif obligatoire lié à cette entente; les contrôles de recouvrement utilisent ce bénéficiaire. |
| Devise | Devise obligatoire de l’entente, identique à celle de l’engagement choisi. |
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
| Parent exact | Le paiement doit appartenir à cette entente et la ligne de codage à son engagement sélectionné. La base vérifie aussi ces liens; voir Contrat de développement. |
| Concordance de l’exercice | Le budget du volet de la ligne d’engagement doit correspondre à l’exercice stable courant du paiement dans l’entente. |
| Une ligne de codage par paiement | Une seule ligne active peut viser une ligne d’engagement donnée dans le même paiement. |
| Solde restant | Pour tous les paiements actifs qui ne sont pas refusés, la somme affectée à une ligne d’engagement, plus le montant proposé, ne peut dépasser le montant de cette ligne. Une modification exclut la ligne en cours. |

Un paiement utilise le solde sauf si sa dernière décision d’approbation enregistrée est un refus. Les brouillons et les paiements sans décision d’approbation comptent aussi. Changer le libellé de statut métier à « Refusé » ne libère pas le solde.

::: info Note technique
Le contrôle exact vérifie si la dernière exécution d’approbation du paiement pour cette cible précise est `denied`.
:::

Par exemple, une ligne d’engagement de 6 000 CAD avec 2 000 CAD déjà affectés à un paiement non refusé laisse 4 000 CAD avant les autres effets comptables. Une nouvelle allocation de 4 500 CAD dépasse le solde de 500 CAD et échoue. Une allocation brouillon utilise aussi le solde : cherchez les autres brouillons avant de considérer les seuls décaissements affichés.

Le serveur empêche deux enregistrements simultanés d’utiliser le même solde disponible. Le formulaire de détails conserve une ligne sur le paiement affiché. Si une intégration déplace une ligne, le paiement de destination doit encore être modifiable et appartenir à la même entente; son engagement, son exercice, l’unicité du codage et son solde sont revérifiés.

Supprimer une ligne la retire des listes normales et du calcul des soldes, tout en conservant son historique dans la base. Supprimer un paiement retire ensemble son en-tête et ses lignes actives. Un paiement verrouillé ne peut être ni modifié ni supprimé.

## Achèvement, approbation et flux de travail

Utilisez Achèvement sur la page de détails après avoir enregistré toutes les allocations comptables. Vous devez avoir le niveau Contributeur et être affecté à ce paiement. Il ne doit pas être déjà achevé et doit avoir au moins une ligne active. Le total des lignes doit être positif et égaler exactement le montant demandé. Le serveur revérifie ces conditions, votre accès et les lignes courantes avant l’enregistrement.

Achèvement enregistre l’utilisateur et son commentaire, puis démarre le flux de soumission d’approbation sélectionné s’il est configuré. Sinon, il consigne `no_workflow`. Suivez les examens, recommandations et approbations publiés dans la section partagée Flux de travail. Un modèle d’approbation seul ne démarre pas de parcours. Vous ne pouvez pas achever pendant qu’un flux est actif, et l’achèvement verrouille l’édition ordinaire.

Par exemple, un paiement de `"1250.00"` réparti en `"1000.00"` et `"250.00"` peut satisfaire l’égalité. Un total de `"1249.99"` ne le peut pas. Corrigez avant d’achever; une approbation ultérieure ne dispense pas du contrôle financier.

Achever ou approuver ne prouve pas qu’un système financier externe a versé les fonds. L’hôte ne met pas en œuvre de chaîne automatique de traitement bancaire. Les libellés métier sont configurés par l’organisme; interprétez-les avec le flux et les preuves de l’intégration propriétaire.

## Cycle de vie et reprise

Vous ne pouvez pas modifier l’en-tête ou les lignes après Achèvement, pendant le travail protégé d’un flux, ou lorsque le statut de l’organisme rend le dossier en lecture seule ou final. Le serveur vérifie les restrictions courantes à chaque enregistrement, même si un ancien formulaire ouvert affiche encore Enregistrer.

Si les totaux diffèrent, comparez le montant demandé à toutes les lignes actives, y compris celles masquées par une recherche. Si le solde disponible est insuffisant, examinez les autres paiements utilisant la même ligne d’engagement et leurs preuves d’approbation courantes. Le libellé d’état affiché ne détermine pas à lui seul les montants pris en compte. Corrigez les allocations tant que le dossier est modifiable, puis réessayez. Si l’enregistrement a réussi mais que la page ne s’est pas actualisée, rechargez le dossier avant un autre changement. Après un échec d’approbation, suivez les actions de reprise du flux; Achèvement ne se répète ni ne s’annule.

Si une extension refuse une mutation, conservez sa provenance et suivez sa procédure sans contourner les routes de l’hôte.

## Effets des extensions

La surface de création accepte des actions ajoutées ou de remplacement et un seul calculateur de montant. Des actions de remplacement concurrentes ou plusieurs calculateurs désactivent la création principale et affichent un avertissement de conflit.

## Contrat de développement

Le contrôle du solde verrouille la ligne d’engagement pour sérialiser les écritures concurrentes du noyau. Les paiements parents sont verrouillés dans l’ordre déterministe de leurs identifiants avant une ligne enfant déplacée; un changement de portée détecté est réessayé jusqu’à trois fois. L’API PATCH des lignes permet les déplacements entre paiements modifiables de la même entente. La suppression verrouille les lignes actives et supprime logiquement l’en-tête et les lignes dans une transaction. Achèvement consigne atomiquement commentaire/utilisateur et démarre le flux de soumission `fundingcasepayment` sélectionné ou consigne `no_workflow`; son crochet est émis après validation. Les preuves sont capturées dans la transaction autorisée d’enregistrement.

Les gestionnaires limités à l’entente fournissent les paiements, lignes de codage, recherches admissibles, données financières et aperçus de création/modification. Les corps utilisent les schémas partagés localisés et les montants exacts; les identifiants bigint publics sont des chaînes décimales.

L’appartenance de l’en-tête est dérivée de son engagement par un déclencheur de base de données. L’engagement d’une ligne est dérivé de son paiement; des clés étrangères composites prouvent l’appartenance du paiement à l’engagement et de la ligne à cet engagement. La base principale impose les montants positifs `numeric(19,2)` et l’unicité active du codage dans un paiement; le solde restant entre paiements et l’égalité du total à l’achèvement sont des règles transactionnelles de l’application, et non des contraintes agrégées de la base.

Consultez [Engagements](./commitments.md), [Budget de l’entente](./budget.md), [Approbations et achèvements](../concepts/approvals-completions.md) et [Flux de travail](../concepts/workflows.md).

## Aperçu, recouvrement et preuves conservées

Choisissez le bénéficiaire, le type d’engagement, l’exercice et la période avant d’examiner les **Données financières** et les soldes des lignes d’engagement. Les données de l’hôte utilisent la devise de l’entente, le budget courant, la dernière version des prévisions actives, les rapprochements finaux admissibles et les effets comptables. Les réclamations postérieures à la période choisie sont exclues. Un dernier exercice budgétaire vide appartient encore à l’horizon de retenue. Le droit au paiement, la réserve/libération de retenue et le montant calculé appartiennent à l’extension de calcul activée; examinez son détail et sa provenance conservée.

Les données de paiements à ce jour comprennent les décaissements et les effets signés effectifs des pièces de journal/corrections, séparément des crédits. Les crédits comptabilisés et ceux attribuables aux périodes sources entièrement rapprochées de façon finale sont des données distinctes. Un crédit reçu plus tard peut encore appartenir à l’exercice source conservé. Ne soustrayez pas deux fois un recouvrement et ne déduisez pas de totaux convertis depuis une autre devise.

L’aperçu vérifie les contrôles de recouvrement du bénéficiaire dans l’organisme. Une suspension de remboursement direct s’applique entre ententes et devises de cet organisme; les contrôles de recouvrement/ajustement en attente utilisent la devise du paiement. Un remboursement direct en suspens peut retourner `AR_DIRECT_REPAYMENT_HOLD`; un recouvrement ou ajustement en attente retourne `AR_RECOVERY_UNRESOLVED` ou `AR_ADJUSTMENT_UNRESOLVED`. Résolvez ce travail dans les [Créances](./receivables.md). Changer de période ne lève pas la suspension.

Si la compensation est permise, l’assistant affiche le montant brut, la compensation et le net payable. Par exemple, 1 250 bruts avec 300 de compensation admissible donne 950 nets. Confirmez la date d’effet et le codage requis des notes de crédit pour chaque compensation. L’aperçu fournit les jetons de plan/date que l’application utilise pour identifier le calcul examiné. L’enregistrement les revérifie selon le solde courant verrouillé. `AR_OFFSET_CODING_REQUIRED` exige de terminer le codage. `AR_OFFSET_PLAN_CHANGED`, `AR_OFFSET_PLAN_STALE` ou `AR_OFFSET_BASIS_CHANGED` exigent un nouvel aperçu et examen, pas la réutilisation d’anciens jetons. Ne remplacez pas manuellement le montant brut demandé par sa valeur nette.

Les applications de compensation réservent le recouvrement avec le paiement et deviennent effectives par son cycle de vie réussi. Une tentative refusée/annulée doit être résolue par le cycle pris en charge avant qu’un autre recouvrement utilise le solde. Examinez les références des notes de crédit et les montants brut/compensation/net après l’enregistrement et avant Achèvement.

Utilisez **Preuves** pour voir l’information utilisée lors de l’enregistrement : vos sélections, le libellé de l’exercice, l’heure de capture, les données financières exactes et les soldes du codage d’engagement dans les deux langues. Enregistrer une modification recalcule ces données en excluant le paiement courant de ses propres totaux, pour éviter de le compter deux fois. La preuve conservée décrit ce calcul; ce n’est pas le solde disponible aujourd’hui. Les anciens dossiers peuvent n’avoir aucune preuve. Rechargez ou réessayez un volet de preuve d’extension en échec; une preuve absente ne signifie pas zéro.

## Capacité comptable

Les soldes restants comprennent les changements de codage de journal réussis, les corrections comptabilisées et les recouvrements effectifs. Les allocations payées directes restent rattachées à leurs lignes exactes d’engagement. Les effets entrants partagent l’enveloppe de codage de l’organisme plutôt que rendre le même argent disponible sur chaque ligne de codage en double. L’enveloppe par type d’engagement empêche aussi de réutiliser l’argent en remplaçant simplement un engagement actif du même type. Examinez les capacités individuelles et partagées lors d’un solde insuffisant.
