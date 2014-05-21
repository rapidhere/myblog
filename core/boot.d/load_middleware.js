/*
 * Load common usage middlewares
 */

var express = require('express');

exports.boot = function(app) {
  app.use(app.get('static_url'), express.static(app.get('static_root')));

  return true;
};
