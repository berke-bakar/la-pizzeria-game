import * as THREE from "three";
import React, { useEffect, useMemo, useRef } from "react";
import { Outlines, useGLTF } from "@react-three/drei/native";
import { GLTF } from "three-stdlib";
import { Asset } from "expo-asset";
import useGameStore from "@/hooks/useGameStore";
import { IngredientType, selectedToppingAtom } from "@/constants/constants";

import { vertexShader } from "../../shaders/toppingsContainer/vertex";
import { fragmentShader } from "../../shaders/toppingsContainer/fragment";
import { ThreeEvent } from "@react-three/fiber";
import { useAtom } from "jotai";
import CustomShaderMaterial from "three-custom-shader-material";
type GLTFResult = GLTF & {
  nodes: {
    anchovies: THREE.Mesh;
    tomato: THREE.Mesh;
    shrimp: THREE.Mesh;
    sausage: THREE.Mesh;
    salami: THREE.Mesh;
    pineapple: THREE.Mesh;
    pickle: THREE.Mesh;
    onion: THREE.Mesh;
    olives: THREE.Mesh;
    chicken: THREE.Mesh;
    ham: THREE.Mesh;
    mushroom: THREE.Mesh;
    bacon: THREE.Mesh;
    peppers: THREE.Mesh;
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

const toppingPositions: Record<IngredientType, [number, number, number]> = {
  anchovies: [1.54147, 2.9232, -5.03338],
  bacon: [1.87711, 2.96261, -5.03447],
  chicken: [2.1978, 2.93851, -5.05443],
  ham: [2.52146, 2.92146, -5.044],
  mushroom: [2.86085, 2.98734, -5.03028],
  olives: [3.18102, 2.93759, -4.99731],
  onion: [3.5189, 2.99836, -4.99282],
  peppers: [-0.76454, 7.43362, 5.91914],
  pickle: [1.88663, 2.78325, -4.67367],
  pineapple: [2.20928, 2.72368, -4.66243],
  salami: [2.52054, 2.74771, -4.68096],
  sausage: [2.8533, 2.74562, -4.67709],
  shrimp: [3.18827, 2.77205, -4.66417],
  tomato: [3.50052, 2.73273, -4.6853],
};
const toppingRotations: Record<IngredientType, [number, number, number]> = {
  anchovies: [-2.61799, -1.51968, -Math.PI],
  bacon: [-0.06966, -1.26916, -1.35186],
  chicken: [-2.61799, 1.16088, Math.PI],
  ham: [0.4963, 0.98528, 0],
  mushroom: [Math.PI / 6, 0.69936, 0],
  olives: [Math.PI / 6, 0, 0],
  onion: [-0.67652, -0.4654, -0.61341],
  peppers: [0.08874, -0.45065, -0.50707],
  pickle: [0.6323, -0.56358, 0.32692],
  pineapple: [0.62398, 0.58573, 0.09517],
  salami: [0.36123, 1.12022, 0.04196],
  sausage: [0.56588, 0.36934, -0.2254],
  shrimp: [-2.42586, 0.2202, 2.35946],
  tomato: [0.71094, -0.15662, -0.47391],
};
const toppingScales: Record<IngredientType, number> = {
  anchovies: 0.16833,
  bacon: 0.15393,
  chicken: 0.16461,
  ham: 0.16159,
  mushroom: 0.16471,
  olives: 0.14352,
  onion: 0.15998,
  peppers: 13.03465,
  pickle: 0.14817,
  pineapple: 0.16231,
  salami: 0.14532,
  sausage: 0.14579,
  shrimp: 0.13966,
  tomato: 0.15674,
};

const pepperGroupInfo: { position: [number, number, number]; scale: number } = {
  position: [1.57899, 2.66873, -4.72199],
  scale: 0.01,
};

const detectToppingFromUV = (uv: THREE.Vector2) => {
  const numRows = 4; // texture atlas is 4x4
  const toppingIndex =
    Math.floor(uv.y * numRows) * numRows + Math.floor(uv.x * numRows);

  if (toppingIndex <= 14) {
    return toppingIndex;
  } else {
    return null; // shouldn't happen
  }
};

export function ToppingsContainer(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    Asset.fromModule(require("../../assets/models/toppingsContainer.glb")).uri
  ) as GLTFResult;
  const { boughtToppings } = useGameStore();
  const shaderRef = useRef<any>(null);
  const [selectedTopping, setSelectedTopping] = useAtom(selectedToppingAtom);
  const uv = useRef(new THREE.Vector2());
  const uniforms = useMemo(
    () => ({
      uTextureAtlas: {
        value: materials.toppingsAtlas.map,
      },
      uVisibleToppings: new THREE.Uniform(Array<number>(14).fill(0)),
    }),
    []
  );
  const calcVector = useRef(new THREE.Vector3()).current;

  const findNearestContainer = (point: THREE.Vector3) => {
    let closestTopping = null;
    let closestDistance = Infinity;

    Object.entries(toppingPositions).forEach(([key, position], index) => {
      calcVector.fromArray(position);
      const distance = calcVector.distanceTo(point);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestTopping = key;
      }
    });

    // lastly check if pepper is closer
    calcVector.fromArray(pepperGroupInfo.position);
    const distance = calcVector.distanceTo(point);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestTopping = "peppers";
    }

    return closestTopping;
  };

  useEffect(() => {
    if (shaderRef.current) {
      const visibleToppings = Array(14).fill(0);
      Object.entries(boughtToppings).forEach(([toppingName, val], ind) => {
        const index = toppingsIndexMap[toppingName as IngredientType];
        if (index !== undefined) visibleToppings[index] = val ? 1 : 0;
      });

      shaderRef.current.uniforms.uVisibleToppings.value = visibleToppings;
      shaderRef.current.uniforms.uVisibleToppings.needsUpdate = true;
    }
  }, [boughtToppings]);

  useEffect(() => {
    shaderRef.current.uniforms.uTextureAtlas.value =
      materials.toppingsAtlas.map;
    shaderRef.current.uniforms.uTextureAtlas.needsUpdate = true;
  }, [materials]);

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.toppingsCombined001.geometry}
        position={[2.53103, 2.85521, -4.85418]}
        rotation={[-2.61799, -1.51968, -Math.PI]}
        scale={1.1529}
        onPointerDown={(evt: ThreeEvent<PointerEvent>) => {
          if (evt.uv) {
            let selectedTopping = undefined;
            uv.current.copy(evt.uv);
            const clickedToppingIndex = detectToppingFromUV(uv.current);
            if (clickedToppingIndex !== null) {
              if (clickedToppingIndex < 14) {
                const clickedTopping = Object.entries(toppingsIndexMap).find(
                  ([key, val], ind) => val === clickedToppingIndex
                ) as [IngredientType, number];

                selectedTopping = clickedTopping[0];
              } else {
                selectedTopping = findNearestContainer(evt.point);
              }
              if (
                selectedTopping &&
                boughtToppings[selectedTopping as IngredientType]
              )
                setSelectedTopping(selectedTopping as IngredientType);
            }
          }
        }}
      >
        <CustomShaderMaterial
          ref={shaderRef}
          uniforms={uniforms}
          baseMaterial={THREE.MeshStandardMaterial}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>
      {selectedTopping &&
        (selectedTopping !== "peppers" ? (
          <mesh
            geometry={nodes[selectedTopping].geometry}
            material={materials.toppingsAtlas}
            position={toppingPositions[selectedTopping]}
            rotation={toppingRotations[selectedTopping]}
            scale={toppingScales[selectedTopping]}
          >
            <Outlines thickness={5} color={"#0091ff"} />
          </mesh>
        ) : (
          <group
            position={pepperGroupInfo.position}
            scale={pepperGroupInfo.scale}
          >
            <mesh
              geometry={nodes.peppers.geometry}
              material={materials.toppingsAtlas}
              position={toppingPositions["peppers"]}
              rotation={toppingRotations["peppers"]}
              scale={toppingScales["peppers"]}
            >
              <Outlines thickness={5} color={"#0091ff"} />
            </mesh>
          </group>
        ))}
    </group>
  );
}

useGLTF.preload(
  Asset.fromModule(require("../../assets/models/toppingsContainer.glb")).uri
);
