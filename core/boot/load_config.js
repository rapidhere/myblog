/*
 * Load configurations from `config.json`
 */

var path = require('path');

exports.boot = function(app) {
  var config = require('../../config.js');
  
  // port = 80
  app.set('port', config.port || 80);

  // debug mode = false
  app.set('debug', config.debug || false);

  // static root = `root`/public
  app.set('static_root', config.static_root || os.path.join(__dirname, '../../public'));

  // static url = /static
  app.set('static_url', config.static_url || '/static');

  // apps
  app.set('apps', config.apps || []);
};
