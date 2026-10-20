# Pièces jointes

Utilisez **Pièces jointes** pour téléverser des fichiers justificatifs sur un promoteur, une entente ou une modification, réclamation, rapprochement, engagement, prévision, surveillance, paiement, clôture ou dossier de financement précis. Chaque pièce appartient à ce dossier exact. Une pièce d’une réclamation n’est pas une pièce générale de l’entente et n’apparaît pas automatiquement sur une autre réclamation.

Les documents produits suivent leur propre processus [Documents](../agreements/documents.md). Téléverser un fichier ne produit pas un document, n’achève pas le travail et n’approuve pas son contenu.

## Accès et configuration

| Action | Accès requis |
| --- | --- |
| Lister et télécharger | Accès Lecteur à la portée propriétaire du promoteur, de l’entente ou du dossier de financement; aucune affectation de travail requise. |
| Téléverser ou modifier les métadonnées | Accès Contributeur/modification et affectation au dossier exact. L’affectation à l’entente ne remplace pas celle d’un enfant. |
| Supprimer | Accès Gestionnaire/suppression et affectation à la cible exacte. |

Les actions Téléverser, Modifier et Supprimer peuvent rester visibles si votre rôle les permet, même si une affectation, le statut du dossier ou la configuration du stockage empêche leur exécution. Sélectionner une action indisponible affiche un avertissement. Un dossier terminé ou un verrou sur l’entente peut empêcher les modifications du dossier et de son travail associé, même si vous avez les droits requis.

Avant de téléverser, confirmez que l’organisme possède un fournisseur de stockage activé, configuré et sélectionné pour les nouveaux fichiers, ainsi qu’au moins un **Type de pièce jointe** actif. Les administrateurs gèrent les types dans [Agences](../admin/agencies.md). Les exploitants gèrent l’infrastructure du fournisseur.

Le tableau présente le nom et la description bilingues, le nom du fichier, le type de pièce jointe, le format déclaré du fichier ou type MIME, la taille, l’auteur et la date du téléversement. Les noms, descriptions et types sont des métadonnées. Ils décrivent le fichier sans changer son contenu. La recherche et la pagination concernent la cible courante. Un chargement échoué affiche une action de reprise; ce n’est pas une liste vide, et les écritures restent indisponibles jusqu’à un chargement réussi.

## Téléverser un justificatif

1. Ouvrez **Pièces jointes** sur le dossier exact et choisissez **Téléverser**.
2. Sélectionnez un seul fichier d’au plus **10 Mio**. Le fichier et les champs du formulaire sont envoyés ensemble. Leur limite combinée est de 10 Mio plus 512 Kio.
3. Choisissez un type actif de l’organisme propriétaire.
4. Saisissez les noms français et anglais (255 caractères chacun au maximum) et les descriptions (10 000 caractères chacune au maximum). Les quatre valeurs sont obligatoires; les espaces périphériques sont retirés.
5. Remplissez les champs supplémentaires du fournisseur de stockage, puis enregistrez.
6. Confirmez la nouvelle ligne et téléchargez-la pour vérifier le fichier joint.

Par exemple, sur la réclamation 42, téléversez `receipts-march.pdf` et choisissez le type « Receipts / Reçus » de l’organisme. Saisissez « March receipts » comme nom anglais et « Reçus de mars » comme nom français. Ajoutez des descriptions précisant la période. Le fichier reste une preuve sur la réclamation 42; son téléversement ne soumet ni ne rapproche celle-ci.

Le nom de fichier doit être non vide, contenir au plus 255 caractères et aucun caractère de contrôle. GCS-SSC ne limite pas les téléversements à une liste générale d’extensions de nom de fichier. Le type MIME ne certifie ni la sûreté ni le contenu du fichier. Appliquez les règles de manipulation documentaire de l’organisation.

## Fichiers de dossier et types de possibilité

Pour un [Dossier de financement](../intake/funding-case-intakes.md), les droits utilisent `funding_case` à la portée du programme de sa possibilité. Téléversement, modification et suppression exigent l’affectation exacte au dossier et un statut modifiable. Une affectation à l’entente ou au promoteur ne donne pas cet accès. Les nouveaux fichiers utilisent seulement les types actifs d’agence actuellement associés à la possibilité; configurez ces associations sur la [Possibilité](../intake/opportunities.md), sans y téléverser le fichier. Pour changer le type d’une pièce existante du dossier, choisissez un type actuellement associé à cette possibilité. L’indicateur Interne configure l’association, pas une affectation ou permission serveur.

La création manuelle peut préparer plusieurs fichiers avant d’obtenir l’identifiant du dossier. Chaque fichier respecte les mêmes limites de 10 Mio, 255 caractères de nom et métadonnées bilingues obligatoires. La préparation est disponible seulement si le fournisseur d’agence est disponible sans métadonnées supplémentaires. Changer de possibilité efface les fichiers préparés. Si le fournisseur exige des métadonnées ou est indisponible, enregistrez d’abord le dossier puis utilisez son onglet Pièces jointes et le formulaire complet.

Enregistrer crée d’abord le dossier, puis téléverse les fichiers en ordre. Le premier échec arrête la séquence; les fichiers précédents peuvent être enregistrés et les suivants non tentés. Ouvrez le dossier enregistré, vérifiez la liste et téléversez les fichiers manquants. Conservez l’identifiant du dossier enregistré et poursuivez dans ce dossier. En créer un autre produirait un doublon. GCS-SSC revérifie les dates, le statut et votre accès lors de l’enregistrement et du téléversement, même si la vérification de configuration précédente a réussi.

## Modifier, télécharger ou supprimer

Changer de dossier ou d’organisme sélectionné ferme le formulaire de pièce jointe et efface son brouillon. Vérifiez le dossier et l’organisme avant de commencer un téléversement ou une modification.

**Modifier** change le type, les noms, les descriptions et les champs admissibles du fournisseur. L’action ne change pas le contenu du fichier téléversé. Pour fournir une révision, téléversez une nouvelle pièce avec une description de version claire; ne supprimez l’ancienne que si le processus métier le permet. Le type effectif doit encore être actif dans l’organisme lors de l’enregistrement; si l’ancien type a été retiré, choisissez un remplacement actif.

Les champs du fournisseur peuvent être réservés au téléversement ou modifiables. Les fichiers existants conservent leur fournisseur d’origine même si l’organisme en sélectionne un autre pour les nouveaux fichiers. Les champs d’une ancienne pièce peuvent donc différer de ceux d’un nouveau téléversement.

GCS-SSC et le fournisseur de stockage peuvent enregistrer leurs renseignements sur le fichier séparément. Si les renseignements de GCS-SSC sont enregistrés mais que la mise à jour du fournisseur échoue, le formulaire se rouvre avec les valeurs de l’hôte enregistrées, le brouillon du fournisseur conservé et un avertissement de mise à jour partielle. Corrigez ou réessayez les champs restants; ne supposez pas que les changements de libellé ont été annulés.

**Télécharger** vérifie l’accès à la cible exacte et récupère le fichier auprès du fournisseur de stockage enregistré pour cette pièce. **Supprimer** demande confirmation, retire la pièce de l’usage actif et met le retrait du fichier stocké en attente de traitement en arrière-plan. Une suppression réussie ne garantit pas que le fichier a déjà disparu du stockage externe. Aucune restauration utilisateur n’est offerte.

## Échecs et reprise

| Symptôme | Vérification |
| --- | --- |
| Téléversement indisponible | Actualiser la liste; vérifier l’affectation exacte, l’accès de modification, l’état métier et le stockage de l’organisme. |
| Type absent ou rejeté | Confirmer son appartenance à l’organisme et son état actif; le sélectionner de nouveau après un changement concurrent. |
| Fichier trop volumineux | Utiliser un fichier d’au plus 10 Mio et garder la taille combinée du fichier et des champs dans la limite de 10 Mio plus 512 Kio. |
| Fournisseur changé pendant le téléversement | Recharger puis réessayer avec la nouvelle configuration. Le serveur ne termine pas l’enregistrement avec une sélection de fournisseur qui n’est plus à jour. |
| Échec du chargement de la liste | Réessayez le chargement. Si l’erreur persiste, signalez le dossier et l’erreur à l’exploitant. Un échec de lecture des renseignements supplémentaires auprès du fournisseur peut empêcher le chargement de toute la liste; cela ne signifie pas que les fichiers ont été supprimés. |
| Fournisseur indisponible | Faire vérifier l’enregistrement, l’activation, la configuration, les identifiants et le service par l’exploitant. Répéter les téléversements ne répare pas un stockage absent. |
| Métadonnées partiellement enregistrées | Conserver les champs de l’hôte enregistrés, corriger le brouillon du fournisseur et réessayer. |
| Fichier supprimé encore présent dans le stockage | Faire examiner la file de nettoyage durable; voir [Travail en arrière-plan](../operator/background-work.md). |

Après le téléversement externe, le serveur revérifie l’autorisation, l’affectation, le cycle de vie, le type et la sélection du fournisseur avant de valider les métadonnées. Si la finalisation échoue, il tente de retirer l’objet et consigne un nettoyage différé lorsque possible. Si la demande de nettoyage elle-même n’a pas pu être enregistrée, les exploitants doivent examiner l’erreur consignée et vérifier si un fichier reste dans le stockage externe. Les agents devraient signaler le dossier et l’erreur de téléversement plutôt que joindre plusieurs fois le même fichier.
