require('@telogical/telui-validate');

var UI = require('../react/telui'),
  React = UI.Core.React;

angular
  .module('TelUI')
  .directive('teluiText', [
    'TelUIValidate',
    function (TelUIValidate) {
      'use strict';


      function link($scope, $element, $attrs) {
        var id = $scope.id || 'text_' + Math.round(Math.random() * 9999),
          $targetElement = $element;

        $scope.text = ($scope.text === 'false') ? false : true;
        $element.removeAttr('disabled');

        function renderReactText() {
          TelUIValidate.validate($scope, $attrs);

          var textModel = {
            'id': id,
            'key': id, // React requires a key attribute
            'value': $scope.value,
            'state': $scope.state,
            'text': $scope.text,
            'uiState': $scope.state || 'default',
            'label': $scope.label,
            'placeholder': $scope.placeholder,
            'disabled': $scope.disabled,
            'rows': $scope.rows, // number of multiline rows
            'iconActive': $scope.iconActive,
            'iconInactive': $scope.iconInactive,
            'type': $scope.type || 'text',
            'maxLength': $scope.maxlength,
            'scopeObj': $scope
          };
          React.renderComponent(UI.Text(textModel), $targetElement[0]);
        }

        $scope
          .$watchCollection(
            '[value, label, iconPrimary, iconSecondary, disabled, cssClass, text, click, state, type]',
            renderReactText
          );
      }

      var scopeDefinition = {
        'id': '@',

        'value': '=?',
        'label': '@', //;abel text
        'title': '=?',
        'appearance': '@',
        'type': '@',
        'state': '@',

        'tooltip': '@',
        'placeholder': '@',
        'disabled': '=',
        'rows': '@',

        'iconActive': '@',
        'iconInactive': '@',
        'maxLength': '@',

        'text': '@' //hide or show label
      };

      var sco = TelUIValidate.extend(scopeDefinition);

      return {
        restrict: 'E',
        replace: true,
        template: '<div class="waffles"></div>',
        scope: sco,
        link: link
      };
}]);