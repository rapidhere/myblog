var render = require('../core/utils/template.js').render;
var renderError = require('../core/utils/template.js').renderError;
var render404 = require('../core/utils/template.js').render404;
var _ = require('underscore');
var app = global.app;
var mongoose = require('mongoose');
var compileMarkdown = require('./utils.js').compileMarkdown;
var EventProxy = require('eventproxy');

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
      "<p><strong>Page Error:</strong> Invalid Page code!</p>");
    return ;
  }
  
  // Articles per page
  var article_per_page = app.get('article_per_page');

  // Create Event Proxy
  var ep = new EventProxy();

  ep.all('counted', 'got_arts', function(count, _arts) {
    // Page code is too small or too large
    var front_arts = (page - 1) * article_per_page;
    if(front_arts < 0 || front_arts >= count) {
      render404(req, res);
      return ;
    }
  
    // The pagination object
    var pagination = {};

    // has previous
    if(front_arts > 0) {
      pagination.prev = page - 1;
    }

    // has next
    if(front_arts + article_per_page < count) {
      pagination.next = page + 1;
    }

    // Filter arts
    var arts = _.map(_arts, function(art) {
      return {
        '_id': art._id, 
        'title': art.title,
        'content': compileMarkdown(art.content),
        'tags': _.pluck(art.tags, 'tag_name'),
        'pub_date': art.pub_date.toGMTString(),
        'modify_date': art.modify_date.toGMTString(),
      };
    });

    // Render template
    render(req, res, 'blog/index', {
      'articles': arts,
      'pagination': pagination,
    });
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
  .populate('tags', 'tag_name')
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
        'tags': _.pluck(art.tags, 'tag_name'),
        'pub_date': art.pub_date.toGMTString(),
        'modify_date': art.modify_date.toGMTString(),
      }
    });
  });
};

// Import admin pages
var admin = require('./admin.js');

_.each(admin, function(val, key) {
  exports[key] = val;
});
