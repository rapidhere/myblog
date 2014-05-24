/**
 * All items is loaded
 *
 * The start the server
 */

var logger = require('../logger.js').getLogger();

exports.boot = function(app) {
  logger.logInfo('N/A', 'Server started ...');

  // put app as global
  global.app = app;

  app.listen(app.get('port'));

  return true;
};
