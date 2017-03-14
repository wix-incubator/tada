"use strict";

try {
    angular.module("tadaTranslations");
} catch (e) {
    angular.module("tadaTranslations", [ "pascalprecht.translate" ]);
}

angular.module("tadaTranslations").config([ "$translateProvider", function($translateProvider) {
    var translations = {
        general: {
            YO: "Ciao"
        }
    };
    $translateProvider.translations("it", translations);
    $translateProvider.translations(translations);
    if ($translateProvider.preferredLanguage) {
        $translateProvider.preferredLanguage("it");
    }
} ]).value("preferredLanguage", "it");