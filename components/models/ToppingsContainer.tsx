import * as THREE from "three";
import React, { useCallback, useMemo, useRef } from "react";
import { Outlines, useGLTF } from "@react-three/drei/native";
import { GLTF } from "three-stdlib";
import { Asset } from "expo-asset";
import useGameStore from "@/hooks/useGameStore";
import { INGREDIENTS, IngredientType } from "@/constants/constants";
import { atom, useAtom } from "jotai";
import { ThreeEvent } from "@react-three/fiber/native";

type GLTFResult = GLTF & {
  nodes: {
    Cube013: THREE.InstancedMesh;
    Anchovies020: THREE.InstancedMesh;
    Bacon020: THREE.InstancedMesh;
    Mushroom021: THREE.InstancedMesh;
    Ham021: THREE.InstancedMesh;
    Chicken020: THREE.InstancedMesh;
    Olive_Slice_Oilives_0031: THREE.InstancedMesh;
    Onion013: THREE.InstancedMesh;
    Pickle018: THREE.InstancedMesh;
    Pineapple012: THREE.InstancedMesh;
    Pepper_Slice_Pepper_1007: THREE.InstancedMesh;
    Pepper_Slice_Pepper_0012: THREE.InstancedMesh;
    Pepper_Slice_Pepper_2009: THREE.InstancedMesh;
    Salami022: THREE.InstancedMesh;
    Sausage017: THREE.InstancedMesh;
    Shrimp021: THREE.InstancedMesh;
    Tomato010: THREE.InstancedMesh;
  };
  materials: {
    Material: THREE.MeshStandardMaterial;
    Fish: THREE.MeshBasicMaterial;
    Bacon: THREE.MeshBasicMaterial;
    Mushroom: THREE.MeshBasicMaterial;
    material_14: THREE.MeshBasicMaterial;
    Chicken: THREE.MeshBasicMaterial;
    Oilives: THREE.MeshBasicMaterial;
    Onion: THREE.MeshBasicMaterial;
    Pickles: THREE.MeshBasicMaterial;
    Pineapple: THREE.MeshBasicMaterial;
    ["Pepper.001"]: THREE.MeshBasicMaterial;
    Salami: THREE.MeshBasicMaterial;
    Sausage: THREE.MeshBasicMaterial;
    Shrimp: THREE.MeshBasicMaterial;
    Tomato: THREE.MeshBasicMaterial;
  };
};

const TOPPING_MESH_ID: IngredientType[] = [
  "peppers",
  "anchovies",
  "bacon",
  "chicken",
  "ham",
  "mushroom",
  "olives",
  "onion",
  "pickle",
  "pineapple",
  "salami",
  "sausage",
  "shrimp",
  "tomato",
];

export const selectedToppingAtom = atom<IngredientType>("bacon");

export function ToppingsContainer(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    Asset.fromModule(require("../../assets/models/toppingsContainer.glb")).uri
  ) as GLTFResult;
  const { boughtToppings } = useGameStore();
  const [selectedTopping, setSelectedTopping] = useAtom(selectedToppingAtom);
  const toppingsMap: Record<
    IngredientType,
    {
      args: [
        geometry:
          | THREE.BufferGeometry<THREE.NormalBufferAttributes>
          | undefined,
        material: THREE.Material | THREE.Material[] | undefined,
        count: number
      ][];
      instanceMatrix: THREE.InstancedBufferAttribute[];
    }
  > = useMemo(
    () => ({
      anchovies: {
        args: [[nodes.Anchovies020.geometry, materials.Fish, 8]],
        instanceMatrix: [nodes.Anchovies020.instanceMatrix],
      },
      bacon: {
        args: [[nodes.Bacon020.geometry, materials.Bacon, 9]],
        instanceMatrix: [nodes.Bacon020.instanceMatrix],
      },
      chicken: {
        args: [[nodes.Chicken020.geometry, materials.Chicken, 11]],
        instanceMatrix: [nodes.Chicken020.instanceMatrix],
      },
      ham: {
        args: [[nodes.Ham021.geometry, materials.material_14, 14]],
        instanceMatrix: [nodes.Ham021.instanceMatrix],
      },
      mushroom: {
        args: [[nodes.Mushroom021.geometry, materials.Mushroom, 10]],
        instanceMatrix: [nodes.Mushroom021.instanceMatrix],
      },
      olives: {
        args: [
          [nodes.Olive_Slice_Oilives_0031.geometry, materials.Oilives, 16],
        ],
        instanceMatrix: [nodes.Olive_Slice_Oilives_0031.instanceMatrix],
      },
      onion: {
        args: [[nodes.Onion013.geometry, materials.Onion, 9]],
        instanceMatrix: [nodes.Onion013.instanceMatrix],
      },
      peppers: {
        args: [
          [nodes.Pepper_Slice_Pepper_1007.geometry, materials["Pepper.001"], 3],
          [nodes.Pepper_Slice_Pepper_0012.geometry, materials["Pepper.001"], 3],
          [nodes.Pepper_Slice_Pepper_2009.geometry, materials["Pepper.001"], 2],
        ],
        instanceMatrix: [
          nodes.Pepper_Slice_Pepper_1007.instanceMatrix,
          nodes.Pepper_Slice_Pepper_0012.instanceMatrix,
          nodes.Pepper_Slice_Pepper_2009.instanceMatrix,
        ],
      },
      pickle: {
        args: [[nodes.Pickle018.geometry, materials.Pickles, 10]],
        instanceMatrix: [nodes.Pickle018.instanceMatrix],
      },
      pineapple: {
        args: [[nodes.Pineapple012.geometry, materials.Pineapple, 8]],
        instanceMatrix: [nodes.Pineapple012.instanceMatrix],
      },
      salami: {
        args: [[nodes.Salami022.geometry, materials.Salami, 8]],
        instanceMatrix: [nodes.Salami022.instanceMatrix],
      },
      sausage: {
        args: [[nodes.Sausage017.geometry, materials.Sausage, 11]],
        instanceMatrix: [nodes.Sausage017.instanceMatrix],
      },
      shrimp: {
        args: [[nodes.Shrimp021.geometry, materials.Shrimp, 9]],
        instanceMatrix: [nodes.Shrimp021.instanceMatrix],
      },
      tomato: {
        args: [[nodes.Tomato010.geometry, materials.Tomato, 6]],
        instanceMatrix: [nodes.Tomato010.instanceMatrix],
      },
    }),
    [boughtToppings]
  );

  const THROTTLE_TIME = 200;
  const lastSelectedTime = useRef(0);

  const handleToppingChange = useCallback(
    (topping: IngredientType) => {
      return (event: ThreeEvent<PointerEvent>) => {
        setSelectedTopping(topping);
      };
    },
    [setSelectedTopping]
  );

  const handleToppingContainerSelection = (event: ThreeEvent<PointerEvent>) => {
    const currentTime = Date.now();

    if (currentTime - lastSelectedTime.current < THROTTLE_TIME) return;
    lastSelectedTime.current = currentTime;
    if (event.instanceId !== undefined) {
      const toppingFromId = TOPPING_MESH_ID[event.instanceId];
      if (boughtToppings.includes(toppingFromId))
        setSelectedTopping(toppingFromId);
    }
  };

  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        {boughtToppings.map((val, ind) => {
          const toppingInfo = toppingsMap[val as keyof typeof INGREDIENTS];
          if (val !== "peppers") {
            return (
              <group
                key={`${val}-${ind}`}
                onPointerDown={handleToppingChange(val)}
              >
                <instancedMesh
                  args={toppingInfo.args[0]}
                  name="Cube013"
                  instanceMatrix={toppingInfo.instanceMatrix[0]}
                >
                  {val === selectedTopping && (
                    <Outlines thickness={5} color={"#0091ff"} />
                  )}
                </instancedMesh>
              </group>
            );
          } else {
            return (
              <group
                key={`${val}-${ind}`}
                onPointerDown={handleToppingChange(val)}
              >
                <instancedMesh
                  args={toppingInfo.args[0]}
                  name="Pepper_Slice_Pepper_1007"
                  instanceMatrix={toppingInfo.instanceMatrix[0]}
                >
                  {val === selectedTopping && (
                    <Outlines thickness={5} color={"#0091ff"} />
                  )}
                </instancedMesh>
                <instancedMesh
                  args={toppingInfo.args[1]}
                  instanceMatrix={toppingInfo.instanceMatrix[1]}
                  name="Pepper_Slice_Pepper_0012"
                >
                  {val === selectedTopping && (
                    <Outlines thickness={5} color={"#0091ff"} />
                  )}
                </instancedMesh>
                <instancedMesh
                  args={toppingInfo.args[2]}
                  instanceMatrix={toppingInfo.instanceMatrix[2]}
                  name="Pepper_Slice_Pepper_2009"
                >
                  {val === selectedTopping && (
                    <Outlines thickness={5} color={"#0091ff"} />
                  )}
                </instancedMesh>
              </group>
            );
          }
        })}

        <group>
          <instancedMesh
            args={[nodes.Cube013.geometry, materials.Material, 14]}
            name="Cube013"
            instanceMatrix={nodes.Cube013.instanceMatrix}
            onPointerDown={handleToppingContainerSelection}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(
  Asset.fromModule(require("../../assets/models/toppingsContainer.glb")).uri
);
