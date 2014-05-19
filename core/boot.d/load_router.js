/*
 * Load logger from core module
 */

exports.boot = function(app) {
  var register_routes = require('../router.js').register_routes;

  register_routes(app);
};
