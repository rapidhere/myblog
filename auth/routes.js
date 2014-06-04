var ctrl = require('./ctrl.js');

module.exports = [
  ['/auth/login', ctrl.login],
  ['/auth/loginPage', ctrl.loginPage],
  ['/auth/logout', ctrl.logout],
];
