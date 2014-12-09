'use strict';

require('../lib/matchers.protractor.js');
var MainPage = require('../pages/main-page.js');

describe('tadaApp Main Page', function () {
  var mainPage;

  beforeEach(function () {
    mainPage = new MainPage();
    browser.addMockModule('tadaAppMocks', function () {});
  });

  afterEach(function () {
    browser.removeMockModule('tadaAppMocks');
  });

  it('should load successfully', function () {
    mainPage.navigate();
    expect(mainPage.getTitle().getText()).toEqual('Enjoy coding! - Yeoman');
  });

});
