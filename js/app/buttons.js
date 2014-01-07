define( ["app", "scribbler"], function( app, scribbler ) {
  var container = document.getElementById( 'buttons-container' );
  var buttons = {
    "Toggle auto-rotate": function() {
      app.spin = !app.spin;
    },
    "Toggle carving": function() {
      app.carve = !app.carve;
      app.reset();
    },
    "Toggle light": function() {
      app.light = ( app.light + 1 ) % 3;
      app.reset();
    },
    "Load depth image": function() {
      scribbler.clear();
      scribbler.loadImage( "js/textures/depth.png" );
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
