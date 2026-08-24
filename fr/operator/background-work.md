# Travail en arrière-plan et gestion des échecs

GCS-SSC ne possède aucun système général de files d’attente, de planification, de notification ou d’envoi de courriels côté serveur. Les moteurs d’approbation, d’examen, d’achèvement, de recommandation et de flux progressent au moyen d’opérations persistantes déclenchées par des requêtes. L’exploitant ne doit pas présumer qu’un processus distinct réparera une opération métier abandonnée, sauf si la requête documentée est relancée.

Le vidage SQL administratif est le seul processus serveur construit séparément. Les requêtes partagent une seule génération en cours, sont limitées dans le temps, acceptent l’annulation par l’appelant et terminent le processus lors du nettoyage. Une exportation échouée ou expirée ne produit aucun téléchargement réussi; vérifiez la capacité et les journaux du serveur avant de réessayer.

Les extensions concrètes peuvent ajouter des workers de navigateur ou du travail côté serveur. Leur propre documentation définit les exigences d’empaquetage, de surveillance, de reprise et de rétablissement; la documentation de l’hôte ne présente pas ces processus propres aux extensions comme des services d’arrière-plan du noyau.

Utilisez les journaux de l’application pour le démarrage, les migrations, la répartition et les échecs inattendus, tout en sachant que le dépôt ne configure pas de système universel de journaux structurés ou de métriques. La surveillance de plateforme devrait sonder `/api/health`, observer les redémarrages et les limites de ressources, et ajouter une surveillance d’infrastructure pour la base de données, le disque et les sauvegardes.
