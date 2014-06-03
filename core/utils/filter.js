/**
 * Some useful function in filter module
 */

var _ = require('underscore');

// Render the err return by `clean` function to error page template
var renderError = require('./template.js').renderError;
var renderFilterError;
exports.renderFilterError = renderFilterError = function(res, err) {
  if(_.size(err) === 0) {
    throw new Error('Must has at least on error to render!');
  }
  
  var key = _.keys(err)[0];
  var inf = err[key];
  
  return renderError(res,
    '<p><strong>Form error:</strong> ' + inf + '</p>');
};
