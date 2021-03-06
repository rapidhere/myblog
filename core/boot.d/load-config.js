/*
 * Load configurations from `config.json`
 */

var path = require('path');
var os = require('os');

exports.boot = function(app) {
  var config = require('../../config.js');

  // debug = true
  if(config.debug === undefined) {
    app.set('debug', true);
  } else {
    app.set('debug', config.debug);
  }

  // root mail
  app.set('root_mail', config.root_mail || 'example@abc.com');
  
  // port = 80
  app.set('port', config.port || 80);

  // static root = `root`/public
  app.set('static_root', 
    config.static_root || os.path.join(__dirname, '../../public'));

  // static url = /static
  app.set('static_url', config.static_url || '/static');

  // upload root = `root`/upload
  app.set('upload_root',
    config.upload_root || os.path.join(__dirname, '../../upload'));

  // upload url = /upload
  app.set('upload_url', config.upload_url || '/upload');

  // apps
  app.set('apps', config.apps || []);

  // db_conf
  app.set('db_conf', config.db_conf || {});

  // log_dir
  app.set('log_dir', config.log_dir || '/var/log/');

  // The time format used by logger
  app.set('log_time_format', config.log_time_format || '%Y %m %d, %H:%M:%S');

  // set up jade app engine
  app.engine('jade', require('jade').__express);
  app.set('view engine', 'jade');
  app.set('views', path.join(__dirname, '../../template/'));

  // load blog page settings
  app.set('article_per_page', config.article_per_page || 5);

  return true;
};
