module.exports = function(grunt) {
  // Project Configuration here
  grunt.initConfig({
    // Watch task
    'watch': {
      'configFiles': {
        'files': ['Gruntfile.js'],
        'options': {
          'reload': true
        }
      }, 
      'server': {
        'files': ['**/*'],
        'tasks': ['load-server'],
        'options': {
          'interval': 1000,
          'interrupte': true,
        },
      }
    },
  });

  // Custom load-server task
  grunt.registerTask(
    'load-server',
    'Load or reload the http server. For development usage',
    function() {
      grunt.log.writeln('Loading/Reloading server ...');

      var boot = require('./core/boot.js');

      boot.run();

      grunt.log.ok('The server start running on port 8080 ...');
    }
  );
  
  // load tasks
  grunt.loadNpmTasks('grunt-contrib-watch');

  // register tasks
  grunt.registerTask('start-watcher', ['load-server', 'watch']);
};
