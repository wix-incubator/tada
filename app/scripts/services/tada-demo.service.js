'use strict';

(function () {

  /* @ngInject */
  function DemoService($q, $timeout) {
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
  }

  angular
    .module('tadaDemoAppInternal')
    .service('demoService', DemoService);
})();
