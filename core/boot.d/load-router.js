/*
 * Load logger from core module
 */

exports.boot = function(app) {
  var registerRoutes = require('../router.js').registerRoutes;

  registerRoutes(app);

  return true;
};
