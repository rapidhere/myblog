/**
 * All items is loaded
 *
 * The start the server
 */

exports.boot = function(app) {
  app.listen(app.get('port'));

  return true;
};
