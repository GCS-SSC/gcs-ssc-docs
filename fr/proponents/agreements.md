# Ententes du promoteur

L’onglet **Ententes** est une vue des relations entre le promoteur sélectionné et les ententes GCS-SSC actives. Utilisez-le pour trouver et ouvrir une entente; gérez les bénéficiaires et le cycle de vie dans l’espace de travail de l’entente.

## Visibilité et navigation

L’ouverture de l’onglet exige un accès en lecture au promoteur. Le serveur applique ensuite la visibilité des ententes de façon indépendante. Seules les ententes liées que vous pouvez consulter au moyen d’une portée globale, d’agence, de paiement de transfert ou d’une équipe exacte de l’entente sont retournées; les ententes inaccessibles sont omises plutôt qu’affichées sous forme masquée.

Le tableau présente le numéro d’entente, le titre bilingue, le programme, le volet, le type d’entente et une action d’ouverture. La recherche porte sur le numéro; le titre anglais ou français; le nom du programme, du volet ou de l’agence; et le nom du type d’entente. Les résultats comprennent uniquement les liens actifs ainsi que les enregistrements actifs d’entente, de volet, de programme, d’agence, de sous-type et de type d’entente.

Sélectionnez le titre bilingue ou la flèche pour ouvrir l’entente. L’API de destination vérifie de nouveau l’accès; la visibilité dans cet onglet n’accorde aucun droit plus large sur l’entente.

## Créer une entente depuis l’onglet

Le bouton **Nouvelle entente** apparaît lorsque le client indique une autorisation de création d’entente dans au moins une portée. Il ouvre l’assistant habituel en fournissant le promoteur courant comme valeur présélectionnée dans la requête. Il s’agit d’un raccourci, et non d’un contournement de l’autorisation : l’agence, le programme et le volet choisis doivent toujours appartenir à votre portée de création, et chaque étape au serveur valide le contrat de l’entente.

Avant la création, configurez l’agence, le programme et le volet de paiements de transfert, le sous-type d’entente, les données financières et de référence et les modèles requis. Un promoteur peut être lié à plusieurs ententes, et une entente peut compter plusieurs promoteurs.

## Modifier ou retirer une relation

Cet onglet ne modifie ni ne supprime les ententes et ne retire aucun lien de bénéficiaire. Ouvrez l’entente et utilisez sa section **Promoteurs** avec les autorisations requises sur l’entente. Le retrait d’un lien ne supprime ni le profil du promoteur ni l’entente; la suppression d’une entente suit ses propres règles de cycle de vie et de dépendance.

Si une entente attendue est absente, vérifiez que le lien et les enregistrements de configuration sont actifs et que vous disposez d’une portée de lecture pour l’entente elle-même. L’accès par l’équipe du promoteur n’élargit pas à lui seul la portée des ententes.

## Guides connexes

- [Profils des promoteurs](./index.md)
- [Historique du financement](./funding-history.md)
- [Équipes des promoteurs](./team.md)
