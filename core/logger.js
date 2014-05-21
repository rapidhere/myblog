/**
 * This is a Logger system
 */

//TODO:: Add flock

var _ = require('underscore');
var strftime = require('strftime');
var path = require('path');
var fs = require('fs');

var Logger;
exports.Logger = Logger = function(log_dir, log_time_format) {
  this.log_dir = log_dir;
  this.log_time_format = log_time_format;
  
  // Create log file
  var log_filename = path.join(log_dir, 'blog.log');
  var opt = {
    'flags': 'a',
  };
  
  this.log_file = fs.createWriteStream(log_filename, opt);
};

// Statics: Log levels
Logger.prototype.LOG_LV_INFO = 0;
Logger.prototype.LOG_LV_WARN = 1;
Logger.prototype.LOG_LV_ERROR = 2;
Logger.prototype.LOG_LV_DEBUG = 3;

// low level log function
var appendLog;
Logger.prototype.appendLog = appendLog = function(level, client, txt) {
  var log_txt;
  
  // get current pid
  var pid = process.pid;

  // get current time
  var time_string = strftime(this.log_time_format);

  // get Level string
  var level_string;
  switch(level) {
    case this.LOG_LV_INFO: level_string = 'II'; break;
    case this.LOG_LV_WARN: level_string = 'WW'; break;
    case this.LOG_LV_ERROR: level_string = 'EE'; break;
    case this.LOG_LV_DEBUG: level_string = 'DD'; break;
  }

  log_txt = level_string + '  [' + time_string + '] ' + 
    'FROM ' + client + ' >>>\n' +
    txt + "\n\n";
  
  // Write async
  this.log_file.write(log_txt);
};

Logger.prototype.logInfo     = _.partial(appendLog, Logger.prototype.LOG_LV_INFO);
Logger.prototype.logWarning  = _.partial(appendLog, Logger.prototype.LOG_LV_WARN);
Logger.prototype.logError    = _.partial(appendLog, Logger.prototype.LOG_LV_ERROR);
Logger.prototype.logDebug    = _.partial(appendLog, Logger.prototype.LOG_LV_DEBUG);

// Global single logger
var the_logger = null;

// Load the logger on start
var loadLogger = function(log_dir, log_time_format) {
  the_logger = new Logger(log_dir, log_time_format);
};

// Logger can only load once
exports.loadLogger = _.once(loadLogger);

// Get the logger
var getLogger;
exports.getLogger = function() {
  return the_logger;
};
