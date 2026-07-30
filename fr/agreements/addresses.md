# Adresses d entente

L onglet Adresses lie des types d adresse propres a l entente a des dossiers `Common_Address`. Chaque ligne est un enfant d entente plus une adresse commune liee.

## Configuration d une installation vide

| Configuration | Utilite |
| --- | --- |
| Types d adresse de l agence | La recherche retourne les types d adresse actifs disponibles dans le contexte de l entente. |
| Enums pays et juridiction | Les adresses canadiennes exigent une juridiction valide. Les subdivisions non canadiennes sont en texte libre. |
| Permissions CRUD d’entente | `create` ajoute une adresse et charge ses recherches de création, `update` modifie une adresse existante et ses recherches, et `delete` la supprime logiquement. |

## Flux de page

L onglet affiche les adresses de l entente et ouvre un modal de creation ou modification. Le champ type d adresse offre seulement les types actifs et valides pour l entente.

La liste affiche le type d adresse, la rue 1, la ville et le code postal ou ZIP. Le type d adresse est bilingue.

## Champs

| Champ | Notes |
| --- | --- |
| Type d adresse | Requis. Doit etre un type d adresse d agence valide pour l entente. |
| Rue 1 | Champ d adresse commune requis. |
| Rue 2 et rue 3 | Champs facultatifs. |
| Ville | Requise. |
| Pays | Enum de pays requis. |
| Subdivision | Requise. Pour le Canada, doit etre une valeur de juridiction. Pour les autres pays, saisie texte. |
| Identifiant GC d adresse | Numerique facultatif. |
| Circonscription federale | Numerique facultatif. |
| Telephone principal et poste | Numeriques facultatifs. |
| Code postal ou ZIP | Requis. |

## Regles d affaires

| Regle | Comportement |
| --- | --- |
| Le type d adresse est valide avant enregistrement | Les utilisateurs peuvent seulement sauvegarder un type d adresse valide pour l entente. |
| Les details d adresse et le lien d entente sont sauvegardes ensemble | Une nouvelle ligne cree les details d adresse et le lien propre a l entente. |
| Les mises a jour peuvent changer le type et les details | La modification peut changer le type d adresse d entente et les champs d adresse. |
| La suppression est logique | Les adresses supprimees disparaissent des listes normales mais restent disponibles pour l historique. |
| Les subdivisions canadiennes sont contraintes | Les adresses canadiennes exigent une province ou un territoire valide. |

## Dependances

Les adresses ne pilotent pas directement les flux financiers. Elles dependent des donnees de reference de l agence et du schema commun d adresse.
