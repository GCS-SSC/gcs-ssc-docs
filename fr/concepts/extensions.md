# Extensions

Les extensions sont des progiciels installés avec GCS-SSC. Elles peuvent ajouter des écrans de configuration, des emplacements et onglets, des actions spécialisées d'engagement ou de paiement, des calculateurs de paiement, des routes serveur authentifiées, des objets de base de données, des ressources publiques et des gardes de cycle de vie. Une personne administratrice peut activer un progiciel installé, mais ne peut pas l'installer dans l'interface.

Consultez les [extensions installées](../extensions/index.md) pour les cinq progiciels livrés dans cette version. Les personnes qui développent une extension devraient aussi lire [Création d'extensions](../developer/extensions-authoring.md) et la [référence de l'API hôte](../developer/api/extensions.md).

## Les trois commutateurs opérationnels

Ne considérez pas « installé », « activé » et « configuré » comme des synonymes.

1. La compilation Nuxt analyse les répertoires sous `extensions/`. Elle valide chaque progiciel et produit les registres client et serveur. Une plage de SDK, une capacité, un chemin, une déclaration de contrôle d'accès, une identité en double ou un espace de noms de ressources invalide fait échouer la compilation. Un répertoire incomplet sans `package.json` ou `extension.config.ts` est ignoré avec un avertissement.
2. Une personne ayant `agency:update` active l'extension enregistrée pour un organisme. L'activation exécute ses migrations en attente dans la même transaction avant d'enregistrer la ligne d'activation. Un échec de migration annule la transaction et laisse l'extension désactivée.
3. Une personne ayant `transfer_payment:update` l'active et la configure pour un volet. Le commutateur de l'organisme doit demeurer actif. Les contributions d'entente, demande de remboursement, suivi, action et calculateur exigent les deux commutateurs; les contributions de demandeur-bénéficiaire utilisent l'organisme responsable, car ce profil n'appartient pas à un volet.

La désactivation pour un organisme exécute les gardes enregistrées, puis désactive toutes les lignes de volet actives de cette extension dans l'organisme. La réactivation de l'organisme ne réactive **pas** ces volets. Les gardes d'activation et de désactivation d'un volet peuvent aussi refuser un changement avec une erreur opérationnelle localisée.

## Administration de l'organisme

Ouvrez un organisme et choisissez **Extensions**. Le tableau énumère tous les progiciels enregistrés dans la compilation en cours, même ceux qui ne sont pas activés; il affiche les noms et descriptions localisés, l'état et les actions suivantes :

- activer ou désactiver l'extension pour l'organisme;
- ouvrir sa configuration d'organisme personnalisée, ou modifier le JSON en l'absence d'un composant personnalisé;
- exécuter manuellement les migrations en attente lorsque l'extension est activée.

La configuration d'organisme est du JSON ordinaire visible dans le navigateur, et non un dépôt de secrets. La fermeture d'une fenêtre plein écran modifiée demande si le brouillon doit être abandonné. Un JSON de repli invalide empêche l'enregistrement. La liste n'indique pas si les migrations sont à jour ou en attente : une exécution manuelle réussie affiche un succès, tandis qu'un échec d'activation ou d'exécution retourne une erreur d'API localisée.

La lecture exige `agency:read`; l'activation, la configuration et les migrations exigent `agency:update`. Les écritures verrouillent l'état d'autorisation, la portée de cycle de vie extension-organisme et l'organisme actif, puis répètent l'autorisation avant toute modification.

## Administration du volet

Ouvrez un volet de programme de paiements de transfert et choisissez **Extensions**. Seules les extensions actuellement activées pour l'organisme propriétaire sont affichées. Le tableau permet la recherche localisée, affiche l'état et offre un commutateur et la configuration lorsque la page accorde la modification des éléments enfants.

La configuration emploie l'une des trois surfaces suivantes :

- un composant fourni dans une fenêtre plein écran;
- une page bilingue dédiée à `/extension/{key}/config` (français : `/extension/{key}/configuration`) si le manifeste déclare `admin.streamConfigPage`;
- un éditeur JSON en l'absence d'une fenêtre personnalisée.

La page dédiée exige la valeur de requête `streamId` et reçoit normalement `transferPaymentId` et `agencyId` pour le fil d'Ariane et le contexte du composant. Elle charge le registre de volet faisant autorité, refuse une extension absente de ce registre, affiche une alerte d'erreur générique et expurgée lors d'un échec de chargement, puis délègue l'enregistrement au composant fourni. Si aucun composant de page ou de fenêtre enregistré n'est résolu, elle affiche un avertissement d'indisponibilité plutôt qu'un formulaire hôte.

Les écritures refusent un volet absent ou supprimé, une extension inconnue, un commutateur d'organisme désactivé, du JSON invalide, une dérive d'autorisation et l'échec d'une garde. L'hôte prend les verrous d'état d'autorisation et de cycle de vie, résout de nouveau la propriété active du volet, répète `transfer_payment:update`, vérifie l'activation de l'organisme, exécute la garde, puis seulement après insère ou met à jour la ligne. L'activation de Narrative Quality avec une configuration autrement vide ajoute sa cible au niveau de l'entente afin qu'une jauge puisse s'afficher.

## Contributions à l'exécution

L'hôte découvre les contributions au moyen de points d'accès authentifiés et filtrés selon les autorisations; le navigateur ne décide jamais seul de l'activation ou du contrôle d'accès.

| Contribution | Comportement de l'hôte |
| --- | --- |
| Emplacements | Sept emplacements nommés peuvent s'afficher près des zones de texte partagées, des descriptions, champs et sections de profil d'entente, et des descriptions de demandeur-bénéficiaire. La requête précise l'action `create`, `read` ou `update`. Une propriété invalide ou inaccessible échoue; l'absence de contexte utile retourne une liste vide. |
| Onglets d'entité | Les onglets d'entente, de demandeur-bénéficiaire, de demande de remboursement et de suivi résolvent l'entité active exacte et l'organisme ou le volet propriétaire. L'hôte vérifie la lecture de l'entité et la paire de contrôle d'accès déclarée par chaque onglet avant de retourner son composant et sa configuration. Un identifiant absent, une entité supprimée, une extension désactivée ou un refus d'accès ne produit aucun onglet. |
| Actions de création | Les pages d'engagements et de paiements demandent les actions d'ajout ou de remplacement pour l'entente courante. Sans entente, le résultat est vide. Plusieurs actions `replace` activées produisent `EXTENSION_CREATE_OPERATION_CONFLICT`; l'hôte n'en choisit aucune. |
| Calculateurs de paiement | La création d'un paiement accepte un seul calculateur activé. Plusieurs calculateurs produisent `EXTENSION_PAYMENT_AMOUNT_CALCULATOR_CONFLICT`; il faut corriger la configuration avant de s'y fier. |

Les composants hôtes ne résolvent que les noms présents dans le registre de composants produit à la compilation. Un composant absent n'affiche donc rien. Une action de création réussie appelle le rappel hôte pour actualiser le tableau. Un calculateur émet un résultat et une charge utile associée à la clé de l'extension; le formulaire hôte applique le résultat, mais la validation opérationnelle côté serveur demeure déterminante.

### Limite du résolveur d'exécution

Le chemin exécutable actuel consulte le résolveur d'une extension seulement lors du chargement des emplacements d'organisme ou de demandeur-bénéficiaire. Sa configuration retournée n'est utilisée que lorsque le résolveur indique une activation; toutefois, un résultat faux ou absent ne masque pas l'emplacement, qui reçoit plutôt `{}`. Les emplacements de volet utilisent la configuration persistée et n'appellent pas le résolveur. Les responsables de l'exploitation et les auteurs ne doivent pas compter uniquement sur ce résolveur pour masquer les emplacements actuels; ils doivent employer l'activation d'organisme ou de volet et le contrôle d'accès de l'hôte. Cet écart est suivi sous `DOC-030`.

## Routes serveur dynamiques et frontière de confiance

Toutes les routes d'extension passent par `/api/extensions/{extensionKey}/...` et exigent une session authentifiée avant la répartition. Le registre de compilation fait correspondre une méthode et une suite de segments exactes; il ne publie pas arbitrairement des fichiers comme routes. Le répartiteur isole les paramètres résolus pendant l'appel, puis restaure le contexte de requête original.

Une route déclarant un contrôle d'accès reçoit le contexte d'organisme, de volet ou d'entité exacte résolu par l'hôte, la configuration applicable et la vérification de la paire sujet-action déclarée. Les états d'organisme et de volet sont revérifiés. Les routes d'entité prennent en charge les ententes, demandeurs-bénéficiaires, demandes de remboursement et suivis; l'autorisation des demandes et suivis demeure dans le domaine de l'entente propriétaire. Une route déclarée `auth: "manual"` ne reçoit que l'authentification et doit effectuer elle-même toutes les vérifications d'autorisation de domaine et d'activation.

Les écritures protégées utilisent le protocole `writeAuthorization` à deux phases : verrouiller l'état d'autorisation dans la même transaction, prendre les verrous de cycle de vie et d'entité, répéter l'autorisation de la portée courante, puis lire et modifier. Les sélections d'entente utilisent l'aide de visibilité de l'hôte, et les écritures visant une entente choisie emploient le rappel de verrouillage et d'autorisation fraîche dans la même transaction. L'absence du protocole ou une dérive de portée est fatale. Les erreurs attendues d'une extension sont localisées dans l'enveloppe d'erreur d'API normale; les erreurs inattendues demeurent des défaillances serveur.

## Migrations, état et secrets

Chaque extension possède ses propres tables de verrouillage et d'historique de migrations Kysely, avec un suffixe haché. Une exécution n'applique que les migrations en attente et retourne le nom, la direction et l'état. Au démarrage, l'hôte applique automatiquement les migrations seulement aux extensions activées pour au moins un organisme actif; l'exploitation doit néanmoins déployer du code et des migrations compatibles avant d'accepter le trafic.

Utilisez le stockage clé-valeur d'extension pour du JSON simple et non secret. Sa suppression est logique. Utilisez des tables migrées appartenant à l'extension pour les processus relationnels ou destinés aux rapports. Utilisez les aides de secrets chiffrés pour les justificatifs et clés privées; les enregistrements AES-256-GCM sont liés à l'extension et à l'identité propriétaire. La clé de déploiement `GCS_EXTENSION_SECRETS_KEY` doit contenir 32 octets encodés en base64 et ne doit jamais se trouver dans la configuration, le stockage clé-valeur, le contrôle de code source, les données de démonstration d'un environnement réel ou les charges utiles client.

## Liste de contrôle opérationnelle

- Confirmez que l'extension est incluse dans la compilation déployée et apparaît dans le registre de l'organisme.
- Activez-la pour l'organisme et corrigez toute erreur de migration ou de garde de désactivation.
- Configurez et activez chaque volet visé; réactivez explicitement les volets après une désactivation au niveau de l'organisme.
- Stockez les secrets avec les aides serveur chiffrées, jamais dans les éditeurs JSON.
- Testez chaque onglet, emplacement, action, calculateur et processus serveur fourni avec des personnes autorisées et refusées.
- Après une mise à niveau, exécutez les migrations en attente et vérifiez les gardes de cycle de vie hôtes touchées avant de traiter des dossiers de production.
