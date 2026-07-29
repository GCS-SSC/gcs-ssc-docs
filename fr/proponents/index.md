# Promoteurs

Les promoteurs sont des profils de demandeur/beneficiaire. Ils peuvent etre crees avant les ententes, examines independamment, affectes a des equipes et lies a une ou plusieurs ententes.

## Dependances de configuration

| Dependence | Pourquoi c est important |
| --- | --- |
| Agence principale | Chaque promoteur releve d une agence. Cette agence fournit les donnees de reference, notamment les sous-types de promoteur disponibles. |
| Sous-type de promoteur | Le sous-type doit etre configure sous l agence principale avant la creation du profil. |
| Acces direct de l utilisateur | La creation de premier niveau exige l indicateur global Promoteur `create` de l utilisateur. Les quatre indicateurs CRUD directs sont geres dans l onglet Attributions de l utilisateur. |
| Acces par equipe exacte | Un promoteur enregistre peut accorder `read_only`, `contributor` ou `full_access` a des utilisateurs choisis meme si leurs roles et indicateurs directs ne donnent aucun acces. |
| Configurations d examen | Les examens apparaissent seulement lorsque des configurations admissibles existent pour les promoteurs. |
| Configuration d entente | L onglet Ententes devient utile lorsque programmes, volets, sous-types d entente et permissions existent. |

## Page de liste

La page Promoteurs prend en charge recherche, filtre de statut, pagination, controles de colonnes et actions de ligne. Les utilisateurs avec l indicateur direct Promoteur `read` voient la liste interagences; les utilisateurs qui ont seulement une equipe voient uniquement les promoteurs exacts qui leur sont attribues. La recherche aide a trouver un profil visible par identifiants, noms legaux, noms commerciaux, sous-type ou agence principale.

Creer apparait avec l indicateur direct Promoteur `create` et ouvre la page de creation. Modifier et Supprimer dependent de l indicateur direct correspondant ou du niveau de l equipe exacte du promoteur selectionne. Supprimer est une suppression logique qui retire le promoteur des listes actives normales sans effacer les references historiques.

## Creer un profil

La page de creation commence un profil brouillon. Les utilisateurs choisissent l agence principale et le sous-type, puis saisissent les noms bilingues, descriptions, identifiants et renseignements SCIAN.

| Regle | Comportement |
| --- | --- |
| L agence principale est obligatoire | Un promoteur ne peut pas exister sans agence responsable. |
| Le sous-type est obligatoire | Le sous-type classifie le promoteur et doit appartenir a l agence principale. |
| Le SCIAN est obligatoire a la creation | Le profil doit inclure la classification d industrie requise pour les rapports et examens. |
| Le numero d entreprise doit etre unique lorsqu il est fourni | Les doublons actifs sont bloques pour eviter les profils organisationnels en double. |
| Les nouveaux profils commencent en brouillon | Les utilisateurs peuvent completer les onglets de soutien avant l utilisation operationnelle. |
| Les champs bilingues doivent etre maintenus ensemble | Les noms et descriptions sont affiches dans la langue active. |

## Espace detail

La page detail contient un sommaire repliable et des onglets:

| Onglet | Objectif |
| --- | --- |
| General | Profil de base, identifiants, agence, sous-type, statut, noms et descriptions. |
| [Identifiants financiers](./agency-financial-ids.md) | Identifiants financiers propres aux agences. |
| [Autres noms](./other-names.md) | Noms legaux, commerciaux, historiques ou informels alternatifs. |
| [Adresses](./addresses.md) | Adresses physiques ou postales. |
| [Contacts](./contacts.md) | Personnes et coordonnees. |
| [Examens](./reviews.md) | Ensembles d examen et evaluations d execution. |
| [Ententes](./agreements.md) | Ententes liees au promoteur. |
| [Equipe](./team.md) | Utilisateurs affectes directement au promoteur. |

Des onglets d extension peuvent aussi apparaitre lorsqu une extension activee contribue un onglet de promoteur.

## Onglet General

L onglet General affiche ou modifie:

| Groupe de champs | Contenu |
| --- | --- |
| Agence et classification | Agence principale, sous-type et statut. |
| Identifiants | Numero d entreprise, numero de bienfaisance, numero provincial et SCIAN. |
| Noms bilingues | Noms legaux, commerciaux et d organisme de recherche en anglais et francais. |
| Descriptions bilingues | Descriptions anglaise et francaise du profil. |

Lorsque l utilisateur peut modifier le promoteur, General devient un formulaire en ligne. Sinon, il affiche les valeurs en lecture seule.

## Flux operationnel

| Etape | Action |
| --- | --- |
| 1 | Configurer l agence principale et les sous-types. |
| 2 | Creer le profil en brouillon. |
| 3 | Ajouter identifiants, autres noms, adresses et contacts. |
| 4 | Ajouter des membres d equipe si l acces doit etre delegue. |
| 5 | Executer les examens lorsque le processus l exige. |
| 6 | Lier le promoteur aux ententes pendant la creation d entente ou depuis l onglet Promoteurs de l entente. |
