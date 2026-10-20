# Engagements d'entente

Un engagement réserve un montant pour un type de financement de l'entente et le répartit selon le codage financier. Les demandes de paiement utilisent ces lignes, selon le solde disponible. Ouvrez une entente et sélectionnez **Engagements**. L'onglet affiche le type, l'état, le nombre de lignes et le total déclaré de chaque engagement dans la devise de l'entente. Sélectionnez le type pour ouvrir sa page de détails.

## Avant de commencer

| Exigence | Règle |
| --- | --- |
| Autorisation | Lecteur Entente permet la consultation. Pour créer, vous devez avoir le niveau Contributeur et être affecté à cette entente précise; vous devenez l'affectataire principal. Pour modifier ensuite l'engagement ou ses lignes, vous devez avoir le niveau Contributeur ou Gestionnaire et être affecté à cet engagement précis. |
| Budget courant de l'entente | Le total des lignes actives de chaque engagement est plafonné par le financement de programme total de la version budgétaire courante de l'entente. |
| Plan comptable | Le volet de l'entente doit comporter des entrées de plan comptable liées à ses budgets. Le sélecteur recherche l'exercice affiché et les dimensions comptables conservées, et ne permet pas de choisir la configuration d'un autre volet. |
| Dossier d'utilisateur commun | Votre compte connecté doit avoir un dossier d'utilisateur actif avant de pouvoir achever. |
| Flux de travaux d'achèvement facultatif | Achèvement démarre le flux publié de soumission d'approbation sélectionné s'il est configuré. Sinon, sa réussite active immédiatement l'engagement. |

Avant d'ouvrir un formulaire de modification ou de supprimer un dossier, l'application vérifie votre affectation, vos permissions et l'état de l'entente et de l'engagement. Elle les vérifie de nouveau à l'enregistrement. Après un refus, actualisez la page et confirmez votre affectation ainsi que le verrouillage du dossier. Un échec d'enregistrement laisse l'engagement inchangé.

## Créer et trouver des engagements

Choisissez **Ajouter un engagement**. Sélectionnez un type configuré pour le volet de l'entente et saisissez le total déclaré dans la devise de l'entente, puis enregistrez. Un nouvel engagement reçoit le statut Brouillon de l'organisme et est inactif. Le numéro de système financier n'est pas modifiable ici.

La recherche de l'onglet correspond au libellé localisé du type ou de l'état, au nombre de lignes ou au total affiché. Les résultats sont filtrés et paginés dans le navigateur après le chargement du résumé complet.

Une extension activée peut ajouter une action de création ou remplacer l'action principale. Des actions de remplacement en conflit désactivent la création et affichent un avertissement. Consultez la documentation de l'extension responsable pour connaître tout processus de création ajouté et les preuves conservées.

## Gérer les lignes d'engagement

Utilisez une ligne pour chaque allocation comptable requise. Par exemple, pour un engagement déclaré de 10 000 CAD, saisissez 6 000 CAD sur une entrée du plan comptable et 4 000 CAD sur une autre. Vérifiez que les deux entrées appartiennent au volet de l'entente et à l'exercice voulu. Les lignes totalisent 10 000 CAD; le financement de programme courant doit aussi atteindre au moins 10 000 CAD.

La page de détails affiche le fil d'Ariane de l'entente et l'état, puis les sections des lignes, de l'achèvement et du flux de travaux. Les approbations créées par un flux configuré apparaissent dans la section **Flux de travail**.

| Champ | Règle |
| --- | --- |
| Numéro de ligne d'engagement | Nombre entier obligatoire de 1 à 32 767. Dans un engagement, la combinaison active du numéro de ligne et de l'entrée du plan comptable doit être unique. |
| Entrée du plan comptable | Obligatoire. Elle doit être active et appartenir au volet exact de l'entente. Son exercice et ses dimensions comptables ordonnées et localisées figurent dans le sélecteur et le tableau. |
| Montant | Montant obligatoire de zéro ou plus, avec au plus deux décimales. |

La recherche de la page de détails correspond au numéro de ligne, à l'exercice, à chaque composante de codage affichée ou au montant. Comparez le total déclaré à toutes les lignes de codage non filtrées dans la devise de l'entente; aucune conversion n'est effectuée.

Les changements ordinaires de lignes conservent le statut métier de l'organisme. Le formulaire conserve chaque ligne dans l'engagement affiché. La suppression d'une ligne la masque tout en conservant son historique. La suppression d'un engagement modifiable le retire des listes normales avec toutes ses lignes actives.

## Mesures de protection financière

| Protection | Portée exacte |
| --- | --- |
| Plafond du financement de programme courant | Pour l'engagement visé, les lignes actives existantes plus le montant nouveau ou de remplacement ne peuvent pas dépasser la somme du `financement de programme` de la version budgétaire courante de l'entente. Il s'agit d'un plafond par engagement, et non d'un plafond partagé entre tous les types ou toutes les versions d'engagement. |
| Réductions budgétaires | Une réduction budgétaire peut laisser un engagement actif au-dessus du budget et suspendre les paiements. |
| Plancher du montant payé | Vous ne pouvez pas réduire une ligne sous les montants de paiement qui lui sont affectés. Les paiements non supprimés comptent sauf si leur dernière décision d'approbation est un refus; changer un libellé d'état ne suffit pas. Si une ligne de paiement active vise cette ligne, vous ne pouvez pas non plus changer son engagement ou son entrée comptable, même après un refus d'approbation. |
| Cycle de vie verrouillé | Vous ne pouvez pas modifier normalement un engagement ou ses lignes après Achèvement, pendant le travail protégé d'un flux, ou lorsque le statut de l'organisme le rend en lecture seule ou final. |

Vous pouvez réduire le budget même si un engagement actif dépasse le nouveau financement. Les paiements comparent alors l'ensemble des engagements actifs de tous les types au financement courant du programme, tous exercices confondus dans la même devise. Pour chaque engagement, le contrôle utilise le plus élevé du total déclaré et du total des lignes actives. L'égalité est permise; les engagements historiques inactifs ne fournissent pas de capacité.

Par exemple, des engagements actifs de 6 000 et 4 000 respectent un financement total du programme de 10 000. Réduire ce financement à 9 000 peut réussir, mais les paiements sont suspendus jusqu'à ce que l'ensemble des engagements actifs respecte 9 000. Préparez et activez un remplacement valide, ou rétablissez le financement autorisé, puis vérifiez l'engagement choisi du paiement avant de réessayer. Un paiement encore lié à un engagement inactif doit utiliser l'engagement courant.

Les montants des lignes d'engagement doivent être non négatifs, même en brouillon. Le total déclaré doit aussi être non négatif et égaler exactement toutes les lignes actives à l'achèvement. Un remplacement doit préserver la couverture payée par codage; une réduction budgétaire n'efface pas ce plancher.

## Achever un engagement

Pour achever, vous devez avoir le niveau Contributeur et être affecté à cet engagement précis. Il doit encore être modifiable, comporter au moins une ligne active et n'avoir aucun achèvement antérieur. Les commentaires sont facultatifs. Le serveur revérifie l'engagement, ses lignes, votre dossier d'utilisateur et vos permissions avant l'enregistrement. Un flux actif empêche Achèvement.

Achèvement consigne l'action. Si un flux de soumission d'approbation est configuré pour l'achèvement, Achèvement le démarre. Sinon, il ne démarre pas de parcours d'approbation. L'engagement devient verrouillé pour l'édition ordinaire. Son statut métier suit la configuration de l'organisme plutôt que de toujours passer à un statut nommé "Terminé".

Sans flux d'approbation, l'engagement devient actif dès la réussite de l'achèvement. Avec un flux d'approbation, il devient actif après la réussite de ce flux. Tout engagement auparavant actif du même type dans cette entente devient inactif. Un seul engagement non supprimé de chaque type peut être actif. Un échec ou une annulation d'approbation laisse le remplacement inactif.

Par exemple, conservez l'engagement actif pendant la préparation de son remplacement. Achevez le remplacement et terminez son approbation. Seule la réussite l'active. Vérifiez l'engagement actif avant un paiement; le sélecteur peut aussi afficher des engagements achevés qui ne sont plus actifs.

## Configuration de l'approbation

Les administrateurs peuvent exiger une approbation en publiant un flux de soumission d'approbation pour les engagements avec le modèle, le plan d'examen ou de recommandation approprié. Un modèle d'approbation seul ne démarre pas de parcours. Suivez les approbations configurées dans la section **Flux de travail**.

Un flux standard reste un choix explicite facultatif et ne démarre jamais du seul fait de l'achèvement. Pour une tentative refusée, échouée, suspendue ou annulée, utilisez les actions de reprise et la politique de nouvelle tentative affichée pour cet essai. Consultez [Flux de travail](../concepts/workflows.md) et [Approbations et achèvements](../concepts/approvals-completions.md).

## Rétablissement et suppression

Pendant un enregistrement ou une suppression, sa commande est désactivée. Fermer le formulaire n'annule pas un enregistrement déjà envoyé. Après une fermeture pendant une requête ou une réponse incertaine, rechargez la liste et vérifiez l'engagement existant avant de réessayer.

- Un achèvement ne peut pas être répété ni annulé à partir de la page d'engagement. Créez un nouvel engagement lorsqu'un remplacement est nécessaire.
- Vous ne pouvez pas supprimer les engagements verrouillés ou leurs lignes depuis ces pages. La suppression d'un engagement modifiable retire ses lignes des listes normales tout en conservant leur historique.
- Si une entrée du plan comptable manque dans le sélecteur, vérifiez que l'entrée, le budget du volet, le budget d'exercice du programme et l'exercice de l'organisme sont actifs et appartiennent au volet de l'entente.
- Si l'achèvement signale un état non valide, vérifiez que le dossier demeure modifiable, qu'il comporte au moins une ligne active et qu'il n'a pas déjà été achevé.

## Total déclaré et couverture de remplacement

Le total déclaré est le montant que vous souhaitez engager. Les lignes de codage précisent sa répartition comptable. Un remplacement change l'engagement utilisé pour les paiements futurs; il doit encore couvrir les sommes déjà payées.

Saisissez un total déclaré exact non négatif lors de la création ou modification. Sa devise doit correspondre à l'entente. Les lignes de codage ne peuvent dépasser ce total ni le financement courant du programme dans la même devise. Achèvement exige aussi que leur total actif égale exactement la déclaration. Une déclaration de 10 000 avec 9 999,99 codés ne peut être achevée; enregistrez le cent manquant ou corrigez la déclaration avant soumission.

Un remplacement doit conserver la couverture de l'argent déjà payé sous l'engagement actif du même type et de la même devise. À l'achèvement et à l'activation après approbation, le système vérifie la couverture minimale requise pour chaque code financier. Il tient compte des pièces de journal réussies, des corrections comptabilisées et des recouvrements effectifs de créances. Si la couverture est insuffisante, l'engagement existant reste actif. Créer un remplacement ne remet pas à zéro les montants déjà utilisés.

Par exemple, si les montants payés effectifs sont de 3 000 CAD sur le codage A et de 1 000 CAD sur le codage B, le remplacement doit préserver au moins ces montants sur les codages correspondants. Un remplacement totalisant 10 000 CAD peut quand même échouer s'il affecte seulement 2 500 CAD au codage A. Examinez les montants payés effectifs, pas seulement le total du remplacement.

Une modification ordinaire ne peut réduire une ligne sous son plancher payé effectif ni déplacer un codage déjà utilisé par des paiements ou des ajustements comptables. Examinez les soldes des [Paiements](./payments.md) et l'historique avant de réduire un engagement. Réglez toute [Correction](./corrections.md) ouverte avant de modifier normalement un engagement.
