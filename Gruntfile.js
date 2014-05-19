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
          'spawn': true, 
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
      var pid = process.pid;
      var pid_file = './.pid';

      if(grunt.file.isFile(pid_file)) {
        grunt.log.writeln('Find previous server ...');
        var last_pid = grunt.file.read(pid_file);

        process.kill(last_pid);
        grunt.log.ok('Previous server killed ...');
      }

      boot.run();
      
      grunt.file.write(pid_file, pid);
      grunt.log.ok('The server start running on port 8080 ...');
    }
  );
  
  // load tasks
  grunt.loadNpmTasks('grunt-contrib-watch');

  // register tasks
  grunt.registerTask('start-watcher', ['watch']);
};
