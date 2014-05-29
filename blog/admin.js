/**
 * Admin module for blog
 */
var render = require('../core/utils/template.js').render;

exports.adminMainPage = function(req, res) {
  return render(res, 'blog/admin-main');
};
