/**
 * All items is loaded
 *
 * The start the server
 */

var logger = require('../logger.js').get_logger();

exports.boot = function(app) {
  logger.log_info('N/A', 'Server started ...');

  app.listen(app.get('port'));

  return true;
};
