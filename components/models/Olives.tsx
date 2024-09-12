import * as THREE from "three";
import React, { useMemo, useRef } from "react";
import { useGLTF, Merged } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { Asset } from "expo-asset";
import { useCannon } from "@/hooks/useCannon";
import * as CANNON from "cannon-es";
import { CollisionEvent } from "@/constants/types";

type GLTFResult = GLTF & {
  nodes: {
    Olive_Slice_Oilives_0: THREE.Mesh;
    Olive_Slice_Oilives_1: THREE.Mesh;
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

export function OlivesInstances({
  children,
  ...props
}: JSX.IntrinsicElements["group"]) {
  const { nodes } = useGLTF(
    Asset.fromModule(require("../../assets/models/olives.glb")).uri
  ) as GLTFResult;
  const instances = React.useMemo(
    () => ({
      OliveSliceOilives_0: nodes.Olive_Slice_Oilives_0,
      OliveSliceOilives_1: nodes.Olive_Slice_Oilives_1,
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

export function OlivesModel(
  props: JSX.IntrinsicElements["group"] & { bodyId: number[] }
) {
  const instances = React.useContext(context);
  const torqueVecRef = useRef(
    new CANNON.Vec3(Math.random(), Math.random(), Math.random())
  ).current;

  const olivePositions = useMemo(
    () => ({
      Olive1: new THREE.Vector3(1.011, 0.5, -4.023).multiplyScalar(0.01),
      Olive2: new THREE.Vector3(-0.423, 0.5, 2.449).multiplyScalar(0.01),
    }),
    []
  );

  const addOlivePhysics = (
    body: CANNON.Body,
    meshPosition: THREE.Vector3,
    bodyId: number,
    setBodyAvailable: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    body.sleepSpeedLimit = 0.01;
    body.sleepTimeLimit = 0;
    body.type = CANNON.BODY_TYPES.DYNAMIC;
    body.id = bodyId;
    if (props.position) meshPosition.add(props.position as THREE.Vector3Like);
    body.position.set(meshPosition.x, meshPosition.y, meshPosition.z);

    torqueVecRef.set(Math.random(), Math.random(), Math.random());
    body.applyTorque(torqueVecRef);
    let timeoutId: NodeJS.Timeout | null = null;
    const handleCollide = (event: CollisionEvent) => {
      timeoutId = setTimeout(() => {
        body.sleep();
        body.type = CANNON.BODY_TYPES.STATIC;
        setBodyAvailable(false);
      }, 2000);
      body.removeEventListener("collide", handleCollide);
      event.target.velocity.negate();
      event.target.angularVelocity.negate();
    };
    body.addEventListener("collide", handleCollide);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      body.removeEventListener("collide", handleCollide);
    };
  };

  const firstOliveRef = useCannon(
    { mass: 1000, linearDumping: 0 },
    (body, setBodyAvailable) => {
      body.addShape(new CANNON.Box(new CANNON.Vec3(0.05, 0.05, 0.05)));
      return addOlivePhysics(
        body,
        olivePositions.Olive1,
        props.bodyId[0],
        setBodyAvailable
      );
    },
    [olivePositions as never]
  );
  const secondOliveRef = useCannon(
    { mass: 1000, linearDumping: 0 },
    (body, setBodyAvailable) => {
      body.addShape(new CANNON.Box(new CANNON.Vec3(0.05, 0.05, 0.05)));
      return addOlivePhysics(
        body,
        olivePositions.Olive2,
        props.bodyId[1],
        setBodyAvailable
      );
    },
    [olivePositions as never]
  );

  return (
    <>
      <group
        ref={firstOliveRef as React.Ref<THREE.Group<THREE.Object3DEventMap>>}
        dispose={null}
      >
        <instances.OliveSliceOilives_0 scale={0.01} />
      </group>
      <group
        ref={secondOliveRef as React.Ref<THREE.Group<THREE.Object3DEventMap>>}
        dispose={null}
      >
        <instances.OliveSliceOilives_1 scale={0.01} />
      </group>
    </>
  );
}

useGLTF.preload(
  Asset.fromModule(require("../../assets/models/olives.glb")).uri
);
