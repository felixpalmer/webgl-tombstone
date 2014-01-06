define( ["drawing-container"], function( container ) {
  var scribbler = {
    drawing: false,
    overlay: true,
    updated: false,

    init: function() {
      scribbler.canvas = document.createElement( 'canvas' );
      scribbler.ctx = scribbler.canvas.getContext( '2d' );
      scribbler.gradientCanvas = document.createElement( 'canvas' );
      scribbler.gradientCtx = scribbler.gradientCanvas.getContext( '2d' );
      //container.appendChild( scribbler.canvas );
      container.appendChild( scribbler.gradientCanvas );

      // Update the canvas size when the window is resized
      window.addEventListener( 'resize', scribbler.updateSize, false );
      scribbler.updateSize();

      // Listen for mouse events
      scribbler.canvas.addEventListener( 'mousedown', scribbler.onMouseDown, false );
      scribbler.canvas.addEventListener( 'mousemove', scribbler.onMouseMove, false );
      scribbler.canvas.addEventListener( 'mouseup', scribbler.onMouseUp, false );

      scribbler.clear();
    },
    clear: function() {
      scribbler.ctx.clearRect( 0, 0, scribbler.canvas.width, scribbler.canvas.height );
      scribbler.gradientCtx.clearRect( 0, 0, scribbler.gradientCanvas.width, scribbler.gradientCanvas.height );
      scribbler.updated = true;
    },
    loadImage: function( url ) {
      var img = new Image();
      img.onload = function () {
        scribbler.ctx.drawImage( img, 0, 0, scribbler.canvas.width, scribbler.canvas.height );
        scribbler.computeGradient( {
          x: 0,
          y: 0,
          width: scribbler.canvas.width,
          height: scribbler.canvas.height
        } );
        scribbler.updated = true;
      };
      img.src = url;
    },
    onMouseDown: function( e ) {
      if ( scribbler.overlay ) {
          var overlay = document.getElementById( "drawing-container-overlay");
          container.removeChild( overlay );
          scribbler.overlay = false;
      }
      scribbler.drawing = true;
      scribbler.paint( e.offsetX || e.layerX, e.offsetY || e.layerY );
    },
    onMouseMove: function( e ) {
      if ( scribbler.drawing ) {
        scribbler.paint( e.offsetX || e.layerX, e.offsetY || e.layerY );
      }
    },
    onMouseUp: function() {
      scribbler.drawing = false;
    },
    paint: function( x, y ) {
      scribbler.ctx.beginPath();
      scribbler.ctx.arc( x, y, 10, 0, 2 * Math.PI, false );
      scribbler.ctx.fillStyle = "rgba(1, 255, 0, 0.1)";
      scribbler.ctx.fill();
      scribbler.ctx.closePath();
      scribbler.updated = true;
    },
    updateSize: function() {
      scribbler.canvas.width = container.offsetWidth;
      scribbler.canvas.height = container.offsetHeight;
      scribbler.gradientCanvas.width = container.offsetWidth;
      scribbler.gradientCanvas.height = container.offsetHeight;
      scribbler.clear();
    },
    computeGradient: function( dirtyRect ) {
      var inputPixels = scribbler.ctx.getImageData( dirtyRect.x, dirtyRect.y,
                                                    dirtyRect.width, dirtyRect.height ).data;
      var outputData = scribbler.gradientCtx.getImageData( dirtyRect.x, dirtyRect.y,
                                                             dirtyRect.width, dirtyRect.height );
      var outputPixels = outputData.data;
      for ( var x = 0; x <= dirtyRect.width; x++ ) {
        for ( var y = 0; y <= dirtyRect.height; y++ ) {
          var i = 4 * ( x + y * dirtyRect.width );
          // Copy the alpha channel into the R channel
          outputPixels[i] = inputPixels[i+3];
          outputPixels[i+3] = 255;
        }
      }

      scribbler.gradientCtx.putImageData( outputData, dirtyRect.x, dirtyRect.y );
    }
  };

  scribbler.init();
  return scribbler;
} );
