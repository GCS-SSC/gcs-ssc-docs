# Agences

Une agence regroupe ses programmes et les choix partagés du personnel : exercices financiers, catégories de coûts et types d’entente, par exemple. Ces choix sont les données de référence. Configurez-les ici avant leur utilisation dans les ententes, réclamations et paiements.

Par exemple, si un agent ne peut pas sélectionner une catégorie de coûts dans le budget d’une entente, vérifiez la catégorie de l’agence et sa sélection dans le volet. L’accès est aussi propre à chaque agence : voir son identifiant dans un autre dossier ne donne pas la permission de l’ouvrir.

## Accès et permissions

Vos permissions déterminent les agences que vous pouvez ouvrir et les changements permis. Le serveur vérifie chaque requête, même si un bouton ou un lien est visible. Dans le tableau, une attribution désigne une permission accordée à votre compte.

| Opération | Portée requise |
| --- | --- |
| Lister ou consulter les agences et leurs données de référence | Une attribution `agency:read` applicable |
| Créer une agence | Permission globale `agency:create` |
| Modifier ou supprimer une agence | `agency:update` ou `agency:delete` pour cette agence précise |
| Créer, modifier ou supprimer des données de référence de l'agence | Permission correspondante pour cette agence précise |
| Créer un programme depuis l'onglet Programmes | `transfer_payment:create` pour cette agence précise |

Un dossier enfant absent et un dossier inaccessible produisent normalement la même réponse « introuvable ». Un identifiant ne peut donc pas révéler des données d'une autre agence.

## Liste et profil de l'agence

Utilisez la page Agences pour trouver une agence, ouvrir son profil ou, avec les permissions nécessaires, la créer, la modifier ou la supprimer. Vous pouvez rechercher du texte, filtrer par statut, parcourir les pages de résultats, choisir les colonnes et sélectionner des lignes. La recherche traite `%` et `_` comme des caractères ordinaires. Le sommaire compte toutes les agences et les agences actives que vous pouvez consulter.

Le formulaire d'agence contient :

| Champ | Règle |
| --- | --- |
| Organisation du plan comptable pangouvernemental (PCPG) | Recherche serveur obligatoire; la création exige l'accès global de création et la modification exige l'accès à l'agence précise |
| Identifiant du système financier | Identifiant entier positif obligatoire du système financier, stocké en PostgreSQL comme `bigint`; le garder sous forme de texte décimal pour éviter l’arrondissement d’un long identifiant |
| Noms français et anglais | Obligatoires, espaces périphériques retirés, maximum de 255 caractères Unicode chacun |
| Abréviations française et anglaise | Obligatoires, espaces périphériques retirés, maximum de 255 caractères Unicode chacune |
| Actif | Réglage de disponibilité activé ou désactivé; une nouvelle agence commence inactive |

L'onglet Général affiche ces valeurs. Une modification du profil remplace uniquement les champs soumis. La combinaison de l’identifiant du système financier, des deux noms et de l’indicateur actif doit être unique parmi les profils non supprimés. La comparaison des noms ignore la casse et les espaces périphériques.

## Navigation de la fiche

La fiche de l’agence comporte 24 onglets pouvant être liés directement : Général; États; Champs personnalisés; Modèles d’approbation; Configurations de flux de travail; Ensembles d’examens; Ensembles de recommandations; Collectes de données; Programmes; Catégories de coûts; Types de financement; Exercices financiers; Plan comptable; Types d’engagement; Types de comptes débiteurs; Modèles de documents; Bases de retenue; Types de surveillance; Types d’adresse; Types de pièces jointes; Sous-types de demandeur ou bénéficiaire; Approbation au nom d’autrui; Types d’entente; Extensions.

Les catalogues de configurations et de données financières appartiennent à l’agence. Créez une définition réutilisable ici, puis liez-la ou affectez-la à chaque volet applicable. Consultez [Catalogues d’agence et sélections des volets](./agency-catalogs.md) pour les permissions, l’ordre de configuration, la publication et le rétablissement.

Chaque onglet de données de référence offre la recherche littérale, le filtre de statut, la pagination et les totaux de l'agence. La recherche et le statut modifient les lignes affichées et le total paginé, tandis que le sommaire demeure celui de toute l'agence.

## Programmes

Programmes liste les profils de paiements de transfert appartenant à l'agence. Les utilisateurs autorisés peuvent créer directement un profil ou lancer l'assistant de programme; l'agence courante est imposée comme propriétaire. Si un autre utilisateur supprime l’agence pendant la création d’un programme, le serveur refuse cette création.

Les programmes contiennent des volets. Configurez les exercices financiers, les catégories de coûts et les autres valeurs de recherche nécessaires avant l'utilisation opérationnelle d'un programme.

## Données de référence de l'agence

| Onglet | Valeurs conservées et contraintes | Actions prises en charge | Utilisation principale |
| --- | --- | --- | --- |
| Catégories de coûts | Noms français et anglais obligatoires, chacun unique parmi les catégories actives de l'agence | Lister, créer, modifier, supprimer logiquement | Regroupement financier des programmes, ententes, réclamations, paiements et répartitions |
| Éléments de catégorie de coûts | Noms français et anglais obligatoires, chacun unique parmi les éléments actifs de sa catégorie | Lister, créer, modifier, supprimer logiquement | Classement détaillé des budgets et des dépenses |
| Exercices financiers | Libellé d'au plus 9 caractères, année de 1900 à 2100, dates de début et de fin, la fin ne précédant pas le début | Lister, créer, modifier, supprimer logiquement | Budgets, prévisions, engagements, paiements, réclamations et périodes de surveillance |
| Bases de retenue | Code obligatoire et noms français et anglais; le code actif est unique dans l'agence | Lister, créer, modifier, supprimer logiquement | Configuration des retenues d'une entente |
| Types d'adresse | Noms français et anglais obligatoires, chacun unique parmi les valeurs actives de l'agence | Lister, créer, modifier, supprimer logiquement | Classement des adresses des promoteurs et des ententes |
| Sous-types de demandeur ou bénéficiaire | Type de demandeur ou bénéficiaire, nom et description bilingues obligatoires; les noms sont uniques pour la combinaison agence/type active | Lister, créer, modifier, supprimer logiquement | Classement offert aux promoteurs dont l'agence responsable possède le sous-type |
| Approbation au nom d'autrui | Noms français et anglais obligatoires et indicateur `require actual`; les noms sont uniques parmi les valeurs actives de l'agence | Lister, créer, modifier, supprimer logiquement | Règles d'approbation déléguée et exigence des renseignements sur l'approbateur réel |
| Types d'entente | Valeur d'énumération du type d'entente et noms français et anglais obligatoires; les noms sont uniques pour la combinaison agence/type active | Lister, créer, modifier, supprimer logiquement | Classement des ententes créées pour l'agence |

Les noms des catégories de coûts, lignes de coûts, types d’approbation au nom d’autrui et états sont limités à 255 caractères Unicode, après retrait des espaces périphériques. Les noms de catégories, de lignes et de types d’approbation doivent rester uniques dans leur portée même si seule la casse ou les espaces périphériques diffèrent. Désactiver une catégorie ou une ligne ne libère pas son nom; suppression et disponibilité sont des réglages distincts.

Les références peuvent être modifiées en place. Utilisez **Modifier** pour corriger un libellé tout en conservant l’identifiant des dossiers existants; supprimez seulement pour retirer une valeur. Si vous modifiez une seule date de l’exercice, l’application la compare à l’autre date enregistrée. Par exemple, la nouvelle date de début ne peut pas suivre la date de fin enregistrée. Un doublon ou une sélection périmée laisse le formulaire disponible pour correction.

### Disponibilité et calculs par défaut

Les catégories de coûts et leurs éléments possèdent un indicateur **Actif** distinct de la suppression. Les liens du volet qui rendent les lignes de coûts disponibles ont aussi leur propre indicateur de disponibilité. Tous les niveaux requis doivent être disponibles pour une nouvelle sélection au budget d’une entente. Les références déjà enregistrées peuvent rester visibles sans être proposées pour du nouveau travail; ne les remplacez pas simplement parce qu’une recherche les omet.

Une ligne de coûts peut définir un calcul par défaut pour le budget d’entente :

| Mode | Configuration |
| --- | --- |
| Manuel | Saisir directement le montant soutenu. Aucune catégorie source, aucun pourcentage ni remplacement de pourcentage n’est permis. |
| Catégorie | Choisir une autre catégorie du même organisme contenant seulement des lignes manuelles; saisir un pourcentage de 0 à 100 avec au plus deux décimales. |
| Toutes les autres | Calculer un pourcentage des autres lignes admissibles; laisser la catégorie source vide. |

Une catégorie utilisée comme source ne peut pas recevoir de lignes calculées. Vous ne pouvez pas non plus la supprimer tant qu’une ligne conservée l’utilise comme source, même si cette ligne est inactive. Modifiez ou retirez d’abord le calcul dépendant; désactiver son indicateur Actif ne libère pas la référence. Une ligne ne peut dépendre de sa propre catégorie ni d’une catégorie d’un autre organisme. **Autoriser le remplacement du pourcentage** permet à l’utilisateur de l’entente de modifier le pourcentage par défaut capturé. Modifier la valeur de l’organisme ne réécrit pas les lignes d’entente existantes.

Par exemple, configurez « Avantages sociaux » à 10 % de la catégorie manuelle « Salaires », puis rendez la ligne disponible dans les éléments de catégorie de coûts du volet. Un salaire soutenu de 10 000,00 produit 1 000,00 d’avantages. Consultez [Budget](../agreements/budget.md) pour le regroupement, l’arrondissement au dollar, le calcul sur toutes les autres lignes et les contrôles transactionnels de capacité.

### Types de pièces jointes

Créez les classifications bilingues sélectionnées lors du téléversement de [pièces jointes](../concepts/attachments.md). Elles appartiennent à l’organisme, et non à un catalogue global d’administration commune. Créer, modifier ou supprimer exige la permission correspondante pour cet organisme précis. Les noms sont obligatoires dans les deux langues, limités à 255 caractères Unicode et ne peuvent contenir seulement des espaces. Les types retirés sont exclus des nouveaux choix; les métadonnées historiques restent liées au type enregistré.

### Types et sous-types de financement

Créez les types de financement sur l’agence, puis leurs sous-types. Les noms dans les deux langues sont obligatoires et limités à 255 caractères. Les types commencent actifs; **Inclus dans le cumul** et **Inclus dans le partage des coûts** sont désactivés par défaut. Modifier le nom d’un type de financement conserve ses réglages de cumul et de partage des coûts. Les sous-types commencent actifs et utilisent les réglages de cumul et de partage des coûts de leur type parent. Ces réglages déterminent le financement inclus dans ces calculs. Contributeur d’agence crée/modifie; Gestionnaire effectue une suppression admissible.

Ouvrez **Sous-types de financement** du volet et liez des sous-types actifs dont le parent actif appartient à la même agence. Supprimer un type ou sous-type est bloqué tant que des liens de volet actifs l’utilisent. Retirez d’abord ces liens; supprimer le type retire logiquement ses sous-types. Les preuves de financement déjà capturées gardent leur classification enregistrée. Corrigez un libellé en place plutôt que de recréer son identité. Consultez [Volets](../programs/streams.md).

### Types de comptes débiteurs et types de surveillance

Un compte débiteur consigne une somme à recouvrer. Créez les **Types de comptes débiteurs** avec noms bilingues obligatoires et descriptions bilingues facultatives, limitées chacune à 10 000 caractères. Choisissez exactement une source : **Lié à un paiement anticipé** ou **Lié à une réclamation**. Les deux activées ou désactivées sont invalides, même si vous ne modifiez qu’un de ces réglages. **Surveillance requise** est désactivé par défaut. Dès qu’un compte débiteur utilise le type, ces trois politiques sont figées et la suppression est bloquée, même pour des références historiques conservées; noms et descriptions restent modifiables.

Dans **Types de surveillance**, **Admissible aux comptes débiteurs** est désactivé par défaut. Activez-le pour les types dont les suivis peuvent exiger un compte débiteur. La désactivation est bloquée si un suivi l’exige ou possède déjà un compte débiteur lié. Ces permissions de configuration d’agence sont distinctes de l’affectation exacte à l’entente nécessaire pour travailler sur les dossiers produits.

### Exercices et admissibilité aux pièces de journal

L’indicateur **Admissible aux pièces de journal** est désactivé par défaut. Contributeur d’agence peut modifier les champs ordinaires; créer un exercice admissible ou changer cet indicateur exige Gestionnaire d’agence (`agency:delete`). Garder l’indicateur enregistré ne demande pas cette permission supplémentaire. Ouvrir l’exercice est un prérequis à l’émission; cela n’émet aucune pièce et ne donne aucun accès à l’entente.

### Plan comptable

Créez un plan d’agence avec exercice, devise et au moins une dimension comptable ordonnée obligatoires. Le genre est **Engagement** par défaut; **Compte débiteur** et **Note de crédit** sont des genres distincts. L’exercice, la devise et le genre ne peuvent plus être modifiés après la création. Une dimension comptable est une partie du code comptable, comme un fonds ou un compte. Corrigez les dimensions en place; créez un autre plan pour une autre année, devise ou utilisation.

Un plan de note de crédit peut lier un plan d’engagement seulement de la même agence, du même exercice et de la même devise. Les autres genres ne peuvent porter ce lien. L’admissibilité au volet vérifie aussi la devise commune du budget et du plan. Si le sélecteur est vide, configurez le budget de programme et de volet correspondant, puis rechargez plutôt que de choisir une autre devise.

## États opérationnels

Les états opérationnels indiquent où se trouve un dossier dans votre processus, par exemple « En examen » ou « Fermé ». Chaque agence possède sa liste d’états. Une nouvelle agence reçoit un état Ébauche protégé. L’onglet États affiche les définitions actives et supprimées avec leur badge localisé, leur couleur, leur icône Lucide et leur classe de cycle de vie : normale, lecture seule ou terminale.

L’accès de modification de l’agence permet de créer un état normal et de changer sa présentation bilingue. Définir les indicateurs lecture seule ou terminal, supprimer ou restaurer exige l’accès de suppression de l’agence. L’état Ébauche ne peut être modifié, supprimé ni restauré. Un état devenu terminal ne peut plus redevenir normal ou en lecture seule. Les noms sont obligatoires dans les deux langues, la couleur doit être une valeur hexadécimale de six chiffres, l’icône doit être un identifiant Lucide autorisé et les noms actifs sont uniques sans égard à la casse dans l’agence.

La suppression est refusée tant que des dossiers opérationnels, une configuration ou publication de flux de travaux, ou une intégration hôte enregistrée référence l’état. Ne restaurez qu’après avoir résolu tout conflit de nom actif. Les états en lecture seule et terminaux empêchent les changements visés par ces états. Terminal désigne un état final qui ne peut plus redevenir normal ou en lecture seule. Ces libellés opérationnels sont distincts des états servant à publier les configurations et à exécuter les flux.

### Transitions de rapprochement des réclamations

L’onglet États configure aussi deux transitions facultatives de la réclamation. L’état de **début** est appliqué lorsque le rapprochement commence; il doit être normal, sans lecture seule et non terminal, dans cet organisme. L’état **final** est appliqué lorsqu’un rapprochement final atteint une issue positive d’achèvement; il doit être terminal et appartenir au même organisme. Une sélection vide désactive la transition correspondante.

Par exemple, choisissez « En rapprochement » au début et « Réclamation fermée » à la fin. Un rapprochement final inachevé ou refusé ne ferme pas la réclamation simplement parce que son indicateur final est coché. Enregistrer cette configuration exige l’accès de modification de l’organisme. Cela n’accorde aucun droit sur une réclamation et ne réécrit pas le travail déjà achevé.

## Cycle de vie, concurrence et suppression

Supprimer une agence ou une de ses références la retire (`_deleted = true`) sans l’effacer de la base. Elle disparaît des choix actifs, mais les dossiers existants gardent leurs liens enregistrés. C’est une suppression logique.

Avant d’enregistrer un changement sensible, le serveur vérifie vos permissions actuelles et l’agence propriétaire du dossier. Il protège ces vérifications et l’enregistrement comme une seule opération. Si un autre utilisateur change vos permissions ou supprime l’agence en même temps, votre enregistrement peut être refusé. Consulter ou modifier les dossiers d’une agence exige aussi que celle-ci reste active.

Supprimer une agence exige la permission de suppression pour cette agence et une nouvelle vérification de ses rôles et permissions actuels. Elle est bloquée lorsque l'état d'une extension empêche la suppression. Une suppression réussie retire aussi les rôles de l'agence, leurs permissions, les attributions de portée de programme et les attributions de rôles aux utilisateurs qui pourraient autrement maintenir un accès. Les autres dossiers enfants historiques ne sont pas supprimés physiquement; ils deviennent indisponibles par les chemins d'agence active.

## Extensions

L'onglet Extensions présente les extensions enregistrées et leur état d'activation pour l'agence. Seules les extensions activées pour l'agence peuvent être configurées à la portée d'un volet. La désactivation dans l'agence désactive l'extension pour tous ses volets. La disponibilité, l'autorisation, la configuration, le stockage et les migrations demeurent régis par le cycle de vie des extensions de l'hôte.

## Ordre de configuration

Pour une nouvelle agence, l'ordre de dépendance pratique est le suivant :

1. Remplir le profil Général.
2. Ajouter les exercices financiers.
3. Ajouter les catégories de coûts et leurs éléments.
4. Ajouter les bases de retenue, types d'adresse, sous-types de demandeur ou bénéficiaire, types d'approbation au nom d'autrui et types d'entente nécessaires au processus.
5. Activer les extensions requises à la portée de l'agence.
6. Créer les programmes.
7. Créer et publier les définitions d’agence pour les examens, recommandations, approbations, flux, documents et champs personnalisés.
8. Ajouter les volets et leur affecter les entrées des catalogues d’agence nécessaires, puis terminer leur configuration.

## Échecs et reprise

- Une valeur active en double produit un message de conflit localisé; modifiez le champ en conflit ou retirez la valeur existante.
- Une plage de dates, une année ou un identifiant invalide, ou encore un champ bilingue absent, produit des erreurs de validation localisées au champ.
- Une agence ou une ressource enfant absente ou inaccessible est signalée comme introuvable; vérifiez l'identifiant et la portée précise de l'utilisateur.
- Un changement simultané de l'autorisation ou du cycle de vie peut refuser une soumission autrement valide; rechargez la page avant de réessayer.
- Si l'élément PCPG sélectionné ne peut pas être rechargé, confirmez qu'il existe toujours et que la permission courante de création ou de modification autorise cette recherche.
- Les boutons d'enregistrement demeurent désactivés pendant une requête. Après une erreur d'API, la fenêtre reste disponible afin de corriger et de soumettre de nouveau les valeurs.

![Onglet Programmes d'une agence](/screenshots/fr/agency-program-setup.png)

_Capture réelle de l'environnement de développement avec données de démonstration. Les dossiers affichés sont des exemples seulement et ne sont pas créés dans une nouvelle installation._
