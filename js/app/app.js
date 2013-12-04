define( ["three", "camera", "controls", "geometry", "light", "material", "renderer", "scene", "scribbler", "texture" ], 
function( three, camera, controls, geometry, light, material, renderer, scene, scribbler, texture ) {
  var app = {
    mesh: new THREE.Mesh( geometry["cube"], material["grass"] ),
    init: function() {
      scene.add( app.mesh );
      light.target = app.mesh;
    },
    animate: function() {
      requestAnimationFrame( app.animate );
      controls.update()
      app.mesh.rotation.x += 0.005;
      app.mesh.rotation.y += 0.01;
      renderer.render( scene, camera );
    }
  }
  return app;
} );
