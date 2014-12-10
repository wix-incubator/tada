'use strict';

(function () {

  /* @ngInject */
  function DemoService($q, $timeout, thirdPartyService) {

    this.aSyncServiceMethod = function () {
      var defer = $q.defer();

      $timeout(function () {
        defer.resolve('resolved after timeout');
      }, 200);

      return defer.promise;
    };

    this.syncedMethod = function () {
      return 'real response value';
    };

    this.methodThatUsesThirdPartyService = function () {
      return thirdPartyService.doSomething();
    };
  }

  angular
    .module('tadaDemoAppInternal')
    .service('demoService', DemoService);
})();
