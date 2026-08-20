# Utilisateurs affectés à l’entente

L’onglet **Utilisateurs affectés** présente le registre de travail exact d’une entente enregistrée. Il répartit cette entente entre des utilisateurs qui possèdent déjà un plafond de rôle Entente suffisant à sa portée d’agence et de programme; il ne crée pas de permission à lui seul.

## Accès requis

La lecture du registre exige soit :

- Lecteur ou un niveau supérieur pour `agreement` à la portée actuelle de l’entente;
- `manage_assignments` pour `agreement` à cette portée.

L’ajout, la promotion ou le retrait d’utilisateurs exige `manage_assignments`. L’accès métier Contributeur ou Gestionnaire n’implique pas la gestion du registre, et `manage_assignments` seul n’expose aucun contenu de l’entente, financier, documentaire ou de flux.

## Règles du registre

Chaque entente active doit compter au moins une affectation active et exactement un utilisateur principal. Le principal dirige le travail; il n’est pas un membre plus privilégié. Un utilisateur affecté a encore besoin du plafond Lecteur pour lire et de la règle des deux clés pour modifier l’entente.

Le registre demeure lisible lorsqu’un utilisateur existant devient inactif ou perd son admissibilité Contributeur. Un principal inadmissible reste ainsi visible pour correction; les changements de rôle ne réécrivent pas silencieusement l’historique.

## Ajouter un utilisateur affecté

Sélectionnez **Ajouter un utilisateur** et recherchez les personnes admissibles. La cible doit être active et posséder Contributeur ou Gestionnaire pour `agreement` globalement ou à la portée actuelle d’agence et de programme de l’entente. Le serveur rejette les utilisateurs inactifs, ceux qui sont seulement Lecteur, ceux qui sont hors portée, les doublons actifs, les champs inconnus et les identifiants mal formés.

Le nouvel utilisateur n’est pas principal. L’affectation à une entente n’influe pas sur une autre entente du même programme.

## Changer l’utilisateur principal

Choisissez **Rendre principal** pour une affectation active et admissible. L’opération promeut cet utilisateur et rétrograde atomiquement l’ancien principal. Elle ne peut promouvoir une affectation inactive, inadmissible, manquante ou retirée.

Si le principal courant est inadmissible, ajoutez ou repérez d’abord un remplaçant admissible, promouvez-le, puis retirez l’ancienne affectation s’il y a lieu.

## Retirer un utilisateur affecté

Un utilisateur non principal peut être retiré lorsqu’il reste au moins une affectation active. Le serveur refuse le retrait du principal et de la dernière personne affectée. Le retrait est une suppression logique qui préserve les références historiques.

## Changements d’état et de portée

Le registre peut changer lorsque l’entente est `draft`, `pendingapproval` ou `active`. Une entente terminale ou supprimée est verrouillée. Chaque écriture recharge le volet, le programme, l’agence, le graphe des rôles, l’admissibilité, l’état et le registre courant dans une transaction.

Le déplacement du propriétaire ou de la portée de programme modifie les vérifications d’autorisation et d’admissibilité suivantes. Révisez le registre lors d’un changement de portée; une affectation existante demeure visible même si l’utilisateur n’est plus admissible dans la nouvelle portée.

## Travail enfant affecté indépendamment

Le registre de l’entente n’est pas hérité par les réclamations, rapprochements, paiements, prévisions, surveillances, modifications, engagements, examens ou recommandations qui possèdent leur propre registre exact. La création d’un de ces enfants exige Contributeur et l’affectation parente requise, puis rend son créateur principal de cet enfant. Les actions suivantes sur l’enfant exigent son affectation exacte.

Les données enfants ordinaires, comme les adresses, promoteurs, activités, lignes budgétaires et documents, continuent d’utiliser l’entente elle-même comme racine d’affectation.

Pour coordonner plusieurs entités, utilisez [Gestion des affectations](../admin/assignments.md). Pour le modèle d’autorisation, consultez [Permissions de rôle et affectations exactes](../concepts/rbac.md).
