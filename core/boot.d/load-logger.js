exports.boot = function(app) {
  require('../logger.js').loadLogger(
    app.get('log_dir'),
    app.get('log_time_format')
  );
  return true;
};
