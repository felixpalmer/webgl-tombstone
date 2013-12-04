define( ["three", "camera", "threejs-container"], function( THREE, camera, container ) {
  controls = new THREE.TrackballControls( camera, container );
  return controls;
} );
