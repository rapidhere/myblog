/**
 * Filter for Articles
 */

var Filter = require('../filter.js').Filter;

var ArticleFilter = new Filter({
  // Title of the article
  'title': {
    'type': String,
    'required': true,
    'min': 6,
    'max': 30,
  },

  // The tags
  'tags': {
    'type': String,
    'required': true,
    'max': 255,
    'filter': function(tags) {
    },
  },

  // The content
  'content': {
    'type': String,
    'required': true,
    'max': 65535,
  },
});

exports.ArticleFilter = ArticleFilter;
