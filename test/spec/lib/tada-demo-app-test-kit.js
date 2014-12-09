'use strict';

angular.module('tadaDemoAppTestKit', ['tada'])
  .service('demoServiceMock', function (tadaUtils) {
    return {
      aSyncServiceMethod: tadaUtils.anAsyncFunc('async service method'),
      syncedMethod: tadaUtils.aSyncedFunc('service synced method')
    };
  });
