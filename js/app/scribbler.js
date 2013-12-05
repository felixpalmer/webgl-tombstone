define( ["drawing-container"], function( container ) {
  var scribbler = {
    drawing: false,
    overlay: true,
    updated: false,

    init: function() {
      scribbler.canvas = document.createElement( 'canvas' );
      scribbler.ctx = scribbler.canvas.getContext( '2d' );
      container.appendChild( scribbler.canvas );

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
      scribbler.ctx.clearRect(0, 0, scribbler.canvas.width, scribbler.canvas.height);
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
    onMouseUp: function( e ) {
      scribbler.drawing = false;
    },
    paint: function( x, y ) {
      scribbler.ctx.beginPath();
      scribbler.ctx.arc( x, y, 10, 0, 2 * Math.PI, false );
      scribbler.ctx.fillStyle = "rgba(1, 255, 0, 0.2)";
      scribbler.ctx.fill();
      scribbler.ctx.closePath();
      scribbler.updated = true;
    },
    updateSize: function() {
      scribbler.canvas.width = container.offsetWidth;
      scribbler.canvas.height = container.offsetHeight;
      scribbler.clear();
    }
  };

  scribbler.init();
  return scribbler;
} );
