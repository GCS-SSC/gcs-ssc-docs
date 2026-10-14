# Suppression logique

Lorsque vous supprimez la plupart des dossiers dans GCS-SSC, l’application les marque comme supprimés et les retire de l’usage normal. Elle conserve généralement le dossier enregistré pour préserver son historique. C’est la suppression logique. Le marqueur commun est `_deleted = true`.

## Pourquoi

Les dossiers operationnels deviennent souvent des references dans les ententes, examens, approbations, paiements, reclamations, previsions et pistes d audit. Une suppression physique briserait ces references. La suppression logique conserve le contexte historique tout en retirant les dossiers des flux actifs normaux.

## Experience utilisateur

La plupart des listes masquent les lignes supprimées. Le catalogue GWCOA dédié offre les filtres tous, actifs et supprimés et un indicateur de suppression à la modification. Ce n’est pas une interface générale de restauration des dossiers opérationnels. Certaines références possèdent un indicateur distinct de disponibilité; leur retrait empêche les nouvelles sélections tout en préservant les liens historiques. Suivez les règles de la page propriétaire avant de supprimer ou remplacer une référence.

## Comportement des donnees

Un dossier supprimé disparaît généralement des listes et des pages de détail, qui masquent les dossiers marqués `_deleted = true`. Sa disparition ne prouve pas que tous les renseignements enregistrés ont été effacés. Les suppressions d attribution, utilisateur, role, agence, cle-valeur d extension et plusieurs ressources enfants suivent ce modele.

## Unicite et recreation

Les controles d unicite s appliquent generalement aux lignes non supprimees. Par exemple, le numero d entreprise d un promoteur est verifie parmi les profils actifs. Si un remplacement est bloqué, vérifiez si un dossier non supprimé possède encore cette valeur unique. Par exemple, cherchez un promoteur actif ayant ce numéro d’entreprise avant de créer un autre profil. Recréer un dossier ne restaure pas l’ancien et ne rétablit pas automatiquement ses liens historiques.

## Prudence operationnelle

Supprimer logiquement une configuration peut quand meme perturber les flux. Un role supprime ne contribue plus aux permissions. Une configuration d examen supprimee n est plus disponible pour de nouvelles executions. Un utilisateur supprime ne peut normalement plus etre selectionne. Traitez les suppressions comme des décisions métier, pas comme un simple nettoyage d’interface.

Par exemple, supprimer une configuration d’examen inutilisée empêche les agents de la choisir pour de nouveaux examens. Avant de la supprimer, confirmez qu’aucun travail à venir n’en a besoin et suivez le processus d’approbation de votre organisation. Ne supposez pas que vous pouvez annuler la suppression : le contrôle du catalogue GWCOA décrit ci-dessus n’est pas une fonction générale de restauration.
