exports.boot = function(app) {
  require('../logger.js').load_logger(
    app.get('log_dir'),
    app.get('log_time_format')
  );
  return true;
};
