# Approbations et achèvements

Les approbations et les achèvements sont des contrôles d’exécution construits à partir des données d’administration. Ce ne sont pas seulement des sections d’affichage : ils déterminent quand les dossiers peuvent progresser, qui doit agir, quel texte de certification apparaît et comment l’état d’achèvement est stocké.

## Configuration d approbation

Les Modeles d approbation definissent le flux pour une portee et un type d entite. Les Etapes d approbation definissent sequence, description, utilisateur par defaut et titre d approbateur. Les Certifications peuvent etre attachees aux etapes et etre optionnelles ou requises. Les Types d approbation au nom d autrui sont configures par agence et decrivent les cas ou quelqu un approuve pour une autre personne.

Les Feuilles de route sont des enregistrements d approbation d execution. Elles pointent vers une entite, un modele d approbation et un statut d approbation comme brouillon, en attente, approuve ou refuse.

## Configuration des achèvements

Les achèvements stockent la valeur d’achèvement d’une entité, les commentaires, l’utilisateur et la date. Les types d’entité pris en charge comprennent les examens et recommandations communs, ainsi que les flux de dossier de financement comme les admissions, modifications, surveillances, réclamations, prévisions, paiements et recommandations.

Les enregistrements d’achèvement sont génériques afin que plusieurs surfaces de flux partagent le même modèle. Une configuration manquante peut empêcher une section d’apparaître ou bloquer la progression attendue.

## Comportement d execution

Les composants d’approbation et d’achèvement lisent les données de configuration, l’identifiant de l’entité courante, le statut et les permissions de l’utilisateur. Les actions typiques incluent approuver, refuser, réattribuer, voir l’état d’approbation, marquer comme terminé et enregistrer des commentaires. L’ensemble exact dépend de l’entité et du modèle configuré.

## Dependances de configuration

Avant l usage en production, confirmez :

- Les utilisateurs existent pour le routage par defaut.
- Les modeles d approbation correspondent a la bonne portee et au bon type d entite.
- Les etapes d approbation sont ordonnees et portent des libelles/descriptions bilingues au besoin.
- Les certifications sont attachees aux bonnes etapes.
- Les achèvements utilisent le bon type d’entité et le bon identifiant.
- Les types d approbation au nom d autrui existent si la delegation fait partie du processus.

## Prudence operationnelle

Modifier des modèles d’approbation ou des configurations d’examen ou d’achèvement après la création d’enregistrements d’exécution affecte les comportements futurs. Les feuilles de route et les achèvements historiques peuvent toujours pointer vers l’ancienne configuration. Préférez créer un nouveau modèle ou une nouvelle version lorsque le processus métier change.
