import CustomShaderMaterial from "three-custom-shader-material";
import * as THREE from "three";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { Asset } from "expo-asset";
import * as CANNON from "cannon-es";
import vertexShader from "../../shaders/toppings/vertex";
import fragmentShader from "../../shaders/toppings/fragment";
import { IngredientType } from "@/constants/constants";
import { useFrame } from "@react-three/fiber";
import { WorldContext } from "@/context/PhysicsProvider";
import { useToppings } from "@/hooks/useToppings";
import { CollisionEvent } from "@/constants/types";
import { Platform } from "react-native";

type GLTFResult = GLTF & {
  nodes: {
    combined: THREE.Mesh;
  };
  materials: {
    toppingAtlas: THREE.MeshStandardMaterial;
  };
};
const toppingsIndexMap: Record<IngredientType, number> = {
  peppers: 0,
  shrimp: 1,
  mushroom: 2,
  pickle: 3,
  onion: 4,
  salami: 5,
  tomato: 6,
  chicken: 7,
  ham: 8,
  bacon: 9,
  anchovies: 10,
  sausage: 11,
  olives: 12,
  pineapple: 13,
};

// const MAX_TOPPINGS = Platform.select({
//   native: 100,
//   default: 1000,
// });
const MAX_TOPPINGS = 1000;

export function Toppings({ ...props }: JSX.IntrinsicElements["instancedMesh"]) {
  const world = useContext(WorldContext);
  const toppingRef =
    useRef<
      THREE.InstancedMesh<
        THREE.BufferGeometry<THREE.NormalBufferAttributes>,
        THREE.Material | THREE.Material[],
        THREE.InstancedMeshEventMap
      >
    >(null);
  const { nodes, materials } = useGLTF(
    Asset.fromModule(require("../../assets/models/toppingsCombined.glb")).uri
  ) as GLTFResult;

  const [toppingsList, lastAddedTopping] = useToppings((state) => [
    state.toppings,
    state.lastAddedTopping,
  ]);

  // const SCALE_VECTOR = useMemo(() => new THREE.Vector3(1, 1, 1), []);
  const SCALE_VECTOR = useMemo(() => new THREE.Vector3(0.01, 0.01, 0.01), []);
  const calcVector = useMemo(() => new THREE.Vector3(), []);
  const calcQuaternion = useMemo(() => new THREE.Quaternion(), []);
  const calcMatrix = useMemo(() => new THREE.Matrix4(), []);
  const torqueVector = useMemo(() => new CANNON.Vec3(), []);

  const positionMatrix = useMemo(() => new THREE.Matrix4(), []);
  const uniforms = useMemo(
    () => ({
      uTextureAtlas: {
        value: materials.toppingAtlas.map,
      },
    }),
    [materials]
  );

  const shaderRef = useRef<any>(null);
  const physicsBodies = useRef<
    Map<number, { body: CANNON.Body; instanceId: number }>
  >(new Map());

  const typeArray = useMemo<Float32Array>(() => {
    const arr = new Float32Array(MAX_TOPPINGS);
    arr.fill(15);
    nodes.combined.geometry.setAttribute(
      "aToppingType",
      new THREE.InstancedBufferAttribute(arr, 1, false)
    );
    return arr;
  }, []);

  const handleCollide = (event: CollisionEvent) => {
    if (
      event.body.type === CANNON.BODY_TYPES.STATIC &&
      event.body.shapes[0].type === CANNON.SHAPE_TYPES.CYLINDER
    ) {
      event.target.collisionResponse = false;

      event.target.sleep();
      event.target.type = CANNON.BODY_TYPES.STATIC;
      event.target.removeEventListener("collide", handleCollide);
    }
  };

  useEffect(() => {
    toppingRef.current?.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  }, []);

  useEffect(() => {
    if (toppingsList.length === 0 || lastAddedTopping === null) {
      physicsBodies.current.clear();
      typeArray.fill(15);
      if (toppingRef.current) toppingRef.current.count = 0;
      return;
    }

    if (toppingsList.length > MAX_TOPPINGS) {
      console.error("Exceeded the max topping limit!");
      return;
    }

    if (toppingRef.current && lastAddedTopping !== null) {
      const currentIndex = toppingsList.length - 1;

      toppingRef.current!.getMatrixAt(currentIndex, positionMatrix);
      calcQuaternion.identity();
      positionMatrix.compose(
        lastAddedTopping.initialPos,
        calcQuaternion,
        SCALE_VECTOR
      );
      toppingRef.current!.setMatrixAt(currentIndex, positionMatrix);

      typeArray[currentIndex] = toppingsIndexMap[lastAddedTopping.type];

      // Create the physics body for the new instance
      const body = new CANNON.Body({
        mass: 100,
        position: new CANNON.Vec3(
          lastAddedTopping.initialPos.x,
          lastAddedTopping.initialPos.y,
          lastAddedTopping.initialPos.z
        ),
        shape: new CANNON.Box(new CANNON.Vec3(0.02, 0.02, 0.02)),
      });
      body.sleepSpeedLimit = 5;
      body.type = CANNON.BODY_TYPES.DYNAMIC;

      body.angularDamping = 0.1;
      torqueVector.set(
        Math.random() * 50,
        Math.random() * 50,
        Math.random() * 50
      );
      body.applyTorque(torqueVector);
      // TODO: Handle multiple bodies
      body.id = lastAddedTopping.id[0];
      physicsBodies.current.set(lastAddedTopping.id[0], {
        body: body,
        instanceId: currentIndex,
      });
      world?.addBody(body);

      // TODO: Handle colliding
      const timeoutId = setTimeout(() => {
        body.sleep();
        body.type = CANNON.BODY_TYPES.STATIC;
        world?.removeBody(body);
        physicsBodies.current.delete(lastAddedTopping.id[0]);
      }, 5000);

      body.addEventListener("collide", handleCollide);

      toppingRef.current.geometry.setAttribute(
        "aToppingType",
        new THREE.InstancedBufferAttribute(typeArray, 1, false, 1)
      );

      toppingRef.current.count = toppingsList.length;
      toppingRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [toppingsList]);

  const toBeDeleted = useRef<[number, CANNON.Body][]>([]);
  useFrame(() => {
    // Synchronize positions and physics updates
    if (toppingRef.current) {
      physicsBodies.current.forEach(({ instanceId, body }, index) => {
        if (body.sleepState === CANNON.BODY_SLEEP_STATES.AWAKE) {
          toppingRef.current?.getMatrixAt(instanceId, calcMatrix);

          calcVector.set(body.position.x, body.position.y, body.position.z);
          calcQuaternion.set(...body.quaternion.toArray());

          calcMatrix.compose(calcVector, calcQuaternion, SCALE_VECTOR);

          toppingRef.current!.setMatrixAt(instanceId, calcMatrix);
        } else if (body.sleepState === CANNON.BODY_SLEEP_STATES.SLEEPING) {
          toBeDeleted.current.push([index, body]);
        }
      });
      toppingRef.current.instanceMatrix.needsUpdate = true;
      toBeDeleted.current.forEach((val) => {
        world?.removeBody(val[1]);
        physicsBodies.current.delete(val[0]);
      });
      toBeDeleted.current.length = 0;
    }
  });

  return (
    <instancedMesh
      ref={toppingRef}
      args={[nodes.combined.geometry, undefined, MAX_TOPPINGS]}
      {...props}
    >
      <CustomShaderMaterial
        ref={shaderRef}
        uniforms={uniforms}
        attach="material"
        baseMaterial={THREE.MeshStandardMaterial}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </instancedMesh>
  );
}

useGLTF.preload(
  Asset.fromModule(require("../../assets/models/toppingsCombined.glb")).uri
);
