/**
 * Some middlewares provided by auth module
 */

var _ = require('underscore');
var mongoose = require('mongoose');
var renderError = require('../core/utils/template.js').renderError;

// Assign user to req object
var assignUser;
exports.assignUser = assignUser = function(req, res, next) {
  // No cookie support, do nothing
  if(req.cookies === undefined) {
    next();
  }

  // No login id, do nothing
  if(! _.has(req.cookies, 'login-id')) {
    next();
    return ;
  }

  var cid = req.cookies['login-id'];
  // Get model
  var User = mongoose.model('User');

  // Fetch
  User
  .find({'cookie_id': cid})
  .exec(function(err, users) {
    if(err) {
      next(err);
      return ;
    }
    
    // No such user, do nothing
    if(users.length === 0) {
      next();
      return ;
    } else {
      // Assign it to req object
      req.user = users[0];
      next();
    }
  });

};

// Check login
var checkLogin;
exports.checkLogin = checkLogin = function(req, res, next) {
  if(! _.has(req, 'user')) {
    renderError(req, res, '<p><strong>Access Denied:</strong> Please <a href="/auth/loginPage">login</a> first!</p>');
    return ;
  }

  next();
};

// Must assign user and then check login
// Check if the user has logined as admin
var checkAdmin;
exports.checkAdmin = checkAdmin = function(req, res, next) {
  // Must have a user object, if no user object, do nothing
  if(! _.has(req, 'user')) {
    next();
    return ;
  }

  // Check admin mark
  if(! req.user.admin) {
    renderError(req, res, '<p><strong>Access Denied:</strong> Permission not required, please login as administrator!</p>');
    return ;
  }

  next();
};

// Combo: assignUser + checkLogin
var assignLogin;
exports.assignLogin = assignLogin = [assignUser, checkLogin];

// Combo: assignUser + checkLogin + checkAdmin
var assignAdmin;
exports.assignAdmin = assignAdmin = [assignUser, checkLogin, checkAdmin];
