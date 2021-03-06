// Detect the language and update the global Language file
var setLanguage = function (preferredLanguage) {

    if (!preferredLanguage) {
        // we are still on default
        var lang = App.Localization.detectLocale();
        i18n.setLocale(lang);
        AdvSettings.set('language', lang);
    } else {
        i18n.setLocale(preferredLanguage);
    }

    // This is a hack to translate non-templated UI elements.
    $('[data-translate]').each(function () {
        var $el = $(this);
        var key = $el.data('translate');

        if ($el.is('input')) {
            $el.attr('placeholder', i18n.__(key));
        } else {
            $el.text(i18n.__(key));
        }
    });
};

App.Localization.nativeName = function (lang) {
  var codes = App.Localization.langcodes;
  return codes[lang]?codes[lang].nativeName:lang;
};

App.Localization.name = function (lang) {
  var codes = App.Localization.langcodes;
  return codes[lang]?codes[lang].name:lang;
};

App.Localization.detectLocale = function () {
    // The full OS language (with localization, like 'en-uk')
    var pureLanguage = navigator.language.toLowerCase();
    // The global language name (without localization, like 'en')
    var baseLanguage = navigator.language.toLowerCase().slice(0, 2);

    if ($.inArray(pureLanguage, App.Localization.allTranslations) !== -1) {
        return pureLanguage;
    } else if ($.inArray(baseLanguage, App.Localization.allTranslations) !== -1) {
        return baseLanguage;
    } else {
        return 'en';
    }
};

// Remove unsupported subtitle language from object
App.Localization.filterSubtitle = function (langs) {
    var filteredLang = {};
    _.each(langs, function (data, lang) {
        var langInfo = App.Localization.langcodes[lang];
        if (langInfo && langInfo.subtitle) {
            filteredLang[lang] = data;
        }
    });

    return filteredLang;
};

App.Localization.allTranslations = ['en', 'ar', 'bg', 'bn', 'ca', 'cs', 'da', 'de', 'el', 'es', 'es-mx', 'et', 'eu', 'fa', 'fi', 'fr', 'gl', 'he', 'hr', 'hu', 'id', 'it', 'ka', 'ko', 'lt', 'mk', 'ms', 'nb', 'nl', 'nn', 'pl', 'pt', 'pt-br', 'ro', 'ru', 'sk', 'sl', 'sr', 'sv', 'tr', 'uk', 'zh-cn', 'zh-tw'];

App.Localization.langcodes = {
    'aa': {
        name: 'Afar',
        nativeName: 'Afaraf'
    },
    'ab': {
        name: 'Abkhaz',
        nativeName: '??????????'
    },
    'ae': {
        name: 'Avestan',
        nativeName: 'avesta'
    },
    'af': {
        name: 'Afrikaans',
        nativeName: 'Afrikaans'
    },
    'ak': {
        name: 'Akan',
        nativeName: 'Akan'
    },
    'am': {
        name: 'Amharic',
        nativeName: '????????????'
    },
    'an': {
        name: 'Aragonese',
        nativeName: 'Aragon??s'
    },
    'ar': {
        name: 'Arabic',
        nativeName: '??????????????',
        subtitle: true,
        encoding: ['windows-1256'] // Tested
    },
    'as': {
        name: 'Assamese',
        nativeName: '?????????????????????'
    },
    'av': {
        name: 'Avaric',
        nativeName: '???????? ????????'
    },
    'ay': {
        name: 'Aymara',
        nativeName: 'aymar aru'
    },
    'az': {
        name: 'Azerbaijani',
        nativeName: 'az??rbaycan dili'
    },
    'ba': {
        name: 'Bashkir',
        nativeName: '?????????????? ????????'
    },
    'be': {
        name: 'Belarusian',
        nativeName: '????????????????????'
    },
    'bg': {
        name: 'Bulgarian',
        nativeName: '??????????????????',
        subtitle: true,
        encoding: ['Windows-1251'] // Tested
    },
    'bh': {
        name: 'Bihari',
        nativeName: '?????????????????????'
    },
    'bi': {
        name: 'Bislama',
        nativeName: 'Bislama'
    },
    'bm': {
        name: 'Bambara',
        nativeName: 'bamanankan'
    },
    'bn': {
        name: 'Bengali',
        nativeName: '???????????????'
    },
    'bo': {
        name: 'Tibetan',
        nativeName: '?????????????????????'
    },
    'br': {
        name: 'Breton',
        nativeName: 'Brezhoneg'
    },
    'bs': {
        name: 'Bosnian',
        nativeName: 'Bosanski jezik',
        subtitle: true,
        encoding: ['Windows-1250'] // Tested
    },
    'ca': {
        name: 'Catalan',
        nativeName: 'Catal??'
    },
    'ce': {
        name: 'Chechen',
        nativeName: '?????????????? ????????'
    },
    'ch': {
        name: 'Chamorro',
        nativeName: 'Chamoru'
    },
    'co': {
        name: 'Corsican',
        nativeName: 'Corsu'
    },
    'cr': {
        name: 'Cree',
        nativeName: '?????????????????????'
    },
    'cs': {
        name: 'Czech',
        nativeName: '??esk??',
        subtitle: true,
        encoding: ['iso-8859-2'] // Tested
    },
    'cu': {
        name: 'Church Slavonic',
        nativeName: '?????????? ????????????????????'
    },
    'cv': {
        name: 'Chuvash',
        nativeName: '?????????? ??????????'
    },
    'cy': {
        name: 'Welsh',
        nativeName: 'Cymraeg'
    },
    'da': {
        name: 'Danish',
        nativeName: 'Dansk',
        subtitle: true,
        encoding: ['iso-8859-1'] // Tested
    },
    'de': {
        name: 'German',
        nativeName: 'Deutsch',
        subtitle: true,
        encoding: ['iso-8859-1'] /** NEED TEST **/
    },
    'dv': {
        name: 'Divehi',
        nativeName: '????????????'
    },
    'ea': {
        name: 'Spanish (EU)',
        nativeName: 'Espa??ol (EU)'
    },
    'ee': {
        name: 'Ewe',
        nativeName: 'E??egbe'
    },
    'el': {
        name: 'Modern Greek',
        nativeName: '????????????????',
        subtitle: true,
        encoding: ['Windows-1253'] // Tested
    },
    'en': {
        name: 'English',
        nativeName: 'English',
        subtitle: true,
        encoding: ['iso-8859-1'] // Tested
    },
    'eo': {
        name: 'Esperanto',
        nativeName: 'Esperanto'
    },
    'es': {
        name: 'Spanish',
        nativeName: 'Espa??ol',
        subtitle: true,
        encoding: ['iso-8859-1'], // Tested
        keywords: ['@TSF', 'aRGENTeaM']
    },
    'es-ar': {
        name: 'Spanish (Argentina)',
        nativeName: 'Espa??ol (Argentina)'
    },
    'es-mx': {
        name: 'Spanish (Mexico)',
        nativeName: 'Espa??ol (M??xico)'
    },
    'et': {
        name: 'Estonian',
        nativeName: 'Eesti',
        subtitle: true,
        encoding: ['iso-8859-4'] /** NEED TEST **/
    },
    'eu': {
        name: 'Basque',
        nativeName: 'Euskara',
        subtitle: true,
        encoding: ['iso-8859-1'] /** NEED TEST **/
    },
    'fa': {
        name: 'Persian',
        nativeName: '??????????',
        subtitle: true,
        encoding: ['Windows-1256'] // Tested
    },
    'ff': {
        name: 'Fula',
        nativeName: 'Fulfulde'
    },
    'fi': {
        name: 'Finnish',
        nativeName: 'Suomi',
        subtitle: true,
        encoding: ['iso-8859-1'] // Tested
    },
    'fj': {
        name: 'Fijian',
        nativeName: 'Vosa Vakaviti'
    },
    'fo': {
        name: 'Faroese',
        nativeName: 'f??royskt'
    },
    'fr': {
        name: 'French',
        nativeName: 'Fran??ais',
        subtitle: true,
        encoding: ['Windows-1252'] // Tested
    },
    'fy': {
        name: 'Western Frisian',
        nativeName: 'Frysk'
    },
    'ga': {
        name: 'Irish',
        nativeName: 'Gaeilge'
    },
    'gd': {
        name: 'Scottish Gaelic',
        nativeName: 'G??idhlig'
    },
    'gl': {
        name: 'Galician',
        nativeName: 'Galego'
    },
    'gn': {
        name: 'Guaran??',
        nativeName: 'Ava??e???'
    },
    'gu': {
        name: 'Gujarati',
        nativeName: '?????????????????????'
    },
    'gv': {
        name: 'Manx',
        nativeName: 'Gaelg'
    },
    'ha': {
        name: 'Hausa',
        nativeName: 'Hausa'
    },
    'he': {
        name: 'Hebrew (modern)',
        nativeName: '??????????',
        subtitle: true,
        encoding: ['iso-8859-8'] // Tested
    },
    'hi': {
        name: 'Hindi',
        nativeName: '??????????????????'
    },
    'ho': {
        name: 'Hiri Motu',
        nativeName: 'Hiri Motu'
    },
    'hr': {
        name: 'Croatian',
        nativeName: 'Hrvatski',
        subtitle: true,
        encoding: ['Windows-1250'] // Tested
    },
    'ht': {
        name: 'Haitian',
        nativeName: 'Krey??l ayisyen'
    },
    'hu': {
        name: 'Hungarian',
        nativeName: 'Magyar',
        subtitle: true,
        encoding: ['iso-8859-2'] // Tested
    },
    'hy': {
        name: 'Armenian',
        nativeName: '??????????????'
    },
    'hz': {
        name: 'Herero',
        nativeName: 'Otjiherero'
    },
    'ia': {
        name: 'Interlingua',
        nativeName: 'Interlingua'
    },
    'id': {
        name: 'Indonesian',
        nativeName: 'Bahasa Indonesia',
        subtitle: true,
        encoding: ['UTF8'] /** NEED TEST **/
    },
    'ie': {
        name: 'Interlingue',
        nativeName: 'Interlingue'
    },
    'ig': {
        name: 'Igbo',
        nativeName: 'As???s??? Igbo'
    },
    'ii': {
        name: 'Nuosu',
        nativeName: '????????? Nuosuhxop'
    },
    'ik': {
        name: 'Inupiaq',
        nativeName: 'I??upiaq'
    },
    'io': {
        name: 'Ido',
        nativeName: 'Ido'
    },
    'is': {
        name: 'Icelandic',
        nativeName: '??slenska'
    },
    'it': {
        name: 'Italian',
        nativeName: 'Italiano',
        subtitle: true,
        encoding: ['iso-8859-1'] // Tested
    },
    'iu': {
        name: 'Inuktitut',
        nativeName: '??????????????????'
    },
    'ja': {
        name: 'Japanese',
        nativeName: '?????????'
    },
    'jv': {
        name: 'Javanese',
        nativeName: 'Basa Jawa'
    },
    'ka': {
        name: 'Georgian',
        nativeName: '?????????????????????',
        subtitle: true,
        encoding: ['iso-8859-2'] /** NEED TEST **/
    },
    'kg': {
        name: 'Kongo',
        nativeName: 'KiKongo'
    },
    'ki': {
        name: 'Kikuyu',
        nativeName: 'G??k??y??'
    },
    'kj': {
        name: 'Kwanyama',
        nativeName: 'Kuanyama'
    },
    'kk': {
        name: 'Kazakh',
        nativeName: '?????????? ????????'
    },
    'kl': {
        name: 'Kalaallisut',
        nativeName: 'Kalaallisut'
    },
    'km': {
        name: 'Khmer',
        nativeName: '???????????????????????????'
    },
    'kn': {
        name: 'Kannada',
        nativeName: '???????????????'
    },
    'ko': {
        name: 'Korean',
        nativeName: '?????????'
    },
    'kr': {
        name: 'Kanuri',
        nativeName: 'Kanuri'
    },
    'ks': {
        name: 'Kashmiri',
        nativeName: '?????????????????????'
    },
    'ku': {
        name: 'Kurdish',
        nativeName: '??????????'
    },
    'ku-iq': {
        name: 'Kurdish (Sorani)',
        nativeName: '???????????? ??????????????'
    },
    'kv': {
        name: 'Komi',
        nativeName: '???????? ??????'
    },
    'kw': {
        name: 'Cornish',
        nativeName: 'Kernewek'
    },
    'ky': {
        name: 'Kirghiz',
        nativeName: '???????????? ????????'
    },
    'la': {
        name: 'Latin',
        nativeName: 'Latine'
    },
    'lb': {
        name: 'Luxembourgish',
        nativeName: 'L??tzebuergesch'
    },
    'lg': {
        name: 'Luganda',
        nativeName: 'Luganda'
    },
    'li': {
        name: 'Limburgish',
        nativeName: 'Limburgs'
    },
    'ln': {
        name: 'Lingala',
        nativeName: 'Ling??la'
    },
    'lo': {
        name: 'Lao',
        nativeName: '?????????????????????'
    },
    'lt': {
        name: 'Lithuanian',
        nativeName: 'lietuvi?? kalba',
        subtitle: true,
        encoding: ['iso-8859-4'] /** NEED TEST **/
    },
    'lu': {
        name: 'Luba-Katanga',
        nativeName: 'Kiluba'
    },
    'lv': {
        name: 'Latvian',
        nativeName: 'Latvie??u valoda'
    },
    'mg': {
        name: 'Malagasy',
        nativeName: 'Malagasy fiteny'
    },
    'mh': {
        name: 'Marshallese',
        nativeName: 'Kajin M??aje??'
    },
    'mi': {
        name: 'M??ori',
        nativeName: 'te reo M??ori'
    },
    'mk': {
        name: 'Macedonian',
        nativeName: '???????????????????? ??????????'
    },
    'ml': {
        name: 'Malayalam',
        nativeName: '??????????????????'
    },
    'mn': {
        name: 'Mongolian',
        nativeName: '????????????'
    },
    'mr': {
        name: 'Marathi (Mar?????h??)',
        nativeName: '???????????????'
    },
    'ms': {
        name: 'Malay',
        nativeName: '???????? ??????????'
    },
    'mt': {
        name: 'Maltese',
        nativeName: 'Malti'
    },
    'my': {
        name: 'Burmese',
        nativeName: '???????????????'
    },
    'na': {
        name: 'Nauru',
        nativeName: 'Ekakair?? Naoero'
    },
    'nd': {
        name: 'North Ndebele',
        nativeName: 'isiNdebele'
    },
    'ne': {
        name: 'Nepali',
        nativeName: '??????????????????'
    },
    'ng': {
        name: 'Ndonga',
        nativeName: 'Owambo'
    },
    'nl': {
        name: 'Dutch',
        nativeName: 'Nederlands',
        subtitle: true,
        encoding: ['iso-8859-1'] // Tested
    },
    'nn': {
        name: 'Norwegian Nynorsk',
        nativeName: 'Norsk nynorsk'
    },
    'nb': {
        name: 'Norwegian Bokm??l',
        nativeName: 'Norsk bokm??l'
    },
    'no': {
        name: 'Norwegian',
        nativeName: 'Norsk',
        subtitle: true,
        encoding: ['iso-8859-1'] // Tested
    },
    'nr': {
        name: 'South Ndebele',
        nativeName: 'isiNdebele'
    },
    'nv': {
        name: 'Navajo',
        nativeName: 'Din?? bizaad'
    },
    'ny': {
        name: 'Chichewa',
        nativeName: 'chiChe??a'
    },
    'oc': {
        name: 'Occitan',
        nativeName: 'Occitan'
    },
    'oj': {
        name: 'Ojibwe',
        nativeName: '????????????????????????'
    },
    'om': {
        name: 'Oromo',
        nativeName: 'Afaan Oromoo'
    },
    'or': {
        name: 'Oriya',
        nativeName: '???????????????'
    },
    'os': {
        name: 'Ossetian',
        nativeName: '???????? ??????????'
    },
    'pa': {
        name: 'Panjabi',
        nativeName: '??????????????????'
    },
    'pi': {
        name: 'P??li',
        nativeName: '????????????'
    },
    'pl': {
        name: 'Polish',
        nativeName: 'Polski',
        subtitle: true,
        encoding: ['Windows-1250'] // Tested
    },
    'ps': {
        name: 'Pashto',
        nativeName: '????????'
    },
    'pt': {
        name: 'Portuguese',
        nativeName: 'Portugu??s',
        subtitle: true,
        encoding: ['iso-8859-1'] // Tested
    },
    'pt-br': {
        name: 'Portuguese (Brazil)',
        nativeName: 'Portugu??s (Brasil)',
        subtitle: true,
        encoding: ['iso-8859-1'] // Tested
    },
    'qu': {
        name: 'Quechua',
        nativeName: 'Runa Simi'
    },
    'rm': {
        name: 'Romansh',
        nativeName: 'rumantsch grischun'
    },
    'rn': {
        name: 'Kirundi',
        nativeName: 'kiRundi'
    },
    'ro': {
        name: 'Romanian',
        nativeName: 'rom??n??',
        subtitle: true,
        encoding: ['iso-8859-2'] // Tested
    },
    'ru': {
        name: 'Russian',
        nativeName: '?????????????? ????????',
        subtitle: true,
        encoding: ['Windows-1251'] // Tested
    },
    'rw': {
        name: 'Kinyarwanda',
        nativeName: 'Ikinyarwanda'
    },
    'sa': {
        name: 'Sanskrit (Sa???sk???ta)',
        nativeName: '???????????????????????????'
    },
    'sc': {
        name: 'Sardinian',
        nativeName: 'sardu'
    },
    'sd': {
        name: 'Sindhi',
        nativeName: '?????????? ??????????'
    },
    'se': {
        name: 'Northern Sami',
        nativeName: 'Davvis??megiella'
    },
    'sg': {
        name: 'Sango',
        nativeName: 'y??ng?? t?? s??ng??'
    },
    'si': {
        name: 'Sinhala',
        nativeName: '???????????????'
    },
    'sk': {
        name: 'Slovak',
        nativeName: 'sloven??ina'
    },
    'sl': {
        name: 'Slovene',
        nativeName: 'sloven????ina',
        subtitle: true,
        encoding: ['windows-1250'] // Tested
    },
    'sm': {
        name: 'Samoan',
        nativeName: 'gagana faa Samoa'
    },
    'sn': {
        name: 'Shona',
        nativeName: 'chiShona'
    },
    'so': {
        name: 'Somali',
        nativeName: 'Soomaaliga'
    },
    'sp': {
        name: 'Spanish (LA)',
        nativeName: 'Espa??ol (LA)'
    },
    'sq': {
        name: 'Albanian',
        nativeName: 'Shqip'
    },
    'sr': {
        name: 'Serbian',
        nativeName: '???????????? ??????????',
        subtitle: true,
        encoding: ['Windows-1250'] // Tested
    },
    'ss': {
        name: 'Swati',
        nativeName: 'SiSwati'
    },
    'st': {
        name: 'Southern Sotho',
        nativeName: 'Sesotho'
    },
    'su': {
        name: 'Sundanese',
        nativeName: 'Basa Sunda'
    },
    'sv': {
        name: 'Swedish',
        nativeName: 'svenska',
        subtitle: true,
        encoding: ['iso-8859-1'] /** NEED TEST **/
    },
    'sw': {
        name: 'Swahili',
        nativeName: 'Kiswahili'
    },
    'ta': {
        name: 'Tamil',
        nativeName: '???????????????'
    },
    'te': {
        name: 'Telugu',
        nativeName: '??????????????????'
    },
    'tg': {
        name: 'Tajik',
        nativeName: '????????????'
    },
    'th': {
        name: 'Thai',
        nativeName: '?????????',
        subtitle: true,
        encoding: ['windows-874', 'iso-8859-11']
    },
    'ti': {
        name: 'Tigrinya',
        nativeName: '????????????'
    },
    'tk': {
        name: 'Turkmen',
        nativeName: 'T??rkmen'
    },
    'tl': {
        name: 'Tagalog',
        nativeName: 'Wikang Tagalog'
    },
    'tn': {
        name: 'Tswana',
        nativeName: 'Setswana'
    },
    'to': {
        name: 'Tonga',
        nativeName: 'faka Tonga'
    },
    'tr': {
        name: 'Turkish',
        nativeName: 'T??rk??e',
        subtitle: true,
        encoding: ['iso-8859-9'] // Tested
    },
    'ts': {
        name: 'Tsonga',
        nativeName: 'Xitsonga'
    },
    'tt': {
        name: 'Tatar',
        nativeName: '??????????????'
    },
    'tw': {
        name: 'Twi',
        nativeName: 'Twi'
    },
    'ty': {
        name: 'Tahitian',
        nativeName: 'Reo Tahiti'
    },
    'ug': {
        name: 'Uighur',
        nativeName: '????????????????'
    },
    'uk': {
        name: 'Ukrainian',
        nativeName: '????????????????????',
        subtitle: true,
        encoding: ['iso-8859-5'] /** NEED TEST **/
    },
    'ur': {
        name: 'Urdu',
        nativeName: '????????'
    },
    'uz': {
        name: 'Uzbek',
        nativeName: 'O??zbek'
    },
    've': {
        name: 'Venda',
        nativeName: 'Tshiven???a'
    },
    'vi': {
        name: 'Vietnamese',
        nativeName: 'Ti???ng Vi???t',
        subtitle: true,
        encoding: ['Windows-1258'] /** NEED TEST **/
    },
    'vo': {
        name: 'Volap??k',
        nativeName: 'Volap??k'
    },
    'wa': {
        name: 'Walloon',
        nativeName: 'Walon'
    },
    'wo': {
        name: 'Wolof',
        nativeName: 'Wollof'
    },
    'xh': {
        name: 'Xhosa',
        nativeName: 'isiXhosa'
    },
    'yi': {
        name: 'Yiddish',
        nativeName: '????????????'
    },
    'yo': {
        name: 'Yoruba',
        nativeName: 'Yor??b??'
    },
    'za': {
        name: 'Zhuang',
        nativeName: 'Sa?? cue????'
    },
    'ze': {
        name: 'Chinese (bilingual)',
        nativeName: '?????? (bilingual)',
    },
    'zh': {
        name: 'Chinese',
        nativeName: '??????',
    },
    'zh-cn': {
        name: 'Chinese (simplified)',
        nativeName: '????????????',
        subtitle: true,
        encoding: ['GB18030'] /** Seems to work best. Tested: UTF8/UTF16/CP936/GB2312/GB2313/GB18030/Windows936/Big5 **/
    },
    'zh-tw': {
        name: 'Chinese (traditional)',
        nativeName: '????????????',
        subtitle: true,
        encoding: ['UTF8'] /** Seems to work best. Tested: UTF8/UTF16/CP936/GB2312/GB2313/GB18030/Windows936/Big5 **/
    },
    'zt': {
        name: 'Chinese (traditional)',
        nativeName: '????????????',
    }
};

// Handles language detection and internationalization
i18n.configure({
    defaultLocale: App.Localization.detectLocale(),
    locales: App.Localization.allTranslations,
    directory: './src/app/language'
});
