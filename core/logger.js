/**
 * This is a Logger system
 */

var _ = require('underscore');
var strftime = require('strftime');

var Logger;
exports.Logger = Logger = function(log_dir, log_time_format) {
  this.log_dir = log_dir;
  this.log_time_format = log_time_format;
};

// Statics: Log levels
Logger.prototype.LOG_LV_INFO = 0;
Logger.prototype.LOG_LV_WARN = 1;
Logger.prototype.LOG_LV_ERROR = 2;
Logger.prototype.LOG_LV_DEBUG = 3;

// low level log function
var append_log;
Logger.prototype.append_log = append_log = function(level, client, txt) {
  var log_txt;
  
  // get current pid
  var pid = process.pid;

  // get current time
  var time_string = strftime(log_time_format);
};

Logger.prototype.log_info     = _.partial(append_log, LOG_LV_INFO);
Logger.prototype.log_warning  = _.partial(append_log, LOG_LV_WARN);
Logger.prototype.log_error    = _.partial(append_log, LOG_LV_ERROR);
Logger.prototype.log_debug    = _.partial(append_log, LOG_LV_DEBUG);

// Global single logger
var theLogger = null;

// Load the logger on start
var load_logger = function(log_dir, log_time_format) {
  theLogger = new Logger(log_dir, log_time_format);
};

// Logger can only load once
exports.load_logger = _.once(load_logger);

// Get the logger
var get_logger;
exports.get_logger = function() {
  return theLogger;
};
