var render = require('../core/utils/template.js').render;

exports.mainpage = function(req, res) {
  render(req, res, 'mainpage');
};
