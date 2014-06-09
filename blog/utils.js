/**
 * Some useful funcions
 */

var _ = require('underscore');
var mongoose = require('mongoose');
var logger = require('../core/logger.js').getLogger();
var markdown = require('markdown').markdown;
var app = global.app;
var render = require('../core/utils/template.js').render;
var render404 = require('../core/utils/template.js').render404;

// Get a tag by tagname, if such tag doesn't exist, create a new one
var getTagOrCreate;
exports.getTagOrCreate = getTagOrCreate = function(tag_name, callback) {
  if(! _.isString(tag_name)) {
    throw new Error('Require a string as tag name');
  }

  // get Tag model
  var Tag = mongoose.model('Tag');
  
  Tag.find({'tag_name': tag_name}, function(err, tags) {
    if(err) {
      // Call callback to handle err
      callback(err, tags);
    }

    // Too many tags
    // For this situations we log a debug error
    // And then ignore this
    if(tags.length > 1 ) {
      logger.logDebug('N/A', 'Multiple tag has a tag_name: ' + tag_name);
    }

    // No such tag, we create one
    if(tags.length === 0) {
      var tag = new Tag();
      tag.tag_name = tag_name;
      
      // save and call callback
      tag.save(callback);
    } else {
      // If we've got it, simply call the callback
      callback(err, tags[0]);
    }
  });
};

// Compile markdown into html to present
var compileMarkdown;
exports.compileMarkdown = compileMarkdown = function(md) {
  return markdown.toHTML(md);
};

// Render a article index page
var renderIndexPage;
exports.renderIndexPage = renderIndexPage = function(req, res, page, _arts, tot, page_url_prefix) {
  var article_per_page = app.get('article_per_page');

  // Page code is too small or too large
  var front_arts = (page - 1) * article_per_page;
  if(front_arts < 0 || front_arts >= tot) {
    render404(req, res);
    return ;
  }

  // The pagination object
  var pagination = {};

  // has previous
  if(front_arts > 0) {
    pagination.prev = page_url_prefix + '/' + (page - 1);
  }

  // has next
  if(front_arts + article_per_page < tot) {
    pagination.next = page_url_prefix + '/' + (page + 1);
  }

  // Filter arts
  var arts = _.map(_arts, function(art) {
    return {
      '_id': art._id, 
      'title': art.title,
      'content': compileMarkdown(art.content),
      'tags': _.map(art.tags, function(tag) {
        return {
          'tag_name': tag.tag_name,
          'href': encodeURI('/blog/search/tag:' + tag.tag_name),
        }
      }),
      'pub_date': art.pub_date.toGMTString(),
      'modify_date': art.modify_date.toGMTString(),
    };
  });

  // Render template
  render(req, res, 'blog/index', {
    'articles': arts,
    'pagination': pagination,
  });
};
