# Rôles

Utilisez les rôles pour donner aux personnes les permissions nécessaires à leurs fonctions. Chaque permission vise un type de travail (le **sujet**, par exemple les ententes) et un secteur de responsabilité (la **portée**, par exemple une agence ou un programme). Choisissez Lecteur, Contributeur ou Gestionnaire pour définir les actions permises. Les permissions Entente, Promoteur, Dossier de financement, Compte débiteur, Correction et Pièce de journal peuvent aussi autoriser séparément la gestion des affectations.

Par exemple, un agent ayant la permission Contributeur Entente pour le programme A peut lire, créer et modifier des ententes de ce programme. Pour traiter un dossier existant pouvant être affecté, il doit aussi avoir l’affectation directe exigée pour ce dossier. Le rôle ne lui donne pas accès au programme B et ne lui affecte pas automatiquement toutes les ententes du programme A.

## Liste des rôles

La page Rôles prend en charge la recherche et la pagination. Un lecteur global des rôles voit tous les rôles actifs; un lecteur limité à une agence voit les rôles globaux et ceux d’une agence autorisée. Chaque ligne affiche le nom bilingue du rôle, le contexte d’agence, la portée et jusqu’à trois badges de permission suivis de `+N` s’il en existe davantage.

Les commandes de création et de modification exigent Contributeur pour `role` à la portée cible; la suppression logique exige Gestionnaire. Les rôles supprimés ne contribuent plus aux permissions et n’apparaissent pas dans les sélecteurs ordinaires.

## Sélection de la portée

Un rôle peut être :

- global : aucune agence sélectionnée;
- limité à une agence : une agence sélectionnée et aucun programme sélectionné;
- limité à des programmes : une agence et un ou plusieurs programmes de paiement de transfert de cette agence sélectionnés.

Seul un administrateur autorisé à créer des rôles globaux peut choisir Global. La sélection des programmes apparaît après celle d’une agence. Utilisez les sélecteurs avec recherche pour trouver les dossiers auxquels vous avez accès. Les sélections enregistrées restent visibles même si elles ne figurent pas dans la page de résultats courante.

La portée parente du rôle ne peut pas passer de globale à agence ou inversement après la création. Un rôle d’agence peut passer d’une couverture de toute l’agence à des programmes précis lorsque les permissions résultantes demeurent compatibles. Les programmes enregistrés manquants ou indisponibles sont étiquetés plutôt que retirés silencieusement.

## Règles de portée

| Structure du rôle | Portée effective |
| --- | --- |
| Aucune agence | Globale |
| Agence sans programme | Agence |
| Agence et un ou plusieurs programmes | Programme |

Les liens de programme doivent appartenir à l’agence du rôle. Lors de l’enregistrement, la base de données vérifie ensemble le rôle, ses programmes et ses permissions. Une combinaison incompatible est refusée.

## Niveaux de permission

L’onglet Permissions affiche une ligne par sujet pris en charge. Sélectionnez `Aucun`, `Lecteur`, `Contributeur` ou `Gestionnaire` :

| Niveau | Actions cumulatives |
| --- | --- |
| Lecteur | Lecture |
| Contributeur | Lecture, création, modification |
| Gestionnaire | Lecture, création, modification, suppression |

Les sujets sont `system`, `audit`, `group`, `agency`, `transfer_payment`, `role`, `user`, `agreement`, `funding_case`, `applicant_recipient`, `account_receivable`, `correction` et `journal_voucher`.

| Sujet du rôle | Rôle global | Rôle d’agence | Rôle de programme |
| --- | :---: | :---: | :---: |
| `system` | Oui | Non | Non |
| `audit` | Oui | Oui | Non |
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

Choisissez un niveau pour chaque sujet; aucune permission ne couvre tous les sujets à la fois. La lecture, la création, la modification et la suppression sont incluses dans ces niveaux cumulatifs plutôt que choisies par des commutateurs séparés. Le serveur rejette une ligne de sujet en double ou un sujet incompatible avec la portée effective du rôle.

Les sujets Compte débiteur, Correction et Pièce de journal acceptent les portées globale, d’agence et de programme. Accordez-les séparément de l’accès Entente : Gestionnaire Entente seul n’autorise pas ces actions financières. L’application vérifie quelle agence ou quel programme possède réellement le dossier financier; une permission de programme ne couvre pas un crédit appartenant à l’agence.

## Capacité de gestion des affectations

Les lignes de permission Entente, Promoteur, Dossier de financement, Compte débiteur, Correction et Pièce de journal offrent aussi **Gérer les affectations**. Cette capacité est indépendante :

- elle peut être activée lorsque le niveau d’accès au sujet est `Aucun`;
- Gestionnaire ne l’active pas automatiquement;
- elle affiche seulement les renseignements limités nécessaires dans Gestion des affectations et les listes de personnes affectées;
- elle ne révèle pas le contenu de l’entité et n’affecte pas l’administrateur comme utilisateur.

Choisir le niveau `Aucun` et désactiver Gérer les affectations supprime la ligne de permission. Consultez [Gestion des affectations](./assignments.md) et [Permissions de rôle et affectations exactes](../concepts/rbac.md).

## Onglets de détail et enregistrement

La page de détail contient :

- Général, avec les noms et descriptions bilingues, l’agence et la portée de programme.
- Permissions, avec le sélecteur de niveau et les commutateurs de gestion des affectations admissibles.

Enregistrez Général et Permissions séparément. La modification d’une permission de sujet la remplace en une seule opération et s’applique à la prochaine requête. Enregistrer les noms ou descriptions ne peut pas écraser les permissions. L’application refuse les permissions incompatibles avec la portée du rôle.

La création, les mises à jour de profil, la suppression et le remplacement de permissions d’un rôle ajoutent des enregistrements `audit.security_audit_event` non sensibles dans la même transaction. Un changement échoué ne produit aucune ligne d’audit.

## Conception recommandée des rôles

- Administrateur racine : rôle global comportant les niveaux Gestionnaire requis et les capacités explicites de gestion des affectations. Il demeure un rôle ordinaire sans contournement.
- Administrateur d’agence : niveaux d’agence, d’utilisateur, de rôle, de paiement de transfert, d’entente, de dossier de financement et de promoteur pour une agence, selon les besoins.
- Gestionnaire de programme : niveaux de paiement de transfert, d’entente et de dossier de financement pour les programmes choisis.
- Coordonnateur des affectations : seulement la capacité `manage_assignments` requise pour les sujets nécessaires à une portée étroite.
- Agent de traitement : permissions Contributeur pour les types de travail concernés, avec des affectations directes aux dossiers enregistrés que l’agent doit traiter.
- Réviseur ou approbateur : permission sur le dossier exigée par le processus, avec une affectation distincte à la tâche d’examen ou d’approbation.
- Analyste en lecture seule : niveaux Lecteur sans capacité de gestion des affectations.

Privilégiez un petit ensemble de rôles durables fondés sur les fonctions. Utilisez la portée et les attributions utilisateur-rôle pour varier la couverture, puis les affectations exactes pour répartir le travail enregistré.

Accordez explicitement l’accès Audit sur un rôle global ou d’agence. `audit:view_audit_inputs` est une capacité distincte pour les entrées capturées assainies. Gestionnaire Système ne donne pas automatiquement accès au [navigateur d’audit](./audit.md). Pour une personne qui consulte seulement les preuves, accordez Lecteur Audit à la portée requise sans permissions opérationnelles ni gestion des affectations supplémentaires.
