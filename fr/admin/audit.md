# Journaux d'audit et d'accès

Utilisez **Administration → Audit** pour examiner les changements enregistrés, les événements de sécurité et les requêtes applicatives. Audit est en lecture seule. Il permet de trouver qui a modifié une fiche et quelle requête a effectué le changement. Il ne consigne pas tout ce qu'une personne a vu ou fait.

## Accès

Un rôle doit accorder explicitement `audit:read` à portée globale ou d'agence. Une permission globale permet de lire les preuves de toutes les agences; une permission d'agence retourne seulement les événements attribués à cette agence. Les résultats de recherche, les comptes et les détails contiennent seulement les événements que vous pouvez lire. L'application vérifie vos permissions Audit actuelles à chaque chargement d'une liste. Une permission Système, une permission métier ou une affectation exacte ne donne pas accès à Audit. Vous ne pouvez ni créer, ni modifier, ni supprimer des événements Audit.

Les valeurs d'entrée capturées des requêtes exigent la capacité distincte `audit:view_audit_inputs`. Un lecteur Audit sans cette capacité voit l'événement et l'état de visibilité des entrées, mais pas les valeurs capturées. La permission de voir les entrées d'une agence révèle seulement les preuves attribuées à cette agence. Les entrées attribuées globalement exigent une permission globale. L'application retire les valeurs sensibles avant la capture. Certains événements n'ont aucune entrée disponible. Réservez ces permissions aux personnes dont les fonctions exigent ces preuves.

L'agence d'un événement détermine qui peut le lire. Une agence liée ou l'agence de suivi affichée sur un dossier peut différer de celle de l'événement. Les principales règles sont les suivantes :

- Les profils partagés de promoteur et l'historique du financement utilisent les agences couvertes par les rôles actifs d'agence de l'acteur. Leurs dossiers enfants suivent la même règle sauf s'ils ont une agence propriétaire explicite. Les notes de promoteur et les identifiants financiers d'agence utilisent leur agence explicite. L'agence principale seule ne détermine pas qui peut lire ces événements.
- Les possibilités et les dossiers utilisent l'agence du volet d'ancrage et du programme de la possibilité. La sélection d'un autre volet n'ajoute pas de propriétaire Audit.
- Les approbations, les collectes de données et les autres dossiers utilisés dans plusieurs espaces suivent le propriétaire du dossier source réel.
- Les événements d'aide guidée du système sont attribués globalement. L'aide guidée d'agence et les entrées du catalogue d'agence appartiennent à leur agence, y compris leurs fiches de publication.

Pour les dossiers partagés, les événements sont attribués globalement si la personne qui fait le changement n'a aucun rôle actif d'agence. Les changements effectués sans personne doivent préciser leur attribution. L'application ne choisit pas une agence à partir d'un libellé affiché.

Par exemple, une affectation à une entente peut permettre à un agent de traiter cette entente, mais pas d'examiner ses événements Audit. Si vous devez expliquer un changement budgétaire et que vous n'avez pas accès à Audit, demandez à un lecteur Audit autorisé d'enquêter avec la référence du dossier et l'heure approximative de l'enregistrement.

## Trouver un événement

1. Ouvrez Audit et choisissez la vue des événements d'audit ou des accès dans la navigation verticale.
2. Restreignez l'intervalle de date et heure. Ajoutez une table, un acteur, une opération, un identifiant de fiche ou de requête si vous le connaissez.
3. Recherchez du texte dans les tables, identifiants de requête, opérations et identifiants d'acteur. La recherche est littérale; `%` et `_` ne sont pas des caractères génériques.
4. Ouvrez les détails de la ligne pour consulter la preuve capturée.
5. Copiez son identifiant de requête dans le filtre correspondant pour trouver les changements et requêtes de la même demande.

Les résultats apparaissent du plus récent au plus ancien, avec 20 lignes par page par défaut. Choisissez un acteur par nom de connexion ou identifiant, une table dans la liste et une opération ou un résultat. Les acteurs peuvent inclure des comptes supprimés conservés dans l'historique. Si une liste échoue, utilisez sa commande de reprise. Les filtres exacts cherchent la valeur choisie. L'intervalle de dates inclut ses deux bornes. Saisissez les dates à votre heure locale, avec un début antérieur ou égal à la fin. Les filtres textuels acceptent au plus 200 caractères et refusent les caractères nuls. Si un filtre collé échoue, effacez-le et saisissez de nouveau l'identifiant. Changer de vue ou de filtre ferme le détail et retourne à la première page.

La vue Accès affiche les sept derniers jours par défaut. Choisissez un intervalle explicite pour chercher des événements plus anciens encore conservés. Cet intervalle reste fixe pendant la navigation vers la page suivante ou une page déjà visitée. Accès affiche le nombre de lignes de la page, sans total ni saut à la dernière page. Changez un filtre ou rouvrez la vue pour lancer une nouvelle recherche. Les événements d'audit gardent les pages numérotées et un total.

L'acteur identifie le compte de connexion, et non l'identifiant Common User utilisé pour les affectations. Les requêtes de connexion peuvent être anonymes. Les tâches de fond peuvent être attribuées au système, et les changements directs dans la base peuvent être attribués à la base. L'absence d'identifiant utilisateur ne signifie donc pas à elle seule qu'une action était non autorisée.

## Comprendre les preuves

| Preuve | Contenu | Limite importante |
| --- | --- | --- |
| Changement | Valeurs initiales des nouveaux dossiers, anciennes et nouvelles valeurs des colonnes modifiées, et valeurs conservées des suppressions et restaurations. | Enregistré avec le changement du dossier. Enregistrer des valeurs inchangées ne produit aucun événement. Si la capture échoue, le changement du dossier est annulé. |
| Sécurité | Une action de sécurité sur un utilisateur ou un rôle, le dossier concerné et les détails connexes. | Enregistré séparément des événements de changement. Ne les remplace pas. |
| Accès | SQL sans détails sensibles, durée, résultat de la requête et de la transaction, nombre de lignes, liens de requête et identifiants capturés des dossiers retournés. | Preuve d'une requête plutôt qu'une copie complète de ses résultats. Ne prouve pas que l'utilisateur les a tous lus. |

Les preuves de changement conservent les montants exacts et les grands identifiants. Les changements d'un champ JSON montrent sa valeur complète. Les règles de capture excluent les identifiants de connexion, les secrets et les autres valeurs restreintes.

Les valeurs SQL et les commentaires sont retirés. Les entrées capturées des requêtes apparaissent seulement avec la permission distincte de voir les entrées, après le retrait des valeurs sensibles. Elles ne copient pas tout le corps de la demande. Une requête simple sur une table peut enregistrer les identifiants des dossiers retournés. Ces identifiants proviennent des clés primaires de la base, y compris les clés retournées sous un autre nom ou composées de plusieurs valeurs. Les requêtes plus complexes qui combinent des tables, résument les résultats, utilisent du SQL brut ou omettent les identifiants peuvent ne pas enregistrer ces identités. Lisez les limites affichées dans les détails. L'absence d'identifiants de dossier ne signifie pas que la requête n'a retourné aucun résultat. Le filtre d'identifiant de fiche des accès cherche les valeurs de clés capturées et ne retrouve pas les identités non capturées.

## Exemple d'enquête

Supposons que le soutien doive comprendre un changement de ligne budgétaire signalé à 14 h 10.

1. Dans les événements d'audit, choisissez un intervalle étroit et indiquez la table ou l'identifiant pertinent.
2. Ouvrez le changement et comparez les anciennes et nouvelles valeurs, l'acteur et l'opération.
3. Filtrez sur son identifiant de requête pour voir les autres changements du même enregistrement. Un budget en pourcentage peut modifier plusieurs lignes dépendantes dans une transaction.
4. Ouvrez Accès avec cet identifiant pour examiner les preuves de requête enregistrées. Vérifiez si la transaction s'est terminée ou si ses changements ont été annulés.
5. Si Accès est d'abord vide, attendez l'enregistrement des événements en attente, puis rechargez. Vérifiez la conservation et la capture avant de conclure qu'une preuve devrait exister.

Cette procédure ne reconstruit pas le corps complet d'une demande ni les résultats indisponibles. Utilisez les preuves conservées et le dossier métier dans le cadre de vos fonctions autorisées.

## Conservation et accès différés

La page affiche les durées configurées sans les modifier. Les valeurs par défaut sont de 365 jours pour l'audit et la sécurité et de 30 jours pour les accès. Les opérateurs modifient ces paramètres au déploiement et redémarrent l'application. La purge s'exécute chaque heure par les files de travail. Chaque exécution traite au plus dix lots de 1 000 lignes expirées; un grand retard peut demander plusieurs exécutions. La conservation des accès est distincte de celle des changements et de la sécurité.

Les événements d'accès attendent dans une file de chaque processus de l'application. Ils sont prêts à être enregistrés après la libération de la transaction ou de la connexion et la fin ou la déconnexion de la réponse HTTP. Au niveau de file de dix secondes, l'application tente par défaut au plus dix lots de 100 événements prêts. Les lots échoués et l'isolement de données invalides comptent aussi dans cette limite. Les exploitants peuvent modifier le nombre maximal de lots. Le navigateur affiche seulement les événements enregistrés. Une requête récente peut donc ne pas apparaître immédiatement.

La file contient au plus 2 000 événements et une estimation de 32 Mio de données d'événement. Après un échec, l'application attend avant de réessayer. Lorsque la file est pleine, l'application abandonne les nouveaux événements et signale la perte aux opérateurs. Un arrêt brutal ou un déploiement peut perdre les événements en attente. À l'arrêt normal, l'application tente de les enregistrer dans un délai limité. Les opérateurs peuvent désactiver la capture d'accès avec `GCS_ACCESS_LOG_ENABLED=false`. La capture des changements et de la sécurité continue. Les anciennes lignes d'accès restent lisibles jusqu'à expiration.

L'historique des accès utilise une base distincte. Une panne peut retarder la capture ou rendre Accès indisponible pendant que le travail métier et l'audit des changements continuent. Aucun repli vers la base métier n'existe. Si Accès est indisponible, demandez à un exploitant de rétablir sa base, puis réessayez. Les anciens accès dans la base métier ne sont pas déplacés automatiquement.

## Échecs et reprise

| Symptôme | Action |
| --- | --- |
| Navigation Audit absente ou accès refusé | Vérifiez `audit:read` explicite, global ou pour l'agence correspondante; Système ne suffit pas. |
| Événement ou entrée capturée absent | Vérifiez l'agence propriétaire et `audit:view_audit_inputs`; une entrée restreinte ou indisponible ne prouve pas qu'aucune requête n'a eu lieu. |
| Échec de chargement de liste, détail ou conservation | Utilisez l'action de reprise visible. Un échec n'est pas un ensemble vide. |
| Aucune ligne d'accès pour une demande récente réussie | Attendez l'enregistrement des événements, puis rechargez. Demandez à l'opérateur de vérifier si la capture est activée, si des événements attendent ou si des échecs ou pertes sont signalés. |
| Preuve ancienne absente | Comparez son âge à la conservation. Un filtre ne recrée pas une preuve expirée ou non capturée. |
| API indisponible au démarrage | L'audit fait partie de la disponibilité. L'opérateur doit rétablir le démarrage plutôt que poursuivre sans capture initialisée. |

Les opérations ordinaires de base de données ne peuvent ni modifier, ni supprimer, ni vider les preuves Audit. Seul le processus d'expiration restreint retire les preuves expirées. Le propriétaire de la base peut néanmoins changer les règles qui les protègent. La capture d'accès applicative ne couvre ni les lectures directes de la base ni le contenu des fichiers du stockage objet. Consultez la [configuration d'exploitation](../operator/configuration.md) pour les paramètres de déploiement et le [modèle de données](../developer/data-model.md) pour le stockage.
