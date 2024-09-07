import { Vector3 } from "three";
import { seededRandom } from "three/src/math/MathUtils";

export function generateRandomPos(radius: number, yLimit: number) {
  const angle = Math.random() * 2 * Math.PI;
  const distanceToCenter = Math.random() * radius;
  // seededRandom()
  const x = Math.cos(angle) * distanceToCenter;
  const z = Math.sin(angle) * distanceToCenter;
  const y = yLimit + (Math.random() - 0.5);

  return new Vector3(x, y, z);
}

export function hashStringToNumber(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return hash >>> 0;
}
