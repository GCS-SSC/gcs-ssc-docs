# Champs personnalisés des ententes

Les champs personnalisés recueillent les renseignements d’entente que les champs standards ne couvrent pas, comme une référence locale de projet ou un mode de réalisation. Créez les définitions de champs et options réutilisables dans **Champs personnalisés** de l’agence. L’onglet **Champs personnalisés** d’un volet affecte ces champs d’agence aux sections d’entente et contrôle l’ordre, le caractère obligatoire et l’état actif de chaque affectation. Les agents saisissent les valeurs dans l’onglet Général de l’entente. Les champs de sélection peuvent déterminer les étapes d’un flux publié.

## Accès et ordre de configuration

Le rôle Lecteur de l’agence permet de consulter les définitions; Contributeur permet de les créer ou de les modifier; Gestionnaire est nécessaire pour une suppression autorisée. L’affectation au volet et les changements de section exigent Contributeur pour `transfer_payment` dans le programme; retirer une affectation admissible exige Gestionnaire. La modification des valeurs exige toujours le rôle Contributeur et une affectation à l’entente précise, si son état permet la modification.

1. Ouvrez **Agences**, choisissez l’agence et créez les champs bilingues et leurs options dans **Champs personnalisés**. Choisissez texte, nombre ou sélection; préparez les options avant l’usage opérationnel.
2. Ouvrez **Champs personnalisés** du volet d’un programme. Créez les sections bilingues du volet, puis ajoutez les champs d’agence. Réglez la section, l’ordre, le caractère obligatoire et l’état actif propres au volet.
3. Ouvrez une entente du volet et vérifiez les libellés, l’ordre et les champs obligatoires dans les deux langues.
4. Pour l’acheminement, configurez les conditions du flux d’agence après la création des options; liez le flux publié au volet et vérifiez chaque parcours.

Les identifiants de champ et d’option d’agence sont partagés entre les volets; la section et le caractère obligatoire appartiennent à chaque volet. Un champ d’agence peut être placé différemment dans deux volets. La recherche couvre les libellés bilingues et catégories d’options. Consultez [Catalogues d’agence](../admin/agency-catalogs.md).

## Définition des champs

| Paramètre | Règle et conséquence |
| --- | --- |
| Section | Emplacement appartenant au volet; déplacer un champ d’agence affecté vers une autre section du même volet conserve son identifiant et ses valeurs. |
| Noms anglais et français | Deux libellés non vides obligatoires. Les valeurs saisies ne sont pas traduites automatiquement. |
| Type | Texte, nombre ou sélection. Le type est immuable après la création. |
| Présentation du texte | Une ligne ou multiligne. Une ligne interdit les sauts de ligne; multiligne conserve la mise en forme. |
| Sélections multiples | Réservées aux champs de sélection. Une sélection unique peut devenir multiple; l’inverse est ensuite interdit. |
| Obligatoire | Réglé sur l’affectation au volet. Les champs actifs obligatoires doivent être remplis lors de la création ou de l’enregistrement de modifications des champs personnalisés. Zéro est une valeur numérique valide. |
| Utiliser dans les conditions de flux de travail | Réservé aux champs de sélection; permet aux options sélectionnées de déterminer les étapes du flux qui s’appliquent. |
| Actif | Un champ actif accepte de nouvelles valeurs. Un champ inactif renseigné reste visible; sa valeur peut être conservée ou effacée, mais pas remplacée. |
| Ordre d’affichage | Entier de 0 à 2 147 483 647; valeur initiale 0. Les identifiants départagent les ordres égaux. |

Les sections apparaissent après les sections intégrées de l’entente, à partir du numéro 04. Leur ordre ne modifie pas la disposition du profil principal. Les noms de section et de champ sont bilingues; une réponse textuelle est un texte commun aux deux langues et une réponse numérique est un nombre fini. Les champs numériques ne sont pas des champs monétaires exacts : utilisez le Budget pour les montants financiers.

## Options et catégories de sélection

Chaque option exige un libellé anglais et français. Les catégories sont facultatives, mais fournissez les deux libellés ou aucun. Elles regroupent les options dans l’éditeur et le sélecteur; elles ne constituent pas des valeurs distinctes d’entente. Les options possèdent leur propre indicateur actif et ordre d’affichage. L’ajout depuis une ligne de catégorie reprend cette catégorie dans le formulaire.

Une entente peut conserver une option inactive déjà sélectionnée. Les nouvelles sélections doivent être actives et appartenir au champ. Une sélection multiple ne peut pas contenir deux fois la même option. Réactiver une option permet de la sélectionner à nouveau, sous réserve de l’état actif du champ.

## Exemple de configuration

Supposons qu’un programme ait besoin de renseignements sur la réalisation et de parcours d’examen différents pour la réalisation directe et les partenaires. La configuration suivante est illustrative; elle n’est pas créée automatiquement en production.

| Section | Champ | Configuration | Exemple de valeur |
| --- | --- | --- | --- |
| Project delivery / Réalisation du projet | Delivery model / Mode de réalisation | Sélection unique obligatoire; utilisée dans les conditions de flux de travail | Direct delivery / Réalisation directe |
| Project delivery / Réalisation du projet | Delivery notes / Notes sur la réalisation | Texte multiligne facultatif | Courte explication des responsabilités et des jalons prévus |
| Project references / Références du projet | Local reference / Référence locale | Texte facultatif sur une ligne | `PROJECT-2026-014` |
| Project references / Références du projet | Planned participants / Participants prévus | Nombre facultatif | `0`, lorsque la participation n’est pas encore établie |

Ajoutez **Direct delivery / Réalisation directe** et **Partner delivery / Réalisation par un partenaire** comme options du Mode de réalisation. Utilisez l’option appropriée dans les conditions des membres du flux. Gardez inconditionnelle toute étape d’approbation nécessaire à chaque entente; vérifiez la validité de chaque parcours avant de publier.

## Saisir et effacer les valeurs d’entente

À la création, remplissez tous les champs actifs obligatoires. Les anciennes ententes ne sont pas remplies automatiquement lorsqu’un champ devient obligatoire. Une modification de profil sans rapport peut être enregistrée sans transmettre les champs personnalisés; dès qu’ils sont transmis, le serveur vérifie les valeurs existantes et les modifications ensemble pour s’assurer que tous les champs actifs obligatoires sont remplis.

L’action **Effacer la valeur**, lorsqu’elle est disponible, modifie seulement le brouillon local. Enregistrez l’entente pour conserver ce changement. Effacer un champ actif obligatoire est refusé. Un responsable autorisé peut effacer un champ inactif renseigné, même s’il était auparavant obligatoire. Une entente en lecture seule ne permet pas d’effacer une valeur.

Les mises à jour partielles de l’API conservent les clés omises. Exemple avec des identifiants fictifs de champs et d’options :

```json
{
  "egcs_fc_customfields": {
    "101": ["201"],
    "102": "Réalisation par deux bureaux régionaux.\nDes rapports trimestriels sont prévus.",
    "103": null,
    "104": 0
  }
}
```

Cette requête sélectionne l’option `201` du champ `101`, enregistre le texte multiligne de `102`, efface `103` et conserve zéro dans `104`. Les sélections sont stockées en tableaux d’identifiants d’options, même pour une sélection unique. Les identifiants doivent provenir des définitions du volet; les libellés ne les remplacent pas. `null`, un texte vide et un tableau de sélection vide retirent la clé correspondante. Les champs omis conservent leur valeur. L’autorisation, les verrous et les règles obligatoires s’appliquent aussi aux appels directs.

## Acheminement conditionnel des flux

Un membre peut avoir une condition par champ et plusieurs options permises par condition. Les options d’un champ se combinent par **OU**; les différents champs par **ET**. Une sélection multiple correspond si au moins une option sélectionnée est permise. Sans condition, l’étape est inconditionnelle.

Par exemple, un membre exigeant Mode de réalisation = Réalisation par un partenaire **et** Région = Nord ou Est ne s’exécute que si les deux conditions correspondent. Sélectionner Nord et Sud satisfait la condition Région grâce à Nord; cela ne contourne pas celle du Mode de réalisation.

Au démarrage, le flux conserve les réponses de l’entente utilisées dans les conditions, leurs libellés bilingues et les étapes qui s’appliquent. Le parcours doit contenir du travail et comprendre les étapes obligatoires d’approbation et d’évaluation du risque, ainsi qu’une fin réussie valide. Une réponse absente ou invalide utilisée dans les conditions peut bloquer le démarrage plutôt qu’omettre silencieusement du travail essentiel. Les étapes exclues affichent **Ignoré — conditions non remplies** et ne créent aucune tâche d’exécution.

Modifier ensuite l’entente ne réoriente pas une tentative existante. Une nouvelle tentative conserve les versions publiées initiales, mais enregistre à nouveau les valeurs actuelles de l’entente. Les dossiers d’approbation conservent les valeurs et les libellés des champs et des sections enregistrés au démarrage. Leur affichage historique utilise ces renseignements conservés, plutôt que les libellés actuels.

## Modifier ou retirer des définitions

Pour supprimer une section, déplacez ou supprimez d’abord tous ses champs non supprimés. La suppression d’un champ ou d’une option est refusée si des valeurs d’entente ou références de flux l’utilisent encore; les références de publications historiques et les valeurs conservées sur des ententes supprimées comptent aussi. La désactivation et le retrait de l’utilisation dans les conditions de flux sont bloqués par les références des flux de travail courants ou publiés. Ne supprimez pas l’historique et ne recréez pas d’identifiants pour contourner ces protections.

Avant de retirer un champ d’acheminement, examinez les définitions et publications courantes. Créez un nouveau champ pour changer de type de données. Désactivez les choix désuets lorsque cela est permis afin de préserver l’intelligibilité des valeurs historiques, et publiez un parcours de remplacement vérifié avant son utilisation.

## Échecs et reprise

| Symptôme | Vérification |
| --- | --- |
| Erreur de champ obligatoire sur une ancienne entente | Une définition obligatoire a pu être ajoutée après sa création. Remplissez les champs actifs manquants avant d’enregistrer les champs personnalisés. |
| Impossible de remplacer une valeur inactive | Conservez-la ou effacez-la; utilisez un champ ou une option actifs pour de nouveaux renseignements. |
| Impossible de supprimer une section | Déplacez ou supprimez d’abord ses champs restants. |
| Champ ou option utilisés | Examinez les valeurs d’entente et les références de flux courants, publiés et historiques. La suppression et la désactivation ont des règles différentes. |
| Démarrage ou nouvelle tentative refusés | Vérifiez les réponses utilisées dans les conditions et la présence des approbations obligatoires, de l’évaluation du risque et d’une fin valide. |
| Échec après changement de permissions ou d’état | Rechargez l’entente ou le volet et vérifiez les permissions et le cycle de vie actuels; le serveur les revérifie sous verrou. |
