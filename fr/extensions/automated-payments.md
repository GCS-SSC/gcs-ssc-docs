# Paiements automatisés

Paiements automatisés fournit un seul calculateur dans la fenêtre **Entente > Paiements > Ajouter**. Il suggère un montant en dollars canadiens, affiche le détail du calcul et applique le plafond recalculé pendant la création. Il n'ajoute pas d'onglet d'entente distinct, ne remplace pas l'action Ajouter, ne produit pas de lignes, ne modifie pas un paiement existant et ne fait pas progresser son état.

## Avant l'activation

Le progiciel doit faire partie de la compilation déployée et être activé pour l'organisme. Avant de l'activer pour un volet, configurez des bases de retenue de volet actives dont les codes indépendants de la langue de l'organisme sont tous les deux :

- `agreement-total`;
- `final-fiscal-year`.

La garde d'activation du volet refuse l'opération si l'un des codes est absent, supprimé ou non lié au volet, et énumère les codes manquants dans une erreur bilingue. L'activation au niveau de l'organisme n'exécute pas cette garde de volet.

Dans l'onglet **Extensions** du volet, configurez `enabledPaymentTypes` avec `reimbursement`, `advance`, ou les deux. Une configuration absente ou mal formée prend les deux valeurs par défaut; un tableau explicitement vide n'en active aucune. La désactivation au niveau de l'organisme désactive aussi le volet, et la réactivation ultérieure de l'organisme ne le rétablit pas.

Le descripteur du calculateur n'est retourné que lorsque les deux commutateurs sont actifs et que la personne a `agreement:update` pour l'entente exacte. Si une autre extension activée fournit aussi un calculateur de paiement, l'hôte signale un conflit et n'en choisit aucun.

## Utiliser le calculateur

Ouvrez **Entente > Paiements**, choisissez **Ajouter**, puis sélectionnez un type d'engagement, un exercice du budget courant de l'entente, un type de paiement et les mois de début et de fin. Le calculateur paraît seulement pendant la création et attend que tous les champs requis soient présents. Chaque changement d'un champ ou d'une option de retenue lance une nouvelle requête; attendez la fin du chargement avant d'enregistrer.

La route accepte les mois `0` à `11`, exige que la fin soit égale ou postérieure au début et exige un montant fini lorsqu'il est fourni. L'identité d'exercice choisie doit se résoudre dans la version budgétaire courante de l'entente. L'hôte autorise la modification de l'entente exacte avant d'appeler la route de l'extension.

Le résultat montre le plafond et un détail dépliable. L'hôte copie chaque `suggestedAmount` fini dans le champ Montant, fixe le maximum au plafond, affiche une erreur de dépassement et désactive Enregistrer pendant le calcul ou lorsque le montant dépasse le plafond courant. Une erreur localisée de l'extension est affichée à partir des détails de l'API lorsqu'ils existent.

### Cas limite d'un type de paiement désactivé

La contribution est découverte par volet, et non selon le type choisi. Si vous sélectionnez un type exclu de `enabledPaymentTypes`, la route actuelle retourne `enabled: false`, une suggestion de zéro et un plafond de zéro; le composant publie quand même le résultat et l'hôte peut remplacer le montant par `0`. La garde de création n'applique pas de plafond à ce type désactivé. Resélectionnez un type activé, ou rétablissez le montant voulu et appliquez la validation de paiement de base avant d'enregistrer. Cet écart interface-route est suivi sous `DOC-031`.

## Données qui entrent dans le calcul

Tous les résultats monétaires sont arrondis à deux décimales. Une valeur interne non finie devient zéro. Les périodes sont comparées selon l'ordre des exercices et l'indice des mois d'avril à mars.

| Donnée | Dossiers inclus |
| --- | --- |
| Demandes de remboursement | Montants de lignes rapprochées seulement lorsque l'en-tête de rapprochement est `complete` ou `approved`, jusqu'à la dernière période de demande qui ne dépasse pas la fin choisie. |
| Prévisions | Lignes d'en-têtes actifs, jusqu'à la dernière période de demande et jusqu'à la fin choisie selon la formule. |
| Paiements antérieurs | Montants dans tous les états non refusés (`draft` à `paid`) jusqu'à la période choisie. Les paiements refusés, annulés et supprimés sont exclus. Le recalcul après création exclut le nouveau paiement. |
| Solde d'engagement | Engagements actifs et `approved` du type et de l'exercice choisis : total de leurs lignes moins les lignes de paiements non refusés déjà imputées. Un engagement seulement `complete` n'est pas admissible. |
| Budget | Lignes de financement de programme de l'entente, total du dernier exercice et financement des exercices futurs. La requête des totaux utilise des lignes actives mais, contrairement aux jointures de période, ne limite pas explicitement les exercices à la version budgétaire courante; évitez une filiation budgétaire ambiguë ou en double. |
| Retenue | Pourcentage de l'entente et code sémantique obtenu par sa base de retenue active du volet et de l'organisme. Tout autre code échoue de façon fermée. |
| Libérations antérieures | Métadonnées clé-valeur de l'extension sur les paiements non refusés antérieurs jusqu'à la période choisie. |

Pour un remboursement :

`base = demandes rapprochées jusqu'au dernier mois de demande - paiements à ce jour`

Pour une avance :

`base = demandes jusqu'au dernier mois - prévisions jusqu'à ce mois + prévisions jusqu'à la fin choisie - paiements à ce jour`

Sans demande admissible, l'avance utilise les prévisions jusqu'à la période choisie et la base d'un remboursement est zéro avant les paiements. Une base négative est ramenée à zéro.

Le montant disponible avant retenue est constitué des demandes, des prévisions non réclamées de l'exercice choisi et du budget des exercices futurs, moins les paiements et la retenue configurée. Le plafond est la plus petite valeur non négative parmi :

- la base positive;
- le solde d'engagement approuvé;
- le montant disponible avant retenue, augmenté d'une libération permise.

Ce plafond ne prouve pas que le paiement est autrement admissible. Le schéma de base, la résolution de l'engagement, le budget, le cycle de vie, l'approbation ainsi que les règles de rôle de portée et d’affectation exacte s'appliquent toujours.

## Libération de retenue et provenance

Choisissez **Libérer la retenue** et saisissez un montant non négatif. La demande est plafonnée à la retenue restante (`retenue calculée - libérations déjà enregistrées`, jamais sous zéro). La désactivation de l'option ramène son montant à zéro.

La garde avant création recalcule dans la transaction du paiement et refuse un montant supérieur au plafond courant lorsque le type est activé. Après la création du dossier de base, la garde recalcule en excluant ce nouveau paiement et stocke `{ releaseHoldback, holdbackReleaseAmount }` comme `payment-metadata` dans `extensions.kv_entry`, appartenant à `fundingcasepayment`. Le montant enregistré est le montant calculé et plafonné, jamais une valeur de navigateur non vérifiée. Un échec annule la transaction de base environnante.

L'extension ne définit ni migration ni secret chiffré. Sa configuration et ses métadonnées par paiement sont du JSON non secret. La suppression logique d'un paiement ne transforme pas ses métadonnées en dossier public; conservez le stockage clé-valeur d'extension avec la base de données d'application dans les sauvegardes.

## Erreurs et reprise

| Symptôme | Intervention |
| --- | --- |
| Impossible d'activer l'extension | Ajoutez au volet des associations actives pour les deux codes sémantiques requis, puis réessayez. |
| Calculateur absent | Vérifiez son inclusion dans la compilation, les deux commutateurs, la modification de l'entente exacte et l'absence de conflit entre calculateurs. |
| Exercice indisponible | Sélectionnez l'identité stable d'un exercice du budget courant de l'entente. N'envoyez pas directement l'identifiant d'un exercice de l'organisme. |
| Base de retenue non prise en charge | Corrigez l'entente pour employer une base active du volet dont le code d'organisme est pris en charge. |
| Montant supérieur au plafond | Actualisez ou recalculez après avoir concilié demandes, prévisions, paiements, solde d'engagement et retenue; réduisez le paiement au lieu de contourner la route. |
| Calcul modifié pendant la saisie | Le dernier résultat serveur demeure indicatif jusqu'à Enregistrer; la garde transactionnelle recalcule selon les données courantes. |

Consultez [Paiements d'entente](../agreements/payments.md) pour la création, les lignes, la complétion, les verrouillages et les frontières d'approbation.
