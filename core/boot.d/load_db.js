/*
 * Load db module
 */

var mongoose = require('mongoose');

exports.boot = function(app) {
  var conf = app.get('db_conf');

  // Connect to db
  var uri = 'mongodb://' + conf.username 
    + ':' + conf.password
    + '@' + conf.host
    + ':' + conf.port
    + '/' + conf.db;

  mongoose.connect(uri);
  
  // Discover schemas
  require('../db/utils.js').autoDiscoverSchemas();

  return true;
};
