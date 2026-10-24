# Travail en arrière-plan et gestion des échecs

Les actions d’approbation, d’examen et d’Achèvement progressent par les requêtes de l’application et sont consignées en base de données. Une notification ou un courriel ne termine pas le travail abandonné. Lorsqu’un agent attend une approbation, examinez le flux enregistré et ses actions disponibles. Le nettoyage du stockage et la maintenance d’audit s’exécutent séparément, selon les règles de reprise ci-dessous.

## Nettoyage durable du stockage

Quand un agent supprime une pièce jointe, l’application crée un travail dans `storage_cleanup_outbox` au sein de la transaction qui retire les métadonnées. La requête tente un lot de nettoyage, mais sa réussite n’exige pas la suppression immédiate de l’objet externe. Une finalisation de téléversement échouée ou la compensation de métadonnées peuvent aussi créer du travail.

L’application traite au plus 60 opérations de nettoyage admissibles toutes les cinq minutes au niveau 1 et purge les travaux terminés toutes les 30 minutes au niveau 2. Le drainage ponctuel demeure disponible pour le rattrapage ou un processus distinct ayant les mêmes accès à la base, au fournisseur, à la configuration d’organisme et à la clé de secrets.

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

Les processus prennent les travaux en attente dont l’heure est arrivée et reprennent ceux dont le bail a expiré. Les verrous avec `SKIP LOCKED` coordonnent les processus concurrents. Le traitement réserve une opération à la fois avec un bail de 610 secondes. Les opérations en attente ne perdent donc pas leur bail pendant un appel lent au fournisseur. La suppression du fournisseur doit supporter la répétition : un processus peut s’arrêter après la suppression externe, avant de consigner sa réussite.

Les échecs restent en attente et sont repris sans limite de tentatives. Le délai commence à 30 secondes et double jusqu’à un maximum de 30 minutes. Le traitement planifié les reprend au prochain cycle admissible de cinq minutes; la commande ponctuelle peut les traiter dès leur date de reprise. Sa sortie indique `claimed`, `completed`, `retried`, `deadLettered` et `pruned`; le traitement actuel indique toujours `deadLettered: 0`. Surveillez les échecs répétés et l’âge de la file, ainsi que le code de sortie.

Par exemple, si le stockage est indisponible à la suppression, la pièce reste supprimée pour l’utilisateur et le travail de nettoyage attend. Rétablissez l’accès au fournisseur, puis attendez le prochain cycle admissible ou lancez la commande après la date de reprise. Si les échecs persistent, examinez le fournisseur, l’organisme, l’opération, le nombre de tentatives et `last_error`. Les anciens travaux `dead_letter` sont conservés, mais ne sont pas repris automatiquement. Examinez-les avant une réparation contrôlée. Ne supprimez pas les travaux non résolus pour effacer une alerte.

La modification de métadonnées appartenant au fournisseur réserve un travail de restauration avant de changer les données externes. Son bail de requête dure cinq minutes. Une transaction réussie termine la réservation; un échec la libère pour restaurer les métadonnées précédentes. Les travaux `restore_metadata` sont des compensations, pas des suppressions d’objets.

Chaque traitement purge au plus 500 travaux achevés plus anciens que le seuil de conservation. Les travaux en attente, en cours ou à `dead_letter` sont conservés. Sauvegardez la file avec la base. Si les journaux signalent un échec de persistance du nettoyage d’un objet orphelin, aucun travail durable ne sera nécessairement présent : rapprochez l’identité d’objet journalisée avec le stockage et les métadonnées applicatives.

## Ordonnancement partagé en arrière-plan

L’hôte recherche le travail admissible toutes les cinq secondes. Les gestionnaires choisissent un niveau défini par l’hôte plutôt que leur propre intervalle. Les cycles s’alignent sur les limites horaires UTC.

| Niveau | Fréquence | Délai après un échec terminé |
| --- | --- | --- |
| 0 | 10 secondes | Commence à 10 secondes et double jusqu’à 5 minutes. |
| 1 | 5 minutes | Commence à 5 minutes et double jusqu’à 1 heure. |
| 2 | 30 minutes | Prochain cycle prévu. |
| 3 | 1 heure | Prochain cycle prévu. |

Un nouveau gestionnaire rejoint le prochain cycle futur. Après une exécution lente ou un arrêt, les cycles manqués ne s’accumulent pas. Les niveaux 0 et 1 reprennent au premier cycle à partir de leur date de reprise. Tous les niveaux réessaient sans limite de tentatives. Une réussite efface les échecs consécutifs, la dernière erreur et la date de reprise.

Par exemple, une exécution de niveau 1 qui échoue à `12:00:01 UTC` a sa première date de reprise à `12:05:01 UTC`. Le prochain cycle aligné de cinq minutes est `12:10:00 UTC`. La recherche de travail toutes les cinq secondes peut la lancer après cette limite; elle ne garantit pas une exécution à la date exacte de reprise.

Les gestionnaires partagés utilisent des horaires en base de données et des baux indépendants de deux minutes, renouvelés toutes les 30 secondes. Un bail expiré permet à un autre serveur de reprendre le travail inachevé. Un gestionnaire lent ne bloque pas les autres. L’horaire conserve les identifiants et preuves d’exécution, sans secrets ni charges utiles métier. Les files métier gardent leurs propres requêtes et preuves de livraison.

Un gestionnaire peut s’exécuter plusieurs fois, par exemple après un arrêt entre la livraison externe et l’enregistrement de sa réussite. Les extensions doivent conserver les requêtes et les clés qui empêchent les effets métier en double. Les importations exigent encore la capacité déclarée, l’activation actuelle par organisme et l’autorisation hôte liée à la transaction. Les importations d’entente revérifient aussi le volet exact, le lien du bénéficiaire si nécessaire, le statut, la frontière de clôture et l’affectataire principal actif. Elles créent des brouillons qui exigent encore la vérification par un agent, l’achèvement et l’approbation.

Les gestionnaires de vidage et de conservation des accès s’exécutent séparément dans chaque processus serveur. Leur état reste en mémoire et se réinitialise au redémarrage. Ils ne prennent aucun bail partagé en base et n’attendent pas la préparation de la base métier. Les événements d’accès restent soumis aux limites de perte ci-dessous.

Consultez [Files d’attente en arrière-plan](../admin/queues.md) pour examiner inscriptions, activation, reprises et baux. Après une panne du connecteur, rétablissez ses identifiants et le réseau, puis vérifiez l’erreur du gestionnaire et les conflits de sa file métier. Une exécution réussie ne corrige pas les données métier invalides. Conservez les baux et les preuves de livraison pendant l’enquête. Consultez la [frontière hôte du Portail](../intake/portal.md).

## Maintenance d’audit

Pour les agents, les preuves d’audit aident à expliquer qui a modifié un dossier et quand. Les opérateurs doivent distinguer les preuves de changement et de sécurité enregistrées des événements d’accès encore en attente d’écriture. Par exemple, immédiatement après l’ouverture d’une entente par un agent, l’événement d’accès peut ne pas encore figurer dans une recherche; un délai seul ne prouve pas l’absence d’accès.

Les preuves de changement et de sécurité restent dans la base métier. L’historique des accès utilise un stockage distinct et un tampon mémoire borné avant l’enregistrement. Le tampon accepte au plus 2 000 événements ou 32 Mio. Une perte de processus ou une saturation peut perdre des événements. Ces événements ne sont pas des travaux récupérables de la file de stockage. Consultez [Audit](../admin/audit.md).

Le stockage des accès utilise une instance PostgreSQL distincte ou un répertoire PGlite `-access` distinct. Il s’initialise au besoin. Sa panne ne bloque pas la préparation de la base métier. Les lectures d’historique retournent `503 ACCESS_HISTORY_UNAVAILABLE` si ce stockage est indisponible; elles ne se rabattent pas sur la base métier.

Chaque processus vide son tampon d’accès au niveau 0. Par défaut, un vidage permet dix tentatives d’enregistrement d’au plus 100 lignes chacune. `GCS_ACCESS_LOG_MAX_BATCHES_PER_FLUSH` accepte de 1 à 100 tentatives. La division ou le rejet d’un lot mal formé consomme aussi cette limite. Un échec temporaire conserve le travail pour une tentative ultérieure, sous réserve des limites du tampon et de la survie du processus.

La conservation s’exécute chaque heure au niveau 3, sans traitement au démarrage. Chaque exécution supprime au plus dix lots de 1 000 enregistrements. La conservation des accès s’exécute dans chaque processus sur le stockage distinct; celle des changements et de la sécurité utilise un gestionnaire partagé sur la base métier. Configurez `GCS_AUDIT_RETENTION_DAYS` et `GCS_ACCESS_RETENTION_DAYS` selon les durées requises. `GCS_ACCESS_LOG_ENABLED=false` désactive les accès, pas les changements ni la sécurité. Surveillez les événements perdus, les échecs de vidage, les pannes du stockage et les échecs de conservation lors d’une enquête récente.

## Export administratif et surveillance

Par exemple, restaurer les dossiers d’une entente en base de données sans restaurer les documents de réclamation stockés à l’extérieur laisse un dossier incomplet. Planifiez et vérifiez la restauration de la base de données et du stockage des pièces jointes.

Le vidage SQL administratif utilise un processus construit séparément. Les requêtes concurrentes partagent une génération avec un délai maximal. Les appelants peuvent cesser d’attendre et le nettoyage termine le processus. Si l’export échoue, vérifiez la capacité et les journaux avant de réessayer. Cet export contient le SQL du schéma et des migrations, sans dossiers métier actifs ni pièces jointes externes. Consultez [Sauvegarde et restauration](deployment.md#sauvegarde-et-restauration) pour ses limites et les sauvegardes requises.

Sondez `/api/health` et surveillez les échecs de démarrage, redémarrages, ressources, base, fournisseurs, arriéré de nettoyage et restaurations de sauvegarde. Les extensions concrètes peuvent ajouter leurs propres processus; leur documentation définit ces exigences supplémentaires.

Le rapport `audit.access_queue` comprend `sent`, le nombre d’événements enregistrés avec succès pendant ce vidage, avec les statistiques de file en attente. Un nombre envoyé ne prouve pas que la file est vide; vérifiez le nombre restant et les échecs.
