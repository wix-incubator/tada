'use strict';

describe('Testing tada lib', function () {
  var demoService, demoCtrl;

  beforeEach(function () {
    module('tadaDemoAppTestKit');
    module('tadaDemoAppInternal');
    demoService = aDemoServiceMock();
    demoCtrl = aDemoController();
  });

  describe('asynchronous functions', function () {

    it('should call mock service in controller', inject(function () {
      var serviceResponse;
      demoCtrl.callServiceWithAsyncMethod().then(function (response) {
        serviceResponse = response;
      });

      var expectedResponse = 'moki';
      demoService.aSyncServiceMethod.returns(expectedResponse);

      expect(serviceResponse).toEqual(expectedResponse);
    }));

    it('should resolve successfully only in case of expected args', function () {
      var serviceResponse;
      demoCtrl.callServiceWithAsyncMethod().then(function (response) {
        serviceResponse = response;
      });

      var expectedResponseForArgs = 'expected result';
      demoService.aSyncServiceMethod.whenCalledWithArgs('first arg', 'second arg').returns(expectedResponseForArgs);

      expect(serviceResponse).toEqual(expectedResponseForArgs);
    });

    it('should reject successfully when called with expected args', function () {
      var serviceResponse;
      demoCtrl.callServiceWithAsyncMethod().catch(function (response) {
        serviceResponse = response;
      });

      var expectedResponseForArgs = 'expected result';
      demoService.aSyncServiceMethod.whenCalledWithArgs('first arg', 'second arg').rejects(expectedResponseForArgs);

      expect(serviceResponse).toEqual(expectedResponseForArgs);
    });

    it('should support two definitions of the same method with different args', function () {
      var res1, res2;
      demoService.aSyncServiceMethod('first arg', 'second arg').then(function (response) {
        res1 = response;
      });
      demoService.aSyncServiceMethod.whenCalledWithArgs('first arg', 'second arg').returns('1');

      demoService.aSyncServiceMethod('AAA').then(function (response) {
        res2 = response;
      });
      demoService.aSyncServiceMethod.whenCalledWithArgs('AAA').returns('2');
      expect(res1 && res2).toBeTruthy();
      expect(res1).toEqual('1');
      expect(res2).toEqual('2');
    });
  });

  describe('synchronous functions', function () {

    it('should call mock service in controller', function () {
      var expectedResponse = 'moki';
      demoService.syncedMethod.returns(expectedResponse);

      var serviceResponse = demoCtrl.callServiceWithSyncedMethod();
      expect(serviceResponse).toEqual(expectedResponse);
    });

  });

  function aDemoServiceMock() {
    var demoService;
    inject(function (demoServiceMock) {
      demoService = demoServiceMock;
    });
    return demoService;
  }

  function aDemoController() {
    var ctrl;
    inject(function ($controller, $rootScope) {
      ctrl = $controller('DemoController', {
        $scope: $rootScope.$new(),
        demoService: demoService
      });
    });
    return ctrl;
  }

});
