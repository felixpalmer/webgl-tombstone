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
           // Pass position, camera and uv to fragment shader
        "  vPosition = displacedPosition;",
        "  vUv = uv;",
        "}",
      ].join("\n"),
      tombstoneLight2: [
        "uniform sampler2D uCarveTexture;",

        "varying vec3 vPosition;",
        "varying vec3 vNormal;",
        "varying vec2 vUv;",

        "void main() {",
           // Get displacement for this vertex from carve texture
        "  float depth = texture2D(uCarveTexture, uv).a;",
        "  vec3 displacedPosition = position - 10.0 * depth * normal;",
        "  gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);",
           // Pass position, normal and uv to fragment shader
        "  vNormal = normal;",
        "  vPosition = position;",
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
        "  vec4 light = vec4(1.0, 1.0, 1.0, 1.0);",
        "  vec3 normal = getNormal();",

           // Mix in diffuse light
        "  float diffuse = dot(normalize(uLight - vPosition), normal);",
        "  diffuse = max(0.0, diffuse);",
        "  color = mix(dark, color, 0.1 + 0.9 * diffuse);",

           // Mix in specular light
        "  vec3 halfVector = normalize(normalize(cameraPosition - vPosition) + normalize(uLight - vPosition));",
        "  float specular = dot(normal, halfVector);",
        "  specular = max(0.0, specular);",
        "  specular = pow(specular, 50.0);",
        "  color = mix(color, light, 0.5 * specular);",

        "  gl_FragColor = vec4(color);",
        "}",
      ].join("\n"),
      tombstoneLight2: [
        "#extension GL_OES_standard_derivatives : enable",
        "uniform sampler2D uCarveTexture;",
        "uniform sampler2D uTexture;",
        "uniform vec3 uLight;",

        "varying vec3 vNormal;",
        "varying vec3 vPosition;",
        "varying vec2 vUv;",

        "vec3 getNormal() {",
           // Differentiate the position vector
        "  vec3 dPositiondx = dFdx(vPosition);",
        "  vec3 dPositiondy = dFdy(vPosition);",
        "  float depth = texture2D(uCarveTexture, vUv).a;",
        "  float dDepthdx = dFdx(depth);",
        "  float dDepthdy = dFdy(depth);",
        "  dPositiondx -= 10.0 * dDepthdx * vNormal;",
        "  dPositiondy -= 10.0 * dDepthdy * vNormal;",

           // The normal is the cross product of the differentials
        "  return normalize(cross(dPositiondx, dPositiondy));",
        "}",

        "void main() {",
        "  vec4 color = texture2D(uTexture, vUv);",
        "  vec4 dark = vec4(0, 0, 0, 1.0);",
        "  vec4 light = vec4(1.0, 1.0, 1.0, 1.0);",
        "  vec3 normal = getNormal();",

           // Mix in diffuse light
        "  float diffuse = dot(normalize(uLight - vPosition), normal);",
        "  diffuse = max(0.0, diffuse);",
        "  color = mix(dark, color, 0.1 + 0.9 * diffuse);",

           // Mix in specular light
        "  vec3 halfVector = normalize(normalize(cameraPosition - vPosition) + normalize(uLight - vPosition));",
        "  float specular = dot(normal, halfVector);",
        "  specular = max(0.0, specular);",
        "  specular = pow(specular, 50.0);",
        "  color = mix(color, light, 0.5 * specular);",

        "  gl_FragColor = vec4(color);",
        "}",
      ].join("\n"),
    },
  }
} );