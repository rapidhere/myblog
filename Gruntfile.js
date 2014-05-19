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
    }
  });

  // load tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
};
