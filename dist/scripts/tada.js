"use strict";

angular.module("tada", []).provider("tadaUtils", [ "$provide", function($provide) {
    this.mock = function() {
        var args = Array.prototype.slice.call(arguments);
        args.forEach(function(service) {
            $provide.service(service, [ "$injector", function($injector) {
                return $injector.get(service + "Mock");
            } ]);
        });
    };
    this.$get = [ "$q", "$rootScope", function($q, $rootScope) {
        function serializeArgs(args) {
            return JSON.stringify(Array.prototype.slice.call(args));
        }
        function createAsyncFunc(name) {
            var defer = $q.defer();
            var firstCall = true;
            var calledWithArgs;
            var spy = jasmine.createSpy(name);
            spy.fake = spy.andCallFake || spy.and.callFake;
            var func = spy.fake(function() {
                calledWithArgs = serializeArgs(arguments);
                defer = firstCall ? defer : $q.defer();
                firstCall = false;
                return defer.promise;
            });
            func.returns = function(value) {
                defer.resolve(value);
                $rootScope.$digest();
            };
            func.whenCalledWithArgs = function() {
                var expectedCalledArgs = serializeArgs(arguments);
                return {
                    returns: function(value) {
                        if (expectedCalledArgs === calledWithArgs) {
                            defer.resolve(value);
                            $rootScope.$digest();
                        }
                    },
                    rejects: function(value) {
                        defer.reject(value);
                        $rootScope.$digest();
                    }
                };
            };
            func.rejects = function(value) {
                defer.reject(value);
                $rootScope.$digest();
            };
            return func;
        }
        function createFunc(name) {
            var calledWithArgs;
            var spy = jasmine.createSpy(name);
            spy.fake = spy.andCallFake || spy.and.callFake;
            var func = spy.fake(function() {
                calledWithArgs = serializeArgs(arguments);
            });
            func.returns = function(value) {
                func.realReturn = func.andReturn || func.and.returnValue;
                func.realReturn(value);
            };
            func.whenCalledWithArgs = function() {
                var expectedCalledArgs = serializeArgs(arguments);
                return {
                    returns: function(value) {
                        func.fake = func.andCallFake || func.and.callFake;
                        return func.fake(function() {
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
    } ];
} ]);