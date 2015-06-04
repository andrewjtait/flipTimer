module.exports = function(grunt) {
  grunt.initConfig({
    jasmine : {
      src : 'js/jquery.flipTimer.js',
      options : {
        vendor: [
          'http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js'
        ],
        specs : 'spec/flipTimer.spec.js'
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jasmine');
};
