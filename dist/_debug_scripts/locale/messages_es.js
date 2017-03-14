'use strict';

try {
  angular.module('tadaTranslations');
} catch (e) {
  angular.module('tadaTranslations', ['pascalprecht.translate']);
}

angular.module('tadaTranslations').config(['$translateProvider',
  function ($translateProvider) {
    var translations = {
      'general': {
        'YO': '¡Hola'
      }
    };
    $translateProvider.translations('es', translations);
    $translateProvider.translations(translations);
    if ($translateProvider.preferredLanguage) {
      $translateProvider.preferredLanguage('es');
    }
  }
]).value('preferredLanguage', 'es');
