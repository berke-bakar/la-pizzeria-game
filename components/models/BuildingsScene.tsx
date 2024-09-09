import * as THREE from "three";
import React from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { Asset } from "expo-asset";

type GLTFResult = GLTF & {
  nodes: {
    building_E: THREE.Mesh;
  };
  materials: {
    citybits_texture: THREE.MeshStandardMaterial;
  };
};

export function BuildingsScene(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    Asset.fromModule(require("../../assets/models/BuildingsScene.glb")).uri
  ) as GLTFResult;
  return (
    <group {...props}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.building_E.geometry}
        material={materials.citybits_texture}
        scale={100}
      />
    </group>
  );
}

useGLTF.preload(
  Asset.fromModule(require("../../assets/models/BuildingsScene.glb")).uri
);
