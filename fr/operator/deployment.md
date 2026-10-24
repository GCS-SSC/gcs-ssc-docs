# Déploiement et reprise

Utilisez ce guide pour déployer, mettre à jour et restaurer GCS-SSC. Avant une livraison ou une restauration, vérifiez que vous pouvez récupérer les dossiers d’entente, les pièces jointes privées et les paramètres d’accès.

## Artéfacts pris en charge

`bun run build` construit le SDK public des extensions, l’artéfact Nuxt/Nitro `node-server` et les processus de vidage SQL administratif et de nettoyage du stockage. Le résultat comprend une application Web et une API Node; il ne s’agit pas d’un site entièrement statique.

Le `Dockerfile` à la racine définit le conteneur de production et inclut les espaces de travail d’autorisation, de diagrammes, d’aide guidée et de sondage du connecteur. Il fixe Bun 1.3.13 pour la construction et Node 24 Bookworm Slim pour l’exécution, puis installe Chromium et LibreOffice Writer. Il copie aussi l’espace de travail `gcs-ssc-authorization` avant l’installation figée. Une construction distante récupère tout sous-module absent au SHA exact du gitlink avant que la copie des sources superpose les extractions locales; Docker et l’aperçu WebContainer produisent ensuite leur migration de démonstration avec le même outil de regroupement. Le processus s’exécute sous l’utilisateur non privilégié `node`.

Pour les déploiements Dockerfile hérités, `railway.json` sélectionne ce Dockerfile, sonde `/api/health` avec un délai de 300 secondes et configure le redémarrage sur échec avec au plus dix tentatives. Docker Compose expose le port hôte 8995 par défaut. Ce sont les valeurs du dépôt; consignez séparément les remplacements propres au déploiement.

## Topologie de persistance

La persistance signifie que l’information enregistrée survit au redémarrage ou au remplacement du conteneur de l’application. La base conserve les dossiers; le fournisseur de pièces jointes conserve les fichiers. Les deux exigent un stockage durable.

Le conteneur utilise PGlite à `/app/.data/pglite` par défaut lorsqu’aucune URL PostgreSQL n’est fournie. Le fichier Compose monte des volumes nommés distincts à ce chemin métier et à `/app/.data/pglite-access` pour les accès; il ne provisionne pas le stockage des pièces pour chaque fournisseur.

Choisissez explicitement la persistance de la base et des objets. PGlite appartient à une seule instance. PostgreSQL est requis pour des réplicas indépendants. Pour les fichiers, sélectionnez un fournisseur activé par organisme et préparez stockage durable et identifiants selon ses instructions. Un fournisseur local exige son montage persistant; un fournisseur distant partagé doit être accessible à chaque instance Web et de nettoyage. L’hôte n’a pas de repli local automatique.

Changer la sélection d’un organisme touche les écritures futures, pas les objets existants. Ceux-ci exigent encore leur fournisseur, configuration et localisateur enregistrés. Conservez ces implémentations pendant les mises à niveau et restaurations.

L’image utilise l’identité non privilégiée `node`. Préparez les volumes de base et de fournisseur avec la propriété appropriée. Confirmez qu’un redémarrage conserve un dossier et une pièce téléchargeable; la sonde de santé seule ne prouve pas la durabilité des objets.

Les déploiements PostgreSQL exigent `GCS_ACCESS_DATABASE_URL` sur une instance distincte. Une autre base sur le même hôte et port est refusée. Prévoyez séparément son stockage, ses identifiants, son accès réseau et ses sauvegardes. Les accès ont leur propre conservation et peuvent être indisponibles même si `/api/health` réussit. Vérifiez une recherche Accès autorisée après le déploiement. Consultez [Configuration](configuration.md).

## Sauvegarde et restauration

Par exemple, restaurer le dossier d’une entente sans son PDF signé rétablit la liste des documents, mais pas le fichier que les agents doivent télécharger. Testez le téléchargement d’une pièce privée et la lecture d’un dossier pour vérifier la reprise.

Sauvegardez la base, les objets, la configuration des fournisseurs et les clés requises comme un ensemble de reprise. Les métadonnées conservent l’identifiant du fournisseur, l’identité de l’objet, le localisateur opaque, le type MIME, la taille et les valeurs bilingues; les octets restent externes. Incluez la file de nettoyage et les audits selon leur rétention. Une sauvegarde de base seule ne restaure pas les documents.

`GET /api/admin/dump` exige `system:read` global et retourne `application/sql` sous le nom `migrations-AAAA-MM-JJ.sql`. Ce fichier contient le SQL du schéma et des migrations pour initialiser une base. Un processus isolé crée une base PGlite temporaire en mémoire, applique les migrations principales ordonnées autres que celle de démonstration, puis exporte le SQL sans instructions de propriétaire ni de privilèges. Le fichier ne contient aucun utilisateur, aucune entente, aucune donnée d'extension ni aucun autre dossier métier actif, et exclut la migration de démonstration `9999_seed`.

Le processus a un délai maximal de 30 secondes. Les appelants concurrents d’un même processus serveur partagent une seule génération. Un appelant déconnecté cesse d’attendre sans annuler le travail encore utile à un autre appelant. Une réponse invalide du processus, une sortie prématurée, un délai dépassé ou un échec de génération produit l'erreur localisée `ADMIN_DUMP_FAILED` avec le code HTTP 500. Cette route ne remplace ni une sauvegarde PostgreSQL de la plateforme ni celle du stockage. Traitez l'artefact comme du matériel de déploiement contrôlé, limitez son accès et sa conservation et testez-le seulement dans un milieu isolé.

Pour PGlite, arrêtez ou suspendez les écritures avant de copier la base persistante et les objets des fournisseurs. Pour PostgreSQL, utilisez l’outillage de sauvegarde transactionnellement cohérent de la plateforme, puis capturez les objets correspondants. Restaurez dans une instance isolée, vérifiez les migrations et la propriété, testez des lectures authentifiées et des téléchargements privés, puis seulement ensuite réacheminez le trafic.

## Procédure de livraison

1. Consignez les SHA de l’application et des sous-modules.
2. Exécutez la barrière de qualité du dépôt et les vérifications appartenant aux extensions touchées.
3. Construisez avec le bon `ENVIRONMENT_TYPE`; ne déployez jamais une image de développement ou de démonstration en production.
4. Fournissez les secrets et le stockage persistant à l’exécution sans les intégrer à l’image.
5. Démarrez une seule instance, laissez les migrations principales et d’extension, la vérification des fournisseurs et l’initialisation d’audit se terminer, puis exigez la réussite de `/api/health`.
6. Vérifiez la connexion, une lecture à portée limitée et une opération sur document privé adaptée à la livraison.
7. Surveillez les erreurs de démarrage/migration et conservez l’image antérieure et une sauvegarde vérifiée pour le retour arrière.

Le flux GitHub Pages/WebContainer est une démonstration exécutée dans le navigateur. Sa base PGlite, sa migration de démonstration, ses ressources et ses identifiants ne constituent pas un modèle de production.

## Image de démonstration commune et déploiements

Utilisez **Run workflow** dans `.github/workflows/publish-demo-image.yml` pour construire l’image de démonstration publique commune `linux/amd64`. Un envoi vers `main` ne construit pas d’image. Le flux teste l’image avec PostgreSQL temporaire, publie une étiquette unique et un condensat, vérifie le téléchargement anonyme et fournit un artéfact `demo-image`. Téléchargez cet artéfact pour inscrire son condensat immuable dans `deployment/demo-image.json`; AWS CDK et l’IaC Railway peuvent utiliser la même version.

Les exécutions réussies sur `main` publient aussi `ghcr.io/gcs-ssc/gcs-ssc-demo:latest`. Les autres branches ne changent pas `latest`. Cette étiquette désigne la dernière image vérifiée publiée depuis `main`, sans nécessairement correspondre au dernier commit source. Les manifestes exigent toujours un condensat immuable. Publier l’image ou modifier le manifeste ne déploie aucune plateforme. Vérifiez `/api/health`, la connexion dans les deux langues et le téléchargement d’un document initial après chaque mise à jour. Conservez le condensat antérieur et une sauvegarde de base compatible; revenir à une image antérieure n’annule pas les migrations.

L’application CDK de démonstration dans `infra/aws` cible la région du Canada central (`ca-central-1`) : CloudFront et un équilibreur privé, une tâche Fargate, deux instances PostgreSQL RDS sur une seule zone, pour les données métier et les accès, et EFS chiffré pour les pièces du fournisseur local. Un compartiment S3 privé distinct est provisionné pour un usage futur, mais il n’est pas choisi comme fournisseur de pièces jointes. Le budget CDK envoie des alertes et n’impose aucun plafond de dépense. Le guide AWS dans la source de l’application précise l’amorçage, les identifiants, le déploiement et la reprise; il s’agit d’une architecture de démonstration.

Le fichier `.railway/railway.ts` gère l’environnement GCS Demo existant, conserve ses secrets, son domaine, sa base et ses volumes et utilise l’image figée lorsque le manifeste contient un condensat. Les exploitants examinent `railway config plan` avant `railway config apply`; un commit IaC seul ne l’applique pas. L’ancien `railway.json` demeure une valeur Dockerfile héritée pour d’autres déploiements.

## Actualiser la démonstration AWS

Utilisez le dépôt de l’application avec Bun 1.3.13, AWS CLI v2 et un profil AWS autorisé à gérer la démonstration existante. Définissez `AWS_PROFILE` dans l’environnement ou dans le fichier ignoré `infra/aws/.env`. Depuis la racine de l’application :

```sh
bun run aws:demo:refresh --preview
bun run aws:demo:refresh
# Effacer explicitement la base de démonstration GCS et la réinitialiser :
bun run aws:demo:refresh --reset-db
```

Publiez d’abord l’image voulue depuis `main`. L’aperçu lit le compte, le service et le condensat de `latest` sans modifier le déploiement. La commande ordinaire conserve la base. `--reset-db` supprime définitivement les dossiers GCS, utilisateurs, audits des changements et de sécurité, configurations d’extension et journaux de migration en supprimant les schémas `public`, `extensions` et `audit`. Les fichiers de pièces jointes EFS restent, mais leurs références en base sont supprimées; les données initiales rétablissent les modèles standard. La base distincte des accès, le Portail et Metabase restent intacts. Le traitement vérifie TLS et l'identité des deux bases GCS.

L’outil est limité à la pile existante `GcsSscDemo` dans `ca-central-1`. Il exige un seul déploiement GCS stable et terminé, avec un nombre de tâches souhaité de 1. Il vérifie la connexion RDS et TLS de la nouvelle image avant le déploiement. Pour une réinitialisation, il arrête GCS et attend l’arrêt de toutes les anciennes tâches avant de modifier la base, ce qui cause une interruption. Il vérifie la fin du déploiement, le condensat actif et la disponibilité publique avant d’enregistrer la version dans le fichier local `deployment/demo-image.json`. Propagez cette version séparément et gardez-la à jour avant un prochain déploiement CDK : une actualisation ECS directe ne change pas le modèle enregistré par CloudFormation. Exécutez un seul déploiement ou une seule actualisation à la fois.

Si la vérification d’identité détecte des identifiants SSO expirés, l’outil lance `aws sso login` pour le profil configuré et réessaie une fois. Terminez la connexion dans le navigateur ou avec le code d’appareil. Pour les autres erreurs, corrigez le profil ou les permissions. Aucun changement de déploiement ne survient avant la vérification d’identité réussie.

En cas d’échec, consultez l’ARN de tâche affiché et les journaux GCS dans CloudWatch. Après une réinitialisation, l’outil ne redémarre pas automatiquement l’ancienne version et désactive le retour arrière du déploiement pour éviter un schéma incompatible. Corrigez l’erreur, déployez la nouvelle définition de tâche affichée avec un nombre souhaité de 1, vérifiez la disponibilité, puis rétablissez le coupe-circuit habituel (`enable: true`, `rollback: true`). Une autre actualisation exige un service stable avec un nombre souhaité de 1.

## Services compagnons et bascules propres

La pile de démonstration AWS provisionne un Portail persistant avec sa propre base RDS et un compartiment privé de pièces jointes S3, ainsi que Metabase avec une base d’application distincte. CloudFront précède les équilibreurs privés. Metabase utilise TLS avec vérification du certificat RDS, des clés de session et de chiffrement conservées comme secrets et un processus privé d’initialisation; les identifiants administratifs restent dans Secrets Manager. L’accès de rapport à GCS n’accorde aucune permission utilisateur GCS. Sauvegardez et surveillez chaque service séparément.

L’IaC Railway conserve les ressources GCS, Portail et Metabase. Le Portail utilise `deployment/portal-demo-image.json` et le secret scellé `PORTAL_AUTH_SECRET`. Son manifeste peut aussi conserver un `commit` source facultatif de 40 caractères; cette valeur indique la provenance, tandis que le déploiement utilise toujours le condensat immuable. Un plan de livraison GCS ne doit pas modifier les autres services. Inspectez le plan et les attaches réelles des services et volumes avant l’application : le guide source consigne des limites de relecture des attaches par la CLI; un plan inchangé ne prouve donc pas l’état du stockage. Conservez le volume de fichiers de l’application et les volumes des bases compagnons pendant une bascule de base GCS.

L’application modifie normalement son schéma au moyen de bases initiales par sujet. Une livraison qui change ces bases exige une bascule propre explicitement autorisée :

1. Arrêtez les écritures de l’application et la base.
2. Détachez l’ancien volume et vérifiez qu’il est détaché.
3. Attachez un nouveau volume avec un nom unique et vérifiez que la base est prête.
4. Déployez l’image exacte vérifiée.
5. Testez la connexion, les dossiers accessibles et la persistance des documents.

Consignez séparément la suppression ou suppression en attente de l’ancien volume. Un redéploiement ordinaire réutilise le stockage. N’appliquez pas cette procédure de démonstration jetable aux données de production.

Le correctif du budget d’engagement est une exception incrémentale explicite : `9999_z_commitment_budget_payment_hold` s’exécute après l’entrée existante `9999_seed` et retire les déclencheurs et fonctions obsolètes qui plafonnaient les engagements du côté du budget. Il conserve les dossiers et le journal des données initiales. Déployez-le sans réinitialisation ni nouvelle exécution des données initiales. Le correctif ultérieur du recouvrement des réclamations change seulement le code et n’ajoute aucune migration. Ces livraisons n’autorisent pas d’autres changements de bases initiales sur une base existante.

La base initiale actuelle retire les anciennes structures de grand livre financier et de compatibilité du noyau. Les entrées existantes du journal de migration ne réexécutent pas les migrations initiales modifiées. Une mise à jour ordinaire de l’image ne convertit pas une ancienne base. Pour une démonstration jetable, utilisez la bascule propre autorisée. Pour conserver des dossiers de production, préparez et vérifiez une migration de données distincte avant le déploiement. Ne supprimez jamais des entrées du journal pour forcer une réexécution des données initiales.

Le guide source Railway consigne la livraison des files du 2026-10-23, à partir de la source d'exécution `60e553f4037c91040ef4fb18c2dca851995a56d2`, de la construction `40030239051` et du condensat `sha256:de7e79244eb1878ed24fa5b10a11adf05229adbf1cd91fa7a6a6910dae929da2`. Il consigne le nouveau volume métier `gcs-db-volume-queues-reset-20261023` et le volume distinct `gcs-access-db-volume`. Les contrôles consignés couvrent la santé, la connexion en français et en anglais, les files, le stockage indépendant des accès, treize ententes NCIA, les paiements terminaux réussis 168/172 et les 28 fichiers bilingues des modèles initiaux. L'ancien volume métier et le volume d'accès par défaut créé par erreur étaient détachés et en attente de suppression; leur suppression physique n'a pas été observée. Ce sont des résultats du guide source, pas des contrôles en direct effectués pendant cette mise à jour documentaire. Consultez `.railway/README.md` pour les identités exactes des ressources et la reprise. La révision documentée peut être plus récente que l'image publiée.

La validation des données enregistrées rejette aussi les définitions épinglées d’évaluation mal formées avec `ASSESSMENT_DEFINITION_INVALID` et les sélections relationnelles mal formées de champs personnalisés d’entente avec `AGREEMENT_CUSTOM_FIELDS_INVALID`. Ces sélections doivent être des tableaux d’identifiants d’options. Si ces erreurs suivent une mise à niveau ou une restauration, préservez le dossier concerné et les journaux. Comparez les données enregistrées au contrat déployé, puis préparez une réparation revue ou restaurez un ensemble de reprise compatible. Répéter la soumission ou la génération de documents ne répare pas les données enregistrées.

## Réinitialisation de la démonstration Railway dédiée

`bun run railway:demo:reset` est limité à l’ancienne démonstration en mode source dont le service s’appelle `Postgres`. Le mode aperçu est en lecture seule. La disposition actuelle avec image figée et service `GCS DB` est refusée avant les appels Railway; **n’utilisez pas `--execute` dans cette disposition**. Le guide de la source précise les préconditions exactes. Pour le déploiement actuel, préparez la reprise à partir des sauvegardes de la base et du volume des pièces jointes plutôt que de considérer cet outil comme une réinitialisation exécutable.
