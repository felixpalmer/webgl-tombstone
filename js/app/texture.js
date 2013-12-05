define( ["three", "scribbler"], function( THREE, scribbler ) {
  var texturePath = "js/textures/";
  var scribblerTexture = new THREE.Texture( scribbler.canvas );
  scribblerTexture.needsUpdate = true;
  // Randomly load stone texture
  var stone = "stone" + Math.ceil(2 * Math.random()) + ".png";
  return {
    stone1: THREE.ImageUtils.loadTexture( texturePath + stone ),
    scribbler: scribblerTexture,
  }
} );
