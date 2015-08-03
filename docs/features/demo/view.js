'use strict';

var TextDemo = require('../../scripts/app.js');

TextDemo
  .App
  .config(
    function ($stateProvider) {

      var demoView = {
        url: '/demo',
        controller: 'demoViewCtrl',
        templateUrl: 'demo/view-partial.html'
      };

      $stateProvider
        .state('TextDemo', demoView);
    });
