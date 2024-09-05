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
    Mesh_slice5: THREE.Mesh;
    Mesh_slice5_1: THREE.Mesh;
    Mesh_slice5_2: THREE.Mesh;
  };
  materials: {
    brown: THREE.MeshStandardMaterial;
    yellow: THREE.MeshStandardMaterial;
    red: THREE.MeshStandardMaterial;
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
      Meshslice: nodes.Mesh_slice5,
      Meshslice1: nodes.Mesh_slice5_1,
      Meshslice2: nodes.Mesh_slice5_2,
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

  const ref = useCannon(
    { mass: 1 },
    (body, setBodyAvailable) => {
      body.addShape(new CANNON.Cylinder(0.45, 0.45, 0.1));
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
      <group rotation={[-Math.PI, 0, -Math.PI]} scale={[0.69, 0.869, 0.69]}>
        <instances.Meshslice />
        <instances.Meshslice1 />
        <instances.Meshslice2 />
      </group>
      <group
        rotation={[-Math.PI, Math.PI / 4, -Math.PI]}
        scale={[0.69, 0.869, 0.69]}
      >
        <instances.Meshslice />
        <instances.Meshslice1 />
        <instances.Meshslice2 />
      </group>
      <group rotation={[0, Math.PI / 2, 0]} scale={[0.69, 0.869, 0.69]}>
        <instances.Meshslice />
        <instances.Meshslice1 />
        <instances.Meshslice2 />
      </group>
      <group rotation={[0, Math.PI / 4, 0]} scale={[0.69, 0.869, 0.69]}>
        <instances.Meshslice />
        <instances.Meshslice1 />
        <instances.Meshslice2 />
      </group>
      <group scale={[0.69, 0.869, 0.69]}>
        <instances.Meshslice />
        <instances.Meshslice1 />
        <instances.Meshslice2 />
      </group>
      <group rotation={[0, -Math.PI / 4, 0]} scale={[0.69, 0.869, 0.69]}>
        <instances.Meshslice />
        <instances.Meshslice1 />
        <instances.Meshslice2 />
      </group>
      <group rotation={[0, -Math.PI / 2, 0]} scale={[0.69, 0.869, 0.69]}>
        <instances.Meshslice />
        <instances.Meshslice1 />
        <instances.Meshslice2 />
      </group>
      <group
        rotation={[Math.PI, -Math.PI / 4, Math.PI]}
        scale={[0.69, 0.869, 0.69]}
      >
        <instances.Meshslice />
        <instances.Meshslice1 />
        <instances.Meshslice2 />
      </group>
    </group>
  );
}

useGLTF.preload(
  Asset.fromModule(require("../../assets/models/pizzaBase.glb")).uri
);
