// creative the directives as re-usable components
require('@telogical/telui-core');
require('@telogical/telui-validate');

var React = require('react/addons');
var TelogicalUi = angular.module('TelUI');
var UI = require('../react/telui.js');

TelogicalUi
  .directive('teluiText', ['TelUIValidate',
    function (TelUIValidate) {
      'use strict';

      var scopeDefinition = {
        'id': '@',

        'value': '=?',
        'label': '@', //;abel text
        'title': '=?', //hide or show label
        'appearance': '@',
        'type': '@',
        'state': '@',

        'tooltip': '@',
        'placeholder': '@',
        'disabled': '=',
        'rows': '@',

        'iconActive': '@',
        'iconInactive': '@',
        'maxLength': '@'

      };

      var sco = TelUIValidate.extend(scopeDefinition);

      return {
        restrict: 'E',
        replace: true,
        template: '<div class="waffles"></div>',
        scope: sco,
        compile: function () {
          return {
            post: function link($scope, $element, $attrs) {
              var id = $scope.id || 'text_' + Math.round(Math.random() * 9999),
                $targetElement = $element;

              if (typeof $scope.text === 'undefined') {
                $scope.text = true;
              }

              $element.removeAttr('disabled');

              function renderReactText() {
                TelUIValidate.validate($scope, $attrs);

                var textModel = {
                  'id': id,
                  'key': id, // React requires a key attribute
                  'value': $scope.value,
                  'state': $scope.state,
                  'uiState': $scope.state || 'default',
                  'label': $scope.label,
                  'placeholder': $scope.placeholder,
                  'disabled': $scope.disabled,
                  'rows': $scope.rows, // number of multiline rows
                  'iconActive': $scope.iconActive,
                  'iconInactive': $scope.iconInactive,
                  'type': $scope.type,
                  'maxLength': $scope.maxlength,
                  'scopeObj': $scope
                };
                React.renderComponent(UI.Text(textModel), $targetElement[0]);
              }

              $scope
                .$watchCollection(
                  '[value, label, iconPrimary, iconSecondary, disabled, cssClass, text, click, state]',
                  renderReactText
                );
            }
          };
        }
      };
}]);