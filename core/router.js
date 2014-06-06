/**
  * This is a simple router module
  * You only need to use register function to tell the site
  * to load your register file
 */
var express = require('express');
var isArray = require('util').isArray;
var _ = require('underscore');

var router;

var loadRouter;
exports.loadRouter = registerRoutes = function(app) {
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

        var url = route[0];

        if(typeof(url) !== 'string') {
          throw new Error('Error loading routes of ' + appname + ':\n route[0] must be a url');
        }

        var midds = _.flatten(route[1]),
          handler = route[2];

        if(handler === undefined) {
          midds = [];
          handler = route[1];
        }
       
        if(typeof(handler) != 'function') {
          throw new Error('Error loading routes of ' + appname + ':\n handler must be function');
        }
        
        if(! _.isArray(midds)) {
          throw new Error('Error loading routes of ' + appname + ':\n midds must be arrays of function(s)');
        }

        // Load midds
        _.each(midds, function(midd) {
          router.use(url, midd);
        });

        // Load handler
        router.all(url, handler);
      });
    } else {
      throw new Error('Error loading routes of ' + appname + ':\n routes_list is not a array.');
    }
  });

  app.use(router);
};

exports.getRouter = function() {
  return router;
};
