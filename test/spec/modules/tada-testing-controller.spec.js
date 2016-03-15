'use strict';

describe('Testing tada lib', function () {
  var demoService, demoCtrl;

  beforeEach(function () {
    module('tadaDemoAppInternal');
    module('tadaDemoAppTestKit', function (tadaUtilsProvider) {
      tadaUtilsProvider.mock('demoService');
    });
  });

  beforeEach(inject(function (_demoService_) {
    demoService = _demoService_;
    demoCtrl = aDemoController();
  }));

  describe('asynchronous functions', function () {

    it('should call mock service in controller', inject(function () {
      var serviceResponse;
      demoCtrl.callServiceWithAsyncMethod().then(function (response) {
        serviceResponse = response;
      });

      var expectedResponse = 'moki';
      demoService.asyncServiceMethod.returns(expectedResponse);

      expect(serviceResponse).toEqual(expectedResponse);
    }));

    it('should call mock service in controller and reject', inject(function () {
      var failSpy = jasmine.createSpy('fail');
      demoCtrl.callServiceWithAsyncMethod().catch(failSpy);
      demoService.asyncServiceMethod.rejects('my reject msg');
      expect(failSpy).toHaveBeenCalledWith('my reject msg');
    }));

    it('should call mock service in controller and reject (reject before call)', inject(function ($rootScope) {
      var failSpy = jasmine.createSpy('fail');
      demoService.asyncServiceMethod.rejects();
      demoCtrl.callServiceWithAsyncMethod().catch(failSpy);
      $rootScope.$digest();
      expect(failSpy).toHaveBeenCalled();
    }));

    it('should resolve successfully only in case of expected args', function () {
      var serviceResponse;
      demoCtrl.callServiceWithAsyncMethod().then(function (response) {
        serviceResponse = response;
      });

      var expectedResponseForArgs = 'expected result';
      demoService.asyncServiceMethod.whenCalledWithArgs('first arg', 'second arg').returns(expectedResponseForArgs);

      expect(serviceResponse).toEqual(expectedResponseForArgs);
    });

    it('should reject successfully when called with expected args', function () {
      var serviceResponse;
      demoCtrl.callServiceWithAsyncMethod().catch(function (response) {
        serviceResponse = response;
      });

      var expectedResponseForArgs = 'expected result';
      demoService.asyncServiceMethod.whenCalledWithArgs('first arg', 'second arg').rejects(expectedResponseForArgs);

      expect(serviceResponse).toEqual(expectedResponseForArgs);
    });

    it('should support two definitions of the same method with different args', function () {
      var res1, res2;
      demoService.asyncServiceMethod('first arg', 'second arg').then(function (response) {
        res1 = response;
      });
      demoService.asyncServiceMethod.whenCalledWithArgs('first arg', 'second arg').returns('1');

      demoService.asyncServiceMethod('AAA').then(function (response) {
        res2 = response;
      });
      demoService.asyncServiceMethod.whenCalledWithArgs('AAA').returns('2');
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

    it('should support when called with args for sync functions', function () {
      var expected = 'my expected value';
      var myArg = 'my-arg';

      demoService.syncedMethod.whenCalledWithArgs(myArg).returns(expected);

      var firstResult = demoService.syncedMethod('some other arg');
      expect(firstResult).not.toBeDefined();

      var secondResult = demoService.syncedMethod(myArg);
      expect(secondResult).toEqual(expected);
    });

  });

  describe('Cyclic arguments', function () {
    var cycle = [];
    cycle.push(cycle);
    
    describe('Synced method', function () {
      it('should support cyclic arguments in mock', function () {
        expect(function () {
          demoService.syncedMethod(cycle)
        }).not.toThrow();
      });

      it('should support cyclic arguments for whenCalledWithArgs', function () {
        expect(function () {
          demoService.syncedMethod.whenCalledWithArgs(cycle);
        }).not.toThrow();
      });
    });
    
    describe('Ansynced method', function () {
      it('should support cyclic arguments in mock', function () {
        expect(function () {
          demoService.asyncServiceMethod(cycle)
        }).not.toThrow();
      });

      it('should support cyclic arguments for whenCalledWithArgs', function () {
        expect(function () {
          demoService.asyncServiceMethod.whenCalledWithArgs(cycle);
        }).not.toThrow();
      });
    });
  });

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
