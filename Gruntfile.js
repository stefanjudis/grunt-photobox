/*
 * grunt-photoBox
 * https://github.com/stefan/grunt-photoBox
 *
 * Copyright (c) 2013 stefan judis
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig( {
    // Before generating any new files, remove any previously-created files.
    clean : {
      tests : [ 'tmp' ],
    },


    jshint : {
      all : [
        'Gruntfile.js',
        'tasks/**/*.js',
        'test/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },


    // Configuration to be run (and then tested).
    photobox : {
      waisenkinder : {
        options : {
          indexPath      : 'photobox/',
          highlightColor : '#0000ff',
          screenSizes    : [ '960', '350', '1200' ],
          template       : {
                            name    : 'canvas',
                            options : {
                              highlightColor : '#ff0000', // template.options.hightlightColor || highlightcolor || default
                              diffFilter     : 'grayscale' //  default == no filter 'grayscale' | 'darker' | 'brighter'
                            }
                          },
          urls           : [ 'http://www.faz.net' ]
        }
      }
    },


    // Unit tests.
    nodeunit :  {
      tests : ['test/**/*Test.js']
    }
  } );

  // Actually load this plugin's task(s).
  grunt.loadTasks( 'tasks' );

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks( 'grunt-contrib-jshint' );
  grunt.loadNpmTasks( 'grunt-contrib-clean' );
  grunt.loadNpmTasks( 'grunt-contrib-nodeunit' );

  grunt.registerTask( 'test', [ 'nodeunit', 'clean:tests' ] );

  // By default, lint and run all tests.
  grunt.registerTask( 'default', [ 'jshint', 'test' ] );

};
