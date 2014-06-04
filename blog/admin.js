/**
 * Admin module for blog
 */
var templateUtils = require('../core/utils/template.js');
var render = templateUtils.render;
var render404 = templateUtils.render404;
var renderError = templateUtils.renderError;
var renderFilterError = require('../core/utils/filter.js').renderFilterError;
var compileMarkdown = require('./utils.js').compileMarkdown;

var mongoose = require('mongoose');
var ArticleFilter = require('./filter.js').ArticleFilter;
var getTagOrCreate = require('./utils.js').getTagOrCreate;
var EventProxy = require('eventproxy');
var ehandler = require('../core/utils/sys.js').ehandler;
var _ = require('underscore');
var strftime = require('strftime');

exports.adminMainPage = function(req, res, next) {
  var tmfmt = function(d) {
    return strftime('%H:%M:%S-%b %d', d);
  };

  // Fetch all articles
  // Get Model
  var Article = mongoose.model('Article');

  // Fetch
  Article
  .find()
  .populate('tags', 'tag_name')
  .sort('-pub_date')
  .exec(function(err, _articles) {
    // Handle error
    if(err) {
      next(err);
      return ;
    }

    // Filter
    var articles = _.map(_articles, function(art) {
      return {
        '_id': art._id,
        'title': art.title,
        'content': compileMarkdown(art.content),
        'pub_date': tmfmt(art.pub_date),
        'modify_date': tmfmt(art.modify_date),
        'tags': _.pluck(art.tags, 'tag_name'),
      };
    });

    // render
    render(req, res, 'blog/admin-main', {'articles': articles});
  });
  return ;
};

exports.adminNewArticle = function(req, res, next) {
  var aid = req.params.aid;
  if(aid === undefined) {
    render(req, res, 'blog/admin-new');
    return ;
  }
};

exports.postNewArticle = function(req, res, next) {
  if(req.method !== 'POST') {
    render404(req, res);
    return;
  }

  // Clean up
  var fr = ArticleFilter.clean({
    'title': req.param('title'),
    'tags': req.param('tags'),
    'content': req.param('content'),
  });

  if(fr.errs) {
    renderFilterError(req, res, fr.errs);
    return;
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
    art.pub_date = Date.now();
    art.modify_date = Date.now();

    // Save and handle errors
    // Don't response
    art.save(ehandler(req, res));
    
    // Save success or not, we return to index immediatly
    res.redirect('/blog');
  });

  // On Event Proxy fail
  // Stop all and call err handler
  ep.fail(function(err) {
    next(err);
  });

  // Trigger Event Proxy
  _.each(fr.rets.tags, function(tag_name) {
    getTagOrCreate(tag_name, ep.done('got_tags'));
  });
};
