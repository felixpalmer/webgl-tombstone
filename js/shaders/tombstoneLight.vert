uniform sampler2D uCarveTexture;

varying vec3 vPosition;
varying vec2 vUv;

void main() {
  // Get displacement for this vertext from carve texture
  float depth = texture2D(uCarveTexture, uv).a;
  vec3 displacedPosition = position - 10.0 * depth * normal;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
  // Pass position, camera and uv to fragment shader
  vPosition = displacedPosition;
  vUv = uv;
}
