/**
  * This is a simple router module
  * You only need to use register function to tell the site
  * to load your register file
 */
var express = require('express');
var isArray = require('util').isArray;

var router;

var registerRoutes;
exports.registerRoutes = registerRoutes = function(app) {
  router = express.Router();

  var apps = app.get('apps');
  var routes_list;
  var routes_path;
  
  // load routers one by one
  apps.forEach(function(appname) {
    routes_path = '../' + appname + '/routes.js';
    routes_list = require(routes_path);

    if(isArray(routes_list)) {
      routes_list.forEach(function(route) {
        if(! isArray(route)) {
          throw new Error('Error loading routes of ' + appname + ':\n route is not a array.');
        }

        var url = route[0], fn = route[1];

        if(typeof(url) !== 'string') {
          throw new Error('Error loading routes of ' + appname + ':\n route[0] must be a url');
        }

        if(typeof(fn) != 'function') {
          throw new Error('Error loading routes of ' + appname + ':\n route[1] must be a function');
        }

        router.all(url, fn);
      });
    } else {
      throw new Error('Error loading routes of ' + appname + ':\n routes_list is not a array.');
    }
  });
};

exports.getRouter = function() {
  return router;
}
