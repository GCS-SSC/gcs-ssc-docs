# Flux de travail

Les flux relient les examens, recommandations et approbations publiés d’un volet à un dossier métier exact. Choisissez explicitement un flux `standard` pour un processus facultatif, utilisez `approval_submission` pour l’approbation du dossier et `risk_rating` pour calculer le risque d’une entente. La clôture utilise la soumission d’approbation, sans objet distinct `close_out`. Les statuts métier, états de publication et états d’exécution sont distincts.

## Configurer un flux

Ouvrez un programme et un volet, puis choisissez **Configurations de flux**. L’éditeur de détail regroupe l’identité, l’acheminement, les transitions et le comportement.

| Champ | Signification |
| --- | --- |
| Identité anglaise et française | Nom et description administratifs. |
| Type d’entité | Cible d’exécution. |
| Démarrage | Dépend des capacités de la cible : sélection explicite d’un flux standard, approbation explicite de l’entente et soumission d’approbation des enfants par Achèvement. |
| Objet | `standard`, `approval_submission` ou `risk_rating` réservé aux ententes. |
| États de départ permis | États sources à partir desquels le flux peut commencer. |
| État d’annulation/d’échec d’exécution | Transition de repli globale en cas d’annulation ou d’échec déterministe du moteur. |
| Membres ordonnés | Toute séquence linéaire d’ensembles d’examens, d’ensembles de recommandations et de modèles d’approbation racine. Chacun a ses transitions de matérialisation, réussite et échec. |
| Propriétaires par défaut | Une correspondance par membre d’examen/recommandation imbriqué, avec réacheminement facultatif. |
| Permettre la reprise | Autorise la dernière tentative échouée à reprendre sa configuration figée. |

Une configuration appartient au volet exact de l’URL. La lecture et les mutations exigent le plafond de rôle et la portée `transfer_payment` correspondants; les affectations exactes aux dossiers métier n’accordent pas l’accès à la configuration.

L’approbation d’une entente démarre explicitement. Les modifications et clôtures exigent un flux publié de soumission d’approbation lors de l’achèvement, avec un parcours de réussite terminale. Les réclamations, rapprochements, engagements, prévisions, paiements et surveillances peuvent s’achever avec un flux d’approbation facultatif. Les séquences et propriétaires doivent être complets et uniques. Les statuts cibles sont des identifiants appartenant à l’organisme, non des mots codés en dur tels que `inreview` ou `complete`.

## Publier et retirer

Les nouvelles configurations sont des brouillons. Publier valide les dépendances et crée la version immuable 1. L’enregistrement d’une configuration publiée change seulement sa copie de travail; publier un véritable changement conserve le prochain instantané immuable, tandis que publier un contenu inchangé ne produit aucune opération.

La publication échoue lorsqu’un ensemble d’examens ou de recommandations, ou un modèle d’approbation lié, n’est pas publié ou a été retiré. Une configuration publiée épingle le plan d’examen, le plan de recommandation, les approbations des membres et l’approbation finale exacts des prochaines tentatives. Les tentatives existantes demeurent figées lorsque les administrateurs modifient ou republient la configuration.

Le retrait d’une configuration publiée est permanent et empêche toute nouvelle sélection. Les tentatives historiques conservent leur configuration et leur filiation. Seul un brouillon non référencé peut être supprimé logiquement.

## Séquence d’exécution composable

Plusieurs flux standard publiés peuvent coexister pour une portée et un type d’entité. L’utilisateur choisit explicitement une configuration admissible; l’API exige `workflowSetupId` pour `purpose: "standard"`. La soumission d’approbation et l’Évaluation du risque utilisent chacune leur publication sélectionnée. Une seule exécution peut être active par cible, tous objets confondus. Une tentative terminale libère cette contrainte; un autre flux standard admissible peut commencer, même après Achèvement si le statut métier n’est pas terminal. Achèvement ne choisit ni ne démarre jamais un flux standard.

Les membres s’exécutent strictement selon leur séquence positive unique :

1. Le moteur matérialise le prochain ensemble d’examens, ensemble de recommandations ou modèle d’approbation racine et applique sa transition de matérialisation facultative.
2. Les ensembles conservent leurs règles internes séquentielles ou parallèles et leurs approbations. Leur travail imbriqué utilise le propriétaire publié seulement si cet utilisateur conserve l’admissibilité Contributeur au propriétaire d’exécution.
3. La réussite racine applique la transition facultative du membre et matérialise atomiquement le suivant. L’échec racine applique sa transition d’échec et fait échouer l’exécution.
4. Sans autre membre, l’exécution se termine. L’annulation et l’échec déterministe utilisent les replis globaux.

Un résultat Non recommandé fait échouer l’ensemble seulement lorsque l’option publiée **Faire échouer l’ensemble si Non recommandé** de ce membre est vraie. Sinon, le moteur passe au membre suivant ou à l’étape finale. Cette politique est figée avec le plan.

Les états d’exécution sont `pending`, `active`, `awaiting_action`, `paused`, `succeeded`, `approved`, `unsuccessful`, `denied`, `cancelled` et `failed`. Ces états système ne sont pas les statuts métier configurables de l’organisme. Les éléments et l’historique immuable des transitions montrent le membre figé courant et chaque changement d’état de la cible.

## Achèvement et exemple de séquence

Achèvement constate la fin de l’édition ordinaire; ce n’est pas un statut métier modifiable. Un flux actif bloque Achèvement. Pour un enfant pris en charge, l’action démarre atomiquement la soumission d’approbation sélectionnée ou consigne `no_workflow`. Les modifications et clôtures refusent l’achèvement sans leur flux obligatoire. Si sa création échoue, l’achèvement est aussi annulé.

Sans flux applicable, les effets positifs sont immédiats. Avec un flux, ils attendent sa terminaison positive. Un engagement réussi devient actif pour son entente/type et remplace le précédent; une prévision devient active pour son entente/exercice. Un rapprochement réussi ferme son travail ouvert; s’il est final, il empêche tout rapprochement supplémentaire et peut appliquer le statut final de réclamation configuré par l’organisme. Un échec ou une annulation ne produit pas ces effets. Ajouter une configuration plus tard ne modifie pas rétroactivement un achèvement `no_workflow`.

Par exemple, configurez un flux d’approbation d’engagement avec un ensemble d’examens suivi d’un modèle d’approbation racine. Le responsable enregistre les lignes et achève l’engagement. L’action verrouille l’édition ordinaire et démarre l’examen publié. L’examen terminé transmet le travail à l’approbateur affecté. Sa dernière approbation active le nouvel engagement et désactive l’ancien du même type. Si le travail est refusé, examinez la tentative et utilisez sa reprise autorisée; ne tentez pas d’achever le même dossier une deuxième fois.

## Conditions et Évaluation du risque

Les membres peuvent dépendre des sélections personnalisées de l’entente propriétaire. Les champs se combinent par ET et les options d’un champ par OU. Le démarrage capture valeurs et admissibilité; les membres ignorés gardent leur position publiée à l’écran sans créer de tâche. Une nouvelle tentative conserve les publications initiales et capture les valeurs actuelles. Consultez les [champs personnalisés](../programs/custom-fields.md) pour les exemples, valeurs requises et contraintes de retrait.

Le flux d’Évaluation du risque se sélectionne indépendamment de l’approbation. Sa publication fixe une seule source d’évaluation et une correspondance un à un entre maxima ordonnés de notes et cotes actives du volet. Une exécution réussie associe la note au premier maximum applicable et applique la cote capturée. Une preuve invalide ou périmée suit le parcours d’échec sans remplacer l’ancienne cote. Le parcours conditionnel choisi doit conserver cette évaluation.

## Soumission d’approbation d’une entente

L’entente démarre explicitement sa soumission d’approbation. Une modification démarre sa soumission obligatoire atomiquement avec Achèvement. La section Flux partagée présente la tentative obtenue. Son démarrage exécute une transaction qui verrouille la source courante, crée l’exécution et écrit un dossier immuable `Funding_Case_Agreement_Approval_Submission` avec version de schéma 1, heure de soumission et hachage canonique SHA-256 en minuscules.

Le dossier d’une entente comprend son profil avec les libellés de référence bilingues résolus, les promoteurs liés et leurs registres, le budget courant et les activités courantes. Le dossier d’une modification comprend les types et sous-types choisis et seulement les domaines modifiés : budget pour une modification budgétaire, activités pour une modification d’activités et dates proposées pour une modification de durée. Le profil d’entente et les données de promoteurs inchangés sont omis du dossier d’une modification.

Les identifiants de version source du budget et des activités sont conservés pour la filiation. Les libellés des clés étrangères modifiables sont résolus dans le dossier afin qu’un renommage ultérieur des données de référence ne change pas ce que les approbateurs ont vu. L’interface présente le dossier enregistré dans des sections groupées et repliables sans le reconstruire à partir des valeurs courantes.

Pendant une soumission active, les opérations protégées sur le profil, le budget, les activités, la suppression et le cycle de vie de l’entente ou de la modification rejettent les écritures concurrentes. Une exécution annulée ou échouée applique l’état d’échec configuré et ne promeut aucune donnée.

## Fin de l’approbation et révisions

Avant une fin réussie, le moteur verrouille l’entente et recalcule le hachage du dossier. Une différence fait échouer la promotion. Il effectue ensuite :

1. la promotion des seuls domaines de modification approuvés dans le dossier;
2. la fermeture de la modification et l’attribution de son numéro, s’il y a lieu;
3. l’écriture d’une seule `Funding_Case_Agreement_Revision` liée à la soumission;
4. l’application de l’état de réussite configuré et l’achèvement de l’exécution.

L’approbation initiale de l’entente écrit la révision 0. Les modifications approuvées utilisent le numéro suivant la dernière révision. Le lien unique de soumission rend l’achèvement idempotent si la progression est reprise.

::: warning La capacité demeure une vérification opérationnelle
Les dossiers d’approbation figent le budget de modification proposé, mais la promotion n’ajoute toujours pas la vérification de capacité interententes du budget courant du volet. Confirmez la capacité avant l’approbation finale; l’intégrité du dossier prouve ce qui a été approuvé, non que la proposition respecte le plafond du volet.
:::

## Travailler avec une exécution

La section Flux de la source montre les actions démarrer/reprendre/annuler, la séquence figée, les états, les questions de recommandation, les étapes d’approbation, les tentatives précédentes échouées et tout dossier d’approbation immuable. L’enregistrement d’une recommandation conserve son état d’exécution modifiable; sa soumission valide les réponses requises et dérive le résultat de la question décisive publiée.

La page de recommandation de premier niveau accepte les liens directs de Travail affecté. Les mises à jour exigent une affectation active à la recommandation, un plafond Contributeur courant pour son propriétaire résolu et un élément d’exécution actif modifiable. Un utilisateur affecté à une approbation peut lire le dossier de soumission nécessaire à cette approbation même si la lecture ordinaire de l’entente n’est pas disponible.

Les affectations exactes aux recommandations, examens et approbations sont distinctes. Elles n’accordent ni le parent ni les dossiers frères. Consultez [Permissions de rôle et affectations exactes](./rbac.md).

## Annuler, reprendre et récupérer

L’annulation est disponible seulement pour une exécution active. Elle annule les enfants et éléments de flux actifs, marque l’exécution annulée et applique l’état d’échec configuré dans une transaction.

La reprise vise la dernière tentative `unsuccessful`, `denied`, `cancelled` ou `failed` lorsque sa définition figée la permet et qu’aucun successeur n’existe. Elle réutilise les versions exactes, même si la configuration a ensuite été retirée ou modifiée; l’admissibilité actuelle règle les nouvelles exécutions et ne remplace pas les versions historiques de reprise. L’autorisation suit le propriétaire actuel, tandis que l’applicabilité de configuration reste historique. La cible doit rester non terminale, dans un statut de départ permis par la définition figée et sans autre exécution active. La reprise crée une tentative successeure en conservant les preuves originales.

Si un propriétaire publié est absent, supprimé, inactif ou sans admissibilité Contributeur courante lors de la matérialisation du travail imbriqué, le moteur consigne un obstacle et met l’exécution à `paused`; il ne crée pas de travail partiellement affecté. Lorsque le réacheminement est permis, l’initiateur ou l’acteur ayant déclenché la matérialisation peut choisir un remplaçant admissible. Un gestionnaire d’affectations autorisé indépendamment peut aussi la rétablir. Les candidats sont des utilisateurs actifs avec accès Contributeur effectif au propriétaire d’exécution exact. La reprise réautorise et verrouille le dossier, vérifie chaque obstacle et remplaçant, consigne les choix et continue sans recréer un ensemble racine déjà matérialisé.

Chaque obstacle non résolu doit être fourni exactement une fois. Un utilisateur sans lien ne peut ni inspecter les candidats ni reprendre. Si aucun candidat n’est admissible, corrigez le rôle ou la portée, ou la propriété de la future configuration; l’annulation demeure la façon prise en charge de terminer une exécution active lorsque le rétablissement ne convient pas.

Si le démarrage est indisponible, vérifiez l’état cible, l’objet, la portée du volet, les dépendances publiées, l’affectation et le plafond Contributeur ainsi que l’absence d’une exécution ou d’un ensemble d’examens bloquant. Les dossiers et tentatives historiques ne peuvent être modifiés; corrigez la source ou la configuration pour une prochaine exécution, ou utilisez la reprise prise en charge.

Consultez [Schémas et configurations de recommandation](../programs/recommendations.md), [Modèles d’approbation](../programs/approval-templates.md), [Modifications d’entente](../agreements/amendments.md) et [Approbations et achèvements](approvals-completions.md).
