# Ententes d un promoteur

L onglet Ententes affiche les ententes liees au promoteur. C est une vue de relation, pas un remplacement de l espace Ententes.

## Dependances

| Dependence | Pourquoi c est important |
| --- | --- |
| Configuration d entente | Agences, programmes, volets, sous-types et references doivent exister. |
| Permissions d entente | Les utilisateurs ont besoin de lecture pour voir les ententes et de creation pour en demarrer. |
| Profil de promoteur | Le promoteur courant peut etre preselectionne pendant la creation. |

## Colonnes

| Colonne | Signification |
| --- | --- |
| Numero d entente | Identifiant metier de l entente. |
| Titre | Titre bilingue dans la langue active. |
| Programme et volet | Contexte de paiement de transfert. |
| Type ou sous-type | Classification configuree. |
| Action | Ouvre l espace detail lorsque l utilisateur peut lire l entente. |

## Regles metier

| Regle | Comportement |
| --- | --- |
| Les ententes appartiennent au contexte de volet | La relation promoteur ne change pas le programme, le volet ou l agence proprietaire. |
| La creation peut commencer ici | Lorsque permis, le flux de creation s ouvre avec le promoteur courant preselectionne. |
| Une entente peut avoir plusieurs promoteurs | La relation est plusieurs-a-plusieurs par l onglet Promoteurs de l entente. |
| Retirer une relation se fait dans l entente | Gere les promoteurs lies depuis l espace detail de l entente. |

## Conseils

Utilisez cet onglet pour comprendre les relations de financement actives et historiques du promoteur. Ouvrez l entente pour les budgets, engagements, paiements, reclamations, previsions, surveillances ou approbations.
