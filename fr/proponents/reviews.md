# Examens de promoteur

Les examens capturent le travail d evaluation ou de liste de controle pour un promoteur. Ils sont generes a partir de configurations d examen et peuvent inclure schemas d evaluation, completion et approbations.

## Dependances

| Dependence | Pourquoi c est important |
| --- | --- |
| Schema d examen | Definit le contenu de liste de controle ou d evaluation. |
| Configuration d ensemble d examen | Groupe un ou plusieurs examens pour les promoteurs. |
| Ordre de configuration | Controle l ordre des examens dans l ensemble. |
| Modele d approbation | Requis lorsque les examens completes doivent etre approuves. |
| Accès au promoteur et attribution de flux | L’accès en lecture au promoteur ouvre les examens. L’accès de mise à jour permet de créer les ensembles, de répondre, de compléter, d’annuler, de cloner ou de réattribuer. Une action d’approbation exige aussi l’attribution à cette étape ; l’attribution seule ne donne jamais accès au promoteur. |

## Flux de page

L onglet Examens groupe les lignes par ensemble. Les utilisateurs avec acces de mise a jour peuvent creer un ensemble depuis les configurations admissibles. Chaque examen individuel ouvre l espace d evaluation.

| Action | Resultat |
| --- | --- |
| Creer un ensemble d examen | Genere les examens configures pour le promoteur. |
| Ouvrir un examen | Ouvre la page de liste de controle ou d evaluation. |
| Annuler un ensemble | Arrete un ensemble non terminal lorsque le processus ne doit pas continuer. |
| Cloner un examen | Cree un nouvel examen depuis un examen refuse ou annule lorsqu une reprise est requise. |

## Regles metier

| Regle | Comportement |
| --- | --- |
| La configuration doit viser les promoteurs | Seules les configurations de promoteur sont admissibles. |
| La portee doit s appliquer au promoteur | Une configuration visant un volet est actuellement admissible seulement si le promoteur est lie a une entente sous ce volet de paiements de transfert. Une configuration visant directement le promoteur est aussi admissible. |
| L agence proprietaire doit correspondre | Chaque schema d evaluation actif de la configuration doit appartenir a l agence responsable du promoteur. |
| Les ensembles groupent des examens lies | Un ensemble peut contenir un ou plusieurs examens. |
| Les configurations sequentielles doivent etre suivies dans l ordre | Completez les examens precedents avant de s appuyer sur les conclusions suivantes. |
| Les statuts terminaux protegent l historique | Les ensembles completes, approuves, refuses, retires ou annules ne doivent pas etre modifies comme brouillons. |
| Les modeles d approbation ajoutent le routage | Les examens completes peuvent exiger decisions et certifications. |
| Les changements de schema affectent les travaux futurs | Mettez la configuration a jour intentionnellement avant de creer de nouveaux ensembles. |

## Pourquoi la liste des configurations peut etre vide

La boite de dialogue Ajouter est une recherche d admissibilite et non une liste de toutes les configurations d ensemble d examen du systeme. Elle est vide lorsqu aucune configuration d evaluation active ne respecte les regles de type de promoteur, de portee et d agence responsable. Dans la mise en oeuvre actuelle, une configuration visant un volet n apparait que si le promoteur est deja associe a une entente sous ce volet.

## Admissibilite planifiee par l entremise des demandes

La demande de dossier de financement est planifiee, mais n est pas encore mise en oeuvre. Lorsqu elle sera disponible, une configuration d ensemble d examen visant un volet sera admissible par l un ou l autre des chemins suivants :

1. Le promoteur est associe a une entente sous le volet de paiements de transfert.
2. Le promoteur est associe a une demande de dossier de financement dont le profil d occasion de financement appartient au volet de paiements de transfert.

Le chemin par la demande sera donc `Promoteur -> Demande de dossier de financement -> Profil d occasion de financement -> Volet de paiements de transfert`. Les memes controles de statut actif, de suppression logique, de type d entite, de schema d evaluation et d agence responsable continueront de s appliquer. Ce chemin planifie elargit la facon dont un volet devient applicable; il ne rend pas toutes les configurations de volet disponibles globalement.

## Conseils

Utilisez les examens de promoteur pour evaluer l admissibilite, la capacite financiere, le risque ou l etat de preparation. Jusqu a la mise en oeuvre de l admissibilite par les demandes, une configuration visant un volet exige une association a une entente. Si l examen est requis avant la creation d une entente, utilisez une configuration visant directement le promoteur ou tenez compte de cette limite dans le processus operationnel.
