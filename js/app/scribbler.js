define( ["drawing-container"], function( container ) {
  var scribbler = {
    init: function() {
      container.innerHTML = "";
      scribbler.canvas = document.createElement( 'canvas' );
      scribbler.ctx = scribbler.canvas.getContext( '2d' );
      container.appendChild( scribbler.canvas );

      var updateSize = function() {
        scribbler.canvas.width = container.offsetWidth;
        scribbler.canvas.height = container.offsetHeight;
      }
      window.addEventListener( 'resize', updateSize, false );
      updateSize();

      scribbler.clear();
    },    
    clear: function() {
      scribbler.ctx.fillStyle = "white";
      scribbler.ctx.fillRect( 0, 0, scribbler.canvas.width, scribbler.canvas.height );
    }
  };

  scribbler.init();
  return scribbler;
} );
