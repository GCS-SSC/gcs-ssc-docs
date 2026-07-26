# Qualité narrative

Qualité narrative affiche une évaluation légère à côté des zones de texte configurées. L’évaluation s’exécute dans le navigateur; l’extension n’envoie pas le texte narratif à sa route serveur.

## Configurer les cibles et les directives

La configuration du volet peut activer des champs narratifs d’entente et les commentaires de questions précises d’un schéma d’évaluation. Chaque cible possède sa propre directive bilingue, ses critères pondérés, ses bandes d’état et ses paramètres de requête. Les cibles d’évaluation sont découvertes à partir des schémas du volet afin de configurer exactement le commentaire voulu.

La politique de raffinement peut être `always`, `adaptive` ou `never`. Le mode adaptatif utilise des seuils d’arrêt inférieur et supérieur configurés; les directives de comparaison, de planification ou sensibles aux contraintes peuvent être forcées à effectuer l’analyse complète. Traitez les directives et les seuils comme des règles opérationnelles, et testez des textes représentatifs en anglais et en français avant l’activation.

## Exécution dans le navigateur

Tous les indicateurs d’une page partagent un seul worker et un seul modèle chargé. Les requêtes identiques en cours réutilisent une promesse, tandis que les travaux distincts passent dans une file sérialisée. Si le texte change rapidement, une ancienne requête en attente pour la même cible est remplacée et une réponse périmée est ignorée. Ainsi, seul le texte le plus récent met l’indicateur à jour.

L’indicateur fournit des conseils et ne constitue pas une décision d’approbation. Les utilisateurs demeurent responsables de l’exactitude, de l’exhaustivité et de la qualité bilingue du texte.
