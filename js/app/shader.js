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

        "varying float vDepth;",
        "varying vec2 vUv;",

        "void main() {",
           // Get displacement for this vertext from carve texture
        "  float depth = texture2D(uCarveTexture, uv).a;",
        "  vec3 displacedPosition = position - 10.0 * depth * normal;",
        "  gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);",
           // Pass depth and uv to fragment shader
        "  vDepth = depth;",
        "  vUv = uv;",
        "}",
      ].join("\n"),
      tombstoneLight: [
        "uniform sampler2D uCarveTexture;",

        "varying vec3 vPosition;",
        "varying vec2 vUv;",

        "void main() {",
           // Get displacement for this vertext from carve texture
        "  float depth = texture2D(uCarveTexture, uv).a;",
        "  vec3 displacedPosition = position - 10.0 * depth * normal;",
        "  gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);",
           // Pass depth and uv to fragment shader
        "  vPosition = displacedPosition;",
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

        "varying float vDepth;",
        "varying vec2 vUv;",

        "void main() {",
        "  vec4 color = texture2D(uTexture, vUv);",
        "  vec4 dark = vec4(0, 0, 0, 1.0);",
        "  color = mix(color, dark, 0.5 * vDepth);",
        "  gl_FragColor = vec4(color);",
        "}",
      ].join("\n"),
      tombstoneLight: [
        "#extension GL_OES_standard_derivatives : enable",
        "uniform sampler2D uTexture;",
        "uniform vec3 uLight;",

        "varying vec3 vPosition;",
        "varying vec2 vUv;",

        "vec3 getNormal() {",
           // Differentiate the position vector
        "  vec3 dPositiondx = dFdx(vPosition);",
        "  vec3 dPositiondy = dFdy(vPosition);",

           // The normal is the cross product of the differentials
        "  return normalize(cross(dPositiondx, dPositiondy));",
        "}",

        "void main() {",
        "  vec4 color = texture2D(uTexture, vUv);",
        "  vec4 dark = vec4(0, 0, 0, 1.0);",
        "  float incidence = dot(normalize(uLight - vPosition), getNormal());",
        "  color = mix(dark, color, 0.5 + 0.5 * incidence);",
        "  gl_FragColor = vec4(color);",
        "}",
      ].join("\n"),
    },
  }
} );