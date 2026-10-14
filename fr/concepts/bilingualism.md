# Bilinguisme

Vous pouvez travailler en français ou en anglais dans GCS-SSC. La langue s’applique aux adresses des pages, aux libellés, aux messages d’erreur et à plusieurs champs enregistrés. Changer la langue de l’interface ne traduit pas le texte que vous avez saisi. Le contenu anglais se trouve sous `/en/...` et le contenu français sous `/fr/...`. Plusieurs dossiers conservent un champ dans chaque langue pour le même renseignement.

## Routes

Les adresses des pages comprennent un préfixe de langue. L’application utilise Nuxt i18n, son outil de navigation bilingue, pour choisir la page correspondante. L’anglais est la langue par défaut et ses adresses comprennent `/en`. Les pages françaises utilisent `/fr` et plusieurs segments traduits, comme `/fr/agences`, `/fr/utilisateurs`, `/fr/promoteurs` et `/fr/admin/gwcoa`.

Lorsque vous partagez un lien, choisissez l’adresse dans la langue souhaitée par votre collègue.

## Libelles et texte UI

Les boutons, menus et autres libellés utilisent des traductions communes. Pour les développeurs, ces libellés proviennent de `i18n/locales/en.json` et `i18n/locales/fr.json`. Les données de langue de Nuxt UI sont choisies dans `app/app.vue`. Le contrôle de qualité du code exige que le texte Vue visible par les utilisateurs puisse être traduit.

## Donnees metier

Plusieurs dossiers utilisent des paires de champs, par exemple :

- `name_en` et `name_fr`
- `description_en` et `description_fr`
- `egcs_ay_name_en` et `egcs_ay_name_fr`
- `egcs_ar_legalname_en` et `egcs_ar_legalname_fr`
- `egcs_cn_name_en` et `egcs_cn_name_fr`

Les tableaux affichent généralement le nom dans la langue sélectionnée tout en conservant les deux valeurs enregistrées; le composant commun d’affichage est `CommonBilingualName`. Saisissez les deux langues pendant la configuration pour éviter des libellés vides après un changement de langue.

Par exemple, saisissez « Community outreach » dans le nom anglais et « Sensibilisation communautaire » dans le nom français. Une collègue travaillant en français voit le nom français du même dossier. Vérifiez les deux champs avant d’enregistrer : passer l’interface en français ne remplit pas le champ français à votre place.

## Validation et erreurs

Les messages d’erreur doivent être compréhensibles dans la langue choisie. Si un message apparaît dans la mauvaise langue, notez la page, la langue et l’action tentée pour signaler le problème.

## Schemas d execution

Un schéma est une définition enregistrée d’un formulaire ou de ses questions. Les schémas d’examen et de recommandation, les libellés d’évaluation et de résultat, ainsi que les textes d’approbation et de certification peuvent contenir des valeurs bilingues dans du JSON, un format de configuration structuré. Par exemple, une question d’évaluation doit avoir deux versions linguistiques pour que les agents examinant le même dossier reçoivent des instructions équivalentes. Vérifiez le contenu français et anglais de ce JSON comme celui des autres formulaires.

## Parite documentaire

Les pages anglaises et françaises de documentation doivent présenter la même structure et les mêmes renseignements. Lorsque vous changez de langue, vous devez retrouver la section correspondante du guide.

Les modalités de programme possèdent des URL anglaise et française distinctes et obligatoires. Les extensions possèdent leurs catalogues et les résolvent par le SDK selon la langue courante de l’hôte; un message d’extension n’est pas une clé de l’hôte. Consultez [Validation et localisation](../developer/validation-i18n.md).

## Propositions de traduction

Une extension de traduction est un module facultatif qui peut proposer du texte dans l’autre langue. Lorsqu’une extension activée offre une action près des champs bilingues, choisissez le sens et examinez le texte proposé dans le brouillon cible. Enregistrez le formulaire propriétaire pour le conserver. Un glossaire d’organisme ou de volet peut guider la proposition; identifiants et fournisseur relèvent de l’administration de l’extension. Une action absente peut refléter permissions ou activation. En cas d’échec, conservez le brouillon, corrigez le problème indiqué et reprenez; ne supposez pas que l’une des langues a été enregistrée.

Les montants suivent devise propriétaire et langue active. Les contrôles conservent les valeurs exactes à deux décimales lors du changement de langue; traduire les libellés ne change ni devise ni calcul.
