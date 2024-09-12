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
    Pepper_Slice_Pepper_0: THREE.Mesh;
    Pepper_Slice_Pepper_1: THREE.Mesh;
    Pepper_Slice_Pepper_2: THREE.Mesh;
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

export function PeppersInstances({
  children,
  ...props
}: JSX.IntrinsicElements["group"] & { bodyId: number }) {
  const { nodes } = useGLTF(
    Asset.fromModule(require("../../assets/models/peppers.glb")).uri
  ) as GLTFResult;
  const instances = React.useMemo(
    () => ({
      Pepper_Slice_Pepper_0: nodes.Pepper_Slice_Pepper_0,
      Pepper_Slice_Pepper_1: nodes.Pepper_Slice_Pepper_1,
      Pepper_Slice_Pepper_2: nodes.Pepper_Slice_Pepper_2,
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

export function PeppersModel(
  props: JSX.IntrinsicElements["group"] & { bodyId: number[] }
) {
  const instances = React.useContext(context);
  const torqueVecRef = useRef(
    new CANNON.Vec3(Math.random(), Math.random(), Math.random())
  ).current;

  const pepperPositions = useMemo(
    () => ({
      Slice1: new THREE.Vector3(3.877, 0.415, -9.876).multiplyScalar(0.03),
      Slice2: new THREE.Vector3(-8.624, 0.43, 1.997).multiplyScalar(0.03),
      Slice3: new THREE.Vector3(6.813, 0.428, 6.279).multiplyScalar(0.03),
    }),
    []
  );

  const addPepperPhysics = (
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

  const firstPepperRef = useCannon(
    { mass: 1000, linearDumping: 0 },
    (body, setBodyAvailable) => {
      body.addShape(new CANNON.Box(new CANNON.Vec3(0.05, 0.05, 0.05)));
      return addPepperPhysics(
        body,
        pepperPositions.Slice1,
        props.bodyId[0],
        setBodyAvailable
      );
    },
    [pepperPositions as never]
  );

  const secondPepperRef = useCannon(
    { mass: 1000, linearDumping: 0 },
    (body, setBodyAvailable) => {
      body.addShape(new CANNON.Box(new CANNON.Vec3(0.05, 0.05, 0.05)));
      return addPepperPhysics(
        body,
        pepperPositions.Slice2,
        props.bodyId[1],
        setBodyAvailable
      );
    },
    [pepperPositions as never]
  );

  const thirdPepperRef = useCannon(
    { mass: 1000, linearDumping: 0 },
    (body, setBodyAvailable) => {
      body.addShape(new CANNON.Box(new CANNON.Vec3(0.05, 0.05, 0.05)));
      return addPepperPhysics(
        body,
        pepperPositions.Slice3,
        props.bodyId[2],
        setBodyAvailable
      );
    },
    [pepperPositions as never]
  );

  return (
    <>
      <group ref={firstPepperRef as React.Ref<THREE.Group>}>
        <instances.Pepper_Slice_Pepper_0 scale={0.015} />
      </group>
      <group ref={secondPepperRef as React.Ref<THREE.Group>}>
        <instances.Pepper_Slice_Pepper_1 scale={0.015} />
      </group>

      <group ref={thirdPepperRef as React.Ref<THREE.Group>}>
        <instances.Pepper_Slice_Pepper_2 scale={0.015} />
      </group>
    </>
  );
}

useGLTF.preload(
  Asset.fromModule(require("../../assets/models/peppers.glb")).uri
);
