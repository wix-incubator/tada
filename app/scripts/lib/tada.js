/**
 * Created by Ofir_Dagan on 12/9/14.
 */
'use strict';
angular.module('tada', [])
  .service('tadaUtils', function ($q, $rootScope) {

    function serializeArgs(args) {
      return JSON.stringify(Array.prototype.slice.call(args));
    }

    function createAsyncFunc(name) {
      var defer = $q.defer();
      var firstCall = true;
      var calledWithArgs;

      var func = jasmine.createSpy(name).andCallFake(function () {
        calledWithArgs = serializeArgs(arguments);
        defer = firstCall ? defer : $q.defer();
        firstCall = false;
        return defer.promise;
      });

      func.returns = function (value) {
        defer.resolve(value);
        $rootScope.$digest();
      };

      func.whenCalledWithArgs = function () {
        var expectedCalledArgs = serializeArgs(arguments);
        return {
          returns: function (value) {
            if (calledWithArgs === expectedCalledArgs) {
              defer.resolve(value);
              $rootScope.$digest();
            }
          }
        };
      };

      func.rejects = function (value) {
        defer.reject(value);
        $rootScope.$digest();
      };

      return func;
    }

    function createSyncFunc(name) {
      var func = jasmine.createSpy(name);

      func.returns = function (value) {
        func.andReturn(value);
      };

      return func;
    }

    this.aSyncedFunc = createSyncFunc;
    this.anAsyncFunc = createAsyncFunc;
  });