# Déploiement et reprise

Cette page s’adresse à l’équipe technique qui installe, met à jour et restaure GCS-SSC. Les agents de subventions et contributions peuvent l’utiliser pour comprendre les interruptions de service et les éléments à protéger : dossiers d’entente, pièces jointes privées et paramètres d’accès. Demandez à l’exploitant de confirmer que les dossiers et les pièces peuvent être restaurés avant une livraison ou une restauration.

## Artéfacts pris en charge

`bun run build` construit le SDK public des extensions, l’artéfact Nuxt/Nitro `node-server` et les processus de vidage SQL administratif et de nettoyage du stockage. Le résultat comprend une application Web et une API Node; il ne s’agit pas d’un site entièrement statique.

Le `Dockerfile` à la racine définit le conteneur de production et inclut les espaces de travail d’autorisation, de diagrammes et de sondage du connecteur. Il fixe Bun 1.3.13 pour la construction et Node 24 Bookworm Slim pour l’exécution, puis installe Chromium et LibreOffice Writer. Il copie aussi l’espace de travail `gcs-ssc-authorization` avant l’installation figée. Une construction distante récupère tout sous-module absent au SHA exact du gitlink avant que la copie des sources superpose les extractions locales; Docker et l’aperçu WebContainer produisent ensuite leur migration de démonstration avec le même outil de regroupement. Le processus s’exécute sous l’utilisateur non privilégié `node`.

Pour les déploiements Dockerfile hérités, `railway.json` sélectionne ce Dockerfile, sonde `/api/health` avec un délai de 300 secondes et configure le redémarrage sur échec avec au plus dix tentatives. Docker Compose expose le port hôte 8995 par défaut. Ce sont les valeurs du dépôt; consignez séparément les remplacements propres au déploiement.

## Topologie de persistance

La persistance signifie que l’information enregistrée survit au redémarrage ou au remplacement du conteneur de l’application. La base conserve les dossiers; le fournisseur de pièces jointes conserve les fichiers. Les deux exigent un stockage durable.

Le conteneur utilise PGlite à `/app/.data/pglite` par défaut lorsqu’aucune URL PostgreSQL n’est fournie. Le fichier Compose monte un volume nommé seulement sur ce chemin de base; il ne provisionne pas le stockage des pièces pour chaque fournisseur.

Choisissez explicitement la persistance de la base et des objets. PGlite appartient à une seule instance. PostgreSQL est requis pour des réplicas indépendants. Pour les fichiers, sélectionnez un fournisseur activé par organisme et préparez stockage durable et identifiants selon ses instructions. Un fournisseur local exige son montage persistant; un fournisseur distant partagé doit être accessible à chaque instance Web et de nettoyage. L’hôte n’a pas de repli local automatique.

Changer la sélection d’un organisme touche les écritures futures, pas les objets existants. Ceux-ci exigent encore leur fournisseur, configuration et localisateur enregistrés. Conservez ces implémentations pendant les mises à niveau et restaurations.

L’image utilise l’identité non privilégiée `node`. Préparez les volumes de base et de fournisseur avec la propriété appropriée. Confirmez qu’un redémarrage conserve un dossier et une pièce téléchargeable; la sonde de santé seule ne prouve pas la durabilité des objets.

## Sauvegarde et restauration

Par exemple, restaurer le dossier d’une entente sans son PDF signé rétablit la liste des documents, mais pas le fichier que les agents doivent télécharger. Testez le téléchargement d’une pièce privée et la lecture d’un dossier pour vérifier la reprise.

Sauvegardez la base, les objets, la configuration des fournisseurs et les clés requises comme un ensemble de reprise. Les métadonnées conservent l’identifiant du fournisseur, l’identité de l’objet, le localisateur opaque, le type MIME, la taille et les valeurs bilingues; les octets restent externes. Incluez la file de nettoyage et les audits selon leur rétention. Une sauvegarde de base seule ne restaure pas les documents.

`GET /api/admin/dump` exige `system:read` global et retourne `application/sql` sous le nom `migrations-AAAA-MM-JJ.sql`. Il s'agit d'un amorçage dérivé des migrations, **et non d'un vidage de la base active** : un processus isolé crée une base PGlite temporaire en mémoire, applique les migrations principales ordonnées autres que celle de démonstration, puis produit le SQL du schéma et des migrations sans instructions de propriétaire ni de privilèges. Le fichier ne contient aucun utilisateur, aucune entente, aucune donnée d'extension ni aucun autre dossier métier actif, et exclut la migration de démonstration `9999_seed`.

Le processus est limité à 30 secondes, une seule génération est partagée dans le processus serveur entre les appels concurrents, et chaque appelant déconnecté cesse d'attendre sans annuler le travail encore utile à un autre appelant. Une réponse invalide du processus, une sortie prématurée, un délai dépassé ou un échec de génération produit l'erreur localisée `ADMIN_DUMP_FAILED` avec le code HTTP 500. Cette route ne remplace ni une sauvegarde PostgreSQL de la plateforme ni celle du stockage. Traitez l'artefact comme du matériel de déploiement contrôlé, limitez son accès et sa conservation et testez-le seulement dans un milieu isolé.

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

Un flux GitHub déclenché manuellement dans le dépôt de l’application construit et vérifie une seule image de démonstration publique `linux/amd64`, puis inscrit son condensat GHCR immuable dans `deployment/demo-image.json`. La pile AWS CDK et l’IaC Railway peuvent utiliser la même version. Publier l’image ou modifier le manifeste ne déploie aucune des deux plateformes. Vérifiez `/api/health`, la connexion dans les deux langues et le téléchargement d’un document initial après chaque mise à jour. Conservez le condensat antérieur et une sauvegarde de base compatible; revenir à une image antérieure n’annule pas les migrations.

L’application CDK de démonstration dans `infra/aws` cible la région du Canada central (`ca-central-1`) : CloudFront et un équilibreur privé, une tâche Fargate, PostgreSQL RDS sur une seule zone et EFS chiffré pour les pièces du fournisseur local. Un compartiment S3 privé distinct est provisionné pour un usage futur, mais il n’est pas choisi comme fournisseur de pièces jointes. Le budget CDK envoie des alertes et n’impose aucun plafond de dépense. Le guide AWS dans la source de l’application précise l’amorçage, les identifiants, le déploiement et la reprise; il s’agit d’une architecture de démonstration.

Le fichier `.railway/railway.ts` gère l’environnement GCS Demo existant, conserve ses secrets, son domaine, sa base et ses volumes et utilise l’image figée lorsque le manifeste contient un condensat. Les exploitants examinent `railway config plan` avant `railway config apply`; un commit IaC seul ne l’applique pas. L’ancien `railway.json` demeure une valeur Dockerfile héritée pour d’autres déploiements.

## Services compagnons et bascules propres

La pile de démonstration AWS provisionne maintenant un Portail persistant avec sa propre base RDS et un compartiment privé de pièces jointes S3, ainsi que Metabase avec une base d’application distincte. CloudFront précède les équilibreurs privés. Metabase utilise TLS avec vérification du certificat RDS, des clés de session et de chiffrement conservées comme secrets et un processus privé d’initialisation; les identifiants administratifs restent dans Secrets Manager. L’accès de rapport à GCS n’accorde aucune permission utilisateur GCS. Sauvegardez et surveillez chaque service séparément.

L’IaC Railway conserve les ressources GCS, Portail et Metabase. Le Portail utilise `deployment/portal-demo-image.json` et le secret scellé `PORTAL_AUTH_SECRET`. Un plan de livraison GCS ne doit pas modifier les autres services. Inspectez le plan et les attaches réelles des services et volumes avant l’application : le guide source consigne des limites de relecture des attaches par la CLI; un plan inchangé ne prouve donc pas l’état du stockage. Conservez le volume de fichiers de l’application et les volumes des bases compagnons pendant une bascule de base GCS.

Le schéma utilise des bases initiales par sujet plutôt que des mises à niveau incrémentales. Une livraison de démonstration modifiant le schéma exige une bascule propre explicitement autorisée : arrêter les écritures et la base, détacher et vérifier l’ancien volume, attacher un nouveau volume nommé distinctement, vérifier la préparation de la base, puis déployer l’image exacte vérifiée et tester connexion, dossiers accessibles et persistance documentaire. Consignez séparément la suppression ou suppression en attente de l’ancien volume. Un redéploiement ordinaire réutilise le stockage. N’appliquez pas cette procédure de démonstration jetable aux données de production.

Le manifeste d’image constitue une preuve de construction, pas une affirmation que cette synchronisation a inspecté un déploiement actif. Consultez les guides sources actuels `.railway/README.md` et AWS pour les identités de ressources et la reprise propres au déploiement.

## Réinitialisation de la démonstration Railway dédiée

`bun run railway:demo:reset` est limité à l’ancienne démonstration en mode source dont le service s’appelle `Postgres`. Le mode aperçu est en lecture seule. La disposition actuelle avec image figée et service `GCS DB` est refusée avant les appels Railway; **n’utilisez pas `--execute` dans cette disposition**. Le guide de la source précise les préconditions exactes. Pour le déploiement actuel, préparez la reprise à partir des sauvegardes de la base et du volume des pièces jointes plutôt que de considérer cet outil comme une réinitialisation exécutable.
