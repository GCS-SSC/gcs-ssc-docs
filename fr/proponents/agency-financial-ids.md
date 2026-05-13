# Identifiants financiers de promoteur

Les identifiants financiers stockent la valeur qu une agence utilise pour le promoteur dans son systeme financier ou de subventions. Un meme promoteur peut avoir plusieurs identifiants propres aux agences.

## Dependances

| Dependence | Pourquoi c est important |
| --- | --- |
| Profil de promoteur | Les identifiants sont des enregistrements enfants d un profil existant. |
| Acces a l agence | Les utilisateurs peuvent ajouter des identifiants seulement pour les agences qu ils peuvent gerer. |
| Convention financiere | L agence devrait definir le format et la signification avant la saisie. |

## Champs

| Champ | Regle |
| --- | --- |
| Agence | Obligatoire. Selectionnez l agence proprietaire de l identifiant. |
| Identifiant financier | Obligatoire. Saisissez l identifiant exactement comme utilise par l agence. |

## Regles metier

| Regle | Comportement |
| --- | --- |
| L agence doit etre valide pour l utilisateur | Le selecteur offre seulement les agences accessibles. |
| L identifiant appartient a un promoteur | Ne l utilisez pas pour creer des alias entre promoteurs. |
| Les enregistrements peuvent etre modifies | Mettez a jour la valeur lorsqu une agence remplace son identifiant local. |
| Les suppressions sont logiques | Un identifiant retire est masque tout en conservant le contexte historique. |

## Conseils

Utilisez cet onglet lorsque les ententes, paiements, reclamations ou rapports doivent rapprocher un promoteur GCS-SSC avec un identifiant financier d agence. Les identifiants globaux appartiennent plutot a l onglet General.
