var ctrl = require('./ctrl.js');
var checkAdmin = require('./midd.js').checkAdmin;

module.exports = [
  ['/auth/login', ctrl.login],
  ['/auth/loginPage', ctrl.loginPage],
  ['/auth/logout', [checkAdmin], ctrl.logout],
];
