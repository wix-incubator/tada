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
            var calls = [];
            var callsIndex = 0;
            var returnsIndex = 0;
            var calledWithArgs;
            var spy = jasmine.createSpy(name);
            spy.fake = spy.andCallFake || spy.and.callFake;
            var func = spy.fake(function() {
                var defer;
                if (calls[callsIndex]) {
                    defer = calls[callsIndex].promise;
                } else {
                    defer = $q.defer();
                    calls.push({
                        promise: defer,
                        args: serializeArgs(arguments)
                    });
                }
                callsIndex++;
                return defer.promise;
            });
            func.returns = function(value) {
                if (returnsIndex < callsIndex) calls.shift().promise.resolve(value); else {
                    var defer = $q.defer();
                    calls.push({
                        promise: defer,
                        args: []
                    });
                    defer.resolve(value);
                }
                returnsIndex++;
                $rootScope.$digest();
            };
            func.whenCalledWithArgs = function() {
                var expectedCalledArgs = serializeArgs(arguments);
                return {
                    returns: function(value) {
                        if (expectedCalledArgs === calls[returnsIndex].args) {
                            calls[returnsIndex].promise.resolve(value);
                            $rootScope.$digest();
                            returnsIndex++;
                        }
                    },
                    rejects: function(value) {
                        calls[returnsIndex].promise.reject(value);
                        $rootScope.$digest();
                        returnsIndex++;
                    }
                };
            };
            func.rejects = function(value) {
                calls[returnsIndex].promise.reject(value);
                $rootScope.$digest();
                returnsIndex++;
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