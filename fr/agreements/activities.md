# Activites d entente

L onglet Activites enregistre les activites bilingues, les resultats attendus, les dates, les resultats du volet et les responsables. Les activites sont des enfants d entente integres; elles n ont pas de page de detail separee.

## Configuration d une installation vide

| Configuration | Utilite |
| --- | --- |
| Resultats du volet | Le selecteur de resultats lit les resultats actifs configures pour le volet de l entente. |
| Liens demandeur/beneficiaire de l entente | Les responsables sont choisis parmi les demandeurs/beneficiaires deja lies a l entente. |
| Permissions CRUD d’entente | `create` ajoute une activité et charge ses recherches de création, `update` modifie une activité existante et ses recherches, et `delete` la supprime logiquement. |

## Flux de page

L onglet liste les activites de l entente. Le modal est plein ecran parce que les activites contiennent de longs champs bilingues et deux champs multi-selection.

Recherches :

| Recherche | Choix offerts |
| --- | --- |
| Resultats | Resultats actifs configures pour le volet de l entente. |
| Responsables | Liens demandeur/beneficiaire deja rattaches a l entente. |

## Champs

| Champ | Regle |
| --- | --- |
| Nom anglais et francais | Requis, maximum 255 caracteres. |
| Description anglaise et francaise | Requise. |
| Date de debut et de fin | Requises. La date de fin ne peut pas preceder la date de debut. |
| Resultats attendus anglais et francais | Requis. |
| Resultats | Tableau requis d identifiants uniques de resultats du volet. |
| Responsables | Tableau requis d identifiants uniques de liens demandeur/beneficiaire. |

## Regles d affaires

| Regle | Comportement |
| --- | --- |
| Les resultats doivent appartenir au volet | Les identifiants invalides sont rejetes. |
| Les responsables doivent appartenir a l entente | Les identifiants invalides sont rejetes. |
| Les selections dupliquees sont invalides | Les deux tableaux rejettent les doublons. |
| La plage de dates est validee a l enregistrement | Si les deux dates sont presentes, le debut doit etre avant ou egal a la fin. |

## Comportement de table

Les activites affichent le nom et la description bilingues, la periode, les resultats attendus bilingues, les badges de resultats et les badges de responsables. La recherche couvre les dates, noms, descriptions, resultats attendus, resultats et responsables.

Les activites ne declenchent pas de completion ni d approbation dans l implementation courante. Elles peuvent servir au narratif d entente, aux modifications et aux extensions.
