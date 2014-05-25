/**
 * Some useful function for templates
 */

var _ = require('underscore');

// Wrapped render function
var render;
exports.render = render = function(res, template, locals) {
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
  });
  
  // do final render
  res.render(template, locals);
};
