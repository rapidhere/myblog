/**
 * Error Handler
 */

var logger = require('../logger.js').get_logger();

var errorHandler = function(err, req, res, next) {
  // Log error
  logger.logError(req.ip, 'Error :\n' + JSON.stringify(err));

  res.status(500);
  res.send(JSON.stringify(err));
};

module.exports = function() {
  return errorHandler;
};
