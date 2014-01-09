uniform sampler2D uCarveTexture;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
  // Get displacement for this vertex from carve texture
  float depth = texture2D(uCarveTexture, uv).a;
  vec3 displacedPosition = position - 10.0 * depth * normal;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
  // Pass position, normal and uv to fragment shader
  vNormal = normal;
  vPosition = position;
  vUv = uv;
}
