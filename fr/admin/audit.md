# Journaux d’audit et d’accès

Utilisez **Administration → Audit** pour examiner les changements enregistrés, les événements de sécurité et les requêtes applicatives. L’espace est en lecture seule. Il aide à déterminer qui a modifié une fiche et quelle requête était concernée; il ne constitue pas un relevé complet de tout ce qu’une personne a vu ou fait hors de l’application.

## Accès

Un rôle doit accorder explicitement le sujet `audit` à portée **globale**. Chaque niveau pris en charge accorde seulement la lecture Audit. Une permission d’organisme, une affectation ou la permission Système seule ne donne pas cet accès. Audit ne propose aucune action de création, modification, suppression, affectation, approbation ou transition.

Accordez cette permission aux personnes dont les fonctions exigent des preuves couvrant plusieurs organismes. La page et chaque API de liste ou de détail l’appliquent séparément des permissions sur les dossiers métier.

## Trouver un événement

1. Ouvrez Audit et choisissez la vue des événements d’audit ou des accès dans la navigation verticale.
2. Restreignez l’intervalle de date et heure, puis ajoutez une table, un acteur, une opération, un identifiant de fiche ou de requête connu.
3. Recherchez du texte dans les tables, identifiants de requête, opérations et identifiants d’acteur. La recherche est littérale; `%` et `_` ne sont pas des caractères génériques.
4. Ouvrez les détails de la ligne pour consulter la preuve capturée.
5. Reprenez son identifiant de requête dans le filtre correspondant pour corréler les changements et requêtes de la même demande.

Les résultats sont paginés côté serveur, du plus récent au plus ancien. Une page contient initialement 20 lignes; l’API accepte de 1 à 100. Les filtres exacts correspondent aux valeurs exactes; les bornes temporelles sont inclusives. L’API exige des dates-heures ISO et un début qui ne suit pas la fin. Le navigateur convertit ses valeurs locales en ISO. Changer de vue ou de filtre ferme le détail et retourne à la première page.

L’acteur est le `user.id` du compte authentifié, non l’identifiant Common User des affectations. Les requêtes d’authentification peuvent être anonymes, les tâches de fond attribuées au système et les mutations directes attribuées à la base. L’absence d’identifiant utilisateur ne signifie donc pas à elle seule un défaut d’autorisation.

## Comprendre les preuves

| Preuve | Contenu | Limite importante |
| --- | --- | --- |
| Changement | Valeurs initiales d’insertion; paires ancienne/nouvelle des colonnes modifiées; valeurs conservées de suppression et de restauration. | Capture dans la transaction métier. Une mise à jour inchangée ne produit pas d’événement; un échec de capture annule la mutation. |
| Sécurité | Action enregistrée de sécurité d’identité ou de rôle, cible et métadonnées. | Producteur distinct, qui ne remplace pas tous les événements de changement. |
| Accès | SQL expurgé, durée, résultats de requête et de transaction, nombre de lignes, corrélation et identités prises en charge. | Preuve de requête, non copie complète des résultats ni preuve que l’utilisateur les a tous lus. |

Les nombres dans la preuve de changement conservent le texte décimal afin d’éviter l’arrondissement des grands identifiants et montants exacts. Les colonnes JSON sont comparées comme valeurs complètes. Les exclusions de secrets et les politiques de capture restreinte omettent volontairement les données sensibles.

Les paramètres, littéraux SQL et commentaires sont expurgés. Une requête structurée simple sur une table peut identifier les clés primaires retournées, y compris les alias et clés composites. Les projections jointes, agrégées, brutes ou sans identifiant peuvent indiquer des identités indisponibles. Lisez les limites affichées; une projection indisponible n’est pas un résultat vide. Le filtre d’identifiant de fiche des accès cherche les valeurs de clés capturées et ne retrouve pas les identités non capturées.

## Exemple d’enquête

Supposons que le soutien doive comprendre un changement de ligne budgétaire signalé à 14 h 10.

1. Dans les événements d’audit, choisissez un intervalle étroit et indiquez la table ou l’identifiant pertinent.
2. Ouvrez le changement et comparez les anciennes et nouvelles valeurs, l’acteur et l’opération.
3. Filtrez sur son identifiant de requête pour voir les autres changements du même enregistrement. Un budget en pourcentage peut modifier plusieurs lignes dépendantes dans une transaction.
4. Ouvrez Accès avec cet identifiant pour examiner les preuves persistées et le résultat transactionnel.
5. Si Accès est d’abord vide, attendez l’écriture du tampon puis rechargez. Vérifiez la conservation et la capture avant de conclure qu’une preuve devrait exister.

Cette procédure ne reconstruit pas le corps complet d’une demande ni les résultats indisponibles. Utilisez les preuves conservées et le dossier métier dans le cadre de vos fonctions autorisées.

## Conservation et accès différés

La page affiche les durées configurées sans les modifier. Les valeurs initiales sont **365 jours** pour l’audit et la sécurité et **30 jours** pour les accès. Les opérateurs les configurent au déploiement puis redémarrent. L’expiration s’exécute au démarrage et chaque heure, retirant au plus 1 000 lignes expirées par table et passage; un grand retard nécessite plusieurs passages.

Les accès utilisent une file bornée en mémoire par processus. Une preuve devient admissible après la libération de sa transaction/connexion et la fin ou déconnexion de sa réponse HTTP. Un minuteur de dix secondes écrit des lots d’au plus 100. Le navigateur affiche seulement les lignes persistées; leur visibilité immédiate n’est pas garantie.

La file est limitée à 2 000 événements et 32 Mio de charge sérialisée estimée. Les pannes déclenchent des reprises espacées; une file pleine abandonne les nouveaux événements avec un signalement structuré. Un arrêt brutal ou déploiement peut perdre les éléments en attente; l’arrêt normal tente une vidange bornée. `GCS_ACCESS_LOG_ENABLED=false` désactive la capture d’accès tout en conservant les changements et la sécurité. Les anciennes lignes d’accès restent lisibles jusqu’à expiration.

## Échecs et reprise

| Symptôme | Action |
| --- | --- |
| Navigation Audit absente ou accès refusé | Vérifiez une permission Audit globale explicite; Système ne suffit pas. |
| Échec de chargement de liste, détail ou conservation | Utilisez l’action de reprise visible. Un échec n’est pas un ensemble vide. |
| Aucune ligne d’accès pour une demande récente réussie | Attendez le lot, rechargez et demandez à l’opérateur de vérifier l’activation, le retard et les événements de perte ou d’échec. |
| Preuve ancienne absente | Comparez son âge à la conservation. Un filtre ne recrée pas une preuve expirée ou non capturée. |
| API indisponible au démarrage | L’audit fait partie de la disponibilité. L’opérateur doit rétablir le démarrage plutôt que poursuivre sans capture initialisée. |

Les preuves refusent les mises à jour, suppressions et troncatures ordinaires. La conservation utilise une voie d’expiration restreinte. Le propriétaire de la base peut néanmoins changer les politiques ou déclencheurs; ce mécanisme ne protège pas contre lui. Les lectures directes de la base et le contenu du stockage objet échappent à la capture d’accès applicative. Consultez la [configuration d’exploitation](../operator/configuration.md) et le [modèle de données](../developer/data-model.md).
