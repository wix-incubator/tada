'use strict';

(function () {

  /* @ngInject */
  function ThirdPartyService() {

    this.doSomething = function () {
      return 'what do u want me to do??';
    };
  }

  angular
    .module('tadaDemoAppInternal')
    .service('thirdPartyService', ThirdPartyService);
})();
