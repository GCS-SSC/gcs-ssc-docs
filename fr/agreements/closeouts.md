# Clôture d’une entente

La clôture consigne la preuve qu’une entente est administrativement et financièrement achevée avant qu’elle devienne en lecture seule. Ouvrez une entente et choisissez **Clôtures**. Une clôture peut être préparée malgré des obstacles; l’état de préparation devient une condition imposée lorsque son achèvement démarre le flux obligatoire `approval_submission`.

## Accès et préalables

L’entente doit rester modifiable et non terminale. Sa date de fin ne change pas automatiquement son état métier. Le volet doit fournir un flux `approval_submission` actif et publié pour `fundingcaseagreementcloseout`. L’achèvement de la clôture démarre ce flux; un flux standard ne peut pas le remplacer. L’issue positive configurée doit utiliser un état terminal de l’organisme.

| Opération | Accès effectif |
| --- | --- |
| Lire clôtures, préparation, instantanés, modèles, aperçus et téléchargements | Lecteur à la portée propriétaire de l’entente; aucune affectation à la clôture n’est requise. |
| Créer | Contributeur à cette portée et affectation exacte à l’entente. La création affecte atomiquement son auteur comme responsable principal de la clôture. |
| Démarrer, reprendre, annuler, exécuter le travail ou enregistrer un document produit | Contributeur et affectation exacte à la clôture, sauf travail d’examen, de recommandation ou d’approbation affecté séparément. |
| Supprimer un brouillon | Gestionnaire et affectation exacte à la clôture. |
| Gérer l’équipe de clôture | `agreement:manage_assignments`, affectation active à la clôture, accès Contributeur effectif et état permettant les changements d’équipe. |

L’affectation à la clôture est indépendante : elle n’accorde ni l’entente parente, ni une autre clôture, ni un dossier frère. L’affectation à une approbation n’accorde que le pouvoir d’approbation. L’équipe conserve au moins un utilisateur actif et exactement un principal; le principal est informatif et tous les utilisateurs actifs ont les mêmes droits de travail.

## Créer et préparer

La liste conserve l’historique numéroté achevé et annulé et ne permet qu’une clôture ouverte non supprimée par entente. La création choisit le prochain numéro positif. Une nouvelle clôture commence à l’état Brouillon de l’organisme, même si la préparation comporte des obstacles.

Utilisez le rapport préalable pour examiner les lignes financières, les suivis de surveillance en suspens et chaque dossier bloquant. Chaque obstacle offre une route pour corriger le travail source. Produisez ou prévisualisez les documents propres à la clôture au besoin. Les listes de vérification, évaluations, recommandations et approbations propres au programme appartiennent au flux et ne constituent pas des règles universelles de préparation.

## Règles de préparation

Le serveur recalcule la préparation dans la transaction protégée de démarrage; le rapport affiché n’est pas une autorisation ni une preuve fiable. Le démarrage retourne `AGREEMENT_CLOSEOUT_NOT_READY` si une condition échoue.

La préparation exige toutes les conditions suivantes :

1. L’état métier de l’entente n’est pas terminal.
2. Les paiements dont l’état métier est terminal et les rapprochements finaux approuvés s’équilibrent à zéro pour chaque devise au total de l’entente.
3. Aucun suivi de surveillance n’est `open` ou `onhold`, peu importe le responsable.
4. Chaque enfant direct est terminal sur le plan opérationnel.
5. Ni l’entente ni ses enfants n’ont un flux, ensemble d’examens, ensemble de recommandations ou bordereau actif.

Le rapport financier compte les paiements dont l’état de l’organisme porte l’indicateur **terminal**. Il compte les lignes de rapprochement final seulement si leur rapprochement possède une preuve d’approbation. Un achèvement sans flux d’approbation peut terminer le travail de rapprochement avec succès, mais ne fournit **pas**, à lui seul, la preuve d’approbation exigée pour la clôture.

Les montants sont calculés en arithmétique décimale exacte, regroupés par exercice et devise, puis totalisés séparément pour chaque devise. Une variance négative (`paiements − réclamations approuvées`) signifie un paiement en suspens; une variance positive, une avance en suspens. Les différences entre exercices peuvent se compenser dans une même devise, jamais entre devises. Une entente sans montant compté est financièrement prête, mais doit encore satisfaire aux autres contrôles.

Par exemple, des paiements comptés de 12 000,00 CAD contre des rapprochements finaux approuvés de 11 500,00 CAD produisent une avance en suspens de 500,00 CAD. Un manque de 500,00 USD ne compense pas cette avance. Suivez les liens du rapport pour corriger les dossiers sources, puis actualisez.

Les réclamations, rapprochements, paiements, prévisions, surveillances et engagements doivent chacun avoir un état terminal de l’organisme. Les modifications doivent également être fermées (`isopen = false`). Chaque rapprochement final doit posséder une preuve d’approbation. Il s’agit d’indicateurs de configuration et de contrôles de preuve, et non de comparaisons avec des libellés comme « Révisé » ou « Payé ». Le travail d’exécution actif et les suivis de surveillance ouverts ou en attente restent bloquants même si le libellé du dossier semble définitif.

## Achèvement, annulation et verrouillage de l’agrégat

| Situation | Comportement pris en charge |
| --- | --- |
| Clôture brouillon | Préparer la preuve, gérer l’équipe, produire des documents ou supprimer si la protection Brouillon le permet. Des obstacles peuvent subsister. |
| Prête à achever | Achever une seule fois. Dans la transaction protégée, le serveur vérifie la préparation, consigne l’achèvement, démarre le flux obligatoire et capture un instantané immuable. Une configuration absente ou des obstacles font rejeter l’opération. |
| Flux d’approbation actif | L’agrégat de l’entente bloque les mutations ordinaires de l’entente et de ses enfants. Effectuez le travail de clôture affecté et les opérations documentaires permises. |
| Exécution sans succès | Examinez l’issue et l’état configuré. Réessayez seulement si le flux figé et l’autorisation courante le permettent; ne créez pas un autre achèvement. |
| Issue terminale positive | Le serveur revérifie la préparation et le hachage canonique, ferme la clôture et applique le même état terminal configuré à l’entente. L’historique reste lisible. |
| Annuler une exécution active | L’annulation exige un flux actif de clôture. Elle annule l’exécution et ferme la clôture sans appliquer la transition positive qui ferme l’entente. |

La suppression logique est limitée à l’état Brouillon de l’organisme. L’annulation est une action de flux : aucune opération générique « annuler le brouillon » n’est offerte sans exécution active. Après annulation, une autre clôture numérotée peut être créée seulement si l’entente reste modifiable et qu’aucune clôture ouverte ne subsiste.

À l’issue positive, un dossier de préparation modifié ou un nouvel obstacle empêche la fermeture et produit une exécution en échec avec le motif `closeout_packet_changed`. Actualisez le rapport et examinez les sources modifiées avant la reprise. Une entente terminale protège les écritures et les actions d’exécution de ses enfants par les contrôles d’état de l’agrégat; modifier un libellé ne la déverrouille pas.

## Documents et reprise

La section Documents liste les modèles de clôture actifs du volet, crée des aperçus sans persistance, enregistre la sortie à la fois contre l’entente et la clôture typée, liste l’historique produit et autorise les téléchargements comme lectures de l’entente. La production DOCX/PDF conserve les limites de convertisseur, stockage privé, nettoyage et sauvegarde décrites dans [Documents](./documents.md) et [Génération de documents](../developer/document-generation.md).

Si le démarrage échoue, utilisez ses obstacles structurés plutôt que de recréer la clôture. Si une exécution est suspendue parce qu’un propriétaire imbriqué n’est plus admissible, l’initiateur ou un gestionnaire d’affectations autorisé peut choisir un remplaçant admissible et reprendre; consultez [Flux de travail](../concepts/workflows.md). Une exécution refusée ne peut être reprise que si sa configuration figée le permet et demeure valide. Les instantanés historiques et les dossiers achevés ou annulés sont immuables; aucune restauration utilisateur n’existe pour une clôture supprimée.
