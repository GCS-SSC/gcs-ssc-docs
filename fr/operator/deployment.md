# Déploiement et reprise

## Artéfacts pris en charge

`bun run build` construit le SDK public des extensions, l’artéfact Nuxt/Nitro `node-server` et le processus de vidage SQL administratif. Le résultat comprend une application Web et une API Node; il ne s’agit pas d’un site entièrement statique.

Le `Dockerfile` à la racine définit le conteneur de production. Il fixe Bun 1.3.13 pour la construction et Node 24 Bookworm Slim pour l’exécution, puis installe Chromium et LibreOffice Writer. Il copie aussi l’espace de travail `gcs-ssc-authorization` avant l’installation figée. Une construction distante récupère tout sous-module absent au SHA exact du gitlink avant que la copie des sources superpose les extractions locales; Docker et l’aperçu WebContainer produisent ensuite leur migration de démonstration avec le même outil de regroupement. Le processus s’exécute sous l’utilisateur non privilégié `node`.

Railway emploie ce Dockerfile et sonde `/api/health`. Docker Compose fournit un câblage local équivalent sur le port hôte 8995 par défaut.

## Topologie de persistance

Le conteneur par défaut correspond à une topologie à instance unique :

```text
/app/.data/pglite  base de données
/app/.data/files   pièces jointes privées et documents produits
```

Montez un stockage persistant pour l’ensemble de `/app/.data`. N’exécutez pas plusieurs réplicas sur un même répertoire PGlite ou une arborescence locale à un nœud. Un déploiement à plusieurs réplicas exige PostgreSQL et un fournisseur de stockage partagé; l’application actuelle ne met en œuvre que le stockage local, donc cette topologie nécessite une modification applicative et non seulement une variable d’environnement.

L’image d’exécution emploie l’identité non privilégiée `node`. Préparez les répertoires montés avec la propriété et les droits qui permettent à cette identité de créer les arborescences privées PGlite et de pièces jointes; n’affaiblissez pas l’identité du service pour compenser un volume mal configuré.

## Sauvegarde et restauration

Sauvegardez la base de données et `GCS_LOCAL_FILE_STORAGE_DIR` comme un même ensemble cohérent. Les lignes de pièces jointes contiennent le fournisseur, le compartiment, la clé d’objet, le type MIME, la taille et les métadonnées bilingues; les octets sont stockés séparément. Une sauvegarde de la base seule ne peut restaurer les documents.

`GET /api/admin/dump` exige `system:read` global et retourne `application/sql` sous le nom `migrations-AAAA-MM-JJ.sql`. Il s'agit d'un amorçage dérivé des migrations, **et non d'un vidage de la base active** : un processus isolé crée une base PGlite temporaire en mémoire, applique les migrations principales ordonnées autres que celle de démonstration, puis produit le SQL du schéma et des migrations sans instructions de propriétaire ni de privilèges. Le fichier ne contient aucun utilisateur, aucune entente, aucune donnée d'extension ni aucun autre dossier métier actif, et exclut la migration de démonstration `9999_seed`.

Le processus est limité à 30 secondes, une seule génération est partagée dans le processus serveur entre les appels concurrents, et chaque appelant déconnecté cesse d'attendre sans annuler le travail encore utile à un autre appelant. Une réponse invalide du processus, une sortie prématurée, un délai dépassé ou un échec de génération produit l'erreur localisée `ADMIN_DUMP_FAILED` avec le code HTTP 500. Cette route ne remplace ni une sauvegarde PostgreSQL de la plateforme ni celle du stockage. Traitez l'artefact comme du matériel de déploiement contrôlé, limitez son accès et sa conservation et testez-le seulement dans un milieu isolé.

Pour PGlite, arrêtez ou suspendez les écritures avant de copier la base persistante et l’arborescence de fichiers. Pour PostgreSQL, utilisez l’outillage de sauvegarde transactionnellement cohérent de la plateforme, puis capturez l’arborescence correspondante. Restaurez dans une instance isolée, vérifiez les migrations et la propriété, testez des lectures authentifiées et des téléchargements privés, puis seulement ensuite réacheminez le trafic.

## Procédure de livraison

1. Consignez les SHA de l’application et des sous-modules.
2. Exécutez la barrière de qualité du dépôt et les vérifications appartenant aux extensions touchées.
3. Construisez avec le bon `ENVIRONMENT_TYPE`; ne déployez jamais une image de développement ou de démonstration en production.
4. Fournissez les secrets et le stockage persistant à l’exécution sans les intégrer à l’image.
5. Démarrez une seule instance, laissez les migrations principales et d’extension se terminer, puis exigez la réussite de `/api/health`.
6. Vérifiez la connexion, une lecture à portée limitée et une opération sur document privé adaptée à la livraison.
7. Surveillez les erreurs de démarrage/migration et conservez l’image antérieure et une sauvegarde vérifiée pour le retour arrière.

Le flux GitHub Pages/WebContainer est une démonstration exécutée dans le navigateur. Sa base PGlite, sa migration de démonstration, ses ressources et ses identifiants ne constituent pas un modèle de production.
