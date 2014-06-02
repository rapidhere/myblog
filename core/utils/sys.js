/**
 * Some helpful functions in core-level
 */
var logger = require('../logger.js').getLogger();
var app = global.app;

// The standard Runtime Error Handler
// The Runtime Error specify the error unhandled or crtical in runtime
var handleRuntimeError;
exports.handleRuntimeError = handleRuntimeError = function(err, req, res, next) {
  // Log error
  logger.logError(req.ip, 'Error Occurred:\n' + err.stack);

  res.status(500);

  if(app.get('debug')) {
    res.send('Server Error:\n' + err.stack);
  } else {
    res.send('Internal Server Error, please contact ' + app.get('root_mail'));
  }

  if(app.get('debug')) {
    if(next) {
      next(err.stack);
    } else {
      console.log(err.stack);
    }
  }
};
