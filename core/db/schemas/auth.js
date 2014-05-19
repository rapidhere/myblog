/**
 * Models required by auth system
 * Just very simple
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var generalStringValidator = require('../utils.js').generalStringValidator;


// User Schema

// patterns
var username_pattern = /[a-zA-Z_][a-zA-Z]{5,11}/;
var email_pattern = /[a-zA-Z0-9][a-zA-Z0-9_]{5,11}@[a-zA-Z0-9]{3,6}\.[a-zA-Z]{2,4}/;

// the User Schema definition
var UserSchema = new Schema({
  // Nick name
  'nickname': {
    'type': String,
    'required': true,
    'validator': generalStringValidator(username_pattern, 'Wrong Nickname format'),
  },

  // Email
  'email': {
    'type': String,
    'required': true,
    'validator': generalStringValidator(email_pattern, 'Wrong Email format'),
  },

  // Password
  'password': {
    'type': String,
    'required': true,
  },
});

// Register User Model
var User = mongoose.model('User', UserSchema);

// Exports User Schema and models
exports.UserSchema = UserSchema;
exports.User = User;
