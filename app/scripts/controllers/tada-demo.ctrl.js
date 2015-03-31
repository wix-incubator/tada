'use strict';

(function () {

  /* @ngInject */
  function DemoController(demoService) {
    this.callServiceWithAsyncMethod = function () {
      return demoService.asyncServiceMethod('first arg', 'second arg').then(function (response) {
        return response;
      });
    };

    this.callServiceWithSyncedMethod = function () {
      return demoService.syncedMethod();
    };
  }

  angular
    .module('tadaDemoAppInternal')
    .controller('DemoController', DemoController);

})();
