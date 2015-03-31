/**
 * Created by Ofir_Dagan on 12/9/14.
 */
'use strict';
angular.module('tada', [])
  .provider('tadaUtils', ["$provide", function ($provide) {
    this.mock = function () {
      var args = Array.prototype.slice.call(arguments);
      args.forEach(function (service) {
        $provide.service(service, ["$injector", function ($injector) {
          return $injector.get(service + 'Mock');
        }]);
      });
    };
    this.$get = ["$q", "$rootScope", function ($q, $rootScope) {
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
              if (expectedCalledArgs === calledWithArgs) {
                defer.resolve(value);
                $rootScope.$digest();
              }
            },
            rejects: function (value) {
              defer.reject(value);
              $rootScope.$digest();
            }
          };
        };
        func.rejects = function (value) {
          defer.reject(value);
          $rootScope.$digest();
        };
        return func;
      }

      function createFunc(name) {
        var calledWithArgs;
        var func = jasmine.createSpy(name).andCallFake(function () {
          calledWithArgs = serializeArgs(arguments);
        });

        func.returns = function (value) {
          func.andReturn(value);
        };

        func.whenCalledWithArgs = function () {
          var expectedCalledArgs = serializeArgs(arguments);
          return {
            returns: function (value) {
              return func.andCallFake(function () {
                if (serializeArgs(arguments) === expectedCalledArgs) {
                  return value;
                }
              });
            }
          };
        };
        return func;
      }

      return {
        aSyncedFunc: createFunc,
        anAsyncFunc: createAsyncFunc,
        createFunc: createFunc,
        createAsyncFunc: createAsyncFunc
      };
    }]
  }]);