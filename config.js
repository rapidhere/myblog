/*
 * Server level configurations
 */
var path = require('path');

// The server port
exports.port = 8080;

// debug on?
exports.debug = true;

// the root path of static files
exports.static_root = path.join(__dirname, 'static')

// the static root url
exports.static_url = '/static';

// availabe apps
exports.apps = [
  'auth',
  'term',
];
