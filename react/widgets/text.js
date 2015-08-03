require('@telogical/telui-label');

function Text(ui) {
  'use strict';

  var React = ui.Core.React,
    _ = ui.Core._;

  return React.createClass({
    displayName: 'Text',
    mixins: [ui.Mixins.Widget, ui.Mixins.Appearance],
    getInitialState: function getInitialState() {
      return {
        'id': '',
        'label': '',
        'focus': false
      };
    },

    __onChange: function onChange(eve) {
      var teluiTextScope = this.props.scopeObj;

      if (this.props.disabled) {
        return;
      }

      teluiTextScope.$apply(function doTextChange($scope) {
        var len = $scope.maxlength ?
          $scope.maxlength :
          eve.target.value.length;

        $scope.value = eve.target.value.substr(0, len);
      });
    },

    __onClick: function () {
      //click handler
    },

    __onFocus: function onFocus(eve) {
      this.setState({
        focus: true
      });
    },

    __onBlur: function onBlur(eve) {

      this.setState({
        focus: false
      });
    },

    __onCloseIconClick: function __onCloseIconClick() {
      var teluiTextScope = this.props.scopeObj;
      teluiTextScope.$apply(function clearText($scope) {
        $scope.value = '';
      });

      this.refs.input.getDOMNode().focus();
    },

    render: function render() {
      var cx = React.addons.classSet,
        domx = React.DOM;

      var model = this.props,
        key = model.key || model.id,
        id = model.key || model.id,
        row = 'w-alpha w-12 w-omega',
        type = model.type;

      //parent
      var frameClasses = {
        'ui-widget': true,
        'waffles': true,
        'ui-text': true,
        'ui-state-default': true,
        'ui-state-disabled': model.disabled
      };

      frameClasses = this.__applyUiStates.call(this, frameClasses);

      var frameAttrs = {
        'id': key + '_li',
        'key': key + '_li',
        'className': cx(frameClasses),
        onMouseEnter: this.__onMouseEnter.bind(null, this),
        onMouseLeave: this.__onMouseLeave.bind(null, this),
        onMouseDown: this.__onMouseDown.bind(null, this),
        onMouseUp: this.__onMouseUp.bind(null, this),
      };

      //Input
      var textInputClasses = {
          'ui-state-default': true,
          'ui-text-input': true,
          'ui-state-hover': this.state.hover,
          'ui-state-focus': this.state.focus,
          'ui-state-disabled': model.disabled
        },
        textInputAttrs = {
          'id': key + '_input',
          'key': key + '_input',
          'className': cx(textInputClasses),
          'onChange': this.__onChange,
          'placeholder': this.props.placeholder,
          'value': this.props.value,
          'onFocus': this.__onFocus,
          'onBlur': this.__onBlur,
          'onClick': this.__onClick,
          'type': type,
          'ref': 'input'
        };

      if (model.rows) {
        textInputAttrs.rows = model.rows;
      }

      if (model.disabled) {
        textInputAttrs.disabled = true;
      }

      //label
      var labelFrameAttrs = {
          className: row
        },
        labelAttrs = {
          'id': key + '_label',
          'key': key + '_label',
          className: 'ui-text-label ui-state-default',
          ref: 'label'
        };

      var inputFrame = {
        className: row
      };

      var label = domx.div(labelFrameAttrs, domx.label(labelAttrs, model.label)),
        inputType = model.rows ? 'textarea' : 'input',
        input = domx.div(inputFrame, domx[inputType](textInputAttrs)),
        contents = [];

      if (model.text !== false) {
        contents.push(label);
      }

      if (model.value && !model.rows && type === 'search') {
        //close Icon
        var closeIconFrameClasses = {
            'ui-text-closeicon-frame': true,
          },
          closeIconFrameAttrs = {
            'id': key + '_closeIconFrame',
            'key': key + '_closeIconFrame',
            'className': cx(closeIconFrameClasses),
            'onClick': this.__onCloseIconClick,
          },
          closeIconButtonClasses = {
            'ui-icon': true,
            'ui-icon-close': true,
            'ui-text-closeicon': true,
            'ui-state-default': true
          },
          closeIconButtonAttrs = {
            'id': key + '_closeIconButton',
            'key': key + '_closeIconButton',
            'className': cx(closeIconButtonClasses),
            'onClick': this.__onCloseIconClick,
            'ref': 'closeicon'
          };

        var closeIconButton = domx.span(closeIconButtonAttrs),
          closeIconFrame = domx.div(closeIconFrameAttrs, closeIconButton);

        contents.push(closeIconFrame);
      } else {
        //this totally sucks, but it is to prevent loss of focus on the input
        // by maintaing the same # of dom elements
        contents.push(domx.div(null, null));
      }

      contents.push(input);

      return domx.div(frameAttrs, contents);
    }
  });
}

module.exports = Text;