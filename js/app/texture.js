define( ["three", "scribbler"], function( THREE, scribbler ) {
  var texturePath = "js/textures/";
  var scribblerTexture = new THREE.Texture( scribbler.canvas );
  scribblerTexture.needsUpdate = true;
  scribblerTexture.premultiplyAlpha = true;
  return {
    stone1: THREE.ImageUtils.loadTexture( texturePath + "stone1.png" ),
    scribbler: scribblerTexture,
  }
} );
