import * as CANNON from "cannon-es";
import * as THREE from "three";
import React, { useCallback } from "react";
import { useGLTF, Merged } from "@react-three/drei/native";
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

export function PizzaBaseModel({
  initialPosition,
  ...props
}: {
  initialPosition: [number, number, number];
} & JSX.IntrinsicElements["group"]) {
  const instances = React.useContext(context);

  const handleCollide = useCallback(function handleCollision(
    event: CollisionEvent
  ) {
    if (event.body.type === CANNON.BODY_TYPES.STATIC) {
      event.target.type = CANNON.BODY_TYPES.STATIC;
      event.target.mass = 0;
      event.target.removeEventListener("collide", handleCollision);
    }
  },
  []);

  const ref = useCannon(
    { mass: 1 },
    (body, setBodyAvailable) => {
      body.addShape(
        new CANNON.Cylinder(0.855, 0.855, 0.117, 16)
        // new CANNON.Box(new CANNON.Vec3(0.855, 0.07, 0.855))
      );
      body.type = CANNON.BODY_TYPES.DYNAMIC;
      if (initialPosition)
        body.position.set(
          initialPosition[0],
          initialPosition[1],
          initialPosition[2]
        );

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
      scale={0.9}
    >
      <instances.Node scale={[0.356, 1, 0.356]} />
    </group>
  );
}

useGLTF.preload(
  Asset.fromModule(require("../../assets/models/pizzaBase.glb")).uri
);
