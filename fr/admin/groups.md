# Groupes administratifs et travail à réclamer

Un groupe permet à une agence d’offrir une étape d’approbation, un examen ou une demande de réviseur supplémentaire à plusieurs personnes. Un membre réclame l’élément avant d’agir. Le groupe est un choix d’affectation; il ne donne ni permission sur les données opérationnelles ni affectation exacte à un dossier.

## Configurer un groupe

Ouvrez **Groupes** dans la barre latérale. La page est visible avec une permission `group:read`. La création exige `group:create` pour l’agence; la modification du nom, du courriel ou des membres exige `group:update`; la suppression exige `group:delete`. Le serveur vérifie l’agence exacte à chaque requête. Le groupe exige des noms français et anglais et une adresse courriel valide. Ses membres doivent être des utilisateurs Common actifs possédant un rôle actif appartenant à cette agence. Ajoutez-les avec le sélecteur de membres; retirer un membre n’efface pas une approbation ou un examen déjà terminé.

Configurez le groupe avant de le choisir comme responsable par défaut d’une étape d’approbation ou d’un examen admissible. Un groupe sans membre actif admissible ne peut pas être choisi. Le formulaire d’une étape offre soit un utilisateur, soit un groupe. Pour un groupe, **Exiger les détails du groupe** peut rendre des preuves supplémentaires obligatoires lors de la réclamation ou de la décision. Publiez le modèle ou la configuration modifiés pour le travail futur; les éléments déjà créés conservent leur configuration figée.

Par exemple, créez « Regional reviewers / Réviseurs régionaux » dans l’agence A, ajoutez deux utilisateurs de cette agence et choisissez le groupe pour un examen. Les deux membres voient l’élément non réclamé à l’accueil. Le premier membre admissible qui le réclame devient l’intervenant; l’autre ne peut plus réclamer le même élément. Un utilisateur de l’agence B ne peut pas devenir membre en connaissant simplement l’identifiant du groupe.

## Réclamer et traiter

L’accueil montre **Disponible à réclamer** aux utilisateurs membres d’un groupe actif. La liste contient les examens, demandes de réviseur supplémentaire et étapes d’approbation en attente non réclamés. Cliquez sur **Réclamer**; une réussite actualise la file du groupe et **Mon travail ouvert**. Le serveur revérifie l’appartenance, l’admissibilité à l’affectation du dossier source et l’état d’exécution sous verrou transactionnel. Traitez ensuite l’élément dans sa page d’examen ou d’approbation selon les règles habituelles.

En cas d’échec, actualisez la file. Vérifiez que le groupe et l’appartenance sont actifs, que l’élément attend toujours une action et que l’utilisateur conserve le niveau Contributeur ou l’admissibilité à l’approbation pour le propriétaire exact. Demandez à un administrateur de corriger l’appartenance ou la configuration au besoin. Un bouton visible ne donne pas accès aux dossiers sources sans lien. Consultez [Approbations et achèvements](../concepts/approvals-completions.md), [Examens en exécution](../concepts/runtime-reviews.md) et [Permissions des rôles](../concepts/rbac.md).
