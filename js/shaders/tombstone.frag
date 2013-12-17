uniform sampler2D uTexture;

varying float vDepth;
varying vec2 vUv;

void main() {
  vec4 color = texture2D(uTexture, vUv);
  vec4 dark = vec4(0, 0, 0, 1.0);
  color = mix(color, dark, 0.5 * vDepth);
  gl_FragColor = vec4(color);
}
