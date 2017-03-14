"use strict";

try {
    angular.module("tadaTranslations");
} catch (e) {
    angular.module("tadaTranslations", [ "pascalprecht.translate" ]);
}

angular.module("tadaTranslations").config([ "$translateProvider", function($translateProvider) {
    var translations = {
        general: {
            YO: "Merhaba"
        }
    };
    $translateProvider.translations("tr", translations);
    $translateProvider.translations(translations);
    if ($translateProvider.preferredLanguage) {
        $translateProvider.preferredLanguage("tr");
    }
} ]).value("preferredLanguage", "tr");