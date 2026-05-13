# Approbations et completions

Les approbations et completions sont des controles d execution construits a partir des donnees d administration. Ce ne sont pas seulement des sections d affichage : elles determinent quand les dossiers peuvent progresser, qui doit agir, quel texte de certification apparait et comment l etat de completion est stocke.

## Configuration d approbation

Les Modeles d approbation definissent le flux pour une portee et un type d entite. Les Etapes d approbation definissent sequence, description, utilisateur par defaut et titre d approbateur. Les Certifications peuvent etre attachees aux etapes et etre optionnelles ou requises. Les Types d approbation au nom d autrui sont configures par agence et decrivent les cas ou quelqu un approuve pour une autre personne.

Les Feuilles de route sont des enregistrements d approbation d execution. Elles pointent vers une entite, un modele d approbation et un statut d approbation comme brouillon, en attente, approuve ou refuse.

## Configuration de completion

Les Completions stockent la valeur de completion d une entite, les commentaires, l utilisateur et la date. Les types d entite pris en charge comprennent les examens et recommandations communs, ainsi que les flux de dossier de financement comme admissions, modifications, surveillances, reclamations, previsions, paiements et recommandations.

Les enregistrements de completion sont generiques afin que plusieurs surfaces de flux partagent le meme modele. Une configuration manquante peut empecher une section d apparaitre ou bloquer la progression attendue.

## Comportement d execution

Les composants d approbation et de completion lisent les donnees de configuration, l id d entite courant, le statut et les permissions de l utilisateur. Les actions typiques incluent approuver, refuser, reattribuer, voir l etat d approbation, marquer termine et enregistrer des commentaires. L ensemble exact depend de l entite et du modele configure.

## Dependances de configuration

Avant l usage en production, confirmez :

- Les utilisateurs existent pour le routage par defaut.
- Les modeles d approbation correspondent a la bonne portee et au bon type d entite.
- Les etapes d approbation sont ordonnees et portent des libelles/descriptions bilingues au besoin.
- Les certifications sont attachees aux bonnes etapes.
- Les completions utilisent le bon type d entite et le bon id.
- Les types d approbation au nom d autrui existent si la delegation fait partie du processus.

## Prudence operationnelle

Modifier des modeles d approbation ou des configurations d examen/completion apres la creation d enregistrements d execution affecte les futurs comportements. Les feuilles de route et completions historiques peuvent toujours pointer vers l ancienne configuration. Preferez creer un nouveau modele ou une nouvelle version lorsque le processus metier change.
