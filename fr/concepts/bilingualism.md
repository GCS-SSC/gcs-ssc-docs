# Bilinguisme

Vous pouvez travailler en français ou en anglais dans GCS-SSC. La langue s’applique aux adresses des pages, aux libellés, aux messages d’erreur et à plusieurs champs enregistrés. Changer la langue de l’interface ne traduit pas le texte que vous avez saisi. Le contenu anglais se trouve sous `/en/...` et le contenu français sous `/fr/...`. Plusieurs dossiers conservent un champ dans chaque langue pour le même renseignement.

## Routes

Les adresses des pages comprennent un préfixe de langue. L’application utilise Nuxt i18n, son outil de navigation bilingue, pour choisir la page correspondante. L’anglais est la langue par défaut et ses adresses comprennent `/en`. Les pages françaises utilisent `/fr` et plusieurs segments traduits, comme `/fr/agences`, `/fr/utilisateurs`, `/fr/promoteurs` et `/fr/admin/gwcoa`.

Lorsque vous partagez un lien, choisissez l’adresse dans la langue souhaitée par votre collègue.

## Libellés et texte de l’interface {#libelles-et-texte-ui}

Les boutons, menus et autres libellés utilisent des traductions communes. Pour les développeurs, ces libellés proviennent de `i18n/locales/en.json` et `i18n/locales/fr.json`. Les données de langue de Nuxt UI sont choisies dans `app/app.vue`. Le contrôle de qualité du code exige que le texte Vue visible par les utilisateurs puisse être traduit.

## Données métier {#donnees-metier}

Plusieurs dossiers utilisent des paires de champs, par exemple :

- `name_en` et `name_fr`
- `description_en` et `description_fr`
- `egcs_ay_name_en` et `egcs_ay_name_fr`
- `egcs_ar_legalname_en` et `egcs_ar_legalname_fr`
- `egcs_cn_name_en` et `egcs_cn_name_fr`

Les tableaux affichent généralement le nom dans la langue sélectionnée tout en conservant les deux valeurs enregistrées. Les développeurs utilisent le composant commun `CommonBilingualName` pour cet affichage. Saisissez les deux langues pendant la configuration pour éviter des libellés vides après un changement de langue.

Par exemple, saisissez « Community outreach » dans le nom anglais et « Sensibilisation communautaire » dans le nom français. Une collègue travaillant en français voit le nom français du même dossier. Vérifiez les deux champs avant d’enregistrer : passer l’interface en français ne remplit pas le champ français à votre place.

## Validation et erreurs

Les messages d’erreur doivent être compréhensibles dans la langue choisie. Si un message apparaît dans la mauvaise langue, notez la page, la langue et l’action tentée pour signaler le problème.

## Schémas d’exécution {#schemas-d-execution}

Un schéma est une définition enregistrée d’un formulaire ou de ses questions. Les schémas d’examen et de recommandation, les libellés d’évaluation et de résultat, ainsi que les textes d’approbation et de certification peuvent contenir des valeurs bilingues dans du JSON, un format de configuration structuré. Par exemple, une question d’évaluation doit avoir deux versions linguistiques pour que les agents examinant le même dossier reçoivent des instructions équivalentes. Vérifiez le contenu français et anglais de ce JSON comme celui des autres formulaires.

## Parité documentaire {#parite-documentaire}

Les pages anglaises et françaises de documentation doivent présenter la même structure et les mêmes renseignements. Lorsque vous changez de langue, vous devez retrouver la section correspondante du guide.

Les modalités de programme possèdent des URL anglaise et française distinctes et obligatoires. Les extensions fournissent leurs propres traductions. Elles utilisent le SDK pour choisir les messages dans la langue courante de l’application au lieu d’utiliser les clés de traduction de GCS-SSC. Consultez [Validation et localisation](../developer/validation-i18n.md).

## Propositions de traduction

Une extension de traduction est un module facultatif qui peut proposer du texte dans l’autre langue. Lorsqu’une extension activée offre une action près des champs bilingues, choisissez la langue vers laquelle traduire et vérifiez le texte proposé dans le champ brouillon de cette langue. Enregistrez le formulaire pour conserver la traduction. Un glossaire d’organisme ou de volet peut guider la proposition; les administrateurs gèrent les identifiants et les réglages du fournisseur dans l’extension. Si l’action de traduction manque, demandez à un administrateur de vérifier vos permissions et l’activation de l’extension. En cas d’échec, conservez le brouillon, corrigez le problème indiqué et reprenez; ne supposez pas que l’une des langues a été enregistrée.

Les montants s’affichent selon la devise du dossier et la langue active. Les champs financiers conservent les valeurs exactes à deux décimales lorsque vous changez de langue. La traduction des libellés ne change ni la devise ni les règles de calcul.
