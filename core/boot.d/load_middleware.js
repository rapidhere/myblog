/*
 * Load common usage middlewares
 */

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var log_request_info = require('../midd/log_request_info.js');
var get_router = require('../router.js').get_router;
var the404handler = require('../midd/the404handler.js');


exports.boot = function(app) {
  // Use body parser
  app.use(bodyParser());

  // Use cookie parser
  app.use(cookieParser());

  // Set up static file urls
  app.use(app.get('static_url'), express.static(app.get('static_root')));

  // A simple enter log
  app.use(log_request_info());

  // load up router
  app.use(get_router());

  // handle 404
  app.use(the404handler());

  return true;
};
