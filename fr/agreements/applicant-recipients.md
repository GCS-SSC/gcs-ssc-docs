# Promoteurs et demandeurs-beneficiaires

L onglet Promoteurs lie des profils de demandeur/beneficiaire a une entente. Le modele source nomme ces dossiers `agreement applicant recipients`; l interface les presente comme promoteurs dans l espace d entente.

## Configuration d une installation vide

| Configuration | Utilite |
| --- | --- |
| Profils demandeur/beneficiaire | La creation d entente exige au moins un identifiant et l onglet permet d ajouter d autres liens. |
| Donnees d agence responsable | La table affiche l agence responsable du profil lie lorsque disponible. |
| Permissions CRUD d’entente | `create` ajoute un lien de promoteur, `update` modifie un lien existant et `delete` le retire par suppression logique. Le sélecteur exige aussi l’accès en lecture à chaque promoteur qu’il expose. |

## Flux de page

L onglet liste les promoteurs lies a l entente. Le selecteur offre les profils de promoteur que l utilisateur peut rattacher.

Les resultats de recherche peuvent changer sans retirer la selection courante. Les promoteurs selectionnes ou preselectionnes sont resolus separement et conservent leur libelle bilingue meme s’ils ne figurent pas sur la page de resultats courante. Si un profil enregistre ne peut plus etre resolu, la selection reste visible comme indisponible afin que l’utilisateur puisse la retirer volontairement.

La table affiche :

| Colonne | Source |
| --- | --- |
| Demandeur/beneficiaire | Nom bilingue du profil demandeur/beneficiaire. |
| Agence responsable | Nom bilingue de l agence du profil. |
| Actions | Modifier avec `agreement:update` ; retirer avec `agreement:delete`. |

## Regles d affaires

| Regle | Comportement |
| --- | --- |
| La creation d entente exige au moins un demandeur/beneficiaire | Le schema rejette un tableau `applicant_recipient_ids` vide. |
| Les doublons sont rejetes a la creation | Le schema signale les selections dupliquees. |
| Les liens enfants doivent pointer vers des profils valides | Les utilisateurs peuvent seulement sauvegarder des liens vers des profils de promoteur existants. |
| Dependence des responsables | Les activites utilisent ces liens comme valeurs de responsables. |
| Contexte de detail | Les pages de detail d engagement listent les demandeurs/beneficiaires de l entente. |

## Notes operationnelles

Creer ou importer les profils demandeur/beneficiaire avant les ententes. Si la creation d entente part d une page promoteur, le formulaire peut preselectionner ce promoteur et l annulation retourne a la section Ententes du promoteur.
