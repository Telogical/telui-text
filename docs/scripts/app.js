'use strict';
var appDependencies = [
    'ui.router',
    'TelUI',
    'TextDemoDirectives',
    'TextDemoControllers',
    'TextDemoServices',
    'TextDemoValues',
    'TextDemoPartials',
];

var TextDemo = {
    App: angular.module('TextDemoApp', appDependencies),
    Directives: angular.module('TextDemoDirectives', []),
    Controllers: angular.module('TextDemoControllers', []),
    Services: angular.module('TextDemoServices', []),
    Values: angular.module('TextDemoValues', []),
    Partials: angular.module('TextDemoPartials', []),
    Telui: angular.module('TelUI')
};

function stateChangeError(event, toState, toParams, fromState) {
    console.log('!EVENT!', event);
    console.log('!TOSTATE!', toState);
    console.log('!TOPARAMS!', toParams);
    console.log('$stateChangeError to "' + toState.name + '" from state "' + fromState.name + '"- fired when the transition begins. toState,toParams : \n', toState, toParams);
}

function stateNotfound(event, unfoundState, fromState, fromParams) {
    console.log('$stateNotFound ' + unfoundState.to + '  - fired when a state cannot be found by its name.');
    console.log(unfoundState, fromState, fromParams);
}

function debug($rootScope) {
    $rootScope.$on('$stateChangeError', stateChangeError);
    $rootScope.$on('$stateNotFound', stateNotfound);
}

function run($rootScope) {
    $rootScope.skin = $rootScope.skin || '_Blank';
    debug($rootScope);
}

TextDemo
    .App
    .run(run);

module.exports = TextDemo;
