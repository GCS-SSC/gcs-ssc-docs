# Commun

Commun est la page d administration globale reservee a la racine a `/fr/admin/commun`. Les utilisateurs sans acces racine ou lecture globale de tout sont rediriges ailleurs.

## Objectif

Utilisez Commun pour les configurations reutilisables et les enregistrements d execution qui ne sont pas possedes par un onglet detail d agence. La page est pilotee par configuration; chaque onglet offre donc une experience coherente de table, formulaire, validation et recherche.

## Ordre des ressources

L ordre des onglets est :

1. GWCOA
2. Entites
3. Contacts
4. Adresses
5. Schemas de formulaire
6. Types de piece jointe
7. Schemas d examen
8. Configurations d ensembles d examen
9. Configurations d examen
10. Completions
11. Ensembles d examen
12. Examens
13. Modeles d approbation
14. Etapes d approbation
15. Certifications
16. Feuilles de route
17. Schemas de recommandation
18. Configurations de recommandation
19. Recommandations

L ordre va volontairement des references de base vers les enregistrements d execution.

## Comportement UI commun

Chaque onglet affiche une table et un formulaire genere. Les types de champs comprennent texte, nombre, date, zone de texte, JSON, booleen, enum et recherche. La recherche inclut les colonnes configurees et l id. Le filtre de suppression prend en charge tous, actifs et supprimes. Pour les ressources modifiables, une ligne existante expose un interrupteur de suppression afin que la racine puisse supprimer logiquement ou restaurer.

L onglet Entites est en lecture seule. Il fournit les ids d entite d execution pour les champs de recherche et ne doit pas etre cree manuellement dans l UI.

## Ressources de reference

GWCOA, Contacts, Adresses, Schemas de formulaire et Types de piece jointe sont fondamentaux. Ils fournissent des references de plan comptable, personnes reutilisables, adresses reutilisables, JSON de schema de formulaire dynamique et libelles de piece jointe filtrables par agence. Les schemas de formulaire et types de piece jointe peuvent etre lies a une agence.

## Ressources d examen

Les Schemas d examen definissent le contenu d examen et peuvent etre de type liste de controle ou evaluation. La creation d un schema d examen Commun utilise la logique de versionnement pour creer une valeur brouillon. Les Configurations d ensembles d examen regroupent les examens par type d entite et portee. Les Configurations d examen attachent les schemas a un ensemble et les ordonnent. Les Ensembles d examen et Examens sont des enregistrements d execution crees a partir de ces definitions.

Lorsqu un Examen d execution est cree ou associe a un autre schema d examen, Commun copie dans l examen les parametres du schema actif selectionne pour les resultats personnalises, l alignement et les examinateurs. La restauration d un examen supprime exige que son schema reference demeure actif. Une restauration sans changement de reference conserve l instantane existant; l attribution d un autre schema actif actualise l instantane depuis ce nouveau schema. Ce comportement stabilise les examens historiques et empeche leur restauration avec une configuration retiree.

Pour les examens de promoteur, l onglet d execution recherche les configurations d ensembles pour `applicantrecipient`, cree des ensembles d examen d execution, regroupe les examens par ensemble et ouvre les pages d evaluation pour les examens individuels.

## Ressources d approbation

Les Modeles d approbation decrivent un flux pour une portee et un type d entite. Les Etapes d approbation definissent sequence, utilisateur par defaut et titre d approbateur. Les Certifications peuvent etre attachees aux etapes et preciser un texte optionnel ou requis. Les Feuilles de route sont des enregistrements d approbation d execution lies a une entite et un modele.

Les sections d approbation et de completion ne sont utiles que lorsque modeles, etapes, utilisateurs, certifications et correspondances d entite existent.

## Ressources de completion

Les Completions stockent la valeur de completion d une entite, les commentaires, l utilisateur et la date. Les types d entite comprennent les examens et recommandations communs ainsi que les flux d entente : admissions, modifications, surveillances, reclamations, previsions, paiements et recommandations.

## Ressources de recommandation

Les Schemas de recommandation definissent un contenu structure et un resultat JSON. Les Configurations de recommandation attachent ces schemas et des modeles d approbation optionnels a une portee/type d entite. Les Recommandations sont des lignes d execution avec valeurs de recommandation et JSON de reponse.

## Conseils operationnels

La racine ne devrait pas utiliser Commun comme simple editeur de donnees. Plusieurs ressources pilotent les flux d execution. Modifier des schemas actifs, modeles d approbation ou configurations apres la creation de dossiers d execution peut affecter les nouveaux dossiers differemment des historiques. Preferez creer une nouvelle version ou configuration lorsque le processus metier change.

![Ressources Commun](/screenshots/fr/common-admin.png)

_Capture reelle de l environnement de developpement avec donnees semees. Les enregistrements montres sont seulement des exemples et ne sont pas crees dans une installation fraiche._
