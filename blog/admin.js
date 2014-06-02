/**
 * Admin module for blog
 */
var render = require('../core/utils/template.js').render;
var mongoose = require('mongoose');
var ArticleFilter = require('./filter.js').ArticleFilter;
var getTagOrCreate = require('./utils.js').getTagOrCreate;
var EventProxy = require('eventproxy');
var ehandler = require('../core/utils/sys.js').ehandler;
var _ = require('underscore');

exports.adminMainPage = function(req, res) {
  return render(res, 'blog/admin-main');
};

exports.adminNewArticle = function(req, res) {
  return render(res, 'blog/admin-new');
};

exports.postNewArticle = function(req, res) {
  if(req.method !== 'POST') {
    // TODO: add error render module
  }

  // Clean up
  var fr = ArticleFilter.clean({
    'title': req.param('title'),
    'tags': req.param('tags'),
    'content': req.param('content'),
  });

  if(fr.errs) {
    // TODO: add error render module
  }

  // Get model
  var Article = mongoose.model('Article');
  var Tag = mongoose.model('Tag');

  // Filter tags
  // Use Event Proxy
  var ep = new EventProxy();

  // tags has been filtered
  ep.after('got_tags', fr.rets.tags.length, function(tags) {
    // Convert tags into tag id list
    tags = _.map(tags, function(tag) {
      return tag._id;
    });

    // Errors has been handled
    // We just save the article, and return to index of blog
    var art = new Article;

    art.title = fr.rets.title;
    art.tags = tags;
    art.content = fr.rets.content;
    art.pub_date = undefined;
    art.modify_date = Date.now();

    // Save and handle errors
    art.save(ehandler(req, res));
    
    // Save success or not, we return to index immediatly
    res.redirect('/blog');
  });

  // TODO: On fail
  ep.fail(function() {});

  // Trigger Event Proxy
  _.each(fr.rets.tags, function(tag_name) {
    getTagOrCreate(tag_name, ep.done('got_tags'));
  });
};
