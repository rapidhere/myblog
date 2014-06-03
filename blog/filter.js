/**
 * Filters for blog module
 */

var Filter = require('../core/filter.js').Filter;
var _ = require('underscore');

// Convert tags into list
var tagsFilter = function(tag_string) {
  var tags = [];

  tag_string.split(';').forEach(function(t) {
    t = t.trim();
    if(t) {
      tags = tags.concat(t);
    }
  });

  return {
    'err': '',
    'ret': tags,
  }
};

// The Article Filter
var ArticleFilter = new Filter({
  'title': {
    'type': String,
    'min': 6,
    'max': 255,
    'null': false,
    'required': true,
  },

  'tags': {
    'type': String,
    'max': 255,
    'required': true,
    'null': true,
    'filter': tagsFilter,
  },

  'content': {
    'type': String,
    'max': 65536,
    'null': true,
    'required': true,
  },
});
exports.ArticleFilter = ArticleFilter;
