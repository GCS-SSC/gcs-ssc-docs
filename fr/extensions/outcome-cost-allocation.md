# Répartition des coûts par résultat

Répartition des coûts par résultat distribue le financement de programme d’une entente entre les résultats référencés et utilise les correspondances du volet pour générer des lignes d’engagement et de paiement.

## Correspondances du volet

Pour chaque type d’engagement activé, associez un résultat et un budget de volet à un engagement actif du volet. Toute répartition positive doit avoir une correspondance valide pour son exercice. Examinez les correspondances avant de les modifier dans un volet qui contient des ententes actives.

## Versions de répartition

Une entente peut avoir un brouillon, une version active et un historique de versions inactives. Répartissez chaque coordonnée résultat-exercice par montant ou par pourcentage. Les valeurs doivent être non négatives, comporter au plus quatre décimales et rester dans la plage numérique exacte prise en charge. Les pourcentages sont calculés par rapport au financement de programme de l’exercice, et l’écart d’arrondissement au cent est distribué de façon déterministe.

L’achèvement exige que les montants calculés couvrent exactement tout le financement de programme de l’entente et rejette les résultats, les exercices ou les correspondances périmés. L’achèvement d’un brouillon l’active et rend inactive la version précédemment active. L’extension fige les libellés bilingues, chaque montant calculé et chaque base de financement annuelle, la base totale ainsi que les coordonnées d’engagement du volet, ce qui préserve la version historique et les données de montant utilisées pour l’achever. La génération ultérieure des engagements recharge toutefois les budgets, les résultats et les correspondances actuels ainsi que les engagements actifs. Des problèmes de validation actuels dans l’un ou l’autre de ces dossiers peuvent donc bloquer la génération ou la régénération même si l’instantané de répartition achevé demeure inchangé.

## Engagements et paiements gérés

Pour les types activés, l’extension remplace la création d’engagement. Les lignes générées conservent la provenance de la version et du résultat. La création d’un paiement répartit ensuite le montant demandé entre les lignes générées correspondantes, respecte leurs soldes et utilise la version qui a généré l’engagement, même si une version plus récente devient active.

L’extension protège les dossiers gérés pendant tout leur cycle de vie. Elle bloque la désactivation de la configuration après la création d’une provenance d’engagement, contrôle les changements de volet d’une entente et refuse les modifications de paiement ou de ligne qui briseraient la couverture. Elle bloque aussi la suppression d’une entente lorsqu’un historique de répartition ou une provenance d’engagement généré existe. Un paiement refusé est exclu de la couverture, mais sa réactivation est rejetée si elle faisait dépasser le montant d’une ligne d’engagement. Ces contrôles s’appliquent aussi aux modifications effectuées par l’hôte hors de l’interface de l’extension.

## Concurrence et historique

L’achèvement d’une répartition, la régénération des engagements, les modifications de configuration, les déplacements d’entente et les modifications de paiement respectent un ordre transactionnel global : verrouiller le graphe des autorisations de l’appelant; acquérir les verrous du cycle de vie de l’agence, puis du volet; verrouiller la ligne du volet actuel; acquérir le verrou d’entente de l’extension; verrouiller et résoudre de nouveau la ligne de l’entente; autoriser de nouveau l’entité actuelle; puis verrouiller les lignes dépendantes des budgets, des résultats, des répartitions, des engagements et des paiements selon un ordre stable des identifiants. Un changement de portée provoque un échec avant toute écriture de données de répartition. La configuration et l’autorisation actuelles sont relues sous ces verrous, ce qui empêche une autorisation périmée, un déplacement de volet ou des écritures concurrentes de contourner les règles. Les brouillons sont modifiables; les versions achevées et la provenance générée forment l’historique d’audit.

Consultez [Engagements d’entente](../agreements/commitments.md) et [Paiements d’entente](../agreements/payments.md).
