# Utilisateurs affectés au promoteur

L’onglet **Utilisateurs affectés** présente le registre de travail exact d’un promoteur enregistré. Il répartit ce profil entre des utilisateurs qui possèdent déjà un plafond de rôle Promoteur suffisant pour l’agence principale; il ne crée pas de permission à lui seul.

## Accès requis

La lecture du registre exige soit :

- Lecteur ou un niveau supérieur pour `applicant_recipient` à la portée de l’agence principale actuelle du promoteur;
- `manage_assignments` pour `applicant_recipient` à cette portée.

L’ajout, la promotion ou le retrait d’utilisateurs exige `manage_assignments`. L’accès métier Contributeur ou Gestionnaire n’implique pas la gestion du registre, et `manage_assignments` seul ne révèle pas le profil du promoteur.

## Règles du registre

Chaque promoteur actif doit compter au moins une affectation active et exactement un utilisateur principal. Le principal dirige le travail; il n’est pas un membre plus privilégié. Un utilisateur affecté a encore besoin du plafond Lecteur pour lire et de la règle des deux clés pour modifier le profil.

Le registre demeure lisible lorsqu’un utilisateur existant devient inactif ou perd son admissibilité Contributeur. Un principal inadmissible reste ainsi visible pour correction; les changements de rôle ne réécrivent pas silencieusement l’historique.

## Ajouter un utilisateur affecté

Sélectionnez **Ajouter un utilisateur** et recherchez les personnes admissibles. La cible doit être active et posséder Contributeur ou Gestionnaire pour `applicant_recipient` globalement ou à l’agence principale du promoteur. Le serveur rejette les utilisateurs inactifs, ceux qui sont seulement Lecteur, ceux qui sont hors portée, les doublons actifs, les champs inconnus et les identifiants mal formés.

Le nouvel utilisateur n’est pas principal. L’ajout de la même personne à un autre promoteur crée une affectation exacte distincte et ne relie pas les dossiers.

## Changer l’utilisateur principal

Choisissez **Rendre principal** pour une affectation active et admissible. L’opération promeut cet utilisateur et rétrograde atomiquement l’ancien principal. Elle ne peut promouvoir une affectation inactive, inadmissible, manquante ou retirée.

Si le principal courant est inadmissible, ajoutez ou repérez d’abord un remplaçant admissible, promouvez-le, puis retirez l’ancienne affectation s’il y a lieu.

## Retirer un utilisateur affecté

Un utilisateur non principal peut être retiré lorsqu’il reste au moins une affectation active. Le serveur refuse le retrait du principal et de la dernière personne affectée. Le retrait est une suppression logique qui n’efface pas les références historiques.

## Changements d’état et de portée

Le registre ne peut changer que lorsque le promoteur est `draft` ou `active`. Un profil terminal ou supprimé est verrouillé. Chaque écriture recharge l’agence principale, le graphe des rôles, l’admissibilité, l’état et le registre courant dans une transaction; une page périmée ne peut donc pas conserver l’accès après un changement concurrent.

Le changement d’agence principale modifie la portée utilisée par les autorisations et les vérifications d’admissibilité suivantes. Révisez le registre et les permissions dans le cadre de ce changement; une affectation existante peut demeurer visible même si son utilisateur n’est plus admissible dans la nouvelle agence.

## Frontières

- L’affectation à un promoteur n’accorde pas l’accès à un autre promoteur, à une entente liée, à un examen ou une recommandation affecté indépendamment, à une agence ou à un programme.
- Elle ne crée pas de permission de premier niveau sur les promoteurs. La création exige un plafond Contributeur à l’agence principale choisie et rend le créateur principal dans la transaction de création.
- Les affectations d’approbateur et de réviseur demeurent des responsabilités de flux distinctes.

Pour coordonner plusieurs entités, utilisez [Gestion des affectations](../admin/assignments.md). Pour le modèle d’autorisation, consultez [Permissions de rôle et affectations exactes](../concepts/rbac.md).
