# Travail en arrière-plan et gestion des échecs

Les actions d’approbation, d’examen et d’Achèvement progressent par les requêtes de l’application et sont consignées en base de données. Une notification ou un courriel ne termine pas le travail abandonné. Lorsqu’un agent attend une approbation, examinez le flux enregistré et ses actions disponibles. Le nettoyage du stockage et la maintenance d’audit s’exécutent séparément, selon les règles de reprise ci-dessous.

## Nettoyage durable du stockage

Quand un agent supprime une pièce jointe, l’application crée un travail dans `storage_cleanup_outbox` au sein de la transaction qui retire les métadonnées. La requête tente un lot de nettoyage, mais sa réussite n’exige pas la suppression immédiate de l’objet externe. Une finalisation de téléversement échouée ou la compensation de métadonnées peuvent aussi créer du travail.

L’application en cours traite une opération de nettoyage admissible toutes les cinq secondes par son ordonnanceur durable L1 et purge l’historique terminé chaque heure. Le drainage ponctuel demeure disponible pour le rattrapage ou un processus distinct ayant les mêmes accès à la base, au fournisseur, à la configuration d’organisme et à la clé de secrets.

Depuis une extraction source préparée :

```sh
bun run storage:cleanup:drain
```

Depuis une construction de production complète, avec ses dépendances et son registre de fournisseurs :

```sh
node .output/server/storage-cleanup-drain.mjs
```

Les deux commandes traitent les travaux actuellement admissibles puis se terminent; elles n’attendent pas les futures dates de reprise. Déployez le processus de la même construction que l’application Web. Ne copiez pas seulement le fichier sans ses dépendances.

| Variable | Valeur par défaut et rôle |
| --- | --- |
| `GCS_STORAGE_CLEANUP_WORKER_ID` | Identifiant généré du processus; choisir une valeur distincte pour le suivi opérationnel si nécessaire. |
| `GCS_STORAGE_CLEANUP_BATCH_SIZE` | 20; ramené à l’intervalle 1–100. |
| `GCS_STORAGE_CLEANUP_RETENTION_DAYS` | 30; minimum 1. Concerne seulement les travaux achevés. |

Les processus prennent les travaux en attente dont l’heure est arrivée et reprennent ceux dont le bail a expiré. Les verrous avec `SKIP LOCKED` coordonnent les processus concurrents. Un bail ordinaire réserve un travail à un processus pendant 60 secondes. La suppression du fournisseur doit supporter la répétition : un processus peut s’arrêter après la suppression externe, avant de consigner sa réussite.

Les échecs sont repris après 30 secondes, puis selon des délais exponentiels. Le huitième échec place le travail à `dead_letter`; les traitements ordinaires ne le reprennent plus. La sortie indique `claimed`, `completed`, `retried`, `deadLettered` et `pruned`. Une commande peut réussir tout en signalant des reprises ou des échecs définitifs : surveillez ces compteurs et l’âge de la file, pas seulement le code de sortie.

Par exemple, si le stockage est indisponible à la suppression, la pièce reste supprimée pour l’utilisateur et le travail attend sa prochaine tentative. Rétablissez le service, puis relancez le traitement après cette heure. Si le travail est déjà à `dead_letter`, examinez le fournisseur, l’organisme, l’opération, le nombre de tentatives et `last_error` avant une réparation contrôlée; l’application n’offre pas d’écran général de remise en file. Ne supprimez pas le travail pour effacer une alerte alors que l’objet ou la compensation reste à traiter.

La modification de métadonnées appartenant au fournisseur réserve un travail de restauration avant de changer les données externes. Son bail de requête dure cinq minutes. Une transaction réussie termine la réservation; un échec la libère pour restaurer les métadonnées précédentes. Les travaux `restore_metadata` sont des compensations, pas des suppressions d’objets.

Chaque traitement purge au plus 500 travaux achevés plus anciens que le seuil de conservation. Les travaux en attente, en cours ou à `dead_letter` sont conservés. Sauvegardez la file avec la base. Si les journaux signalent un échec de persistance du nettoyage d’un objet orphelin, aucun travail durable ne sera nécessairement présent : rapprochez l’identité d’objet journalisée avec le stockage et les métadonnées applicatives.

## Ordonnancement durable L1

Nitro propose du travail aux gestionnaires de l’hôte et des extensions toutes les cinq secondes après les migrations et la préparation d’Audit. `l1_queue` conserve la prochaine date d’exécution, le nombre de tentatives, la dernière erreur et le bail de chaque gestionnaire. Les files métier conservent leurs propres charges utiles et preuves de livraison; L1 ne contient ni identifiants secrets ni requêtes métier.

Une réservation en base coordonne les réplicas. Le bail dure deux minutes et se renouvelle toutes les 30 secondes. Une réussite planifie la prochaine exécution à partir de la fin; les intervalles manqués ne s’accumulent pas. Les échecs reprennent sans limite de tentatives, avec délai exponentiel plafonné à 30 minutes ou à l’intervalle configuré s’il est plus long. Une application arrêtée ou en veille reprend le travail admissible à son retour. Un gestionnaire lent ne bloque pas les autres.

Un gestionnaire peut s’exécuter plusieurs fois. Par exemple, un arrêt après l’acceptation d’une livraison par un service externe, mais avant l’enregistrement de sa réussite, peut entraîner une nouvelle tentative de la même livraison. Cette garantie s’appelle une exécution au moins une fois. Les extensions doivent appliquer les règles persistées d’idempotence et de reprise de leur domaine. Les importations exigent la capacité déclarée, l’activation actuelle par organisme et l’autorisation hôte liée à la transaction. Les importations d’entente revérifient aussi le volet exact, tout lien de bénéficiaire vérifié, le statut, la frontière de clôture et l’affectataire principal actif. Elles créent des brouillons; les agents doivent encore vérifier les renseignements importés et suivre les étapes d’achèvement et d’approbation requises. Recevoir des données externes ne les approuve pas.

Par exemple, après une panne du connecteur, rétablissez les identifiants et le réseau, inspectez son écran d’opérations en attente et laissez les livraisons et importations reprendre. Vérifiez `l1_queue.last_error` ainsi que les états de conflit et de reprise de la file métier. Une exécution L1 réussie peut laisser une opération métier en conflit; l’ordonnancement ne corrige pas les données invalides. N’effacez ni bail ni preuve pour masquer une alerte. Consultez la [frontière hôte du Portail](../intake/portal.md).

## Maintenance d’audit

Pour les agents, les preuves d’audit aident à expliquer qui a modifié un dossier et quand. Les opérateurs doivent distinguer les preuves de changement et de sécurité enregistrées des événements d’accès encore en attente d’écriture. Par exemple, immédiatement après l’ouverture d’une entente par un agent, l’événement d’accès peut ne pas encore figurer dans une recherche; un délai seul ne prouve pas l’absence d’accès.

Les preuves de changement et de sécurité et les événements d’accès en file ont des garanties différentes; voir [Audit](../admin/audit.md). Les accès utilisent une file mémoire bornée, vidée par lots. Une perte de processus ou une saturation peut perdre des événements. Ces événements ne sont pas des travaux récupérables de la file de stockage.

L’initialisation de l’audit fait partie de la préparation au démarrage. La rétention s’exécute au démarrage et périodiquement, supprimant les enregistrements expirés par lots bornés. Configurez `GCS_AUDIT_RETENTION_DAYS` et `GCS_ACCESS_RETENTION_DAYS` selon les besoins de conservation. `GCS_ACCESS_LOG_ENABLED=false` désactive les accès, pas les changements ni la sécurité. Surveillez les pertes de file et les échecs de vidage ou de rétention, et tenez compte du délai de persistance lors d’une enquête récente.

## Export administratif et surveillance

Par exemple, restaurer les dossiers d’une entente en base de données sans restaurer les documents de réclamation stockés à l’extérieur laisse un dossier incomplet. Planifiez et vérifiez la restauration de la base de données et du stockage des pièces jointes.

Le vidage SQL administratif utilise un processus construit séparément. Les requêtes concurrentes partagent une génération avec un délai maximal. Les appelants peuvent cesser d’attendre et le nettoyage termine le processus. Si l’export échoue, vérifiez la capacité et les journaux avant de réessayer. Cet export contient le SQL du schéma et des migrations, sans dossiers métier actifs ni pièces jointes externes. Consultez [Sauvegarde et restauration](deployment.md#sauvegarde-et-restauration) pour ses limites et les sauvegardes requises.

Sondez `/api/health` et surveillez les échecs de démarrage, redémarrages, ressources, base, fournisseurs, arriéré de nettoyage et restaurations de sauvegarde. Les extensions concrètes peuvent ajouter leurs propres processus; leur documentation définit ces exigences supplémentaires.

Le rapport `audit.access_queue` comprend `sent`, le nombre d’événements enregistrés avec succès pendant ce vidage, avec les statistiques de file en attente. Un nombre envoyé ne prouve pas que la file est vide; vérifiez le nombre restant et les échecs.
