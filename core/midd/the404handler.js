/**
 * Handle 404 Error
 */

var logger = require('../logger.js').get_logger();

var the404handler = function(req, res, next) {
  logger.log_warning(req.ip, 'Unknown request: '  + req.path);

  res.status(404);
  res.type('txt').send('Unknown path: ' + req.path);

  return;
};

module.exports = function() {
  return the404handler;
};
