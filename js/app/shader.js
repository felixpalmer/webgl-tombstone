define( [], function() {
  return {
    vertex: {
      simple: [
        "void main() {",
        "  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);",
        "}",
      ].join("\n"),
      tombstone: [
        "varying vec2 vUv;",

        "void main() {",
        "  vUv = uv;",
        "  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);",
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
        "varying vec2 vUv;",
        "uniform sampler2D uTexture;",

        "void main() {",
        "  vec4 color = texture2D(uTexture, vUv);",
        "  gl_FragColor = vec4(color);",
        "}",
      ].join("\n"),
    },
  }
} );