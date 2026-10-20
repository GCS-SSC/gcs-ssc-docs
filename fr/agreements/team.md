# Utilisateurs affectés à l'entente

L'onglet **Utilisateurs affectés** indique les personnes responsables du travail sur cette entente précise. Une affectation vaut uniquement pour cette entente. Chaque personne doit aussi posséder le rôle approprié pour l'organisme ou le programme de l'entente. Ajouter une personne n'accorde pas ce rôle.

## Accès requis

La lecture du registre exige soit :

- l'accès Lecteur ou supérieur aux ententes de l'organisme ou du programme actuel de l'entente;
- la permission `manage_assignments` pour les ententes à cette portée.

L'ajout d'utilisateurs, le changement d'utilisateur principal et le retrait d'utilisateurs exigent `manage_assignments`. Le rôle Contributeur ou Gestionnaire n'accorde pas cette permission. Cette permission seule permet de gérer les affectations, mais pas de lire l'entente ni ses dossiers connexes.

## Règles du registre

Chaque entente active doit compter au moins une personne affectée et exactement un utilisateur principal. Le principal dirige le travail et suit les mêmes règles d'accès que les autres personnes affectées. La lecture exige l'accès Lecteur ou supérieur. La modification exige l'accès Contributeur ou supérieur **et** l'affectation à cette entente; la suppression exige l'accès Gestionnaire et l'affectation.

Par exemple, un agent ayant l'accès Contributeur au programme peut lire une entente, mais ne peut pas la modifier avant d'y être affecté. Le rendre principal change la personne qui dirige le travail, sans accorder de permissions supplémentaires.

Le registre demeure lisible lorsqu'un utilisateur existant devient inactif ou perd son admissibilité Contributeur. Vous pouvez repérer et remplacer un utilisateur principal inadmissible. Les changements de rôle ne modifient pas l'historique des affectations.

## Ajouter un utilisateur affecté

1. Ouvrez **Utilisateurs affectés** dans l'entente.
2. Sélectionnez **Ajouter un utilisateur** et cherchez le collègue qui travaillera au dossier.
3. Choisissez une personne admissible et enregistrez l'affectation.

Le collègue doit être actif et posséder l'accès Contributeur ou Gestionnaire pour `agreement`, soit globalement, soit pour l'organisme ou le programme actuel de l'entente. Si son nom est indisponible, demandez à l'administrateur des accès de vérifier son état et son rôle. L'application refuse les personnes inactives, les personnes ayant seulement le rôle Lecteur, les personnes hors portée et les affectations actives en double.

Le nouvel utilisateur n'est pas principal. L'affectation à une entente n'influe pas sur une autre entente du même programme.

## Changer l'utilisateur principal

Choisissez **Rendre principal** pour une affectation active et admissible. L'enregistrement rend cet utilisateur principal et retire cette désignation à l'ancien principal dans la même opération. Le nouveau principal doit avoir une affectation active et admissible.

Si le principal courant est inadmissible, ajoutez ou repérez d'abord un remplaçant admissible, promouvez-le, puis retirez l'ancienne affectation s'il y a lieu.

## Retirer un utilisateur affecté

Un utilisateur non principal peut être retiré lorsqu'il reste au moins une affectation active. Le serveur refuse le retrait du principal et de la dernière personne affectée. Le retrait d'une affectation conserve son historique.

## Changements d'état et de portée

Vous pouvez changer les utilisateurs affectés seulement lorsque l'état défini par l'organisme permet la modification et que les autres protections de l'entente et de ses dossiers connexes le permettent. Les états en lecture seule ou terminaux bloquent ces changements. L'application revérifie le propriétaire de l'entente, les permissions, l'admissibilité des personnes et les affectations existantes à l'enregistrement.

Si une réaffectation est refusée, rechargez l'entente et vérifiez son état avant de réessayer. Le rôle ou l'état du compte d'un collègue peut aussi avoir changé depuis l'ouverture de la liste.

Le déplacement du propriétaire ou de la portée de programme modifie les vérifications d'autorisation et d'admissibilité suivantes. Révisez le registre lors d'un changement de portée; une affectation existante demeure visible même si l'utilisateur n'est plus admissible dans la nouvelle portée.

## Travail enfant affecté indépendamment

Une affectation à l'entente ne vous affecte pas automatiquement à ses réclamations, rapprochements, paiements, prévisions, surveillances, modifications, engagements, examens ou recommandations. Ces dossiers ont leurs propres utilisateurs affectés. Pour créer un de ces dossiers, vous avez besoin du rôle Contributeur applicable et de l'affectation requise au dossier parent. Vous devenez l'utilisateur principal du nouveau dossier. Pour le modifier ensuite, vous devez être affecté à ce dossier.

Par exemple, lorsqu'un collègue crée un paiement, il en devient l'utilisateur principal. Pour prendre en charge le paiement, faites établir une affectation sur le paiement lui-même. Vous ajouter seulement au registre de l'entente ne fournit pas cette affectation au paiement.

Les examens, recommandations et collectes de données créés pendant l'exécution d'un flux suivent la personne ou le groupe responsable enregistré pour ce travail. Le travail de groupe peut attendre une prise en charge sans personne encore affectée.

Les adresses, bénéficiaires, activités, lignes budgétaires et documents de l'entente utilisent les utilisateurs affectés à l'entente.

Pour gérer les affectations dans plusieurs dossiers, utilisez [Gestion des affectations](../admin/assignments.md). Pour le modèle d'autorisation, consultez [Permissions de rôle et affectations exactes](../concepts/rbac.md).

Les collectes de données ont leurs propres utilisateurs affectés, et l'accès est vérifié par le dossier dont elles proviennent. Prendre en charge un examen, une recommandation ou une collecte de groupe conserve les utilisateurs affectés et le principal déjà présents. La prise en charge ne donne pas la permission de gérer ce registre. Pendant l'approbation ou dans un état terminal, vous ne pouvez modifier ni les réponses ni les utilisateurs affectés.
