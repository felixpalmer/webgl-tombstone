define( ["three", "camera", "controls", "geometry", "light", "material", "renderer", "scene", "scribbler", "texture" ],
function( THREE, camera, controls, geometry, light, material, renderer, scene, scribbler, texture ) {
  var app = {
    clock: new THREE.Clock( true ),
    baseMesh: new THREE.Mesh( geometry.block, material.tombstoneLight ),
    drawMesh: new THREE.Mesh( geometry.block, material.scribbler ),
    carve: true,
    spin: false,
    init: function() {
      scene.add( app.baseMesh );
      scene.add( app.drawMesh );
      app.baseMesh.rotation.x = Math.PI / 8;
      app.drawMesh.rotation.x = Math.PI / 8;
      app.drawMesh.visible = false;

      // Draw mesh is slightly larger, so that it appears in front of base mesh
      app.drawMesh.scale = new THREE.Vector3( 1.01, 1.01, 1.01 );
      light.target = app.mesh;
    },
    reset: function() {
      if ( app.carve ) {
        app.drawMesh.visible = false;
        app.baseMesh.material = material.tombstone;
      } else {
        app.drawMesh.visible = true;
        app.baseMesh.material = material.stone1;
      }
    },
    animate: function() {
      window.requestAnimationFrame( app.animate );
      controls.update();
      if ( app.spin ) {
        app.baseMesh.rotation.y += 0.006;
        app.drawMesh.rotation.y += 0.006;
      }

      // Update texture based on what is on drawing canvas
      if ( scribbler.updated ) {
        texture.scribbler.needsUpdate = true;
        scribbler.updated = false;
      }

      // Rotate light around object
      light.position.x = 100 * Math.sin( app.clock.getElapsedTime() );
      light.position.z = 100 * Math.cos( app.clock.getElapsedTime() );
      material.tombstoneLight.uniforms.uLight.value = light.position;
      renderer.render( scene, camera );
    }
  };
  return app;
} );
