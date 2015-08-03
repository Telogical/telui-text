'use strict';

var TextDemo = require('../../scripts/app.js');

TextDemo
  .App
  .config(
    function ($stateProvider) {

      var basicConfigurationView = {
        url: '/basic-configuration',
        controller: 'basicConfigurationViewCtrl',
        templateUrl: 'basic-configuration/view-partial.html'
      };

      $stateProvider
        .state('TextDemo.basic-configuration', basicConfigurationView);
    });
