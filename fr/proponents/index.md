# Promoteurs

Utilisez **Promoteurs** pour trouver ou créer le profil de l'organisme qui demande ou reçoit du financement. Conservez ses noms, ses coordonnées et ses identifiants dans un seul profil, puis liez-le à chaque entente pertinente. Vous pouvez créer et examiner le profil avant qu'une entente existe.

Par exemple, une association communautaire financée dans deux volets peut avoir un seul profil lié à deux ententes. Choisissez son type de bénéficiaire séparément pour chaque entente.

Une affectation à ce profil signifie que vous figurez dans **Utilisateurs affectés**. Une affectation à l'une de ses ententes ne vous permet pas de modifier le profil.

## Dépendances de configuration {#dependances-de-configuration}

| Dépendance | Utilité |
| --- | --- |
| Agence principale | Un nouveau profil exige une agence principale active pour le suivi. Le profil appartient au catalogue partagé. Chaque note appartient à une agence qui en limite l'accès. |
| Classification de l'entente | Choisissez le type de bénéficiaire lorsque vous liez le promoteur à une entente, parmi les types permis par son volet. Le profil lui-même n'a pas de champ de sous-type. |
| Permission de rôle à portée définie | La création exige un accès Contributeur aux promoteurs, global ou dans une agence active. Cette agence peut différer de l'agence principale choisie. |
| Affectation exacte | Modifier ou supprimer un profil exige une affectation à ce profil et le rôle approprié. Le créateur devient son utilisateur principal affecté. |
| Configurations d'examen | Les examens apparaissent seulement lorsque des configurations admissibles existent pour les promoteurs. |
| Configuration d'entente | L'onglet Ententes devient utile lorsque les programmes, les volets, les sous-types d'entente et les permissions existent. |

## Page de liste

La page Promoteurs prend en charge la recherche, le filtre d'état, la pagination, les contrôles de colonnes et les actions de ligne. Lecteur Promoteur global ou dans toute agence active donne accès au catalogue partagé de profils; la lecture n'exige pas d'affectation exacte. La recherche porte sur les identifiants, les noms légaux et commerciaux et l'agence principale.

Créer apparaît si vous avez un accès Contributeur global ou dans une agence active. Modifier et Supprimer peuvent apparaître lorsque votre rôle les permet. L'ouverture du formulaire ou la confirmation de suppression vérifie votre affectation actuelle à ce profil. La modification exige Contributeur et cette affectation; la suppression exige Gestionnaire et cette affectation. La suppression retire le promoteur des listes actives ordinaires tout en conservant l'historique. Vous ne pouvez pas supprimer un profil encore lié à une entente ou à un financement externe. Vérifiez ces liens dans **Ententes** et **Historique du financement**. Retirez seulement les liens qui ne correspondent plus au dossier, puis réessayez.

Utilisez les vues **Tous**, **Mes dossiers** ou d'organisme pour restreindre les mêmes dossiers autorisés. Mes dossiers exige l'affectation exacte au promoteur. Une vue d'organisme inclut les profils ayant un identifiant financier actif non supprimé pour cet organisme et exige la portée d'organisme correspondante de l'utilisateur; ce n'est pas un simple filtre sur l'organisme principal. Ces vues n'accordent aucun droit de lecture supplémentaire.

Par exemple, un profil dirigé par A peut apparaître dans une vue B autorisée après l'ajout d'un identifiant financier B. Il doit toujours être lisible selon les permissions Promoteur de l'utilisateur. Un lien avec une entente B ne remplit pas à lui seul ce critère financier.

## Créer un profil {#creer-un-profil}

La page de création commence avec **Actif** désactivé. Choisissez l'agence principale, puis saisissez les noms légaux, commerciaux et d'organisme de recherche ainsi que les descriptions dans les deux langues. Après l'enregistrement, saisissez les identifiants de registre et le code du Système de classification des industries de l'Amérique du Nord, ou code SCIAN, dans **Registres**.

| Règle | Comportement |
| --- | --- |
| L'agence principale est obligatoire | La création exige une agence active de suivi; ce champ ne limite pas les permissions du catalogue partagé. |
| Chaque valeur bilingue principale exige au moins une langue | Le nom légal, le nom commercial et la description exigent chacun une valeur anglaise ou française; les deux langues assurent un affichage bilingue complet. |
| Indicateur Actif | Faux par défaut. Activer le profil lorsqu'il est prêt pour les sélections opérationnelles; la disponibilité est distincte de la suppression. |
| Les champs bilingues doivent être maintenus ensemble | Les noms et descriptions sont affichés dans la langue active. |

## Page de détail {#espace-detail}

La page de détail contient un sommaire repliable et les onglets suivants :

| Onglet | Objectif |
| --- | --- |
| Général | Profil de base, identifiants, agence, statut, noms et descriptions. |
| [Identifiants financiers](./agency-financial-ids.md) | Identifiants financiers propres aux agences. |
| Registres | Numéros d'entreprise, de bienfaisance, provinciaux, autochtones, SCIAN et autres identifiants avec validation selon le type. |
| [Autres noms](./other-names.md) | Autres noms légaux, commerciaux, historiques ou informels. |
| [Adresses](./addresses.md) | Adresses physiques ou postales. |
| [Contacts](./contacts.md) | Personnes et coordonnées. |
| [Examens](./reviews.md) | Ensembles d'examens et travail d'évaluation. |
| [Ententes](./agreements.md) | Ententes liées au promoteur. |
| Notes | Notes de travail bilingues propres à une agence. |
| [Historique du financement](./funding-history.md) | Ententes de GCS-SSC et résumés du financement externe du promoteur. |
| [Pièces jointes](../concepts/attachments.md) | Justificatifs appartenant à ce promoteur exact. |
| [Utilisateurs affectés](./team.md) | Utilisateurs affectés à ce profil. Les changements exigent la permission de gestion des affectations. |

Une extension activée peut aussi ajouter des onglets au profil.

## Notes du promoteur

L'onglet **Notes** conserve des notes de travail bilingues. Chaque note appartient à une agence en plus du promoteur. Choisissez une agence active pour laquelle vous possédez la permission de créer un promoteur; la liste n'affiche que les notes des agences que vous pouvez lire actuellement, même si le promoteur est lié à plusieurs agences. Une note exige un objet et un corps dans au moins une langue chacun; l'objet est limité à 255 caractères. Rédigez les deux langues au besoin. Les lecteurs peuvent chercher les notes visibles; la création, la modification et la suppression exigent la permission correspondante sur le promoteur et son affectation exacte, ainsi que la permission dans l'agence de la note. L'agence d'origine ne peut pas changer lors d'une modification.

Par exemple, un promoteur dirigé par l'agence A peut aussi avoir un identifiant financier de l'agence B. Un utilisateur de B ayant l'accès requis peut créer une note de B sans exposer les notes de A aux lecteurs de B seulement. Si une note manque, vérifiez les droits sur l'agence avant de la recréer. En cas d'échec d'enregistrement, conservez le brouillon, rechargez les permissions et l'état du profil, puis réessayez. La suppression retire la note des listes actives tout en conservant la preuve historique d'audit.

## Onglet Général {#onglet-general}

L'onglet Général permet de consulter ou de modifier les renseignements suivants :

| Groupe de champs | Contenu |
| --- | --- |
| Agence et classification | Agence principale et statut. |
| Noms bilingues | Noms légaux, commerciaux et d'organisme de recherche en anglais et en français. |
| Descriptions bilingues | Descriptions anglaise et française du profil. |

Général affiche un formulaire si votre rôle permet les modifications, même sans affectation actuelle à ce profil. L'enregistrement revérifie votre affectation. Si un avertissement indique que l'action est indisponible, demandez à un gestionnaire des affectations de vous affecter au profil, puis réessayez. Sans rôle de modification, les renseignements sont en lecture seule. Le profil ne choisit aucun sous-type. Classez le promoteur lors de son lien à une entente; ce lien peut utiliser un autre type admissible dans un autre volet. Si une recherche d'agence échoue, réessayez avant de conclure que le dossier manque.

## Flux opérationnel {#flux-operationnel}

| Étape | Action |
| --- | --- |
| 1 | Configurer l'agence principale. Préparer les types de bénéficiaire admissibles sur le volet avant de lier le promoteur. |
| 2 | Créer le profil et choisir explicitement son indicateur Actif. |
| 3 | Ajouter les identifiants de registre, les autres noms, les adresses et les contacts. |
| 4 | Utiliser Utilisateurs affectés ou Gestion des affectations pour répartir le profil entre les utilisateurs admissibles. |
| 5 | Effectuer les examens lorsque le processus l'exige. |
| 6 | Lier le promoteur aux ententes pendant la création d'une entente ou depuis son onglet Promoteurs. |
