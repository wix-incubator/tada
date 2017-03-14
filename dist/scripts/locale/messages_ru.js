"use strict";

try {
    angular.module("tadaTranslations");
} catch (e) {
    angular.module("tadaTranslations", [ "pascalprecht.translate" ]);
}

angular.module("tadaTranslations").config([ "$translateProvider", function($translateProvider) {
    var translations = {
        general: {
            YO: "привет"
        }
    };
    $translateProvider.translations("ru", translations);
    $translateProvider.translations(translations);
    if ($translateProvider.preferredLanguage) {
        $translateProvider.preferredLanguage("ru");
    }
} ]).value("preferredLanguage", "ru");