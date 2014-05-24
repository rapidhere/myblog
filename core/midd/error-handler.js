/**
 * Error Handler
 */

var logger = require('../logger.js').getLogger();
var app = global.app; 

var errorHandler = function(err, req, res, next) {
  // Log error
  logger.logError(req.ip, 'Error Occurred:\n' + err.stack);

  res.status(500);

  if(app.get('debug')) {
    res.send('Server Error:\n' + err.stack);
  } else {
    res.send('Internal Server Error, please contact ' + app.get('root_mail'));
  }
  
  if(app.get('debug')) {
    next(err.stack);
  }
};

module.exports = function() {
  return errorHandler;
};
