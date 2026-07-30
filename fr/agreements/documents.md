# Documents d entente

L onglet Documents genere des documents d entente a partir de modeles de documents portes par le volet et stocke les fichiers generes sur l entente. Il est disponible dans l espace de detail d entente et utilise le volet de l entente pour trouver les modeles admissibles.

## Configuration d une installation vide

| Configuration | Utilite |
| --- | --- |
| Modeles de documents du volet | L onglet Documents peut generer des fichiers seulement depuis les modeles actifs `fundingcaseagreement` du volet de l entente. |
| Fichiers de modele bilingues | Chaque modele de volet exige une piece jointe anglaise et une piece jointe francaise. |
| Outils locaux de generation | La generation DOCX vers PDF et HTML vers PDF exige les outils LibreOffice/Puppeteer. Le developpement local peut utiliser l installateur decrit dans [Demarrage local](../developer/startup.md). |
| Permissions CRUD d’entente | `create` génère un document, `read` énumère et télécharge les documents générés, et `delete` supprime logiquement un document généré. |

## Flux d onglet

L onglet Documents affiche les documents generes pour l entente courante :

| Colonne | Contenu |
| --- | --- |
| Nom | Nom du modele dans la langue courante de l interface. |
| Langue | Langue du document genere, anglais ou francais. |
| Format de sortie | `DOCX` ou `PDF`. |
| Genere le | Horodatage de creation du fichier. |
| Actions | Téléchargement avec `agreement:read` ; suppression avec `agreement:delete`. |

Les lignes de documents generes sont conservees separement du modele source. Supprimer un document genere le retire de la liste normale sans supprimer le modele du volet.

## Modale de generation

L action Generer ouvre une modale avec :

| Champ | Regle |
| --- | --- |
| Modele de document | Modele actif du volet de l entente et du type d entite `fundingcaseagreement`. |
| Langue | Anglais ou francais. La valeur par defaut suit la langue courante de l interface. |
| Format de sortie | Limite aux formats de sortie configures sur le modele choisi. |

Les modeles DOCX peuvent generer DOCX ou PDF lorsque ces formats sont actives. Les modeles HTML generent seulement PDF.

## Contexte du modele

La generation construit un contexte de document depuis l entente et ses dossiers lies, incluant entente, agence, ministere, programme, volet, beneficiaire principal, tous les beneficiaires, adresses, activites, resultats, budgets et lignes budgetaires, engagements, paiements, reclamations et previsions. Les valeurs manquantes utilisent un repli selon la langue afin que la generation puisse se terminer meme si des donnees facultatives sont absentes.

Les modeles DOCX utilisent des balises de style docxtemplater comme `agreement.number` et des boucles de section comme `# activities` et `/ activities`. Les modeles HTML utilisent le meme contexte pour les remplacements de champs et les boucles de collection avant le rendu PDF.

## Telechargement et suppression

Le téléchargement retourne la pièce jointe générée avec le nom de fichier sauvegardé lors de la génération et exige `agreement:read`. La suppression exige `agreement:delete` et supprime logiquement l’enregistrement de document généré.
