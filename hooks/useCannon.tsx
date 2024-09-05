import { useContext, useEffect, useRef, useState } from "react";
import * as CANNON from "cannon-es";
import { WorldContext } from "@/context/PhysicsProvider";
import { useFrame, PrimitiveProps } from "@react-three/fiber/native";
import { Vector3, Quaternion } from "three";

export const useCannon = (
  { ...props }: any,
  fn: (body: CANNON.Body) => void,
  deps = []
) => {
  const ref = useRef<PrimitiveProps>();
  const world = useContext(WorldContext);
  const [body] = useState(() => new CANNON.Body(props));

  useEffect(() => {
    // Call function so the user can add shapes, positions, etc. to the body
    fn(body);
    world?.addBody(body);
    return () => world?.removeBody(body);
  }, deps);

  useFrame(() => {
    if (ref.current) {
      // Transport cannon physics into the referenced threejs object
      const { position, quaternion } = body;
      const { x: px, y: py, z: pz } = position;
      const { x: qx, y: qy, z: qz, w: qw } = quaternion;
      ref.current.position.copy(new Vector3(px, py, pz));
      ref.current.quaternion.copy(new Quaternion(qx, qy, qz, qw));
    }
  });

  return ref;
};
