# Ententes de financement

Les ententes de financement sont des dossiers d’exécution appartenant à un volet de paiements de transfert. Une entente relie la configuration du volet aux promoteurs, aux adresses, aux budgets, aux activités, aux modifications, aux engagements, aux prévisions, aux paiements, aux réclamations, à la surveillance, aux documents, aux examens, aux approbations, aux flux de travail et à une équipe exacte de l’entente.

## Modèle d’accès

La liste des ententes retourne seulement les dossiers actifs que l’utilisateur peut lire au moyen d’une attribution globale, d’agence, de paiement de transfert ou d’une équipe exacte de l’entente. La recherche porte sur le numéro d’entente; le titre anglais ou français; le nom de l’agence, du programme ou du volet; et le nom du type d’entente. Un filtre facultatif d’agence restreint davantage la liste. Chaque ligne fournit ses propres capacités de modification, de suppression et de gestion de l’équipe; les commandes sont activées séparément.

| Niveau exact de l’équipe | Actions sur l’entente |
| --- | --- |
| `read_only` | Lire cette entente et ses enfants pris en charge. |
| `contributor` | Lire et modifier cette entente; lire, créer et modifier ses enfants pris en charge. |
| `full_access` | Actions du contributeur, plus suppression logique. |

L’accès par équipe n’accorde jamais la création d’une nouvelle entente. Le bouton **Nouvelle entente** exige `agreement:create` dans une portée statique, et le serveur vérifie la portée exacte de l’agence et du programme du volet sélectionné.

## Configuration préalable

Avant de créer une entente, configurez :

- une agence, un programme de paiements de transfert et un volet actifs;
- au moins un sous-type d’entente associé à ce volet;
- au moins une base de retenue active du volet;
- une cote de risque facultative si une valeur de risque doit être choisie;
- au moins un promoteur actif que la personne responsable de la création peut lire.

Les onglets ultérieurs exigent les exercices, catégories de coûts, résultats, types de surveillance, engagements, modèles, configurations d’examen ou de flux de travail et autres données de référence correspondants. Une valeur configurée peut disparaître d’une recherche si elle est supprimée, appartient à un autre volet ou se trouve hors de la portée de création ou de modification demandée.

## Créer une entente

Le formulaire initialise **Redistribution** à non et **Retenue** à 10 %. Il contient trois sections principales ainsi que les emplacements fournis par les extensions activées.

| Champ | Règle |
| --- | --- |
| Volet | Volet actif obligatoire dans la portée de création. |
| Sous-type d’entente | Sous-type actif obligatoire appartenant exactement au volet. Le type d’entente est dérivé du sous-type et n’est pas modifiable séparément. |
| Numéro d’entente | Obligatoire, élagué, limité à 15 caractères et unique parmi les ententes actives du volet. |
| Numéro du système financier | Identifiant de type entier non négatif obligatoire; les grands identifiants de base de données sont transmis sous forme de chaînes. |
| Dates d’aide autorisée | Toutes deux obligatoires; la fin ne peut pas précéder le début. |
| Redistribution | Valeur oui-non obligatoire. |
| Titres anglais et français | Tous deux obligatoires et limités à 255 caractères chacun. |
| Descriptions anglaise et française | Toutes deux obligatoires. |
| Retenue | Pourcentage obligatoire de 0 à 100 inclusivement, enregistré à deux décimales. |
| Base de retenue | Base active obligatoire configurée pour le volet. Elle n’est pas limitée à deux libellés codés en dur. |
| Cote de risque | Valeur non négative facultative; si elle est fournie, elle doit correspondre à une cote active du volet. |
| Promoteurs | Au moins un profil actif unique; la personne responsable de la création doit pouvoir lire chaque sélection. Consultez [Promoteurs de l’entente](./applicant-recipients.md). |

Le changement de volet dans le formulaire efface le sous-type, la base de retenue et la cote de risque, puisque ces valeurs appartiennent au volet. La création verrouille les portées d’extension et le volet sélectionné, reconstruit l’autorisation, verrouille chaque promoteur choisi, valide toutes les références entre volets, insère atomiquement l’entente et ses liens de bénéficiaires et enregistre l’entité commune typée de l’entente.

## Correspondance des numéros d’entente

La règle d’unicité active de la base de données interdit le même numéro d’entente dans un volet. De plus, la création et les modifications d’identité comparent le numéro système proposé aux enregistrements externes lisibles de l’Historique du financement dans la même portée de noms d’agence et de programme. Une correspondance proche exige une empreinte de confirmation au serveur.

::: warning Limite actuelle de confirmation
Le formulaire principal d’entente n’affiche actuellement ni la boîte de dialogue d’examen des similarités ni les empreintes de confirmation. Si une correspondance proche dans l’historique externe déclenche `FUNDING_HISTORY_SIMILARITY_CONFIRMATION_REQUIRED`, l’enregistrement échoue et l’erreur d’API standard s’affiche; ce formulaire n’offre aucune action de confirmation prise en charge. Vérifiez s’il s’agit d’un doublon et corrigez le numéro au besoin. Il s’agit d’une limite actuelle de l’application, et non d’un chemin d’enregistrement réussi.
:::

## Espace de détail

La route de détail résout d’abord la portée d’agence, de programme et de volet de l’entente. Les lecteurs voient Général en mode consultation; les personnes autorisées à modifier obtiennent le formulaire intégré. Les commandes de création, de modification et de suppression des enfants sont dérivées séparément. L’espace vertical contient :

| Onglet | Objet |
| --- | --- |
| Général | Classification, identifiants, profil bilingue, dates d’aide, retenue, risque et emplacements de profil des extensions. |
| Adresses | [Adresses de l’entente](./addresses.md) |
| Promoteurs | [Promoteurs de l’entente](./applicant-recipients.md) |
| Budget | [Budget de l’entente](./budget.md) |
| Engagements | [Engagements](./commitments.md) |
| Paiements | [Paiements](./payments.md) |
| Prévisions | [Prévisions](./forecasts.md) |
| Réclamations | [Réclamations et rapprochement](./claims.md) |
| Réclamations | [Réclamations](./claims.md) |
| Surveillances | [Surveillance](./monitors.md) |
| Documents | [Documents](./documents.md) |
| Activités | [Activités](./activities.md) |
| Modifications | Création, instantanés, approbations, annulation et application des modifications. |
| Équipe | Appartenance exacte à l’équipe de l’entente et plafonds de gestion. |

Les extensions activées peuvent ajouter des onglets et des champs au profil. Les routes de détail enfant remplacent l’espace d’onglets parent tout en conservant le contexte de l’entente.

## Protections lors de la modification

Une modification du profil relit et valide la charge utile partielle localisée, puis verrouille les portées d’extension, les volets touchés, l’état du cycle de vie des extensions et l’entente dans une transaction ordonnée. L’autorisation et la portée sont reconstruites après le verrouillage. Si la propriété change pendant l’acquisition des verrous, le serveur fait jusqu’à trois tentatives, puis signale un conflit de portée.

Le déplacement est limité à un autre volet du même programme de paiements de transfert. Il exige aussi l’accès de modification au volet cible, un sous-type, une base de retenue et une cote de risque valides dans la cible ainsi que l’accord de chaque garde de changement de volet fournie par une extension activée. Les champs appartenant au volet doivent être sélectionnés de nouveau. Les relations enfants typées existantes et les données d’extension peuvent empêcher le déplacement.

La réduction ou le déplacement de la période d’aide est refusé lorsqu’un exercice budgétaire actif de l’entente ne chevaucherait plus les dates proposées. Le changement du numéro d’entente ou du volet relance la vérification de similarité avec l’Historique du financement. Une modification réussie appelle le crochet hôte de mise à jour du profil dans la transaction.

## Suppression et rétablissement

La suppression exige un accès effectif `agreement:delete`, demande une confirmation dans la liste, puis verrouille l’entente et reconstruit l’autorisation. Chaque garde de suppression d’entente fournie par une extension activée s’exécute avant la suppression logique du profil. Une garde ou une dépendance de base de données peut refuser l’opération; aucune suppression partielle n’est validée.

Les ententes supprimées logiquement disparaissent des listes actives et des projections de relations. L’application n’offre aucune commande de restauration d’entente. Corrigez l’état dépendant ou la configuration d’extension avant de réessayer une suppression refusée. Après une suppression accidentelle réussie, le rétablissement exige une intervention opérationnelle au niveau de la base de données plutôt que la recréation manuelle de l’historique enfant.

![Détail de l’entente et processus enfant](/screenshots/fr/agreement-child-workflow.png)

_Exemple tiré de l’environnement de développement avec données de démonstration; une installation neuve ne contient pas ces enregistrements._
