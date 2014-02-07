/*
 * Some helpers
 */

var path = require('path');

// add static_root before static file path
var resolve_static;
exports.resolve_static = resolve_static = function(path) {
  return path.join(
    global.app.get('static_root'), path);
};
