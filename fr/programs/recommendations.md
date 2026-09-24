# Schémas et configurations de recommandation

La configuration des recommandations comporte deux couches. Un schéma appartenant à une agence définit les questions bilingues et le résultat canonique Recommandé ou Non recommandé. Un ensemble de recommandations d’agence ordonne les schémas publiés, choisit la politique d’échec par membre et peut ajouter des approbations de membre ou finale.

## Navigation et accès

Ouvrez **Agences**, choisissez l’agence, puis **Ensembles de recommandations**. La liste regroupe les ensembles par type d’entité d’exécution. La page de détail gère l’identité, l’approbation finale et les membres ordonnés; la page du schéma modifie les questions. Lecteur de l’agence consulte, Contributeur crée, modifie et publie, et Gestionnaire effectue les suppressions admissibles. Un volet utilise ces définitions d’agence par un flux d’agence lié; les affectations exactes de travail ne donnent pas accès au catalogue.

## Schéma de recommandation

Un schéma enregistre le type d’entité, le nom bilingue, l’agence, l’état et la version, les métadonnées du résultat et une définition. La création depuis un ensemble emploie son agence.

L’éditeur contient Général et Sections du formulaire. Une définition valide exige au moins une section, une sous-section par section et une question par sous-section. Les clés de section, sous-section, question, option et aide sont des identités d’exécution indépendantes de la langue et doivent être uniques lorsqu’exigé.

| Type | Champs et règles |
| --- | --- |
| `radio` | Question bilingue, au moins deux options bilingues à clé unique, descriptions facultatives et correspondances de résultat facultatives. |
| `text` | Question bilingue, description facultative et longueur maximale de 1 à 10 000. |

Les deux types peuvent être obligatoires et offrir une aide bilingue. Exactement une question détermine le résultat. Elle doit être une question radio obligatoire et chaque option doit correspondre à `recommended` ou `not_recommended`. Le choix d’une nouvelle question décisive efface les correspondances de l’ancienne.

Les questions radio peuvent aussi autoriser un commentaire facultatif ou obligatoire, y compris la question décisive. Réglez cette politique dans le schéma d’agence; à la soumission, le schéma figé détermine si un commentaire manquant bloque la réponse. Le commentaire ne change pas la correspondance Recommandé ou Non recommandé de l’option choisie.

## Créer un schéma pendant la configuration

Dans la page de détail de l’ensemble d’agence, **Créer un schéma** ouvre une courte fenêtre pour l’ordre du membre, un modèle facultatif d’approbation de recommandation de la même agence et **Faire échouer l’ensemble si Non recommandé**. Continuer crée un schéma brouillon appartenant à l’agence avec une question décisive bilingue minimale, l’associe à la configuration dans une transaction et ouvre l’éditeur.

L’ordre doit être un entier positif inutilisé par un membre actif. Le modèle d’approbation, s’il est fourni, doit être un modèle valide appartenant à cette agence. Un échec ne crée ni membre partiel ni schéma orphelin.

Utilisez plutôt **Associer un schéma** lorsque le schéma de l’agence existe déjà.

## Publication du schéma

Enregistrer valide le schéma de travail. Publier autorise de nouveau l’opération de l’agence, crée une ligne de version immuable, marque sa publication comme publiée et avance sa version de publication immuable.

Les recommandations d’exécution pointent vers une ligne de version exacte. La modification et la republication touchent donc seulement le travail futur.

## Configuration de recommandation

Une configuration stocke le type d’entité d’exécution, le nom et la description bilingues, l’approbation finale facultative, l’état et la version du cycle de vie et les membres ordonnés. Chaque membre choisit un schéma de la même agence, un ordre entier unique, une approbation facultative et **Faire échouer l’ensemble si Non recommandé** (désactivé par défaut).

Un plan publiable exige au moins un membre, des ordres contigus commençant à 1, une version publiée de chaque schéma et une configuration publiée de chaque modèle d’approbation. L’ensemble et toutes ses dépendances doivent correspondre au contexte de l’agence et de l’entité.

Publier crée la version 1 et rend la configuration admissible. La modification d’une configuration publiée crée du contenu en attente; Publier fige le prochain plan seulement après validation complète. Le plan immuable comprend la version de schéma, l’indicateur d’échec et la configuration d’approbation de chaque membre ainsi que l’approbation finale.

Les membres peuvent être modifiés ou supprimés logiquement pendant la configuration. La suppression logique retire l’association active sans supprimer le schéma réutilisable ni la filiation historique d’exécution.

## Conséquences à l’exécution

Le démarrage d’un flux matérialise un ensemble depuis son plan publié figé et active le prochain membre de recommandation. Son responsable principal provient de la correspondance de propriétaires figée du flux. Les membres suivants sont créés un à la fois à mesure que les précédents se terminent.

La page directe Recommandation charge le schéma bilingue et les réponses figés. L’enregistrement ou la soumission exige l’affectation exacte à la recommandation, Contributeur pour le propriétaire résolu et un élément d’exécution `active`. La soumission valide les réponses obligatoires, les clés d’option et les longueurs, puis dérive le résultat de la question décisive.

Une approbation de membre s’exécute avant la progression. Sans approbation, ou après sa réussite, Non recommandé fait échouer l’ensemble seulement lorsque l’indicateur publié de ce membre est vrai. Sinon, la prochaine recommandation ou l’approbation finale facultative commence. L’annulation retire les enfants d’exécution en attente sans changer la configuration publiée.

Un flux de soumission d’approbation d’une entente ou modification doit référencer un plan publié et comporter au moins une étape d’approbation. Le détail d’une recommandation peut aussi montrer le dossier d’approbation immuable et haché à un lecteur d’entente autorisé ou à un approbateur affecté. Consultez [Flux de travail](../concepts/workflows.md).

## Modifications concurrentes

Chaque enregistrement ou soumission transmet l’entier `revision` affiché. Le serveur verrouille la recommandation, compare cette valeur et l’incrémente en cas de réussite. Une valeur périmée produit `409 RECOMMENDATION_REVISION_CONFLICT` sans écraser les réponses d’autrui.

Par exemple, deux personnes ouvrent la révision 3. La première enregistre et crée la révision 4. La soumission de révision 3 de la seconde est rejetée. Conservez les changements souhaités, rechargez la révision 4, rapprochez les réponses et soumettez de nouveau. Cette révision de réponse est distincte de la version publiée du schéma figé.

## Échec et récupération

- La publication rejette les membres vides ou non contigus, les schémas non publiés, les références de portée ou d’entité invalides et les modèles d’approbation non publiés.
- La validation du schéma rejette les clés en double, les structures de question invalides et tout autre résultat qu’une seule question décisive valide.
- Les enregistrements d’exécution rejettent le travail qui n’est pas brouillon ou n’est pas affecté et les réponses hors de la définition figée.
- Les changements de configuration concurrents sont revérifiés dans une transaction à autorisation actualisée.
- Les plans et réponses historiques ne sont jamais réécrits lors de la réparation d’une configuration de travail; enregistrez et publiez une version future.

Consultez [Volets](./streams.md), [Modèles d’approbation](./approval-templates.md), [Flux de travail](../concepts/workflows.md) et [Permissions de rôle et affectations exactes](../concepts/rbac.md).
