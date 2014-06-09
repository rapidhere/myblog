var render = require('../core/utils/template.js').render;
var renderError = require('../core/utils/template.js').renderError;
var render404 = require('../core/utils/template.js').render404;
var _ = require('underscore');
var app = global.app;
var mongoose = require('mongoose');
var compileMarkdown = require('./utils.js').compileMarkdown;
var EventProxy = require('eventproxy');
var renderIndexPage = require('./utils.js').renderIndexPage;

// The blog mainpage
exports.index = function(req, res, next) {
  // Get page code
  var page;
  if(! _.has(req.params, 'page')) {
    page = 1;
  } else {
    page = parseInt(req.params.page);
  }

  // Check page
  if(_.isNaN(page)) {
    renderError(req, res,
      '<p><strong>Page Error:</strong> Invalid Page code!</p>');
    return ;
  }
  
  // Articles per page
  var article_per_page = app.get('article_per_page');

  // Create Event Proxy
  var ep = new EventProxy();

  ep.all('counted', 'got_arts', function(count, _arts) {
    renderIndexPage(req, res, page, _arts, count, '/blog/index');

    return ;
  });
  
  // Handle error
  ep.fail(function(err) {
    next(err);
    return ;
  });

  // Get Model
  var Article = mongoose.model('Article');

  // Get total pages
  Article.count({}, ep.done('counted'));

  // Fetch
  Article
  .find()
  .sort('-pub_date')
  .skip((page - 1) * article_per_page)
  .limit(article_per_page)
  .populate('tags', 'tag_name')
  .exec(ep.done('got_arts'));
};

exports.viewPage = function(req, res, next) {
  // Get model
  var Article = mongoose.model('Article');

  // Fetch
  Article
  .find({'_id': req.aid})
  .populate('tags', 'tag_name _id')
  .exec(function(err, _arts) {
    if(err) {
      next(err);
      return ;
    }

    // No such art
    if(_arts.length === 0) {
      renderError(req, res,
        '<p><strong>Article Error: </strong> Invalid Article id</p>');
      return ;
    }

    // get art
    var art = _arts[0];

    render(req, res, 'blog/view', {
      'article': {
        '_id': art._id, 
        'title': art.title,
        'content': compileMarkdown(art.content),
        'tags': _.map(art.tags, function(tag) {
          return {
            'tag_name': tag.tag_name,
            'href': encodeURI('/blog/search/tag:' + tag.tag_name),
          };
        }),
        'pub_date': art.pub_date.toGMTString(),
        'modify_date': art.modify_date.toGMTString(),
      }
    });
  });
};

exports.search = function(req, res, next) {
  // Get page code
  var page;
  if(! _.has(req.params, 'page')) {
    page = 1;
  } else {
    page = parseInt(req.params.page);
  }

  // check Page
  if(_.isNaN(page)) {
    renderError(req, res, 
      '<p><strong>Search Error: </strong> Invalid Page Code !</p>');

    return ;
  }

  // Get pattern
  var pattern;
  if(! _.has(req.params, 'pattern')) {
    renderError(req, res, 
      '<p><strong>Search Error: </strong> Require a pattern !</p>');

    return ;
  } else {
    pattern = req.params.pattern;
  }

  // Get scope and keywords
  var scope;
  var keywords;
  if(pattern.search(':') !== -1) {
    scope = pattern.split(':')[0];
    keywords = pattern.split(':')[1];
  } else {
    scope = 'title';
    keywords = pattern;
  }

  

  var article_per_page = app.get('article_per_page');

  // Fetch the scope with keywords
  // Create event proxy
  var ep = new EventProxy();

  ep.all('counted', 'got_arts', function(tot, _arts) {
    if(tot === 0) {
      // Nothing found
      render(req, res, 'blog/found-nothing');
      return ;
    }
    // render
    renderIndexPage(req, res, page, _arts, tot, encodeURI('/blog/search/' + pattern));
  });
  
  // Handle Error
  ep.fail(function(err) {
    next(err);
  });
  
  // get Model
  var Article = mongoose.model('Article');

  // Convert scope into standard scope
  if(scope === 'content' || scope === 'article') {
    var so = {'content': new RegExp('.*' + keywords + '.*')};

    // Fetch
    Article
    .find(so)
    .sort('-pub_date')
    .skip((page - 1) * article_per_page)
    .limit(article_per_page)
    .populate('tags', 'tag_name _id')
    .exec(ep.done('got_arts'));

    // Count
    Article.count(so, ep.done('counted'));
  } else if(scope === 'title') {
    var so = {'title': new RegExp('.*' + keywords + '.*')};

    // Fetch
    Article
    .find({'title': new RegExp('.*' + keywords + '.*')})
    .sort('-pub_date')
    .skip((page - 1) * article_per_page)
    .limit(article_per_page)
    .populate('tags', 'tag_name _id')
    .exec(ep.done('got_arts'));

    // Count
    Article.count(so, ep.done('counted'));
  } else if(scope === 'tag') {
    // Search Tag
    var Tag = mongoose.model('Tag');
    
    Tag
    .find({'tag_name': new RegExp('.*' + keywords + '.*')})
    .exec(function(err, tags) {
      if(err) {
        ep.done('got_arts')(err, null);

        return ;
      }
      var so = {'tags': {'$in': tags}};

      // Fetch
      Article
      .find(so)
      .sort('-pub_date')
      .skip((page - 1) * article_per_page)
      .limit(article_per_page)
      .populate('tags', 'tag_name _id')
      .exec(ep.done('got_arts'));

      // Count
      Article.count(so, ep.done('counted'));
    });
  } else {
    renderError(req, res, 
      '<p><strong>Search Error: </strong> Unkown search scope !</p>');

    return ;
  }
};
  

// Import admin pages
var admin = require('./admin.js');

_.each(admin, function(val, key) {
  exports[key] = val;
});
