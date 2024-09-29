import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei/native";
import { GLTF } from "three-stdlib";
import { Asset } from "expo-asset";
import useGameStore from "@/hooks/useGameStore";
import { IngredientType } from "@/constants/constants";

import { vertexShader } from "../../shaders/toppingsContainer/vertex";
import { fragmentShader } from "../../shaders/toppingsContainer/fragment";

type GLTFResult = GLTF & {
  nodes: {
    toppingsCombined001: THREE.Mesh;
  };
  materials: {
    toppingsAtlas: THREE.MeshStandardMaterial;
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

export function ToppingsContainer(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    Asset.fromModule(require("../../assets/models/toppingsContainer.glb")).uri
  ) as GLTFResult;
  const { boughtToppings } = useGameStore();
  const shaderRef = useRef<any>(null);
  const uniforms = useRef({
    textureAtlas: {
      value: materials.toppingsAtlas.map,
    },
    visibleToppings: new THREE.Uniform(Array<boolean>(14).fill(!!0)),
  });

  useEffect(() => {
    if (shaderRef.current) {
      const visibleToppings = Array(14).fill(0);
      boughtToppings.forEach((toppingName) => {
        const index = toppingsIndexMap[toppingName];
        if (index !== undefined) visibleToppings[index] = 1;
      });
      console.log(visibleToppings);

      shaderRef.current.uniforms.visibleToppings.value = visibleToppings;
      shaderRef.current.uniforms.visibleToppings.needsUpdate = true;
    }
  }, [boughtToppings]);

  useEffect(() => {
    shaderRef.current.uniforms.textureAtlas.value = materials.toppingsAtlas.map;
    shaderRef.current.uniforms.textureAtlas.needsUpdate = true;
  }, [materials]);

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.toppingsCombined001.geometry}
        position={[2.53103, 2.85521, -4.85418]}
        rotation={[-2.61799, -1.51968, -Math.PI]}
        scale={1.1529}
      >
        <shaderMaterial
          ref={shaderRef}
          uniforms={uniforms.current}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent={true}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload(
  Asset.fromModule(require("../../assets/models/toppingsContainer.glb")).uri
);
