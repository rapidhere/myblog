/**
 * Handle 404 Error
 */

var logger = require('../logger.js').getLogger();
var render = require('../utils/template.js').render;

var the404Handler = function(req, res) {
  logger.logWarning(req.ip, 'Unknown request: '  + req.path);

  res.status(404);
  render(req, res, '404page');

  return;
};

module.exports = function() {
  return the404Handler;
};
