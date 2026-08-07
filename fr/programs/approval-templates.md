# Modeles D Approbation

Les modeles d approbation definissent des routes d approbation ordonnees. Un modele stocke le type d entite d execution, les metadonnees bilingues, les etapes d approbation ordonnees, les approbateurs par defaut, les titres d approbateur, les certifications d etape et la politique des etapes ajoutees par les utilisateurs. En execution, les modeles sont materialises en feuilles de route que les utilisateurs peuvent approuver, refuser, reattribuer ou prolonger lorsque le modele le permet.

Dans la configuration des paiements de transfert, les modeles sont souvent configures au niveau du volet puis references par les configurations d examen, configurations de recommandation, membres d evaluation ou flux d execution pour ententes, reclamations, previsions, paiements, surveillance, demandeurs/destinataires et travaux connexes.

## Prerequis Dans Une Installation Vide

Avant de creer des modeles operationnels, configurez:

- Utilisateurs communs qui peuvent etre selectionnes comme approbateurs par defaut.
- Types d approbation "au nom de" de l agence si les utilisateurs peuvent approuver au nom d autres personnes.
- Volet, configuration d examen, configuration de recommandation ou autre configuration d execution qui referencera le modele.
- Permissions pour les utilisateurs qui gerent les modeles et ceux qui agiront sur les approbations d execution.

Un modele peut etre sauvegarde sans etapes, mais un modele sans etapes produit une feuille de route vide et ne peut pas recueillir d approbations utiles.

## Emplacement Des Modeles

Les modeles d approbation peuvent etre geres dans les surfaces communes et dans l onglet Modeles d approbation du volet. Les modeles de volet utilisent:

- Type de portee `transferpaymentstream`.
- Identifiant de portee egal a l identifiant du volet.
- Type d entite choisi parmi les types supportes par les modeles d approbation.

L onglet de volet groupe les modeles par type d entite. Chaque ligne affiche le nom bilingue du modele, le nombre d etapes et le nombre de certifications.

## Types D Entite Supportes

Les modeles d approbation de volet supportent ces types d entite:

- Demandeur/destinataire.
- Entente de dossier de financement.
- Examen commun.
- Recommandation commune.
- Admission de dossier de financement.
- Rapprochement de reclamation de financement.
- Prevision de dossier de financement.
- Paiement de dossier de financement.

Le schema commun de modele d approbation reconnait aussi la surveillance de dossier de financement comme type valide. Utilisez seulement les types exposes par la surface de volet lorsque vous configurez des modeles portes par un volet.

## Liste Des Modeles

La liste des modeles prend en charge:

- Recherche et pagination.
- Regroupement par type d entite.
- Actions ajouter, modifier, ouvrir et supprimer selon les permissions enfant.
- Pastilles de nombre d etapes et de certifications.

La modale ajouter/modifier capture seulement les champs d en-tete du modele:

- Type d entite.
- Nom anglais et nom francais.
- Description anglaise et description francaise.

Les etapes et certifications sont gerees depuis la page de detail du modele.

## Page De Detail Du Modele

L ouverture d un modele affiche un espace de detail avec:

- Fil d Ariane vers le programme et le volet.
- Sommaire repliable avec nom, description, type d entite, nombre d etapes et nombre de certifications.
- Barre laterale avec sections General et Etapes d approbation.
- Action de sauvegarde pour tout le modele.

La section General contient:

- Type d entite. Il est affiche dans un controle enum desactive dans le detail parce que changer le type d entite apres creation changerait l utilisation du modele.
- Nom anglais et nom francais.
- Description anglaise et description francaise.

La section Approbations additionnelles determine si les utilisateurs peuvent prolonger une feuille de route materialisee. Sa configuration comprend:

- Une bascule **Permettre les approbations additionnelles**, desactivee par defaut.
- Le nom anglais et le nom francais par defaut de chaque etape ajoutee.
- La permission pour l utilisateur qui ajoute l etape de modifier ces noms bilingues.
- Une liste ordonnee d enonces de certification bilingues par defaut, chacun obligatoire ou facultatif.
- La permission pour l utilisateur qui ajoute l etape d ajouter, modifier, retirer ou reordonner les certifications, ou d en changer le caractere obligatoire.

Lorsque les approbations additionnelles sont permises, les noms d etape bilingues par defaut sont obligatoires. La liste des certifications par defaut peut etre vide. La politique et ses valeurs par defaut sont copiees dans chaque feuille de route au moment de sa materialisation. Les modifications ulterieures du modele s appliquent donc seulement aux nouvelles feuilles et ne modifient pas silencieusement une route deja en cours.

## Etapes D Approbation

Les etapes d approbation sont les actions ordonnees d une feuille de route. Chaque etape contient:

- Ordre / sequence.
- Titre d approbateur.
- Nom anglais et nom francais.
- Description anglaise et description francaise.
- Utilisateur par defaut.
- Zero ou plusieurs certifications.

L ordre des etapes doit etre unique dans le modele. La page de detail trie les etapes par sequence avant la sauvegarde.

L utilisateur par defaut est choisi dans la liste des utilisateurs communs. Les feuilles de route d execution utilisent cet utilisateur comme approbateur assigne sauf si l etape est reattribuee.

## Editeur D Etape

L editeur d etape s ouvre en plein ecran pour l ajout ou la modification. Il contient les champs de l etape et un accordeon de certifications. Sauvegarder l editeur met a jour l etat local du modele; le modele n est pas persiste tant que la sauvegarde principale de la page de detail ne reussit pas.

Utilisez cette distinction avec prudence: fermer l editeur d etape ne sauvegarde pas le modele. La page de detail du modele doit encore etre sauvegardee.

## Certifications

Les certifications sont des enonces de verification qu un approbateur doit traiter lors d une approbation ou d un refus. Chaque certification contient:

- Ordre.
- Indicateur optionnel.
- Nom anglais et nom francais.
- Description anglaise et description francaise.
- Texte de certification anglais et francais.

L ordre des certifications doit etre unique dans une etape. Les noms bilingues des certifications doivent aussi etre uniques dans une etape.

Comportement d execution:

| Regle | Comportement |
| --- | --- |
| Les certifications obligatoires doivent etre cochees | L approbation est desactivee jusqu a ce qu elles soient cochees. |
| Les certifications optionnelles peuvent rester non cochees | Elles ne bloquent pas l approbation. |
| Le texte suit la langue de l utilisateur | Le texte est affiche dans la langue de l approbateur lorsque possible. |

## Regles De Validation

La validation du modele applique:

| Regle | Comportement |
| --- | --- |
| Le type d entite est obligatoire | Le type doit etre un type d entite d execution supporte. |
| Le texte du modele est bilingue | Nom et description anglais/francais sont obligatoires. |
| Les champs d etape sont complets | Chaque etape exige sequence, nom bilingue, description bilingue, utilisateur par defaut et titre d approbateur. |
| La sequence d etape est unique | Les etapes non supprimees ne peuvent pas partager la meme sequence. |
| Les champs de certification sont complets | Chaque certification exige ordre, nom bilingue, description bilingue, indicateur optionnel si utilise et texte bilingue. |
| L ordre de certification est unique | Les certifications non supprimees d une meme etape ne peuvent pas partager l ordre. |
| Les noms de certification sont uniques | Les certifications non supprimees d une meme etape ne peuvent pas partager le meme nom bilingue. |

Les etapes ou certifications retirees sont appliquees lorsque le modele complet est sauvegarde. Jusque-la, l editeur conserve seulement l etat brouillon courant.

## Reference Des Modeles Dans Le Volet

Les modeles deviennent operationnels seulement lorsqu ils sont references par une autre configuration ou un processus d execution. Les references courantes du volet comprennent:

- Configuration d examen: un modele optionnel peut etre attache a tout l ensemble d examen.
- Membre de configuration d examen: un modele optionnel peut etre attache a un membre specifique de schema d evaluation/examen.
- Configuration de recommandation: un modele optionnel peut etre attache aux recommandations generees.
- Flux d entite d execution qui selectionnent les modeles selon le volet, le type d entite ou la relation de configuration.

Lorsqu une configuration reference un modele, changer le modele affecte les futures feuilles de route materialisees. Les approbations deja materialisees sont representees par des feuilles de route et lignes d approbation, pas par un pointeur vivant qui reecrit l historique complete.

## Feuilles De Route En Execution

En execution, la section commune d approbation charge l etat d approbation pour un type d entite et un identifiant. Elle peut retourner:

- Aucun mode d approbation.
- Materialisation en attente.
- Mode d execution avec feuilles de route et etapes.

Les feuilles de route sont groupees dans le tableau d approbation. Chaque feuille contient:

- Nom bilingue.
- Statut.
- Indicateur courant.
- Indicateur apercu.
- Etapes.

Chaque etape affiche:

- Nom bilingue de l etape.
- Approbateur par defaut.
- Approbateur assigne.
- Statut d approbation.
- Date de decision et acteur de decision lorsque completee.
- Commentaire.
- Certifications.
- Si l etape est courante.
- Si l utilisateur courant peut agir ou reattribuer.
- Si l utilisateur courant peut ajouter une etape immediatement avant ou apres.

## Ajout D Etapes D Approbation

Lorsque la politique copiee dans la feuille permet les approbations additionnelles, la colonne d actions propose **Ajouter avant** et **Ajouter apres** sur les etapes admissibles. L etape selectionnee sert de point d ancrage. La nouvelle etape recoit une sequence decimale entre ses voisines; aucune renumerotation ni reecriture de la route existante n est necessaire. Les insertions repetees utilisent des decimales de plus en plus precises tout en conservant un ordre d affichage sans ambiguite.

La modale exige un approbateur de la meme agence. Cet utilisateur devient a la fois l approbateur par defaut et l approbateur assigne de la nouvelle etape. La modale pre-remplit les noms bilingues et les certifications copies du modele. Les noms sont en lecture seule sauf si le modele permet leur modification. Lorsque la modification des certifications est permise, l utilisateur peut les ajouter, modifier, retirer, reordonner ou changer leur caractere obligatoire ou facultatif; une liste vide est valide.

Un utilisateur peut ajouter une etape dans l un des cas suivants:

- Il possede la permission de gerer le flux d approbation proprietaire; ou
- Il possede l acces ordinaire en lecture au dossier proprietaire et est assigne a une etape non resolue de la feuille de route courante.

L assignation seule ne donne jamais acces au dossier proprietaire. Au moment de la sauvegarde, le serveur verifie de nouveau la permission, l assignation, la feuille courante, le point d ancrage, l agence de l approbateur choisi et la politique copiee.

Une approbation peut etre ajoutee avant une etape non resolue, mais jamais avant une etape deja traitee. Une etape peut etre ajoutee apres le prefixe deja traite tant que la feuille demeure active. Aucune etape ne peut etre ajoutee a une feuille approuvee ou refusee. Une etape ajoutee par un utilisateur ne peut plus etre modifiee ni retiree apres sa creation; un gestionnaire peut toutefois la reattribuer par l action habituelle.

## Creation De Feuilles De Route De Remplacement

La creation d une feuille de remplacement apres un refus est distincte de l ajout d une etape a la feuille courante. La feuille de remplacement est materialisee depuis le modele configure et recoit un nouvel instantane de la politique des approbations additionnelles.

La section d approbation permet d ajouter une feuille de route de remplacement seulement lorsque:

- Le mode d approbation d execution est actif.
- L utilisateur peut gerer les approbations d examen pour l entite d execution.
- Au moins une feuille de route existe deja.
- Toutes les feuilles existantes sont refusees.

Cela permet un nouveau routage apres refus sans ecraser l historique de la feuille refusee.

Le refus est un resultat de flux reutilisable a cette fin. Un examen et un ensemble d examens refuses peuvent etre geres uniquement pour creer la feuille de remplacement. Sa creation remet l examen a `pendingapproval` et l ensemble d examens dans un statut actif. Les autres resultats terminaux de l ensemble d examens, soit `complete`, `approved`, `withdrawn` et `cancelled`, demeurent verrouilles et ne permettent pas une autre feuille de route.

## Actions Approuver Et Refuser

La modale d action s ouvre depuis l etape courante actionable. Elle affiche:

- Certifications obligatoires et optionnelles.
- Approbateur par defaut.
- Approbateur assigne.
- Bascule "au nom de" optionnelle lorsque l approbateur assigne differe de l approbateur par defaut.
- Selecteur de type "au nom de" lors d une action au nom d autrui.
- Titre de poste.
- Date de decision lorsque le type "au nom de" exige les details reels.
- Commentaire.

L approbation est desactivee lorsque:

- Une certification obligatoire n est pas cochee.
- L utilisateur agit au nom d autrui sans selectionner un type "au nom de".
- Les details reels sont requis mais le titre ou la date de decision manque.

Le refus est desactive lorsque:

- Le commentaire est vide.
- L utilisateur agit au nom d autrui sans selectionner un type "au nom de".
- Les details reels sont requis mais le titre ou la date de decision manque.

Les certifications obligatoires n ont pas a etre cochees pour refuser une etape. Un refus marque immediatement toute la feuille de route comme refusee, empeche les etapes suivantes de cette feuille d etre traitees ou ajoutees et conserve la feuille comme historique immuable. Un gestionnaire peut ensuite creer une nouvelle feuille fondee sur le modele.

L action d approbation enregistre la decision, les certifications, les donnees "au nom de", les details reels lorsque fournis et le commentaire. Approuver et refuser exigent la permission d action sur approbation d examen.

## Reattribution

La modale de reattribution permet a un gestionnaire de changer l utilisateur assigne a une etape. Elle contient:

- Recherche d approbateur assigne.
- Type "au nom de" lorsque l utilisateur assigne differe de l utilisateur par defaut.

Si l utilisateur assigne redevient l utilisateur par defaut, la valeur "au nom de" est effacee. La reattribution exige la permission de gestion d approbation d examen.

## Relation Entre Completion Et Approbation

Les modeles d approbation et les completions sont distincts mais apparaissent souvent ensemble dans les pages d examen d execution:

- Les approbations capturent les decisions ordonnees et les certifications.
- Les completions capturent la valeur finale, l utilisateur, l horodatage et les commentaires.
- Une page peut verrouiller la completion jusqu a ce que les conditions d evaluation ou d approbation soient satisfaites.

Les administrateurs doivent configurer a la fois la route du modele et la configuration d execution qui decide quand la route est requise.

## Conseils Operationnels

Utilisez ces pratiques:

- Creez des modeles par type d entite et par volet lorsque les routes d approbation different selon le volet du programme.
- Gardez les numeros de sequence simples et uniques.
- Activez les approbations additionnelles seulement lorsque le processus exige de prolonger une route active et fournissez des valeurs bilingues claires.
- Considerez l instantane de la feuille comme la politique effective de la route en cours; modifiez le modele seulement pour changer les routes futures.
- Utilisez des utilisateurs par defaut actifs et responsables du point operationnel.
- Redigez le texte de certification comme l enonce exact que l approbateur doit reconnaitre.
- Marquez une certification optionnelle seulement lorsqu elle est informative ou conditionnelle.
- Attachez les modeles aux configurations d examen/recommandation seulement apres avoir complete les etapes et certifications.
- Testez une feuille de route d execution avant l utilisation en production, surtout lorsque l approbation au nom d autrui est prevue.

![Detail de modele d approbation](/screenshots/fr/approval-template-detail.png)

_Capture reelle de l environnement de developpement avec donnees semees. Les enregistrements montres sont seulement des exemples et ne sont pas crees dans une installation fraiche._
