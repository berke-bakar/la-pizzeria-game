import { useCannon } from "@/hooks/useCannon";
import * as CANNON from "cannon-es";
import { Ref } from "react";
import {
  BufferGeometry,
  Material,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap,
} from "three";

const Ground = (props: JSX.IntrinsicElements["mesh"]) => {
  const ref = useCannon({ mass: 0 }, (body) => {
    const groundShape = new CANNON.Plane();
    body.addShape(groundShape);
    body.type = CANNON.BODY_TYPES.STATIC;
    if (props.position)
      body.position.set(...(props.position as [number, number, number]));
    body.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  });

  return (
    <mesh
      ref={
        ref as Ref<
          Mesh<
            BufferGeometry<NormalBufferAttributes>,
            Material | Material[],
            Object3DEventMap
          >
        >
      }
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry args={[10, 10, 8, 8]} />
      <meshStandardMaterial
        attach="material"
        transparent={true}
        opacity={0.1}
      />
    </mesh>
  );
};

export default Ground;
