# Promoteurs

Les promoteurs sont des profils de demandeur ou de bénéficiaire. Ils peuvent être créés avant les ententes, examinés indépendamment, affectés à des registres exacts et liés à une ou plusieurs ententes.

## Dependances de configuration

| Dependence | Pourquoi c est important |
| --- | --- |
| Agence principale | Chaque promoteur relève d’une agence qui possède son profil et ses notes propres à l’agence. |
| Classification de l’entente | Le sous-type de promoteur est choisi sur chaque relation entente–promoteur, parmi les types de bénéficiaire admissibles du volet. Le profil lui-même n’a pas de champ de sous-type. |
| Permission de rôle à portée définie | La création exige un plafond Contributeur `applicant_recipient` global ou à l’agence principale choisie. |
| Affectation exacte | La modification d’un promoteur enregistré exige son affectation exacte en plus du plafond du rôle. Le créateur devient automatiquement principal. |
| Configurations d’examen | Les examens apparaissent seulement lorsque des configurations admissibles existent pour les promoteurs. |
| Configuration d’entente | L’onglet Ententes devient utile lorsque les programmes, les volets, les sous-types d’entente et les permissions existent. |

## Page de liste

La page Promoteurs prend en charge la recherche, le filtre d’état, la pagination, les contrôles de colonnes et les actions de ligne. Elle retourne les profils couverts par le plafond Lecteur global ou de l’agence principale de l’utilisateur; la lecture n’exige pas d’affectation exacte. La recherche porte sur les identifiants, les noms légaux et commerciaux et l’agence principale.

Créer apparaît avec un plafond Contributeur dans une portée disponible. Modifier exige Contributeur et l’affectation exacte; Supprimer exige Gestionnaire et l’affectation. La suppression logique retire le promoteur des listes actives ordinaires sans effacer les références historiques.

Utilisez les vues **Tous**, **Mes dossiers** ou d’organisme pour restreindre les mêmes dossiers autorisés. Mes dossiers exige l’affectation exacte au promoteur. Une vue d’organisme inclut les profils ayant un identifiant financier non supprimé pour cet organisme et exige la portée d’organisme correspondante de l’utilisateur; ce n’est pas un simple filtre sur l’organisme principal. Ces vues n’accordent aucun droit de lecture supplémentaire.

Par exemple, un profil dirigé par A peut apparaître dans une vue B autorisée après l’ajout d’un identifiant financier B. Il doit toujours être lisible selon les permissions Promoteur de l’utilisateur. Un lien avec une entente B ne remplit pas à lui seul ce critère financier.

## Creer un profil

La page de création commence avec **Actif** désactivé. Les utilisateurs choisissent l’agence principale, puis saisissent les noms légaux, commerciaux et d'organisme de recherche ainsi que les descriptions bilingues. Les identifiants de registre et le SCIAN se trouvent dans l'onglet Registres après la création.

| Regle | Comportement |
| --- | --- |
| L agence principale est obligatoire | Un promoteur ne peut pas exister sans agence responsable. |
| Chaque valeur bilingue principale exige au moins une langue | Le nom légal, le nom commercial et la description exigent chacun une valeur anglaise ou française; les deux langues assurent un affichage bilingue complet. |
| Indicateur Actif | Faux par défaut. Activer le profil lorsqu’il est prêt pour les sélections opérationnelles; la disponibilité est distincte de la suppression. |
| Les champs bilingues doivent etre maintenus ensemble | Les noms et descriptions sont affiches dans la langue active. |

## Espace detail

La page detail contient un sommaire repliable et des onglets:

| Onglet | Objectif |
| --- | --- |
| General | Profil de base, identifiants, agence, statut, noms et descriptions. |
| [Identifiants financiers](./agency-financial-ids.md) | Identifiants financiers propres aux agences. |
| Registres | Numéros d'entreprise, de bienfaisance, provinciaux, autochtones, SCIAN et autres identifiants avec validation selon le type. |
| [Autres noms](./other-names.md) | Noms legaux, commerciaux, historiques ou informels alternatifs. |
| [Adresses](./addresses.md) | Adresses physiques ou postales. |
| [Contacts](./contacts.md) | Personnes et coordonnees. |
| [Examens](./reviews.md) | Ensembles d examen et evaluations d execution. |
| [Ententes](./agreements.md) | Ententes liees au promoteur. |
| Notes | Notes de travail bilingues propres à une agence. |
| [Historique du financement](./funding-history.md) | Ententes du systeme et dossiers de financement externes legers associes au promoteur. |
| [Pièces jointes](../concepts/attachments.md) | Justificatifs appartenant à ce promoteur exact. |
| [Utilisateurs affectés](./team.md) | Registre exact du travail; les changements exigent `manage_assignments`. |

Des onglets d extension peuvent aussi apparaitre lorsqu une extension activee contribue un onglet de promoteur.

## Notes du promoteur

L’onglet **Notes** conserve des notes de travail bilingues. Chaque note appartient à une agence en plus du promoteur. Choisissez une agence active pour laquelle vous possédez la permission de créer un promoteur; la liste n’affiche que les notes des agences que vous pouvez lire actuellement, même si le promoteur est lié à plusieurs agences. Une note exige un objet et un corps dans au moins une langue chacun; l’objet est limité à 255 caractères. Rédigez les deux langues au besoin. Les lecteurs peuvent chercher les notes visibles; la création, la modification et la suppression exigent la permission correspondante sur le promoteur et son affectation exacte, ainsi que la permission dans l’agence de la note. L’agence d’origine ne peut pas changer lors d’une modification.

Par exemple, un promoteur dirigé par l’agence A peut aussi avoir un identifiant financier de l’agence B. Un utilisateur de B ayant l’accès requis peut créer une note de B sans exposer les notes de A aux lecteurs de B seulement. Si une note manque, vérifiez les droits sur l’agence avant de la recréer. En cas d’échec d’enregistrement, conservez le brouillon, rechargez les permissions et l’état du profil, puis réessayez. La suppression retire la note des listes actives tout en conservant la preuve historique d’audit.

## Onglet General

L onglet General affiche ou modifie:

| Groupe de champs | Contenu |
| --- | --- |
| Agence et classification | Agence principale et statut. |
| Noms bilingues | Noms legaux, commerciaux et d organisme de recherche en anglais et francais. |
| Descriptions bilingues | Descriptions anglaise et francaise du profil. |

Lorsque l utilisateur peut modifier le promoteur, General devient un formulaire en ligne. Sinon, il affiche les valeurs en lecture seule. Le profil ne choisit aucun sous-type. Classez le promoteur lors de son lien à une entente; la relation peut utiliser un autre type admissible dans un autre volet. Réessayez une recherche d’agence échouée avant de conclure qu’un libellé absent signifie un dossier manquant.

## Flux operationnel

| Etape | Action |
| --- | --- |
| 1 | Configurer l’agence principale. Préparer les types de bénéficiaire admissibles sur le volet avant de lier le promoteur. |
| 2 | Créer le profil et choisir explicitement son indicateur Actif. |
| 3 | Ajouter les identifiants de registre, les autres noms, les adresses et les contacts. |
| 4 | Utiliser Utilisateurs affectés ou Gestion des affectations pour répartir le profil entre les utilisateurs admissibles. |
| 5 | Executer les examens lorsque le processus l exige. |
| 6 | Lier le promoteur aux ententes pendant la creation d entente ou depuis l onglet Promoteurs de l entente. |
