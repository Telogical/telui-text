function UI() {
    'use strict';

    window.UI = window.UI || {Appearances: {}, Mixins: {}};
    var ui = window.UI;

    ui.Mixins = {
        List: require('./mixins/list')(),
        Widget: require('./mixins/widget')(),
        Appearance: require('./mixins/appearance')()
    };

    ui.Appearances = {
      button: require('./appearances/button')(ui),
      radio: require('./appearances/radio')(ui),
      checkbox: require('./appearances/checkbox')(ui),
      link: require('./appearances/button')(ui)
    };

    ui.Radio = require('./widgets/radio')(ui);
    ui.Radiogroup = require('./widgets/radiogroup')(ui);

    ui.Button = require('./widgets/button')(ui);
    ui.Checkbox = require('./widgets/checkbox')(ui);

    ui.Text = require('./widgets/text')(ui);

    ui.Table = require('./widgets/table')(ui);

    return ui;
}

module.exports = new UI();
