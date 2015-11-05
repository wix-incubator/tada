'use strict';

(function () {

  /* @ngInject */
  function DemoService($q, $timeout, thirdPartyService) {

    this.asyncServiceMethod = function () {
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

    this.methodThatUsesThirdPartyServiceSimultaneously = function () {
      return $q.all([thirdPartyService.doSomethingAsync(), thirdPartyService.doSomethingAsync()]);
    };
  }

  angular
    .module('tadaDemoAppInternal')
    .service('demoService', DemoService);
})();
