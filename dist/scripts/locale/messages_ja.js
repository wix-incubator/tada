"use strict";

try {
    angular.module("tadaTranslations");
} catch (e) {
    angular.module("tadaTranslations", [ "pascalprecht.translate" ]);
}

angular.module("tadaTranslations").config([ "$translateProvider", function($translateProvider) {
    var translations = {
        general: {
            YO: "こんにちは"
        }
    };
    $translateProvider.translations("ja", translations);
    $translateProvider.translations(translations);
    if ($translateProvider.preferredLanguage) {
        $translateProvider.preferredLanguage("ja");
    }
} ]).value("preferredLanguage", "ja");