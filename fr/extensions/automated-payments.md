# Paiements automatisés

L’extension Paiements automatisés ajoute un calculateur à la création d’un paiement d’entente. Elle suggère un montant en dollars canadiens et applique le même plafond calculé lors de l’enregistrement.

## Configurer le volet

Activez l’extension pour l’agence et le volet, puis choisissez si le calculateur s’applique aux types `reimbursement`, `advance` ou aux deux. L’entente doit tout de même avoir un engagement actif et approuvé du type choisi ainsi qu’un exercice budgétaire valide.

## Données du calcul

Le calcul utilise le type d’engagement, l’exercice, le type de paiement et la période sélectionnés ainsi que :

- les montants de réclamations rapprochés jusqu’au dernier mois admissible;
- les prévisions actives jusqu’à ce mois et jusqu’à la fin de la période choisie;
- les paiements admissibles précédents;
- le solde des lignes d’engagement approuvées pour l’exercice et le type;
- le financement de programme et le solde disponible pour décaissement;
- le pourcentage et la base de retenue de l’entente (`agreement-total` ou `final-fiscal-year`).

Pour un remboursement, la base correspond aux réclamations admissibles moins les paiements à ce jour. Pour une avance, la base remplace aussi les prévisions jusqu’au dernier mois réclamé par les montants réels et inclut les prévisions jusqu’à la période choisie. Le plafond est la plus petite valeur non négative parmi la base, le solde d’engagement et le montant disponible après retenue.

## Libération de la retenue

Le calculateur affiche la retenue et permet à un utilisateur autorisé d’en demander la libération. Le montant est limité à la retenue non encore libérée et est enregistré dans les métadonnées d’extension du paiement. Les libérations précédentes sont prises en compte dans les calculs suivants.

## Recalcul et protection à l’enregistrement

Toute modification d’une donnée du calcul efface le résultat précédent. Recalculez avant d’enregistrer. Le serveur refait le calcul dans la transaction de création et rejette un montant supérieur au plafond courant; un résultat périmé dans le navigateur ne peut donc pas contourner la règle.

Consultez [Paiements d’entente](../agreements/payments.md) pour le cycle de vie de base.
