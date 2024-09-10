import * as CANNON from "cannon-es";
import * as THREE from "three";
import React, { useState } from "react";
import { useGLTF, Merged } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { Asset } from "expo-asset";
import { useCannon } from "@/hooks/useCannon";
import { CollisionEvent } from "@/constants/types";

type GLTFResult = GLTF & {
  nodes: {
    Node006: THREE.Mesh;
  };
  materials: {
    ["lambert5SG.001"]: THREE.MeshStandardMaterial;
  };
};

type ContextType = Record<
  string,
  React.ForwardRefExoticComponent<JSX.IntrinsicElements["mesh"]>
>;

const context = React.createContext({} as ContextType);

export function PizzaBaseInstances({
  children,
  ...props
}: JSX.IntrinsicElements["group"]) {
  const { nodes } = useGLTF(
    Asset.fromModule(require("../../assets/models/pizzaBase.glb")).uri
  ) as GLTFResult;
  const instances = React.useMemo(
    () => ({
      Node: nodes.Node006,
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

export function PizzaBaseModel(props: JSX.IntrinsicElements["group"]) {
  const instances = React.useContext(context);
  const [pizzaCollided, setPizzaCollided] = useState(false);

  const ref = useCannon(
    { mass: 100 },
    (body, setBodyAvailable) => {
      body.addShape(new CANNON.Box(new CANNON.Vec3(1, 0.1, 1)));
      body.type = CANNON.BODY_TYPES.DYNAMIC;
      body.position.set(
        (props.position as THREE.Vector3).x,
        (props.position as THREE.Vector3).y,
        (props.position as THREE.Vector3).z
      );

      const handleCollide = (event: CollisionEvent) => {
        if (
          event.body.type === CANNON.BODY_TYPES.STATIC &&
          event.body.shapes[0].type === CANNON.SHAPE_TYPES.PLANE
        ) {
          event.target.type = CANNON.BODY_TYPES.STATIC;
          event.target.allowSleep = false;
          event.target.sleepTimeLimit = 0;
          setPizzaCollided(true);
        } else {
          event.body.velocity.setZero();
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
      {...props}
      dispose={null}
      ref={ref as React.Ref<THREE.Group<THREE.Object3DEventMap>>}
      position={!pizzaCollided ? props.position : [0, 0, 0]}
    >
      <instances.Node scale={[0.356, 1, 0.356]} />
    </group>
  );
}

useGLTF.preload(
  Asset.fromModule(require("../../assets/models/pizzaBase.glb")).uri
);
