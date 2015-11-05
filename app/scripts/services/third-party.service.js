'use strict';

(function () {

  /* @ngInject */
  function ThirdPartyService() {

    this.doSomething = function () {
      return 'what do u want me to do??';
    };

    this.doSomethingAsync = function () {
      return 'what do u want me to do async??';
    };
  }

  angular
    .module('tadaDemoAppInternal')
    .service('thirdPartyService', ThirdPartyService);
})();
