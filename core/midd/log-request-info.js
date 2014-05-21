/**
 * Log up request information when requests come
 */

var logger = require('../logger.js').getLogger();

var logRequestInfo = function(req, res, next) {
  logger.logInfo(req.ip,
    'Request coming:\n' +
    '  url: ' + req.originalUrl + ' \n' +
    '  host: ' + req.host + ' \n' +
    '  cookie: ' + JSON.stringify(req.cookies)
  );

  next();
};

module.exports = function() {
  return logRequestInfo;
};
