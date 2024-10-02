import { Vector3 } from "three";

export function generateRandomPos(
  radius: number,
  yLimit: number,
  offset: [offsetX: number, offsetY: number, offsetZ: number]
) {
  const angle = Math.random() * 2 * Math.PI;
  const distanceToCenter = Math.random() * radius;
  const x = Math.cos(angle) * distanceToCenter;
  const z = Math.sin(angle) * distanceToCenter;
  const y = yLimit + (Math.random() - 0.25);
  return new Vector3(x + offset[0], y + offset[1], z + offset[2]);
}

export function hashStringToNumber(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return hash >>> 0;
}
