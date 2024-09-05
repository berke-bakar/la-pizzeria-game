import * as CANNON from "cannon-es";
import * as THREE from "three";
import React from "react";
import { useGLTF, Merged } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { Asset } from "expo-asset";
import { useCannon } from "@/hooks/useCannon";
import { CollisionEvent } from "@/constants/types";

type GLTFResult = GLTF & {
  nodes: {
    Olive_Slice_Oilives_0001: THREE.Mesh;
  };
  materials: {
    Oilives: THREE.MeshBasicMaterial;
  };
};

type ContextType = Record<
  string,
  React.ForwardRefExoticComponent<JSX.IntrinsicElements["mesh"]>
>;

const context = React.createContext({} as ContextType);

export function Olive1Instances({
  children,
  ...props
}: JSX.IntrinsicElements["group"]) {
  const { nodes } = useGLTF(
    Asset.fromModule(
      require("../../assets/models/Olive_Slice_Oilives_0_001.glb")
    ).uri
  ) as GLTFResult;
  const instances = React.useMemo(
    () => ({
      OliveSliceOilives: nodes.Olive_Slice_Oilives_0001,
    }),
    [nodes]
  );
  return (
    <Merged meshes={instances} {...props}>
      {(instances: ContextType) => (
        <context.Provider value={instances} children={children} />
      )}
    </Merged>
  );
}

export function Olive1Model(props: JSX.IntrinsicElements["group"]) {
  const instances = React.useContext(context);

  const ref = useCannon(
    { mass: 1 },
    (body, setBodyAvailable) => {
      body.addShape(new CANNON.Box(new CANNON.Vec3(0.05, 0.05, 0.05)));
      body.type = CANNON.BODY_TYPES.DYNAMIC;
      body.position.set(
        (props.position as THREE.Vector3).x,
        (props.position as THREE.Vector3).y,
        (props.position as THREE.Vector3).z
      );
      const handleCollide = (event: CollisionEvent) => {
        if (event.body.type === CANNON.BODY_TYPES.STATIC) {
          event.target.type = CANNON.BODY_TYPES.STATIC;
          setBodyAvailable(false);
        }
      };
      body.addEventListener("collide", handleCollide);
      return () => {
        body.removeEventListener("collide", handleCollide);
      };
    },
    []
  );

  return (
    <group
      ref={ref as React.Ref<THREE.Group<THREE.Object3DEventMap>>}
      {...props}
      dispose={null}
    >
      <instances.OliveSliceOilives scale={0.01} />
    </group>
  );
}

useGLTF.preload(
  Asset.fromModule(require("../../assets/models/Olive_Slice_Oilives_0_001.glb"))
    .uri
);
