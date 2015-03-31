'use strict';

angular.module('tadaDemoAppTestKit', ['tada'])
  .service('demoServiceMock', function (tadaUtils) {
    this.asyncServiceMethod = tadaUtils.createAsyncFunc('async service method');
    this.syncedMethod = tadaUtils.createFunc('service synced method');
  })
  .service('thirdPartyServiceMock', function (tadaUtils) {
    this.doSomething = tadaUtils.createFunc('do something');
  });
