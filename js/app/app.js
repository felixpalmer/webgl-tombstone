define( ["three", "camera", "controls", "geometry", "light", "material", "renderer", "scene", "scribbler", "texture" ],
function( THREE, camera, controls, geometry, light, material, renderer, scene, scribbler, texture ) {
  var app = {
    clock: new THREE.Clock( true ),
    baseMesh: new THREE.Mesh( geometry.block, material.tombstoneLight ),
    drawMesh: new THREE.Mesh( geometry.block, material.scribbler ),
    carve: true,
    light: 0,
    spin: false,
    init: function() {
      scene.add( app.baseMesh );
      scene.add( app.drawMesh );
      app.baseMesh.rotation.x = Math.PI / 8;
      app.drawMesh.rotation.x = Math.PI / 8;
      app.drawMesh.visible = false;

      // Draw mesh is slightly larger, so that it appears in front of base mesh
      app.drawMesh.scale = new THREE.Vector3( 1.01, 1.01, 1.01 );

      app.reset();
    },
    reset: function() {
      if ( app.carve ) {
        app.drawMesh.visible = false;
        if ( app.light === 0) {
          app.baseMesh.material = material.tombstone;
        } else if ( app.light === 1) {
          app.baseMesh.material = material.tombstoneLight;
        } else if ( app.light === 2) {
          app.baseMesh.material = material.tombstoneLight2;
        }
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
      if ( app.light === 1) {
        light.position.x = 200 * Math.sin( app.clock.getElapsedTime() );
        material.tombstoneLight.uniforms.uLight.value = light.position;
      } else if ( app.light === 2) {
        light.position.x = 50 * Math.sin( app.clock.getElapsedTime() );
        light.position.y = 70 * Math.cos( app.clock.getElapsedTime() );
        material.tombstoneLight2.uniforms.uLight.value = light.position;
      }
      renderer.render( scene, camera );
    }
  };
  return app;
} );
