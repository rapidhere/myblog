var render404 = require('../core/utils/template.js').render404;
var renderFilterError = require('../core/utils/filter.js').renderFilterError;
var renderError = require('../core/utils/template.js').renderError;
var render = require('../core/utils/template.js').render;
var LoginFilter = require('./filter.js').LoginFilter;
var mongoose = require('mongoose');
var logger = require('../core/logger.js').getLogger();
var genCookieId = require('./utils.js').genCookieId;

exports.login = function(req, res, next) {
  // MUST BE POST
  if(req.method !== 'POST') {
    render404(req, res);
    return ;
  }

  // Get next url
  var next_url = req.query.next_url || '/';

  var fr = LoginFilter.clean({
    'email': req.body.email,
    'password': req.body.password,
  });

  // Filter error
  if(fr.errs) {
    renderFilterError(req, res, fr.errs);
    return ;
  }

  // Authenticate
  // Get model
  var User = mongoose.model('User');

  // Fetch
  User
  .find({'email': fr.rets.email})
  .exec(function(err, users) {
    // render Error
    if(err) {
      next(err);
      return ;
    }

    // No such user
    if(users.length === 0) {
      renderError(req, res,
        '<p><strong>Login Error: </strong> No such User</p>');
      return ;
    }

    // More than one user, log a debug error
    if(users.length > 1) {
      logger.logDebug('More than one user with email' + fr.rets.email);
    }

    // Get user
    var user = users[0];
    
    // Wrong password
    if(user.password !== fr.rets.password) {
      renderError(req, res,
        '<p><strong>Login Error: </strong> Wrong password</p>');
      return ;
    }

    // Login success, set up cookie
    var cid = genCookieId(user.email);

    res.cookie('login-id', cid);

    // Save into database
    user.cookie_id = cid;
    user.save();

    // redirect
    res.redirect(next_url);
  });
};

exports.loginPage = function(req, res) {
  // get next url
  var next_url = req.query.next_url || '/';

  // render page
  render(req, res, 'blog/login', {'next_url': next_url});
};

exports.logout = function(req, res, next) {
  if(req.user) {
    var user = req.user;

    // Clear cookie id
    user.cookie_id = null;
    user.save(function(err) {
      if(err) {
        next(err);
        return ;
      }

      // Clear cookie
      res.clearCookie('login-id');
      res.redirect('/');
    });
  }
};
