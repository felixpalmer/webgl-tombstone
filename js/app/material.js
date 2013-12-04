define( ["three", "texture"], function( THREE, texture ) { 
  return {
    solid: new THREE.MeshLambertMaterial( {
      color: 0x00dcdc, 
      shading: THREE.FlatShading 
    }),
    stone1: new THREE.MeshBasicMaterial( { map: texture.stone1 } ),
  };
} );
