/**
 * Error Handler
 */

var logger = require('../logger.js').getLogger();
var app = global.app; 
var handleRuntimeError = require('../utils/sys.js').handleRuntimeError;

var errorHandler = handleRuntimeError;

module.exports = function() {
  return errorHandler;
};
