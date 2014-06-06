var ctrl = require('./ctrl.js');
var checkAdmin = require('./midd.js').checkAdmin;
var assignUser = require('./midd.js').assignUser;

module.exports = [
  ['/auth/login', ctrl.login],
  ['/auth/loginPage', ctrl.loginPage],
  ['/auth/logout', [assignUser], ctrl.logout],
];
