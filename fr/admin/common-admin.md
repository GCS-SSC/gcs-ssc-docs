# Commun

Commun est la page d’administration globale accessible à `/fr/admin/commun`. Elle exige la permission globale explicite `system:read` ; le rôle racine initial respecte cette règle grâce à des capacités ordinaires et ne possède aucun contournement spécial.

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

Chaque onglet affiche un tableau et un formulaire généré. Les types de champs comprennent le texte, les nombres, les dates, les zones de texte, le JSON, les valeurs booléennes, les énumérations et les recherches. La recherche porte sur les colonnes configurées et l’identifiant. Le filtre de suppression accepte les valeurs Tous, Actifs et Supprimés. Pour les ressources modifiables, une ligne existante offre un interrupteur de suppression afin que les administrateurs globaux autorisés puissent la supprimer logiquement ou la restaurer.

L onglet Entites est en lecture seule. Il fournit les ids d entite d execution pour les champs de recherche et ne doit pas etre cree manuellement dans l UI.

## Ressources de reference

GWCOA, Contacts, Adresses, Schemas de formulaire et Types de piece jointe sont fondamentaux. Ils fournissent des references de plan comptable, personnes reutilisables, adresses reutilisables, JSON de schema de formulaire dynamique et libelles de piece jointe filtrables par agence. Les schemas de formulaire et types de piece jointe peuvent etre lies a une agence.

## Ressources d examen

Les Schemas d examen definissent le contenu d examen et peuvent etre de type liste de controle ou evaluation. La creation d un schema d examen Commun utilise la logique de versionnement pour creer une valeur brouillon. Les Configurations d ensembles d examen regroupent les examens par type d entite et portee. Les Configurations d examen attachent les schemas a un ensemble et les ordonnent. Les Ensembles d examen et Examens sont des enregistrements d execution crees a partir de ces definitions.

Lorsqu’un Examen d’exécution est créé ou associé à un autre schéma d’examen, Commun copie dans l’examen les paramètres du schéma actif sélectionné pour les résultats personnalisés, l’alignement et les examinateurs. La restauration d’un examen supprimé exige que son schéma référencé demeure actif. Une restauration sans changement de référence conserve l’instantané existant ; l’attribution d’un autre schéma actif actualise l’instantané à partir de ce nouveau schéma. Ce comportement stabilise les examens historiques et empêche leur restauration avec une configuration retirée.

Pour les examens de promoteur, l onglet d execution recherche les configurations d ensembles pour `applicantrecipient`, cree des ensembles d examen d execution, regroupe les examens par ensemble et ouvre les pages d evaluation pour les examens individuels.

## Ressources d approbation

Les Modeles d approbation decrivent un flux pour une portee et un type d entite. Les Etapes d approbation definissent sequence, utilisateur par defaut et titre d approbateur. Les Certifications peuvent etre attachees aux etapes et preciser un texte optionnel ou requis. Les Feuilles de route sont des enregistrements d approbation d execution lies a une entite et un modele.

Les sections d approbation et de completion ne sont utiles que lorsque modeles, etapes, utilisateurs, certifications et correspondances d entite existent.

## Ressources de completion

Les Completions stockent la valeur de completion d une entite, les commentaires, l utilisateur et la date. Les types d entite comprennent les examens et recommandations communs ainsi que les flux d entente : admissions, modifications, surveillances, reclamations, previsions, paiements et recommandations.

## Ressources de recommandation

Les Schemas de recommandation definissent un contenu structure et un resultat JSON. Les Configurations de recommandation attachent ces schemas et des modeles d approbation optionnels a une portee/type d entite. Les Recommandations sont des lignes d execution avec valeurs de recommandation et JSON de reponse.

## Conseils operationnels

Les administrateurs système globaux ne devraient pas utiliser Commun comme simple éditeur de données. Plusieurs ressources pilotent les flux d’exécution. Modifier des schémas actifs, des modèles d’approbation ou des configurations après la création de dossiers d’exécution peut affecter les nouveaux dossiers différemment des dossiers historiques. Préférez créer une nouvelle version ou une nouvelle configuration lorsque le processus métier change.

![Ressources Commun](/screenshots/fr/common-admin.png)

_Capture reelle de l environnement de developpement avec donnees semees. Les enregistrements montres sont seulement des exemples et ne sont pas crees dans une installation fraiche._
