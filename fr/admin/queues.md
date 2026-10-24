# Examiner les files d’attente en arrière-plan

Utilisez **Files d’attente en arrière-plan** pour examiner le travail planifié de l’hôte et des extensions. Ouvrez `/admin/files` avec la permission globale `system:read`. Une permission d’organisme ou une affectation métier ne donne pas cet accès.

La page est en lecture seule. Elle ne lance aucun gestionnaire, ne change aucun horaire, n’efface aucun bail et ne reprend aucune opération métier.

## Trouver un gestionnaire

1. Recherchez l’identifiant du gestionnaire ou le nom de l’extension.
2. Filtrez par **Propriétaire**, **État** ou **Niveau de file**. Utilisez **Effacer les filtres** pour rétablir la liste complète.
3. Ouvrez **Détails de la planification** du gestionnaire.
4. Sélectionnez **Actualiser** pour obtenir un nouvel instantané. Vérifiez son heure sous **À propos de la planification en arrière-plan** avant de comparer les résultats.

La liste montre le gestionnaire et son propriétaire, l’inscription actuelle, l’admissibilité à l’exécution, le niveau et la prochaine exécution. Le résumé compte les gestionnaires inscrits, activés et conservés. Ces nombres décrivent l’instantané chargé; les filtres réduisent la liste.

| État | Signification |
| --- | --- |
| Inscrit | Ce processus serveur a inscrit le gestionnaire. |
| Activé | L’hôte peut proposer du travail au gestionnaire. Pour une extension, au moins un organisme actif l’a activée. Cela n’autorise pas les importations de tous les organismes. |
| Désactivé | L’extension n’a aucune activation d’organisme admissible actuellement. |
| Planification conservée | La base conserve des données de planification, mais ce processus n’a aucune inscription actuelle. La ligne ne prouve pas qu’un gestionnaire peut s’exécuter. |

Une extension peut apparaître seulement après sa première activation. Un gestionnaire inscrit peut n’avoir aucune donnée de planification avant sa préparation par l’ordonnanceur. Une liste vide décrit le processus qui répond, pas tous les serveurs du déploiement.

## Lire les détails d’exécution

**À propos de la planification en arrière-plan** donne la fréquence, la règle de reprise, le cycle actuel et la prochaine exécution de chaque niveau. Les détails du gestionnaire montrent le dernier cycle terminé ou ignoré, le cycle pris en charge, les échecs consécutifs, la date de reprise, la dernière erreur et la dernière mise à jour.

Pour le travail **Partagée entre les serveurs**, les détails montrent aussi le détenteur, l’expiration et l’état du bail à la capture. Un bail actif indique une prise en charge; il ne prouve pas que le processus fonctionne. Un bail expiré permet la reprise par un autre serveur. Ne l’effacez pas seulement parce qu’une exécution est lente.

Pour le travail dans **Ce processus serveur**, les détails indiquent si le gestionnaire est en cours ou en attente dans le processus qui répond. Cet état reste en mémoire et se réinitialise au redémarrage. Ces gestionnaires n’ont aucun bail partagé. Des requêtes servies par différents réplicas peuvent donc présenter des données locales différentes.

Par exemple, si un connecteur indique **Dernière exécution échouée** et **Nouvel essai prévu**, ouvrez ses détails et lisez **Dernière erreur** et **Nouvel essai au plus tôt**. Rétablissez la dépendance en échec, puis attendez le prochain cycle admissible et sélectionnez **Actualiser**. Vérifiez aussi les opérations du connecteur. Une exécution planifiée réussie ne prouve pas que chaque importation a réussi.

## Reprendre après un échec de chargement

Si une actualisation échoue, la page peut conserver l’instantané précédent et le signaler comme périmé. Sélectionnez **Réessayer** après le rétablissement de la connexion. Un échec de collecte ne retourne pas un nouvel instantané partiel. Sans instantané précédent, la page montre une erreur de chargement sans données de gestionnaire.

Si l’accès devient indisponible, la page efface les résultats privilégiés et les filtres. Vérifiez la permission globale de lecture du système avant de réessayer. Un changement de permissions efface aussi l’ancien instantané avant de charger les données selon les nouvelles permissions.

Utilisez les journaux applicatifs et la file métier pour examiner les erreurs répétées. Cette page ne permet ni de réparer les données métier ni de remettre du travail en file. Consultez [Travail en arrière-plan et gestion des échecs](../operator/background-work.md) pour les délais, le nettoyage du stockage et les règles de reprise.
