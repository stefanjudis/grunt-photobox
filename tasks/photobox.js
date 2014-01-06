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
            highlightColor                : '#ff0000',
            indexPath                     : 'photobox/',
            javascriptEnabled             : true,
            localToRemoteUrlAccessEnabled : true,
            loadImages                    : true,
            password                      : '',
            screenSizes                   : [ '800' ],
            template                      : 'cssOverlay',
            userAgent                     : 'Photobox',
            userName                      : '',
            urls                          : [ 'http://google.com' ]
          } ),
          Photobox = require( './lib/photobox' ),
          pb       = new Photobox( grunt, options, done );

      pb.startPhotoSession();
    }
  );
};
