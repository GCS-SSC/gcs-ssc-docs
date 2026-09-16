# Pièces jointes

Utilisez **Pièces jointes** pour téléverser des fichiers justificatifs sur un promoteur, une entente ou une modification, réclamation, rapprochement, engagement, prévision, surveillance, paiement ou clôture précis. Chaque pièce appartient à ce dossier exact. Une pièce d’une réclamation n’est pas une pièce générale de l’entente et n’apparaît pas automatiquement sur une autre réclamation.

Les documents produits suivent leur propre processus [Documents](../agreements/documents.md). Téléverser un fichier ne produit pas un document, n’achève pas le travail et n’approuve pas son contenu.

## Accès et configuration

| Action | Accès requis |
| --- | --- |
| Lister et télécharger | Accès Lecteur à la portée propriétaire du promoteur ou de l’entente; aucune affectation de travail requise. |
| Téléverser ou modifier les métadonnées | Accès Contributeur/modification et affectation au dossier exact. L’affectation à l’entente ne remplace pas celle d’un enfant. |
| Supprimer | Accès Gestionnaire/suppression et affectation à la cible exacte. |

Les protections d’état métier et les verrous de l’agrégat d’entente s’appliquent aussi aux écritures. La lecture ne rend pas un dossier terminal modifiable. L’organisme doit avoir un fournisseur de stockage activé, configuré et sélectionné pour les nouveaux fichiers, ainsi qu’au moins un **Type de pièce jointe** actif. Les administrateurs gèrent les types dans [Agences](../admin/agencies.md); les exploitants gèrent l’infrastructure du fournisseur.

Le tableau présente le nom et la description bilingues, le nom du fichier, le type, le type MIME, la taille, l’auteur et la date du téléversement. La recherche et la pagination concernent la cible courante. Un chargement échoué affiche une action de reprise; ce n’est pas une liste vide, et les écritures restent indisponibles jusqu’à un chargement réussi.

## Téléverser un justificatif

1. Ouvrez **Pièces jointes** sur le dossier exact et choisissez **Téléverser**.
2. Sélectionnez un seul fichier d’au plus **10 Mio**. La requête multipart complète, métadonnées comprises, est limitée à 10 Mio plus 512 Kio.
3. Choisissez un type actif de l’organisme propriétaire.
4. Saisissez les noms français et anglais (255 caractères chacun au maximum) et les descriptions (10 000 caractères chacune au maximum). Les quatre valeurs sont obligatoires; les espaces périphériques sont retirés.
5. Remplissez les champs supplémentaires du fournisseur de stockage, puis enregistrez.
6. Confirmez la nouvelle ligne et téléchargez-la pour vérifier le fichier joint.

Par exemple, sur la réclamation 42, téléversez `recus-mars.pdf`, choisissez le type « Receipts / Reçus » de l’organisme et saisissez « March receipts / Reçus de mars », avec des descriptions précisant la période. Le fichier reste une preuve sur la réclamation 42; son téléversement ne soumet ni ne rapproche celle-ci.

Le nom de fichier doit être non vide, contenir au plus 255 caractères et aucun caractère de contrôle. Ce contrat de téléversement n’impose pas de liste générale d’extensions autorisées dans l’hôte. Le type MIME ne certifie ni la sûreté ni le contenu du fichier. Appliquez les règles de manipulation documentaire de l’organisation.

## Modifier, télécharger ou supprimer

**Modifier** change le type, les noms, les descriptions et les champs admissibles du fournisseur. L’action ne remplace pas les octets du fichier. Pour fournir une révision, téléversez une nouvelle pièce avec une description de version claire; ne supprimez l’ancienne que si le processus métier le permet. Le type effectif doit encore être actif dans l’organisme lors de l’enregistrement; si l’ancien type a été retiré, choisissez un remplacement actif.

Les champs du fournisseur peuvent être réservés au téléversement ou modifiables. Les fichiers existants conservent leur fournisseur d’origine même si l’organisme en sélectionne un autre pour les nouveaux fichiers. Les champs d’une ancienne pièce peuvent donc différer de ceux d’un nouveau téléversement.

Les métadonnées de l’hôte et du fournisseur peuvent nécessiter deux enregistrements distincts. Si celles de l’hôte sont enregistrées mais que la mise à jour du fournisseur échoue, le formulaire se rouvre avec les valeurs de l’hôte enregistrées, le brouillon du fournisseur conservé et un avertissement de mise à jour partielle. Corrigez ou réessayez les champs restants; ne supposez pas que les changements de libellé ont été annulés.

**Télécharger** vérifie l’accès à la cible exacte et obtient les octets du fournisseur enregistré. **Supprimer** demande confirmation, retire la pièce de l’usage actif et planifie un nettoyage durable. Une suppression réussie ne garantit pas la disparition immédiate des octets externes. Aucune restauration utilisateur n’est offerte.

## Échecs et reprise

| Symptôme | Vérification |
| --- | --- |
| Téléversement indisponible | Actualiser la liste; vérifier l’affectation exacte, l’accès de modification, l’état métier et le stockage de l’organisme. |
| Type absent ou rejeté | Confirmer son appartenance à l’organisme et son état actif; le sélectionner de nouveau après un changement concurrent. |
| Fichier trop volumineux | Réduire le fichier sous 10 Mio et respecter la limite globale avec les métadonnées. |
| Fournisseur changé pendant le téléversement | Recharger puis réessayer avec la nouvelle configuration. Le serveur rejette la finalisation périmée. |
| Fournisseur indisponible | Faire vérifier l’enregistrement, l’activation, la configuration, les identifiants et le service par l’exploitant. Répéter les téléversements ne répare pas un stockage absent. |
| Métadonnées partiellement enregistrées | Conserver les champs de l’hôte enregistrés, corriger le brouillon du fournisseur et réessayer. |
| Fichier supprimé encore présent dans le stockage | Faire examiner la file de nettoyage durable; voir [Travail en arrière-plan](../operator/background-work.md). |

Après le téléversement externe, le serveur revérifie l’autorisation, l’affectation, le cycle de vie, le type et la sélection du fournisseur avant de valider les métadonnées. Si la finalisation échoue, il tente de retirer l’objet et consigne un nettoyage différé lorsque possible. Les exploitants doivent examiner les erreurs de persistance du nettoyage : un objet externe peut alors nécessiter un rapprochement manuel.
