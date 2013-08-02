'use strict';

var fs       = require( 'fs' ),
    grunt    = require( 'grunt' ),
    Photobox = require( '../../tasks/lib/photobox' );

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.photoBox = {
  setUp : function( done ) {
    // setup here if necessary
    done();
  },

  constructor : function( test ) {
    var cbFunction = function() {},
        options    = {
          indexPath   : 'tmp/',
          screenSizes : [ '1000x400' ],
          urls        : [ 'http://google.com' ]
        },
        pb         = new Photobox( grunt, options, cbFunction );

    test.strictEqual( pb.getCallback(), cbFunction );
    test.strictEqual( pb.getOptions(), options );
    test.strictEqual( pb.getPictureCount(), 0 );
    // will be tested in more detail later on
    test.ok( pb.getPictures()[ 0 ] );
    test.done();
  },


  createIndexFile : function( test ) {
    var cbFunction = function() {},
        options    = {
          indexPath   : 'tmp/',
          screenSizes : [ '1000x400' ],
          urls        : [ 'http://google.com' ]
        },
        pb         = new Photobox( grunt, options, cbFunction );

    pb.createIndexFile();

    test.ok( grunt.file.exists( 'tmp/index.html' ) );
    test.done();
  },


  getIndexPath : {
    withSlash : function( test ) {
      var cbFunction = function() {},
          options    = {
            indexPath   : 'tmp/',
            screenSizes : [ '1000x400' ],
            urls        : [ 'http://google.com' ]
          },
          pb         = new Photobox( grunt, options, cbFunction );

      test.strictEqual( pb.getIndexPath(), 'tmp/' );
      test.done();
    },

    withoutSlash : function( test ) {
      var cbFunction = function() {},
          options    = {
            indexPath   : 'tmp',
            screenSizes : [ '1000x400' ],
            urls        : [ 'http://google.com' ]
          },
          pb         = new Photobox( grunt, options, cbFunction );

      test.strictEqual( pb.getIndexPath(), 'tmp/' );
      test.done();
    }
  },


  getPreparedPictures : function( test ) {
    var cbFunction = function() {},
        options    = {
          indexPath   : 'tmp',
          screenSizes : [ '1000x400', '1200x600' ],
          urls        : [ 'http://google.com', 'http://4waisenkinder.de' ]
        },
        pb         = new Photobox( grunt, options, cbFunction ),
        pictures;

    pictures = pb.getPreparedPictures();

    test.strictEqual( pictures.length, 4 );
    test.strictEqual( pictures[ 0 ], 'http://google.com|1000x400' );
    test.strictEqual( pictures[ 1 ], 'http://google.com|1200x600' );
    test.strictEqual( pictures[ 2 ], 'http://4waisenkinder.de|1000x400' );
    test.strictEqual( pictures[ 3 ], 'http://4waisenkinder.de|1200x600' );

    test.done();
  },


  movePictures : {
    currentPicturesAvailable : function( test ) {
      var cbFunction = function() {},
          options    = {
            indexPath   : 'tmp',
            screenSizes : [ '1000x400', '1200x600' ],
            urls        : [ 'http://google.com', 'http://4waisenkinder.de' ]
          },
          pb         = new Photobox( grunt, options, cbFunction );

      grunt.file.write( 'tmp/img/current/test.txt', 'joooo' );

      pb.movePictures();

      test.ok( grunt.file.exists( 'tmp/img/last/test.txt' ) );
      test.done();
    },

    currentPicturesNotAvailable : function( test ) {
      var cbFunction = function() {},
          options    = {
            indexPath   : 'tmp',
            screenSizes : [ '1000x400', '1200x600' ],
            urls        : [ 'http://google.com', 'http://4waisenkinder.de' ]
          },
          pb         = new Photobox( grunt, options, cbFunction ),
          error      = grunt.log.error;

      grunt.log.error = function( msg ) {
        test.strictEqual(
          msg,
          'No old pictures are existant. So you can compare kittens with the new pictures.'
        );

        test.done();
      };

      pb.movePictures();

      grunt.log.error = error;
    }
  },


  overlayCallback : {
    errorAppeared : function( test ) {
      var options         = {
            indexPath   : 'tmp',
            screenSizes : [ '1000x400', '1200x600' ],
            urls        : [ 'http://google.com', 'http://4waisenkinder.de' ]
          },
          pb              = new Photobox( grunt, options ),
          error           = 'dudelidoooooo',
          errorFunction   = grunt.log.error,
          tookDiffHandler = pb.tookDiffHandler;

      grunt.log.error = function() {
        test.strictEqual( arguments.length, 1);
        test.strictEqual( arguments[ 0 ], error );
      }

      pb.tookDiffHandler = function() {
        test.strictEqual( pb.getDiffCount(), 1 );

        test.done();
      }

      pb.overlayCallback( error );

      grunt.log.error    = errorFunction;
      pb.tookDiffHandler = tookDiffHandler;
    },
    noErrorAppeared : function( test ) {
      var options         = {
            indexPath   : 'tmp',
            screenSizes : [ '1000x400', '1200x600' ],
            urls        : [ 'http://google.com', 'http://4waisenkinder.de' ]
          },
          pb              = new Photobox( grunt, options ),
          error           = null,
          okFunction      = grunt.log.ok,
          picture         = 'picture',
          tookDiffHandler = pb.tookDiffHandler;

      grunt.log.ok = function() {
        test.strictEqual( arguments.length, 1);
        test.strictEqual(
          arguments[ 0 ],
          'diff for ' + picture + ' generated.'
        );
      }

      pb.tookDiffHandler = function() {
        test.strictEqual( pb.getDiffCount(), 1 );

        test.done();
      }

      pb.overlayCallback( error, null, null, picture );

      grunt.log.ok       = okFunction;
      pb.tookDiffHandler = tookDiffHandler;
    }
  },


  photoSessionCallback : {
    errorAppeared : function( test ) {
      var options            = {
            indexPath   : 'tmp',
            screenSizes : [ '1000x400', '1200x600' ],
            urls        : [ 'http://google.com', 'http://4waisenkinder.de' ]
          },
          pb                 = new Photobox( grunt, options ),
          error              = 'dudelidoooooo',
          errorFunction      = grunt.log.error,
          errorMsgCount      = 0,
          tookPictureHandler = pb.tookPictureHandler;

      grunt.log.error = function() {
        ++errorMsgCount;
      }

      pb.tookPictureHandler = function() {
        test.strictEqual( pb.getPictureCount(), 1 );
        test.strictEqual( errorMsgCount, 2 );
        test.done();
      }

      pb.photoSessionCallback( error );

      grunt.log.error    = errorFunction;
      pb.tookPictureHandler = tookPictureHandler;
    },
    noErrorAppeared : function( test ) {
      var options            = {
            indexPath   : 'tmp',
            screenSizes : [ '1000x400', '1200x600' ],
            urls        : [ 'http://google.com', 'http://4waisenkinder.de' ]
          },
          pb                 = new Photobox( grunt, options ),
          picture            = 'picture',
          okFunction         = grunt.log.ok,
          tookPictureHandler = pb.tookPictureHandler;

      grunt.log.ok = function() {
        test.strictEqual( arguments.length, 1 );
        test.strictEqual( arguments[ 0 ], 'picture of ' + picture + ' taken.' );
      }

      pb.tookPictureHandler = function() {
        test.strictEqual( pb.getPictureCount(), 1 );
        test.done();
      }

      pb.photoSessionCallback( null, null, null, picture );

      grunt.log.ok          = okFunction;
      pb.tookPictureHandler = tookPictureHandler;
    }
  },


  tookPictureHandler : {
    allPicturesTaken : function( test ) {
      var cbFunction = function() {
            test.done();
          },
          options    = {
            indexPath   : 'tmp',
            screenSizes : [ '1000x400', '1200x600' ],
            urls        : [ 'http://google.com', 'http://4waisenkinder.de' ]
          },
          pb = new Photobox( grunt, options, cbFunction );

      pb.setPictureCount( 4 );
      pb.tookPictureHandler();
    }
  }
};
