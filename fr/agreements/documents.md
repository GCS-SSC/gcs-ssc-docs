# Documents d entente

L onglet Documents genere des documents d entente a partir de modeles de document portes par le volet et stocke les fichiers generes sur l entente.

## Configuration d une installation vide

| Configuration | Utilite |
| --- | --- |
| Modeles de document du volet | Au moins un modele actif doit exister sur le volet de l entente avant la generation. |
| Pieces jointes du modele | Les modeles exigent des fichiers source anglais et francais. |
| Outils de generation | La sortie PDF exige les outils de generation locaux ou deployes. |
| Permission de mise a jour d entente | Requise pour generer ou supprimer des documents. L acces lecture suffit pour voir et telecharger les documents existants. |

## Flux de generation

L action de generation saisit :

| Champ | Regle |
| --- | --- |
| Modele | Choisi parmi les modeles actifs du volet de l entente. |
| Langue | Anglais ou francais. La valeur par defaut vient de la langue courante de l interface. |
| Format de sortie | Doit faire partie des formats permis par le modele choisi. |

Les dossiers generes affichent le nom, la langue, le format de sortie, la date de generation et les actions. Le telechargement retourne la piece jointe generee. La suppression retire logiquement le document genere de la liste normale.

## Donnees de modele

Les modeles peuvent utiliser des balises de contexte d entente. Les modeles DOCX prennent en charge les balises a doubles accolades comme `agreement.number` et les boucles de section comme `# activities` et `/ activities`. Les modeles HTML utilisent la meme syntaxe de balise et rendent en PDF.

Le contexte integre inclut entente, agence, ministere, programme, volet, beneficiaire principal, tous les beneficiaires, sommaires et lignes budgetaires, activites, resultats, engagements, paiements, reclamations et previsions. Les valeurs manquantes rendent une valeur de remplacement selon la langue au lieu de faire echouer le document.

## Formats de sortie

Les modeles DOCX peuvent generer DOCX ou PDF lorsque ces formats sont actives sur le modele. Les modeles HTML generent seulement PDF.
