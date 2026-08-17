# Agences

Les agences constituent la racine administrative des programmes et de la plupart des données de référence opérationnelles. La portée d'une agence est aussi une limite d'autorisation : voir l'identifiant d'une agence dans un autre dossier n'accorde aucun accès à celle-ci.

## Accès et permissions

Le serveur applique chaque autorisation. La visibilité de la navigation et les contrôles côté client facilitent l'utilisation, mais ne constituent pas une mesure d'autorisation.

| Opération | Portée requise |
| --- | --- |
| Lister ou consulter les agences et leurs données de référence | Une attribution `agency:read` applicable |
| Créer une agence | Permission globale `agency:create` |
| Modifier ou supprimer une agence | `agency:update` ou `agency:delete` pour cette agence précise |
| Créer ou supprimer des données de référence de l'agence | Permission correspondante pour cette agence précise |
| Créer un programme depuis l'onglet Programmes | `transfer_payment:create` pour cette agence précise |

Un dossier enfant absent et un dossier inaccessible produisent normalement la même réponse « introuvable ». Un identifiant ne peut donc pas révéler des données d'une autre agence.

## Liste et profil de l'agence

La page Agences offre la recherche de texte littéral, le filtre de statut, la pagination, le choix des colonnes, la sélection des lignes et les actions de création, de modification et de suppression. `%` et `_` sont traités comme des caractères ordinaires, et non comme des caractères génériques SQL. Le sommaire indique le nombre total et le nombre actif d'agences dans la portée de l'utilisateur.

Le formulaire d'agence contient :

| Champ | Règle |
| --- | --- |
| Organisation du plan comptable pangouvernemental (PCPG) | Recherche serveur obligatoire; la création exige l'accès global de création et la modification exige l'accès à l'agence précise |
| Identifiant du système financier | Identifiant numérique obligatoire |
| Noms français et anglais | Obligatoires, maximum de 100 caractères chacun |
| Abréviations française et anglaise | Obligatoires, maximum de 10 caractères chacune |
| Statut | Ébauche, actif ou inactif |

L'onglet Général affiche ces valeurs. Une modification du profil remplace uniquement les champs soumis. La combinaison active de l'identifiant du système financier, des deux noms et du statut doit être unique.

## Navigation de la fiche

La fiche comporte dix onglets pouvant être liés directement :

1. Général
2. Programmes
3. Catégories de coûts
4. Exercices financiers
5. Bases de retenue
6. Types d'adresse
7. Sous-types de demandeur ou bénéficiaire
8. Approbation au nom d'autrui
9. Types d'entente
10. Extensions

Chaque onglet de données de référence offre la recherche littérale, le filtre de statut, la pagination et les totaux de l'agence. La recherche et le statut modifient les lignes affichées et le total paginé, tandis que le sommaire demeure celui de toute l'agence.

## Programmes

Programmes liste les profils de paiements de transfert appartenant à l'agence. Les utilisateurs autorisés peuvent créer directement un profil ou lancer l'assistant de programme; l'agence courante est imposée comme propriétaire. Une vérification verrouillée de l'état actif empêche une suppression concurrente de l'agence d'accepter un nouveau programme.

Les programmes contiennent des volets. Configurez les exercices financiers, les catégories de coûts et les autres valeurs de recherche nécessaires avant l'utilisation opérationnelle d'un programme.

## Données de référence de l'agence

| Onglet | Valeurs conservées et contraintes | Actions prises en charge | Utilisation principale |
| --- | --- | --- | --- |
| Catégories de coûts | Noms français et anglais obligatoires, chacun unique parmi les catégories actives de l'agence | Lister, créer, supprimer logiquement | Regroupement financier des programmes, ententes, réclamations, paiements et répartitions |
| Éléments de catégorie de coûts | Noms français et anglais obligatoires, chacun unique parmi les éléments actifs de sa catégorie | Lister, créer, supprimer logiquement | Classement détaillé des budgets et des dépenses |
| Exercices financiers | Libellé d'au plus 9 caractères, année de 1900 à 2100, dates de début et de fin, la fin ne précédant pas le début | Lister, créer, supprimer logiquement | Budgets, prévisions, engagements, paiements, réclamations et périodes de surveillance |
| Bases de retenue | Code obligatoire et noms français et anglais; le code actif est unique dans l'agence | Lister, créer, modifier, supprimer logiquement | Configuration des retenues d'une entente |
| Types d'adresse | Noms français et anglais obligatoires, chacun unique parmi les valeurs actives de l'agence | Lister, créer, supprimer logiquement | Classement des adresses des promoteurs et des ententes |
| Sous-types de demandeur ou bénéficiaire | Type de demandeur ou bénéficiaire, nom et description bilingues obligatoires; les noms sont uniques pour la combinaison agence/type active | Lister, créer, supprimer logiquement | Classement offert aux promoteurs dont l'agence responsable possède le sous-type |
| Approbation au nom d'autrui | Noms français et anglais obligatoires et indicateur `require actual`; les noms sont uniques parmi les valeurs actives de l'agence | Lister, créer, supprimer logiquement | Règles d'approbation déléguée et exigence des renseignements sur l'approbateur réel |
| Types d'entente | Valeur d'énumération du type d'entente et noms français et anglais obligatoires; les noms sont uniques pour la combinaison agence/type active | Lister, créer, supprimer logiquement | Classement des ententes créées pour l'agence |

Ces listes n'offrent pas toutes une action générale de renommage ou de modification. Lorsqu'une ressource permet seulement la création et la suppression, créez une valeur corrigée puis retirez la valeur désuète. Bases de retenue constitue l'exception et offre une action de modification.

## Cycle de vie, concurrence et suppression

Les suppressions d'agences et de leurs enfants sont logiques (`_deleted = true`), et non physiques. Les valeurs supprimées disparaissent des recherches actives tandis que les clés étrangères historiques demeurent intactes.

Les écritures sensibles recalculent l'autorisation et la propriété dans des transactions protégées par des verrous. L'opération échoue de façon sûre si l'attribution de l'utilisateur, l'agence ou une chaîne de propriété a changé simultanément. Les recherches et mutations d'enfants confirment aussi que l'agence propriétaire est toujours active.

La suppression d'une agence exige l'accès de suppression à cette agence précise et une vue à jour de son graphe d'attributions. Elle est bloquée lorsque l'état d'une extension empêche la suppression. Une suppression réussie retire aussi les rôles de l'agence, leurs permissions, les attributions de portée de programme et les attributions de rôles aux utilisateurs qui pourraient autrement maintenir un accès. Les autres dossiers enfants historiques ne sont pas supprimés physiquement; ils deviennent indisponibles par les chemins d'agence active.

## Extensions

L'onglet Extensions présente les extensions enregistrées et leur état d'activation pour l'agence. Seules les extensions activées pour l'agence peuvent être configurées à la portée d'un volet. La désactivation dans l'agence désactive l'extension pour tous ses volets. La disponibilité, l'autorisation, la configuration, le stockage et les migrations demeurent régis par le cycle de vie des extensions de l'hôte.

## Ordre de configuration

Pour une nouvelle agence, l'ordre de dépendance pratique est le suivant :

1. Remplir le profil Général.
2. Ajouter les exercices financiers.
3. Ajouter les catégories de coûts et leurs éléments.
4. Ajouter les bases de retenue, types d'adresse, sous-types de demandeur ou bénéficiaire, types d'approbation au nom d'autrui et types d'entente nécessaires au processus.
5. Activer les extensions requises à la portée de l'agence.
6. Créer les programmes.
7. Ajouter les volets et terminer leur configuration.

## Échecs et reprise

- Une valeur active en double produit un message de conflit localisé; modifiez le champ en conflit ou retirez la valeur existante.
- Une plage de dates, une année ou un identifiant invalide, ou encore un champ bilingue absent, produit des erreurs de validation localisées au champ.
- Une agence ou une ressource enfant absente ou inaccessible est signalée comme introuvable; vérifiez l'identifiant et la portée précise de l'utilisateur.
- Un changement simultané de l'autorisation ou du cycle de vie peut refuser une soumission autrement valide; rechargez la page avant de réessayer.
- Si l'élément PCPG sélectionné ne peut pas être rechargé, confirmez qu'il existe toujours et que la permission courante de création ou de modification autorise cette recherche.
- Les boutons d'enregistrement demeurent désactivés pendant une requête. Après une erreur d'API, la fenêtre reste disponible afin de corriger et de soumettre de nouveau les valeurs.

![Onglet Programmes d'une agence](/screenshots/fr/agency-program-setup.png)

_Capture réelle de l'environnement de développement avec données de démonstration. Les dossiers affichés sont des exemples seulement et ne sont pas créés dans une nouvelle installation._
