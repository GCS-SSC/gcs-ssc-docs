# Ententes du promoteur

Utilisez l’onglet **Ententes** pour trouver les ententes GCS-SSC actives liées à un promoteur. Ouvrez **Promoteurs**, sélectionnez le profil, puis choisissez **Ententes**. Ouvrez une entente de cette liste pour gérer ses bénéficiaires ou la faire progresser dans son cycle de vie.

## Visibilité et navigation

Vous avez besoin de l’accès Lecteur au promoteur pour ouvrir l’onglet. Il faut aussi l’accès Lecteur à chaque entente que vous voulez voir, par vos permissions globales, d’agence ou de programme. Les ententes hors de cet accès ne figurent pas dans la liste. Une affectation au promoteur ne donne pas accès à toutes ses ententes.

Le tableau présente le numéro d’entente, le titre bilingue, le programme, le volet, le type d’entente et une action d’ouverture. La recherche porte sur le numéro; le titre anglais ou français; le nom du programme, du volet ou de l’agence; et le nom du type d’entente. Les résultats comprennent uniquement les liens actifs ainsi que les enregistrements actifs d’entente, de volet, de programme, d’agence, de sous-type et de type d’entente.

Sélectionnez le titre bilingue ou la flèche pour ouvrir l’entente. L’API de destination vérifie de nouveau l’accès; la visibilité dans cet onglet n’accorde aucun droit plus large sur l’entente.

La liste offre les vues **Tous**, **Mes dossiers** et par organisme. Mes dossiers filtre vos affectations exactes d’entente; la vue organisme suit l’organisme propriétaire du programme de l’entente. Aucune vue n’élargit la lecture des ententes. Cela diffère de la vue organisme des promoteurs, fondée sur les liens d’identifiant financier d’organisme.

Par exemple, un organisme communautaire peut avoir une entente pour des activités jeunesse et une autre pour réparer son bâtiment. Dans l’onglet Ententes de son profil, recherchez le titre du projet ou le numéro d’entente, puis ouvrez la bonne entente. Si vous êtes affecté seulement à l’entente jeunesse, **Mes dossiers** vous aide à cibler ce dossier; **Tous** affiche toujours uniquement les ententes que vous pouvez consulter.

## Créer une entente depuis l’onglet

Le bouton **Nouvelle entente** apparaît lorsque le client indique une autorisation de création d’entente dans au moins une portée. Il ouvre l’assistant habituel avec ce promoteur déjà sélectionné. Il s’agit d’un raccourci, et non d’un contournement de l’autorisation : l’agence, le programme et le volet choisis doivent toujours appartenir à votre portée de création, et chaque étape au serveur valide le contrat de l’entente.

Avant la création, configurez l’agence, le programme et le volet de paiements de transfert, le sous-type d’entente, les données financières et de référence et les modèles requis. Un promoteur peut être lié à plusieurs ententes, et une entente peut compter plusieurs promoteurs.

## Modifier ou retirer une relation

Cet onglet ne modifie ni ne supprime les ententes et ne retire aucun lien de bénéficiaire. Ouvrez l’entente et utilisez sa section **Promoteurs** avec les autorisations requises sur l’entente. Le retrait d’un lien ne supprime ni le profil du promoteur ni l’entente; la suppression d’une entente suit ses propres règles de cycle de vie et de dépendance.

Si une entente attendue est absente, vérifiez que le lien et les enregistrements de configuration sont actifs et que la portée Lecteur `agreement` la couvre. Une affectation au promoteur n’élargit pas la portée des ententes.

## Guides connexes

- [Profils des promoteurs](./index.md)
- [Historique du financement](./funding-history.md)
- [Utilisateurs affectés aux promoteurs](./team.md)
