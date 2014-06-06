/*
 * Server level configurations
 */
var path = require('path');

// the debug flag
exports.debug = true;

// the rooter mail
exports.root_mail = 'rapidhere@gmail.com';

// The server port
exports.port = 8080;

// the root path of static files
exports.static_root = path.join(__dirname, 'static');

// the static root url
exports.static_url = '/static';

// availabe apps
exports.apps = [
  'blog',
  'auth',
  'term',
];

// db
exports.db_conf = {
  'host': 'localhost',
  'port': 27017,
  'db': 'blog',
  'username': 'blog',
  'password': '1'
};

// The directory for logs
exports.log_dir = path.join(__dirname, 'log');

// The time format used by logger
exports.log_time_format = '%H:%M:%S %d, %b %Y';

// Article per page
exports.article_per_page = 5;
