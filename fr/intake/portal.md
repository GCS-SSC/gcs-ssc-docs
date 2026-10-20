# Recevoir les demandes du Portail

Les demandeurs utilisent le Portail pour trouver les appels, remplir les formulaires et soumettre leur demande. Le connecteur importe les demandes soumises dans GCS-SSC, où le personnel les réclame et les évalue.

Ce guide explique comment préparer GCS-SSC et reprendre un import. Pour la configuration du connecteur, la conception des formulaires et la livraison externe, consultez sa documentation.

## Préparer GCS-SSC

L'administrateur de l'agence et l'opérateur du connecteur effectuent cette configuration. Après l'import, les agents trouvent la demande dans la file de groupe de l'Accueil, réclament le dossier, lisent les réponses soumises et démarrent l'évaluation choisie.

1. Créez l'agence, le programme, les volets actifs et la [Possibilité de financement](./opportunities.md). Préparez un statut modifiable non Brouillon et une période courante avant d'accepter de nouveaux imports.
2. Activez et configurez le connecteur pour l'agence propriétaire. Préparez le stockage et les types de pièces jointes de la possibilité si des fichiers sont utilisés.
3. Créez un groupe administratif admissible de cette agence et ajoutez du personnel qualifié. Accordez l'accès Lecteur aux dossiers de financement dans le programme pour voir la file et Contributeur pour réclamer un dossier et y travailler. Accordez aux coordonnateurs la permission distincte **Gérer les affectations**.
4. Établissez la correspondance de l'organisation vérifiée du Portail avec le promoteur hôte. Pour importer manuellement, vous devez pouvoir consulter le promoteur. Les imports planifiés exigent un promoteur actif lié à l'agence configurée, soit comme agence principale, soit par une entente non supprimée dans les programmes et volets de cette agence.
5. Publiez et sélectionnez les ensembles d'examens et flux de dossier via les volets et la possibilité. Vérifiez qu'un membre qualifié peut réclamer le dossier produit.

Un onglet d'extension de la possibilité peut présenter la conception et la publication du connecteur. Le JSON facultatif du schéma hôte n'est pas un questionnaire du Portail. Le connecteur possède ses révisions et formulaires ordonnés; les renseignements que GCS-SSC fournit au connecteur ne contiennent pas les définitions de ces formulaires. L'accès aux paramètres de l'extension pour l'agence ne permet pas à lui seul de publier une possibilité ou de créer un dossier.

## Autorisation de publication et d'import

Lorsqu'un utilisateur transmet les renseignements de publication au Portail, GCS-SSC vérifie sa permission courante de modifier la possibilité (`transfer_payment:update`) dans son programme et vérifie que son statut permet la publication. Lorsqu'un utilisateur importe une demande soumise, une vérification distincte exige la permission de créer un dossier (`funding_case:create`) dans ce programme. La possibilité doit permettre les imports et se trouver dans sa période d'ouverture, y compris les deux dates limites. L'utilisateur doit pouvoir consulter le promoteur, et le groupe d'agence choisi doit être admissible à l'affectation. GCS-SSC revérifie ces règles pendant l'enregistrement de l'import.

Le traitement automatique de la file exige un connecteur qui prend en charge les imports planifiés de dossiers. GCS-SSC vérifie que le connecteur est enregistré et activé pour l'agence configurée. Ces imports n'affectent aucun membre du personnel au dossier.

GCS-SSC transmet au connecteur un résumé contenant les noms et objectifs bilingues de la possibilité, son agence et son programme, son identifiant hôte et son admissibilité à la publication. Les dates d'ouverture et de fermeture comprennent les journées limites complètes en UTC. Vous pouvez préparer des formulaires pour une possibilité Brouillon, mais vous ne pouvez pas la publier comme appel actif.

## Preuves enregistrées et soumises

Enregistrer un brouillon dans le Portail ne crée aucun dossier du personnel. Le demandeur doit soumettre sa demande, puis le connecteur doit l'importer. Chaque import comprend la possibilité, le promoteur, le groupe de personnel, le système source et l'identifiant de soumission originaux, ainsi qu'une copie non modifiable des données soumises. GCS-SSC crée un dossier Brouillon affecté au groupe, sans utilisateur affecté, puis retourne son identifiant. La référence de soumission source est distincte; le connecteur conserve la référence hôte dans son reçu d'import.

Le personnel lit la copie enregistrée des formulaires et réponses soumis dans **Demande** du dossier. Les intégrations autorisées peuvent modifier les renseignements de travail de la demande dans GCS-SSC. La copie originale soumise et l'identité source ne peuvent pas changer. Les modifications ultérieures du formulaire ne remplacent pas ces preuves. Examen, flux et approbation sont des processus du personnel distincts de la soumission. L'achèvement de l'approbation ne crée pas automatiquement une décision d'évaluation.

## Reprise et conflits

Réessayer un import avec le même système source et le même identifiant de soumission originaux retourne le même dossier, même après la fermeture de la possibilité. Une reprise avec identifiant hôte connu doit correspondre exactement au dossier et à ses preuves originales. Un identifiant fourni absent ou incompatible ne crée jamais de remplacement. Des preuves soumises modifiées ou un changement de possibilité ou de promoteur lié produisent un conflit plutôt que de remplacer le dossier. Pour les intégrations utilisant une référence numérique de compatibilité, une référence déjà associée à un autre dossier produit aussi un conflit. L'identité source originale reste réservée même si le dossier est marqué comme supprimé.

GCS-SSC enregistre ensemble le reçu d'import et le dossier. Les deux sont enregistrés, ou aucun ne l'est. Si l'accusé de réception du Portail échoue, réessayez la soumission originale avec la même identité, les mêmes preuves et la référence connue. Consultez reçu et dossier avant de conclure qu'un enregistrement manque. Ne changez pas l'identité pour contourner un conflit.

Pour un nouvel import refusé comme fermé, vérifiez dates et statut. Pour le groupe, vérifiez le groupe actif de la même agence et l'admissibilité du personnel. Pour le promoteur, corrigez la correspondance autorisée ou le lien d'agence. Pour un statut Brouillon absent, rétablissez la configuration requise. Réessayez après correction; des paramètres indisponibles ne créent pas un dossier partiel. Consultez la documentation du connecteur pour résoudre les échecs d'enregistrement de formulaire, de publication ou de livraison externe.

Par exemple, l'Association communautaire Riverside soumet sa demande pour les installations. Le connecteur l'importe comme dossier hôte 412, qui entre dans la file du groupe de personnel configuré. L'agent réclame le dossier 412 et lit les formulaires soumis. Si l'accusé de réception du connecteur expire, la demande importée conserve cette référence hôte. Réessayer sans modification retourne 412, même après le 31 octobre. Envoyer d'autres réponses sous la même identité produit un conflit sans remplacer la demande originale.

Consultez [Dossiers de financement](./funding-case-intakes.md) pour réclamer et lire les preuves, et [Extensions](../concepts/extensions.md) pour l'activation d'agence.
