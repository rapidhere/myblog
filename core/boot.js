/* 
 * The entry from blog server
 *
 * Load up boot items and start the server
 */

var express = require('express');

// global one app
var app = express();

// make app global
global.app = app;

/* 
 * Load boot sequence from boot.d/boot_seq.json
 *
 * Each boot file must has a `boot` function take `app` as
 * the only argument. 
*/
exports.run = function() {
  var boot_seq = require('./boot.d/boot-seq.json');

  // Load up boot items
  // After this, the server start running
  boot_seq.forEach(function(boot_filename) {
    var bitem = require('./boot.d/' + boot_filename + '.js');

    try {
      if(! bitem.boot(app)) {
        console.error(
          'Failed to run boot item: ' + boot_filename + ', aborted!');
        process.exit(1);
      }
    } catch(err) {
      console.error('uncaughtException when run boot item: ' + boot_filename);
      throw err;
    }
  });
};
