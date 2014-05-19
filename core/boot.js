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
 * Load boot sequence from boot/boot_seq.json
 *
 * Each boot file must has a `boot` function take `app` assert
 * the only argument. 
*/
exports.run = function() {
  var boot_seq = require('./boot.d/boot_seq.json');

  // Load up boot items
  // After this, the server start running
  boot_seq.forEach(function(boot_filename) {
    var bitem = require('./boot.d/' + boot_filename + '.js');

   bitem.boot(app);
  });
}
