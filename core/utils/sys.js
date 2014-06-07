/**
 * Some helpful functions in core-level
 */
var logger = require('../logger.js').getLogger();
var app = global.app;
var renderError = require('./template.js').renderError;
var crypto = require('crypto');

// The standard Runtime Error Handler
// The Runtime Error specify the error unhandled or crtical in runtime
var handleRuntimeError;
exports.handleRuntimeError = handleRuntimeError =
function(err, req, res, next) {
  // Log error
  logger.logError(req.ip, 'Error Occurred:\n' + err.stack);

  res.status(500);

  if(app.get('debug')) {
    res.send('Server Error:\n' + err.stack);
  } else {
    renderError(req, res, '<p>' + 
      '<strong>Internal Server Error</strong>: please contact ' +
      app.get('root_mail') + '</p>');
  }

  if(app.get('debug')) {
    if(next) {
      console.log(err.stack);
    } else {
      console.log(err.stack);
    }
  }
};

// Hash password
var hashPassword;
exports.hashPassword = hashPassword = function(pass) {
  var sha1 = crypto.createHash('sha1');
  sha1.update(pass);

  return sha1.digest('hex');
};
