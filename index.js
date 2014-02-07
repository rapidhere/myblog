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
var boot_seq = require('./core/boot/boot_seq.json');

// Load up boot items
boot_seq.forEach(function(boot_filename) {
  var bitem = require('./core/boot/' + boot_filename + '.js');

  bitem.boot(app);
});
