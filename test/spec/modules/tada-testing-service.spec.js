'use strict';

describe('Testing tada lib', function () {
  var demoService, thirdPartyService;

  beforeEach(function () {
    module('tadaDemoAppInternal');
    module('tadaDemoAppTestKit', function (tadaUtilsProvider) {
      tadaUtilsProvider.mock('thirdPartyService');
    });
    thirdPartyService = aThirdPartyServiceMock();
    demoService = aDemoService();
  });

  describe('asynchronous functions', function () {

    it('should call mock third party service in a service', inject(function () {
      var expected = 'my expected value';
      thirdPartyService.doSomething.returns(expected);

      var serviceResponse = demoService.methodThatUsesThirdPartyService();

      expect(serviceResponse).toEqual(expected);
    }));

    it('should support multiple request simultaneously', function () {
      var firstReturnValue = '1';
      var secondReturnValue = '2';

      var verifyCalled = jasmine.createSpy('verify');

      demoService.methodThatUsesThirdPartyServiceSimultaneously().then(function (serviceResponse) {
        expect(serviceResponse).toEqual([firstReturnValue, secondReturnValue]);
        verifyCalled();
      });

      thirdPartyService.doSomethingAsync.returns(firstReturnValue);
      thirdPartyService.doSomethingAsync.returns(secondReturnValue);

      expect(verifyCalled).toHaveBeenCalled();

    });

    it('should support multiple request simultaneously returns are determined before the calls', inject(function ($rootScope) {
      var firstReturnValue = '1';
      var secondReturnValue = '2';

      var verifyCalled = jasmine.createSpy('verify');

      thirdPartyService.doSomethingAsync.returns(firstReturnValue);
      thirdPartyService.doSomethingAsync.returns(secondReturnValue);

      demoService.methodThatUsesThirdPartyServiceSimultaneously().then(function (serviceResponse) {
        expect(serviceResponse).toEqual([firstReturnValue, secondReturnValue]);
        verifyCalled();
      });
      $rootScope.$digest();
      expect(verifyCalled).toHaveBeenCalled();

    }));
  });

  function aDemoService() {
    var demoService;
    inject(function (_demoService_) {
      demoService = _demoService_;
    });
    return demoService;
  }

  function aThirdPartyServiceMock() {
    var thirdPartyServiceMock;
    inject(function (thirdPartyService) {
      thirdPartyServiceMock = thirdPartyService;
    });
    return thirdPartyServiceMock;
  }
});
