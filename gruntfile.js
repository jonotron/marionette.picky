module.exports = function(grunt) {
  grunt.initConfig({
    mocha: {
      options: {
        ui: 'bdd',
        reporter: 'Spec'
      },

      all: [ 'spec/runner.html']
    } 
  });

  grunt.loadNpmTasks('grunt-mocha');

  grunt.registerTask('test', 'mocha');
};
