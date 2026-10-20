# Groupes administratifs et travail à réclamer

Un groupe permet à une agence d'offrir une étape d'approbation, un examen ou une demande de réviseur supplémentaire à plusieurs personnes. Un membre réclame l'élément avant d'agir. L'appartenance au groupe ne donne pas accès aux données opérationnelles. Vous devez avoir la permission et l'affectation directe exigées pour la tâche.

## Configurer un groupe

Ouvrez **Groupes** dans la barre latérale. Votre rôle doit avoir la permission Groupe suivante pour l'agence du groupe :

| Tâche | Niveau minimal |
| --- | --- |
| Consulter les groupes | Lecteur |
| Créer ou modifier un groupe et ses membres | Contributeur |
| Supprimer un groupe | Gestionnaire |

Entrez les noms français et anglais obligatoires et une adresse courriel valide. Ajoutez les membres avec le sélecteur. Ils doivent être des utilisateurs actifs de l'application ayant un rôle actif appartenant à cette agence. Un rôle global seul ne suffit pas pour devenir membre d'un groupe d'agence. Retirer un membre n'efface pas ses approbations ou examens terminés.

Les groupes d'une agence supprimée disparaissent des listes et sélecteurs et ne peuvent plus être ouverts ou modifiés. Si un groupe devient indisponible, rechargez la page et demandez à un administrateur d'agence de vérifier son état.

Configurez le groupe avant de le choisir comme responsable par défaut d'une étape d'approbation ou d'un examen qui permet l'affectation de groupe. Le groupe doit avoir au moins un membre actif admissible. Le formulaire d'une étape offre soit un utilisateur, soit un groupe. Pour un groupe, **Exiger les détails du groupe** peut rendre des preuves supplémentaires obligatoires lors de la réclamation ou de la décision. Publiez le modèle ou la configuration modifiés pour les appliquer au travail futur. Les tâches existantes gardent leur configuration initiale.

Par exemple, créez "Regional reviewers / Réviseurs régionaux" dans l'agence A, ajoutez deux utilisateurs de cette agence et choisissez le groupe pour un examen. Les deux membres voient l'élément non réclamé à l'accueil. Le premier membre admissible qui le réclame devient responsable de la tâche. L'autre ne peut plus réclamer cet élément. Un utilisateur de l'agence B ne peut pas devenir membre en connaissant simplement l'identifiant du groupe.

## Réclamer et traiter

L'accueil montre **Disponible à réclamer** aux utilisateurs membres d'un groupe actif. La liste contient les examens, demandes de réviseur supplémentaire et étapes d'approbation en attente non réclamés. Cliquez sur **Réclamer**. Après une réclamation réussie, la file du groupe et **Mon travail ouvert** s'actualisent. L'application revérifie votre appartenance au groupe, votre admissibilité à l'affectation au dossier source et l'état de la tâche avant l'enregistrement. Deux personnes ne peuvent pas réclamer le même élément. Ouvrez sa page d'examen ou d'approbation pour continuer selon les règles habituelles.

En cas d'échec, actualisez la file. Vérifiez que le groupe et l'appartenance sont actifs, que l'élément attend toujours une action et que l'utilisateur conserve la permission Contributeur ou l'admissibilité à l'approbation pour l'agence ou le programme qui possède réellement le travail. Demandez à un administrateur de corriger l'appartenance ou la configuration au besoin. Un bouton visible ne donne pas accès aux dossiers sources sans lien. Consultez [Approbations et achèvements](../concepts/approvals-completions.md), [Examens en exécution](../concepts/runtime-reviews.md) et [Permissions des rôles](../concepts/rbac.md).

## Travail de groupe des recommandations et collectes

Les recommandations de flux et les collectes de données peuvent aussi utiliser un groupe publié par défaut. Avant qu'une personne réclame une de ces tâches, aucune personne n'y est affectée automatiquement. La réclamation vous ajoute à la liste des utilisateurs affectés si vous n'y figurez pas déjà. Les affectations et le principal existants restent inchangés. Si la liste était vide, vous devenez principal. Une réclamation ne remplace pas une liste préparée par un coordonnateur des affectations.

Vous ne pouvez pas supprimer un groupe tant que des tâches ou des configurations enregistrées l'utilisent. L'application retourne `GROUP_IN_USE`. Les versions publiées des flux comptent aussi. Modifier une copie de travail ne retire donc pas la référence publiée. Conservez les groupes utilisés par des approbations terminées. Pour ne plus proposer de nouveau travail, modifiez les membres ou les configurations futures.

Par exemple, un coordonnateur ajoute un responsable à une recommandation de groupe avant sa réclamation. Un autre membre admissible la réclame. Les deux affectations restent et le responsable demeure principal. L'intervenant peut agir seulement tant que son affectation directe au dossier, la permission de rôle exigée et l'état de la tâche permettent le travail. Consultez [Collectes de données](../concepts/data-collections.md).
