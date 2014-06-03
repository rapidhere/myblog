/**
 * A simple server for development usage
 */

var fs = require('fs');

var pid = process.pid;
fs.writeFileSync('.pid', pid);

console.info('Server start on ' + pid + ' ...');

require('./core/boot.js').run();
