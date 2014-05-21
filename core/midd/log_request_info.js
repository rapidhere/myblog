/**
 * Log up request information when requests come
 */

var logger = require('../logger.js').get_logger();

var log_request_info = function(req, res, next) {
  logger.log_info(req.ip,
    'Request coming:\n' +
    '  url: ' + req.originalUrl + ' \n' +
    '  host: ' + req.host + ' \n' +
    '  cookie: ' + JSON.stringify(req.cookies)
  );

  next();
};

module.exports = function() {
  return log_request_info;
};
