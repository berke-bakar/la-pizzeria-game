import { useCannon } from "@/hooks/useCannon";
import { useTexture } from "@react-three/drei/native";
import * as CANNON from "cannon-es";
import { Ref, useEffect } from "react";
import {
  BufferGeometry,
  Material,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap,
} from "three";
import { Asset } from "expo-asset";

const Ground = () => {
  const ref = useCannon({ mass: 0 }, (body) => {
    const groundShape = new CANNON.Plane();
    body.addShape(groundShape);
    body.type = CANNON.BODY_TYPES.STATIC;
    body.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  });

  const [map, disp, arm, normal] = useTexture([
    Asset.fromModule(require("../assets/textures/oak_veneer_01_diff_1k.jpg"))
      .uri,
    Asset.fromModule(require("../assets/textures/oak_veneer_01_disp_1k.jpg"))
      .uri,
    Asset.fromModule(require("../assets/textures/oak_veneer_01_arm_1k.jpg"))
      .uri,
    Asset.fromModule(require("../assets/textures/oak_veneer_01_nor_gl_1k.jpg"))
      .uri,
  ]);

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
        map={map}
        attach="material"
        aoMap={arm}
        roughnessMap={arm}
        metalnessMap={arm}
        normalMap={normal}
      />
    </mesh>
  );
};

export default Ground;
