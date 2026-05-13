# Bilinguisme

GCS-SSC est bilingue au niveau des routes, libelles, validations et donnees. Le contenu anglais est sous `/en/...`; le contenu francais est sous `/fr/...`; plusieurs enregistrements metier stockent des champs anglais et francais apparies.

## Routes

Nuxt i18n utilise des routes prefixees. La langue par defaut est l anglais, mais les URL utilisent quand meme `/en`. Les pages francaises utilisent `/fr` et plusieurs segments traduits, comme `/fr/agences`, `/fr/utilisateurs`, `/fr/promoteurs` et `/fr/admin/commun`.

Les operateurs devraient partager l URL localisee qu ils veulent que les utilisateurs ouvrent.

## Libelles et texte UI

Les libelles d application proviennent de `i18n/locales/en.json` et `i18n/locales/fr.json`. Les donnees de langue Nuxt UI sont choisies dans `app/app.vue`. La configuration lint attend que le texte Vue visible par les utilisateurs soit internationalise.

## Donnees metier

Plusieurs dossiers utilisent des champs apparies, par exemple :

- `name_en` et `name_fr`
- `description_en` et `description_fr`
- `egcs_ay_name_en` et `egcs_ay_name_fr`
- `egcs_ar_legalname_en` et `egcs_ar_legalname_fr`
- `egcs_cn_name_en` et `egcs_cn_name_fr`

Les tables rendent souvent `CommonBilingualName`, qui affiche la valeur de la langue active tout en gardant les deux valeurs disponibles. Saisissez les deux langues pendant la configuration pour eviter des libelles vides apres un changement de langue.

## Validation et erreurs

Les erreurs de validation et les messages devraient etre comprehensibles dans la langue active de l utilisateur. Si une erreur apparait dans la mauvaise langue, capturez la page, la langue active et l action tentee.

## Schemas d execution

Les schemas d examen, schemas de recommandation, libelles d evaluation, libelles de resultat, textes d approbation et textes de certification peuvent porter des valeurs bilingues dans du JSON. Traitez ce JSON comme du contenu metier bilingue, pas seulement comme une configuration technique.

## Parite documentaire

Les pages anglaises et francaises de documentation devraient avoir la meme structure. Un utilisateur qui change de langue doit arriver dans la meme section conceptuelle, pas dans un resume plus court.
