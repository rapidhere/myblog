/**
 * Some helper functions
 */

var crypto = require('crypto');

// Hash a login cookie id
exports.genCookieId = function(email) {
  var s = email + Date.now() + Math.random();

  var sha1 = crypto.createHash('sha1');
  sha1.update(s);

  return s.digest('hex');
};
