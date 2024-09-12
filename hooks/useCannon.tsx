import { useContext, useEffect, useRef, useState } from "react";
import * as CANNON from "cannon-es";
import { WorldContext } from "@/context/PhysicsProvider";
import { useFrame } from "@react-three/fiber/native";
import { Mesh, Group } from "three";

export const useCannon = (
  { ...props }: any,
  fn: (
    body: CANNON.Body,
    removalFunc: React.Dispatch<React.SetStateAction<boolean>>
  ) => void | (() => void),
  deps = []
) => {
  const ref = useRef<Mesh | Group>(null);
  const world = useContext(WorldContext);
  const [body] = useState(() => new CANNON.Body(props));
  const [bodyAvailable, setBodyAvailable] = useState(true);

  useEffect(() => {
    // Call function so the user can add shapes, positions, etc. to the body
    const callback = fn(body, setBodyAvailable);
    if (world?.bodies.find((val) => val.id === body.id) === undefined) {
      world?.addBody(body);
    }

    return () => {
      if (callback) callback();
      if (world?.bodies.find((val) => val.id === body.id) !== undefined)
        world?.removeBody(body);
    };
  }, deps);

  useEffect(() => {
    if (bodyAvailable) {
      world?.addBody(body);
    } else {
      world?.removeBody(body);
    }
  }, [bodyAvailable]);

  useFrame(() => {
    if (ref.current && bodyAvailable) {
      // Transport cannon physics into the referenced threejs object
      const { position, quaternion } = body;
      const { x: px, y: py, z: pz } = position;
      const { x: qx, y: qy, z: qz, w: qw } = quaternion;
      ref.current.position.set(
        px,
        body.type == CANNON.BODY_TYPES.STATIC ? py : py + 0.1,
        pz
      );
      ref.current.quaternion.set(qx, qy, qz, qw);
    }
  });

  return ref;
};
