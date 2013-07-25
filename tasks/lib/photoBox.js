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
  this.options      = options;
  this.pictureCount = 0;

  if ( this.options.indexPath[ this.options.indexPath.length - 1 ] !== '/' ) {
    this.options.indexPath += '/';
  }

  this.movePictures();
  this.pictures = this.getPreparedPictures();
};


/**
 * Create index file.
 */
PhotoBox.prototype.createIndexFile = function() {
  this.grunt.file.write(
    this.options.indexPath + 'index.html',
    this.grunt.template.process(
      this.grunt.file.read( path.dirname( __dirname ) + '/tpl/index.tpl'),
      { data : { pictures : this.pictures } }
    )
  );

  this.grunt.log.ok(
    'PhotoBox created new index.html at \'' + this.options.indexPath + '\'.'
  );
};


/**
 * Get picture array.
 *
 * @return {Array} Array with concatenated picture information
 */
PhotoBox.prototype.getPreparedPictures = function() {
  var pictures = [];

  this.options.urls.forEach( function( url ) {
    this.options.screensizes.forEach( function( size ) {
      pictures.push( url + '|' + size );
    } );
  }, this );

  return pictures;
};


/**
 * Move current pictures to latest directory
 */
PhotoBox.prototype.movePictures = function() {
  if ( this.grunt.file.exists( this.options.indexPath + '/img/last' ) ) {
    this.grunt.file.delete( this.options.indexPath + '/img/last' );
  }

  if ( !this.grunt.file.exists( this.options.indexPath + '/img/current' ) ) {
    this.grunt.log.error(
      'No old pictures are existant. So there will be nothing to compare'
    );
  } else {
    fs.renameSync(
      this.options.indexPath + '/img/current',
      this.options.indexPath + '/img/last',
      function( err ) {
        if ( err ) {
          this.grunt.log.error( err );
          this.grunt.verbose.error();
          this.grunt.fail.warn( 'Rename operation failed.' );
        }
      }
    )
  }
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
  this.grunt.log.ok( 'PhotoBox started photo session.' );
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

    this.grunt.verbose.writeln( 'Opened ' + url + '!!! Got status: ' + status );

    page.render( imgPath, function() {
      this.grunt.log.ok(
        'Photo of ' + url + ' in ' + width + 'x' + height + ' taken.'
      );

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
    this.grunt.log.ok( 'PhotoBox finished photo session successfully.' );

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
