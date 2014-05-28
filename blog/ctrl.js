var render = require('../core/utils/template.js').render;

exports.index = function(req, res) {
  render(res, 'blog/index');
};
