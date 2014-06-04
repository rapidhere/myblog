#!/usr/local/bin/node

/**
 * Create the root user of blog
 *
 * Currently this is the only user of blog
 */
var hashPassword = require('../core/utils/sys.js').hashPassword;

// root user config
var RootUser = {
  'email': 'rapidhere@gmail.com',
  'username': 'rapid',
  'password': '520lmdforever',
};

// Import mongoose
var mongoose = require('mongoose');

// Connect
var conf = require('../config.js').db_conf;
// Connect to db
var uri = 'mongodb://' + conf.username 
  + ':' + conf.password
  + '@' + conf.host
  + ':' + conf.port
  + '/' + conf.db;
mongoose.connect(uri);

// Get User Model
var User = require('../core/db/schemas/auth.js').User;

// Exit flag
var exit_flag = false;

// Find old user
User
.find({'email': RootUser.email})
.exec(function(err, users) {
  // Error
  if(err) {
    console.error(err.stack);
    exit_flag = true;
    return ;
  }

  if(users.length >= 1) {
    console.error('User with ' + RootUser.email + ' exists!');
    exit_flag = true;
    return ;
  }

  var u = new User();
  u.username = RootUser.username;
  u.email = RootUser.email;
  u.password = hashPassword(RootUser.password);

  u.save(function(err) {
    if(err) {
      console.error('Create root user failed!');
      return ;
    } else {
      console.log('Create root user successfully!');
    }
    exit_flag = true;
  });
});

setInterval(function() {
  if(exit_flag) {
    process.exit(0);
  }
}, 1000);
