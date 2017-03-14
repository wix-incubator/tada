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
        'YO': '안녕하세요'
      }
    };
    $translateProvider.translations('ko', translations);
    $translateProvider.translations(translations);
    if ($translateProvider.preferredLanguage) {
      $translateProvider.preferredLanguage('ko');
    }
  }
]).value('preferredLanguage', 'ko');
