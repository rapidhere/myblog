var render = require('../core/utils/template.js').render;
var _ = require('underscore');
var app = global.app;
var mongoose = require('mongoose');
var EventProxy = require('eventproxy');
var ehandler = require('../core/utils/sys.js').ehandler;
var compileMarkdown = require('./utils.js').compileMarkdown;

// The blog mainpage
exports.index = function(req, res) {
  // Get page code
  var page;
  if(! _.has(req.params, 'page')) {
    page = 1;
  } else {
    page = req.params.page;
  }
  
  // Articles per page
  var article_per_page = app.get('article_per_page');

  // Get Model
  var Article = mongoose.model('Article');

  // Fetch
  Article
  .find()
  .sort('-pub_date')
  .skip((page - 1) * article_per_page)
  .limit(article_per_page)
  .populate('tags', 'tag_name')
  .exec(function(err, _arts) {
    if(err) {
      // Reponse Error
      ehandler(req, res, true)(err);
      return ;
    }

    // Filter arts
    var arts = _.map(_arts, function(art) {
      return {
        'title': art.title,
        'content': compileMarkdown(art.content),
        'tags': _.pluck(art.tags, 'tag_name'),
        'pub_date': art.pub_date.toGMTString(),
        'modify_date': art.modify_date.toGMTString(),
      };
    });

    // Render template
    render(res, 'blog/index', {
      'articles': arts,
    });
  });
};

// Import admin pages
var admin = require('./admin.js');

_.each(admin, function(val, key) {
  exports[key] = val;
});
