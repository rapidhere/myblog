/**
 * Error Handler
 */

var handleRuntimeError = require('../utils/sys.js').handleRuntimeError;

var errorHandler = handleRuntimeError;

module.exports = function() {
  return errorHandler;
};
