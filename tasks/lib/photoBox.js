/*
 * grunt-photoBox
 * https://github.com/stefan/grunt-photoBox
 *
 * Copyright (c) 2013 stefan judis
 * Licensed under the MIT license.
 */

var fs      = require( 'fs' ),
    path    = require( 'path' ),
    phantom = require( 'phantom' );


'use strict';

var PhotoBox = function( grunt, options, callback ) {
  var events = require( 'events' );

  this.callback     = callback;
  this.emitter      = new events.EventEmitter();
  this.grunt        = grunt;
  this.log          = grunt.log.writeln;
  this.options      = options;
  this.pictureCount = 0;

  if ( this.options.indexPath[ this.options.indexPath.length - 1 ] !== '/' ) {
    this.options.indexPath += '/';
  }

  this.movePictures();
  this.preparePictures();
};


PhotoBox.prototype.createIndexFile = function() {
  this.grunt.file.write(
    this.options.indexPath + 'index.html',
    this.grunt.template.process(
      this.grunt.file.read( path.dirname( __dirname ) + '/tpl/index.tpl'),
      { data : { pictures : this.pictures } }
    )
  );
};

/**
 * Move current pictures to latest directory
 */
PhotoBox.prototype.movePictures = function() {
  if ( this.grunt.file.exists( this.options.indexPath + '/img/last' ) ) {
    this.grunt.file.delete( this.options.indexPath + '/img/last' );
  }

  if ( !this.grunt.file.exists( this.options.indexPath + '/img/current' ) ) {
    this.log(
      'No old pictures are existant. So there will be nothing to compare'
    );
  } else {
    fs.renameSync(
      this.options.indexPath + '/img/current',
      this.options.indexPath + '/img/last',
      function( err ) {
        if ( err ) {
          this.grunt.log.error();
          this.grunt.verbose.error();
          this.grunt.fail.warn( 'Rename operation failed.' );
        }
      }
    )
  }
};


/**
 * Prepare an Array containing all url concatenated
 * with needed sizes
 */
PhotoBox.prototype.preparePictures = function() {
  this.pictures = [];

  this.options.screensizes.forEach( function( size ) {
    this.options.urls.forEach( function( url ) {
      this.pictures.push( url + '|' + size );
    }, this );
  }, this );
};


/**
 * Setup the handler for 'tookPicture' event
 */
PhotoBox.prototype.setupEmitter = function() {
  this.emitter.on( 'tookPicture', this.tookPictureHandler.bind( this ) );
};


/**
 * Start a session of taking pictures
 */
PhotoBox.prototype.startPhotoSession = function() {
  this.setupEmitter();

  phantom.create( function( ph ) {
    ph.createPage( function( page ) {
      this.takePicture(
        ph,
        page,
        this.pictures[ this.pictureCount ]
      );
    }.bind( this ) );
  }.bind( this ) );
};


/**
 * Action to take picture of given url
 *
 * @param  {Object} ph   general phantom object
 * @param  {Object} page phantom page object
 * @param  {String} url  url to take picture of
 */
PhotoBox.prototype.takePicture = function( ph, page, picture ) {

  var split  = picture.split( '|' ),
      url    = split[ 0 ],
      size   = split[ 1 ].split( 'x' ),
      width  = +size[ 0 ],
      height = +size[ 1 ];

  page.set( 'viewportSize', {
      height : height,
      width  : width
  } );

  page.set( 'clipRect', {
    height : height,
    width  : width
  } );

  page.open( url, function( status ) {
    var imgPath = this.options.indexPath +
                    'img/current/' +
                    url.replace( /(http:\/\/|https:\/\/)/, '') +
                    '-' + width + 'x' + height +
                    '.png';

    this.log( 'Opened ' + url + '!!! Got status: ' + status );

    page.render( imgPath, function() {
      this.grunt.log.writeln( 'Photo of ' + url + ' taken.\n' );

      ++this.pictureCount;

      this.emitter.emit( 'tookPicture', ph, page );
    }.bind( this ) );
  }.bind( this ) );
};


/**
 * Handler for emitted event 'tookPicture'
 *
 * @param  {Object} ph   general phantom object
 * @param  {Object} page phantom page object
 */
PhotoBox.prototype.tookPictureHandler = function( ph, page ) {
  if ( this.pictureCount === this.pictures.length ) {
    page.close();
    ph.exit();

    this.createIndexFile();
    // call done() to exit grunt task
    this.callback();
  } else {
    this.takePicture(
      ph,
      page,
      this.pictures[ this.pictureCount ]
    );
  }
};


module.exports = PhotoBox;
