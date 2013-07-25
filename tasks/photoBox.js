/*
 * grunt-photoBox
 * https://github.com/stefan/grunt-photoBox
 *
 * Copyright (c) 2013 stefan judis
 * Licensed under the MIT license.
 */

'use strict';


module.exports = function( grunt ) {
  grunt.registerTask(
    'photoBox',
    'Take screenshots for different url\'s and compare them.',
    function() {
      var done     = this.async(),
          options  = this.options( {
            indexPath   : 'photoBox/',
            screenSizes : [ {
              width  : 800,
              height : 900
            } ],
            urls        : [ 'http://4waisenkinder.de' ]
          } ),
          PhotoBox = require( './lib/photoBox' ),
          pb       = new PhotoBox( grunt, options, done );

      pb.startPhotoSession();
    }
  );
};
