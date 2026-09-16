# Travail en arrière-plan et gestion des échecs

Les flux métier progressent par des opérations persistées déclenchées par les requêtes. Aucun service général de notification ou de courriel ne répare les approbations, examens ou achèvements abandonnés. Le nettoyage du stockage et la maintenance d’audit ont leurs propres contrats d’exécution et de reprise.

## Nettoyage durable du stockage

La suppression d’une pièce joint un travail dans `storage_cleanup_outbox` à la transaction qui retire ses métadonnées. La requête tente un lot de nettoyage, mais sa réussite n’exige pas la suppression immédiate de l’objet externe. Une finalisation de téléversement échouée ou la compensation de métadonnées peuvent aussi créer du travail.

Exécutez régulièrement le traitement depuis un planificateur externe disposant de l’accès à la base, du code des fournisseurs enregistrés, de la configuration des organismes et de la clé des secrets d’extension. L’hôte ne démarre pas de boucle périodique de nettoyage du stockage dans Nitro.

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

Les processus prennent les travaux en attente dont l’heure est arrivée et reprennent ceux dont le bail a expiré. Les verrous avec `SKIP LOCKED` coordonnent les processus concurrents. Un bail ordinaire dure 60 secondes. La suppression du fournisseur doit supporter la répétition : un processus peut s’arrêter après la suppression externe, avant de consigner sa réussite.

Les échecs sont repris après 30 secondes, puis selon des délais exponentiels. Le huitième échec place le travail à `dead_letter`; les traitements ordinaires ne le reprennent plus. La sortie indique `claimed`, `completed`, `retried`, `deadLettered` et `pruned`. Une commande peut réussir tout en signalant des reprises ou des échecs définitifs : surveillez ces compteurs et l’âge de la file, pas seulement le code de sortie.

Par exemple, si le stockage est indisponible à la suppression, la pièce reste supprimée pour l’utilisateur et le travail attend sa prochaine tentative. Rétablissez le service, puis relancez le traitement après cette heure. Si le travail est déjà à `dead_letter`, examinez le fournisseur, l’organisme, l’opération, le nombre de tentatives et `last_error` avant une réparation contrôlée; l’application n’offre pas d’écran général de remise en file. Ne supprimez pas le travail pour effacer une alerte alors que l’objet ou la compensation reste à traiter.

La modification de métadonnées appartenant au fournisseur réserve un travail de restauration avant de changer les données externes. Son bail de requête dure cinq minutes. Une transaction réussie termine la réservation; un échec la libère pour restaurer les métadonnées précédentes. Les travaux `restore_metadata` sont des compensations, pas des suppressions d’objets.

Chaque traitement purge au plus 500 travaux achevés plus anciens que le seuil de conservation. Les travaux en attente, en cours ou à `dead_letter` sont conservés. Sauvegardez la file avec la base. Si les journaux signalent un échec de persistance du nettoyage d’un objet orphelin, aucun travail durable ne sera nécessairement présent : rapprochez l’identité d’objet journalisée avec le stockage et les métadonnées applicatives.

## Maintenance d’audit

Les preuves de changement et de sécurité et les événements d’accès en file ont des garanties différentes; voir [Audit](../admin/audit.md). Les accès utilisent une file mémoire bornée, vidée par lots. Une perte de processus ou une saturation peut perdre des événements. Ces événements ne sont pas des travaux récupérables de la file de stockage.

L’initialisation de l’audit fait partie de la préparation au démarrage. La rétention s’exécute au démarrage et périodiquement, supprimant les enregistrements expirés par lots bornés. Configurez `GCS_AUDIT_RETENTION_DAYS` et `GCS_ACCESS_RETENTION_DAYS` selon les besoins de conservation. `GCS_ACCESS_LOG_ENABLED=false` désactive les accès, pas les changements ni la sécurité. Surveillez les pertes de file et les échecs de vidage ou de rétention, et tenez compte du délai de persistance lors d’une enquête récente.

## Export administratif et surveillance

Le vidage SQL administratif utilise un processus construit séparément. Les requêtes partagent une génération en cours, ont un délai maximal, permettent l’abandon par l’appelant et terminent le processus au nettoyage. Un export échoué ne produit aucun téléchargement réussi; vérifiez capacité et journaux avant reprise. Le vidage SQL ne contient pas les objets externes et ne remplace pas une sauvegarde coordonnée du stockage.

Sondez `/api/health` et surveillez les échecs de démarrage, redémarrages, ressources, base, fournisseurs, arriéré de nettoyage et restaurations de sauvegarde. Les extensions concrètes peuvent ajouter leurs propres processus; leur documentation définit ces exigences supplémentaires.
