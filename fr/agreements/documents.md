# Documents d'entente

Utilisez **Documents** pour produire un fichier d'entente à partir d'un modèle du volet, puis le vérifier et le télécharger. L'onglet conserve aussi les fichiers déjà produits. Chaque fichier conserve les données utilisées pour le produire. Corriger l'entente ou changer le modèle n'actualise pas un fichier existant. Produisez un nouveau fichier après les corrections.

## Configuration et accès requis

| Exigence | Ce qu'il vous faut |
| --- | --- |
| Modèle du volet | Votre administrateur doit affecter au volet un modèle d'entente actif avec des fichiers sources anglais et français. |
| Type de modèle | `docx` ou `html`. La liste de sorties configurée peut comprendre le type natif et `pdf`; les formats natifs incompatibles sont rejetés. |
| Outils de conversion | DOCX vers PDF exige LibreOffice. HTML vers PDF exige le navigateur de Puppeteer. Consultez [Génération de documents](../developer/document-generation.md). |
| Stockage des fichiers | Votre administrateur doit configurer le stockage des fichiers produits. Consultez [Configuration de l'exploitation](../operator/configuration.md). |
| Autorisation de l'entente | L'accès Lecteur permet de consulter et de télécharger les fichiers. Pour en produire, il faut l'accès Contributeur et une affectation à cette entente. Pour en supprimer, il faut l'accès Gestionnaire et cette affectation. |

Si la fenêtre **Générer** n'offre aucun modèle, vous ne pouvez pas produire de document. Demandez à votre administrateur de vérifier que le modèle est actif, appartient au volet, cible les ententes et possède les deux pièces jointes linguistiques. L'onglet charge les modèles disponibles à l'ouverture et la génération vérifie que le modèle choisi reste admissible.

## Générer un document

L'application vérifie votre affectation actuelle et l'état de l'entente avant d'ouvrir **Générer**, puis avant l'enregistrement. Si l'entente devient en lecture seule ou si vous perdez votre affectation, la fenêtre conserve vos choix. Demandez au gestionnaire responsable de régler la restriction avant de réessayer.

Sélectionnez **Générer**, puis choisissez :

| Champ | Comportement |
| --- | --- |
| Modèle | Prend par défaut le premier modèle admissible retourné selon son identifiant. Le nom et la description suivent la langue de l'interface. |
| Langue | `eng` ou `fra`; la valeur par défaut suit la langue de l'interface et sélectionne la pièce jointe source correspondante. |
| Format de sortie | Revient au premier format permis par le modèle si le choix précédent est incompatible. Un modèle DOCX peut produire `docx` ou `pdf`; un modèle HTML peut produire `html` ou `pdf` lorsque ces sorties sont configurées. |

La génération utilise l'entente et le modèle tels qu'ils étaient au début de la demande. Avant l'enregistrement, le système vérifie votre accès et si les données sources ou le modèle ont changé. Si l'un des deux a changé, `DOCUMENT_RENDER_INPUT_CHANGED` (409) empêche l'enregistrement d'un fichier périmé. Rechargez l'entente et recommencez. Le nom du fichier comprend le numéro d'entente, le nom localisé du modèle, la langue et l'extension, avec remplacement des caractères dangereux.

Vous pouvez lancer au plus deux générations de documents à la fois pour le même organisme. Si `DOCUMENT_RENDER_BUSY` (429) apparaît, attendez qu'une requête se termine avant de réessayer. Les conversions ont aussi une durée maximale; un délai dépassé ne signifie pas qu'un document utilisable a été enregistré. Actualisez la liste avant de répéter une requête incertaine.

Vérifiez chaque document produit avant de l'utiliser. La génération ne vérifie ni sa conformité juridique ni si tous les champs sont remplis. Les valeurs absentes ou vides apparaissent sous `To be confirmed` en anglais et `A confirmer` en français.

Par exemple, produisez un PDF anglais pour une entente de contribution. Vérifiez l'adresse du bénéficiaire, les dates autorisées et les totaux budgétaires. Si une adresse manque, corrigez le dossier source et produisez un remplacement; le PDF précédent conserve son contenu d'origine.

Vérifiez le nom, le nom légal et l'adresse du ministère dans le résultat. Si le modèle ou une intégration ne fournit pas les renseignements du ministère, ces champs affichent le texte de remplacement. Demandez au responsable du modèle d'inclure le texte juridique correct ou de faire fournir les données par l'intégration avant d'émettre le document.

## Données saisies dans l'instantané

Les modèles peuvent utiliser les données suivantes dans la langue choisie :

- Les renseignements sur l'entente, l'organisme, le programme et le volet.
- Tous les bénéficiaires liés, le premier bénéficiaire et sa première adresse active servant de bénéficiaire principal.
- Les activités actuelles, leurs parties responsables et leurs résultats.
- Les exercices et lignes du budget actuel, les totaux formatés et les sommaires budgétaires pour les annexes.
- Les engagements, paiements, réclamations et prévisions.

Les montants peuvent utiliser le format des dollars canadiens.

Le document utilise le premier lien actif de bénéficiaire enregistré comme bénéficiaire principal. Aucun champ distinct ne permet de choisir ce bénéficiaire. Le document utilise les versions actuelles des activités et du budget. Les engagements, paiements, réclamations et prévisions comprennent tous les dossiers non supprimés, y compris ceux encore en cours.

Pour la syntaxe des modèles et les champs d'intégration, consultez [Génération de documents](../developer/document-generation.md).

## Documents de modification

Ouvrez l'onglet **Documents** d'une modification en brouillon pour produire son document. Vous devez avoir accès à la lecture de l'entente puisque le document contient ses données. Pour produire un fichier, il faut l'accès Contributeur et une affectation à la modification. Pour en supprimer un, il faut l'accès Gestionnaire et cette affectation. Les deux actions exigent une modification en brouillon dont l'entente permet encore les modifications. L'accès Lecteur à l'entente permet de consulter et de télécharger les fichiers historiques.

Demandez à votre administrateur de configurer un modèle actif du volet qui cible `fundingcaseamendment` et possède les deux pièces jointes linguistiques. La fenêtre Générer, les formats de sortie et les exigences de conversion restent les mêmes.

Les champs de l'entente décrivent l'entente courante. Les champs distincts `amendment` décrivent les changements proposés, les types et sous-types sélectionnés, les dates proposées, les copies enregistrées du budget et des activités, et le risque. Avant l'achèvement, le risque provient du brouillon. Après, il provient du dossier de soumission fixe. Si la modification n'a pas de copie enregistrée du budget ou des activités, le document utilise les données correspondantes de l'entente courante.

Par exemple, un brouillon propose une date de fin plus tardive et un nouveau budget. Générez avec le modèle de modification, vérifiez les dates et montants proposés et comparez-les aux champs de l'entente courante. Enregistrez les corrections dans le brouillon et générez un nouveau document; les fichiers existants ne s'actualisent jamais. Si la source change pendant le rendu, `DOCUMENT_RENDER_INPUT_CHANGED` empêche l'enregistrement du résultat périmé. Rechargez l'entente et la modification, puis recommencez. Cette liste exclut les modèles et fichiers d'entente et de clôture.

## Énumérer et télécharger

Le document le plus récent apparaît en premier. Le tableau affiche le nom localisé du modèle enregistré, la langue demandée, le format de sortie, l'horodatage de génération et les actions. Recherchez le nom anglais ou français enregistré du document. Une nouvelle recherche commence à la première page. Les documents d'entente, de modification et de clôture ont des listes distinctes.

Vous devez avoir l'accès de lecture à l'entente pour télécharger un fichier actif qui lui appartient. Le téléchargement fournit le contenu et le nom enregistrés, et non une nouvelle version produite. Les fichiers restent à leur emplacement de stockage initial même si l'organisme change de fournisseur pour les nouveaux fichiers. Si un ancien fichier ne peut être téléchargé, demandez à votre administrateur de vérifier l'accès à ce stockage.

## Supprimer et récupérer

Supprimer un document produit retire celui-ci et sa pièce jointe des listes et téléchargements ordinaires. Cela ne supprime jamais le modèle du volet. Le système tente aussi de retirer le fichier stocké. Si le nettoyage du stockage échoue, la suppression peut quand même réussir dans l'application; l'erreur est consignée sous `storage_cleanup_failed` pour examen par les exploitants.

L'interface principale n'offre aucune restauration. Après un résultat de génération incertain, actualisez la liste avant de réessayer afin d'éviter un deuxième instantané. Après un résultat de suppression incertain, actualisez avant de répéter l'action.

En cas d'erreur de génération, demandez à votre administrateur de vérifier les données sources, le modèle, l'accès au stockage et les outils de conversion. Les routes d'intégration et les détails de rendu sont décrits dans [Génération de documents](../developer/document-generation.md).
