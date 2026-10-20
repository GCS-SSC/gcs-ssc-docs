# Registres des promoteurs

Utilisez **Registres** pour consigner les identifiants d'un registre externe, comme un numéro d'entreprise, ou un code de classification industrielle. Ouvrez **Promoteurs**, choisissez le profil, puis **Registres**. Choisissez le type correspondant avant de saisir la valeur. Le tableau permet la recherche, la pagination, la création, la modification et la suppression selon vos permissions sur le profil.

## Champs et formats

| Champ | Règle |
| --- | --- |
| Type de registre | Obligatoire. Choisissez le registre externe représenté par la valeur. |
| Numéro | Texte obligatoire. Les espaces au début et à la fin sont retirés. Les caractères de contrôle invalides sont refusés. |
| Commentaire Autre | Affiché et obligatoire uniquement lorsque le type est `other`; utilisez-le pour nommer le registre qui n'est pas autrement identifié. |

Trois types de registre exigent un format numérique exact :

| Type de registre | Format obligatoire |
| --- | --- |
| `federalbusinessnumber` | Exactement 9 chiffres |
| `craprogramaccountnumber` | Exactement 15 chiffres |
| `naics` | De 2 à 6 chiffres |

Les autres types de registre acceptent tout texte non vide qui respecte les règles générales du champ. N'ajoutez pas de ponctuation aux trois formats numériques ci-dessus.

Par exemple, un numéro d'entreprise fédéral comme `123456789` respecte le format de neuf chiffres; `123-456-789` ne le respecte pas. Le SCIAN, ou Système de classification des industries de l'Amérique du Nord, classe l'activité de l'organisme. Une valeur comme `62` respecte la longueur permise. Ces exemples illustrent seulement le format; saisissez l'identifiant réel de l'organisme. Pour `other`, nommez le registre dans **Commentaire Autre**, par exemple « Registre municipal des organismes communautaires ».

## Unicité et cycle de vie

Le même type de registre et le même numéro ne peuvent pas être actifs sur deux promoteurs. Si un message indique un doublon, vérifiez le profil et l'identifiant choisis. Le message ne révèle pas l'autre dossier et ne le remplace pas. Supprimer une ligne la retire des listes courantes et permet de réutiliser cette combinaison de type et de numéro. L'application conserve son historique.

Votre permission est vérifiée sur le promoteur dont vous avez ouvert le profil, puis à nouveau pendant l'enregistrement. La ligne de registre doit appartenir à ce profil; changer les identifiants de l'URL ne permet pas de la déplacer. Si vous modifiez le type, vérifiez aussi le numéro et le commentaire : le système valide tous les champs ensemble, même si vous n'en avez changé qu'un. Par exemple, passer d'un numéro d'entreprise de neuf chiffres à un compte de programme de l'ARC exige une valeur de 15 chiffres.

## Recherche et rétablissement

La recherche porte sur le numéro, le type de registre et le commentaire Autre. L'accès Lecteur permet de consulter la liste. Pour ajouter ou modifier un registre, vous devez avoir l'accès Contributeur et être affecté à ce promoteur. Pour le supprimer, il faut l'accès Gestionnaire et cette affectation. Si l'enregistrement échoue, vérifiez la portée et l'affectation, le format, le commentaire Autre requis et l'absence d'une paire active type-numéro identique.

Consultez [Promoteurs](./index.md), [Identifiants financiers d'agence](./agency-financial-ids.md) et [Utilisateurs affectés](./team.md).
