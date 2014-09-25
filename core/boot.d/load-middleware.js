/*
 * Load common usage middlewares
 */

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logRequestInfo = require('../midd/log-request-info.js');
var the404Handler = require('../midd/the-404-handler.js');
var errorHandler = require('../midd/error-handler.js');
var loadRouter = require('../router.js').loadRouter;
var multipart = require('connect-multiparty');

exports.boot = function(app) {
  // Use body parser
  app.use(bodyParser());

  // Use multipart to parse upload files
  app.use(multipart({
    'uploadDir': app.get('upload_root'),
  }));

  // Use cookie parser
  app.use(cookieParser());

  // Set up static file urls
  app.use(app.get('static_url'), express.static(app.get('static_root')));
  app.use(app.get('upload_url'), express.static(app.get('upload_root')));

  // A simple enter log
  app.use(logRequestInfo());

  // put router here
  loadRouter(app);

  // handle 404
  app.use(the404Handler());

  // handle 500
  app.use(errorHandler());

  return true;
};
