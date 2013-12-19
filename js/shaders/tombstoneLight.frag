#extension GL_OES_standard_derivatives : enable
uniform sampler2D uTexture;
uniform vec3 uLight;

varying vec3 vPosition;
varying vec2 vUv;

vec3 getNormal() {
  // Differentiate the position vector
  vec3 dPositiondx = dFdx(vPosition);
  vec3 dPositiondy = dFdy(vPosition);

  // The normal is the cross product of the differentials
  return normalize(cross(dPositiondx, dPositiondy));
}

void main() {
  vec4 color = texture2D(uTexture, vUv);
  vec4 dark = vec4(0, 0, 0, 1.0);
  float incidence = dot(normalize(uLight - vPosition), getNormal());
  color = mix(dark, color, 0.5 + 0.5 * incidence);
  gl_FragColor = vec4(color);
}
