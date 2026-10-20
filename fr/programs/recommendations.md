# Schémas et configurations de recommandation

Une recommandation indique si un agent recommande de poursuivre le traitement d'un dossier. Un administrateur de l'agence crée un **schéma**, le formulaire bilingue que les agents remplissent. Un **ensemble de recommandations** ordonne ces formulaires et détermine les approbations et la suite à donner au résultat Non recommandé.

Par exemple, un ensemble pourrait demander une recommandation de financement à un agent de programme, puis une recommandation financière à un agent des finances. Chaque formulaire comporte une question qui détermine le résultat Recommandé ou Non recommandé. L'administrateur décide si un résultat Non recommandé arrête l'ensemble et si des approbations sont nécessaires. Adaptez cet exemple au processus de votre programme.

## Navigation et accès

Ouvrez **Agences**, choisissez l'agence, puis **Ensembles de recommandations**. La liste regroupe les ensembles par type d'entité d'exécution. Ouvrez un ensemble pour gérer son nom, son approbation finale et ses membres ordonnés. Ouvrez un schéma pour modifier ses questions.

Le rôle Lecteur de l'agence permet de consulter ces définitions. Contributeur permet de les créer, de les modifier et de les publier. Gestionnaire permet de supprimer les définitions admissibles à la suppression. Un volet utilise ces définitions par un flux d'agence lié. Une affectation de travail seule ne donne pas accès au catalogue.

## Schéma de recommandation

Le schéma est le modèle du formulaire, et non la recommandation remplie par un agent. Il conserve le type de dossier visé, le nom bilingue, l'agence, l'état, la version, les questions et les règles du résultat. Un schéma créé depuis un ensemble appartient à l'agence de cet ensemble. Les deux noms sont obligatoires et limités à 255 caractères Unicode. Chaque nom linguistique doit être unique parmi les schémas non supprimés de cette agence. Si l'enregistrement signale un nom français ou anglais en double, changez ce nom ou utilisez le schéma existant. Un échec conserve le formulaire et la publication déjà enregistrés.

L'éditeur contient Général et Sections du formulaire. Une définition valide exige au moins une section, une sous-section par section et une question par sous-section. Les clés identifient les sections, sous-sections, questions, options et aides, quelle que soit la langue affichée. Gardez-les uniques lorsque cela est exigé pour que le système relie chaque réponse à la bonne question.

| Type | Champs et règles |
| --- | --- |
| `radio` | Question bilingue, au moins deux options bilingues à clé unique, descriptions facultatives et correspondances de résultat facultatives. |
| `text` | Question bilingue, description facultative et longueur maximale de 1 à 10 000. |

Les deux types peuvent être obligatoires et offrir une aide bilingue. Une seule question détermine le résultat. Elle doit être une question radio obligatoire et chaque option doit correspondre à `recommended` ou `not_recommended`. Le choix d'une nouvelle question décisive efface les correspondances de l'ancienne.

Les questions radio peuvent aussi autoriser un commentaire facultatif ou obligatoire, y compris la question décisive. Réglez cette règle dans le schéma d'agence. Lors de la soumission, la version fixe du schéma détermine si le commentaire est obligatoire. Le commentaire ne change pas la correspondance Recommandé ou Non recommandé de l'option choisie.

## Créer un schéma pendant la configuration

Dans la page de détail de l'ensemble d'agence, sélectionnez **Créer un schéma**. Saisissez l'ordre du membre, choisissez un modèle facultatif d'approbation de recommandation de la même agence et réglez **Faire échouer l'ensemble si Non recommandé**. Continuer crée un schéma brouillon avec un nom bilingue temporaire et une question décisive, l'ajoute à l'ensemble et ouvre l'éditeur. Donnez au formulaire des noms français et anglais utiles avant de publier.

L'ordre doit être un entier de 1 à 32 767 inutilisé par un membre actif. Le modèle d'approbation, s'il est fourni, doit être un modèle valide appartenant à cette agence. Un échec ne crée ni membre partiel ni schéma orphelin.

Utilisez plutôt **Associer un schéma** lorsque le schéma de l'agence existe déjà.

## Publication du schéma

**Enregistrer** vérifie et conserve le formulaire que vous modifiez. **Publier** vérifie de nouveau vos permissions d'agence et rend disponible une copie fixe et numérotée.

Une recommandation déjà commencée conserve la version publiée exacte qui lui a été attribuée. Par exemple, ajouter une question obligatoire de justification et publier une nouvelle version n'ajoute pas cette question à la recommandation existante d'un agent. Le nouveau formulaire s'applique au travail futur.

## Configuration de recommandation

La configuration définit la séquence de recommandations pour un type de dossier. Elle conserve un nom et une description bilingues, une approbation finale facultative, l'état, la version et les membres ordonnés. Un **membre** est un formulaire de cette séquence. Chaque membre choisit un schéma de la même agence, un ordre entier unique, une approbation facultative pour cette recommandation et **Faire échouer l'ensemble si Non recommandé** (désactivé par défaut).

Avant de publier, ajoutez au moins un membre et numérotez les membres à partir de 1, sans sauter de numéro (par exemple, 1, 2, 3). Chaque schéma et chaque modèle d'approbation choisi doit déjà être publié. L'ensemble et toutes ses dépendances doivent correspondre au contexte de l'agence et de l'entité.

**Publier** crée la version 1 et rend la configuration disponible. Les modifications restent en attente jusqu'à la prochaine publication. La publication vérifie tout le plan et enregistre une copie fixe de la version du schéma, de la règle d'échec et de la configuration d'approbation de chaque membre, ainsi que de l'approbation finale.

Pendant la configuration, vous pouvez modifier ou retirer les membres. Retirer un membre l'enlève de la configuration active et renumérote les membres restants. Le schéma réutilisable et l'historique des recommandations déjà créées sont conservés. Pour réutiliser ce formulaire, choisissez **Associer un schéma**. **Créer un schéma** crée un brouillon distinct, même si vous réutilisez l'ordre du membre retiré.

## Conséquences à l'exécution

Au démarrage d'un flux, le système crée un ensemble de recommandations à partir du plan publié fixe choisi pour ce flux. Il démarre la prochaine recommandation et affecte son agent principal selon les affectations d'agents enregistrées dans le flux. Les recommandations suivantes deviennent actives une à la fois à mesure que les précédentes se terminent.

La page Recommandation montre la version fixe du formulaire et les réponses enregistrées pour cette recommandation. Pour enregistrer ou soumettre, vous devez être affecté à cette recommandation et avoir le rôle Contributeur sur le dossier auquel elle appartient. La recommandation doit aussi être active. La soumission valide les réponses obligatoires, les clés d'option et les longueurs, puis détermine le résultat de la question décisive.

Si une recommandation possède une route d'approbation, cette approbation doit réussir avant que l'ensemble puisse avancer. Sans approbation requise, ou après sa réussite, Non recommandé arrête l'ensemble seulement si **Faire échouer l'ensemble si Non recommandé** était activé pour ce membre dans le plan publié. Sinon, la prochaine recommandation ou l'approbation finale facultative commence. L'annulation de l'ensemble retire ses recommandations et approbations en attente sans changer la configuration publiée.

Par exemple, si l'agent de programme choisit Non recommandé et que **Faire échouer l'ensemble si Non recommandé** est activé pour ce membre, l'ensemble s'arrête après la réussite de toute approbation requise du membre. Si la bascule est désactivée, l'ensemble peut poursuivre avec la recommandation financière; la réponse de l'agent reste Non recommandé.

Un flux de soumission d'approbation d'une entente ou d'une modification doit référencer un plan publié et comporter au moins une étape d'approbation. Le détail d'une recommandation peut aussi montrer la collection fixe de documents et de preuves d'approbation à un lecteur d'entente autorisé ou à un approbateur affecté. Consultez [Flux de travail](../concepts/workflows.md).

## Modifications concurrentes

Chaque recommandation enregistrée possède une révision de réponse. Si une autre personne enregistre après votre ouverture du formulaire, votre enregistrement ou soumission produit `409 RECOMMENDATION_REVISION_CONFLICT`. Votre ancienne copie n'écrase pas ses réponses.

Par exemple, deux personnes ouvrent la révision 3. La première enregistre et crée la révision 4. La soumission de révision 3 de la seconde est rejetée. Conservez les changements souhaités, rechargez la révision 4, comparez et conciliez les réponses et soumettez de nouveau. La révision de réponse suit les réponses enregistrées. Elle est distincte de la version fixe du schéma qui définit le formulaire.

## Échec et récupération

- Si la publication échoue, vérifiez que l'ensemble contient des membres numérotés à partir de 1 sans sauter de numéro. Publiez chaque schéma et modèle d'approbation d'abord, puis vérifiez que toutes les références correspondent à l'agence et au type de dossier.
- Si la validation du schéma échoue, vérifiez les clés en double, les sections ou questions incomplètes et la présence d'une seule question décisive valide.
- Si une recommandation ne s'enregistre pas, vérifiez qu'elle est active, que vous y êtes affecté et que vos réponses respectent ses règles de formulaire fixes.
- Si la configuration change pendant votre modification, conservez vos changements, rechargez et vérifiez la configuration récente avant d'enregistrer de nouveau.
- Pour corriger une configuration, enregistrez et publiez une version future. Cela ne change pas les plans historiques ni les réponses des recommandations existantes.

Consultez [Volets](./streams.md), [Modèles d'approbation](./approval-templates.md), [Flux de travail](../concepts/workflows.md) et [Permissions de rôle et affectations exactes](../concepts/rbac.md).
