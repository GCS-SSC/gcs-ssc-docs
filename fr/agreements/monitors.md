# Surveillance des ententes

Utilisez **Surveillances** pour planifier et consigner une visite sur place, un examen de dossier ou un autre exercice de surveillance. Consignez ce que vous avez vérifié, vos constatations et les mesures qui restent à prendre. Ouvrez **Ententes**, sélectionnez une entente, choisissez **Surveillances**, puis sélectionnez le type pour ouvrir son espace de travail.

Par exemple, pour une visite sur place, ajoutez un objectif de vérification des activités du projet, un Élément pour les dates de visite, une Constatation pour les registres de présence manquants et un Suivi demandant au bénéficiaire de les fournir avant une date d'échéance.

## Avant de créer une surveillance

L'entente doit déjà être rattachée à un volet de paiement de transfert et à une agence. Les administrateurs doivent configurer les données de référence suivantes :

| Dépendance | Portée appliquée |
| --- | --- |
| Type de surveillance | Type disponible dans le volet actuel de l'entente, lié à un type de surveillance de l'organisme. |
| Exercice provisoire | Exercice non supprimé appartenant à l'agence de l'entente. |
| Modèle d'approbation de surveillance | Modèle publié facultatif utilisé par le flux de soumission d'approbation `fundingcasemonitor` du volet. |
| Configuration de flux de travail | Soumission d'approbation facultative à l'achèvement; les flux standard exigent une sélection explicite. |

L'accès Lecteur permet de consulter les surveillances. Pour en créer une, vous devez avoir l'accès Contributeur et être affecté à cette entente; vous devenez son utilisateur affecté principal. Pour y travailler ensuite, vous devez être affecté à la surveillance elle-même et avoir l'accès Contributeur ou Gestionnaire requis pour l'opération. Le système vérifie l'accès nécessaire au chargement des choix du formulaire et à l'enregistrement.

## Créer et gérer l'en-tête

La liste affiche le type, l'exercice, le trimestre provisoire, l'indicateur sur place, le statut et les actions. La recherche porte sur les deux langues du type, le libellé de l'exercice, le trimestre et la valeur Oui/Non localisée.

| Champ | Règle |
| --- | --- |
| Type | Obligatoire. Choisissez un type du volet de l'entente. Le système le vérifie aussi à l'enregistrement. Le volet utilise les noms bilingues du type de surveillance de l'organisme auquel il est lié. |
| Exercice provisoire | Obligatoire. Choisissez un exercice de l'organisme de l'entente. Le libellé de l'exercice est identique en français et en anglais. |
| Trimestre provisoire | Numéro de trimestre obligatoire de 1 à 4. |
| Sur place | Indiquez si le travail de surveillance se déroule sur place. |

Une nouvelle surveillance reçoit le statut Brouillon de l'organisme. Ouvrez-la pour utiliser Planification, Éléments, Constatations, Suivis, Pratiques prometteuses et Flux de travail. Votre programme peut aussi offrir des onglets d'extension. Tant que la surveillance est modifiable, les quatre champs d'en-tête peuvent être changés.

Modifier l'en-tête ou ses dossiers liés ne change pas le statut métier. Son libellé ne mesure pas la quantité de travail de planification ou de surveillance saisie.

## Consigner le travail de surveillance

Ajoutez ou modifiez les dossiers de surveillance tant que la surveillance est modifiable et que vous avez la permission et l'affectation requises. Son état, son achèvement ou un flux actif protégé peuvent empêcher les changements. Le système vérifie l'accès et confirme que chaque dossier appartient à cette surveillance à l'enregistrement.

| Espace | Contenu obligatoire et comportement |
| --- | --- |
| Planification | Saisissez un objectif par dossier de planification. Les objectifs ne doivent pas être uniques. Vous pouvez achever une surveillance sans dossier de planification. |
| Éléments | Nom (maximum de 255 caractères), détail, dates de début et de fin prévues, indicateur de surveillance et dates réelles facultatives. La fin prévue ne peut précéder le début prévu. Lorsque **Surveillé** est vrai, les deux dates réelles sont obligatoires; lorsqu'elles existent toutes deux, la fin réelle ne peut précéder le début réel. |
| Constatations | Nom (maximum de 255 caractères), type d'action, partie responsable et détail. Les types d'action sont `amendment`, `mandatoryaction`, `suggestedaction` et `none`. |
| Suivis | Nom (maximum de 255 caractères), partie responsable et date d'échéance. La création enregistre toujours le statut `open`; le formulaire de suivi ne permet pas de modifier directement ce statut. |
| Mises à jour de suivi | Texte, statut et date de mise à jour. Le statut est `open`, `onhold`, `completed`, `cancelled` ou `unabletocomplete`. La visionneuse des mises à jour permet l'ajout, la modification et la suppression lorsque l'utilisateur est autorisé. |
| Pratiques prometteuses | Décrivez chaque pratique dans un dossier distinct. |

Vous pouvez effacer une date réelle lorsque l'élément n'est pas marqué **Surveillé**. Si vous changez une seule date, l'application la vérifie par rapport à l'autre date enregistrée. Pour retirer les deux dates réelles, désactivez **Surveillé** et effacez les deux dates ensemble.

Pour les constatations et les suivis, choisissez le demandeur ou bénéficiaire, l'organisation, ou les deux comme partie responsable. Saisissez le texte de surveillance dans la langue souhaitée. Le système ne crée pas de traduction. Le texte obligatoire ne peut pas contenir seulement des espaces. Le système retire les espaces au début et à la fin et rejette les caractères non valides. Si un texte collé échoue à la validation, retirez le caractère non valide ou saisissez de nouveau le texte, puis enregistrez.

### Statut et historique d'un suivi

Le statut du suivi provient de la mise à jour ajoutée le plus récemment et non supprimée. La date saisie ne détermine pas quelle mise à jour est la plus récente. Modifier ou supprimer une mise à jour recalcule ce statut; supprimer toutes les mises à jour le ramène à `open`. Modifier le formulaire Suivi lui-même ne change pas le statut.

Par exemple, vous ajoutez aujourd'hui une mise à jour `completed` datée de la semaine dernière. Elle devient quand même le statut courant du suivi. Si vous la supprimez, la mise à jour précédente restante détermine de nouveau le statut.

## Achever une surveillance

Utilisez **Achèvement** dans **Flux de travail** tant que la surveillance est modifiable. Vous devez avoir l'accès Contributeur et être affecté à cette surveillance. Vous pouvez l'achever une seule fois. Aucun flux ne doit être actif et au moins un élément non supprimé doit exister. L'achèvement n'exige pas d'objectifs, de constatations, de suivis résolus ou de pratiques prometteuses. Les éléments peuvent rester non surveillés, sans dates réelles.

L'achèvement consigne la personne qui termine la surveillance et ses commentaires. Il démarre le flux de soumission d'approbation configuré, ou consigne l'achèvement sans flux si aucun n'est configuré. Si le flux sélectionné requis ne peut démarrer, l'achèvement n'est pas enregistré. Les modifications ordinaires de la surveillance et de ses dossiers liés cessent après l'achèvement. Celui-ci ne lui attribue pas automatiquement un état métier nommé `complete`.

Par exemple, un élément non surveillé avec des dates prévues valides satisfait la présence requise, mais l'achèvement ne prouve pas que la visite a eu lieu. Appliquez les exigences d'examen avant cette action irréversible. Des suivis ouverts peuvent encore bloquer la clôture de l'entente même si Achèvement n'exigeait pas leur résolution.

## Limite entre approbation et flux de travail

Si votre programme exige l'approbation des surveillances, demandez à votre administrateur de configurer un flux de soumission d'approbation `fundingcasemonitor` publié avec ses étapes d'examen, de recommandation ou d'approbation. L'achèvement le démarre et affiche ces étapes dans la section Flux partagée. Un modèle d'approbation sans ce flux ne rend pas l'approbation obligatoire.

Démarrez séparément un flux standard lorsque l'état de la surveillance le permet; l'achèvement n'en démarre pas automatiquement. Les issues du flux changent l'état métier selon la configuration publiée. Si un responsable affecté indisponible bloque le travail, ou si celui-ci échoue ou est annulé, utilisez les commandes permises de remplacement, de reprise ou d'annulation. Consultez [Flux de travail](../concepts/workflows.md) et [Approbations et achèvements](../concepts/approvals-completions.md).

## Supprimer et récupérer prudemment

Supprimer un dossier le masque dans l'utilisation normale et le conserve dans le système. Supprimer un suivi supprime aussi ses mises à jour. Supprimer une surveillance modifiable retire ensemble ses objectifs, éléments, constatations, pratiques prometteuses, suivis et mises à jour. Vérifiez que vous voulez retirer tout l'exercice avant de supprimer la surveillance.

La suppression est impossible si le statut métier, l'achèvement ou des travaux protégés de flux, d'examen ou d'approbation verrouillent la surveillance. Confirmez la surveillance exacte avant de la supprimer; l'interface principale n'offre aucune restauration. En cas d'échec, aucun message de réussite n'est affiché et la fenêtre demeure ouverte pour correction. Après un résultat réseau incertain, actualisez avant de réessayer, car le système pourrait déjà avoir enregistré votre changement.

## Résumé du contrat d'API

Cette section sert aux intégrations et au soutien. Les agents utilisent normalement les onglets décrits ci-dessus.

| Groupe de routes | Contrat |
| --- | --- |
| `GET /api/agreements/{id}/monitors-overview` | Liste autorisée avec noms de type bilingues et libellé d'exercice. |
| `POST /api/agreements/{id}/monitors` | Création `draft` validée avec autorisation renouvelée. |
| `GET/PATCH/DELETE /api/agreements/{id}/monitors/{monitorId}` | Lire la surveillance et ses dossiers liés, modifier un en-tête déverrouillé ou supprimer ensemble la surveillance et ses dossiers liés. |
| `GET /api/agreements/{id}/monitors/lookups/*` | Types de surveillance du volet ou exercices de l'agence, paginés et interrogeables; l'autorisation suit `permission_action`. |
| `/monitor-planning`, `/monitor-items`, `/monitor-findings`, `/monitor-followups`, `/monitor-followup-updates`, `/monitor-promising-practices` | Chaque groupe offre POST ainsi que PATCH et DELETE par identifiant de sous-dossier; aucune route GET distincte n'est nécessaire puisque la réponse de détail de la surveillance fournit toutes les lignes. |

Les erreurs de validation utilisent la langue de la requête et la réponse normalisée `VALIDATION_FAILED`. Une surveillance ou un sous-dossier absent ou rattaché à une autre entente est rejeté; l'autorisation n'est jamais déduite d'un identifiant fourni dans le corps de la requête.

## Suivis exigeant une créance

Un suivi peut porter **Créance requise** seulement si son type de surveillance d'organisme est admissible aux créances. Cet indicateur est distinct de la partie responsable et du statut. Un type de créance exigeant la surveillance peut sélectionner les suivis admissibles de la même entente; son lien enregistré devient une preuve financière.

Un suivi exigeant une créance ne peut devenir `completed` avant qu'une **créance initiale comptabilisée** non supprimée y soit liée. Un brouillon, une créance refusée ou un ajustement lié seul ne satisfait pas cette condition. Créer ou modifier une mise à jour, retirer une mise à jour changeant le statut dérivé ou modifier l'exigence revérifie ce contrôle. Si `AR_MONITOR_RECEIVABLE_REQUIRED` apparaît, le système n'a pas enregistré le changement. Terminez l'approbation de la bonne créance liée et confirmez sa comptabilisation avant de réessayer la mise à jour du suivi.

Par exemple, consignez une constatation de recouvrement et un suivi exigeant une créance. Créez la créance avec ce suivi, terminez son approbation indépendante et confirmez sa comptabilisation. Consignez seulement ensuite la mise à jour de suivi achevé. Cela termine la preuve de surveillance sans prouver que la dette en suspens a été recouvrée.

Changer la surveillance vers un type inadmissible est refusé si des suivis exigeant une créance ou des liens de créance conservés en dépendent. Supprimer ou déplacer des preuves référencées financièrement peut aussi être refusé. Conservez le lien historique. Réglez le dossier financier lié au moyen de ses actions permises avant de réessayer la clôture. Consultez [Créances](./receivables.md).
