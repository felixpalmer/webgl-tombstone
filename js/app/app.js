define( ["three", "camera", "controls", "geometry", "light", "material", "renderer", "scene", "scribbler", "texture" ],
function( THREE, camera, controls, geometry, light, material, renderer, scene, scribbler, texture ) {
  var app = {
    baseMesh: new THREE.Mesh( geometry.block, material.tombstone ),
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

      renderer.render( scene, camera );
    }
  };
  return app;
} );
