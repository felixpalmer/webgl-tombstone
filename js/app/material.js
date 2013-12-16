define( ["three", "shader", "texture"], function( THREE, shader, texture ) {
  return {
    simple: new THREE.ShaderMaterial( {
      uniforms: {
        uColor: { type: "c", value: new THREE.Color( "#ff0000" ) }
      },
      vertexShader: shader.vertex.simple,
      fragmentShader: shader.fragment.simple
    }),
    solid: new THREE.MeshLambertMaterial( {
      color: 0x00dcdc,
      shading: THREE.FlatShading
    }),
    stone1: new THREE.MeshBasicMaterial( { map: texture.stone1 } ),
    scribbler: new THREE.MeshBasicMaterial( {
      map: texture.scribbler,
      transparent: true
    }),
    tombstone: new THREE.ShaderMaterial( {
      uniforms: {
        uCarveTexture: { type: "t", value: texture.scribbler },
        uTexture: { type: "t", value: texture.stone1 }
      },
      vertexShader: shader.vertex.tombstone,
      fragmentShader: shader.fragment.tombstone
    })
  };
} );
