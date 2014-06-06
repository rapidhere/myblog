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
    },

    // Lint codes
    'jshint': {
      'all': {
        'options': {
          'ignores': ['./node_modules/**/*.js', './static/js/*.js'],
        },
        'files': {
          'src': ['**/*.js'],
        }
      }
    }
  });

  // load tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
};
