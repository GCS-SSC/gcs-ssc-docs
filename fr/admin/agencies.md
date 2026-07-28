# Agences

Les agences sont la racine administrative de la plupart des configurations metier. Les programmes appartiennent aux agences, plusieurs listes de reference sont propres aux agences, et les controles RBAC utilisent les identifiants d agence pour determiner ce qu un utilisateur peut voir ou modifier.

## Page de liste

La page Agences prend en charge la recherche, le filtre de statut, la pagination, les controles de colonnes, la selection de lignes et les modales de creation/mise a jour. Le sommaire affiche le total d agences et le nombre d agences actives lorsque disponible.

La creation ou mise a jour d une agence capture les informations bilingues, abreviations, statut, numero GWCOA et identifiant du systeme financier externe. Les suppressions sont logiques. Les agences supprimees disparaissent des listes actives normales, tandis que les dossiers dependants conservent les identifiants historiques.

## Cohérence du cycle de vie

Les données de référence propres à une agence sont consultées ou modifiées seulement après qu’une nouvelle vérification sous verrou a confirmé que les autorisations de l’utilisateur et la chaîne de propriété pertinente sont à jour. Les changements concurrents du cycle de vie sont sérialisés ; une opération ne se poursuit donc pas en se fondant sur un dossier parent ou des droits d’accès qui étaient déjà périmés au moment de cette vérification.

La création d’un programme suit la même règle : un programme ne peut pas être rattaché à une agence qui est déjà supprimée lors de la vérification sous verrou de son état actif.

## Page detail

Le detail d agence utilise une disposition a onglets verticaux :

- General
- Programmes
- Categories de couts
- Exercices
- Types d adresse
- Sous-types de demandeur/beneficiaire
- Approbation au nom d autrui
- Types d entente
- Extensions

Les administrateurs peuvent lier directement une section.

Dans les onglets de données de référence propres à l’agence, la recherche traite `%` et `_` comme des caractères ordinaires plutôt que comme des caractères génériques. Les filtres de recherche et de statut limitent les lignes affichées et le total paginé, tandis que le sommaire de chaque onglet continue d’afficher les totaux de l’agence.

## Onglet General

General affiche le profil bilingue, les abreviations, le lien GWCOA, l identifiant financier et le statut de cycle de vie. L action Modifier ouvre la modale d agence. Traitez l identifiant d agence et les liens financiers comme des donnees sensibles aux integrations : les modifier apres la creation de programmes et d ententes peut affecter le rapprochement et les rapports.

## Onglet Programmes

Programmes liste les profils de paiements de transfert possedes par l agence. Les utilisateurs avec `transfer_payment:create` dans cette agence peuvent creer un programme directement ou utiliser l assistant. L onglet fixe l identifiant d agence afin que les nouveaux programmes soient rattaches a l agence courante.

Les programmes sont les parents des volets. La plupart des configurations d entente sont au niveau du volet; l agence doit donc avoir ses exercices, categories de couts et references de base avant l ouverture en production.

## Categories de couts

Les Categories de couts definissent les regroupements financiers. Chaque categorie peut etre developpee pour gerer les elements de ligne. Ces elements alimentent les budgets d entente, engagements, paiements, reclamations et logiques d allocation des couts. Creez les categories avant les lignes de cout de volet ou les flux financiers d entente.

## Exercices

Les Exercices stockent un libelle d affichage et une annee numerique. Ils sont references par les budgets de programme et volet, les previsions d entente, les engagements, paiements, reclamations et dossiers de surveillance. Creez toute la plage d exercices d un programme avant les budgets.

## Types d adresse

Les Types d adresse classent les adresses utilisees par les promoteurs et ententes. Ce sont des valeurs bilingues de reference et elles doivent rester stables. Renommez-les avec prudence, car les utilisateurs peuvent interpreter les adresses historiques avec le libelle courant.

## Sous-types de demandeur/beneficiaire

Les Sous-types de demandeur/beneficiaire classent les profils de promoteur et incluent un type demandeur/beneficiaire, un nom bilingue et une description bilingue. Les promoteurs peuvent seulement utiliser les sous-types qui appartiennent a leur agence principale.

## Approbation au nom d autrui

Ces types decrivent les situations ou un utilisateur approuve pour une autre personne. L indicateur `require actual` controle si des details supplementaires doivent etre recueillis. Configurez-les avant que les flux d approbation en production exigent des approbations deleguees.

## Types d entente

Les Types d entente classent les ententes avec un enum de type et un libelle bilingue. Creez-les avant que les operateurs commencent a creer des ententes pour l agence.

## Extensions

L onglet Extensions liste les extensions enregistrees et indique si chacune est activee pour l agence. L activation execute les migrations de l extension. La desactivation d une extension desactive aussi cette extension pour tous les volets de l agence. La configuration de volet est disponible seulement pour les extensions activees a l agence.

## Ordre de dependance

Pour une nouvelle agence, utilisez cet ordre :

1. Profil General.
2. Exercices.
3. Categories de couts et elements de ligne.
4. Types d adresse.
5. Sous-types de demandeur/beneficiaire.
6. Types d entente.
7. Types d approbation au nom d autrui.
8. Extensions au niveau agence.
9. Programmes.
10. Volets de programme et configuration de volet.

Cet ordre donne aux pages de programme, promoteur et entente des donnees de recherche completes des le depart.

![Onglet Programmes d une agence](/screenshots/fr/agency-program-setup.png)

_Capture reelle de l environnement de developpement avec donnees semees. Les enregistrements montres sont seulement des exemples et ne sont pas crees dans une installation fraiche._
