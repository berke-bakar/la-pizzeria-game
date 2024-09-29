export const fragmentShader = `
uniform sampler2D textureAtlas;
uniform bool visibleToppings[14];
uniform vec3 lightDirection;
uniform vec3 dirLightColor;
uniform float dirLightIntensity;
uniform vec3 ambientLightColor;
uniform float ambientLightIntensity;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

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

  vec3 normal = normalize(vNormal);
  vec3 lightDir = normalize(lightDirection);
  float diffuseStrength = max(dot(normal, lightDir), 0.0);

  // Ambient + Diffuse lighting
  color.rgb += ambientLightIntensity * 0.15 * ambientLightColor + dirLightColor * diffuseStrength * dirLightIntensity * 0.15;
  // color.rgb += dirLightColor * diffuseStrength * dirLightIntensity * 0.1;

  gl_FragColor = color;
}
`;
