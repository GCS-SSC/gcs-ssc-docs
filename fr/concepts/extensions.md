# Extensions

Les extensions sont des modules facultatifs installés avec GCS-SSC. Selon les modules installés et activés par votre organisation, vous pouvez voir des onglets supplémentaires, des propositions de traduction ou des outils de calcul de paiement. L’équipe technique installe les extensions. Les agents utilisent les fonctions disponibles sur leurs dossiers. GCS-SSC fournit les pages communes et vérifie les permissions de ces modules.

Une extension est un progiciel. Elle peut ajouter des écrans de configuration, des emplacements et onglets, des actions spécialisées d'engagement ou de paiement, des calculateurs de paiement, des routes serveur authentifiées, des objets de base de données, des ressources publiques et des gardes de cycle de vie. Une personne administratrice peut activer un progiciel installé, mais ne peut pas l'installer dans l'interface.

Ce site explique comment GCS-SSC prend en charge les extensions et documente son kit de développement logiciel public, ou SDK. Consultez les guides de chaque extension installée pour connaître ses fonctions, ses réglages et son fonctionnement. Les personnes qui développent une extension devraient aussi lire [Création d'extensions](../developer/extensions-authoring.md) et la [référence de l'API hôte](../developer/api/extensions.md).

## Les trois commutateurs opérationnels

Installé signifie que l’équipe technique a inclus le module dans l’application. Activé signifie qu’une personne autorisée l’a mis en service pour un organisme et, au besoin, un volet. Configuré signifie que ses réglages ont été fournis. Terminez toutes les étapes requises avant d’utiliser la fonction.

Par exemple, si un calculateur de paiement apparaît dans un volet mais manque dans un autre, demandez à l’administrateur de vérifier les réglages d’organisme et de volet ainsi que votre accès. Une affectation à l’entente n’active pas une extension.

1. L’équipe technique inclut l’extension dans la compilation de l’application. La compilation valide les progiciels sous `extensions/` et crée les registres client et serveur. Une plage de SDK, une capacité, un chemin, une déclaration de contrôle d’accès, une identité en double ou un espace de noms de ressources invalide fait échouer la compilation. Elle ignore les répertoires incomplets sans `package.json` ou `extension.config.ts` avec un avertissement.
2. Une personne autorisée active l’extension pour un organisme. Cette action exécute aussi les migrations en attente, qui mettent à jour les données enregistrées ou la structure de base de données de l’extension. Si une migration échoue, GCS-SSC annule les changements et laisse l’extension désactivée.
3. Si l’extension possède une configuration de volet, une personne autorisée active et configure chaque volet visé. Gardez le commutateur de l’organisme actif. Les fonctions d’entente, de réclamation et de surveillance, ainsi que les actions et calculateurs, exigent les deux commutateurs. Les fonctions de promoteur utilisent les organismes actifs autorisés, car les promoteurs n’appartiennent pas à un volet.

Une garde est un contrôle qui peut empêcher un changement risqué, comme désactiver une fonction encore utilisée. La désactivation pour un organisme exécute les gardes enregistrées, puis désactive toutes les lignes de volet actives de cette extension dans l'organisme. La réactivation de l'organisme ne réactive **pas** ces volets. Les gardes d'activation et de désactivation d'un volet peuvent aussi refuser un changement avec une erreur opérationnelle localisée.

## Politique de configuration et sélection de fournisseur

Le modèle par défaut utilise les commutateurs d’organisme et de volet. Une extension peut déclarer une configuration limitée à l’organisme : elle est configurée une fois, sans éditeur de volet, et s’applique aux volets par ce commutateur. Ne créez pas une ligne de volet pour contourner cette déclaration.

Chaque extension précise le niveau d’accès requis pour changer ses réglages. Contributeur est la valeur par défaut; le paquet peut exiger Gestionnaire pour l’activation et la configuration. Un Contributeur ordinaire ne peut alors pas enregistrer sa configuration, même s’il peut modifier d’autres extensions du tableau. Pour utiliser ses fonctions, vous devez toujours avoir les permissions et l’affectation au dossier requises. Le contrôle Gestionnaire utilise la permission de suppression comprise dans ce niveau. Cette vérification ne supprime pas l’extension.

Le stockage possède aussi un **fournisseur sélectionné** par organisme. Activer une extension de stockage ne la sélectionne pas. Les nouveaux fichiers utilisent ce fournisseur. Les fichiers existants conservent leur fournisseur et leur emplacement de stockage d’origine. Vous ne pouvez pas désactiver ou retirer un fournisseur tant que des dossiers y font référence. Consultez [Pièces jointes](./attachments.md) et [Configuration](../operator/configuration.md).

Les fournisseurs de numéros d’entente constituent une autre contribution sélectionnée par l’hôte. Un seul fournisseur activé peut produire le numéro pour le volet choisi; sans fournisseur, saisissez le numéro manuellement. Plusieurs fournisseurs admissibles causent un conflit de configuration. GCS-SSC valide le numéro produit avant de créer l’entente. Le fournisseur donne le numéro, pas une autre façon de créer une entente.

## Administration de l'organisme

Ouvrez un organisme et choisissez **Extensions**. Le tableau énumère tous les progiciels enregistrés dans la compilation en cours, même ceux qui ne sont pas activés; il affiche les noms et descriptions localisés, l'état et les actions suivantes :

- activer ou désactiver l'extension pour l'organisme;
- ouvrir sa configuration d'organisme personnalisée, ou modifier le JSON en l'absence d'un composant personnalisé;
- exécuter manuellement les migrations en attente lorsque l'extension est activée. Les migrations sont des mises à jour techniques des données enregistrées ou de la structure de base de données de l’extension.

La configuration d’organisme utilise du JSON, un format de texte structuré visible dans le navigateur. N’y saisissez pas d’identifiants de connexion ni de clés privées. Si vous fermez une fenêtre de configuration plein écran contenant des changements non enregistrés, elle vous demande si vous voulez les abandonner. Corrigez le JSON invalide avant d’enregistrer.

La liste n’indique pas si des migrations sont en attente. Une exécution manuelle réussie affiche un message de succès. Un échec d’activation ou de migration affiche une erreur dans votre langue.

La lecture exige `agency:read`; la configuration applique la politique Contributeur ou Gestionnaire de l’extension, et les migrations exigent `agency:update`. Les écritures verrouillent l'état d'autorisation, la portée de cycle de vie extension-organisme et l'organisme actif, puis répètent l'autorisation avant toute modification.

## Administration du volet

Ouvrez un volet de programme de paiements de transfert et choisissez **Extensions**. Seules les extensions actuellement activées pour l'organisme propriétaire sont affichées. Le tableau permet de chercher dans votre langue et affiche l’état de chaque extension. Si vous avez la permission de modifier les dossiers enfants du volet, il offre aussi un commutateur d’activation et la configuration.

La configuration s’ouvre à l’un des trois endroits suivants :

- un composant fourni dans une fenêtre plein écran;
- une page bilingue dédiée à `/extension/{key}/config` (français : `/extension/{key}/configuration`) si le manifeste déclare `admin.streamConfigPage`;
- un éditeur JSON en l'absence d'une fenêtre personnalisée.

La page dédiée exige la valeur de requête `streamId` et reçoit normalement `transferPaymentId` et `agencyId` pour le fil d'Ariane et le contexte du composant. Elle charge le registre de volet faisant autorité, refuse une extension absente de ce registre, affiche une alerte d'erreur générique et expurgée lors d'un échec de chargement, puis délègue l'enregistrement au composant fourni. Si aucun composant de page ou de fenêtre enregistré n'est résolu, elle affiche un avertissement d'indisponibilité plutôt qu'un formulaire hôte.

Si l’enregistrement échoue, vérifiez que le volet existe toujours, que l’extension est enregistrée et activée pour l’organisme et que le JSON est valide. Un changement de votre accès ou une garde d’extension peut aussi empêcher l’enregistrement.

Avant d’enregistrer, GCS-SSC verrouille les données d’autorisation et de cycle de vie concernées. Il vérifie le propriétaire actuel du volet, votre permission Contributeur ou Gestionnaire requise, l’activation de l’organisme et la garde de l’extension. Il crée ou modifie les réglages seulement après la réussite de ces vérifications.

## Contributions à l'exécution

Une contribution est une fonction fournie par une extension. Les emplacements sont des endroits d’une page existante où elle peut ajouter un contrôle; les onglets d’entité sont des onglets supplémentaires sur un dossier. Le contrôle d’accès fondé sur les rôles, ou RBAC, détermine qui peut utiliser chaque fonction. GCS-SSC vérifie la connexion, les permissions et l’activation sur le serveur avant de transmettre les fonctions disponibles au navigateur.

| Contribution | Comportement de l'hôte |
| --- | --- |
| Emplacements | Neuf emplacements nommés peuvent s'afficher près des zones de texte partagées, des descriptions, champs et sections de profil d'entente, des descriptions de promoteur, des champs bilingues à portée explicite et des preuves de paiement. La requête précise l'action `create`, `read` ou `update`. Une propriété invalide ou inaccessible échoue; l'absence de contexte utile retourne une liste vide. |
| Onglets d'entité | Les onglets d’entente, de promoteur, de réclamation, de surveillance, de possibilité et de paiement résolvent l’entité active exacte et son propriétaire; les contributions de promoteur portent un tableau de contextes d’organismes autorisés. L'hôte vérifie la lecture de l'entité et la paire de contrôle d'accès déclarée par chaque onglet avant de retourner son composant et sa configuration. Un identifiant absent, une entité supprimée, une extension désactivée ou un refus d'accès ne produit aucun onglet. |
| Actions de création | Les pages d'engagements et de paiements demandent les actions d'ajout ou de remplacement pour l'entente courante. Sans entente, le résultat est vide. Plusieurs actions `replace` activées produisent `EXTENSION_CREATE_OPERATION_CONFLICT`; l'hôte n'en choisit aucune. |
| Calculateurs de paiement | La création d'un paiement accepte un seul calculateur activé. Plusieurs calculateurs produisent `EXTENSION_PAYMENT_AMOUNT_CALCULATOR_CONFLICT`; il faut corriger la configuration avant de s'y fier. |

Les composants hôtes ne résolvent que les noms présents dans le registre de composants produit à la compilation. Un composant absent n'affiche donc rien. Une action de création réussie appelle le rappel hôte pour actualiser le tableau. Un calculateur retourne un résultat et des données justificatives identifiées par la clé de l’extension. Le formulaire applique le résultat, et le serveur le valide selon les règles métier.

### Comportement du résolveur d’exécution

Un résolveur d’exécution est du code d’extension qui détermine si une fonction s’applique au dossier courant et fournit ses réglages. Les emplacements d’organisme et de promoteur consultent le résolveur déclaré. Si l’extension déclare un résolveur, il doit retourner `enabled: true` pour afficher l’emplacement; un résultat faux ou absent masque la contribution. Un résultat activé fournit les réglages de l’emplacement. Les emplacements de volet utilisent les réglages enregistrés du volet. GCS-SSC vérifie toujours l’activation de l’organisme et du volet ainsi que vos permissions avant d’afficher la fonction.

## Routes serveur dynamiques et frontière de confiance

Cette section décrit les contrôles serveur utilisés par les équipes techniques. Les agents utilisent les écrans habituels de l’application; une extension ne doit pas contourner les restrictions d’accès à un dossier.

Toutes les routes d’extension passent par `/api/extensions/{extensionKey}/...` et exigent une session authentifiée avant la répartition. Le registre de compilation fait correspondre une méthode et une suite de segments exactes; il ne publie pas arbitrairement des fichiers comme routes. Le répartiteur isole les paramètres résolus pendant l'appel, puis restaure le contexte de requête original.

Une route déclarant un contrôle d'accès reçoit le contexte d'organisme, de volet ou d'entité exacte résolu par l'hôte, la configuration applicable et la vérification de la paire sujet-action déclarée. Les états d'organisme et de volet sont revérifiés. Les routes d'entité prennent en charge les ententes, promoteurs, réclamations, surveillances, possibilités et paiements; l'autorisation des demandes et suivis demeure dans le domaine de l'entente propriétaire. Une route déclarée `auth: "manual"` ne reçoit que l'authentification et doit effectuer elle-même toutes les vérifications d'autorisation de domaine et d'activation.

Les écritures protégées utilisent le protocole `writeAuthorization` à deux phases. Dans une même transaction, elles verrouillent l’état d’autorisation et les dossiers de cycle de vie et d’entité, revérifient l’accès à la portée courante, puis lisent et modifient les données. Les sélections d'entente utilisent l'aide de visibilité de l'hôte, et les écritures visant une entente choisie emploient le rappel de verrouillage et d'autorisation fraîche dans la même transaction. L'absence du protocole ou une dérive de portée est fatale. Les erreurs attendues d'une extension sont localisées dans l'enveloppe d'erreur d'API normale; les erreurs inattendues demeurent des défaillances serveur.

## Migrations, état et secrets

Chaque extension possède ses propres tables de verrouillage et d'historique de migrations Kysely, avec un suffixe haché. Une exécution n'applique que les migrations en attente et retourne le nom, la direction et l'état. Au démarrage, l'hôte applique automatiquement les migrations seulement aux extensions activées pour au moins un organisme actif; l'exploitation doit néanmoins déployer du code et des migrations compatibles avant d'accepter le trafic.

KV désigne le stockage clé-valeur : une façon de conserver des réglages sous des clés nommées. JSON est un format de texte structuré pour ces réglages. Utilisez le stockage clé-valeur d’extension pour du JSON simple et non secret. Sa suppression est logique. Utilisez des tables migrées appartenant à l'extension pour les processus relationnels ou destinés aux rapports. Utilisez les aides de secrets chiffrés pour les justificatifs et clés privées; les enregistrements AES-256-GCM sont liés à l'extension et à l'identité propriétaire. La clé de déploiement `GCS_EXTENSION_SECRETS_KEY` doit contenir 32 octets encodés en base64 et ne doit jamais se trouver dans la configuration, le stockage clé-valeur, le contrôle de code source, les données de démonstration d'un environnement réel ou les charges utiles client.

## Espaces et preuves retenues

Une extension activée peut proposer un espace d’organisme sous **Gestion** ou **Administration** dans la navigation. L’extension détermine son groupe de menu et sa position. Choisissez-y un organisme autorisé; le changement de langue conserve la section sélectionnée. Les possibilités suivent les permissions de programme, les paiements celles d’entente. Les contributions de promoteur regroupent les configurations d’organismes autorisés sans sélection d’organisme responsable. Une permission ou activation absente peut expliquer une section manquante même si le paquet est installé.

Les sections d’extension d’entente peuvent ouvrir un détail dans le cadre hôte. Les actions bilingues peuvent proposer une traduction de brouillon; examinez les deux langues et enregistrez le formulaire propriétaire. Les extensions de preuve de paiement affichent les détails du calcul enregistrés avec le paiement plutôt que de le recalculer avec les données actuelles. Par exemple, pour vérifier le calcul d’un ancien paiement, utilisez ses preuves conservées même si les réglages du calculateur ont changé depuis. Lectures financières et imputation suivent devise, capacité et autorisation de l’hôte.

Les importations planifiées s’activent après les migrations et passent par L1 durable, la file de travail en arrière-plan qui conserve les tâches pour leur traitement ultérieur. Elles créent des brouillons admissibles et conservent leurs preuves de reprise/conflit. Voir [Portail](../intake/portal.md), [Travail en arrière-plan](../operator/background-work.md) et [contrats du SDK](../developer/extensions-authoring.md). Consultez le guide de chaque extension pour connaître ses réglages de connecteur, de calculateur ou de traduction.

## Liste de contrôle opérationnelle

- Confirmez que l'extension est incluse dans la compilation déployée et apparaît dans le registre de l'organisme.
- Activez-la pour l'organisme et corrigez toute erreur de migration ou de garde de désactivation.
- Pour les extensions à configuration de volet, configurez et activez chaque volet visé; réactivez explicitement les volets après une désactivation au niveau de l'organisme.
- Stockez les secrets avec les aides serveur chiffrées, jamais dans les éditeurs JSON.
- Testez chaque onglet, emplacement, action, calculateur et processus serveur fourni avec des personnes autorisées et refusées.
- Après une mise à niveau, exécutez les migrations en attente et vérifiez les gardes de cycle de vie hôtes touchées avant de traiter des dossiers de production.
