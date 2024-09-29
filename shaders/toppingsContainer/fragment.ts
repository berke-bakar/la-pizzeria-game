export const fragmentShader = `
uniform sampler2D textureAtlas;
uniform bool visibleToppings[14];
varying vec2 vUv;

void main() {
  vec2 atlasUV = vUv;
  float numRows = 4.0;
  float tileSize = 1.0 / numRows;

  int toppingIndex = int(floor(vUv.y * numRows) * numRows + floor(vUv.x * numRows));

  // Get the column and row for the topping index
  int row = toppingIndex / int(numRows);
  int col = toppingIndex % int(numRows);

  atlasUV.x = fract(vUv.x * numRows) * tileSize + float(col) * tileSize;
  atlasUV.y = fract(vUv.y * numRows) * tileSize + float(row) * tileSize;

  vec4 color = texture2D(textureAtlas, atlasUV);

  // Draw only if bought
  if (toppingIndex < 14 && !visibleToppings[toppingIndex])
    discard;

  gl_FragColor = color;
}
`;
