# Historique du financement d un promoteur

L onglet Historique du financement presente les relations de financement du promoteur dans une seule vue. Il affiche les ententes completes gerees dans GCS-SSC et les dossiers de financement externes legers declares hors du systeme.

Un dossier externe contient une agence, un programme, un numero d entente, un titre et une description bilingues, des dates, un montant, une devise et un ou plusieurs promoteurs. Il ne cree pas d espace d entente ni de flux enfant. Ouvrez une entente du systeme pour gerer ses details operationnels; modifiez un dossier externe directement dans l historique du financement.

## Ajouter du financement externe

L assistant accepte les agences et programmes configures ou ponctuels. Selectionnez une valeur configuree lorsqu elle existe. Une agence ponctuelle ne peut pas reprendre le nom d une agence configuree. Un programme ponctuel ne peut pas reprendre le nom d un programme configure de l agence selectionnee.

Un dossier externe peut etre associe a plusieurs promoteurs. Lorsque le meme financement externe concerne un autre promoteur, modifiez le dossier existant et ajoutez ce promoteur plutot que de creer un doublon.

## Regles de doublon exact

Un doublon exact est bloque seulement lorsqu un autre dossier externe actif occupe la meme portee d identite :

| Forme de l identite externe | Portee du doublon |
| --- | --- |
| Programme configure | Programme et numero d entente normalise. |
| Agence configuree et programme ponctuel | Agence, nom normalise du programme ponctuel et numero d entente normalise. |
| Agence ponctuelle et programme ponctuel | Nom normalise de l agence ponctuelle, nom normalise du programme ponctuel et numero d entente normalise. |

Le meme numero d entente est permis dans une portee differente. La comparaison ignore la casse, les espaces, la ponctuation et les autres caracteres non alphanumeriques. Un dossier externe supprime logiquement n occupe plus sa portee de doublon.

## Avertissements de similarite

Les collisions entre sources produisent des avertissements, pas des doublons. Un dossier externe peut donc reprendre le numero normalise d une entente GCS-SSC du meme programme apres examen et confirmation de l avertissement. Les numeros d entente proches dans la meme portee exigent aussi une confirmation.

Les noms ponctuels d agence et de programme sont compares aux noms configures afin de corriger les correspondances probables avant l enregistrement. Un avertissement peut signaler une correspondance restreinte sans reveler de details que l utilisateur courant ne peut pas consulter. Toute modification d une valeur annule les confirmations precedentes et exige un nouvel examen.

Les doublons exacts dans la source externe ne peuvent pas etre contournes. Les doublons exacts des ententes GCS-SSC sont appliques separement dans leur propre volet d entente.
