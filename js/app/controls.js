define( ["three", "camera", "threejs-container"], function( THREE, camera, container ) {
  var controls = new THREE.TrackballControls( camera, container );
  return controls;
} );
