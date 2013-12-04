define( ["three", "camera", "controls", "geometry", "light", "material", "renderer", "scene", "scribbler", "texture" ], 
function( three, camera, controls, geometry, light, material, renderer, scene, scribbler, texture ) {
  var app = {
    mesh: new THREE.Mesh( geometry["block"], material["stone1"] ),
    init: function() {
      scene.add( app.mesh );
      app.mesh.rotation.x = Math.PI / 8;
      light.target = app.mesh;
    },
    animate: function() {
      requestAnimationFrame( app.animate );
      controls.update()
      app.mesh.rotation.y += 0.006;
      renderer.render( scene, camera );
    }
  }
  return app;
} );
