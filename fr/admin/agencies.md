# Agences

Les agences constituent la racine administrative des programmes et de la plupart des données de référence opérationnelles. La portée d'une agence est aussi une limite d'autorisation : voir l'identifiant d'une agence dans un autre dossier n'accorde aucun accès à celle-ci.

## Accès et permissions

Le serveur applique chaque autorisation. La visibilité de la navigation et les contrôles côté client facilitent l'utilisation, mais ne constituent pas une mesure d'autorisation.

| Opération | Portée requise |
| --- | --- |
| Lister ou consulter les agences et leurs données de référence | Une attribution `agency:read` applicable |
| Créer une agence | Permission globale `agency:create` |
| Modifier ou supprimer une agence | `agency:update` ou `agency:delete` pour cette agence précise |
| Créer, modifier ou supprimer des données de référence de l'agence | Permission correspondante pour cette agence précise |
| Créer un programme depuis l'onglet Programmes | `transfer_payment:create` pour cette agence précise |

Un dossier enfant absent et un dossier inaccessible produisent normalement la même réponse « introuvable ». Un identifiant ne peut donc pas révéler des données d'une autre agence.

## Liste et profil de l'agence

La page Agences offre la recherche de texte littéral, le filtre de statut, la pagination, le choix des colonnes, la sélection des lignes et les actions de création, de modification et de suppression. `%` et `_` sont traités comme des caractères ordinaires, et non comme des caractères génériques SQL. Le sommaire indique le nombre total et le nombre actif d'agences dans la portée de l'utilisateur.

Le formulaire d'agence contient :

| Champ | Règle |
| --- | --- |
| Organisation du plan comptable pangouvernemental (PCPG) | Recherche serveur obligatoire; la création exige l'accès global de création et la modification exige l'accès à l'agence précise |
| Identifiant du système financier | Identifiant PostgreSQL bigint positif obligatoire; le conserver sous forme de chaîne décimale |
| Noms français et anglais | Obligatoires, espaces périphériques retirés, maximum de 255 caractères Unicode chacun |
| Abréviations française et anglaise | Obligatoires, espaces périphériques retirés, maximum de 255 caractères Unicode chacune |
| Actif | Indicateur booléen de disponibilité; initialement inactif |

L'onglet Général affiche ces valeurs. Une modification du profil remplace uniquement les champs soumis. La combinaison active de l'identifiant du système financier, des deux noms et de l’indicateur actif doit être unique.

## Navigation de la fiche

La fiche comporte douze onglets pouvant être liés directement :

1. Général
2. États
3. Programmes
4. Catégories de coûts
5. Exercices financiers
6. Bases de retenue
7. Types d’adresse
8. Types de pièces jointes
9. Sous-types de demandeur ou bénéficiaire
10. Approbation au nom d’autrui
11. Types d’entente
12. Extensions

Chaque onglet de données de référence offre la recherche littérale, le filtre de statut, la pagination et les totaux de l'agence. La recherche et le statut modifient les lignes affichées et le total paginé, tandis que le sommaire demeure celui de toute l'agence.

## Programmes

Programmes liste les profils de paiements de transfert appartenant à l'agence. Les utilisateurs autorisés peuvent créer directement un profil ou lancer l'assistant de programme; l'agence courante est imposée comme propriétaire. Une vérification verrouillée de l'état actif empêche une suppression concurrente de l'agence d'accepter un nouveau programme.

Les programmes contiennent des volets. Configurez les exercices financiers, les catégories de coûts et les autres valeurs de recherche nécessaires avant l'utilisation opérationnelle d'un programme.

## Données de référence de l'agence

| Onglet | Valeurs conservées et contraintes | Actions prises en charge | Utilisation principale |
| --- | --- | --- | --- |
| Catégories de coûts | Noms français et anglais obligatoires, chacun unique parmi les catégories actives de l'agence | Lister, créer, modifier, supprimer logiquement | Regroupement financier des programmes, ententes, réclamations, paiements et répartitions |
| Éléments de catégorie de coûts | Noms français et anglais obligatoires, chacun unique parmi les éléments actifs de sa catégorie | Lister, créer, modifier, supprimer logiquement | Classement détaillé des budgets et des dépenses |
| Exercices financiers | Libellé d'au plus 9 caractères, année de 1900 à 2100, dates de début et de fin, la fin ne précédant pas le début | Lister, créer, modifier, supprimer logiquement | Budgets, prévisions, engagements, paiements, réclamations et périodes de surveillance |
| Bases de retenue | Code obligatoire et noms français et anglais; le code actif est unique dans l'agence | Lister, créer, modifier, supprimer logiquement | Configuration des retenues d'une entente |
| Types d'adresse | Noms français et anglais obligatoires, chacun unique parmi les valeurs actives de l'agence | Lister, créer, modifier, supprimer logiquement | Classement des adresses des promoteurs et des ententes |
| Sous-types de demandeur ou bénéficiaire | Type de demandeur ou bénéficiaire, nom et description bilingues obligatoires; les noms sont uniques pour la combinaison agence/type active | Lister, créer, modifier, supprimer logiquement | Classement offert aux promoteurs dont l'agence responsable possède le sous-type |
| Approbation au nom d'autrui | Noms français et anglais obligatoires et indicateur `require actual`; les noms sont uniques parmi les valeurs actives de l'agence | Lister, créer, modifier, supprimer logiquement | Règles d'approbation déléguée et exigence des renseignements sur l'approbateur réel |
| Types d'entente | Valeur d'énumération du type d'entente et noms français et anglais obligatoires; les noms sont uniques pour la combinaison agence/type active | Lister, créer, modifier, supprimer logiquement | Classement des ententes créées pour l'agence |

Les références peuvent être modifiées en place. Utilisez **Modifier** pour corriger un libellé tout en conservant l’identifiant des dossiers existants; supprimez seulement pour retirer une valeur. La modification d’un exercice valide les dates de début et de fin fusionnées, même si une requête PATCH ne change qu’une date. Un doublon ou une sélection périmée laisse le formulaire disponible pour correction.

### Disponibilité et calculs par défaut

Les catégories de coûts et leurs éléments possèdent un indicateur **Actif** distinct de la suppression. Les correspondances de lignes de coûts du volet possèdent aussi leur propre disponibilité. Tous les niveaux requis doivent être disponibles pour une nouvelle sélection au budget d’une entente. Les références déjà enregistrées peuvent rester visibles sans être proposées pour du nouveau travail; ne les remplacez pas simplement parce qu’une recherche les omet.

Une ligne de coûts peut définir un calcul par défaut pour le budget d’entente :

| Mode | Configuration |
| --- | --- |
| Manuel | Saisir directement le montant soutenu. Aucune catégorie source, aucun pourcentage ni remplacement de pourcentage n’est permis. |
| Catégorie | Choisir une autre catégorie du même organisme contenant seulement des lignes manuelles; saisir un pourcentage de 0 à 100 avec au plus deux décimales. |
| Toutes les autres | Calculer un pourcentage des autres lignes admissibles; laisser la catégorie source vide. |

Une catégorie utilisée comme source ne peut pas recevoir de lignes calculées. Une ligne ne peut dépendre de sa propre catégorie ni d’une catégorie d’un autre organisme. **Autoriser le remplacement du pourcentage** permet à l’utilisateur de l’entente de modifier le pourcentage par défaut capturé. Modifier la valeur de l’organisme ne réécrit pas les lignes d’entente existantes.

Par exemple, configurez « Avantages sociaux » à 10 % de la catégorie manuelle « Salaires », puis rendez la ligne disponible dans les éléments de catégorie de coûts du volet. Un salaire soutenu de 10 000,00 produit 1 000,00 d’avantages. Consultez [Budget](../agreements/budget.md) pour le regroupement, l’arrondissement au dollar, le calcul sur toutes les autres lignes et les contrôles transactionnels de capacité.

### Types de pièces jointes

Créez les classifications bilingues sélectionnées lors du téléversement de [pièces jointes](../concepts/attachments.md). Elles appartiennent à l’organisme, et non à un catalogue global d’administration commune. Créer, modifier ou supprimer exige la permission correspondante pour cet organisme précis. Les types retirés sont exclus des nouveaux choix; les métadonnées historiques restent liées au type enregistré.

## États opérationnels

Chaque agence possède son catalogue configurable d’états opérationnels. Une nouvelle agence reçoit un état Ébauche protégé. L’onglet États affiche les définitions actives et supprimées avec leur badge localisé, leur couleur, leur icône Lucide et leur classe de cycle de vie : normale, lecture seule ou terminale.

L’accès de modification de l’agence permet de créer un état normal et de changer sa présentation bilingue. Définir les indicateurs lecture seule ou terminal, supprimer ou restaurer exige l’accès de suppression de l’agence. L’état Ébauche ne peut être modifié, supprimé ni restauré. Un état devenu terminal ne peut plus redevenir normal ou en lecture seule. Les noms sont obligatoires dans les deux langues, la couleur doit être une valeur hexadécimale de six chiffres, l’icône doit être un identifiant Lucide autorisé et les noms actifs sont uniques sans égard à la casse dans l’agence.

La suppression est refusée tant que des dossiers opérationnels, une configuration ou publication de flux de travaux, ou une intégration hôte enregistrée référence l’état. Ne restaurez qu’après avoir résolu tout conflit de nom actif. Les définitions en lecture seule et terminales figent les mutations applicables du dossier opérationnel; elles ne remplacent pas les moteurs distincts d’état stable de publication et d’exécution.

### Transitions de rapprochement des réclamations

L’onglet États configure aussi deux transitions facultatives de la réclamation. L’état de **début** est appliqué lorsque le rapprochement commence; il doit être normal, sans lecture seule et non terminal, dans cet organisme. L’état **final** est appliqué lorsqu’un rapprochement final atteint une issue positive d’achèvement; il doit être terminal et appartenir au même organisme. Une sélection vide désactive la transition correspondante.

Par exemple, choisissez « En rapprochement » au début et « Réclamation fermée » à la fin. Un rapprochement final inachevé ou refusé ne ferme pas la réclamation simplement parce que son indicateur final est coché. Enregistrer cette configuration exige l’accès de modification de l’organisme. Cela n’accorde aucun droit sur une réclamation et ne réécrit pas le travail déjà achevé.

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
