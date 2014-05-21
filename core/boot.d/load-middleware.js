/*
 * Load common usage middlewares
 */

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logRequestInfo = require('../midd/log-request-info.js');
var getRouter = require('../router.js').getRouter;
var the404Handler = require('../midd/the-404-handler.js');


exports.boot = function(app) {
  // Use body parser
  app.use(bodyParser());

  // Use cookie parser
  app.use(cookieParser());

  // Set up static file urls
  app.use(app.get('static_url'), express.static(app.get('static_root')));

  // A simple enter log
  app.use(logRequestInfo());

  // load up router
  app.use(getRouter());

  // handle 404
  app.use(the404Handler());

  // handle 500

  return true;
};
