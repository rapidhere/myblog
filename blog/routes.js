var ctrl = require('./ctrl.js');
var checkAdmin = require('../auth/midd.js').checkAdmin;

module.exports = [
  ['/blog', ctrl.index],
  ['/blog/index', ctrl.index],
  ['/blog/index/:page', ctrl.index],
  ['/blog/view/:id', ctrl.viewPage],
  ['/blog/admin', [checkAdmin], ctrl.adminMainPage],
  ['/blog/admin/new-article/:aid', [checkAdmin], ctrl.adminMainPage],
  ['/blog/admin/new-article', [checkAdmin], ctrl.adminNewArticle],
  ['/blog/admin/post-new-article', [checkAdmin], ctrl.postNewArticle],
];
