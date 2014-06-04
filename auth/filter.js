/**
 * Filters for auth module
 */

var Filter = require('../core/filter.js').Filter;
var hashPassword = require('../core/utils/sys.js').hashPassword;

// Login Form Filter
var loginEmailFilter = function(e) {
  var m = e.match(/[a-zA-Z0-9]{5,}@[a-zA-Z0-9]{3,6}\.[a-zA-Z0-9.]{3,5}/g);
  if(m === null || m[0].length !== e.length) {
    return {
      'err': "Wrong Email Format",
      'ret': null,
    };
  }

  return {
    'err': '',
    'ret': e,
  };
};

var loginPasswordFilter = function(p) {
  return {
    'ret': hashPassword(p),
    'err': '',
  };
};

var LoginFilter;
exports.LoginFilter = LoginFilter = new Filter({
  // Email field
  'email': {
    'type': String,
    'required' : true,
    'min': 8,
    'max': 255,
    'filter': loginEmailFilter,
  },

  // Password field
  'password': {
    'type': String,
    'required': true,
    'min': 6,
    'max': 20,
    'filter': loginPasswordFilter,
  }
});
