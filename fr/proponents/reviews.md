# Examens de promoteur

Les examens capturent le travail d evaluation ou de liste de controle pour un promoteur. Ils sont generes a partir de configurations d examen et peuvent inclure schemas d evaluation, completion et approbations.

## Dependances

| Dependence | Pourquoi c est important |
| --- | --- |
| Schema d examen | Definit le contenu de liste de controle ou d evaluation. |
| Configuration d ensemble d examen | Groupe un ou plusieurs examens pour les promoteurs. |
| Ordre de configuration | Controle l ordre des examens dans l ensemble. |
| Modele d approbation | Requis lorsque les examens completes doivent etre approuves. |
| Permissions d examinateur | Requises pour creer, repondre, completer, approuver, refuser ou reattribuer. |

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
| Les ensembles groupent des examens lies | Un ensemble peut contenir un ou plusieurs examens. |
| Les configurations sequentielles doivent etre suivies dans l ordre | Completez les examens precedents avant de s appuyer sur les conclusions suivantes. |
| Les statuts terminaux protegent l historique | Les ensembles completes, approuves, refuses, retires ou annules ne doivent pas etre modifies comme brouillons. |
| Les modeles d approbation ajoutent le routage | Les examens completes peuvent exiger decisions et certifications. |
| Les changements de schema affectent les travaux futurs | Mettez la configuration a jour intentionnellement avant de creer de nouveaux ensembles. |

## Conseils

Utilisez les examens de promoteur avant la creation d entente lorsque l organisation doit evaluer l admissibilite, la capacite financiere, le risque ou l etat de preparation.
