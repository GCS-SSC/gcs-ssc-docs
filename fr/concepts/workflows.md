# Flux de travail

Les flux relient la configuration publiée des examens, recommandations et approbations d’un volet aux dossiers d’exécution. Un flux `standard` gère la progression ordinaire des examens et achèvements. Un flux `approval_submission` crée le dossier de preuve immuable servant à approuver une entente ou une modification.

## Configurer un flux

Ouvrez un programme et un volet, puis choisissez **Configurations de flux**. L’éditeur de détail regroupe l’identité, l’acheminement, les transitions et le comportement.

| Champ | Signification |
| --- | --- |
| Identité anglaise et française | Nom et description administratifs. |
| Type d’entité | Cible d’exécution. |
| Point d’entrée | `completion` démarre par une action d’achèvement; `recommendation` démarre explicitement. |
| Objet | `standard` ou `approval_submission`. |
| États de départ permis | États sources à partir desquels le flux peut commencer. |
| État de début/réussite/échec | État appliqué à la cible pour chaque résultat. |
| Ensemble d’examens | Plan d’examen publié facultatif exécuté en premier. |
| Ensemble de recommandations | Plan ordonné facultatif; requis pour le point d’entrée Recommandation et la soumission d’approbation. |
| Approbation source | Approbation finale facultative après les autres étapes. |
| Permettre la reprise | Autorise la dernière tentative échouée à reprendre sa configuration figée. |

Une configuration appartient au volet exact de l’URL. La lecture et les mutations exigent le plafond de rôle et la portée `transfer_payment` correspondants; les affectations exactes aux dossiers métier n’accordent pas l’accès à la configuration.

L’objet Soumission d’approbation est permis seulement à la portée d’un volet pour `fundingcaseagreement` ou `fundingcaseamendment`. La publication exige un ensemble de recommandations publié et au moins une étape d’approbation : approbation d’un membre, approbation finale du plan ou approbation source.

## Activer et publier

Les nouvelles configurations sont des brouillons. Activer crée la version publiée 1. L’enregistrement d’une configuration active change sa copie de travail; Publier valide les dépendances, stocke le prochain instantané immuable et augmente la version.

La publication échoue lorsqu’un ensemble d’examens ou de recommandations, ou un modèle d’approbation lié, est inactif ou non publié. Une configuration publiée incorpore le plan d’examen, le plan de recommandation, les approbations des membres et l’approbation finale exacts des prochaines exécutions. Les exécutions existantes demeurent figées lorsque les administrateurs modifient ou republient la configuration.

La suppression logique d’une configuration la désactive pour les nouvelles exécutions. Les exécutions historiques conservent leur configuration et leur filiation.

## Séquence d’exécution standard

Le moteur résout une configuration active et publiée selon le type cible, le volet, l’objet, le point d’entrée et l’état courant. L’unicité de portée exacte empêche deux configurations actives de partager la même portée, le même type d’entité et le même objet, mais des portées correspondantes plus larges et plus étroites peuvent encore se chevaucher. Si plusieurs correspondent, la résolution actuelle choisit le plus grand identifiant de base de données; elle ne privilégie pas la portée la plus précise et n’échoue pas pour ambiguïté. Évitez les configurations qui se chevauchent.

Les étapes s’exécutent dans cet ordre :

1. Un ensemble d’examens configuré s’exécute. Son échec fait échouer le flux; sa réussite le fait progresser.
2. Les membres de recommandation s’exécutent un à la fois dans l’ordre configuré. L’initiateur devient la personne principale affectée à chaque recommandation matérialisée.
3. Une approbation facultative du membre bloque son résultat.
4. Une approbation finale ou source facultative bloque le plan achevé.
5. Sans autre étape, l’exécution se termine.

Un résultat Non recommandé fait échouer l’ensemble seulement lorsque l’option publiée **Faire échouer l’ensemble si Non recommandé** de ce membre est vraie. Sinon, le moteur passe au membre suivant ou à l’étape finale. Cette politique est figée avec le plan.

Le début, la réussite, l’échec et l’annulation appliquent les états cibles configurés. Les états d’exécution comprennent traitement, examen en attente, recommandation en attente, approbation de recommandation en attente, approbation source en attente, terminé, échoué et annulé.

## Soumission d’approbation d’une entente

Les pages de détail d’entente et de modification montent une section de flux Soumission d’approbation sous Recommandation. Son démarrage exécute une transaction qui verrouille la source courante, crée l’exécution et écrit un dossier immuable `Funding_Case_Agreement_Approval_Submission` avec version de schéma 1, heure de soumission et hachage canonique SHA-256 en minuscules.

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

La section Flux de la source montre les actions démarrer/reprendre/annuler, la séquence figée, les états, les questions de recommandation, les étapes d’approbation, les tentatives précédentes échouées et tout dossier d’approbation immuable. L’enregistrement d’une recommandation la conserve à l’état `draft`; sa soumission valide les réponses requises et dérive le résultat de la question décisive publiée.

La page de recommandation de premier niveau accepte les liens directs de Travail affecté. Les mises à jour exigent une affectation active à la recommandation, un plafond Contributeur courant pour son propriétaire résolu et l’état `draft`. Un utilisateur affecté à une approbation peut lire le dossier de soumission nécessaire à cette approbation même si la lecture ordinaire de l’entente n’est pas disponible.

Les affectations exactes aux recommandations, examens et approbations sont distinctes. Elles n’accordent ni le parent ni les dossiers frères. Consultez [Permissions de rôle et affectations exactes](./rbac.md).

## Annuler, reprendre et récupérer

L’annulation est disponible seulement pour une exécution active. Elle annule les enfants et éléments de flux actifs, marque l’exécution annulée et applique l’état d’échec configuré dans une transaction.

La reprise est disponible seulement pour la dernière exécution échouée lorsque sa configuration figée est encore active, publiée, valide dans sa portée et autorise la reprise. Elle réutilise la configuration et le point d’entrée de cette tentative; elle ne choisit pas silencieusement une configuration plus récente. Une exécution active est retournée plutôt que dupliquée.

Si le démarrage est indisponible, vérifiez l’état cible, l’objet, la portée du volet, les dépendances publiées, l’affectation et le plafond Contributeur ainsi que l’absence d’une exécution ou d’un ensemble d’examens bloquant. Les dossiers et tentatives historiques ne peuvent être modifiés; corrigez la source ou la configuration pour une prochaine exécution, ou utilisez la reprise prise en charge.

Consultez [Schémas et configurations de recommandation](../programs/recommendations.md), [Modèles d’approbation](../programs/approval-templates.md), [Modifications d’entente](../agreements/amendments.md) et [Approbations et achèvements](approvals-completions.md).
