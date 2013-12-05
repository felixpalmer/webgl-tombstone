define( ["three", "camera", "controls", "geometry", "light", "material", "renderer", "scene", "scribbler", "texture" ], 
function( three, camera, controls, geometry, light, material, renderer, scene, scribbler, texture ) {
  var app = {
    baseMesh: new THREE.Mesh( geometry.block, material.stone1 ),
    drawMesh: new THREE.Mesh( geometry.block, material.scribbler ),
    init: function() {
      scene.add( app.baseMesh );
      scene.add( app.drawMesh );
      app.baseMesh.rotation.x = Math.PI / 8;
      app.drawMesh.rotation.x = Math.PI / 8;

      // Draw mesh is slightly larger, so that it appears in front of base mesh
      app.drawMesh.scale = new THREE.Vector3( 1.01, 1.01, 1.01 );
      light.target = app.mesh;
    },
    animate: function() {
      requestAnimationFrame( app.animate );
      controls.update()
      app.baseMesh.rotation.y += 0.006;
      app.drawMesh.rotation.y += 0.006;

      // Update texture based on what is on drawing canvas
      if ( scribbler.updated ) {
        texture.scribbler.needsUpdate = true;
        scribbler.updated = false;
      }

      renderer.render( scene, camera );
    }
  }
  return app;
} );
