# Extensions

Les extensions ajoutent des fonctionnalités locales et versionnées à GCS-SSC. Elles peuvent ajouter des configurations d’agence et de volet, des onglets supplémentaires, des sections de page supplémentaires, des actions de création spécialisées, des calculateurs du montant des paiements, des routes serveur, des actifs publics, des données appartenant à l’extension, des secrets chiffrés et des messages bilingues.

Consultez [Extensions installées](../extensions/index.md) pour connaître les paquets actuellement inclus dans GCS-SSC et leurs règles de fonctionnement. Les développeurs devraient consulter [Création d’extensions](../developer/extensions-authoring.md).

## Enregistrement

Les extensions installées sont découvertes au démarrage de l’application. Les administrateurs ne créent pas de définitions d’extension dans l’interface; ils activent et configurent les extensions qui sont déjà installées avec l’application.

L’hôte valide les valeurs `sdkVersion` et `requiredHostCapabilities` déclarées par chaque extension avant de l’exposer. La validation au démarrage rejette les versions du SDK non prises en charge, les capacités inconnues et les capacités non déclarées qu’elle peut déduire des champs du manifeste. Elle n’inspecte pas le code de mise en œuvre pour repérer l’utilisation des clients API, du stockage clé-valeur, des secrets ou des hooks d’opération de création; les auteurs d’extensions doivent vérifier et déclarer eux-mêmes ces dépendances propres au code.

## Activation pour une agence

L’activation pour une agence constitue le premier contrôle opérationnel. Les utilisateurs doivent disposer d’un accès en lecture à l’agence pour consulter l’état des extensions et d’un accès de mise à jour pour activer ou désactiver une extension.

Lorsque l’extension est activée pour une agence, l’application exécute les migrations de cette extension. Une action manuelle Exécuter les migrations est aussi offerte pour les extensions activées. Si l’extension est désactivée pour l’agence, l’application la désactive pour tous les volets de cette agence.

Les extensions d’une agence peuvent également fournir un écran de configuration. Si une extension fournit un composant personnalisé de configuration de l’agence, la fenêtre modale affiche ce composant; sinon, elle affiche le texte JSON. La configuration de l’agence convient aux paramètres non secrets qui s’appliquent à toute l’agence.

## Configuration du volet

La configuration du volet est disponible seulement lorsque l’extension est activée pour l’agence. L’onglet Extensions du volet énumère les extensions activées pour l’agence, permet leur activation pour le volet et donne accès à leur configuration.

La plupart des extensions utilisent une fenêtre modale de configuration plein écran. Si l’extension fournit un composant personnalisé de configuration du volet, la fenêtre modale affiche ce composant; sinon, elle affiche le texte JSON.

Une extension peut plutôt déclarer `admin.streamConfigPage`. Dans ce cas, l’action Configurer ouvre une route de configuration pleine page réservée à cette fin, avec les métadonnées du programme, du volet, de l’agence et de l’extension, la configuration actuelle et l’indicateur de mise en page de l’hôte. Utilisez une configuration pleine page lorsque la mise en place nécessite plus d’espace, des tableaux imbriqués, la configuration d’identifiants ou un processus qui convient mal à une fenêtre modale.

L’application rejette la configuration des extensions inconnues, des extensions désactivées pour l’agence, des données JSON non valides et des états non valides propres aux extensions connues. Lorsque Qualité narrative est activée pour un volet sans cible configurée, l’application active par défaut la cible au niveau de l’entente afin que l’extension dispose d’une surface d’exécution visible.

## Emplacements d’exécution

Les emplacements d’exécution sont des emplacements nommés dans les pages existantes où une extension activée peut afficher du contenu supplémentaire. Les emplacements pris en charge comprennent ceux qui suivent les zones de texte, les descriptions d’une entente, les champs et les sections du profil d’une entente, ainsi que les descriptions d’un promoteur.

Dans le contexte d’un volet, l’extension doit être activée pour l’agence et pour le volet. Dans un contexte qui vise seulement une agence, l’extension peut s’afficher lorsqu’elle est activée pour l’agence ou lorsque son résolveur d’exécution retourne explicitement une résolution activée.

## Onglets d’entité

Les extensions peuvent ajouter des onglets aux ententes, aux promoteurs, aux réclamations et aux surveillances. Un onglet s’affiche seulement lorsque l’extension est activée pour l’agence ou le volet concerné et que l’utilisateur possède l’accès requis.

Les onglets d’un promoteur nécessitent l’activation pour l’agence et utilisent une configuration vide par défaut, car les promoteurs ne sont pas associés à un volet.

## Responsabilités opérationnelles

| Responsabilité | Orientation |
| --- | --- |
| Activer d’abord l’extension pour l’agence | La configuration du volet n’est pas disponible tant que l’extension n’est pas activée pour l’agence. |
| Configurer les volets de façon réfléchie | Les paramètres du volet peuvent modifier le comportement des ententes, des paiements ou des examens. |
| Exécuter les migrations lorsque cela est demandé | Les structures de données appartenant à l’extension doivent être prêtes avant l’exécution. |
| Tester les pages d’exécution après l’activation | Confirmez que les nouveaux onglets, emplacements, actions et calculateurs s’affichent uniquement aux endroits prévus. |
| Désactiver avec prudence | La désactivation d’une extension pour une agence la désactive également pour les volets de cette agence. |

## Actions de création et calculateurs

Les extensions peuvent ajouter des actions de création pour les engagements et les paiements d’une entente. Elles peuvent aussi ajouter des calculateurs du montant des paiements. L’hôte détecte les conflits lorsque plusieurs actions de création de remplacement ou plusieurs calculateurs de paiement sont disponibles pour la même opération.

Les extensions financières installées peuvent également ajouter des onglets d’entente avec leurs propres totaux. Par exemple, l’onglet Répartition des coûts par résultat affiche les montants répartis et non répartis selon la version de répartition, le type d’engagement et l’exercice afin que les utilisateurs puissent vérifier si tout le financement de programme de l’entente a été réparti.

## Données et migrations

Les données appartenant à une extension peuvent être stockées séparément des dossiers principaux de GCS. La suppression de données clé-valeur appartenant à une extension respecte les mêmes exigences de suppression logique que le reste de l’application.

La configuration d’une extension et ses données clé-valeur ne constituent pas des stockages de secrets. La configuration peut être affichée dans les composants administratifs côté navigateur, et les entrées KV sont des données d’état JSON ordinaires. Les clés privées, les jetons d’API, les jetons d’actualisation, les secrets de signature et les valeurs semblables doivent être conservés dans le stockage chiffré de secrets du SDK, qui repose sur un stockage chiffré distinct et une clé `GCS_EXTENSION_SECRETS_KEY` gérée par le déploiement. Les métadonnées des secrets peuvent être affichées à des fins administratives, mais les valeurs déchiffrées demeurent accessibles uniquement côté serveur.

## Intégration GC Forms

L’intégration GC Forms est une extension installée qui peut relier les soumissions de GC Forms à des correspondances de champs GCS. La configuration de l’agence stocke l’URL de base de l’API, l’URL du fournisseur d’identité, le comportement de confirmation par défaut, les métadonnées des justificatifs, y compris l’identifiant du formulaire, ainsi que les clés privées chiffrées. La configuration du volet stocke la référence au justificatif sélectionné et les correspondances des destinations.

Le matérialiseur actuel traite d’abord les réclamations : il peut créer des réclamations d’entente soumises et, facultativement, des lignes de réclamation soumises, puis relier les dossiers GCS générés à la soumission GC Forms. Les lignes importées sans correspondance valide avec une ligne budgétaire demeurent non attribuées et peuvent être attribuées à une ligne budgétaire compatible de l’entente tant que la réclamation est soumise. Avant de lire les soumissions, la synchronisation vérifie la structure enregistrée du modèle GC Forms; si la structure active a changé, les utilisateurs doivent actualiser le modèle, revoir les correspondances, enregistrer la configuration et relancer la synchronisation. Les destinations non prises en charge sont ensuite traitées pour chaque soumission, après sa récupération, son déchiffrement et la vérification de son intégrité. L’extension enregistre les réponses normalisées, les pièces jointes et un problème stable `unsupported_destination` pour chaque correspondance non prise en charge, omet la création et la confirmation de la réclamation pour cette soumission, puis poursuit l’exécution.

Pour en savoir plus sur la configuration et la reprise, consultez [Intégration GC Forms](../extensions/gc-forms.md).
