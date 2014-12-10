'use strict';

describe('Testing tada lib', function () {
  var demoService, thirdPartyService;

  beforeEach(function () {
    module('tadaDemoAppTestKit');
    module('tadaDemoAppInternal');
    injectModuleWithMockThirdPartyService();
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

  function injectModuleWithMockThirdPartyService() {
    module(function ($provide) {
      $provide.service('thirdPartyService', function (thirdPartyServiceMock) {
        return thirdPartyServiceMock;
      });
    });
  }

});
