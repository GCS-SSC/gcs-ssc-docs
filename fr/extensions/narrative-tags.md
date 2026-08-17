# Étiquettes narratives

L’extension Étiquettes narratives suggère et stocke des étiquettes dérivées des descriptions bilingues d’entente ou de promoteur.

## Configurer les cibles et le vocabulaire

Les cibles de description d’entente et de promoteur peuvent être activées et réglées séparément. Le volet partage un vocabulaire prédéfini dont les définitions peuvent comprendre des libellés bilingues et des alias. Chaque cible détermine si les étiquettes personnalisées sont permises et expose les seuils prédéfinis et dynamiques, la taille des syntagmes, les pondérations sémantique et lexicale, la bonification des alias, la gestion de la négation ainsi que les caches du navigateur ou des vecteurs.

Pour les descriptions d’entente, l’extracteur du navigateur classe les étiquettes prédéfinies et peut proposer des étiquettes dynamiques. Si son modèle ne peut pas démarrer, l’extension utilise le chevauchement de mots-clés avec les libellés et les alias. Les suggestions de promoteur utilisent toujours le chevauchement de mots-clés avec les définitions prédéfinies disponibles; les réglages des étiquettes dynamiques et des vecteurs ne modifient pas ce traitement. Les suggestions ne sont jamais enregistrées automatiquement; l’utilisateur choisit ou retire les étiquettes.

## Provenance et validation

Les étiquettes d’entente utilisent la configuration du volet; leur provenance est donc implicite. Celles du promoteur conservent leur source : les définitions peuvent provenir de l’agence principale ou de volets activés pour des ententes liées. Les sélections avec source comprennent l’agence et, s’il y a lieu, le volet qui a fourni leur définition; une valeur stockée sans source utilise la première configuration disponible. Avant la persistance, le serveur valide de nouveau toute source demandée, la configuration de la cible, les alias, la permission d’utiliser des étiquettes personnalisées et les doublons.

Lorsque les définitions ou les sources disponibles changent, les étiquettes périmées et invalides sont filtrées plutôt que présentées comme choix courants. La provenance stockée permet de distinguer des étiquettes de même nom fournies par des sources différentes.

## Autorisation transactionnelle des écritures

Les écritures d’étiquettes d’une entente résolvent d’abord suffisamment de contexte pour rejeter les requêtes mal formées, puis effectuent tout le travail protégé dans une seule transaction. La route verrouille d’abord le graphe actuel des autorisations de l’appelant, acquiert les verrous du cycle de vie de l’extension pour l’agence et le volet, autorise de nouveau l’entité actuelle, puis résout de nouveau l’entente et la configuration actuelle de l’extension. La validation et la mise à jour ou l’insertion des étiquettes utilisent cette portée actuelle verrouillée; une modification de l’agence, du volet, de la configuration, du cycle de vie de l’entente, du rôle ou de l’accès de l’équipe ne peut donc pas entrer en concurrence avec une écriture autorisée selon un état périmé. L’hôte doit fournir `writeAuthorization`; le rappel de la portée actuelle est privilégié et celui de l’entité actuelle demeure la solution de compatibilité.

## Limite actuelle du résolveur de demandeur-bénéficiaire

Le résolveur prévu rassemble une source de l'organisme responsable et les volets activés d'ententes liées que la personne peut lire. L'hôte actuel ignore le résolveur si Étiquettes narratives n'est pas activée pour l'organisme responsable, puis affiche l'emplacement même si le résolveur retourne null. Une entente liée dans un autre organisme activé ne suffit donc pas à faire paraître l'emplacement, tandis qu'un organisme responsable activé peut produire un emplacement vide lorsqu'aucune source valide ne demeure. La route GET filtre néanmoins les sources réellement lisibles avant de retourner les étiquettes. Cet effet est suivi sous `DOC-034`.

## Persistance et comportement du navigateur

Les routes GET/PATCH d'entente exigent les deux commutateurs et la lecture ou modification exacte de l'entente. PATCH verrouille l'autorisation et le cycle de vie, autorise de nouveau, résout la configuration courante, valide `{ tags }`, puis insère ou met à jour le stockage clé-valeur. La route GET du demandeur-bénéficiaire exige sa lecture exacte ou par équipe et retire les étiquettes dont la source n'est plus visible. Ses écritures, ainsi que les écritures d'entente par champ, sont persistées par les crochets de mise à jour des profils de base dans la transaction hôte; les suggestions modifient seulement la charge du formulaire jusqu'à l'enregistrement réussi du profil.

Les propriétaires du stockage sont `fundingcaseagreement` et `applicantrecipient`; les clés sont `agreement-description-tags` et `text-field-tags`. Une sélection prédéfinie doit correspondre à la définition courante applicable. Une étiquette personnalisée exige la permission de cette cible exacte. La provenance d'un demandeur-bénéficiaire doit correspondre à une source organisme-volet disponible, et les doublons sont retirés par source et identité. L'extension n'a ni migration ni secret; conservez son stockage dans les sauvegardes.

Le texte d'entente utilise le travailleur et le modèle de même origine sous `/extensions/gcs-narrative-tags/client` et `/extensions/gcs-narrative-tags/models`. Il applique les poids sémantiques et lexicaux, alias, négation, seuils, limites, phrases dynamiques et caches. Un échec du travailleur utilise le classement de mots-clés et d'alias puis réinitialise le travailleur partagé. Les suggestions de demandeur-bénéficiaire utilisent toujours le classement par mots-clés tenant compte de la source; les options dynamiques et d'intégration vectorielle ne s'y appliquent pas. Le texte demeure dans le navigateur; le serveur reçoit les étiquettes et leur provenance, jamais les intégrations vectorielles.
