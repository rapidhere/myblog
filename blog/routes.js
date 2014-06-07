var ctrl = require('./ctrl.js');
var assignAdmin = require('../auth/midd.js').assignAdmin;
var assignUser = require('../auth/midd.js').assignUser;
var checkArticleId = require('./midd.js').checkArticleId;
var checkTagId = require('./midd.js').checkTagId;

module.exports = [
  ['/', [assignUser], ctrl.index],
  ['/blog', [assignUser], ctrl.index],
  ['/blog/index', [assignUser], ctrl.index],
  ['/blog/index/:page', [assignUser], ctrl.index],
  ['/blog/view/:aid', [assignUser, checkArticleId], ctrl.viewPage],
  ['/blog/admin', [assignAdmin], ctrl.adminMainPage],
  ['/blog/admin/new-article/:aid', [assignAdmin, checkArticleId], ctrl.adminEditArticle],
  ['/blog/admin/new-article', [assignAdmin], ctrl.adminNewArticle],
  ['/blog/admin/post-article', [assignAdmin], ctrl.postNewArticle],
  ['/blog/admin/post-article/:aid', [assignAdmin, checkArticleId], ctrl.updateArticle],
  ['/blog/admin/remove-article/:aid', [assignAdmin, checkArticleId], ctrl.removeArticle],
  ['/blog/admin/remove-tag/:tid', [assignAdmin, checkTagId], ctrl.removeTag],
];
