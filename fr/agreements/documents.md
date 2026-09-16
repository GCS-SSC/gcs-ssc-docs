# Documents d'entente

L'onglet **Documents** génère des fichiers à partir des modèles du volet de l'entente, énumère les artefacts déjà générés, télécharge leurs octets stockés et les supprime logiquement. Les documents générés sont des instantanés : les modifications ultérieures à l'entente ou au modèle ne mettent pas à jour un fichier existant.

## Configuration et accès requis

| Exigence | Contrat actuel |
| --- | --- |
| Modèle du volet | Il doit être actif, non supprimé, viser `fundingcaseagreement`, appartenir au volet actuel de l'entente et posséder des pièces jointes sources anglaise et française actives. |
| Type de modèle | `docx` ou `html`. La liste de sorties configurée peut comprendre le type natif et `pdf`; les formats natifs incompatibles sont rejetés. |
| Outils de conversion | DOCX vers PDF exige LibreOffice. HTML vers PDF exige le navigateur de Puppeteer. Consultez [Génération de documents](../developer/document-generation.md). |
| Stockage persistant | L’organisme doit sélectionner un fournisseur enregistré. Sauvegardez ses objets et les métadonnées de base nécessaires pour les localiser. Consultez [Configuration de l'exploitation](../operator/configuration.md). |
| Autorisation de l’entente | Lecteur énumère les modèles et fichiers et permet le téléchargement; Contributeur et l’affectation exacte génèrent; Gestionnaire et cette affectation suppriment un artefact. |

Si aucun modèle admissible n'existe, la fenêtre ne propose aucun modèle et la génération demeure désactivée. La disponibilité n'est pas mise en cache de façon permanente : l'onglet charge les modèles à son montage, puis chaque requête de génération revalide le modèle par rapport au volet de l'entente.

## Générer un document

Sélectionnez **Générer**, puis choisissez :

| Champ | Comportement |
| --- | --- |
| Modèle | Prend par défaut le premier modèle admissible retourné selon son identifiant. Le nom et la description suivent la langue de l'interface. |
| Langue | `eng` ou `fra`; la valeur par défaut suit la langue de l'interface et sélectionne la pièce jointe source correspondante. |
| Format de sortie | Revient au premier format permis par le modèle si le choix précédent est incompatible. Un modèle DOCX peut produire `docx` ou `pdf`; un modèle HTML peut produire `html` ou `pdf` lorsque ces sorties sont configurées. |

Le serveur capture les données de l’entente et du modèle, puis lit les octets du fournisseur et effectue le rendu hors de la transaction finale. Avant d’enregistrer, il renouvelle l’autorisation et compare les données centrales actuelles à l’instantané. Une modification concurrente rejette le résultat périmé avec `DOCUMENT_RENDER_INPUT_CHANGED` (409); rechargez l’entente et générez de nouveau. La pièce jointe du fournisseur et le document généré ne sont conservés qu’après ces contrôles. Le nom combine numéro d’entente, nom localisé du modèle, langue et extension, en remplaçant les caractères dangereux.

Un processus serveur accepte au plus deux rendus simultanés par organisme et utilisateur. Si `DOCUMENT_RENDER_BUSY` (429) apparaît, attendez qu’une requête se termine avant de réessayer. Les conversions ont aussi une durée maximale; un délai dépassé ne signifie pas qu’un document utilisable a été enregistré. Actualisez la liste avant de répéter une requête incertaine.

La génération ne constitue pas une vérification de l'état de préparation juridique ni de l'exhaustivité des données. Les valeurs absentes ou vides deviennent `To be confirmed` en anglais et `A confirmer` en français. Révisez chaque artefact avant de l'utiliser.

::: warning Les champs du ministère ne proviennent pas de l'agence
Les valeurs intégrées `department.name`, `department.legalName` et `department.address` contiennent actuellement du texte fixe de Santé Canada. Elles ne suivent pas l'agence configurée de l'entente. Pour une autre agence, n'émettez aucun document qui utilise ces balises avant d'avoir corrigé son contenu de façon indépendante ou d'avoir fourni un contexte de remplacement par une intégration prise en charge.
:::

## Données saisies dans l'instantané

Le contexte intégré comprend les données localisées de l'entente, de l'agence, du programme et du volet; le premier bénéficiaire lié et sa première adresse active; tous les bénéficiaires; les activités actuelles, leurs parties responsables et leurs résultats; les exercices et lignes du budget actuel avec totaux formatés; les engagements; les paiements; les réclamations; et les prévisions. Il fournit aussi des sommaires budgétaires de type annexe et le formatage en dollars canadiens.

Le « bénéficiaire principal » est le premier lien actif bénéficiaire-entente selon l'identifiant de base de données; aucun champ distinct ne permet de choisir un bénéficiaire principal. Les versions actuelles des activités et du budget sont utilisées, tandis que les collections opérationnelles comme les engagements, paiements, réclamations et prévisions comprennent les dossiers non supprimés sans filtre vers un statut final.

Les sources DOCX acceptent les balises pointées et les sections de tableau de Docxtemplater. Les sources HTML acceptent `&#123;&#123; dotted.path &#125;&#125;` et `&#123;&#123;# collection&#125;&#125;...&#123;&#123;/ collection&#125;&#125;`; les valeurs substituées sont échappées pour HTML. La conversion HTML vers PDF désactive JavaScript et bloque les requêtes réseau autres que les ressources `data:` et `about:`. La sortie HTML native conserve le balisage de modèle approuvé et est téléchargée comme fichier HTML.

## Énumérer et télécharger

Le document le plus récent apparaît en premier. Le tableau affiche le nom localisé du modèle enregistré, la langue demandée, le format de sortie, l'horodatage de génération et les actions. Il s'agit d'une liste filtrée côté client, et non d'une requête serveur paginée.

Le téléchargement revérifie l'accès `read` à l'entente et exige que le dossier généré et sa pièce jointe soient actifs et appartiennent à l'entente demandée. La réponse utilise le type MIME, la taille et le nom de fichier stockés dans un en-tête `Content-Disposition` sûr. Le fichier est lu avec son identité de fournisseur et son localisateur enregistrés. Changer le fournisseur des nouveaux fichiers de l’organisme ne déplace pas les documents antérieurs.

## Supprimer et récupérer

La suppression renouvelle l'autorisation `delete` de l'entente, puis active `_deleted = true` sur le document généré et sa pièce jointe commune dans une seule transaction. Elle ne supprime jamais le modèle du volet. Après la validation de la transaction, le serveur tente de supprimer l'objet sous-jacent. L'absence de l'objet est tolérée; tout autre échec est journalisé sous `storage_cleanup_failed`, mais l'API retourne tout de même un succès puisque les métadonnées sont déjà supprimées.

::: warning Le nettoyage du fichier est au mieux
Une suppression réussie peut donc laisser des octets orphelins dans le stockage du fournisseur. Les routes de documents ne peuvent plus les énumérer ni les télécharger. Les exploitants doivent surveiller les erreurs de nettoyage et rapprocher le stockage des métadonnées actives au moyen d'une procédure administrative approuvée; ne rétablissez pas l'accès en effaçant manuellement les indicateurs `_deleted`.
:::

L'interface principale n'offre aucune restauration. Après un résultat de génération incertain, actualisez la liste avant de réessayer afin d'éviter un deuxième instantané. Après un résultat de suppression incertain, actualisez avant de répéter l'action.

## Résumé de l'API

| Route | Permission et résultat |
| --- | --- |
| `GET /api/agreements/{id}/document-templates` | `read`; modèles actifs et compatibles du volet avec les sommaires des deux pièces jointes. |
| `GET /api/agreements/{id}/documents` | `read`; tous les dossiers générés actifs de l'entente. |
| `POST /api/agreements/{id}/documents/generate` | `create`; validation localisée de `templateId`, `language` et `outputFormat`, puis instantané avec autorisation renouvelée. |
| `GET /api/agreements/{id}/documents/{documentId}/download` | `read`; octets stockés seulement lorsque le dossier et la pièce jointe sont actifs et appartiennent à l'entente. |
| `DELETE /api/agreements/{id}/documents/{documentId}` | `delete`; suppression logique transactionnelle des métadonnées, puis nettoyage au mieux de l'objet. |

Les échecs comprennent les réponses localisées pour identifiant absent, entente, modèle ou document introuvable, sortie interdite, validation, stockage, rendu et `LIBREOFFICE_UNAVAILABLE`. Une génération ou un téléchargement échoué ne produit aucun message de réussite; corrigez les données sources, le modèle, les permissions du stockage ou la dépendance de conversion avant de réessayer.
