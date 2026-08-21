# Clôture d’une entente

La clôture consigne la preuve qu’une entente est administrativement et financièrement achevée avant qu’elle devienne en lecture seule. Ouvrez une entente et choisissez **Clôtures**. Une clôture peut être préparée malgré des obstacles; l’état de préparation devient une condition imposée au démarrage de son flux `close_out`.

## Accès et préalables

Seule une entente `active` ou `expired` peut avoir une clôture. L’application ne fait pas automatiquement passer une entente à `expired` à sa date de fin. Avant le démarrage, le volet doit avoir une configuration active et publiée visant `fundingcaseagreementcloseout`, d’objet `close_out`, et l’entente doit satisfaire au rapport de préparation.

| Opération | Accès effectif |
| --- | --- |
| Lire clôtures, préparation, instantanés, modèles, aperçus et téléchargements | Lecteur à la portée propriétaire de l’entente; aucune affectation à la clôture n’est requise. |
| Créer | Contributeur à cette portée et affectation exacte à l’entente. La création affecte atomiquement son auteur comme responsable principal de la clôture. |
| Démarrer, reprendre, annuler, exécuter le travail ou enregistrer un document produit | Contributeur et affectation exacte à la clôture, sauf travail d’examen, de recommandation ou d’approbation affecté séparément. |
| Supprimer un brouillon | Gestionnaire et affectation exacte à la clôture. |
| Gérer l’équipe de clôture | `agreement:manage_assignments`, affectation active à la clôture, accès Contributeur effectif et état permettant les changements d’équipe. |

L’affectation à la clôture est indépendante : elle n’accorde ni l’entente parente, ni une autre clôture, ni un dossier frère. L’affectation à une approbation n’accorde que le pouvoir d’approbation. L’équipe conserve au moins un utilisateur actif et exactement un principal; le principal est informatif et tous les utilisateurs actifs ont les mêmes droits de travail.

## Créer et préparer

La liste conserve l’historique numéroté achevé et annulé et ne permet qu’une clôture ouverte non supprimée par entente. La création choisit le prochain numéro positif. Une nouvelle clôture commence à `draft`, même si la préparation comporte des obstacles.

Utilisez le rapport préalable pour examiner les lignes financières, les suivis de surveillance en suspens et chaque dossier bloquant. Chaque obstacle offre une route pour corriger le travail source. Produisez ou prévisualisez les documents propres à la clôture au besoin. Les listes de vérification, évaluations, recommandations et approbations propres au programme appartiennent au flux et ne constituent pas des règles universelles de préparation.

## Règles de préparation

Le serveur recalcule la préparation dans la transaction protégée de démarrage; le rapport affiché n’est pas une autorisation ni une preuve fiable. Le démarrage retourne `AGREEMENT_CLOSEOUT_NOT_READY` si une condition échoue.

La préparation exige toutes les conditions suivantes :

1. L’état de l’entente est `active` ou `expired`.
2. Les paiements payés et les rapprochements finaux approuvés s’équilibrent à zéro pour chaque devise au total de l’entente.
3. Aucun suivi de surveillance n’est `open` ou `onhold`, peu importe le responsable.
4. Chaque enfant direct est terminal sur le plan opérationnel.
5. Ni l’entente ni ses enfants n’ont un flux, ensemble d’examens, ensemble de recommandations ou bordereau actif.

Seuls les paiements `paid` comptent. Seules les lignes rapprochées d’un rapprochement final `approved` comptent. Les valeurs sont arrondies à deux décimales, regroupées par exercice et devise, puis totalisées séparément par devise. Une variance négative (`paiements - réclamations approuvées`) signifie un paiement en suspens; une variance positive, une avance en suspens. Les différences d’exercice peuvent se compenser dans la même devise, jamais entre devises. Une entente sans ligne comptée est financièrement prête.

Pour les enfants, terminal signifie le contrat opérationnel exact. Par exemple, une réclamation exige normalement `reviewed` et un rapprochement final approuvé; une modification doit être fermée en plus d’être approuvée, refusée ou annulée; tout travail d’exécution actif bloque encore. Suivez le lien, terminez ou annulez le travail depuis sa page prise en charge, actualisez et relancez le rapport.

## Cycle de vie et verrouillage de l’agrégat

| État | Signification et action prise en charge |
| --- | --- |
| `draft` | Préparer la preuve, gérer l’équipe, produire des documents, supprimer, annuler ou démarrer lorsque tout est prêt. |
| `inreview` | Le flux est actif et verrouille l’agrégat de l’entente; seuls le travail de flux et les documents de clôture permis restent modifiables. |
| `denied` | Ouvert et reprenable. Corriger les obstacles, préparer les documents, reprendre si permis ou annuler. |
| `complete` | La réussite du flux a fermé l’entente. Historique, instantanés, aperçus et téléchargements restent lisibles; aucune mutation persistée. |
| `cancelled` | Terminal sans fermer l’entente. Une nouvelle clôture numérotée peut être créée si l’entente demeure admissible. |

La suppression logique est offerte seulement à `draft`. L’annulation est offerte seulement à `draft` ou `denied`, jamais pendant une exécution active. Le démarrage saisit un instantané immuable et fait passer la clôture à `inreview`. Pendant le flux, les mutations ordinaires de l’entente et de ses enfants sont bloquées. La réussite finale verrouille l’entente, recalcule la préparation et exige que le hachage canonique corresponde à l’instantané initial. Elle marque ensuite atomiquement la clôture `complete` et l’entente `closed`. Une différence ou un nouvel obstacle empêche la fermeture.

::: warning Expiration et application terminale complète
La clôture ne planifie pas la transition `expired`. De plus, la prévention interagrégats de toutes les routes de reprise et d’exécution d’enfants demeure suivie dans le ticket applicatif no 77. Traitez une entente `closed` comme en lecture seule et n’essayez pas d’actions d’exécution d’enfants par des routes API directes.
:::

## Documents et reprise

La section Documents liste les modèles de clôture actifs du volet, crée des aperçus sans persistance, enregistre la sortie à la fois contre l’entente et la clôture typée, liste l’historique produit et autorise les téléchargements comme lectures de l’entente. La production DOCX/PDF conserve les limites de convertisseur, stockage privé, nettoyage et sauvegarde décrites dans [Documents](./documents.md) et [Génération de documents](../developer/document-generation.md).

Si le démarrage échoue, utilisez ses obstacles structurés plutôt que de recréer la clôture. Si une exécution est suspendue parce qu’un propriétaire imbriqué n’est plus admissible, l’initiateur ou un gestionnaire d’affectations autorisé peut choisir un remplaçant admissible et reprendre; consultez [Flux de travail](../concepts/workflows.md). Une exécution refusée ne peut être reprise que si sa configuration figée le permet et demeure valide. Les instantanés historiques et les dossiers achevés ou annulés sont immuables; aucune restauration utilisateur n’existe pour une clôture supprimée.
