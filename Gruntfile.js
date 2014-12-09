// Generated on 2014-12-09 using generator-wix-angular 0.1.73
'use strict';

module.exports = function (grunt) {
  var unitTestFiles = [];
  require('./karma.conf.js')({set: function (karmaConf) {
    unitTestFiles = karmaConf.files.filter(function (value) {
      return value.indexOf('bower_component') !== -1;
    });
  }});
  require('wix-gruntfile')(grunt, {
    staging: 'pizza', //modify to your staging environment
    subdomain: 'www', //modify to your sub-domain
    cdnify: 'vm',
    port: 9000,
    preloadModule: 'tadaAppInternal',
    translationsModule: 'tadaTranslations',
    unitTestFiles: unitTestFiles,
    protractor: true,
    bowerComponent: true
  });
  var e2eTaskIndex = grunt.hookTask('build').indexOf('e2e:normal');
  if (e2eTaskIndex !== -1) {
    grunt.hookTask('build').splice(e2eTaskIndex, 1);
  }

  //Follow this URL for instructions on how to override built-in definitions:
  //https://github.com/wix/wix-gruntfile/blob/master/README.md
};
