<html>
<head>
  <title>photobox</title>
  <style type="text/css">
    * {
      box-sizing: border-box;
    }

    a {
      position: relative;
      color: #fff;
      text-decoration: none;
    }

    a:before {
      content: attr(data-name);
      position: absolute;

      color: #BF4F2B;

      text-overflow: clip;
      white-space: nowrap;
      text-align: left;
      text-shadow: 0 1px 1px #000;

      width: 0;
      height: 105%;

      left: 0;
      top: 0;

      overflow: hidden;

      -moz-transition:    width 0.5s ease-in;
      -webkit-transition: width 0.5s ease-in;
      -o-transition:      width 0.5s ease-in;
      transition:         width 0.5s ease-in;
    }

    a:hover:before {
      width: 100%;
    }

    body {
      font-family: Helvetica;
      font-size: 14px;
      font-weight: 200;
    }

    h1 {
      height: 173px;
      margin: 1em 1% 0 1%;
      padding: 0 0 0 175px;
      color: #2E708A;
      position: relative;
      line-height: 173px;

      font-size: 2em;
      font-weight: 200;

      background-color: #F3CD60;

      box-shadow: 0 1px 1px #555;
    }

    h1 i {
      position: absolute;
      top: 0.5em;
      left: 0.5em;
      width: 145px;
      height: 145px;

      border-radius: 50%;
      border: 2px solid #2E708A;

      box-shadow: 0 1px 1px #555;

      z-index: 1;

      background-repeat: no-repeat;
      background-image: url('data:image/jpg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QNxaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjAtYzA2MSA2NC4xNDA5NDksIDIwMTAvMTIvMDctMTA6NTc6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MDE4MDExNzQwNzIwNjgxMTk5RERBQ0ZFNzYzQUU5NTEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTc4OTRGRUMzNzM0MTFFMzgxRkZENUM3RThDMTI5NjgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTc4OTRGRUIzNzM0MTFFMzgxRkZENUM3RThDMTI5NjgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAxODAxMTc0MDcyMDY4MTE5OUREQUNGRTc2M0FFOTUxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAxODAxMTc0MDcyMDY4MTE5OUREQUNGRTc2M0FFOTUxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwv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');
    }

    h2 {
      margin: 0;
      padding: 0;
      font-weight: 200;

      text-align: center;

      padding: 0.5em;
      color: #fff;
      background-color: #0F3340;
      box-shadow: inset 0 1px 2px #000;
    }

    h3 {
      font-weight: normal;
      font-size: 12px;
      text-align: center;
      color: #fff;
    }

    #semi_border {
      -webkit-animation-direction: normal;
      -moz-animation-direction: normal;
      -o-animation-direction: normal;
      animation-direction: normal;
      -webkit-animation-duration: 1.25s;
      -moz-animation-duration: 1.25s;
      -o-animation-duration: 1.25s;
      animation-duration: 1.25s;
      -webkit-animation-iteration-count: infinite;
      -moz-animation-iteration-count: infinite;
      -o-animation-iteration-count: infinite;
      animation-iteration-count: infinite;
      -webkit-animation-name: semi_border;
      -moz-animation-name: semi_border;
      -o-animation-name: semi_border;
      animation-name: semi_border;
      -webkit-animation-play-state: inherit;
      -moz-animation-play-state: inherit;
      -o-animation-play-state: inherit;
      animation-play-state: inherit;
      -webkit-animation-timing-function: linear;
      -moz-animation-timing-function: linear;
      -o-animation-timing-function: linear;
      animation-timing-function: linear;
      -webkit-animation-play-state: running;
      -moz-animation-play-state: running;
      -o-animation-play-state: running;
      animation-play-state: running;
      border: 7px solid transparent;
      border-left-color: #ffffff;
      border-radius: 50%;
      height: 16px;
      margin: auto;
      width: 16px;

    }

    @-webkit-keyframes semi_border {
      from { -webkit-transform: rotate(0); }
      to { -webkit-transform: rotate(360deg); }
    }
    @-moz-keyframes semi_border {
      from { -moz-transform: rotate(0); }
      to { -moz-transform: rotate(360deg); }
    }
    @-o-keyframes semi_border {
      from { -o-transform: rotate(0); }
      to { -o-transform: rotate(360deg); }
    }
    @keyframes semi_border {
      from { transform: rotate(0); }
      to { transform: rotate(360deg); }
    }

    button {
      margin: 0 auto;
      width: 240px;
      text-align: center;
      display: block;
      padding: 10px;

      background-color: #3da1fe;
      color: #fff;

      border: 0;

      cursor: pointer;

      font-size: 1.5em;
      font-weight: 800;
    }

    main {
      width: 98%;
      margin: 0 auto;
      position: relative;

      background-color: #2E708A;
    }

    .row {
      width: 100%;

      padding: 1% 0;
      margin: 0 0 2% 0;
    }

    .col {
      display: inline-block;
      width: 30%;
      margin-left: 3.333%;

      position: relative;

      vertical-align: top;
    }

    .col canvas {
      width: 100%;
    }

    .col img {
      width: 100%;
      box-shadow: 0 1px 1px #333;
    }

    .col p {
      background-color: #fff;
      box-shadow: inset 0 1px 1px #000;
      text-align: center;
      margin: 0;
      padding: 0.5em;


      color: #fff;
      background-color: #0F3340;
    }

    .colContainer {
      position: relative;
      width: 100%;
      margin-left: -1.666%;
      clear: both;
    }

    .name, .size {
      text-align: center;
      color: #3da1fe;
      float: left;

      color: #fff;

    }

    .name {
      font-size: 2em;

      padding: 0.5em 0.5em 0.5em 1em;
      margin: 1em 0 0 -0.0625em;

      background-color: #F4882D;
      box-shadow: 0 1px 1px #333;
    }

    .size {
      font-size: 1.5em;
      margin: 0.5em 0 ;
      padding: 0.5em;
      clear: left;

      background-color: #0F3340;
      box-shadow: inset 0 1px 2px #000;
    }
  </style>
</head>
<body>
  <h1><i></i>Photobox</h1>
  <main class="">
    <% _.each( _.keys( templateData ), function( url ) { %>
      <% var name  = url.replace( /(http:\/\/|https:\/\/)/, '' ).replace( /\//g, '-' ); %>
      <div class="name"><a href="<%= url %>" data-name="<%= name %>" target="_blank"><%= name %></a></div>

      <% _.each( templateData[ url ], function( size ) {%>
        <div class="row">
          <div class="size"><%= size %></div>
          <div class="colContainer">
            <div class="col">
              <h2>Old screens</h2>
              <img src="" class="last" data-src="img/last/<%= name %>-<%= size %>.png?<%= now %>" data-size="<%= size %>">
              <p><%= timestamps.last %></p>
            </div><div class="col">
              <h2>Difference</h2>
              <h3 class="processing">
                <div id="semi_border"></div>
                we are checking for different pixels..</h3>
              <canvas>canvas is not supported</canvas>
            </div><div class="col">
              <h2>New Screens</h2>
              <img src="" class="current" data-src="img/current/<%= name %>-<%= size %>.png?<%= now %>" data-size="<%= size %>">
              <p><%= timestamps.current %></p>
            </div>
          </div>
        </div>
      <% } );%>
    <% } );%>
  </main>

  <script type="text/javascript">
  ( function() {
    'use strict';
    var imagesList       = document.querySelectorAll( 'img' ),
        images           = Array.prototype.slice.call( imagesList, 0 ),
        lastImages,
        currentImages,
        canvasList,
        processing;

    images.forEach( function( image ) {
      image.src     = image.dataset.src;
      image.onerror = function() {
        event.target.dataset.status = '404';
      }
    } );


    /**
     * prepareDiff inits the canvas for the DIFF and
     * sends image data to the worker
     *
     * @param  {Object} imgA a imgDOM element
     * @param  {Object} imgB a img DOM element
     * @param  {Object} cnvs a canvas DOM element
     */
    function prepareDiff( imgA, imgB, cnvs, processing ) {
      'use strict';

      // get the real image dimensions
      var dummyImage = new Image();
      dummyImage.src = imgA.src;
      cnvs.width     = dummyImage.width;
      cnvs.height    = dummyImage.height;

      var ctx = cnvs.getContext( '2d' );

      // draw first image and get pixel data
      ctx.drawImage( imgA , 0, 0 );
      var pixelsA = ctx.getImageData( 0, 0, dummyImage.width, dummyImage.height );

      ctx.globalAlpha = 0.5;

      // draw second image and get pixel data
      ctx.drawImage( imgB, 0, 0 );
      var pixelsB = ctx.getImageData( 0, 0, dummyImage.width, dummyImage.height );

      var data = {
        a     : pixelsA,
        b     : pixelsB,
        config: {
          higlightColor : '<%= ( options.template.options && options.template.options.highlightColor ) || "#0000ff" %>',
          threshold     : 10,
          diffFilter    : '<%= ( options.template.options && options.template.options.diffFilter ) || "default" %>',
        }
      };

      var worker = new Worker( 'scripts/worker.js' );

      worker.postMessage( data );
      worker.onmessage = function( e ) {
        ctx.putImageData( e.data.imageData, 0, 0 );
        processing.style.display = 'none'
        console.warn( 'Found ', e.data.amount, 'different pixels' );
      };

    }

    window.addEventListener( 'load' , function() {
      lastImages    = document.querySelectorAll( '.last' );
      currentImages = document.querySelectorAll( '.current' );
      canvasList    = document.querySelectorAll( 'canvas' ),
      processing    = document.querySelectorAll( '.processing' );

      for (var i = lastImages.length - 1; i >= 0; i--) {
        if (
          lastImages[ i ].dataset.status !== '404' &&
          currentImages[ i ].dataset.status !== '404'
        ) {
          prepareDiff(
            lastImages[ i ],
            currentImages[ i ],
            canvasList[ i ],
            processing[ i ]
          );
        } else {
          processing[ i ].innerHTML = 'Nothing to process here.<br>' +
                                      'Only one image is available. :(';
        }
      };
    }, false );
  } )();
  </script>

</body>
</html>
