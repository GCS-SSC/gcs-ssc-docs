# Extensions

Les extensions ajoutent des fonctionnalites locales et versionnees a GCS-SSC. Elles peuvent ajouter de la configuration d agence et de volet, des onglets, des sections de page, des actions de creation specialisees, des calculateurs de montant de paiement, des routes serveur, des actifs publics, des donnees propres a l extension, des secrets chiffres et des messages bilingues.

## Enregistrement

Les extensions installees sont decouvertes au demarrage de l application. Les administrateurs ne creent pas les definitions d extension dans l interface; ils activent et configurent les extensions deja installees avec l application.

L hote valide le `sdkVersion` et les `requiredHostCapabilities` declares par chaque extension avant de l exposer. Une extension qui utilise une fonction sans declarer la capacite hote correspondante, ou qui cible une version SDK non prise en charge, echoue la validation de demarrage au lieu d apparaitre partiellement configuree.

## Activation d agence

L activation d agence est le premier interrupteur operationnel. Les utilisateurs doivent pouvoir lire l agence pour voir l etat des extensions et pouvoir la mettre a jour pour activer ou desactiver une extension.

Lorsqu une extension est activee pour une agence, l application execute ses migrations. Une action manuelle Executer les migrations est aussi disponible pour les extensions actives. Si l extension est desactivee a l agence, l application la desactive aussi pour tous les volets de l agence.

Les extensions d agence peuvent aussi exposer un ecran de configuration. Si l extension fournit un composant de configuration d agence, la modale le rend; sinon elle affiche du JSON. La configuration d agence convient aux reglages non secrets qui s appliquent a toute l agence.

## Configuration de volet

La configuration de volet est disponible seulement lorsque l extension est activee pour l agence. L onglet Extensions du volet liste les extensions actives a l agence, permet l activation de volet et ouvre la configuration.

La plupart des extensions utilisent une modale plein ecran de configuration. Si l extension fournit un composant de configuration de volet, la modale le rend; sinon elle affiche du JSON.

Une extension peut plutot declarer `admin.streamConfigPage`. Dans ce cas, l action Configurer ouvre une route dediee de configuration pleine page avec les metadonnees du programme, du volet, de l agence, de l extension, la configuration courante et l indicateur de mise en page hote. Utilisez cette configuration pleine page lorsque le parametrage exige plus d espace, des tables imbriquees, une configuration d identifiants ou un flux qui convient mal a une modale.

L application rejette les extensions inconnues, extensions non activees a l agence, JSON invalide et etats invalides propres a une extension. Lorsque la qualite narrative est activee pour un volet sans cible configuree, l application active par defaut la cible de niveau entente afin que l extension ait une surface d execution visible.

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

Les extensions financieres installees peuvent aussi ajouter des onglets d entente avec leurs propres totaux. Par exemple, l onglet de repartition des couts par resultat affiche les montants repartis et non repartis par version, type d engagement et exercice afin de montrer si le financement de programme de l entente est entierement reparti.

## Donnees et migrations

Les donnees propres a une extension peuvent etre stockees separement des dossiers GCS de base. La suppression des donnees cle-valeur d extension suit la meme attente de suppression logique que le reste de l application.

La configuration d extension et les donnees cle-valeur ne sont pas des coffres de secrets. La configuration peut etre rendue dans des composants d administration cote navigateur, et les entrees KV sont de l etat JSON ordinaire. Les cles privees, jetons API, jetons de rafraichissement, secrets de signature et valeurs semblables doivent utiliser le stockage chiffre de secrets du SDK, appuye par un stockage chiffre separe et une cle de deploiement `GCS_EXTENSION_SECRETS_KEY`. Les metadonnees de secret peuvent etre affichees pour l administration, mais les valeurs dechiffrees restent cote serveur.

## Integration GC Forms

L integration GC Forms est une extension installee qui peut relier des soumissions GC Forms a des correspondances de champs GCS. La configuration d agence stocke les metadonnees d identifiants et les cles privees chiffrees. La configuration de volet stocke l identifiant choisi, les details de point de terminaison GC Forms, l id de formulaire, le comportement de confirmation et les correspondances de destination.

Le materialiseur courant cible d abord les reclamations: il peut creer des reclamations d entente en brouillon et, facultativement, des lignes de reclamation, puis lier les dossiers GCS generes a la soumission GC Forms. La synchronisation verifie la forme du modele GC Forms enregistree avant de lire les soumissions; si la forme active a change, les utilisateurs doivent rafraichir le modele, revoir les correspondances, sauvegarder la configuration et relancer la synchronisation.
