# Rôles

Utilisez les rôles pour donner aux personnes les permissions nécessaires à leurs fonctions. Chaque permission vise un type de travail, appelé sujet, et un secteur de responsabilité, appelé portée. Par exemple, une permission peut couvrir les ententes d'un programme. Choisissez Lecteur, Contributeur ou Gestionnaire pour définir les actions permises. Les permissions Entente, Promoteur, Dossier de financement, Compte débiteur, Correction et Pièce de journal peuvent aussi autoriser séparément la gestion des affectations.

Par exemple, un agent ayant la permission Contributeur Entente pour le programme A peut lire, créer et modifier des ententes de ce programme. Pour traiter un dossier existant pouvant être affecté, il doit aussi avoir l'affectation directe exigée pour ce dossier. Le rôle ne lui donne pas accès au programme B et ne lui affecte pas automatiquement toutes les ententes du programme A.

## Liste des rôles

Ouvrez **Rôles** pour rechercher ou parcourir les rôles actifs. Une permission globale de lecture des rôles permet de voir tous les rôles actifs. Une permission d'agence permet de voir les rôles globaux et ceux d'une agence que vous êtes autorisé à consulter. Chaque ligne affiche le nom bilingue du rôle, le contexte d'agence, la portée et jusqu'à trois badges de permission suivis de `+N` s'il en existe davantage.

Pour créer ou modifier un rôle, vous devez avoir la permission Contributeur pour `role` à la portée cible. Pour supprimer un rôle, vous devez avoir Gestionnaire. La suppression conserve l'historique du rôle, mais retire les accès qu'il accordait et le masque dans les sélecteurs ordinaires.

## Sélection de la portée

Un rôle peut être :

- global : aucune agence sélectionnée;
- limité à une agence : une agence sélectionnée et aucun programme sélectionné;
- limité à des programmes : une agence et un ou plusieurs programmes de paiement de transfert de cette agence sélectionnés.

Seul un administrateur autorisé à créer des rôles globaux peut choisir Global. La sélection des programmes apparaît après celle d'une agence. Utilisez les sélecteurs avec recherche pour trouver les dossiers auxquels vous avez accès. Les sélections enregistrées restent visibles même si elles ne figurent pas dans la page de résultats courante.

Après avoir créé un rôle, vous ne pouvez pas le changer de global à limité à une agence, ni l'inverse. Vous pouvez modifier un rôle d'agence pour couvrir toute l'agence ou des programmes précis si ses permissions permettent cette portée. Si un programme enregistré devient manquant ou indisponible, sa sélection reste visible avec un libellé qui explique le problème.

## Règles de portée

| Structure du rôle | Portée effective |
| --- | --- |
| Aucune agence | Globale |
| Agence sans programme | Agence |
| Agence et un ou plusieurs programmes | Programme |

Sélectionnez seulement des programmes de l'agence du rôle. À l'enregistrement, l'application vérifie que le rôle, les programmes et les permissions sont compatibles. Elle refuse les combinaisons incompatibles.

## Niveaux de permission

L'onglet Permissions affiche une ligne par sujet pris en charge. Sélectionnez `Aucun`, `Lecteur`, `Contributeur` ou `Gestionnaire` :

| Niveau | Actions cumulatives |
| --- | --- |
| Lecteur | Lecture |
| Contributeur | Lecture, création, modification |
| Gestionnaire | Lecture, création, modification, suppression |

Les sujets sont `system`, `audit`, `guided_help`, `group`, `agency`, `transfer_payment`, `role`, `user`, `agreement`, `funding_case`, `applicant_recipient`, `account_receivable`, `correction` et `journal_voucher`.

| Sujet du rôle | Rôle global | Rôle d'agence | Rôle de programme |
| --- | :---: | :---: | :---: |
| `system` | Oui | Non | Non |
| `audit` | Oui | Oui | Non |
| `guided_help` | Oui | Oui | Non |
| `group` | Oui | Oui | Non |
| `agency` | Oui | Oui | Non |
| `transfer_payment` | Oui | Oui | Oui |
| `role` | Oui | Oui | Non |
| `user` | Oui | Oui | Non |
| `agreement` | Oui | Oui | Oui |
| `funding_case` | Oui | Oui | Oui |
| `account_receivable` | Oui | Oui | Oui |
| `correction` | Oui | Oui | Oui |
| `journal_voucher` | Oui | Oui | Oui |
| `applicant_recipient` | Oui | Oui | Non |

Choisissez un niveau pour chaque sujet. Aucune permission ne couvre tous les sujets à la fois. Chaque niveau comprend les actions des niveaux inférieurs. Vous ne choisissez donc pas séparément la lecture, la création, la modification et la suppression. L'application refuse les sujets en double et ceux qui ne permettent pas la portée du rôle.

Les sujets Compte débiteur, Correction et Pièce de journal acceptent les portées globale, d'agence et de programme. Accordez-les séparément de l'accès Entente. Gestionnaire Entente seul n'autorise pas ces actions financières. L'application vérifie quelle agence ou quel programme possède réellement le dossier financier; une permission de programme ne couvre pas un crédit appartenant à l'agence.

## Permissions d'aide guidée

Accordez l'aide guidée séparément de l'accès Système ou Entente. Un rôle global peut gérer les guides du système et des agences. Un rôle d'agence couvre seulement cette agence, et un rôle de programme ne peut pas inclure `guided_help`.

Lecteur permet de consulter les brouillons et publications. Contributeur permet de créer, adopter, cloner, modifier et publier des guides, et de modifier les paramètres du catalogue d'agence. Gestionnaire permet aussi de retirer des guides et de supprimer les brouillons non publiés admissibles. L'aide guidée n'utilise ni affectation exacte à un dossier ni commutateur Gérer les affectations.

## Capacité de gestion des affectations

Les lignes de permission Entente, Promoteur, Dossier de financement, Compte débiteur, Correction et Pièce de journal offrent aussi **Gérer les affectations**. Sélectionnez cette capacité séparément du niveau d'accès :

- elle peut être activée lorsque le niveau d'accès au sujet est `Aucun`;
- Gestionnaire ne l'active pas automatiquement;
- elle affiche seulement les renseignements limités nécessaires dans Gestion des affectations et les listes de personnes affectées;
- elle ne révèle pas le contenu de l'entité et n'affecte pas l'administrateur comme utilisateur.

Choisir le niveau `Aucun` et désactiver Gérer les affectations supprime la ligne de permission. Consultez [Gestion des affectations](./assignments.md) et [Permissions de rôle et affectations exactes](../concepts/rbac.md).

## Onglets de détail et enregistrement

La page de détail contient :

- Général, avec les noms et descriptions bilingues, l'agence et la portée de programme.
- Permissions, avec le sélecteur de niveau et les commutateurs de gestion des affectations admissibles.

Enregistrez Général et Permissions séparément. Les noms français et anglais sont obligatoires. Si un texte collé produit une erreur de caractère invalide, retirez le caractère masqué ou retapez le nom ou la description concernés, puis enregistrez de nouveau. Les permissions modifiées s'appliquent à la prochaine requête. Enregistrer les noms ou descriptions n'écrase pas les changements de permission. L'application refuse les permissions incompatibles avec la portée du rôle.

La création, la modification du profil, la suppression et les changements de permission réussis d'un rôle sont consignés dans la [piste d'audit de sécurité](./audit.md). Ces événements excluent les valeurs sensibles. Un changement échoué ne crée aucun événement d'audit de sécurité.

## Conception recommandée des rôles

- Administrateur racine : rôle global comportant les niveaux Gestionnaire requis et les capacités explicites de gestion des affectations. Il demeure un rôle ordinaire sans contournement.
- Administrateur d'agence : niveaux d'agence, d'utilisateur, de rôle, de paiement de transfert, d'entente, de dossier de financement et de promoteur pour une agence, selon les besoins.
- Gestionnaire de programme : niveaux de paiement de transfert, d'entente et de dossier de financement pour les programmes choisis.
- Coordonnateur des affectations : seulement la capacité `manage_assignments` requise pour les sujets nécessaires à une portée étroite.
- Agent de traitement : permissions Contributeur pour les types de travail concernés, avec des affectations directes aux dossiers enregistrés que l'agent doit traiter.
- Réviseur ou approbateur : permission sur le dossier exigée par le processus, avec une affectation distincte à la tâche d'examen ou d'approbation.
- Analyste en lecture seule : niveaux Lecteur sans capacité de gestion des affectations.

Gardez un petit ensemble de rôles fondés sur les fonctions. Définissez la portée de chaque rôle et attribuez-le aux utilisateurs concernés. Affectez ensuite chaque dossier aux personnes qui le traiteront.

Accordez explicitement l'accès Audit sur un rôle global ou d'agence. `audit:view_audit_inputs` est une capacité distincte pour les entrées capturées assainies. Gestionnaire Système ne donne pas automatiquement accès au [navigateur d'audit](./audit.md). Pour une personne qui consulte seulement les preuves, accordez Lecteur Audit à la portée requise sans permissions opérationnelles ni gestion des affectations supplémentaires.
