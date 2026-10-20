# Suppression logique

Lorsque vous supprimez la plupart des dossiers dans GCS-SSC, l’application les marque comme supprimés et les retire de l’usage normal. Elle conserve généralement le dossier enregistré pour préserver son historique. C’est la suppression logique. Dans la base de données, le marqueur habituel est `_deleted = true`.

## Pourquoi

Les dossiers opérationnels servent souvent de références dans les ententes, examens, approbations, paiements, réclamations, prévisions et pistes d’audit. Une suppression physique briserait ces références. La suppression logique conserve le contexte historique tout en retirant les dossiers des flux actifs normaux.

## Expérience utilisateur {#experience-utilisateur}

La plupart des listes masquent les lignes supprimées. Le catalogue GWCOA dédié offre les filtres tous, actifs et supprimés et un indicateur de suppression à la modification. Ce n’est pas une interface générale de restauration des dossiers opérationnels. Certaines références possèdent un indicateur distinct de disponibilité; leur retrait empêche les nouvelles sélections tout en préservant les liens historiques. Suivez les règles de la page propriétaire avant de supprimer ou remplacer une référence.

## Comportement des données {#comportement-des-donnees}

Un dossier supprimé disparaît généralement des listes et des pages de détail, qui masquent les dossiers marqués `_deleted = true`. Sa disparition ne prouve pas que tous les renseignements enregistrés ont été effacés. La suppression des affectations, utilisateurs, rôles, agences, réglages clé-valeur d’extension et de nombreux dossiers associés suit ce modèle.

## Unicité et recréation {#unicite-et-recreation}

Les contrôles d’unicité s’appliquent généralement aux dossiers non supprimés. Si GCS-SSC refuse de créer un remplacement parce qu’une valeur existe déjà, cherchez un dossier actif ayant cette valeur. Par exemple, vérifiez si un promoteur actif possède déjà le numéro d’entreprise avant de créer un autre profil. Recréer un dossier ne restaure pas l’ancien et ne rétablit pas automatiquement ses liens historiques.

## Prudence opérationnelle {#prudence-operationnelle}

Supprimer logiquement une configuration peut quand même perturber les flux. Un rôle supprimé ne contribue plus aux permissions. Une configuration d’examen supprimée n’est plus disponible pour de nouveaux examens. Un utilisateur supprimé ne peut normalement plus être sélectionné. Confirmez que la configuration n’est plus nécessaire avant de la supprimer.

Par exemple, supprimer une configuration d’examen inutilisée empêche les agents de la choisir pour de nouveaux examens. Avant de la supprimer, confirmez qu’aucun travail à venir n’en a besoin et suivez le processus d’approbation de votre organisation. Ne supposez pas que vous pouvez annuler la suppression : le contrôle du catalogue GWCOA décrit ci-dessus n’est pas une fonction générale de restauration.
