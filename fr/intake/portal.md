# Frontière hôte du Portail

Le connecteur du Portail est une extension installée. Le Portail possède les appels, formulaires conçus et soumissions des demandeurs; GCS-SSC possède la possibilité de financement, le dossier du personnel, ses affectations et son évaluation. Ce guide couvre la préparation hôte et les preuves conservées. La configuration du connecteur, les règles de conception et l’interface externe de livraison relèvent de sa documentation.

## Préparer l’hôte

Il s’agit de tâches de configuration pour l’administrateur de l’agence et l’opérateur du connecteur. Le travail habituel de l’agent commence après l’import : trouver la demande dans la file de groupe de l’Accueil, réclamer le dossier, lire les réponses soumises et démarrer l’évaluation choisie. Les demandeurs remplissent leurs formulaires dans le Portail.

1. Créez l’agence, le programme, les volets actifs et la [Possibilité de financement](./opportunities.md). Préparez un statut modifiable non Brouillon et une période courante avant d’accepter de nouveaux imports.
2. Activez et configurez le connecteur pour l’agence propriétaire. Préparez le stockage et les types de pièces jointes de la possibilité si des fichiers sont utilisés.
3. Créez un groupe administratif admissible de cette agence et ajoutez du personnel qualifié. Accordez Lecteur Dossier de financement à cette portée pour la file, Contributeur pour réclamer/travailler, et `manage_assignments` indépendamment aux coordonnateurs.
4. Établissez la correspondance de l’organisation vérifiée du Portail avec le promoteur hôte. Un import interactif exige que l’acteur puisse consulter le promoteur. Un import planifié exige un promoteur actif lié à l’agence configurée par son agence principale ou une entente active via un programme/volet de cette agence.
5. Publiez et sélectionnez les ensembles d’examens et flux de dossier via les volets et la possibilité. Vérifiez qu’un membre qualifié peut réclamer le dossier produit.

Un onglet d’extension de la possibilité peut présenter la conception et la publication du connecteur. Le JSON facultatif du schéma hôte n’est pas un questionnaire du Portail. Le connecteur possède ses révisions et formulaires ordonnés; la projection hôte n’en contient pas les définitions. Une permission d’extension d’agence seule ne permet ni de publier une possibilité ni de créer un dossier.

## Autorisation de publication et d’import

Lorsqu’un utilisateur transmet les renseignements de publication au Portail, GCS-SSC vérifie sa permission courante de modifier la possibilité (`transfer_payment:update`) dans son programme et vérifie que son statut permet la publication. Lorsqu’un utilisateur importe une demande soumise, une vérification distincte exige la permission de créer un dossier (`funding_case:create`) dans ce programme. La possibilité doit permettre les imports et se trouver dans sa période d’ouverture, y compris les deux dates limites. L’utilisateur doit pouvoir consulter le promoteur, et le groupe d’agence choisi doit être admissible à l’affectation. GCS-SSC revérifie ces règles pendant l’enregistrement de l’import.

Pour les développeurs du connecteur : le traitement automatique de la file exige que l’extension déclare `scheduled-intake-import`, indépendamment de la capacité d’import d’ententes. L’hôte revérifie l’enregistrement de l’extension et l’activation d’agence, puis limite l’autorité de service à cette agence configurée. Cela ne crée aucun utilisateur fictif, rôle global ou affectation de travailleur.

L’hôte transmet au connecteur un résumé de publication, appelé projection. Ce résumé indique au connecteur quelle possibilité publier et si la publication est autorisée. Sa période utilise des valeurs UTC couvrant les journées limites inclusives. La projection comprend noms/objectifs bilingues, contexte de propriété et identité hôte stable. La publication utilise l’état actif/modifiable de la projection; un brouillon peut recevoir des formulaires conçus sans être une cible de publication active.

## Preuves enregistrées et soumises

Enregistrer un brouillon dans le Portail ne crée aucun dossier du personnel; le demandeur doit encore soumettre sa demande et le connecteur doit importer cette soumission. L’import soumis transmet possibilité, promoteur, groupe, identité originale système/soumission et export source immuable. L’hôte crée un dossier Brouillon avec groupe non réclamé et retourne son identifiant hôte. La référence de soumission source est distincte; le connecteur conserve la référence hôte dans son reçu d’import.

Le personnel lit l’export conservé — la copie enregistrée des formulaires et réponses soumis — dans **Demande** du dossier. Les preuves de travail hôte peuvent changer par des opérations API autorisées, mais l’export et l’identité originaux restent immuables. Les modifications ultérieures du formulaire ne remplacent pas ces preuves. Examen, flux et approbation sont des processus du personnel distincts de la soumission. L’achèvement d’approbation hôte ne fournit aucune création automatique de décision d’évaluation.

## Reprise et conflits

Réessayer un import avec le même système source et le même identifiant de soumission originaux retourne le même dossier, même après la fermeture de la possibilité. Une reprise avec identifiant hôte connu doit correspondre exactement au dossier et à ses preuves originales. Un identifiant fourni absent ou incompatible ne crée jamais de remplacement. Des preuves soumises modifiées ou une autre correspondance possibilité/promoteur produisent un conflit plutôt que de remplacer le dossier. Pour les intégrations utilisant une référence numérique de compatibilité, une référence déjà associée à un autre dossier produit aussi un conflit. L’identité source originale reste réservée même si le dossier est marqué comme supprimé.

GCS-SSC enregistre ensemble le reçu d’import et le dossier : soit les deux sont enregistrés, soit aucun ne l’est. Si l’accusé de réception du Portail échoue, réessayez la soumission originale avec la même identité, les mêmes preuves et la référence connue. Consultez reçu et dossier avant de conclure qu’un enregistrement manque. Ne changez pas l’identité pour contourner un conflit.

Pour un nouvel import refusé comme fermé, vérifiez dates et statut. Pour le groupe, vérifiez le groupe actif de la même agence et l’admissibilité du personnel. Pour le promoteur, corrigez la correspondance autorisée ou le lien d’agence. Pour un statut Brouillon absent, rétablissez la configuration requise. Réessayez après correction; des paramètres indisponibles ne créent pas un dossier partiel. La reprise de conception, publication et livraison externe reste propre au connecteur.

Par exemple, l’Association communautaire Riverside soumet sa demande pour les installations. Le connecteur l’importe comme dossier hôte 412, qui entre dans la file du groupe de personnel configuré. L’agent réclame le dossier 412 et lit les formulaires soumis. Si l’accusé de réception du connecteur expire, la demande importée conserve cette référence hôte. Réessayer sans modification retourne 412, même après le 31 octobre. Envoyer d’autres réponses sous la même identité produit un conflit sans remplacer la demande originale.

Consultez [Dossiers de financement](./funding-case-intakes.md) pour réclamer et lire les preuves, et [Extensions](../concepts/extensions.md) pour l’activation d’agence.
