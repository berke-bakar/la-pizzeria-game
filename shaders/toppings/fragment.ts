const fragmentShader = /* glsl */ `
varying vec2 vUv;
uniform sampler2D uTextureAtlas;
varying float vDiscard;

void main() {
  if (vDiscard > 0.5) {
    discard;  // Discard the fragment if it's outside the correct tile
  }
  // Just apply texture, unnecessary vertices are eliminated
  vec4 color = texture2D(uTextureAtlas, vUv);
  csm_DiffuseColor = color;
}
`;

export default fragmentShader;
