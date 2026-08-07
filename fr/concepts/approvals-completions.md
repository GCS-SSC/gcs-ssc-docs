# Approbations et achèvements

Les approbations et les achèvements sont des contrôles d’exécution construits à partir des données d’administration. Ce ne sont pas seulement des sections d’affichage : ils déterminent quand les dossiers peuvent progresser, qui doit agir, quel texte de certification apparaît et comment l’état d’achèvement est stocké.

## Configuration d’approbation

Les modèles d’approbation définissent le flux pour une portée et un type d’entité. Les étapes d’approbation définissent la séquence, la description, l’utilisateur par défaut et le titre de l’approbateur. Les certifications peuvent être rattachées aux étapes et être facultatives ou requises. Un modèle peut aussi permettre l’ajout d’étapes par les utilisateurs, définir leurs noms bilingues et certifications par défaut, puis préciser quelles valeurs peuvent être personnalisées. Les types d’approbation au nom d’autrui sont configurés par agence et décrivent les cas où une personne approuve pour une autre.

Les feuilles de route sont des enregistrements d’approbation d’exécution. Elles pointent vers une entité, un modèle d’approbation et un statut comme brouillon, en attente, approuvé ou refusé. La matérialisation copie la politique des approbations additionnelles du modèle dans la feuille afin que les modifications ultérieures du modèle touchent seulement les futures feuilles.

## Configuration des achèvements

Les achèvements stockent la valeur d’achèvement d’une entité, les commentaires, l’utilisateur et la date. Les types d’entité pris en charge comprennent les examens et recommandations communs, ainsi que les flux de dossier de financement comme les admissions, modifications, surveillances, réclamations, prévisions, paiements et recommandations.

Les enregistrements d’achèvement sont génériques afin que plusieurs surfaces de flux partagent le même modèle. Une configuration manquante peut empêcher une section d’apparaître ou bloquer la progression attendue.

## Comportement d’exécution

Les composants d’approbation et d’achèvement lisent les données de configuration, l’identifiant de l’entité courante, le statut et les permissions de l’utilisateur. Les actions typiques incluent approuver, refuser, réattribuer, ajouter une étape avant ou après une étape admissible, voir l’état d’approbation, marquer comme terminé et enregistrer des commentaires. Les étapes ajoutées utilisent des séquences décimales afin de s’insérer sans renuméroter la route. L’ensemble exact dépend de l’entité, de la politique copiée du modèle et des permissions ou de l’assignation de l’utilisateur à une étape non résolue. L’attribution de flux détermine l’admissibilité à une action et ne constitue pas une permission d’accès : un examinateur ou un approbateur assigné doit toujours posséder l’accès ordinaire en lecture au promoteur, à l’entente ou au contexte de l’agence propriétaire par le mécanisme RBAC applicable.

## Dépendances de configuration

Avant l’usage en production, confirmez :

- Les utilisateurs existent pour le routage par défaut.
- Les modèles d’approbation correspondent à la bonne portée et au bon type d’entité.
- Les étapes d’approbation sont ordonnées et portent des libellés et descriptions bilingues au besoin.
- Les certifications sont rattachées aux bonnes étapes.
- Les achèvements utilisent le bon type d’entité et le bon identifiant.
- Les types d’approbation au nom d’autrui existent si la délégation fait partie du processus.

## Prudence opérationnelle

Modifier des modèles d’approbation ou des configurations d’examen ou d’achèvement après la création d’enregistrements d’exécution affecte les comportements futurs. Les feuilles de route et les achèvements historiques peuvent toujours pointer vers l’ancienne configuration. Préférez créer un nouveau modèle ou une nouvelle version lorsque le processus métier change.
