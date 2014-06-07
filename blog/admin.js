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
var _ = require('underscore');
var strftime = require('strftime');

exports.adminMainPage = function(req, res, next) {
  var tmfmt = function(d) {
    return strftime('%H:%M:%S-%b %d', d);
  };

  // Create event proxy
  var ep = new EventProxy();

  ep.all('got_articles', 'got_tags', function(_articles, _tags) {
    // Filter articles
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

    // Filter tags
    var tags = _.map(_tags, function(tag) {
      return {
        '_id': tag._id,
        'tag_name': tag.tag_name,
      };
    });
    
    // render
    render(req, res, 'blog/admin-main', {
      'articles': articles,
      'tags': tags,
    });
  });

  // Fetch error
  ep.fail(function(err) {
    next(err);
    return ;
  });

  // Fetch all articles
  // Get Model
  var Article = mongoose.model('Article');

  // Fetch
  Article
  .find()
  .populate('tags', 'tag_name')
  .sort('-pub_date')
  .exec(ep.done('got_articles'));

  // Fetch all tags
  // Get Model
  var Tag = mongoose.model('Tag');

  // Fetch
  Tag
  .find()
  .sort('tag_name')
  .exec(ep.done('got_tags'));

  return ;
};

exports.adminNewArticle = function(req, res) {
  render(req, res, 'blog/admin-new');
  return ;
};

exports.adminEditArticle = function(req, res, next) {
  var aid = req.aid;

  // Get Model
  var Article = mongoose.model('Article');

  // Fetch
  Article.findById(aid)
  .populate('tags', 'tag_name')
  .exec(function(err, art) {
    if(err) {
      next(err);
      return ;
    }

    if(! art) {
      renderError(req, res,
        '<p><strong>Article Error:</strong> Invalid article id!</p>');

      return ;
    }

    var article = {
      '_id': art._id,
      'title': art.title,
      'content': art.content,
      'tags': _.pluck(art.tags, 'tag_name'),
    };

    render(req, res, 'blog/admin-new', {'article': article});
  });
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
    var art = new Article();

    art.title = fr.rets.title;
    art.tags = tags;
    art.content = fr.rets.content;
    art.pub_date = Date.now();
    art.modify_date = Date.now();

    // Save and handle errors
    art.save(function(err, article) {
      if(err) {
        next(err);
        return ;
      }

      res.redirect('/blog/view/' + article._id);
    });
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

exports.updateArticle = function(req, res, next) {
  // MUST POST
  if(req.method !== 'POST') {
    render404(req, res);
    return ;
  }

  // Clean up
  var fr = ArticleFilter.clean({
    'title': req.param('title'),
    'content': req.param('content'),
    'tags': req.param('tags'),
  });

  // Filter Errors
  if(fr.errs) {
    renderFilterError(req, res, fr.errs);
    return ;
  }

  // get article id
  var aid = req.aid;

  // Get Model
  var Article = mongoose.model('Article');

  // expand tags with event proxy
  var ep = new EventProxy();

  ep.after('got_tags', fr.rets.tags.length, function(tags) {
    ep.emit('filtered_tags', tags);
  });

  ep.all('filtered_tags', 'got_article', function(tags, _article) {
    if(! _article) {
      renderError(req, res,
        '<p><strong>Article Error:</strong> Invalid article id!</p>');
      return ;
    }

    // get article
    var art = _article;

    // update info
    art.title = fr.rets.title;
    art.content = fr.rets.content;
    art.tags = _.pluck(tags, '_id');
    art.modify_date = Date.now();

    // save
    art.save(function(err, article) {
      if(err) {
        next(err);
        return ;
      }

      res.redirect('/blog/view/' + article._id);
    });
  });

  // Handle error
  ep.fail(function(err) {
    next(err);
  });

  // Filter tags
  _.each(fr.rets.tags, function(tag_name) {
    getTagOrCreate(tag_name, ep.done('got_tags'));
  });

  // Fetch article
  Article.findById(aid, ep.done('got_article'));
};

exports.removeArticle = function(req, res, next) {
  var aid = req.aid;

  // Get Model
  var Article = mongoose.model('Article');

  // Fetch
  Article.findByIdAndRemove(aid, function(err, art) {
    if(err) {
      next(err);
    }

    if(! art) {
      renderError(req, res,
        '<p><strong>Article Error: </strong> Invalid ariticle id!</p>');
      return ;
    }

    res.redirect('/blog/index');
  });
};

exports.removeTag = function(req, res, next) {
  var tid = req.tid;

  // Get Model
  var Tag = mongoose.model('Tag');
  var Article = mongoose.model('Article');

  // Fetch and remove tag from relative article
  Article.update({
    'tags': tid 
  }, {
    '$pull': {
      'tags': tid,
    }
  }, {
    'multi': true,
  }, function(err) {
    if(err) {
      next(err);
      return ;
    }

    // Then delete the tag
    Tag.findByIdAndRemove(tid, function(err, tag) {
      if(err) {
        next(err);
        return ;
      }

      if(! tag) {
        renderError(req, res,
          '<p><strong>Tag Error: </strong> Invalid tag id!</p>');
        return ;
      }

      // redirect
      res.redirect('/blog/admin');
    });
  });
};
