uniform sampler2D uCarveTexture;

varying vec2 vUv;

void main() {
  // Get displacement for this vertext from carve texture
  float d = texture2D(uCarveTexture, uv).g;
  vec3 displacedPosition = position - 10.0 * d * normal;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
  // Pass uv to fragment shader
  vUv = uv;
}
