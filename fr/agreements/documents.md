# Documents d'entente

Utilisez **Documents** pour produire un fichier d’entente à partir d’un modèle du volet, puis le vérifier et le télécharger. L’onglet conserve aussi les fichiers déjà produits. Chaque fichier représente les données au moment de sa génération : corriger l’entente ou changer le modèle ne l’actualise pas. Produisez un nouveau fichier après les corrections.

## Configuration et accès requis

| Exigence | Ce qu’il vous faut |
| --- | --- |
| Modèle du volet | Il doit être actif, non supprimé, viser `fundingcaseagreement`, appartenir au volet actuel de l'entente et posséder des pièces jointes sources anglaise et française actives. |
| Type de modèle | `docx` ou `html`. La liste de sorties configurée peut comprendre le type natif et `pdf`; les formats natifs incompatibles sont rejetés. |
| Outils de conversion | DOCX vers PDF exige LibreOffice. HTML vers PDF exige le navigateur de Puppeteer. Consultez [Génération de documents](../developer/document-generation.md). |
| Stockage persistant | L’organisme doit sélectionner un fournisseur enregistré. Sauvegardez ses objets et les métadonnées de base nécessaires pour les localiser. Consultez [Configuration de l'exploitation](../operator/configuration.md). |
| Autorisation de l’entente | Lecteur énumère les modèles et fichiers et permet le téléchargement; Contributeur et l’affectation exacte génèrent; Gestionnaire et cette affectation suppriment un artefact. |

Si la fenêtre Générer n’offre aucun modèle, la génération est désactivée. Demandez à votre administrateur de vérifier le volet, la cible, l’état actif et les pièces jointes sources anglaise et française du modèle. L’onglet charge les modèles disponibles à l’ouverture et la génération vérifie que le modèle choisi reste admissible.

## Générer un document

Sélectionnez **Générer**, puis choisissez :

| Champ | Comportement |
| --- | --- |
| Modèle | Prend par défaut le premier modèle admissible retourné selon son identifiant. Le nom et la description suivent la langue de l'interface. |
| Langue | `eng` ou `fra`; la valeur par défaut suit la langue de l'interface et sélectionne la pièce jointe source correspondante. |
| Format de sortie | Revient au premier format permis par le modèle si le choix précédent est incompatible. Un modèle DOCX peut produire `docx` ou `pdf`; un modèle HTML peut produire `html` ou `pdf` lorsque ces sorties sont configurées. |

La génération utilise l’entente et le modèle tels qu’ils étaient au début de la demande. Avant d’enregistrer le fichier, le système vérifie votre accès et si les données sources ont changé. Si quelqu’un a modifié ces données pendant la génération, `DOCUMENT_RENDER_INPUT_CHANGED` (409) empêche l’enregistrement d’un fichier périmé. Rechargez l’entente et recommencez. Le nom du fichier comprend le numéro d’entente, le nom localisé du modèle, la langue et l’extension, avec remplacement des caractères dangereux.

Un processus serveur accepte au plus deux rendus simultanés par organisme et utilisateur. Si `DOCUMENT_RENDER_BUSY` (429) apparaît, attendez qu’une requête se termine avant de réessayer. Les conversions ont aussi une durée maximale; un délai dépassé ne signifie pas qu’un document utilisable a été enregistré. Actualisez la liste avant de répéter une requête incertaine.

Vérifiez chaque document produit avant de l’utiliser. La génération ne vérifie ni sa conformité juridique ni si tous les champs sont remplis. Les valeurs absentes ou vides apparaissent sous `To be confirmed` en anglais et `A confirmer` en français.

Par exemple, produisez un PDF anglais pour une entente de contribution. Vérifiez l’adresse du bénéficiaire, les dates autorisées et les totaux budgétaires. Si une adresse manque, corrigez le dossier source et produisez un remplacement; le PDF précédent conserve son contenu d’origine.

Vérifiez le nom, le nom légal et l’adresse du ministère dans le résultat. Les données intégrées ne fournissent pas de valeurs inventées pour `department.name`, `department.legalName` ou `department.address`; sans données d’une intégration autorisée, ces champs affichent le texte de remplacement. Demandez au responsable du modèle d’inclure le texte juridique correct ou de faire fournir les données par l’intégration avant d’émettre le document.

## Données saisies dans l'instantané

Le contexte intégré comprend les données localisées de l'entente, de l'agence, du programme et du volet; le premier bénéficiaire lié et sa première adresse active; tous les bénéficiaires; les activités actuelles, leurs parties responsables et leurs résultats; les exercices et lignes du budget actuel avec totaux formatés; les engagements; les paiements; les réclamations; et les prévisions. Il fournit aussi des sommaires budgétaires de type annexe et le formatage en dollars canadiens.

Le « bénéficiaire principal » est le premier lien actif bénéficiaire-entente selon l'identifiant de base de données; aucun champ distinct ne permet de choisir un bénéficiaire principal. Les versions actuelles des activités et du budget sont utilisées, tandis que les collections opérationnelles comme les engagements, paiements, réclamations et prévisions comprennent les dossiers non supprimés sans filtre vers un statut final.

Les sources DOCX acceptent les balises pointées et les sections de tableau de Docxtemplater. Les sources HTML acceptent `&#123;&#123; dotted.path &#125;&#125;` et `&#123;&#123;# collection&#125;&#125;...&#123;&#123;/ collection&#125;&#125;`; les valeurs substituées sont échappées pour HTML. La conversion HTML vers PDF désactive JavaScript et bloque les requêtes réseau autres que les ressources `data:` et `about:`. La sortie HTML native conserve le balisage de modèle approuvé et est téléchargée comme fichier HTML.

## Documents de modification

Ouvrez l’onglet **Documents** d’une modification en brouillon pour générer son document. L’onglet exige la lecture de l’entente parent puisque le document contient ses données métier. Générer exige Contributeur et l’affectation exacte à la modification; supprimer exige Gestionnaire et cette affectation. Seule une modification en brouillon dont le parent reste modifiable accepte la génération/suppression. Les fichiers historiques restent lisibles et téléchargeables avec Lecteur du parent.

Configurez un modèle actif lié au volet et ciblant `fundingcaseamendment`, avec les deux pièces linguistiques. La fenêtre Générer, les formats natifs/PDF et les convertisseurs restent les mêmes. Les champs de l’entente parent décrivent toujours l’entente courante. Les champs distincts `amendment` décrivent la proposition, les types/sous-types, dates proposées, instantanés de budget/activités et risque capturé. Avant l’achèvement, le risque est la proposition du brouillon; après, il provient du dossier de soumission immuable. Sans instantané d’un domaine, le contexte de budget/activités de modification utilise le domaine courant du parent.

Par exemple, un brouillon propose une date de fin plus tardive et un nouveau budget. Générez avec le modèle de modification, vérifiez les dates et montants proposés et comparez-les aux champs de l’entente courante. Enregistrez les corrections dans le brouillon et générez un nouveau document; les fichiers existants ne s’actualisent jamais. Si la source change pendant le rendu, `DOCUMENT_RENDER_INPUT_CHANGED` refuse l’enregistrement périmé : rechargez parent et modification, puis recommencez. Les modèles/fichiers d’entente et de clôture sont exclus de cette liste.

## Énumérer et télécharger

Le document le plus récent apparaît en premier. Le tableau affiche le nom localisé du modèle enregistré, la langue demandée, le format de sortie, l'horodatage de génération et les actions. La recherche et la pagination s’effectuent sur le serveur; rechercher l’un des noms bilingues enregistrés réinitialise la page. Les listes d’entente, de modification et de clôture restent distinctes; changer l’URL ne permet pas de télécharger un document d’une autre portée.

Vous devez avoir l’accès de lecture à l’entente pour télécharger un fichier actif qui lui appartient. Le téléchargement fournit le contenu et le nom enregistrés, et non une nouvelle version produite. Les fichiers restent à leur emplacement de stockage initial même si l’organisme change de fournisseur pour les nouveaux fichiers. Si un ancien fichier ne peut être téléchargé, demandez à votre administrateur de vérifier l’accès à ce stockage.

## Supprimer et récupérer

Supprimer un document produit retire celui-ci et sa pièce jointe des listes et téléchargements ordinaires (`_deleted = true`). Cela ne supprime jamais le modèle du volet. Le système tente aussi de retirer le fichier stocké. Si le nettoyage du stockage échoue, la suppression peut quand même réussir dans l’application; l’erreur est consignée sous `storage_cleanup_failed` pour examen par les exploitants.

::: warning Le nettoyage du fichier est au mieux
Une suppression réussie peut donc laisser des octets orphelins dans le stockage du fournisseur. Les routes de documents ne peuvent plus les énumérer ni les télécharger. Les exploitants doivent surveiller les erreurs de nettoyage et rapprocher le stockage des métadonnées actives au moyen d'une procédure administrative approuvée; ne rétablissez pas l'accès en effaçant manuellement les indicateurs `_deleted`.
:::

L'interface principale n'offre aucune restauration. Après un résultat de génération incertain, actualisez la liste avant de réessayer afin d'éviter un deuxième instantané. Après un résultat de suppression incertain, actualisez avant de répéter l'action.

## Résumé de l'API

Cette section sert aux intégrations et au soutien. Utilisez **Générer** et la liste des documents pour le travail documentaire courant.

| Route | Permission et résultat |
| --- | --- |
| `GET /api/agreements/{id}/document-templates` | `read`; modèles actifs et compatibles du volet avec les sommaires des deux pièces jointes. |
| `GET /api/agreements/{id}/documents` | `read`; lignes actives paginées propres à l’entente, avec recherche littérale des noms bilingues enregistrés. |
| `POST /api/agreements/{id}/documents/generate` | `create`; validation localisée de `templateId`, `language` et `outputFormat`, puis instantané avec autorisation renouvelée. |
| `GET /api/agreements/{id}/documents/{documentId}/download` | `read`; octets stockés seulement lorsque le dossier et la pièce jointe sont actifs et appartiennent à l'entente. |
| `DELETE /api/agreements/{id}/documents/{documentId}` | `delete`; suppression logique transactionnelle des métadonnées, puis nettoyage au mieux de l'objet. |

Les échecs comprennent les réponses localisées pour identifiant absent, entente, modèle ou document introuvable, sortie interdite, validation, stockage, rendu et `LIBREOFFICE_UNAVAILABLE`. Une génération ou un téléchargement échoué ne produit aucun message de réussite; corrigez les données sources, le modèle, les permissions du stockage ou la dépendance de conversion avant de réessayer.
