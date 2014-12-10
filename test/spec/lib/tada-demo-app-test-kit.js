'use strict';

angular.module('tadaDemoAppTestKit', ['tada'])
  .service('demoServiceMock', function (tadaUtils) {
    this.aSyncServiceMethod = tadaUtils.anAsyncFunc('async service method');
    this.syncedMethod = tadaUtils.aSyncedFunc('service synced method');
  })
  .service('thirdPartyServiceMock', function (tadaUtils) {
    this.doSomething = tadaUtils.aSyncedFunc('do something');
  });
