# Suppression logique

La plupart des suppressions dans GCS-SSC marquent les lignes comme supprimees au lieu de les retirer physiquement. Le marqueur commun est `_deleted = true`.

## Pourquoi

Les dossiers operationnels deviennent souvent des references dans les ententes, examens, approbations, paiements, reclamations, previsions et pistes d audit. Une suppression physique briserait ces references. La suppression logique conserve le contexte historique tout en retirant les dossiers des flux actifs normaux.

## Experience utilisateur

Dans la plupart des listes, les lignes supprimees sont masquees. Dans Commun, les utilisateurs racine peuvent filtrer tous, actifs et supprimes, et basculer `_deleted` lors de la modification d un dossier existant. Certaines pages specialisees exposent seulement les dossiers actifs parce que les dossiers supprimes ne devraient pas etre reutilises dans une nouvelle configuration.

## Comportement des donnees

La plupart des pages de liste et de detail cachent les lignes marquees `_deleted = true`. Les suppressions d attribution, utilisateur, role, agence, cle-valeur d extension et plusieurs ressources enfants suivent ce modele.

## Unicite et recreation

Les controles d unicite s appliquent generalement aux lignes non supprimees. Par exemple, le numero d entreprise d un promoteur est verifie parmi les profils actifs. Si un remplacement est bloque, verifiez si un enregistrement non supprime possede encore cette valeur unique.

## Prudence operationnelle

Supprimer logiquement une configuration peut quand meme perturber les flux. Un role supprime ne contribue plus aux permissions. Une configuration d examen supprimee n est plus disponible pour de nouvelles executions. Un utilisateur supprime ne peut normalement plus etre selectionne. Traitez les suppressions comme des decisions metier, pas comme un simple nettoyage d interface.
