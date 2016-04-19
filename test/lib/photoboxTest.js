'use strict';

var fs       = require( 'fs' ),
    grunt    = require( 'grunt' ),
    Photobox = require( '../../tasks/lib/photobox' );

exports.photoBox = {
  setUp : function( done ) {
    // setup here if necessary
    done();
  },

  constructor : {
    general : function( test ) {
      var cbFunction = function() {},
          options    = {
            indexPath   : 'tmp/',
            template    : {
                  name    : 'canvas',
                  options : {
                    highlightColor : '#ff0000', // template.options.hightlightColor || highlightcolor || default
                    diffFilter     : 'default' //  default == no filter 'grayscale' | 'darker' | 'brighter'
                  }
                },
            screenSizes : [ '1000' ],
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
    relativeImagesExist : function( test ) {
      var options       = {
            indexPath     : 'tmp/',
            relativePaths : true,
            template      : 'magic',
            screenSizes   : [ '350' ],
            urls          : [ 'http://google.com' ]
          };

      var cbFunction = function() {
        test.strictEqual(
          grunt.file.exists(
            'tmp/img/current/index-350.png'
          ),
          true
        );
        test.done();
      };

      var pb  = new Photobox( grunt, options, cbFunction );
      pb.startPhotoSession();
    },
    template : {
      templateIsSetAsString : function( test ) {
        var cbFunction = function() {},
            options    = {
              indexPath   : 'tmp/',
              template    : 'magic',
              screenSizes : [ '1000' ],
              urls        : [ 'http://google.com' ]
            },
            pb         = new Photobox( grunt, options, cbFunction );

        test.strictEqual( pb.template, 'magic' );

        test.done();
      },
      templateIsSetAsObject : function( test ) {
        var cbFunction = function() {},
            options    = {
              indexPath   : 'tmp/',
              template    : {
                    name    : 'canvas',
                    options : {
                      highlightColor : '#ff0000', // template.options.hightlightColor || highlightcolor || default
                      diffFilter     : 'default' //  default == no filter 'grayscale' | 'darker' | 'brighter'
                    }
                  },
              screenSizes : [ '1000' ],
              urls        : [ 'http://google.com' ]
            },
            pb         = new Photobox( grunt, options, cbFunction );

        test.strictEqual( pb.template, 'canvas' );

        test.done();
      }
    }
  },


  createDiffImages : {
    imagesExist : function( test ) {
      var cbFunction    = function() {},
          options       = {
            indexPath   : 'tmp/',
            template    : 'magic',
            screenSizes : [ '350' ],
            urls        : [ 'http://google.com' ]
          },
          pb            = new Photobox( grunt, options, cbFunction ),
          callback      = pb.compositeCallback;

      grunt.file.copy(
        'test/img/current/google.com-350.png',
        'tmp/img/current/google.com-350.png'
      );

      grunt.file.copy(
        'test/img/last/google.com-350.png',
        'tmp/img/last/google.com-350.png'
      );

      pb.compositeCallback = function() {
        test.strictEqual(
          grunt.file.exists(
            'tmp/img/diff/google.com-350-diff.png'
          ),
          true
        );
        test.done();
      };

      pb.createDiffImages();
    },
    imagesDoesntExist : function( test ) {
      var cbFunction    = function() {},
          options       = {
            indexPath   : 'tmp/',
            template    : 'magic',
            screenSizes : [ '350' ],
            urls        : [ 'http://doesnotexit.com' ]
          },
          pb            = new Photobox( grunt, options, cbFunction ),
          count         = pb.diffCount;

      pb.tookDiffHandler = function() {
        test.strictEqual(
          pb.diffCount,
          count + 1
        );

        test.done();
      };

      pb.createDiffImages();
    }
  },

  createIndexFile : function( test ) {
    var cbFunction    = function() {},
        options       = {
          indexPath   : 'tmp/',
          template    : {
                name    : 'canvas',
                options : {
                  highlightColor : '#ff0000', // template.options.hightlightColor || highlightcolor || default
                  diffFilter     : 'default' //  default == no filter 'grayscale' | 'darker' | 'brighter'
                }
              },
          screenSizes : [ '1000' ],
          urls        : [ 'http://google.com' ]
        },
        pb            = new Photobox( grunt, options, cbFunction ),
        getTimestamps = pb.getTimeStamps;

    pb.getTimestamps = function() {
      return {};
    };

    pb.createIndexFile();

    test.ok( grunt.file.exists( 'tmp/index.html' ) );
    test.done();

    grunt.file.delete( 'tmp/index.html' );
    pb.getTimestamps = getTimestamps;
  },


  getIndexPath : {
    withSlash : function( test ) {
      var cbFunction = function() {},
          options    = {
            indexPath   : 'tmp/',
            template    : {
                  name    : 'canvas',
                  options : {
                    highlightColor : '#ff0000', // template.options.hightlightColor || highlightcolor || default
                    diffFilter     : 'default' //  default == no filter 'grayscale' | 'darker' | 'brighter'
                  }
                },
            screenSizes : [ '1000' ],
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
            template    : {
                  name    : 'canvas',
                  options : {
                    highlightColor : '#ff0000', // template.options.hightlightColor || highlightcolor || default
                    diffFilter     : 'default' //  default == no filter 'grayscale' | 'darker' | 'brighter'
                  }
                },
            screenSizes : [ '1000' ],
            urls        : [ 'http://google.com' ]
          },
          pb         = new Photobox( grunt, options, cbFunction );

      test.strictEqual( pb.getIndexPath(), 'tmp/' );
      test.done();
    }
  },


  getPreparedPictures : {
    correctFormat : function( test ) {
      var cbFunction = function() {},
          options    = {
            indexPath   : 'tmp',
            template    : {
                  name    : 'canvas',
                  options : {
                    highlightColor : '#ff0000', // template.options.hightlightColor || highlightcolor || default
                    diffFilter     : 'default' //  default == no filter 'grayscale' | 'darker' | 'brighter'
                  }
                },
            screenSizes : [ '1000', '1200' ],
            urls        : [ 'http://google.com', 'http://4waisenkinder.de' ]
          },
          pb         = new Photobox( grunt, options, cbFunction ),
          pictures;

      pictures = pb.getPreparedPictures();

      test.strictEqual( pictures.length, 4 );
      test.strictEqual( pictures[ 0 ], 'http://google.com#1000' );
      test.strictEqual( pictures[ 1 ], 'http://google.com#1200' );
      test.strictEqual( pictures[ 2 ], 'http://4waisenkinder.de#1000' );
      test.strictEqual( pictures[ 3 ], 'http://4waisenkinder.de#1200' );

      test.done();
    },
    // TODO really tried to test the
    // grunt.fatal call but was not able to... :(
    //
    // Suggestions are really welcome
    incorrectFormat : function( test ) {
      test.done();
    }
  },


  getTimestamp : {
    fileExists : function( test ) {
      var timestampFilePath = './tmp/img/test/timestamp.json',
          options           = {
            indexPath   : 'tmp',
            template    : {
                  name    : 'canvas',
                  options : {
                    highlightColor : '#ff0000', // template.options.hightlightColor || highlightcolor || default
                    diffFilter     : 'default' //  default == no filter 'grayscale' | 'darker' | 'brighter'
                  }
                },
            screenSizes : [ '1000', '1200' ],
            urls        : [ 'http://google.com', 'http://4waisenkinder.de' ]
          },
          pb                = new Photobox( grunt, options );

      grunt.file.write(
        timestampFilePath,
        JSON.stringify( { timestamp : 'someTimestamp' } )
      );

      test.strictEqual( pb.getTimestamp( 'test' ), 'someTimestamp' );
      test.done();

      grunt.file.delete(
        timestampFilePath
      );
    },
    fileDoesntExist : function( test ) {
      var timestampFilePath = 'img/test/timestamp.json',
          options           = {
            indexPath   : 'tmp',
            template    : {
                  name    : 'canvas',
                  options : {
                    highlightColor : '#ff0000', // template.options.hightlightColor || highlightcolor || default
                    diffFilter     : 'default' //  default == no filter 'grayscale' | 'darker' | 'brighter'
                  }
                },
            screenSizes : [ '1000', '1200' ],
            urls        : [ 'http://google.com', 'http://4waisenkinder.de' ]
          },
          pb                = new Photobox( grunt, options );

      test.strictEqual( pb.getTimestamp( 'test' ), 'Not available' );
      test.done();
    }
  },


  getTimestamps : function( test ) {
    var options      = {
          indexPath   : 'tmp',
          template    : {
                  name    : 'canvas',
                  options : {
                    highlightColor : '#ff0000', // template.options.hightlightColor || highlightcolor || default
                    diffFilter     : 'default' //  default == no filter 'grayscale' | 'darker' | 'brighter'
                  }
                },
          screenSizes : [ '1000', '1200' ],
          urls        : [ 'http://google.com', 'http://4waisenkinder.de' ]
        },
        pb           = new Photobox( grunt, options ),
        getTimestamp = pb.getTimestamp,
        timestamps;

    pb.getTimestamp = function( name ) {
      return name;
    };

    timestamps = pb.getTimestamps();

    test.strictEqual( typeof timestamps, 'object' );
    test.strictEqual( timestamps.current, 'current' );
    test.strictEqual( timestamps.last, 'last' );
    test.strictEqual( Object.keys( timestamps ).length, 2 );
    test.done();

    pb.getTimestamp = getTimestamp;
  },


  movePictures : {
    currentPicturesAvailable : function( test ) {
      var cbFunction = function() {},
          options    = {
            indexPath   : 'tmp',
            template    : {
                  name    : 'canvas',
                  options : {
                    highlightColor : '#ff0000', // template.options.hightlightColor || highlightcolor || default
                    diffFilter     : 'default' //  default == no filter 'grayscale' | 'darker' | 'brighter'
                  }
                },
            screenSizes : [ '1000', '1200' ],
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
            template    : {
                  name    : 'canvas',
                  options : {
                    highlightColor : '#ff0000', // template.options.hightlightColor || highlightcolor || default
                    diffFilter     : 'default' //  default == no filter 'grayscale' | 'darker' | 'brighter'
                  }
                },
            screenSizes : [ '1000', '1200' ],
            urls        : [ 'http://google.com', 'http://4waisenkinder.de' ]
          },
          pb         = new Photobox( grunt, options, cbFunction ),
          error      = grunt.log.error;

      grunt.log.error = function( msg ) {
        test.strictEqual(
          msg,
          'No old pictures are existant.'
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
            template    : {
                  name    : 'canvas',
                  options : {
                    highlightColor : '#ff0000', // template.options.hightlightColor || highlightcolor || default
                    diffFilter     : 'default' //  default == no filter 'grayscale' | 'darker' | 'brighter'
                  }
                },
            screenSizes : [ '1000', '1200' ],
            urls        : [ 'http://google.com', 'http://4waisenkinder.de' ]
          },
          pb              = new Photobox( grunt, options ),
          error           = 'dudelidoooooo',
          errorFunction   = grunt.log.error,
          tookDiffHandler = pb.tookDiffHandler;

      grunt.log.error = function() {
        test.strictEqual( arguments.length, 1);
        test.strictEqual( arguments[ 0 ], error );
      };

      pb.tookDiffHandler = function() {
        test.strictEqual( pb.getDiffCount(), 1 );

        test.done();
      };

      pb.overlayCallback( error );

      grunt.log.error    = errorFunction;
      pb.tookDiffHandler = tookDiffHandler;
    },
    noErrorAppeared : function( test ) {
      var options         = {
            indexPath   : 'tmp',
            template    : {
                  name    : 'canvas',
                  options : {
                    highlightColor : '#ff0000', // template.options.hightlightColor || highlightcolor || default
                    diffFilter     : 'default' //  default == no filter 'grayscale' | 'darker' | 'brighter'
                  }
                },
            screenSizes : [ '1000', '1200' ],
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
      };

      pb.tookDiffHandler = function() {
        test.strictEqual( pb.getDiffCount(), 1 );

        test.done();
      };

      pb.overlayCallback( error, null, null, picture );

      grunt.log.ok       = okFunction;
      pb.tookDiffHandler = tookDiffHandler;
    }
  },


  photoSessionCallback : {
    errorAppeared : function( test ) {
      var options            = {
            indexPath   : 'tmp',
            template    : {
                  name    : 'canvas',
                  options : {
                    highlightColor : '#ff0000', // template.options.hightlightColor || highlightcolor || default
                    diffFilter     : 'default' //  default == no filter 'grayscale' | 'darker' | 'brighter'
                  }
                },
            screenSizes : [ '1000', '1200' ],
            urls        : [ 'http://google.com', 'http://4waisenkinder.de' ]
          },
          pb                 = new Photobox( grunt, options ),
          error              = 'dudelidoooooo',
          errorFunction      = grunt.log.error,
          errorMsgCount      = 0,
          tookPictureHandler = pb.tookPictureHandler;

      grunt.log.error = function() {
        ++errorMsgCount;
      };

      pb.tookPictureHandler = function() {
        test.strictEqual( pb.getPictureCount(), 1 );
        test.strictEqual( errorMsgCount, 1 );
        test.done();
      };

      pb.photoSessionCallback( error );

      grunt.log.error    = errorFunction;
      pb.tookPictureHandler = tookPictureHandler;
    },
    noErrorAppeared : function( test ) {
      var options            = {
            indexPath   : 'tmp',
            template    : {
                  name    : 'canvas',
                  options : {
                    highlightColor : '#ff0000', // template.options.hightlightColor || highlightcolor || default
                    diffFilter     : 'default' //  default == no filter 'grayscale' | 'darker' | 'brighter'
                  }
                },
            screenSizes : [ '1000', '1200' ],
            urls        : [ 'http://google.com', 'http://4waisenkinder.de' ]
          },
          pb                 = new Photobox( grunt, options ),
          picture            = 'picture',
          okFunction         = grunt.log.ok,
          tookPictureHandler = pb.tookPictureHandler;

      grunt.log.ok = function() {
        test.strictEqual( arguments.length, 1 );
        test.strictEqual( arguments[ 0 ], 'picture of ' + picture + ' taken.' );
      };

      pb.tookPictureHandler = function() {
        test.strictEqual( pb.getPictureCount(), 1 );
        test.done();
      };

      pb.photoSessionCallback( null, null, null, picture );

      grunt.log.ok          = okFunction;
      pb.tookPictureHandler = tookPictureHandler;
    }
  },


  startPhotoSession : function( test ) {
    var options = {
          indexPath   : 'tmp',
          template    : {
                  name    : 'canvas',
                  options : {
                    highlightColor : '#ff0000', // template.options.hightlightColor || highlightcolor || default
                    diffFilter     : 'default' //  default == no filter 'grayscale' | 'darker' | 'brighter'
                  }
                },
          screenSizes : [ '1000', '1200' ],
          urls        : [ 'http://google.com', 'http://4waisenkinder.de' ]
        },
        pb              = new Photobox( grunt, options ),
        spawn           = grunt.util.spawn,
        count           = 0;

    grunt.util.spawn = function() {
      count++;

      test.strictEqual( typeof arguments[ 0 ], 'object' );
      test.ok( arguments[ 0 ].cmd.match( /phantom/gi ) );
      test.strictEqual( arguments[ 0 ].args instanceof Array, true );
      test.strictEqual( arguments[ 0 ].args.length, 5 );
      test.strictEqual( typeof arguments[ 0 ].opts, 'object' );

      test.strictEqual( typeof arguments[ 1 ], 'function' );

      if ( count === 4 ) {
        test.strictEqual(
          grunt.file.exists( 'tmp/img/current/timestamp.json' ),
          true
        );

        test.strictEqual(
          grunt.file.exists( 'tmp/options.json' ),
          true
        );

        test.done();
      }
    };

    pb.startPhotoSession();

    grunt.util.spawn = spawn;
  },


  tookPictureHandler : {
    canvasMode  : function( test ) {
      var cbFunction = function() {
            test.ok( grunt.file.exists( 'tmp/index.html' ) );
            test.ok( grunt.file.exists( 'tmp/scripts/worker.js' ) );

            test.done();

            grunt.file.delete( 'tmp/index.html' );
            grunt.file.delete( 'tmp/scripts/worker.js' );
          },
          options    = {
            indexPath   : 'tmp',
            template    : {
                  name    : 'canvas',
                  options : {
                    highlightColor : '#ff0000', // template.options.hightlightColor || highlightcolor || default
                    diffFilter     : 'default' //  default == no filter 'grayscale' | 'darker' | 'brighter'
                  }
                },
            screenSizes : [ '1000', '1200' ],
            urls        : [ 'http://google.com', 'http://4waisenkinder.de' ]
          },
          pb = new Photobox( grunt, options, cbFunction );

      pb.setPictureCount( 4 );
      pb.tookPictureHandler();
    },
    magicMode   : function( test ) {
      var cbFunction = function() {},
          options    = {
            indexPath   : 'tmp',
            template    : 'magic',
            screenSizes : [ '1000', '1200' ],
            urls        : [ 'http://google.com', 'http://4waisenkinder.de' ]
          },
          pb = new Photobox( grunt, options, cbFunction );

      pb.createDiffImages = function() {
        test.done();
      };

      pb.setPictureCount( 4 );
      pb.tookPictureHandler();
    }
  },


  writeOptionsFile : function( test ) {
    var options            = {
          indexPath   : 'tmp',
          template    : {
                  name    : 'canvas',
                  options : {
                    highlightColor : '#ff0000', // template.options.hightlightColor || highlightcolor || default
                    diffFilter     : 'default' //  default == no filter 'grayscale' | 'darker' | 'brighter'
                  }
                },
          screenSizes : [ '1000' ],
          urls        : [ 'http://google.com' ]
        },
        pb                 = new Photobox( grunt, options ),
        readOptions;

    pb.writeOptionsFile( options );

    readOptions = JSON.parse( grunt.file.read( 'tmp/options.json' ) );

    test.strictEqual( grunt.file.exists( 'tmp/options.json' ), true );
    test.strictEqual( readOptions.indexPath, 'tmp/' );
    test.strictEqual( readOptions.screenSizes.length, 1 );
    test.strictEqual( readOptions.screenSizes[ 0 ], '1000' );
    test.strictEqual( readOptions.urls.length, 1 );
    test.strictEqual( readOptions.urls[ 0 ], 'http://google.com' );
    test.done();

    grunt.file.delete( 'tmp/options.json' );
  },


  writeTimestampFile : function( test ) {
    var options            = {
          indexPath   : 'tmp',
          template    : {
                  name    : 'canvas',
                  options : {
                    highlightColor : '#ff0000', // template.options.hightlightColor || highlightcolor || default
                    diffFilter     : 'default' //  default == no filter 'grayscale' | 'darker' | 'brighter'
                  }
                },
          screenSizes : [ '1000', '1200' ],
          urls        : [ 'http://google.com', 'http://4waisenkinder.de' ]
        },
        pb                 = new Photobox( grunt, options );

    pb.writeTimestampFile();

    test.strictEqual(
      grunt.file.exists( 'tmp/img/current/timestamp.json' ),
      true
    );
    test.ok(
      JSON.parse(
        grunt.file.read( 'tmp/img/current/timestamp.json' )
      ).timestamp
    );

    test.done();

    grunt.file.delete( 'tmp/img/current/timestamp.json' );
  },

  setTimeOut : function ( test ) {
    var options            = {
          indexPath   : 'tmp',
          template    : {
                  name    : 'canvas',
                  options : {
                    highlightColor : '#ff0000', // template.options.hightlightColor || highlightcolor || default
                    diffFilter     : 'default' //  default == no filter 'grayscale' | 'darker' | 'brighter'
                  }
                },
          screenSizes : [ '1000' ],
          urls        : [ 'http://google.com' ],
          timeOut     : 2000
        },
        pb                 = new Photobox( grunt, options ),
        readOptions;

    pb.writeOptionsFile( options );

    readOptions = JSON.parse( grunt.file.read( 'tmp/options.json' ) );

    test.strictEqual( grunt.file.exists( 'tmp/options.json' ), true );
    test.strictEqual( readOptions.indexPath, 'tmp/' );
    test.strictEqual( readOptions.screenSizes.length, 1 );
    test.strictEqual( readOptions.screenSizes[ 0 ], '1000' );
    test.strictEqual( readOptions.urls.length, 1 );
    test.strictEqual( readOptions.urls[ 0 ], 'http://google.com' );
    test.strictEqual( readOptions.timeOut, 2000 );
    test.done();

    grunt.file.delete( 'tmp/options.json' );
  }
};
