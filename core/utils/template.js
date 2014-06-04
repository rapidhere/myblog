/**
 * Some useful function for templates
 */

var _ = require('underscore');

// Wrapped render function
var render;
exports.render = render = function(req, res, template, locals) {
  // Cannot render null template
  if(! _.isString(template) || template.length === 0) {
    throw new Error('Require a non empty String as `template`');
  }

  var app = global.app;
  
  // default to None
  if(locals === undefined) {
    locals = {};
  }

  // Must be a Object
  if(! _.isObject(locals)) {
    throw new Error('Require a Object as `locals`');
  }

  // Extend locals
  locals = _.extend(locals, {
    'static_url': app.get('static_url'),
    'user': req.user,
  });
  
  // do final render
  res.render(template, locals);
};

// Shortcuts for render 404page
var render404;
exports.render404 = render404 = function(req, res) {
  return render(req, res, '404page');
};

// Shortcuts for render error page
var renderError;
exports.renderError = renderError = function(req, res, error_message) {
  return render(req, res, 'error', {'error_message': error_message});
};
