var ctrl = require('./ctrl.js');

module.exports = [
  ['/blog', ctrl.index],
  ['/blog/index', ctrl.index],
  ['/blog/admin', ctrl.adminMainPage],
  ['/blog/admin/new-article', ctrl.adminNewArticle],
];
