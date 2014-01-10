define( ["app", "scribbler"], function( app, scribbler ) {
  var container = document.getElementById( 'buttons-container' );
  var buttons = {
    "Load depth image": function() {
      scribbler.clear();
      var r = Math.random();
      if ( r < 0.5 ) {
        scribbler.loadImage( "js/textures/quarterBumpmap.png" );
      } else if ( r < 0.8 ) {
        scribbler.loadImage( "js/textures/noiseBumpmap.png" );
      } else {
        scribbler.loadImage( "js/textures/depth.png" );
      }
    },
    "Toggle auto-rotate": function() {
      app.spin = !app.spin;
    },
    "Toggle carving": function() {
      app.carve = !app.carve;
      app.reset();
    },
    "Toggle vertices": function() {
      app.vertices = !app.vertices;
      app.reset();
    },
    "Toggle light": function() {
      app.light = ( app.light + 1 ) % 3;
      app.reset();
    },
    "Clear canvas": function() {
      scribbler.clear();
    }
  };

  for ( var b in buttons ) {
    var button = document.createElement( 'button' );
    button.innerHTML = b;
    button.addEventListener( "click", buttons[b] );
    container.appendChild( button );
  }
} );
