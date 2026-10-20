# Paiements d’entente

Utilisez un paiement pour demander un remboursement ou une avance sur un engagement admissible de l’entente. Saisissez la période et le montant demandé dans l’en-tête, puis répartissez ce montant entre les codes comptables de l’engagement.

## Avant de commencer

Ouvrez une entente, puis sélectionnez **Paiements**. La configuration suivante doit déjà exister :

| Dépendance | Exigence |
| --- | --- |
| Budget de l’entente | L’exercice doit exister dans le budget courant de l’entente. |
| Engagement | Un engagement actif du type choisi doit exister et ne pas être supprimé. Il doit avoir un achèvement enregistré ou une décision d’approbation réussie. |
| Lignes d’engagement | Les lignes de codage doivent appartenir à cet engagement précis et correspondre à l’exercice courant du paiement dans l’entente. |
| Flux de travail facultatif | Achèvement démarre le flux d’approbation sélectionné, s’il est configuré. |
| Modèle d’approbation facultatif | Incluez le modèle publié dans le flux de soumission; un modèle seul ne crée pas de parcours. |

Lecteur Entente permet de consulter l’onglet et la page de détails. Pour créer un paiement, vous devez avoir le niveau Contributeur et être affecté à cette entente précise; vous devenez l’affectataire principal du paiement. Pour modifier son en-tête ou ses lignes, ou l’achever, vous devez avoir le niveau Contributeur et être affecté à ce paiement. Sa suppression exige Gestionnaire et cette même affectation. L’accès à un volet, à un engagement ou à une autre entente ne donne pas accès à ce paiement.

## Parcourir les paiements

L’onglet présente le type de paiement, l’état, le libellé de l’exercice courant, la période d’avril à mars, le commentaire, le montant et le nombre de lignes. La recherche couvre toutes les lignes chargées et porte sur le type et l’état localisés, l’exercice, le commentaire, le montant ou le nombre de lignes. Le tableau pagine 25 résultats filtrés à la fois.

Sélectionnez le type du paiement pour ouvrir sa page de détails. Examinez les détails enregistrés, le résumé des recouvrements, les preuves de calcul et la période d’avril à mars.

## Créer ou modifier un paiement

Préparez la demande dans cet ordre :

1. Confirmez l’engagement actif.
2. Choisissez le bénéficiaire et l’exercice.
3. Saisissez le type de paiement et la période d’avril à mars.
4. Saisissez le montant demandé et enregistrez l’en-tête.
5. Ajoutez les lignes qui répartissent le montant entre les codes comptables de l’engagement.
6. Examinez tout aperçu du calculateur et les contrôles de recouvrement décrits ci-dessous avant d’achever le paiement.

| Champ | Règle |
| --- | --- |
| Type d’engagement | Requis. Le formulaire conserve un type, puis le serveur résout un engagement actif admissible de ce type. |
| Exercice | Requis. Choisissez un exercice du budget courant de l’entente. |
| Type de paiement | Choisissez remboursement ou avance. |
| Début et fin de la période | Choisissez des mois d’avril à mars. La fin ne peut précéder le début. |
| Montant du paiement | Montant positif obligatoire, avec au plus deux décimales. |
| Bénéficiaire | Promoteur actif obligatoire lié à cette entente; les contrôles de recouvrement utilisent ce bénéficiaire. |
| Devise | Devise obligatoire de l’entente, identique à celle de l’engagement choisi. |
| Commentaire | Facultatif. |

Un nouveau paiement reçoit le statut Brouillon de l’organisme. Les modifications d’en-tête et de lignes conservent ce statut; le statut change selon le flux configuré.

Avant de créer un paiement, vérifiez l’engagement actif dans l’onglet **Engagements**. Le sélecteur peut aussi afficher des engagements inactifs qui ont été achevés. À l’enregistrement, le système utilise un engagement actif admissible du type choisi. Choisir une ancienne option peut donc sélectionner l’engagement actif courant de ce type ou faire échouer l’enregistrement.

Il est interdit de changer l’engagement ou l’exercice dès que le paiement possède une ligne active. Réglez les lignes actives et supprimez-les avant de changer l’un ou l’autre champ. Les autres modifications de l’en-tête demeurent assujetties au verrou d’état ci-dessous. Votre accès et l’entente sont vérifiés de nouveau à l’enregistrement.

Les actions de modification et de suppression vérifient votre affectation, vos permissions et l’état courant du dossier. Un bouton visible ne garantit pas que l’action est permise. Après un avertissement, actualisez la page et vérifiez votre affectation ainsi que le verrouillage de l’entente ou du paiement.

## Répartir les lignes de paiement

La page de détails présente le numéro de ligne d’engagement, l’exercice, les codes comptables dans l’ordre et la langue configurés et le montant réparti. La recherche porte sur les valeurs de codage affichées. Le total sous le tableau compare toutes les allocations actives au montant de l’en-tête.

| Règle | Comportement |
| --- | --- |
| Montant positif | Chaque ligne doit être supérieure à zéro, avec au plus deux décimales. |
| Parent exact | Le paiement doit appartenir à cette entente et la ligne de codage à son engagement sélectionné. |
| Concordance de l’exercice | La ligne d’engagement et le paiement doivent utiliser le même exercice dans le budget courant de l’entente. |
| Une ligne de codage par paiement | Une seule ligne active peut viser une ligne d’engagement donnée dans le même paiement. |
| Solde restant | Pour tous les paiements actifs qui ne sont pas refusés, la somme affectée à une ligne d’engagement, plus le montant proposé, ne peut dépasser le montant de cette ligne. Une modification remplace l’ancien montant plutôt que de s’y ajouter. |

Un paiement utilise le solde sauf si sa dernière décision d’approbation enregistrée est un refus. Les brouillons et les paiements sans décision d’approbation comptent aussi. Changer le libellé de statut métier à « Refusé » ne libère pas le solde.

Par exemple, une ligne d’engagement de 6 000 CAD avec 2 000 CAD déjà affectés à un paiement non refusé laisse 4 000 CAD avant les autres effets comptables. Une nouvelle allocation de 4 500 CAD dépasse le solde de 500 CAD et échoue. Une allocation brouillon utilise aussi le solde : cherchez les autres brouillons avant de considérer les seuls décaissements affichés.

Le serveur empêche deux enregistrements simultanés d’utiliser le même solde disponible. Le formulaire de détails conserve une ligne sur le paiement affiché. Si une intégration déplace une ligne, le paiement de destination doit encore être modifiable et appartenir à la même entente; son engagement, son exercice, l’unicité du codage et son solde sont revérifiés.

Supprimer une ligne la retire des listes normales et du calcul des soldes, tout en conservant son historique dans la base. Supprimer un paiement retire ensemble son en-tête et ses lignes actives. Un paiement verrouillé ne peut être ni modifié ni supprimé.

## Achèvement, approbation et flux de travail

Utilisez Achèvement sur la page de détails après avoir enregistré toutes les allocations comptables. Vous devez avoir le niveau Contributeur et être affecté à ce paiement. Il ne doit pas être déjà achevé et doit avoir au moins une ligne active. Le total des lignes doit être positif et égaler exactement le montant demandé. Le serveur revérifie ces conditions, votre accès et les lignes courantes avant l’enregistrement.

Achèvement enregistre l’utilisateur et son commentaire, puis démarre le flux de soumission d’approbation sélectionné s’il est configuré. Sinon, il consigne l’achèvement sans démarrer de flux d’approbation. Suivez les examens, recommandations et approbations publiés dans la section partagée Flux de travail. Un modèle d’approbation seul ne démarre pas de parcours. Vous ne pouvez pas achever pendant qu’un flux est actif, et l’achèvement verrouille l’édition ordinaire.

Par exemple, un paiement de 1 250,00 réparti en 1 000,00 et 250,00 respecte le total requis. Un total de 1 249,99 ne le respecte pas. Corrigez les montants avant d’achever. Une approbation ultérieure ne dispense pas du contrôle financier.

Achever ou approuver ne prouve pas qu’un système financier externe a versé les fonds. L’application n’envoie pas elle-même l’argent à une banque. L’organisme configure les libellés de statut. Vérifiez le flux et les preuves du système financier connecté pour confirmer le décaissement.

## Cycle de vie et reprise

Vous ne pouvez pas modifier l’en-tête ou les lignes après Achèvement, pendant le travail protégé d’un flux, ou lorsque le statut de l’organisme rend le dossier en lecture seule ou final. Le serveur vérifie les restrictions courantes à chaque enregistrement, même si un ancien formulaire ouvert affiche encore Enregistrer.

Si les totaux diffèrent, comparez le montant demandé à toutes les lignes actives, y compris celles masquées par une recherche. Si le solde disponible est insuffisant, examinez les autres paiements utilisant la même ligne d’engagement et leurs preuves d’approbation courantes. Le libellé d’état affiché ne détermine pas à lui seul les montants pris en compte. Corrigez les allocations tant que le dossier est modifiable, puis réessayez.

Pendant une requête, sa commande d’enregistrement ou de suppression est désactivée. Fermer le formulaire n’annule pas un enregistrement déjà envoyé. Si vous le fermez pendant une requête, ou si la page ne s’actualise pas ensuite, rechargez la liste et vérifiez le dossier existant avant de réessayer.

Après un échec d’approbation, suivez les actions de reprise du flux; Achèvement ne se répète ni ne s’annule.

Si une extension refuse un changement, conservez les détails de l’erreur et suivez ses instructions de reprise.

## Extensions

Une extension peut ajouter ou remplacer l’action de création et fournir un calculateur de montant. Des actions concurrentes ou plusieurs calculateurs bloquent la création et affichent un avertissement. Si le chargement du calculateur échoue, sélectionnez **Réessayer**. Attendez la fin du chargement avant d’enregistrer. Demandez à votre administrateur de résoudre tout conflit signalé.

Consultez [Engagements](./commitments.md), [Budget de l’entente](./budget.md), [Approbations et achèvements](../concepts/approvals-completions.md) et [Flux de travail](../concepts/workflows.md).

## Aperçu, recouvrement et preuves conservées

Choisissez le bénéficiaire, le type d’engagement, l’exercice et la période avant d’examiner les **Données financières** et les soldes des lignes d’engagement. Les données financières utilisent la devise de l’entente, le budget courant, les montants mensuels des versions actives de prévision, les rapprochements finaux admissibles et les effets comptables. Les réclamations postérieures à la période choisie sont exclues. Le dernier exercice budgétaire compte encore dans le calcul des retenues, même s’il ne comporte aucune ligne. L’extension de calcul activée détermine le droit au paiement, la retenue à réserver ou à libérer et le montant du paiement. Examinez sa ventilation et les détails de calcul conservés.

Les données de paiements à ce jour comprennent les décaissements et les montants effectifs des pièces de journal et des corrections, avec leur signe positif ou négatif. Les crédits sont séparés. Les données distinguent les crédits comptabilisés des crédits attribués aux périodes sources dont le rapprochement final a réussi. Un crédit reçu plus tard peut encore appartenir à l’exercice source conservé. Ne soustrayez pas deux fois un recouvrement et ne déduisez pas de totaux convertis depuis une autre devise.

L’aperçu vérifie les contrôles de recouvrement du bénéficiaire dans l’organisme. Une suspension de remboursement direct s’applique entre ententes et devises de cet organisme; les contrôles des recouvrements ou ajustements en attente utilisent la devise du paiement. Un remboursement direct en suspens peut retourner `AR_DIRECT_REPAYMENT_HOLD`; un recouvrement ou ajustement en attente retourne `AR_RECOVERY_UNRESOLVED` ou `AR_ADJUSTMENT_UNRESOLVED`. Résolvez ce travail dans les [Créances](./receivables.md). Changer de période ne lève pas la suspension.

Si la compensation est permise, l’assistant affiche le montant brut, la compensation et le net payable. Par exemple, 1 250 bruts avec 300 de compensation admissible donne 950 nets. Confirmez la date d’effet et le codage requis des notes de crédit pour chaque compensation. L’enregistrement vérifie le plan examiné et la date d’effet selon le solde courant. `AR_OFFSET_CODING_REQUIRED` exige de terminer le codage. `AR_OFFSET_PLAN_CHANGED`, `AR_OFFSET_PLAN_STALE` ou `AR_OFFSET_BASIS_CHANGED` exigent un nouvel aperçu et examen, avant d’enregistrer de nouveau. Ne remplacez pas manuellement le montant brut demandé par sa valeur nette.

Une compensation réserve le montant du recouvrement à l’enregistrement du paiement et prend effet lorsque le traitement du paiement réussit. Si une tentative est refusée ou annulée, utilisez ses actions de reprise avant d’appliquer ce solde ailleurs. Après l’enregistrement et avant Achèvement, vérifiez les références des notes de crédit, le montant brut, la compensation et le net payable.

Utilisez **Preuves** pour voir l’information utilisée lors de l’enregistrement : vos sélections, le libellé de l’exercice, l’heure de capture, les données financières exactes et les soldes du codage d’engagement dans les deux langues. Enregistrer une modification recalcule ces données en excluant le paiement courant de ses propres totaux, pour éviter de le compter deux fois. La preuve conservée décrit ce calcul; ce n’est pas le solde disponible aujourd’hui. Les anciens dossiers peuvent n’avoir aucune preuve. Rechargez ou réessayez un volet de preuve d’extension en échec; une preuve absente ne signifie pas zéro.

## Capacité comptable

Les soldes restants comprennent les changements de codage de journal réussis, les corrections comptabilisées et les recouvrements effectifs. Les allocations payées directes restent rattachées à leurs lignes exactes d’engagement. Les dossiers utilisant les mêmes codes comptables de l’organisme partagent les soldes disponibles. Un recouvrement ne libère pas le même montant sur chaque ligne de codage en double. Remplacer un engagement ne remet pas non plus à zéro les montants déjà utilisés pour ce type. En cas de solde insuffisant, examinez la ligne choisie et les autres dossiers utilisant son codage.

## Suspensions après un changement de budget ou d’engagement

Avant l’achèvement, le démarrage d’un flux, une approbation positive ou un traitement réussi, le serveur vérifie de nouveau la prévision active et les engagements courants. Un paiement enregistré ou une étape déjà approuvée ne contourne pas une réduction ultérieure du financement.

| Suspension | Comment la résoudre |
| --- | --- |
| Révision de prévision requise | Le montant du programme de la prévision active dépasse le financement annuel courant de l’exercice du paiement. Créez un remplacement dans **Prévisions**, terminez son approbation et confirmez son activation, ou rétablissez un financement autorisé suffisant. Un remplacement en brouillon ne lève pas la suspension. |
| Révision d’engagement requise | L’engagement choisi est inactif, ou l’ensemble des engagements actifs dépasse le financement courant du programme, tous exercices de l’entente confondus dans cette devise. Activez des remplacements valides sans réduire un code comptable sous le montant déjà payé avec ce code. Choisissez ensuite l’engagement courant sur un paiement modifiable. Vous pouvez aussi rétablir un financement autorisé suffisant. |

Le contrôle additionne tous les types actifs et utilise le plus élevé du total déclaré et du total des lignes actives de chacun. Par exemple, des engagements actifs de 6 000 et 4 000 dépassent un budget réduit à 9 000, même si chacun est inférieur à 9 000. L’égalité est permise. Un paiement d’un autre exercice peut encore être suspendu par ce total d’engagement pour toute l’entente; la suspension de prévision vise l’exercice du paiement.

Après correction, actualisez et réessayez l’action du paiement existant. Si le paiement est verrouillé, suivez les actions de reprise offertes par le flux au lieu de modifier son historique. Les dettes à recouvrer et les limites de codage restent des contrôles supplémentaires. Consultez [Prévisions](./forecasts.md) et [Engagements](./commitments.md).
