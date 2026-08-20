# Promoteurs

Les promoteurs sont des profils de demandeur ou de bénéficiaire. Ils peuvent être créés avant les ententes, examinés indépendamment, affectés à des registres exacts et liés à une ou plusieurs ententes.

## Dependances de configuration

| Dependence | Pourquoi c est important |
| --- | --- |
| Agence principale | Chaque promoteur relève d’une agence. Cette agence fournit les données de référence, notamment les sous-types de promoteur disponibles. |
| Sous-type de promoteur | Le sous-type doit être configuré sous l’agence principale avant la création du profil. |
| Permission de rôle à portée définie | La création exige un plafond Contributeur `applicant_recipient` global ou à l’agence principale choisie. |
| Affectation exacte | La modification d’un promoteur enregistré exige son affectation exacte en plus du plafond du rôle. Le créateur devient automatiquement principal. |
| Configurations d’examen | Les examens apparaissent seulement lorsque des configurations admissibles existent pour les promoteurs. |
| Configuration d’entente | L’onglet Ententes devient utile lorsque les programmes, les volets, les sous-types d’entente et les permissions existent. |

## Page de liste

La page Promoteurs prend en charge la recherche, le filtre d’état, la pagination, les contrôles de colonnes et les actions de ligne. Elle retourne les profils couverts par le plafond Lecteur global ou de l’agence principale de l’utilisateur; la lecture n’exige pas d’affectation exacte. La recherche porte sur les identifiants, les noms légaux et commerciaux, le sous-type et l’agence principale.

Créer apparaît avec un plafond Contributeur dans une portée disponible. Modifier exige Contributeur et l’affectation exacte; Supprimer exige Gestionnaire et l’affectation. La suppression logique retire le promoteur des listes actives ordinaires sans effacer les références historiques.

## Creer un profil

La page de création commence un profil brouillon. Les utilisateurs choisissent l'agence principale et le sous-type, puis saisissent les noms légaux, commerciaux et d'organisme de recherche ainsi que les descriptions bilingues. Les identifiants de registre et le SCIAN se trouvent dans l'onglet Registres après la création.

| Regle | Comportement |
| --- | --- |
| L agence principale est obligatoire | Un promoteur ne peut pas exister sans agence responsable. |
| Le sous-type est obligatoire | Le sous-type classifie le promoteur et doit appartenir a l agence principale. |
| Chaque valeur bilingue principale exige au moins une langue | Le nom légal, le nom commercial et la description exigent chacun une valeur anglaise ou française; les deux langues assurent un affichage bilingue complet. |
| L'agence et le sous-type doivent correspondre | Le sous-type doit être actif et appartenir à l'agence principale choisie; le formulaire l'efface lorsque l'agence change. |
| Les nouveaux profils commencent en brouillon | Les utilisateurs peuvent completer les onglets de soutien avant l utilisation operationnelle. |
| Les champs bilingues doivent etre maintenus ensemble | Les noms et descriptions sont affiches dans la langue active. |

## Espace detail

La page detail contient un sommaire repliable et des onglets:

| Onglet | Objectif |
| --- | --- |
| General | Profil de base, identifiants, agence, sous-type, statut, noms et descriptions. |
| [Identifiants financiers](./agency-financial-ids.md) | Identifiants financiers propres aux agences. |
| Registres | Numéros d'entreprise, de bienfaisance, provinciaux, autochtones, SCIAN et autres identifiants avec validation selon le type. |
| [Autres noms](./other-names.md) | Noms legaux, commerciaux, historiques ou informels alternatifs. |
| [Adresses](./addresses.md) | Adresses physiques ou postales. |
| [Contacts](./contacts.md) | Personnes et coordonnees. |
| [Examens](./reviews.md) | Ensembles d examen et evaluations d execution. |
| [Ententes](./agreements.md) | Ententes liees au promoteur. |
| [Historique du financement](./funding-history.md) | Ententes du systeme et dossiers de financement externes legers associes au promoteur. |
| [Utilisateurs affectés](./team.md) | Registre exact du travail; les changements exigent `manage_assignments`. |

Des onglets d extension peuvent aussi apparaitre lorsqu une extension activee contribue un onglet de promoteur.

## Onglet General

L onglet General affiche ou modifie:

| Groupe de champs | Contenu |
| --- | --- |
| Agence et classification | Agence principale, sous-type et statut. |
| Noms bilingues | Noms legaux, commerciaux et d organisme de recherche en anglais et francais. |
| Descriptions bilingues | Descriptions anglaise et francaise du profil. |

Lorsque l utilisateur peut modifier le promoteur, General devient un formulaire en ligne. Sinon, il affiche les valeurs en lecture seule.

## Flux operationnel

| Etape | Action |
| --- | --- |
| 1 | Configurer l agence principale et les sous-types. |
| 2 | Creer le profil en brouillon. |
| 3 | Ajouter les identifiants de registre, les autres noms, les adresses et les contacts. |
| 4 | Utiliser Utilisateurs affectés ou Gestion des affectations pour répartir le profil entre les utilisateurs admissibles. |
| 5 | Executer les examens lorsque le processus l exige. |
| 6 | Lier le promoteur aux ententes pendant la creation d entente ou depuis l onglet Promoteurs de l entente. |
