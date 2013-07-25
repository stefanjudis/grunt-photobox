/*
 * grunt-photoBox
 * https://github.com/stefan/grunt-photoBox
 *
 * Copyright (c) 2013 stefan judis
 * Licensed under the MIT license.
 */

var events  = require( 'events' ),
    fs      = require( 'fs' ),
    path    = require( 'path' ),
    phantom = require( 'phantom' );


'use strict';


/**
 * Constructor for PhotoBox
 *
 * @param  {Object}   grunt    grunt
 * @param  {Object}   options  plugin options
 * @param  {Function} callback callback
 *
 * @tested
 */
var PhotoBox = function( grunt, options, callback ) {
  this.callback          = callback;
  this.emitter           = new events.EventEmitter();
  this.grunt             = grunt;
  this.options           = options;
  this.options.indexPath = this.getIndexPath();
  this.pictureCount      = 0;

  this.movePictures();
  this.pictures = this.getPreparedPictures();
};


/**
 * Create index file.
 *
 * @tested
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
 * Getter for in constructor set callback function
 * Mostly for testing purposes
 *
 * @return {Function} callback
 */
PhotoBox.prototype.getCallback = function() {
  return this.callback;
};


/**
 * Helper function to evaluate correct path for index file
 *
 * @return {String} indexPath
 *
 * @tested
 */
PhotoBox.prototype.getIndexPath = function() {
  var indexPath = this.options.indexPath;

  if ( !indexPath ) {
    this.grunt.log.error( 'No indexPath set.' );
  }

  if ( indexPath[ indexPath.length - 1 ] !== '/' ) {
    indexPath += '/';
  }

  return indexPath;
};

/**
 * Getter for options
 * Mostly for testing purposes
 *
 * @return {Object} options
 */
PhotoBox.prototype.getOptions = function() {
  return this.options;
};


/**
 * Getter for pictureCount
 * Mostly for testing purposes
 *
 * @return {Number} pictureCount
 */
PhotoBox.prototype.getPictureCount = function() {
  return this.pictureCount;
};


/**
 * Getter for pictures array.
 * Mostly for testing purposes
 *
 * @return {Array} pictures
 */
PhotoBox.prototype.getPictures = function() {
  return this.pictures || null;
};

/**
 * Get prepared picture array.
 *
 * @return {Array} Array with concatenated picture information
 *
 * @tested
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
 *
 * @tested
 */
PhotoBox.prototype.movePictures = function() {
  if ( this.grunt.file.exists( this.options.indexPath + '/img/last' ) ) {
    this.grunt.file.delete( this.options.indexPath + '/img/last' );
  }

  if ( !this.grunt.file.exists( this.options.indexPath + '/img/current' ) ) {
    this.grunt.log.error(
      'No old pictures are existant. So there will be nothing to compare.'
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
 * Setter for picture count
 * Mostly for testing purposes
 *
 * @param  {Number} count count
 * @return {Number}       new set count
 */
PhotoBox.prototype.setPictureCount = function( count ) {
  this.pictureCount = count;

  return this.pictureCount;
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
                    url.replace( /(http:\/\/|https:\/\/)/, '').replace( /\//g, '-') +
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
 *
 * @tested
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
