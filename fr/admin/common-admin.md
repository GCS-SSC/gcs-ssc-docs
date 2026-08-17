# Administration commune

L'Administration commune est le gestionnaire global de ressources piloté par configuration à `/fr/admin/commun`. Elle exige une capacité globale explicite `system:read`. Le middleware client redirige vers l'accueil si cette capacité manque ou si sa vérification échoue, mais chaque route d'API applique aussi sa propre autorisation.

## Ordre des ressources et propriété

Les onglets adressables par route apparaissent dans cet ordre exact :

1. GWCOA
2. Entités
3. Contacts
4. Adresses
5. Schémas de formulaire
6. Types de pièce jointe
7. Schémas d'examen
8. Configurations d'ensembles d'examens
9. Configurations d'examen
10. Achèvements
11. Ensembles d'examens
12. Examens
13. Modèles d'approbation
14. Étapes d'approbation
15. Certifications
16. Feuilles de route
17. Schémas de recommandation
18. Configurations de recommandation
19. Recommandations

Ces enregistrements appartiennent aux tables communes globales, même si certains portent une portée d'agence ou de volet. La page standard exige toujours l'accès global au système. Les types de pièce jointe et les schémas d'examen ou de recommandation filtrés par agence peuvent aussi être lus par leurs recherches à portée autorisée; cela ne donne pas accès à la page Administration commune.

## Utiliser le gestionnaire partagé

Choisissez un onglet dans la navigation de gauche ou utilisez sa valeur de requête `section`. L'onglet par défaut est Contacts. L'en-tête affiche le total et le nombre actif de la ressource choisie. Chaque tableau permet la pagination, la recherche dans les colonnes configurées et l'identifiant, ainsi qu'un filtre pour toutes les lignes, les lignes actives ou les lignes supprimées.

Sélectionnez **Ajouter** pour ouvrir un formulaire généré, ou ouvrez une ligne pour la modifier. Les champs peuvent être du texte, un nombre, une date, du texte multiligne, du JSON, un booléen, une énumération ou une recherche serveur. Les colonnes bilingues de nom et de description s'affichent dans la langue courante avec repli. Les recherches chargent les libellés et hydratent la valeur choisie en modification, y compris une référence supprimée lorsque le contrat du champ le permet.

Pour une adresse canadienne, la subdivision utilise la liste des provinces et territoires; un autre pays la transforme en texte libre et efface la valeur canadienne incompatible. Le contenu d'un schéma de recommandation utilise l'éditeur structuré lorsqu'il existe. Les autres champs JSON utilisent une zone de texte JSON et doivent respecter le schéma choisi.

Une ligne modifiable existante offre **Supprimé**. L'activation effectue une suppression logique; la désactivation tente une restauration. Cette page ne supprime physiquement aucun enregistrement Common.

## Ressources en lecture seule

Les onglets suivants sont volontairement en lecture seule dans ce gestionnaire générique :

- Entités, le registre d'identités polymorphes alimenté par les enregistrements métier.
- Modèles d'approbation, Étapes d'approbation et Certifications, gérés dans l'éditeur de modèles du volet.
- Feuilles de route, qui sont des enregistrements d'exécution gérés par les actions d'approbation.

Le serveur refuse la création ou la modification de ces ressources même si un client tente l'appel directement.

## Groupes de ressources modifiables

| Groupe | Ressources | Contrat important |
| --- | --- | --- |
| Référence | GWCOA, Contacts, Adresses, Schémas de formulaire, Types de pièce jointe | Créez-les avant les enregistrements qui les recherchent. Une ressource liée à une agence doit référencer un propriétaire valide. Les noms et descriptions avec colonnes EN/FR exigent les deux valeurs. |
| Conception des examens | Schémas d'examen, Configurations d'ensembles, Configurations d'examen | Un schéma est créé comme brouillon de version 0. Les configurations fixent la portée et le type d'entité exacts, l'ordre des membres, l'approbation facultative, le mode séquentiel, le déclencheur d'achèvement et l'état actif. Utilisez de préférence les éditeurs de volet pour publier la configuration de production. |
| Exécution des examens | Ensembles d'examens, Examens | Les enregistrements pointent vers des entités sources et des configurations précises. Un nouvel examen copie les indicateurs de résultats personnalisés, d'alignement et d'examinateurs du schéma actif. Un changement de schéma actualise ces indicateurs; une restauration exige un schéma actif, tandis qu'une restauration avec le même schéma conserve l'instantané existant. |
| Achèvement | Achèvements | Stocke l'identité typée de l'entité, la valeur, les commentaires, l'utilisateur Common et la date. Le travail métier normal doit utiliser l'action d'exécution de l'enregistrement source. |
| Conception des recommandations | Schémas de recommandation, Configurations de recommandation | Les schémas portent l'identité bilingue, le type d'entité, le statut, le résultat et la définition structurée. Les configurations lient un schéma et un modèle d'approbation facultatif à une portée et un type exacts. |
| Exécution des recommandations | Recommandations | Stocke la configuration, l'identité typée de l'entité, la valeur de recommandation et les réponses. Le travail normal doit utiliser le flux de la source. |

## Autorisation et validation

La liste et la lecture exigent normalement `system:read` à portée globale; la création exige `system:create`; la modification, la suppression logique et la restauration exigent `system:update`. La création et la modification valident avec le schéma Zod de la ressource, puis reconstruisent l'autorisation globale dans une transaction avant la mutation. La modification verrouille la ligne cible ou utilise le chemin de verrouillage plus strict de la ressource. Un nom de ressource inconnu, un identifiant manquant, une mutation en lecture seule, une référence ou un JSON invalide et une validation localisée produisent l'enveloppe d'erreur API standard.

La recherche neutralise les caractères génériques SQL. Les identifiants bigint sont acceptés comme chaînes ou nombres lorsque le contrat le prévoit et les API exposées par PostgreSQL/Kysely les retournent sous forme de chaînes. Une modification est partielle, mais l'enregistrement fusionné doit demeurer valide.

Deux routes de recherche partagées accompagnent le gestionnaire générique :

| Route | Accès et forme |
| --- | --- |
| `GET /api/admin/agency/approval-behalf-types` | Exige `system:read` global. Retourne une liste interagences paginée avec les noms bilingues du type de représentation et de l'agence, `egcs_ay_require_actual`, l'état de suppression, le `total` filtré et les statistiques globales non filtrées `stats.total` et `stats.active`. La recherche traite `%`, `_` et les caractères d'échappement comme du texte littéral et porte aussi sur l'identifiant numérique. Une requête `deleted` explicite l'emporte sur `status=active|deleted`. |
| `GET /api/metadata/enums?name=...` | Route volontairement publique afin que la connexion et les contrôles partagés puissent charger les valeurs autorisées. Retourne un simple tableau ordonné de chaînes; elle n'accepte jamais un nom arbitraire de type PostgreSQL. `ability` retourne le catalogue statique des capacités, plusieurs énumérations applicatives proviennent de constantes statiques et les autres énumérations autorisées suivent l'ordre PostgreSQL. Un nom invalide produit l'erreur localisée `ENUM_INVALID`. |

La route des types de représentation est un inventaire administratif, et non le sélecteur d'agence à portée limitée. Ses statistiques décrivent la table entière même lorsque la liste d'éléments est recherchée ou filtrée. Les libellés d'énumération affichés dans les contrôles sont traduits côté client à partir de ces codes stables; cette route ne retourne pas de texte d'affichage localisé.

## Dépendances et rétablissement

Créez les références avant les configurations, puis les configurations avant les enregistrements d'exécution. Créez notamment les utilisateurs actifs et les portées d'agence ou de volet avant les configurations d'approbation ou d'examen; publiez les schémas et modèles de production dans leurs éditeurs spécialisés avant de matérialiser le travail.

Si une recherche est vide, vérifiez que la ressource existe, n'est pas supprimée, respecte les filtres d'agence et de type d'entité et que vous avez la permission de lecture à sa portée. Si une restauration échoue, restaurez ou remplacez d'abord les dépendances actives exigées. Si l'enregistrement signale un changement concurrent de permission ou de propriété, rechargez la page au lieu de soumettre de nouveau un état périmé.

L'Administration commune est une surface experte de configuration et de réparation, pas un remplacement des pages d'exécution normales. Une modification directe d'une configuration active ou d'un enregistrement d'exécution peut différencier le travail nouveau et historique. Préservez l'historique figé et publiez une nouvelle version lorsque le processus métier change.

![Ressources de l'Administration commune](/screenshots/fr/common-admin.png)

_La capture utilise des données de développement préchargées. Une installation neuve ne contient pas ces exemples._
