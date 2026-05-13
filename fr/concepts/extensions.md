# Extensions

Les extensions ajoutent des fonctionnalites locales et versionnees a GCS-SSC. Elles peuvent ajouter de la configuration de volet, des onglets, des sections de page, des actions de creation specialisees, des calculateurs de montant de paiement, des donnees propres a l extension et des messages bilingues.

## Enregistrement

Les extensions installees sont decouvertes au demarrage de l application. Les administrateurs ne creent pas les definitions d extension dans l interface; ils activent et configurent les extensions deja installees avec l application.

## Activation d agence

L activation d agence est le premier interrupteur operationnel. Les utilisateurs doivent pouvoir lire l agence pour voir l etat des extensions et pouvoir la mettre a jour pour activer ou desactiver une extension.

Lorsqu une extension est activee pour une agence, l application execute ses migrations. Une action manuelle Executer les migrations est aussi disponible pour les extensions actives. Si l extension est desactivee a l agence, l application la desactive aussi pour tous les volets de l agence.

## Configuration de volet

La configuration de volet est disponible seulement lorsque l extension est activee pour l agence. L onglet Extensions du volet liste les extensions actives a l agence, permet l activation de volet et ouvre une modale plein ecran de configuration. Si l extension fournit un composant de configuration de volet, la modale le rend; sinon elle affiche du JSON.

L application rejette les extensions inconnues, extensions non activees a l agence, JSON invalide et etats invalides propres a une extension, par exemple activer la qualite narrative sans cible d execution active.

## Emplacements d execution

Les emplacements d execution sont des places nommees dans les pages existantes ou une extension activee peut afficher du contenu supplementaire. Les emplacements pris en charge comprennent les apres-zones de texte, les descriptions d entente, les champs et sections de profil d entente et les descriptions de promoteur.

Pour le contexte de volet, l activation d agence et l activation de volet doivent toutes deux etre vraies. Pour le contexte d agence seul, l extension peut s afficher lorsque l agence est activee ou lorsque son resolver d execution retourne explicitement active.

## Onglets d entite

Les extensions peuvent ajouter des onglets aux ententes, promoteurs, reclamations et surveillances. Un onglet apparait seulement lorsque l extension est activee pour l agence ou le volet pertinent et que l utilisateur possede l acces requis.

Les onglets de promoteur exigent l activation au niveau agence et utilisent une config vide par defaut, car les promoteurs ne sont pas limites a un volet.

## Responsabilites operationnelles

| Responsabilite | Guidance |
| --- | --- |
| Activer d abord a l agence | La configuration de volet est indisponible tant que l interrupteur d agence est eteint. |
| Configurer les volets avec soin | Les reglages de volet peuvent changer le comportement des ententes, paiements ou examens. |
| Executer les migrations lorsque demande | Les structures de donnees propres a l extension doivent etre pretes avant l utilisation. |
| Tester les pages d execution apres activation | Confirmez que les nouveaux onglets, emplacements, actions et calculateurs apparaissent seulement aux endroits prevus. |
| Desactiver avec prudence | Desactiver une extension a l agence la desactive aussi pour les volets de cette agence. |

## Actions de creation et calculateurs

Les extensions peuvent ajouter des actions de creation pour les engagements et paiements d entente. Elles peuvent aussi ajouter des calculateurs de montant de paiement. L hote detecte les conflits lorsque plus d une action de remplacement ou plus d un calculateur est disponible pour la meme operation.

## Donnees et migrations

Les donnees propres a une extension peuvent etre stockees separement des dossiers GCS de base. La suppression des donnees cle-valeur d extension suit la meme attente de suppression logique que le reste de l application.
