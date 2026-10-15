# Schémas et configurations de recommandation

Une recommandation indique si un agent recommande de poursuivre le traitement d’un dossier. Un administrateur de l’agence configure deux éléments réutilisables : un **schéma**, soit le formulaire bilingue auquel les agents répondent, et un **ensemble de recommandations**, qui ordonne ces formulaires et détermine les approbations et la suite à donner au résultat Non recommandé.

Par exemple, un ensemble pourrait demander une recommandation de financement à un agent de programme, puis une recommandation financière à un agent des finances. Chaque formulaire comporte une question qui détermine le résultat Recommandé ou Non recommandé. L’administrateur décide si un résultat Non recommandé arrête l’ensemble et si des approbations sont nécessaires. Adaptez cet exemple au processus de votre programme.

## Navigation et accès

Ouvrez **Agences**, choisissez l’agence, puis **Ensembles de recommandations**. La liste regroupe les ensembles par type d’entité d’exécution. La page de détail gère l’identité, l’approbation finale et les membres ordonnés; la page du schéma modifie les questions. Lecteur de l’agence consulte, Contributeur crée, modifie et publie, et Gestionnaire effectue les suppressions admissibles. Un volet utilise ces définitions d’agence par un flux d’agence lié; les affectations exactes de travail ne donnent pas accès au catalogue.

## Schéma de recommandation

Le schéma est le modèle du formulaire, et non la recommandation remplie par un agent. Il conserve le type de dossier visé, le nom bilingue, l’agence, l’état, la version, les questions et les règles du résultat. Un schéma créé depuis un ensemble appartient à l’agence de cet ensemble. Les deux noms sont obligatoires et limités à 255 caractères Unicode. Chaque nom linguistique doit être unique parmi les schémas non supprimés de cette agence. Si l’enregistrement signale un nom français ou anglais en double, changez ce nom ou utilisez le schéma existant; un échec conserve le formulaire et la publication déjà enregistrés.

L’éditeur contient Général et Sections du formulaire. Une définition valide exige au moins une section, une sous-section par section et une question par sous-section. Les clés identifient les sections, sous-sections, questions, options et aides, quelle que soit la langue affichée. Gardez-les uniques lorsque cela est exigé pour que le système relie chaque réponse à la bonne question.

| Type | Champs et règles |
| --- | --- |
| `radio` | Question bilingue, au moins deux options bilingues à clé unique, descriptions facultatives et correspondances de résultat facultatives. |
| `text` | Question bilingue, description facultative et longueur maximale de 1 à 10 000. |

Les deux types peuvent être obligatoires et offrir une aide bilingue. Une seule question détermine le résultat. Elle doit être une question radio obligatoire et chaque option doit correspondre à `recommended` ou `not_recommended`. Le choix d’une nouvelle question décisive efface les correspondances de l’ancienne.

Les questions radio peuvent aussi autoriser un commentaire facultatif ou obligatoire, y compris la question décisive. Réglez cette politique dans le schéma d’agence; à la soumission, le schéma figé détermine si un commentaire manquant bloque la réponse. Le commentaire ne change pas la correspondance Recommandé ou Non recommandé de l’option choisie.

## Créer un schéma pendant la configuration

Dans la page de détail de l’ensemble d’agence, **Créer un schéma** ouvre une courte fenêtre pour l’ordre du membre, un modèle facultatif d’approbation de recommandation de la même agence et **Faire échouer l’ensemble si Non recommandé**. Continuer crée un schéma brouillon appartenant à l’agence avec une question décisive bilingue minimale, l’associe à la configuration dans une transaction et ouvre l’éditeur.

L’ordre doit être un entier de 1 à 32 767 inutilisé par un membre actif. Le modèle d’approbation, s’il est fourni, doit être un modèle valide appartenant à cette agence. Un échec ne crée ni membre partiel ni schéma orphelin.

Utilisez plutôt **Associer un schéma** lorsque le schéma de l’agence existe déjà.

## Publication du schéma

**Enregistrer** vérifie et conserve le formulaire que vous modifiez. **Publier** vérifie de nouveau vos permissions d’agence et rend disponible une copie fixe et numérotée.

Une recommandation déjà commencée conserve la version publiée exacte qui lui a été attribuée. Par exemple, ajouter une question obligatoire de justification et publier une nouvelle version n’ajoute pas cette question à la recommandation existante d’un agent. Le nouveau formulaire s’applique au travail futur.

## Configuration de recommandation

La configuration définit la séquence de recommandations pour un type de dossier. Elle conserve un nom et une description bilingues, une approbation finale facultative, l’état, la version et les membres ordonnés. Un **membre** est un formulaire de cette séquence. Chaque membre choisit un schéma de la même agence, un ordre entier unique, une approbation facultative pour cette recommandation et **Faire échouer l’ensemble si Non recommandé** (désactivé par défaut).

Avant de publier, ajoutez au moins un membre et numérotez les membres à partir de 1, sans sauter de numéro (par exemple, 1, 2, 3). Chaque schéma et chaque modèle d’approbation choisi doit déjà être publié. L’ensemble et toutes ses dépendances doivent correspondre au contexte de l’agence et de l’entité.

Publier crée la version 1 et rend la configuration admissible. La modification d’une configuration publiée crée du contenu en attente; Publier fige le prochain plan seulement après validation complète. Le plan immuable comprend la version de schéma, l’indicateur d’échec et la configuration d’approbation de chaque membre ainsi que l’approbation finale.

Pendant la configuration, vous pouvez modifier ou retirer les membres. Retirer un membre l’enlève de la configuration active, mais conserve son schéma réutilisable et l’historique des recommandations déjà créées.

## Conséquences à l’exécution

Au démarrage d’un flux, le système crée un ensemble de recommandations à partir du plan publié fixe choisi pour ce flux. Il démarre la prochaine recommandation et affecte son agent principal selon la correspondance de responsables enregistrée dans le flux. Les recommandations suivantes sont créées une à la fois à mesure que les précédentes se terminent.

La page Recommandation montre la version du formulaire fixée pour cette recommandation et ses réponses enregistrées. L’enregistrement ou la soumission exige l’affectation exacte à la recommandation, le rôle Contributeur pour le propriétaire résolu et un élément d’exécution `active`. La soumission valide les réponses obligatoires, les clés d’option et les longueurs, puis détermine le résultat de la question décisive.

Si une recommandation possède une route d’approbation, cette approbation doit réussir avant que l’ensemble puisse avancer. Sans approbation, ou après sa réussite, Non recommandé fait échouer l’ensemble seulement lorsque l’indicateur publié de ce membre est vrai. Sinon, la prochaine recommandation ou l’approbation finale facultative commence. L’annulation de l’ensemble retire ses recommandations et approbations en attente sans changer la configuration publiée.

Par exemple, si l’agent de programme choisit Non recommandé et que **Faire échouer l’ensemble si Non recommandé** est activé pour ce membre, l’ensemble s’arrête après la réussite de toute approbation requise du membre. Si la bascule est désactivée, l’ensemble peut poursuivre avec la recommandation financière; la réponse de l’agent reste Non recommandé.

Un flux de soumission d’approbation d’une entente ou d’une modification doit référencer un plan publié et comporter au moins une étape d’approbation. Le détail d’une recommandation peut aussi montrer le dossier d’approbation immuable et haché à un lecteur d’entente autorisé ou à un approbateur affecté. Consultez [Flux de travail](../concepts/workflows.md).

## Modifications concurrentes

Chaque enregistrement ou soumission transmet l’entier `revision` affiché. Le serveur verrouille la recommandation, compare cette valeur et l’incrémente en cas de réussite. Une valeur périmée produit `409 RECOMMENDATION_REVISION_CONFLICT` sans écraser les réponses d’autrui.

Par exemple, deux personnes ouvrent la révision 3. La première enregistre et crée la révision 4. La soumission de révision 3 de la seconde est rejetée. Conservez les changements souhaités, rechargez la révision 4, comparez et conciliez les réponses et soumettez de nouveau. Cette révision de réponse est distincte de la version publiée du schéma figé.

## Échec et récupération

- La publication rejette les membres vides ou non contigus, les schémas non publiés, les références de portée ou d’entité invalides et les modèles d’approbation non publiés.
- La validation du schéma rejette les clés en double, les structures de question invalides et tout autre résultat qu’une seule question décisive valide.
- Les enregistrements d’exécution rejettent le travail qui n’est pas actif ou n’est pas affecté et les réponses hors de la définition figée.
- Les changements de configuration concurrents sont revérifiés dans une transaction à autorisation actualisée.
- Les plans et réponses historiques ne sont jamais réécrits lors de la réparation d’une configuration de travail; enregistrez et publiez une version future.

Consultez [Volets](./streams.md), [Modèles d’approbation](./approval-templates.md), [Flux de travail](../concepts/workflows.md) et [Permissions de rôle et affectations exactes](../concepts/rbac.md).
