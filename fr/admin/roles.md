# Rôles

Les rôles définissent une permission réutilisable sur un sujet à portée globale, d’agence ou de programme. Une permission enregistre un niveau d’accès cumulatif — Lecteur, Contributeur ou Gestionnaire — et, pour le travail sur les ententes ou les promoteurs, peut autoriser indépendamment la gestion des affectations.

## Liste des rôles

La page Rôles prend en charge la recherche et la pagination. Un lecteur global des rôles voit tous les rôles actifs; un lecteur limité à une agence voit les rôles globaux et ceux d’une agence autorisée. Chaque ligne affiche le nom bilingue du rôle, le contexte d’agence, la portée et jusqu’à trois badges de permission suivis de `+N` s’il en existe davantage.

Les commandes de création et de modification exigent Contributeur pour `role` à la portée cible; la suppression logique exige Gestionnaire. Les rôles supprimés ne contribuent plus aux permissions et n’apparaissent pas dans les sélecteurs ordinaires.

## Sélection de la portée

Un rôle peut être :

- global : aucune agence sélectionnée;
- limité à une agence : une agence sélectionnée et aucun programme sélectionné;
- limité à des programmes : une agence et un ou plusieurs programmes de paiement de transfert de cette agence sélectionnés.

Seul un administrateur autorisé à créer des rôles globaux peut choisir Global. La sélection des programmes apparaît après celle d’une agence. Les sélecteurs avec recherche chargent tous les dossiers accessibles à l’administrateur et hydratent les valeurs enregistrées qui ne figurent pas dans la page de résultats courante.

La portée parente du rôle ne peut pas passer de globale à agence ou inversement après la création. Un rôle d’agence peut passer d’une couverture de toute l’agence à des programmes précis lorsque les permissions résultantes demeurent compatibles. Les programmes enregistrés manquants ou indisponibles sont étiquetés plutôt que retirés silencieusement.

## Règles de portée

| Structure du rôle | Portée effective |
| --- | --- |
| Aucune agence | Globale |
| Agence sans programme | Agence |
| Agence et un ou plusieurs programmes | Programme |

Les liens de programme doivent appartenir à l’agence du rôle. Des contraintes de base de données revérifient le graphe complet du rôle et de ses permissions à la validation de la transaction; une mise à jour du profil ou d’une permission ne peut donc pas laisser une combinaison incompatible.

## Niveaux de permission

L’onglet Permissions affiche une ligne par sujet pris en charge. Sélectionnez `Aucun`, `Lecteur`, `Contributeur` ou `Gestionnaire` :

| Niveau | Actions cumulatives |
| --- | --- |
| Lecteur | Lecture |
| Contributeur | Lecture, création, modification |
| Gestionnaire | Lecture, création, modification, suppression |

Les sujets sont `system`, `agency`, `transfer_payment`, `role`, `user`, `agreement` et `applicant_recipient`.

| Sujet du rôle | Rôle global | Rôle d’agence | Rôle de programme |
| --- | :---: | :---: | :---: |
| `system` | Oui | Non | Non |
| `agency` | Oui | Oui | Non |
| `transfer_payment` | Oui | Oui | Oui |
| `role` | Oui | Oui | Non |
| `user` | Oui | Oui | Non |
| `agreement` | Oui | Oui | Oui |
| `applicant_recipient` | Oui | Oui | Non |

Il n’existe ni sujet générique ni ensemble de commutateurs CRUD indépendants. Le serveur rejette une ligne de sujet en double ou un sujet incompatible avec la portée effective du rôle.

## Capacité de gestion des affectations

Les lignes de permission Entente et Promoteur offrent aussi **Gérer les affectations**. Cette capacité est indépendante :

- elle peut être activée lorsque le niveau d’accès au sujet est `Aucun`;
- Gestionnaire ne l’active pas automatiquement;
- elle expose seulement les surfaces minimales Gestion des affectations et du registre;
- elle ne révèle pas le contenu de l’entité et n’affecte pas l’administrateur comme utilisateur.

Choisir le niveau `Aucun` et désactiver Gérer les affectations supprime la ligne de permission. Consultez [Gestion des affectations](./assignments.md) et [Permissions de rôle et affectations exactes](../concepts/rbac.md).

## Onglets de détail et enregistrement

La page de détail contient :

- Général, avec les noms et descriptions bilingues, l’agence et la portée de programme.
- Permissions, avec le sélecteur de niveau et les commutateurs de gestion des affectations admissibles.

Général et Permissions sont enregistrés indépendamment. Une mise à jour par sujet remplace atomiquement cette ligne et prend effet lors des autorisations serveur suivantes. Les modifications du profil ne peuvent écraser les permissions, et un changement de permission ne peut enregistrer une portée de rôle invalide.

La création, les mises à jour de profil, la suppression et le remplacement de permissions d’un rôle ajoutent des enregistrements `security_audit_event` non sensibles dans la même transaction. Un changement échoué ne produit aucune ligne d’audit.

## Conception recommandée des rôles

- Administrateur racine : rôle global comportant les niveaux Gestionnaire requis et les capacités explicites de gestion des affectations. Il demeure un rôle ordinaire sans contournement.
- Administrateur d’agence : niveaux d’agence, d’utilisateur, de rôle, de paiement de transfert, d’entente et de promoteur pour une agence, selon les besoins.
- Gestionnaire de programme : niveaux de paiement de transfert et d’entente pour les programmes choisis.
- Coordonnateur des affectations : seulement la capacité `manage_assignments` requise pour les ententes ou les promoteurs à une portée étroite.
- Agent de traitement : plafonds Contributeur pour les sujets propriétaires; les affectations exactes déterminent la file de travail réelle.
- Réviseur ou approbateur : plafond ordinaire de l’entité requis par le processus et responsabilité de flux affectée séparément.
- Analyste en lecture seule : niveaux Lecteur sans capacité de gestion des affectations.

Privilégiez un petit ensemble de rôles durables fondés sur les fonctions. Utilisez la portée et les attributions utilisateur-rôle pour varier la couverture, puis les affectations exactes pour répartir le travail enregistré.
