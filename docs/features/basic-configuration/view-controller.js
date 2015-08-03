'use strict';

var TextDemo = require('../../scripts/app.js');

TextDemo
    .Controllers
    .controller('basicConfigurationViewCtrl', function basicConfigurationCtrl($scope, mock) {
        
        var people = mock.entity('people');
    
    
        console.log('people', people.length);
    
        $scope.disabled = false;
        $scope.people = people;
        $scope.singleCheckValue = false;
    });
