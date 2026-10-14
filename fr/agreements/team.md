# Utilisateurs affectés à l’entente

L’onglet **Utilisateurs affectés** indique les personnes responsables du travail sur cette entente précise. Cette liste est aussi appelée registre. Une affectation vaut uniquement pour cette entente. Chaque personne doit encore posséder le rôle approprié pour l’organisme ou le programme de l’entente; ajouter un nom à la liste n’accorde pas ce rôle.

## Accès requis

La lecture du registre exige soit :

- Lecteur ou un niveau supérieur pour `agreement` à la portée actuelle de l’entente;
- `manage_assignments` pour `agreement` à cette portée.

L’ajout, la promotion ou le retrait d’utilisateurs exige `manage_assignments`. L’accès métier Contributeur ou Gestionnaire n’implique pas la gestion du registre, et `manage_assignments` seul n’expose aucun contenu de l’entente, financier, documentaire ou de flux.

## Règles du registre

Chaque entente active doit compter au moins une personne affectée et exactement un utilisateur principal. Le principal dirige le travail et suit les mêmes règles d’accès que les autres personnes affectées. La lecture exige l’accès Lecteur ou supérieur. La modification exige l’accès Contributeur ou supérieur **et** l’affectation à cette entente; la suppression exige l’accès Gestionnaire et l’affectation.

Par exemple, un agent ayant l’accès Contributeur au programme peut lire une entente, mais ne peut pas la modifier avant d’y être affecté. Le rendre principal change la personne qui dirige le travail, sans accorder de permissions supplémentaires.

Le registre demeure lisible lorsqu’un utilisateur existant devient inactif ou perd son admissibilité Contributeur. Un principal inadmissible reste ainsi visible pour correction; les changements de rôle ne réécrivent pas silencieusement l’historique.

## Ajouter un utilisateur affecté

1. Ouvrez **Utilisateurs affectés** dans l’entente.
2. Sélectionnez **Ajouter un utilisateur** et cherchez le collègue qui travaillera au dossier.
3. Choisissez une personne admissible et enregistrez l’affectation.

Le collègue doit être actif et posséder l’accès Contributeur ou Gestionnaire pour `agreement`, soit globalement, soit dans la portée actuelle d’organisme et de programme de l’entente. Si son nom est indisponible, demandez à l’administrateur des accès de vérifier son état et son rôle. L’application refuse les personnes inactives, les personnes ayant seulement le rôle Lecteur, les personnes hors portée, les affectations actives en double, les champs inconnus et les identifiants invalides.

Le nouvel utilisateur n’est pas principal. L’affectation à une entente n’influe pas sur une autre entente du même programme.

## Changer l’utilisateur principal

Choisissez **Rendre principal** pour une affectation active et admissible. L’opération promeut cet utilisateur et rétrograde atomiquement l’ancien principal. Elle ne peut promouvoir une affectation inactive, inadmissible, manquante ou retirée.

Si le principal courant est inadmissible, ajoutez ou repérez d’abord un remplaçant admissible, promouvez-le, puis retirez l’ancienne affectation s’il y a lieu.

## Retirer un utilisateur affecté

Un utilisateur non principal peut être retiré lorsqu’il reste au moins une affectation active. Le serveur refuse le retrait du principal et de la dernière personne affectée. Le retrait est une suppression logique qui préserve les références historiques.

## Changements d’état et de portée

Vous pouvez changer les utilisateurs affectés seulement lorsque l’état défini par l’organisme permet la modification et que les autres protections de l’entente et de ses dossiers connexes le permettent. Les états en lecture seule ou terminaux bloquent ces changements. L’application revérifie le propriétaire de l’entente, les permissions, l’admissibilité des personnes et les affectations existantes à l’enregistrement.

Si une réaffectation est refusée, rechargez l’entente et vérifiez son état avant de réessayer. Le rôle ou l’état du compte d’un collègue peut aussi avoir changé depuis l’ouverture de la liste.

Le déplacement du propriétaire ou de la portée de programme modifie les vérifications d’autorisation et d’admissibilité suivantes. Révisez le registre lors d’un changement de portée; une affectation existante demeure visible même si l’utilisateur n’est plus admissible dans la nouvelle portée.

## Travail enfant affecté indépendamment

Une affectation à l’entente ne vous affecte pas automatiquement à ses réclamations, rapprochements, paiements, prévisions, surveillances, modifications, engagements, examens ou recommandations. Ces dossiers ont leurs propres utilisateurs affectés. Créer un dossier métier avec son propre registre exige le rôle Contributeur applicable et l’affectation parente requise; le créateur devient son utilisateur principal. Les modifications suivantes exigent une affectation à ce dossier.

Par exemple, lorsqu’un collègue crée un paiement, il en devient l’utilisateur principal. Pour prendre en charge le paiement, faites établir une affectation sur le paiement lui-même. Vous ajouter seulement au registre de l’entente ne fournit pas cette affectation au paiement.

Les examens, recommandations et collectes de données créés pendant l’exécution d’un flux suivent la personne ou le groupe responsable enregistré pour ce travail. Le travail de groupe peut attendre une prise en charge sans personne encore affectée.

Les données enfants ordinaires, comme les adresses, promoteurs, activités, lignes budgétaires et documents, continuent d’utiliser l’entente elle-même comme racine d’affectation.

Pour coordonner plusieurs entités, utilisez [Gestion des affectations](../admin/assignments.md). Pour le modèle d’autorisation, consultez [Permissions de rôle et affectations exactes](../concepts/rbac.md).

Les collectes de données ont leurs propres utilisateurs affectés, et l’accès est vérifié par le dossier dont elles proviennent. Prendre en charge un examen, une recommandation ou une collecte de groupe conserve les utilisateurs affectés et le principal déjà présents. La prise en charge ne donne pas la permission de gérer ce registre. Pendant l’approbation ou dans un état terminal, vous ne pouvez modifier ni les réponses ni les utilisateurs affectés.
