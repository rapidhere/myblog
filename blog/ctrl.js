var render = require('../core/utils/template.js').render;
var _ = require('underscore');

// The blog mainpage
exports.index = function(req, res) {
  render(res, 'blog/index');
};

// Import admin pages
var admin = require('./admin.js');

_.each(admin, function(val, key) {
  exports[key] = val;
});
