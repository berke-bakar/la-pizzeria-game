import * as THREE from "three";
import React from "react";
import { useGLTF, Merged } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { Asset } from "expo-asset";
import { useCannon } from "@/hooks/useCannon";
import * as CANNON from "cannon-es";
import { CollisionEvent } from "@/constants/types";

type GLTFResult = GLTF & {
  nodes: {
    anchovies_Slice_Fish_0: THREE.Mesh;
  };
  materials: {
    Fish: THREE.MeshBasicMaterial;
  };
};

type ContextType = Record<
  string,
  React.ForwardRefExoticComponent<JSX.IntrinsicElements["mesh"]>
>;

const context = React.createContext({} as ContextType);

export function AnchoviesInstances({
  children,
  ...props
}: JSX.IntrinsicElements["group"]) {
  const { nodes } = useGLTF(
    Asset.fromModule(require("../../assets/models/anchovies_Slice_Fish_0.glb"))
      .uri
  ) as GLTFResult;
  const instances = React.useMemo(
    () => ({
      AnchoviesSliceFish: nodes.anchovies_Slice_Fish_0,
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

export function AnchoviesModel(
  props: JSX.IntrinsicElements["group"] & { bodyId: number }
) {
  const instances = React.useContext(context);

  const ref = useCannon(
    { mass: 1 },
    (body, setBodyAvailable) => {
      body.addShape(new CANNON.Box(new CANNON.Vec3(0.05, 0.05, 0.05)));
      body.sleepSpeedLimit = 5;
      body.type = CANNON.BODY_TYPES.DYNAMIC;
      body.position.set(
        (props.position as THREE.Vector3).x,
        (props.position as THREE.Vector3).y,
        (props.position as THREE.Vector3).z
      );
      body.angularDamping = 0.1;
      body.applyTorque(
        new CANNON.Vec3(Math.random(), Math.random(), Math.random())
      );
      body.id = props.bodyId;
      const timeoutId = setTimeout(() => {
        body.sleep();
        body.type = CANNON.BODY_TYPES.STATIC;
        setBodyAvailable(false);
      }, 5000);
      const handleCollide = (event: CollisionEvent) => {
        event.target.collisionResponse = false;
        body.removeEventListener("collide", handleCollide);

        if (event.body.type === CANNON.BODY_TYPES.STATIC) {
          clearTimeout(timeoutId);
          event.target.sleep();
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
      <instances.AnchoviesSliceFish scale={0.01} />
    </group>
  );
}

useGLTF.preload(
  Asset.fromModule(require("../../assets/models/anchovies_Slice_Fish_0.glb"))
    .uri
);
