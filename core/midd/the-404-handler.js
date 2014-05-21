/**
 * Handle 404 Error
 */

var logger = require('../logger.js').getLogger();

var the404Handler = function(req, res, next) {
  logger.logWarning(req.ip, 'Unknown request: '  + req.path);

  res.status(404);
  res.type('txt').send('Unknown path: ' + req.path);

  return;
};

module.exports = function() {
  return the404Handler;
};
