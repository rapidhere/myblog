// Copyright (c) 2015 by rapid, RANTTU. INC. All Rights Reserved.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the Lesser GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// Lesser GNU General Public License for more details.
//
// You should have received a copy of the Lesser GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// Server level configurations
var path = require('path');

// the debug flag
var debug;
exports.debug = debug = true;

// the rooter mail
exports.root_mail = 'rapidhere@gmail.com';

// The server port
exports.port = debug ? 9090 : 18080;

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
  'username': 'blog',
  'password': '1'
};

// The directory for logs
exports.log_dir = path.join(__dirname, 'log');

// The time format used by logger
exports.log_time_format = '%H:%M:%S %d, %b %Y';

// Article per page
exports.article_per_page = 4;

// The upload file dir
exports.upload_root = path.join(__dirname, 'upload');

// The url to fecth upload files
exports.upload_url = '/upload';
