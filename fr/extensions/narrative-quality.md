# Qualité narrative

Qualité narrative affiche une évaluation légère à côté des zones de texte configurées. L’évaluation s’exécute dans le navigateur; l’extension n’envoie pas le texte narratif à sa route serveur.

## Configurer les cibles et les directives

La configuration du volet peut activer des champs narratifs d’entente et les commentaires de questions précises d’un schéma d’évaluation. Chaque cible possède sa propre directive bilingue, ses critères pondérés, ses bandes d’état et ses paramètres de requête. Les cibles d’évaluation sont découvertes à partir des schémas du volet afin de configurer exactement le commentaire voulu.

La politique de raffinement peut être `always`, `adaptive` ou `never`. Le mode adaptatif utilise des seuils d’arrêt inférieur et supérieur configurés; les directives de comparaison, de planification ou sensibles aux contraintes peuvent être forcées à effectuer l’analyse complète. Traitez les directives et les seuils comme des règles opérationnelles, et testez des textes représentatifs en anglais et en français avant l’activation.

## Exécution dans le navigateur

Tous les indicateurs d’une page partagent un seul worker et un seul modèle chargé. Les requêtes identiques en cours réutilisent une promesse, tandis que les travaux distincts passent dans une file sérialisée. Si le texte change rapidement, une ancienne requête en attente pour la même cible est remplacée et une réponse périmée est ignorée. Ainsi, seul le texte le plus récent met l’indicateur à jour.

L’indicateur fournit des conseils et ne constitue pas une décision d’approbation. Les utilisateurs demeurent responsables de l’exactitude, de l’exhaustivité et de la qualité bilingue du texte.
+
## Activation et cibles exactes

Activez le progiciel pour l'organisme, puis pour le volet. L'hôte normalise une nouvelle ligne vide activée en ouvrant le profil au niveau de l'entente afin qu'au moins une jauge puisse s'afficher. Les profils d'évaluation et de commentaire de question demeurent désactivés jusqu'à leur activation explicite.

La seule route serveur, `GET /api/extensions/gcs-narrative-quality/streams/{streamId}/assessment-targets`, exige la lecture du volet exact. Par la route générique publique, elle exige aussi les deux commutateurs d'extension; l'affirmation du README et d'un test selon laquelle le gestionnaire n'a pas besoin de lignes d'activation ne vaut que lorsqu'il est appelé directement et ne décrit pas le contrat externe (`DOC-033`).

La route lit les configurations actives d'ensembles d'examens directement rattachées au volet, leurs configurations d'examen actives et les schémas actifs de type évaluation. Elle utilise le contenu de travail lorsqu'il existe, sinon le contenu publié, analyse les nœuds de question valides, dédouble les schémas par identifiant et retourne l'identifiant et la version, le nom bilingue et les clés `section::sous-section::question`. Sans ensemble, la liste est vide; un contenu effectif invalide retourne le schéma sans questions.

À l'exécution, l'emplacement générique `textarea.after` reçoit un contexte de cible appartenant à l'hôte. L'extension associe actuellement :

- les descriptions française et anglaise de l'entente;
- le narratif d'alignement d'un schéma d'évaluation;
- le commentaire d'une question d'évaluation exacte, repéré par le schéma et la clé à trois parties.

Un profil s'affiche seulement s'il est activé, si le contexte résout cette cible exacte et si le texte à noter n'est pas vide. Une configuration périmée d'un schéma ou d'une question supprimés n'a aucune cible montée. L'interface montre les états de chargement, d'absence de schéma ou de question et d'erreur du catalogue plutôt que d'inventer des choix.

## Configuration de la notation

Chaque profil conserve une question bilingue et des critères pondérés bilingues. Les critères sans libellé sont retirés; si aucun ne demeure, les valeurs par défaut sont rétablies. Les poids sont limités de `0.1` à `10`. Les paramètres numériques sont normalisés dans leurs plages de pourcentage ou de `0..1`, les politiques et tons inconnus reprennent les valeurs par défaut, et l'ancienne configuration par catégories de cibles est convertie en mémoire en profils par évaluation.

Les bandes de présentation utilisent des seuils mixte/fort configurables et un ton `error`, `warning` ou `success` par bande. Ces paramètres touchent les couleurs et libellés indicatifs, jamais l'autorisation, la validation, les flux, les notes d'examen ou les décisions persistées de l'hôte.

## Ressources du navigateur, confidentialité et échecs

Le travailleur et l'environnement ONNX sont servis sous `/extensions/gcs-narrative-quality/client`; les modèles du progiciel le sont sous `/extensions/gcs-narrative-quality/models`. La production retire les fichiers assimilables à du code source des ressources publiques préparées. Les requêtes envoient le texte, la langue, la question, les critères et les paramètres normalisés seulement au travailleur de même origine dans le navigateur. La route serveur lit les définitions d'évaluation, mais ne reçoit jamais le texte noté.

Un texte vide ou une question sans critère retourne un résultat vide sans charger le modèle. `never` emploie seulement la passe rapide; `always` exécute les passes rapide et complète; `adaptive` applique les seuils configurés et peut forcer le raffinement pour une question de contrainte, comparaison ou planification. Tous les emplacements partagent un travailleur global au navigateur et une seule promesse de modèle. Le travail identique en cours est réutilisé, les requêtes distinctes sont mises en série et un nouveau texte retire de la file le travail périmé du même groupe cible.

Si la création du travailleur, le chargement des ressources ou du modèle, ou la notation échoue, l'emplacement affiche un état localisé d'indisponibilité ou d'erreur et réinitialise le travailleur partagé défaillant afin qu'une requête ultérieure puisse réessayer. La note n'est conservée dans aucune table de base ou d'extension et ne bloque pas l'enregistrement. L'exploitation doit servir les deux espaces publics avec la même version, permettre les ressources WASM et modèles dans la politique de sécurité du contenu et tester les navigateurs pris en charge de puissance moindre avant une activation générale.

L'extension ne déclare aucune migration, stockage clé-valeur, secret chiffré, extension Nitro, onglet d'entité, action de création ou service réseau externe.
