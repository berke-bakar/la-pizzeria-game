const vertexShader = /* glsl */ `
uniform sampler2D uTextureAtlas;
attribute float aToppingType;
varying vec2 vUv;
varying float vDiscard;

void main() {
  vUv = uv;

  // Determine the tile coordinates in the 4x4 texture atlas
  vec2 tileSize = vec2(0.25, 0.25);  // Each tile is 1/16th of the texture
  float tileIndex = aToppingType;  // The topping type determines the tile
  float xTile = mod(tileIndex, 4.0);  // Horizontal tile index
  float yTile = floor(tileIndex / 4.0);  // Vertical tile index

  // Compute the UV bounds for the current tile
  vec2 tileMin = vec2(xTile, yTile) * tileSize;
  vec2 tileMax = tileMin + tileSize;

  // Check if the vertex UV is inside the current tile's UV bounds
  if (vUv.x < tileMin.x || vUv.x > tileMax.x || vUv.y < tileMin.y || vUv.y > tileMax.y) {
      // Move the vertex far away to effectively cull it
      csm_Position = vec3(1000.0, 1000.0, 1000.0);
      vDiscard = 1.0;  // Do not discard

  } else {
      // Otherwise, apply normal transformations
      csm_Position = position;
      vDiscard = 0.0;  // Do not discard
  }
  }
`;

export default vertexShader;
