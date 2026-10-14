# Utilisateurs affectés au promoteur

Ouvrez un promoteur enregistré et choisissez **Utilisateurs affectés** pour voir qui travaille sur ce profil précis. Ces utilisateurs doivent aussi posséder le rôle Promoteur approprié à son agence principale. L’ajout à cette liste ne leur donne pas ce rôle.

## Accès requis

La lecture du registre exige soit :

- Lecteur ou un niveau supérieur pour `applicant_recipient` à la portée de l’agence principale actuelle du promoteur;
- `manage_assignments` pour `applicant_recipient` à cette portée.

L’ajout, la promotion ou le retrait d’utilisateurs exige `manage_assignments`. L’accès métier Contributeur ou Gestionnaire n’implique pas la gestion du registre, et `manage_assignments` seul ne révèle pas le profil du promoteur.

## Règles du registre

Chaque promoteur actif doit compter au moins une affectation active et exactement un utilisateur principal. Le principal dirige le travail; il n’est pas un membre plus privilégié. Un utilisateur affecté doit encore avoir l’accès Lecteur pour consulter le profil. Pour le modifier, il faut à la fois le rôle approprié et une affectation à ce profil précis.

Le registre demeure lisible lorsqu’un utilisateur existant devient inactif ou perd son admissibilité Contributeur. Un principal inadmissible reste ainsi visible pour correction; les changements de rôle ne réécrivent pas silencieusement l’historique.

## Ajouter un utilisateur affecté

Sélectionnez **Ajouter un utilisateur** et recherchez les personnes admissibles. La cible doit être active et posséder Contributeur ou Gestionnaire pour `applicant_recipient` globalement ou à l’agence principale du promoteur. Le serveur rejette les utilisateurs inactifs, ceux qui sont seulement Lecteur, ceux qui sont hors portée, les doublons actifs, les champs inconnus et les identifiants mal formés.

Le nouvel utilisateur n’est pas principal. L’ajout de la même personne à un autre promoteur crée une affectation exacte distincte et ne relie pas les dossiers.

## Changer l’utilisateur principal

Choisissez **Rendre principal** pour une affectation active et admissible. L’enregistrement rend cette personne principale et fait de l’ancien principal un utilisateur affecté ordinaire, ensemble. Elle ne peut promouvoir une affectation inactive, inadmissible, manquante ou retirée.

Si le principal courant est inadmissible, ajoutez ou repérez d’abord un remplaçant admissible, promouvez-le, puis retirez l’ancienne affectation s’il y a lieu.

## Retirer un utilisateur affecté

Un utilisateur non principal peut être retiré lorsqu’il reste au moins une affectation active. Le serveur refuse le retrait du principal et de la dernière personne affectée. Le retrait enlève l’utilisateur de la liste active tout en conservant l’historique de son affectation.

## Changements d’état et de portée

Vous pouvez modifier les affectations seulement lorsque le promoteur est actif et n’a pas été supprimé. Les profils inactifs conservent leur registre lisible, sans pouvoir le modifier. À l’enregistrement, l’application revérifie l’agence principale, les permissions, les utilisateurs admissibles, l’état du profil et les affectations actuelles. Une page laissée ouverte ne conserve pas des permissions retirées depuis.

Le changement d’agence principale modifie la portée utilisée par les autorisations et les vérifications d’admissibilité suivantes. Révisez le registre et les permissions dans le cadre de ce changement; une affectation existante peut demeurer visible même si son utilisateur n’est plus admissible dans la nouvelle agence.

Par exemple, Alex est l’agent principal pour Services communautaires du Havre et transfère le dossier à Samira. Un utilisateur ayant `manage_assignments` ajoute d’abord Samira, qui doit déjà posséder l’accès Contributeur ou Gestionnaire à l’agence principale, puis choisit **Rendre principal** pour elle. Alex peut ensuite être retiré s’il ne travaille plus sur le dossier. Rendre Samira principale ne lui donne pas accès aux ententes de l’organisme; vérifiez ces affectations séparément.

## Frontières

- L’affectation à un promoteur n’accorde pas l’accès à un autre promoteur, à une entente liée, à un examen ou une recommandation affecté indépendamment, à une agence ou à un programme.
- Elle ne crée pas de permission de premier niveau sur les promoteurs. La création d’un promoteur exige l’accès Contributeur à l’agence principale choisie. L’application affecte son créateur comme principal à l’enregistrement du nouveau profil.
- Les affectations d’approbateur et de réviseur demeurent des responsabilités de flux distinctes.

Pour coordonner plusieurs entités, utilisez [Gestion des affectations](../admin/assignments.md). Pour le modèle d’autorisation, consultez [Permissions de rôle et affectations exactes](../concepts/rbac.md).
