define( ["drawing-container"], function( container ) {
  var scribbler = {
    init: function() {
      container.innerHTML = "";
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
    drawing: false,
    onMouseDown: function( e ) {
      scribbler.drawing = true;
      scribbler.paint( e.offsetX, e.offsetY );
    },
    onMouseMove: function( e ) {
      if ( scribbler.drawing ) {
        scribbler.paint( e.offsetX, e.offsetY );
      }
    },
    onMouseUp: function( e ) {
      scribbler.drawing = false;
    },
    paint: function( x, y ) {
      scribbler.ctx.beginPath();
      scribbler.ctx.arc( x, y, 10, 0, 2 * Math.PI, false );
      scribbler.ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      scribbler.ctx.fill();
      scribbler.ctx.closePath();
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
