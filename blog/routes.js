var ctrl = require('./ctrl.js');
var checkAdmin = require('../auth/midd.js').checkAdmin;
var checkArticleId = require('./midd.js').checkArticleId;

module.exports = [
  ['/blog', ctrl.index],
  ['/blog/index', ctrl.index],
  ['/blog/index/:page', ctrl.index],
  ['/blog/view/:aid', [checkArticleId], ctrl.viewPage],
  ['/blog/admin', [checkAdmin], ctrl.adminMainPage],
  ['/blog/admin/new-article/:aid', [checkAdmin, checkArticleId], ctrl.adminEditArticle],
  ['/blog/admin/new-article', [checkAdmin], ctrl.adminNewArticle],
  ['/blog/admin/post-article', [checkAdmin], ctrl.postNewArticle],
  ['/blog/admin/post-article/:aid', [checkAdmin, checkArticleId], ctrl.updateArticle],
  ['/blog/admin/remove-article/:aid', [checkAdmin, checkArticleId], ctrl.removeArticle],
];
