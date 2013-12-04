define( ["three", "drawing-container", "camera", "controls", "geometry", "light", "material", "renderer", "scene", "texture" ], 
function( three, container, camera, controls, geometry, light, material, renderer, scene, texture ) {
  var app = {
    mesh: new THREE.Mesh( geometry["cube"], material["grass"] ),
    init: function() {
      scene.add( app.mesh );
      light.target = app.mesh;

      container.innerHTML = "";
      var canvas = document.createElement( 'canvas' );
      var updateSize = function() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
      }
      window.addEventListener( 'resize', updateSize, false );
      updateSize();
      container.appendChild( canvas );

      var ctx = canvas.getContext( '2d' );
      ctx.fillStyle = "white";
      ctx.fillRect( 0, 0, canvas.width, canvas.height );

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
