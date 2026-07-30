# Paiements d’entente

Les paiements consignent les demandes de paiement prévues ou réelles associées à des engagements actifs et approuvés. Les lignes de paiement répartissent le montant du paiement entre les lignes d’engagement approuvées.

## Configuration d’une installation vide

| Configuration | Importance |
| --- | --- |
| Exercices du budget de l’entente | Les exercices des paiements sont sélectionnés parmi les exercices du budget de l’entente. |
| Engagement actif et approuvé | La création d’un paiement nécessite un engagement actif et approuvé du type d’engagement sélectionné. |
| Lignes d’engagement | Les lignes de paiement sélectionnent les lignes d’engagement admissibles pour l’engagement et l’exercice du paiement. |
| Modèle d’approbation pour `fundingcasepayment` | Requis lorsque les paiements achevés doivent suivre un processus d’approbation. |
| Extension facultative de calcul du montant des paiements | Les extensions peuvent suggérer des montants, imposer des plafonds ou remplacer les actions de création. |

## Déroulement de l’onglet

L’onglet Paiements affiche le type de paiement, l’état, l’exercice prévu, la période, le commentaire, le montant et le nombre de lignes. La recherche porte notamment sur le texte visible du commentaire.

La consultation des paiements exige `agreement:read`. La création d’un paiement exige `agreement:create`; la modification d’un paiement existant ou son achèvement exige `agreement:update`; sa suppression exige `agreement:delete`. Une équipe exacte d’entente peut fournir ces actions selon son niveau d’accès.

La création d’un paiement saisit les renseignements suivants :

| Champ | Règle |
| --- | --- |
| Type d’engagement | Requis. L’entente doit avoir un engagement actif et approuvé de ce type. |
| Exercice | Requis. Doit être un exercice du budget de l’entente. |
| Type de paiement | `reimbursement` ou `advance`. |
| Début et fin de la période | Mois de l’exercice, d’avril à mars, encodés de 0 à 11. La fin ne peut pas précéder le début. |
| Montant du paiement | Valeur monétaire positive requise. |
| Commentaire | Facultatif. Les commentaires vides sont convertis en valeur nulle. |

Les nouveaux paiements principaux sont créés à l’état `draft`. Les hooks d’opération de création d’une extension peuvent remplacer l’insertion principale après la réussite de la validation.

## Page de détails

La page de détails du paiement affiche le contexte du paiement, les lignes de paiement, l’achèvement et l’approbation. Utilisez-la pour répartir le montant du paiement entre les lignes d’engagement admissibles avant d’achever le paiement.

## Lignes de paiement

| Champ | Règle |
| --- | --- |
| Paiement | Défini par la page de détails du paiement actuel. |
| Ligne d’engagement | Requise. Le sélecteur offre seulement les lignes d’engagement qui correspondent à l’engagement approuvé et à l’exercice du paiement. |
| Montant | Valeur monétaire positive requise. |

Le tableau de détails affiche le numéro de la ligne d’engagement, l’exercice, le codage financier et le montant de la ligne de paiement. Le codage financier présente le fonds comme valeur principale, ainsi que le grand livre, le centre financier, l’ordre interne, le domaine fonctionnel et le centre de coûts lorsqu’ils sont présents. Le total de la page de détails compare le total des lignes de paiement au montant du paiement.

L’ajout d’une ligne de paiement exige `agreement:create`, la modification d’une ligne existante exige `agreement:update` et sa suppression exige `agreement:delete`. La recherche de lignes d’engagement admissibles utilise la même action de création ou de mise à jour que le formulaire qui l’a ouverte.

## Règles opérationnelles

| Règle | Comportement |
| --- | --- |
| La création d’un paiement nécessite un engagement actif et approuvé | Si aucun engagement du type sélectionné n’est actif et approuvé, la création est rejetée. |
| L’exercice doit appartenir au budget de l’entente | Les exercices non valides sont rejetés. |
| La ligne de paiement doit correspondre à l’engagement et à l’exercice du paiement | Les lignes d’engagement qui ne correspondent pas au contexte du paiement sont rejetées. |
| Le montant d’une ligne de paiement ne peut pas dépasser le solde de l’engagement | Le total des lignes de paiement associées à une ligne d’engagement ne peut pas dépasser le solde restant de cette ligne d’engagement. |
| Les états verrouillés empêchent les modifications | Les paiements à l’état `complete`, `pendingapproval`, `approved`, `denied`, `pay`, `wait`, `processed` ou `paid` sont en lecture seule. |
| La modification d’un paiement en brouillon le fait passer à l’état en cours | La modification des lignes fait passer les paiements à l’état `draft` à l’état `inprogress`. |
| L’achèvement nécessite un total exact des lignes | Le paiement ne peut pas être achevé à moins que le total de ses lignes soit positif et corresponde exactement à son montant. |

## Achèvement et approbation

Type d’entité d’achèvement : `fundingcasepayment`.

L’achèvement d’un paiement enregistre le commentaire d’achèvement commun. Lorsqu’un modèle d’approbation valide pour `fundingcasepayment` existe, le paiement passe à l’état `pendingapproval`; sinon, il passe à l’état `complete`.

La section d’approbation s’affiche pour les paiements à l’état `pendingapproval`, `approved` ou `denied`. Les actions d’approbation font progresser l’état du paiement au moyen de la feuille d’acheminement commune. Les états opérationnels ultérieurs, comme `pay`, `wait`, `processed` et `paid`, sont verrouillés dans l’interface de l’entente.

Un approbateur affecté doit aussi posséder l’accès `agreement:read` ordinaire par un rôle ou une équipe exacte d’entente. L’affectation le rend admissible à l’étape d’approbation; elle ne lui donne pas accès au paiement ni à l’entente.

## Points d’extension

La création d’un paiement peut être remplacée ou complétée par des actions de création d’extensions enregistrées. Une extension de calcul du montant des paiements peut retourner un montant suggéré, un montant maximal, une devise, des détails de calcul, un état de chargement, des erreurs et des données propres à l’extension. Le formulaire empêche l’enregistrement lorsque le montant saisi dépasse le plafond établi par le calculateur.

Consultez [Paiements automatisés](../extensions/automated-payments.md) pour les plafonds fondés sur les réclamations, les prévisions, les engagements et les retenues. [Répartition des coûts par résultat](../extensions/outcome-cost-allocation.md) peut générer des lignes de paiement pour les engagements qu’elle gère.
