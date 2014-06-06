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
      'options': {
        'ignores': ['./node_modules/**/*.js', './static/js/*.js'],

        'curly': true,
        'eqeqeq': true,
        'forin': true,
        'freeze': true,
        'immed': true,
        'indent': 4,
        'newcap': true,
        'quotmark': 'single',
        'undef': true,
        'unused': true,
        'maxlen': 80,
      },

      'node-files': {
        'options': {
          'node': true,
        },

        'files': {
          'src': ['**/*.js', '!static/js/**/*.js', '!**/routes.js'],
        }
      },

      'browser-files': {
        'options': {
          'jquery': true,
          'browser': true,
          'strict': true,
          'maxlen': 120,

          'globals': {
            'markdown': true,
          }
        },

        'files': {
          'src': './static/js/**/*.js',
        },
      },
    }
  });

  // load tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
};
