/* global document */

/*
 * grunt-photoBox
 * https://github.com/stefan/grunt-photoBox
 *
 * Copyright (c) 2013 stefan judis
 * Licensed under the MIT license.
 */



var system        = require ( 'system' ),
    webpage       = require( 'webpage' ),
    fs            = require( 'fs' ),
    page          = webpage.create(),
    picture       = system.args[ 1 ],
    split         = picture.split( '#' ),
    url           = split[ 0 ],
    width         = +split[ 1 ],
    image         = split[ 2 ],
    indexPath     = system.args[ 2 ],
    timeOut       = 1000,
    settings      = fs.read( indexPath + 'options.json' );

if ( settings !== '{}' ) {
  try {
    system.stderr.writeLine( 'Read settings: ' + settings );
    settings = JSON.parse( settings );

    page.settings = settings;
    timeOut = settings.timeOut || timeOut;
  } catch( e ) {
    console.warn( 'CONSOLE: Error parsing settings | ' + e );

    phantom.exit( 1 );
  }
}

page.onError = function ( msg ) {
  system.stderr.writeLine( 'ERROR:' + msg );
};

page.onConsoleMessage = function( msg, lineNum, sourceId ) {
  system.stderr.writeLine( 'CONSOLE: ' + msg, lineNum, sourceId );
};

page.viewportSize = {
  height : 1000,
  width  : width
};

page.open( url, function( status ) {
  window.setTimeout( function() {
    var height = page.evaluate( function() {
       return Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );
    } );

    page.clipRect = {
      top    : 0,
      left   : 0,
      height : height,
      width  : width
    };

    var imgPath = indexPath +
                    'img/current/' +
                    image +
                    '-' + width +
                    '.png';

    console.log( 'Rendering ' + picture, width);
    page.render( imgPath );

    phantom.exit();
  }, timeOut );
} );
