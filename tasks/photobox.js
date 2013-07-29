/*
 * grunt-photobox
 * https://github.com/stefan/grunt-photoBox
 *
 * Copyright (c) 2013 stefan judis
 * Licensed under the MIT license.
 */

'use strict';


module.exports = function( grunt ) {
  grunt.registerMultiTask(
    'photobox',
    'Take screenshots for different url\'s and compare them.',
    function() {
      var done     = this.async(),
          options  = this.options( {
            indexPath   : 'photobox/',
            screenSizes : [ '800x600' ],
            urls        : [ 'http://4waisenkinder.de' ]
          } ),
          Photobox = require( './lib/photobox' ),
          pb       = new Photobox( grunt, options, done );

      pb.startPhotoSession();
    }
  );
};
