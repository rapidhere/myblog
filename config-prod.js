/*
 * Server level configurations
 */
var path = require('path');

// the debug flag
exports.debug = false;

// the rooter mail
exports.root_mail = 'rapidhere@gmail.com';

// The server port
exports.port = 18080;

// the root path of static files
exports.static_root = path.join(__dirname, 'static');

// the static root url
exports.static_url = '/static';

// availabe apps
exports.apps = [
  'blog',
  'auth',
];

// db
exports.db_conf = {
  'host': 'localhost',
  'port': 27017,
  'db': 'blog',
  'username': 'rapidhere.com',
  'password': 'twansuixxxx'
};

// The directory for logs
exports.log_dir = '/var/log/rapidhere.com';

// The time format used by logger
exports.log_time_format = '%H:%M:%S %d, %b %Y';

// Article per page
exports.article_per_page = 4;

// The upload file dir
exports.upload_root = path.join(__dirname, 'upload');

// The url to fecth upload files
exports.upload_url = '/upload';
