define( [], function() {
  return {
    vertex: {
      simple: [
        "void main() {",
        "  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);",
        "}",
      ].join("\n"),
      tombstone: [
        "uniform sampler2D uCarveTexture;",

        "varying vec2 vUv;",

        "void main() {",
           // Get displacement for this vertext from carve texture
        "  float d = texture2D(uCarveTexture, uv).g;",
        "  vec3 displacedPosition = position - 10.0 * d * normal;",
        "  gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);",
           // Pass uv to fragment shader
        "  vUv = uv;",
        "}",
      ].join("\n"),
    },
    fragment: {
      simple: [
        "uniform vec3 uColor;",

        "void main() {",
        "  gl_FragColor = vec4(uColor, 1.0);",
        "}",
      ].join("\n"),
      tombstone: [
        "uniform sampler2D uTexture;",

        "varying vec2 vUv;",

        "void main() {",
        "  vec4 color = texture2D(uTexture, vUv);",
        "  gl_FragColor = vec4(color);",
        "}",
      ].join("\n"),
    },
  }
} );