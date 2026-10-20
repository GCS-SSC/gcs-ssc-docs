# Dossiers de financement

Un dossier de financement regroupe le travail du personnel pour une demande. Il relie la possibilité de financement au promoteur, l'organisation qui demande du financement. Utilisez-le pour lire la demande, conserver les pièces jointes, affecter les agents et évaluer la demande.

Ouvrez **Dossiers de financement**, ou la section **Demandes** d'une possibilité. L'identifiant de demande est l'identifiant interne du dossier dans GCS-SSC. Les demandes importées ont aussi une référence externe distincte.

## Accès et propriété

Les dossiers d'une agence supprimée sont exclus de la liste. Une ligne absente ne justifie pas de créer un autre dossier; vérifiez d'abord l'agence propriétaire et vos accès actuels.

Vous pouvez consulter un dossier sans avoir le droit d'y travailler. Pour l'évaluer, il faut le rôle approprié dans le programme et votre nom au registre d'affectations de ce dossier. Si vous ne pouvez pas modifier la demande ou démarrer un examen, demandez au coordonnateur des affectations de vérifier les deux. Une action peut rester visible parce que votre rôle la permet. La sélectionner peut toutefois afficher un avertissement si vous n'êtes pas affecté ou si le dossier est verrouillé.

Votre rôle Dossier de financement s'applique dans le programme de la possibilité. Lecteur permet de consulter et Contributeur de créer. Pour modifier le dossier, gérer ses pièces jointes, changer son statut ou démarrer des examens ou des flux, il faut un accès Contributeur et une affectation à ce dossier. La suppression exige un accès Gestionnaire et la même affectation. Une affectation à un autre dossier ne permet pas de travailler sur ce dossier.

Le coordonnateur doit avoir la permission distincte **Gérer les affectations** des dossiers de financement pour gérer les utilisateurs et le groupe d'agence responsable. Cette permission seule ne lui permet pas de lire ou modifier la demande et ne l'affecte pas au dossier. Une personne affectée à une approbation peut accomplir cette approbation sans être affectée au travail ordinaire du dossier. Lorsqu'un dossier a un statut final ou est achevé, ses utilisateurs affectés et son travail ordinaire ne peuvent plus être modifiés.

## Créer un dossier manuel

1. Choisissez **Ajouter un dossier de demande** dans la liste, ou **Ajouter une demande** dans la section **Demandes** d'une possibilité.
2. Sélectionnez une possibilité ouverte. Son statut d'agence doit être modifiable, autre que Brouillon et autre qu'un statut final; la date courante doit être comprise entre les dates inclusives d'ouverture et de fermeture.
3. Sélectionnez un promoteur que vous pouvez consulter. Le serveur vérifie cet accès indépendamment de la possibilité.
4. Sélectionnez facultativement les fichiers avant l'enregistrement si le formulaire de création permet le téléversement. Chaque fichier exige son type, ses noms et ses descriptions français et anglais. Vérifiez-les avant d'enregistrer.
5. Enregistrez. GCS-SSC crée le dossier au statut Brouillon de l'agence, conserve un contenu de demande vide et vous affecte comme utilisateur principal de ce dossier. GCS-SSC génère l'identifiant de demande. La création manuelle ne permet pas de saisir un identifiant externe ni des réponses soumises.

Annuler avant d'enregistrer ne crée aucun dossier. Pendant l'enregistrement, vous ne pouvez ni modifier le formulaire ni fermer la fenêtre. Changer la possibilité efface les fichiers préparés et recharge les types. Le téléversement dans le formulaire de création exige un stockage d'agence configuré qui ne demande aucun renseignement supplémentaire sur les fichiers; sinon, créez le dossier puis utilisez **Pièces jointes** avec le formulaire complet du fournisseur.

Le dossier est enregistré avant le téléversement des fichiers préparés. Si un fichier échoue, le dossier reste. Ouvrez **Pièces jointes**, vérifiez les fichiers réussis et téléversez seulement ceux qui manquent; recréer le dossier n'est pas une reprise appropriée.

## Lire et évaluer la demande

**Détails** présente l'identifiant de demande, la référence externe éventuelle, le lien vers la possibilité et le promoteur. **Demande** affiche les preuves enregistrées en lecture seule. Pour une demande importée, elle présente la copie originale soumise, qui ne peut être modifiée. En l'absence de cette copie, elle présente les renseignements de demande conservés dans GCS-SSC. Un dossier manuel vide affiche un état d'attente.

Les formulaires suivent l'ordre enregistré. Les libellés et choix utilisent le contenu bilingue enregistré; les réponses gardent leur langue d'origine. Les questions sautées sont omises, les formulaires facultatifs sans réponses restent identifiables, et les répétitions imbriquées, choix, tableaux, montants et activités restent lisibles. La vue ne charge pas le dernier formulaire, ne réévalue pas les conditions et ne recalcule pas les totaux. Si les preuves enregistrées ne suivent pas un format de formulaire pris en charge, la vue présente leurs champs et valeurs de façon structurée. Vous ne pouvez pas modifier les réponses dans cette vue.

Utilisez les sections suivantes pour l'évaluation et le suivi :

- **Examens** démarre les ensembles admissibles sélectionnés sur la possibilité.
- **Flux** démarre les flux ordinaires.
- **Renseignements supplémentaires** affiche les renseignements additionnels recueillis par les flux.
- **Soumission pour approbation** exécute le flux de soumission du dossier pour approbation.

Chaque démarrage revérifie les choix courants et la publication. Les examens et flux déjà démarrés conservent les versions choisies au démarrage, même si un administrateur modifie ensuite les liens de configuration. Consultez [Examens](../concepts/runtime-reviews.md) et [Flux](../concepts/workflows.md) pour l'exécution, l'achèvement, l'annulation et la reprise. Créer ou approuver un dossier ne crée pas automatiquement une décision d'évaluation ou une entente.

## Réclamer le travail de groupe et gérer les affectations

Les imports du Portail commencent avec un groupe en attente de l'agence propriétaire, sans utilisateur affecté. Les membres ayant un accès Lecteur Dossier de financement dans le programme voient le travail disponible dans la file des groupes administratifs de l'Accueil. Pour **Réclamer** un dossier, vous devez être membre actif du groupe, avoir un accès Contributeur dans le programme et être admissible à l'affectation. Le dossier doit être déverrouillé. Réclamer vous affecte à ce dossier et vous inscrit comme la personne qui a réclamé le travail du groupe. L'appartenance seule ne permet pas de modifier.

Un coordonnateur peut utiliser **Affectations** pour ajouter des utilisateurs admissibles, choisir un autre groupe admissible de l'agence ou retirer le groupe après l'affectation d'au moins un utilisateur. Changer ou retirer le groupe efface l'indication de la personne qui a réclamé son travail, tout en conservant les affectations utilisateur existantes. Un dossier attendant qu'un membre du groupe le réclame peut n'avoir aucun utilisateur affecté; dès que des utilisateurs sont affectés, un utilisateur actif doit être le principal. Conservez un principal lors d'un retrait. Une deuxième réclamation après celle d'un autre utilisateur retourne un conflit; rechargez et demandez une affectation au coordonnateur pour travailler ensemble. Un groupe référencé par un dossier actif ne peut être supprimé.

Avant d'afficher la confirmation de suppression, GCS-SSC recharge le dossier et votre affectation. Si vous n'êtes plus affecté ou si le dossier est verrouillé, il affiche plutôt un avertissement.

La suppression est aussi bloquée dès qu'un travail d'examen ou de flux a été enregistré (`FUNDING_CASE_INTAKE_HAS_RUNTIME`), y compris du travail achevé conservé. Annuler un flux n'efface pas cet historique. Conservez le dossier et utilisez son cycle configuré plutôt que de recréer ou supprimer les preuves d'évaluation.

## Exemple et reprise

Pendant l'appel d'octobre pour les installations, un agent crée un dossier manuel pour l'Association communautaire Riverside, un promoteur qu'il peut consulter. L'identifiant de demande généré identifie le dossier du personnel. Ouvrir **Demande** affiche un état d'attente, car la création manuelle n'a fourni aucune réponse soumise. Avec les accès appropriés, des fichiers justificatifs peuvent néanmoins être ajoutés sous **Pièces jointes**. Pour un import, trouvez le dossier en file, réclamez-le, lisez ses formulaires enregistrés et démarrez l'ensemble d'examens de la possibilité. Achever cet examen est distinct d'achever un flux de soumission pour approbation.

Si une action manque ou affiche un avertissement, vérifiez votre rôle dans le programme, votre affectation à ce dossier et son statut actuel. Après un conflit, rechargez statut et registre. Si un outil d'évaluation est indisponible, demandez à l'administrateur de publier une définition applicable et de la lier à un volet sélectionné et à la possibilité. Pour les doublons ou preuves source manquantes, suivez la [Reprise du Portail](./portal.md) et conservez l'identité source originale.
