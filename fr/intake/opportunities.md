# Possibilités de financement

Une possibilité de financement est l’appel de demandes : elle indique le financement offert, les volets participants et la période de réception des demandes. Elle définit une période de demande pour un ou plusieurs volets d’un même programme. Ouvrez **Possibilités de financement** pour chercher, créer ou consulter une possibilité. Sa section **Demandes** présente les dossiers de financement reçus; la possibilité est une configuration, tandis que chaque dossier est un travail distinct du personnel.

## Accès et prérequis

Configurez l’appel avant que le personnel commence à recevoir des demandes. Si vous traitez les demandes plutôt que de configurer les appels, consultez la possibilité pour vérifier les dates et les outils d’évaluation, puis travaillez dans chaque dossier. Demandez à l’administrateur du programme de résoudre les volets, définitions d’évaluation ou configurations de statut manquants.

L’accès utilise la permission `transfer_payment` du programme : Lecteur consulte, Contributeur crée et modifie, Gestionnaire supprime. Les possibilités n’ont aucun registre d’affectations. Consulter une possibilité ne donne pas accès à ses dossiers ou promoteurs.

Préparez une agence, un programme et des volets actifs, ainsi que le statut Brouillon protégé de l’agence. Pour l’évaluation, publiez des ensembles d’examens et flux d’agence visant **Dossier de financement** (`fundingcaseintake`), puis liez-les aux volets concernés. Configurez les types de pièces jointes et le stockage de l’agence avant de recueillir des fichiers. Consultez [Catalogues d’agence](../admin/agency-catalogs.md) et [Volets](../programs/streams.md).

## Créer et modifier

1. Choisissez **Créer une possibilité de financement**, puis le programme. Le changer efface les volets sélectionnés.
2. Sélectionnez de 1 à 100 volets actifs distincts de ce programme. Le programme ne peut changer après la création; les volets modifiés doivent rester dans le même programme.
3. Saisissez les noms et objectifs français et anglais. Les noms sont obligatoires, sans espaces périphériques et limités à 255 caractères; les deux objectifs sont obligatoires.
4. Saisissez les dates d’ouverture et de fermeture. Elles sont obligatoires et la fermeture ne peut précéder l’ouverture.
5. Enregistrez. Le statut Brouillon de l’agence est choisi automatiquement. Annuler abandonne les modifications non enregistrées.

Dans un volet sélectionné, un nom français ou anglais correspondant à une possibilité existante non supprimée est refusé, sans tenir compte de la casse et des espaces périphériques. Les mêmes noms sont permis si les possibilités ne partagent aucun volet. Modifier les volets revérifie cette règle.

Enregistrer une possibilité au statut Brouillon n’ouvre pas les demandes. L’éditeur ordinaire n’offre aucun contrôle pour modifier son statut métier. Suivez le processus configuré de votre agence : une intégration autorisée utilisant l’API hôte peut choisir un statut actif de cette agence. Atteindre la date d’ouverture ou de fermeture ne change pas automatiquement le statut.

Pour les intégrations, l’API accepte aussi un schéma de demande facultatif comme objet ou `null`. L’éditeur ordinaire n’offre aucun éditeur de schéma, et ce schéma n’est pas un formulaire du Portail.

## Choisir l’évaluation et les pièces jointes

Dans **Examens** et **Flux**, liez des définitions publiées d’agence visant les dossiers de financement et disponibles dans au moins un volet sélectionné. Ces sections choisissent les outils d’évaluation que les agents peuvent démarrer dans chaque dossier; choisir un outil ici ne démarre aucun travail d’évaluation. Les nouveaux liens exigent une publication. Un lien existant peut rester après le retrait de publication, sans rendre la définition admissible à un nouveau démarrage. Retirer un lien conserve les versions et preuves enregistrées du travail d’évaluation déjà créé.

Lors d’un changement de volets, chaque définition conservée doit encore être liée à au moins un volet sélectionné. En cas d’échec, retirez d’abord les liens incompatibles de la possibilité ou gardez un volet qui les fournit, puis réessayez. Par exemple, si le volet Immobilisations fournit l’examen sélectionné, retirer ce volet exige aussi de retirer le lien vers cet examen, sauf si un autre volet sélectionné le fournit.

Dans **Pièces jointes**, associez des types actifs de l’agence propriétaire et définissez leur indicateur **Interne**, désactivé par défaut. Jusqu’à 100 types distincts sont permis. Cela définit les catégories de fichiers et les règles de visibilité associées à l’appel; une association n’est ni un téléversement ni une permission de travail sur un dossier. La suppression d’une association conserve son historique.

## Ouverture, fermeture et retrait

Les nouveaux dossiers manuels et imports du Portail exigent un statut d’agence courant actif, autre que Brouillon, modifiable et autre qu’un statut final, ainsi qu’une période comprenant la date courante de la base de données. Les deux dates limites sont inclusives. Les renseignements de publication transmis au Portail exigent aussi un statut permettant la publication. Le serveur revérifie un choix visible au moment de l’enregistrement.

Un statut courant en lecture seule ou final bloque la modification ordinaire et la suppression. Un statut absent ou supprimé bloque aussi les changements. Prolonger la date de fermeture ne déverrouille pas une possibilité ayant un statut final. Gérez le statut selon le processus de l’agence. La suppression refuse aussi une possibilité ayant un dossier non supprimé (`FUNDING_OPPORTUNITY_HAS_CASES`). Conservez une possibilité utilisée et appliquez son processus de fermeture/statut plutôt que de supprimer l’historique. Lorsque la suppression est permise, le dossier est marqué comme supprimé; les preuves des demandes et évaluations sont conservées.

## Exemple et reprise

Pour « Installations communautaires 2026 », sélectionnez les volets Immobilisations et Accessibilité du même programme, saisissez les deux langues et utilisez le 1er au 31 octobre 2026. Publiez un ensemble d’examens de dossier, liez-le au volet Immobilisations, puis sélectionnez-le sur la possibilité. Le 14 octobre, le personnel autorisé peut créer un dossier seulement après le choix d’un statut d’agence modifiable non Brouillon. Le 1er novembre, la création échoue même si ce statut est encore présent.

En cas d’échec d’enregistrement, copiez le texte non enregistré à conserver, rechargez la possibilité et les choix de volet/catalogue, puis vérifiez dates, programme commun, doublons, publication et statut. Si la création du dossier échoue, vérifiez la période et le statut plutôt que de recréer des possibilités. Si l’enregistrement échoue, les liens précédemment enregistrés restent; les liens sélectionnés ne sont pas remplacés en partie.

Continuez avec [Dossiers de financement](./funding-case-intakes.md) et la [Frontière hôte du Portail](./portal.md).
