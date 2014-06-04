/**
 * Some helpful functions in core-level
 */
var logger = require('../logger.js').getLogger();
var app = global.app;
var _ = require('underscore');
var renderError = require('./template.js').renderError;
var crypto = require('crypto');

// The standard Runtime Error Handler
// The Runtime Error specify the error unhandled or crtical in runtime
var handleRuntimeError;
exports.handleRuntimeError = handleRuntimeError = function(err, req, res, next, resp_flag) {
  // Log error
  logger.logError(req.ip, 'Error Occurred:\n' + err.stack);

  res.status(500);
  
  if(resp_flag === undefined || resp_flag) {
    // Need response
    if(app.get('debug')) {
      res.send('Server Error:\n' + err.stack);
    } else {
      renderError(req, res, '<p>' + '<strong>Internal Server Error</strong>: please contact ' + app.get('root_mail') + '</p>');
    }
  }

  if(app.get('debug')) {
    console.log(err.stack);
  }
};

// Factory
// Ehandler is a partial of standard runtime error handler
// It was designed to use in async cb
var ehandler;
exports.ehandler = ehandler = function(req, res) {
  return function(err) {
    if(err) {
      handleRuntimeError(err, req, res, undefined, false);
    }
  };
};

// Hash password
var hashPassword;
exports.hashPassword = hashPassword = function(pass) {
  var sha1 = crypto.createHash('sha1');
  sha1.update(pass);

  return sha1.digest('hex');
};
