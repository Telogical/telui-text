global.UI = global.UI || require('@telogical/telui-core');

global.UI.Text = require('./widgets/text')(global.UI);

module.exports = global.UI;
