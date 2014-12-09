'use strict';

describe('Controller: MainController', function () {

  // load the controller's module
  beforeEach(function () {
    module('tadaAppInternal');

    //add your mocks here
  });

  var MainController, scope;

  // Initialize the controller and a mock scope
  function aController() {
    inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      MainController = $controller('MainController', {
        $scope: scope
      });
    });
  }

  it('should attach a list of awesomeThings to the controller', function () {
    aController();
    expect(MainController.awesomeThings.length).toBe(6);
  });
});
