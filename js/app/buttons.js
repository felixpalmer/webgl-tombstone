define( ["app", "scribbler"], function( app, scribbler ) {
  var buttons = document.getElementById( 'buttons-container' );
      // Setup buttons
      var loadImageButton = document.createElement( 'button' );
      loadImageButton.innerHTML = "Load depth image";
      loadImageButton.addEventListener( "click", function() {
        scribbler.clear();
        scribbler.loadImage( "/js/textures/depth.png" );
      });
      buttons.appendChild( loadImageButton );

      var clearButton = document.createElement( 'button' );
      clearButton.innerHTML = "Clear canvas";
      clearButton.addEventListener( "click", function() {
        scribbler.clear();
      });
      buttons.appendChild( clearButton );

      var spinButton = document.createElement( 'button' );
      spinButton.innerHTML = "Toggle auto-rotate";
      spinButton.addEventListener( "click", function() {
        app.spin = !app.spin;
      });
      buttons.appendChild( spinButton );
} );
