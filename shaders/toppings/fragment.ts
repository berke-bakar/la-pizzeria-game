const fragmentShader = /* glsl */ `
varying vec2 vUv;
uniform sampler2D uTextureAtlas;
varying float vDiscard;
flat varying float vToppingType;

void main() {
  vec2 uvCopy = vUv;
  if (vDiscard > 0.5) {
    discard;  // Discard the fragment if it's outside the correct tile
  }

  if (floor(vToppingType) == 0.0) {
    float colorMultiplier = fract(vToppingType) * 10.0;
    uvCopy.y += 0.08 * colorMultiplier;
  }

  // Just apply texture, unnecessary vertices are eliminated
  vec4 color = texture2D(uTextureAtlas, uvCopy);
  csm_DiffuseColor = color;
}
`;

export default fragmentShader;
