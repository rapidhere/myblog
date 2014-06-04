/**
 * Some middlewares provided by auth module
 */

var _ = require('underscore');
var mongoose = require('mongoose');
var renderError = require('../core/utils/template.js').renderError;

// Check if the user has logined as admin
var checkAdmin;
exports.checkAdmin = checkAdmin = function(req, res, next) {
  // No cookie support, do nothing
  if(req.cookies === undefined) {
    next();
  }

  // No login id
  if(! _.has(req.cookies, 'login-id')) {
    renderError(res, '<p><strong>Access Denied:</strong> Please login as administrator first!</p>');
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
    
    // No such user
    if(users.length === 0) {
      renderError(res, '<p><strong>Access Denied:</strong> Invalid Admin login-id!</p>');
      return ;
    } else {
      // Assign it to req object
      req.user = users[0];
      next();
    }
  });
};
