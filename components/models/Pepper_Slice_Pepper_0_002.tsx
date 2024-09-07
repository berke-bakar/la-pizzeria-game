import * as THREE from "three";
import React from "react";
import { useGLTF, Merged } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { Asset } from "expo-asset";
import * as CANNON from "cannon-es";
import { useCannon } from "@/hooks/useCannon";
import { CollisionEvent } from "@/constants/types";

type GLTFResult = GLTF & {
  nodes: {
    Pepper_Slice_Pepper_0002: THREE.Mesh;
  };
  materials: {
    Pepper: THREE.MeshBasicMaterial;
  };
};

type ContextType = Record<
  string,
  React.ForwardRefExoticComponent<JSX.IntrinsicElements["mesh"]>
>;

const context = React.createContext({} as ContextType);

export function Pepper2Instances({
  children,
  ...props
}: JSX.IntrinsicElements["group"]) {
  const { nodes } = useGLTF(
    Asset.fromModule(
      require("../../assets/models/Pepper_Slice_Pepper_0_002.glb")
    ).uri
  ) as GLTFResult;

  const instances = React.useMemo(
    () => ({
      PepperSlicePepper: nodes.Pepper_Slice_Pepper_0002,
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

export function Pepper2Model(props: JSX.IntrinsicElements["group"] & { bodyId: number }) {
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
      body.id = props.bodyId;
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
      <instances.PepperSlicePepper scale={0.01} />
    </group>
  );
}

useGLTF.preload(
  Asset.fromModule(require("../../assets/models/Pepper_Slice_Pepper_0_002.glb"))
    .uri
);
