/**
 * Models required by auth system
 * Just very simple
 *
 * When don't valid datas at Database level
 * We Do it in app level or form level
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// User Schema

// the User Schema definition
var UserSchema = new Schema({
  // Nick name
  'nickname': {
    'type': String,
    'required': true,
  },

  // Email
  'email': {
    'type': String,
    'required': true,
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
