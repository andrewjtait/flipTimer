module.exports = function(grunt) {
  grunt.initConfig({
    karma: {
      unit: {
        configFile: 'config/karma.conf.js'
      },
      continuous: {
        configFile: 'config/karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
      }
    }
  });
  grunt.loadNpmTasks('grunt-karma');
};
