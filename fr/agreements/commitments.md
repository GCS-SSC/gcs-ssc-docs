# Engagements d’entente

Les engagements regroupent les lignes d’engagement et établissent les soldes d’engagement approuvés utilisés par les paiements. Les dossiers d’engagement comportent un résumé dans un onglet et une page de détails.

## Configuration d’une installation vide

| Configuration | Importance |
| --- | --- |
| Budget de l’entente | Le total des lignes d’engagement ne peut pas dépasser le financement de programme total de l’entente. |
| Engagements du volet | Chaque ligne d’engagement fait référence à un engagement du volet de paiements de transfert et à son codage financier. |
| Modèle d’approbation pour `fundingcaseagreementcommitment` | Requis si l’achèvement de l’engagement doit déclencher un processus d’approbation. Le modèle doit être associé au volet de paiements de transfert. |
| Permission de mise à jour de l’entente | Requise pour créer ou modifier les engagements et leurs lignes, achever les engagements et gérer la feuille d’acheminement, s’il y a lieu. |

## Déroulement de l’onglet

L’onglet Engagements résume chaque engagement, son nombre de lignes et le montant total de ses lignes.

La création d’un engagement commence par le choix d’un type d’engagement. Les nouveaux engagements sont créés à l’état `draft`, sans numéro de système financier ni montant parent. Les actions d’extension peuvent ajouter des choix de création propres à l’agence lorsqu’elles sont configurées.

Lorsque [Répartition des coûts par résultat](../extensions/outcome-cost-allocation.md) est activée pour un type d’engagement, son action remplace la création principale et génère les lignes à partir de la version de répartition active et des correspondances du volet.

Les types d’engagement sont `commitment`, `paye`, `paye2` et `pyp`.

## Page de détails

La page de détails de l’engagement regroupe le contexte de l’entente, le profil de l’engagement, le contexte du bénéficiaire, les lignes d’engagement, la section d’achèvement et la section d’approbation. Les utilisateurs gèrent le codage financier au moyen des lignes d’engagement, puis achèvent le dossier lorsqu’il est prêt à être examiné.

## Lignes d’engagement

| Champ | Règle |
| --- | --- |
| Engagement | Défini par la page de détails de l’engagement actuel. |
| Numéro de ligne d’engagement | Nombre entier requis de 1 à 32 767. |
| Engagement du volet | Requis et doit appartenir au volet de l’entente. |
| Montant | Valeur monétaire requise. |

Le tableau de détails affiche l’exercice, le codage financier et le montant. Le codage provient de l’engagement du volet sélectionné : fonds, grand livre, description du grand livre, centre financier, ordre interne, domaine fonctionnel et centre de coûts.

## Règles opérationnelles

| Règle | Comportement |
| --- | --- |
| Les états verrouillés empêchent les modifications | Les engagements à l’état `complete`, `pendingapproval`, `approved` ou `denied` ne peuvent pas être modifiés, et leurs lignes ne peuvent pas être changées. |
| Une modification fait progresser l’état | La modification d’un engagement ou de ses lignes fait passer un engagement modifiable à l’état `inprogress`, sauf s’il se trouve déjà dans un état d’approbation. |
| L’engagement du volet doit correspondre au volet de l’entente | Les utilisateurs peuvent seulement enregistrer des engagements de volet qui appartiennent au volet de l’entente. |
| Une ligne d’engagement ne peut pas devenir inférieure au montant déjà payé | Lorsque des paiements ont utilisé une ligne d’engagement, son montant ne peut pas devenir inférieur au montant déjà payé ou engagé dans un processus de paiement. |
| Le total de l’engagement ne peut pas dépasser le financement de programme de l’entente | Le total des lignes d’engagement ne peut pas dépasser le financement de programme disponible de l’entente. |
| L’achèvement nécessite au moins une ligne | L’achèvement d’un engagement vide produit une erreur d’état non valide. |
| L’approbation active un engagement de chaque type | Lorsqu’une approbation réussit, l’engagement approuvé devient actif et les engagements actifs précédents du même type pour cette entente sont désactivés. |

## Achèvement et approbation

Type d’entité d’achèvement : `fundingcaseagreementcommitment`.

L’achèvement d’un engagement crée un dossier d’achèvement commun. Si un modèle d’approbation valide associé au volet existe, l’engagement passe à l’état `pendingapproval` et la chaîne d’approbation est créée. Si aucun modèle d’approbation n’est configuré, l’achèvement fait passer l’engagement à l’état `complete`.

La section d’approbation s’affiche lorsque l’état est `pendingapproval`, `approved` ou `denied`. Les actions d’approbation mettent à jour la feuille d’acheminement commune et font passer l’engagement à l’état `approved` ou `denied`, ou le maintiennent à l’état `pendingapproval`.

## Dépendances en aval

Les paiements peuvent seulement être créés à partir d’un engagement actif et approuvé du type d’engagement sélectionné. Les lignes de paiement sélectionnent ensuite les lignes de l’engagement approuvé du paiement qui correspondent à l’exercice.
